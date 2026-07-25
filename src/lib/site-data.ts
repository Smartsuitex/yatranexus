// Curated content for YatraNexus website. Images use Unsplash CDN.

import { DESTINATION_SEEDS, PACKAGE_SEEDS } from "@/lib/tour-package-seeds";

/** When false, international holiday pages, packages and destinations are hidden on the public site. */
export const SHOW_INTERNATIONAL = false;

export const COMPANY = {
  name: "YatraNexus",
  legalName: "YatraNexus Ventures LLP",
  tagline: "Your Journey, Our Priority",
  phone: "+91 99250 10377",
  phoneRaw: "919925010377",
  email: "info@yatranexus.com",
  whatsappBase: "https://wa.me/919925010377",
  address:
    "L/8, Gokul Complex, Opp. Gurukul Temple, Drive-In Road, Gurukul, Ahmedabad- 380052",
};

const LEGACY_LEGAL_NAME = "YatraNexus Global LLP";

/** Normalize CMS copy that still references the old legal entity name. */
export function normalizeCompanyCopy(text: string | null | undefined, fallback = ""): string {
  const value = (text?.trim() || fallback).replaceAll(LEGACY_LEGAL_NAME, COMPANY.legalName);
  return value;
}

const LEGACY_SHORT_ADDRESSES = [
  "YatraNexus Ventures LLP, India",
  "YatraNexus Global LLP, India",
];

/** Use full office address when CMS still has the old placeholder. */
export function normalizeCompanyAddress(text: string | null | undefined, fallback = COMPANY.address): string {
  const value = normalizeCompanyCopy(text, fallback).trim();
  if (!value || LEGACY_SHORT_ADDRESSES.some((legacy) => legacy.toLowerCase() === value.toLowerCase())) {
    return COMPANY.address;
  }
  return value;
}

export const CORPORATE_CONTACT = {
  label: "Corporate travel desk",
  phone: COMPANY.phone,
  phoneRaw: COMPANY.phoneRaw,
  email: "corporate@yatranexus.com",
  hours: "Mon–Sat, 9:00 AM – 7:00 PM IST",
  whatsappMessage:
    "Hi YatraNexus corporate desk, we'd like to discuss business travel for our company.",
};

export const SERVICES = [
  {
    slug: "cabs",
    title: "Outstation Cabs",
    short: "Comfortable cabs for intercity travel across India.",
    icon: "Car",
    to: "/services/cabs",
  },
  {
    slug: "flights",
    title: "Flight Booking",
    short: "Best fares on domestic & international flights.",
    icon: "Plane",
    to: "/services/flights",
  },
  {
    slug: "hotels",
    title: "Hotel Booking",
    short: "Hand-picked hotels worldwide at exclusive rates.",
    icon: "Hotel",
    to: "/services/hotels",
  },
  {
    slug: "packages",
    title: "Holiday Packages",
    short: "Curated holidays across India and abroad.",
    icon: "Palmtree",
    to: "/holiday-packages",
  },
  {
    slug: "visa",
    title: "Visa Assistance",
    short: "End-to-end visa assistance for 100+ countries.",
    icon: "Stamp",
    to: "/services/visa",
  },
  {
    slug: "insurance",
    title: "Travel Insurance",
    short: "Stay covered for medical, baggage & trip risks.",
    icon: "ShieldCheck",
    to: "/services/insurance",
  },
  {
    slug: "forex",
    title: "Forex Card",
    short: "Multi-currency forex cards at competitive rates.",
    icon: "CreditCard",
    to: "/services/forex",
  },
  {
    slug: "corporate",
    title: "Corporate Travel",
    short: "Business tours & MICE solutions for companies.",
    icon: "Briefcase",
    to: "/corporate",
  },
] as const;

/** Services shown in inquiry dropdown — excludes Holiday Packages (set per page instead). */
export const INQUIRY_SERVICES = SERVICES.filter((s) => s.slug !== "packages");

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export type Destination = {
  slug: string;
  name: string;
  region: string;
  image: string;
  blurb: string;
  highlights: string[];
};

