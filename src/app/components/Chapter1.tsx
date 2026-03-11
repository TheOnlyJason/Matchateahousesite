import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Chapter1Props {
  data: {
    subtitle: string;
    videoUrl?: string;
  };
}

export function Chapter1({ data }: Chapter1Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const text = textRef.current;

    if (!section || !video || !text) return;

    // Pin the section for extended scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Animate text blur and fade
    tl.to(text, {
      opacity: 0,
      filter: 'blur(10px)',
      duration: 0.3,
    }, 0);

    // Video scrubbing
    if (video.duration) {
      tl.to(video, {
        currentTime: video.duration,
        duration: 1,
      }, 0);
    }

    // Zoom effect
    tl.to(section, {
      scale: 1.2,
      duration: 0.7,
    }, 0.3);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ 
        backgroundColor: 'var(--stone-warm-white)',
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        <source src={data.videoUrl || 'https://assets.codepen.io/127738/overview_of_tea_field.mp4'} type="video/mp4" />
      </video>

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered Text */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform, opacity, filter'
        }}
      >
        <h1 className="text-white tracking-[0.2em] uppercase" style={{ fontSize: '6rem', fontWeight: 200 }}>
          {data.subtitle}
        </h1>
      </div>
    </div>
  );
}
