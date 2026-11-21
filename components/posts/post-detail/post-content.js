import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

import classes from './post-content.module.css';
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
          <div className={classes.image}>
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
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
      <div className={classes.action}>
        <Button mode="link" path="/posts" text="Back to all posts" />
      </div>
    </article>
  );
};
export default PostContent;
