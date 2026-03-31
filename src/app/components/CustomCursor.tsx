import React, { useEffect, useRef, useState } from 'react';
import { Leaf } from 'lucide-react';

/**
 * Cursor look — change this one line to try another style:
 * - `dotRing` — white dot + outer ring (original)
 * - `teaLeaf` — minimal leaf outline (on-brand)
 * - `minimal` — single soft dot, no ring
 * - `crosshair` — thin cross + center dot
 */
type CursorPreset = 'dotRing' | 'teaLeaf' | 'minimal' | 'crosshair';

const CURSOR_PRESET: CursorPreset = 'teaLeaf';

const LEAF_SIZE = 28;
const DOT_SIZE = 16;
const RING_SIZE = 40;

const hoverTransition = 'transition-[transform,opacity] duration-200 ease-out';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);

  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  const dotLayerRef = useRef<HTMLDivElement>(null);
  const ringLayerRef = useRef<HTMLDivElement>(null);
  const singleLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mq.matches);
    const handler = () => setIsPointerFine(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    const applyPosition = () => {
      rafRef.current = 0;
      const { x, y } = posRef.current;

      if (CURSOR_PRESET === 'dotRing') {
        const dot = dotLayerRef.current;
        const ring = ringLayerRef.current;
        if (dot) {
          dot.style.transform = `translate3d(${x - DOT_SIZE / 2}px, ${y - DOT_SIZE / 2}px, 0)`;
        }
        if (ring) {
          ring.style.transform = `translate3d(${x - RING_SIZE / 2}px, ${y - RING_SIZE / 2}px, 0)`;
        }
        return;
      }

      const el = singleLayerRef.current;
      if (!el) return;

      if (CURSOR_PRESET === 'teaLeaf') {
        el.style.transform = `translate3d(${x - LEAF_SIZE / 2}px, ${y - LEAF_SIZE / 2}px, 0)`;
      } else if (CURSOR_PRESET === 'minimal') {
        el.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0)`;
      } else if (CURSOR_PRESET === 'crosshair') {
        el.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current === 0) {
        rafRef.current = requestAnimationFrame(applyPosition);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  const ringOpacity = isHovering ? 'opacity-50' : 'opacity-80';

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {CURSOR_PRESET === 'dotRing' && (
        <>
          <div
            ref={dotLayerRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
          >
            <div
              className={`w-4 h-4 rounded-full bg-white origin-center ${hoverTransition} ${
                isHovering ? 'scale-150' : 'scale-100'
              }`}
              style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}
            />
          </div>
          <div
            ref={ringLayerRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
          >
            <div
              className={`w-10 h-10 rounded-full border border-white origin-center ${hoverTransition} ${ringOpacity} ${
                isHovering ? 'scale-150' : 'scale-100'
              }`}
              style={{ borderWidth: 1 }}
            />
          </div>
        </>
      )}

      {CURSOR_PRESET === 'teaLeaf' && (
        <div
          ref={singleLayerRef}
          className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference text-white will-change-transform"
        >
          <div
            className={`origin-center ${hoverTransition} ${
              isHovering ? 'scale-[1.35] -rotate-[8deg]' : 'scale-100 rotate-0'
            }`}
          >
            <Leaf size={LEAF_SIZE} strokeWidth={1.25} aria-hidden />
          </div>
        </div>
      )}

      {CURSOR_PRESET === 'minimal' && (
        <div
          ref={singleLayerRef}
          className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        >
          <div
            className={`w-3 h-3 rounded-full bg-white/90 origin-center ${hoverTransition} ${
              isHovering ? 'scale-[1.6]' : 'scale-100'
            }`}
            style={{ boxShadow: '0 0 14px rgba(255, 255, 255, 0.45)' }}
          />
        </div>
      )}

      {CURSOR_PRESET === 'crosshair' && (
        <div
          ref={singleLayerRef}
          className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference text-white will-change-transform"
        >
          <div className={`origin-center ${hoverTransition} ${isHovering ? 'scale-[1.2]' : 'scale-100'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth={1} strokeLinecap="round" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
}
