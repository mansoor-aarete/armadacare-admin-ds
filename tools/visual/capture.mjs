// Captures the /showcase page with Playwright (Chromium).
// Usage: node capture.mjs [baseUrl] [outDir]
//   baseUrl default http://localhost:5199   outDir default ./output
// Writes: showcase-full.png, one PNG per [data-visual-id] element, checks.json (environment checks +
// computed token values compared with the Figma values below).
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:5199';
const outDir = path.resolve(process.argv[3] ?? 'output');
fs.mkdirSync(path.join(outDir, 'elements'), { recursive: true });

// Exact values read from Figma with get_design_context (docs/inventory.md §2). Lower-case for comparison.
const FIGMA_TOKENS = {
  '--ac-color-brand': '#57612d',
  '--ac-color-brand-base': '#8b9a4c',
  '--ac-color-brand-base-tint': 'rgba(139, 154, 76, 0.1)',
  '--slds-g-color-neutral-base-10': '#181818',
  '--slds-g-color-neutral-base-30': '#444444',
  '--slds-g-color-border-base-4': '#747474',
  '--slds-g-color-border-base-1': '#c9c9c9',
  '--slds-g-color-neutral-base-95': '#f3f3f3',
  '--slds-g-color-error-base-40': '#ba0517',
  '--slds-g-color-error-base-30': '#8e030f',
};

const browser = await chromium.launch();
const results = {};
for (const [label, dsf] of [['1x', 1], ['4x', 4]]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: dsf });
  const consoleErrors = [];
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
  await page.goto(`${base}/showcase`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-visual-id="environment-checks"][data-all-pass]');
  if (dsf === 1) {
    results.url = page.url();
    results.consoleErrors = consoleErrors;
    results.environment = await page.$$eval('[data-check]', (els) =>
      els.map((e) => ({ id: e.getAttribute('data-check'), pass: e.getAttribute('data-pass') === 'true', text: e.textContent })),
    );
    results.tokens = await page.evaluate((expected) => {
      const cs = getComputedStyle(document.documentElement);
      return Object.entries(expected).map(([token, figma]) => {
        const actual = cs.getPropertyValue(token).trim().toLowerCase();
        return { token, figma, actual, match: actual === figma };
      });
    }, FIGMA_TOKENS);
    await page.screenshot({ path: path.join(outDir, 'showcase-full.png'), fullPage: true });
  }
  const ids = await page.$$eval('[data-visual-id]', (els) => els.map((e) => e.getAttribute('data-visual-id')));
  for (const id of ids) {
    if (id.startsWith('fig-')) continue; // Figma comparison blocks are captured by compare-components.mjs
    const isIcon = id.startsWith('compare-');
    if ((dsf === 4) !== isIcon) continue; // icons at 4x, sections at 1x
    const el = page.locator(`[data-visual-id="${id}"]`).first();
    await el.screenshot({ path: path.join(outDir, 'elements', `${id.replace(/[^a-z0-9_-]/gi, '_')}@${label}.png`) });
  }
  await page.close();
}
await browser.close();
fs.writeFileSync(path.join(outDir, 'checks.json'), JSON.stringify(results, null, 2));
const envPass = results.environment.every((c) => c.pass);
const tokPass = results.tokens.every((t) => t.match);
console.log(`environment checks: ${results.environment.filter((c) => c.pass).length}/${results.environment.length} pass`);
for (const c of results.environment) console.log(`  ${c.text}`);
console.log(`tokens vs Figma: ${results.tokens.filter((t) => t.match).length}/${results.tokens.length} match`);
for (const t of results.tokens) console.log(`  ${t.match ? 'OK  ' : 'DIFF'} ${t.token}: figma ${t.figma} / actual ${t.actual}`);
console.log(`console errors: ${results.consoleErrors.length}`);
process.exit(envPass && tokPass && results.consoleErrors.length === 0 ? 0 : 1);
