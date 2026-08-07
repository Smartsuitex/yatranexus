/** Prefer CMS / DB package image URLs only — no Unsplash pooling. */

import { preferWebpImage } from "@/lib/site-images";

/**
 * Use the stored package image from the database.
 * Returns empty string when missing so the UI can show a neutral placeholder.
 * Prefers WebP siblings for destinations/packages/banners/hero paths.
 */
export function resolvePackageImage(
  _slug: string,
  _destination: string,
  imageUrl?: string | null,
): string {
  const trimmed = imageUrl?.trim() || "";
  return trimmed ? preferWebpImage(trimmed) : "";
}
