import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const video = videoRef.current;

    if (!section || !text || !video) return;

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
    tl.from(video, {
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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const { kicker } = data;

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: 'var(--stone-grey)' }}
    >
      {/* Video Background with Portal Effect */}
      <div
        ref={videoRef}
        className="absolute inset-0"
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          style={{ 
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        >
          <source src={data.videoUrl || 'https://assets.codepen.io/127738/overview_of_tea_field.mp4'} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
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
