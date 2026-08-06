#!/usr/bin/env node
/** Measure homepage TTFB / download / total for live site. */
const url = process.argv[2] || "https://yatranexus.com/";
const runs = Number(process.argv[3] || 5);

async function once(label) {
  const t0 = performance.now();
  const res = await fetch(url, {
    headers: { "cache-control": "no-cache", "user-agent": "YatraNexus-Speed/1.0" },
    redirect: "follow",
  });
  const ttfb = performance.now() - t0;
  const buf = Buffer.from(await res.arrayBuffer());
  const total = performance.now() - t0;
  return {
    label,
    status: res.status,
    ttfbMs: Math.round(ttfb),
    downloadMs: Math.round(total - ttfb),
    totalMs: Math.round(total),
    bytes: buf.length,
    kb: Math.round(buf.length / 1024),
  };
}

console.log("URL:", url);
console.log("Runs:", runs, "(HTML document only — not full page assets)\n");

const cold = [];
for (let i = 0; i < runs; i++) {
  const r = await once(`run-${i + 1}`);
  cold.push(r);
  console.log(
    `${r.label.padEnd(8)} status=${r.status}  TTFB=${String(r.ttfbMs).padStart(4)}ms  HTML=${String(r.totalMs).padStart(4)}ms  size=${r.kb}KB`,
  );
}

const avg = (key) => Math.round(cold.reduce((s, r) => s + r[key], 0) / cold.length);
const min = (key) => Math.min(...cold.map((r) => r[key]));
const max = (key) => Math.max(...cold.map((r) => r[key]));

console.log("\n=== HTML DOCUMENT SUMMARY ===");
console.log(`TTFB   avg ${avg("ttfbMs")}ms  (min ${min("ttfbMs")} / max ${max("ttfbMs")})`);
console.log(`HTML   avg ${avg("totalMs")}ms  (min ${min("totalMs")} / max ${max("totalMs")})`);
console.log(`Size   ~${avg("kb")} KB`);
