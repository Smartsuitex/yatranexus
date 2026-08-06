#!/usr/bin/env node
/**
 * Verify live site routes + ALL CMS image paths from MySQL.
 *
 * Usage:
 *   node scripts/verify-live-site.mjs
 *   node scripts/verify-live-site.mjs https://yatranexus.com
 *   node scripts/verify-live-site.mjs https://yatranexus.com --limit=80
 *
 * Reads DATABASE_URL from .env (local MySQL CMS copy).
 */

import { createConnection } from "mysql2/promise";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = join(root, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

const args = process.argv.slice(2);
const base = (args.find((a) => a.startsWith("http")) || "https://yatranexus.com").replace(
  /\/$/,
  "",
);
const limitArg = args.find((a) => a.startsWith("--limit="));
const imageLimit = limitArg ? Number(limitArg.split("=")[1]) || 0 : 0; // 0 = all

const routes = [
  "/",
  "/holiday-packages",
  "/holiday-packages/domestic",
  "/holiday-packages/international",
  "/holiday-packages/tour/family",
  "/holiday-packages/tour/honeymoon",
  "/holiday-packages/tour/adventure",
  "/holiday-packages/domestic/kerala",
  "/holiday-packages/domestic/goa",
  "/services",
  "/services/flights",
  "/services/hotels",
  "/services/cabs",
  "/services/visa",
  "/services/insurance",
  "/services/forex",
  "/corporate",
  "/about",
  "/contact",
  "/blog",
  "/gallery",
  "/testimonials",
  "/faq",
  "/privacy-policy",
  "/terms",
  "/admin/login",
];

const EXPECTED_INDEXES = [
  ["packages", "idx_packages_active_sort"],
  ["packages", "idx_packages_featured"],
  ["packages", "idx_packages_destination"],
  ["packages", "idx_packages_scope_active"],
  ["services", "idx_services_active_sort"],
  ["blog_posts", "idx_blog_published"],
  ["gallery_images", "idx_gallery_active_sort"],
  ["testimonials", "idx_testimonials_active_sort"],
  ["faqs", "idx_faqs_active_sort"],
  ["destinations", "idx_destinations_active_scope"],
  ["inquiries", "idx_inquiries_status_created"],
];

const ERROR_RE =
  /Database is not configured|Access denied for user|DATABASE_URL is invalid|ECONNREFUSED|Internal Server Error|Something went wrong|Application error/i;

function normalizeImagePath(raw) {
  if (!raw || typeof raw !== "string") return null;
  let u = raw.trim();
  if (!u || u.startsWith("data:")) return null;
  if (u.startsWith("//")) u = "https:" + u;
  // External CDN — skip local /images check but keep for report
  if (/^https?:\/\//i.test(u) && !u.includes("/images/")) {
    return { path: u, kind: "external" };
  }
  const m = u.match(/\/images\/[^?#]+/i);
  if (m) return { path: m[0].replace(/\\/g, "/"), kind: "local" };
  if (u.startsWith("images/")) return { path: "/" + u.replace(/\\/g, "/"), kind: "local" };
  return null;
}

function walkJsonForImages(value, out) {
  if (value == null) return;
  if (typeof value === "string") {
    const n = normalizeImagePath(value);
    if (n) out.add(JSON.stringify(n));
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) walkJsonForImages(item, out);
    return;
  }
  if (typeof value === "object") {
    for (const v of Object.values(value)) walkJsonForImages(v, out);
  }
}

function parseJsonField(raw) {
  if (raw == null) return null;
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function collectDbImages(conn) {
  const bag = new Set();

  const [packages] = await conn.query(
    "SELECT image_url, gallery_urls FROM packages WHERE image_url IS NOT NULL OR gallery_urls IS NOT NULL",
  );
  for (const row of packages) {
    walkJsonForImages(row.image_url, bag);
    walkJsonForImages(parseJsonField(row.gallery_urls), bag);
  }

  const [destinations] = await conn.query("SELECT image_url FROM destinations");
  for (const row of destinations) walkJsonForImages(row.image_url, bag);

  const [services] = await conn.query(
    "SELECT banner_url, gallery_urls, content_blocks FROM services",
  );
  for (const row of services) {
    walkJsonForImages(row.banner_url, bag);
    walkJsonForImages(parseJsonField(row.gallery_urls), bag);
    walkJsonForImages(parseJsonField(row.content_blocks), bag);
  }

  const [gallery] = await conn.query("SELECT image_url FROM gallery_images");
  for (const row of gallery) walkJsonForImages(row.image_url, bag);

  const [blog] = await conn.query("SELECT featured_image_url, content FROM blog_posts");
  for (const row of blog) {
    walkJsonForImages(row.featured_image_url, bag);
    walkJsonForImages(parseJsonField(row.content), bag);
  }

  const [testimonials] = await conn.query(
    "SELECT photo_url FROM testimonials WHERE photo_url IS NOT NULL AND photo_url <> ''",
  );
  for (const row of testimonials) walkJsonForImages(row.photo_url, bag);

  const [homepage] = await conn.query(
    "SELECT hero_slides, tour_types, holiday_themes, why_choose_us, corporate_features FROM homepage_settings WHERE id = 1",
  );
  if (homepage[0]) {
    for (const key of Object.keys(homepage[0])) {
      walkJsonForImages(parseJsonField(homepage[0][key]), bag);
    }
  }

  const [site] = await conn.query(
    "SELECT logo_url, favicon_url, page_content FROM site_settings WHERE id = 1",
  );
  if (site[0]) {
    walkJsonForImages(site[0].logo_url, bag);
    walkJsonForImages(site[0].favicon_url, bag);
    walkJsonForImages(parseJsonField(site[0].page_content), bag);
  }

  return [...bag].map((s) => JSON.parse(s));
}

async function checkIndexes(conn) {
  const results = [];
  for (const [table, index] of EXPECTED_INDEXES) {
    const [rows] = await conn.query(
      `SELECT 1 AS ok FROM information_schema.statistics
       WHERE table_schema = DATABASE() AND table_name = ? AND index_name = ? LIMIT 1`,
      [table, index],
    );
    results.push({ table, index, present: rows.length > 0 });
  }
  return results;
}

async function ensureIndexes(conn) {
  const alters = [
    ["packages", "idx_packages_active_sort", "is_active, sort_order"],
    ["packages", "idx_packages_featured", "is_featured, is_active, sort_order"],
    ["packages", "idx_packages_destination", "destination(191), is_active, sort_order"],
    ["packages", "idx_packages_scope_active", "scope, is_active, sort_order"],
    ["services", "idx_services_active_sort", "is_active, sort_order"],
    ["blog_posts", "idx_blog_published", "is_published, published_at"],
    ["gallery_images", "idx_gallery_active_sort", "is_active, sort_order"],
    ["testimonials", "idx_testimonials_active_sort", "is_active, sort_order"],
    ["faqs", "idx_faqs_active_sort", "is_active, sort_order"],
    ["destinations", "idx_destinations_active_scope", "is_active, scope, sort_order"],
    ["inquiries", "idx_inquiries_status_created", "status, created_at"],
  ];
  const added = [];
  for (const [table, index, cols] of alters) {
    const [rows] = await conn.query(
      `SELECT 1 AS ok FROM information_schema.statistics
       WHERE table_schema = DATABASE() AND table_name = ? AND index_name = ? LIMIT 1`,
      [table, index],
    );
    if (rows.length) continue;
    await conn.query(`ALTER TABLE \`${table}\` ADD INDEX \`${index}\` (${cols})`);
    added.push(`${table}.${index}`);
  }
  return added;
}

async function checkRoute(path) {
  const url = base + path;
  const t0 = Date.now();
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "YatraNexus-Verify/1.0" },
    });
    const html = await res.text();
    const ms = Date.now() - t0;
    const hints = [];
    if (ERROR_RE.test(html)) hints.push("ERROR_IN_BODY");
    if (res.status >= 400) hints.push("HTTP_" + res.status);
    const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || "";
    return {
      path,
      status: res.status,
      ms,
      ok: res.status === 200 && hints.length === 0,
      hints,
      title: title.slice(0, 60),
      html,
    };
  } catch (e) {
    return {
      path,
      status: 0,
      ms: Date.now() - t0,
      ok: false,
      hints: [e.message],
      title: "",
      html: "",
    };
  }
}

