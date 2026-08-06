#!/usr/bin/env node
/**
 * Discover + measure ALL holiday-packages routes (hub, lists, destinations, packages).
 * Usage: node scripts/measure-all-holiday-packages.mjs [baseUrl]
 */
import fs from "node:fs";
import mysql from "mysql2/promise";

const base = (process.argv[2] || "http://localhost:8082").replace(/\/$/, "");
const isLocal = /localhost|127\.0\.0\.1/.test(base);

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
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
    if (!(k in process.env)) process.env[k] = v;
  }
}

async function dbDestAndPkgSlugs() {
  loadEnv(".env");
  const url = process.env.DATABASE_URL;
  if (!url?.startsWith("mysql://")) return { domestic: [], international: [], packages: [], tours: [] };
  const u = new URL(url);
  const conn = await mysql.createConnection({
    host: u.hostname === "localhost" ? "127.0.0.1" : u.hostname,
    port: Number(u.port || 3306),
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ""),
  });
  try {
    const [dom] = await conn.query(
      "SELECT slug FROM destinations WHERE is_active=1 AND scope='domestic' ORDER BY sort_order, name",
    );
    const [intl] = await conn.query(
      "SELECT slug FROM destinations WHERE is_active=1 AND scope='international' ORDER BY sort_order, name",
    );
    const [pkgs] = await conn.query(
      "SELECT slug FROM packages WHERE is_active=1 ORDER BY sort_order, title",
    );
    const [home] = await conn.query(
      "SELECT tour_types FROM homepage_settings WHERE id=1 LIMIT 1",
    );
    let tours = [];
    if (home[0]?.tour_types) {
      const raw =
        typeof home[0].tour_types === "string"
          ? JSON.parse(home[0].tour_types)
          : home[0].tour_types;
      tours = (Array.isArray(raw) ? raw : [])
        .map((t) => t?.slug)
        .filter(Boolean);
    }
    if (!tours.length) {
      tours = ["adventure", "family", "honeymoon", "leisure", "pilgrimage", "solo"];
    }
    return {
      domestic: dom.map((r) => r.slug),
      international: intl.map((r) => r.slug),
      packages: pkgs.map((r) => r.slug),
      tours,
    };
  } finally {
    await conn.end();
  }
}

async function discoverFromHtml() {
  const html = await (await fetch(`${base}/holiday-packages`)).text();
  const domestic = [
    ...html.matchAll(/\/holiday-packages\/domestic\/([a-z0-9-]+)/gi),
  ].map((m) => m[1]);
  const international = [
    ...html.matchAll(/\/holiday-packages\/international\/([a-z0-9-]+)/gi),
  ].map((m) => m[1]);
  const packages = [
    ...html.matchAll(/\/holiday-packages\/package\/([a-z0-9-]+)/gi),
  ].map((m) => m[1]);
  const tours = [
    ...html.matchAll(/\/holiday-packages\/tour\/([a-z0-9-]+)/gi),
  ].map((m) => m[1]);
  const uniq = (a) => [...new Set(a)];
  return {
    domestic: uniq(domestic),
    international: uniq(international),
    packages: uniq(packages),
    tours: uniq(tours),
  };
}

async function measure(path) {
  const t0 = performance.now();
  try {
    const res = await fetch(base + path, {
      headers: { "cache-control": "no-cache", accept: "text/html", "user-agent": "YN-HP-Check/1.0" },
      redirect: "follow",
    });
    const ttfb = performance.now() - t0;
    const text = await res.text();
    const total = performance.now() - t0;
    const broken =
      /Database is not configured|Internal Server Error|Something went wrong|Application error/i.test(
        text,
      );
    return {
      path,
      status: res.status,
      ok: res.ok && !broken,
      ttfbMs: Math.round(ttfb),
      totalMs: Math.round(total),
      kb: Math.round(Buffer.byteLength(text) / 1024),
      broken,
    };
  } catch (err) {
    return {
      path,
      status: 0,
      ok: false,
      ttfbMs: 0,
      totalMs: Math.round(performance.now() - t0),
      kb: 0,
      error: err.message,
    };
  }
}

function printGroup(title, rows) {
  console.log(`\n=== ${title} (${rows.length}) ===`);
  for (const r of rows) {
    const flag = r.ok ? "OK" : "FAIL";
    console.log(
      `${flag.padEnd(4)} ${(r.totalMs / 1000).toFixed(2).padStart(5)}s  TTFB=${String(r.ttfbMs).padStart(4)}ms  ${String(r.kb).padStart(4)}KB  ${r.path}`,
    );
  }
}

console.log(`Holiday packages full check → ${base}\n`);

