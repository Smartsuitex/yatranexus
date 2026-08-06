import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdminFromRequest } from "@/lib/admin-auth";
import {
  listPackages as dbListPackages,
  upsertPackage as dbUpsertPackage,
  deletePackage as dbDeletePackage,
  type PackageUpsertPayload,
} from "@/lib/db-queries/packages";
import {
  listServices as dbListServices,
  upsertService as dbUpsertService,
  deleteService as dbDeleteService,
  getServiceBySlug as dbGetServiceBySlug,
  getServiceBySlugPartial as dbGetServiceBySlugPartial,
  type ServiceUpsertPayload,
} from "@/lib/db-queries/services";
import {
  listBlogPosts as dbListBlogPosts,
  upsertBlogPost as dbUpsertBlogPost,
  deleteBlogPost as dbDeleteBlogPost,
  type BlogPostUpsertPayload,
} from "@/lib/db-queries/blog";
import {
  listGalleryImages as dbListGalleryImages,
  upsertGalleryImage as dbUpsertGalleryImage,
  deleteGalleryImage as dbDeleteGalleryImage,
  type GalleryUpsertPayload,
} from "@/lib/db-queries/gallery";
import {
  listTestimonials as dbListTestimonials,
  upsertTestimonial as dbUpsertTestimonial,
  renumberTestimonials as dbRenumberTestimonials,
  deleteTestimonial as dbDeleteTestimonial,
  type TestimonialUpsertPayload,
} from "@/lib/db-queries/testimonials";
import {
  listFaqs as dbListFaqs,
  upsertFaq as dbUpsertFaq,
  deleteFaq as dbDeleteFaq,
  type FaqUpsertPayload,
} from "@/lib/db-queries/faqs";
import {
  getHomepageSettings as dbGetHomepageSettings,
  saveHomepageSettings as dbSaveHomepageSettings,
  type HomepageSettingsPayload,
} from "@/lib/db-queries/homepage";
import {
  getSiteSettings as dbGetSiteSettings,
  saveSiteSettings as dbSaveSiteSettings,
  type SiteSettingsPayload,
} from "@/lib/db-queries/site-settings";
import {
  getEmailSettings as dbGetEmailSettings,
  saveEmailSettings as dbSaveEmailSettings,
  type EmailSettingsPayload,
} from "@/lib/db-queries/email-settings";
import {
  listDestinations as dbListDestinations,
  upsertDestination as dbUpsertDestination,
  renumberDestinations as dbRenumberDestinations,
  deleteDestination as dbDeleteDestination,
  type DestinationUpsertPayload,
} from "@/lib/db-queries/destinations";
import type { Json, ServiceRow } from "@/lib/db-types";

const IdSchema = z.object({ id: z.string().uuid() });

const OrderedIdsSchema = z.object({
  orderedIds: z.array(z.string().uuid()),
});

const ServiceBannerSchema = z.object({
  slug: z.string().trim().min(1).max(80),
  bannerUrl: z.string().nullable(),
});

