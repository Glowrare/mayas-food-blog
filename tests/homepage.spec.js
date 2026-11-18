const { test, expect } = require('@playwright/test');

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Maya's Kitchen Notes/);
  // a failing test
  await expect(page).toHaveTitle(/Not Maya's Kitchen Notes/);
});
