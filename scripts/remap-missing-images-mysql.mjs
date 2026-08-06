#!/usr/bin/env node
/**
 * Remap missing /images/... CMS paths to files that exist under public/images/.
 *
 * Usage:
 *   node scripts/remap-missing-images-mysql.mjs --dry-run
 *   node scripts/remap-missing-images-mysql.mjs --apply
 *   node scripts/remap-missing-images-mysql.mjs --apply --hostinger
 */

import { createConnection } from "mysql2/promise";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseDatabaseUrl } from "../src/lib/db.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dryRun = !process.argv.includes("--apply");
const useHostinger = process.argv.includes("--hostinger");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!m) continue;
    if (process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

loadEnvFile(join(root, ".env"));
if (useHostinger) {
  // Prefer discrete Hostinger credentials from hostinger.env + remote IP
  loadEnvFile(join(root, "scripts", "output", "hostinger.env"));
}

function resolveConfig() {
  if (useHostinger) {
    const user = process.env.DB_USER?.trim();
    const database = process.env.DB_NAME?.trim();
    if (!user || !database) {
      throw new Error("Hostinger mode needs DB_USER/DB_NAME in scripts/output/hostinger.env");
    }
    return {
      host: "82.112.233.245",
      port: Number(process.env.DB_PORT || 3306) || 3306,
      user,
      password: process.env.DB_PASSWORD ?? "",
      database,
    };
  }
  if (process.env.DATABASE_URL) return parseDatabaseUrl(process.env.DATABASE_URL);
  throw new Error("DATABASE_URL required");
}

function walkImages(dir, urlBase = "/images") {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    const st = statSync(abs);
    if (st.isDirectory()) {
      out.push(...walkImages(abs, `${urlBase}/${name}`));
    } else if (/\.(png|jpe?g|webp|gif)$/i.test(name) && !name.startsWith(".")) {
      out.push(`${urlBase}/${name}`.replace(/\\/g, "/"));
    }
  }
  return out;
}

