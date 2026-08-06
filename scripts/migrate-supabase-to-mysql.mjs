#!/usr/bin/env node
/**
 * Import Supabase snapshot JSON into Hostinger MySQL.
 * Normalizes image URLs to /images/... paths for local filesystem storage.
 *
 * Usage:
 *   DATABASE_URL=mysql://user:pass@localhost:3306/yatranexus node scripts/migrate-supabase-to-mysql.mjs
 *   node scripts/migrate-supabase-to-mysql.mjs --dry-run
 *   node scripts/migrate-supabase-to-mysql.mjs --apply
 */

import { createPool } from "mysql2/promise";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";

const root = dirname(fileURLToPath(import.meta.url));
const dryRun = !process.argv.includes("--apply");
const snapshotPath =
  process.argv.find((a) => a.startsWith("--snapshot="))?.slice("--snapshot=".length) ??
  join(root, "output", "old-snapshot.json");

function loadEnv() {
  const envPath = join(root, "..", ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m && process.env[m[1]] == null) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

loadEnv();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("Set DATABASE_URL (mysql://user:pass@host:3306/dbname)");
  process.exit(1);
}

function parseDatabaseUrl(url) {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: u.port ? Number(u.port) : 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ""),
  };
}

const snap = JSON.parse(readFileSync(snapshotPath, "utf8"));

function normalizeKey(s) {
  return String(s)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function listImages(dir) {
  const abs = join(process.cwd(), "public", "images", dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs)
    .filter((f) => /\.(png|jpe?g|webp|svg|gif)$/i.test(f))
    .map((f) => ({
      file: f,
      url: `/images/${dir}/${f}`,
      key: normalizeKey(f.replace(/\.(png|jpe?g|webp|svg|gif)$/i, "")),
    }));
}

const allLocal = [
  ...listImages("packages"),
  ...listImages("banners"),
  ...listImages("gallery"),
  ...listImages("hero"),
  ...listImages("destinations"),
  ...listImages("corporate"),
  ...listImages("logo"),
  ...listImages("testimonials"),
  ...listImages("blog"),
  ...listImages("services"),
];

function bestLocalMatch(needle) {
  const key = normalizeKey(needle);
  if (!key) return null;
  let hit = allLocal.find((c) => c.key === key);
  if (hit) return hit;
  hit = allLocal.find((c) => c.key.includes(key) || key.includes(c.key));
  if (hit && Math.min(hit.key.length, key.length) >= 6) return hit;
  return null;
}

function decodeHtml(url) {
  return String(url || "").replace(/&amp;/g, "&");
}

function storagePathFromUrl(url) {
  const decoded = decodeHtml(url);
  const marker = "/cms-images/";
  const idx = decoded.indexOf(marker);
  if (idx < 0) return null;
  return decoded.slice(idx + marker.length).split("?")[0].replace(/^\/+|\/+$/g, "");
}

function normalizeImageUrl(url, hints = []) {
  const decoded = decodeHtml(url);
  if (!decoded) return null;
  if (decoded.startsWith("/images/")) return decoded;

  const storagePath = storagePathFromUrl(decoded);
  if (storagePath) {
    return `/images/${storagePath}`;
  }

  if (decoded.includes("unsplash.com")) {
    for (const hint of hints) {
      const local = bestLocalMatch(hint);
      if (local) return local.url;
    }
    return "/images/hero/holiday-packages-hero-desktop.webp";
  }

  for (const hint of hints) {
    const local = bestLocalMatch(hint);
    if (local) return local.url;
  }

  return decoded;
}

function normalizeImageArray(urls, hints = []) {
  if (!Array.isArray(urls)) return "[]";
  return JSON.stringify(
    urls.map((u) => normalizeImageUrl(u, hints) ?? u).filter(Boolean),
  );
}

function normalizeJsonImages(value, hints = []) {
  if (value == null) return null;
  const walk = (v) => {
    if (typeof v === "string") {
      if (
        v.includes("supabase.co/storage") ||
        v.includes("unsplash.com") ||
        v.startsWith("/images/") ||
        v.includes("/cms-images/")
      ) {
        return normalizeImageUrl(v, hints);
      }
      return v;
    }
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === "object") {
      const out = {};
      for (const [k, val] of Object.entries(v)) {
        out[k] = walk(val);
      }
      return out;
    }
    return v;
  };
  return JSON.stringify(walk(typeof value === "string" ? JSON.parse(value) : value));
}

function toJson(v) {
  if (v == null) return JSON.stringify([]);
  if (typeof v === "string") return v;
  return JSON.stringify(v);
}

