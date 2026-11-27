import { CATEGORY_LABELS } from 'lib/recipe-summary.mjs';
import Image from 'next/image';

const PostHeader = (props) => {
  const { title, image, excerpt, categories = [], totalMinutes, date } = props;

  const category =
    CATEGORY_LABELS[categories.find((id) => id !== 'quick-easy')];
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const details = [
    category,
    totalMinutes ? `${totalMinutes} min` : null,
    formattedDate,
  ].filter(Boolean);

  return (
    <header className="grid items-center gap-8 border-b border-oat pb-8 md:pb-10 lg:grid-cols-[1.2fr_1fr]">
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-lavender">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1023px) 100vw, 55vw"
          loading="eager"
          className="object-cover"
        />
      </div>
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          The recipe
        </p>
        <h1 className="font-editorial text-4xl leading-tight text-brand md:text-5xl xl:text-6xl">
          {title}
        </h1>
        {excerpt && (
          <p className="max-w-prose text-base leading-relaxed text-ink">
            {excerpt}
          </p>
        )}
        {details.length > 0 && (
          <p className="text-sm font-medium uppercase tracking-wide text-brand">
            {details.join(' · ')}
          </p>
        )}
      </div>
    </header>
  );
};
export default PostHeader;
