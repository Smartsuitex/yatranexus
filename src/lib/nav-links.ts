import type { PublicNavLink } from "@/lib/public-cms";

/** Slugs with dedicated route files (avoid /services/$slug ambiguity warnings). */
const DEDICATED_SERVICE_ROUTES = {
  cabs: "/services/cabs",
  flights: "/services/flights",
  hotels: "/services/hotels",
  visa: "/services/visa",
  insurance: "/services/insurance",
  forex: "/services/forex",
  packages: "/holiday-packages",
  corporate: "/corporate",
} as const;

type DedicatedServiceRoute =
  (typeof DEDICATED_SERVICE_ROUTES)[keyof typeof DEDICATED_SERVICE_ROUTES];

export type PublicNavRoute =
  | { to: "/holiday-packages" }
  | { to: "/corporate" }
  | { to: DedicatedServiceRoute }
  | { to: "/services/$slug"; params: { slug: string } };

export function serviceSlugRoute(slug: string): PublicNavRoute {
  const dedicated =
    DEDICATED_SERVICE_ROUTES[slug as keyof typeof DEDICATED_SERVICE_ROUTES];
  if (dedicated) return { to: dedicated };
  return { to: "/services/$slug", params: { slug } };
}

export function publicNavLinkRoute(item: PublicNavLink): PublicNavRoute {
  if (item.to === "/holiday-packages") return { to: "/holiday-packages" };
  if (item.to === "/corporate") return { to: "/corporate" };
  if (item.slug) return serviceSlugRoute(item.slug);
  return { to: "/services" };
}

export type HomeServiceLink = {
  slug: string;
  title: string;
  icon: string;
  kind: "service" | "packages";
};

export function homeServiceLinkRoute(item: HomeServiceLink): PublicNavRoute {
  if (item.kind === "packages") return { to: "/holiday-packages" };
  return serviceSlugRoute(item.slug);
}
