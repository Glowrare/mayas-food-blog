export const CATEGORY_LABELS = {
  'quick-easy': 'Quick & Easy',
  meatless: 'Meatless',
  chicken: 'Chicken',
  seafood: 'Seafood',
  meat: 'Meat',
  'soups-stew': 'Soups & Stews',
  'pasta-grains': 'Pasta & Grains',
};

export function toRecipeSummary(post) {
  const totalMinutes =
    Number.isFinite(post.totalMinutes) && post.totalMinutes > 0
      ? post.totalMinutes
      : null;
  const raw = Array.isArray(post.categories) ? post.categories : [];
  const categories = [
    ...new Set(
      raw.filter(
        (category) =>
          typeof category === 'string' &&
          category !== 'quick-easy' &&
          Object.hasOwn(CATEGORY_LABELS, category),
      ),
    ),
  ];

  if (totalMinutes !== null && totalMinutes <= 30)
    categories.push('quick-easy');

  return {
    slug: post.slug,
    title: post.title,
    image: post.image,
    date: post.date,
    excerpt: post.excerpt,
    isFeatured: post.isFeatured === true,
    categories,
    totalMinutes,
    featuredPriority: Number.isFinite(post.featuredPriority)
      ? post.featuredPriority
      : 0,
  };
}

export function compareByDate(a, b) {
  return b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug);
}
