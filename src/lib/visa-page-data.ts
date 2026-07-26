import {
  Award,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileCheck,
  FilePenLine,
  Globe2,
  Headphones,
  MessageCircle,
  Radar,
  Search,
  ShieldCheck,
  Stamp,
  Target,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceHeroCopy, ServiceIconItem } from "@/components/site/service-premium/types";

export const VISA_HERO: ServiceHeroCopy = {
  titleFirst: "Visa Services",
  titleAccent: "Global Access, Hassle-Free Process",
  subtitle:
    "End-to-end visa assistance for tourist, business and work visas across the world.",
};

export const VISA_HERO_BADGES: ServiceIconItem[] = [
  { icon: Users, title: "Expert", detail: "Assistance" },
  { icon: Award, title: "High", detail: "Success" },
  { icon: Target, title: "Quick", detail: "Process" },
  { icon: ShieldCheck, title: "Secure", detail: "Reliable" },
];

/** Floating feature card under premium visa hero. */
export const VISA_TRUST_RIBBON: ServiceIconItem[] = [
  { icon: Users, title: "Expert Assistance", detail: "Guidance at every step" },
  { icon: Award, title: "High Success", detail: "Better approval ratio" },
  { icon: Target, title: "Quick Process", detail: "Timely & efficient" },
  { icon: ShieldCheck, title: "Secure & Reliable", detail: "100% safe handling" },
];

export const VISA_TRUST_STATS = VISA_TRUST_RIBBON;

export const VISA_WHY_ITEMS: ServiceIconItem[] = [
  {
    icon: FileCheck,
    title: "Document preparation",
    detail: "Cover letters, itineraries and financial proof reviewed by visa experts.",
  },
  {
    icon: Clock,
    title: "Appointment booking",
    detail: "VFS, VAC and embassy slots secured on your behalf.",
  },
  {
    icon: Globe2,
    title: "Tourist & business",
    detail: "Visitor visas for holidays, meetings, conferences and trade visits.",
  },
  {
    icon: Headphones,
    title: "Tracking & support",
    detail: "Real-time updates from application submission to passport return.",
  },
  {
    icon: ShieldCheck,
    title: "Genuine advice",
    detail: "Honest eligibility guidance before you apply — no false promises.",
  },
];

export const VISA_TABLE_SUBTITLE =
  "Tourist and business visa types with indicative processing timelines for Indian passport holders.";

export const VISA_DEFAULT_STEPS: {
  n: number;
  title: string;
  detail: string;
  duration: string;
  tone: "purple" | "orange" | "pink" | "blue" | "green";
  icon: LucideIcon;
}[] = [
  {
    n: 1,
    title: "Free Consultation",
    detail: "Talk to our visa expert and share your destination, travel dates and purpose.",
    duration: "10 – 15 mins",
    tone: "purple",
    icon: MessageCircle,
  },
  {
    n: 2,
    title: "Document Checklist",
    detail: "We review your documents and provide a personalized checklist.",
    duration: "Same Day",
    tone: "orange",
    icon: ClipboardList,
  },
  {
    n: 3,
    title: "Application Filing",
    detail: "We complete your application and schedule your Embassy/VFS appointment.",
    duration: "1 Business Day",
    tone: "pink",
    icon: FilePenLine,
  },
  {
    n: 4,
    title: "Tracking & Updates",
    detail: "We track your application and share real-time status updates until your visa is approved.",
    duration: "Until Approval",
    tone: "blue",
    icon: Radar,
  },
  {
    n: 5,
    title: "Travel Ready",
    detail: "Collect your passport with visa and get ready for your journey with peace of mind.",
    duration: "As per Embassy",
    tone: "green",
    icon: CheckCircle2,
  },
];

export const VISA_STEP_ICONS: LucideIcon[] = VISA_DEFAULT_STEPS.map((s) => s.icon);

export type VisaTableRow = {
  country: string;
  touristVisa: string;
  businessVisa: string;
  processingTime: string;
};

