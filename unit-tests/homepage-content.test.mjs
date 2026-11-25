import test from 'node:test';
import assert from 'node:assert/strict';
import { toRecipeSummary } from '../lib/recipe-summary.mjs';
import { buildHomepageContent, filterRecipes } from '../lib/homepage-content.mjs';

function recipe(overrides = {}) {
  return toRecipeSummary({ slug: 'sample', title: 'Sample', image: 'sample.jpg',
    excerpt: 'Sample recipe', date: '2026-01-01', categories: ['meatless'],
    totalMinutes: 25, isFeatured: false, ...overrides });
}

test('newest featured leads, unless priority overrides it', () => {
  const older = recipe({ slug: 'older', isFeatured: true });
  const newer = recipe({ slug: 'newer', isFeatured: true, date: '2026-02-01' });
  assert.equal(buildHomepageContent([older, newer]).leadStory.slug, 'newer');
  assert.equal(buildHomepageContent([{ ...older, featuredPriority: 10 }, newer]).leadStory.slug, 'older');
});

test('priority cannot promote an unfeatured recipe; fallback and ties are deterministic', () => {
  const a = recipe({ slug: 'a' });
  const b = recipe({ slug: 'b', featuredPriority: 99 });
  assert.equal(buildHomepageContent([b, a]).leadStory.slug, 'a');
  assert.equal(buildHomepageContent([b, { ...a, isFeatured: true }]).leadStory.slug, 'a');
});

test('empty and singleton collections are safe', () => {
  const empty = buildHomepageContent([]);
  assert.equal(empty.leadStory, null);
  assert.deepEqual(empty.editorsPick, []);
  assert.deepEqual(empty.latestRecipes, []);
  assert.deepEqual(empty.availableCategories, [{ id: 'all', label: 'All' }]);
  const one = buildHomepageContent([recipe()]);
  assert.equal(one.leadStory.slug, 'sample');
  assert.deepEqual(one.editorsPick, []);
  assert.deepEqual(one.latestRecipes, []);
});

test('newest recipe leads when none are featured', () => {
  const older = recipe({ slug: 'older', date: '2026-01-01', featuredPriority: 99 });
  const newer = recipe({ slug: 'newer', date: '2026-02-01' });
  const result = buildHomepageContent([older, newer]);
  assert.equal(result.leadStory.slug, 'newer');
  assert.deepEqual(result.editorsPick, []);
  assert.deepEqual(result.latestRecipes.map(recipe => recipe.slug), ['older']);
});

test('curated sections are limited and disjoint without mutating input', () => {
  const input = Array.from({ length: 10 }, (_, i) => recipe({ slug: `r${i}`, isFeatured: i < 6 }));
  const before = structuredClone(input);
  const result = buildHomepageContent(input);
  const slugs = [result.leadStory, ...result.editorsPick, ...result.latestRecipes].map(r => r.slug);
  assert.equal(result.editorsPick.length, 3);
  assert.equal(result.latestRecipes.length, 4);
  assert.equal(new Set(slugs).size, 8);
  assert.deepEqual(input, before);
});

test('optional metadata is normalized and body omitted', () => {
  const result = recipe({ categories: ['seafood', 'seafood', 'unknown', 'quick-easy'],
    totalMinutes: -1, isFeatured: 'false', featuredPriority: undefined, content: 'Private body' });
  assert.deepEqual(result.categories, ['seafood']);
  assert.equal(result.totalMinutes, null);
  assert.equal(result.isFeatured, false);
  assert.equal(result.featuredPriority, 0);
  assert.equal(Object.hasOwn(result, 'content'), false);
  assert.deepEqual(recipe({ categories: undefined, totalMinutes: undefined }).categories, []);
});

test('discovery derives quick category and filters correctly', () => {
  const fast = recipe({ slug: 'fast', totalMinutes: 30 });
  const slow = recipe({ slug: 'slow', totalMinutes: 31, categories: ['seafood'] });
  const home = buildHomepageContent([slow, fast]);
  assert.deepEqual(filterRecipes(home.recipes, 'quick-easy').map(r => r.slug), ['fast']);
  assert.deepEqual(filterRecipes(home.recipes, 'seafood').map(r => r.slug), ['slow']);
  assert.equal(filterRecipes(home.recipes, 'all').length, 2);
  assert.deepEqual(filterRecipes(home.recipes, 'unknown'), []);
  assert.deepEqual(home.availableCategories.map(c => c.id), ['all', 'quick-easy', 'meatless', 'seafood']);
});

test('featured date and slug ties are deterministic across input orders', () => {
  const a = recipe({ slug: 'a', isFeatured: true, featuredPriority: 2 });
  const b = recipe({ slug: 'b', isFeatured: true, featuredPriority: 2 });
  for (const input of [[b, a], [a, b]]) {
    const home = buildHomepageContent(input);
    assert.equal(home.leadStory.slug, 'a');
    assert.deepEqual(home.editorsPick.map(recipe => recipe.slug), ['b']);
  }
});

test('invalid optional durations, categories and priorities are normalized', () => {
  for (const totalMinutes of [undefined, null, 0, -1, NaN, Infinity, '25']) {
    const summary = recipe({ totalMinutes, categories: ['quick-easy', null, 1, 'unknown'] });
    assert.equal(summary.totalMinutes, null);
    assert.deepEqual(summary.categories, []);
  }
  for (const categories of [undefined, null, 'seafood', {}]) {
    assert.deepEqual(recipe({ categories, totalMinutes: undefined }).categories, []);
  }
  for (const featuredPriority of [undefined, null, NaN, Infinity, '10']) {
    assert.equal(recipe({ featuredPriority }).featuredPriority, 0);
  }
  for (const totalMinutes of [1, 29.5, 30]) {
    assert.ok(recipe({ totalMinutes }).categories.includes('quick-easy'));
  }
  assert.equal(recipe({ totalMinutes: 30.1 }).categories.includes('quick-easy'), false);
});
