#!/usr/bin/env node
/**
 * Download all Supabase cms-images from OLD project into public/images/
 * and write a manifest mapping each file → DB source (table, field, label).
 *
 * Usage:
 *   npm run download:images          ← use NEW Supabase (.env) — works when OLD is 402 blocked
 *   npm run download:old-images        ← use OLD Supabase (.env_Old)
 *   node scripts/download-old-supabase-images.mjs --dry-run
 *   node scripts/download-old-supabase-images.mjs --env=.env
 *
 * Outputs:
 *   scripts/output/old-db-image-download-manifest.json
 *   scripts/output/old-db-image-download-manifest.csv
 *   scripts/output/old-db-image-download-report.txt
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  statSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const CMS_BUCKET = "cms-images";

function argValue(flag) {
  const pref = process.argv.find((a) => a.startsWith(`${flag}=`));
  if (pref) return pref.slice(flag.length + 1);
  const i = process.argv.indexOf(flag);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

const dryRun = process.argv.includes("--dry-run");
const envFile = argValue("--env") ?? join(root, "..", ".env_Old");
const snapshotPath =
  argValue("--snapshot") ?? join(root, "output", "old-snapshot.json");
const outDir = join(root, "output");
const imagesRoot = join(root, "..", "public", "images");

function loadEnv(filePath) {
  const env = {};
  if (!existsSync(filePath)) throw new Error(`Env file not found: ${filePath}`);
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    env[k] = v;
  }
  return env;
}

function decodeHtml(s) {
  return String(s || "").replace(/&amp;/g, "&");
}

function classify(url) {
  const u = decodeHtml(url);
  if (!u) return "empty";
  if (u.includes("supabase.co/storage") && u.includes("/cms-images/")) return "supabase-upload";
  if (u.includes("unsplash.com")) return "unsplash-external";
  if (u.startsWith("/images/")) return "local-path";
  return "other";
}

function storagePathFromUrl(url) {
  const u = decodeHtml(url);
  const m = u.match(/\/cms-images\/(.+?)(?:\?|$)/);
  return m ? m[1] : null;
}

function localPathFromStorage(storagePath) {
  return `/images/${storagePath}`;
}

function walkJson(obj, table, hints, fn) {
  if (obj == null) return;
  if (typeof obj === "string") {
    if (
      obj.includes("supabase.co/storage") ||
      obj.includes("unsplash.com") ||
      obj.startsWith("/images/") ||
      obj.includes("/cms-images/")
    ) {
      fn(obj, table, hints.join(" / "));
    }
    return;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) walkJson(item, table, hints, fn);
    return;
  }
  if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      if (
        [
          "image",
          "image_url",
          "background",
          "photo_url",
          "banner_url",
          "featured_image_url",
          "logo_url",
          "favicon_url",
          "heroBannerUrl",
        ].includes(k) &&
        typeof v === "string"
      ) {
        fn(v, table, `${hints.join(" / ")} → ${k}`.replace(/^ → /, ""));
      } else if (k === "gallery_urls" && Array.isArray(v)) {
        v.forEach((u, i) => fn(u, table, `${hints.join(" / ")} gallery[${i}]`));
      } else {
        walkJson(v, table, [...hints, k], fn);
      }
    }
  }
}

/** @type {Map<string, { storagePath: string|null, localPath: string|null, imageSource: string, dbUrl: string, sources: Array<{table:string, field:string, sourceId:string, label:string}> }>} */
const registry = new Map();

function register(url, table, field, sourceId, label) {
  const dbUrl = decodeHtml(url);
  if (!dbUrl) return;

  const imageSource = classify(dbUrl);
  const storagePath =
    imageSource === "supabase-upload" ? storagePathFromUrl(dbUrl) : null;
  const key =
    storagePath ??
    (imageSource === "unsplash-external" ? `unsplash:${dbUrl}` : dbUrl);

  if (!registry.has(key)) {
    registry.set(key, {
      storagePath,
      localPath: storagePath ? localPathFromStorage(storagePath) : null,
      imageSource,
      dbUrl,
      sources: [],
    });
  }

  registry.get(key).sources.push({
    table,
    field,
    sourceId: String(sourceId),
    label: String(label),
  });
}

