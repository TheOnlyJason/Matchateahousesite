import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ConstanceWordmark } from './ConstanceWordmark';
import { publicAssetBase } from '../utils/publicAssetBase';

gsap.registerPlugin(ScrollTrigger);

/** Scroll timeline position (0–1) before CONSTANCE letters begin appearing */
const WORDMARK_ENTER_AT = 0.22;

interface FrameScrubProps {
  images: HTMLImageElement[];
}

export function FrameScrub({ images }: FrameScrubProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroWordmarkRef = useRef<HTMLDivElement>(null);
  const heroKickerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const wordmark = heroWordmarkRef.current;
    const kicker = heroKickerRef.current;
    if (!canvas || !section || images.length === 0) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let width = section.clientWidth;
    let height = section.clientHeight;

    const resize = () => {
      if (!section) return;
      width = section.clientWidth;
      height = section.clientHeight;
      canvas.width = width;
      canvas.height = height;
      render(lastFrame);
    };

    let lastFrame = 0;
    const render = (index: number) => {
      lastFrame = index;
      const img = images[Math.floor(index)];
      if (img) {
        context.clearRect(0, 0, width, height);
        context.drawImage(img, 0, 0, width, height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    if (wordmark) {
      const letters = wordmark.querySelectorAll<HTMLElement>('.constance-wordmark-letter');
      gsap.set(letters, { x: -72, opacity: 0 });
    }
    if (kicker) {
      gsap.set(kicker, { x: -48, opacity: 0 });
    }

    const scrollObj = { frame: 0 };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 0.5,
        onUpdate: () => render(scrollObj.frame),
      },
    });

    tl.to(
      scrollObj,
      {
        frame: images.length - 1,
        snap: 'frame',
        ease: 'none',
        duration: 1,
      },
      0
    );

    if (wordmark) {
      const letters = wordmark.querySelectorAll<HTMLElement>('.constance-wordmark-letter');
      const letterOpacity = 0.92;

      tl.fromTo(
        letters,
        { x: -72, opacity: 0 },
        {
          x: 0,
          opacity: letterOpacity,
          ease: 'none',
          duration: 0.06,
          stagger: { each: 0.018 },
        },
        WORDMARK_ENTER_AT
      );

      tl.to(
        letters,
        {
          x: 48,
          opacity: 0,
          ease: 'none',
          duration: 0.04,
          stagger: { each: 0.012 },
        },
        0.82
      );
    }

    if (kicker) {
      tl.fromTo(
        kicker,
        { x: -48, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none', duration: 0.1 },
        WORDMARK_ENTER_AT + 0.2
      );
      tl.to(kicker, { x: 40, opacity: 0, ease: 'none', duration: 0.18 }, 0.82);
    }

    return () => {
      window.removeEventListener('resize', resize);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [images]);

  return (
    <div ref={sectionRef} className="relative h-screen w-full bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Small logo mark — top-left corner */}
      <div className="absolute top-0 left-0 pointer-events-none px-4 pt-4 sm:px-6 sm:pt-5 md:px-8 md:pt-6 flex items-start" style={{ paddingTop: 'clamp(1rem, 3vw, 1.5rem)' }}>
        <img
          src={`${publicAssetBase()}constance-mark-white.svg`}
          alt=""
          aria-hidden="true"
          style={{ height: 'clamp(28px, 4vw, 40px)', width: 'auto', opacity: 0.85 }}
        />
      </div>

      {/* Hero — centered wordmark, letters reveal on scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 sm:px-8">
        <div className="w-full space-y-4 sm:space-y-5 md:space-y-6 text-center flex flex-col items-center">
          <div ref={heroWordmarkRef} className="will-change-transform flex justify-center w-full">
            <ConstanceWordmark
              as="h1"
              size="hero"
              color="white"
              splitLetters
              opacity={0.92}
            />
          </div>
          <p
            ref={heroKickerRef}
            className="text-white/80 font-light tracking-[0.28em] sm:tracking-[0.35em] uppercase will-change-transform text-center"
            style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)', opacity: 0 }}
          >
            Tea &amp; Matcha
          </p>
        </div>
      </div>
    </div>
  );
}