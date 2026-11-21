import Link from 'next/link';
import Logo from './logo';

const SiteFooter = () => {
  return (
    <footer className="bg-grey-900 px-8 py-20 text-white max-[480px]:p-8">
      <div className="flex justify-between gap-24 max-[480px]:flex-col max-[480px]:gap-4">
        <div className="leading-none">
          <Link href="/" aria-label="Maya's Kitchen Notes">
            <Logo />
          </Link>
          <small className="italic">
            Weeknight recipes and simple nitrition notes
          </small>
        </div>
        <div>
          <h3 className="my-[1em] font-bold uppercase">Explore</h3>
          <div className="flex flex-col gap-8">
            <Link href="/posts" className="text-white">
              All Recipes
            </Link>
            <Link href="/contact" className="text-white">
              Reach Out
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-16 mb-4 text-center text-[0.8rem] opacity-80">
        &copy; 2026 Maya Reyes . Made with love
      </div>
    </footer>
  );
};
export default SiteFooter;
