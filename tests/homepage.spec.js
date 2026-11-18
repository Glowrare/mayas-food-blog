const { test, expect } = require('@playwright/test');

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Maya's Kitchen Notes/);
  // duplicate that passes
  await expect(page).toHaveTitle(/Maya's Kitchen Notes/);
});
