import {
  BadgeCheck,
  BadgePercent,
  BedDouble,
  Briefcase,
  Car,
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  Globe2,
  Headphones,
  Hotel,
  MapPin,
  Palmtree,
  Plane,
  Shield,
  ShieldCheck,
  Sparkles,
  Stamp,
  Star,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  BadgeCheck,
  BadgePercent,
  BedDouble,
  Briefcase,
  Car,
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  Globe2,
  Headphones,
  Hotel,
  MapPin,
  Palmtree,
  Plane,
  Shield,
  ShieldCheck,
  Sparkles,
  Stamp,
  Star,
  Users,
  Wallet,
};

export function resolveCmsIcon(name?: string | null): LucideIcon {
  if (!name) return Sparkles;
  return ICON_MAP[name] ?? Sparkles;
}

export const CMS_ICON_OPTIONS = Object.keys(ICON_MAP);
