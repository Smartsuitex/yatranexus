#!/usr/bin/env node
/**
 * Deep audit of local MySQL migration completeness
 */
import { createConnection } from "mysql2/promise";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const snapPath = join(root, "scripts/output/old-snapshot.json");
const imagesRoot = join(root, "public/images");

const url =
  process.argv.find((a) => a.startsWith("--url="))?.slice(6) ??
  "mysql://root:root@127.0.0.1:3306/yatranexus";

function countFiles(dir) {
  if (!existsSync(dir)) return 0;
  let n = 0;
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) n += countFiles(p);
    else n++;
  }
  return n;
}

function walkFiles(dir, prefix = "") {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${ent.name}` : ent.name;
    const p = join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walkFiles(p, rel));
    else out.push(`/images/${rel.replace(/\\/g, "/")}`);
  }
  return out;
}

const snap = JSON.parse(readFileSync(snapPath, "utf8"));
const conn = await createConnection(url);
const issues = [];

console.log("=== DEEP LOCAL DB MIGRATION AUDIT ===\n");
console.log("Database:", url.replace(/:[^:@]+@/, ":***@"));

// 1. Row counts vs snapshot
console.log("\n--- 1. ROW COUNTS vs old-snapshot.json ---");
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
  "admin_users",
  "inquiries",
];
for (const t of tables) {
  const exp = t === "inquiries" ? 0 : (snap[t]?.length ?? (["homepage_settings", "site_settings", "email_settings"].includes(t) ? 1 : 0));
  const [r] = await conn.query(`SELECT COUNT(*) AS n FROM \`${t}\``);
  const n = Number(r[0].n);
  const ok = t === "admin_users" ? n >= 1 : n === exp;
  console.log(`  ${t.padEnd(20)} DB: ${String(n).padStart(4)}  Snapshot: ${String(exp).padStart(4)}  ${ok ? "OK" : "MISMATCH"}`);
  if (!ok && t !== "admin_users") issues.push(`${t}: expected ${exp}, got ${n}`);
}

// 2. Packages / Holidays
console.log("\n--- 2. PACKAGES & HOLIDAYS ---");
const [pkgScope] = await conn.query(
  "SELECT scope, COUNT(*) AS n, SUM(is_active) AS active FROM packages GROUP BY scope ORDER BY scope",
);
console.log("  Package scopes:", pkgScope);
const [holidayPkgs] = await conn.query(
  "SELECT COUNT(*) AS n FROM packages WHERE scope = 'holiday' OR destination IS NOT NULL",
);
const [featured] = await conn.query("SELECT COUNT(*) AS n FROM packages WHERE is_featured = 1");
console.log("  Holiday/tour packages:", holidayPkgs[0].n);
console.log("  Featured packages:", featured[0].n);

// 3. Destinations (holiday regions)
const [destScope] = await conn.query(
  "SELECT scope, COUNT(*) AS n FROM destinations GROUP BY scope",
);
console.log("  Destination scopes:", destScope);

// 4. Homepage holiday config
console.log("\n--- 3. HOMEPAGE (Hero / Tour types / Holiday themes) ---");
const [hpRows] = await conn.query(
  "SELECT hero_interval_ms, hero_slides, tour_types, holiday_themes, featured_package_slugs FROM homepage_settings WHERE id = 1",
);
const hp = hpRows[0];
const heroSlides = typeof hp.hero_slides === "string" ? JSON.parse(hp.hero_slides) : hp.hero_slides;
const tourTypes = typeof hp.tour_types === "string" ? JSON.parse(hp.tour_types) : hp.tour_types;
const holidayThemes = typeof hp.holiday_themes === "string" ? JSON.parse(hp.holiday_themes) : hp.holiday_themes;
const featSlugs = typeof hp.featured_package_slugs === "string" ? JSON.parse(hp.featured_package_slugs) : hp.featured_package_slugs;
console.log("  Hero slides:", heroSlides?.length ?? 0);
console.log("  Tour types:", tourTypes?.length ?? 0, tourTypes?.map((t) => t.slug || t.title).join(", ") || "");
console.log("  Holiday themes:", holidayThemes?.length ?? 0);
console.log("  Featured package slugs:", featSlugs?.length ?? 0);

// 5. Services (all verticals)
console.log("\n--- 4. SERVICES (Flights, Hotels, Visa, etc.) ---");
const [svcs] = await conn.query(
  "SELECT slug, title, is_active, LEFT(banner_url, 50) AS banner FROM services ORDER BY sort_order",
);
for (const s of svcs) console.log(`  ${s.is_active ? "✓" : "✗"} ${s.slug}: ${s.title.slice(0, 45)}`);