const DESTINATION_META: Record<string, { region: string; imageId: string }> = {
  goa: { region: "West India", imageId: "photo-1512343879784-a960bf40e7f2" },
  kerala: { region: "South India", imageId: "photo-1602216056096-3b40cc0c9944" },
  rajasthan: { region: "North India", imageId: "photo-1599661046289-e31897846e41" },
  kashmir: { region: "North India", imageId: "photo-1578662996442-48f60103fc96" },
  himachal: { region: "North India", imageId: "photo-1626621341517-bbf3d9990a23" },
  uttarakhand: { region: "North India", imageId: "photo-1506905925346-21bda4d32df4" },
  ladakh: { region: "North India", imageId: "photo-1605649487212-47bdab064df7" },
  andaman: { region: "Andaman & Nicobar", imageId: "photo-1586500036706-41963de24d8b" },
  northeast: { region: "East India", imageId: "photo-1597074866923-dc0589150358" },
  "tamil-nadu": { region: "South India", imageId: "photo-1582510003544-4d00b7f74220" },
  "madhya-pradesh": { region: "Central India", imageId: "photo-1548013146-72479768bada" },
  gujarat: { region: "West India", imageId: "photo-1477587458883-47145ed94245" },
  sikkim: { region: "East India", imageId: "photo-1501785888041-af3ef285b470" },
  assam: { region: "East India", imageId: "photo-1597074866923-dc0589150358" },
  meghalaya: { region: "East India", imageId: "photo-1464822759023-fed622ff2c3b" },
  "arunachal-pradesh": { region: "East India", imageId: "photo-1506905925346-21bda4d32df4" },
  "uttar-pradesh": { region: "North India", imageId: "photo-1564507592333-c60657eea523" },
  lakshadweep: { region: "Lakshadweep", imageId: "photo-1507525428034-b723cf961d3e" },
  maharashtra: { region: "West India", imageId: "photo-1529253355930-ddbe423a2ac7" },
  odisha: { region: "East India", imageId: "photo-1582510003544-4d00b7f74220" },
  "west-bengal": { region: "East India", imageId: "photo-1558431382-27e303142255" },
};

const DEST_ORDER = [
  "goa",
  "kerala",
  "rajasthan",
  "kashmir",
  "himachal",
  "uttarakhand",
  "ladakh",
  "andaman",
  "lakshadweep",
  "tamil-nadu",
  "madhya-pradesh",
  "gujarat",
  "maharashtra",
  "uttar-pradesh",
  "odisha",
  "west-bengal",
  "assam",
  "meghalaya",
  "sikkim",
  "arunachal-pradesh",
  "northeast",
];

export const DOMESTIC_STATES: Destination[] = DEST_ORDER.filter((slug) => DESTINATION_SEEDS[slug]).map(
  (slug) => {
    const seed = DESTINATION_SEEDS[slug];
    const meta = DESTINATION_META[slug] ?? {
      region: "India",
      imageId: "photo-1488646953014-85cb44e25828",
    };
    return {
      slug: seed.slug,
      name: seed.name,
      region: meta.region,
      image: img(meta.imageId),
      blurb: seed.blurb,
      highlights: seed.highlights,
    };
  },
);

export const INTERNATIONAL_COUNTRIES: Destination[] = [
  {
    slug: "dubai",
    name: "Dubai",
    region: "Middle East",
    image: img("photo-1512453979798-5ea266f8880c"),
    blurb: "Skyscrapers, deserts and luxury shopping in the city of gold.",
    highlights: ["Burj Khalifa", "Desert safari", "Dubai Marina cruise", "Atlantis Aquaventure"],
  },
  {
    slug: "bali",
    name: "Bali, Indonesia",
    region: "South-East Asia",
    image: img("photo-1537996194471-e657df975ab4"),
    blurb: "Rice terraces, temples and beach clubs on the island of gods.",
    highlights: ["Ubud rice terraces", "Tanah Lot sunset", "Nusa Penida", "Seminyak beaches"],
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "South-East Asia",
    image: img("photo-1528181304800-259b08848526"),
    blurb: "Phuket beaches, Bangkok nightlife and Krabi's emerald waters.",
    highlights: ["Phi Phi islands", "Bangkok temples", "Krabi", "Pattaya"],
  },
  {
    slug: "maldives",
    name: "Maldives",
    region: "Indian Ocean",
    image: img("photo-1514282401047-d79a71a590e8"),
    blurb: "Overwater villas in the world's most photographed lagoons.",
    highlights: ["Water villa stay", "Snorkeling reefs", "Sunset cruise", "Private sandbank"],
  },
  {
    slug: "singapore",
    name: "Singapore",
    region: "South-East Asia",
    image: img("photo-1565967511849-76a60a516170"),
    blurb: "Garden city of futuristic skylines and food paradise.",
    highlights: ["Marina Bay Sands", "Sentosa Island", "Gardens by the Bay", "Universal Studios"],
  },
  {
    slug: "europe",
    name: "Europe",
    region: "Multi-country",
    image: img("photo-1502602898657-3e91760cbb34"),
    blurb: "Paris, Swiss Alps, Venice and Amsterdam — multi-country classics.",
    highlights: ["Eiffel Tower", "Jungfrau Alps", "Venice gondola", "Amsterdam canals"],
  },
  {
    slug: "turkey",
    name: "Turkey",
    region: "Europe / Asia",
    image: img("photo-1641128324972-af3212f0f6bd"),
    blurb: "Cappadocia balloons, Bosphorus and Pamukkale's white terraces.",
    highlights: ["Cappadocia balloons", "Istanbul Bosphorus", "Pamukkale", "Antalya"],
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    region: "South Asia",
    image: img("photo-1586003456824-9eea3c4cf3e2"),
    blurb: "Tea trails, ancient ruins and tropical southern beaches.",
    highlights: ["Ella & Nuwara Eliya", "Sigiriya rock", "Yala safari", "Bentota beach"],
  },
];

