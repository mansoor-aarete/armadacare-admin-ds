// Click-through of the Portal Informations interactions (local only). node interactions-portalinfo.mjs [baseUrl]
import { expectEq, mainTitle, start } from './check-lib.mjs';

const base = process.argv[2] ?? 'http://localhost:5173';
const { page, check, finish } = await start();

await page.goto(`${base}/lightning/o/Account/list`, { waitUntil: 'networkidle' });

await check('Navigation menu → Portal Informations → open "Portal Info Name 1"', async () => {
  await page.getByRole('button', { name: 'Show Navigation Menu' }).click();
  await page.getByRole('menuitem', { name: 'Portal Informations' }).click();
  await page.locator('main table').getByRole('link', { name: 'Portal Info Name 1' }).first().click();
  await mainTitle(page, 'Portal Info Name 1');
  await page.getByText('9/8/2026 12:00 PM').waitFor();
});
await check('Split view shows multi-line items (title right, message + severity)', async () => {
  const item = page.locator('.slds-split-view [role=option]', { hasText: 'Portal Infor message' });
  await item.getByText('Success').waitFor();
});
await check('Inline edit Start Time (date + time) → Save', async () => {
  await page.getByRole('button', { name: 'Edit: Start Time' }).click();
  const time = page.locator('fieldset#startTime').getByRole('combobox', { name: 'Time' });
  await time.fill('1:00 PM');
  await time.press('Enter');
  await page.locator('.slds-docked-form-footer').getByRole('button', { name: 'Save' }).click();
  await page.getByText('9/8/2026 1:00 PM').waitFor();
});
await check('Inline edit Is Dismissible (checkbox) → Save', async () => {
  await page.getByRole('button', { name: 'Edit: Is Dismissible' }).click();
  await page.locator('label.slds-checkbox__label[for="isDismissible"]').click();
  expectEq(await page.locator('#isDismissible').isChecked(), false, 'unchecked');
  await page.locator('.slds-docked-form-footer').getByRole('button', { name: 'Save' }).click();
  await page.locator('.slds-docked-form-footer').waitFor({ state: 'detached' });
});
await check('New Portal Information → form with defaults → Save', async () => {
  await page.goto(`${base}/lightning/o/PortalInformation/list`, { waitUntil: 'networkidle' });
  await page.locator('main .slds-page-header').getByRole('button', { name: 'New', exact: true }).click();
  await page.getByRole('heading', { name: 'New Portal Information' }).waitFor();
  await page.locator('#name').fill('Maintenance Notice');
  await page.locator('#title').fill('Scheduled maintenance');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await mainTitle(page, 'Maintenance Notice');
  await page.locator('main').getByText('Dashboard').waitFor();
});

await finish();
