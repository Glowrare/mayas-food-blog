import AllPosts from 'components/posts/all-posts';
import { getAllPosts } from 'lib/posts-util';

export const metadata = {
  title: "All Recipes | Maya's Kitchen Notes",
  description:
    'A list of weeknight recipes and simple nutrition notes from Maya Reyes.',
};

const AllPostsPage = () => {
  const allPosts = getAllPosts();

  return <AllPosts posts={allPosts} />;
};

export default AllPostsPage;