// Warm caches
await measure("/");
await measure("/holiday-packages");

let slugs = await discoverFromHtml();
if (isLocal) {
  try {
    const db = await dbDestAndPkgSlugs();
    const merge = (a, b) => [...new Set([...a, ...b])];
    slugs = {
      domestic: merge(slugs.domestic, db.domestic),
      international: merge(slugs.international, db.international),
      packages: merge(slugs.packages, db.packages),
      tours: merge(slugs.tours, db.tours),
    };
  } catch (e) {
    console.log("DB discover skipped:", e.message);
  }
}

const staticPaths = [
  "/holiday-packages",
  "/holiday-packages/domestic",
  "/holiday-packages/international",
];

const tourPaths = slugs.tours.map((s) => `/holiday-packages/tour/${s}`);
const domesticPaths = slugs.domestic.map((s) => `/holiday-packages/domestic/${s}`);
const intlPaths = slugs.international.map((s) => `/holiday-packages/international/${s}`);
const packagePaths = slugs.packages.map((s) => `/holiday-packages/package/${s}`);

const allPaths = [
  ...staticPaths,
  ...tourPaths,
  ...domesticPaths,
  ...intlPaths,
  ...packagePaths,
];

console.log(
  `Routes to check: ${allPaths.length} (hub ${staticPaths.length}, tours ${tourPaths.length}, domestic ${domesticPaths.length}, intl ${intlPaths.length}, packages ${packagePaths.length})`,
);

const staticResults = [];
for (const p of staticPaths) staticResults.push(await measure(p));
printGroup("Hub / indexes", staticResults);

const tourResults = [];
for (const p of tourPaths) tourResults.push(await measure(p));
printGroup("Tour types", tourResults);

const domesticResults = [];
for (const p of domesticPaths) domesticResults.push(await measure(p));
printGroup("Domestic destinations", domesticResults);

const intlResults = [];
for (const p of intlPaths) intlResults.push(await measure(p));
printGroup("International destinations", intlResults);

const packageResults = [];
for (const p of packagePaths) packageResults.push(await measure(p));
printGroup("Package detail pages", packageResults);

const all = [
  ...staticResults,
  ...tourResults,
  ...domesticResults,
  ...intlResults,
  ...packageResults,
];
const ok = all.filter((r) => r.ok);
const fail = all.filter((r) => !r.ok);
const avg = (arr, key) =>
  arr.length ? Math.round(arr.reduce((s, r) => s + r[key], 0) / arr.length) : 0;
const slowest = [...ok].sort((a, b) => b.totalMs - a.totalMs).slice(0, 10);
const fastest = [...ok].sort((a, b) => a.totalMs - b.totalMs).slice(0, 5);

console.log("\n========== OVERALL ==========");
console.log(`Checked: ${all.length}  OK ${ok.length}  FAIL ${fail.length}`);
console.log(
  `Avg HTML: ${(avg(ok, "totalMs") / 1000).toFixed(2)}s  (TTFB ${(avg(ok, "ttfbMs") / 1000).toFixed(2)}s)`,
);
console.log(`Avg size: ${avg(ok, "kb")}KB`);
console.log(`Fastest: ${(Math.min(...ok.map((r) => r.totalMs)) / 1000).toFixed(2)}s`);
console.log(`Slowest: ${(Math.max(...ok.map((r) => r.totalMs)) / 1000).toFixed(2)}s`);

console.log("\nSlowest 10:");
for (const r of slowest) console.log(`  ${(r.totalMs / 1000).toFixed(2)}s  ${r.kb}KB  ${r.path}`);
console.log("\nFastest 5:");
for (const r of fastest) console.log(`  ${(r.totalMs / 1000).toFixed(2)}s  ${r.kb}KB  ${r.path}`);

if (fail.length) {
  console.log("\nFailed:");
  for (const r of fail) console.log(`  ${r.status} ${r.path} ${r.error || ""}`);
}

const report = {
  checkedAt: new Date().toISOString(),
  base,
  summary: {
    total: all.length,
    ok: ok.length,
    fail: fail.length,
    avgTotalMs: avg(ok, "totalMs"),
    avgTtfbMs: avg(ok, "ttfbMs"),
    avgKb: avg(ok, "kb"),
  },
  groups: {
    hub: staticResults,
    tours: tourResults,
    domestic: domesticResults,
    international: intlResults,
    packages: packageResults,
  },
  failed: fail,
};
fs.mkdirSync("scripts/output", { recursive: true });
fs.writeFileSync(
  "scripts/output/holiday-packages-load-report.json",
  JSON.stringify(report, null, 2),
);
console.log("\nWrote scripts/output/holiday-packages-load-report.json");
