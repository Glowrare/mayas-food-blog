import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

import PostHeader from './post-header';
import Button from '../../ui/button';

const PostContent = (props) => {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0]?.tagName === 'img') {
        const image = node.children[0];

        return (
          <div className="mx-auto my-4 w-full max-w-[600px]">
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt ?? ''}
              width={384}
              height={256}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
  };

  return (
    <article className="mx-auto my-8 w-[95%] max-w-240 rounded-[6px] bg-grey-100 p-4 text-xl leading-8 md:p-8 [&_h2]:my-[0.83em] [&_h2]:font-display [&_h2]:text-[1.5em] [&_h2]:font-bold [&_ol]:my-[1em] [&_ol]:list-decimal [&_ol]:ps-10 [&_p]:my-[1em] [&_p]:text-grey-800 [&_ul]:my-[1em] [&_ul]:list-disc [&_ul]:ps-10">
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
      <div className="mt-4 text-right">
        <Button mode="link" path="/posts" text="Back to all posts" />
      </div>
    </article>
  );
};
export default PostContent;
