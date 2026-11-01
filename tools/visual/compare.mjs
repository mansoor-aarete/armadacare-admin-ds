// Compares showcase icon renders with the Figma vector exports of the same icons.
// Usage: node compare.mjs [outDir]   (run capture.mjs first)
// Method: render the Figma SVG in Chromium; convert both images to an ink mask (luminance < 200);
// crop each to its ink bounding box; scale both to 128×128 (nearest); pixelmatch the masks.
// Writes output/icon-compare.png (side-by-side sheet) and output/icon-compare.json.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const outDir = path.resolve(process.argv[2] ?? 'output');
const figmaDir = path.resolve('figma', 'icons');
const MAP = JSON.parse(fs.readFileSync(path.resolve('figma', 'icon-map.json'), 'utf8')); // { "rows": "hdr-toggle-panel", ... }
const N = 128;

function mask(png) {
  const { width, height, data } = png;
  const m = new Uint8Array(width * height);
  let x0 = width, y0 = height, x1 = -1, y1 = -1;
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4;
    const a = data[i + 3] / 255;
    const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) * a + 255 * (1 - a);
    if (lum < 200) { m[y * width + x] = 1; x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  }
  return { m, width, x0, y0, x1, y1 };
}
function normalise(png) {
  const { m, width, x0, y0, x1, y1 } = mask(png);
  const out = new PNG({ width: N, height: N });
  const w = x1 - x0 + 1, h = y1 - y0 + 1, s = Math.max(w, h);
  const ox = x0 - (s - w) / 2, oy = y0 - (s - h) / 2; // keep aspect ratio, centre in square
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const sx = Math.floor(ox + (x + 0.5) * s / N), sy = Math.floor(oy + (y + 0.5) * s / N);
    const ink = sx >= 0 && sy >= 0 && sx < width && sy < png.height && m[sy * width + sx];
    const i = (y * N + x) * 4;
    out.data[i] = out.data[i + 1] = out.data[i + 2] = ink ? 0 : 255; out.data[i + 3] = 255;
  }
  return out;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 400, height: 400 } });
const rows = [];
for (const [icon, figmaName] of Object.entries(MAP)) {
  const ours = path.join(outDir, 'elements', `compare-${icon}@4x.png`);
  const figSvg = path.join(figmaDir, `${figmaName}.svg`);
  if (!fs.existsSync(ours) || !fs.existsSync(figSvg)) { rows.push({ icon, figmaName, error: 'missing input' }); continue; }
  // Some Figma glyphs are white-on-colour (global "+" action, error popover header) — force ink to black.
  const svg = fs.readFileSync(figSvg, 'utf8')
    .replace(/<svg[^>]*>/, (m) => m.replace(/\s(width|height|style|preserveAspectRatio)="[^"]*"/g, '').replace('<svg', '<svg width="192" height="192"'))
    .replace(/(<(?:path|circle|rect|polygon|ellipse)\b[^>]*?)\sfill="(?!none)[^"]*"/g, '$1 fill="black"');
  await page.setContent(`<body style="margin:0;background:#fff">${svg}</body>`);
  const figPng = PNG.sync.read(await page.locator('svg').screenshot());
  const a = normalise(PNG.sync.read(fs.readFileSync(ours)));
  const b = normalise(figPng);
  const diff = new PNG({ width: N, height: N });
  const bad = pixelmatch(a.data, b.data, diff.data, N, N, { threshold: 0.1 });
  rows.push({ icon, figmaName, mismatchPct: +(100 * bad / (N * N)).toFixed(2), a, b, diff });
}
await browser.close();

// Side-by-side sheet: ours | figma | diff per row
const ok = rows.filter((r) => !r.error);
const sheet = new PNG({ width: N * 3 + 40, height: ok.length * (N + 8) });
sheet.data.fill(255);
ok.forEach((r, k) => [r.a, r.b, r.diff].forEach((img, c) => PNG.bitblt(img, sheet, 0, 0, N, N, c * (N + 20), k * (N + 8))));
fs.writeFileSync(path.join(outDir, 'icon-compare.png'), PNG.sync.write(sheet));
const summary = rows.map(({ icon, figmaName, mismatchPct, error }) => ({ icon, figmaName, mismatchPct, error }));
fs.writeFileSync(path.join(outDir, 'icon-compare.json'), JSON.stringify(summary, null, 2));
for (const r of summary) console.log(`${(r.error ?? r.mismatchPct + '%').toString().padStart(8)}  utility:${r.icon}  vs figma ${r.figmaName}`);
