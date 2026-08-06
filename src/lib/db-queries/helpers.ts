import { randomUUID } from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";
import {
  fromMysqlDate,
  fromMysqlDatetime,
  parseBool,
  parseJson,
  parseStringArray,
  toJson,
  toMysqlDatetime,
} from "@/lib/db-json";
import type {
  AdminUserRow,
  BlogPostRow,
  DestinationRow,
  EmailSettingsRow,
  FaqRow,
  GalleryRow,
  HomepageRow,
  Inquiry,
  PackageRow,
  ServiceRow,
  SiteSettingsRow,
  TestimonialRow,
} from "@/lib/db-types";

export function newId(): string {
  return randomUUID();
}

export function mapPackageRow(row: RowDataPacket): PackageRow {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    destination: row.destination,
    scope: row.scope,
    nights: Number(row.nights),
    days: Number(row.days),
    from_price: row.from_price,
    discount_price: row.discount_price ?? null,
    package_code: row.package_code ?? null,
    image_url: row.image_url ?? null,
    gallery_urls: parseStringArray(row.gallery_urls),
    inclusions: parseStringArray(row.inclusions),
    exclusions: parseStringArray(row.exclusions),
    itinerary: parseJson(row.itinerary, []),
    is_active: parseBool(row.is_active),
    is_featured: parseBool(row.is_featured),
    meta_title: row.meta_title ?? null,
    meta_description: row.meta_description ?? null,
    sort_order: Number(row.sort_order ?? 0),
    created_at: fromMysqlDatetime(row.created_at),
    updated_at: fromMysqlDatetime(row.updated_at),
  };
}

export function mapServiceRow(row: RowDataPacket): ServiceRow {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    short_description: row.short_description ?? null,
    description: row.description ?? null,
    banner_url: row.banner_url ?? null,
    icon: row.icon ?? null,
    gallery_urls: parseStringArray(row.gallery_urls),
    inclusions: parseStringArray(row.inclusions),
    exclusions: parseStringArray(row.exclusions),
    faqs: parseJson(row.faqs, []),
    content_blocks: parseJson(row.content_blocks, {}),
    is_active: parseBool(row.is_active),
    sort_order: Number(row.sort_order ?? 0),
    meta_title: row.meta_title ?? null,
    meta_description: row.meta_description ?? null,
    created_at: fromMysqlDatetime(row.created_at),
    updated_at: fromMysqlDatetime(row.updated_at),
  };
}

export function mapBlogRow(row: RowDataPacket): BlogPostRow {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? null,
    category: row.category ?? null,
    content: parseJson(row.content, []),
    featured_image_url: row.featured_image_url ?? null,
    tags: parseStringArray(row.tags),
    read_minutes: Number(row.read_minutes ?? 5),
    is_published: parseBool(row.is_published),
    published_at: row.published_at ? fromMysqlDatetime(row.published_at) : null,
    meta_title: row.meta_title ?? null,
    meta_description: row.meta_description ?? null,
    created_at: fromMysqlDatetime(row.created_at),
    updated_at: fromMysqlDatetime(row.updated_at),
  };
}

export function mapGalleryRow(row: RowDataPacket): GalleryRow {
  return {
    id: String(row.id),
    title: row.title,
    album: row.album,
    image_url: row.image_url,
    sort_order: Number(row.sort_order ?? 0),
    is_active: parseBool(row.is_active),
    created_at: fromMysqlDatetime(row.created_at),
  };
}

export function mapTestimonialRow(row: RowDataPacket): TestimonialRow {
  return {
    id: String(row.id),
    name: row.name,
    city: row.city ?? null,
    designation: row.designation ?? null,
    review_text: row.review_text,
    rating: Number(row.rating ?? 5),
    photo_url: row.photo_url ?? null,
    is_active: parseBool(row.is_active),
    sort_order: Number(row.sort_order ?? 0),
    created_at: fromMysqlDatetime(row.created_at),
  };
}

export function mapFaqRow(row: RowDataPacket): FaqRow {
  return {
    id: String(row.id),
    question: row.question,
    answer: row.answer,
    category: row.category ?? "general",
    sort_order: Number(row.sort_order ?? 0),
    is_active: parseBool(row.is_active),
    created_at: fromMysqlDatetime(row.created_at),
  };
}

export function mapDestinationRow(row: RowDataPacket): DestinationRow {
  return {
    id: String(row.id),
    slug: row.slug,
    scope: row.scope,
    name: row.name,
    region: row.region,
    image_url: row.image_url,
    blurb: row.blurb ?? null,
    highlights: parseStringArray(row.highlights),
    is_active: parseBool(row.is_active),
    sort_order: Number(row.sort_order ?? 0),
    created_at: fromMysqlDatetime(row.created_at),
    updated_at: fromMysqlDatetime(row.updated_at),
  };
}

