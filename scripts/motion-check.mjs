import { chromium } from "@playwright/test";
import fs from "node:fs/promises";

const baseUrl = process.argv[2] ?? "http://127.0.0.1:5173/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { viewports: [], errors: [], reducedMotion: {}, cpu: {} };

for (const width of [1280, 390]) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => report.errors.push(error.message));
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const initialServicesState = await page
    .locator('[data-motion-title="services"]')
    .getAttribute("data-motion-state");
  await page.locator('[data-motion-title="services"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(width === 390 ? 4400 : 3800);
  const finalServicesState = await page
    .locator('[data-motion-title="services"]')
    .getAttribute("data-motion-state");
  await page.locator("#services article").nth(2).scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const toggleActive =
    (await page.getByRole("switch").getAttribute("aria-checked")) === "true";
  const forwardGlow = Number(
    await page
      .locator("#services")
      .evaluate((node) => node.style.getPropertyValue("--card-glow-1") || 0),
  );

  const servicesGroup = page.locator("#services [data-replay-active]");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(420);
  const titleResetState = await page
    .locator('[data-motion-title="services"]')
    .getAttribute("data-motion-state");
  const cardGroupReset =
    (await servicesGroup.getAttribute("data-replay-active")) === "false";

  await page.locator("#accueil").scrollIntoViewIfNeeded();
  await page.waitForTimeout(320);
  const toggleReversed =
    (await page.getByRole("switch").getAttribute("aria-checked")) === "false";
  const reversedGlow = Number(
    await page
      .locator("#services")
      .evaluate((node) => node.style.getPropertyValue("--card-glow-1") || 0),
  );

  await page.locator('[data-motion-title="services"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(180);
  const replayStarted =
    (await page
      .locator('[data-motion-title="services"]')
      .getAttribute("data-motion-state")) === "typing";
  await page.waitForTimeout(width === 390 ? 4400 : 3800);
  const replayCompleted =
    (await page
      .locator('[data-motion-title="services"]')
      .getAttribute("data-motion-state")) === "final";
  await page.locator("#services article").nth(2).scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const cardGroupReactivated =
    (await servicesGroup.getAttribute("data-replay-active")) === "true";

  const profile = page.locator("#profils article").first();
  await profile.scrollIntoViewIfNeeded();
  await page.waitForTimeout(760);
  const revealFirstPass =
    Number(await profile.evaluate((node) => getComputedStyle(node).opacity)) >
    0.9;
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(760);
  const revealReset =
    Number(await profile.evaluate((node) => getComputedStyle(node).opacity)) <
    0.1;
  await profile.scrollIntoViewIfNeeded();
  await page.waitForTimeout(760);
  const revealSecondPass =
    Number(await profile.evaluate((node) => getComputedStyle(node).opacity)) >
    0.9;

  for (const section of await page.locator("main > section").all()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
  }
  for (const card of await page.locator("[data-card-visible]").all()) {
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(70);
  }
  let replayGroupsActivated = 0;
  for (const group of await page.locator("[data-replay-active]").all()) {
    await group.scrollIntoViewIfNeeded();
    await page.waitForTimeout(260);
    if ((await group.getAttribute("data-replay-active")) === "true") {
      replayGroupsActivated += 1;
    }
  }

  const metrics = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    visibleCards: document.querySelectorAll('[data-card-visible="true"]')
      .length,
    activeSteps: document.querySelectorAll(
      '[data-step-state="active"], [data-step-state="complete"]',
    ).length,
  }));
  report.viewports.push({
    width,
    initialServicesState,
    finalServicesState,
    toggleActive,
    titleResetState,
    replayStarted,
    replayCompleted,
    cardGroupReset,
    cardGroupReactivated,
    toggleReversed,
    forwardGlow,
    reversedGlow,
    revealFirstPass,
    revealReset,
    revealSecondPass,
    replayGroupsActivated,
    ...metrics,
  });
  await context.close();
}

{
  const context = await browser.newContext({
    viewport: { width: 390, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  report.reducedMotion = {
    completedTitles: await page.locator('[data-motion-state="final"]').count(),
    titleCount: await page.locator("[data-motion-title]").count(),
    toggleActive:
      (await page.getByRole("switch").getAttribute("aria-checked")) === "true",
  };
  await context.close();
}

{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.__motionLongTasks = [];
    new PerformanceObserver((items) => {
      for (const entry of items.getEntries())
        window.__motionLongTasks.push(entry.duration);
    }).observe({ type: "longtask", buffered: true });
  });
  const session = await context.newCDPSession(page);
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (const image of document.images) image.loading = "eager";
    await Promise.all(
      [...document.images].map((image) => image.decode().catch(() => {})),
    );
    window.__motionLongTasks = [];
  });
  await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  for (const section of await page.locator("main > section").all()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(80);
  }
  const tasks = await page.evaluate(() => window.__motionLongTasks ?? []);
  report.cpu = {
    throttle: "4x",
    longTaskCount: tasks.length,
    longestLongTaskMs: Math.round(Math.max(0, ...tasks)),
  };
  await context.close();
}

await browser.close();
await fs.writeFile(
  new URL("../docs/motion-report.json", import.meta.url),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));

if (
  report.errors.length ||
  report.viewports.some(
    (view) =>
      view.scrollWidth > view.width ||
      view.initialServicesState !== "typing" ||
      view.finalServicesState !== "final" ||
      !view.toggleActive ||
      view.titleResetState !== "typing" ||
      !view.replayStarted ||
      !view.replayCompleted ||
      !view.cardGroupReset ||
      !view.cardGroupReactivated ||
      !view.toggleReversed ||
      view.forwardGlow <= 0 ||
      view.reversedGlow !== 0 ||
      !view.revealFirstPass ||
      !view.revealReset ||
      !view.revealSecondPass ||
      view.replayGroupsActivated !== 3,
  ) ||
  report.reducedMotion.completedTitles !== report.reducedMotion.titleCount ||
  !report.reducedMotion.toggleActive
) {
  process.exitCode = 1;
}