function folderKey(path) {
  // /images/packages/x.png → packages
  // /images/homepage/hero/x.png → homepage
  const parts = path.replace(/^\/images\//, "").split("/");
  return parts[0] || "other";
}

function buildPools(existing) {
  const pools = {
    packages: [],
    destinations: [],
    homepage: [],
    services: [],
    corporate: [],
    testimonials: [],
    gallery: [],
    hero: [],
    banners: [],
    about: [],
    Forex: [],
    logo: [],
    other: [],
  };
  for (const p of existing) {
    const key = folderKey(p);
    if (pools[key]) pools[key].push(p);
    else pools.other.push(p);
  }

  // Prefer same-folder assets; only fall back when a folder is empty.
  const fallbacks = [
    ...pools.packages,
    ...pools.destinations,
    ...pools.banners,
    ...pools.hero,
    ...pools.homepage,
    ...pools.gallery,
    ...pools.corporate,
    ...pools.about,
    ...pools.logo,
    ...pools.other,
  ];
  const any = fallbacks.length ? fallbacks : ["/favicon.png"];

  if (!pools.homepage.length) pools.homepage = [...pools.hero, ...pools.banners];
  if (!pools.services.length) pools.services = [...pools.banners, ...pools.hero, ...pools.corporate];
  if (!pools.corporate.length) pools.corporate = [...pools.banners, ...pools.about];
  if (!pools.testimonials.length) pools.testimonials = [...pools.gallery, ...pools.about, ...pools.logo];
  if (!pools.destinations.length) pools.destinations = [...pools.banners, ...pools.packages, ...pools.hero];
  if (!pools.packages.length) pools.packages = [...pools.banners, ...pools.hero];

  for (const k of Object.keys(pools)) {
    if (!pools[k].length) pools[k] = any;
  }
  return pools;
}

function pickReplacement(missingPath, pools, counters) {
  const key = folderKey(missingPath);
  const pool = pools[key] || pools.packages;
  const i = counters[key] ?? 0;
  counters[key] = i + 1;
  return pool[i % pool.length];
}

function parseMaybeJson(value) {
  if (value == null) return { kind: "null", value: null };
  if (typeof value === "object") return { kind: "object", value };
  if (typeof value !== "string") return { kind: "other", value };
  const t = value.trim();
  if ((t.startsWith("{") && t.endsWith("}")) || (t.startsWith("[") && t.endsWith("]"))) {
    try {
      return { kind: "json-string", value: JSON.parse(t) };
    } catch {
      return { kind: "string", value };
    }
  }
  return { kind: "string", value };
}

function replaceInTree(node, map, stats) {
  if (typeof node === "string") {
    if (map.has(node)) {
      stats.hits += 1;
      return map.get(node);
    }
    // Also replace if string contains the path (rare)
    let out = node;
    for (const [from, to] of map) {
      if (out.includes(from)) {
        out = out.split(from).join(to);
        stats.hits += 1;
      }
    }
    return out;
  }
  if (Array.isArray(node)) {
    return node.map((item) => replaceInTree(item, map, stats));
  }
  if (node && typeof node === "object") {
    const next = {};
    for (const [k, v] of Object.entries(node)) {
      next[k] = replaceInTree(v, map, stats);
    }
    return next;
  }
  return node;
}

async function remapColumn(conn, table, idCol, col, map, dry) {
  const [rows] = await conn.query(`SELECT \`${idCol}\` AS id, \`${col}\` AS val FROM \`${table}\``);
  let updated = 0;
  for (const row of rows) {
    const parsed = parseMaybeJson(row.val);
    const stats = { hits: 0 };
    let nextVal = row.val;
    let changed = false;

    if (parsed.kind === "string") {
      const replaced = replaceInTree(parsed.value, map, stats);
      if (stats.hits > 0) {
        nextVal = replaced;
        changed = true;
      }
    } else if (parsed.kind === "json-string" || parsed.kind === "object") {
      const replaced = replaceInTree(parsed.value, map, stats);
      if (stats.hits > 0) {
        nextVal = JSON.stringify(replaced);
        changed = true;
      }
    }

    if (!changed) continue;
    updated += 1;
    if (!dry) {
      await conn.query(`UPDATE \`${table}\` SET \`${col}\` = ? WHERE \`${idCol}\` = ?`, [
        nextVal,
        row.id,
      ]);
    }
  }
  return updated;
}

const existing = walkImages(join(root, "public", "images"));
const existingSet = new Set(existing);

const reportPath = join(root, "scripts", "output", "live-verify-report.json");
let missing = [];
if (existsSync(reportPath)) {
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  missing = (report.images?.bad || [])
    .map((b) => b.path)
    .filter((p) => p && p.startsWith("/images/") && !existingSet.has(p));
} else {
  console.warn("No live-verify-report.json — will scan DB for missing paths after connect.");
}

const pools = buildPools(existing);
const counters = {};
const map = new Map();
for (const path of missing) {
  map.set(path, pickReplacement(path, pools, counters));
}

console.log(dryRun ? "MODE: dry-run (pass --apply to write)\n" : "MODE: apply\n");
console.log("Existing local images:", existing.length);
console.log("Missing paths to remap:", map.size);
console.log("Target:", useHostinger ? "Hostinger remote" : "local DATABASE_URL");

const sample = [...map.entries()].slice(0, 8);
for (const [from, to] of sample) {
  console.log(`  ${from}\n    → ${to}`);
}
if (map.size > sample.length) console.log(`  … +${map.size - sample.length} more`);

const cfg = resolveConfig();
console.log(`\nConnecting ${cfg.user}@${cfg.host}/${cfg.database}`);
const conn = await createConnection(cfg);

const jobs = [
  ["packages", "id", "image_url"],
  ["packages", "id", "gallery_urls"],
  ["destinations", "id", "image_url"],
  ["services", "id", "banner_url"],
  ["services", "id", "gallery_urls"],
  ["services", "id", "content_blocks"],
  ["blog_posts", "id", "featured_image_url"],
  ["blog_posts", "id", "content"],
  ["gallery_images", "id", "image_url"],
  ["testimonials", "id", "photo_url"],
  ["homepage_settings", "id", "hero_slides"],
  ["homepage_settings", "id", "tour_types"],
  ["homepage_settings", "id", "holiday_themes"],
  ["homepage_settings", "id", "why_choose_us"],
  ["homepage_settings", "id", "corporate_features"],
  ["site_settings", "id", "logo_url"],
  ["site_settings", "id", "favicon_url"],
  ["site_settings", "id", "page_content"],
];

const summary = [];
try {
  // If report missing, discover broken paths from DB that are not on disk
  if (map.size === 0) {
    console.log("Discovering /images paths from DB…");
    const found = new Set();
    const collect = (v) => {
      if (typeof v === "string") {
        const m = v.match(/\/images\/[^\s"'\\]+/g);
        if (m) m.forEach((p) => found.add(p.replace(/[),.]+$/, "")));
      } else if (Array.isArray(v)) v.forEach(collect);
      else if (v && typeof v === "object") Object.values(v).forEach(collect);
    };
    for (const [table, , col] of jobs) {
      const [rows] = await conn.query(`SELECT \`${col}\` AS val FROM \`${table}\``);
      for (const row of rows) {
        const parsed = parseMaybeJson(row.val);
        collect(parsed.kind === "json-string" || parsed.kind === "object" ? parsed.value : parsed.value);
      }
    }
    for (const p of found) {
      if (p.startsWith("/images/") && !existingSet.has(p)) {
        map.set(p, pickReplacement(p, pools, counters));
      }
    }
    console.log("Discovered missing:", map.size);
  }

  for (const [table, idCol, col] of jobs) {
    const n = await remapColumn(conn, table, idCol, col, map, dryRun);
    if (n) {
      console.log(`${dryRun ? "would update" : "updated"} ${n} row(s): ${table}.${col}`);
      summary.push({ table, col, rows: n });
    }
  }
} finally {
  await conn.end();
}

const outDir = join(root, "scripts", "output");
mkdirSync(outDir, { recursive: true });
const mappingPath = join(outDir, "missing-image-remap.json");
writeFileSync(
  mappingPath,
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      dryRun,
      hostinger: useHostinger,
      mapped: Object.fromEntries(map),
      summary,
    },
    null,
    2,
  ),
);
console.log("\nMapping written:", mappingPath);
console.log(dryRun ? "Dry-run complete. Re-run with --apply (and --hostinger for live DB)." : "Done.");
