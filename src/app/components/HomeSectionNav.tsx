import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TeaLeafIcon } from './TeaLeafIcon';

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

  const leafTilt = -8 + activeIndex * -11;
  const leafTransition = motionOn
    ? 'transform 0.82s cubic-bezier(0.28, 0.85, 0.22, 1)'
    : 'none';

  return (
    <nav
      className="pointer-events-auto fixed left-5 top-1/2 z-[45] hidden -translate-y-1/2 md:block"
      aria-label="Sections"
    >
      <div ref={trackRef} className="relative">
        <div className="pointer-events-none absolute inset-0 z-10 overflow-visible" aria-hidden>
          <div
            className="absolute left-0 top-0 flex w-10 justify-center will-change-transform drop-shadow-[0_2px_6px_rgba(58,82,42,0.28)]"
            style={{
              transform: `translate(0px, ${leafY}px) translateY(-50%) rotate(${leafTilt}deg)`,
              transition: leafTransition,
            }}
          >
            <TeaLeafIcon variant="filled" width={18} height={24} />
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
                  className="flex h-10 w-10 shrink-0 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--luxury-moss)] focus-visible:ring-offset-2"
                  aria-label={`Go to ${section.label}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => goTo(section.id)}
                >
                  <TeaLeafIcon
                    variant="outline"
                    width={15}
                    height={20}
                    className={isActive ? 'opacity-0' : 'opacity-100'}
                  />
                </button>
                {isActive ? (
                  <span
                    className="whitespace-nowrap text-[0.6875rem] font-normal uppercase tracking-[0.28em]"
                    style={{ color: 'var(--luxury-moss)' }}
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
