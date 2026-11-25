import PostsGrid from './posts-grid';

const AllPosts = (props) => {
  return (
    <section
      aria-labelledby="archive-heading"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12"
    >
      <header className="mb-8 flex flex-col gap-6 border-b border-oat pb-8 md:mb-10 md:flex-row md:items-end md:justify-between md:pb-10">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            The recipe collection
          </p>
          <h1 id="archive-heading" className="font-editorial text-4xl leading-tight text-brand md:text-6xl">
            All Posts
          </h1>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-ink">
            Every recipe from Maya's kitchen, all in one place. Find a new
            weeknight favourite or return to a dish you love.
          </p>
        </div>
        <p className="self-start rounded-full bg-lavender px-4 py-2 text-sm font-medium text-brand md:shrink-0 md:self-auto">
          {props.posts.length} recipes
        </p>
      </header>
      <PostsGrid posts={props.posts} eagerImages={3} />
    </section>
  );
};
export default AllPosts;
