import PostsGrid from 'components/posts/posts-grid';
import SectionHeading from 'components/ui/section-heading';

const EditorsPick = ({ recipes }) => {
  if (!recipes.length) return null;

  return (
    <section aria-labelledby="pick-heading">
      <SectionHeading
        id="pick-heading"
        title="Editor's Picks"
        desc="Handpicked favourites from the kicthen."
      />
      <PostsGrid posts={recipes} variant="editorial" columns={3} />
    </section>
  );
};
export default EditorsPick;
