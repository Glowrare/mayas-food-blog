import PostsGrid from './posts-grid';

const AllPosts = (props) => {
  return (
    <section className="mx-auto my-8 w-[90%] max-w-240">
      <h1 className="my-[0.67em] text-center text-[2rem] font-bold text-grey-800 md:text-[4rem]">
        All Posts
      </h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
};
export default AllPosts;
