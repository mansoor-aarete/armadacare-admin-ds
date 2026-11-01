// Click-through of the Plan Year Enrollments interactions (local only). node interactions-enrollments.mjs [baseUrl]
import { expectEq, mainTitle, start } from './check-lib.mjs';

const base = process.argv[2] ?? 'http://localhost:5173';
const { page, check, finish } = await start();
const members = () => page.locator('article', { hasText: 'Plan Year Enrollment Members' }).locator('tbody tr');

await page.goto(`${base}/lightning/o/Account/list`, { waitUntil: 'networkidle' });

await check('Navigation menu → Plan Year Enrollments → open PYE-0000001 (split view without search)', async () => {
  await page.getByRole('button', { name: 'Show Navigation Menu' }).click();
  await page.getByRole('menuitem', { name: 'Plan Year Enrollments' }).click();
  await page.locator('main table').getByRole('link', { name: 'PYE-0000001', exact: true }).click();
  await mainTitle(page, 'PYE-0000001');
  expectEq(await page.locator('.slds-split-view').getByPlaceholder('Search this list...').count(), 0, 'search box');
});
await check('Members related list: 2 rows, meta line, selection', async () => {
  expectEq(await members().count(), 2, 'rows');
  await page.getByText(/^2 items • Updated/).waitFor();
  await members().first().locator('.slds-checkbox__label').click();
  expectEq(await page.locator('article tbody tr.slds-is-selected').count(), 1, 'selected rows');
});
await check('New member (form, required Member) → Members (3)', async () => {
  await page.locator('article', { hasText: 'Plan Year Enrollment Members' }).getByRole('button', { name: 'New', exact: true }).click();
  const dlg = page.getByRole('dialog', { name: 'New Plan Year Enrollment Member' });
  await dlg.getByRole('button', { name: 'Save' }).click();
  await dlg.getByText('Complete this field.').waitFor();
  await dlg.getByPlaceholder('Search Contacts...').fill('Carlos');
  await page.getByRole('option', { name: /Carlos Martinez/ }).click();
  await dlg.getByRole('button', { name: 'Save' }).click();
  await page.getByText('Plan Year Enrollment Members (3)').waitFor();
});
await check('Row ▼ Delete with confirmation → Members (2)', async () => {
  await members().last().getByRole('button').last().click();
  await page.getByRole('menuitem', { name: 'Delete' }).click();
  await page.getByRole('dialog', { name: 'Delete Plan Year Enrollment Member' }).getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByText('Plan Year Enrollment Members (2)').waitFor();
});
await check('Lookup link opens the subscriber contact', async () => {
  await members().first().getByRole('link', { name: 'Sofia Martinez' }).first().click();
  await mainTitle(page, 'Sofia Martinez');
});
await check('PYE-0000114: Terminated, members (0)', async () => {
  await page.goto(`${base}/lightning/r/PlanYearEnrollment/a1EEc00000PYE00114/view`, { waitUntil: 'networkidle' });
  await mainTitle(page, 'PYE-0000114');
  await page.getByText('Plan Year Enrollment Members (0)').waitFor();
  await page.locator('main').getByText('Terminated').waitFor();
});

await finish();
