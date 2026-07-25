#!/usr/bin/env node
/**
 * Seed tour packages + destinations into Supabase from parsed JSON.
 * Requires SUPABASE_SERVICE_ROLE_KEY (server-only) in environment.
 *
 * Usage:
 *   node scripts/seed-tour-packages.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const packagesPath = join(root, "output", "tour-packages.json");
const destinationsPath = join(root, "output", "tour-destinations.json");

const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing SUPABASE_URL/VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.",
  );
  console.error(
    "Alternatively apply migrations via Supabase Dashboard SQL editor:",
  );
  console.error(
    "  supabase/migrations/20260628140000_seed_domestic_destinations.sql",
  );
  console.error(
    "  supabase/migrations/20260628140100_seed_tour_packages_from_word.sql",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const packages = JSON.parse(readFileSync(packagesPath, "utf8"));
const destinations = JSON.parse(readFileSync(destinationsPath, "utf8"));

const EXISTING_DESTINATION_SLUGS = new Set([
  "goa",
  "kerala",
  "rajasthan",
  "kashmir",
  "himachal",
  "uttarakhand",
  "ladakh",
  "andaman",
  "northeast",
  "tamil-nadu",
]);

const DESTINATION_REGION = {
  Karnataka: "South India",
  "Madhya Pradesh": "Central India",
  Gujarat: "West India",
  "Uttar Pradesh": "North India",
  Maharashtra: "West India",
  Lakshadweep: "South India",
  Odisha: "East India",
  "West Bengal": "East India",
};

async function seedDestinations() {
  const rows = destinations
    .filter((d) => !EXISTING_DESTINATION_SLUGS.has(d.slug))
    .map((d, i) => ({
      slug: d.slug,
      scope: "domestic",
      name: d.name,
      region: DESTINATION_REGION[d.name] ?? "India",
      image_url: d.image_url,
      blurb: d.blurb?.slice(0, 280) ?? `Holiday packages in ${d.name}.`,
      highlights: (d.highlights ?? []).slice(0, 4).map((h) => h.slice(0, 100)),
      sort_order: 20 + i,
      is_active: true,
    }));

  if (!rows.length) {
    console.log("No new destinations to seed.");
    return;
  }

  const { error } = await supabase.from("destinations").upsert(rows, {
    onConflict: "slug,scope",
    ignoreDuplicates: true,
  });
  if (error) throw error;
  console.log(`Seeded ${rows.length} destinations.`);
}

async function seedPackages() {
  const rows = packages.map((p) => ({
    slug: p.slug,
    title: p.title,
    destination: p.destination,
    scope: p.scope,
    nights: p.nights,
    days: p.days,
    from_price: p.from_price,
    image_url: p.image_url,
    inclusions: p.inclusions ?? [],
    exclusions: p.exclusions ?? [],
    itinerary: p.itinerary ?? [],
    is_active: p.is_active ?? true,
    is_featured: p.is_featured ?? false,
    sort_order: p.sort_order ?? 0,
  }));

  const chunkSize = 25;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { error } = await supabase.from("packages").upsert(chunk, {
      onConflict: "slug",
    });
    if (error) throw error;
    console.log(`Upserted packages ${i + 1}-${i + chunk.length} of ${rows.length}`);
  }
}

async function main() {
  await seedDestinations();
  await seedPackages();
  const { count } = await supabase
    .from("packages")
    .select("*", { count: "exact", head: true });
  console.log(`Done. packages table count: ${count ?? "unknown"}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
