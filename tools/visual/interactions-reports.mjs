// Click-through of the Reports interactions (local only). node interactions-reports.mjs [baseUrl]
import { expectEq, mainTitle, start, tabLabels } from './check-lib.mjs';

const base = process.argv[2] ?? 'http://localhost:5173';
const { page, check, finish } = await start();
const nav = () => page.locator('nav.slds-nav-vertical');
const rows = () => page.locator('main table tbody tr');

await page.goto(`${base}/lightning/o/Account/list`, { waitUntil: 'networkidle' });

await check('Navigation menu → Reports home (Recent, 2 items)', async () => {
  await page.getByRole('button', { name: 'Show Navigation Menu' }).click();
  await page.getByRole('menuitem', { name: 'Reports' }).click();
  await mainTitle(page, 'Recent');
  expectEq(await rows().count(), 2, 'rows');
});
await check('Left navigation → Public Reports (23) and search filters', async () => {
  await nav().getByText('Public Reports', { exact: true }).click();
  await mainTitle(page, 'Public Reports');
  expectEq(await rows().count(), 23, 'rows (20 captured + 3 report tabs in Public Reports)');
  await page.getByPlaceholder('Search public reports...').fill('Covid');
  expectEq(await rows().count(), 1, 'rows after search');
});
await check('Sort by a column header (Created On)', async () => {
  await page.getByPlaceholder('Search public reports...').fill('');
  await page.locator('main thead th[aria-label="Created On"] a').click();
  expectEq((await rows().first().locator('th').innerText()).trim(), '1/1 Groups to go on Claims Hold', 'oldest first');
});
await check('All Folders opens the "All Folders | Reports" workspace tab', async () => {
  await nav().getByText('All Folders', { exact: true }).click();
  await mainTitle(page, 'All Folders');
  expectEq((await tabLabels(page)).some((t) => t.includes('All Folders | Reports')), true, 'tab');
});
await check('Folder row → folder tab with its 16 reports', async () => {
  await page.locator('main').getByRole('link', { name: 'AH Sales & Marketing', exact: true }).click();
  await mainTitle(page, 'AH Sales & Marketing');
  expectEq(await rows().count(), 16, 'rows');
  expectEq((await tabLabels(page)).some((t) => t.includes('AH Sales & Marketing')), true, 'folder tab');
});
await check('Report row → report tab (body placeholder)', async () => {
  await page.locator('main').getByRole('link', { name: 'AH Accounts and Contacts', exact: true }).click();
  await page.locator('main [role=region][aria-label="AH Accounts and Contacts"]').waitFor();
});
await check('Closing the report tab returns to the folder tab', async () => {
  await page.getByRole('button', { name: 'Close AH Accounts and Contacts' }).click();
  await mainTitle(page, 'AH Sales & Marketing');
});
await check('Row ▼ Delete removes a report from the folder', async () => {
  await page.getByRole('button', { name: 'More actions for USL Employees' }).click();
  await page.getByRole('menuitem', { name: 'Delete' }).click();
  await page.getByRole('dialog', { name: 'Delete Report' }).getByRole('button', { name: 'Delete', exact: true }).click();
  expectEq(await rows().count(), 15, 'rows');
});
await check('New Folder → required label → Save adds the folder', async () => {
  await page.getByRole('button', { name: 'New Folder' }).click();
  const dlg = page.getByRole('dialog', { name: 'New Folder' });
  await dlg.getByRole('button', { name: 'Save' }).click();
  await dlg.getByText('Complete this field.').waitFor();
  await dlg.locator('#name').fill('Claims Ops');
  await dlg.getByRole('button', { name: 'Save' }).click();
  await page.locator('.slds-modal').waitFor({ state: 'detached' });
  await page.locator('.slds-context-bar__item_tab', { hasText: 'All Folders | Reports' }).locator('a').first().click();
  await page.locator('main').getByRole('link', { name: 'Claims Ops' }).waitFor();
});

await finish();
