import { Link } from "@tanstack/react-router";
import type { Destination } from "@/lib/site-data";
import { SafeImage } from "@/components/site/SafeImage";

type DestinationCardProps =
  | {
      d: Destination;
      to: "/holiday-packages/domestic/$state";
      params: { state: string };
    }
  | {
      d: Destination;
      to: "/holiday-packages/international/$country";
      params: { country: string };
    };

export function DestinationCard({ d, to, params }: DestinationCardProps) {
  const isDomestic = to === "/holiday-packages/domestic/$state";
  const tagline = isDomestic ? "" : d.region.trim();

  return (
    <Link
      to={to}
      params={params}
      className="home-dest-card home-dest-card--compact aspect-[4/5]"
    >
      <SafeImage
        src={d.image}
        alt={d.name}
        loading="lazy"
        className="home-dest-card__img"
        fallbackClassName="bg-[color:var(--brand-navy-deep)]/10"
      />
      <div className="home-dest-card__overlay">
        {tagline ? <p className="home-dest-card__tagline">{tagline}</p> : null}
        <h3 className="home-dest-card__name">{d.name}</h3>
      </div>
    </Link>
  );
}
