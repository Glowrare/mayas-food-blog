import { Fragment } from 'react';
import Hero from '../components/homepage/hero';
import FeaturedPosts from '../components/homepage/featured-posts';
import Head from 'next/head';
import { getFeaturedPosts } from '../lib/posts-util';

const HomePage = (props) => {
  const { posts } = props;
  return (
    <Fragment>
      <Head>
        <title>Welcome to Maya's Kitchen Notes</title>
        <meta name='description' content='Weeknight recipes and simple nutrition notes from Maya Reyes.' />

        {/* SOCIAL CARDS */}
        <meta property='og:title' content="Maya's Kitchen Notes" />
        <meta property='og:description' content='Weeknight recipes and simple nutrition notes from Maya Reyes.' />
        <meta property='og:url' content='http://localhost:3000' />
        <meta property='og:image' content='/images/site/avatar.jpg' />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
};
export default HomePage;

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 18000,
  };
}
