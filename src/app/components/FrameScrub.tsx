import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
        <h1 className="text-white font-extralight tracking-[0.2em] sm:tracking-[0.3em] uppercase mix-blend-difference text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Farm To The Mill
        </h1>
      </div>
    </div>
  );
}