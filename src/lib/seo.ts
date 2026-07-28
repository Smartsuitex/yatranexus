import { COMPANY } from "@/lib/site-data";

export const DEFAULT_OG_IMAGE = "/images/hero/holiday-packages-hero-desktop.webp";
export const DEFAULT_SITE_URL = "https://yatranexus.com";

export type PageSeoInput = {
  path: string;
  title: string;
  description: string;
  image?: string | null;
  type?: "website" | "article" | "product";
  noIndex?: boolean;
  keywords?: string;
  /** When false, skip canonical/og:url (use for root defaults only). */
  includeCanonical?: boolean;
};

export type SeoHeadResult = {
  meta: Array<Record<string, string>>;
  links: Array<{ rel: string; href: string }>;
  scripts: Array<{ type: string; children: string }>;
};

/** Canonical production origin for sitemap, OG, and JSON-LD. */
export function getSiteUrl(): string {
  const raw =
    process.env.SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    process.env.VITE_SITE_URL ||
    (typeof import.meta !== "undefined"
      ? (import.meta.env?.VITE_SITE_URL as string | undefined)
      : undefined) ||
    DEFAULT_SITE_URL;
  return String(raw).replace(/\/$/, "");
}

export function absoluteUrl(path = "/"): string {
  const origin = getSiteUrl();
  if (!path || path === "/") return `${origin}/`;
  if (/^https?:\/\//i.test(path)) return path;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteImageUrl(src?: string | null, fallback = DEFAULT_OG_IMAGE): string {
  const value = (src?.trim() || fallback).trim();
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  return absoluteUrl(value.startsWith("/") ? value : `/${value}`);
}

function truncate(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]): {
  type: string;
  children: string;
} {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}

export function organizationJsonLd(extras?: {
  phone?: string;
  email?: string;
  address?: string;
}): Record<string, unknown> {
  const phone = extras?.phone?.trim() || COMPANY.phone;
  const email = extras?.email?.trim() || COMPANY.email;
  const address = extras?.address?.trim() || COMPANY.address;

  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "Organization", "LocalBusiness"],
    "@id": `${getSiteUrl()}/#organization`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: getSiteUrl(),
    logo: absoluteImageUrl("/images/logo/yatranexus-full-logo.jpg"),
    image: absoluteImageUrl(DEFAULT_OG_IMAGE),
    description:
      "Ahmedabad travel agency for flights, hotels, holiday packages, cabs, visa, travel insurance and forex — Your Journey, Our Priority.",
    email,
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380052",
      addressCountry: "IN",
    },
    areaServed: ["IN", "Worldwide"],
    priceRange: "₹₹",
    sameAs: [],
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    name: COMPANY.name,
    url: getSiteUrl(),
    publisher: { "@id": `${getSiteUrl()}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${getSiteUrl()}/holiday-packages?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    ],
  };
}

export function faqPageJsonLd(
  faqs: Array<{ q: string; a: string }>,
): Record<string, unknown> | null {
  const mainEntity = faqs
    .filter((f) => f.q?.trim() && f.a?.trim())
    .map((f) => ({
      "@type": "Question",
      name: f.q.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a.trim(),
      },
    }));
  if (mainEntity.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

export function travelPackageJsonLd(input: {
  name: string;
  description: string;
  image?: string | null;
  path: string;
  priceLabel?: string | null;
  destination?: string | null;
  days?: number | null;
  nights?: number | null;
}): Record<string, unknown> {
  const priceDigits = input.priceLabel?.replace(/[^\d.]/g, "") || undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: truncate(input.description, 300),
    image: absoluteImageUrl(input.image),
    url: absoluteUrl(input.path),
    brand: { "@type": "Brand", name: COMPANY.name },
    category: "Holiday Package",
    ...(input.destination
      ? {
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Destination",
              value: input.destination,
            },
            ...(input.days
              ? [{ "@type": "PropertyValue", name: "Days", value: String(input.days) }]
              : []),
            ...(input.nights
              ? [{ "@type": "PropertyValue", name: "Nights", value: String(input.nights) }]
              : []),
          ],
        }
      : {}),
    ...(priceDigits
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: priceDigits,
            availability: "https://schema.org/InStock",
            url: absoluteUrl(input.path),
            seller: { "@id": `${getSiteUrl()}/#organization` },
          },
        }
      : {}),
  };
}

export function blogPostJsonLd(input: {
  title: string;
  description: string;
  image?: string | null;
  path: string;
  publishedAt?: string | null;
  updatedAt?: string | null;
  author?: string | null;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: truncate(input.description, 300),
    image: absoluteImageUrl(input.image),
    url: absoluteUrl(input.path),
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.publishedAt || undefined,
    dateModified: input.updatedAt || input.publishedAt || undefined,
    author: {
      "@type": "Person",
      name: input.author?.trim() || COMPANY.name,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteImageUrl("/images/logo/yatranexus-full-logo.jpg"),
      },
    },
  };
}

/** Build title/description/OG/Twitter/canonical tags for a public page. */
export function buildPageSeo(input: PageSeoInput): SeoHeadResult {
  const title = input.title.trim();
  const description = truncate(input.description);
  const url = absoluteUrl(input.path);
  const image = absoluteImageUrl(input.image);
  const type = input.type ?? "website";
  const includeCanonical = input.includeCanonical !== false;

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    {
      name: "robots",
      content: input.noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    },
    { name: "author", content: COMPANY.name },
    { name: "geo.region", content: "IN-GJ" },
    { name: "geo.placename", content: "Ahmedabad" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:site_name", content: COMPANY.name },
    { property: "og:locale", content: "en_IN" },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  if (includeCanonical) {
    meta.push({ property: "og:url", content: url });
  }

  if (input.keywords?.trim()) {
    meta.push({ name: "keywords", content: input.keywords.trim() });
  }

  return {
    meta,
    links: includeCanonical ? [{ rel: "canonical", href: url }] : [],
    scripts: [],
  };
}

export function mergeSeoHead(
  base: SeoHeadResult,
  extra?: {
    meta?: Array<Record<string, string>>;
    links?: Array<{ rel: string; href: string }>;
    scripts?: Array<{ type: string; children: string }>;
    jsonLd?: Array<Record<string, unknown> | null | undefined>;
  },
): SeoHeadResult {
  const scripts = [
    ...base.scripts,
    ...(extra?.scripts ?? []),
    ...(extra?.jsonLd ?? [])
      .filter((item): item is Record<string, unknown> => Boolean(item))
      .map(jsonLdScript),
  ];
  return {
    meta: [...base.meta, ...(extra?.meta ?? [])],
    links: [...base.links, ...(extra?.links ?? [])],
    scripts,
  };
}
