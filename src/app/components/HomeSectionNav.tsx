import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type HomeNavSection = {
  id: string;
  label: string;
};

function getPageTop(el: HTMLElement): number {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

/** Outline leaf for inactive slots */
function TeaLeafSlot({ active }: { active: boolean }) {
  return (
    <svg
      className={active ? 'opacity-0' : 'opacity-[0.38]'}
      viewBox="0 0 24 32"
      width="15"
      height="20"
      aria-hidden
    >
      <path
        d="M12 2.5v3M12 8.5c-4.2 0-7.5 3.4-7.5 7.6 0 3.9 2.6 7.1 6.2 7.8.5.1 1 .2 1.3.2.4 0 .8-.1 1.3-.2 3.6-.7 6.2-3.9 6.2-7.8 0-4.2-3.3-7.6-7.5-7.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M12 12v9" fill="none" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

/** Filled leaf that animates vertically between slots */
function TeaLeafActive() {
  return (
    <svg viewBox="0 0 24 32" width="18" height="24" aria-hidden className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
      <path
        d="M12 2.5v3M12 8.5c-4.2 0-7.5 3.4-7.5 7.6 0 3.9 2.6 7.1 6.2 7.8.5.1 1 .2 1.3.2.4 0 .8-.1 1.3-.2 3.6-.7 6.2-3.9 6.2-7.8 0-4.2-3.3-7.6-7.5-7.6Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="round"
        opacity="0.96"
      />
      <path d="M12 12v9" stroke="rgba(0,0,0,0.22)" strokeWidth="0.75" strokeLinecap="round" fill="none" />
    </svg>
  );
}

interface HomeSectionNavProps {
  lenis: Lenis | null;
  sections: readonly HomeNavSection[];
}

export function HomeSectionNav({ lenis, sections }: HomeSectionNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const metricsRef = useRef<{ top: number; bottom: number }[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [leafY, setLeafY] = useState(0);
  const [motionOn, setMotionOn] = useState(false);

  const refreshMetrics = useCallback(() => {
    ScrollTrigger.refresh();
    metricsRef.current = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return { top: 0, bottom: 0 };
      const top = getPageTop(el);
      return { top, bottom: top + el.offsetHeight };
    });
  }, [sections]);

  const measureLeafY = useCallback(() => {
    const track = trackRef.current;
    const slot = slotRefs.current[activeIndex];
    if (!track || !slot) return;
    const trackRect = track.getBoundingClientRect();
    const slotRect = slot.getBoundingClientRect();
    const centerY = slotRect.top - trackRect.top + slotRect.height / 2;
    setLeafY(centerY);
  }, [activeIndex]);

  useLayoutEffect(() => {
    measureLeafY();
  }, [activeIndex, measureLeafY, sections.length]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMotionOn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!lenis) return;

    const computeActive = (scroll: number) => {
      const metrics = metricsRef.current;
      if (metrics.length === 0) return;
      const probe = scroll + window.innerHeight * 0.18;
      let idx = 0;
      for (let i = 0; i < metrics.length; i++) {
        if (probe >= metrics[i].top) idx = i;
      }
      setActiveIndex(idx);
    };

    const onScroll = (instance: Lenis) => {
      computeActive(instance.scroll);
    };

    const unsub = lenis.on('scroll', onScroll);

    refreshMetrics();
    computeActive(lenis.scroll);

    const onResize = () => {
      refreshMetrics();
      computeActive(lenis.scroll);
      measureLeafY();
    };
    window.addEventListener('resize', onResize);

    const timeouts = [80, 320, 900].map((ms) =>
      window.setTimeout(() => {
        refreshMetrics();
        computeActive(lenis.scroll);
        measureLeafY();
      }, ms)
    );

    return () => {
      unsub();
      window.removeEventListener('resize', onResize);
      timeouts.forEach(clearTimeout);
    };
  }, [lenis, refreshMetrics, measureLeafY]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el || !lenis) return;
    lenis.scrollTo(el, { offset: 0, duration: 1.35, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  };

  if (!lenis) return null;

  const leafTilt = -4 + activeIndex * -9;
  const leafTransition = motionOn
    ? 'transform 0.82s cubic-bezier(0.28, 0.85, 0.22, 1)'
    : 'none';

  return (
    <nav
      className="pointer-events-auto fixed left-5 top-1/2 z-[45] hidden -translate-y-1/2 mix-blend-difference md:block"
      aria-label="Sections"
    >
      <div ref={trackRef} className="relative text-white">
        <div className="pointer-events-none absolute inset-0 z-10 overflow-visible" aria-hidden>
          <div
            className="absolute left-0 top-0 flex w-10 justify-center will-change-transform"
            style={{
              transform: `translate(0px, ${leafY}px) translateY(-50%) rotate(${leafTilt}deg)`,
              transition: leafTransition,
            }}
          >
            <TeaLeafActive />
          </div>
        </div>

        <ul className="relative z-0 flex flex-col gap-4">
          {sections.map((section, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={section.id}
                ref={(el) => {
                  slotRefs.current[index] = el;
                }}
                className="flex flex-row items-center gap-4"
              >
                <button
                  type="button"
                  className="flex h-10 w-10 shrink-0 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  aria-label={`Go to ${section.label}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => goTo(section.id)}
                >
                  <TeaLeafSlot active={isActive} />
                </button>
                {isActive ? (
                  <span
                    className="whitespace-nowrap text-[0.6875rem] font-normal uppercase tracking-[0.28em] text-white"
                    style={{ textShadow: '0 1px 12px rgba(0,0,0,0.45)' }}
                    aria-hidden
                  >
                    {section.label}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
