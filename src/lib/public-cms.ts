import type {
  BlogPostRow as BlogRow,
  DestinationRow,
  FaqRow,
  GalleryRow,
  HomepageRow,
  PackageRow,
  ServiceRow,
  SiteSettingsRow,
  TestimonialRow,
} from "@/lib/db-types";
import {
  BLOG_POSTS,
  COMPANY,
  CORPORATE_CONTACT,
  CORPORATE_FEATURES,
  DOMESTIC_STATES,
  FAQS,
  GALLERY_IMAGES,
  HOLIDAY_THEMES,
  HOW_IT_WORKS,
  INTERNATIONAL_COUNTRIES,
  normalizeCompanyAddress,
  normalizeCompanyCopy,
  PACKAGES,
  PACKAGE_SLUG_ALIASES,
  SERVICES,
  SHOW_INTERNATIONAL,
  TESTIMONIALS,
  TOUR_TYPES,
  WHY_CHOOSE_US,
  type Destination,
  type Package,
} from "@/lib/site-data";
import {
  DEFAULT_PAGE_CONTENT,
  parsePageContent,
  brandFromSettings,
  type PublicPageContent,
} from "@/lib/page-content";
import { toTitleCase } from "@/lib/utils";
import { resolvePackageImage } from "@/lib/package-images";
import { sanitizePublicImageUrl } from "@/lib/holiday-packages-page-data";
import { preferWebpImage } from "@/lib/site-images";
import { createServerFn } from "@tanstack/react-start";
import { cachedPublic } from "@/lib/public-cms-cache";
type HomepageRowExtended = HomepageRow;

export type PublicPackage = Package & {
  id?: string;
  exclusions?: string[];
  discountPrice?: string;
  isFeatured?: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
};

export type PublicBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  image: string;
  content: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
};

export type PublicFaq = { q: string; a: string; category?: string };
export type PublicGalleryImage = { id: string; title: string; album: string; image: string };
export type PublicTestimonial = {
  id: string;
  name: string;
  city: string;
  designation?: string;
  text: string;
  rating: number;
  photoUrl?: string;
  /** Display order from CMS (lower = first). */
  sortOrder: number;
};

export type PublicSiteSettings = {
  phone: string;
  phoneRaw: string;
  email: string;
  whatsapp: string;
  whatsappBase: string;
  corporatePhone: string;
  corporatePhoneRaw: string;
  corporateEmail: string;
  corporateHours: string;
  corporateWhatsappMessage: string;
  address: string;
  mapEmbedUrl: string;
  businessHours: string;
  footerText: string;
  socialLinks: Record<string, string>;
  legalName: string;
  tagline: string;
  logoUrl?: string;
  faviconUrl?: string;
  pageContent: PublicPageContent;
  /** CMS-managed; falls back to site-data SHOW_INTERNATIONAL. */
  showInternational: boolean;
  whatsappPreset: string;
  seoTitle: string;
  seoDescription: string;
  commonPackageExclusions: string[];
};

export type PublicHomepageSettings = {
  heroSlides: { name: string; tag: string; image: string; slug?: string }[];
  /** Hero auto-rotate interval in milliseconds (default 10000). */
  heroIntervalMs: number;
  featuredPackageSlugs: string[];
  featuredServiceSlugs: string[];
  featuredDestinationSlugs: string[];
  aboutTitle: string;
  aboutContent: string;
  whyChooseUs: { icon: string; title: string; detail: string }[];
  howItWorks: { n: number; title: string; detail: string }[];
  corporateFeatures: { icon: string; title: string; detail: string }[];
  tourTypes: { slug: string; name: string; image: string }[];
  holidayThemes: string[];
  stats: { label: string; value: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
};

export type PublicServiceFeature = {
  icon: string;
  title: string;
  detail: string;
  /** Optional card/row image (Corporate detailed services). */
  image?: string;
  accent?: "purple" | "orange" | "blue" | "green" | "pink";
  /** Optional bullet points (Corporate detailed services). */
  points?: string[];
};
export type PublicVisaCountry = {
  country: string;
  type: string;
  processing: string;
  touristType?: string;
  businessType?: string;
  processingNote?: string;
};
export type PublicServiceStep = { n: number; title: string; detail: string };

export type PublicServiceContentBlocks = {
  heroTitle?: string;
  sectionTitle?: string;
  /** Heading for the photo/detail rows on Corporate page. */
  detailedSectionTitle?: string;
  eyebrow?: string;
  titleFirst?: string;
  titleAccent?: string;
  layout?:
    | "visa"
    | "hotels"
    | "cabs"
    | "insurance"
    | "forex"
    | "flights"
    | "holiday"
    | "corporate";
  /** Corporate / holiday hub hero background (mirrors services.banner_url). */
  heroBannerUrl?: string;
  features?: PublicServiceFeature[];
  /** Corporate page alternating rows with images. */
  detailedServices?: PublicServiceFeature[];
  /** Corporate hero bullets (one line each). */
  heroBullets?: string[];
  /** Corporate ribbon under hero. */
  ribbon?: PublicServiceFeature[];
  whyChoose?: PublicServiceFeature[];
  whyUs?: PublicServiceFeature[];
  /** Product catalogs (cabs categories, insurance plans, forex cards, hotel destinations). */
  catalogItems?: PublicServiceFeature[];
  catalogSectionTitle?: string;
  catalogSectionLead?: string;
  servicesLead?: string;
  whyChooseLead?: string;
  detailedLead?: string;
  whyUsLead?: string;
  proposalLead?: string;
  whyChooseTitle?: string;
  whyUsTitle?: string;
  proposalTitle?: string;
  partnershipCallout?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonLabel?: string;
  heroBadges?: PublicServiceFeature[];
  trustItems?: PublicServiceFeature[];
  trustFooter?: PublicServiceFeature[];
  whySectionTitle?: string;
  proposalServiceOptions?: string[];
  proposalMonths?: string[];
  proposalRequirements?: string[];
  steps?: PublicServiceStep[];
  visaCountries?: PublicVisaCountry[];
};

export type PublicServiceFaq = { question: string; answer: string };

export type PublicService = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  bannerUrl?: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  inclusions?: string[];
  exclusions?: string[];
  faqs?: PublicServiceFaq[];
  contentBlocks: PublicServiceContentBlocks;
};

export type PublicDestination = Destination & {
  /** Present on CMS/DB rows; used to split domestic vs international without a second query. */
  scope?: "domestic" | "international";
};

export type PublicNavLink = {
  to: string;
  title: string;
  slug?: string;
  icon?: string;
  shortDescription?: string;
};

export type PackageFilters = {
  scope?: "domestic" | "international" | "all";
  destination?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minNights?: number;
  maxNights?: number;
};

