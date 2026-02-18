import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { Chapter1 } from './components/Chapter1';
import { Chapter2 } from './components/Chapter2';
import { Chapter3 } from './components/Chapter3';
import { Chapter4 } from './components/Chapter4';
import { Chapter5 } from './components/Chapter5';
import { Chapter6 } from './components/Chapter6';
import data from './data.json';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false, // Disable smooth scroll on touch devices
    });

    lenisRef.current = lenis;

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Animation loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, [isLoading]);

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Loading Screen */}
      {isLoading && <LoadingScreen />}
      
      <div className="relative">
        {/* Navigation with Progress Bar */}
        <Navigation />
        
        {/* Chapter 1: The Portal */}
        <Chapter1 data={data.chapters[0]} />

        {/* Chapter 2: The Reveal */}
        <Chapter2 data={data.chapters[1]} />

        {/* Chapter 3: Transformation */}
        <Chapter3 data={data.chapters[2]} />

        {/* Chapter 4: Precision */}
        <Chapter4 data={data.chapters[3]} />

        {/* Chapter 5: Connection */}
        <Chapter5 data={data.chapters[4]} />

        {/* Chapter 6: The Sanctuary */}
        <Chapter6 data={data.chapters[5]} contact={data.contact} />
      </div>
    </>
  );
}