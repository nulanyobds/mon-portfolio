import { chromium } from "@playwright/test";

const url = process.argv[2] ?? "http://127.0.0.1:5173/";
const output = process.argv[3] ?? "docs/screenshots/desktop-current.png";
const width = Number(process.argv[4] ?? 1280);
const selector =
  process.argv[5] && process.argv[5] !== "-" ? process.argv[5] : undefined;
const reducedMotion = process.argv[6] === "reduce" ? "reduce" : "no-preference";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width, height: 900 },
  reducedMotion,
});
await page.goto(url, { waitUntil: "networkidle" });
if (selector) await page.locator(selector).scrollIntoViewIfNeeded();
else
  for (const section of await page.locator("main > section").all()) {
    await section.scrollIntoViewIfNeeded();
  }
await page.evaluate(async () => {
  if (document.activeElement instanceof HTMLElement)
    document.activeElement.blur();
  const skipLink = document.querySelector(".skip-link");
  if (skipLink instanceof HTMLElement) skipLink.style.visibility = "hidden";
  for (const image of document.images) image.loading = "eager";
  await Promise.all(
    [...document.images].map((image) => image.decode().catch(() => {})),
  );
  window.scrollTo(0, 0);
});
if (selector) await page.locator(selector).screenshot({ path: output });
else await page.screenshot({ path: output, fullPage: true });
await browser.close();