function toBool(v) {
  return v ? 1 : 0;
}

function toDatetime(v) {
  if (!v) return null;
  const d = new Date(String(v));
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 23).replace("T", " ");
}

const pool = createPool({ ...parseDatabaseUrl(DATABASE_URL), timezone: "Z" });

async function run(sql, params = []) {
  if (dryRun) return;
  await pool.execute(sql, params);
}

async function truncateAll() {
  const tables = [
    "packages",
    "destinations",
    "services",
    "blog_posts",
    "gallery_images",
    "testimonials",
    "faqs",
    "homepage_settings",
    "site_settings",
    "email_settings",
  ];
  await run("SET FOREIGN_KEY_CHECKS = 0");
  for (const t of tables) {
    await run(`DELETE FROM ${t}`);
  }
  await run("SET FOREIGN_KEY_CHECKS = 1");
}

console.log(dryRun ? "MODE: dry-run" : "MODE: apply");
console.log(`Snapshot: ${snapshotPath}`);
console.log(`Local images indexed: ${allLocal.length}\n`);

if (!dryRun) await truncateAll();

// packages
for (const row of snap.packages ?? []) {
  const hints = [row.slug, row.title, row.destination];
  await run(
    `INSERT INTO packages (
      id, slug, title, destination, scope, nights, days, from_price, discount_price,
      package_code, image_url, gallery_urls, inclusions, exclusions, itinerary,
      is_active, is_featured, meta_title, meta_description, sort_order, created_at, updated_at
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      row.id || randomUUID(),
      row.slug,
      row.title?.replace(/&amp;/g, "&") ?? row.title,
      row.destination,
      row.scope,
      row.nights,
      row.days,
      row.from_price,
      row.discount_price,
      row.package_code,
      normalizeImageUrl(row.image_url, hints),
      normalizeImageArray(row.gallery_urls, hints),
      toJson(row.inclusions ?? []),
      toJson(row.exclusions ?? []),
      toJson(row.itinerary ?? []),
      toBool(row.is_active),
      toBool(row.is_featured),
      row.meta_title,
      row.meta_description?.replace(/&amp;/g, "&") ?? row.meta_description,
      row.sort_order ?? 0,
      toDatetime(row.created_at),
      toDatetime(row.updated_at),
    ],
  );
}
console.log(`packages: ${(snap.packages ?? []).length}`);

// destinations
for (const row of snap.destinations ?? []) {
  const hints = [row.slug, row.name];
  await run(
    `INSERT INTO destinations (
      id, slug, scope, name, region, image_url, blurb, highlights,
      is_active, sort_order, created_at, updated_at
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      row.id || randomUUID(),
      row.slug,
      row.scope,
      row.name,
      row.region,
      normalizeImageUrl(row.image_url, hints),
      row.blurb,
      toJson(row.highlights ?? []),
      toBool(row.is_active ?? true),
      row.sort_order ?? 0,
      toDatetime(row.created_at),
      toDatetime(row.updated_at),
    ],
  );
}
console.log(`destinations: ${(snap.destinations ?? []).length}`);

// services
for (const row of snap.services ?? []) {
  const hints = [row.slug, row.title];
  await run(
    `INSERT INTO services (
      id, slug, title, short_description, description, banner_url, icon,
      gallery_urls, inclusions, exclusions, faqs, content_blocks,
      is_active, sort_order, meta_title, meta_description, created_at, updated_at
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      row.id || randomUUID(),
      row.slug,
      row.title,
      row.short_description,
      row.description,
      normalizeImageUrl(row.banner_url, hints),
      row.icon,
      normalizeImageArray(row.gallery_urls, hints),
      toJson(row.inclusions ?? []),
      toJson(row.exclusions ?? []),
      toJson(row.faqs ?? []),
      normalizeJsonImages(row.content_blocks ?? {}, hints) ?? toJson(row.content_blocks ?? {}),
      toBool(row.is_active ?? true),
      row.sort_order ?? 0,
      row.meta_title,
      row.meta_description,
      toDatetime(row.created_at),
      toDatetime(row.updated_at),
    ],
  );
}
console.log(`services: ${(snap.services ?? []).length}`);

// blog_posts
for (const row of snap.blog_posts ?? []) {
  await run(
    `INSERT INTO blog_posts (
      id, slug, title, excerpt, category, content, featured_image_url, tags,
      read_minutes, is_published, published_at, meta_title, meta_description, created_at, updated_at
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      row.id || randomUUID(),
      row.slug,
      row.title,
      row.excerpt,
      row.category,
      toJson(row.content ?? []),
      normalizeImageUrl(row.featured_image_url, [row.slug, row.title]),
      toJson(row.tags ?? []),
      row.read_minutes ?? 5,
      toBool(row.is_published),
      row.published_at ? toDatetime(row.published_at) : null,
      row.meta_title,
      row.meta_description,
      toDatetime(row.created_at),
      toDatetime(row.updated_at),
    ],
  );
}
console.log(`blog_posts: ${(snap.blog_posts ?? []).length}`);

