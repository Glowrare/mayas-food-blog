import Link from 'next/link';
import Image from 'next/image';

const PostItem = (props) => {
  const { title, image, date, excerpt, slug } = props.post;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className="bg-grey-800 text-center shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
      <Link href={linkPath} className="text-grey-100">
        <div className="max-h-80 w-full overflow-hidden">
          <Image
            src={imagePath}
            alt={title}
            width={300}
            height={200}
            sizes="(max-width: 767px) 100vw, 50vw"
            className="block h-auto w-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="my-2 text-2xl font-bold">{title}</h3>
          <time className="italic text-grey-300">{formattedDate}</time>
          <p className="my-[1em] leading-6">{excerpt}</p>
        </div>
      </Link>
    </li>
  );
};
export default PostItem;
