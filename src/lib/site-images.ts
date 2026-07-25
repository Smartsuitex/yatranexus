/** Public website images — files live in `public/images/` and are served at `/images/...` */

export const SITE_IMAGES = {
  hero: {
    background: "/images/hero/hero-background.png",
    hotels: "/images/hero/Hotal-Hero-Saction.png",
    about: "/images/hero/about-hero.png",
    contact: "/images/hero/contact-hero.png",
    cabs: "/images/hero/cabs-hero.png",
    visa: "/images/hero/visa-hero.png",
    insurance: "/images/hero/insurance-hero.png",
    forex: "/images/hero/forex-hero.png",
    corporate: "/images/hero/corporate-hero.png",
    flights: "/images/hero/flights-hero.png",
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
    return custom;
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
    return custom;
  }
  return SITE_IMAGES.corporate.banner;
}

export function nextCorporateBannerFallback(current: string): string | null {
  if (current !== SITE_IMAGES.corporate.banner) {
    return SITE_IMAGES.corporate.banner;
  }
  return null;
}