// gallery_images
for (const row of snap.gallery_images ?? []) {
  await run(
    `INSERT INTO gallery_images (id, title, album, image_url, sort_order, is_active, created_at)
     VALUES (?,?,?,?,?,?,?)`,
    [
      row.id || randomUUID(),
      row.title,
      row.album ?? "General",
      normalizeImageUrl(row.image_url, [row.title, row.album]),
      row.sort_order ?? 0,
      toBool(row.is_active ?? true),
      toDatetime(row.created_at),
    ],
  );
}
console.log(`gallery_images: ${(snap.gallery_images ?? []).length}`);

// testimonials
for (const row of snap.testimonials ?? []) {
  await run(
    `INSERT INTO testimonials (
      id, name, city, designation, review_text, rating, photo_url, is_active, sort_order, created_at
    ) VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [
      row.id || randomUUID(),
      row.name,
      row.city,
      row.designation,
      row.review_text,
      row.rating ?? 5,
      normalizeImageUrl(row.photo_url, [row.name]),
      toBool(row.is_active ?? true),
      row.sort_order ?? 0,
      toDatetime(row.created_at),
    ],
  );
}
console.log(`testimonials: ${(snap.testimonials ?? []).length}`);

// faqs
for (const row of snap.faqs ?? []) {
  await run(
    `INSERT INTO faqs (id, question, answer, category, sort_order, is_active, created_at)
     VALUES (?,?,?,?,?,?,?)`,
    [
      row.id || randomUUID(),
      row.question,
      row.answer,
      row.category ?? "general",
      row.sort_order ?? 0,
      toBool(row.is_active ?? true),
      toDatetime(row.created_at),
    ],
  );
}
console.log(`faqs: ${(snap.faqs ?? []).length}`);

// homepage_settings (singleton)
for (const row of snap.homepage_settings ?? [{ id: 1 }]) {
  const hints = ["hero", "homepage"];
  await run(
    `INSERT INTO homepage_settings (
      id, hero_slides, hero_interval_ms, featured_service_slugs, featured_package_slugs,
      featured_destination_slugs, about_title, about_content, why_choose_us, stats,
      how_it_works, corporate_features, tour_types, holiday_themes, cta_title, cta_subtitle, updated_at
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE
      hero_slides=VALUES(hero_slides), hero_interval_ms=VALUES(hero_interval_ms),
      featured_service_slugs=VALUES(featured_service_slugs),
      featured_package_slugs=VALUES(featured_package_slugs),
      featured_destination_slugs=VALUES(featured_destination_slugs),
      about_title=VALUES(about_title), about_content=VALUES(about_content),
      why_choose_us=VALUES(why_choose_us), stats=VALUES(stats),
      how_it_works=VALUES(how_it_works), corporate_features=VALUES(corporate_features),
      tour_types=VALUES(tour_types), holiday_themes=VALUES(holiday_themes),
      cta_title=VALUES(cta_title), cta_subtitle=VALUES(cta_subtitle),
      updated_at=VALUES(updated_at)`,
    [
      1,
      normalizeJsonImages(row.hero_slides ?? [], hints) ?? toJson(row.hero_slides ?? []),
      row.hero_interval_ms ?? 10000,
      toJson(row.featured_service_slugs ?? []),
      toJson(row.featured_package_slugs ?? []),
      toJson(row.featured_destination_slugs ?? []),
      row.about_title,
      row.about_content,
      toJson(row.why_choose_us ?? []),
      toJson(row.stats ?? []),
      toJson(row.how_it_works ?? []),
      toJson(row.corporate_features ?? []),
      normalizeJsonImages(row.tour_types ?? [], hints) ?? toJson(row.tour_types ?? []),
      toJson(row.holiday_themes ?? []),
      row.cta_title,
      row.cta_subtitle,
      toDatetime(row.updated_at),
    ],
  );
}
console.log(`homepage_settings: 1`);

// site_settings (singleton)
for (const row of snap.site_settings ?? [{ id: 1 }]) {
  await run(
    `INSERT INTO site_settings (
      id, contact_phone, contact_phone_raw, contact_email, contact_whatsapp, address,
      map_embed_url, business_hours, social_links, footer_text, logo_url, favicon_url,
      legal_name, tagline, page_content, updated_at
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE
      contact_phone=VALUES(contact_phone), contact_phone_raw=VALUES(contact_phone_raw),
      contact_email=VALUES(contact_email), contact_whatsapp=VALUES(contact_whatsapp),
      address=VALUES(address), map_embed_url=VALUES(map_embed_url),
      business_hours=VALUES(business_hours), social_links=VALUES(social_links),
      footer_text=VALUES(footer_text), logo_url=VALUES(logo_url), favicon_url=VALUES(favicon_url),
      legal_name=VALUES(legal_name), tagline=VALUES(tagline), page_content=VALUES(page_content),
      updated_at=VALUES(updated_at)`,
    [
      1,
      row.contact_phone,
      row.contact_phone_raw,
      row.contact_email,
      row.contact_whatsapp,
      row.address,
      row.map_embed_url,
      row.business_hours,
      toJson(row.social_links ?? {}),
      row.footer_text,
      normalizeImageUrl(row.logo_url, ["logo"]),
      normalizeImageUrl(row.favicon_url, ["favicon"]),
      row.legal_name,
      row.tagline,
      toJson(row.page_content ?? {}),
      toDatetime(row.updated_at),
    ],
  );
}
console.log(`site_settings: 1`);

// email_settings (singleton)
for (const row of snap.email_settings ?? [{ id: 1 }]) {
  await run(
    `INSERT INTO email_settings (
      id, is_enabled, provider, from_name, from_email, reply_to_email, admin_notification_email,
      resend_api_key, smtp_host, smtp_port, smtp_username, smtp_password, smtp_secure,
      resend_api_key_set, smtp_password_set, is_authenticated, last_tested_at, last_test_error,
      welcome_enabled, welcome_subject, welcome_body_html,
      inquiry_customer_enabled, inquiry_customer_subject, inquiry_customer_body_html,
      inquiry_admin_enabled, inquiry_admin_subject, updated_at
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE
      is_enabled=VALUES(is_enabled), provider=VALUES(provider),
      from_name=VALUES(from_name), from_email=VALUES(from_email),
      reply_to_email=VALUES(reply_to_email), admin_notification_email=VALUES(admin_notification_email),
      resend_api_key=VALUES(resend_api_key), smtp_host=VALUES(smtp_host),
      smtp_port=VALUES(smtp_port), smtp_username=VALUES(smtp_username),
      smtp_password=VALUES(smtp_password), smtp_secure=VALUES(smtp_secure),
      resend_api_key_set=VALUES(resend_api_key_set), smtp_password_set=VALUES(smtp_password_set),
      welcome_enabled=VALUES(welcome_enabled), welcome_subject=VALUES(welcome_subject),
      welcome_body_html=VALUES(welcome_body_html),
      inquiry_customer_enabled=VALUES(inquiry_customer_enabled),
      inquiry_customer_subject=VALUES(inquiry_customer_subject),
      inquiry_customer_body_html=VALUES(inquiry_customer_body_html),
      inquiry_admin_enabled=VALUES(inquiry_admin_enabled),
      inquiry_admin_subject=VALUES(inquiry_admin_subject),
      updated_at=VALUES(updated_at)`,
    [
      1,
      toBool(row.is_enabled),
      row.provider ?? "smtp",
      row.from_name,
      row.from_email,
      row.reply_to_email,
      row.admin_notification_email,
      row.resend_api_key ?? null,
      row.smtp_host,
      row.smtp_port ?? 587,
      row.smtp_username,
      row.smtp_password ?? null,
      toBool(row.smtp_secure),
      toBool(row.resend_api_key),
      toBool(row.smtp_password),
      toBool(row.is_authenticated),
      row.last_tested_at ? toDatetime(row.last_tested_at) : null,
      row.last_test_error,
      toBool(row.welcome_enabled ?? true),
      row.welcome_subject,
      row.welcome_body_html,
      toBool(row.inquiry_customer_enabled ?? true),
      row.inquiry_customer_subject,
      row.inquiry_customer_body_html,
      toBool(row.inquiry_admin_enabled ?? true),
      row.inquiry_admin_subject,
      toDatetime(row.updated_at),
    ],
  );
}
console.log(`email_settings: 1`);

await pool.end();
console.log("\nDone. Run scripts/setup-admin-user.mjs to create an admin account.");
