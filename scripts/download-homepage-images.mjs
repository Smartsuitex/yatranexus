#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const base = "https://yatranexus.com";
const html = await (await fetch(`${base}/`)).text();
const urls = [
  ...html.matchAll(/\/images\/homepage\/(?:hero|tour-types)\/[^"'\\s)]+/g),
].map((m) => m[0]);
const uniq = [...new Set(urls)];
console.log("found", uniq.length);
for (const u of uniq) {
  const dest = path.join("public", u.replace(/^\//, ""));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest)) {
    console.log("skip", u);
    continue;
  }
  const res = await fetch(base + u);
  if (!res.ok) {
    console.log("fail", res.status, u);
    continue;
  }
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log("saved", u, Math.round(fs.statSync(dest).size / 1024) + "KB");
}