export type Package = {
  slug: string;
  title: string;
  destination: string;
  scope: "domestic" | "international";
  nights: number;
  days: number;
  fromPrice: string;
  image: string;
  overview?: string;
  highlights?: string[];
  inclusions: string[];
  itinerary: { day: number; title: string; detail: string }[];
};

const DESTINATION_IMAGE_BY_NAME: Record<string, string> = Object.fromEntries(
  DOMESTIC_STATES.map((d) => [d.name, d.image]),
);

const GOA_SERENITY_OVERVIEW = "Escape from the hustle and bustle of city life with our South Goa Serenity Escape, a thoughtfully designed holiday package that showcases the peaceful and picturesque side of Goa. Explore pristine beaches, charming Portuguese heritage sites, breathtaking viewpoints, and tranquil coastal villages that offer the perfect blend of relaxation and sightseeing. Spend your days soaking up the sun at the famous Palolem, Butterfly, Agonda, and Benaulim Beaches, admire the panoramic views from Cabo de Rama Fort, and discover Goa's rich cultural heritage with visits to the Basilica of Bom Jesus, Se Cathedral, and Dona Paula View Point. Whether you're planning a romantic honeymoon or a relaxing getaway, this package promises comfortable accommodation, delicious MAP meals, private transportation, and unforgettable memories along Goa's serene coastline.";

function withPackageImage<T extends { destination: string; image: string; slug: string; overview?: string }>(
  pkg: T,
): T {
  const image =
    pkg.image ||
    DESTINATION_IMAGE_BY_NAME[pkg.destination] ||
    img("photo-1488646953014-85cb44e25828", 1200);
  const overview =
    pkg.slug === "south-goa-serenity-escape-4d3n" ? GOA_SERENITY_OVERVIEW : pkg.overview;
  return { ...pkg, image, overview };
}

/** Legacy package slug aliases → canonical seed slug. */
export const PACKAGE_SLUG_ALIASES: Record<string, string> = {
  "goa-beach-bliss-4d3n": "south-goa-serenity-escape-4d3n",
};

