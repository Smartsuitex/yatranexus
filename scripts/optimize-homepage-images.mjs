#!/usr/bin/env node
/**
 * Convert homepage hero + tour-type images to WebP and rewrite CMS paths.
 *
 * Usage:
 *   node scripts/optimize-homepage-images.mjs
 *   node scripts/optimize-homepage-images.mjs --hostinger
 *   node scripts/optimize-homepage-images.mjs --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import mysql from "mysql2/promise";

const root = process.cwd();
const dryRun = process.argv.includes("--dry-run");
const hostinger = process.argv.includes("--hostinger");
/** When set with --hostinger, rewrite remote CMS paths to .webp (only after WebP files are deployed). */
const applyDb = process.argv.includes("--apply-db");

const HOMEPAGE_DIRS = [
  path.join(root, "public/images/homepage/hero"),
  path.join(root, "public/images/homepage/tour-types"),
];

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

loadEnvFile(path.join(root, ".env"));
if (hostinger) {
  loadEnvFile(path.join(root, "scripts/output/hostinger.env"));
}

function dbConfig() {
  if (hostinger) {
    // Local machine talks to Hostinger MySQL remotely; on-server apps use 127.0.0.1.
    const host = process.env.DB_HOST;
    const remoteHost =
      !host || host === "127.0.0.1" || host === "localhost"
        ? "82.112.233.245"
        : host;
    return {
      host: remoteHost,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };
  }
  const url = process.env.DATABASE_URL;
  if (url?.startsWith("mysql://")) {
    const u = new URL(url);
    return {
      host: u.hostname === "localhost" ? "127.0.0.1" : u.hostname,
      port: Number(u.port || 3306),
      user: decodeURIComponent(u.username),
      password: decodeURIComponent(u.password),
      database: u.pathname.replace(/^\//, ""),
    };
  }
  return {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "yatranexus",
  };
}

function walkImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpe?g)$/i.test(f))
    .map((f) => path.join(dir, f));
}

function toPublicUrl(absPath) {
  const rel = path.relative(path.join(root, "public"), absPath).replace(/\\/g, "/");
  return `/${rel}`;
}

function rewriteImagePath(value, pngToWebp) {
  if (typeof value !== "string" || !value) return value;
  for (const [from, to] of pngToWebp) {
    if (value === from || value.endsWith(from)) return to;
    if (value.includes(from)) return value.split(from).join(to);
  }
  return value;
}

function rewriteTree(node, pngToWebp) {
  if (Array.isArray(node)) return node.map((item) => rewriteTree(item, pngToWebp));
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      out[k] = rewriteTree(v, pngToWebp);
    }
    return out;
  }
  return rewriteImagePath(node, pngToWebp);
}

async function convertFile(absPath) {
  const ext = path.extname(absPath);
  const webpPath = absPath.slice(0, -ext.length) + ".webp";
  const before = fs.statSync(absPath).size;
  if (!dryRun) {
    await sharp(absPath)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(webpPath);
  }
  const after = dryRun ? 0 : fs.statSync(webpPath).size;
  return {
    from: toPublicUrl(absPath),
    to: toPublicUrl(webpPath),
    beforeKb: Math.round(before / 1024),
    afterKb: Math.round(after / 1024),
  };
}

async function main() {
  const files = HOMEPAGE_DIRS.flatMap(walkImages);
  if (!files.length) {
    console.log("No homepage PNG/JPEG files found under public/images/homepage/");
    return;
  }

  console.log(`Converting ${files.length} homepage image(s)${dryRun ? " (dry-run)" : ""}…`);
  const mappings = [];
  for (const file of files) {
    const result = await convertFile(file);
    mappings.push(result);
    console.log(
      `  ${result.beforeKb}KB → ${result.afterKb || "?"}KB  ${result.from} → ${result.to}`,
    );
  }

  const pngToWebp = mappings.map((m) => [m.from, m.to]);

  if (hostinger && !applyDb) {
    console.log(
      "\nSkipped Hostinger DB rewrite (WebP files must be deployed first).\n" +
        "After deploy, run: npm run optimize:homepage-images:hostinger -- --apply-db",
    );
    const report = {
      checkedAt: new Date().toISOString(),
      dryRun,
      hostinger,
      applyDb: false,
      mappings,
    };
    fs.mkdirSync(path.join(root, "scripts/output"), { recursive: true });
    fs.writeFileSync(
      path.join(root, "scripts/output/homepage-image-optimize.json"),
      JSON.stringify(report, null, 2),
    );
    return;
  }

  const conn = await mysql.createConnection(dbConfig());
  try {
    const [rows] = await conn.query(
      "SELECT id, hero_slides, tour_types FROM homepage_settings WHERE id = 1 LIMIT 1",
    );
    if (!rows.length) {
      console.log("No homepage_settings row found — skipped DB rewrite.");
      return;
    }
    const row = rows[0];
    const parse = (v) => {
      if (v == null) return [];
      if (typeof v === "string") {
        try {
          return JSON.parse(v);
        } catch {
          return [];
        }
      }
      return v;
    };
    const hero = rewriteTree(parse(row.hero_slides), pngToWebp);
    const tours = rewriteTree(parse(row.tour_types), pngToWebp);
    const changed =
      JSON.stringify(hero) !== JSON.stringify(parse(row.hero_slides)) ||
      JSON.stringify(tours) !== JSON.stringify(parse(row.tour_types));

    if (!changed) {
      console.log("CMS homepage image paths already up to date (or no matching PNG refs).");
      return;
    }

    if (dryRun) {
      console.log("Would update homepage_settings hero_slides + tour_types to WebP paths.");
      return;
    }

    await conn.query(
      "UPDATE homepage_settings SET hero_slides = ?, tour_types = ?, updated_at = NOW() WHERE id = 1",
      [JSON.stringify(hero), JSON.stringify(tours)],
    );
    console.log("Updated homepage_settings image paths to .webp");
  } finally {
    await conn.end();
  }

  const report = {
    checkedAt: new Date().toISOString(),
    dryRun,
    hostinger,
    mappings,
  };
  fs.mkdirSync(path.join(root, "scripts/output"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "scripts/output/homepage-image-optimize.json"),
    JSON.stringify(report, null, 2),
  );
  console.log("Wrote scripts/output/homepage-image-optimize.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