async function checkImage(pathOrUrl) {
  const url = pathOrUrl.startsWith("http") ? pathOrUrl : base + pathOrUrl;
  const localDisk = pathOrUrl.startsWith("/images/")
    ? join(root, "public", pathOrUrl.replace(/^\//, ""))
    : null;
  try {
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "user-agent": "YatraNexus-Verify/1.0" },
    });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: { "user-agent": "YatraNexus-Verify/1.0" },
      });
    }
    return {
      path: pathOrUrl.startsWith("http") ? pathOrUrl.replace(base, "") : pathOrUrl,
      status: res.status,
      ok: res.status === 200,
      type: res.headers.get("content-type") || "",
      onDisk: localDisk ? existsSync(localDisk) : null,
    };
  } catch (e) {
    return {
      path: pathOrUrl,
      status: 0,
      ok: false,
      type: e.message,
      onDisk: localDisk ? existsSync(localDisk) : null,
    };
  }
}

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL missing in .env");
  process.exit(1);
}

console.log("Base URL:", base);
console.log("MySQL:", dbUrl.replace(/:[^:@/]+@/, ":****@"));

const conn = await createConnection(dbUrl);
let indexStatus = [];
let indexesAdded = [];
let dbImages = [];

try {
  console.log("\n=== DB INDEXES ===");
  indexesAdded = await ensureIndexes(conn);
  if (indexesAdded.length) {
    console.log("Added:", indexesAdded.join(", "));
  } else {
    console.log("All expected indexes already present.");
  }
  indexStatus = await checkIndexes(conn);
  for (const row of indexStatus) {
    console.log(row.present ? "OK  " : "MISS", row.table + "." + row.index);
  }

  console.log("\n=== COLLECT CMS IMAGE PATHS FROM DB ===");
  dbImages = await collectDbImages(conn);
  const localImages = dbImages.filter((i) => i.kind === "local");
  const externalImages = dbImages.filter((i) => i.kind === "external");
  console.log("Local /images paths:", localImages.length);
  console.log("External URLs:", externalImages.length);
} finally {
  await conn.end();
}