export const PACKAGES: Package[] = [
  ...PACKAGE_SEEDS.map((pkg) => withPackageImage({ ...pkg })),
  {
    slug: "dubai-city-desert-5d4n",
    title: "Dubai City & Desert",
    destination: "Dubai, UAE",
    scope: "international",
    nights: 4,
    days: 5,
    fromPrice: "₹ 54,900",
    image: img("photo-1512453979798-5ea266f8880c", 1200),
    inclusions: [
      "4★ city hotel",
      "Burj Khalifa 124th floor",
      "Desert safari with BBQ",
      "Marina dhow cruise",
      "All transfers",
      "Tourist visa assistance",
    ],
    itinerary: [
      { day: 1, title: "Arrival", detail: "Meet & greet, transfer to hotel, evening free." },
      {
        day: 2,
        title: "City tour + Burj Khalifa",
        detail: "Old & new Dubai with At The Top entry.",
      },
      {
        day: 3,
        title: "Desert safari",
        detail: "Dune bashing, camel ride and BBQ dinner with shows.",
      },
      {
        day: 4,
        title: "Marina cruise / Aquaventure",
        detail: "Choose dhow cruise or Atlantis water park (optional).",
      },
      { day: 5, title: "Departure", detail: "Drop to airport." },
    ],
  },
  {
    slug: "bali-island-escape-6d5n",
    title: "Bali Island Escape",
    destination: "Bali, Indonesia",
    scope: "international",
    nights: 5,
    days: 6,
    fromPrice: "₹ 48,500",
    image: img("photo-1537996194471-e657df975ab4", 1200),
    inclusions: [
      "3N Kuta + 2N Ubud",
      "Daily breakfast",
      "Ubud rice terrace tour",
      "Tanah Lot sunset",
      "Nusa Penida day tour",
      "All private transfers",
    ],
    itinerary: [
      { day: 1, title: "Arrival Kuta", detail: "Airport pickup, hotel check-in." },
      {
        day: 2,
        title: "Ubud cultural tour",
        detail: "Tegalalang rice terrace, Monkey Forest, art village.",
      },
      { day: 3, title: "Ubud free / spa", detail: "Optional Mt Batur sunrise trek." },
      {
        day: 4,
        title: "Nusa Penida",
        detail: "Speedboat to Kelingking, Broken Beach, Angel's Billabong.",
      },
      {
        day: 5,
        title: "Tanah Lot sunset",
        detail: "Visit Tanah Lot temple with sunset photography.",
      },
      { day: 6, title: "Departure", detail: "Transfer to Denpasar airport." },
    ],
  },
];

export const VISA_COUNTRIES = [
  { country: "United States", processing: "30–45 working days", type: "B1/B2 Visitor" },
  { country: "United Kingdom", processing: "15–21 working days", type: "Standard Visitor" },
  { country: "Schengen (Europe)", processing: "10–15 working days", type: "Short-stay (90 days)" },
  { country: "Canada", processing: "25–35 working days", type: "Visitor (TRV)" },
  { country: "Australia", processing: "20–30 working days", type: "Subclass 600 Visitor" },
  { country: "Dubai / UAE", processing: "3–5 working days", type: "30/60-day Tourist" },
  { country: "Singapore", processing: "5–7 working days", type: "Tourist eVisa" },
  { country: "Thailand", processing: "5–10 working days", type: "Tourist / eVOA" },
  { country: "Japan", processing: "7–10 working days", type: "Short-term Tourist" },
  { country: "Turkey", processing: "1–3 working days", type: "eVisa" },
];

export const TOUR_TYPES = [
  { slug: "adventure", name: "Adventure", image: img("photo-1530866495561-507c9faab2ed") },
  { slug: "family", name: "Family", image: img("photo-1502920917128-1aa500764cbd") },
  { slug: "honeymoon", name: "Honeymoon", image: img("photo-1519046904884-53103b34b206") },
  { slug: "leisure", name: "Leisure", image: img("photo-1507525428034-b723cf961d3e") },
  { slug: "pilgrimage", name: "Pilgrimage", image: img("photo-1561361513-2d000a50f0dc") },
  { slug: "solo", name: "Solo", image: img("photo-1488646953014-85cb44e25828") },
];

export const HOLIDAY_THEMES = [
  "Beaches",
  "Festival",
  "Historical",
  "Luxury",
  "Mountain",
  "Nightlife",
  "Snow",
  "Waterfalls",
  "Wildlife",
];

export const TESTIMONIALS = [
  {
    name: "Abhinav Shukla",
    city: "Ahmedabad",
    text: "YatraNexus planned our Bhutan trip beautifully. Their travel expert was on WhatsApp through the entire trip. Guide, driver and hotels were excellent.",
  },
  {
    name: "Japen Gandhi",
    city: "Surat",
    text: "Our Himachal honeymoon was very well planned. Hotels and food were great, and the team was responsive whenever we needed help.",
  },
  {
    name: "Vivek Patel",
    city: "Vadodara",
    text: "Completely flexible, professional and understanding team. They patiently answered every question and customised the itinerary the way we wanted.",
  },
  {
    name: "Vishvas Vadher",
    city: "Rajkot",
    text: "Wonderful international trip — everything was well planned, best hotels, excellent service and itinerary exactly as per our requirement.",
  },
  {
    name: "Daxesh Chaudhary",
    city: "Ahmedabad",
    text: "Very happy with the services — quick response and the best price for our package. Thank you YatraNexus team!",
  },
  {
    name: "Nirav Damor",
    city: "Anand",
    text: "Our Himachal Pradesh trip was a fantastic experience. Hotels and arrangements were great and the team was available 24×7.",
  },
];

