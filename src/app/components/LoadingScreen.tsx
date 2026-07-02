import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { getLogoBasePath, getLogoPoint, type LogoPathPoint } from '../utils/loaderLogoPath';

interface LoadingScreenProps {
  progress: number;
  isReady: boolean;
  onComplete: () => void;
}

const LOADER_SAGE = '#b8c0b4';
const FULL_CIRCLE = Math.PI * 2;
const SCATTER_MIN = 95;
const SCATTER_RANGE = 215;
/** Brief static hold after logo forms before exit */
const MIN_HOLD_MS = 600;
const LOGO_TEXT =
  'CONSTANCE · STUDIO · MATCHA · TENCHA · UJI · MILLED · DAILY · CRAFT · SAN FRANCISCO · TAIWAN · TEA';
const LETTER_FONT_SIZE = 14;
const LETTER_FONT_WEIGHT = 400;
const PATH_START = 0.03;
const PATH_SPAN = 0.94;

type LetterMeta = {
  id: string;
  char: string;
  orgPathProgress: number;
  scatterAngle: number;
  scatterRadius: number;
  scatterRotate: number;
};

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildLetters(): LetterMeta[] {
  const chars = [...LOGO_TEXT.replace(/ /g, '\u00A0')];
  return chars.map((char, charIdx) => {
    const orgPathProgress = PATH_START + (charIdx / chars.length) * PATH_SPAN;
    const r1 = pseudoRandom(charIdx * 3);
    const r2 = pseudoRandom(charIdx * 7 + 1);
    const r3 = pseudoRandom(charIdx * 11 + 2);
    return {
      id: `${charIdx}`,
      char,
      orgPathProgress,
      scatterAngle: r1 * FULL_CIRCLE,
      scatterRadius: SCATTER_MIN + Math.sqrt(r2) * SCATTER_RANGE,
      scatterRotate: r3 * 360 - 180,
    };
  });
}

function polarToTransform(angle: number, radius: number, rotateOffset = 0) {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const rotate = rotateOffset + (angle + Math.PI / 2) * (180 / Math.PI);
  return { x, y, rotate };
}

function getLetterTransform(
  meta: LetterMeta,
  base: LogoPathPoint[]
): { x: number; y: number; rotate: number } {
  const point = getLogoPoint(base, meta.orgPathProgress);
  return { x: point.x, y: point.y, rotate: point.rotate };
}

