import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Chapter4Props {
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

export function Chapter4({ data }: Chapter4Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const text = textRef.current;
    const card = cardRef.current;

    if (!section || !svg || !text || !card) return;

    // Get all SVG paths and set up for drawing animation
    const paths = svg.querySelectorAll('path, line, circle, rect');
    
    // Set up stroke-dasharray for drawing effect
    paths.forEach((path) => {
      const length = (path as SVGGeometryElement).getTotalLength?.() || 100;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

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

    // Text: clip-path reveal
    tl.from(text, {
      clipPath: 'inset(0 0 100% 0)',
      y: 56,
      opacity: 0,
      duration: 0.22,
    }, 0);

    tl.to(text, {
      clipPath: 'inset(0 0 0% 0)',
      y: 0,
      opacity: 1,
      duration: 0.28,
    }, 0.08);

    // Draw SVG paths
    tl.to(paths, {
      strokeDashoffset: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.02,
    }, 0.1);

    // Slide in glassmorphic card
    tl.from(card, {
      x: typeof window !== 'undefined' && window.innerWidth >= 768 ? 300 : 80,
      opacity: 0,
      duration: 0.3,
    }, 0.4);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const { kicker } = data;

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--stone-grey)] to-white" />

      {/* SVG Blueprint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <svg
          ref={svgRef}
          viewBox="0 0 800 600"
          className="w-[80%] h-[80%]"
          style={{ 
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        >
          {/* Schematic machine drawing */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main chamber */}
          <rect x="200" y="150" width="400" height="300" fill="none" stroke="var(--stone-dark)" strokeWidth="2" filter="url(#glow)" />
          
          {/* Internal components */}
          <circle cx="400" cy="300" r="80" fill="none" stroke="var(--matcha-green)" strokeWidth="2" filter="url(#glow)" />
          <circle cx="400" cy="300" r="60" fill="none" stroke="var(--matcha-green)" strokeWidth="1" opacity="0.6" />
          
          {/* Connecting pipes */}
          <line x1="200" y1="200" x2="150" y2="150" stroke="var(--stone-dark)" strokeWidth="2" />
          <line x1="600" y1="200" x2="650" y2="150" stroke="var(--stone-dark)" strokeWidth="2" />
          <line x1="400" y1="450" x2="400" y2="500" stroke="var(--stone-dark)" strokeWidth="3" />
          
          {/* Detail elements */}
          <rect x="250" y="180" width="100" height="40" fill="none" stroke="var(--matcha-dark)" strokeWidth="1" />
          <rect x="450" y="180" width="100" height="40" fill="none" stroke="var(--matcha-dark)" strokeWidth="1" />
          
          {/* Measurement markers */}
          <line x1="180" y1="150" x2="180" y2="450" stroke="var(--stone-dark)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="620" y1="150" x2="620" y2="450" stroke="var(--stone-dark)" strokeWidth="1" strokeDasharray="5,5" />
        </svg>
      </div>

      {/* Text Content */}
      <div
        ref={textRef}
        className="absolute top-12 left-4 right-4 sm:top-16 sm:left-8 md:top-24 md:left-24 max-w-xl"
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
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
        <p className="luxury-body max-w-md" style={{ fontSize: 'clamp(0.9375rem, 2vw, 1.25rem)', color: 'var(--luxury-charcoal)', opacity: 0.82 }}>
          {data.description}
        </p>
      </div>

      {/* Glassmorphic Card */}
      {data.sideNote && (
        <div
          ref={cardRef}
          className="absolute bottom-8 right-4 left-4 sm:bottom-16 sm:right-8 sm:left-auto md:bottom-24 md:right-24 p-6 sm:p-8 rounded-2xl backdrop-blur-xl"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.72)',
            border: '1px solid var(--luxury-line)',
            boxShadow: '0 12px 48px rgba(28, 28, 28, 0.08)',
            transform: 'translateZ(0)',
            willChange: 'transform',
            maxWidth: '350px'
          }}
        >
          <h3 className="luxury-kicker mb-3" style={{ fontSize: '0.6875rem', color: 'var(--luxury-moss)' }}>
            {data.sideNote.title}
          </h3>
          <p className="luxury-body" style={{ fontSize: '1rem', color: 'var(--luxury-charcoal)', opacity: 0.85 }}>
            {data.sideNote.description}
          </p>
        </div>
      )}
    </div>
  );
}