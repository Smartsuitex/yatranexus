import type { PublicServiceFeature } from "@/lib/public-cms";
import { COMPANY, normalizeCompanyCopy } from "@/lib/site-data";

export type PageHeroContent = {
  eyebrow?: string;
  titleFirst?: string;
  titleAccent?: string;
  subtitle?: string;
  bannerUrl?: string;
};

export type PageFeatureItem = PublicServiceFeature;

export type SiteNavLink = {
  label: string;
  to?: string;
  href?: string;
  params?: Record<string, string>;
};

export type PublicPageContent = {
  about?: PageHeroContent & {
    whoWeAreTitle?: string;
    whoWeAreBody?: string;
    missionTitle?: string;
    missionDetail?: string;
    visionTitle?: string;
    visionDetail?: string;
    offerTitle?: string;
    offerItems?: PageFeatureItem[];
    valuesTitle?: string;
    valuesItems?: PageFeatureItem[];
    ctaTitle?: string;
    ctaSubtitle?: string;
  };
  contact?: PageHeroContent & {
    promisesTitle?: string;
    promises?: PageFeatureItem[];
    formTitle?: string;
    formSubtitle?: string;
    formNote?: string;
    ctaTitle?: string;
    ctaSubtitle?: string;
  };
  privacy?: { title?: string; body?: string };
  terms?: { title?: string; body?: string };
  servicesIndex?: PageHeroContent;
  blog?: PageHeroContent;
  gallery?: PageHeroContent;
  faq?: PageHeroContent;
  testimonials?: PageHeroContent;
  holidayDomestic?: PageHeroContent;
  holidayInternational?: PageHeroContent;
  homepage?: {
    trustPills?: string[];
    trustBar?: PageFeatureItem[];
    corporateBannerUrl?: string;
    destinationPrices?: Record<string, string>;
    destinationTaglines?: Record<string, string>;
    tourTypesEyebrow?: string;
    tourTypesTitle?: string;
    tourTypesLead?: string;
    featuredEyebrow?: string;
    featuredTitle?: string;
    domesticEyebrow?: string;
    domesticTitle?: string;
    whyChooseEyebrow?: string;
    whyChooseTitle?: string;
    whyChooseLead?: string;
    howItWorksEyebrow?: string;
    howItWorksTitle?: string;
    howItWorksLead?: string;
    testimonialsEyebrow?: string;
    testimonialsTitle?: string;
    testimonialsLead?: string;
  };
  /** Site-wide flags and editable chrome (nav, SEO, WhatsApp presets). */
  site?: {
    showInternational?: boolean;
    whatsappPreset?: string;
    corporateWhatsappMessage?: string;
    seoTitle?: string;
    seoDescription?: string;
    commonPackageExclusions?: string[];
  };
  navigation?: {
    headerLinks?: SiteNavLink[];
    exploreLinks?: SiteNavLink[];
    companyLinks?: SiteNavLink[];
    bottomLinks?: SiteNavLink[];
  };
};

