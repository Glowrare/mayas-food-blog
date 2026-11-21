import test, { expect } from '@playwright/test';

test('all 20 recipes appear and an article renders', async ({ page }) => {
  await page.goto('/posts');
  await expect(page.getByRole('heading', { name: 'All Posts' })).toBeVisible();

  const cards = page.locator('main ul > li');
  await expect(cards).toHaveCount(20);

  // Confirm details page
  await page
    .getByRole('link', { name: /Lemon Garlic Sheet-Pan Salmon/i })
    .first()
    .click();

  await expect(page).toHaveURL(/\/posts\/lemon-garlic-sheet-pan-salmon$/);
  await expect(
    page.getByRole('heading', { name: /Lemon Garlic Sheet-Pan Salmon/i }),
  ).toBeVisible();
});
