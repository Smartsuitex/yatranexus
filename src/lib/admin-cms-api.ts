import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export type PackageRow = Tables["packages"]["Row"];
export type ServiceRow = Tables["services"]["Row"];
export type BlogPostRow = Tables["blog_posts"]["Row"];
export type GalleryRow = Tables["gallery_images"]["Row"];
export type TestimonialRow = Tables["testimonials"]["Row"];
export type FaqRow = Tables["faqs"]["Row"];
export type HomepageRow = Tables["homepage_settings"]["Row"];
export type SiteSettingsRow = Tables["site_settings"]["Row"];
export type DestinationRow = Tables["destinations"]["Row"];

export function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function arrayToLines(value: string[] | null | undefined): string {
  return (value ?? []).join("\n");
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function throwOnError<T>(result: { data: T; error: { message: string } | null }) {
  if (result.error) throw new Error(result.error.message);
  return result.data;
}

// Packages
export async function listPackages() {
  return throwOnError(
    await supabase.from("packages").select("*").order("sort_order").order("title"),
  );
}

export async function upsertPackage(payload: Tables["packages"]["Insert"]) {
  if (payload.id) {
    const { id, ...rest } = payload;
    return throwOnError(
      await supabase.from("packages").update(rest).eq("id", id).select().single(),
    );
  }
  return throwOnError(await supabase.from("packages").insert(payload).select().single());
}

export async function deletePackage(id: string) {
  return throwOnError(await supabase.from("packages").delete().eq("id", id));
}

/** Core services that must appear in Admin → Services (dedicated public routes). */
const CORE_SERVICE_DEFAULTS: Tables["services"]["Insert"][] = [
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
    meta_title: "Holiday Packages — Domestic & International | YatraNexus",
    meta_description:
      "Curated holiday packages across India — Goa, Kerala, Rajasthan, Kashmir and more.",
    is_active: true,
    sort_order: 4,
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
    meta_title: "Corporate & MICE Travel — YatraNexus",
    meta_description:
      "Business travel, MICE, crew bookings, GST invoicing and dedicated account management for companies.",
    is_active: true,
    sort_order: 8,
  },
];

/** Insert missing core services (Holiday Packages, Corporate Travel) so they show in admin. */
export async function ensureCoreServices() {
  for (const row of CORE_SERVICE_DEFAULTS) {
    const { data, error: readError } = await supabase
      .from("services")
      .select("id, content_blocks, banner_url")
      .eq("slug", row.slug)
      .maybeSingle();

    if (readError) {
      throw new Error(`Could not load service "${row.slug}": ${readError.message}`);
    }

    if (!data) {
      const { error: insertError } = await supabase.from("services").insert(row);
      if (insertError) {
        throw new Error(`Could not create service "${row.slug}": ${insertError.message}`);
      }
      continue;
    }

    // Ensure corporate / packages keep a usable hero banner path when empty.
    if (
      (row.slug === "corporate" || row.slug === "packages") &&
      row.banner_url &&
      !String(data.banner_url ?? "").trim()
    ) {
      const { error: bannerError } = await supabase
        .from("services")
        .update({ banner_url: row.banner_url })
        .eq("id", data.id);
      if (bannerError) {
        throw new Error(`Could not set ${row.slug} hero image: ${bannerError.message}`);
      }
    }

    // Backfill corporate cards / photo rows if the row exists but is incomplete.
    if (row.slug === "corporate" && row.content_blocks) {
      const blocks =
        data.content_blocks && typeof data.content_blocks === "object"
          ? (data.content_blocks as Record<string, unknown>)
          : {};
      const features = Array.isArray(blocks.features) ? blocks.features : [];
      const detailed = Array.isArray(blocks.detailedServices)
        ? blocks.detailedServices
        : [];
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
        patch.detailedSectionTitle =
          blocks.detailedSectionTitle ?? defaults.detailedSectionTitle;
        needsUpdate = true;
      }
      if (!blocks.layout && defaults.layout) {
        patch.layout = defaults.layout;
        needsUpdate = true;
      }

      if (needsUpdate) {
        const { error: updateError } = await supabase
          .from("services")
          .update({ content_blocks: patch })
          .eq("id", data.id);
        if (updateError) {
          throw new Error(`Could not update corporate service: ${updateError.message}`);
        }
      }
    }
  }
}

// Services
export async function listServices() {
  await ensureCoreServices();
  return throwOnError(await supabase.from("services").select("*").order("sort_order").order("title"));
}

export async function upsertService(
  payload: Tables["services"]["Insert"] & { id?: string },
) {
  if (payload.id) {
    const { id, ...rest } = payload;
    return throwOnError(
      await supabase.from("services").update(rest).eq("id", id).select().single(),
    );
  }
  return throwOnError(await supabase.from("services").insert(payload).select().single());
}

