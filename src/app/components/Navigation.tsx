import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { publicAssetBase } from '../utils/publicAssetBase';

const HAMBURGER_LINKS = [
  { to: '/menu', label: 'Menu' },
  { to: '/careers', label: 'Career' },
] as const;

const linkClass =
  'text-white uppercase tracking-[0.28em] transition-all duration-300 ease-out hover:opacity-[0.85] hover:tracking-[0.32em] focus:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[44px] min-w-[44px] inline-flex items-center justify-center';

export function Navigation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close nav panel on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when nav panel is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 flex items-center justify-between mix-blend-difference"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="min-h-[44px] min-w-[44px] inline-flex items-center transition-opacity duration-300 hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Constance — home"
        >
          <img
            src={`${publicAssetBase()}constance-stacked-black.svg`}
            alt="Constance"
            style={{ height: '36px', width: 'auto' }}
          />
        </Link>

        {/* Hamburger: opens Menu + Career on all screen sizes */}
        <button
          type="button"
          className="text-white p-2 -mr-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="nav-menu-panel"
          aria-haspopup="true"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Full-screen panel: Menu + Career (tap hamburger to open) */}
      <div
        id="nav-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site links"
        className="fixed inset-0 z-40 bg-[var(--stone-dark)]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-2 py-20 px-6"
        style={{
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.2s ease, visibility 0.2s ease',
        }}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className="flex flex-col items-center gap-2 w-full max-w-xs"
          onClick={(e) => e.stopPropagation()}
        >
          {HAMBURGER_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`${linkClass} w-full py-4 text-center text-lg md:text-xl`}
              style={{ fontWeight: 400 }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {isHome && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-white/20 z-50 pointer-events-none">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}
    </>
  );
}
