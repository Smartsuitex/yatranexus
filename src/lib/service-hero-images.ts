import { preferWebpImage, SITE_IMAGES } from "@/lib/site-images";

export type ServiceHeroSlug =
  | "hotels"
  | "cabs"
  | "visa"
  | "insurance"
  | "forex"
  | "corporate"
  | "flights";

const SERVICE_HERO_FALLBACKS: Record<ServiceHeroSlug, string> = {
  hotels: SITE_IMAGES.hero.hotels,
  cabs: SITE_IMAGES.hero.cabs,
  visa: SITE_IMAGES.hero.visa,
  insurance: SITE_IMAGES.hero.insurance,
  forex: SITE_IMAGES.hero.forex,
  corporate: SITE_IMAGES.hero.corporate,
  flights: SITE_IMAGES.hero.flights,
};

/**
 * Prefer CMS / DB service banner URL.
 * Falls back to local hero image so pages still show a hero until admin uploads.
 * Rejects Unsplash stock URLs. Local `/images/hero/*` paths prefer WebP.
 */
export function resolveServiceHero(
  slug: ServiceHeroSlug,
  cmsBannerUrl?: string | null,
): {
  primary: string;
  fallback: string;
} {
  const cms = cmsBannerUrl?.trim() || "";
  const local = preferWebpImage(SERVICE_HERO_FALLBACKS[slug] || "");
  if (cms && !cms.includes("images.unsplash.com") && !cms.includes("unsplash.com/")) {
    // Prefer dedicated local hero WebP over heavy CMS package/banner PNGs for LCP.
    if (cms.startsWith("/images/hero/")) {
      const optimized = preferWebpImage(cms);
      return { primary: optimized, fallback: local || optimized };
    }
    if (/\.webp$/i.test(cms) && cms.startsWith("/images/")) {
      return { primary: cms, fallback: local || cms };
    }
    // Non-hero CMS uploads (banners/packages) are often multi‑MB — use local hero.
    return { primary: local || preferWebpImage(cms), fallback: local || cms };
  }
  return { primary: local, fallback: local };
}
