#!/usr/bin/env node
import fs from "node:fs";
import mysql from "mysql2/promise";

for (const line of fs.readFileSync(".env", "utf8").split(/\r?\n/)) {
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

const u = new URL(process.env.DATABASE_URL);
const conn = await mysql.createConnection({
  host: u.hostname === "localhost" ? "127.0.0.1" : u.hostname,
  port: Number(u.port || 3306),
  user: decodeURIComponent(u.username),
  password: decodeURIComponent(u.password),
  database: u.pathname.slice(1),
});

const t0 = performance.now();
const [full] = await conn.query("SELECT * FROM packages WHERE is_active=1");
const t1 = performance.now();
const [sum] = await conn.query(
  `SELECT id, slug, title, destination, scope, nights, days,
    from_price, discount_price, package_code, image_url,
    is_active, is_featured, meta_title, meta_description, sort_order,
    created_at, updated_at
  FROM packages WHERE is_active=1`,
);
const t2 = performance.now();
console.log("full SELECT *", full.length, "rows", Math.round(t1 - t0) + "ms");
console.log("summary cols", sum.length, "rows", Math.round(t2 - t1) + "ms");

const [hs] = await conn.query(
  "SELECT hero_slides, tour_types FROM homepage_settings WHERE id=1",
);
const hero =
  typeof hs[0].hero_slides === "string"
    ? JSON.parse(hs[0].hero_slides)
    : hs[0].hero_slides;
const tours =
  typeof hs[0].tour_types === "string"
    ? JSON.parse(hs[0].tour_types)
    : hs[0].tour_types;
console.log("local hero sample", hero?.[0]?.image);
console.log("local tour sample", tours?.[0]?.image);

const webps = fs
  .readdirSync("public/images/homepage/hero")
  .filter((f) => f.endsWith(".webp")).length;
const tourWebps = fs
  .readdirSync("public/images/homepage/tour-types")
  .filter((f) => f.endsWith(".webp")).length;
console.log("webp files hero/tour-types:", webps, tourWebps);

await conn.end();
