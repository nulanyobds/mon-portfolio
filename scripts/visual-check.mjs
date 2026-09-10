import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
const out = new URL("../docs/screenshots/", import.meta.url);
const baseUrl = process.argv[2] ?? "http://127.0.0.1:4173/";
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { viewports: [], errors: [] };
for (const width of [1280, 390, 834]) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  page.on("pageerror", (e) => report.errors.push(e.message));
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  for (const section of await page.locator("main>section").all()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(80);
  }
  await page.evaluate(async () => {
    for (const i of document.images) i.loading = "eager";
    await Promise.all(
      [...document.images].map((i) => i.decode().catch(() => {})),
    );
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(200);
  const metrics = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    h1: document.querySelectorAll("h1").length,
    sections: document.querySelectorAll("main>section").length,
    images: [...document.images].length,
    brokenImages: [...document.images]
      .filter((i) => !i.naturalWidth)
      .map((i) => i.src),
    sectionSizes: [...document.querySelectorAll("main>section")].map((n) => ({
      id: n.id,
      height: Math.round(n.getBoundingClientRect().height),
      y: Math.round(n.getBoundingClientRect().top + scrollY),
    })),
  }));
  report.viewports.push(metrics);
  const name = width === 1280 ? "desktop" : width === 390 ? "mobile" : "tablet";
  await page.screenshot({
    path: fileURLToPath(new URL(name + ".png", out)),
    fullPage: true,
  });
  await page
    .locator("#accueil")
    .screenshot({ path: fileURLToPath(new URL(name + "-hero.png", out)) });
  for (const id of ["services", "solutions", "about", "tarifs"])
    await page.locator("#" + id).screenshot({
      path: fileURLToPath(new URL(name + "-" + id + ".png", out)),
    });
  if (width === 390) {
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    await page
      .getByRole("navigation", { name: "Navigation mobile" })
      .getByRole("link", { name: "Services", exact: true })
      .click();
    report.mobileMenuClosed =
      (await page
        .getByRole("button", { name: "Ouvrir le menu" })
        .getAttribute("aria-expanded")) === "false";
  }
  const toggle = page.getByRole("switch");
  await toggle.click();
  report.toggleWorks = (await toggle.getAttribute("aria-checked")) === "false";
  await toggle.click();
  const second = page.locator("#faq-question-1");
  await second.click();
  report.faqWorks = (await second.getAttribute("aria-expanded")) === "true";
  report.invalidFormBlocked = await page
    .locator("#contact form")
    .evaluate((f) => !f.checkValidity());
  await page.locator("#prenom").fill("Test");
  await page.locator("#nom").fill("Portfolio");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#message").fill("Vérification locale du formulaire.");
  await page
    .locator("#contact")
    .getByRole("button", { name: "Envoyer", exact: true })
    .click();
  report.formHonest = await page.locator("#contact [role=status]").innerText();
  await page
    .getByRole("button", { name: "Voir Content Sprint", exact: true })
    .click();
  report.projectDialog = await page.locator("dialog").evaluate((d) => d.open);
  await page.keyboard.press("Escape");
  report.dialogEscapeWorks = await page
    .locator("dialog")
    .evaluate((d) => !d.open);
  if (
    !report.toggleWorks ||
    !report.faqWorks ||
    !report.projectDialog ||
    !report.dialogEscapeWorks ||
    !report.invalidFormBlocked
  )
    throw new Error("Une interaction a échoué");
  if (
    metrics.scrollWidth > width ||
    metrics.brokenImages.length ||
    metrics.h1 !== 1
  )
    throw new Error("Échec de structure au viewport " + width);
  await page.close();
}
await fs.writeFile(
  new URL("../docs/browser-report.json", import.meta.url),
  JSON.stringify(report, null, 2),
);
await browser.close();
console.log(JSON.stringify(report, null, 2));
if (report.errors.length) process.exitCode = 1;
