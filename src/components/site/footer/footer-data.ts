import type { PublicNavLink } from "@/lib/public-cms";
import { publicNavLinkRoute } from "@/lib/nav-links";

export const FOOTER_COLORS = {
  cream: "#FFF9F2",
  purple: "#34235F",
  orange: "#F47C20",
  border: "#E9DED4",
} as const;

export const FOOTER_BRAND_COPY =
  "YatraNexus Ventures LLP creates memorable journeys across India and around the world with thoughtfully curated travel experiences.";

export type FooterNavItem = {
  label: string;
  to?: string;
  href?: string;
  params?: Record<string, string>;
};

/** Preferred Services column order (matches footer layout). */
const SERVICE_ORDER = [
  "corporate",
  "cabs",
  "flights",
  "hotels",
  "packages",
  "visa",
  "insurance",
  "forex",
] as const;

export const EXPLORE_LINKS: FooterNavItem[] = [
  { label: "Domestic Tours", to: "/holiday-packages/domestic" },
  { label: "International Tours", to: "/holiday-packages/international" },
  { label: "Corporate Travel", to: "/corporate" },
  { label: "Holiday Packages", to: "/holiday-packages" },
  { label: "Weekend Getaways", to: "/holiday-packages" },
  {
    label: "Honeymoon Packages",
    to: "/holiday-packages/tour/$type",
    params: { type: "honeymoon" },
  },
  {
    label: "Adventure Tours",
    to: "/holiday-packages/tour/$type",
    params: { type: "adventure" },
  },
  { label: "Visa Assistance", to: "/services/visa" },
  { label: "Travel Insurance", to: "/services/insurance" },
  { label: "Flight Booking", to: "/services/flights" },
  { label: "Hotel Booking", to: "/services/hotels" },
  { label: "Forex Card", to: "/services/forex" },
];

/** Company column — About / Contact / Blog. */
export const COMPANY_LINKS: FooterNavItem[] = [
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Blog", to: "/blog" },
];

export const TRUST_ITEMS = [
  { key: "secure", label: "Secure Booking", icon: "shield" },
  { key: "price", label: "Best Price Guarantee", icon: "badge" },
  { key: "support", label: "24×7 Customer Support", icon: "phone" },
  { key: "hotels", label: "Handpicked Hotels", icon: "hotel" },
  { key: "plan", label: "Personalized Travel Planning", icon: "plane" },
] as const;

export const PAYMENT_METHODS = [
  "Visa",
  "Mastercard",
  "RuPay",
  "UPI",
  "Google Pay",
  "Paytm",
] as const;

export const SOCIAL_KEYS = [
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "youtube", label: "YouTube" },
] as const;

/** Build Services footer links from CMS nav (+ All services), ordered for the 2-column layout. */
export function buildFooterServiceLinks(
  navLinks: PublicNavLink[],
): FooterNavItem[] {
  const orderIndex = new Map(
    SERVICE_ORDER.map((slug, i) => [slug, i] as const),
  );

  const sorted = [...navLinks].sort((a, b) => {
    const ai = a.slug != null ? (orderIndex.get(a.slug as (typeof SERVICE_ORDER)[number]) ?? 99) : 99;
    const bi = b.slug != null ? (orderIndex.get(b.slug as (typeof SERVICE_ORDER)[number]) ?? 99) : 99;
    return ai - bi;
  });

  const fromCms = sorted.map((item) => {
    const route = publicNavLinkRoute(item);
    if (route.to === "/services/$slug") {
      return {
        label: item.title,
        to: "/services/$slug",
        params: route.params,
      };
    }
    return { label: item.title, to: route.to };
  });

  const hasAllServices = fromCms.some(
    (l) => l.to === "/services" || l.label.toLowerCase() === "all services",
  );

  return hasAllServices
    ? fromCms
    : [{ label: "All services", to: "/services" }, ...fromCms];
}

export function splitServiceColumns(links: FooterNavItem[]): {
  left: FooterNavItem[];
  right: FooterNavItem[];
} {
  const mid = Math.ceil(links.length / 2);
  return {
    left: links.slice(0, mid),
    right: links.slice(mid),
  };
}
