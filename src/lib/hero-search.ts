import type { PublicDestination, PublicPackage } from "@/lib/public-cms";

export type HeroSearchPackage = {
  slug: string;
  title: string;
  destination: string;
};

export type HeroSearchDestination = {
  slug: string;
  name: string;
  scope: "domestic" | "international";
};

export type HeroSearchTarget =
  | { kind: "package"; slug: string }
  | { kind: "destination"; scope: "domestic" | "international"; slug: string }
  | { kind: "packages-hub"; query: string };

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function findDestination(
  query: string,
  destinations: HeroSearchDestination[],
): HeroSearchDestination | undefined {
  const q = normalize(query);
  const qSlug = slugify(query);

  const exact = destinations.find((d) => normalize(d.name) === q || d.slug === qSlug);
  if (exact) return exact;

  const startsWith = destinations.find(
    (d) => normalize(d.name).startsWith(q) || d.slug.startsWith(qSlug),
  );
  if (startsWith) return startsWith;

  return destinations.find(
    (d) =>
      normalize(d.name).includes(q) ||
      q.includes(normalize(d.name)) ||
      d.slug.includes(qSlug),
  );
}

/**
 * Resolve homepage hero search.
 * Prefers destination/state pages (e.g. Goa → /holiday-packages/domestic/goa).
 */
export function resolveHeroSearchTarget(
  query: string,
  packages: HeroSearchPackage[],
  destinations: HeroSearchDestination[] = [],
): HeroSearchTarget {
  const q = normalize(query);
  if (!q) return { kind: "packages-hub", query: "" };

  const dest = findDestination(query, destinations);
  if (dest) {
    return { kind: "destination", scope: dest.scope, slug: dest.slug };
  }

  // If a package title matches but no destination did, try its destination label
  // against known states before opening the package page.
  const qSlug = slugify(q);
  const matchedPackage =
    packages.find((p) => normalize(p.title) === q) ??
    packages.find((p) => p.slug === qSlug || normalize(p.slug.replace(/-/g, " ")) === q) ??
    packages.find((p) => normalize(p.title).startsWith(q)) ??
    packages.find((p) => normalize(p.title).includes(q));

  if (matchedPackage) {
    const fromPackageDest = findDestination(matchedPackage.destination, destinations);
    if (fromPackageDest) {
      return {
        kind: "destination",
        scope: fromPackageDest.scope,
        slug: fromPackageDest.slug,
      };
    }
    return { kind: "package", slug: matchedPackage.slug };
  }

  return { kind: "packages-hub", query: query.trim() };
}

export function toHeroSearchPackages(packages: PublicPackage[]): HeroSearchPackage[] {
  return packages.map((p) => ({
    slug: p.slug,
    title: p.title,
    destination: p.destination,
  }));
}

export function toHeroSearchDestinations(
  domestic: PublicDestination[],
  international: PublicDestination[] = [],
): HeroSearchDestination[] {
  return [
    ...domestic.map((d) => ({ slug: d.slug, name: d.name, scope: "domestic" as const })),
    ...international.map((d) => ({
      slug: d.slug,
      name: d.name,
      scope: "international" as const,
    })),
  ];
}
