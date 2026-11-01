// Click-through of the Plan Years interactions (local only). node interactions-planyears.mjs [baseUrl]
import { expectEq, mainTitle, start, tabLabels } from './check-lib.mjs';

const base = process.argv[2] ?? 'http://localhost:5173';
const { page, check, finish } = await start();
const header = () => page.locator('main .slds-page-header').first();

await page.goto(`${base}/lightning/o/Account/list`, { waitUntil: 'networkidle' });

await check('Navigation menu → Plan Years list view (27 rows)', async () => {
  await page.getByRole('button', { name: 'Show Navigation Menu' }).click();
  await page.getByRole('menuitem', { name: 'Plan Years' }).click();
  await mainTitle(page, 'All');
  expectEq(await page.locator('main table tbody tr').count(), 27, 'rows');
});
await check('Open 2026 Meridian → Related tab with Plan Year History (6+)', async () => {
  await page.locator('main table').getByRole('link', { name: '2026 Meridian', exact: true }).click();
  await mainTitle(page, '2026 Meridian');
  await page.getByText('Plan Year History (6+)').waitFor();
  expectEq(await page.locator('main table tbody tr').count(), 6, 'history rows');
});
await check('Details tab shows the captured values', async () => {
  await page.getByRole('tab', { name: 'Details' }).click();
  await page.getByText('$15,500.00').waitFor();
  await page.getByText('Ultimate Health Diamond').first().waitFor();
});
await check('Inline edit Run Out Days → Save', async () => {
  await page.getByRole('button', { name: 'Edit: Run Out Days' }).click();
  await page.locator('#runOutDays').fill('45');
  await page.locator('.slds-docked-form-footer').getByRole('button', { name: 'Save' }).click();
  await page.locator('main').getByText('45', { exact: true }).waitFor();
});
await check('Clone → opens "2026 Meridian Copy" in a new tab', async () => {
  await header().getByRole('button', { name: 'Clone' }).click();
  await mainTitle(page, '2026 Meridian Copy');
  expectEq((await tabLabels(page)).some((t) => t.includes('2026 Meridian Copy')), true, 'tab');
});
await check('Delete the copy → its tab closes', async () => {
  await header().getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('dialog', { name: 'Delete Plan Year' }).getByRole('button', { name: 'Delete', exact: true }).click();
  await page.locator('.slds-modal').waitFor({ state: 'detached' });
  expectEq((await tabLabels(page)).some((t) => t.includes('2026 Meridian Copy')), false, 'tab closed');
});
await check('Split view: open another plan year', async () => {
  await page.locator('.slds-split-view').getByRole('option', { name: /2026 Double Platinum/ }).click();
  await mainTitle(page, '2026 Double Platinum');
});
await check('New (no record types) → form → required name → Save opens the record', async () => {
  await page.goto(`${base}/lightning/o/PlanYear/new`, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'New Plan Year' }).waitFor();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.getByText('We hit a snag.').waitFor();
  await page.locator('#name').fill('2028 Meridian');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await mainTitle(page, '2028 Meridian');
});

await finish();
