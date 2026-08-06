#!/usr/bin/env node
/**
 * Test DATABASE_URL from .env
 * Usage: node scripts/test-mysql-connection.mjs
 */

import { createPool } from "mysql2/promise";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const envPath = join(root, "..", ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m && process.env[m[1]] == null) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set in .env");
  process.exit(1);
}

function parseDatabaseUrl(raw) {
  const u = new URL(raw);
  return {
    host: u.hostname,
    port: u.port ? Number(u.port) : 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ""),
  };
}

const cfg = parseDatabaseUrl(url);
console.log(`Testing MySQL: ${cfg.user}@${cfg.host}:${cfg.port}/${cfg.database}`);

try {
  const pool = createPool({ ...parseDatabaseUrl(url), timezone: "Z", connectTimeout: 15000 });
  const [rows] = await pool.query("SELECT DATABASE() AS db, VERSION() AS version");
  console.log("Connected OK:", rows[0]);
  const [tables] = await pool.query("SHOW TABLES");
  console.log(`Tables: ${tables.length}`);
  await pool.end();
} catch (err) {
  console.error("Connection failed:", err.message);
  if (String(err.message).includes("Access denied") && String(err.message).includes("@")) {
    console.error("");
    console.error("Hostinger blocks remote IPs until you whitelist them:");
    console.error("  hPanel → Websites → Manage → Databases → Remote MySQL");
    console.error("  Add your public IP (or Any Host), select u391320881_yatranexus, Create");
  }
  process.exit(1);
}
