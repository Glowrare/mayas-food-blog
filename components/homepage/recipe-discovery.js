'use client';

import PostsGrid from 'components/posts/posts-grid';
import { filterRecipes } from 'lib/homepage-content.mjs';
import { cn } from 'lib/utils';
import { useState } from 'react';

const RecipeDiscovery = ({ recipes, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const matching = filterRecipes(recipes, selectedCategory);
  const visible = matching.slice(0, 4);
  return (
    <section className="rounded-xl bg-lavender px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto mb-6 max-w-prose text-center">
        <h2
          id="discovery-heading"
          className="font-editorial text-3xl text-brand md:text-4xl"
        >
          What are you cooking today?
        </h2>
        <p>Find your next favorite meal</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {categories.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelectedCategory(id)}
            className={cn(
              'min-h-11 rounded-full border px-4 py-2 text-sm font-medium',
              selectedCategory === id
                ? 'bg-brand border-brand text-white'
                : 'border-brand-muted bg-canvas text-brand',
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <PostsGrid posts={visible} variant="compact" columns={4} />
    </section>
  );
};
export default RecipeDiscovery;
