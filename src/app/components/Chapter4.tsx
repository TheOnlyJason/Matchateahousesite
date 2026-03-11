import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Chapter4Props {
  data: {
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
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Text entrance
    tl.from(text, {
      y: 100,
      opacity: 0,
      duration: 0.2,
    }, 0);

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
        <h2 className="mb-4 tracking-wide uppercase" style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', fontWeight: 300, color: 'var(--stone-dark)' }}>
          {data.headline}
        </h2>
        <p className="max-w-md" style={{ fontSize: 'clamp(0.9375rem, 2vw, 1.25rem)', fontWeight: 300, color: 'var(--stone-dark)', opacity: 0.8 }}>
          {data.description}
        </p>
      </div>

      {/* Glassmorphic Card */}
      {data.sideNote && (
        <div
          ref={cardRef}
          className="absolute bottom-8 right-4 left-4 sm:bottom-16 sm:right-8 sm:left-auto md:bottom-24 md:right-24 p-6 sm:p-8 rounded-2xl backdrop-blur-xl"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            transform: 'translateZ(0)',
            willChange: 'transform',
            maxWidth: '350px'
          }}
        >
          <h3 className="mb-3 tracking-wide" style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--matcha-dark)' }}>
            {data.sideNote.title}
          </h3>
          <p style={{ fontSize: '1rem', fontWeight: 300, color: 'var(--stone-dark)', opacity: 0.8 }}>
            {data.sideNote.description}
          </p>
        </div>
      )}
    </div>
  );
}