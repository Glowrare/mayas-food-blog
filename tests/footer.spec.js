import test, { expect } from '@playwright/test';

test('footer is present and links go to appropriare urls', async ({ page }) => {
  await page.goto('/');

  const footer = page.getByRole('contentinfo');
  await expect(footer).toBeVisible();

  // contact link
  await footer.getByRole('link', { name: 'Reach Out' }).click();
  await expect(page).toHaveURL(/\/contact$/);

  // post link
  await page.goto('/');
  await footer.getByRole('link', { name: 'All Recipes' }).click();
  await expect(page).toHaveURL(/\/posts$/);
});
