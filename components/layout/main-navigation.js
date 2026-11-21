import Link from 'next/link';
import Logo from './logo';

const navLinkClass =
  'text-base text-grey-100 hover:text-grey-200 active:text-grey-200 md:text-xl';

const MainNavigation = () => {
  return (
    <header className="sticky top-0 z-[9999] flex h-[5.5rem] w-full items-center justify-between bg-grey-900 px-[10%]">
      <Link
        href="/"
        aria-label="Maya's Kitchen Notes"
        className="flex items-center leading-[0]"
      >
        <Logo />
      </Link>
      <nav>
        <ul className="m-0 flex list-none items-baseline p-0 md:gap-2">
          <li className="mx-4">
            <Link href="/posts" className={navLinkClass}>
              Posts
            </Link>
          </li>
          <li className="mx-4">
            <Link href="/contact" className={navLinkClass}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainNavigation;