/** Immediately update a service hero banner (used when admin uploads a new corporate/holiday hero). */
export async function setServiceBannerUrl(slug: string, bannerUrl: string | null) {
  const trimmed = bannerUrl?.trim() || null;
  const { data: existing, error: readError } = await supabase
    .from("services")
    .select("id, content_blocks")
    .eq("slug", slug)
    .maybeSingle();
  if (readError) throw new Error(readError.message);
  if (!existing?.id) throw new Error(`Service "${slug}" not found`);

  const blocks =
    existing.content_blocks && typeof existing.content_blocks === "object"
      ? { ...(existing.content_blocks as Record<string, unknown>) }
      : {};
  if (trimmed) blocks.heroBannerUrl = trimmed;
  else delete blocks.heroBannerUrl;

  return throwOnError(
    await supabase
      .from("services")
      .update({ banner_url: trimmed, content_blocks: blocks })
      .eq("id", existing.id)
      .select()
      .single(),
  );
}

export async function deleteService(id: string) {
  return throwOnError(await supabase.from("services").delete().eq("id", id));
}

// Blog
export async function listBlogPosts() {
  return throwOnError(
    await supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
  );
}

export async function upsertBlogPost(payload: Tables["blog_posts"]["Insert"]) {
  if (payload.id) {
    return throwOnError(await supabase.from("blog_posts").update(payload).eq("id", payload.id).select().single());
  }
  return throwOnError(await supabase.from("blog_posts").insert(payload).select().single());
}

export async function deleteBlogPost(id: string) {
  return throwOnError(await supabase.from("blog_posts").delete().eq("id", id));
}

// Gallery
export async function listGalleryImages() {
  return throwOnError(
    await supabase.from("gallery_images").select("*").order("sort_order").order("title"),
  );
}

export async function upsertGalleryImage(payload: Tables["gallery_images"]["Insert"]) {
  if (payload.id) {
    return throwOnError(
      await supabase.from("gallery_images").update(payload).eq("id", payload.id).select().single(),
    );
  }
  return throwOnError(await supabase.from("gallery_images").insert(payload).select().single());
}

export async function deleteGalleryImage(id: string) {
  return throwOnError(await supabase.from("gallery_images").delete().eq("id", id));
}

// Testimonials
export async function listTestimonials() {
  return throwOnError(
    await supabase.from("testimonials").select("*").order("sort_order").order("name"),
  );
}

export async function upsertTestimonial(payload: Tables["testimonials"]["Insert"]) {
  if (payload.id) {
    const { id, ...rest } = payload;
    return throwOnError(
      await supabase.from("testimonials").update(rest).eq("id", id).select().single(),
    );
  }
  return throwOnError(await supabase.from("testimonials").insert(payload).select().single());
}

/** Persist unique sequential sort numbers (1, 2, 3…) for the given order. */
export async function renumberTestimonials(orderedIds: string[]) {
  // Two-phase update avoids collisions when several rows temporarily share a sort_order.
  for (let index = 0; index < orderedIds.length; index++) {
    await throwOnError(
      await supabase
        .from("testimonials")
        .update({ sort_order: 10_000 + index })
        .eq("id", orderedIds[index]),
    );
  }
  for (let index = 0; index < orderedIds.length; index++) {
    await throwOnError(
      await supabase
        .from("testimonials")
        .update({ sort_order: index + 1 })
        .eq("id", orderedIds[index]),
    );
  }
}

export async function deleteTestimonial(id: string) {
  return throwOnError(await supabase.from("testimonials").delete().eq("id", id));
}

// FAQs
export async function listFaqs() {
  return throwOnError(await supabase.from("faqs").select("*").order("sort_order").order("question"));
}

export async function upsertFaq(payload: Tables["faqs"]["Insert"]) {
  if (payload.id) {
    return throwOnError(await supabase.from("faqs").update(payload).eq("id", payload.id).select().single());
  }
  return throwOnError(await supabase.from("faqs").insert(payload).select().single());
}

export async function deleteFaq(id: string) {
  return throwOnError(await supabase.from("faqs").delete().eq("id", id));
}

// Homepage settings (singleton)
export async function getHomepageSettings() {
  return throwOnError(await supabase.from("homepage_settings").select("*").eq("id", 1).maybeSingle());
}

export async function saveHomepageSettings(payload: Tables["homepage_settings"]["Update"]) {
  const result = await supabase
    .from("homepage_settings")
    .upsert({ id: 1, ...payload })
    .select()
    .single();

  if (
    result.error?.message.includes("hero_interval_ms") &&
    payload.hero_interval_ms !== undefined
  ) {
    const { hero_interval_ms: _interval, ...rest } = payload;
    const retry = await supabase
      .from("homepage_settings")
      .upsert({ id: 1, ...rest })
      .select()
      .single();
    const data = throwOnError(retry);
    return { data, skippedHeroInterval: true as const };
  }

  const data = throwOnError(result);
  return { data, skippedHeroInterval: false as const };
}