export function mapHomepageRow(row: RowDataPacket): HomepageRow {
  return {
    id: Number(row.id),
    hero_slides: parseJson(row.hero_slides, []),
    hero_interval_ms: Number(row.hero_interval_ms ?? 10000),
    featured_service_slugs: parseStringArray(row.featured_service_slugs),
    featured_package_slugs: parseStringArray(row.featured_package_slugs),
    featured_destination_slugs: parseStringArray(row.featured_destination_slugs),
    about_title: row.about_title ?? null,
    about_content: row.about_content ?? null,
    why_choose_us: parseJson(row.why_choose_us, []),
    stats: parseJson(row.stats, []),
    how_it_works: parseJson(row.how_it_works, []),
    corporate_features: parseJson(row.corporate_features, []),
    tour_types: parseJson(row.tour_types, []),
    holiday_themes: parseJson(row.holiday_themes, []),
    cta_title: row.cta_title ?? null,
    cta_subtitle: row.cta_subtitle ?? null,
    updated_at: fromMysqlDatetime(row.updated_at),
  };
}

export function mapSiteSettingsRow(row: RowDataPacket): SiteSettingsRow {
  return {
    id: Number(row.id),
    contact_phone: row.contact_phone ?? null,
    contact_phone_raw: row.contact_phone_raw ?? null,
    contact_email: row.contact_email ?? null,
    contact_whatsapp: row.contact_whatsapp ?? null,
    address: row.address ?? null,
    map_embed_url: row.map_embed_url ?? null,
    business_hours: row.business_hours ?? null,
    social_links: parseJson(row.social_links, {}),
    footer_text: row.footer_text ?? null,
    logo_url: row.logo_url ?? null,
    favicon_url: row.favicon_url ?? null,
    legal_name: row.legal_name ?? null,
    tagline: row.tagline ?? null,
    page_content: parseJson(row.page_content, {}),
    updated_at: fromMysqlDatetime(row.updated_at),
  };
}

export function mapEmailSettingsRow(row: RowDataPacket): EmailSettingsRow {
  return {
    id: Number(row.id),
    is_enabled: parseBool(row.is_enabled),
    provider: row.provider === "smtp" ? "smtp" : "resend",
    from_name: row.from_name ?? null,
    from_email: row.from_email ?? null,
    reply_to_email: row.reply_to_email ?? null,
    admin_notification_email: row.admin_notification_email ?? null,
    resend_api_key: row.resend_api_key ?? null,
    smtp_host: row.smtp_host ?? null,
    smtp_port: row.smtp_port != null ? Number(row.smtp_port) : null,
    smtp_username: row.smtp_username ?? null,
    smtp_password: row.smtp_password ?? null,
    smtp_secure: parseBool(row.smtp_secure),
    resend_api_key_set: parseBool(row.resend_api_key_set),
    smtp_password_set: parseBool(row.smtp_password_set),
    is_authenticated: parseBool(row.is_authenticated),
    last_tested_at: row.last_tested_at ? fromMysqlDatetime(row.last_tested_at) : null,
    last_test_error: row.last_test_error ?? null,
    welcome_enabled: parseBool(row.welcome_enabled),
    welcome_subject: row.welcome_subject ?? null,
    welcome_body_html: row.welcome_body_html ?? null,
    inquiry_customer_enabled: parseBool(row.inquiry_customer_enabled),
    inquiry_customer_subject: row.inquiry_customer_subject ?? null,
    inquiry_customer_body_html: row.inquiry_customer_body_html ?? null,
    inquiry_admin_enabled: parseBool(row.inquiry_admin_enabled),
    inquiry_admin_subject: row.inquiry_admin_subject ?? null,
    updated_at: fromMysqlDatetime(row.updated_at),
  };
}

export function mapAdminUserRow(row: RowDataPacket): AdminUserRow {
  return {
    id: String(row.id),
    email: row.email,
    password_hash: row.password_hash,
    full_name: row.full_name ?? null,
    role: "admin",
    reset_token_hash: row.reset_token_hash ?? null,
    reset_token_expires: row.reset_token_expires
      ? fromMysqlDatetime(row.reset_token_expires)
      : null,
    created_at: fromMysqlDatetime(row.created_at),
    updated_at: fromMysqlDatetime(row.updated_at),
  };
}

export function mapInquiryRow(row: RowDataPacket): Inquiry {
  return {
    id: String(row.id),
    service_type: row.service_type,
    name: row.name,
    phone: row.phone,
    email: row.email ?? null,
    subject: row.subject ?? null,
    destination: row.destination ?? null,
    travel_date: fromMysqlDate(row.travel_date),
    travelers: row.travelers != null ? Number(row.travelers) : null,
    message: row.message ?? null,
    package_name: row.package_name ?? null,
    source_page: row.source_page ?? null,
    selected_inclusions: row.selected_inclusions ? parseStringArray(row.selected_inclusions) : null,
    selected_exclusions: row.selected_exclusions ? parseStringArray(row.selected_exclusions) : null,
    status: row.status,
    admin_notes: row.admin_notes ?? null,
    phone_normalized: row.phone_normalized ?? null,
    booking_history: parseJson(row.booking_history, []),
    created_at: fromMysqlDatetime(row.created_at),
    updated_at: fromMysqlDatetime(row.updated_at),
  };
}

export { toJson, toMysqlDatetime };
