import { SITE_IMAGES } from "@/lib/site-images";

/** Use CMS / DB image URLs only — never inject Unsplash. */
export function sanitizePublicImageUrl(image: string | null | undefined): string {
  return image?.trim() || "";
}

export const HOLIDAY_HUB_HERO = {
  eyebrow: "Holiday packages",
  titleFirst: "Holidays you'll",
  titleAccent: "Remember",
  subtitle:
    "Hand-crafted itineraries across India — fully customisable with real experts on WhatsApp.",
} as const;

export const HOLIDAY_DOMESTIC_HERO = {
  eyebrow: "Incredible India",
  titleFirst: "Explore India",
  titleAccent: "by State",
  subtitle: "Pick a state to view highlights, sample packages and request a quote.",
} as const;

export const HOLIDAY_INTERNATIONAL_HERO = {
  eyebrow: "Beyond borders",
  titleFirst: "Explore the",
  titleAccent: "World",
  subtitle: "Pick a destination to view highlights, sample packages and request a quote.",
} as const;

const HOLIDAY_HUB_LOCAL_HERO = "/images/hero/holiday-packages-hero-desktop.png";

/** Prefer CMS banner; fall back to local holiday hub hero. Reject Unsplash. */
export function resolveHolidayHubHero(bannerUrl?: string): { primary: string; fallback: string } {
  const cms = bannerUrl?.trim() || "";
  if (cms && !cms.includes("unsplash.com")) {
    return { primary: cms, fallback: HOLIDAY_HUB_LOCAL_HERO };
  }
  return { primary: HOLIDAY_HUB_LOCAL_HERO, fallback: HOLIDAY_HUB_LOCAL_HERO };
}

export function resolveHolidayHubContent(
  service: {
    title: string;
    description: string;
    shortDescription?: string;
    contentBlocks?: {
      eyebrow?: string;
      titleFirst?: string;
      titleAccent?: string;
      sectionTitle?: string;
    };
  } | null,
) {
  const blocks = service?.contentBlocks ?? {};
  return {
    eyebrow: blocks.eyebrow ?? HOLIDAY_HUB_HERO.eyebrow,
    titleFirst: blocks.titleFirst ?? HOLIDAY_HUB_HERO.titleFirst,
    titleAccent: blocks.titleAccent ?? HOLIDAY_HUB_HERO.titleAccent,
    subtitle:
      blocks.sectionTitle ||
      service?.shortDescription ||
      service?.description ||
      HOLIDAY_HUB_HERO.subtitle,
    pageTitle: service?.title ?? "Holiday Packages",
  };
}

/** Destination / package hero from DB image only. */
export function resolveDestinationHero(image: string): { primary: string; fallback: string } {
  const primary = sanitizePublicImageUrl(image);
  return {
    primary,
    fallback: primary,
  };
}

/** @deprecated Kept for imports that still reference SITE_IMAGES hero path */
export const HOLIDAY_DEFAULT_HERO_IMAGE = SITE_IMAGES.hero.background;
