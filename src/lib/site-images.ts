/** Public website images — files live in `public/images/` and are served at `/images/...` */

export const SITE_IMAGES = {
  hero: {
    background: "/images/hero/hero-background.webp",
    hotels: "/images/hero/Hotal-Hero-Saction.webp",
    about: "/images/hero/about-hero.webp",
    contact: "/images/hero/contact-hero.webp",
    cabs: "/images/hero/cabs-hero.webp",
    visa: "/images/hero/visa-hero.webp",
    insurance: "/images/hero/insurance-hero.webp",
    forex: "/images/hero/forex-hero.webp",
    corporate: "/images/hero/corporate-hero.webp",
    flights: "/images/hero/flights-hero.webp",
  },
  logo: {
    main: "/images/logo/yatranexus-logo.svg",
    favicon: "/images/logo/favicon.png",
  },
  corporate: {
    banner: "/images/corporate/corporatebanner.png",
  },
} as const;

export const SITE_IMAGE_FOLDERS = {
  hero: "/images/hero",
  logo: "/images/logo",
  services: "/images/services",
  destinations: "/images/destinations",
  packages: "/images/packages",
  gallery: "/images/gallery",
  corporate: "/images/corporate",
  blog: "/images/blog",
  banners: "/images/banners",
  misc: "/images/misc",
} as const;

/** Prefer optimized WebP for local `/images/hero/*` assets when available. */
export function preferWebpImage(url: string): string {
  const trimmed = url.trim();
  if (!trimmed.startsWith("/images/hero/")) return trimmed;
  if (/\.webp$/i.test(trimmed)) return trimmed;
  return trimmed.replace(/\.(png|jpe?g)$/i, ".webp");
}

/** Build a public URL for a file placed under `public/images/` */
export function siteImageUrl(folder: keyof typeof SITE_IMAGE_FOLDERS, filename: string) {
  return `${SITE_IMAGE_FOLDERS[folder]}/${filename.replace(/^\/+/, "")}`;
}

/** Hero background — CMS / DB URL only. Empty when unset (no stock Unsplash). */
export function resolveHeroBackground(cmsImage?: string | null): string {
  const custom = cmsImage?.trim();
  if (!custom) return "";
  if (
    custom.includes("images.unsplash.com") ||
    custom.includes("unsplash.com/")
  ) {
    return "";
  }
  if (
    custom.startsWith("/images/") ||
    custom.startsWith("http://") ||
    custom.startsWith("https://")
  ) {
    return preferWebpImage(custom);
  }
  return "";
}

/** Homepage corporate strip — CMS URL with local banner fallback. */
export function resolveCorporateBanner(cmsImage?: string | null): string {
  const custom = cmsImage?.trim();
  if (
    custom &&
    (custom.startsWith("/images/") ||
      custom.startsWith("http://") ||
      custom.startsWith("https://")) &&
    !custom.includes("images.unsplash.com") &&
    !custom.includes("unsplash.com/") &&
    /* Reject accidental contact/about heroes uploaded into the corporate slot */
    !/contact-hero|about-hero/i.test(custom)
  ) {
    return preferWebpImage(custom);
  }
  return SITE_IMAGES.corporate.banner;
}

export function nextCorporateBannerFallback(current: string): string | null {
  if (current !== SITE_IMAGES.corporate.banner) {
    return SITE_IMAGES.corporate.banner;
  }
  return null;
}

/** Head link to preload LCP hero image on first paint. */
export function heroPreloadLink(href: string) {
  const src = preferWebpImage(href.trim());
  if (!src) return null;
  return {
    rel: "preload" as const,
    as: "image" as const,
    href: src,
    fetchPriority: "high" as const,
  };
}
