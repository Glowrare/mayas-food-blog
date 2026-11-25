import { cn } from 'lib/utils';
import Link from 'next/link';

const SectionHeading = ({ id, title, desc, href, linkLabel, className }) => {
  return (
    <div
      className={cn(
        'mb-6 flex flex-wrap items-end justify-between gap-3',
        className,
      )}
    >
      <div className="min-w-0">
        <h2
          id={id}
          className="font-editorial text-3xl leading-tight text-brand md:text-4xl"
        >
          {title}
        </h2>
        {desc && <p className="mt-2 text-sm text-ink">{desc}</p>}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="text-sm font-medium text-brand underline underline-offset-4"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
};
export default SectionHeading;
