import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
const dir = new URL("../app/assets/images/", import.meta.url);
const manifest = [];
for (const name of await fs.readdir(dir)) {
  if (!name.endsWith(".b64")) continue;
  const source = Buffer.from(
    (await fs.readFile(new URL(name, dir), "utf8")).trim(),
    "base64",
  );
  const index = Number(name.split("-")[1].split(".")[0]);
  const image = sharp(source);
  const m = await image.metadata();
  const max = [7, 8, 9, 10, 13, 18, 19, 20, 23].includes(index)
    ? 320
    : [0, 17, 22].includes(index)
      ? 1000
      : 1600;
  await image
    .resize({ width: max, withoutEnlargement: true })
    .webp({ quality: 86, alphaQuality: 100, effort: 5 })
    .toFile(fileURLToPath(new URL(name.replace(".b64", ".webp"), dir)));
  manifest.push({ index, width: m.width, height: m.height, alpha: m.hasAlpha });
}
await fs.writeFile(
  new URL("../app/assets/manifest.json", import.meta.url),
  JSON.stringify(manifest, null, 2),
);
console.log(manifest);
