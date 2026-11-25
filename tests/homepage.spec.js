const { test, expect } = require('@playwright/test');

test('homepage loads and links the featured recipe', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Maya's Kitchen Notes/);
  const hero = page.getByRole('region', { name: 'Lemon Garlic Sheet-Pan Salmon' });
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText('Lemon Garlic Sheet-Pan Salmon');
  await expect(hero.getByRole('heading', { level: 1 })).toHaveCSS('font-family', /Georgia/);
  await expect(hero.getByRole('link', { name: /Read the recipe/ })).toHaveAttribute('href', '/posts/lemon-garlic-sheet-pan-salmon');
});

test('category discovery filters and resets', async ({ page }) => {
  await page.goto('/');
  const discovery = page.getByRole('region', { name: 'What are you cooking today?' });
  const announcement = discovery.locator('[aria-live="polite"]');
  await expect(announcement).toHaveAttribute('aria-atomic', 'true');
  await expect(discovery.getByRole('group', { name: 'Recipe categories' })).toBeVisible();
  await expect(discovery.getByRole('link', { name: 'Explore all recipes' })).toHaveAttribute('href', '/posts');
  await expect(discovery.getByText('Showing 4 of 20 recipes')).toBeVisible();
  const seafood = discovery.getByRole('button', { name: 'Seafood', exact: true });
  await seafood.click();
  await expect(seafood).toHaveAttribute('aria-pressed', 'true');
  await expect(discovery.getByText('Showing 3 of 3 recipes')).toBeVisible();
  await expect(discovery.getByRole('listitem')).toHaveCount(3);
  for (const slug of ['lemon-garlic-sheet-pan-salmon', 'honey-lime-shrimp-tacos', 'turmeric-coconut-cod']) {
    await expect(discovery.locator(`a[href="/posts/${slug}"]`)).toBeVisible();
  }
  const chicken = discovery.getByRole('button', { name: 'Chicken', exact: true });
  await chicken.focus();
  await page.keyboard.press('Space');
  await expect(chicken).toHaveAttribute('aria-pressed', 'true');
  await expect(seafood).toHaveAttribute('aria-pressed', 'false');
  await expect(discovery.getByText('Showing 2 of 2 recipes')).toBeVisible();
  await expect(discovery.locator('a[href="/posts/smoky-paprika-chicken-thighs"]')).toBeVisible();
  await expect(discovery.locator('a[href="/posts/citrus-herb-roast-chicken"]')).toBeVisible();
  const soups = discovery.getByRole('button', { name: 'Soups & Stews', exact: true });
  await soups.focus();
  await page.keyboard.press('Enter');
  await expect(soups).toHaveAttribute('aria-pressed', 'true');
  await expect(announcement).toHaveText('Showing 3 of 3 recipes');
  await expect(discovery.getByRole('listitem')).toHaveCount(3);
  const soupSlugs = await discovery.locator('li a').evaluateAll(links => links.map(link => link.getAttribute('href')));
  expect(soupSlugs).toEqual([
    '/posts/roasted-cauliflower-tahini-soup',
    '/posts/coconut-lentil-dal',
    '/posts/lemony-kale-white-bean-stew',
  ]);
  await discovery.getByRole('button', { name: 'Quick & Easy', exact: true }).click();
  await expect(discovery.getByText('Showing 4 of 10 recipes')).toBeVisible();
  await discovery.getByRole('button', { name: 'All', exact: true }).click();
  await expect(discovery.getByText('Showing 4 of 20 recipes')).toBeVisible();
  await expect(discovery.getByRole('listitem')).toHaveCount(4);
  await expect(discovery.getByRole('button', { pressed: true })).toHaveCount(1);
});

