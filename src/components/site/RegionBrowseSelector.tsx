import { LayoutGrid, LayoutList, MapPin } from "lucide-react";
import type { PublicDestination } from "@/lib/public-cms";
import { SafeImage } from "@/components/site/SafeImage";
import { cn } from "@/lib/utils";

export type RegionBrowseView = "cards" | "list";

type Props = {
  destinations: PublicDestination[];
  selectedName: string;
  regionKind: "state" | "country";
  view: RegionBrowseView;
  onViewChange: (view: RegionBrowseView) => void;
  onSelect: (name: string) => void;
  onClear: () => void;
  packageCounts?: Record<string, number>;
  /** Hide the “All states / All countries” option (packages require a specific region). */
  hideAllOption?: boolean;
};

export function RegionBrowseSelector({
  destinations,
  selectedName,
  regionKind,
  view,
  onViewChange,
  onSelect,
  onClear,
  packageCounts = {},
  hideAllOption = false,
}: Props) {
  const allLabel = regionKind === "country" ? "All countries" : "All states";
  const heading = regionKind === "country" ? "Browse by country" : "Browse by state";
  const selected = selectedName.trim().toLowerCase();

  function countFor(name: string) {
    return packageCounts[name.toLowerCase()] ?? 0;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {heading}
        </p>
        <div className="flex rounded-full border border-border p-0.5">
          <button
            type="button"
            onClick={() => onViewChange("cards")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition",
              view === "cards"
                ? "bg-brand-gradient text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={view === "cards"}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Cards
          </button>
          <button
            type="button"
            onClick={() => onViewChange("list")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition",
              view === "list"
                ? "bg-brand-gradient text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={view === "list"}
          >
            <LayoutList className="h-3.5 w-3.5" />
            List
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div className="flex flex-wrap gap-2">
          {!hideAllOption && (
            <button
              type="button"
              onClick={onClear}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                !selected
                  ? "border-transparent bg-brand-gradient text-white"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              {allLabel}
            </button>
          )}
          {destinations.map((place) => {
            const active = selected === place.name.toLowerCase();
            const count = countFor(place.name);
            return (
              <button
                key={place.slug}
                type="button"
                onClick={() => onSelect(place.name)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                  active
                    ? "border-transparent bg-brand-gradient text-white"
                    : "border-border bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                {place.name}
                {count > 0 ? (
                  <span className={cn("ml-1.5 text-xs", active ? "text-white/80" : "text-muted-foreground")}>
                    ({count})
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {!hideAllOption && (
            <button
              type="button"
              onClick={onClear}
              className={cn(
                "flex min-h-[7.5rem] flex-col items-center justify-center rounded-xl border bg-muted/30 p-4 text-center transition hover:bg-muted/50",
                !selected
                  ? "border-[color:var(--brand-orange)] ring-2 ring-[color:var(--brand-orange)]/30"
                  : "border-border",
              )}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[color:var(--brand-purple)] shadow-soft">
                <MapPin className="h-5 w-5" />
              </span>
              <span className="mt-2 font-display text-sm font-semibold text-[color:var(--brand-navy-deep)]">
                {allLabel}
              </span>
              <span className="mt-0.5 text-xs text-muted-foreground">Every {regionKind}</span>
            </button>
          )}

          {destinations.map((place) => {
            const active = selected === place.name.toLowerCase();
            const count = countFor(place.name);
            return (
              <button
                key={place.slug}
                type="button"
                onClick={() => onSelect(place.name)}
                className={cn(
                  "group relative overflow-hidden rounded-xl text-left transition hover:-translate-y-1 hover:shadow-card",
                  active && "ring-2 ring-[color:var(--brand-orange)] ring-offset-2",
                )}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                  <SafeImage
                    src={place.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    fallbackClassName="bg-muted"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-white/70">
                    {regionKind === "state" ? place.region : place.region}
                  </p>
                  <p className="font-display text-base font-semibold leading-tight transition-colors group-hover:text-[color:var(--brand-orange-glow)]">
                    {place.name}
                  </p>
                  {count > 0 ? (
                    <p className="mt-0.5 text-[11px] text-white/75">
                      {count} package{count === 1 ? "" : "s"}
                    </p>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
