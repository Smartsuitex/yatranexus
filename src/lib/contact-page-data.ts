import { Clock, Headphones, MapPin, MessageCircle, Phone, Mail, ShieldCheck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceIconItem } from "@/components/site/service-premium/types";
import { preferWebpImage } from "@/lib/site-images";

export const CONTACT_HERO = {
  eyebrow: "Contact Us",
  titleFirst: "Let's Plan Your",
  titleAccent: "Next Trip",
  subtitle:
    "Send an inquiry and our travel expert will call you back the same day — or reach us on phone, email or WhatsApp anytime.",
} as const;

export const CONTACT_HERO_BADGES: ServiceIconItem[] = [
  { icon: Zap, title: "Same-Day", detail: "Callback" },
  { icon: MessageCircle, title: "WhatsApp", detail: "Support" },
  { icon: Headphones, title: "Dedicated", detail: "Experts" },
  { icon: ShieldCheck, title: "Secure", detail: "Inquiry" },
];

export const CONTACT_TRUST_STATS: ServiceIconItem[] = [
  { icon: Phone, title: "Call Us Anytime", detail: "" },
  { icon: MessageCircle, title: "WhatsApp Quick Replies", detail: "" },
  { icon: Mail, title: "Email Detailed Plans", detail: "" },
  { icon: MapPin, title: "Visit Our Office", detail: "" },
];

export const CONTACT_TRUST_FOOTER: ServiceIconItem[] = [
  { icon: ShieldCheck, title: "No Website Booking", detail: "We only take inquiry" },
  { icon: MessageCircle, title: "Best Options Shared", detail: "As per your requirement" },
  { icon: Clock, title: "Quick & Easy Process", detail: "Reply within 30 mins" },
  { icon: Headphones, title: "100% Safe & Secure", detail: "Data always protected" },
];

/** Prefer CMS banner; fall back to local Contact hero WebP. Reject Unsplash stock. */
export function resolveContactHero(bannerUrl?: string | null): {
  primary: string;
  fallback: string;
} {
  const cms = bannerUrl?.trim() || "";
  const local = "/images/hero/contact-hero.webp";
  if (cms && !cms.includes("unsplash.com")) {
    if (cms.startsWith("/images/hero/")) {
      return { primary: preferWebpImage(cms), fallback: local };
    }
    if (/\.webp$/i.test(cms) && cms.startsWith("/images/")) {
      return { primary: cms, fallback: local };
    }
    return { primary: local, fallback: local };
  }
  return { primary: local, fallback: local };
}

export type ContactMethodItem = {
  icon: LucideIcon;
  title: string;
  detail: string;
  accent: "purple" | "orange" | "blue" | "green";
  kind: "whatsapp" | "phone" | "email" | "address" | "hours";
};

export const CONTACT_METHODS: Omit<ContactMethodItem, "detail">[] = [
  { icon: MessageCircle, title: "WhatsApp", accent: "green", kind: "whatsapp" },
  { icon: Phone, title: "Call Us", accent: "orange", kind: "phone" },
  { icon: Mail, title: "Email", accent: "purple", kind: "email" },
  { icon: MapPin, title: "Office", accent: "blue", kind: "address" },
  { icon: Clock, title: "Business Hours", accent: "orange", kind: "hours" },
];

export const CONTACT_PROMISES: ServiceIconItem[] = [
  {
    icon: Zap,
    title: "Same-Day Callback",
    detail: "Share your inquiry and hear back from a travel expert within working hours.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    detail: "Quick answers on chat — ideal for dates, fares and itinerary tweaks.",
  },
  {
    icon: Headphones,
    title: "Dedicated Experts",
    detail: "Real humans who know flights, hotels, visa and holidays — not bots.",
  },
];

export const CONTACT_FORM = {
  title: "Send an Inquiry",
  subtitle: "Tell us where you'd like to go — we'll prepare options and call you back.",
  note: "We respond on WhatsApp & call within working hours.",
} as const;

export const CONTACT_CTA = {
  title: "Let's Plan Your Next Journey",
  subtitle:
    "Whether it's a weekend getaway, an international holiday, a business trip or a dream vacation, YatraNexus is here to make your travel planning simple and convenient.",
  buttonLabel: "Plan My Trip",
  buttonHint: "Our team will contact you soon!",
} as const;
