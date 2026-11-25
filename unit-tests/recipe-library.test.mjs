import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import matter from 'gray-matter';
import { toRecipeSummary } from '../lib/recipe-summary.mjs';
import { buildHomepageContent, filterRecipes } from '../lib/homepage-content.mjs';

test('the existing recipe library retains its selections, categories and images', () => {
  const postsDirectory = new URL('../posts/', import.meta.url);
  const recipes = readdirSync(postsDirectory)
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const { data, content } = matter(readFileSync(new URL(filename, postsDirectory), 'utf8'));
      return toRecipeSummary({ ...data, slug: filename.slice(0, -3), content });
    });
  const before = structuredClone(recipes);
  const home = buildHomepageContent(recipes);
  assert.equal(home.recipes.length, 20);
  assert.equal(home.leadStory.slug, 'lemon-garlic-sheet-pan-salmon');
  assert.deepEqual(home.editorsPick.map(recipe => recipe.slug), [
    'crispy-chickpea-grain-bowls',
    'smoky-paprika-chicken-thighs',
    'ginger-sesame-tofu-stir-fry',
  ]);
  assert.deepEqual(home.latestRecipes.map(recipe => recipe.slug), [
    'miso-butter-mushroom-pasta',
    'roasted-cauliflower-tahini-soup',
    'honey-lime-shrimp-tacos',
    'herbed-farro-stuffed-peppers',
  ]);
  const counts = Object.fromEntries(home.availableCategories.map(({ id }) => [
    id, filterRecipes(home.recipes, id).length,
  ]));
  assert.deepEqual(counts, {
    all: 20, 'quick-easy': 10, meatless: 13, chicken: 2,
    seafood: 3, meat: 2, 'soups-stews': 3, 'pasta-grains': 6,
  });
  assert.deepEqual(filterRecipes(home.recipes, 'soups-stews').map(recipe => recipe.slug), [
    'roasted-cauliflower-tahini-soup', 'coconut-lentil-dal', 'lemony-kale-white-bean-stew',
  ]);
  for (const recipe of home.recipes) {
    assert.equal(Object.hasOwn(recipe, 'content'), false);
    assert.ok(existsSync(new URL(`../public/images/posts/${recipe.slug}/${recipe.image}`, import.meta.url)));
  }
  assert.deepEqual(recipes, before);
});