export const DEFAULT_SITE_SETTINGS: PublicSiteSettings = {
  phone: COMPANY.phone,
  phoneRaw: COMPANY.phoneRaw,
  email: COMPANY.email,
  whatsapp: COMPANY.phoneRaw,
  whatsappBase: COMPANY.whatsappBase,
  corporatePhone: CORPORATE_CONTACT.phone,
  corporatePhoneRaw: CORPORATE_CONTACT.phoneRaw,
  corporateEmail: CORPORATE_CONTACT.email,
  corporateHours: CORPORATE_CONTACT.hours,
  corporateWhatsappMessage: CORPORATE_CONTACT.whatsappMessage,
  address: COMPANY.address,
  mapEmbedUrl: "",
  businessHours: "Mon–Sat, 9:00 AM – 7:00 PM IST",
  footerText: `${COMPANY.legalName}. We craft thoughtful journeys across India and the world.`,
  socialLinks: {},
  legalName: COMPANY.legalName,
  tagline: COMPANY.tagline,
  pageContent: DEFAULT_PAGE_CONTENT,
  showInternational: SHOW_INTERNATIONAL,
  whatsappPreset:
    DEFAULT_PAGE_CONTENT.site?.whatsappPreset ?? "Hi YatraNexus, I'd like to plan a trip.",
  seoTitle:
    DEFAULT_PAGE_CONTENT.site?.seoTitle ??
    "YatraNexus | Tour Packages, Flights, Hotels & Cabs India",
  seoDescription:
    DEFAULT_PAGE_CONTENT.site?.seoDescription ??
    "YatraNexus is your one-stop travel partner for flights, hotels, holidays, visa, insurance, forex & corporate travel — handled by real experts, not chatbots.",
  commonPackageExclusions: DEFAULT_PAGE_CONTENT.site?.commonPackageExclusions ?? [],
};

function itineraryFromJson(value: unknown): PublicPackage["itinerary"] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const row = item as { day?: number; title?: string; detail?: string };
      return {
        day: Number(row.day) || 0,
        title: toTitleCase(String(row.title ?? "")),
        detail: String(row.detail ?? ""),
      };
    })
    .filter((item) => item.title);
}

function mapDbPackage(row: PackageRow): PublicPackage {
  return {
    id: row.id,
    slug: row.slug,
    title: toTitleCase(row.title),
    destination: row.destination,
    scope: row.scope,
    nights: row.nights,
    days: row.days,
    fromPrice: row.from_price,
    discountPrice: row.discount_price ?? undefined,
    image: (() => {
      const resolved = resolvePackageImage(row.slug, row.destination, row.image_url);
      return isHardcodedStockImage(resolved) ? "" : resolved;
    })(),
    overview: row.meta_description ?? undefined,
    highlights: row.inclusions ?? [],
    inclusions: row.inclusions ?? [],
    exclusions: row.exclusions ?? [],
    itinerary: itineraryFromJson(row.itinerary),
    isFeatured: row.is_featured,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
  };
}

function mapStaticPackage(pkg: Package): PublicPackage {
  return {
    ...pkg,
    title: toTitleCase(pkg.title),
    itinerary: (pkg.itinerary ?? []).map((day) => ({
      ...day,
      title: toTitleCase(day.title),
    })),
    // Do not surface hardcoded Unsplash package images.
    image: "",
    overview: pkg.overview,
    highlights: pkg.highlights ?? pkg.inclusions,
    exclusions: [],
  };
}

/** Prefer CMS/DB values. Only fill empty gaps from static seed packages. */
function enrichPackageFromStatic(pkg: PublicPackage): PublicPackage {
  const seed = PACKAGES.find((p) => p.slug === pkg.slug);
  if (!seed) return pkg;

  return {
    ...pkg,
    overview: pkg.overview?.trim() ? pkg.overview : seed.overview ?? pkg.overview,
    highlights:
      pkg.highlights && pkg.highlights.length > 0
        ? pkg.highlights
        : seed.highlights?.length
          ? seed.highlights
          : pkg.highlights,
    inclusions:
      pkg.inclusions && pkg.inclusions.length > 0
        ? pkg.inclusions
        : seed.inclusions?.length
          ? seed.inclusions
          : pkg.inclusions,
    itinerary:
      pkg.itinerary && pkg.itinerary.length > 0
        ? pkg.itinerary
        : seed.itinerary?.length
          ? seed.itinerary
          : pkg.itinerary,
  };
}

function normalizePackageKey(title: string, destination: string): string {
  return `${destination}::${title}`
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Enrich CMS packages with static text extras only.
 * Do not inject hardcoded Unsplash seed packages when the DB already has rows.
 */
function withStaticPackageListExtras(fromDb: PublicPackage[]): PublicPackage[] {
  return fromDb.map((pkg) => {
    const seed = PACKAGES.find((p) => p.slug === pkg.slug);
    if (!seed) {
      return { ...pkg, itinerary: [], exclusions: [] };
    }
    return {
      ...pkg,
      overview: pkg.overview?.trim() ? pkg.overview : seed.overview ?? pkg.overview,
      highlights:
        pkg.highlights && pkg.highlights.length > 0
          ? pkg.highlights
          : seed.highlights?.length
            ? seed.highlights
            : pkg.highlights,
      inclusions:
        pkg.inclusions && pkg.inclusions.length > 0
          ? pkg.inclusions
          : seed.inclusions?.length
            ? seed.inclusions
            : pkg.inclusions,
      itinerary: [],
      exclusions: [],
    };
  });
}

/** Strip heavy fields before dehydrating list/home loader data. */
export function toPublicPackageCard(pkg: PublicPackage): PublicPackage {
  return {
    id: pkg.id,
    slug: pkg.slug,
    title: pkg.title,
    destination: pkg.destination,
    scope: pkg.scope,
    nights: pkg.nights,
    days: pkg.days,
    fromPrice: pkg.fromPrice,
    discountPrice: pkg.discountPrice,
    image: pkg.image,
    isFeatured: pkg.isFeatured,
    overview: pkg.overview,
    highlights: (pkg.highlights ?? []).slice(0, 6),
    inclusions: [],
    exclusions: [],
    itinerary: [],
    metaTitle: pkg.metaTitle,
    metaDescription: pkg.metaDescription,
  };
}

function mapDbBlog(row: BlogRow): PublicBlogPost {
  const content = Array.isArray(row.content)
    ? (row.content as string[])
    : typeof row.content === "string"
      ? [row.content]
      : [];
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    category: row.category ?? "Travel",
    date: row.published_at ?? row.created_at,
    readMinutes: row.read_minutes,
    image: isHardcodedStockImage(row.featured_image_url)
      ? ""
      : preferWebpImage(row.featured_image_url ?? ""),
    content,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
  };
}

export function parsePrice(value: string): number {
  return Number(value.replace(/[^\d.]/g, "")) || 0;
}

