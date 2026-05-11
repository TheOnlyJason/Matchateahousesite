/**
 * Prefix for URLs of files in `/public` (e.g. `/frames/…`).
 * Uses Vite's `import.meta.env.BASE_URL` everywhere except GitHub Pages
 * project sites, where the first URL segment is the repo slug (fixes
 * mismatches if the bundle was built with a different `base` than the repo).
 */
export function publicAssetBase(): string {
  const fromVite = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  if (typeof window === 'undefined') return fromVite;

  const { hostname, pathname } = window.location;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return fromVite;
  }

  if (hostname.endsWith('github.io')) {
    const first = pathname.split('/').filter(Boolean)[0];
    if (first) return `/${first}/`;
  }

  return fromVite;
}
