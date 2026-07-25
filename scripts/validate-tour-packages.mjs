#!/usr/bin/env node
/** Validate parsed tour package JSON before DB import. */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const packages = JSON.parse(
  readFileSync(join(root, "output", "tour-packages.json"), "utf8"),
);

const KNOWN_DESTINATIONS = new Set([
  "Kashmir",
  "Madhya Pradesh",
  "Ladakh",
  "Himachal Pradesh",
  "Gujarat",
  "Uttar Pradesh",
  "Goa",
  "Andaman Islands",
  "Lakshadweep",
  "Tamil Nadu",
  "Kerala",
  "North East India",
  "Karnataka",
  "Maharashtra",
  "Odisha",
  "Rajasthan",
  "Uttarakhand",
  "West Bengal",
]);

let errors = 0;
const slugs = new Set();

for (const pkg of packages) {
  if (slugs.has(pkg.slug)) {
    console.error("Duplicate slug:", pkg.slug);
    errors++;
  }
  slugs.add(pkg.slug);

  if (!KNOWN_DESTINATIONS.has(pkg.destination)) {
    console.error("Unknown destination:", pkg.destination, pkg.slug);
    errors++;
  }
  if (!pkg.inclusions?.length) {
    console.error("Missing inclusions:", pkg.slug);
    errors++;
  }
  if (!pkg.itinerary?.length) {
    console.error("Missing itinerary:", pkg.slug);
    errors++;
  }
}

console.log(`Validated ${packages.length} packages`);
console.log(`Destinations: ${[...new Set(packages.map((p) => p.destination))].sort().join(", ")}`);
if (errors) {
  console.error(`${errors} validation error(s)`);
  process.exit(1);
}
console.log("All checks passed.");
