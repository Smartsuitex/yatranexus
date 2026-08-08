#!/usr/bin/env node
/**
 * Full live audit: holiday-packages hub + every domestic state page.
 * Compares MySQL image paths vs SSR HTML. Writes debug-00bc0d.log + JSON report.
 */
import fs from "node:fs";
import mysql from "mysql2/promise";

const LOG = "debug-00bc0d.log";
const OUT = "scripts/output/holiday-packages-full-image-audit.json";
const BASE = "https://yatranexus.com";

function log(hypothesisId, location, message, data) {
  const line = JSON.stringify({
    sessionId: "00bc0d",
    runId: "holiday-full-audit",
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
  });
  fs.appendFileSync(LOG, line + "\n");
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
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    process.env[k] = v;
  }
}

function extractImages(html) {
  const matches = [...html.matchAll(/\/images\/[^"'\\\s>]+/gi)].map((m) =>
    decodeURIComponent(m[0].replace(/&amp;/g, "&")),
  );
  return [...new Set(matches)];
}

function isUnsplash(url) {
  return /unsplash\.com/i.test(url || "");
}

async function headStatus(path) {
  if (!path?.startsWith("/")) return "skip";
  try {
    const r = await fetch(BASE + path, { method: "HEAD" });
    return r.status;
  } catch (e) {
    return String(e.message || e);
  }
}

async function fetchHtml(path) {
  const r = await fetch(BASE + path, { headers: { "cache-control": "no-cache" } });
  return { status: r.status, html: await r.text() };
}

loadEnv("scripts/output/hostinger.env");
const conn = await mysql.createConnection({
  host: "82.112.233.245",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const [destRows] = await conn.query(
  `SELECT slug, name, image_url, region
   FROM destinations
   WHERE is_active = 1
   ORDER BY sort_order, name`,
);
const [pkgRows] = await conn.query(
  `SELECT slug, title, destination, scope, image_url, is_active
   FROM packages
   WHERE is_active = 1
   ORDER BY destination, sort_order, title`,
);
const [svcRows] = await conn.query(
  `SELECT slug, banner_url FROM services WHERE slug = 'packages' LIMIT 1`,
);
await conn.end();

// Classify DB package images
const pkgAudit = [];
let pkgOk = 0,
  pkg404 = 0,
  pkgEmpty = 0,
  pkgUnsplash = 0;
for (const p of pkgRows) {
  const image = p.image_url?.trim() || "";
  let status = "empty";
  if (!image) {
    pkgEmpty++;
    status = "empty";
  } else if (isUnsplash(image)) {
    pkgUnsplash++;
    status = "unsplash";
  } else if (image.startsWith("/")) {
    status = await headStatus(image);
    if (status === 200) pkgOk++;
    else pkg404++;
  } else {
    status = "other";
  }
  pkgAudit.push({
    slug: p.slug,
    title: p.title,
    destination: p.destination,
    scope: p.scope,
    image,
    status,
    source: image ? "db" : "empty",
  });
}

log("A", "packages:db", "Active packages image_url audit", {
  total: pkgRows.length,
  ok200: pkgOk,
  missing404: pkg404,
  empty: pkgEmpty,
  unsplash: pkgUnsplash,
});

const destAudit = [];
let destOk = 0,
  dest404 = 0,
  destEmpty = 0;
for (const d of destRows) {
  const image = d.image_url?.trim() || "";
  let status = "empty";
  if (!image) {
    destEmpty++;
  } else if (isUnsplash(image)) {
    status = "unsplash";
  } else if (image.startsWith("/")) {
    status = await headStatus(image);
    if (status === 200) destOk++;
    else dest404++;
  }
  destAudit.push({ slug: d.slug, name: d.name, image, status, source: image ? "db" : "empty" });
}

log("B", "destinations:db", "Active destinations image_url audit", {
  total: destRows.length,
  ok200: destOk,
  missing404: dest404,
  empty: destEmpty,
});

// Hub page
const hub = await fetchHtml("/holiday-packages");
const hubImgs = extractImages(hub.html);
const hubHasUnsplash = /unsplash\.com/i.test(hub.html);
const packagesBanner = svcRows[0]?.banner_url || null;
const hubUsesPackagesBanner =
  packagesBanner &&
  (hubImgs.includes(packagesBanner) ||
    hub.html.includes(packagesBanner) ||
    hub.html.includes(encodeURI(packagesBanner)));

log("C", "hub:ssr", "Holiday packages hub SSR images", {
  httpStatus: hub.status,
  imageCount: hubImgs.length,
  hasUnsplash: hubHasUnsplash,
  packagesBannerFromDb: packagesBanner,
  hubUsesPackagesBanner: !!hubUsesPackagesBanner,
  sample: hubImgs.slice(0, 15),
});

// Each domestic state page
const domestic = destRows.filter((d) => {
  // destinations table may not have scope — infer from holiday routes: all listed are domestic states on site
  return true;
});

const statePages = [];
for (const d of destRows) {
  const path = `/holiday-packages/domestic/${encodeURIComponent(d.slug)}`;
  const page = await fetchHtml(path);
  const imgs = extractImages(page.html);
  const notFound =
    page.status === 404 ||
    /Destination not found/i.test(page.html) ||
    /Failed to load destination/i.test(page.html);

  const destImage = d.image_url?.trim() || "";
  const destImageOnPage =
    !destImage ||
    imgs.includes(destImage) ||
    page.html.includes(destImage) ||
    page.html.includes(encodeURI(destImage));

  // packages for this destination (name match loose)
  const related = pkgRows.filter((p) => {
    const dest = String(p.destination || "").toLowerCase();
    const name = String(d.name || "").toLowerCase();
    const slug = String(d.slug || "").toLowerCase();
    return (
      p.scope === "domestic" &&
      (dest.includes(name) ||
        name.includes(dest) ||
        dest.includes(slug.replace(/-/g, " ")) ||
        dest.replace(/\s+/g, "-") === slug)
    );
  });

  const relatedImageChecks = [];
  for (const p of related.slice(0, 12)) {
    const img = p.image_url?.trim() || "";
    const onPage =
      !img ||
      imgs.includes(img) ||
      page.html.includes(img) ||
      page.html.includes(encodeURI(img));
    relatedImageChecks.push({
      slug: p.slug,
      image: img,
      onPage: !!onPage,
      empty: !img,
    });
  }

  const entry = {
    slug: d.slug,
    name: d.name,
    path,
    httpStatus: page.status,
    notFound,
    hasUnsplash: /unsplash\.com/i.test(page.html),
    destImageFromDb: destImage,
    destImageOnPage: !!destImageOnPage,
    ssrImageCount: imgs.length,
    relatedPackageCount: related.length,
    relatedImagesOnPage: relatedImageChecks.filter((r) => r.onPage && !r.empty).length,
    relatedImagesMissingFromPage: relatedImageChecks.filter((r) => !r.empty && !r.onPage).length,
    relatedEmptyInDb: relatedImageChecks.filter((r) => r.empty).length,
    sampleImgs: imgs.slice(0, 8),
  };
  statePages.push(entry);
  log("D", `state:${d.slug}`, "State holiday page image check", {
    slug: d.slug,
    notFound,
    destImageOnPage: entry.destImageOnPage,
    hasUnsplash: entry.hasUnsplash,
    relatedPackageCount: entry.relatedPackageCount,
    relatedImagesOnPage: entry.relatedImagesOnPage,
    relatedImagesMissingFromPage: entry.relatedImagesMissingFromPage,
  });
}

const summary = {
  packages: {
    total: pkgRows.length,
    ok200: pkgOk,
    missing404: pkg404,
    empty: pkgEmpty,
    unsplash: pkgUnsplash,
    broken: pkgAudit.filter((p) => p.status !== 200 && p.status !== "empty").slice(0, 40),
  },
  destinations: {
    total: destRows.length,
    ok200: destOk,
    missing404: dest404,
    empty: destEmpty,
  },
  hub: {
    hasUnsplash: hubHasUnsplash,
    imageCount: hubImgs.length,
    usesDbPackagesBanner: !!hubUsesPackagesBanner,
  },
  statePages: {
    total: statePages.length,
    notFound: statePages.filter((s) => s.notFound).length,
    withUnsplash: statePages.filter((s) => s.hasUnsplash).length,
    destImageMismatch: statePages.filter((s) => !s.notFound && s.destImageFromDb && !s.destImageOnPage)
      .length,
    allDestImagesFromDb: statePages.every((s) => s.notFound || !s.destImageFromDb || s.destImageOnPage),
  },
  verdict: {
    holidayImagesFromDb: !hubHasUnsplash && statePages.every((s) => !s.hasUnsplash),
    noUnsplashOnHolidayPages: !hubHasUnsplash && statePages.every((s) => !s.hasUnsplash),
    note: "Paths are stored in MySQL; some may point at remapped /images/* files after upload wipe.",
  },
};

const report = { summary, packagesBanner, pkgAudit, destAudit, hubImgs, statePages };
fs.mkdirSync("scripts/output", { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(report, null, 2));

log("E", "summary", "Holiday packages full image audit summary", summary);
console.log("\nWrote", OUT);
console.log(JSON.stringify(summary, null, 2));
