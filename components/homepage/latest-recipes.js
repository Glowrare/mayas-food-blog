import PostsGrid from 'components/posts/posts-grid';
import SectionHeading from 'components/ui/section-heading';

const LatestRecipes = ({ recipes }) => {
  if (!recipes.length) return null;

  return (
    <section aria-labelledby="latest-heading">
      <SectionHeading
        id="latest-heading"
        title="Fresh from the kitchen"
        href="/posts"
        linkLabel="View all recipes"
      />
      <PostsGrid posts={recipes} variant="compact" columns={4} />
    </section>
  );
};
export default LatestRecipes;
