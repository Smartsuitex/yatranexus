import type { HomepageRow } from "@/lib/admin-cms-api";
import type { Database } from "@/integrations/supabase/types";

export type HeroSlideForm = {
  name: string;
  tag: string;
  image: string;
  slug: string;
};

export type IconFeatureForm = {
  icon: string;
  title: string;
  detail: string;
};

export type StatForm = {
  label: string;
  value: string;
};

export type HowItWorksForm = {
  n: number;
  title: string;
  detail: string;
};

export type TourTypeForm = {
  slug: string;
  name: string;
  image: string;
};

/** Homepage hero tagline under the main title (Admin → Homepage → Hero tagline). */
export const DEFAULT_HOME_HERO_TAGLINE =
  "Flights, hotels, holidays, cab, visa, insurance, & forex — handled by real travel experts on WhatsApp.";

const LEGACY_HOME_HERO_TAGLINE =
  /^flights,\s*hotels,\s*holidays(?:,\s*cab)?,\s*visa,\s*insurance,?\s*&?\s*forex/i;

export function resolveHomeHeroTagline(
  aboutContent: string | null | undefined,
  brandTagline: string | null | undefined,
): string {
  const fromHomepage = aboutContent?.trim() ?? "";
  if (fromHomepage && !/built around one promise/i.test(fromHomepage)) {
    // Normalize known default / legacy copy to the current Admin tagline.
    if (LEGACY_HOME_HERO_TAGLINE.test(fromHomepage)) {
      return DEFAULT_HOME_HERO_TAGLINE;
    }
    return fromHomepage;
  }

  const fromBrand = brandTagline?.trim() ?? "";
  // Brand tagline is often the short slogan (also used as hero title) — only use it when it's subtitle-length copy.
  if (
    fromBrand &&
    !/^your journey,?\s*our priority\.?$/i.test(fromBrand) &&
    fromBrand.length > 40
  ) {
    if (LEGACY_HOME_HERO_TAGLINE.test(fromBrand)) {
      return DEFAULT_HOME_HERO_TAGLINE;
    }
    return fromBrand;
  }

  return DEFAULT_HOME_HERO_TAGLINE;
}

export type HomepageFormState = {
  heroSlides: HeroSlideForm[];
  /** Auto-rotate interval in seconds (stored as ms in DB). Default 10. */
  heroIntervalSeconds: number;
  featuredServiceSlugs: string[];
  featuredPackageSlugs: string[];
  featuredDestinationSlugs: string[];
  aboutTitle: string;
  aboutContent: string;
  whyChooseUs: IconFeatureForm[];
  stats: StatForm[];
  howItWorks: HowItWorksForm[];
  corporateFeatures: IconFeatureForm[];
  tourTypes: TourTypeForm[];
  holidayThemes: string[];
  ctaTitle: string;
  ctaSubtitle: string;
};

export const DEFAULT_HERO_INTERVAL_SECONDS = 10;
/** Homepage hero supports up to 10 rotating images. */
export const MAX_HERO_SLIDES = 10;

export function defaultHomepageForm(): HomepageFormState {
  return {
    heroSlides: [{ name: "", tag: "", image: "", slug: "" }],
    heroIntervalSeconds: DEFAULT_HERO_INTERVAL_SECONDS,
    featuredServiceSlugs: [],
    featuredPackageSlugs: [],
    featuredDestinationSlugs: [],
    aboutTitle: "",
    aboutContent: "",
    whyChooseUs: [{ icon: "Sparkles", title: "", detail: "" }],
    stats: [{ label: "", value: "" }],
    howItWorks: [{ n: 1, title: "", detail: "" }],
    corporateFeatures: [{ icon: "Briefcase", title: "", detail: "" }],
    tourTypes: [{ slug: "", name: "", image: "" }],
    holidayThemes: [""],
    ctaTitle: "",
    ctaSubtitle: "",
  };
}

function parseHeroSlides(raw: unknown): HeroSlideForm[] {
  if (!Array.isArray(raw) || raw.length === 0) return defaultHomepageForm().heroSlides;
  return raw.slice(0, MAX_HERO_SLIDES).map((item) => {
    const h = item as Record<string, unknown>;
    return {
      name: String(h.name ?? ""),
      tag: String(h.tag ?? ""),
      image: String(h.image ?? h.image_url ?? ""),
      slug: String(h.slug ?? ""),
    };
  });
}

function parseIconFeatures(raw: unknown, fallbackIcon: string): IconFeatureForm[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return [{ icon: fallbackIcon, title: "", detail: "" }];
  }
  return raw.map((item) => {
    const f = item as Record<string, unknown>;
    return {
      icon: String(f.icon ?? fallbackIcon),
      title: String(f.title ?? ""),
      detail: String(f.detail ?? f.description ?? ""),
    };
  });
}

