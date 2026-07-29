import type { LucideIcon } from "lucide-react";
import type { ServiceIconItem } from "@/components/site/service-premium/types";
import {
  Briefcase,
  Building2,
  Car,
  ClipboardCheck,
  CreditCard,
  Eye,
  FileSearch,
  Handshake,
  Headphones,
  Heart,
  LayoutGrid,
  Luggage,
  MessageCircle,
  Palmtree,
  Plane,
  ChartColumnIncreasing,
  Shield,
  ShieldCheck,
  Stamp,
  Star,
  Target,
  User,
  Users,
  Wallet,
} from "lucide-react";

export const ABOUT_HERO = {
  eyebrow: "About YatraNexus",
  titleFirst: "Your Journey,",
  titleAccent: "Our Priority",
  subtitle:
    "At YatraNexus, we believe every journey should be simple, memorable and stress-free. We are here to make your travel planning easy, reliable and truly special.",
} as const;

export const ABOUT_HERO_BADGES: ServiceIconItem[] = [
  { icon: Headphones, title: "24×7", detail: "Expert Support" },
  { icon: ShieldCheck, title: "Trusted", detail: "Partners" },
  { icon: Users, title: "Human", detail: "Experts" },
  { icon: Star, title: "Transparent", detail: "Pricing" },
];

export const ABOUT_TRUST_STATS: ServiceIconItem[] = [
  { icon: Plane, title: "End-to-End", detail: "Travel Desk" },
  { icon: MessageCircle, title: "WhatsApp", detail: "First Support" },
  { icon: ShieldCheck, title: "Honest", detail: "Advice" },
  { icon: Heart, title: "Customer", detail: "First Always" },
];

/** Prefer CMS banner; fall back to local About hero. Reject Unsplash stock. */
export function resolveAboutHero(bannerUrl?: string | null): { primary: string; fallback: string } {
  const cms = bannerUrl?.trim() || "";
  const local = "/images/hero/about-hero.png";
  if (cms && !cms.includes("unsplash.com")) {
    return { primary: cms, fallback: local };
  }
  return { primary: local, fallback: local };
}

export const ABOUT_WHO_WE_ARE = {
  title: "Who We Are",
  paragraphs: [
    "YatraNexus is a new-age travel startup built around one simple idea — every traveller deserves a real expert, not a chatbot. We combine personalised service with technology-driven solutions to make planning effortless.",
    "Whether you're booking a family holiday, a business trip or a group tour, our team handles the details so you can focus on the experience. We work with trusted airline, hotel and ground partners across India and abroad.",
    "From the first call to your return home, we're with you on WhatsApp and phone — transparent pricing, honest advice and support when you need it most.",
  ],
} as const;

export type AboutMissionVision = {
  icon: LucideIcon;
  title: string;
  detail: string;
  accent: "purple" | "orange";
};

export const ABOUT_MISSION_VISION: AboutMissionVision[] = [
  {
    icon: Target,
    title: "Our Mission",
    detail:
      "To make travel planning easy, affordable and hassle-free by delivering customized travel solutions backed by honest advice and dedicated customer support.",
    accent: "purple",
  },
  {
    icon: Eye,
    title: "Our Vision",
    detail:
      "To become a trusted travel partner for individuals, families and businesses by delivering exceptional service and creating memorable travel experiences.",
    accent: "orange",
  },
];

export type AboutOfferItem = ServiceIconItem & {
  accent: "purple" | "orange" | "blue" | "green";
};

