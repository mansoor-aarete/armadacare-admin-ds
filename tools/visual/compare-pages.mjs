// Full-page pixel diff of built screens against the Figma frames (local only — not part of Figma Make).
//   node compare-pages.mjs [baseUrl] [outDir] [idFilter]
// Each screen is opened with ?scenario=<id> at the Figma frame width (1920), driven into the captured state with
// Playwright steps, screenshotted at the frame height, and compared with pixelmatch (threshold 0.15) at the
// resolution of the Figma PNG (large frames were exported scaled down).
// Capture glitch handled: frames with `band` contain a blank 35 px band under the global header (docs/known-differences);
// our screenshot is taken 35 px shorter and the Figma band rows are spliced in, so the band itself never counts.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const [baseUrl = 'http://localhost:5173', outDir = 'output-pages', idFilter = ''] = process.argv.slice(2);
const FIG = path.join(path.dirname(fileURLToPath(import.meta.url)), 'figma', 'pages');
const BAND_TOP = 97;
const BAND = 35;

/** Steps run before the screenshot (Playwright page). */
const STEPS = {
  // Test-only: Figma captured modals in a 911 px browser window and stitched the page below, so the fixed SLDS modal
  // sits in the top 911 px of the frame, not in the middle of the 3,348 px page. Emulate that window for the modal.
  captureWindow: async (p) => p.addStyleTag({ content: '.slds-modal { height: 911px; bottom: auto; }' }),
  focusSearch: async (p) => p.getByPlaceholder('Search User...').focus(),
  saveWithErrors: async (p) => {
    await p.getByRole('button', { name: 'Save', exact: true }).click();
    await p.locator('.slds-modal__content').evaluate((el) => {
      const section = [...el.querySelectorAll('.slds-section__title')].find((t) => t.textContent.includes('Background Information'));
      if (section) el.scrollTop = section.offsetTop - el.offsetTop + 260;
    });
  },
  blurAccountName: async (p) => {
    await p.locator('#accountName').focus();
    await p.locator('#accountName').blur();
  },
  openOverflow: async (p) => p.locator('.slds-page-header').getByRole('button', { name: /more actions/i }).first().click(),
};

export const SCREENS = [
  // A1 mask: the table header row is blank in the capture (labels only in layer names — known-differences KD30).
  { id: 'A1', node: '2-41037', band: true, masks: [[0, 270, 1920, 38]] },
  { id: 'A2', node: '2-42291', band: true, step: ['captureWindow'] },
  { id: 'A3', node: '2-44211', band: true, step: ['captureWindow', 'focusSearch'] },
  { id: 'A4', node: '2-46225', band: true },
  { id: 'A5', node: '2-48122', band: true, step: 'saveWithErrors' },
  { id: 'A6', node: '2-51331', band: true, step: 'blurAccountName' },
  { id: 'A7', node: '2-54505', band: true },
  { id: 'A8', node: '2-55068', band: true },
  { id: 'A9', node: '2-55718', band: true, step: 'openOverflow' },
  { id: 'D1', node: '2-5437', band: false },
];

/** Area-average resample to w × h. */
function resample(src, w, h) {
  const dst = new PNG({ width: w, height: h });
  const sx = src.width / w;
  const sy = src.height / h;
  for (let y = 0; y < h; y++) {
    const y0 = y * sy;
    const y1 = Math.min(src.height, (y + 1) * sy);
    for (let x = 0; x < w; x++) {
      const x0 = x * sx;
      const x1 = Math.min(src.width, (x + 1) * sx);
      const acc = [0, 0, 0, 0];
      let total = 0;
      for (let yy = Math.floor(y0); yy < Math.ceil(y1); yy++) {
        const wy = Math.min(yy + 1, y1) - Math.max(yy, y0);
        for (let xx = Math.floor(x0); xx < Math.ceil(x1); xx++) {
          const wgt = wy * (Math.min(xx + 1, x1) - Math.max(xx, x0));
          const i = (yy * src.width + xx) * 4;
          for (let k = 0; k < 4; k++) acc[k] += src.data[i + k] * wgt;
          total += wgt;
        }
      }
      const o = (y * w + x) * 4;
      for (let k = 0; k < 4; k++) dst.data[o + k] = Math.round(acc[k] / total);
    }
  }
  return dst;
}

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const results = [];
for (const s of SCREENS.filter((x) => !idFilter || idFilter.split(',').includes(x.id))) {
  const fig = PNG.sync.read(fs.readFileSync(path.join(FIG, `${s.node}.png`)));
  const scale = fig.width / 1920;
  const frameH = Math.round(fig.height / scale);
  const page = await browser.newPage({ viewport: { width: 1920, height: frameH - (s.band ? BAND : 0) } });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(`${baseUrl}/lightning/o/Account/list?scenario=${s.id}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  for (const step of [s.step ?? []].flat()) {
    await STEPS[step](page);
    await page.waitForTimeout(300);
  }
  const shot = PNG.sync.read(await page.screenshot());
  await page.close();

  // Splice the Figma band in (at 1920 scale) so the capture glitch is ignored.
  let ours = shot;
  if (s.band) {
    ours = new PNG({ width: 1920, height: frameH });
    PNG.bitblt(shot, ours, 0, 0, 1920, BAND_TOP, 0, 0);
    PNG.bitblt(shot, ours, 0, BAND_TOP, 1920, shot.height - BAND_TOP, 0, BAND_TOP + BAND);
  }
  const small = scale === 1 ? ours : resample(ours, fig.width, fig.height);
  if (s.band) {
    const y0 = Math.round(BAND_TOP * scale);
    const y1 = Math.round((BAND_TOP + BAND) * scale);
    PNG.bitblt(fig, small, 0, y0, fig.width, y1 - y0, 0, y0);
  }
  // Masks (Figma px): capture-glitch regions listed in docs/known-differences.md — Figma pixels copied into ours.
  for (const [mx, my, mw, mh] of s.masks ?? []) PNG.bitblt(fig, small, mx, my, mw, mh, mx, my);
  const w = fig.width;
  const h = Math.min(fig.height, small.height);
  const diff = new PNG({ width: w, height: h });
  const crop = (img) => {
    const c = new PNG({ width: w, height: h });
    PNG.bitblt(img, c, 0, 0, w, h, 0, 0);
    return c;
  };
  const a = crop(fig);
  const b = crop(small);
  const n = pixelmatch(a.data, b.data, diff.data, w, h, { threshold: 0.15 });
  const pct = (100 * n) / (w * h);
  fs.writeFileSync(path.join(outDir, `${s.id}-ours.png`), PNG.sync.write(b));
  fs.writeFileSync(path.join(outDir, `${s.id}-diff.png`), PNG.sync.write(diff));
  results.push({ id: s.id, pct: +pct.toFixed(2), size: `${w}x${h}`, scale: +scale.toFixed(3), consoleErrors: errors.length });
  console.log(`${pct.toFixed(2).padStart(6)}%  ${s.id}  figma ${s.node} ${w}x${h} (×${scale.toFixed(3)})  console errors: ${errors.length}`);
}
await browser.close();
fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(results, null, 1));
