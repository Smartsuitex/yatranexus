#!/usr/bin/env node
/**
 * Convert remaining site PNG/JPEG → WebP and rewrite local MySQL image paths.
 * Covers: about, corporate, Forex, gallery, homepage (+ any leftover banners/dest/packages).
 *
 * Usage:
 *   node scripts/optimize-site-images.mjs
 *   node scripts/optimize-site-images.mjs --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import mysql from "mysql2/promise";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dryRun = process.argv.includes("--dry-run");

const IMAGE_DIRS = [
  path.join(root, "public/images/about"),
  path.join(root, "public/images/corporate"),
  path.join(root, "public/images/Forex"),
  path.join(root, "public/images/gallery"),
  path.join(root, "public/images/homepage/hero"),
  path.join(root, "public/images/homepage/tour-types"),
  // Re-run safe: skip if webp already newer/exists — still convert missing only
  path.join(root, "public/images/banners"),
  path.join(root, "public/images/destinations"),
  path.join(root, "public/images/packages"),
];

const WEBP_FOLDERS =
  /\/images\/(hero|destinations|packages|banners|about|corporate|Forex|gallery|homepage)\//i;

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
  // Normalize encoded spaces for matching
  let value = url;
  try {
    value = decodeURIComponent(url);
  } catch {
    /* keep */
  }
  if (!value.startsWith("/images/")) return url;
  if (/\.webp$/i.test(value)) return value;
  if (!/\.(png|jpe?g)$/i.test(value)) return value;
  if (!WEBP_FOLDERS.test(value)) return value;
  return value.replace(/\.(png|jpe?g)$/i, ".webp");
}

function rewriteImagePath(value) {
  if (typeof value !== "string" || !value) return value;
  const next = toWebpUrl(value);
  return next;
}

function rewriteTree(node) {
  if (Array.isArray(node)) return node.map((item) => rewriteTree(item));
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) out[k] = rewriteTree(v);
    return out;
  }
  return rewriteImagePath(node);
}

function parseJson(v) {
  if (v == null) return v;
  if (typeof v === "string") {
    try {
      return JSON.parse(v);
    } catch {
      return v;
    }
  }
  return v;
}

async function convertFile(absPath) {
  const ext = path.extname(absPath);
  const webpPath = absPath.slice(0, -ext.length) + ".webp";
  const before = fs.statSync(absPath).size;

  // Skip if webp exists and is reasonably smaller / already present
  if (fs.existsSync(webpPath)) {
    const after = fs.statSync(webpPath).size;
    if (after > 0 && after < before) {
      return {
        from: toPublicUrl(absPath),
        to: toPublicUrl(webpPath),
        beforeKb: Math.round(before / 1024),
        afterKb: Math.round(after / 1024),
        skipped: true,
      };
    }
  }

  if (!dryRun) {
    await sharp(absPath)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 75, effort: 4 })
      .toFile(webpPath);
  }
  const after = dryRun ? 0 : fs.statSync(webpPath).size;
  return {
    from: toPublicUrl(absPath),
    to: toPublicUrl(webpPath),
    beforeKb: Math.round(before / 1024),
    afterKb: Math.round(after / 1024),
    skipped: false,
  };
}

