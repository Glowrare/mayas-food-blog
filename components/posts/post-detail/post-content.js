import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';

import PostHeader from './post-header';

const backLinkClass =
  'inline-flex min-h-11 items-center text-sm font-medium text-brand underline underline-offset-4';

const PostContent = (props) => {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0]?.tagName === 'img') {
        const image = node.children[0];

        return (
          <div className="my-8 overflow-hidden rounded-xl bg-lavender">
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt ?? ''}
              width={768}
              height={512}
              className="h-auto w-full"
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
  };

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <Link href="/posts" className={`${backLinkClass} mb-6`}>
        Back to all posts
      </Link>
      <PostHeader
        title={post.title}
        image={imagePath}
        excerpt={post.excerpt}
        categories={post.categories}
        totalMinutes={post.totalMinutes}
        date={post.date}
      />
      <div className="mx-auto max-w-3xl py-10 text-base leading-relaxed text-ink [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-editorial [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:text-brand [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:ps-6 [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:ps-6">
        <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
        <Link href="/posts" className={`${backLinkClass} mt-6`}>
          Back to all posts
        </Link>
      </div>
    </article>
  );
};
export default PostContent;
