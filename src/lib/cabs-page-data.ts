import {
  BadgePercent,
  Car,
  Clock,
  Headphones,
  Lock,
  MapPin,
  ShieldCheck,
  Tag,
} from "lucide-react";
import type { ServiceHeroCopy, ServiceIconItem } from "@/components/site/service-premium/types";

export const CABS_HERO: ServiceHeroCopy = {
  titleFirst: "Outstation Cabs",
  titleAccent: "Comfortable. Reliable. Affordable.",
  subtitle: "Choose from a wide range of well-maintained cabs for your outstation journeys.",
};

export const CABS_HERO_BADGES: ServiceIconItem[] = [
  {
    icon: ShieldCheck,
    title: "Verified Drivers",
    detail: "Background checked & experienced",
  },
  {
    icon: Clock,
    title: "24×7 Service",
    detail: "Round the clock support",
  },
  {
    icon: MapPin,
    title: "All India Coverage",
    detail: "500+ destinations across India",
  },
];

export const CABS_TRUST_ROW: ServiceIconItem[] = [
  { icon: ShieldCheck, title: "Best Price Guarantee", detail: "" },
  { icon: BadgePercent, title: "No Hidden Charges", detail: "" },
  { icon: Headphones, title: "24×7 Customer Support", detail: "" },
  { icon: Car, title: "Clean & Well Maintained", detail: "" },
];

export const CABS_TRUST_FOOTER: ServiceIconItem[] = [
  { icon: ShieldCheck, title: "No Website Booking", detail: "We only take inquiry" },
  { icon: Tag, title: "Best Options Shared", detail: "As per your requirement" },
  { icon: Clock, title: "Quick & Easy Process", detail: "Reply within 30 mins" },
  { icon: Lock, title: "100% Safe & Secure", detail: "Data always protected" },
];

export type CabCategory = {
  slug: string;
  title: string;
  seats: string;
  bags: string;
  description: string;
  image: string;
  accent: "purple" | "pink" | "orange" | "blue";
};

export const CABS_CATEGORIES: CabCategory[] = [
  {
    slug: "sedan",
    title: "Sedan",
    seats: "4 Seater",
    bags: "2 Bags",
    description: "Dzire, Etios, Aura – ideal for couples and small families.",
    image: "",
    accent: "purple",
  },
  {
    slug: "suv",
    title: "SUV",
    seats: "6 Seater",
    bags: "4 Bags",
    description: "Ertiga, XL6 – comfortable for hilly routes and 5–6 travellers.",
    image: "",
    accent: "orange",
  },
  {
    slug: "innova",
    title: "Innova / Crysta",
    seats: "6–7 Seater",
    bags: "4 Bags",
    description: "Premium SUV for families and longer journeys.",
    image: "",
    accent: "pink",
  },
  {
    slug: "tempo",
    title: "Tempo Traveller",
    seats: "12–17 Seater",
    bags: "7+ Bags",
    description: "Perfect for groups, weddings and corporate outings.",
    image: "",
    accent: "blue",
  },
];

/** Default catalog rows for admin (title + seats/bags + description). Images uploaded in admin. */
export function cabsCatalogDefaults(): Array<{
  icon: string;
  title: string;
  detail: string;
  image: string;
}> {
  return CABS_CATEGORIES.map((cab) => ({
    icon: "Car",
    title: cab.title,
    detail: `${cab.seats} · ${cab.bags}\n${cab.description}`,
    image: cab.image || "",
  }));
}

export function resolveCabCategories(
  catalogItems:
    | Array<{ title: string; detail: string; image?: string; accent?: string }>
    | undefined,
): CabCategory[] {
  const accents = ["purple", "orange", "pink", "blue"] as const;

  if (!catalogItems?.length) {
    return [...CABS_CATEGORIES];
  }

  return catalogItems.map((item, index) => {
    const fallback =
      CABS_CATEGORIES.find(
        (cab) => cab.title.toLowerCase() === item.title.trim().toLowerCase(),
      ) ?? CABS_CATEGORIES[index % CABS_CATEGORIES.length];

    const lines = item.detail
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    let seats = fallback?.seats ?? "";
    let bags = fallback?.bags ?? "";
    let description = fallback?.description ?? "";

    if (lines.length > 0 && /seater|bags/i.test(lines[0]!)) {
      const parts = lines[0]!.split(/·|\|/).map((part) => part.trim());
      if (parts[0]) seats = parts[0];
      if (parts[1]) bags = parts[1];
      description = lines.slice(1).join(" ").trim() || description;
    } else if (item.detail.trim()) {
      description = item.detail.trim();
    }

    return {
      slug: fallback?.slug ?? `cab-${index}`,
      title: item.title.trim() || fallback?.title || `Category ${index + 1}`,
      seats,
      bags,
      description,
      image: item.image?.trim() || fallback?.image || "",
      accent: (fallback?.accent ?? accents[index % accents.length]) as CabCategory["accent"],
    };
  });
}

export const CABS_CTA = {
  title: "Looking for a customized cab package?",
  subtitle: "Share your route, dates and group size — we'll share the best cab options.",
  buttonLabel: "Send Cab Inquiry",
  buttonHint: "Our team will contact you soon!",
} as const;
