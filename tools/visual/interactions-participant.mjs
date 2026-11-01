// Click-through of the Participant search interactions (local only). node interactions-participant.mjs [baseUrl]
import { expectEq, mainTitle, start } from './check-lib.mjs';

const base = process.argv[2] ?? 'http://localhost:5173';
const { page, check, finish } = await start();
const main = () => page.locator('main');
const checkbox = (label) => main().locator('.slds-checkbox', { hasText: new RegExp(`^${label}$`) }).first();
const checkedLabels = async (legend) =>
  main()
    .locator('fieldset', { hasText: legend })
    .locator('.slds-checkbox')
    .evaluateAll((els) => els.filter((e) => e.querySelector('input').checked).map((e) => e.textContent.trim()));

await page.goto(`${base}/lightning/o/Account/list`, { waitUntil: 'networkidle' });

await check('Navigation menu → Participant → Participant Search tab', async () => {
  await page.getByRole('button', { name: 'Show Navigation Menu' }).click();
  await page.getByRole('menuitem', { name: 'Participant' }).click();
  await main().getByRole('tab', { name: 'Participant Search', selected: true }).waitFor();
  await main().getByText('Participant Information').waitFor();
});
await check('Search without Last Name → "Complete this field."', async () => {
  await main().getByRole('button', { name: 'Search', exact: true }).click();
  await main().getByText('Complete this field.').waitFor();
});
await check('Last Name "A" → Search → 30 records', async () => {
  await main().getByRole('textbox', { name: /Last Name/ }).fill('A');
  await main().getByRole('button', { name: 'Search', exact: true }).click();
  await main().getByText('30 record(s) found.').waitFor();
  expectEq(await main().locator('table tbody tr').count(), 30, 'rows');
});
await check('Advanced Search → Show Less; Participant Status "All" rule', async () => {
  await main().getByRole('button', { name: 'Advanced Search' }).click();
  await main().getByRole('button', { name: 'Show Less' }).waitFor();
  await main().getByText('Dependent Information').waitFor();
  expectEq((await checkedLabels('Participant Status:')).length, 8, 'all checked');
  await checkbox('LOA').locator('label').click();
  expectEq((await checkedLabels('Participant Status:')).join(','), 'Active,Cobra,Terminated,Retired,Laid Off,Closed', 'after unchecking LOA');
  await checkbox('All').locator('label').click();
  expectEq((await checkedLabels('Participant Status:')).length, 8, 'All re-checks every option');
  await main().getByRole('button', { name: 'Show Less' }).click();
  await main().getByRole('button', { name: 'Advanced Search' }).waitFor();
});
await check('Result link "Abate" (Mary Ann) → Contact record tab', async () => {
  await main().locator('table').getByRole('link', { name: 'Abate' }).first().click();
  await mainTitle(page, 'Mary Ann Abate');
});
await check('Employer Search: "A" → 13 employers, pager Next / Previous / per page', async () => {
  await page.getByRole('button', { name: 'Show Navigation Menu' }).click();
  await page.getByRole('menuitem', { name: 'Participant' }).click();
  await main().getByRole('tab', { name: 'Employer Search' }).click();
  await main().getByRole('textbox', { name: 'Employer Name' }).fill('A');
  await main().getByRole('button', { name: 'Search', exact: true }).click();
  await main().getByText('13 employer(s) found.').waitFor();
  await main().getByText('Page 1 of 2').waitFor();
  await main().getByRole('button', { name: 'Next' }).click();
  await main().getByText('Page 2 of 2').waitFor();
  expectEq(await main().locator('table tbody tr').count(), 3, 'page 2 rows');
  await main().getByRole('button', { name: 'Previous' }).click();
  await main().getByText('Page 1 of 2').waitFor();
  await main().getByRole('combobox', { name: 'Records per page' }).click();
  await main().getByRole('option', { name: '25' }).click();
  await main().getByText('Page 1 of 1').waitFor();
  expectEq(await main().locator('table tbody tr').count(), 13, 'rows at 25 per page');
});
await check('Employer Status "Inactive" → 4 employers ("All" unchecks)', async () => {
  await checkbox('Inactive').locator('label').click();
  expectEq((await checkedLabels('Status')).join(','), 'Inactive', 'checked');
  await main().getByRole('button', { name: 'Search', exact: true }).click();
  await main().getByText('4 employer(s) found.').waitFor();
});
await check('Employer link → Account record tab', async () => {
  await main().locator('table').getByRole('link', { name: 'HVAC and Associates' }).first().click();
  await mainTitle(page, 'HVAC and Associates');
});
await check('Claim Search: Advanced, Employer picklist, Search → no records', async () => {
  await page.goto(`${base}/lightning/n/Participant_Search?tab=claim`, { waitUntil: 'networkidle' });
  await checkbox('Draft').locator('label').click();
  expectEq((await checkedLabels('Claim Status:')).join(','), 'Draft', 'Draft only');
  await main().getByRole('button', { name: 'Advanced Search' }).click();
  await main().getByText('Claimant Information').waitFor();
  await main().getByRole('combobox', { name: 'Employer' }).click();
  await main().getByRole('option', { name: 'QA Test Employer Group - CBSR' }).click();
  await main().getByRole('button', { name: 'Search', exact: true }).click();
  await main().getByText('No records found matching your search criteria.').waitFor();
});
await check('Clear → criteria reset, results gone', async () => {
  await main().getByRole('button', { name: 'Clear' }).click();
  expectEq(await main().getByText('No records found matching your search criteria.').count(), 0, 'no-results text');
  expectEq((await checkedLabels('Claim Status:')).join(','), 'All', 'Claim Status');
  expectEq((await main().getByRole('combobox', { name: 'Employer' }).innerText()).trim(), '--None--', 'Employer');
});

await finish();