/** Core services that must appear in Admin → Services (dedicated public routes). */
const CORE_SERVICE_DEFAULTS: Omit<ServiceRow, "id" | "created_at" | "updated_at">[] = [
  {
    slug: "packages",
    title: "Holiday Packages",
    short_description: "Curated holidays across India and abroad.",
    description:
      "Hand-crafted itineraries across India — fully customisable with real experts on WhatsApp.",
    icon: "Palmtree",
    content_blocks: {
      layout: "holiday",
      eyebrow: "Holiday packages",
      titleFirst: "Holidays you'll",
      titleAccent: "Remember",
      sectionTitle: "Browse by region",
    },
    meta_title: "YatraNexus — Holiday Packages, Domestic & International",
    meta_description:
      "YatraNexus Ventures LLP. Your Journey, Our Priority. Domestic & international holiday packages — handled by real travel experts on WhatsApp.",
    is_active: true,
    sort_order: 4,
    banner_url: null,
    gallery_urls: [],
    inclusions: [],
    exclusions: [],
    faqs: [],
  },
  {
    slug: "corporate",
    title: "Corporate Travel",
    short_description: "Business tours & MICE solutions for companies.",
    description:
      "Business travel made simple with dedicated support, GST invoicing & negotiated corporate fares.",
    icon: "Briefcase",
    banner_url: "/images/hero/corporate-hero.webp",
    content_blocks: {
      layout: "corporate",
      titleFirst: "Corporate & MICE",
      titleAccent: "Travel Solutions",
      sectionTitle: "Our Corporate Services",
      heroBullets: [
        "End-to-end corporate travel management",
        "GST invoicing & monthly MIS reports",
        "Dedicated account manager",
        "24×7 support on WhatsApp & call",
      ],
      features: [
        {
          icon: "Plane",
          title: "Business Travel",
          detail: "Flights, hotels & ground transport",
        },
        {
          icon: "Users",
          title: "MICE & Events",
          detail: "Conferences, meetings, incentives & more",
        },
        {
          icon: "Briefcase",
          title: "Crew & Bulk Bookings",
          detail: "Special fares for crew & large groups",
        },
        {
          icon: "FileText",
          title: "GST Billing",
          detail: "GST-compliant invoicing & MIS",
        },
        {
          icon: "Stamp",
          title: "Visa, Insurance & Forex",
          detail: "Complete travel support",
        },
        {
          icon: "Headphones",
          title: "Dedicated Account Manager",
          detail: "24×7 expert assistance",
        },
      ],
      detailedSectionTitle: "Our Corporate Services",
      detailedServices: [
        {
          icon: "Briefcase",
          title: "Corporate Travel Management",
          detail:
            "End-to-end management of business trips — flights, hotels, cabs and approvals handled by your dedicated desk.",
          image: "/images/corporate/corporatebanner.png",
          accent: "purple",
        },
        {
          icon: "Users",
          title: "Meetings & Conferences (MICE)",
          detail:
            "Venue selection, group bookings, transfers and on-ground coordination for conferences and events.",
          image: "/images/corporate/corporate-hero-desktop.png",
          accent: "orange",
        },
        {
          icon: "Plane",
          title: "Crew & Group Travel Solutions",
          detail:
            "Block bookings, series fares and consolidated billing for teams, crew rotations and large groups.",
          image: "/images/hero/corporate-hero.webp",
          accent: "blue",
        },
        {
          icon: "MapPin",
          title: "Dealer Meets & Exhibitions",
          detail:
            "Logistics for dealer meets, trade shows and exhibitions — travel, stay and local transport bundled.",
          image: "/images/corporate/corporatebanner.png",
          accent: "green",
        },
      ],
    },
    meta_title: "YatraNexus — Corporate Travel, MICE & Business Trips",
    meta_description:
      "YatraNexus Ventures LLP. Your Journey, Our Priority. Corporate travel, MICE, crew bookings & GST invoicing — handled by real travel experts on WhatsApp.",
    is_active: true,
    sort_order: 8,
    gallery_urls: [],
    inclusions: [],
    exclusions: [],
    faqs: [],
  },
];

/** Insert missing core services (Holiday Packages, Corporate Travel) so they show in admin. */
async function ensureCoreServicesImpl(): Promise<void> {
  for (const row of CORE_SERVICE_DEFAULTS) {
    const data = await dbGetServiceBySlugPartial(row.slug);

    if (!data) {
      await dbUpsertService(row);
      continue;
    }

    // Ensure corporate / packages keep a usable hero banner path when empty.
    if (
      (row.slug === "corporate" || row.slug === "packages") &&
      row.banner_url &&
      !String(data.banner_url ?? "").trim()
    ) {
      const full = await dbGetServiceBySlug(row.slug);
      if (!full) {
        throw new Error(`Could not set ${row.slug} hero image: service not found`);
      }
      await dbUpsertService({ ...full, banner_url: row.banner_url });
    }

    // Backfill corporate cards / photo rows if the row exists but is incomplete.
    if (row.slug === "corporate" && row.content_blocks) {
      const blocks =
        data.content_blocks && typeof data.content_blocks === "object"
          ? (data.content_blocks as Record<string, unknown>)
          : {};
      const features = Array.isArray(blocks.features) ? blocks.features : [];
      const detailed = Array.isArray(blocks.detailedServices) ? blocks.detailedServices : [];
      const defaults = row.content_blocks as Record<string, unknown>;
      const patch: Record<string, unknown> = { ...blocks };
      let needsUpdate = false;

      if (features.length === 0 && defaults.features) {
        patch.features = defaults.features;
        needsUpdate = true;
      }
      if (!blocks.heroBullets && defaults.heroBullets) {
        patch.heroBullets = defaults.heroBullets;
        needsUpdate = true;
      }
      if (detailed.length === 0 && defaults.detailedServices) {
        patch.detailedServices = defaults.detailedServices;
        patch.detailedSectionTitle = blocks.detailedSectionTitle ?? defaults.detailedSectionTitle;
        needsUpdate = true;
      }
      if (!blocks.layout && defaults.layout) {
        patch.layout = defaults.layout;
        needsUpdate = true;
      }

      if (needsUpdate) {
        const full = await dbGetServiceBySlug(row.slug);
        if (!full) {
          throw new Error("Could not update corporate service: service not found");
        }
        await dbUpsertService({ ...full, content_blocks: patch as Json });
      }
    }
  }
}

