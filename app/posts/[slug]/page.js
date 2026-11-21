import PostContent from 'components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from 'lib/posts-util';
import { notFound } from 'next/navigation';

export const revalidate = 600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostsFiles().map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

function getValidPost(slug) {
  const validSlugs = getPostsFiles().map((filename) =>
    filename.replace(/\.md$/, ''),
  );

  // if not valid, throw not found
  if (!validSlugs.includes(slug)) notFound();

  return getPostData(slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getValidPost(slug);

  return { title: post.title, description: post.excerpt };
}

export default async function PostDetailsPage({ params }) {
  const { slug } = await params;

  const post = getValidPost(slug);

  return <PostContent post={post} />;
}