export const DEFAULT_PAGE_CONTENT: PublicPageContent = {
  about: {
    eyebrow: "About YatraNexus",
    titleFirst: "Your Journey,",
    titleAccent: "Our Priority",
    subtitle:
      "At YatraNexus, we believe every journey should be simple, memorable and stress-free. We are here to make your travel planning easy, reliable and truly special.",
    bannerUrl: "/images/hero/about-hero.png",
    whoWeAreTitle: "Who We Are",
    whoWeAreBody:
      "YatraNexus is a new-age travel startup built around one simple idea — every traveller deserves a real expert, not a chatbot.\n\nWhether you're booking a family holiday, a business trip or a group tour, our team handles the details so you can focus on the experience.\n\nFrom the first call to your return home, we're with you on WhatsApp and phone — transparent pricing, honest advice and support when you need it most.",
    missionTitle: "Our Mission",
    missionDetail:
      "To make travel planning easy, affordable and hassle-free by delivering customized travel solutions backed by honest advice and dedicated customer support.",
    visionTitle: "Our Vision",
    visionDetail:
      "To become a trusted travel partner for individuals, families and businesses by delivering exceptional service and creating memorable travel experiences.",
    offerTitle: "What We Offer",
    offerItems: [
      {
        icon: "Plane",
        title: "Flight Assistance",
        detail: "Domestic & international fares with expert support.",
        accent: "purple",
      },
      {
        icon: "Building2",
        title: "Hotel Reservations",
        detail: "Hand-picked stays at negotiated rates.",
        accent: "orange",
      },
      {
        icon: "Palmtree",
        title: "Holiday Packages",
        detail: "Curated itineraries across India & abroad.",
        accent: "blue",
      },
      {
        icon: "Car",
        title: "Cabs & Airport Transfers",
        detail: "Reliable ground transport when you land.",
        accent: "green",
      },
      {
        icon: "Stamp",
        title: "Visa Assistance",
        detail: "Documentation and processing for 100+ countries.",
        accent: "purple",
      },
      {
        icon: "ShieldCheck",
        title: "Travel Insurance",
        detail: "Coverage for medical, baggage & trip risks.",
        accent: "orange",
      },
      {
        icon: "CreditCard",
        title: "Forex Card & Currency",
        detail: "Multi-currency cards at competitive rates.",
        accent: "blue",
      },
      {
        icon: "Briefcase",
        title: "Corporate & MICE Travel",
        detail: "Business travel desk with GST billing & MIS.",
        accent: "green",
      },
    ],
    valuesTitle: "Our Values",
    valuesItems: [
      { icon: "Handshake", title: "Trust", detail: "" },
      { icon: "Shield", title: "Transparency", detail: "" },
      { icon: "Star", title: "Customer Satisfaction", detail: "" },
      { icon: "ShieldCheck", title: "Reliability", detail: "" },
      { icon: "UserCircle", title: "Professionalism", detail: "" },
      { icon: "TrendingUp", title: "Continuous Improvement", detail: "" },
    ],
    ctaTitle: "Ready to plan with us?",
    ctaSubtitle: "Tell us where you want to go — our experts will handle the rest.",
  },
  contact: {
    eyebrow: "Contact Us",
    titleFirst: "Let's Plan Your",
    titleAccent: "Next Trip",
    subtitle:
      "Send an inquiry and our travel expert will call you back the same day — or reach us on phone, email or WhatsApp anytime.",
    bannerUrl: "/images/hero/contact-hero.png",
    promisesTitle: "Why Contact Us",
    promises: [
      {
        icon: "Zap",
        title: "Same-Day Callback",
        detail: "Share your inquiry and hear back from a travel expert within working hours.",
      },
      {
        icon: "MessageCircle",
        title: "WhatsApp Support",
        detail: "Quick answers on chat — ideal for dates, fares and itinerary tweaks.",
      },
      {
        icon: "Headphones",
        title: "Dedicated Experts",
        detail: "Real humans who know flights, hotels, visa and holidays — not bots.",
      },
    ],
    formTitle: "Send an Inquiry",
    formSubtitle: "Tell us where you'd like to go — we'll prepare options and call you back.",
    formNote: "We respond on WhatsApp & call within working hours.",
    ctaTitle: "Let's Plan Your Next Journey",
    ctaSubtitle:
      "Whether it's a weekend getaway, an international holiday, a business trip or a dream vacation, YatraNexus is here to make your travel planning simple and convenient.",
  },
  privacy: {
    title: "Privacy Policy",
    body: "We respect your privacy. Information you share through inquiry forms is used only to respond to your travel requests and improve our services.\n\nWe do not sell your personal data. Contact details may be shared with trusted travel partners only as needed to fulfil your booking.\n\nFor privacy questions, email us at the address listed on our Contact page.",
  },
  terms: {
    title: "Terms & Conditions",
    body: "By using the YatraNexus website and services, you agree to receive travel quotes and communications related to your inquiry.\n\nBookings are subject to airline, hotel and supplier terms. Prices and availability can change until confirmed.\n\nCancellation and refund policies depend on the specific booking and will be shared before you confirm payment.",
  },
  servicesIndex: {
    eyebrow: "Our services",
    titleFirst: "Everything you need",
    titleAccent: "to travel",
    subtitle:
      "From a single flight to a full honeymoon itinerary — pick a service below and our team will handle the rest on WhatsApp or phone.",
  },
  blog: {
    eyebrow: "Blog",
    titleFirst: "Stories, tips",
    titleAccent: "& guides",
    subtitle: "Ideas and advice for your next trip across India and beyond.",
  },
  gallery: {
    eyebrow: "Gallery",
    titleFirst: "Moments from",
    titleAccent: "the journey",
    subtitle: "A glimpse of destinations and experiences we love planning.",
  },
  faq: {
    eyebrow: "FAQs",
    titleFirst: "Questions,",
    titleAccent: "answered",
    subtitle: "Quick answers about booking, payments, visas and support.",
  },
  testimonials: {
    eyebrow: "Testimonials",
    titleFirst: "Loved by",
    titleAccent: "travellers",
    subtitle: "Real feedback from guests who travelled with YatraNexus.",
  },
  holidayDomestic: {
    eyebrow: "Incredible India",
    titleFirst: "Explore India",
    titleAccent: "by State",
    subtitle: "Pick a state to view highlights, sample packages and request a quote.",
    bannerUrl: "/images/hero/holiday-packages-hero-desktop.png",
  },
  holidayInternational: {
    eyebrow: "Beyond borders",
    titleFirst: "Explore the",
    titleAccent: "World",
    subtitle: "Pick a destination to view highlights, sample packages and request a quote.",
    bannerUrl: "/images/hero/holiday-packages-hero-desktop.png",
  },
  homepage: {
    trustPills: [
      "Domestic & International Travel",
      "Personalized Planning",
      "Trusted Travel Partners",
      "Dedicated Customer Support",
    ],
    trustBar: [
      { icon: "BadgeCheck", title: "Best Prices", detail: "Guaranteed" },
      { icon: "Headphones", title: "24/7 Customer", detail: "Support" },
      { icon: "ShieldCheck", title: "Secure Payments", detail: "100% Safe" },
      { icon: "Sparkles", title: "Hassle-Free", detail: "Experience" },
    ],
    tourTypesEyebrow: "Hand-picked for you",
    tourTypesTitle: "Tour Type Packages",
    tourTypesLead:
      "Browse by the kind of trip you're dreaming about — adventure, family, honeymoon and more.",
    featuredEyebrow: "Bestsellers",
    featuredTitle: "Featured Holiday Plans",
    domesticEyebrow: "Incredible India",
    domesticTitle: "Domestic Destinations",
    whyChooseEyebrow: "Why choose us",
    whyChooseTitle: "Travel with people who actually pick up the phone.",
    whyChooseLead:
      "YatraNexus is built around one promise - every traveller deserves a real expert, not a chatbot. From a weekend Goa break to a multi-country honeymoon, we plan, book and stay with you end-to-end.",
    howItWorksEyebrow: "3 Simple Steps",
    howItWorksTitle: "How It Works",
    howItWorksLead:
      "From a quick WhatsApp hello to a fully booked trip – here's how easy it is.",
    testimonialsEyebrow: "Loved by travellers",
    testimonialsTitle: "Happy Customers",
    testimonialsLead: "Real stories from real trips planned by our team.",
  },
  site: {
    showInternational: false,
    whatsappPreset: "Hi YatraNexus, I'd like to plan a trip.",
    corporateWhatsappMessage:
      "Hi YatraNexus corporate desk, we'd like to discuss business travel for our company.",
    seoTitle: "YatraNexus — Flights, Hotels, Holidays, Visa & Cabs",
    seoDescription:
      "YatraNexus Ventures LLP — flights, hotels, holiday packages, cabs, visa, travel insurance and forex. Your Journey, Our Priority.",
    commonPackageExclusions: [
      "Flights / airfare",
      "Travel insurance",
      "Visa fees",
      "Personal expenses & tips",
      "Optional activities & excursions",
      "Early check-in / late check-out",
    ],
  },
  navigation: {
    headerLinks: [
      { label: "Home", to: "/" },
      { label: "Corporate Travel", to: "/corporate" },
      { label: "Holiday Packages", to: "/holiday-packages" },
      { label: "About Us", to: "/about" },
      { label: "Contact Us", to: "/contact" },
    ],
    exploreLinks: [
      { label: "Corporate Travel", to: "/corporate" },
      { label: "Outstation Cabs", to: "/services/cabs" },
      { label: "Flight Booking", to: "/services/flights" },
      { label: "Hotel Booking", to: "/services/hotels" },
      { label: "Holiday Packages", to: "/holiday-packages" },
      { label: "Visa Services", to: "/services/visa" },
      { label: "Travel Insurance", to: "/services/insurance" },
      { label: "Forex Card", to: "/services/forex" },
    ],
    companyLinks: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Blog", to: "/blog" },
    ],
    bottomLinks: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms", to: "/terms" },
      { label: "Cancellation Policy", to: "/terms" },
      { label: "Cookies", to: "/privacy-policy" },
    ],
  },
};

