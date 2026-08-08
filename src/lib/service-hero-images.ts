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
  let result: { primary: string; fallback: string; reason: string };
  if (cms && !cms.includes("images.unsplash.com") && !cms.includes("unsplash.com/")) {
    // Prefer dedicated local hero WebP over heavy CMS package/banner PNGs for LCP.
    if (cms.startsWith("/images/hero/")) {
      const optimized = preferWebpImage(cms);
      result = { primary: optimized, fallback: local || optimized, reason: "cms-hero-folder" };
    } else if (/\.webp$/i.test(cms) && cms.startsWith("/images/")) {
      result = { primary: cms, fallback: local || cms, reason: "cms-webp-accepted" };
    } else {
      // Non-hero CMS uploads (banners/packages) are often multi‑MB — use local hero.
      result = {
        primary: local || preferWebpImage(cms),
        fallback: local || cms,
        reason: "cms-demoted-non-webp",
      };
    }
  } else {
    result = { primary: local, fallback: local, reason: "no-cms-fallback" };
  }

  // #region agent log
  fetch("http://127.0.0.1:7377/ingest/fa815d2a-6e74-490b-be7b-8bf8047ce565", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "00bc0d",
    },
    body: JSON.stringify({
      sessionId: "00bc0d",
      runId: "service-hero",
      hypothesisId: "A",
      location: "service-hero-images.ts:resolveServiceHero",
      message: "Service hero resolved",
      data: { slug, cms, ...result },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return { primary: result.primary, fallback: result.fallback };
}