async function main() {
  const files = IMAGE_DIRS.flatMap(walkImages);
  console.log(
    `Processing ${files.length} image(s)${dryRun ? " (dry-run)" : ""}…`,
  );

  const mappings = [];
  let converted = 0;
  let skipped = 0;
  let beforeTotal = 0;
  let afterTotal = 0;

  for (const file of files) {
    const result = await convertFile(file);
    mappings.push(result);
    beforeTotal += result.beforeKb;
    afterTotal += result.afterKb;
    if (result.skipped) skipped++;
    else converted++;
    if (!result.skipped) {
      console.log(
        `  ${String(result.beforeKb).padStart(5)}KB → ${String(result.afterKb || "?").padStart(5)}KB  ${path.basename(result.from)}`,
      );
    }
  }
  console.log(
    `\nConverted: ${converted} | Already had WebP: ${skipped} | ${beforeTotal}KB → ${afterTotal}KB`,
  );

  if (dryRun) {
    console.log("Dry-run: skipped DB rewrite.");
    return;
  }

  const conn = await mysql.createConnection(dbConfig());
  const updates = {
    destinations: 0,
    packages: 0,
    services: 0,
    gallery: 0,
    homepage: 0,
    blog: 0,
  };

  try {
    const tables = [
      {
        key: "destinations",
        sql: "SELECT id, image_url AS img FROM destinations WHERE image_url IS NOT NULL AND image_url != ''",
        update: "UPDATE destinations SET image_url = ? WHERE id = ?",
      },
      {
        key: "packages",
        sql: "SELECT id, image_url AS img FROM packages WHERE image_url IS NOT NULL AND image_url != ''",
        update: "UPDATE packages SET image_url = ? WHERE id = ?",
      },
      {
        key: "gallery",
        sql: "SELECT id, image_url AS img FROM gallery_images WHERE image_url IS NOT NULL AND image_url != ''",
        update: "UPDATE gallery_images SET image_url = ? WHERE id = ?",
      },
      {
        key: "blog",
        sql: "SELECT id, featured_image_url AS img FROM blog_posts WHERE featured_image_url IS NOT NULL AND featured_image_url != ''",
        update: "UPDATE blog_posts SET featured_image_url = ? WHERE id = ?",
      },
      {
        key: "testimonials",
        sql: "SELECT id, photo_url AS img FROM testimonials WHERE photo_url IS NOT NULL AND photo_url != ''",
        update: "UPDATE testimonials SET photo_url = ? WHERE id = ?",
      },
    ];

    const updatesExtra = { testimonials: 0 };
    Object.assign(updates, updatesExtra);

    for (const t of tables) {
      try {
        const [rows] = await conn.query(t.sql);
        for (const row of rows) {
          const next = rewriteImagePath(row.img);
          if (next !== row.img) {
            await conn.query(t.update, [next, row.id]);
            updates[t.key]++;
          }
        }
      } catch (e) {
        console.warn(`Skip ${t.key}:`, e.message);
      }
    }

    // packages.gallery_urls JSON
    try {
      const [pkgRows] = await conn.query(
        "SELECT id, gallery_urls FROM packages WHERE gallery_urls IS NOT NULL",
      );
      for (const row of pkgRows) {
        const gallery = parseJson(row.gallery_urls);
        const next = rewriteTree(gallery);
        if (JSON.stringify(next) !== JSON.stringify(gallery)) {
          await conn.query("UPDATE packages SET gallery_urls = ? WHERE id = ?", [
            JSON.stringify(next),
            row.id,
          ]);
          updates.packages++;
        }
      }
    } catch (e) {
      console.warn("Skip package galleries:", e.message);
    }

    // services.banner_url + content_blocks
    const heroMap = {
      hotels: "/images/hero/Hotal-Hero-Saction.webp",
      cabs: "/images/hero/cabs-hero.webp",
      visa: "/images/hero/visa-hero.webp",
      insurance: "/images/hero/insurance-hero.webp",
      forex: "/images/hero/forex-hero.webp",
      corporate: "/images/hero/corporate-hero.webp",
      flights: "/images/hero/flights-hero.webp",
      packages: "/images/hero/holiday-packages-hero-desktop.webp",
      about: "/images/hero/about-hero.webp",
      contact: "/images/hero/contact-hero.webp",
    };

    const [svcRows] = await conn.query(
      "SELECT id, slug, banner_url, content_blocks FROM services",
    );
    for (const row of svcRows) {
      let banner = rewriteImagePath(row.banner_url);
      // Always prefer dedicated LCP heroes for known service pages.
      if (heroMap[row.slug]) {
        banner = heroMap[row.slug];
      }

      const blocks = parseJson(row.content_blocks);
      const nextBlocks = rewriteTree(blocks);
      const bannerChanged = banner !== row.banner_url;
      const blocksChanged =
        JSON.stringify(nextBlocks ?? null) !== JSON.stringify(blocks ?? null);

      if (bannerChanged || blocksChanged) {
        await conn.query(
          "UPDATE services SET banner_url = ?, content_blocks = ? WHERE id = ?",
          [banner, nextBlocks == null ? null : JSON.stringify(nextBlocks), row.id],
        );
        updates.services++;
      }
    }

    // homepage_settings
    try {
      const [homeRows] = await conn.query(
        "SELECT id, hero_slides, tour_types FROM homepage_settings WHERE id = 1 LIMIT 1",
      );
      if (homeRows.length) {
        const row = homeRows[0];
        const hero = rewriteTree(parseJson(row.hero_slides));
        const tours = rewriteTree(parseJson(row.tour_types));
        const changed =
          JSON.stringify(hero) !== JSON.stringify(parseJson(row.hero_slides)) ||
          JSON.stringify(tours) !== JSON.stringify(parseJson(row.tour_types));
        if (changed) {
          await conn.query(
            "UPDATE homepage_settings SET hero_slides = ?, tour_types = ?, updated_at = NOW() WHERE id = 1",
            [JSON.stringify(hero ?? null), JSON.stringify(tours ?? null)],
          );
          updates.homepage++;
        }
      }
    } catch (e) {
      console.warn("Skip homepage:", e.message);
    }
  } finally {
    await conn.end();
  }

  console.log("\nDB updates:", updates);

  const report = {
    checkedAt: new Date().toISOString(),
    dryRun,
    converted,
    skipped,
    beforeTotalKb: beforeTotal,
    afterTotalKb: afterTotal,
    updates,
  };
  fs.mkdirSync(path.join(root, "scripts/output"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "scripts/output/site-image-optimize.json"),
    JSON.stringify(report, null, 2),
  );
  console.log("Wrote scripts/output/site-image-optimize.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