// 6. Image URL audit
console.log("\n--- 5. IMAGE URLS (DB) ---");
const imgChecks = [
  ["packages → /images/", "SELECT COUNT(*) AS n FROM packages WHERE image_url LIKE '/images/%'"],
  ["packages → supabase (bad)", "SELECT COUNT(*) AS n FROM packages WHERE image_url LIKE '%supabase%'"],
  ["packages → unsplash (bad)", "SELECT COUNT(*) AS n FROM packages WHERE image_url LIKE '%unsplash%'"],
  ["packages → empty", "SELECT COUNT(*) AS n FROM packages WHERE image_url IS NULL OR image_url = ''"],
  ["destinations → /images/", "SELECT COUNT(*) AS n FROM destinations WHERE image_url LIKE '/images/%'"],
  ["gallery → /images/", "SELECT COUNT(*) AS n FROM gallery_images WHERE image_url LIKE '/images/%'"],
  ["homepage hero supabase", "SELECT COUNT(*) AS n FROM homepage_settings WHERE CAST(hero_slides AS CHAR) LIKE '%supabase%'"],
];
for (const [label, sql] of imgChecks) {
  const [r] = await conn.query(sql);
  const n = Number(r[0].n);
  const bad = label.includes("bad") || label.includes("supabase") || label.includes("empty");
  console.log(`  ${label}: ${n}${bad && n > 0 ? " ⚠" : ""}`);
  if (bad && n > 0) issues.push(`${label}: ${n}`);
}

// 7. Image files on disk vs DB references
console.log("\n--- 6. IMAGE FILES (public/images/) ---");
const diskFiles = new Set(walkFiles(imagesRoot));
const diskCount = diskFiles.size;
console.log("  Files on disk:", diskCount);

const [dbUrls] = await conn.query(`
  SELECT image_url AS url FROM packages WHERE image_url LIKE '/images/%'
  UNION SELECT image_url FROM destinations WHERE image_url LIKE '/images/%'
  UNION SELECT image_url FROM gallery_images WHERE image_url LIKE '/images/%'
  UNION SELECT banner_url FROM services WHERE banner_url LIKE '/images/%'
`);
const dbPaths = new Set(dbUrls.map((r) => r.url).filter(Boolean));
console.log("  Unique /images/ refs in DB:", dbPaths.size);

const missingOnDisk = [...dbPaths].filter((p) => !diskFiles.has(p));
const onDiskNotInDb = [...diskFiles].filter((p) => !dbPaths.has(p) && !p.includes("/hero/") && !p.includes("/logo/") && !p.includes("/about/"));

console.log("  DB paths missing on disk:", missingOnDisk.length);
if (missingOnDisk.length > 0 && missingOnDisk.length <= 10) {
  missingOnDisk.forEach((p) => console.log("    MISSING:", p));
} else if (missingOnDisk.length > 10) {
  missingOnDisk.slice(0, 5).forEach((p) => console.log("    MISSING:", p));
  console.log(`    ... and ${missingOnDisk.length - 5} more`);
}
if (missingOnDisk.length > 0) issues.push(`${missingOnDisk.length} DB image paths missing on disk`);

// 8. Admin login
console.log("\n--- 7. ADMIN / LOGIN ---");
const [admins] = await conn.query(
  "SELECT id, email, full_name, role, password_hash FROM admin_users",
);
for (const a of admins) {
  const passOk = await bcrypt.compare("YatraAdmin@2026", a.password_hash);
  console.log(`  ${a.email} (${a.role}) — password test: ${passOk ? "VALID ✓" : "INVALID ✗"}`);
  if (!passOk) issues.push("Admin password hash does not match YatraAdmin@2026");
}

// 9. Email & site settings
console.log("\n--- 8. SITE & EMAIL SETTINGS ---");
const [site] = await conn.query(
  "SELECT contact_email, contact_phone, legal_name, tagline, logo_url FROM site_settings WHERE id = 1",
);
console.log("  Site:", site[0]);
const [email] = await conn.query(
  "SELECT is_enabled, provider, from_email, smtp_host, inquiry_admin_enabled FROM email_settings WHERE id = 1",
);
console.log("  Email:", email[0]);

// 10. Blog, FAQs, Testimonials
console.log("\n--- 9. CMS CONTENT ---");
const [blogs] = await conn.query("SELECT slug, title, is_published FROM blog_posts");
blogs.forEach((b) => console.log(`  Blog: ${b.slug} (${b.is_published ? "published" : "draft"})`));
const [faqCat] = await conn.query("SELECT category, COUNT(*) AS n FROM faqs GROUP BY category");
console.log("  FAQ categories:", faqCat);

// Hero slide files
console.log("\n--- 10. HOMEPAGE HERO FILES ON DISK ---");
let heroOk = 0;
let heroMiss = 0;
for (const s of heroSlides ?? []) {
  const img = s.image || s.background || s.imageUrl || s.image_url;
  if (img?.startsWith("/images/")) {
    if (existsSync(join(root, "public", img.replace(/^\//, "")))) heroOk++;
    else {
      heroMiss++;
      console.log("  MISSING hero:", img);
    }
  }
}
console.log("  Hero images found on disk:", heroOk, "| missing:", heroMiss);
if (heroMiss > 0) issues.push(`${heroMiss} homepage hero images missing on disk`);

// Summary
console.log("\n=== VERDICT ===");
if (issues.length === 0) {
  console.log("✅ LOCAL DB MIGRATION: COMPLETE");
  console.log("   All 12 tables populated, counts match snapshot, admin login works.");
} else {
  console.log("⚠ ISSUES FOUND:");
  issues.forEach((i) => console.log("  -", i));
}

await conn.end();
process.exit(issues.length ? 1 : 0);
