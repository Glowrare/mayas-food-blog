import PostItem from './post-item';

const PostsGrid = (props) => {
  const { posts } = props;
  return (
    <ul className="m-0 grid list-none content-center grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-6 p-0">
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};
export default PostsGrid;