// Site settings (singleton)
export async function getSiteSettings() {
  return throwOnError(await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle());
}

export async function saveSiteSettings(payload: Tables["site_settings"]["Update"]) {
  return throwOnError(await supabase.from("site_settings").upsert({ id: 1, ...payload }).select().single());
}

export type EmailSettingsRow = Tables["email_settings"]["Row"];

const EMAIL_SETTINGS_PUBLIC_COLUMNS =
  "id,is_enabled,provider,from_name,from_email,reply_to_email,admin_notification_email,smtp_host,smtp_port,smtp_username,smtp_secure,is_authenticated,last_tested_at,last_test_error,welcome_enabled,welcome_subject,welcome_body_html,inquiry_customer_enabled,inquiry_customer_subject,inquiry_customer_body_html,inquiry_admin_enabled,inquiry_admin_subject,resend_api_key_set,smtp_password_set,updated_at";

const EMAIL_SETTINGS_PUBLIC_COLUMNS_LEGACY =
  "id,is_enabled,provider,from_name,from_email,reply_to_email,admin_notification_email,smtp_host,smtp_port,smtp_username,smtp_secure,is_authenticated,last_tested_at,last_test_error,welcome_enabled,welcome_subject,welcome_body_html,inquiry_customer_enabled,inquiry_customer_subject,inquiry_customer_body_html,inquiry_admin_enabled,inquiry_admin_subject,updated_at";

export async function getEmailSettings() {
  const primary = await supabase
    .from("email_settings")
    .select(EMAIL_SETTINGS_PUBLIC_COLUMNS)
    .eq("id", 1)
    .maybeSingle();

  if (
    primary.error?.message &&
    /resend_api_key_set|smtp_password_set|column/i.test(primary.error.message)
  ) {
    const legacy = await supabase
      .from("email_settings")
      .select(EMAIL_SETTINGS_PUBLIC_COLUMNS_LEGACY)
      .eq("id", 1)
      .maybeSingle();
    const data = throwOnError(legacy) as EmailSettingsRow | null;
    if (!data) return null;
    return {
      ...data,
      resend_api_key_set: false,
      smtp_password_set: false,
    };
  }

  return throwOnError(primary);
}

export async function saveEmailSettings(
  payload: Tables["email_settings"]["Update"] & {
    resend_api_key?: string | null;
    smtp_password?: string | null;
  },
) {
  const update: Tables["email_settings"]["Update"] = {
    ...payload,
    updated_at: new Date().toISOString(),
  };

  // Never clear secrets unless a new value is explicitly provided.
  if (!update.resend_api_key) {
    delete update.resend_api_key;
  } else {
    update.resend_api_key_set = true;
  }

  if (!update.smtp_password) {
    delete update.smtp_password;
  } else {
    update.smtp_password_set = true;
  }

  const result = await supabase
    .from("email_settings")
    .upsert({ id: 1, ...update })
    .select(EMAIL_SETTINGS_PUBLIC_COLUMNS)
    .single();

  if (
    result.error?.message &&
    /resend_api_key_set|smtp_password_set|column/i.test(result.error.message)
  ) {
    const { resend_api_key_set: _a, smtp_password_set: _b, ...legacyUpdate } = update;
    return throwOnError(
      await supabase
        .from("email_settings")
        .upsert({ id: 1, ...legacyUpdate })
        .select(EMAIL_SETTINGS_PUBLIC_COLUMNS_LEGACY)
        .single(),
    );
  }

  return throwOnError(result);
}

// Destinations
export async function listDestinations() {
  return throwOnError(
    await supabase.from("destinations").select("*").order("scope").order("sort_order").order("name"),
  );
}

export async function upsertDestination(payload: Tables["destinations"]["Insert"]) {
  if (payload.id) {
    return throwOnError(
      await supabase.from("destinations").update(payload).eq("id", payload.id).select().single(),
    );
  }
  return throwOnError(await supabase.from("destinations").insert(payload).select().single());
}

/** Persist unique sequential sort numbers (1, 2, 3…) for the given order. */
export async function renumberDestinations(orderedIds: string[]) {
  for (let index = 0; index < orderedIds.length; index++) {
    await throwOnError(
      await supabase
        .from("destinations")
        .update({ sort_order: 10_000 + index })
        .eq("id", orderedIds[index]),
    );
  }
  for (let index = 0; index < orderedIds.length; index++) {
    await throwOnError(
      await supabase
        .from("destinations")
        .update({ sort_order: index + 1 })
        .eq("id", orderedIds[index]),
    );
  }
}

export async function deleteDestination(id: string) {
  return throwOnError(await supabase.from("destinations").delete().eq("id", id));
}
