#!/usr/bin/env node
/**
 * Create database and apply database/schema.mysql.sql
 *
 * Usage:
 *   node scripts/apply-mysql-schema.mjs
 *   DATABASE_URL=mysql://root:root@127.0.0.1:3306/yatranexus node scripts/apply-mysql-schema.mjs
 */

import { createConnection } from "mysql2/promise";
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

const defaultUrl = "mysql://root:root@127.0.0.1:3306/yatranexus";
const databaseUrl = process.argv.find((a) => a.startsWith("--url="))?.slice(6) ?? process.env.DATABASE_URL ?? defaultUrl;

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

const cfg = parseUrl(databaseUrl);
const schemaPath = join(root, "..", "database", "schema.mysql.sql");
const schemaSql = readFileSync(schemaPath, "utf8");

console.log(`Host: ${cfg.host}:${cfg.port}`);
console.log(`Database: ${cfg.database}`);
console.log(`User: ${cfg.user}`);

const admin = await createConnection({
  host: cfg.host,
  port: cfg.port,
  user: cfg.user,
  password: cfg.password,
  multipleStatements: true,
});

await admin.query(
  `CREATE DATABASE IF NOT EXISTS \`${cfg.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
);
console.log(`Database ensured: ${cfg.database}`);

await admin.changeUser({ database: cfg.database });
await admin.query(schemaSql);
console.log("Schema applied from database/schema.mysql.sql");

const [tables] = await admin.query("SHOW TABLES");
console.log(`Tables created: ${tables.length}`);
for (const row of tables) {
  console.log(" -", Object.values(row)[0]);
}

await admin.end();
console.log("Done.");
