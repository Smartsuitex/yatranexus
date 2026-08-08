import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BadgePercent,
  Clock,
  ConciergeBell,
  Globe2,
  Headphones,
  Hotel,
  Lock,
  MapPin,
  ShieldCheck,
  Tag,
} from "lucide-react";
import type { ServiceIconItem } from "@/components/site/service-premium/types";

export type HotelsWhyIconTone = "purple" | "pink" | "orange" | "blue" | "green";

export type HotelsPageIconItem = {
  icon: LucideIcon;
  title: string;
  detail?: string;
};

export type HotelsWhyItem = HotelsPageIconItem & {
  iconTone: HotelsWhyIconTone;
};

export const HOTELS_HERO = {
  titleFirst: "Stay Better,",
  titleAccent: "Pay Less",
  subtitle: "Find and inquire about the best hotels across 500+ destinations worldwide.",
} as const;

export const HOTELS_HERO_BADGES: ServiceIconItem[] = [
  { icon: Hotel, title: "Best Price", detail: "Guarantee" },
  { icon: ShieldCheck, title: "Verified", detail: "Properties" },
  { icon: Headphones, title: "24×7", detail: "Support" },
  { icon: ConciergeBell, title: "Comfort", detail: "Assured" },
];

export const HOTELS_TRUST_STATS: ServiceIconItem[] = [
  { icon: Tag, title: "Best Deals On 10,000+ Hotels", detail: "" },
  { icon: MapPin, title: "500+ Destinations", detail: "" },
  { icon: BadgeCheck, title: "Secure Inquiry Process", detail: "" },
  { icon: Lock, title: "Safe & Easy Data Protected", detail: "" },
];

export type HotelPopularDestination = {
  slug: string;
  name: string;
  priceLabel: string;
  image: string;
};

export const HOTELS_POPULAR_DESTINATIONS: HotelPopularDestination[] = [
  {
    slug: "delhi",
    name: "Delhi",
    priceLabel: "",
    image: "/images/destinations/1785076174298-chatgpt-image-jul-26-2026-07-58-56-pm.webp",
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    priceLabel: "",
    image: "/images/destinations/1785233303513-chatgpt-image-jul-28-2026-03-38-09-pm.webp",
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    priceLabel: "",
    image: "/images/packages/1785074521978-chatgpt-image-jul-26-2026-07-31-32-pm.webp",
  },
  {
    slug: "singapore",
    name: "Singapore",
    priceLabel: "",
    image: "/images/packages/1785069204318-chatgpt-image-jul-26-2026-06-03-12-pm.webp",
  },
  {
    slug: "dubai",
    name: "Dubai",
    priceLabel: "",
    image: "/images/homepage/hero/1786035390433-chatgpt-image-aug-6-2026-10-26-18-pm.webp",
  },
  {
    slug: "new-york",
    name: "New York",
    priceLabel: "",
    image: "/images/hero/flights-hero.webp",
  },
];

function hotelDestSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Default catalog rows for Admin → Services → Hotels (upload an image per city). */
export function hotelsCatalogDefaults(): Array<{
  icon: string;
  title: string;
  detail: string;
  image: string;
}> {
  return HOTELS_POPULAR_DESTINATIONS.map((dest) => ({
    icon: "Hotel",
    title: dest.name,
    detail: dest.priceLabel || "",
    image: dest.image || "",
  }));
}

export function resolveHotelPopularDestinations(
  catalogItems:
    | Array<{ title: string; detail: string; image?: string }>
    | undefined,
): HotelPopularDestination[] {
  if (!catalogItems?.length) return [...HOTELS_POPULAR_DESTINATIONS];

  return catalogItems.map((item, index) => {
    const title = item.title.trim();
    const fallback =
      HOTELS_POPULAR_DESTINATIONS.find(
        (dest) => dest.name.toLowerCase() === title.toLowerCase(),
      ) ?? HOTELS_POPULAR_DESTINATIONS[index % HOTELS_POPULAR_DESTINATIONS.length];

    return {
      slug: hotelDestSlug(title) || fallback?.slug || `destination-${index + 1}`,
      name: title || fallback?.name || `Destination ${index + 1}`,
      priceLabel: item.detail.trim() || fallback?.priceLabel || "",
      image: item.image?.trim() || fallback?.image || "",
    };
  });
}

export const HOTELS_WHY_BOOK: HotelsWhyItem[] = [
  {
    icon: Hotel,
    iconTone: "purple",
    title: "Wide Hotel Selection",
    detail: "3★ to 5★ hotels, resorts and boutique stays.",
  },
  {
    icon: BadgePercent,
    iconTone: "pink",
    title: "Best Rate Guarantee",
    detail: "Competitive rates negotiated for you.",
  },
  {
    icon: Globe2,
    iconTone: "orange",
    title: "Flexible Options",
    detail: "Free upgrades and flexible check-in where available.",
  },
  {
    icon: Headphones,
    iconTone: "blue",
    title: "24×7 Customer Support",
    detail: "Dedicated travel expert on WhatsApp.",
  },
  {
    icon: Lock,
    iconTone: "green",
    title: "Secure & Private",
    detail: "Your inquiry data is always protected.",
  },
];

export const HOTELS_TRUST_FOOTER: HotelsPageIconItem[] = [
  { icon: ShieldCheck, title: "No Website Booking", detail: "We only take inquiry" },
  { icon: Tag, title: "Best Options Shared", detail: "As per your requirement" },
  { icon: Clock, title: "Quick & Easy Process", detail: "Reply within 30 mins" },
  { icon: Lock, title: "100% Safe & Secure", detail: "Data always protected" },
];

export const HOTELS_CTA = {
  title: "Looking for the perfect hotel for your next trip?",
  subtitle:
    "Share your travel details and our experts will get back to you with the best options.",
  buttonLabel: "Send Hotel Inquiry",
  buttonHint: "Our team will contact you soon!",
} as const;