export function parsePageContent(raw: unknown): PublicPageContent {
  if (!raw || typeof raw !== "object") return { ...DEFAULT_PAGE_CONTENT };
  const data = raw as PublicPageContent;
  return {
    ...DEFAULT_PAGE_CONTENT,
    ...data,
    about: {
      ...DEFAULT_PAGE_CONTENT.about,
      ...data.about,
      offerItems: data.about?.offerItems?.length
        ? data.about.offerItems
        : DEFAULT_PAGE_CONTENT.about?.offerItems,
      valuesItems: data.about?.valuesItems?.length
        ? data.about.valuesItems
        : DEFAULT_PAGE_CONTENT.about?.valuesItems,
    },
    contact: {
      ...DEFAULT_PAGE_CONTENT.contact,
      ...data.contact,
      promises: data.contact?.promises?.length
        ? data.contact.promises
        : DEFAULT_PAGE_CONTENT.contact?.promises,
    },
    privacy: { ...DEFAULT_PAGE_CONTENT.privacy, ...data.privacy },
    terms: { ...DEFAULT_PAGE_CONTENT.terms, ...data.terms },
    servicesIndex: { ...DEFAULT_PAGE_CONTENT.servicesIndex, ...data.servicesIndex },
    blog: { ...DEFAULT_PAGE_CONTENT.blog, ...data.blog },
    gallery: { ...DEFAULT_PAGE_CONTENT.gallery, ...data.gallery },
    faq: { ...DEFAULT_PAGE_CONTENT.faq, ...data.faq },
    testimonials: { ...DEFAULT_PAGE_CONTENT.testimonials, ...data.testimonials },
    holidayDomestic: { ...DEFAULT_PAGE_CONTENT.holidayDomestic, ...data.holidayDomestic },
    holidayInternational: {
      ...DEFAULT_PAGE_CONTENT.holidayInternational,
      ...data.holidayInternational,
    },
    homepage: {
      ...DEFAULT_PAGE_CONTENT.homepage,
      ...data.homepage,
      trustBar: data.homepage?.trustBar?.length
        ? data.homepage.trustBar
        : DEFAULT_PAGE_CONTENT.homepage?.trustBar,
      trustPills: data.homepage?.trustPills?.length
        ? data.homepage.trustPills
        : DEFAULT_PAGE_CONTENT.homepage?.trustPills,
      destinationPrices: {
        ...(DEFAULT_PAGE_CONTENT.homepage?.destinationPrices ?? {}),
        ...(data.homepage?.destinationPrices ?? {}),
      },
      destinationTaglines: {
        ...(DEFAULT_PAGE_CONTENT.homepage?.destinationTaglines ?? {}),
        ...(data.homepage?.destinationTaglines ?? {}),
      },
    },
    site: {
      ...DEFAULT_PAGE_CONTENT.site,
      ...data.site,
      showInternational:
        typeof data.site?.showInternational === "boolean"
          ? data.site.showInternational
          : DEFAULT_PAGE_CONTENT.site?.showInternational,
      commonPackageExclusions:
        data.site?.commonPackageExclusions ??
        DEFAULT_PAGE_CONTENT.site?.commonPackageExclusions,
    },
    navigation: {
      ...DEFAULT_PAGE_CONTENT.navigation,
      ...data.navigation,
      headerLinks:
        data.navigation?.headerLinks ?? DEFAULT_PAGE_CONTENT.navigation?.headerLinks,
      exploreLinks: data.navigation?.exploreLinks?.length
        ? data.navigation.exploreLinks
        : DEFAULT_PAGE_CONTENT.navigation?.exploreLinks,
      companyLinks: data.navigation?.companyLinks?.length
        ? data.navigation.companyLinks
        : DEFAULT_PAGE_CONTENT.navigation?.companyLinks,
      bottomLinks: data.navigation?.bottomLinks?.length
        ? data.navigation.bottomLinks
        : DEFAULT_PAGE_CONTENT.navigation?.bottomLinks,
    },
  };
}

export function brandFromSettings(row?: {
  legal_name?: string | null;
  tagline?: string | null;
}): { legalName: string; tagline: string } {
  return {
    legalName: normalizeCompanyCopy(row?.legal_name, COMPANY.legalName),
    tagline: row?.tagline?.trim() || COMPANY.tagline,
  };
}