export function LoadingScreen({ progress, isReady, onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [letters, setLetters] = useState<LetterMeta[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const counterWrapRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  const logoBaseRef = useRef<LogoPathPoint[]>([]);
  const exitStarted = useRef(false);
  const organizeDone = useRef(false);
  const organizeAt = useRef<number | null>(null);
  const isReadyRef = useRef(isReady);
  const onCompleteRef = useRef(onComplete);
  const progressRef = useRef(progress);
  const displayedRef = useRef(0);
  const [ariaProgress, setAriaProgress] = useState(0);

  progressRef.current = progress;
  isReadyRef.current = isReady;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    logoBaseRef.current = getLogoBasePath();
    setLetters(buildLetters());
  }, []);

  useEffect(() => {
    const tick = () => {
      const real = Math.min(100, Math.floor(progressRef.current));
      const target = isReadyRef.current ? 100 : real;
      let displayed = displayedRef.current;

      if (displayed < target) {
        const step = isReadyRef.current && target === 100 ? 2 : 1;
        displayed += step;
        displayed = Math.min(displayed, target);
      }

      displayedRef.current = displayed;

      if (counterRef.current) {
        counterRef.current.textContent = String(displayed);
      }
      setAriaProgress(displayed);
    };

    tick();
    const id = window.setInterval(tick, 40);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (letters.length === 0 || logoBaseRef.current.length === 0) return;

    const base = logoBaseRef.current;

    const getLetterEls = () =>
      letters.map((l) => letterRefs.current.get(l.id)).filter(Boolean) as HTMLSpanElement[];

    const runExit = () => {
      if (exitStarted.current) return;
      exitStarted.current = true;

      const letterEls = getLetterEls();
      const exitTl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
          onCompleteRef.current();
        },
      });

      exitTl.to(counterWrapRef.current, { opacity: 0, scale: 0.96, duration: 0.25, ease: 'power2.in' }, 0);

      exitTl.to(
        letterEls,
        {
          duration: 0.5,
          ease: 'power2.inOut',
          opacity: 0,
          x: (i) => getLetterTransform(letters[i], base).x * 1.35,
          y: (i) => getLetterTransform(letters[i], base).y * 1.35,
        },
        0
      );

      exitTl.to(
        rootRef.current,
        { opacity: 0, duration: 0.55, ease: 'power2.inOut' },
        0.28
      );
    };

    const initTimer = window.setTimeout(() => {
      const letterEls = getLetterEls();
      if (letterEls.length === 0) return;

      letters.forEach((meta) => {
        const el = letterRefs.current.get(meta.id);
        if (!el) return;
        const { x, y, rotate } = polarToTransform(meta.scatterAngle, meta.scatterRadius, meta.scatterRotate);
        gsap.set(el, { x, y, rotate, opacity: 0, force3D: true });
      });

      gsap.set(counterWrapRef.current, { opacity: 0, scale: 0.88 });

      const introTl = gsap.timeline();

      introTl.to(counterWrapRef.current, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 0);

      introTl.to(
        letterEls,
        {
          opacity: 0.9,
          duration: 2.2,
          stagger: { amount: 1.4, from: 'random' },
          ease: 'power1.out',
        },
        0.2
      );

      introTl.to(
        letterEls,
        {
          duration: 2.5,
          ease: 'power3.inOut',
          stagger: { amount: 0.9, from: 'random' },
          x: (i) => getLetterTransform(letters[i], base).x,
          y: (i) => getLetterTransform(letters[i], base).y,
          rotate: (i) => getLetterTransform(letters[i], base).rotate,
        },
        3.0
      );

      introTl.add(() => {
        organizeDone.current = true;
        organizeAt.current = Date.now();
      }, 5.8);
    }, 50);

    const exitPoll = window.setInterval(() => {
      const holdElapsed = organizeAt.current ? Date.now() - organizeAt.current : 0;
      if (
        isReadyRef.current &&
        organizeDone.current &&
        displayedRef.current >= 100 &&
        holdElapsed >= MIN_HOLD_MS
      ) {
        window.clearInterval(exitPoll);
        runExit();
      }
    }, 80);

    return () => {
      window.clearTimeout(initTimer);
      window.clearInterval(exitPoll);
      gsap.killTweensOf(getLetterEls());
    };
  }, [letters]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: LOADER_SAGE }}
      role="status"
      aria-live="polite"
      aria-label={`Loading site, ${ariaProgress} percent`}
    >
      <div
        className="relative"
        style={{ width: 'min(96vw, 760px)', height: 'min(96vw, 760px)' }}
      >
        <div className="absolute left-1/2 top-1/2" style={{ width: 0, height: 0 }}>
          {letters.map((meta) => (
            <span
              key={meta.id}
              ref={(el) => {
                if (el) letterRefs.current.set(meta.id, el);
                else letterRefs.current.delete(meta.id);
              }}
              className="absolute left-0 top-0 whitespace-pre will-change-transform"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: `${LETTER_FONT_SIZE}px`,
                fontWeight: LETTER_FONT_WEIGHT,
                color: '#10120f',
                letterSpacing: '0.12em',
              }}
            >
              {meta.char}
            </span>
          ))}
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <span
            ref={counterWrapRef}
            className="tabular-nums leading-none"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: `${LETTER_FONT_SIZE}px`,
              fontWeight: LETTER_FONT_WEIGHT,
              color: '#10120f',
              letterSpacing: '0.2em',
            }}
          >
            <span ref={counterRef}>0</span>
          </span>
        </div>
      </div>
    </div>
  );
}
