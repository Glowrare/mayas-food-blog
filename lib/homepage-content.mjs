import { CATEGORY_LABELS, compareByDate } from './recipe-summary.mjs';

function compareFeatured(a, b) {
  return b.featuredPriority - a.featuredPriority || compareByDate(a, b);
}

export function filterRecipes(recipes, category) {
  return category === 'all'
    ? recipes
    : recipes.filter((recipe) => recipe.categories.includes(category));
}

export function getAvailableCategories(recipes) {
  return [
    { id: 'all', label: 'All' },
    ...Object.entries(CATEGORY_LABELS)
      .filter(([id]) =>
        recipes.some((recipe) => recipe.categories.includes(id)),
      )
      .map(([id, label]) => ({ id, label })),
  ];
}

export function buildHomepageContent(recipes) {
  const sorted = [...recipes].sort(compareByDate);

  const featured = sorted
    .filter((recipe) => recipe.isFeatured)
    .sort(compareFeatured);

  const leadStory = featured[0] ?? sorted[0] ?? null;
  const editorsPick = featured.slice(1, 4);

  const usedSlugs = new Set(
    [leadStory, ...editorsPick].filter(Boolean).map((recipe) => recipe.slug),
  );
  const latestRecipes = sorted
    .filter((recipe) => !usedSlugs.has(recipe.slug))
    .slice(0, 4);

  return {
    leadStory,
    editorsPick,
    latestRecipes,
    availableCategories: getAvailableCategories(sorted),
    recipes: sorted,
  };
}
