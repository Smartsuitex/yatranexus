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

export function getCmsImagePublicUrl(path: string): string {
  const normalized = path.replace(/^\/+/, "").replace(/^images\//, "");
  return `/images/${normalized}`;
}

export function isCmsImageUrl(url: string | null | undefined): boolean {
  const value = url?.trim();
  if (!value) return false;
  if (value.startsWith("/images/")) return true;
  return value.includes(`/storage/v1/object/public/${CMS_IMAGE_BUCKET}/`);
}

export function formatMediaFileSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Could not read file."));
        return;
      }
      const base64 = result.split(",")[1];
      if (!base64) {
        reject(new Error("Could not read file."));
        return;
      }
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error ?? new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

export async function uploadCmsImage(file: File, folder: CmsImageFolder): Promise<string> {
  const { uploadCmsImageFn } = await import("@/lib/image-upload.functions");
  const base64 = await fileToBase64(file);
  return uploadCmsImageFn({
    data: {
      folder,
      filename: file.name,
      contentType: file.type || "application/octet-stream",
      base64,
    },
  });
}

export async function listMediaLibrary(): Promise<MediaLibraryItem[]> {
  const { listMediaLibraryFn } = await import("@/lib/image-upload.functions");
  return listMediaLibraryFn();
}

export async function deleteCmsImage(imagePath: string): Promise<void> {
  const { deleteCmsImageFn } = await import("@/lib/image-upload.functions");
  await deleteCmsImageFn({ data: { path: imagePath } });
}