// Packages
export const listPackages = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  return dbListPackages();
});

export const upsertPackage = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as PackageUpsertPayload)
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    return dbUpsertPackage(data);
  });

export const deletePackage = createServerFn({ method: "POST" })
  .validator((data: unknown) => IdSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    await dbDeletePackage(data.id);
  });

export const ensureCoreServices = createServerFn({ method: "POST" }).handler(async () => {
  await requireAdminFromRequest();
  await ensureCoreServicesImpl();
});

// Services
export const listServices = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  await ensureCoreServicesImpl();
  return dbListServices();
});

export const upsertService = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as ServiceUpsertPayload)
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    return dbUpsertService(data);
  });

export const setServiceBannerUrl = createServerFn({ method: "POST" })
  .validator((data: unknown) => ServiceBannerSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    const trimmed = data.bannerUrl?.trim() || null;
    const existing = await dbGetServiceBySlug(data.slug);
    if (!existing) throw new Error(`Service "${data.slug}" not found`);

    const blocks =
      existing.content_blocks && typeof existing.content_blocks === "object"
        ? { ...(existing.content_blocks as Record<string, unknown>) }
        : {};
    if (trimmed) blocks.heroBannerUrl = trimmed;
    else delete blocks.heroBannerUrl;

    return dbUpsertService({
      ...existing,
      banner_url: trimmed,
      content_blocks: blocks as Json,
    });
  });

export const deleteService = createServerFn({ method: "POST" })
  .validator((data: unknown) => IdSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    await dbDeleteService(data.id);
  });

// Blog
export const listBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  return dbListBlogPosts();
});

export const upsertBlogPost = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as BlogPostUpsertPayload)
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    return dbUpsertBlogPost(data);
  });

export const deleteBlogPost = createServerFn({ method: "POST" })
  .validator((data: unknown) => IdSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    await dbDeleteBlogPost(data.id);
  });

// Gallery
export const listGalleryImages = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  return dbListGalleryImages();
});

export const upsertGalleryImage = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as GalleryUpsertPayload)
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    return dbUpsertGalleryImage(data);
  });

export const deleteGalleryImage = createServerFn({ method: "POST" })
  .validator((data: unknown) => IdSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    await dbDeleteGalleryImage(data.id);
  });

// Testimonials
export const listTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  return dbListTestimonials();
});

export const upsertTestimonial = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as TestimonialUpsertPayload)
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    return dbUpsertTestimonial(data);
  });

export const renumberTestimonials = createServerFn({ method: "POST" })
  .validator((data: unknown) => OrderedIdsSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    await dbRenumberTestimonials(data.orderedIds);
  });

export const deleteTestimonial = createServerFn({ method: "POST" })
  .validator((data: unknown) => IdSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    await dbDeleteTestimonial(data.id);
  });

// FAQs
export const listFaqs = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  return dbListFaqs();
});

export const upsertFaq = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as FaqUpsertPayload)
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    return dbUpsertFaq(data);
  });

export const deleteFaq = createServerFn({ method: "POST" })
  .validator((data: unknown) => IdSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    await dbDeleteFaq(data.id);
  });

// Homepage settings (singleton)
export const getHomepageSettings = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  return dbGetHomepageSettings();
});

export const saveHomepageSettings = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as HomepageSettingsPayload)
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    const saved = await dbSaveHomepageSettings(data);
    return { data: saved, skippedHeroInterval: false as const };
  });

// Site settings (singleton)
export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  return dbGetSiteSettings();
});

export const saveSiteSettings = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as SiteSettingsPayload)
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    return dbSaveSiteSettings(data);
  });

// Email settings (singleton)
export const getEmailSettings = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  return dbGetEmailSettings();
});

export const saveEmailSettings = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as EmailSettingsPayload)
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    return dbSaveEmailSettings(data);
  });

// Destinations
export const listDestinations = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  return dbListDestinations();
});

export const upsertDestination = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as DestinationUpsertPayload)
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    return dbUpsertDestination(data);
  });

export const renumberDestinations = createServerFn({ method: "POST" })
  .validator((data: unknown) => OrderedIdsSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    await dbRenumberDestinations(data.orderedIds);
  });

export const deleteDestination = createServerFn({ method: "POST" })
  .validator((data: unknown) => IdSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    await dbDeleteDestination(data.id);
  });
