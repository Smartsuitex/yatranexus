import {
  Award,
  Clock,
  Globe2,
  Headphones,
  History,
  Lock,
  Plane,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import type { ServiceHeroCopy, ServiceIconItem } from "@/components/site/service-premium/types";
import { STANDARD_HERO_BADGES } from "@/lib/service-premium-trust";

export type FlightWhyIconTone = "purple" | "pink" | "orange" | "blue" | "green";

export type FlightWhyItem = ServiceIconItem & {
  iconTone: FlightWhyIconTone;
};

export type FlightPopularDestination = {
  slug: string;
  name: string;
  priceLabel: string;
  image: string;
};

export const FLIGHTS_HERO: ServiceHeroCopy = {
  titleFirst: "Fly More,",
  titleAccent: "Pay Less",
  subtitle: "Get the best flight options from 30+ airlines at the most competitive fares.",
};

export const FLIGHTS_HERO_BADGES: ServiceIconItem[] = STANDARD_HERO_BADGES;

export const FLIGHTS_TRUST_STATS: ServiceIconItem[] = [
  { icon: Plane, title: "30+", detail: "Airlines" },
  { icon: Globe2, title: "500+", detail: "Destinations" },
  { icon: Award, title: "Best Price", detail: "Guaranteed" },
  { icon: Lock, title: "Secure", detail: "Data & Privacy" },
];

export const FLIGHTS_POPULAR_DESTINATIONS: FlightPopularDestination[] = [
  {
    slug: "delhi",
    name: "Delhi",
    priceLabel: "",
    image: "",
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    priceLabel: "",
    image: "",
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    priceLabel: "",
    image: "",
  },
  {
    slug: "singapore",
    name: "Singapore",
    priceLabel: "",
    image: "",
  },
  {
    slug: "dubai",
    name: "Dubai",
    priceLabel: "",
    image: "",
  },
  {
    slug: "new-york",
    name: "New York",
    priceLabel: "",
    image: "",
  },
];

function flightDestSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Default catalog rows for Admin → Services → Flights (upload an image per city). */
export function flightsCatalogDefaults(): Array<{
  icon: string;
  title: string;
  detail: string;
  image: string;
}> {
  return FLIGHTS_POPULAR_DESTINATIONS.map((dest) => ({
    icon: "Plane",
    title: dest.name,
    detail: dest.priceLabel || "",
    image: dest.image || "",
  }));
}

export function resolveFlightPopularDestinations(
  catalogItems:
    | Array<{ title: string; detail: string; image?: string }>
    | undefined,
): FlightPopularDestination[] {
  if (!catalogItems?.length) return [...FLIGHTS_POPULAR_DESTINATIONS];

  return catalogItems.map((item, index) => {
    const title = item.title.trim();
    const fallback =
      FLIGHTS_POPULAR_DESTINATIONS.find(
        (dest) => dest.name.toLowerCase() === title.toLowerCase(),
      ) ?? FLIGHTS_POPULAR_DESTINATIONS[index % FLIGHTS_POPULAR_DESTINATIONS.length];

    return {
      slug: flightDestSlug(title) || fallback?.slug || `destination-${index + 1}`,
      name: title || fallback?.name || `Destination ${index + 1}`,
      priceLabel: item.detail.trim() || fallback?.priceLabel || "",
      image: item.image?.trim() || fallback?.image || "",
    };
  });
}

export const FLIGHTS_WHY_BOOK: FlightWhyItem[] = [
  {
    icon: Ticket,
    iconTone: "purple",
    title: "Competitive Fares",
    detail: "Compare across 30+ airlines & consolidators",
  },
  {
    icon: Plane,
    iconTone: "pink",
    title: "Cabin Upgrades",
    detail: "Business & premium economy at best rates",
  },
  {
    icon: Globe2,
    iconTone: "orange",
    title: "International Routing",
    detail: "Multi-city, codeshare & complex stopovers handled",
  },
  {
    icon: History,
    iconTone: "blue",
    title: "24x7 Reschedule Help",
    detail: "Cancellations, refunds & reschedules – we handle it",
  },
  {
    icon: Headphones,
    iconTone: "green",
    title: "Expert Guidance",
    detail: "Personalized support from travel experts",
  },
];

export const FLIGHTS_CTA = {
  title: "Looking for the best flight options for your next trip?",
  subtitle:
    "Share your travel details and our experts will get back to you with the best options.",
  buttonLabel: "Send Flight Inquiry",
  buttonHint: "Our team will contact you soon!",
} as const;

export const FLIGHTS_TRUST_FOOTER: ServiceIconItem[] = [
  { icon: Ticket, title: "No Booking On Website", detail: "We only take inquiry" },
  { icon: ShieldCheck, title: "Best Options Shared", detail: "As per your requirement" },
  { icon: Clock, title: "Quick & Easy Process", detail: "Get response within 30 mins" },
  { icon: ShieldCheck, title: "100% Safe & Secure", detail: "Your data is always protected" },
];
