import { writeFileSync, mkdirSync } from "node:fs";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "image-prompts");
mkdirSync(outDir, { recursive: true });

const packages = JSON.parse(
  readFileSync(path.join(root, "scripts", "output", "tour-packages.json"), "utf8"),
);

const BRAND =
  "YatraNexus brand colors: navy #001b2a, orange #ff7a00, purple #4b2cff. Photorealistic, no text, no watermark.";

const STYLE_VARIATIONS = [
  "Wide cinematic golden-hour landscape, premium travel brochure.",
  "Bright daylight vibrant colors, inviting family-friendly mood.",
  "Soft morning mist, peaceful serene atmosphere.",
  "Dramatic sunset warm orange-pink sky, romantic mood.",
  "Aerial drone bird's-eye view, epic panoramic scale.",
  "Close-up iconic landmark detail, shallow depth of field.",
  "Cultural heritage focus — temples, forts, or local architecture.",
  "Nature adventure — mountains, forests, rivers, wildlife hints.",
  "Coastal or lakeside calm water reflection composition.",
  "Clean package-card thumbnail — subject centered, minimal clutter.",
];

const DESTINATION_SCENES = {
  Kashmir: "Dal Lake shikara, snow Himalayas, Gulmarg meadows, Pahalgam valley",
  Kerala: "Alleppey houseboat backwaters, Munnar tea hills, coconut palms",
  "Tamil Nadu": "Meenakshi Temple Madurai, Mahabalipuram Shore Temple, Kanyakumari sunset",
  Goa: "tropical beaches, palm trees, Portuguese heritage",
  Rajasthan: "amber forts, desert palaces, royal heritage architecture",
  "Himachal Pradesh": "Manali mountains, pine forests, snow peaks",
  Uttarakhand: "Himalayan spirituality, Rishikesh, hill stations",
  Ladakh: "high-altitude desert, monasteries, Pangong blue lake",
  "North East India": "living root bridges, Kaziranga, misty hills, tribal culture",
  "Madhya Pradesh": "Khajuraho temples, wildlife safari, marble rocks",
  Gujarat: "Rann of Kutch white desert, Somnath, Statue of Unity",
  "Uttar Pradesh": "Taj Mahal Agra, Varanasi ghats, spiritual heritage",
  Karnataka: "Hampi ruins, Coorg coffee hills, Mysore palace",
  Maharashtra: "Mumbai gateway, Ajanta Ellora caves, hill stations",
  "West Bengal": "Darjeeling tea gardens, Sundarbans, Kolkata heritage",
  Odisha: "Jagannath Puri, Konark Sun Temple, Chilika lake",
  "Andaman Islands": "turquoise lagoon, Radhanagar beach, coral islands",
  Lakshadweep: "crystal clear lagoon, coral atoll, tropical island",
};

