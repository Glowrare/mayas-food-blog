import Link from 'next/link';
import Image from 'next/image';
import { CATEGORY_LABELS } from 'lib/recipe-summary.mjs';
import { cn } from 'lib/utils';

const PostItem = ({ post, variant = 'default', sizes, className }) => {
  const {
    title,
    image,
    date,
    excerpt,
    slug,
    categories = [],
    totalMinutes,
  } = post;

  const category =
    CATEGORY_LABELS[categories.find((id) => id !== 'quick-easy')];
  const details = [
    category,
    totalMinutes ? `${totalMinutes} min` : null,
  ].filter(Boolean);
  const compact = variant === 'compact';

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li
      className={cn(
        'bg-canvas min-w-0 overflow-hidden rounded-xl border border-oat',
        className,
      )}
    >
      <Link
        href={linkPath}
        className="text-brand group block h-full rounded-xl focus-visible:-outline-offset-4"
      >
        <div className="relative aspect-4/3 bg-lavender overflow-hidden">
          <Image
            src={imagePath}
            alt=""
            fill
            sizes={
              sizes ||
              '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'
            }
            className="object-cover"
          />
        </div>
        <div className={cn('space-y-2 p-4', compact && 'p-3')}>
          {details.length > 0 && (
            <p className="text-xs font-medium uppercase tracking-wide text-brand">
              {details.join(' . ')}
            </p>
          )}
          <h3
            className={cn(
              'font-editorial text-xl leading-snug group-hover:underline',
              compact && 'text-lg',
            )}
          >
            {title}
          </h3>
          {variant === 'default' && (
            <time dateTime={date} className="text-ink text-sm">
              {formattedDate}
            </time>
          )}
          {!compact && (
            <p className="text-sm leading-relaxed text-ink">{excerpt}</p>
          )}
        </div>
      </Link>
    </li>
  );
};
export default PostItem;
