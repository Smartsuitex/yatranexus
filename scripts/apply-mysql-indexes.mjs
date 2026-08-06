#!/usr/bin/env node
/** Apply database/indexes.mysql.sql to DATABASE_URL (local or Hostinger). */

import { createConnection } from "mysql2/promise";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
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

const sqlPath = join(root, "database", "indexes.mysql.sql");
const raw = readFileSync(sqlPath, "utf8");

// Strip DELIMITER blocks and split into executable statements for mysql2
const withoutComments = raw
  .replace(/--[^\n]*/g, "")
  .replace(/\/\*[\s\S]*?\*\//g, "");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const conn = await createConnection(url);
try {
  // mysql2 cannot run DELIMITER / stored procs from multi-statement easily —
  // apply indexes with simple ALTERs + ignore duplicate-key errors.
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

  for (const [table, index, cols] of alters) {
    const [rows] = await conn.query(
      `SELECT 1 AS ok FROM information_schema.statistics
       WHERE table_schema = DATABASE() AND table_name = ? AND index_name = ? LIMIT 1`,
      [table, index],
    );
    if (rows.length) {
      console.log("skip", table, index);
      continue;
    }
    await conn.query(`ALTER TABLE \`${table}\` ADD INDEX \`${index}\` (${cols})`);
    console.log("added", table, index);
  }
  console.log("Done.");
} finally {
  await conn.end();
}
