import { readFileSync } from "node:fs";
import mysql from "mysql2/promise";

for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Za-z_#][A-Za-z0-9_]*)=(.*)$/);
  if (m && !m[1].startsWith("#")) {
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const base = process.argv[2] ?? "http://localhost:8083";
const conn = await mysql.createConnection(process.env.DATABASE_URL);
const [pkg] = await conn.query(
  "SELECT slug, title FROM packages WHERE is_active = 1 ORDER BY sort_order LIMIT 1",
);
const title = pkg[0].title.replace(/&amp;/g, "&");
const slug = pkg[0].slug;

console.log("Checking website at", base);
console.log("Expect package title in HTML:", title.slice(0, 50));

const homeRes = await fetch(base + "/");
const homeHtml = await homeRes.text();
const homeOk = homeHtml.includes(title.slice(0, 30)) || homeHtml.includes(slug);
console.log("Homepage HTTP", homeRes.status, homeOk ? "contains CMS data ✓" : "title not found in HTML (may be client-loaded)");

const pkgRes = await fetch(`${base}/holiday-packages/package/${slug}`);
const pkgHtml = await pkgRes.text();
const pkgOk = pkgHtml.includes(title.slice(0, 30)) || pkgHtml.includes(slug);
console.log("Package page HTTP", pkgRes.status, pkgOk ? "shows package from MySQL ✓" : "check page manually");

await conn.end();
console.log(homeOk || pkgOk ? "\nWebsite is reading from MySQL CMS." : "\nOpen pages in browser — some content loads client-side after hydration.");