export const HOW_IT_WORKS = [
  {
    n: 1,
    title: "Share your holiday need",
    detail: "Tell us where you want to go, your dates and budget — via form or WhatsApp.",
  },
  {
    n: 2,
    title: "Get in touch with our expert",
    detail: "A dedicated travel expert calls you back with options curated just for you.",
  },
  {
    n: 3,
    title: "Customise & book",
    detail: "Tweak the itinerary, confirm, pay securely and pack your bags — we handle the rest.",
  },
];

export const WHY_CHOOSE_US = [
  {
    icon: "Headphones",
    title: "24×7 trip support",
    detail: "Real humans on WhatsApp & call — before, during and after your journey.",
  },
  {
    icon: "BadgeCheck",
    title: "Hand-picked partners",
    detail: "Vetted hotels, drivers and local guides — no surprises on the ground.",
  },
  {
    icon: "Wallet",
    title: "Best-price promise",
    detail: "Transparent pricing with the best fares on flights, hotels and packages.",
  },
  {
    icon: "ShieldCheck",
    title: "Safe & secure booking",
    detail: "End-to-end encrypted payments and licensed travel partner you can trust.",
  },
  {
    icon: "Sparkles",
    title: "Fully customisable",
    detail: "Every itinerary is tailored to your dates, budget and travel style.",
  },
  {
    icon: "Globe2",
    title: "100+ destinations",
    detail: "Domestic and international expertise across India, Asia, Europe & beyond.",
  },
];

export const CORPORATE_FEATURES = [
  {
    icon: "Briefcase",
    title: "Business Travel",
    detail:
      "Domestic & international flights, hotels and ground transport — managed under one desk.",
  },
  {
    icon: "Users",
    title: "MICE & Group Tours",
    detail: "Meetings, incentives, conferences and exhibitions for teams of 10 to 1000+.",
  },
  {
    icon: "Plane",
    title: "Crew & Bulk Bookings",
    detail: "Negotiated corporate fares, GSA tie-ups and dedicated relationship manager.",
  },
  {
    icon: "FileText",
    title: "GST Invoicing",
    detail:
      "Compliant GST invoices, monthly reports and centralised billing for your finance team.",
  },
  {
    icon: "Stamp",
    title: "Visa & Forex Desk",
    detail: "Employee visa processing, travel insurance and multi-currency forex cards.",
  },
  {
    icon: "Headphones",
    title: "Dedicated Account Manager",
    detail: "A single point of contact reachable 24×7 for emergency re-routes and changes.",
  },
];

export function whatsappLink(message: string) {
  return `${COMPANY.whatsappBase}?text=${encodeURIComponent(message)}`;
}

export const COMMON_PACKAGE_EXCLUSIONS = [
  "Flights / airfare",
  "Travel insurance",
  "Visa fees",
  "Personal expenses & tips",
  "Optional activities & excursions",
  "Early check-in / late check-out",
  "Meals not mentioned in inclusions",
] as const;

