import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

/** Reset window scroll when the route changes (SPA default keeps prior scroll). */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
