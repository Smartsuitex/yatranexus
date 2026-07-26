import {
  BadgeCheck,
  Briefcase,
  Building2,
  Clock,
  FileText,
  Globe2,
  Handshake,
  Headphones,
  Plane,
  ShieldCheck,
  Sparkles,
  Stamp,
  Store,
  Timer,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceHeroCopy, ServiceIconItem } from "@/components/site/service-premium/types";
import { STANDARD_HERO_BADGES } from "@/lib/service-premium-trust";

export const CORPORATE_HERO: ServiceHeroCopy = {
  titleFirst: "Corporate & MICE Travel,",
  titleAccent: "Simplified for Your Business",
  subtitle:
    "Business travel made simple with dedicated support, GST invoicing & negotiated corporate fares.",
};

export const CORPORATE_HERO_BADGES: ServiceIconItem[] = STANDARD_HERO_BADGES;

export const CORPORATE_HERO_BULLETS = [
  "End-to-end corporate travel management",
  "GST invoicing & monthly MIS reports",
  "Dedicated account manager",
  "24×7 support on WhatsApp & call",
];

export type CorporateRibbonItem = ServiceIconItem & { detail: string };

/** Trust bar under the hotel-style hero. */
export const CORPORATE_TRUST_RIBBON: CorporateRibbonItem[] = [
  { icon: BadgeCheck, title: "Best Prices", detail: "Guaranteed" },
  { icon: Headphones, title: "24/7 Customer", detail: "Support" },
  { icon: ShieldCheck, title: "Secure Payments", detail: "100% Safe" },
  { icon: Sparkles, title: "Hassle-Free", detail: "Experience" },
];

export const CORPORATE_TRUST_STATS = CORPORATE_TRUST_RIBBON;

/** Service ribbon under the corporate hero (6 items). */
export const CORPORATE_SERVICE_RIBBON: CorporateRibbonItem[] = [
  {
    icon: Plane,
    title: "Business Travel",
    detail: "Flights, hotels & ground transport",
  },
  {
    icon: Users,
    title: "MICE & Events",
    detail: "Conferences, meetings, incentives & more",
  },
  {
    icon: Briefcase,
    title: "Crew & Bulk Bookings",
    detail: "Special fares for crew & large groups",
  },
  {
    icon: FileText,
    title: "GST Billing",
    detail: "GST-compliant invoicing & MIS",
  },
  {
    icon: Stamp,
    title: "Visa, Insurance & Forex",
    detail: "Complete travel support",
  },
  {
    icon: Headphones,
    title: "Dedicated Account Manager",
    detail: "24×7 expert assistance",
  },
];

export const CORPORATE_SECTIONS = {
  servicesLead: "Everything you need for a seamless business travel experience.",
  whyChooseLead: "We make corporate travel smarter, easier and more efficient.",
  detailedLead: "From daily business trips to MICE events and crew movements — tailored corporate travel solutions under one desk.",
  whyUsLead: "Proven experience. Reliable service. Happy clients.",
  proposalLead:
    "Share your requirements and our corporate travel specialist will contact you within one working day.",
} as const;

export const CORPORATE_SERVICES: ServiceIconItem[] = [
  {
    icon: Plane,
    title: "Business Travel",
    detail: "Flights, hotels and ground transport under one desk.",
  },
  {
    icon: Users,
    title: "MICE & Events",
    detail: "Conferences, dealer meets and incentive trips.",
  },
  {
    icon: Briefcase,
    title: "Crew & Bulk Bookings",
    detail: "Group fares and block bookings for teams.",
  },
  {
    icon: FileText,
    title: "GST Billing",
    detail: "Compliant invoicing and expense documentation.",
  },
  {
    icon: Stamp,
    title: "Visa, Insurance & Forex",
    detail: "Complete travel desk for international business.",
  },
  {
    icon: Headphones,
    title: "Dedicated Account Manager",
    detail: "Single point of contact for all travel needs.",
  },
];

export const CORPORATE_WHY_CHOOSE: ServiceIconItem[] = [
  { icon: Wallet, title: "Negotiated Corporate Fares", detail: "Best rates across airlines and hotels." },
  { icon: Headphones, title: "Dedicated Travel Desk", detail: "One team for all bookings." },
  { icon: FileText, title: "GST Invoicing & MIS", detail: "Monthly reports for finance teams." },
  { icon: Clock, title: "24×7 Support", detail: "Emergency help for travellers." },
  { icon: Building2, title: "Corporate Hotel Rates", detail: "Preferred partner properties." },
  { icon: ShieldCheck, title: "Travel Policy Compliance", detail: "Book within your company rules." },
  { icon: BadgeCheck, title: "Monthly Travel Reports", detail: "Spend visibility and analytics." },
  { icon: Globe2, title: "Pan India & Global Presence", detail: "Domestic and international coverage." },
];

