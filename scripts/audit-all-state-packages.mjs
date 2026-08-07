#!/usr/bin/env node
/**
 * Audit ALL domestic state pages + sample packages for image weight/timing.
 * Usage: node scripts/audit-all-state-packages.mjs [baseUrl]
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

const BASE = (process.argv[2] || "http://localhost:8082").replace(/\/$/, "");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv() {
  for (const file of [".env"]) {
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!m || process.env[m[1]]) continue;
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}
loadEnv();

async function measureUrl(urlPath) {
  const start = performance.now();
  try {
    const res = await fetch(`${BASE}${urlPath}`, { headers: { "cache-control": "no-cache" } });
    const buf = Buffer.from(await res.arrayBuffer());
    return {
      path: urlPath,
      ms: Math.round(performance.now() - start),
      kb: Math.round(buf.length / 1024),
      status: res.status,
      ext: (urlPath.match(/\.(webp|png|jpe?g)(?:\?|$)/i) || [])[1]?.toLowerCase() || "",
    };
  } catch (e) {
    return { path: urlPath, ms: 0, kb: 0, status: String(e.message), ext: "" };
  }
}

function extractImages(html) {
  const srcs = [
    ...html.matchAll(/\b(?:src|content)="(\/images\/[^"]+\.(?:webp|png|jpe?g))"/gi),
  ].map((m) => decodeURIComponent(m[1]));
  return [...new Set(srcs)];
}

async function auditPage(route) {
  const t0 = performance.now();
  const res = await fetch(`${BASE}${route}`, {
    headers: { "cache-control": "no-cache", accept: "text/html" },
    redirect: "follow",
  });
  const html = await res.text();
  const htmlMs = Math.round(performance.now() - t0);
  const finalUrl = res.url.replace(BASE, "") || route;
  const images = extractImages(html);
  const measured = [];
  for (const src of images) {
    measured.push(await measureUrl(src));
  }
  measured.sort((a, b) => b.kb - a.kb);
  const totalKb = measured.reduce((s, m) => s + m.kb, 0);
  const pngs = measured.filter((m) => m.ext === "png" || m.ext === "jpg" || m.ext === "jpeg");
  const webps = measured.filter((m) => m.ext === "webp");
  const heavy = measured.filter((m) => m.kb >= 500);
  const hero =
    measured.find((m) => /\/(destinations|banners|hero|homepage\/hero)\//i.test(m.path)) ||
    measured[0] ||
    null;

  // package card images (exclude hero-ish)
  const packageImgs = measured.filter((m) => /\/packages\//i.test(m.path));

  return {
    route,
    finalUrl,
    status: res.status,
    htmlMs,
    imageCount: images.length,
    totalKb,
    pngCount: pngs.length,
    webpCount: webps.length,
    heavyCount: heavy.length,
    hero,
    heaviest: measured.slice(0, 5),
    packageImgs,
    issues: [
      ...(res.status !== 200 ? [`HTTP ${res.status}`] : []),
      ...(pngs.length > 0 ? [`${pngs.length} non-webp image(s)`] : []),
      ...(heavy.length > 0 ? [`${heavy.length} image(s) ≥500KB`] : []),
      ...(hero && /banners\//i.test(hero.path) && /\/domestic\//i.test(finalUrl)
        ? ["hero looks like shared banner (may be mismatched)"]
        : []),
      ...(packageImgs.length === 0 && /\/domestic\//i.test(finalUrl) ? ["no package images found"] : []),
    ],
  };
}

console.log(`Auditing all domestic states + packages on ${BASE}\n`);

// Discover states from domestic index + DB
const domesticHtml = await (await fetch(`${BASE}/holiday-packages/domestic`)).text();
const stateLinks = [
  ...new Set(
    [...domesticHtml.matchAll(/href="(\/holiday-packages\/domestic\/[^"#?]+)"/gi)].map((m) =>
      m[1].replace(/\/$/, ""),
    ),
  ),
].filter((h) => h !== "/holiday-packages/domestic");

let dbStates = [];
let dbPackagesByState = {};
if (process.env.DATABASE_URL) {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  const [dests] = await conn.query(
    `SELECT slug, name, image_url FROM destinations WHERE scope='domestic' AND is_active=1 ORDER BY slug`,
  );
  dbStates = dests;
  const [pkgs] = await conn.query(
    `SELECT slug, title, destination, image_url FROM packages WHERE is_active=1 AND scope='domestic' ORDER BY destination, slug`,
  );
  for (const p of pkgs) {
    const key = String(p.destination || "").trim().toLowerCase() || "unknown";
    (dbPackagesByState[key] ||= []).push(p);
  }
  await conn.end();
}

const stateRoutes = [
  ...new Set([
    ...stateLinks,
    ...dbStates.map((d) => `/holiday-packages/domestic/${d.slug}`),
  ]),
].sort((a, b) => a.localeCompare(b));

console.log(`State pages: ${stateRoutes.length}\n`);

const stateReports = [];
for (const route of stateRoutes) {
  const r = await auditPage(route);
  stateReports.push(r);
  const mark = r.issues.length ? "WARN" : "OK  ";
  console.log(
    `${mark}  ${r.finalUrl.padEnd(48)} imgs=${String(r.imageCount).padStart(2)}  ${String(r.totalKb).padStart(5)}KB  webp=${r.webpCount} png=${r.pngCount} heavy=${r.heavyCount}`,
  );
  if (r.hero) {
    console.log(`      hero ${String(r.hero.kb).padStart(4)}KB ${r.hero.path}`);
  }
  if (r.issues.length) {
    console.log(`      issues: ${r.issues.join("; ")}`);
  }
}

// Sample up to 2 packages per state from page links / DB
console.log("\nDiscovering package detail pages…");
const packageRoutes = new Set();
for (const route of stateRoutes) {
  try {
    const html = await (await fetch(`${BASE}${route}`)).text();
    for (const m of html.matchAll(/href="(\/holiday-packages\/package\/[^"#?]+)"/gi)) {
      packageRoutes.add(m[1]);
    }
  } catch {
    /* ignore */
  }
}
// Cap: prefer diversity — take first 2 per state path segment from DB if needed
let packageList = [...packageRoutes].sort();
if (packageList.length > 40) {
  packageList = packageList.slice(0, 40);
}
console.log(`Package pages to audit: ${packageList.length}\n`);

