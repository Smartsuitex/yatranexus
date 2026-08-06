import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import fs from "node:fs/promises";
import path from "node:path";
import { requireAdminFromRequest } from "@/lib/admin-auth";
import {
  CMS_IMAGE_FOLDERS,
  type CmsImageFolder,
  type MediaLibraryItem,
} from "@/lib/image-upload.shared";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const IMAGES_ROOT = path.join(process.cwd(), "public", "images");

function sanitizeFilename(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").toLowerCase();
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")).toLowerCase() : ".jpg";
  const safe = base.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "image";
  return `${safe}${ext}`;
}

function publicUrl(relativePath: string): string {
  return `/images/${relativePath.replace(/^\/+/, "")}`;
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
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
    if (buffer.length > MAX_BYTES) {
      throw new Error("Image must be 5 MB or smaller.");
    }

    const folder = data.folder as CmsImageFolder;
    const relativePath = `${folder}/${Date.now()}-${sanitizeFilename(data.filename)}`;
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