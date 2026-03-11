import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/careers', label: 'Career' },
] as const;

const linkClass =
  'text-white uppercase tracking-wider transition-opacity hover:opacity-90 focus:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[44px] min-w-[44px] inline-flex items-center justify-center';

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

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
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
          className={`${linkClass} tracking-[0.3em] text-left`}
          style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)', fontWeight: 400 }}
        >
          Constance
        </Link>

        {/* Desktop: inline links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          <Link to="/menu" className={linkClass} style={{ fontSize: '0.75rem', fontWeight: 400 }}>
            Menu
          </Link>
          <Link to="/careers" className={linkClass} style={{ fontSize: '0.75rem', fontWeight: 400 }}>
            Career
          </Link>
        </div>

        {/* Mobile: hamburger button */}
        <button
          type="button"
          className="md:hidden text-white p-2 -mr-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
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

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className="fixed inset-0 z-40 md:hidden bg-[var(--stone-dark)]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-2 py-20 px-6"
        style={{
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.2s ease, visibility 0.2s ease',
        }}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`${linkClass} w-full max-w-xs py-4 text-center text-lg`}
            style={{ fontWeight: 400 }}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
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