function slugify(name) {
  return name
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function packageScene(pkg) {
  const title = pkg.title.toLowerCase();
  const dest = DESTINATION_SCENES[pkg.destination] ?? `${pkg.destination} landmarks`;
  if (title.includes("honeymoon")) return `romantic ${dest}, intimate luxury mood`;
  if (title.includes("family")) return `family-friendly ${dest}, cheerful safe travel`;
  if (title.includes("pilgrimage") || title.includes("vaishno") || title.includes("darshan"))
    return `spiritual pilgrimage ${dest}, respectful reverent mood`;
  if (title.includes("adventure") || title.includes("trek")) return `adventure ${dest}, thrilling outdoor`;
  if (title.includes("wildlife") || title.includes("safari")) return `wildlife safari ${dest}`;
  if (title.includes("beach") || title.includes("coastal")) return `coastal beaches ${dest}`;
  if (title.includes("heritage") || title.includes("grand tour")) return `heritage circuit ${dest}`;
  return `scenic highlights of ${dest}`;
}

function buildPackagePrompt(pkg, variationIndex) {
  const style = STYLE_VARIATIONS[variationIndex];
  const scene = packageScene(pkg);
  const file = `${pkg.slug}-v${variationIndex + 1}.png`;
  return {
    id: `${pkg.slug}-v${variationIndex + 1}`,
    package: pkg.title,
    slug: pkg.slug,
    destination: pkg.destination,
    variation: variationIndex + 1,
    saveAs: `public/images/packages/${file}`,
    prompt: `Create a photorealistic travel image for "${pkg.title}" — ${pkg.days}-day ${pkg.destination} holiday package, India. Scene: ${scene}. Style: ${style} ${BRAND} Technical: 3:2 landscape 1200×800.`,
  };
}

const SERVICES = [
  {
    name: "Outstation Cabs",
    slug: "cabs",
    saveDir: "public/images/hero",
    theme: "comfortable outstation cabs anywhere in India, white SUV on scenic highway",
  },
  {
    name: "Flight Booking",
    slug: "flights",
    saveDir: "public/images/hero",
    theme: "airplane at airport, flight booking, domestic and international travel",
  },
  {
    name: "Hotel Booking",
    slug: "hotels",
    saveDir: "public/images/hero",
    theme: "luxury hotel room and lobby, handpicked stays worldwide",
  },
  {
    name: "Visa Services",
    slug: "visa",
    saveDir: "public/images/hero",
    theme: "passport visa stamps, travel documents, your visa sorted, global access",
  },
  {
    name: "Travel Insurance",
    slug: "insurance",
    saveDir: "public/images/hero",
    theme: "travel with peace of mind, family at airport, protection and safety",
  },
  {
    name: "Forex Card",
    slug: "forex",
    saveDir: "public/images/hero",
    theme: "multi-currency forex card, international payments, globe and currency",
  },
  {
    name: "Corporate Travel",
    slug: "corporate",
    saveDir: "public/images/corporate",
    theme: "business corporate travel MICE, executives airport, professional",
  },
  {
    name: "Holiday Packages",
    slug: "holiday-packages",
    saveDir: "public/images/hero",
    theme: "collage India destinations Goa Kerala Kashmir Rajasthan holidays",
  },
];

const SERVICE_SHOTS = [
  { type: "hero-desktop", size: "16:9 1920×1080", note: "Left third clear for text overlay" },
  { type: "hero-mobile", size: "9:16 1080×1920", note: "Vertical crop, subject center-bottom" },
  { type: "service-card", size: "3:2 1200×800", note: "Package/service card thumbnail" },
  { type: "cta-banner", size: "21:9 ultrawide", note: "Wide CTA section background" },
  { type: "trust-section", size: "16:9", note: "Subtle background for stats/trust bar" },
  { type: "how-it-works", size: "16:9", note: "Clean illustrative step background" },
  { type: "social-square", size: "1:1 1080×1080", note: "Instagram/LinkedIn post" },
  { type: "social-story", size: "9:16", note: "Instagram story" },
  { type: "ppt-slide", size: "16:9", note: "Vendor presentation slide" },
  { type: "email-header", size: "3:1 wide", note: "Email newsletter banner" },
];

function buildServicePrompts() {
  const all = [];
  for (const svc of SERVICES) {
    SERVICE_SHOTS.forEach((shot, i) => {
      all.push({
        id: `${svc.slug}-${shot.type}`,
        service: svc.name,
        slug: svc.slug,
        variation: i + 1,
        shotType: shot.type,
        saveAs: `${svc.saveDir}/${svc.slug}-${shot.type}.png`,
        prompt: `Create a ${svc.name} image for YatraNexus travel website. Theme: ${svc.theme}. Shot type: ${shot.type} — ${shot.note}. ${BRAND} Technical: ${shot.size}.`,
      });
    });
  }
  return all;
}

const servicePrompts = buildServicePrompts();
const packagePrompts = packages.flatMap((pkg) =>
  STYLE_VARIATIONS.map((_, i) => buildPackagePrompt(pkg, i)),
);

const guide = `# YatraNexus Bulk Image Prompts

Generated: ${new Date().toISOString().slice(0, 10)}

## Summary

| Category | Items | Prompts each | Total prompts |
|----------|-------|--------------|---------------|
| Services | ${SERVICES.length} | 10 | ${servicePrompts.length} |
| Packages | ${packages.length} | 10 | ${packagePrompts.length} |
| **Total** | | | **${servicePrompts.length + packagePrompts.length}** |

---

## How to bulk-generate & download images

### Method 1 — ChatGPT (manual, no API)

ChatGPT does **not** support true bulk download. Use this loop:

1. Open ChatGPT → enable **Image generation** (ChatGPT Plus).
2. Paste the **MASTER BATCH PROMPT** below.
3. Say: **"Generate image 1 only. Wait for my next before continuing."**
4. Download each image → rename to the \`saveAs\` filename shown.
5. Reply **"next"** for the next prompt. Repeat.

**Faster variant:** Ask ChatGPT to output 5 prompts at a time, generate all 5 in one chat turn (if allowed), download each.

### Method 2 — ChatGPT batch instruction (copy-paste)

\`\`\`
You are my YatraNexus image generator. I will paste prompts from bulk-prompts.json.
For EACH prompt:
1. Generate the image exactly as described
2. Tell me the save filename from saveAs
3. Wait for me to say "next" before the next image
Rules: photorealistic, no text, no watermark, YatraNexus colors (navy, orange, purple).
Start with prompt id: cabs-hero-desktop
\`\`\`

### Method 3 — OpenAI API (true bulk, for developers)

\`\`\`bash
# Requires OPENAI_API_KEY and: pip install openai requests
python scripts/bulk-generate-images.py
\`\`\`

(See scripts/bulk-generate-images.py — generates all images overnight.)

### Method 4 — Leonardo.ai / Adobe Firefly

1. Export \`bulk-prompts.csv\` from this folder.
2. Import CSV into Leonardo **Bulk Upload** or Firefly **Batch generate**.
3. Download ZIP when complete.

### File naming after download

| Type | Folder |
|------|--------|
| Service heroes | \`public/images/hero/\` |
| Corporate | \`public/images/corporate/\` |
| Packages | \`public/images/packages/\` |

Use **v1** as the main package card image in Admin CMS.

---

## MASTER BATCH PROMPT (start ChatGPT session)

\`\`\`
I have ${servicePrompts.length + packagePrompts.length} YatraNexus travel images to create.
Generate ONE image per message when I give you a prompt ID from bulk-prompts.json.
Always: photorealistic, 3:2 or 16:9 as specified, no text, no watermark.
Brand: navy #001b2a, orange #ff7a00, purple #4b2cff accents.
\`\`\`

---

## Services (${servicePrompts.length} prompts)

`;

let md = guide;

for (const svc of SERVICES) {
  md += `\n### ${svc.name}\n\n`;
  const items = servicePrompts.filter((p) => p.slug === svc.slug);
  for (const p of items) {
    md += `#### ${p.variation}. ${p.shotType} → \`${p.saveAs}\`\n\n`;
    md += `${p.prompt}\n\n`;
  }
}

md += `\n---\n\n## Packages (${packagePrompts.length} prompts)\n\n`;
md += `> Use **v1** for the main package card. v2–v10 are alternates for gallery/PPT.\n\n`;

const byDest = {};
for (const pkg of packages) {
  if (!byDest[pkg.destination]) byDest[pkg.destination] = [];
  byDest[pkg.destination].push(pkg);
}

for (const [dest, pkgs] of Object.entries(byDest).sort()) {
  md += `\n### ${dest} (${pkgs.length} packages)\n\n`;
  for (const pkg of pkgs) {
    md += `#### ${pkg.title}\n`;
    md += `Slug: \`${pkg.slug}\` | ${pkg.days}D/${pkg.nights}N | ${pkg.from_price}\n\n`;
    const items = packagePrompts.filter((p) => p.slug === pkg.slug);
    for (const p of items) {
      md += `**v${p.variation}** → \`${p.saveAs}\`\n\n${p.prompt}\n\n`;
    }
  }
}

const json = {
  generated: new Date().toISOString(),
  summary: {
    services: SERVICES.length,
    servicePrompts: servicePrompts.length,
    packages: packages.length,
    packagePrompts: packagePrompts.length,
    total: servicePrompts.length + packagePrompts.length,
  },
  styleVariations: STYLE_VARIATIONS,
  services: servicePrompts,
  packages: packagePrompts,
};

const csv = [
  "id,type,name,variation,saveAs,prompt",
  ...servicePrompts.map((p) =>
    [p.id, "service", p.service, p.variation, p.saveAs, `"${p.prompt.replace(/"/g, '""')}"`].join(","),
  ),
  ...packagePrompts.map((p) =>
    [p.id, "package", p.package, p.variation, p.saveAs, `"${p.prompt.replace(/"/g, '""')}"`].join(","),
  ),
].join("\n");

writeFileSync(path.join(outDir, "bulk-prompts.md"), md, "utf8");
writeFileSync(path.join(outDir, "bulk-prompts.json"), JSON.stringify(json, null, 2), "utf8");
writeFileSync(path.join(outDir, "bulk-prompts.csv"), csv, "utf8");

console.log(`Wrote ${servicePrompts.length + packagePrompts.length} prompts to public/image-prompts/`);
console.log(`  bulk-prompts.md`);
console.log(`  bulk-prompts.json`);
console.log(`  bulk-prompts.csv`);
