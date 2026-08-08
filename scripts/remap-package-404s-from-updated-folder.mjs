#!/usr/bin/env node
/**
 * Remap 58 missing package images from D:\Updated Images 2\Updated Images
 * → public/images/packages/*.webp + Hostinger packages.image_url + cms_media.
 *
 * Usage:
 *   node scripts/remap-package-404s-from-updated-folder.mjs --dry-run
 *   node scripts/remap-package-404s-from-updated-folder.mjs --apply
 */
import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";
import sharp from "sharp";

const LOG = "debug-00bc0d.log";
const SOURCE = "D:\\Updated Images 2\\Updated Images";
const OUT_DIR = path.join("public", "images", "packages");
const OUT_JSON = "scripts/output/package-404-remap-from-updated.json";
const BASE = "https://yatranexus.com";
const APPLY = process.argv.includes("--apply");
const DEST_SKIP = new Set(["Hero Images_Services"]);

function agentLog(hypothesisId, location, message, data) {
  // #region agent log
  const line = JSON.stringify({
    sessionId: "00bc0d",
    runId: APPLY ? "package-remap-apply" : "package-remap-dry",
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
  });
  fs.appendFileSync(LOG, line + "\n");
  // #endregion
  console.log(`[${hypothesisId}] ${message}`);
}

function loadEnv(p) {
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    process.env[k] = v;
  }
}