export type CorporateDetailedItem = {
  title: string;
  detail: string;
  points: string[];
  image: string;
  icon: LucideIcon;
  accent: "purple" | "orange" | "blue" | "green";
};

export const CORPORATE_DETAILED: CorporateDetailedItem[] = [
  {
    title: "Corporate Travel Management",
    detail:
      "A complete business travel desk for your company — flights, hotels, cabs and policy-compliant bookings handled by a dedicated account manager.",
    points: [
      "Domestic & international flight bookings with corporate fares",
      "Hotel stays, airport transfers and ground transport",
      "Travel policy checks before every confirmation",
      "GST invoicing, approvals and monthly spend MIS",
    ],
    image: "",
    icon: Briefcase,
    accent: "purple",
  },
  {
    title: "Meetings & Conferences (MICE)",
    detail:
      "End-to-end planning for meetings, incentives, conferences and exhibitions — from venue shortlists to group travel and on-ground coordination.",
    points: [
      "Conference, offsite and dealer-meet logistics",
      "Group flights, rooms and meeting-space coordination",
      "Incentive trips and hospitality for partners",
      "On-site support so your team focuses on the event",
    ],
    image: "",
    icon: Users,
    accent: "orange",
  },
  {
    title: "Crew & Group Travel Solutions",
    detail:
      "Reliable bulk and crew movement with negotiated group fares, block bookings and last-minute changes managed without stress.",
    points: [
      "Crew rotations, shift travel and standby support",
      "Large group fares and hotel block bookings",
      "Flexible reissues, name changes and date shifts",
      "Single desk for tickets, stays and ground transfer",
    ],
    image: "",
    icon: Plane,
    accent: "blue",
  },
  {
    title: "Dealer Meets & Exhibitions",
    detail:
      "Travel and stay management for dealer meets, trade shows and roadshows — keep your partners moving smoothly across cities.",
    points: [
      "Multi-city itineraries for sales and partner teams",
      "Exhibition travel, hotel clusters and airport pickups",
      "Check-in coordination and hospitality desk support",
      "Clear billing split for company and partner travel",
    ],
    image: "",
    icon: Store,
    accent: "green",
  },
  {
    title: "GST Billing & MIS Reporting",
    detail:
      "Finance-ready documentation for every booking — GST-compliant invoices, consolidated billing and monthly travel reports for your accounts team.",
    points: [
      "GST invoices aligned to your company entities",
      "Monthly MIS with route, spend and traveller views",
      "Centralised billing for multi-branch companies",
      "Audit-friendly booking and invoice trail",
    ],
    image: "",
    icon: FileText,
    accent: "purple",
  },
  {
    title: "Visa, Insurance & Forex Desk",
    detail:
      "Complete international business travel support — visas, travel insurance and forex — so employees land ready for work.",
    points: [
      "Business visa documentation and appointment help",
      "Travel insurance for short and long assignments",
      "Forex cards and currency for overseas trips",
      "One desk for tickets, visa and insurance together",
    ],
    image: "",
    icon: Stamp,
    accent: "orange",
  },
];

export const CORPORATE_WHY_US_ROW: ServiceIconItem[] = [
  { icon: Globe2, title: "200+ Countries Covered" },
  { icon: Headphones, title: "24/7 Support" },
  { icon: FileText, title: "GST Compliant Invoicing" },
  { icon: Timer, title: "On-time & Reliable" },
  { icon: Users, title: "Dedicated Account Manager" },
  { icon: ShieldCheck, title: "Secure & Hassle-free" },
];

export const CORPORATE_CTA = {
  title: "Let's simplify your business travel",
  subtitle:
    "One partner for all your corporate travel needs. Save time, reduce costs and travel stress-free.",
  buttonLabel: "Request Corporate Travel Proposal",
  buttonHint: "Our team will contact you soon!",
} as const;

export const CORPORATE_PARTNERSHIP_CALLOUT =
  "We don't just book travel, we build partnerships. Your growth is our priority.";

export const CORPORATE_SERVICE_OPTIONS = [
  "Business Travel",
  "MICE & Events",
  "Crew & Bulk Bookings",
  "GST Billing & MIS",
  "Visa, Insurance & Forex",
  "Other Corporate Travel",
] as const;

export const CORPORATE_TRAVEL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const CORPORATE_EMPLOYEE_OPTIONS = [
  "1–20 employees",
  "20–50 employees",
  "50–200 employees",
  "200+ employees",
] as const;

export const CORPORATE_TRAVEL_REQUIREMENTS = [
  "One-time trip",
  "Monthly recurring travel",
  "Quarterly events",
  "Annual contract",
  "Not sure yet",
] as const;