export const ABOUT_WHAT_WE_OFFER: AboutOfferItem[] = [
  {
    icon: Plane,
    title: "Flight Assistance",
    detail: "Domestic & international fares with expert support.",
    accent: "purple",
  },
  {
    icon: Building2,
    title: "Hotel Reservations",
    detail: "Hand-picked stays at negotiated rates.",
    accent: "orange",
  },
  {
    icon: Palmtree,
    title: "Holiday Packages",
    detail: "Curated itineraries across India & abroad.",
    accent: "blue",
  },
  {
    icon: Car,
    title: "Cabs & Airport Transfers",
    detail: "Reliable ground transport when you land.",
    accent: "green",
  },
  {
    icon: Stamp,
    title: "Visa Assistance",
    detail: "Documentation & processing for 100+ countries.",
    accent: "purple",
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    detail: "Coverage for medical, baggage & trip risks.",
    accent: "orange",
  },
  {
    icon: CreditCard,
    title: "Forex Card & Currency",
    detail: "Multi-currency cards at competitive rates.",
    accent: "blue",
  },
  {
    icon: Briefcase,
    title: "Corporate & MICE Travel",
    detail: "Business travel desk with GST billing & MIS.",
    accent: "green",
  },
];

export const ABOUT_WHY_CHOOSE: ServiceIconItem[] = [
  {
    icon: User,
    title: "Personalized Service",
    detail: "Trips tailored to your dates, budget and preferences — never one-size-fits-all.",
  },
  {
    icon: LayoutGrid,
    title: "One-Stop Solutions",
    detail: "Flights, hotels, cabs, visa, insurance and forex — all under one desk.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    detail: "Clear quotes with no hidden charges. You know what you pay for.",
  },
  {
    icon: Headphones,
    title: "Dedicated Assistance",
    detail: "Real experts on WhatsApp and call — before, during and after travel.",
  },
  {
    icon: Handshake,
    title: "Trusted Partners",
    detail: "Vetted airlines, hotels and operators across India and abroad.",
  },
  {
    icon: Heart,
    title: "Customer First",
    detail: "Your satisfaction guides every decision from inquiry to return.",
  },
];

export type AboutValueItem = {
  icon: LucideIcon;
  title: string;
  accent: "purple" | "orange" | "blue" | "green";
};

export const ABOUT_VALUES: AboutValueItem[] = [
  { icon: Handshake, title: "Trust", accent: "orange" },
  { icon: Shield, title: "Transparency", accent: "orange" },
  { icon: Star, title: "Customer Satisfaction", accent: "blue" },
  { icon: ShieldCheck, title: "Reliability", accent: "green" },
  { icon: ClipboardCheck, title: "Professionalism", accent: "purple" },
  { icon: ChartColumnIncreasing, title: "Continuous Improvement", accent: "orange" },
];

export type AboutHowStep = {
  n: number;
  icon: LucideIcon;
  title: string;
  detail: string;
  accent: "purple" | "orange" | "blue" | "green";
};

export const ABOUT_HOW_IT_WORKS: AboutHowStep[] = [
  {
    n: 1,
    icon: MessageCircle,
    title: "Share Your Plan",
    detail: "Tell us your destination, travel dates and requirements.",
    accent: "purple",
  },
  {
    n: 2,
    icon: FileSearch,
    title: "Receive Options",
    detail: "We prepare the best suitable options for you.",
    accent: "orange",
  },
  {
    n: 3,
    icon: ClipboardCheck,
    title: "Confirm Your Trip",
    detail: "Choose the best option and let us handle the arrangements.",
    accent: "blue",
  },
  {
    n: 4,
    icon: Luggage,
    title: "Travel Worry-Free",
    detail: "Enjoy your journey while we stay available for assistance whenever needed.",
    accent: "green",
  },
];

export const ABOUT_CTA = {
  title: "Let's Plan Your Next Journey",
  subtitle:
    "Whether it's a weekend getaway, an international holiday, a business trip or a dream vacation, YatraNexus is here to make your travel planning simple and convenient.",
  buttonLabel: "Plan My Trip",
  buttonHint: "Our team will contact you soon!",
} as const;

/** Split CMS about body into paragraphs for Who We Are. */
export function splitAboutParagraphs(content: string): string[] {
  const trimmed = content.trim();
  if (!trimmed) return [...ABOUT_WHO_WE_ARE.paragraphs];
  const parts = trimmed.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [trimmed];
}
