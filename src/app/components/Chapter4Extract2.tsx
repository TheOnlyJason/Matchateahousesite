import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { publicAssetBase } from '../utils/publicAssetBase';

gsap.registerPlugin(ScrollTrigger);

interface Chapter4Extract2Props {
  data: {
    kicker?: string;
    headline: string;
    description: string;
    sideNote?: {
      title: string;
      description: string;
    };
  };
}

export function Chapter4Extract2({ data }: Chapter4Extract2Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const src = `${publicAssetBase()}extract-2-bg-hq.jpg`;

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const card = cardRef.current;

    if (!section || !text || !card) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1.15,
        anticipatePin: 1,
      },
    });

    tl.from(
      text,
      {
        clipPath: 'inset(0 0 100% 0)',
        y: 56,
        opacity: 0,
        duration: 0.22,
      },
      0
    );

    tl.to(
      text,
      {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        opacity: 1,
        duration: 0.28,
      },
      0.08
    );

    tl.from(
      card,
      {
        x: typeof window !== 'undefined' && window.innerWidth >= 768 ? 300 : 80,
        opacity: 0,
        duration: 0.3,
      },
      0.4
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const { kicker } = data;

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-white"
      aria-label="Extract 2"
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
        style={{ objectPosition: 'center 42%' }}
        decoding="async"
        draggable={false}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.28) 45%, rgba(255,255,255,0.08) 100%)',
        }}
      />

      <div
        ref={textRef}
        className="absolute top-12 left-4 right-4 sm:top-16 sm:left-8 md:top-24 md:left-24 max-w-xl z-10"
        style={{
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      >
        {kicker ? (
          <p className="luxury-kicker mb-5 sm:mb-6" style={{ color: 'var(--luxury-moss)' }}>
            {kicker}
          </p>
        ) : null}
        <h2
          className="luxury-display mb-4"
          style={{ fontSize: 'clamp(1.75rem, 5.5vw, 3.75rem)', color: 'var(--luxury-charcoal)' }}
        >
          {data.headline}
        </h2>
        <p
          className="luxury-body max-w-md"
          style={{
            fontSize: 'clamp(0.9375rem, 2vw, 1.25rem)',
            color: 'var(--luxury-charcoal)',
            opacity: 0.82,
          }}
        >
          {data.description}
        </p>
      </div>

      {data.sideNote && (
        <div
          ref={cardRef}
          className="absolute bottom-8 right-4 left-4 sm:bottom-16 sm:right-8 sm:left-auto md:bottom-24 md:right-24 z-10 p-6 sm:p-8 rounded-2xl backdrop-blur-xl"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.72)',
            border: '1px solid var(--luxury-line)',
            boxShadow: '0 12px 48px rgba(28, 28, 28, 0.08)',
            transform: 'translateZ(0)',
            willChange: 'transform',
            maxWidth: '350px',
          }}
        >
          <h3 className="luxury-kicker mb-3" style={{ fontSize: '0.6875rem', color: 'var(--luxury-moss)' }}>
            {data.sideNote.title}
          </h3>
          <p
            className="luxury-body"
            style={{ fontSize: '1rem', color: 'var(--luxury-charcoal)', opacity: 0.85 }}
          >
            {data.sideNote.description}
          </p>
        </div>
      )}
    </div>
  );
}