test('curated sections and the author introduction are present', async ({ page }) => {
  await page.goto('/');
  const picks = page.getByRole('region', { name: "Editor's Picks" });
  await expect(picks.getByText('Handpicked favourites from the kitchen.')).toBeVisible();
  await expect(picks.getByRole('listitem')).toHaveCount(3);
  expect(await picks.locator('li a').evaluateAll(links => links.map(link => link.getAttribute('href')))).toEqual([
    '/posts/crispy-chickpea-grain-bowls',
    '/posts/smoky-paprika-chicken-thighs',
    '/posts/ginger-sesame-tofu-stir-fry',
  ]);
  const latest = page.getByRole('region', { name: 'Fresh from the kitchen' });
  await expect(latest.getByRole('listitem')).toHaveCount(4);
  expect(await latest.locator('li a').evaluateAll(links => links.map(link => link.getAttribute('href')))).toEqual([
    '/posts/miso-butter-mushroom-pasta',
    '/posts/roasted-cauliflower-tahini-soup',
    '/posts/honey-lime-shrimp-tacos',
    '/posts/herbed-farro-stuffed-peppers',
  ]);
  await expect(latest.getByRole('link', { name: /View all recipes/ })).toHaveAttribute('href', '/posts');
  const about = page.getByRole('region', { name: "Hi, I'm Maya." });
  await expect(about.getByRole('img', { name: 'Portrait of Maya' })).toBeVisible();
  await expect(about.getByText('I blog about weeknight recipes and simple nutrition notes.')).toBeVisible();
});

test('mobile navigation works with keyboard and links', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open menu' });
  const nav = page.locator('#mobile-navigation');
  await expect(nav).toBeHidden();
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(nav).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  await nav.getByRole('link', { name: 'Recipes' }).focus();
  await page.keyboard.press('Escape');
  await expect(nav).toBeHidden();
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: /Read the recipe/ })).toBeFocused();
  await toggle.click();
  await nav.getByRole('link', { name: 'Recipes' }).click();
  await expect(page).toHaveURL(/\/posts$/);
  await expect(nav).toBeHidden();
  await page.goBack();
  await expect(nav).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
});

test('desktop navigation identifies exact pages and highlights recipe details', async ({ page }) => {
  await page.goto('/posts');
  const nav = page.getByRole('navigation', { name: 'Primary navigation', exact: true });
  await expect(nav.getByRole('link', { name: 'Recipes' })).toHaveAttribute('aria-current', 'page');
  await page.getByRole('main').getByRole('link', { name: /Lemon Garlic Sheet-Pan Salmon/ }).click();
  await expect(nav.getByRole('link', { name: 'Recipes' })).toHaveClass(/bg-lavender/);
  await expect(nav.getByRole('link', { name: 'Recipes' })).not.toHaveAttribute('aria-current');
  await nav.getByRole('link', { name: 'Contact' }).click();
  await expect(nav.getByRole('link', { name: 'Contact' })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('How can I help you?');
  await expect(page.getByLabel('Your Email')).toBeVisible();
  await expect(page.getByLabel('Your Name')).toBeVisible();
  await expect(page.getByLabel('Your Message')).toBeVisible();
});

for (const width of [320, 390, 768, 1440]) {
  test(`homepage fits ${width}px`, async ({ page }) => {
    const errors = [];
    const externalRequests = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('request', request => {
      if (/^https?:/.test(request.url()) && new URL(request.url()).hostname !== 'localhost') {
        externalRequests.push(request.url());
      }
    });
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
    const brokenReferences = await page.locator('[aria-labelledby]').evaluateAll(elements => elements
      .flatMap(element => element.getAttribute('aria-labelledby').split(/\s+/))
      .filter(id => !document.getElementById(id)));
    expect(brokenReferences).toEqual([]);
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
    }
    await page.evaluate(async () => {
      await Promise.all([...document.images].map(image => image.decode()));
      await document.fonts.ready;
    });
    expect(await page.locator('img').evaluateAll(images => images.every(image => image.naturalWidth > 0))).toBe(true);
    expect(errors).toEqual([]);
    expect(externalRequests).toEqual([]);
  });
}
