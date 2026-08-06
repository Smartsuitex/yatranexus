#!/usr/bin/env node
/**
 * Verify live Hostinger MySQL after phpMyAdmin import
 * Usage: node scripts/verify-hostinger-db.mjs
 */

import { createConnection } from "mysql2/promise";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const envPath = join(root, "..", ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_#][A-Za-z0-9_]*)=(.*)$/);
    if (m && !m[1].startsWith("#") && process.env[m[1]] == null) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

const liveUrl =
  process.argv.find((a) => a.startsWith("--url="))?.slice(6) ??
  process.env.DATABASE_URL_HOSTINGER ??
  "mysql://u391320881_mysql:Yatranexus%402026@82.112.233.245:3306/u391320881_yatranexus";

function parseUrl(raw) {
  const u = new URL(raw);
  return {
    host: u.hostname,
    port: u.port ? Number(u.port) : 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ""),
  };
}

const cfg = parseUrl(liveUrl);
console.log(`Checking ${cfg.user}@${cfg.host}:${cfg.port}/${cfg.database}\n`);

let conn;
try {
  conn = await createConnection({ ...cfg, connectTimeout: 15000 });
} catch (err) {
  console.error("Could not connect:", err.message);
  if (String(err.message).includes("Access denied") && String(err.message).includes("@")) {
    console.error("\nRemote MySQL still blocked. Verify import in phpMyAdmin instead:");
    console.error("  phpMyAdmin → u391320881_yatranexus → should show 12 tables");
  }
  process.exit(1);
}

const [version] = await conn.query("SELECT VERSION() AS version, DATABASE() AS db");
console.log("Connection OK:", version[0]);

const [tables] = await conn.query("SHOW TABLES");
console.log(`\nTables: ${tables.length} (expected 12)\n`);

const expected = {
  packages: 117,
  destinations: 26,
  services: 8,
  blog_posts: 3,
  gallery_images: 9,
  testimonials: 5,
  faqs: 8,
  homepage_settings: 1,
  site_settings: 1,
  email_settings: 1,
  admin_users: 1,
  inquiries: 0,
};

let ok = tables.length === 12;

for (const row of tables) {
  const name = Object.values(row)[0];
  const [cnt] = await conn.query(`SELECT COUNT(*) AS n FROM \`${name}\``);
  const n = Number(cnt[0].n);
  const exp = expected[name];
  const mark = exp === undefined ? "?" : exp === n ? "OK" : `EXPECTED ${exp}`;
  if (exp !== undefined && exp !== n) ok = false;
  console.log(`  ${name.padEnd(20)} ${String(n).padStart(4)}  ${mark}`);
}

const [admin] = await conn.query(
  "SELECT email, full_name, role FROM admin_users LIMIT 1",
);
console.log("\nAdmin user:", admin[0] ?? "(none)");

const [sample] = await conn.query(
  "SELECT slug, LEFT(image_url, 60) AS image FROM packages WHERE is_active = 1 LIMIT 2",
);
console.log("Sample packages:", sample);

const [hero] = await conn.query(
  "SELECT JSON_LENGTH(hero_slides) AS slides FROM homepage_settings WHERE id = 1",
);
console.log("Homepage hero slides:", hero[0]?.slides ?? 0);

await conn.end();

console.log(ok ? "\nImport verification: PASSED" : "\nImport verification: ISSUES — check counts above");
process.exit(ok ? 0 : 1);