/** Lowest package price label, or null when none are priced. */
export function lowestPackagePriceLabel(packages: PublicPackage[]): string | null {
  let best: { n: number; label: string } | null = null;
  for (const pkg of packages) {
    const label = pkg.fromPrice?.trim() || "";
    const n = parsePrice(label);
    if (!label || n <= 0) continue;
    if (!best || n < best.n) best = { n, label };
  }
  return best?.label ?? null;
}

/** Format a stored price for display (ensure ₹ prefix). */
export function formatHolidayPrice(amount: string): string {
  const trimmed = amount.trim();
  if (!trimmed) return "";
  if (/[₹Rs]/i.test(trimmed)) return trimmed.replace(/^rs\.?\s*/i, "₹ ");
  return `₹ ${trimmed}`;
}

/**
 * Starting-from price per destination slug.
 * Prefers lowest matching package price; falls back to CMS destinationPrices.
 */
export function destinationStartingPrices(
  packages: PublicPackage[],
  destinations: Array<Pick<PublicDestination, "name" | "slug">>,
  cmsPrices?: Record<string, string> | null,
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const dest of destinations) {
    const related = packages.filter((pkg) => packageMatchesDestination(pkg, dest));
    const fromPackages = lowestPackagePriceLabel(related);
    const fromCms = cmsPrices?.[dest.slug]?.trim() || "";
    const label = fromPackages || fromCms;
    if (label) map[dest.slug] = formatHolidayPrice(label);
  }
  return map;
}

function hideInternationalContent(
  packages: PublicPackage[],
  showInternational: boolean,
): PublicPackage[] {
  if (showInternational) return packages;
  return packages.filter((p) => p.scope !== "international");
}

/** Resolve CMS show-international flag (with static fallback). */
async function resolveShowInternationalImpl(): Promise<boolean> {
  try {
    const settings = await fetchPublicSiteSettingsImpl();
    return settings.showInternational;
  } catch {
    return SHOW_INTERNATIONAL;
  }
}

/** Match packages to a destination by name, slug, or package slug prefix. */
export function packageMatchesDestination(
  pkg: PublicPackage,
  dest: { name: string; slug: string },
): boolean {
  const name = dest.name.trim().toLowerCase();
  const slug = dest.slug.trim().toLowerCase();
  const slugWords = slug.replace(/-/g, " ");
  const destField = pkg.destination.trim().toLowerCase();
  const pkgSlug = pkg.slug.trim().toLowerCase();

  if (!name && !slug) return false;

  // Require meaningful destination tokens (avoid "a"/"go" matching "Goa").
  if (destField.length >= 3) {
    if (destField.includes(name) || name.includes(destField)) return true;
    if (destField.includes(slugWords) || (slugWords.length >= 3 && slugWords.includes(destField))) {
      return true;
    }
  }
  if (slug && (pkgSlug === slug || pkgSlug.startsWith(`${slug}-`) || pkgSlug.includes(`-${slug}-`))) {
    return true;
  }
  // e.g. himachal ↔ Himachal Pradesh
  const nameRoot = name.split(/\s+/)[0] ?? "";
  if (nameRoot.length >= 4 && (destField.includes(nameRoot) || pkgSlug.startsWith(`${nameRoot}-`))) {
    return true;
  }
  return false;
}

export async function fetchPackagesForDestination(dest: {
  name: string;
  slug: string;
  scope?: "domestic" | "international";
}): Promise<PublicPackage[]> {
  // Must use the server-fn wrapper — loaders also run on the client during SPA
  // navigations, and direct DB access silently falls back to image-less seeds.
  const all = await fetchPublicPackages(
    dest.scope ? { scope: dest.scope } : undefined,
  );
  const fromDb = all.filter((pkg) => packageMatchesDestination(pkg, dest));
  if (fromDb.length > 0) return fromDb;

  // Fallback to static seeds only when this destination has no CMS packages yet.
  return PACKAGES.filter((pkg) => packageMatchesDestination(mapStaticPackage(pkg), dest)).map(
    mapStaticPackage,
  );
}

export function filterPackages(
  packages: PublicPackage[],
  filters: PackageFilters = {},
  showInternational: boolean = SHOW_INTERNATIONAL,
): PublicPackage[] {
  let result = hideInternationalContent(packages.filter((p) => p.title), showInternational);

  if (filters.scope && filters.scope !== "all") {
    result = result.filter((p) => p.scope === filters.scope);
  }
  if (filters.destination?.trim()) {
    const term = filters.destination.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.destination.toLowerCase().includes(term) ||
        p.slug.toLowerCase().includes(term.replace(/\s+/g, "-")) ||
        p.title.toLowerCase().includes(term),
    );
  }
  if (filters.search?.trim()) {
    const term = filters.search.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.destination.toLowerCase().includes(term) ||
        p.slug.includes(term),
    );
  }
  if (filters.minPrice != null && filters.minPrice > 0) {
    result = result.filter((p) => parsePrice(p.fromPrice) >= filters.minPrice!);
  }
  if (filters.maxPrice != null && filters.maxPrice > 0) {
    result = result.filter((p) => parsePrice(p.fromPrice) <= filters.maxPrice!);
  }
  if (filters.minNights != null && filters.minNights > 0) {
    result = result.filter((p) => p.nights >= filters.minNights!);
  }
  if (filters.maxNights != null && filters.maxNights > 0) {
    result = result.filter((p) => p.nights <= filters.maxNights!);
  }

  return result;
}

async function fetchPublicPackagesImpl(filters?: PackageFilters): Promise<PublicPackage[]> {
  const cacheKey = `packages:${filters ? JSON.stringify(filters) : "all"}`;
  return cachedPublic(cacheKey, async () => {
    const showInternational = await resolveShowInternationalImpl();
    try {
      const { listActivePackagesSummary } = await import("@/lib/db-queries/packages");
      const data = await listActivePackagesSummary();

      if (!data?.length) {
        return filterPackages(PACKAGES.map(mapStaticPackage), filters, showInternational);
      }
      return filterPackages(
        withStaticPackageListExtras(data.map(mapDbPackage)),
        filters,
        showInternational,
      );
    } catch {
      return filterPackages(PACKAGES.map(mapStaticPackage), filters, showInternational);
    }
  });
}

/** Match packages to a tour type by title/slug keywords (family, honeymoon, etc.). */
export function packageMatchesTourType(
  pkg: PublicPackage,
  tour: { slug: string; name: string },
): boolean {
  const slug = tour.slug.trim().toLowerCase();
  const name = tour.name.trim().toLowerCase();
  if (!slug && !name) return false;

  const haystack = `${pkg.title} ${pkg.slug} ${pkg.destination}`.toLowerCase();
  const tokens = [slug, name].filter((t) => t.length >= 3);
  return tokens.some((token) => haystack.includes(token.replace(/-/g, " ")) || haystack.includes(token));
}

