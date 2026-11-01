// Component-level comparison: showcase "fig-*" blocks vs Figma node screenshots (tools/visual/figma/components).
// Usage: node compare-components.mjs [baseUrl] [outDir]
// Both images are placed top-left on a white canvas of the larger size, then diffed with pixelmatch.
// Writes <outDir>/components/<id>.png (ours | figma | diff) and <outDir>/components.json.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const base = process.argv[2] ?? 'http://localhost:5173';
const outDir = path.resolve(process.argv[3] ?? 'output', 'components');
fs.mkdirSync(outDir, { recursive: true });
const figDir = path.resolve('figma', 'components');
const SELECTOR_OVERRIDE = {
  'fig-overflow-menu': '[data-visual-id="fig-overflow-menu"] .slds-dropdown',
  'fig-p4-composer': '[data-visual-id="fig-p4-composer"] .slds-docked-composer',
};

const pad = (img, w, h) => {
  const out = new PNG({ width: w, height: h });
  out.data.fill(255);
  PNG.bitblt(img, out, 0, 0, img.width, img.height, 0, 0);
  return out;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
await page.goto(`${base}/showcase`, { waitUntil: 'networkidle' });
const rows = [];
for (const f of fs.readdirSync(figDir).filter((n) => n.endsWith('.png')).sort()) {
  const id = f.replace(/\.png$/, '');
  const sel = SELECTOR_OVERRIDE[id] ?? `[data-visual-id="${id}"]`;
  const loc = page.locator(sel).first();
  if ((await loc.count()) === 0) { rows.push({ id, error: 'not in showcase' }); continue; }
  // Snap the element to whole pixels: content above it can leave it on a sub-pixel offset, which blurs text edges.
  await loc.scrollIntoViewIfNeeded();
  // (relative offsets, not transforms: a transform switches Chromium to greyscale anti-aliasing)
  await loc.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const dx = Math.round(r.left) - r.left, dy = Math.round(r.top) - r.top;
    if (dx || dy) {
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.style.left = `${(parseFloat(el.style.left) || 0) + dx}px`;
      el.style.top = `${(parseFloat(el.style.top) || 0) + dy}px`;
    }
  });
  const ours = PNG.sync.read(await loc.screenshot());
  const fig = PNG.sync.read(fs.readFileSync(path.join(figDir, f)));
  const w = Math.max(ours.width, fig.width), h = Math.max(ours.height, fig.height);
  const a = pad(ours, w, h), b = pad(fig, w, h), diff = new PNG({ width: w, height: h });
  const bad = pixelmatch(a.data, b.data, diff.data, w, h, { threshold: 0.15 });
  const sheet = new PNG({ width: w, height: h * 3 + 16 });
  sheet.data.fill(255);
  [a, b, diff].forEach((img, i) => PNG.bitblt(img, sheet, 0, 0, w, h, 0, i * (h + 8)));
  fs.writeFileSync(path.join(outDir, `${id}.png`), PNG.sync.write(sheet));
  rows.push({ id, ours: `${ours.width}x${ours.height}`, figma: `${fig.width}x${fig.height}`, mismatchPct: +(100 * bad / (w * h)).toFixed(2) });
}
await browser.close();
fs.writeFileSync(path.join(outDir, '..', 'components.json'), JSON.stringify(rows, null, 2));
for (const r of rows) console.log(`${String(r.error ?? r.mismatchPct + '%').padStart(8)}  ${r.id.padEnd(22)} ours ${r.ours ?? '-'}  figma ${r.figma ?? '-'}`);
