#!/usr/bin/env node
/**
 * Analyze all image URLs stored in old Supabase DB snapshot
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const snap = JSON.parse(readFileSync(join(root, "scripts/output/old-snapshot.json"), "utf8"));

function decodeHtml(s) {
  return String(s || "").replace(/&amp;/g, "&");
}

function classify(url) {
  const u = decodeHtml(url);
  if (!u) return "empty";
  if (u.includes("supabase.co/storage") && u.includes("/cms-images/")) return "supabase-upload";
  if (u.includes("unsplash.com")) return "unsplash";
  if (u.startsWith("/images/")) return "local-path";
  return "other";
}

function storagePath(url) {
  const u = decodeHtml(url);
  const m = u.match(/\/cms-images\/(.+?)(?:\?|$)/);
  return m ? m[1] : null;
}

const bySource = { "supabase-upload": [], unsplash: [], "local-path": [], other: [], empty: [] };
const storagePaths = new Map(); // path -> { tables: Set, count }

function add(url, table, label) {
  const kind = classify(url);
  bySource[kind].push({ table, label, url: decodeHtml(url) });
  const sp = storagePath(url);
  if (sp) {
    if (!storagePaths.has(sp)) storagePaths.set(sp, { tables: new Set(), examples: [] });
    const e = storagePaths.get(sp);
    e.tables.add(table);
    if (e.examples.length < 2) e.examples.push(label);
  }
}

function walkJson(obj, table, hints, fn) {
  if (obj == null) return;
  if (typeof obj === "string") {
    if (
      obj.includes("supabase.co/storage") ||
      obj.includes("unsplash.com") ||
      obj.startsWith("/images/") ||
      obj.includes("/cms-images/")
    ) {
      fn(obj, table, hints.join(" / "));
    }
    return;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) walkJson(item, table, hints, fn);
    return;
  }
  if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      if (["image", "image_url", "background", "photo_url", "banner_url", "featured_image_url", "logo_url", "favicon_url"].includes(k) && typeof v === "string") {
        fn(v, table, `${hints.join(" / ")} → ${k}`.replace(/^ → /, ""));
      } else if (k === "gallery_urls" && Array.isArray(v)) {
        v.forEach((u, i) => fn(u, table, `${hints.join(" / ")} gallery[${i}]`));
      } else {
        walkJson(v, table, [...hints, k], fn);
      }
    }
  }
}

// Packages
for (const p of snap.packages ?? []) {
  add(p.image_url, "packages", p.slug);
  for (const u of p.gallery_urls ?? []) add(u, "packages.gallery", p.slug);
}

// Destinations
for (const d of snap.destinations ?? []) {
  add(d.image_url, "destinations", d.slug);
}

// Services
for (const s of snap.services ?? []) {
  add(s.banner_url, "services", s.slug);
  for (const u of s.gallery_urls ?? []) add(u, "services.gallery", s.slug);
}

// Gallery
for (const g of snap.gallery_images ?? []) {
  add(g.image_url, "gallery_images", g.title || g.id);
}

// Testimonials
for (const t of snap.testimonials ?? []) {
  add(t.photo_url, "testimonials", t.name);
}

// Blog
for (const b of snap.blog_posts ?? []) {
  add(b.featured_image_url, "blog_posts", b.slug);
}

// Site settings
for (const s of snap.site_settings ?? []) {
  add(s.logo_url, "site_settings", "logo");
  add(s.favicon_url, "site_settings", "favicon");
}

// Homepage JSON
for (const h of snap.homepage_settings ?? []) {
  walkJson(h.hero_slides, "homepage_settings.hero_slides", ["hero"], (u, t, l) => add(u, t, l));
  walkJson(h.tour_types, "homepage_settings.tour_types", ["tour_types"], (u, t, l) => add(u, t, l));
  walkJson(h.holiday_themes, "homepage_settings.holiday_themes", ["holiday_themes"], (u, t, l) => add(u, t, l));
}

// Count by table for supabase uploads only
const byTable = {};
for (const item of bySource["supabase-upload"]) {
  const t = item.table.split(".")[0];
  byTable[t] = (byTable[t] || 0) + 1;
}

// Group storage paths by folder
const byFolder = {};
for (const path of storagePaths.keys()) {
  const folder = path.includes("/") ? path.split("/")[0] : "(root)";
  if (!byFolder[folder]) byFolder[folder] = [];
  byFolder[folder].push(path);
}

console.log("=== OLD SUPABASE DB — IMAGE INVENTORY ===");
console.log("Project:", snap.project);
console.log("Exported:", snap.exportedAt);
console.log("");

console.log("--- BY SOURCE TYPE ---");
for (const [kind, items] of Object.entries(bySource)) {
  console.log(`  ${kind.padEnd(18)} ${items.length}`);
}

console.log("\n--- SUPABASE UPLOADS (cms-images bucket) BY TABLE ---");
for (const [t, n] of Object.entries(byTable).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${t.padEnd(25)} ${n}`);
}

console.log("\n--- UNIQUE STORAGE PATHS (cms-images/) ---");
console.log(`  Total unique files referenced: ${storagePaths.size}`);

console.log("\n--- BY STORAGE FOLDER ---");
for (const [folder, paths] of Object.entries(byFolder).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${folder.padEnd(20)} ${paths.length} file(s)`);
}

console.log("\n--- UNSplash URLs (stock, not uploaded) ---");
const unsplashByTable = {};
for (const item of bySource.unsplash) {
  unsplashByTable[item.table] = (unsplashByTable[item.table] || 0) + 1;
}
for (const [t, n] of Object.entries(unsplashByTable)) {
  console.log(`  ${t}: ${n}`);
}
if (bySource.unsplash.length <= 15) {
  for (const item of bySource.unsplash) {
    console.log(`    - ${item.label}: ${item.url.slice(0, 80)}...`);
  }
}

console.log("\n--- SAMPLE UPLOADED FILES (first 15) ---");
let i = 0;
for (const [path, meta] of storagePaths) {
  if (i++ >= 15) break;
  console.log(`  ${path}`);
  console.log(`    used in: ${[...meta.tables].join(", ")} | e.g. ${meta.examples[0]}`);
}

// Export full list
const outPath = join(root, "scripts/output/old-db-image-inventory.json");
const exportData = {
  exportedAt: snap.exportedAt,
  project: snap.project,
  summary: {
    supabaseUploads: bySource["supabase-upload"].length,
    uniqueStoragePaths: storagePaths.size,
    unsplash: bySource.unsplash.length,
    localPath: bySource["local-path"].length,
    other: bySource.other.length,
    byTable,
    byFolder: Object.fromEntries(Object.entries(byFolder).map(([k, v]) => [k, v.length])),
  },
  storagePaths: [...storagePaths.keys()].sort(),
  unsplashUrls: bySource.unsplash.map((x) => ({ table: x.table, label: x.label, url: x.url })),
  allSupabaseUploads: bySource["supabase-upload"],
};
writeFileSync(outPath, JSON.stringify(exportData, null, 2));
console.log(`\nFull inventory written to: scripts/output/old-db-image-inventory.json`);
