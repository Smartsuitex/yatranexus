import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "portfolio", "screenshots");
const baseUrl = "http://localhost:8081";

const shots = [
  { name: "home-desktop.png", url: "/", viewport: { width: 1440, height: 900 } },
  { name: "home-mobile.png", url: "/", viewport: { width: 390, height: 844 } },
  { name: "mobile-menu.png", url: "/", viewport: { width: 390, height: 844 }, action: "openMenu" },
  { name: "holiday-packages.png", url: "/holiday-packages", viewport: { width: 1440, height: 900 } },
  { name: "blog-public.png", url: "/blog", viewport: { width: 1440, height: 900 } },
  { name: "admin-login.png", url: "/admin/login", viewport: { width: 1440, height: 900 } },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

for (const shot of shots) {
  await page.setViewportSize(shot.viewport);
  await page.goto(`${baseUrl}${shot.url}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);

  if (shot.action === "openMenu") {
    const menuBtn = page.getByRole("button", { name: /toggle menu/i });
    if (await menuBtn.isVisible()) await menuBtn.click();
    await page.waitForTimeout(500);
  }

  await page.screenshot({
    path: path.join(outDir, shot.name),
    fullPage: shot.name.includes("mobile") && shot.action !== "openMenu" ? false : true,
  });
  console.log(`Saved ${shot.name}`);
}

await browser.close();
