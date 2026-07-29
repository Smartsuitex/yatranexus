import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  RegionBrowseSelector,
  type RegionBrowseView,
} from "@/components/site/RegionBrowseSelector";
import { OverlayImageCard } from "@/components/site/OverlayImageCard";
import { PackagePriceLabel } from "@/components/site/PackagePriceLabel";
import { useSiteConfig } from "@/contexts/site-config";
import type { PackageFilters, PublicDestination, PublicPackage } from "@/lib/public-cms";
import { filterPackages, packageMatchesDestination, parsePrice } from "@/lib/public-cms";
import { cn } from "@/lib/utils";

type Props = {
  packages: PublicPackage[];
  showScopeTabs?: boolean;
  title?: string;
  domesticDestinations?: PublicDestination[];
  internationalDestinations?: PublicDestination[];
  /** When true, packages are hidden until the user picks a state/country. */
  requireDestination?: boolean;
  initialDestination?: string;
};

function countPackagesForPlace(
  packages: PublicPackage[],
  place: PublicDestination,
  scope: PackageFilters["scope"],
) {
  const scoped =
    scope && scope !== "all" ? packages.filter((p) => p.scope === scope) : packages;
  return scoped.filter((p) => packageMatchesDestination(p, place)).length;
}

function buildPackageCounts(
  packages: PublicPackage[],
  destinations: PublicDestination[],
  scope: PackageFilters["scope"],
) {
  const counts: Record<string, number> = {};
  for (const place of destinations) {
    counts[place.name.toLowerCase()] = countPackagesForPlace(packages, place, scope);
  }
  return counts;
}

export function PackageSearchPanel({
  packages,
  showScopeTabs = true,
  title,
  domesticDestinations = [],
  internationalDestinations = [],
  requireDestination = false,
  initialDestination = "",
}: Props) {
  const { showInternational } = useSiteConfig();
  const [filters, setFilters] = useState<PackageFilters>({
    scope: requireDestination || !showInternational ? "domestic" : "all",
    search: "",
    destination: initialDestination,
    minPrice: undefined,
    maxPrice: undefined,
    minNights: undefined,
    maxNights: undefined,
  });

  useEffect(() => {
    if (initialDestination) {
      setFilters((f) => ({ ...f, destination: initialDestination }));
    }
  }, [initialDestination]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [regionView, setRegionView] = useState<RegionBrowseView>("cards");

  const scopeOptions = showInternational
    ? requireDestination
      ? (["domestic", "international"] as const)
      : (["all", "domestic", "international"] as const)
    : (["domestic"] as const);

  const scopeLabel = (scope: (typeof scopeOptions)[number]) => {
    if (scope === "all") return "All";
    if (scope === "domestic") return "Domestic";
    return "International";
  };

  const hasDestination = Boolean(filters.destination?.trim());
  const showPackages = !requireDestination || hasDestination;

  const results = useMemo(() => {
    if (!showPackages) return [];
    return filterPackages(packages, filters, showInternational);
  }, [packages, filters, showPackages, showInternational]);

  const activeDestinations =
    filters.scope === "domestic"
      ? domesticDestinations
      : filters.scope === "international"
        ? internationalDestinations
        : [];

  const regionKind = filters.scope === "international" ? "country" : "state";
  const regionLabel = regionKind === "country" ? "country" : "state";

  const packageCounts = useMemo(
    () => buildPackageCounts(packages, activeDestinations, filters.scope),
    [packages, activeDestinations, filters.scope],
  );

  function selectRegion(name: string) {
    setFilters((f) => ({ ...f, destination: name }));
  }

  function clearRegion() {
    setFilters((f) => ({ ...f, destination: "" }));
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5">
        {title && <h2 className="font-display text-lg font-semibold">{title}</h2>}
        <div className={cn("flex flex-col gap-4", title && "mt-4")}>
          {showScopeTabs && scopeOptions.length > 1 && (
            <div className="overflow-x-auto overflow-touch -mx-1 px-1">
              <div className="flex w-max min-w-full rounded-full border border-border p-1">
                {scopeOptions.map((scope) => (
                  <button
                    key={scope}
                    type="button"
                    onClick={() => setFilters((f) => ({ ...f, scope, destination: "" }))}
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium capitalize transition sm:px-4",
                      filters.scope === scope
                        ? "bg-brand-gradient text-white"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {scopeLabel(scope)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeDestinations.length > 0 && (
            <RegionBrowseSelector
              destinations={activeDestinations}
              selectedName={filters.destination ?? ""}
              regionKind={regionKind}
              view={regionView}
              onViewChange={setRegionView}
              onSelect={selectRegion}
              onClear={clearRegion}
              packageCounts={packageCounts}
              hideAllOption={requireDestination}
            />
          )}

          {showPackages && (
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="relative min-w-0 flex-1 sm:min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search packages…"
                  value={filters.search ?? ""}
                  onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                  className="w-full rounded-full border border-input bg-background py-2 pl-9 pr-4 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowAdvanced((v) => !v)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium sm:w-auto"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
            </div>
          )}
        </div>

        {showPackages && showAdvanced && (
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <input
              type="number"
              placeholder="Min price (₹)"
              value={filters.minPrice ?? ""}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Max price (₹)"
              value={filters.maxPrice ?? ""}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Min nights"
              value={filters.minNights ?? ""}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  minNights: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Max nights"
              value={filters.maxNights ?? ""}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  maxNights: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        )}

        <p className="mt-3 text-sm text-muted-foreground">
          {!showPackages ? (
            <>Select a {regionLabel} above to view packages.</>
          ) : (
            <>
              {results.length} package{results.length === 1 ? "" : "s"} found
              {filters.destination?.trim() ? (
                <>
                  {" "}
                  in <span className="font-medium text-foreground">{filters.destination}</span>
                </>
              ) : null}
            </>
          )}
        </p>
      </div>

      {!showPackages ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/20 py-16 text-center">
          <p className="font-display text-lg font-semibold text-[color:var(--brand-navy-deep)]">
            Choose a {regionLabel} to get started
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Packages stay hidden until you pick a {regionLabel}. Click any card above to see package
            names and details for that destination.
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No packages found for {filters.destination}. Try another {regionLabel} or adjust filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {results.map((p) => (
            <OverlayImageCard
              key={p.slug}
              to="/holiday-packages/package/$slug"
              params={{ slug: p.slug }}
              image={p.image}
              imageAlt={p.title}
              aspect="wide"
            >
              <p className="home-dest-card__tagline">
                {p.nights}N / {p.days}D · {p.destination}
                {showInternational && <> · {p.scope}</>}
              </p>
              <h3 className="home-dest-card__name">{p.title}</h3>
              <PackagePriceLabel
                amount={p.fromPrice}
                prefix="starting"
                discountPrice={p.discountPrice}
              />
            </OverlayImageCard>
          ))}
        </div>
      )}
    </div>
  );
}

export { parsePrice };
