import { MapPin } from "lucide-react";
import type { PublicDestination } from "@/lib/public-cms";

type Props = {
  destinations: PublicDestination[];
};

const MARQUEE_FALLBACK: PublicDestination[] = [
  {
    slug: "maldives",
    name: "Maldives",
    region: "Indian Ocean",
    image: "",
    blurb: "",
    highlights: [],
  },
  {
    slug: "singapore",
    name: "Singapore",
    region: "South-East Asia",
    image: "",
    blurb: "",
    highlights: [],
  },
  {
    slug: "europe",
    name: "Europe",
    region: "Multi-country",
    image: "",
    blurb: "",
    highlights: [],
  },
  {
    slug: "turkey",
    name: "Turkey",
    region: "Europe / Asia",
    image: "",
    blurb: "",
    highlights: [],
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    region: "South Asia",
    image: "",
    blurb: "",
    highlights: [],
  },
  {
    slug: "goa",
    name: "Goa",
    region: "West India",
    image: "",
    blurb: "",
    highlights: [],
  },
];

export function HeroDestinationMarquee({ destinations }: Props) {
  const items = destinations.length > 0 ? destinations : MARQUEE_FALLBACK;
  const loop = [...items, ...items];

  return (
    <div className="home-hero-marquee" aria-label="Popular destinations">
      <div className="home-hero-marquee__fade home-hero-marquee__fade--left" aria-hidden="true" />
      <div className="home-hero-marquee__fade home-hero-marquee__fade--right" aria-hidden="true" />
      <div className="home-hero-marquee__viewport">
        <ul className="home-hero-marquee__track animate-marquee">
          {loop.map((dest, index) => (
            <li key={`${dest.slug}-${index}`} className="home-hero-marquee__pill">
              <MapPin className="home-hero-marquee__icon" aria-hidden="true" strokeWidth={2} />
              <span className="home-hero-marquee__name">{dest.name}</span>
              <span className="home-hero-marquee__sep" aria-hidden="true">
                ·
              </span>
              <span className="home-hero-marquee__region">{dest.region.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
