#!/usr/bin/env node
/**
 * Export local yatranexus DB to scripts/output/hostinger-import.sql
 * for phpMyAdmin import on Hostinger.
 *
 * Requires local MySQL with populated yatranexus database.
 * Usage: npm run export:hostinger-import
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const outPath = join(root, "output", "hostinger-import.sql");

const envPath = join(root, "..", ".env");
let dbUrl = process.env.DATABASE_URL ?? "mysql://root:root@127.0.0.1:3306/yatranexus";
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^DATABASE_URL=(.*)$/);
    if (m && !m[1].startsWith("#")) {
      dbUrl = m[1].replace(/^["']|["']$/g, "");
      break;
    }
  }
}

const parsed = new URL(dbUrl);
const database = parsed.pathname.replace(/^\//, "");
const user = decodeURIComponent(parsed.username);
const password = decodeURIComponent(parsed.password);
const host = parsed.hostname;
const port = parsed.port || "3306";

const mysqldumpCandidates = [
  "C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqldump.exe",
  "C:\\Program Files\\MySQL\\MySQL Server 8.4\\bin\\mysqldump.exe",
  "mysqldump",
];

const mysqldump = mysqldumpCandidates.find((p) => p.includes("\\") && existsSync(p)) ?? "mysqldump";

console.log(`Exporting ${database}@${host}:${port} → ${outPath}`);

const result = spawnSync(
  mysqldump,
  [
    `-h${host}`,
    `-P${port}`,
    `-u${user}`,
    `-p${password}`,
    "--single-transaction",
    "--routines",
    "--triggers",
    "--set-gtid-purged=OFF",
    "--default-character-set=utf8mb4",
    "--add-drop-table",
    database,
    `-r${outPath}`,
  ],
  { stdio: "inherit", shell: false },
);

if (result.status !== 0) {
  console.error("mysqldump failed");
  process.exit(result.status ?? 1);
}

console.log("Done. Import via Hostinger phpMyAdmin → Import → hostinger-import.sql");
