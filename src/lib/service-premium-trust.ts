import {
  Award,
  Globe2,
  Headphones,
  Lock,
  Luggage,
  Plane,
  ShieldCheck,
  Ticket,
  Users,
} from "lucide-react";
import type { ServiceIconItem } from "@/components/site/service-premium/types";

/** Four hero feature chips — same layout on every premium page. */
export const STANDARD_HERO_BADGES: ServiceIconItem[] = [
  { icon: Ticket, title: "Best Fare", detail: "Guarantee" },
  { icon: ShieldCheck, title: "Secure", detail: "Inquiry" },
  { icon: Headphones, title: "24×7", detail: "Support" },
  { icon: Luggage, title: "Baggage", detail: "Assistance" },
];

/** Five trust stats — same layout on every premium page. */
export const STANDARD_TRUST_STATS: ServiceIconItem[] = [
  { icon: Users, title: "Trusted by", detail: "10,000+ Happy Travelers" },
  { icon: Plane, title: "30+", detail: "Airlines" },
  { icon: Globe2, title: "500+", detail: "Destinations" },
  { icon: Award, title: "Best Price", detail: "Guaranteed" },
  { icon: Lock, title: "Secure", detail: "Data & Privacy" },
];

export const HOLIDAY_HERO_BADGES: ServiceIconItem[] = STANDARD_HERO_BADGES;

export const HOLIDAY_TRUST_STATS: ServiceIconItem[] = STANDARD_TRUST_STATS;
