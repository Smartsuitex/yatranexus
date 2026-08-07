import {
  BadgePercent,
  Briefcase,
  Clock,
  CreditCard,
  Globe2,
  GraduationCap,
  Lock,
  RefreshCw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import type { ServiceHeroCopy, ServiceIconItem } from "@/components/site/service-premium/types";
import { decodeHtmlEntities } from "@/lib/utils";

export const FOREX_HERO: ServiceHeroCopy = {
  titleFirst: "Forex Cards",
  titleAccent: "Smart Travel. Simple Payments.",
  subtitle:
    "A secure, convenient and smarter way to carry foreign currency on your international trips.",
};

/** Hero section badges. */
export const FOREX_HERO_BADGES: ServiceIconItem[] = [
  { icon: ShieldCheck, title: "Secure &", detail: "Safe" },
  { icon: Star, title: "Best Rates", detail: "Guaranteed" },
  { icon: Globe2, title: "Widely", detail: "Accepted" },
  { icon: RefreshCw, title: "Reloadable", detail: "Convenient" },
];

/** Services ribbon under hero. */
export const FOREX_TRUST_ROW: ServiceIconItem[] = [
  { icon: ShieldCheck, title: "100% Secure", detail: "" },
  { icon: BadgePercent, title: "Zero Hidden Charges", detail: "" },
  { icon: Globe2, title: "200+ Countries", detail: "" },
  { icon: RefreshCw, title: "Instant Activation", detail: "" },
  { icon: Truck, title: "Doorstep Delivery", detail: "" },
];

export const FOREX_TRUST_FOOTER: ServiceIconItem[] = [
  { icon: ShieldCheck, title: "No Website Booking", detail: "We only take inquiry" },
  { icon: BadgePercent, title: "Best Options Shared", detail: "As per your requirement" },
  { icon: Clock, title: "Quick & Easy Process", detail: "Reply within 30 mins" },
  { icon: Lock, title: "100% Safe & Secure", detail: "Data always protected" },
];

export type ForexCardType = {
  slug: string;
  title: string;
  description: string;
  icon: typeof CreditCard;
  image?: string;
  features: string[];
  accent: "purple" | "pink" | "orange" | "blue";
};

export const FOREX_CARD_TYPES: ForexCardType[] = [
  {
    slug: "single-currency",
    title: "Single Currency Forex Card",
    description: "Perfect for travelers visiting a single destination.",
    icon: CreditCard,
    image: "/images/Forex/Forex_Single-Currency.png",
    accent: "purple",
    features: [
      "Load one foreign currency",
      "Lock exchange rates before travel",
      "Secure Chip & PIN protection",
      "Accepted worldwide at merchants & ATMs",
      "Easy reload when required",
    ],
  },
  {
    slug: "multi-currency",
    title: "Multi Currency Forex Card",
    description: "One card for multiple international destinations.",
    icon: Globe2,
    image: "/images/Forex/Forex_Multi-Currency.png",
    accent: "pink",
    features: [
      "Load multiple currencies on one card",
      "Seamless currency switching",
      "No need to carry multiple cards",
      "Worldwide merchant & ATM acceptance",
      "Convenient online reload facility",
    ],
  },
  {
    slug: "student",
    title: "Student Forex Card",
    description: "Specially designed for students studying abroad.",
    icon: GraduationCap,
    image: "/images/Forex/ForexCard-GlobalJourney.png",
    accent: "orange",
    features: [
      "Ideal for tuition & living expenses",
      "Parents can easily reload funds",
      "Worldwide ATM & merchant access",
      "Secure Chip & PIN protection",
      "Competitive exchange rates",
    ],
  },
  {
    slug: "corporate",
    title: "Corporate Forex Card",
    description: "Smart travel solution for business professionals.",
    icon: Briefcase,
    image: "/images/Forex/Single Currency Forex card (1).png",
    accent: "blue",
    features: [
      "Manage international business expenses",
      "Accepted globally for travel & payments",
      "Easy expense tracking & control",
      "Convenient reload & fund management",
      "Secure transactions with Chip & PIN",
    ],
  },
];

function forexCardSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Default catalog rows for Admin → Services → Forex (upload/replace card images). */
export function forexCatalogDefaults(): Array<{
  icon: string;
  title: string;
  detail: string;
  image: string;
  points: string[];
  accent: ForexCardType["accent"];
}> {
  const iconName: Record<string, string> = {
    "single-currency": "CreditCard",
    "multi-currency": "Globe2",
    student: "GraduationCap",
    corporate: "Briefcase",
  };
  return FOREX_CARD_TYPES.map((card) => ({
    icon: iconName[card.slug] ?? "CreditCard",
    title: card.title,
    detail: card.description,
    image: card.image || "",
    points: [...card.features],
    accent: card.accent,
  }));
}

export function resolveForexCardTypes(
  catalogItems:
    | Array<{
        title: string;
        detail: string;
        image?: string;
        points?: string[];
        accent?: string;
      }>
    | undefined,
): ForexCardType[] {
  if (!catalogItems?.length) return [...FOREX_CARD_TYPES];

  const accents = ["purple", "pink", "orange", "blue"] as const;

  return catalogItems.map((item, index) => {
    const title = decodeHtmlEntities(item.title.trim());
    const fallback =
      FOREX_CARD_TYPES.find((card) => card.title.toLowerCase() === title.toLowerCase()) ??
      FOREX_CARD_TYPES[index % FOREX_CARD_TYPES.length];

    const points = (item.points ?? [])
      .map((p) => decodeHtmlEntities(p.trim()))
      .filter(Boolean);
    const accentRaw = item.accent?.trim().toLowerCase();
    const accent = (
      accents.includes(accentRaw as (typeof accents)[number])
        ? accentRaw
        : fallback?.accent ?? accents[index % accents.length]
    ) as ForexCardType["accent"];

    return {
      slug: forexCardSlug(title) || fallback?.slug || `forex-card-${index + 1}`,
      title: title || fallback?.title || `Forex Card ${index + 1}`,
      description: decodeHtmlEntities(item.detail.trim()) || fallback?.description || "",
      icon: fallback?.icon ?? CreditCard,
      image: item.image?.trim() || fallback?.image || "",
      features: points.length > 0 ? points : fallback?.features ?? [],
      accent,
    };
  });
}

export const FOREX_CTA = {
  title: "Travel the world with confidence!",
  subtitle:
    "Get your forex card today and enjoy a hassle-free international experience.",
  buttonLabel: "Send Forex Inquiry",
  buttonHint: "Our team will contact you soon!",
} as const;