function buildRegistryFromSnapshot(snap) {
  for (const p of snap.packages ?? []) {
    register(p.image_url, "packages", "image_url", p.slug, p.title);
    for (let i = 0; i < (p.gallery_urls ?? []).length; i++) {
      register(p.gallery_urls[i], "packages", "gallery_urls", p.slug, `${p.title} [gallery ${i}]`);
    }
  }

  for (const d of snap.destinations ?? []) {
    register(
      d.image_url,
      "destinations",
      "image_url",
      `${d.slug} (${d.scope})`,
      d.name,
    );
  }

  for (const s of snap.services ?? []) {
    register(s.banner_url, "services", "banner_url", s.slug, s.title);
    for (let i = 0; i < (s.gallery_urls ?? []).length; i++) {
      register(s.gallery_urls[i], "services", "gallery_urls", s.slug, `${s.title} [gallery ${i}]`);
    }
    walkJson(s.content_blocks, "services", [s.slug, "content_blocks"], (u, table, hint) => {
      register(u, table, "content_blocks (nested)", s.slug, `${s.title} — ${hint}`);
    });
  }

  for (const g of snap.gallery_images ?? []) {
    register(g.image_url, "gallery_images", "image_url", g.id, `${g.title} (${g.album})`);
  }

  for (const t of snap.testimonials ?? []) {
    register(t.photo_url, "testimonials", "photo_url", t.id, `${t.name} (${t.city ?? ""})`);
  }

  for (const b of snap.blog_posts ?? []) {
    register(b.featured_image_url, "blog_posts", "featured_image_url", b.slug, b.title);
  }

  for (const s of snap.site_settings ?? []) {
    register(s.logo_url, "site_settings", "logo_url", "1", "Site logo");
    register(s.favicon_url, "site_settings", "favicon_url", "1", "Site favicon");
  }

  for (const h of snap.homepage_settings ?? []) {
    const slides = h.hero_slides ?? [];
    slides.forEach((slide, i) => {
      const img = slide.image || slide.background || slide.image_url;
      register(
        img,
        "homepage_settings",
        "hero_slides.image",
        `slide-${i + 1}`,
        slide.title || slide.headline || `Hero slide ${i + 1}`,
      );
    });

    (h.tour_types ?? []).forEach((tt, i) => {
      register(
        tt.image,
        "homepage_settings",
        "tour_types.image",
        tt.slug || `tour-${i + 1}`,
        tt.title || tt.label || `Tour type ${i + 1}`,
      );
    });

    (h.holiday_themes ?? []).forEach((ht, i) => {
      register(
        ht.image,
        "homepage_settings",
        "holiday_themes.image",
        ht.slug || `theme-${i + 1}`,
        ht.title || ht.label || `Holiday theme ${i + 1}`,
      );
    });
  }
}

function csvEscape(v) {
  const s = String(v ?? "");
  return s.includes(",") || s.includes('"') || s.includes("\n")
    ? `"${s.replace(/"/g, '""')}"`
    : s;
}

