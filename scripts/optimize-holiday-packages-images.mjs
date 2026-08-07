#!/usr/bin/env node
/**
 * Convert holiday-packages related PNG/JPEG → WebP and rewrite local MySQL paths.
 *
 * Usage:
 *   node scripts/optimize-holiday-packages-images.mjs
 *   node scripts/optimize-holiday-packages-images.mjs --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import mysql from "mysql2/promise";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dryRun = process.argv.includes("--dry-run");

const IMAGE_DIRS = [
  path.join(root, "public/images/destinations"),
  path.join(root, "public/images/packages"),
  path.join(root, "public/images/banners"),
];

const HUB_HERO_WEBP = "/images/hero/holiday-packages-hero-desktop.webp";

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

function dbConfig() {
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

function toWebpUrl(url) {
  if (typeof url !== "string" || !url) return url;
  if (!url.startsWith("/images/")) return url;
  if (/\.webp$/i.test(url)) return url;
  return url.replace(/\.(png|jpe?g)(\?.*)?$/i, ".webp$2");
}

function rewriteImagePath(value, pngToWebp) {
  if (typeof value !== "string" || !value) return value;
  for (const [from, to] of pngToWebp) {
    if (value === from) return to;
    // Match encoded or unencoded path endings
    try {
      const decoded = decodeURIComponent(value);
      if (decoded === from || decoded.endsWith(from)) return to;
    } catch {
      /* ignore */
    }
    if (value.endsWith(from) || value.includes(from)) {
      return value.split(from).join(to);
    }
  }
  // Generic: any /images/...png → .webp when we converted that folder
  if (
    /^\/images\/(destinations|packages|banners)\//i.test(value) &&
    /\.(png|jpe?g)$/i.test(value)
  ) {
    return toWebpUrl(value);
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
    // Cards/heroes: keep quality usable on retina, shrink huge ChatGPT exports
    await sharp(absPath)
      .rotate()
      .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 75, effort: 4 })
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
  const files = IMAGE_DIRS.flatMap(walkImages);
  console.log(
    `Converting ${files.length} holiday image(s)${dryRun ? " (dry-run)" : ""}…`,
  );

  const mappings = [];
  let beforeTotal = 0;
  let afterTotal = 0;
  for (const file of files) {
    const result = await convertFile(file);
    mappings.push(result);
    beforeTotal += result.beforeKb;
    afterTotal += result.afterKb;
    console.log(
      `  ${String(result.beforeKb).padStart(5)}KB → ${String(result.afterKb || "?").padStart(5)}KB  ${path.basename(result.from)}`,
    );
  }
  console.log(
    `\nTotal: ${beforeTotal}KB → ${afterTotal || "?"}KB (${beforeTotal ? Math.round((1 - afterTotal / beforeTotal) * 100) : 0}% smaller)`,
  );

  const pngToWebp = mappings.map((m) => [m.from, m.to]);

  if (dryRun) {
    console.log("Dry-run: skipped DB rewrite.");
    return;
  }

  const conn = await mysql.createConnection(dbConfig());
  const updates = { destinations: 0, packages: 0, services: 0, homepage: 0 };

  try {
    // destinations.image_url
    const [destRows] = await conn.query(
      "SELECT id, image_url FROM destinations WHERE image_url IS NOT NULL AND image_url != ''",
    );
    for (const row of destRows) {
      const next = rewriteImagePath(row.image_url, pngToWebp);
      if (next !== row.image_url) {
        await conn.query("UPDATE destinations SET image_url = ? WHERE id = ?", [
          next,
          row.id,
        ]);
        updates.destinations++;
      }
    }

    // packages.image_url + gallery_urls
    const [pkgRows] = await conn.query(
      "SELECT id, image_url, gallery_urls FROM packages WHERE image_url IS NOT NULL OR gallery_urls IS NOT NULL",
    );
    for (const row of pkgRows) {
      const nextImage = rewriteImagePath(row.image_url, pngToWebp);
      let gallery = row.gallery_urls;
      if (typeof gallery === "string") {
        try {
          gallery = JSON.parse(gallery);
        } catch {
          gallery = null;
        }
      }
      const nextGallery = gallery != null ? rewriteTree(gallery, pngToWebp) : gallery;
      const galleryChanged =
        JSON.stringify(nextGallery ?? null) !== JSON.stringify(gallery ?? null);
      if (nextImage !== row.image_url || galleryChanged) {
        await conn.query(
          "UPDATE packages SET image_url = ?, gallery_urls = ? WHERE id = ?",
          [
            nextImage,
            nextGallery == null ? null : JSON.stringify(nextGallery),
            row.id,
          ],
        );
        updates.packages++;
      }
    }

    // services.banner_url — force packages hub to dedicated WebP hero for LCP
    const [svcRows] = await conn.query(
      "SELECT id, slug, banner_url FROM services WHERE banner_url IS NOT NULL AND banner_url != ''",
    );
    for (const row of svcRows) {
      let next = rewriteImagePath(row.banner_url, pngToWebp);
      if (row.slug === "packages") {
        next = HUB_HERO_WEBP;
      }
      if (next !== row.banner_url) {
        await conn.query("UPDATE services SET banner_url = ? WHERE id = ?", [
          next,
          row.id,
        ]);
        updates.services++;
      }
    }

    // homepage featured package images live in packages table; also rewrite any
    // destination price / content JSON that embeds image paths if present
    const [homeRows] = await conn.query(
      "SELECT id, hero_slides, tour_types FROM homepage_settings WHERE id = 1 LIMIT 1",
    );
    if (homeRows.length) {
      const row = homeRows[0];
      const parse = (v) => {
        if (v == null) return v;
        if (typeof v === "string") {
          try {
            return JSON.parse(v);
          } catch {
            return v;
          }
        }
        return v;
      };
      const hero = rewriteTree(parse(row.hero_slides), pngToWebp);
      const tours = rewriteTree(parse(row.tour_types), pngToWebp);
      const changed =
        JSON.stringify(hero) !== JSON.stringify(parse(row.hero_slides)) ||
        JSON.stringify(tours) !== JSON.stringify(parse(row.tour_types));
      if (changed) {
        await conn.query(
          `UPDATE homepage_settings
           SET hero_slides = ?, tour_types = ?, updated_at = NOW()
           WHERE id = 1`,
          [JSON.stringify(hero ?? null), JSON.stringify(tours ?? null)],
        );
        updates.homepage++;
      }
    }
  } finally {
    await conn.end();
  }

  console.log("\nDB updates:", updates);

  const report = {
    checkedAt: new Date().toISOString(),
    dryRun,
    beforeTotalKb: beforeTotal,
    afterTotalKb: afterTotal,
    mappings,
    updates,
    hubHero: HUB_HERO_WEBP,
  };
  fs.mkdirSync(path.join(root, "scripts/output"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "scripts/output/holiday-packages-image-optimize.json"),
    JSON.stringify(report, null, 2),
  );
  console.log("Wrote scripts/output/holiday-packages-image-optimize.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
