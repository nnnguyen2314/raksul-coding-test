import { test, expect } from '@playwright/test';

// Basic e2e: page loads, table appears, clicking a cell updates order price text.
test('selecting a cell updates Order price', async ({ page }) => {
  await page.goto('/');
  // wait for price table grid to appear
  const grid = page.getByRole('grid', { name: 'Price table' });
  await expect(grid).toBeVisible();
  // click the first cell once data is loaded
  const firstCell = grid.getByRole('gridcell').first();
  await firstCell.click();
  // the Order bar should show a number
  const orderBar = page.getByText(/Order price:/);
  await expect(orderBar).toContainText(/¥[\d,]+/);
});
