import { writeFileSync, mkdirSync, readdirSync, existsSync, readFileSync } from "node:fs";
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
  "YatraNexus brand: navy #2D235F, orange #D86417. Photorealistic travel photography, no text, no watermark, no logo. Keep left third softer/clear for headline overlay.";

function listFiles(relDir) {
  const abs = path.join(root, relDir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs).filter((f) => !f.startsWith(".") && !f.startsWith("_"));
}

function slugify(name) {
  return String(name)
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const packageFiles = listFiles("public/images/packages");
const bannerFiles = listFiles("public/images/banners");
const heroFiles = listFiles("public/images/hero");
const heroFileSet = new Set(heroFiles.map((f) => f.toLowerCase()));

function findLocal(pkg) {
  const slugMatch = packageFiles.find((f) =>
    f.toLowerCase().startsWith(pkg.slug.toLowerCase()),
  );
  if (slugMatch) {
    return { folder: "packages", file: slugMatch, url: `/images/packages/${slugMatch}` };
  }

  const titleKey = pkg.title.toLowerCase();
  const nameMatch = packageFiles.find((f) => {
    const base = f.replace(/\.png$/i, "").toLowerCase();
    return base.includes(titleKey.slice(0, 18)) || titleKey.includes(base.slice(0, 18));
  });
  if (nameMatch) {
    return { folder: "packages", file: nameMatch, url: `/images/packages/${nameMatch}` };
  }

  const banner = bannerFiles.find((f) => {
    const base = f.replace(/\.png$/i, "").toLowerCase();
    return base === titleKey || base.includes(titleKey.slice(0, 22));
  });
  if (banner) {
    return { folder: "banners", file: banner, url: `/images/banners/${banner}` };
  }

  return null;
}

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

function packageScene(pkg) {
  const title = pkg.title.toLowerCase();
  const dest = DESTINATION_SCENES[pkg.destination] ?? `${pkg.destination} landmarks`;
  if (title.includes("honeymoon")) return `romantic ${dest}, intimate luxury mood`;
  if (title.includes("family")) return `family-friendly ${dest}, cheerful safe travel`;
  if (title.includes("pilgrimage") || title.includes("vaishno") || title.includes("darshan")) {
    return `spiritual pilgrimage ${dest}, respectful reverent mood`;
  }
  if (title.includes("adventure") || title.includes("trek")) {
    return `adventure ${dest}, thrilling outdoor`;
  }
  if (title.includes("wildlife") || title.includes("safari")) return `wildlife safari ${dest}`;
  if (title.includes("beach") || title.includes("coastal")) return `coastal beaches ${dest}`;
  if (title.includes("heritage") || title.includes("grand tour")) {
    return `heritage circuit ${dest}`;
  }
  return `scenic highlights of ${dest}`;
}

const pageHeroes = [
  {
    page: "Home",
    route: "/",
    saveAs: "public/images/hero/hero-background.png",
    localFile: "hero-background.png",
    title: "Your Journey, Our Priority",
    prompt: `Wide cinematic India travel collage for homepage hero — golden-hour Goa beach, Kerala backwaters, Himalayan peaks, soft cream light. ${BRAND} Technical: 16:9 1920×1080.`,
  },
  {
    page: "About",
    route: "/about",
    saveAs: "public/images/hero/about-hero.png",
    localFile: "about-hero.png",
    title: "Your Journey, Our Priority",
    prompt: `Warm photorealistic travel-agency hero — diverse happy travellers with expert guide at scenic Indian overlook, premium trustworthy mood. ${BRAND} Technical: 16:9 1920×1080.`,
  },
  {
    page: "Contact",
    route: "/contact",
    saveAs: "public/images/hero/contact-hero.png",
    localFile: "contact-hero.png",
    title: "Let's Plan Your Next Trip",
    prompt: `Friendly contact / plan-trip hero — travel desk with maps, passport, coffee; soft daylight office with window view of destination mountains. ${BRAND} Technical: 16:9 1920×1080.`,
  },
  {
    page: "Flights",
    route: "/services/flights",
    saveAs: "public/images/hero/flights-hero.png",
    localFile: "flights-hero.png",
    title: "Flights",
    prompt: `Flight booking hero — modern commercial aircraft at sunrise runway, passengers boarding, premium airport atmosphere. ${BRAND} Technical: 16:9 1920×1080.`,
  },
  {
    page: "Hotels",
    route: "/services/hotels",
    saveAs: "public/images/hero/Hotal-Hero-Saction.png",
    localFile: "Hotal-Hero-Saction.png",
    title: "Hotels",
    prompt: `Hotel booking hero — luxury boutique hotel lobby and premium room with balcony view, inviting hospitality. ${BRAND} Technical: 16:9 1920×1080.`,
  },
  {
    page: "Cabs",
    route: "/services/cabs",
    saveAs: "public/images/hero/cabs-hero.png",
    localFile: "cabs-hero.png",
    title: "Outstation Cabs",
    prompt: `Outstation cab hero — white premium SUV on scenic Indian highway, hills and open sky, comfortable road-trip mood. ${BRAND} Technical: 16:9 1920×1080.`,
  },
  {
    page: "Visa",
    route: "/services/visa",
    saveAs: "public/images/hero/visa-hero.png",
    localFile: "visa-hero.png",
    title: "Visa Services",
    prompt: `Visa services hero — passport with colorful visa stamps on wooden desk, globe soft background, global travel access. ${BRAND} Technical: 16:9 1920×1080.`,
  },
  {
    page: "Insurance",
    route: "/services/insurance",
    saveAs: "public/images/hero/insurance-hero.png",
    localFile: "insurance-hero.png",
    title: "Travel Insurance",
    prompt: `Travel insurance hero — protected family travellers at airport with luggage, calm confident peace-of-mind mood. ${BRAND} Technical: 16:9 1920×1080.`,
  },
  {
    page: "Forex",
    route: "/services/forex",
    saveAs: "public/images/hero/forex-hero.png",
    localFile: "forex-hero.png",
    title: "Forex Card",
    prompt: `Forex card hero — multi-currency travel card with subtle world map and soft currency accents, modern finance-travel feel. ${BRAND} Technical: 16:9 1920×1080.`,
  },
  {
    page: "Corporate",
    route: "/corporate",
    saveAs: "public/images/hero/corporate-hero.png",
    localFile: "corporate-hero.png",
    title: "Corporate Travel",
    prompt: `Corporate travel hero — business executives at premium airport lounge, MICE conference backdrop, professional polished. ${BRAND} Technical: 16:9 1920×1080.`,
  },
  {
    page: "Holiday Packages Hub",
    route: "/holiday-packages",
    saveAs: "public/images/hero/holiday-packages-hero-desktop.png",
    localFile: "holiday-packages-hero-desktop.png",
    title: "Holidays you'll Remember",
    prompt: `Holiday packages hub hero — epic India destinations collage: Kerala houseboat, Rajasthan fort, Kashmir lake, Goa beach at golden hour. ${BRAND} Technical: 16:9 1920×1080.`,
  },
  {
    page: "Domestic Holidays",
    route: "/holiday-packages/domestic",
    saveAs: "public/images/hero/holiday-domestic-hero.png",
    localFile: null,
    title: "Explore India by State",
    prompt: `Domestic India holidays hero — panoramic Incredible India landscape spanning beaches, mountains, deserts and heritage forts. ${BRAND} Technical: 16:9 1920×1080.`,
  },
  {
    page: "International Holidays",
    route: "/holiday-packages/international",
    saveAs: "public/images/hero/holiday-international-hero.png",
    localFile: null,
    title: "Explore the World",
    prompt: `International holidays hero — iconic world destinations collage (Bali, Dubai, Europe Alps), premium wanderlust mood. ${BRAND} Technical: 16:9 1920×1080.`,
  },
];

const pageHeroReport = pageHeroes.map((h) => ({
  ...h,
  hasLocal: !!(h.localFile && heroFileSet.has(h.localFile.toLowerCase())),
  status:
    h.localFile && heroFileSet.has(h.localFile.toLowerCase())
      ? "Ready (local file)"
      : "Missing local hero file",
}));

const packageReport = packages.map((pkg) => {
  const local = findLocal(pkg);
  const imageUrl = (pkg.image_url || "").trim();
  const isUnsplash = /unsplash/i.test(imageUrl);
  let status = "Missing";
  if (local) status = "Ready (local)";
  else if (isUnsplash) status = "Stock Unsplash only";
  else if (imageUrl) status = "Remote URL";

  return {
    package_name: pkg.title,
    slug: pkg.slug,
    destination: pkg.destination,
    days: pkg.days,
    nights: pkg.nights,
    from_price: pkg.from_price,
    is_active: pkg.is_active,
    is_featured: pkg.is_featured,
    status,
    local_image: local ? local.url : "",
    db_image: imageUrl ? (isUnsplash ? "Unsplash stock" : imageUrl) : "",
    hero_prompt: `Create a photorealistic holiday package HERO image for "${pkg.title}" — ${pkg.days}-day / ${pkg.nights}-night ${pkg.destination} package, India. Scene: ${packageScene(pkg)}. Wide cinematic landscape, premium travel brochure mood. ${BRAND} Technical: 16:9 1920×1080. Save as: public/images/packages/${pkg.slug}-hero.png`,
  };
});

const statusCounts = packageReport.reduce((acc, row) => {
  acc[row.status] = (acc[row.status] || 0) + 1;
  return acc;
}, {});

let md = `# YatraNexus Hero Section Image Prompts & Holiday Package Status

Generated: ${new Date().toISOString().slice(0, 10)}

## Page Hero Sections (${pageHeroReport.length})

`;

for (const h of pageHeroReport) {
  md += `### ${h.page} — \`${h.route}\`

- Title: **${h.title}**
- Status: **${h.status}**
- Save as: \`${h.saveAs}\`

**Prompt:**

${h.prompt}

`;
}

md += `---

## Holiday Packages — Hero Image Status by package_name (${packageReport.length})

| Status | Count |
|--------|-------|
`;
for (const [k, v] of Object.entries(statusCounts)) {
  md += `| ${k} | ${v} |\n`;
}

md += `
| package_name | destination | status | local_image |
|---|---|---|---|
`;
for (const r of packageReport) {
  md += `| ${r.package_name.replace(/\|/g, "/")} | ${r.destination} | ${r.status} | ${r.local_image || "—"} |\n`;
}

md += `
---

## Holiday Package Hero Prompts (package_name wise)

`;
for (const r of packageReport) {
  md += `### ${r.package_name}

Slug: \`${r.slug}\` | ${r.destination} | ${r.days}D/${r.nights}N | Status: **${r.status}**

${r.hero_prompt}

`;
}

const json = {
  generated: new Date().toISOString(),
  pageHeroes: pageHeroReport,
  holidayPackageSummary: {
    total: packageReport.length,
    ...statusCounts,
  },
  holidayPackages: packageReport,
};

const csv = [
  "package_name,destination,slug,status,local_image,is_featured,is_active,hero_prompt",
  ...packageReport.map((r) =>
    [
      JSON.stringify(r.package_name),
      r.destination,
      r.slug,
      JSON.stringify(r.status),
      JSON.stringify(r.local_image),
      r.is_featured,
      r.is_active,
      JSON.stringify(r.hero_prompt),
    ].join(","),
  ),
].join("\n");

writeFileSync(path.join(outDir, "hero-section-prompts.md"), md, "utf8");
writeFileSync(path.join(outDir, "hero-section-prompts.json"), JSON.stringify(json, null, 2), "utf8");
writeFileSync(path.join(outDir, "holiday-package-hero-status.csv"), csv, "utf8");

console.log(
  JSON.stringify(
    {
      outDir: "public/image-prompts/",
      files: [
        "hero-section-prompts.md",
        "hero-section-prompts.json",
        "holiday-package-hero-status.csv",
      ],
      pageHeroes: pageHeroReport.length,
      pageReady: pageHeroReport.filter((h) => h.hasLocal).length,
      packages: packageReport.length,
      statusCounts,
      readyLocalPackages: packageReport
        .filter((r) => r.status === "Ready (local)")
        .map((r) => r.package_name),
    },
    null,
    2,
  ),
);
