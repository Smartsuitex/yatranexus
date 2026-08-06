#!/usr/bin/env node
/** Measure holiday-packages HTML load times. */
const base = (process.argv[2] || "http://localhost:8082").replace(/\/$/, "");

const paths = [
  "/holiday-packages",
  "/holiday-packages/domestic",
  "/holiday-packages/international",
  "/holiday-packages/tour/family",
  "/holiday-packages/tour/honeymoon",
  "/holiday-packages/domestic/kerala",
  "/holiday-packages/domestic/goa",
  "/holiday-packages/domestic/rajasthan",
  "/holiday-packages/package/kerala-backwater-honeymoon-5d4n",
];

async function measure(path) {
  const t0 = performance.now();
  const res = await fetch(base + path, {
    headers: { "cache-control": "no-cache", accept: "text/html" },
  });
  const ttfb = performance.now() - t0;
  const buf = Buffer.from(await res.arrayBuffer());
  const total = performance.now() - t0;
  return {
    path,
    status: res.status,
    ok: res.ok,
    ttfbMs: Math.round(ttfb),
    totalMs: Math.round(total),
    kb: Math.round(buf.length / 1024),
  };
}

console.log("Measuring holiday-packages on", base, "\n");

// Warm-up home to populate CMS cache
await measure("/");

const results = [];
for (const path of paths) {
  // Two hits: first may compile (Vite), second is warm
  const cold = await measure(path);
  const warm = await measure(path);
  results.push({ path, cold, warm });
  console.log(
    `${String(warm.status).padStart(3)}  cold=${(cold.totalMs / 1000).toFixed(2)}s  warm=${(warm.totalMs / 1000).toFixed(2)}s  ${String(warm.kb).padStart(4)}KB  ${path}`,
  );
}

const warmOk = results.filter((r) => r.warm.ok).map((r) => r.warm);
const avg = (arr, key) =>
  Math.round(arr.reduce((s, r) => s + r[key], 0) / Math.max(1, arr.length));

console.log("\n=== WARM SUMMARY ===");
console.log(`Avg HTML: ${(avg(warmOk, "totalMs") / 1000).toFixed(2)}s`);
console.log(`Avg size: ${avg(warmOk, "kb")}KB`);
console.log(
  `Hub /holiday-packages: ${results[0].warm.totalMs}ms / ${results[0].warm.kb}KB`,
);
console.log(
  `Domestic index: ${results[1].warm.totalMs}ms / ${results[1].warm.kb}KB`,
);
