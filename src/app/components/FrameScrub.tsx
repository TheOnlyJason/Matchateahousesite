import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { publicAssetBase } from '../utils/publicAssetBase';

gsap.registerPlugin(ScrollTrigger);

interface FrameScrubProps {
  images: HTMLImageElement[];
}

export function FrameScrub({ images }: FrameScrubProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
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

    const scrollObj = { frame: 0 };
    const tl = gsap.to(scrollObj, {
      frame: images.length - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 0.5,
        onUpdate: () => render(scrollObj.frame),
      },
    });

    return () => {
      window.removeEventListener('resize', resize);
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
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

      {/* Hero center content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 sm:px-8">
        <div className="max-w-4xl text-center space-y-4 sm:space-y-5 md:space-y-6">
          <img
            src={`${publicAssetBase()}constance-wordmark-white.svg`}
            alt="Constance"
            className="mx-auto"
            style={{ height: 'clamp(4rem, 14vw, 9rem)', width: 'auto', opacity: 0.92 }}
          />
          <p
            className="text-white/80 font-light tracking-[0.28em] sm:tracking-[0.35em] uppercase"
            style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}
          >
            Tea &amp; Matcha
          </p>
        </div>
      </div>
    </div>
  );
}