function parseHowItWorks(raw: unknown): HowItWorksForm[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return [{ n: 1, title: "", detail: "" }];
  }
  return raw.map((item, index) => {
    const s = item as Record<string, unknown>;
    return {
      n: Number(s.n ?? s.step ?? index + 1) || index + 1,
      title: String(s.title ?? ""),
      detail: String(s.detail ?? s.description ?? ""),
    };
  });
}

function parseTourTypes(raw: unknown): TourTypeForm[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return [{ slug: "", name: "", image: "" }];
  }
  return raw.map((item) => {
    const t = item as Record<string, unknown>;
    return {
      slug: String(t.slug ?? ""),
      name: String(t.name ?? t.title ?? ""),
      image: String(t.image ?? ""),
    };
  });
}

function parseThemes(raw: unknown): string[] {
  if (!Array.isArray(raw) || raw.length === 0) return [""];
  return raw.map((t) => String(t));
}

function parseStats(raw: unknown): StatForm[] {
  if (!Array.isArray(raw) || raw.length === 0) return [{ label: "", value: "" }];
  return raw.map((item) => {
    const s = item as Record<string, unknown>;
    return { label: String(s.label ?? ""), value: String(s.value ?? "") };
  });
}

export function homepageRowToForm(row: HomepageRow | null | undefined): HomepageFormState {
  if (!row) return defaultHomepageForm();
  const rowExt = row as HomepageRow & { hero_interval_ms?: number | null };
  const intervalMs = Number(rowExt.hero_interval_ms);
  const heroIntervalSeconds =
    Number.isFinite(intervalMs) && intervalMs > 0
      ? Math.max(1, Math.round(intervalMs / 1000))
      : DEFAULT_HERO_INTERVAL_SECONDS;

  return {
    heroSlides: parseHeroSlides(row.hero_slides),
    heroIntervalSeconds,
    featuredServiceSlugs: row.featured_service_slugs ?? [],
    featuredPackageSlugs: row.featured_package_slugs ?? [],
    featuredDestinationSlugs: row.featured_destination_slugs ?? [],
    aboutTitle: row.about_title ?? "",
    aboutContent: resolveHomeHeroTagline(row.about_content, null),
    whyChooseUs: parseIconFeatures(row.why_choose_us, "Sparkles"),
    stats: parseStats(row.stats),
    howItWorks: parseHowItWorks(row.how_it_works),
    corporateFeatures: parseIconFeatures(row.corporate_features, "Briefcase"),
    tourTypes: parseTourTypes(row.tour_types),
    holidayThemes: parseThemes(row.holiday_themes),
    ctaTitle: row.cta_title ?? "",
    ctaSubtitle: row.cta_subtitle ?? "",
  };
}

function cleanIconFeatures(items: IconFeatureForm[]) {
  return items
    .filter((item) => item.title.trim() || item.detail.trim())
    .map((item) => ({
      icon: item.icon.trim() || "Sparkles",
      title: item.title.trim(),
      detail: item.detail.trim(),
    }));
}

export function homepageFormToPayload(
  form: HomepageFormState,
): Database["public"]["Tables"]["homepage_settings"]["Update"] {
  const seconds = Math.max(1, Math.min(120, Number(form.heroIntervalSeconds) || DEFAULT_HERO_INTERVAL_SECONDS));
  return {
    hero_slides: form.heroSlides
      .filter((s) => s.name.trim() || s.image.trim())
      .slice(0, MAX_HERO_SLIDES)
      .map((s) => ({
        name: s.name.trim(),
        tag: s.tag.trim(),
        image: s.image.trim(),
        slug: s.slug.trim() || undefined,
      })),
    hero_interval_ms: seconds * 1000,
    featured_service_slugs: form.featuredServiceSlugs,
    featured_package_slugs: form.featuredPackageSlugs,
    featured_destination_slugs: form.featuredDestinationSlugs,
    about_title: form.aboutTitle.trim() || null,
    about_content: form.aboutContent.trim() || null,
    why_choose_us: cleanIconFeatures(form.whyChooseUs),
    stats: form.stats
      .filter((s) => s.label.trim() || s.value.trim())
      .map((s) => ({ label: s.label.trim(), value: s.value.trim() })),
    how_it_works: form.howItWorks
      .filter((s) => s.title.trim() || s.detail.trim())
      .map((s, index) => ({
        n: s.n || index + 1,
        title: s.title.trim(),
        detail: s.detail.trim(),
      })),
    corporate_features: cleanIconFeatures(form.corporateFeatures),
    tour_types: form.tourTypes
      .filter((t) => t.name.trim() || t.slug.trim())
      .map((t) => ({
        slug: t.slug.trim(),
        name: t.name.trim(),
        image: t.image.trim(),
      })),
    holiday_themes: form.holidayThemes.map((t) => t.trim()).filter(Boolean),
    cta_title: form.ctaTitle.trim() || null,
    cta_subtitle: form.ctaSubtitle.trim() || null,
  };
}
