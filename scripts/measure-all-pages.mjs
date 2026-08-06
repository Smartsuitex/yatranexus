#!/usr/bin/env node
/**
 * Measure HTML document TTFB + total load for all public live pages.
 * Usage: node scripts/measure-all-pages.mjs [baseUrl]
 */
const base = (process.argv[2] || "https://yatranexus.com").replace(/\/$/, "");

const staticRoutes = [
  "/",
  "/holiday-packages",
  "/holiday-packages/domestic",
  "/holiday-packages/international",
  "/holiday-packages/tour/family",
  "/holiday-packages/tour/honeymoon",
  "/holiday-packages/tour/adventure",
  "/holiday-packages/tour/leisure",
  "/holiday-packages/tour/pilgrimage",
  "/holiday-packages/tour/solo",
  "/holiday-packages/domestic/kerala",
  "/holiday-packages/domestic/goa",
  "/holiday-packages/domestic/rajasthan",
  "/holiday-packages/domestic/himachal-pradesh",
  "/holiday-packages/domestic/jammu-and-kashmir",
  "/services",
  "/services/flights",
  "/services/hotels",
  "/services/cabs",
  "/services/visa",
  "/services/insurance",
  "/services/forex",
  "/corporate",
  "/about",
  "/contact",
  "/blog",
  "/gallery",
  "/faq",
  "/testimonials",
  "/privacy-policy",
  "/terms",
];

async function measure(path) {
  const url = base + path;
  const t0 = performance.now();
  try {
    const res = await fetch(url, {
      headers: {
        "cache-control": "no-cache",
        "user-agent": "YatraNexus-PageSpeed/1.0",
        accept: "text/html",
      },
      redirect: "follow",
    });
    const ttfb = performance.now() - t0;
    const text = await res.text();
    const total = performance.now() - t0;
    return {
      path,
      status: res.status,
      ok: res.ok,
      ttfbMs: Math.round(ttfb),
      totalMs: Math.round(total),
      kb: Math.round(Buffer.byteLength(text) / 1024),
      html: text,
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
      html: "",
    };
  }
}

function discover(html) {
  const pkgs = [
    ...html.matchAll(/\/holiday-packages\/package\/([a-z0-9-]+)/gi),
  ].map((m) => m[1]);
  const blogs = [...html.matchAll(/\/blog\/([a-z0-9-]+)/gi)].map((m) => m[1]);
  const intl = [
    ...html.matchAll(/\/holiday-packages\/international\/([a-z0-9-]+)/gi),
  ].map((m) => m[1]);
  const uniq = (arr) => [...new Set(arr)];
  return {
    packages: uniq(pkgs).slice(0, 5).map((s) => `/holiday-packages/package/${s}`),
    blogs: uniq(blogs).slice(0, 3).map((s) => `/blog/${s}`),
    intl: uniq(intl).slice(0, 2).map((s) => `/holiday-packages/international/${s}`),
  };
}

console.log(`Measuring pages on ${base}\n`);

const results = [];
for (const path of staticRoutes) {
  const r = await measure(path);
  results.push(r);
  const flag = r.ok ? "OK" : "FAIL";
  console.log(
    `${flag.padEnd(4)} ${(r.totalMs / 1000).toFixed(2).padStart(5)}s  TTFB=${String(r.ttfbMs).padStart(4)}ms  ${String(r.kb).padStart(4)}KB  ${path}`,
  );
}

const home = results.find((r) => r.path === "/")?.html || "";
const pkgsHtml = results.find((r) => r.path === "/holiday-packages")?.html || "";
const blogHtml = results.find((r) => r.path === "/blog")?.html || "";
const discovered = discover(home + pkgsHtml + blogHtml);

const dynamic = [...discovered.packages, ...discovered.blogs, ...discovered.intl];
if (dynamic.length) {
  console.log("\n--- Sample detail pages ---");
  for (const path of dynamic) {
    const r = await measure(path);
    results.push(r);
    const flag = r.ok ? "OK" : "FAIL";
    console.log(
      `${flag.padEnd(4)} ${(r.totalMs / 1000).toFixed(2).padStart(5)}s  TTFB=${String(r.ttfbMs).padStart(4)}ms  ${String(r.kb).padStart(4)}KB  ${path}`,
    );
  }
}

const ok = results.filter((r) => r.ok);
const fail = results.filter((r) => !r.ok);
const avg = (arr, key) =>
  arr.length ? Math.round(arr.reduce((s, r) => s + r[key], 0) / arr.length) : 0;
const slowest = [...ok].sort((a, b) => b.totalMs - a.totalMs).slice(0, 8);
const fastest = [...ok].sort((a, b) => a.totalMs - b.totalMs).slice(0, 5);

console.log("\n========== SUMMARY ==========");
console.log(`Pages checked : ${results.length}  (OK ${ok.length} / FAIL ${fail.length})`);
console.log(
  `Avg HTML load : ${(avg(ok, "totalMs") / 1000).toFixed(2)}s  (TTFB ${(avg(ok, "ttfbMs") / 1000).toFixed(2)}s)`,
);
console.log(
  `Fastest       : ${(Math.min(...ok.map((r) => r.totalMs)) / 1000).toFixed(2)}s`,
);
console.log(
  `Slowest       : ${(Math.max(...ok.map((r) => r.totalMs)) / 1000).toFixed(2)}s`,
);

console.log("\nSlowest pages:");
for (const r of slowest) {
  console.log(`  ${(r.totalMs / 1000).toFixed(2)}s  ${r.path}`);
}
console.log("\nFastest pages:");
for (const r of fastest) {
  console.log(`  ${(r.totalMs / 1000).toFixed(2)}s  ${r.path}`);
}

if (fail.length) {
  console.log("\nFailed:");
  for (const r of fail) {
    console.log(`  ${r.status} ${r.path} ${r.error || ""}`);
  }
}

const out = {
  checkedAt: new Date().toISOString(),
  base,
  note: "HTML document only (server response). Browser paint/images add extra time.",
  summary: {
    total: results.length,
    ok: ok.length,
    fail: fail.length,
    avgTotalMs: avg(ok, "totalMs"),
    avgTtfbMs: avg(ok, "ttfbMs"),
    minTotalMs: Math.min(...ok.map((r) => r.totalMs)),
    maxTotalMs: Math.max(...ok.map((r) => r.totalMs)),
  },
  pages: results.map(({ html, ...rest }) => rest),
};

const fs = await import("node:fs");
fs.mkdirSync("scripts/output", { recursive: true });
fs.writeFileSync(
  "scripts/output/page-load-report.json",
  JSON.stringify(out, null, 2),
);
console.log("\nWrote scripts/output/page-load-report.json");
