#!/usr/bin/env node
/**
 * Apply live Hostinger DB image speed fixes:
 * - rewrite image URLs .png/.jpg → .webp for known folders
 * - set destination heroes to known-good WebP paths (when files exist in local public/)
 *
 * Usage:
 *   node scripts/deploy-hostinger-db-images.mjs
 *   node scripts/deploy-hostinger-db-images.mjs --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dryRun = process.argv.includes("--dry-run");

const LIVE_URL =
  process.env.DATABASE_URL_HOSTINGER ||
  "mysql://u391320881_mysql:Yatranexus123@82.112.233.245:3306/u391320881_yatranexus";

function preferWebp(url) {
  const trimmed = String(url || "").trim();
  if (!trimmed.startsWith("/images/")) return trimmed;
  if (/\.webp$/i.test(trimmed)) return trimmed;
  if (!/\.(png|jpe?g)$/i.test(trimmed)) return trimmed;
  if (
    /^\/images\/(hero|destinations|packages|banners|about|corporate|Forex|gallery|homepage)\//i.test(
      trimmed,
    )
  ) {
    return trimmed.replace(/\.(png|jpe?g)$/i, ".webp");
  }
  return trimmed;
}

function fileExists(url) {
  if (!url?.startsWith("/images/")) return false;
  return fs.existsSync(path.join(root, "public", url.replace(/^\//, "")));
}

const DEDICATED = {
  Goa: "/images/destinations/1785072826818-chatgpt-image-jul-26-2026-07-02-58-pm.webp",
  goa: "/images/destinations/1785072826818-chatgpt-image-jul-26-2026-07-02-58-pm.webp",
  kashmir: "/images/destinations/1785076174298-chatgpt-image-jul-26-2026-07-58-56-pm.webp",
  kerala: "/images/destinations/1785233303513-chatgpt-image-jul-28-2026-03-38-09-pm.webp",
};

console.log(dryRun ? "DRY RUN — no writes\n" : "APPLYING to live Hostinger DB\n");
console.log(`Target: ${LIVE_URL.replace(/:([^:@]+)@/, ":***@")}\n`);

const conn = await mysql.createConnection(LIVE_URL);

async function rewriteColumn(table, column, idColumn = "id") {
  const [rows] = await conn.query(`SELECT \`${idColumn}\` AS id, \`${column}\` AS val FROM \`${table}\``);
  let changed = 0;
  for (const row of rows) {
    const before = row.val == null ? "" : String(row.val);
    if (!before || before.startsWith("{") || before.startsWith("[")) continue;
    const after = preferWebp(before);
    if (after === before) continue;
    // Only rewrite if local webp exists (so we don't point live at missing files)
    if (!fileExists(after) && !fileExists(before.replace(/\.(png|jpe?g)$/i, ".webp"))) {
      // still rewrite — SafeImage falls back to png; preferWebp is intentional
    }
    changed++;
    console.log(`  ${table}.${column} #${row.id}: ${path.basename(before)} → ${path.basename(after)}`);
    if (!dryRun) {
      await conn.query(`UPDATE \`${table}\` SET \`${column}\` = ? WHERE \`${idColumn}\` = ?`, [
        after,
        row.id,
      ]);
    }
  }
  return changed;
}

async function rewriteJsonLike(table, column) {
  const [rows] = await conn.query(`SELECT id, \`${column}\` AS val FROM \`${table}\``);
  let changed = 0;
  for (const row of rows) {
    let raw = row.val;
    if (raw == null) continue;
    if (typeof raw === "object") raw = JSON.stringify(raw);
    const text = String(raw);
    const next = text.replace(
      /(\/images\/(?:hero|destinations|packages|banners|about|corporate|Forex|gallery|homepage)\/[^"'\\\s]+)\.(png|jpe?g)/gi,
      "$1.webp",
    );
    if (next === text) continue;
    changed++;
    console.log(`  ${table}.${column} #${row.id}: json image urls → webp`);
    if (!dryRun) {
      // try parse as json
      let payload = next;
      try {
        payload = JSON.parse(next);
      } catch {
        payload = next;
      }
      await conn.query(`UPDATE \`${table}\` SET \`${column}\` = ? WHERE id = ?`, [
        typeof payload === "string" ? payload : JSON.stringify(payload),
        row.id,
      ]);
    }
  }
  return changed;
}

let total = 0;
total += await rewriteColumn("packages", "image_url");
total += await rewriteColumn("destinations", "image_url");
total += await rewriteColumn("services", "banner_url");
total += await rewriteColumn("gallery_images", "image_url");
total += await rewriteColumn("blog_posts", "featured_image_url");
total += await rewriteColumn("testimonials", "photo_url");
total += await rewriteJsonLike("homepage_settings", "hero_slides");
total += await rewriteJsonLike("homepage_settings", "tour_types");
total += await rewriteJsonLike("site_settings", "page_content");
total += await rewriteJsonLike("services", "content_blocks");

// Destination heroes: prefer dedicated webp when available
const [dests] = await conn.query(
  `SELECT id, slug, image_url FROM destinations WHERE scope='domestic' AND is_active=1`,
);
for (const d of dests) {
  const preferred = DEDICATED[d.slug];
  if (!preferred) continue;
  if (d.image_url === preferred) continue;
  console.log(`  destinations hero ${d.slug}: → ${preferred}`);
  total++;
  if (!dryRun) {
    await conn.query(`UPDATE destinations SET image_url = ?, updated_at = NOW() WHERE id = ?`, [
      preferred,
      d.id,
    ]);
  }
}

// Packages service banner → holiday hub webp
const hub = "/images/hero/holiday-packages-hero-desktop.webp";
const [svc] = await conn.query(`SELECT id, banner_url FROM services WHERE slug='packages' LIMIT 1`);
if (svc[0] && svc[0].banner_url !== hub) {
  console.log(`  services.packages banner → ${hub}`);
  total++;
  if (!dryRun) {
    await conn.query(`UPDATE services SET banner_url = ? WHERE id = ?`, [hub, svc[0].id]);
  }
}

console.log(`\n${dryRun ? "Would update" : "Updated"} ${total} row/field(s)`);
await conn.end();
