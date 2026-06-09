import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { publicAssetBase } from '../utils/publicAssetBase';

gsap.registerPlugin(ScrollTrigger);

interface Chapter2Props {
  data: {
    kicker?: string;
    headline: string;
    description: string;
    videoUrl?: string;
  };
}

export function Chapter2({ data }: Chapter2Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const bg = bgRef.current;

    if (!section || !text || !bg) return;

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

    // Portal scale effect
    tl.from(bg, {
      scale: 0.3,
      opacity: 0,
      duration: 0.5,
    }, 0);

    // Text: clip-path reveal + parallax
    tl.from(text, {
      clipPath: 'inset(0 0 100% 0)',
      y: 48,
      opacity: 0,
      duration: 0.3,
    }, 0.2);

    tl.to(text, {
      clipPath: 'inset(0 0 0% 0)',
      y: 0,
      opacity: 1,
      duration: 0.35,
    }, 0.25);

    tl.to(text, {
      y: -50,
      duration: 0.5,
    }, 0.5);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const { kicker } = data;

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: 'var(--stone-grey)' }}
    >
      {/* Tea field background */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      >
        <img
          src={`${publicAssetBase()}source-bg-hq.jpg`}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover pointer-events-none select-none"
          decoding="async"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/55" />
      </div>

      {/* Parallax Text */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center"
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        {kicker ? (
          <p className="luxury-kicker text-white/70 mb-6 sm:mb-8">{kicker}</p>
        ) : null}
        <h2
          className="luxury-display text-white mb-4 sm:mb-6"
          style={{ fontSize: 'clamp(2rem, 6.5vw, 4.25rem)' }}
        >
          {data.headline}
        </h2>
        <p className="luxury-body text-white/90 max-w-2xl" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
          {data.description}
        </p>
      </div>
    </div>
  );
}
