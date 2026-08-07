#!/usr/bin/env node
/**
 * E2E: Home → each page → Home again.
 * Verifies content + images load on every visit (including return to Home).
 *
 * Usage:
 *   node scripts/e2e-page-roundtrips.mjs
 *   node scripts/e2e-page-roundtrips.mjs http://localhost:8082
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = (process.argv[2] || "http://localhost:8082").replace(/\/$/, "");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const STATIC_PAGES = [
  "/",
  "/about",
  "/contact",
  "/corporate",
  "/gallery",
  "/blog",
  "/faq",
  "/testimonials",
  "/services",
  "/services/flights",
  "/services/hotels",
  "/services/cabs",
  "/services/visa",
  "/services/insurance",
  "/services/forex",
];

const HOLIDAY_SEED = [
  "/holiday-packages",
  "/holiday-packages/domestic",
  "/holiday-packages/international",
  "/holiday-packages/tour/adventure",
  "/holiday-packages/tour/family",
  "/holiday-packages/tour/honeymoon",
  "/holiday-packages/tour/leisure",
  "/holiday-packages/tour/pilgrimage",
  "/holiday-packages/tour/solo",
];

const IGNORE_CONSOLE = [
  /hydration/i,
  /data-gr-/i,
  /grammarly/i,
  /extension/i,
  /Download the React DevTools/i,
  /\[vite\]/i,
  /Module "events" has been externalized/i,
  /Module "stream" has been externalized/i,
  /Module "buffer" has been externalized/i,
];

function keepConsole(text) {
  return !IGNORE_CONSOLE.some((re) => re.test(text));
}

async function discoverHolidayRoutes(page) {
  const found = new Set(HOLIDAY_SEED);
  await page.goto(`${BASE}/holiday-packages`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(500);
  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="/holiday-packages"]')]
      .map((a) => a.getAttribute("href") || "")
      .filter(Boolean),
  );
  for (const href of hrefs) {
    const clean = href.split("?")[0].split("#")[0];
    if (clean.startsWith("/holiday-packages")) found.add(clean);
  }
  // Cap package detail pages so the run stays reasonable
  const packages = [...found].filter((p) => p.includes("/package/")).slice(0, 8);
  const others = [...found].filter((p) => !p.includes("/package/"));
  return [...others, ...packages].sort((a, b) => a.localeCompare(b));
}

async function settle(page) {
  await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  await page.evaluate(async () => {
    // Trigger lazy images
    const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
    const max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y < max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
}

async function inspectPage(page, label) {
  const consoleErrors = [];
  const pageErrors = [];
  const failedReqs = [];

  const onConsole = (msg) => {
    if (msg.type() === "error") {
      const t = msg.text();
      if (keepConsole(t)) consoleErrors.push(t.slice(0, 350));
    }
  };
  const onPageError = (err) => pageErrors.push(String(err).slice(0, 350));
  const onFailed = (req) => {
    const url = req.url();
    if (/\/images\//.test(url) || /\.(webp|png|jpe?g|svg|css|js)(\?|$)/i.test(url)) {
      failedReqs.push(`${req.failure()?.errorText || "fail"} ${url.replace(BASE, "")}`);
    }
  };

  page.on("console", onConsole);
  page.on("pageerror", onPageError);
  page.on("requestfailed", onFailed);

  try {
    await settle(page);
    const stats = await page.evaluate(() => {
      const imgs = [...document.images].filter((i) => {
        const s = i.currentSrc || i.src || "";
        return s && !s.startsWith("data:");
      });
      const broken = imgs
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => (i.currentSrc || i.src).replace(location.origin, ""));
      const pending = imgs.filter((i) => !i.complete).length;
      const ok = imgs.filter((i) => i.complete && i.naturalWidth > 0).length;

      const main = document.querySelector("main") || document.body;
      const text = (main?.innerText || "").replace(/\s+/g, " ").trim();
      const headings = [...document.querySelectorAll("h1,h2")]
        .map((h) => h.textContent?.trim())
        .filter(Boolean)
        .slice(0, 8);

      const hasHeader = Boolean(document.querySelector("header, [role='banner']"));
      const hasFooter = Boolean(document.querySelector("footer"));
      const hasH1 = Boolean(document.querySelector("h1"));

      return {
        url: location.pathname + location.search,
        title: document.title,
        textLen: text.length,
        headings,
        hasHeader,
        hasFooter,
        hasH1,
        images: { total: imgs.length, ok, broken, pending },
      };
    });

    const refreshImages = async () => {
      const again = await page.evaluate(() => {
        const imgs = [...document.images].filter(
          (i) => (i.currentSrc || i.src) && !(i.currentSrc || i.src).startsWith("data:"),
        );
        return {
          total: imgs.length,
          ok: imgs.filter((i) => i.complete && i.naturalWidth > 0).length,
          broken: imgs
            .filter((i) => i.complete && i.naturalWidth === 0)
            .map((i) => (i.currentSrc || i.src).replace(location.origin, "")),
          pending: imgs.filter((i) => !i.complete).length,
          skeletons: document.querySelectorAll(".safe-image-skeleton").length,
          featured: document.querySelectorAll(".home-featured-package-card__img").length,
          tourTypes: document.querySelectorAll(".home-tour-type-card__img").length,
          domestic: document.querySelectorAll(".home-domestic-dest-card img, .home-domestic-dest-card__img").length,
        };
      });
      stats.images = again;
      return again;
    };

    // Wait a bit more for any remaining lazy imgs
    if (stats.images.pending > 0 || stats.images.total < 8) {
      await page.waitForTimeout(1200);
      await refreshImages();
    }

    const isHome = stats.url === "/" || stats.url === "";
    // After client nav, Home lazy chunk + images may still settle — poll briefly
    if (isHome) {
      for (let i = 0; i < 4; i++) {
        const img = stats.images;
        const rich =
          img.total >= 15 &&
          img.ok >= 15 &&
          img.broken.length === 0 &&
          (img.skeletons || 0) <= 2 &&
          stats.textLen >= 1500 &&
          (stats.headings || []).length >= 4;
        if (rich) break;
        await page.evaluate(async () => {
          const max = Math.max(document.body.scrollHeight, 2000);
          for (let y = 0; y < max; y += 700) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 60));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(400);
        const textAgain = await page.evaluate(() => {
          const main = document.querySelector("main") || document.body;
          return {
            textLen: (main?.innerText || "").replace(/\s+/g, " ").trim().length,
            headings: [...document.querySelectorAll("h1,h2")]
              .map((h) => h.textContent?.trim())
              .filter(Boolean)
              .slice(0, 8),
          };
        });
        stats.textLen = textAgain.textLen;
        stats.headings = textAgain.headings;
        await refreshImages();
      }
    }

    const contentOk =
      stats.hasHeader &&
      stats.hasFooter &&
      stats.hasH1 &&
      stats.textLen >= 80 &&
      stats.title.length > 0;

    // On Home, require rich homepage sections (not just chrome)
    const homeRichEnough =
      !isHome ||
      (stats.images.total >= 15 &&
        stats.images.ok >= 15 &&
        stats.textLen >= 1500 &&
        (stats.headings || []).length >= 4);

    const imagesOk =
      stats.images.broken.length === 0 &&
      (stats.images.total === 0 || stats.images.ok === stats.images.total);

    const uniqueErrors = [...new Set(consoleErrors)];
    const uniquePageErrors = [...new Set(pageErrors)];
    const uniqueFailed = [...new Set(failedReqs)].slice(0, 15);

    const ok =
      contentOk &&
      homeRichEnough &&
      imagesOk &&
      uniqueErrors.length === 0 &&
      uniquePageErrors.length === 0;

    return {
      label,
      ok,
      contentOk,
      homeRichEnough,
      imagesOk,
      path: stats.url,
      title: stats.title,
      textLen: stats.textLen,
      headings: stats.headings,
      images: stats.images,
      consoleErrors: uniqueErrors,
      pageErrors: uniquePageErrors,
      failedRequests: uniqueFailed,
    };
  } finally {
    page.off("console", onConsole);
    page.off("pageerror", onPageError);
    page.off("requestfailed", onFailed);
  }
}

async function gotoAndInspect(page, route, label) {
  await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  return inspectPage(page, label);
}

async function clickHome(page) {
  const home = page.locator('header a[href="/"]').first();
  if (await home.count()) {
    await home.click({ timeout: 10000 }).catch(async () => {
      await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
    });
  } else {
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  }
  await page.waitForURL((url) => url.pathname === "/" || url.pathname === "", {
    timeout: 15000,
  }).catch(() => {});
  // HomepageBelowHero is lazy — wait until featured cards/images are present
  await page.waitForSelector("h2:has-text('Featured Holiday Plans')", {
    timeout: 20000,
  }).catch(() => {});
  await page.waitForSelector(".home-featured-package-card__img, .home-tour-type-card__img", {
    timeout: 20000,
  }).catch(() => {});
  await page.waitForTimeout(1200);
}

console.log(`E2E round-trip audit on ${BASE}\n`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1365, height: 900 },
});
const page = await context.newPage();

// Discover holiday routes
console.log("Discovering holiday routes…");
const holidayRoutes = await discoverHolidayRoutes(page);
console.log(`Holiday routes: ${holidayRoutes.length}`);

const targets = [
  ...STATIC_PAGES.filter((p) => p !== "/"),
  ...holidayRoutes,
];
// unique preserve order
const seen = new Set();
const routes = targets.filter((r) => {
  if (seen.has(r)) return false;
  seen.add(r);
  return true;
});

console.log(`Total target pages (excl. home baseline): ${routes.length}\n`);

const trips = [];
let failCount = 0;

// Baseline Home
const home1 = await gotoAndInspect(page, "/", "HOME baseline");
trips.push({ target: "/", steps: [home1] });
console.log(
  `${home1.ok ? "OK  " : "FAIL"}  HOME baseline  text=${home1.textLen}  imgs=${home1.images.ok}/${home1.images.total}`,
);
if (!home1.ok) failCount++;

for (const route of routes) {
  const steps = [];

  // Visit target
  const visit = await gotoAndInspect(page, route, `VISIT ${route}`);
  steps.push(visit);

  // Back to Home
  await clickHome(page);
  const homeBack = await inspectPage(page, `HOME after ${route}`);
  steps.push(homeBack);

  const tripOk = visit.ok && homeBack.ok;
  if (!tripOk) failCount++;

  trips.push({ target: route, ok: tripOk, steps });

  const mark = tripOk ? "OK  " : "FAIL";
  console.log(
    `${mark}  ${route.padEnd(52)} visit imgs ${visit.images.ok}/${visit.images.total}  → home imgs ${homeBack.images.ok}/${homeBack.images.total}` +
      (visit.consoleErrors.length ? `  err=${visit.consoleErrors.length}` : "") +
      (homeBack.images.broken.length ? `  homeBroken=${homeBack.images.broken.length}` : "") +
      (visit.images.broken.length ? `  visitBroken=${visit.images.broken.length}` : ""),
  );

  if (!tripOk) {
    if (visit.images.broken.length) {
      console.log(`       broken on visit: ${visit.images.broken.slice(0, 3).join(" | ")}`);
    }
    if (homeBack.images.broken.length) {
      console.log(`       broken on home: ${homeBack.images.broken.slice(0, 3).join(" | ")}`);
    }
    if (visit.consoleErrors.length) {
      console.log(`       console: ${visit.consoleErrors[0]}`);
    }
    if (!visit.contentOk) {
      console.log(
        `       content: h1=${visit.headings?.[0] || "-"} textLen=${visit.textLen} header=${visit.contentOk}`,
      );
    }
  }
}

await browser.close();

const summary = {
  checkedAt: new Date().toISOString(),
  base: BASE,
  homeBaselineOk: home1.ok,
  targets: routes.length,
  trips: trips.length,
  failedTrips: failCount,
  holidayRoutes,
  results: trips,
};

fs.mkdirSync(path.join(root, "scripts/output"), { recursive: true });
const outPath = path.join(root, "scripts/output/e2e-page-roundtrips.json");
fs.writeFileSync(outPath, JSON.stringify(summary, null, 2));

console.log("\n=== E2E SUMMARY ===");
console.log(`Targets: ${routes.length}`);
console.log(`Failed trips: ${failCount}`);
console.log(`Home baseline: ${home1.ok ? "OK" : "FAIL"}`);
console.log(`Report: ${outPath}`);

process.exit(failCount > 0 ? 1 : 0);