console.log("\n=== ROUTES ===");
const routeResults = [];
for (const r of routes) {
  const result = await checkRoute(r);
  const { html, ...rest } = result;
  routeResults.push({ ...rest, html });
  console.log(
    rest.ok ? "OK  " : "FAIL",
    String(rest.status).padStart(3),
    String(rest.ms).padStart(5) + "ms",
    rest.path,
    rest.hints.join(",") || rest.title,
  );
}

const homeHtml = routeResults.find((r) => r.path === "/")?.html || "";
const packagesHtml =
  routeResults.find((r) => r.path === "/holiday-packages")?.html || "";
const pkgSlug =
  (homeHtml.match(/\/holiday-packages\/package\/([a-z0-9-]+)/i) || [])[1] ||
  (packagesHtml.match(/\/holiday-packages\/package\/([a-z0-9-]+)/i) || [])[1];
const blogSlug =
  (
    (routeResults.find((r) => r.path === "/blog")?.html || "").match(
      /\/blog\/([a-z0-9-]+)/i,
    ) || []
  )[1];

if (pkgSlug) {
  const pkg = await checkRoute("/holiday-packages/package/" + pkgSlug);
  const { html, ...rest } = pkg;
  routeResults.push({ ...rest, html });
  console.log(
    rest.ok ? "OK  " : "FAIL",
    String(rest.status).padStart(3),
    String(rest.ms).padStart(5) + "ms",
    rest.path,
    rest.hints.join(",") || rest.title,
  );
}
if (blogSlug) {
  const post = await checkRoute("/blog/" + blogSlug);
  const { html, ...rest } = post;
  routeResults.push({ ...rest, html });
  console.log(
    rest.ok ? "OK  " : "FAIL",
    String(rest.status).padStart(3),
    String(rest.ms).padStart(5) + "ms",
    rest.path,
    rest.hints.join(",") || rest.title,
  );
}

const localPaths = [...new Set(dbImages.filter((i) => i.kind === "local").map((i) => i.path))];
const toCheck = imageLimit > 0 ? localPaths.slice(0, imageLimit) : localPaths;

console.log("\n=== LIVE IMAGE CHECK (from DB, " + toCheck.length + " files) ===");
const imgResults = [];
for (const p of toCheck) {
  const r = await checkImage(p);
  imgResults.push(r);
  if (!r.ok) {
    console.log(
      "BAD ",
      String(r.status).padStart(3),
      r.path,
      r.onDisk === false ? "(also missing on local disk)" : r.onDisk ? "(present locally — upload to Hostinger)" : "",
    );
  }
}

const okRoutes = routeResults.filter((r) => r.ok).length;
const failRoutes = routeResults.filter((r) => !r.ok);
const okImgs = imgResults.filter((r) => r.ok);
const badImgs = imgResults.filter((r) => !r.ok);
const missingLocally = badImgs.filter((r) => r.onDisk === false);
const onDiskNotLive = badImgs.filter((r) => r.onDisk === true);

console.log("\n=== SUMMARY ===");
console.log("Routes OK:", okRoutes + "/" + routeResults.length);
console.log("DB indexes OK:", indexStatus.filter((i) => i.present).length + "/" + indexStatus.length);
console.log("Images OK (live):", okImgs.length + "/" + imgResults.length);
console.log("Missing on live + missing locally:", missingLocally.length);
console.log("On local disk but 404 on live (need upload):", onDiskNotLive.length);
console.log("Package checked:", pkgSlug || "(none)");
console.log("Blog checked:", blogSlug || "(none)");

const outDir = join(root, "scripts", "output");
mkdirSync(outDir, { recursive: true });
const report = {
  checkedAt: new Date().toISOString(),
  base,
  routes: {
    ok: okRoutes,
    total: routeResults.length,
    failed: failRoutes.map((f) => ({ status: f.status, path: f.path, hints: f.hints })),
  },
  indexes: indexStatus,
  indexesAdded,
  images: {
    dbLocalPaths: localPaths.length,
    checked: imgResults.length,
    ok: okImgs.length,
    bad: badImgs.map((b) => ({
      path: b.path,
      status: b.status,
      onDisk: b.onDisk,
    })),
    uploadCandidates: onDiskNotLive.map((b) => b.path),
    downloadOrReplaceCandidates: missingLocally.map((b) => b.path),
  },
};
const reportPath = join(outDir, "live-verify-report.json");
writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log("\nReport:", reportPath);

process.exit(failRoutes.length ? 1 : 0);
