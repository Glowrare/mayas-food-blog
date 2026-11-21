import Image from 'next/image';

const Hero = () => {
  return (
    <section className="bg-linear-to-b from-grey-900 to-grey-800 py-8 text-center">
      <div className="mx-auto h-[300px] w-[300px] overflow-hidden rounded-full bg-grey-700 shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
        <Image
          src="/images/site/avatar.jpg"
          alt="An illustrated portrait of Maya Reyes"
          width={320}
          height={320}
          loading="eager"
          className="h-full w-full object-cover object-top"
        />
      </div>
      <h1 className="my-4 text-[4rem] font-bold text-grey-300">Hi, I'm Maya.</h1>
      <p className="m-auto w-[90%] max-w-160 text-2xl text-grey-200">
        I blog about weeknight recipes and simple nutrition notes.
      </p>
    </section>
  );
};
export default Hero;
