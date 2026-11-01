// Click-through of the Contacts interactions (local only). node interactions-contacts.mjs [baseUrl]
import { expectEq, mainTitle, start, tabLabels } from './check-lib.mjs';

const base = process.argv[2] ?? 'http://localhost:5173';
const { page, check, finish } = await start();
const ADAM = '/lightning/r/Contact/003Ec0000a1962939d/view';
const ANTOINETTE = '/lightning/r/Contact/003Ec00008CfF7Df83/view';

await page.goto(`${base}/lightning/o/Account/list`, { waitUntil: 'networkidle' });

await check('Navigation menu → Contacts list view (All Members, 50+ items)', async () => {
  await page.getByRole('button', { name: 'Show Navigation Menu' }).click();
  await page.getByRole('menuitem', { name: 'Contacts' }).click();
  await mainTitle(page, 'All Members');
  await page.getByText(/^50\+ items • Sorted by Name/).waitFor();
});
await check('Open a contact from the list → workspace tab, page without a tabset', async () => {
  await page.locator('table[role=grid]').getByRole('link', { name: 'Adam Sahn', exact: true }).click();
  await mainTitle(page, 'Adam Sahn');
  expectEq((await tabLabels(page)).some((t) => t.includes('Adam Sahn | Contact')), true, 'tab');
  expectEq(await page.locator('main [role=tablist]').count(), 1, 'only the Payment & Repayment History tabset');
});
await check('Default state: Account Activity shows no back-end error', async () => {
  expectEq(await page.getByText("We couldn't access the credential(s)", { exact: false }).count(), 0, 'error text');
});
await check('Split view search filters the list', async () => {
  await page.locator('.slds-split-view').getByPlaceholder('Search this list...').fill('Antoinette');
  expectEq(await page.locator('.slds-split-view [role=option]').count(), 1, 'items');
  await page.locator('.slds-split-view').getByPlaceholder('Search this list...').fill('');
});
await check('Collapse / expand "Contact Information"', async () => {
  const btn = page.getByRole('button', { name: 'Contact Information', exact: true });
  await btn.click();
  expectEq(await btn.getAttribute('aria-expanded'), 'false', 'collapsed');
  await btn.click();
});
await check('Inline edit Work Phone → Save', async () => {
  await page.getByRole('button', { name: 'Edit: Work Phone' }).click();
  await page.locator('#workPhone').fill('(877) 687-0000');
  await page.locator('.slds-docked-form-footer').getByRole('button', { name: 'Save' }).click();
  await page.getByText('(877) 687-0000').first().waitFor();
});
await check('Payment & Repayment History tabs switch', async () => {
  await page.getByRole('tab', { name: 'Repayments', exact: true }).click();
  expectEq(await page.getByRole('tab', { name: 'Repayments', exact: true }).getAttribute('aria-selected'), 'true', 'Repayments');
  await page.getByRole('tab', { name: 'Payments', exact: true }).click();
  await page.getByText('No payments found for this contact.').waitFor();
});
await check('Highlights Account Name link opens the account tab', async () => {
  await page.locator('main .slds-page-header').getByRole('link', { name: 'E&J Gallo Winery Active' }).click();
  await mainTitle(page, 'E&J Gallo Winery Active');
  await page.goto(`${base}${ANTOINETTE}`, { waitUntil: 'networkidle' });
});
await check('Change Owner: select a user, Submit → owner text updated', async () => {
  await page.locator('main .slds-page-header').getByRole('button', { name: 'Change Owner' }).click();
  const dlg = page.getByRole('dialog', { name: 'Change Contact Owner' });
  await dlg.getByText('that are owned by').waitFor();
  await dlg.getByText('Zach Ackerman').waitFor();
  await dlg.getByPlaceholder('Search Users...').fill('Feng');
  await page.getByRole('option', { name: /Feng Yue/ }).click();
  await dlg.getByRole('button', { name: 'Submit' }).click();
  await page.locator('.slds-modal').waitFor({ state: 'detached' });
  await page.locator('main .slds-page-header').getByRole('button', { name: 'Change Owner' }).click();
  await page.getByRole('dialog', { name: 'Change Contact Owner' }).getByText('Feng Yue').waitFor();
  await page.getByRole('dialog').getByRole('button', { name: 'Cancel', exact: true }).click();
});
await check('Change Owner validation: Submit without an owner shows "Complete this field."', async () => {
  await page.locator('main .slds-page-header').getByRole('button', { name: 'Change Owner' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('dialog').getByText('Complete this field.').waitFor();
  await page.getByRole('dialog').getByRole('button', { name: 'Cancel', exact: true }).click();
});
await check('Log an Activity → Save → Activity History (1)', async () => {
  await page.locator('main .slds-page-header').getByRole('button', { name: 'Log an Activity' }).click();
  const dlg = page.getByRole('dialog', { name: 'Log an Activity' });
  await dlg.getByText('Mansoor Ahmad').waitFor();
  await dlg.locator('#subject').fill('Call about coverage');
  await dlg.getByRole('button', { name: 'Save' }).click();
  await page.locator('.slds-modal').waitFor({ state: 'detached' });
  await page.getByRole('link', { name: /Activity History \(1\)/ }).waitFor();
});
await check('Notes ▼ New → docked composer → Done → Notes (1) with the note tile', async () => {
  await page.getByRole('button', { name: 'Show actions for Notes', exact: true }).click({ timeout: 5000 });
  await page.getByRole('menuitem', { name: 'New' }).click({ timeout: 5000 });
  await page.locator('.slds-docked-composer').waitFor();
  await page.locator('.slds-docked-composer').getByLabel('Title').fill('Follow-up', { timeout: 5000 });
  await page.locator('.slds-docked-composer').getByRole('button', { name: 'Done' }).click({ timeout: 5000 });
  await page.locator('.slds-docked-composer').waitFor({ state: 'detached' });
  await page.getByText('Notes (1)').first().waitFor();
  await page.getByText('Follow-up').first().waitFor();
});
await check('Overflow ▼ lists 22 actions', async () => {
  await page.locator('main .slds-page-header').getByRole('button', { name: 'Show more actions' }).click();
  expectEq(await page.getByRole('menuitem').count(), 22, 'menu items');
  await page.keyboard.press('Escape');
});
await check('Contact hierarchy sub-tab', async () => {
  await page.goto(`${base}${ADAM}`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'View Hierarchy' }).click();
  await mainTitle(page, 'Contact Hierarchy');
  await page.getByText('current', { exact: true }).waitFor();
});
await check('?state=error shows the captured Account Activity error', async () => {
  await page.goto(`${base}${ADAM}?state=error`, { waitUntil: 'networkidle' });
  await page.getByText('We couldn\'t access the credential(s)', { exact: false }).waitFor();
});

await finish();
