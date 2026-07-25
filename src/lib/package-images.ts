/** Prefer CMS / DB package image URLs only — no Unsplash pooling. */

/**
 * Use the stored package image from the database.
 * Returns empty string when missing so the UI can show a neutral placeholder.
 */
export function resolvePackageImage(
  _slug: string,
  _destination: string,
  imageUrl?: string | null,
): string {
  return imageUrl?.trim() || "";
}
