import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageWithFallback } from './figma/ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

interface Chapter5Props {
  data: {
    headline: string;
    description: string;
    cta?: {
      text: string;
      link: string;
    };
  };
}

export function Chapter5({ data }: Chapter5Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img1 = image1Ref.current;
    const img2 = image2Ref.current;
    const img3 = image3Ref.current;
    const text = textRef.current;
    const cta = ctaRef.current;

    if (!section || !img1 || !img2 || !img3 || !text || !cta) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Stacking effect for images
    tl.from(img1, {
      x: -200,
      rotation: -10,
      opacity: 0,
      duration: 0.3,
    }, 0);

    tl.from(img2, {
      y: 200,
      rotation: 5,
      opacity: 0,
      duration: 0.3,
    }, 0.1);

    tl.from(img3, {
      x: 200,
      rotation: 10,
      opacity: 0,
      duration: 0.3,
    }, 0.2);

    // Text entrance
    tl.from(text, {
      y: 50,
      opacity: 0,
      duration: 0.2,
    }, 0.3);

    // CTA glow effect
    tl.from(cta, {
      scale: 0.8,
      opacity: 0,
      duration: 0.2,
    }, 0.5);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Editorial Collage */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Image 1 - Team collaboration */}
        <div
          ref={image1Ref}
          className="absolute w-[55vw] max-w-[280px] sm:max-w-[340px] md:w-[400px] h-[65vw] max-h-[360px] sm:max-h-[420px] md:h-[500px] left-[2%] sm:left-[8%] top-[12%] shadow-2xl"
          style={{ 
            transform: 'translateZ(0) rotate(-5deg)',
            willChange: 'transform',
            filter: 'grayscale(100%) contrast(1.2)'
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1760611656007-f767a8082758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZSUyMGJsYWNrJTIwd2hpdGV8ZW58MXx8fHwxNzcxMzg0NjM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 2 - Cupping bowl */}
        <div
          ref={image2Ref}
          className="absolute w-[50vw] max-w-[260px] sm:max-w-[300px] md:w-[350px] h-[58vw] max-h-[320px] sm:max-h-[380px] md:h-[450px] right-[2%] sm:right-[10%] top-[22%] shadow-2xl"
          style={{ 
            transform: 'translateZ(0) rotate(3deg)',
            willChange: 'transform',
            filter: 'grayscale(100%) contrast(1.2)'
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1724436493124-f37694b90099?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMGN1cHBpbmclMjBib3dsJTIwdGVhJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzcxMzg0NjMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Tea ceremony"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 3 - Hands/craftsmanship */}
        <div
          ref={image3Ref}
          className="absolute w-[45vw] max-w-[220px] sm:max-w-[260px] md:w-[300px] h-[55vw] max-h-[280px] sm:max-h-[340px] md:h-[400px] left-[28%] sm:left-[32%] bottom-[8%] shadow-2xl"
          style={{ 
            transform: 'translateZ(0) rotate(-3deg)',
            willChange: 'transform',
            filter: 'grayscale(100%) contrast(1.2)'
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1724436493124-f37694b90099?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMGN1cHBpbmclMjBib3dsJTIwdGVhJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzcxMzg0NjMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text Content */}
      <div
        ref={textRef}
        className="absolute top-10 right-4 left-4 sm:top-14 sm:right-8 md:top-16 md:right-16 text-right max-w-lg z-10"
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        <h2 className="text-white mb-3 sm:mb-4 tracking-wide uppercase" style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', fontWeight: 300 }}>
          {data.headline}
        </h2>
        <p className="text-white/80" style={{ fontSize: 'clamp(0.9375rem, 2vw, 1.25rem)', fontWeight: 300 }}>
          {data.description}
        </p>
      </div>

      {/* CTA Button */}
      {data.cta && (
        <button
          ref={ctaRef}
          type="button"
          className="absolute bottom-8 sm:bottom-16 left-1/2 -translate-x-1/2 px-8 sm:px-12 py-3 sm:py-4 min-h-[48px] rounded-full border-2 border-white text-white uppercase tracking-wider transition-all hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            transform: 'translateZ(0) translateX(-50%)',
            willChange: 'transform',
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
          }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              boxShadow: '0 0 50px rgba(255, 255, 255, 0.6)',
              duration: 0.3
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
              duration: 0.3
            });
          }}
        >
          {data.cta.text}
        </button>
      )}
    </div>
  );
}
