import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageWithFallback } from './figma/ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

interface Chapter5Props {
  data: {
    kicker?: string;
    headline: string;
    subhead?: string;
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
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img1 = image1Ref.current;
    const img2 = image2Ref.current;
    const img3 = image3Ref.current;
    const text = textRef.current;
    const cta = ctaRef.current;

    if (!section || !img1 || !img2 || !img3 || !text) return;
    if (Boolean(data.cta) && !cta) return;

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

    tl.from(img1, {
      x: -120,
      rotation: -6,
      opacity: 0,
      duration: 0.35,
    }, 0);

    tl.from(img2, {
      y: 160,
      x: 40,
      rotation: 4,
      opacity: 0,
      duration: 0.35,
    }, 0.08);

    tl.from(img3, {
      x: 140,
      y: 40,
      rotation: 7,
      opacity: 0,
      duration: 0.35,
    }, 0.16);

    // Text entrance
    tl.from(text, {
      y: 50,
      opacity: 0,
      duration: 0.2,
    }, 0.3);

    if (cta) {
      tl.from(cta, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
      }, 0.5);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [data.cta]);

  const { kicker, subhead } = data;

  const imgTone = 'grayscale(100%) contrast(1.12) brightness(0.96)';

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black isolate"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div
          ref={image1Ref}
          className="absolute left-[0%] sm:left-[2%] md:left-[3%] top-[10%] md:top-[12%] w-[min(88vw,480px)] md:w-[min(52vw,520px)] h-[min(92vw,520px)] md:h-[min(62vh,580px)] shadow-[0_32px_80px_rgba(0,0,0,0.55)] z-[1]"
          style={{
            transform: 'translateZ(0) rotate(-4deg)',
            willChange: 'transform',
            filter: imgTone,
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1760611656007-f767a8082758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZSUyMGJsYWNrJTIwd2hpdGV8ZW58MXx8fHwxNzcxMzg0NjM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          ref={image2Ref}
          className="absolute right-[0%] sm:right-[3%] md:right-[5%] top-[18%] md:top-[24%] w-[min(42vw,280px)] md:w-[min(28vw,300px)] h-[min(50vw,360px)] md:h-[min(38vh,400px)] shadow-[0_24px_64px_rgba(0,0,0,0.5)] z-[2]"
          style={{
            transform: 'translateZ(0) rotate(5deg)',
            willChange: 'transform',
            filter: imgTone,
            border: '1px solid rgba(255,255,255,0.22)',
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1724436493124-f37694b90099?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMGN1cHBpbmclMjBib3dsJTIwdGVhJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzcxMzg0NjMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Tea ceremony"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          ref={image3Ref}
          className="absolute left-[10%] md:left-[14%] bottom-[6%] md:bottom-[10%] w-[min(40vw,260px)] md:w-[min(28vw,280px)] h-[min(48vw,300px)] md:h-[min(36vh,360px)] shadow-[0_20px_56px_rgba(0,0,0,0.45)] z-[3]"
          style={{
            transform: 'translateZ(0) rotate(-5deg)',
            willChange: 'transform',
            filter: imgTone,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1724436493124-f37694b90099?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMGN1cHBpbmclMjBib3dsJTIwdGVhJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzcxMzg0NjMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="film-grain z-[4]" aria-hidden />

      <div
        ref={textRef}
        className="absolute top-10 right-4 left-4 z-[20] sm:top-14 sm:right-8 md:top-[4.5rem] md:right-10 lg:right-16 max-w-lg md:max-w-[min(36rem,48vw)] ml-auto text-left md:text-right rounded-sm border border-white/[0.06] bg-black/45 px-5 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:px-7 sm:py-8 md:px-9 md:py-9"
        style={{
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      >
        {kicker ? <p className="luxury-kicker text-white/55 mb-6 md:mb-8">{kicker}</p> : null}
        <h2
          className="luxury-display mb-3 text-balance text-white sm:mb-5"
          style={{
            fontSize: 'clamp(1.75rem, 5.5vw, 3.75rem)',
            textShadow: '0 2px 28px rgba(0,0,0,0.55)',
          }}
        >
          {data.headline}
        </h2>
        {subhead ? (
          <p
            className="luxury-body text-white/70 mb-4 sm:mb-5"
            style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', letterSpacing: '0.04em' }}
          >
            {subhead}
          </p>
        ) : null}
        <p className="luxury-body text-white/78" style={{ fontSize: 'clamp(0.9375rem, 2vw, 1.25rem)' }}>
          {data.description}
        </p>
      </div>

      {/* CTA Button */}
      {data.cta && (
        <Link
          ref={ctaRef}
          to={data.cta.link}
          className="absolute bottom-8 z-[25] sm:bottom-16 left-1/2 -translate-x-1/2 px-8 sm:px-12 py-3 sm:py-4 min-h-[48px] rounded-full border-2 border-white text-white uppercase tracking-wider transition-all hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black inline-flex items-center justify-center text-center no-underline"
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
        </Link>
      )}
    </div>
  );
}