export async function fetchPackagesForTourType(tour: {
  slug: string;
  name: string;
}): Promise<PublicPackage[]> {
  const all = await fetchPublicPackages();
  return all.filter((pkg) => packageMatchesTourType(pkg, tour));
}

const HOLIDAY_THEME_KEYWORDS: Record<string, string[]> = {
  beaches: ["beach", "beaches", "coastal", "seaside", "seashore", "andaman", "maldives", "gokarna", "palolem", "agonda"],
  festival: ["festival", "carnival", "diwali", "holi", "fair", "celebration"],
  historical: [
    "historical",
    "historic",
    "heritage",
    "fort",
    "palace",
    "temple",
    "monument",
    "museum",
    "ruins",
    "unesco",
  ],
  luxury: ["luxury", "premium", "deluxe", "5 star", "five star", "villa", "resort spa", "boutique"],
  mountain: ["mountain", "mountains", "himalaya", "himalayas", "hill", "hills", "trek", "trekking", "peak", "valley"],
  nightlife: ["nightlife", "night life", "club", "party", "casino", "beach party"],
  snow: ["snow", "snowfall", "skiing", "ski", "gulmarg", "snowscape", "winter wonderland"],
  waterfalls: ["waterfall", "waterfalls", "falls", "cascade"],
  wildlife: [
    "wildlife",
    "safari",
    "jungle",
    "tiger",
    "sanctuary",
    "national park",
    "bird watching",
    "kaziranga",
    "gir",
    "bandhavgarh",
    "kanha",
    "tadoba",
    "periyar",
  ],
};

function packageThemeHaystack(pkg: PublicPackage): string {
  const itineraryText = (pkg.itinerary ?? [])
    .map((day) => `${day.title} ${day.detail}`)
    .join(" ");
  return [
    pkg.title,
    pkg.slug.replace(/-/g, " "),
    pkg.destination,
    pkg.overview ?? "",
    ...(pkg.highlights ?? []),
    ...(pkg.inclusions ?? []),
    itineraryText,
  ]
    .join(" ")
    .toLowerCase();
}

/** Match packages to a holiday theme pill (Beaches, Wildlife, etc.). */
export function packageMatchesHolidayTheme(pkg: PublicPackage, theme: string): boolean {
  const key = theme.trim().toLowerCase();
  if (!key) return false;
  const haystack = packageThemeHaystack(pkg);
  const keywords = HOLIDAY_THEME_KEYWORDS[key] ?? [key.replace(/s$/, ""), key];
  return keywords.some((keyword) => keyword.length >= 3 && haystack.includes(keyword));
}

export function filterPackagesByHolidayTheme(
  packages: PublicPackage[],
  theme: string | null | undefined,
): PublicPackage[] {
  const trimmed = theme?.trim();
  if (!trimmed) return packages;
  return packages.filter((pkg) => packageMatchesHolidayTheme(pkg, trimmed));
}

async function fetchPublicPackageBySlugImpl(slug: string): Promise<PublicPackage | null> {
  const resolvedSlug = PACKAGE_SLUG_ALIASES[slug] ?? slug;
  const showInternational = await resolveShowInternationalImpl();
  try {
    const { getPackageBySlug } = await import("@/lib/db-queries/packages");
    const data = await getPackageBySlug(resolvedSlug);

    if (!data) {
      const fallback = PACKAGES.find((p) => p.slug === resolvedSlug);
      const pkg = fallback ? mapStaticPackage(fallback) : null;
      return pkg && !showInternational && pkg.scope === "international" ? null : pkg;
    }
    const pkg = enrichPackageFromStatic(mapDbPackage(data));
    return !showInternational && pkg.scope === "international" ? null : pkg;
  } catch {
    const fallback = PACKAGES.find((p) => p.slug === resolvedSlug);
    const pkg = fallback ? mapStaticPackage(fallback) : null;
    return pkg && !showInternational && pkg.scope === "international" ? null : pkg;
  }
}

async function fetchPublicBlogPostsImpl(): Promise<PublicBlogPost[]> {
  try {
    const { listPublishedBlogPosts } = await import("@/lib/db-queries/blog");
    const data = await listPublishedBlogPosts();

    if (!data?.length) {
      return BLOG_POSTS.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        date: p.date,
        readMinutes: p.readMinutes,
        image: p.image,
        content: p.content,
      }));
    }
    return data.map(mapDbBlog);
  } catch {
    return BLOG_POSTS.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      date: p.date,
      readMinutes: p.readMinutes,
      image: p.image,
      content: p.content,
    }));
  }
}

async function fetchPublicBlogPostBySlugImpl(slug: string): Promise<PublicBlogPost | null> {
  const posts = await fetchPublicBlogPostsImpl();
  return posts.find((p) => p.slug === slug) ?? null;
}

async function fetchPublicFaqsImpl(): Promise<PublicFaq[]> {
  try {
    const { listActiveFaqs } = await import("@/lib/db-queries/faqs");
    const data = await listActiveFaqs();

    if (!data?.length) {
      return FAQS.map((f) => ({ q: f.q, a: f.a }));
    }
    return data.map((row: FaqRow) => ({
      q: row.question,
      a: row.answer,
      category: row.category,
    }));
  } catch {
    return FAQS.map((f) => ({ q: f.q, a: f.a }));
  }
}

function filterGalleryImages(
  images: { id: string; title: string; album: string; image: string }[],
  showInternational: boolean,
) {
  if (showInternational) return images;
  return images.filter((img) => img.album !== "International");
}

async function fetchPublicGalleryImpl(): Promise<PublicGalleryImage[]> {
  const showInternational = await resolveShowInternationalImpl();
  try {
    const { listActiveGalleryImages } = await import("@/lib/db-queries/gallery");
    const data = await listActiveGalleryImages();

    if (!data?.length) {
      return filterGalleryImages(
        GALLERY_IMAGES.map((g) => ({
          id: g.id,
          title: g.title,
          album: g.album,
          image: "",
        })),
        showInternational,
      );
    }
    return filterGalleryImages(
      data.map((row: GalleryRow) => ({
        id: row.id,
        title: row.title,
        album: row.album,
        image: isHardcodedStockImage(row.image_url)
          ? ""
          : preferWebpImage(row.image_url || ""),
      })),
      showInternational,
    );
  } catch {
    return filterGalleryImages(
      GALLERY_IMAGES.map((g) => ({
        id: g.id,
        title: g.title,
        album: g.album,
        image: "",
      })),
      showInternational,
    );
  }
}

