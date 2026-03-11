import React, { useEffect, useMemo } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { LoadingScreen } from '../components/LoadingScreen';
import { FrameScrub } from '../components/FrameScrub';
import { Chapter2 } from '../components/Chapter2';
import { Chapter3 } from '../components/Chapter3';
import { Chapter4 } from '../components/Chapter4';
import { Chapter5 } from '../components/Chapter5';
import { Chapter6 } from '../components/Chapter6';

const FRAME_COUNT = 192;

const contentData = {
  chapter2: { headline: "Farm to the Mill", description: "Nestled in the misty hills of Uji." },
  chapter3: { headline: "Purity", description: "Every leaf is stone-ground." },
  chapter4: { headline: "Precision", description: "80°C boundary.", sideNote: { title: "Temp", description: "Strict." }},
  chapter5: { headline: "Community", description: "A space for reflection.", cta: { text: "Join", link: "#" }},
  chapter6: { headline: "Visit", description: "Experience the ritual." },
  contact: { address: "123 Matcha Lane", city: "SF", state: "CA", zip: "94103", email: "hi@tea.com", phone: "555" }
};

export function HomePage() {
  const frameUrls = useMemo(() =>
    Array.from({ length: FRAME_COUNT }, (_, i) =>
      `/frames/${(i + 1).toString().padStart(4, '0')}.jpg`
    ), []);

  const { progress, isReady, images } = useImagePreloader(frameUrls);

  useEffect(() => {
    if (!isReady) return;
    const lenis = new Lenis();
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [isReady]);

  return (
    <>
      <LoadingScreen progress={progress} isReady={isReady} />
      <AnimatePresence>
        {isReady && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <FrameScrub images={images} />
            <div className="relative z-10">
              <Chapter2 data={contentData.chapter2} />
              <Chapter3 data={contentData.chapter3} />
              <Chapter4 data={contentData.chapter4} />
              <Chapter5 data={contentData.chapter5} />
              <Chapter6 data={contentData.chapter6} contact={contentData.contact} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