function norm(s) {
  return String(s || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

/** Strip leading upload timestamp: 1786125317404-kashmir-horo → kashmir-horo */
function stripTs(basename) {
  const m = basename.match(/^\d{10,}-(.+)$/);
  return m ? m[1] : basename;
}

function walkImages(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const abs = path.join(dir, name);
    const st = fs.statSync(abs);
    if (st.isDirectory()) {
      if (DEST_SKIP.has(name)) continue;
      walkImages(abs, acc);
    } else if (/\.(png|jpe?g|webp)$/i.test(name)) {
      const rel = path.relative(SOURCE, abs);
      const folder = rel.includes(path.sep)
        ? rel.split(path.sep)[0]
        : "_root";
      acc.push({
        abs,
        name,
        folder,
        stem: path.parse(name).name,
        key: norm(path.parse(name).name),
      });
    }
  }
  return acc;
}

const DEST_ALIASES = {
  "arunachal pradesh": ["arunachal"],
  himachal: ["himachal pradesh"],
  "himachal pradesh": ["himachal"],
  kashmir: ["kashmir"],
  "madhya pradesh": ["madhya oradesh", "madhya"],
  maharashtra: ["maharastra"],
  meghalaya: ["meghalaya"],
  odisha: ["odisha"],
  rajasthan: ["rajasthan"],
  uttarakhand: ["uttarakhand"],
  uttarpradesh: ["uttarpradesh", "uttar pradesh"],
  "uttar pradesh": ["uttarpradesh"],
  "west bengal": ["bengal"],
};

function folderMatches(destName, folder) {
  const d = norm(destName);
  const f = norm(folder);
  if (d === f) return true;
  const aliases = DEST_ALIASES[d] || [];
  return aliases.some((a) => norm(a) === f) || f.includes(d) || d.includes(f);
}

function scoreMatch(pkg, file) {
  const destHint = stripTs(
    path.parse(pkg.image).name.replace(/\.(webp|png|jpe?g)$/i, ""),
  );
  const hintKey = norm(destHint);
  const titleKey = norm(pkg.title);
  const slugKey = norm(pkg.slug);
  let score = 0;
  if (file.key === hintKey) score += 100;
  else if (file.key.includes(hintKey) || hintKey.includes(file.key)) score += 70;
  else {
    // token overlap with hint
    const ht = new Set(hintKey.split("-").filter((t) => t.length > 2));
    const ft = new Set(file.key.split("-").filter((t) => t.length > 2));
    let overlap = 0;
    for (const t of ht) if (ft.has(t)) overlap++;
    if (overlap && ht.size) score += Math.round((40 * overlap) / ht.size);
  }
  if (folderMatches(pkg.destination, file.folder)) score += 25;
  // title/slug soft boost
  const tt = titleKey.split("-").filter((t) => t.length > 3);
  for (const t of tt.slice(0, 4)) {
    if (file.key.includes(t)) score += 3;
  }
  if (file.key.includes(slugKey.slice(0, 20))) score += 5;
  return score;
}

function pickBest(pkg, files) {
  const ranked = files
    .map((f) => ({ f, score: scoreMatch(pkg, f) }))
    .filter((x) => x.score >= 50)
    .sort((a, b) => b.score - a.score);
  return ranked[0] || null;
}

async function headStatus(urlPath) {
  try {
    const r = await fetch(BASE + urlPath, { method: "HEAD" });
    return r.status;
  } catch (e) {
    return String(e.message || e);
  }
}

loadEnv("scripts/output/hostinger.env");
const conn = await mysql.createConnection({
  host: "82.112.233.245",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: false,
});

// Ensure cms_media exists
await conn.query(`
  CREATE TABLE IF NOT EXISTS cms_media (
    path VARCHAR(512) NOT NULL PRIMARY KEY,
    content_type VARCHAR(128) NOT NULL DEFAULT 'image/webp',
    bytes MEDIUMBLOB NOT NULL,
    byte_length INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`);

const [pkgRows] = await conn.query(
  `SELECT slug, title, image_url AS image, destination
   FROM packages
   WHERE is_active = 1
   ORDER BY destination, title`,
);

const broken = [];
for (const row of pkgRows) {
  const image = row.image || "";
  if (!image.startsWith("/images/")) continue;
  const status = await headStatus(image);
  if (status === 404) {
    broken.push({
      slug: row.slug,
      title: row.title,
      destination: row.destination || "?",
      image,
      status,
    });
  }
}

agentLog("A", "scan:broken", "Broken package images on live", {
  brokenCount: broken.length,
});

const files = walkImages(SOURCE);
agentLog("B", "scan:source", "Source folder inventory", {
  source: SOURCE,
  fileCount: files.length,
  folders: [...new Set(files.map((f) => f.folder))],
});

const usedFiles = new Set();
const plan = [];
const unmatched = [];

for (const pkg of broken) {
  const candidates = files.filter((f) => !usedFiles.has(f.abs));
  // Prefer same-destination folder first
  const destFirst = [
    ...candidates.filter((f) => folderMatches(pkg.destination, f.folder)),
    ...candidates.filter((f) => !folderMatches(pkg.destination, f.folder)),
  ];
  // de-dupe while preserving order
  const seen = new Set();
  const ordered = [];
  for (const f of destFirst) {
    if (seen.has(f.abs)) continue;
    seen.add(f.abs);
    ordered.push(f);
  }
  const best = pickBest(pkg, ordered);
  if (!best) {
    unmatched.push(pkg);
    continue;
  }
  usedFiles.add(best.f.abs);
  const newName = `${pkg.slug}.webp`;
  const newUrl = `/images/packages/${newName}`;
  plan.push({
    slug: pkg.slug,
    title: pkg.title,
    destination: pkg.destination,
    oldImage: pkg.image,
    sourceFile: best.f.abs,
    sourceKey: best.f.key,
    score: best.score,
    newUrl,
    newName,
  });
}

agentLog("C", "match:plan", "Match plan built", {
  matched: plan.length,
  unmatched: unmatched.length,
  unmatchedSlugs: unmatched.map((u) => u.slug),
});

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });

const results = [];
for (const item of plan) {
  const outAbs = path.join(OUT_DIR, item.newName);
  let byteLength = 0;
  if (APPLY) {
    const buf = await sharp(item.sourceFile)
      .rotate()
      .webp({ quality: 82 })
      .toBuffer();
    fs.writeFileSync(outAbs, buf);
    byteLength = buf.length;
    const relPath = `packages/${item.newName}`;
    await conn.query(
      `INSERT INTO cms_media (path, content_type, bytes, byte_length)
       VALUES (?, 'image/webp', ?, ?)
       ON DUPLICATE KEY UPDATE
         content_type = VALUES(content_type),
         bytes = VALUES(bytes),
         byte_length = VALUES(byte_length),
         updated_at = CURRENT_TIMESTAMP(3)`,
      [relPath, buf, buf.length],
    );
    await conn.query(`UPDATE packages SET image_url = ? WHERE slug = ?`, [
      item.newUrl,
      item.slug,
    ]);
  }
  results.push({ ...item, byteLength, applied: APPLY });
  console.log(
    `${APPLY ? "APPLIED" : "DRY"} ${item.slug} ← ${path.basename(item.sourceFile)} (score ${item.score}) → ${item.newUrl}`,
  );
}

// Second-pass: for unmatched, assign unused files from destination folder by order
if (unmatched.length) {
  agentLog("D", "match:fallback", "Attempting destination-folder fallback", {
    count: unmatched.length,
  });
  for (const pkg of unmatched) {
    const leftover = files.filter(
      (f) =>
        !usedFiles.has(f.abs) && folderMatches(pkg.destination, f.folder),
    );
    if (!leftover.length) continue;
    const f = leftover[0];
    usedFiles.add(f.abs);
    const newName = `${pkg.slug}.webp`;
    const newUrl = `/images/packages/${newName}`;
    const item = {
      slug: pkg.slug,
      title: pkg.title,
      destination: pkg.destination,
      oldImage: pkg.image,
      sourceFile: f.abs,
      sourceKey: f.key,
      score: 40,
      newUrl,
      newName,
      fallback: true,
    };
    let byteLength = 0;
    if (APPLY) {
      const buf = await sharp(f.abs).rotate().webp({ quality: 82 }).toBuffer();
      fs.writeFileSync(path.join(OUT_DIR, newName), buf);
      byteLength = buf.length;
      await conn.query(
        `INSERT INTO cms_media (path, content_type, bytes, byte_length)
         VALUES (?, 'image/webp', ?, ?)
         ON DUPLICATE KEY UPDATE
           content_type = VALUES(content_type),
           bytes = VALUES(bytes),
           byte_length = VALUES(byte_length),
           updated_at = CURRENT_TIMESTAMP(3)`,
        [`packages/${newName}`, buf, buf.length],
      );
      await conn.query(`UPDATE packages SET image_url = ? WHERE slug = ?`, [
        newUrl,
        pkg.slug,
      ]);
    }
    results.push({ ...item, byteLength, applied: APPLY });
    plan.push(item);
    console.log(
      `${APPLY ? "APPLIED" : "DRY"} FALLBACK ${pkg.slug} ← ${f.name} → ${newUrl}`,
    );
  }
}

const stillUnmatched = broken.filter(
  (b) => !results.some((r) => r.slug === b.slug),
);

const report = {
  mode: APPLY ? "apply" : "dry-run",
  brokenCount: broken.length,
  matched: results.length,
  unmatched: stillUnmatched,
  results,
};
fs.writeFileSync(OUT_JSON, JSON.stringify(report, null, 2));

agentLog("E", "summary", "Package 404 remap summary", {
  mode: report.mode,
  brokenCount: report.brokenCount,
  matched: report.matched,
  unmatchedCount: stillUnmatched.length,
});

console.log("\nWrote", OUT_JSON);
console.log(
  JSON.stringify(
    {
      mode: report.mode,
      broken: broken.length,
      matched: results.length,
      unmatched: stillUnmatched.map((u) => u.slug),
    },
    null,
    2,
  ),
);

await conn.end();
if (stillUnmatched.length && APPLY) process.exitCode = 2;