export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "How do I book a holiday package with YatraNexus?",
    a: "Browse packages online, fill the inquiry form, or message us on WhatsApp. A travel expert will call you with a customised quote within a few hours.",
  },
  {
    q: "Do you provide visa assistance?",
    a: "Yes. We handle documentation checklists, application review, appointment booking and status tracking for 100+ countries.",
  },
  {
    q: "Can I customise an itinerary?",
    a: "Every trip we plan is fully customisable — dates, hotels, transfers and sightseeing can be tailored to your budget and preferences.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfer, UPI and major cards for confirmed bookings. Payment schedules are shared before you commit.",
  },
  {
    q: "Is travel insurance included?",
    a: "Insurance can be added to any package or booked separately. Schengen-compliant plans are available for Europe trips.",
  },
  {
    q: "Do you offer corporate travel management?",
    a: "Yes. We manage business travel, MICE events, GST invoicing and dedicated account support for companies across India.",
  },
  {
    q: "How quickly will you respond to my inquiry?",
    a: "WhatsApp inquiries are answered within minutes during business hours. Form submissions receive a callback the same day.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellation terms depend on airlines, hotels and package partners. We share clear policies before you confirm any booking.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  image: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "goa-monsoon-getaway-guide",
    title: "Goa Beyond the Beaches: A Monsoon Getaway Guide",
    excerpt:
      "Quiet lanes, lush greenery and off-season deals make monsoon Goa a hidden gem for slow travellers.",
    category: "Domestic Travel",
    date: "2026-05-12",
    readMinutes: 5,
    image: img("photo-1512343879784-a960bf40e7f2", 1200),
    content: [
      "Monsoon transforms Goa into a greener, calmer version of itself. Fewer crowds mean better rates at boutique stays and more time at spice plantations and heritage churches.",
      "Plan inland experiences like Dudhsagar falls (when open), Fontainhas walks and monsoon-special seafood thalis at local tavernas.",
      "Pack light rain gear and book flexible dates — our team can help you swap outdoor plans if showers roll in.",
    ],
  },
  {
    slug: "schengen-visa-checklist-2026",
    title: "Schengen Visa Checklist for Indian Travellers (2026)",
    excerpt:
      "Documents, timelines and common mistakes to avoid when applying for your first Europe trip.",
    category: "Visa Tips",
    date: "2026-04-28",
    readMinutes: 7,
    image: img("photo-1502602898657-3e91760cbb34", 1200),
    content: [
      "Start with a valid passport (6+ months validity), travel insurance covering €30,000, confirmed flights and hotel bookings or a detailed itinerary.",
      "Financial proof should clearly show sufficient balance for the entire trip duration. Our visa desk shares country-specific checklists before you apply.",
      "Book your VFS appointment early — peak summer slots fill quickly. We track application status and help with cover letters when needed.",
    ],
  },
  {
    slug: "kerala-houseboat-planning-tips",
    title: "Planning the Perfect Kerala Houseboat Experience",
    excerpt:
      "Alleppey backwaters done right — cabin types, meal plans and the best season to cruise.",
    category: "Holiday Ideas",
    date: "2026-03-15",
    readMinutes: 4,
    image: img("photo-1602216056096-3b40cc0c9944", 1200),
    content: [
      "Choose between deluxe and premium houseboats based on AC hours and cabin size. Overnight cruises beat day trips for the full backwater experience.",
      "October to February offers pleasant weather; monsoon cruises are greener but rainier.",
      "Combine Alleppey with Munnar or Thekkady for a classic Kerala circuit — we bundle transfers and guides in one quote.",
    ],
  },
];

export type GalleryImage = {
  id: string;
  title: string;
  album: string;
  image: string;
};

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "1",
    title: "Dal Lake, Kashmir",
    album: "Domestic",
    image: img("photo-1578662996442-48f60103fc96"),
  },
  {
    id: "2",
    title: "Kerala Backwaters",
    album: "Domestic",
    image: img("photo-1602216056096-3b40cc0c9944"),
  },
  {
    id: "3",
    title: "Rajasthan Forts",
    album: "Domestic",
    image: img("photo-1599661046289-e31897846e41"),
  },
  {
    id: "4",
    title: "Goa Sunsets",
    album: "Domestic",
    image: img("photo-1512343879784-a960bf40e7f2"),
  },
  {
    id: "5",
    title: "Maldives Lagoon",
    album: "International",
    image: img("photo-1514282401047-d79a71a590e8"),
  },
  {
    id: "6",
    title: "Bali Rice Terraces",
    album: "International",
    image: img("photo-1537996194471-e657df975ab4"),
  },
  {
    id: "7",
    title: "Dubai Skyline",
    album: "International",
    image: img("photo-1512453979798-5ea266f8880c"),
  },
  {
    id: "8",
    title: "Thailand Islands",
    album: "International",
    image: img("photo-1528181304800-259b08848526"),
  },
  {
    id: "9",
    title: "Swiss Alps",
    album: "International",
    image: img("photo-1502602898657-3e91760cbb34"),
  },
];

export const SERVICE_LINKS = [
  { to: "/services/cabs" as const, title: "Outstation Cabs" },
  { to: "/services/flights" as const, title: "Flight Booking" },
  { to: "/services/hotels" as const, title: "Hotel Booking" },
  { to: "/holiday-packages" as const, title: "Holiday Packages" },
  { to: "/services/visa" as const, title: "Visa Services" },
  { to: "/services/forex" as const, title: "Forex Card" },
  { to: "/services/insurance" as const, title: "Travel Insurance" },
  { to: "/corporate" as const, title: "Corporate Travel" },
] as const;
