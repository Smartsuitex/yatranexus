#!/usr/bin/env node
/**
 * Apply CMS performance indexes (idempotent).
 *
 * Usage:
 *   npm run apply:mysql-indexes
 *   node scripts/apply-mysql-indexes.mjs
 *   node scripts/apply-mysql-indexes.mjs --env=scripts/output/hostinger.env --host=82.112.233.245
 */

import { createConnection } from "mysql2/promise";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseDatabaseUrl } from "../src/lib/db.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

const args = process.argv.slice(2);
const envArg = args.find((a) => a.startsWith("--env="));
const hostArg = args.find((a) => a.startsWith("--host="));
loadEnvFile(join(root, ".env"));
if (envArg) loadEnvFile(join(root, envArg.slice("--env=".length)));

function resolveConfig() {
  const user = process.env.DB_USER?.trim();
  const database = process.env.DB_NAME?.trim() || process.env.DB_DATABASE?.trim();
  if (user && database) {
    let host = process.env.DB_HOST?.trim() || "127.0.0.1";
    if (hostArg) host = hostArg.slice("--host=".length);
    if (host === "localhost" || host === "::1") host = "127.0.0.1";
    return {
      host,
      port: Number(process.env.DB_PORT || 3306) || 3306,
      user,
      password: process.env.DB_PASSWORD ?? "",
      database,
    };
  }
  if (!process.env.DATABASE_URL) {
    throw new Error("Set DATABASE_URL or DB_USER/DB_PASSWORD/DB_NAME");
  }
  const cfg = parseDatabaseUrl(process.env.DATABASE_URL);
  if (hostArg) cfg.host = hostArg.slice("--host=".length);
  return cfg;
}

const ALTERS = [
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

const cfg = resolveConfig();
console.log(`Connecting ${cfg.user}@${cfg.host}:${cfg.port}/${cfg.database}`);

const conn = await createConnection(cfg);
try {
  for (const [table, index, cols] of ALTERS) {
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
