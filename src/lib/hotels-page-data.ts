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
  { icon: Tag, title: "Best Deals", detail: "On 10,000+ Hotels" },
  { icon: MapPin, title: "500+", detail: "Destinations" },
  { icon: BadgeCheck, title: "Secure", detail: "Inquiry Process" },
  { icon: Lock, title: "Safe & Easy", detail: "Data Protected" },
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
  { icon: ShieldCheck, title: "No Booking On Website", detail: "We only take inquiry" },
  { icon: Tag, title: "Best Options Shared", detail: "As per your requirement" },
  { icon: Clock, title: "Quick & Easy Process", detail: "Get response within 30 mins" },
  { icon: Lock, title: "100% Safe & Secure", detail: "Your data is always protected" },
];

export const HOTELS_CTA = {
  title: "Looking for the perfect hotel for your next trip?",
  subtitle:
    "Share your travel details and our experts will get back to you with the best options.",
  buttonLabel: "Send Hotel Inquiry",
  buttonHint: "Our team will contact you soon!",
} as const;
