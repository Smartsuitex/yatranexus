import { supabase } from "@/integrations/supabase/client";

export const CMS_IMAGE_BUCKET = "cms-images";

export type CmsImageFolder =
  | "packages"
  | "destinations"
  | "services"
  | "blog"
  | "gallery"
  | "testimonials"
  | "homepage/hero"
  | "homepage/tour-types"
  | "site/logo"
  | "site/favicon"
  | "banners"
  | "corporate";

export const CMS_IMAGE_FOLDERS: CmsImageFolder[] = [
  "packages",
  "destinations",
  "services",
  "blog",
  "gallery",
  "testimonials",
  "homepage/hero",
  "homepage/tour-types",
  "site/logo",
  "site/favicon",
  "banners",
  "corporate",
];

export const CMS_IMAGE_FOLDER_LABELS: Record<CmsImageFolder, string> = {
  packages: "Packages",
  destinations: "Destinations",
  services: "Services",
  blog: "Blog",
  gallery: "Gallery",
  testimonials: "Testimonials",
  "homepage/hero": "Homepage hero",
  "homepage/tour-types": "Homepage tour types",
  "site/logo": "Site logo",
  "site/favicon": "Favicon",
  banners: "Page banners",
  corporate: "Corporate banners",
};

export type MediaLibraryItem = {
  path: string;
  url: string;
  name: string;
  folder: string;
  size?: number;
  createdAt?: string;
};

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function sanitizeFilename(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").toLowerCase();
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")).toLowerCase() : ".jpg";
  const safe = base.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "image";
  return `${safe}${ext}`;
}

export function getCmsImagePublicUrl(path: string): string {
  const { data } = supabase.storage.from(CMS_IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export function isCmsImageUrl(url: string | null | undefined): boolean {
  const value = url?.trim();
  if (!value) return false;
  return value.includes(`/storage/v1/object/public/${CMS_IMAGE_BUCKET}/`);
}

export async function uploadCmsImage(file: File, folder: CmsImageFolder): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Please upload a JPEG, PNG, WebP, GIF, or SVG image.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image must be 5 MB or smaller.");
  }

  const path = `${folder}/${Date.now()}-${sanitizeFilename(file.name)}`;
  const { error } = await supabase.storage.from(CMS_IMAGE_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    if (error.message.toLowerCase().includes("bucket not found")) {
      throw new Error(
        "Image storage is not set up yet. Run the latest Supabase migration (cms_image_storage).",
      );
    }
    if (error.message.toLowerCase().includes("row-level security")) {
      throw new Error("You must be signed in as admin to upload images.");
    }
    throw new Error(error.message);
  }

  return getCmsImagePublicUrl(path);
}

export async function listMediaLibrary(): Promise<MediaLibraryItem[]> {
  const items: MediaLibraryItem[] = [];

  for (const folder of CMS_IMAGE_FOLDERS) {
    let offset = 0;
    const pageSize = 200;

    while (true) {
      const { data, error } = await supabase.storage.from(CMS_IMAGE_BUCKET).list(folder, {
        limit: pageSize,
        offset,
        sortBy: { column: "created_at", order: "desc" },
      });

      if (error) {
        if (error.message.toLowerCase().includes("not found")) break;
        throw new Error(error.message);
      }

      const batch = data ?? [];
      for (const file of batch) {
        if (!file.id) continue;
        const path = `${folder}/${file.name}`;
        items.push({
          path,
          url: getCmsImagePublicUrl(path),
          name: file.name,
          folder,
          size: file.metadata?.size as number | undefined,
          createdAt: file.created_at ?? undefined,
        });
      }

      if (batch.length < pageSize) break;
      offset += pageSize;
    }
  }

  return items.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
}

export async function deleteCmsImage(path: string): Promise<void> {
  const { error } = await supabase.storage.from(CMS_IMAGE_BUCKET).remove([path]);
  if (error) throw new Error(error.message);
}

export function formatMediaFileSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
