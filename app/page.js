import EditorialHero from 'components/homepage/editorial-hero';
import EditorsPick from 'components/homepage/editors-pick';
import LatestRecipes from 'components/homepage/latest-recipes';
import RecipeDiscovery from 'components/homepage/recipe-discovery';
import AboutMaya from 'components/homepage/about-maya';
import { buildHomepageContent } from 'lib/homepage-content.mjs';
import { getAllPosts } from 'lib/posts-util';
import { toRecipeSummary } from 'lib/recipe-summary.mjs';

export const revalidate = 18000;

export const metadata = {
  title: "Welcome to Maya's Kitchen Notes",
  description: 'Weeknight recipes and simple nutrition notes from Maya Reyes.',
  openGraph: {
    title: "Maya's Kitchen Notes",
    description:
      'Weeknight recipes and simple nutrition notes from Maya Reyes.',
    images: ['/images/site/avatar.jpg'],
  },
};

const HomePage = () => {
  const home = buildHomepageContent(getAllPosts().map(toRecipeSummary));

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-8 sm:px-6 md:space-y-16 lg:px-10 lg:py-12">
      {home.leadStory ? (
        <EditorialHero recipe={home.leadStory} />
      ) : (
        <section className="rounded-xl bg-lavender p-8 text-center">
          <h1 className="font-editorial text-4xl text-brand">
            Fresh recipes are coming soon
          </h1>
          <p className="mt-3 text-ink">
            Check back for more from Maya's kitchen.
          </p>
        </section>
      )}
      <EditorsPick recipes={home.editorsPick} />
      {home.recipes.length > 0 && (
        <RecipeDiscovery
          recipes={home.recipes}
          categories={home.availableCategories}
        />
      )}
      <LatestRecipes recipes={home.latestRecipes} />
      <AboutMaya />
    </div>
  );
};
export default HomePage;
