import { CATEGORY_LABELS } from 'lib/recipe-summary.mjs';
import Image from 'next/image';
import Link from 'next/link';

const EditorialHero = ({ recipe }) => {
  if (!recipe) return null;

  const { slug, title, image, excerpt, categories, totalMinutes } = recipe;
  const label = CATEGORY_LABELS[categories.find((id) => id !== 'quick-easy')];
  const details = [label, totalMinutes ? `${totalMinutes} min` : null].filter(
    Boolean,
  );

  return (
    <section
      aria-labelledby="lead-heading"
      className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]"
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-lavender">
        <Image
          src={`/images/posts/${slug}/${image}`}
          alt={title}
          fill
          preload
          sizes="(max-width: 1023px) 100 vw, 55vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          The Kitchen Edit
        </p>
        <h1
          id="lead-heading"
          className="font-editoria text-4xl leading-tight text-brand md:text-5xl xl:text-6xl"
        >
          {title}
        </h1>
        <p className="max-w-prose text-base leading-relaxed text-ink">
          {excerpt}
        </p>
        {details.length > 0 && (
          <p className="text-sm font-medium uppercase tracking-wide text-brand">
            {details.join(' . ')}
          </p>
        )}
        <Link
          href={`/posts/${slug}`}
          className="inline-flex min-h-11 items-center rounded-md bg-brand px-5 py-3 font-medium text-white hover:bg-ink"
        >
          Read the recipe
        </Link>
      </div>
    </section>
  );
};
export default EditorialHero;
