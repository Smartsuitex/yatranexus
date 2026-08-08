import { Link } from "@tanstack/react-router";
import type { Destination } from "@/lib/site-data";
import { PackagePriceLabel } from "@/components/site/PackagePriceLabel";
import { SafeImage } from "@/components/site/SafeImage";

type DestinationCardProps =
  | {
      d: Destination;
      to: "/holiday-packages/domestic/$state";
      params: { state: string };
      fromPrice?: string | null;
      /** Prefer eager for above-the-fold cards so mobile does not stay blank. */
      priority?: boolean;
    }
  | {
      d: Destination;
      to: "/holiday-packages/international/$country";
      params: { country: string };
      fromPrice?: string | null;
      priority?: boolean;
    };

export function DestinationCard({ d, to, params, fromPrice, priority = false }: DestinationCardProps) {
  const isDomestic = to === "/holiday-packages/domestic/$state";
  const tagline = isDomestic ? "" : d.region.trim();
  const price = fromPrice?.trim() || "";

  return (
    <Link
      to={to}
      params={params}
      className="home-dest-card home-dest-card--compact aspect-[4/5]"
    >
      <SafeImage
        src={d.image}
        alt={d.name}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className="home-dest-card__img"
        fallbackClassName="bg-[color:var(--brand-navy-deep)]/10"
      />
      <div className="home-dest-card__overlay">
        {tagline ? <p className="home-dest-card__tagline">{tagline}</p> : null}
        <h3 className="home-dest-card__name">{d.name}</h3>
        {price ? (
          <PackagePriceLabel
            amount={price}
            prefix="starting"
            perPerson={false}
            variant="overlay"
          />
        ) : null}
      </div>
    </Link>
  );
}
