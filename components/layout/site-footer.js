import Link from 'next/link';
import Logo from './logo';

export default function SiteFooter() {
  return (
    <footer className="bg-brand text-canvas">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-10 text-center sm:px-6 lg:px-10">
        <Link href="/" aria-label="Maya's Kitchen Notes" className="inline-block">
          <Logo />
        </Link>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-lavender">
          Weeknight recipes and simple nutrition notes.
        </p>
        <nav aria-label="Footer navigation" className="mt-5">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-lavender">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/posts" className="inline-flex min-h-11 items-center hover:underline">
                All Recipes
              </Link>
            </li>
            <li>
              <Link href="/contact" className="inline-flex min-h-11 items-center hover:underline">
                Reach Out
              </Link>
            </li>
          </ul>
        </nav>
        <p className="mt-5 w-full max-w-lg border-t border-brand-muted pt-5 text-xs leading-relaxed text-lavender">
          © 2026 Maya's Kitchen Notes · Made with love
        </p>
      </div>
    </footer>
  );
}
