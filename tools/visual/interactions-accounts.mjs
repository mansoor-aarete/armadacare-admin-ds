// Click-through of every Accounts interaction (local only). node interactions-accounts.mjs [baseUrl]
// Prints PASS / FAIL per check and the console-error count; exits 1 on any failure.
import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:5173';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(String(e)));
let failed = 0;
async function check(name, fn) {
  try {
    await fn();
    console.log(`PASS  ${name}`);
  } catch (e) {
    failed += 1;
    console.log(`FAIL  ${name}\n      ${String(e.message ?? e).split('\n')[0]}`);
  }
}
const expectEq = (a, b, what) => {
  if (a !== b) throw new Error(`${what}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);
};
const table = () => page.locator('table[role=grid]').first();
const rowCount = () => table().locator('tbody tr').count();
const title = async () => (await page.locator('main .slds-page-header__title').first().innerText()).trim();
const tabs = () => page.locator('.slds-context-bar__item.slds-context-bar__item_tab').allInnerTexts();

await page.goto(`${base}/`, { waitUntil: 'networkidle' });

// ── List view ────────────────────────────────────────────────────────────────────────────────
await check('A1 list view shows 22 accounts sorted by Account Name', async () => {
  expectEq(await rowCount(), 22, 'rows');
  expectEq((await table().locator('tbody tr').first().locator('th').innerText()).trim(), 'AGent 1', 'first row');
});
await check('Search this list filters rows ("Gallo" → 3)', async () => {
  await page.getByPlaceholder('Search this list...').first().fill('Gallo');
  expectEq(await rowCount(), 3, 'rows');
  await page.getByPlaceholder('Search this list...').first().fill('');
});
await check('Sort by Account Name toggles to descending', async () => {
  await table().locator('thead th[aria-label="Account Name"] a').first().click();
  expectEq((await table().locator('tbody tr').first().locator('th').innerText()).trim(), 'VS Test', 'first row');
  await table().locator('thead th[aria-label="Account Name"] a').first().click();
});
await check('Row selection and select-all', async () => {
  await table().locator('tbody tr').nth(1).locator('.slds-checkbox__label').click();
  expectEq(await table().locator('tbody tr.slds-is-selected').count(), 1, 'selected rows');
  await table().locator('thead .slds-checkbox__label').click();
  expectEq(await table().locator('tbody tr.slds-is-selected').count(), 22, 'selected rows');
  await table().locator('thead .slds-checkbox__label').click();
  expectEq(await table().locator('tbody tr.slds-is-selected').count(), 0, 'selected rows');
});
await check('List view switching (All Accounts, then back)', async () => {
  await page.getByRole('button', { name: 'Switch list view' }).click();
  await page.getByRole('menuitem', { name: 'All Accounts' }).click();
  await page.waitForURL(/filterName=AllAccounts/);
  await page.locator('main .slds-page-header__title', { hasText: 'All Accounts' }).waitFor();
  await page.getByRole('button', { name: 'Switch list view' }).click();
  await page.getByRole('menuitem', { name: 'Accounts New This Week' }).click();
  await page.waitForURL(/filterName=NewThisWeek/);
});
await check('Row action ▼ → Delete → confirm removes the row', async () => {
  await page.getByRole('button', { name: 'More actions for Test 1501' }).click();
  await page.getByRole('menuitem', { name: 'Delete' }).click();
  await page.getByRole('dialog', { name: 'Delete Account' }).getByRole('button', { name: 'Delete' }).click();
  expectEq(await rowCount(), 21, 'rows');
});

// ── Workspace tabs + record page ────────────────────────────────────────────────────────────
await check('Opening a record opens a workspace tab and the split view', async () => {
  await table().getByRole('link', { name: 'AGent 1' }).click();
  await page.waitForURL(/\/lightning\/r\/Account\/001Ec00002JBm5RIAT\/view/);
  expectEq((await tabs()).some((t) => t.includes('AGent 1 | Account')), true, 'tab');
  await page.locator('.slds-split-view').waitFor();
});
await check('Split view opens a second record tab', async () => {
  await page.locator('.slds-split-view').getByRole('option', { name: /Blalock Development Co/ }).click();
  await page.waitForURL(/001Ec00001fY0zTIAS/);
  await page.locator('.slds-context-bar__item_tab', { hasText: 'Blalock Development Co' }).waitFor();
  expectEq((await tabs()).length, 2, 'tabs');
});
await check('Switching workspace tabs changes the record', async () => {
  await page.locator('.slds-context-bar__item_tab', { hasText: 'AGent 1' }).locator('a').first().click();
  await page.waitForURL(/001Ec00002JBm5RIAT/);
  await page.locator('main .slds-page-header__title', { hasText: 'AGent 1' }).waitFor();
});
await check('Expanding / collapsing a section', async () => {
  const btn = page.getByRole('button', { name: 'Agency Demographics' });
  await btn.click();
  expectEq(await btn.getAttribute('aria-expanded'), 'false', 'collapsed');
  await btn.click();
  expectEq(await btn.getAttribute('aria-expanded'), 'true', 'expanded');
});
await check('Switching record tabs (Related → Details)', async () => {
  await page.getByRole('tab', { name: 'Related' }).click();
  expectEq(await page.getByRole('tab', { name: 'Related' }).getAttribute('aria-selected'), 'true', 'related');
  await page.getByRole('tab', { name: 'Details' }).click();
});
await check('Inline edit: pencil → input → Save updates the value', async () => {
  await page.getByRole('button', { name: 'Edit: Doing Business As' }).click();
  await page.locator('#doingBusinessAs').fill('AGent One Holdings');
  await page.locator('.slds-docked-form-footer').getByRole('button', { name: 'Save' }).click();
  await page.getByText('AGent One Holdings').waitFor();
});
await check('Inline edit validation: empty Account Name → error + "We hit a snag."', async () => {
  await page.getByRole('button', { name: 'Edit: Account Name' }).click();
  await page.locator('#accountName').fill('');
  await page.locator('.slds-docked-form-footer').getByRole('button', { name: 'Save' }).click();
  await page.getByText('We hit a snag.').waitFor();
  await page.getByText('Complete this field.').first().waitFor();
  await page.locator('.slds-docked-form-footer').getByRole('button', { name: 'Cancel' }).click();
  expectEq(await title(), 'AGent 1', 'name unchanged');
});
await check('Highlights Delete opens the confirm modal; Cancel closes it', async () => {
  await page.locator('.slds-page-header').getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('dialog', { name: 'Delete Account' }).waitFor();
  await page.getByRole('dialog').getByRole('button', { name: 'Cancel', exact: true }).click();
  await page.locator('.slds-modal').waitFor({ state: 'detached' });
});
await check('Sharing modal: required picklists, Save closes', async () => {
  await page.locator('.slds-page-header').getByRole('button', { name: 'Sharing' }).click();
  const dlg = page.getByRole('dialog', { name: 'Share' });
  await dlg.getByText('Shared with 5 groups of users.').waitFor();
  await dlg.getByRole('button', { name: 'Save' }).click();
  await page.locator('.slds-modal').waitFor({ state: 'detached' });
});
await check('Overflow ▼ menu opens (Broker Agency actions)', async () => {
  await page.locator('.slds-page-header').getByRole('button', { name: 'Show more actions' }).click();
  await page.getByRole('menuitem', { name: 'Edit' }).waitFor();
  await page.keyboard.press('Escape');
});
await check('Hierarchy icon opens the "Account Hierarchy" sub-tab with the current badge', async () => {
  await page.locator('.slds-context-bar__item_tab', { hasText: 'Blalock' }).locator('a').first().click();
  await page.getByRole('button', { name: 'View Hierarchy' }).click();
  await page.waitForURL(/hierarchy/);
  await page.getByText('current', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Close Account Hierarchy' }).click();
  await page.waitForURL(/001Ec00001fY0zTIAS\/view/);
});
await check('Closing a workspace tab', async () => {
  await page.getByRole('button', { name: /^Close Blalock Development Co \| Account$/ }).click();
  expectEq((await tabs()).length, 1, 'tabs');
});

// ── New record ──────────────────────────────────────────────────────────────────────────────
await check('New → record type picker → form → validation → Save opens the new record', async () => {
  await page.goto(`${base}/lightning/o/Account/list`, { waitUntil: 'networkidle' });
  await page.locator('.slds-page-header').getByRole('button', { name: 'New', exact: true }).click();
  await page.getByText('Select a record type').waitFor({ state: 'attached' });
  await page.getByText('Broker Agency', { exact: true }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('heading', { name: 'New Account: Broker Agency' }).waitFor();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.getByText('We hit a snag.').waitFor();
  await page.locator('#accountName').fill('Aarete Test Agency');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForURL(/\/lightning\/r\/Account\/001Ec0000NEW/);
  await page.locator('main .slds-page-header__title', { hasText: 'Aarete Test Agency' }).waitFor();
  expectEq((await tabs()).some((t) => t.includes('Aarete Test Agency | Account')), true, 'tab replaced');
});
await check('Delete from the record page deletes the record and closes its tab', async () => {
  await page.locator('.slds-page-header').getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('dialog', { name: 'Delete Account' }).getByRole('button', { name: 'Delete', exact: true }).click();
  await page.waitForURL(/\/list/);
  expectEq((await tabs()).some((t) => t.includes('Aarete Test Agency')), false, 'tab closed');
  expectEq(await table().getByText('Aarete Test Agency').count(), 0, 'row gone');
});
await check('Cancel on the record type picker closes its tab', async () => {
  await page.goto(`${base}/lightning/o/Account/new`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.waitForURL(/\/list/);
});

// ── Intelligence view ───────────────────────────────────────────────────────────────────────
await check('Intelligence View: tiles, empty state, back to List View', async () => {
  await page.goto(`${base}/lightning/o/Account/intelligence`, { waitUntil: 'networkidle' });
  await page.getByText('Get your accounts engaged').waitFor();
  await page.getByRole('button', { name: /With Opportunities/ }).click();
  await page.getByText('0 items • Filtered by Last Activity, Me, With Opportunities').waitFor();
  await page.getByRole('button', { name: 'List View', exact: true }).click();
  await page.waitForURL(/\/list/);
});

console.log(`\nconsole errors: ${errors.length}${errors.length ? '\n' + errors.slice(0, 5).join('\n') : ''}`);
console.log(failed ? `${failed} check(s) FAILED` : 'all checks passed');
await browser.close();
process.exit(failed || errors.length ? 1 : 0);
