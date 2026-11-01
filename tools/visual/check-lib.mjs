// Shared helpers for the Playwright click-throughs (local only).
import { chromium } from 'playwright';

export async function start(viewport = { width: 1920, height: 1080 }) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  let failed = 0;
  let passed = 0;
  async function check(name, fn) {
    try {
      await fn();
      passed += 1;
      console.log(`PASS  ${name}`);
    } catch (e) {
      failed += 1;
      console.log(`FAIL  ${name}\n      ${String(e.message ?? e).split('\n').slice(0, 4).join(' / ')}`);
    }
  }
  async function finish() {
    console.log(`\n${passed} passed, ${failed} failed · console errors: ${errors.length}${errors.length ? '\n' + errors.slice(0, 5).join('\n') : ''}`);
    await browser.close();
    process.exit(failed || errors.length ? 1 : 0);
  }
  return { browser, page, errors, check, finish };
}

export const expectEq = (a, b, what) => {
  if (a !== b) throw new Error(`${what}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);
};

/** Record / page title in the workspace (not the split view's list title). */
export const mainTitle = (page, text) => page.locator('main .slds-page-header__title', { hasText: text }).first().waitFor();
export const tabLabels = (page) => page.locator('.slds-context-bar__item.slds-context-bar__item_tab').allInnerTexts();