async function downloadObject(supabaseUrl, storagePath) {
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/${CMS_BUCKET}/${storagePath}`;
  const res = await fetch(publicUrl);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} — ${publicUrl}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

// --- main ---
console.log(dryRun ? "MODE: dry-run (no files written)\n" : "MODE: download\n");

const snap = JSON.parse(readFileSync(snapshotPath, "utf8"));
buildRegistryFromSnapshot(snap);

const env = loadEnv(envFile);
const supabaseUrl = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
if (!supabaseUrl) throw new Error("Missing SUPABASE_URL in env file");

const supabaseFiles = [...registry.entries()].filter(
  ([, e]) => e.imageSource === "supabase-upload" && e.storagePath,
);
const externalFiles = [...registry.entries()].filter(
  ([, e]) => e.imageSource !== "supabase-upload" && e.imageSource !== "empty",
);
const emptyRefs = [...registry.entries()].filter(([, e]) => e.imageSource === "empty");

console.log(`Snapshot: ${snapshotPath}`);
console.log(`Env: ${envFile}`);
console.log(`Supabase: ${supabaseUrl}`);
console.log(`Total image references: ${registry.size}`);
console.log(`  Supabase uploads (downloadable): ${supabaseFiles.length}`);
console.log(`  External / other: ${externalFiles.length}`);
console.log(`  Empty: ${emptyRefs.length}\n`);

const results = [];
let downloaded = 0;
let skipped = 0;
let failed = 0;

for (const [key, entry] of supabaseFiles) {
  const absPath = join(imagesRoot, entry.storagePath);
  const relPath = entry.localPath;

  const sourceSummary = entry.sources
    .map((s) => `${s.table}.${s.field} → ${s.label} (${s.sourceId})`)
    .join(" | ");

  const row = {
    storagePath: entry.storagePath,
    localPath: relPath,
    diskPath: absPath.replace(/\\/g, "/"),
    imageSource: entry.imageSource,
    dbUrl: entry.dbUrl,
    sources: entry.sources,
    sourceSummary,
    status: "pending",
    bytes: null,
    error: null,
  };

  if (existsSync(absPath) && statSync(absPath).size > 0) {
    row.status = "skipped-exists";
    row.bytes = statSync(absPath).size;
    skipped += 1;
    console.log(`SKIP  ${entry.storagePath}`);
    console.log(`      ← ${sourceSummary}`);
    results.push(row);
    continue;
  }

  if (dryRun) {
    row.status = "dry-run";
    console.log(`PLAN  ${entry.storagePath} → ${relPath}`);
    console.log(`      ← ${sourceSummary}`);
    results.push(row);
    continue;
  }

  try {
    mkdirSync(dirname(absPath), { recursive: true });
    const buf = await downloadObject(supabaseUrl, entry.storagePath);
    writeFileSync(absPath, buf);
    row.status = "downloaded";
    row.bytes = buf.length;
    downloaded += 1;
    console.log(`OK    ${entry.storagePath} (${buf.length} bytes)`);
    console.log(`      ← ${sourceSummary}`);
  } catch (err) {
    row.status = "failed";
    row.error = err.message;
    failed += 1;
    console.error(`FAIL  ${entry.storagePath}: ${err.message}`);
    console.error(`      ← ${sourceSummary}`);
  }

  results.push(row);
}

// Manifest JSON
const manifest = {
  generatedAt: new Date().toISOString(),
  supabaseProject: snap.project ?? supabaseUrl,
  snapshotPath,
  summary: {
    totalReferences: registry.size,
    supabaseUploads: supabaseFiles.length,
    downloaded,
    skipped,
    failed,
    externalNotDownloaded: externalFiles.length,
    emptyReferences: emptyRefs.length,
  },
  downloads: results,
  externalImages: externalFiles.map(([key, entry]) => ({
    key,
    imageSource: entry.imageSource,
    dbUrl: entry.dbUrl,
    sources: entry.sources,
    sourceSummary: entry.sources
      .map((s) => `${s.table}.${s.field} → ${s.label} (${s.sourceId})`)
      .join(" | "),
    note: "Not in Supabase storage — Unsplash/external URL only",
  })),
  emptyReferences: emptyRefs.map(([key, entry]) => ({
    key,
    sources: entry.sources,
  })),
};

writeFileSync(
  join(outDir, "old-db-image-download-manifest.json"),
  JSON.stringify(manifest, null, 2),
);

// CSV — one row per source connection
const csvLines = [
  "storage_path,local_path,image_source,status,source_table,source_field,source_id,source_label,db_url",
];
for (const row of results) {
  for (const s of row.sources) {
    csvLines.push(
      [
        csvEscape(row.storagePath),
        csvEscape(row.localPath),
        csvEscape(row.imageSource),
        csvEscape(row.status),
        csvEscape(s.table),
        csvEscape(s.field),
        csvEscape(s.sourceId),
        csvEscape(s.label),
        csvEscape(row.dbUrl),
      ].join(","),
    );
  }
}
for (const [, entry] of externalFiles) {
  for (const s of entry.sources) {
    csvLines.push(
      [
        "",
        "",
        csvEscape(entry.imageSource),
        "not-downloaded",
        csvEscape(s.table),
        csvEscape(s.field),
        csvEscape(s.sourceId),
        csvEscape(s.label),
        csvEscape(entry.dbUrl),
      ].join(","),
    );
  }
}
writeFileSync(join(outDir, "old-db-image-download-manifest.csv"), csvLines.join("\n"));

// Human-readable report
const report = [
  "OLD SUPABASE IMAGE DOWNLOAD REPORT",
  "==================================",
  `Generated: ${manifest.generatedAt}`,
  `Supabase: ${supabaseUrl}`,
  "",
  "SUMMARY",
  `  Supabase files to download: ${supabaseFiles.length}`,
  `  Downloaded: ${downloaded}`,
  `  Skipped (already on disk): ${skipped}`,
  `  Failed: ${failed}`,
  `  External (Unsplash — not downloaded): ${externalFiles.length}`,
  "",
  "FILES + CONNECTED SOURCES",
  "",
];

for (const row of results) {
  report.push(`${row.storagePath}`);
  report.push(`  local: ${row.localPath}`);
  report.push(`  status: ${row.status}${row.bytes ? ` (${row.bytes} bytes)` : ""}`);
  if (row.error) report.push(`  error: ${row.error}`);
  for (const s of row.sources) {
    report.push(`  ← ${s.table}.${s.field} | ${s.label} | id=${s.sourceId}`);
  }
  report.push("");
}

if (externalFiles.length) {
  report.push("EXTERNAL IMAGES (NOT IN SUPABASE STORAGE)");
  report.push("");
  for (const [, entry] of externalFiles) {
    report.push(entry.dbUrl.slice(0, 100) + (entry.dbUrl.length > 100 ? "..." : ""));
    for (const s of entry.sources) {
      report.push(`  ← ${s.table}.${s.field} | ${s.label} | id=${s.sourceId}`);
    }
    report.push("");
  }
}

writeFileSync(join(outDir, "old-db-image-download-report.txt"), report.join("\n"));

console.log("\n--- DONE ---");
console.log(`Downloaded: ${downloaded} | Skipped: ${skipped} | Failed: ${failed}`);
console.log("Manifest: scripts/output/old-db-image-download-manifest.json");
console.log("CSV:      scripts/output/old-db-image-download-manifest.csv");
console.log("Report:   scripts/output/old-db-image-download-report.txt");

process.exit(failed > 0 ? 1 : 0);
