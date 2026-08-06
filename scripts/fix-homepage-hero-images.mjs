#!/usr/bin/env node
/** Sync homepage hero_slides on Hostinger to known-good local hero images. */
import { createConnection } from "mysql2/promise";
import { readFileSync } from "node:fs";

for (const line of readFileSync("scripts/output/hostinger.env", "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const heroSlides = [
  {
    name: "Kashmir Valley",
    tag: "Snow & Shikaras",
    image: "/images/hero/about-hero.webp",
    slug: "kashmir",
  },
  {
    name: "Rajasthan",
    tag: "Royal Heritage",
    image: "/images/homepage/tour-types/1784901599136-home-page-adventure.png",
    slug: "rajasthan",
  },
  {
    name: "Kerala Backwaters",
    tag: "Houseboats",
    image: "/images/homepage/tour-types/1784901621195-home-page-family.png",
    slug: "kerala",
  },
  {
    name: "Ladakh",
    tag: "High Himalaya",
    image: "/images/homepage/tour-types/1784901628750-home-page-honeymoon.png",
    slug: "ladakh",
  },
  {
    name: "Lakshadweep",
    tag: "Coral Paradise",
    image: "/images/hero/cabs-hero-desktop.webp",
    slug: "lakshadweep",
  },
  {
    name: "Himachal Pradesh",
    tag: "Mountain Retreat",
    image: "/images/hero/contact-hero.webp",
    slug: "himachal",
  },
];

const tourTypes = [
  {
    slug: "adventure",
    name: "Adventure",
    image: "/images/homepage/tour-types/1784901599136-home-page-adventure.png",
  },
  {
    slug: "family",
    name: "Family",
    image: "/images/homepage/tour-types/1784901621195-home-page-family.png",
  },
  {
    slug: "honeymoon",
    name: "Honeymoon",
    image: "/images/homepage/tour-types/1784901628750-home-page-honeymoon.png",
  },
  {
    slug: "leisure",
    name: "Leisure",
    image: "/images/hero/about-hero.webp",
  },
  {
    slug: "pilgrimage",
    name: "Pilgrimage",
    image: "/images/hero/contact-hero.webp",
  },
  {
    slug: "solo",
    name: "Solo",
    image: "/images/hero/cabs-hero-desktop.webp",
  },
];

async function update(cfg, label) {
  const conn = await createConnection(cfg);
  await conn.query(
    "UPDATE homepage_settings SET hero_slides = ?, tour_types = ? WHERE id = 1",
    [JSON.stringify(heroSlides), JSON.stringify(tourTypes)],
  );
  console.log("Updated", label);
  await conn.end();
}

await update(
  {
    host: "82.112.233.245",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  "hostinger",
);

// local too
for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m && m[1] === "DATABASE_URL") process.env.DATABASE_URL = m[2].replace(/^["']|["']$/g, "");
}
const { parseDatabaseUrl } = await import("../src/lib/db.ts");
await update(parseDatabaseUrl(process.env.DATABASE_URL), "local");
