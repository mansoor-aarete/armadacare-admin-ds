// Click-through of the Card Transactions interactions (local only). node interactions-cardtransactions.mjs [baseUrl]
import { expectEq, mainTitle, start } from './check-lib.mjs';

const base = process.argv[2] ?? 'http://localhost:5173';
const { page, check, finish } = await start();

await page.goto(`${base}/lightning/o/Account/list`, { waitUntil: 'networkidle' });

await check('Navigation menu → Card Transactions → open CTX-0000000', async () => {
  await page.getByRole('button', { name: 'Show Navigation Menu' }).click();
  await page.getByRole('menuitem', { name: 'Card Transactions' }).click();
  await page.locator('main table').getByRole('link', { name: 'CTX-0000000', exact: true }).click();
  await mainTitle(page, 'CTX-0000000');
});
await check('Details tab is active; six sections, header-only ones empty', async () => {
  expectEq(await page.getByRole('tab', { name: 'Details' }).getAttribute('aria-selected'), 'true', 'Details active');
  for (const s of ['Information', 'Amounts', 'Merchant & Description', 'Adjudication & Status', 'Participant & Receipt Info', 'System Information']) {
    await page.getByRole('button', { name: s, exact: true }).waitFor();
  }
});
await check('Collapse "Amounts" and "Information"', async () => {
  await page.getByRole('button', { name: 'Information', exact: true }).click();
  expectEq(await page.getByText('Debit Card Token', { exact: true }).isVisible(), false, 'Information collapsed');
  await page.getByRole('button', { name: 'Information', exact: true }).click();
});
await check('Inline edit Card Number → Save', async () => {
  await page.getByRole('button', { name: 'Edit: Card Number' }).click();
  await page.locator('#cardNumber').fill('****-****-****-1234');
  await page.locator('.slds-docked-form-footer').getByRole('button', { name: 'Save' }).click();
  await page.getByText('****-****-****-1234').waitFor();
});
await check('Highlights has only the ▼ menu (Edit · Delete · Sharing · Printable View)', async () => {
  const header = page.locator('main .slds-page-header').first();
  await header.getByRole('button', { name: 'Show more actions' }).click();
  expectEq((await page.getByRole('menuitem').allInnerTexts()).map((t) => t.trim()).join(' · '), 'Edit · Delete · Sharing · Printable View', 'menu');
  await page.keyboard.press('Escape');
});
await check('Claimant link opens the contact', async () => {
  await page.locator('main').getByRole('link', { name: 'David Chen' }).first().click();
  await mainTitle(page, 'David Chen');
});

await finish();