const packageReports = [];
for (const route of packageList) {
  const r = await auditPage(route);
  packageReports.push(r);
  const mark = r.issues.length ? "WARN" : "OK  ";
  console.log(
    `${mark}  ${r.finalUrl.padEnd(72)} ${String(r.totalKb).padStart(5)}KB  webp=${r.webpCount} png=${r.pngCount}`,
  );
  if (r.hero) console.log(`      hero ${String(r.hero.kb).padStart(4)}KB ${r.hero.path}`);
  if (r.issues.length) console.log(`      issues: ${r.issues.join("; ")}`);
}

// Browser spot-check a few slow/warn states
const warnStates = stateReports.filter((r) => r.issues.length || r.totalKb > 1500).slice(0, 4);
const browserReports = [];
if (warnStates.length) {
  console.log("\n=== Browser paint spot-check ===");
  const browser = await chromium.launch({ headless: true });
  for (const s of warnStates) {
    const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
    const t0 = Date.now();
    await page.goto(`${BASE}${s.finalUrl}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.evaluate(async () => {
      for (let y = 0; y < Math.min(document.body.scrollHeight, 3500); y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await page.waitForTimeout(800);
    const metrics = await page.evaluate(() => {
      const imgs = [...document.images].filter(
        (i) => (i.currentSrc || i.src) && !(i.currentSrc || i.src).startsWith("data:"),
      );
      const paints = performance.getEntriesByType("paint");
      return {
        fcp: Math.round(paints.find((p) => p.name === "first-contentful-paint")?.startTime || 0),
        imgs: imgs.length,
        ok: imgs.filter((i) => i.complete && i.naturalWidth > 0).length,
        broken: imgs
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => (i.currentSrc || i.src).replace(location.origin, "")),
        hero:
          document.querySelector("img[fetchpriority='high'], .hotels-hero__photo")?.currentSrc ||
          null,
      };
    });
    browserReports.push({
      route: s.finalUrl,
      wallMs: Date.now() - t0,
      ...metrics,
      hero: metrics.hero?.replace(BASE, "") || null,
    });
    console.log(
      `${s.finalUrl}  FCP=${metrics.fcp}ms  imgs=${metrics.ok}/${metrics.imgs}  broken=${metrics.broken.length}`,
    );
    await page.close();
  }
  await browser.close();
}

const summary = {
  checkedAt: new Date().toISOString(),
  base: BASE,
  states: stateReports.length,
  packages: packageReports.length,
  stateWarns: stateReports.filter((r) => r.issues.length).length,
  packageWarns: packageReports.filter((r) => r.issues.length).length,
  statesWithHeavy: stateReports.filter((r) => r.heavyCount > 0).map((r) => r.finalUrl),
  statesWithPng: stateReports.filter((r) => r.pngCount > 0).map((r) => r.finalUrl),
  dbStates: dbStates.map((d) => ({
    slug: d.slug,
    name: d.name,
    image: d.image_url,
    packageCount: (dbPackagesByState[String(d.name).toLowerCase()] || []).length,
  })),
  stateReports,
  packageReports,
  browserReports,
};

fs.mkdirSync(path.join(root, "scripts/output"), { recursive: true });
const outPath = path.join(root, "scripts/output/all-state-packages-image-audit.json");
fs.writeFileSync(outPath, JSON.stringify(summary, null, 2));

console.log("\n=== SUMMARY ===");
console.log(`States: ${summary.states} (warns ${summary.stateWarns})`);
console.log(`Packages: ${summary.packages} (warns ${summary.packageWarns})`);
console.log(`States with PNG: ${summary.statesWithPng.length}`);
console.log(`States with ≥500KB images: ${summary.statesWithHeavy.length}`);
console.log(`Report: ${outPath}`);
