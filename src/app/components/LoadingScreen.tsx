import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  progress: number;
  isReady: boolean;
  onComplete: () => void;
}

const LOADER_SAGE = '#b8c0b4';
const FULL_CIRCLE = Math.PI * 2;
const START_ANGLE = -Math.PI / 2;
const OUTER_RADIUS = 200;
const SCATTER_MIN = 95;
const SCATTER_RANGE = 215;
/** Brief beat after rings form before exit — keeps intro intact without long spin */
const MIN_DRIFT_MS = 800;

type RingDef = {
  id: string;
  text: string;
  radius: number;
  fontSize: number;
  maxOpacity: number;
  driftSpeed: number;
  fontWeight: number;
};

const RINGS: RingDef[] = [
  { id: 'inner', text: 'CONSTANCE · STUDIO', radius: 76, fontSize: 15, maxOpacity: 1, driftSpeed: 0.00015, fontWeight: 500 },
  { id: 'matcha', text: 'MATCHA · TENCHA · UJI', radius: 116, fontSize: 14, maxOpacity: 0.82, driftSpeed: -0.00012, fontWeight: 400 },
  { id: 'mill', text: 'MILLED · DAILY · CRAFT', radius: 158, fontSize: 13, maxOpacity: 0.58, driftSpeed: 0.0001, fontWeight: 400 },
  { id: 'outer', text: 'SAN FRANCISCO · TAIWAN · TEA', radius: OUTER_RADIUS, fontSize: 12, maxOpacity: 0.34, driftSpeed: -0.00008, fontWeight: 400 },
];

type LetterMeta = {
  id: string;
  char: string;
  ringIndex: number;
  orgAngle: number;
  orgRadius: number;
  scatterAngle: number;
  scatterRadius: number;
  scatterRotate: number;
  fontSize: number;
  fontWeight: number;
  maxOpacity: number;
};

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildLetters(): LetterMeta[] {
  const letters: LetterMeta[] = [];
  let globalIdx = 0;

  RINGS.forEach((ring, ringIndex) => {
    const chars = [...ring.text.replace(/ /g, '\u00A0')];
    chars.forEach((char, charIdx) => {
      const orgAngle = START_ANGLE + (charIdx / chars.length) * FULL_CIRCLE;
      const r1 = pseudoRandom(globalIdx * 3 + ringIndex);
      const r2 = pseudoRandom(globalIdx * 7 + 1);
      const r3 = pseudoRandom(globalIdx * 11 + 2);
      letters.push({
        id: `${ringIndex}-${charIdx}`,
        char,
        ringIndex,
        orgAngle,
        orgRadius: ring.radius,
        scatterAngle: r1 * FULL_CIRCLE,
        scatterRadius: SCATTER_MIN + Math.sqrt(r2) * SCATTER_RANGE,
        scatterRotate: r3 * 360 - 180,
        fontSize: ring.fontSize,
        fontWeight: ring.fontWeight,
        maxOpacity: ring.maxOpacity * (0.55 + 0.45 * (ring.radius / OUTER_RADIUS)),
      });
      globalIdx += 1;
    });
  });

  return letters;
}

const ALL_LETTERS = buildLetters();

function polarToTransform(angle: number, radius: number, rotateOffset = 0) {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const rotate = rotateOffset + (angle + Math.PI / 2) * (180 / Math.PI);
  return { x, y, rotate };
}

export function LoadingScreen({ progress, isReady, onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const counterRef = useRef<HTMLSpanElement>(null);
  const counterWrapRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  const driftRotation = useRef<number[]>(RINGS.map(() => 0));
  const driftTicker = useRef<(() => void) | null>(null);
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
    const getLetterEls = () =>
      ALL_LETTERS.map((l) => letterRefs.current.get(l.id)).filter(Boolean) as HTMLSpanElement[];

    const stopDrift = () => {
      if (driftTicker.current) {
        gsap.ticker.remove(driftTicker.current);
        driftTicker.current = null;
      }
    };

    const startDrift = () => {
      if (driftTicker.current) return;

      const tick = () => {
        ALL_LETTERS.forEach((meta) => {
          const el = letterRefs.current.get(meta.id);
          if (!el) return;
          driftRotation.current[meta.ringIndex] += RINGS[meta.ringIndex].driftSpeed * 16;
          const angle = meta.orgAngle + driftRotation.current[meta.ringIndex];
          const { x, y, rotate } = polarToTransform(angle, meta.orgRadius);
          gsap.set(el, { x, y, rotate, force3D: true });
        });
      };

      driftTicker.current = tick;
      gsap.ticker.add(tick);
    };

    const runExit = () => {
      if (exitStarted.current) return;
      exitStarted.current = true;
      stopDrift();

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
          x: (i) => {
            const m = ALL_LETTERS[i];
            const a = m.orgAngle + driftRotation.current[m.ringIndex];
            return Math.cos(a) * (m.orgRadius * 1.35);
          },
          y: (i) => {
            const m = ALL_LETTERS[i];
            const a = m.orgAngle + driftRotation.current[m.ringIndex];
            return Math.sin(a) * (m.orgRadius * 1.35);
          },
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

      ALL_LETTERS.forEach((meta) => {
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
          opacity: (i) => ALL_LETTERS[i]?.maxOpacity ?? 0.5,
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
          x: (i) => polarToTransform(ALL_LETTERS[i].orgAngle, ALL_LETTERS[i].orgRadius).x,
          y: (i) => polarToTransform(ALL_LETTERS[i].orgAngle, ALL_LETTERS[i].orgRadius).y,
          rotate: (i) => polarToTransform(ALL_LETTERS[i].orgAngle, ALL_LETTERS[i].orgRadius).rotate,
        },
        3.0
      );

      introTl.add(() => {
        organizeDone.current = true;
        organizeAt.current = Date.now();
        startDrift();
      }, 5.8);
    }, 50);

    const exitPoll = window.setInterval(() => {
      const driftElapsed = organizeAt.current ? Date.now() - organizeAt.current : 0;
      if (
        isReadyRef.current &&
        organizeDone.current &&
        displayedRef.current >= 100 &&
        driftElapsed >= MIN_DRIFT_MS
      ) {
        window.clearInterval(exitPoll);
        runExit();
      }
    }, 80);

    return () => {
      window.clearTimeout(initTimer);
      window.clearInterval(exitPoll);
      stopDrift();
      gsap.killTweensOf(getLetterEls());
    };
  }, []);

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
        style={{ width: 'min(98vw, 640px)', height: 'min(98vw, 640px)' }}
      >
        <div className="absolute left-1/2 top-1/2" style={{ width: 0, height: 0 }}>
          {ALL_LETTERS.map((meta) => (
            <span
              key={meta.id}
              ref={(el) => {
                if (el) letterRefs.current.set(meta.id, el);
                else letterRefs.current.delete(meta.id);
              }}
              data-ring={meta.ringIndex}
              className="absolute left-0 top-0 whitespace-pre will-change-transform"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: `${meta.fontSize}px`,
                fontWeight: meta.fontWeight,
                color: '#10120f',
                letterSpacing: '0.2em',
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
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(2.25rem, 7.5vw, 3.5rem)',
              fontWeight: 400,
              color: '#10120f',
              letterSpacing: '-0.02em',
            }}
          >
            <span ref={counterRef}>0</span>
          </span>
        </div>
      </div>
    </div>
  );
}
