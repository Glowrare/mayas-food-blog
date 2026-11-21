import PostsGrid from '../posts/posts-grid';

const FeaturedPosts = (props) => {
  const { posts } = props;
  return (
    <section className="mx-auto my-8 w-[90%] max-w-320">
      <h2 className="my-[0.83em] text-center text-[2rem] font-bold text-grey-800 md:text-[4rem]">
        Featured Posts
      </h2>
      <PostsGrid posts={posts} />
    </section>
  );
};
export default FeaturedPosts;
