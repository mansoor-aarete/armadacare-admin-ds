// Click-through of the Accounts Dashboard (Account Intelligence View, D1) (local only). node interactions-dashboard.mjs [baseUrl]
import { expectEq, start } from './check-lib.mjs';

const base = process.argv[2] ?? 'http://localhost:5173';
const { page, check, finish } = await start();
const main = () => page.locator('main');
const pressed = (name) => main().getByRole('button', { name }).first().getAttribute('aria-pressed');

await page.goto(`${base}/lightning/o/Account/intelligence`, { waitUntil: 'networkidle' });

await check('My Accounts: 4 tiles at 0, Total Accounts selected, empty state', async () => {
  await main().getByText('My Accounts').first().waitFor();
  for (const t of ['Total Accounts', 'With Opportunities', 'No Recent Activity', 'With Upcoming Activity']) await main().getByRole('button', { name: new RegExp(`${t}\\s*0`) }).waitFor();
  expectEq(await pressed(/Total Accounts/), 'true', 'Total Accounts pressed');
  await main().getByText('Get your accounts engaged').waitFor();
  await main().getByText('0 items • Filtered by Last Activity, Me, Total Accounts').waitFor();
});
await check('Tile "No Recent Activity" → selected, meta line follows', async () => {
  await main().getByRole('button', { name: /No Recent Activity/ }).click();
  expectEq(await pressed(/No Recent Activity/), 'true', 'tile pressed');
  expectEq(await pressed(/Total Accounts/), 'false', 'previous tile released');
  await main().getByText('0 items • Filtered by Last Activity, Me, No Recent Activity').waitFor();
});
await check('Bookmark (important accounts) toggles', async () => {
  const bookmark = main().getByRole('button', { name: 'Show important accounts' });
  await bookmark.click();
  expectEq(await bookmark.getAttribute('aria-pressed'), 'true', 'pressed');
  await bookmark.click();
  expectEq(await bookmark.getAttribute('aria-pressed'), 'false', 'released');
});
await check('Refresh keeps the view', async () => {
  await main().getByRole('button', { name: 'Refresh' }).click();
  await main().getByText('Get your accounts engaged').waitFor();
});
await check('New → record type picker', async () => {
  await main().getByRole('button', { name: 'New', exact: true }).click();
  await page.getByRole('heading', { name: 'New Account' }).waitFor();
  await page.goto(`${base}/lightning/o/Account/intelligence`, { waitUntil: 'networkidle' });
});
await check('List View → Accounts list', async () => {
  await main().getByRole('button', { name: 'List View', exact: true }).click();
  await page.waitForURL(/\/lightning\/o\/Account\/list/);
  await main().locator('table').waitFor();
});

await finish();
