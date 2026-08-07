/**
 * Assign each domestic destination a sensible local WebP hero.
 * Prefer: dedicated destination asset → first package image for that state → unique homepage hero.
 *
 * Run: node scripts/fix-local-destination-heroes.mjs
 */
import fs from "node:fs";
import mysql from "mysql2/promise";

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

function publicExists(url) {
  if (!url?.startsWith("/images/")) return false;
  const rel = `public${url}`;
  if (fs.existsSync(rel)) return true;
  // try webp sibling
  if (/\.(png|jpe?g)$/i.test(url)) {
    const webp = url.replace(/\.(png|jpe?g)$/i, ".webp");
    return fs.existsSync(`public${webp}`);
  }
  return false;
}

function preferWebp(url) {
  if (!url) return "";
  if (/\.webp$/i.test(url)) return url;
  const webp = url.replace(/\.(png|jpe?g)$/i, ".webp");
  if (publicExists(webp)) return webp;
  return url;
}

const DEDICATED = {
  Goa: "/images/destinations/1785072826818-chatgpt-image-jul-26-2026-07-02-58-pm.webp",
  goa: "/images/destinations/1785072826818-chatgpt-image-jul-26-2026-07-02-58-pm.webp",
  kashmir: "/images/destinations/1785076174298-chatgpt-image-jul-26-2026-07-58-56-pm.webp",
  kerala: "/images/destinations/1785233303513-chatgpt-image-jul-28-2026-03-38-09-pm.webp",
  "tamil-nadu": "/images/destinations/Kerela.webp",
};

const HOMEPAGE_POOL = [
  "/images/homepage/hero/1786035278114-chatgpt-image-aug-6-2026-10-24-21-pm.webp",
  "/images/homepage/hero/1786035390433-chatgpt-image-aug-6-2026-10-26-18-pm.webp",
  "/images/homepage/hero/1786035508200-chatgpt-image-aug-6-2026-10-28-16-pm.webp",
  "/images/homepage/hero/1786035609767-chatgpt-image-aug-6-2026-10-29-56-pm.webp",
  "/images/homepage/hero/1786035767656-chatgpt-image-aug-6-2026-10-32-32-pm.webp",
  "/images/homepage/hero/1786036282504-chatgpt-image-aug-6-2026-10-41-09-pm.webp",
  "/images/homepage/tour-types/1786036815061-chatgpt-image-aug-6-2026-10-49-40-pm.webp",
  "/images/homepage/tour-types/1786036893757-chatgpt-image-aug-6-2026-10-51-16-pm.webp",
  "/images/homepage/tour-types/1786037000987-chatgpt-image-aug-6-2026-10-53-00-pm.webp",
  "/images/homepage/tour-types/1786037107566-chatgpt-image-aug-6-2026-10-54-47-pm.webp",
  "/images/homepage/tour-types/1786037248555-chatgpt-image-aug-6-2026-10-57-16-pm.webp",
  "/images/homepage/tour-types/1786037362481-chatgpt-image-aug-6-2026-10-59-10-pm.webp",
  "/images/homepage/tour-types/1784901599136-home-page-adventure.webp",
  "/images/homepage/tour-types/1784901621195-home-page-family.webp",
  "/images/homepage/tour-types/1784901628750-home-page-honeymoon.webp",
].filter(publicExists);

function looksLikeMismatchedBanner(url) {
  if (!url) return true;
  // Shared package banners reused as state heroes are usually wrong.
  if (url.includes("/images/banners/")) return true;
  if (url.includes("your-visa-sorted")) return true;
  return false;
}

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const [dests] = await conn.query(
  `SELECT id, slug, name, image_url FROM destinations WHERE scope='domestic' AND is_active=1 ORDER BY slug`,
);
const [pkgs] = await conn.query(
  `SELECT slug, title, destination, image_url FROM packages WHERE is_active=1 AND scope='domestic'`,
);

function packagesForDest(dest) {
  const name = String(dest.name || "").toLowerCase();
  const slug = String(dest.slug || "").toLowerCase();
  return pkgs.filter((p) => {
    const d = String(p.destination || "").toLowerCase();
    const s = String(p.slug || "").toLowerCase();
    return (
      d.includes(name) ||
      name.includes(d) ||
      s.startsWith(`${slug}-`) ||
      s.includes(`-${slug}-`)
    );
  });
}

let poolIdx = 0;
let fixed = 0;
const used = new Set();

for (const dest of dests) {
  let next = DEDICATED[dest.slug] || null;

  if (next && !publicExists(next)) next = null;

  if (!next) {
    const related = packagesForDest(dest);
    for (const p of related) {
      const img = preferWebp(p.image_url);
      if (img && publicExists(img) && !used.has(img)) {
        next = img;
        break;
      }
    }
  }

  if (!next) {
    // pick unused homepage pool image
    for (let i = 0; i < HOMEPAGE_POOL.length; i++) {
      const cand = HOMEPAGE_POOL[(poolIdx + i) % HOMEPAGE_POOL.length];
      if (!used.has(cand)) {
        next = cand;
        poolIdx = (poolIdx + i + 1) % HOMEPAGE_POOL.length;
        break;
      }
    }
  }

  if (!next) {
    console.log(`skip  ${dest.slug} — no candidate`);
    continue;
  }

  const current = preferWebp(dest.image_url);
  const needsFix =
    current !== next || looksLikeMismatchedBanner(dest.image_url) || !publicExists(current);

  if (!needsFix && current === next) {
    used.add(next);
    console.log(`ok    ${dest.slug.padEnd(22)} ${current}`);
    continue;
  }

  await conn.query("UPDATE destinations SET image_url = ?, updated_at = NOW() WHERE id = ?", [
    next,
    dest.id,
  ]);
  used.add(next);
  fixed++;
  console.log(`fix  ${dest.slug.padEnd(22)} ${dest.image_url} → ${next}`);
}

console.log(`\nFixed ${fixed} destination hero(s)`);
await conn.end();
