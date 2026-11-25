'use client';

import PostsGrid from 'components/posts/posts-grid';
import { filterRecipes } from 'lib/homepage-content.mjs';
import { cn } from 'lib/utils';
import { useState } from 'react';
import Link from 'next/link';

const RecipeDiscovery = ({ recipes, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const matching = filterRecipes(recipes, selectedCategory);
  const visible = matching.slice(0, 4);
  return (
    <section
      aria-labelledby="discovery-heading"
      className="rounded-xl bg-lavender px-4 py-8 sm:px-8 sm:py-12"
    >
      <div className="mx-auto mb-6 max-w-prose text-center">
        <h2
          id="discovery-heading"
          className="font-editorial text-3xl text-brand md:text-4xl"
        >
          What are you cooking today?
        </h2>
        <p className="mt-2 text-ink">Find your next favourite meal.</p>
      </div>
      <div
        role="group"
        aria-label="Recipe categories"
        className="flex flex-wrap justify-center gap-2"
      >
        {categories.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={selectedCategory === id}
            onClick={() => setSelectedCategory(id)}
            className={cn(
              'min-h-11 rounded-full border px-4 py-2 text-sm font-medium',
              selectedCategory === id
                ? 'bg-brand border-brand text-white'
                : 'border-brand-muted bg-canvas text-brand hover:bg-oat',
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="my-5 text-center text-sm text-brand"
      >
        Showing {visible.length} of {matching.length} recipes
      </p>
      {visible.length > 0 ? (
        <PostsGrid posts={visible} variant="compact" columns={4} />
      ) : (
        <p className="py-8 text-center text-ink">
          No recipes found in this collection.
        </p>
      )}
      <div className="mt-6 text-center">
        <Link
          href="/posts"
          className="inline-flex min-h-11 items-center font-medium text-brand underline underline-offset-4"
        >
          Explore all recipes
        </Link>
      </div>
    </section>
  );
};
export default RecipeDiscovery;
