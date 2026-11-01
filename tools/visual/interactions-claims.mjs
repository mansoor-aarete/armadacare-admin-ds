// Click-through of the Claims interactions (local only). node interactions-claims.mjs [baseUrl]
import { expectEq, mainTitle, start, tabLabels } from './check-lib.mjs';

const base = process.argv[2] ?? 'http://localhost:5173';
const { page, check, finish } = await start({ width: 1920, height: 1200 });
const CLM_20 = '/lightning/r/Claim/a0CEc00000000020AA/view';
const header = () => page.locator('main .slds-page-header').first();
const split = () => page.locator('.slds-split-view');

await page.goto(`${base}/lightning/o/Account/list`, { waitUntil: 'networkidle' });

await check('Navigation menu → Claims: split-view home, empty workspace, "50+ items", no search box', async () => {
  await page.getByRole('button', { name: 'Show Navigation Menu' }).click();
  await page.getByRole('menuitem', { name: 'Claims' }).click();
  await page.waitForURL(/\/lightning\/o\/Claim\/list/);
  await split().getByText(/^50\+ items/).waitFor();
  expectEq(await split().getByPlaceholder('Search this list...').count(), 0, 'search box');
  expectEq(await page.locator('main').innerText(), '', 'workspace content');
});
await check('Split item opens CLM-0000023 with the pending actions (Approve · Deny · RMI · Split Approval · ▼)', async () => {
  await split().getByRole('option', { name: /CLM-0000023/ }).click();
  await mainTitle(page, 'CLM-0000023');
  for (const a of ['Approve', 'Deny', 'RMI', 'Split Approval']) await header().getByRole('button', { name: a, exact: true }).waitFor();
  expectEq(await header().getByRole('button', { name: 'Delete', exact: true }).count(), 0, 'Delete hidden');
});
await check('Default state: Benefit Snapshot shows no back-end error', async () => {
  expectEq(await page.getByText("No such column 'Subject_To_Deductible__c'", { exact: false }).count(), 0, 'error');
});
await check('Audit & System tab shows its three sections', async () => {
  await page.getByRole('tab', { name: 'Audit & System' }).click();
  for (const s of ['Additional Information', 'System Information', 'SLA & Routing']) await page.getByRole('button', { name: s, exact: true }).waitFor();
  await page.getByRole('tab', { name: 'Details' }).click();
});
await check('Upload a file → Files (1)', async () => {
  await page.locator('input[type=file]').first().setInputFiles({ name: 'receipt.pdf', mimeType: 'application/pdf', buffer: Buffer.from('x'.repeat(2048)) });
  await page.getByText('Files (1)').waitFor();
  await page.getByText('receipt', { exact: true }).waitFor();
});
await check('Notes New → composer → Done → Notes (1)', async () => {
  await page.locator('article', { hasText: 'Notes (0)' }).getByRole('button', { name: 'New' }).click();
  await page.locator('.slds-docked-composer').getByLabel('Title').fill('Claim follow-up');
  await page.locator('.slds-docked-composer').getByRole('button', { name: 'Done' }).click();
  await page.getByText('Notes (1)').waitFor();
});
await check('Approve → status Approved → actions switch to Split Approval · Repayment Recovery · Delete', async () => {
  await header().getByRole('button', { name: 'Approve', exact: true }).click();
  await header().getByRole('button', { name: 'Repayment Recovery' }).waitFor();
  await header().getByRole('button', { name: 'Delete', exact: true }).waitFor();
  await split().getByRole('option', { name: /CLM-0000023.*Approved/ }).waitFor();
});
await check('Repayment Recovery message modal → Close', async () => {
  await header().getByRole('button', { name: 'Repayment Recovery' }).click();
  await page.getByRole('dialog', { name: 'Repayment Recovery' }).getByText('not available yet').waitFor();
  await page.getByRole('dialog').getByRole('button', { name: 'Close', exact: true }).click();
  await page.locator('.slds-modal').waitFor({ state: 'detached' });
});
await check('Split Approval: allocate $350 → remaining $0.00 → Submit Split', async () => {
  await page.goto(`${base}${CLM_20}`, { waitUntil: 'networkidle' });
  await header().getByRole('button', { name: 'Split Approval' }).click();
  const dlg = page.getByRole('dialog');
  await dlg.getByText('$350.00 / 100%').first().waitFor();
  expectEq(await dlg.getByRole('button', { name: 'Submit Split' }).isDisabled(), true, 'Submit disabled before allocating');
  await dlg.getByLabel('Amount ($)').nth(0).fill('250');
  await dlg.getByLabel('Amount ($)').nth(2).fill('100');
  await dlg.getByText('$0.00 / 0%').first().waitFor();
  await dlg.getByLabel('Reason codes (select one or more)').first().selectOption(['Duplicate']);
  await dlg.getByLabel('Amount ($)').nth(3).fill('100');
  await dlg.getByRole('button', { name: 'Add Reason' }).first().click();
  await dlg.getByText('Duplicate — $100.00').waitFor();
  await dlg.getByRole('button', { name: 'Submit Split' }).click();
  await page.locator('.slds-modal').waitFor({ state: 'detached' });
  await split().getByRole('option', { name: /CLM-0000020.*Partial Pay/ }).waitFor();
});
await check('Delete CLM-0000020 → tab closes, claim removed from the split view', async () => {
  await header().getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('dialog', { name: 'Delete Claim' }).getByRole('button', { name: 'Delete', exact: true }).click();
  await page.waitForURL(/\/lightning\/o\/Claim\/list/);
  expectEq((await tabLabels(page)).some((t) => t.includes('CLM-0000020')), false, 'tab closed');
  expectEq(await split().getByRole('option', { name: /CLM-0000020/ }).count(), 0, 'list item');
});
await check('?state=error shows the captured Benefit Snapshot error', async () => {
  await page.goto(`${base}/lightning/r/Claim/a0CEc00000000023AA/view?state=error`, { waitUntil: 'networkidle' });
  await page.getByText("No such column 'Subject_To_Deductible__c'", { exact: false }).waitFor();
});

await finish();
