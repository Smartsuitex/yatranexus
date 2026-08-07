import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { requireAdminFromRequest } from "@/lib/admin-auth";
import {
  CMS_IMAGE_FOLDERS,
  type CmsImageFolder,
  type MediaLibraryItem,
} from "@/lib/image-upload.shared";

/** Accept large camera/PNG uploads; we compress to WebP before saving. */
const MAX_INPUT_BYTES = 15 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
/** Raster types we optimize and store as WebP for fast public pages. */
const CONVERT_TO_WEBP = new Set(["image/jpeg", "image/png", "image/webp"]);

const IMAGES_ROOT = path.join(process.cwd(), "public", "images");

function sanitizeBasename(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").toLowerCase();
  const safe = base.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "image";
  return safe;
}

function publicUrl(relativePath: string): string {
  return `/images/${relativePath.replace(/^\/+/, "")}`;
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

function shouldConvertToWebp(contentType: string, filename: string): boolean {
  if (CONVERT_TO_WEBP.has(contentType)) return true;
  return /\.(jpe?g|png|webp)$/i.test(filename);
}

const UploadSchema = z.object({
  folder: z.string(),
  filename: z.string(),
  contentType: z.string(),
  base64: z.string(),
});

export const uploadCmsImageFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => UploadSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    if (!CMS_IMAGE_FOLDERS.includes(data.folder as CmsImageFolder)) {
      throw new Error("Invalid image folder.");
    }
    if (!ALLOWED_TYPES.has(data.contentType)) {
      throw new Error("Please upload a JPEG, PNG, WebP, GIF, or SVG image.");
    }

    const buffer = Buffer.from(data.base64, "base64");
    if (buffer.length > MAX_INPUT_BYTES) {
      throw new Error("Image must be 15 MB or smaller.");
    }

    const folder = data.folder as CmsImageFolder;
    const stamp = Date.now();
    const base = sanitizeBasename(data.filename);

    if (shouldConvertToWebp(data.contentType, data.filename)) {
      const webpBuffer = await sharp(buffer)
        .rotate()
        .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 75, effort: 4 })
        .toBuffer();

      const relativePath = `${folder}/${stamp}-${base}.webp`;
      const absPath = path.join(IMAGES_ROOT, relativePath);
      await ensureDir(path.dirname(absPath));
      await fs.writeFile(absPath, webpBuffer);
      return publicUrl(relativePath);
    }

    // GIF / SVG — keep original format (animation / vectors).
    const ext =
      data.contentType === "image/svg+xml"
        ? ".svg"
        : data.contentType === "image/gif"
          ? ".gif"
          : path.extname(data.filename).toLowerCase() || ".bin";
    const relativePath = `${folder}/${stamp}-${base}${ext}`;
    const absPath = path.join(IMAGES_ROOT, relativePath);
    await ensureDir(path.dirname(absPath));
    await fs.writeFile(absPath, buffer);
    return publicUrl(relativePath);
  });

export const listMediaLibraryFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  const items: MediaLibraryItem[] = [];

  for (const folder of CMS_IMAGE_FOLDERS) {
    const dir = path.join(IMAGES_ROOT, folder);
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isFile()) continue;
        if (!/\.(png|jpe?g|webp|gif|svg)$/i.test(entry.name)) continue;
        const abs = path.join(dir, entry.name);
        const stat = await fs.stat(abs);
        const relativePath = `${folder}/${entry.name}`;
        items.push({
          path: relativePath,
          url: publicUrl(relativePath),
          name: entry.name,
          folder,
          size: stat.size,
          createdAt: stat.mtime.toISOString(),
        });
      }
    } catch {
      // folder may not exist yet
    }
  }

  return items.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
});

const DeleteSchema = z.object({ path: z.string().min(1) });

export const deleteCmsImageFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => DeleteSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    const normalized = data.path.replace(/^\/+/, "").replace(/^images\//, "");
    const abs = path.resolve(path.join(IMAGES_ROOT, normalized));
    if (!abs.startsWith(IMAGES_ROOT)) {
      throw new Error("Invalid image path.");
    }
    await fs.unlink(abs);
    return { ok: true };
  });
