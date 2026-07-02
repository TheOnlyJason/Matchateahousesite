/** Constance swirl mark — offset outline from constance-mark-white.svg */
export const CONSTANCE_LOGO_PATH_D =
  'm-101.8 63.67l-4.01 2.04c7.08 13.89 8.32 29.71 3.51 44.54-4.82 14.82-15.12 26.88-29.01 33.96-28.68 14.61-63.89 3.17-78.5-25.51-14.61-28.67-3.17-63.88 25.51-78.49 9.98-5.09 21.12-7.19 32.21-6.09l0.45-4.48c-11.95-1.19-23.96 1.08-34.71 6.56-17.34 8.84-28.83 24.68-32.79 42.34q-0.25-0.58-0.53-1.14c-8.17-16.3-28.07-22.91-44.36-14.74-16.3 8.17-22.91 28.07-14.74 44.36l4.02-2.02c-7.05-14.07-1.34-31.26 12.73-38.32 14.08-7.05 31.27-1.34 38.32 12.73 7.06 14.08 1.35 31.27-12.73 38.32-4.9 2.46-10.35 3.45-15.78 2.88l-0.47 4.47q1.74 0.19 3.48 0.19c5.11 0 10.17-1.19 14.79-3.51 6.82-3.42 12.14-8.97 15.25-15.82 1.13 5.03 2.89 10.01 5.34 14.81 11.09 21.77 33.21 34.32 56.11 34.32 9.59-0.01 19.33-2.21 28.44-6.85 30.88-15.74 43.21-53.66 27.47-84.55z';

export type LogoPathPoint = {
  x: number;
  y: number;
  rotate: number;
};

const TARGET_SIZE = 560;
const SAMPLE_COUNT = 220;

function sampleBaseLogoPath(): LogoPathPoint[] {
  if (typeof document === 'undefined') return [];

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', CONSTANCE_LOGO_PATH_D);
  svg.appendChild(path);
  svg.style.position = 'absolute';
  svg.style.visibility = 'hidden';
  document.body.appendChild(svg);

  const bbox = path.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;
  const maxDim = Math.max(bbox.width, bbox.height) || 1;
  const fit = TARGET_SIZE / maxDim;

  const total = path.getTotalLength();
  const points: LogoPathPoint[] = [];

  for (let i = 0; i < SAMPLE_COUNT; i++) {
    const t = i / SAMPLE_COUNT;
    const p = path.getPointAtLength(t * total);
    const p2 = path.getPointAtLength(Math.min(total, t * total + total / SAMPLE_COUNT));
    const x = (p.x - cx) * fit;
    const y = (p.y - cy) * fit;
    const rotate = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
    points.push({ x, y, rotate });
  }

  document.body.removeChild(svg);
  return points;
}

function getPointOnPath(base: LogoPathPoint[], progress: number): LogoPathPoint {
  const len = base.length;
  const idx = (((progress % 1) + 1) % 1) * len;
  const i0 = Math.floor(idx) % len;
  const i1 = (i0 + 1) % len;
  const f = idx - Math.floor(idx);
  const a = base[i0];
  const b = base[i1];
  return {
    x: a.x + (b.x - a.x) * f,
    y: a.y + (b.y - a.y) * f,
    rotate: a.rotate + (b.rotate - a.rotate) * f,
  };
}

export function getLogoPoint(base: LogoPathPoint[], progress: number): LogoPathPoint {
  return getPointOnPath(base, progress);
}

let cachedBase: LogoPathPoint[] | null = null;

export function getLogoBasePath(): LogoPathPoint[] {
  if (!cachedBase) {
    cachedBase = sampleBaseLogoPath();
  }
  return cachedBase;
}
