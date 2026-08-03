import {
  BadgePercent,
  Clock,
  FileCheck,
  Headphones,
  HeartPulse,
  Lock,
  Luggage,
  ShieldCheck,
  ShieldPlus,
  Star,
  Umbrella,
} from "lucide-react";
import type { ServiceHeroCopy, ServiceIconItem } from "@/components/site/service-premium/types";

export const INSURANCE_HERO: ServiceHeroCopy = {
  titleFirst: "Travel Insurance",
  titleAccent: "Travel Worry-Free, We've Got You Covered",
  subtitle:
    "Comprehensive travel insurance plans that protect you against unforeseen events, so you can travel with complete peace of mind.",
};

export const INSURANCE_HERO_BADGES: ServiceIconItem[] = [
  { icon: ShieldCheck, title: "Wide", detail: "Coverage" },
  { icon: Headphones, title: "24×7", detail: "Assistance" },
  { icon: FileCheck, title: "Easy", detail: "Claims" },
  { icon: BadgePercent, title: "Affordable", detail: "Plans" },
];

export const INSURANCE_TRUST_STATS: ServiceIconItem[] = [
  { icon: ShieldCheck, title: "Worldwide Coverage", detail: "" },
  { icon: Headphones, title: "Always Available", detail: "" },
  { icon: FileCheck, title: "Fast Claims", detail: "" },
  { icon: BadgePercent, title: "Tailored Plans", detail: "" },
];

export const INSURANCE_COVERAGE_LEAD =
  "Premium travel insurance that protects every destination, every trip, and every traveler.";

export const INSURANCE_COVERAGE_ITEMS: ServiceIconItem[] = [
  {
    icon: ShieldPlus,
    title: "Medical Protection",
    detail: "Worldwide healthcare coverage",
  },
  {
    icon: ShieldCheck,
    title: "Trip Security",
    detail: "Cancellation & interruption",
  },
  {
    icon: Luggage,
    title: "Baggage Safety",
    detail: "Coverage for your belongings",
  },
  {
    icon: Headphones,
    title: "Emergency Assistance",
    detail: "Support around the clock",
  },
];

export type InsurancePlan = {
  slug: string;
  title: string;
  tagline: string;
  icon: typeof ShieldCheck;
  features: string[];
  accent: "purple" | "pink" | "orange" | "blue";
};

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    slug: "basic",
    title: "Travel Basic",
    tagline: "Ideal for short trips",
    icon: Umbrella,
    accent: "purple",
    features: [
      "Medical expenses cover",
      "Trip cancellation",
      "Baggage loss",
      "Personal accident",
    ],
  },
  {
    slug: "standard",
    title: "Travel Standard",
    tagline: "Most popular choice",
    icon: ShieldCheck,
    accent: "pink",
    features: [
      "Higher medical limits",
      "Trip delay cover",
      "Passport loss",
      "Emergency evacuation",
    ],
  },
  {
    slug: "premium",
    title: "Travel Premium",
    tagline: "Enhanced protection",
    icon: Star,
    accent: "orange",
    features: [
      "Comprehensive medical",
      "Adventure sports add-on",
      "Cancel for any reason",
      "24×7 global assistance",
    ],
  },
  {
    slug: "family",
    title: "Travel Family",
    tagline: "Best for family trips",
    icon: HeartPulse,
    accent: "blue",
    features: [
      "Cover for all members",
      "Child-friendly benefits",
      "Family trip cancellation",
      "Cashless hospitalisation",
    ],
  },
];

export const INSURANCE_CTA = {
  title: "Secure your journey, before you take off!",
  subtitle: "Get the right protection for your destination, duration and travel style.",
  buttonLabel: "Insurance Inquiry",
  buttonHint: "Our team will contact you soon!",
} as const;

export const INSURANCE_TRUST_FOOTER: ServiceIconItem[] = [
  { icon: ShieldCheck, title: "No Website Booking", detail: "We only take inquiry" },
  { icon: FileCheck, title: "Best Options Shared", detail: "As per your requirement" },
  { icon: Clock, title: "Quick & Easy Process", detail: "Reply within 30 mins" },
  { icon: Lock, title: "100% Safe & Secure", detail: "Data always protected" },
];

export const INSURANCE_PLANS_NOTE =
  "All plans are customizable as per your travel destination, duration and requirements.";