async function fetchPublicTestimonialsImpl(): Promise<PublicTestimonial[]> {
  return cachedPublic("testimonials", async () => {
    try {
      const { listActiveTestimonials } = await import("@/lib/db-queries/testimonials");
      const data = await listActiveTestimonials();

      if (!data?.length) {
        return TESTIMONIALS.map((t, i) => ({
          id: `static-${i}`,
          name: t.name,
          city: t.city,
          text: t.text,
          rating: 5,
          sortOrder: i + 1,
        }));
      }

      return data
        .map((row: TestimonialRow) => ({
          id: row.id,
          name: row.name,
          city: row.city ?? "",
          designation: row.designation ?? undefined,
          text: row.review_text,
          rating: Math.min(5, Math.max(1, Number(row.rating) || 5)),
          photoUrl: row.photo_url
            ? preferWebpImage(row.photo_url)
            : undefined,
          sortOrder: Number(row.sort_order) || 0,
        }))
        .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
    } catch {
      return TESTIMONIALS.map((t, i) => ({
        id: `static-${i}`,
        name: t.name,
        city: t.city,
        text: t.text,
        rating: 5,
        sortOrder: i + 1,
      }));
    }
  });
}

async function fetchPublicSiteSettingsImpl(): Promise<PublicSiteSettings> {
  return cachedPublic("site-settings", async () => {
    try {
      const { getSiteSettings } = await import("@/lib/db-queries/site-settings");
      const data = await getSiteSettings();

      if (!data) return DEFAULT_SITE_SETTINGS;

      const row = data as SiteSettingsRow & {
        legal_name?: string | null;
        tagline?: string | null;
        page_content?: unknown;
      };
      const whatsapp = row.contact_whatsapp ?? DEFAULT_SITE_SETTINGS.whatsapp;
      const social =
        row.social_links && typeof row.social_links === "object" && !Array.isArray(row.social_links)
          ? (row.social_links as Record<string, string>)
          : {};
      const brand = brandFromSettings(row);
      const pageContent = parsePageContent(row.page_content);
      const siteBlock = pageContent.site ?? {};
      const socialExt =
        social && typeof social === "object"
          ? (social as Record<string, string> & {
              corporate_phone?: string;
              corporate_phone_raw?: string;
              corporate_email?: string;
              corporate_hours?: string;
            })
          : {};

      return {
        phone: row.contact_phone ?? DEFAULT_SITE_SETTINGS.phone,
        phoneRaw: row.contact_phone_raw ?? DEFAULT_SITE_SETTINGS.phoneRaw,
        email: row.contact_email ?? DEFAULT_SITE_SETTINGS.email,
        whatsapp,
        whatsappBase: `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
        corporatePhone:
          socialExt.corporate_phone?.trim() || DEFAULT_SITE_SETTINGS.corporatePhone,
        corporatePhoneRaw:
          socialExt.corporate_phone_raw?.trim() || DEFAULT_SITE_SETTINGS.corporatePhoneRaw,
        corporateEmail:
          socialExt.corporate_email?.trim() || DEFAULT_SITE_SETTINGS.corporateEmail,
        corporateHours:
          socialExt.corporate_hours?.trim() || DEFAULT_SITE_SETTINGS.corporateHours,
        corporateWhatsappMessage:
          siteBlock.corporateWhatsappMessage?.trim() ||
          DEFAULT_SITE_SETTINGS.corporateWhatsappMessage,
        address: normalizeCompanyAddress(row.address, DEFAULT_SITE_SETTINGS.address),
        mapEmbedUrl: row.map_embed_url ?? "",
        businessHours: row.business_hours ?? DEFAULT_SITE_SETTINGS.businessHours,
        footerText: normalizeCompanyCopy(row.footer_text, DEFAULT_SITE_SETTINGS.footerText),
        socialLinks: Object.fromEntries(
          Object.entries(social).filter(
            ([key]) =>
              ![
                "corporate_phone",
                "corporate_phone_raw",
                "corporate_email",
                "corporate_hours",
              ].includes(key),
          ),
        ),
        legalName: brand.legalName,
        tagline: brand.tagline,
        logoUrl: row.logo_url ?? undefined,
        faviconUrl: row.favicon_url ?? undefined,
        pageContent,
        showInternational:
          typeof siteBlock.showInternational === "boolean"
            ? siteBlock.showInternational
            : SHOW_INTERNATIONAL,
        whatsappPreset:
          siteBlock.whatsappPreset?.trim() || DEFAULT_SITE_SETTINGS.whatsappPreset,
        seoTitle: siteBlock.seoTitle?.trim() || DEFAULT_SITE_SETTINGS.seoTitle,
        seoDescription:
          siteBlock.seoDescription?.trim() || DEFAULT_SITE_SETTINGS.seoDescription,
        commonPackageExclusions:
          siteBlock.commonPackageExclusions?.length
            ? siteBlock.commonPackageExclusions
            : DEFAULT_SITE_SETTINGS.commonPackageExclusions,
      };
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  });
}

async function fetchPublicHomepageSettingsImpl(): Promise<PublicHomepageSettings> {
  const defaultWhy = WHY_CHOOSE_US.map((w) => ({
    icon: w.icon,
    title: w.title,
    detail: w.detail,
  }));
  const defaultHow = HOW_IT_WORKS.map((s) => ({ n: s.n, title: s.title, detail: s.detail }));
  const defaultCorporate = CORPORATE_FEATURES.map((f) => ({
    icon: f.icon,
    title: f.title,
    detail: f.detail,
  }));
  const defaultTourTypes = TOUR_TYPES.map((t) => ({
    slug: t.slug,
    name: t.name,
    image: "",
  }));
  const defaultHero = DOMESTIC_STATES.slice(0, 10).map((d) => ({
    name: d.name,
    tag: d.name,
    image: "",
    slug: d.slug,
  }));

  const emptyFallback = (showInternational: boolean): PublicHomepageSettings => ({
    heroSlides: defaultHero,
    heroIntervalMs: 10_000,
    featuredPackageSlugs: PACKAGES.filter((p) => p.scope === "domestic" || showInternational)
      .slice(0, 10)
      .map((p) => p.slug),
    featuredServiceSlugs: SERVICES.map((s) => s.slug),
    featuredDestinationSlugs: DOMESTIC_STATES.slice(0, 10).map((d) => d.slug),
    aboutTitle: "Your Journey, Our Priority",
    aboutContent:
      "Flights, hotels, holidays, cab, visa, insurance, & forex — handled by real travel experts on WhatsApp.",
    whyChooseUs: defaultWhy,
    howItWorks: defaultHow,
    corporateFeatures: defaultCorporate,
    tourTypes: defaultTourTypes,
    holidayThemes: [...HOLIDAY_THEMES],
    stats: [],
    ctaTitle: "",
    ctaSubtitle: "",
  });

  return cachedPublic("homepage-settings", async () => {
  try {
    const showInternational = await resolveShowInternationalImpl();
    const { getHomepageSettings } = await import("@/lib/db-queries/homepage");
    const data = await getHomepageSettings();

    if (!data) return emptyFallback(showInternational);

    const row = data as HomepageRowExtended;
    const whyRaw = Array.isArray(row.why_choose_us) ? row.why_choose_us : [];
    const statsRaw = Array.isArray(row.stats) ? row.stats : [];
    const howRaw = Array.isArray(row.how_it_works) ? row.how_it_works : [];
    const corpRaw = Array.isArray(row.corporate_features) ? row.corporate_features : [];
    const tourRaw = Array.isArray(row.tour_types) ? row.tour_types : [];
    const themesRaw = Array.isArray(row.holiday_themes) ? row.holiday_themes : [];
    const heroRaw = Array.isArray(row.hero_slides) ? row.hero_slides : [];
    const rowExt = row as HomepageRowExtended & { hero_interval_ms?: number | null };
    const intervalRaw = Number(rowExt.hero_interval_ms);
    // Floor at 5s so a mis-set 1–2s interval cannot make the hero look broken.
    const heroIntervalMs =
      Number.isFinite(intervalRaw) && intervalRaw >= 1000
        ? Math.min(120_000, Math.max(5_000, intervalRaw))
        : 10_000;

    const heroSlides =
      heroRaw.length > 0
        ? heroRaw.slice(0, 10).map((item) => {
            const h = item as { name?: string; tag?: string; image?: string; slug?: string };
            const image = h.image ?? "";
            return {
              name: h.name ?? "",
              tag: h.tag ?? "",
              image: isHardcodedStockImage(image) ? "" : preferWebpImage(image),
              slug: h.slug,
            };
          })
        : defaultHero;

    return {
      heroSlides,
      heroIntervalMs,
      featuredPackageSlugs: row.featured_package_slugs ?? [],
      featuredServiceSlugs: row.featured_service_slugs ?? [],
      featuredDestinationSlugs: row.featured_destination_slugs ?? [],
      aboutTitle: row.about_title ?? emptyFallback(showInternational).aboutTitle,
      aboutContent: normalizeCompanyCopy(
        row.about_content,
        emptyFallback(showInternational).aboutContent,
      ),
      whyChooseUs:
        whyRaw.length > 0
          ? whyRaw.map((item) => {
              const w = item as { icon?: string; title?: string; detail?: string };
              return {
                icon: w.icon ?? "Sparkles",
                title: w.title ?? "",
                detail: w.detail ?? "",
              };
            })
          : defaultWhy,
      howItWorks:
        howRaw.length > 0
          ? howRaw.map((item) => {
              const s = item as { n?: number; title?: string; detail?: string };
              return { n: Number(s.n) || 0, title: s.title ?? "", detail: s.detail ?? "" };
            })
          : defaultHow,
      corporateFeatures:
        corpRaw.length > 0
          ? corpRaw.map((item) => {
              const f = item as { icon?: string; title?: string; detail?: string };
              return {
                icon: f.icon ?? "Briefcase",
                title: f.title ?? "",
                detail: f.detail ?? "",
              };
            })
          : defaultCorporate,
      tourTypes:
        tourRaw.length > 0
          ? tourRaw.map((item) => {
              const t = item as { slug?: string; name?: string; image?: string };
              const image = t.image ?? "";
              return {
                slug: t.slug ?? "",
                name: t.name ?? "",
                image: isHardcodedStockImage(image) ? "" : preferWebpImage(image),
              };
            })
          : defaultTourTypes,
      holidayThemes:
        themesRaw.length > 0
          ? themesRaw.map((t) => String(t))
          : [...HOLIDAY_THEMES],
      stats: statsRaw.map((item) => {
        const s = item as { label?: string; value?: string };
        return { label: s.label ?? "", value: s.value ?? "" };
      }),
      ctaTitle: row.cta_title ?? "",
      ctaSubtitle: row.cta_subtitle ?? "",
    };
  } catch {
    return emptyFallback(SHOW_INTERNATIONAL);
  }
  });
}

export async function fetchSitemapPackageSlugs(): Promise<string[]> {
  const packages = await fetchPublicPackagesImpl();
  return packages.map((p) => p.slug);
}

export async function fetchSitemapBlogSlugs(): Promise<string[]> {
  const posts = await fetchPublicBlogPostsImpl();
  return posts.map((p) => p.slug);
}

function isHardcodedStockImage(url: string | null | undefined): boolean {
  const value = url?.trim() ?? "";
  if (!value) return false;
  return value.includes("images.unsplash.com") || value.includes("unsplash.com/");
}

function mapStaticDestination(d: Destination, scope: "domestic" | "international"): PublicDestination {
  return {
    ...d,
    scope,
    name: toTitleCase(d.name),
    // Static seeds use Unsplash — do not serve those on the public site.
    image: isHardcodedStockImage(d.image) ? "" : d.image,
  };
}

function mapDbDestination(row: DestinationRow): PublicDestination {
  const image = sanitizePublicImageUrl(row.image_url);
  return {
    slug: row.slug,
    name: toTitleCase(row.name),
    region: row.region,
    image: isHardcodedStockImage(image) ? "" : image,
    blurb: row.blurb ?? "",
    highlights: row.highlights ?? [],
    scope: row.scope,
  };
}

function enrichDestinationFromStatic(
  dest: PublicDestination,
  scope: "domestic" | "international",
): PublicDestination {
  const seed =
    scope === "international"
      ? INTERNATIONAL_COUNTRIES.find((d) => d.slug === dest.slug)
      : DOMESTIC_STATES.find((d) => d.slug === dest.slug);
  if (!seed) return { ...dest, scope: dest.scope ?? scope };
  // Copy text from seeds only — never overwrite CMS/DB images with hardcoded Unsplash.
  return {
    ...dest,
    scope: dest.scope ?? scope,
    blurb: dest.blurb?.trim() ? dest.blurb : seed.blurb || dest.blurb,
    highlights: dest.highlights?.length ? dest.highlights : seed.highlights?.length ? seed.highlights : dest.highlights,
    region: dest.region || seed.region,
  };
}

function staticDestinations(
  scope: "domestic" | "international" | "all" | undefined,
  showInternational: boolean,
): PublicDestination[] {
  const domestic = DOMESTIC_STATES.map((d) => mapStaticDestination(d, "domestic"));
  if (!showInternational) {
    return scope === "international" ? [] : domestic;
  }
  const international = INTERNATIONAL_COUNTRIES.map((d) => mapStaticDestination(d, "international"));
  if (scope === "domestic") return domestic;
  if (scope === "international") return international;
  return [...domestic, ...international];
}

async function fetchPublicDestinationsImpl(
  scope?: "domestic" | "international" | "all",
): Promise<PublicDestination[]> {
  const scopeKey = scope ?? "all";
  return cachedPublic(`destinations:${scopeKey}`, async () => {
    const showInternational = await resolveShowInternationalImpl();
    try {
      const { listActiveDestinations } = await import("@/lib/db-queries/destinations");
      let data: DestinationRow[];
      if (scope && scope !== "all") {
        data = await listActiveDestinations(scope);
      } else if (!showInternational) {
        data = await listActiveDestinations("domestic");
      } else {
        data = await listActiveDestinations();
      }

      if (!data?.length) {
        return staticDestinations(scope ?? "all", showInternational);
      }

      const rows = data;
      const mapped = rows.map((row) =>
        enrichDestinationFromStatic(mapDbDestination(row), row.scope),
      );
      if (!showInternational && scope !== "international") {
        return mapped.filter((_, i) => rows[i]?.scope !== "international");
      }
      return mapped;
    } catch {
      return staticDestinations(scope ?? "all", showInternational);
    }
  });
}

async function fetchPublicDestinationBySlugImpl(
  slug: string,
  scope: "domestic" | "international",
): Promise<PublicDestination | null> {
  const showInternational = await resolveShowInternationalImpl();
  if (!showInternational && scope === "international") return null;

  try {
    const { getDestinationBySlug } = await import("@/lib/db-queries/destinations");
    const data = await getDestinationBySlug(slug, scope);

    if (!data) {
      const list = scope === "domestic" ? DOMESTIC_STATES : INTERNATIONAL_COUNTRIES;
      return list.find((d) => d.slug === slug) ?? null;
    }
    return enrichDestinationFromStatic(mapDbDestination(data), scope);
  } catch {
    const list = scope === "domestic" ? DOMESTIC_STATES : INTERNATIONAL_COUNTRIES;
    return list.find((d) => d.slug === slug) ?? null;
  }
}

function parseContentBlocks(value: unknown): PublicServiceContentBlocks {
  if (!value || typeof value !== "object") return {};
  const raw = value as PublicServiceContentBlocks;
  const mapFeature = (f: PublicServiceFeature): PublicServiceFeature => {
    const rawImage = f.image ? String(f.image) : undefined;
    const image =
      rawImage && !isHardcodedStockImage(rawImage)
        ? preferWebpImage(rawImage)
        : undefined;
    const points = Array.isArray(f.points)
      ? f.points.map((p) => String(p).trim()).filter(Boolean)
      : undefined;
    return {
      icon: String(f.icon ?? "Sparkles"),
      title: String(f.title ?? ""),
      detail: String(f.detail ?? ""),
      ...(image ? { image } : {}),
      ...(f.accent ? { accent: f.accent } : {}),
      ...(points && points.length ? { points } : {}),
    };
  };

  const strList = (value: unknown): string[] =>
    Array.isArray(value)
      ? value.map((v) => String(v).trim()).filter(Boolean)
      : [];

  return {
    heroTitle: raw.heroTitle,
    sectionTitle: raw.sectionTitle,
    detailedSectionTitle: raw.detailedSectionTitle,
    eyebrow: raw.eyebrow,
    titleFirst: raw.titleFirst,
    titleAccent: raw.titleAccent,
    layout: raw.layout,
    heroBannerUrl: raw.heroBannerUrl
      ? preferWebpImage(String(raw.heroBannerUrl))
      : undefined,
    features: Array.isArray(raw.features) ? raw.features.map(mapFeature) : [],
    detailedServices: Array.isArray(raw.detailedServices)
      ? raw.detailedServices.map(mapFeature)
      : [],
    heroBullets: strList(raw.heroBullets),
    ribbon: Array.isArray(raw.ribbon) ? raw.ribbon.map(mapFeature) : [],
    whyChoose: Array.isArray(raw.whyChoose) ? raw.whyChoose.map(mapFeature) : [],
    whyUs: Array.isArray(raw.whyUs) ? raw.whyUs.map(mapFeature) : [],
    catalogItems: Array.isArray(raw.catalogItems)
      ? raw.catalogItems.map(mapFeature)
      : [],
    catalogSectionTitle: raw.catalogSectionTitle,
    catalogSectionLead: raw.catalogSectionLead,
    servicesLead: raw.servicesLead,
    whyChooseLead: raw.whyChooseLead,
    detailedLead: raw.detailedLead,
    whyUsLead: raw.whyUsLead,
    proposalLead: raw.proposalLead,
    whyChooseTitle: raw.whyChooseTitle,
    whyUsTitle: raw.whyUsTitle,
    proposalTitle: raw.proposalTitle,
    partnershipCallout: raw.partnershipCallout,
    ctaTitle: raw.ctaTitle,
    ctaSubtitle: raw.ctaSubtitle,
    ctaButtonLabel: raw.ctaButtonLabel,
    heroBadges: Array.isArray(raw.heroBadges) ? raw.heroBadges.map(mapFeature) : [],
    trustItems: Array.isArray(raw.trustItems) ? raw.trustItems.map(mapFeature) : [],
    trustFooter: Array.isArray(raw.trustFooter) ? raw.trustFooter.map(mapFeature) : [],
    whySectionTitle: raw.whySectionTitle,
    proposalServiceOptions: strList(raw.proposalServiceOptions),
    proposalMonths: strList(raw.proposalMonths),
    proposalRequirements: strList(raw.proposalRequirements),
    steps: Array.isArray(raw.steps) ? raw.steps : [],
    visaCountries: Array.isArray(raw.visaCountries) ? raw.visaCountries : [],
  };
}

function serviceNavPath(slug: string): string {
  if (slug === "packages") return "/holiday-packages";
  if (slug === "corporate") return "/corporate";
  return `/services/${slug}`;
}

function mapDbService(row: ServiceRow): PublicService {
  const blocks = parseContentBlocks(row.content_blocks);
  const inclusions = Array.isArray(row.inclusions)
    ? row.inclusions.map((v) => String(v).trim()).filter(Boolean)
    : [];
  const exclusions = Array.isArray(row.exclusions)
    ? row.exclusions.map((v) => String(v).trim()).filter(Boolean)
    : [];
  const faqsRaw = Array.isArray(row.faqs) ? row.faqs : [];
  const faqs = faqsRaw
    .map((f) => {
      if (!f || typeof f !== "object") return null;
      const rowFaq = f as { question?: string; answer?: string };
      const question = String(rowFaq.question ?? "").trim();
      const answer = String(rowFaq.answer ?? "").trim();
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((f): f is PublicServiceFaq => f != null);

  return {
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description ?? "",
    description: row.description ?? row.short_description ?? "",
    icon: row.icon ?? "Sparkles",
    bannerUrl: isHardcodedStockImage(row.banner_url)
      ? undefined
      : row.banner_url
        ? preferWebpImage(row.banner_url)
        : undefined,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    inclusions,
    exclusions,
    faqs,
    contentBlocks: blocks,
  };
}

function staticServiceBlocks(slug: string): PublicServiceContentBlocks {
  if (slug === "packages") {
    return {
      layout: "holiday",
      eyebrow: "Holiday packages",
      titleFirst: "Holidays you'll",
      titleAccent: "Remember",
      sectionTitle: "Browse by region",
    };
  }
  if (slug === "corporate") {
    return {
      layout: "corporate",
      titleFirst: "Corporate & MICE",
      titleAccent: "Travel Solutions",
      sectionTitle: "Our Corporate Services",
    };
  }
  return {};
}

function staticServices(): PublicService[] {
  return SERVICES.map((s) => ({
    slug: s.slug,
    title: s.title,
    shortDescription: s.short,
    description:
      s.slug === "corporate"
        ? "Business travel made simple with dedicated support, GST invoicing & negotiated corporate fares."
        : s.short,
    icon: s.icon,
    contentBlocks: staticServiceBlocks(s.slug),
  }));
}

async function fetchPublicServicesImpl(): Promise<PublicService[]> {
  return cachedPublic("services", async () => {
    try {
      const { listActiveServices } = await import("@/lib/db-queries/services");
      const data = await listActiveServices();

      if (!data?.length) return staticServices();
      return data.map(mapDbService);
    } catch {
      return staticServices();
    }
  });
}

async function fetchPublicServiceBySlugImpl(slug: string): Promise<PublicService | null> {
  return cachedPublic(`service:${slug}`, async () => {
    try {
      const { getServiceBySlug } = await import("@/lib/db-queries/services");
      const data = await getServiceBySlug(slug);

      if (data) return mapDbService(data);
    } catch {
      // fall through to static data
    }

    return staticServices().find((s) => s.slug === slug) ?? null;
  });
}

async function fetchPublicNavLinksImpl(): Promise<PublicNavLink[]> {
  const services = await fetchPublicServicesImpl();
  return services.map((s) => ({
    to: serviceNavPath(s.slug),
    title: s.title,
    slug: s.slug,
    icon: s.icon,
    shortDescription: s.shortDescription,
  }));
}

export async function fetchSitemapDestinationSlugs(
  scope: "domestic" | "international",
): Promise<string[]> {
  const destinations = await fetchPublicDestinationsImpl(scope);
  return destinations.map((d) => d.slug);
}

export async function fetchSitemapServiceSlugs(): Promise<string[]> {
  const services = await fetchPublicServicesImpl();
  return services.map((s) => s.slug);
}


/* —— isomorphic exports: loaders run on client, so DB reads go through server fns —— */
const resolveShowInternationalFn = createServerFn({ method: "GET" }).handler(async () =>
  resolveShowInternationalImpl(),
);
export async function resolveShowInternational(): Promise<boolean> {
  return resolveShowInternationalFn();
}

const fetchPublicPackagesFn = createServerFn({ method: "GET" })
  .validator((data: PackageFilters | null | undefined) => data ?? null)
  .handler(async ({ data }) => fetchPublicPackagesImpl(data ?? undefined));
export async function fetchPublicPackages(filters?: PackageFilters): Promise<PublicPackage[]> {
  return fetchPublicPackagesFn({ data: filters ?? null });
}

const fetchPublicPackageBySlugFn = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler(async ({ data }) => fetchPublicPackageBySlugImpl(data));
export async function fetchPublicPackageBySlug(slug: string): Promise<PublicPackage | null> {
  return fetchPublicPackageBySlugFn({ data: slug });
}

const fetchPublicBlogPostsFn = createServerFn({ method: "GET" }).handler(async () =>
  fetchPublicBlogPostsImpl(),
);
export async function fetchPublicBlogPosts(): Promise<PublicBlogPost[]> {
  return fetchPublicBlogPostsFn();
}

const fetchPublicBlogPostBySlugFn = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler(async ({ data }) => fetchPublicBlogPostBySlugImpl(data));
export async function fetchPublicBlogPostBySlug(slug: string): Promise<PublicBlogPost | null> {
  return fetchPublicBlogPostBySlugFn({ data: slug });
}

const fetchPublicFaqsFn = createServerFn({ method: "GET" }).handler(async () => fetchPublicFaqsImpl());
export async function fetchPublicFaqs(): Promise<PublicFaq[]> {
  return fetchPublicFaqsFn();
}

const fetchPublicGalleryFn = createServerFn({ method: "GET" }).handler(async () =>
  fetchPublicGalleryImpl(),
);
export async function fetchPublicGallery(): Promise<PublicGalleryImage[]> {
  return fetchPublicGalleryFn();
}

const fetchPublicTestimonialsFn = createServerFn({ method: "GET" }).handler(async () =>
  fetchPublicTestimonialsImpl(),
);
export async function fetchPublicTestimonials(): Promise<PublicTestimonial[]> {
  return fetchPublicTestimonialsFn();
}

const fetchPublicSiteSettingsFn = createServerFn({ method: "GET" }).handler(async () =>
  fetchPublicSiteSettingsImpl(),
);
export async function fetchPublicSiteSettings(): Promise<PublicSiteSettings> {
  return fetchPublicSiteSettingsFn();
}

const fetchPublicHomepageSettingsFn = createServerFn({ method: "GET" }).handler(async () =>
  fetchPublicHomepageSettingsImpl(),
);
export async function fetchPublicHomepageSettings(): Promise<PublicHomepageSettings> {
  return fetchPublicHomepageSettingsFn();
}

type DestScope = "all" | "domestic" | "international";
const fetchPublicDestinationsFn = createServerFn({ method: "GET" })
  .validator((data: DestScope) => data)
  .handler(async ({ data }) => fetchPublicDestinationsImpl(data));
export async function fetchPublicDestinations(
  scope: DestScope = "all",
): Promise<PublicDestination[]> {
  return fetchPublicDestinationsFn({ data: scope });
}

const fetchPublicDestinationBySlugFn = createServerFn({ method: "GET" })
  .validator((data: { slug: string; scope: "domestic" | "international" }) => data)
  .handler(async ({ data }) => fetchPublicDestinationBySlugImpl(data.slug, data.scope));
export async function fetchPublicDestinationBySlug(
  slug: string,
  scope: "domestic" | "international",
): Promise<PublicDestination | null> {
  return fetchPublicDestinationBySlugFn({ data: { slug, scope } });
}

const fetchPublicServicesFn = createServerFn({ method: "GET" }).handler(async () =>
  fetchPublicServicesImpl(),
);
export async function fetchPublicServices(): Promise<PublicService[]> {
  return fetchPublicServicesFn();
}

const fetchPublicServiceBySlugFn = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler(async ({ data }) => fetchPublicServiceBySlugImpl(data));
export async function fetchPublicServiceBySlug(slug: string): Promise<PublicService | null> {
  return fetchPublicServiceBySlugFn({ data: slug });
}

const fetchPublicNavLinksFn = createServerFn({ method: "GET" }).handler(async () =>
  fetchPublicNavLinksImpl(),
);
export async function fetchPublicNavLinks(): Promise<PublicNavLink[]> {
  return fetchPublicNavLinksFn();
}

