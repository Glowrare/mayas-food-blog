import Image from 'next/image';

const PostHeader = (props) => {
  const { title, image } = props;

  return (
    <header className="my-4 flex flex-col-reverse items-center justify-between gap-4 border-b-8 border-primary-100 pb-8 md:my-8 md:flex-row md:items-end">
      <h1 className="m-0 text-center text-[2rem] leading-[initial] font-bold text-primary-500 md:text-left md:text-[4rem]">
        {title}
      </h1>
      <div className="relative h-[120px] w-[200px] shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="200px"
          loading="eager"
          className="object-cover"
        />
      </div>
    </header>
  );
};
export default PostHeader;
