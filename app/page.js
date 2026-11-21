import FeaturedPosts from 'components/homepage/featured-posts';
import Hero from 'components/homepage/hero';
import { getFeaturedPosts } from 'lib/posts-util';

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
  const featuredPosts = getFeaturedPosts();

  return (
    <>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </>
  );
};
export default HomePage;
