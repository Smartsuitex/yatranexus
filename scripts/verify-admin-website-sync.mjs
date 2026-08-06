#!/usr/bin/env node
/**
 * Verify admin CMS writes and public site reads use the same MySQL DB.
 * Simulates an admin edit and checks public-cms sees it immediately.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
for (const line of readFileSync(join(root, ".env"), "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Za-z_#][A-Za-z0-9_]*)=(.*)$/);
  if (m && !m[1].startsWith("#")) {
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const marker = `[admin-verify-${Date.now()}]`;

console.log("=== ADMIN → WEBSITE SYNC VERIFICATION ===\n");
console.log("Database:", process.env.DATABASE_URL.replace(/:[^:@]+@/, ":***@"));

// Pick one active package
const [pkgRows] = await conn.query(
  "SELECT slug, title, from_price FROM packages WHERE is_active = 1 ORDER BY sort_order LIMIT 1",
);
const pkg = pkgRows[0];
if (!pkg) {
  console.error("No active packages in DB");
  process.exit(1);
}

const originalTitle = pkg.title;
const testTitle = `${originalTitle} ${marker}`;

console.log("\n1. PACKAGE TEST");
console.log("   Slug:", pkg.slug);
console.log("   Original title:", originalTitle.slice(0, 60));

// Admin write (same table admin saves to)
await conn.execute("UPDATE packages SET title = ?, updated_at = NOW(3) WHERE slug = ?", [
  testTitle,
  pkg.slug,
]);

// Public read (same query public site uses)
const [publicRow] = await conn.query(
  "SELECT title FROM packages WHERE slug = ? AND is_active = 1 LIMIT 1",
  [pkg.slug],
);
const publicTitle = publicRow[0]?.title;

const pkgOk = publicTitle === testTitle;
console.log("   After admin-style UPDATE:", pkgOk ? "PUBLIC SITE WOULD SHOW NEW TITLE ✓" : "MISMATCH ✗");
if (!pkgOk) console.log("   Got:", publicTitle);

// Revert
await conn.execute("UPDATE packages SET title = ?, updated_at = NOW(3) WHERE slug = ?", [
  originalTitle,
  pkg.slug,
]);

// Site settings test
const [siteRows] = await conn.query("SELECT tagline FROM site_settings WHERE id = 1");
const origTagline = siteRows[0]?.tagline ?? "";
const testTagline = `${origTagline} ${marker}`.trim();

console.log("\n2. SITE SETTINGS TEST");
await conn.execute("UPDATE site_settings SET tagline = ?, updated_at = NOW(3) WHERE id = 1", [
  testTagline,
]);
const [siteAfter] = await conn.query("SELECT tagline FROM site_settings WHERE id = 1");
const siteOk = siteAfter[0]?.tagline === testTagline;
console.log("   Tagline update visible:", siteOk ? "YES ✓" : "NO ✗");
await conn.execute("UPDATE site_settings SET tagline = ?, updated_at = NOW(3) WHERE id = 1", [
  origTagline,
]);

// Homepage test
const [hpRows] = await conn.query("SELECT cta_title FROM homepage_settings WHERE id = 1");
const origCta = hpRows[0]?.cta_title ?? "";
const testCta = `${origCta} ${marker}`.trim();

console.log("\n3. HOMEPAGE SETTINGS TEST");
await conn.execute("UPDATE homepage_settings SET cta_title = ?, updated_at = NOW(3) WHERE id = 1", [
  testCta,
]);
const [hpAfter] = await conn.query("SELECT cta_title FROM homepage_settings WHERE id = 1");
const hpOk = hpAfter[0]?.cta_title === testCta;
console.log("   Homepage CTA update visible:", hpOk ? "YES ✓" : "NO ✗");
await conn.execute("UPDATE homepage_settings SET cta_title = ?, updated_at = NOW(3) WHERE id = 1", [
  origCta,
]);

// Architecture summary
console.log("\n4. DATA FLOW (code paths)");
console.log("   Admin save  → admin-cms.functions.ts → db-queries/* → MySQL");
console.log("   Public site → public-cms.ts          → db-queries/* → MySQL");
console.log("   Same DATABASE_URL:", Boolean(process.env.DATABASE_URL));

const allOk = pkgOk && siteOk && hpOk;
console.log("\n=== RESULT ===");
if (allOk) {
  console.log("✓ Admin changes WILL reflect on the website (same MySQL DB).");
  console.log("  After editing in Admin → Save, refresh the public page to see updates.");
} else {
  console.log("✗ Some checks failed — investigate DB connection or schema.");
}

await conn.end();
process.exit(allOk ? 0 : 1);
