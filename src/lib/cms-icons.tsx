import {
  BadgeCheck,
  BadgePercent,
  BedDouble,
  Briefcase,
  Car,
  ChartColumnIncreasing,
  ClipboardCheck,
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  Globe2,
  Handshake,
  Headphones,
  Hotel,
  Mail,
  MapPin,
  MessageCircle,
  Palmtree,
  Phone,
  Plane,
  Shield,
  ShieldCheck,
  Sparkles,
  Stamp,
  Star,
  TrendingUp,
  UserCircle,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  BadgeCheck,
  BadgePercent,
  BedDouble,
  Briefcase,
  Car,
  ChartColumnIncreasing,
  ClipboardCheck,
  Clock,
  ContinuousImprovement: ChartColumnIncreasing,
  CreditCard,
  FileCheck,
  FileText,
  Globe2,
  Handshake,
  Headphones,
  Hotel,
  Mail,
  MapPin,
  MessageCircle,
  Palmtree,
  Phone,
  Plane,
  ProfessionalismClipboard: ClipboardCheck,
  Shield,
  ShieldCheck,
  Sparkles,
  Stamp,
  Star,
  TrendingUp,
  TrustHandshake: Handshake,
  UserCircle,
  Users,
  Wallet,
  Zap,
};

/** Resolve a CMS icon name. Returns null when missing/unknown so callers can fall back. */
export function lookupCmsIcon(name?: string | null): LucideIcon | null {
  if (!name?.trim()) return null;
  return ICON_MAP[name.trim()] ?? null;
}

export function resolveCmsIcon(name?: string | null): LucideIcon {
  return lookupCmsIcon(name) ?? Sparkles;
}

export const CMS_ICON_OPTIONS = Object.keys(ICON_MAP);