/** Sourced from Tour Packages/Visa.xlsx */
export const VISA_TABLE_ROWS: VisaTableRow[] = [
  {
    country: "Australia",
    touristVisa: "Visitor Visa (Subclass 600)",
    businessVisa: "Business Visitor Stream (Subclass 600)",
    processingTime:
      "Tourist: 15–30 days; Business: 15–30 days (Some applications may take longer)",
  },
  {
    country: "Canada",
    touristVisa: "Temporary Resident Visa (TRV)",
    businessVisa: "Business Visitor",
    processingTime:
      "Tourist: 3–8 weeks; Business: 3–8 weeks (Varies by biometrics & IRCC workload)",
  },
  {
    country: "Dubai / UAE",
    touristVisa: "30/60-Day Tourist Visa",
    businessVisa: "Business Visit Visa",
    processingTime:
      "Tourist: 2–5 working days (Express: 24–48 hours); Business: 3–5 working days",
  },
  {
    country: "Schengen Countries (Europe)",
    touristVisa: "Short-Stay (Type C)",
    businessVisa: "Business Schengen Visa",
    processingTime:
      "Tourist: 15–30 calendar days; Business: 15–30 calendar days (Apply 30–45 days before travel)",
  },
  {
    country: "Indonesia (Bali)",
    touristVisa: "Tourist Visa / Visa on Arrival",
    businessVisa: "Business Visa",
    processingTime:
      "Tourist: Instant (VOA) / 3–5 working days (eVisa); Business: 5–10 working days",
  },
  {
    country: "Japan",
    touristVisa: "Short-Term Tourist",
    businessVisa: "Temporary Business Visitor",
    processingTime: "Tourist: 5–7 working days; Business: 5–7 working days",
  },
  {
    country: "Malaysia",
    touristVisa: "Tourist eVisa",
    businessVisa: "Business Visa",
    processingTime: "Tourist: 2–5 working days; Business: 3–5 working days",
  },
  {
    country: "Maldives",
    touristVisa: "Visa on Arrival",
    businessVisa: "Business Visa",
    processingTime: "Tourist: Visa on Arrival; Business: 5–10 working days",
  },
  {
    country: "New Zealand",
    touristVisa: "Visitor Visa",
    businessVisa: "Business Visitor Visa",
    processingTime: "Tourist: 20–30 working days; Business: 20–30 working days",
  },
  {
    country: "Saudi Arabia",
    touristVisa: "Tourist eVisa",
    businessVisa: "Business Visit Visa",
    processingTime: "Tourist: 1–3 working days; Business: 3–7 working days",
  },
  {
    country: "Singapore",
    touristVisa: "Tourist eVisa",
    businessVisa: "Business Visit Visa",
    processingTime: "Tourist: 3–5 working days; Business: 3–5 working days",
  },
  {
    country: "South Africa",
    touristVisa: "Visitor Visa",
    businessVisa: "Business Visa",
    processingTime: "Tourist: 5–10 working days; Business: 5–10 working days",
  },
  {
    country: "South Korea",
    touristVisa: "Tourist Visa",
    businessVisa: "Business Visa",
    processingTime: "Tourist: 7–15 working days; Business: 7–15 working days",
  },
  {
    country: "Thailand",
    touristVisa: "Tourist Visa / eVOA",
    businessVisa: "Non-Immigrant B (Business)",
    processingTime: "Tourist: 3–7 working days; Business: 5–10 working days",
  },
  {
    country: "Turkey",
    touristVisa: "eVisa",
    businessVisa: "Business eVisa / Sticker Visa",
    processingTime: "Tourist eVisa: Within 24 hours; Business: 5–15 working days",
  },
  {
    country: "United Kingdom",
    touristVisa: "Standard Visitor",
    businessVisa: "Standard Visitor (Business Activities)",
    processingTime:
      "Tourist: 15 working days (Priority: 5 days); Business: 15 working days (Priority & Super Priority available)",
  },
  {
    country: "United States",
    touristVisa: "B1/B2 Visitor",
    businessVisa: "B1 Business",
    processingTime:
      "Tourist: Visa approval 3–10 working days after interview. Interview appointment may take a few days to several months. Business: Same timeline.",
  },
  {
    country: "Vietnam",
    touristVisa: "Tourist eVisa",
    businessVisa: "Business Visa",
    processingTime: "Tourist: 3–5 working days; Business: 5–7 working days",
  },
];

export const VISA_CTA = {
  title: "Planning your international trip?",
  subtitle: "Let our visa experts help you get your visa approved with ease.",
  buttonLabel: "Send Visa Inquiry",
  buttonHint: "Our team will contact you soon!",
} as const;

export const VISA_TRUST_FOOTER: ServiceIconItem[] = [
  { icon: ShieldCheck, title: "100% Genuine Advice", detail: "Honest & reliable guidance" },
  { icon: FileCheck, title: "Document Checklist", detail: "Proper verification & review" },
  { icon: Search, title: "Application Tracking", detail: "Real-time status updates" },
  { icon: Briefcase, title: "Support Until Approval", detail: "We're with you all the way" },
];

export const VISA_TRUST_ICONS = {
  Stamp,
  Headphones,
};
