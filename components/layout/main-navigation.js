'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './logo';
import { cn } from 'lib/utils';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Recipes' },
  { href: '/contact', label: 'Contact' },
];

function NavLinks({ pathname, onNavigate, mobile = false }) {
  return (
    <ul className={cn('m-0 list-none p-0', mobile ? 'flex flex-col gap-1' : 'flex items-center gap-6')}>
      {navigation.map(({ href, label }) => {
        const exact = pathname === href;
        const active = exact || (href !== '/' && pathname.startsWith(`${href}/`));
        return (
          <li key={href}>
            <Link href={href} aria-current={exact ? 'page' : undefined} onClick={onNavigate}
              className={cn('flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-brand hover:bg-lavender',
                active && 'bg-lavender underline underline-offset-4')}>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function MainNavigation() {
  const pathname = usePathname();
  return <NavigationHeader key={pathname} pathname={pathname} />;
}

function NavigationHeader({ pathname }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);

  function handleKeyDown(event) {
    if (event.key === 'Escape' && menuOpen) {
      closeMenu();
      toggleRef.current?.focus();
    }
  }

  return (
    <header className="relative z-20 border-b border-oat bg-canvas text-brand" onKeyDown={handleKeyDown}>
      <div className="bg-brand px-4 py-2 text-center text-xs tracking-wide text-white">Good food for everyday life.</div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/" aria-label="Maya's Kitchen Notes" onClick={closeMenu}><Logo /></Link>
        <nav aria-label="Primary navigation" className="hidden md:block"><NavLinks pathname={pathname} /></nav>
        <button ref={toggleRef} type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(open => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-brand-muted md:hidden">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
        <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!menuOpen}
          className="w-full border-t border-oat pt-3 md:hidden">
          <NavLinks pathname={pathname} onNavigate={closeMenu} mobile />
        </nav>
      </div>
    </header>
  );
}
