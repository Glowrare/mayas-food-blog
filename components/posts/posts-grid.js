import { cn } from 'lib/utils';
import PostItem from './post-item';

const layouts = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

const imageSizes = {
  2: '(max-width: 639px) 100vw, 50vw',
  3: '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw',
  4: '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw',
};

const PostsGrid = ({ posts, variant = 'default', columns = 3, className, eagerImages = 0 }) => {
  return (
    <ul
      className={cn(
        'm-0 grid list-none gap-5 p-0',
        layouts[columns] ?? layouts[3],
        className,
      )}
    >
      {posts.map((post, index) => (
        <PostItem
          key={post.slug}
          post={post}
          variant={variant}
          loading={index < eagerImages ? 'eager' : 'lazy'}
          sizes={imageSizes[columns] ?? imageSizes[3]}
        />
      ))}
    </ul>
  );
};
export default PostsGrid;
