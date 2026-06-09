import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';
import { motion } from 'motion/react';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { LoadingScreen } from '../components/LoadingScreen';
import { FrameScrub } from '../components/FrameScrub';
import { Chapter2 } from '../components/Chapter2';
import { Chapter3 } from '../components/Chapter3';
import { Chapter4 } from '../components/Chapter4';
import { Chapter4Extract2 } from '../components/Chapter4Extract2';
import { Chapter5 } from '../components/Chapter5';
import { Chapter6 } from '../components/Chapter6';
import { HomeSectionNav, type HomeNavSection } from '../components/HomeSectionNav';
import { publicAssetBase } from '../utils/publicAssetBase';

const FRAME_COUNT = 240;

const HOME_NAV_SECTIONS: readonly HomeNavSection[] = [
  { id: 'home-hero', label: 'Home' },
  { id: 'home-freshness', label: 'Freshness' },
  { id: 'home-source', label: 'Source' },
  { id: 'home-extraction', label: 'Extract' },
  { id: 'home-extract-2', label: 'Extract II' },
  { id: 'home-who', label: 'Obsession' },
  { id: 'home-studio', label: 'Studio' },
];

const contentData = {
  chapter2: {
    headline: 'The Source',
    description:
      'Straight from Uji, Japan, we work directly with heritage farmers to source single-cultivar tencha. Zero blends. Zero compromise. Just the pure expression of the soil.',
  },
  chapter3: {
    headline: 'Freshness is the new standard.',
    description:
      "It is the shortest distance between a Japanese farm and your San Francisco cup. Freshness you can see. By milling in-house, we capture the farmer's intention and the true delicacy of the harvest. It is a moment of clarity you have to taste to believe.",
  },
  chapter4: {
    headline: 'The Physics of Extraction',
    description:
      'Traditional ceremony, engineered for precision. We utilize proprietary extraction technology that controls pressure, temperature, and flow to the decimal point.',
    sideNote: {
      title: 'Also pouring',
      description: 'High-mountain oolong, sourced directly from Taiwan.',
    },
  },
  chapter5: {
    kicker: 'Who we are',
    headline: 'Engineered by Obsession',
    subhead: 'Traditional ritual. Modern rhythm.',
    description:
      'Technology handles the consistency; we handle the connection. We built this space for the community—an experience to slow down and taste the difference.',
    cta: { text: 'Join our team', link: '/careers' },
  },
  chapter6: {
    headline: 'The Studio',
    description:
      'A curated space for connection in the Richmond District. Part laboratory, part sanctuary. Join us for private tastings, educational workshops, and a moment of pause in a chaotic world.',
    signoff: 'Elevating your daily pour through the science of craft and the soul of the leaves.',
  },
  contact: {
    venueName: 'Constance',
    address: '3512 Balboa St.',
    city: 'San Francisco',
    state: 'CA',
    zip: '94121',
    neighborhood: 'Richmond District',
    email: 'hello@constance.sf',
    phone: '(415) 555-0100',
  },
};

export function HomePage() {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const frameUrls = useMemo(() => {
    const base = publicAssetBase();
    return Array.from({ length: FRAME_COUNT }, (_, i) =>
      `${base}frames2/${(i + 1).toString().padStart(4, '0')}.jpg`
    );
  }, []);

  const { progress, isReady, images } = useImagePreloader(frameUrls);
  const handleLoaderComplete = useCallback(() => setLoaderDone(true), []);

  useEffect(() => {
    if (!isReady || !loaderDone) return;
    const instance = new Lenis({
      lerp: 0.065,
      smoothWheel: true,
      wheelMultiplier: 0.92,
    });
    setLenis(instance);
    const raf = (time: number) => {
      instance.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => {
      setLenis(null);
      instance.destroy();
    };
  }, [isReady, loaderDone]);

  return (
    <>
      <LoadingScreen progress={progress} isReady={isReady} onComplete={handleLoaderComplete} />
      {isReady && loaderDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
            <HomeSectionNav lenis={lenis} sections={HOME_NAV_SECTIONS} />
            <section id="home-hero" className="relative" aria-label="Home">
              <FrameScrub images={images} />
            </section>
            <div className="relative z-10 flex flex-col">
              <section id="home-freshness" className="relative" aria-label="Freshness">
                <Chapter3 data={contentData.chapter3} />
              </section>
              <section id="home-source" className="relative" aria-label="The Source">
                <Chapter2 data={contentData.chapter2} />
              </section>
              <section id="home-extraction" className="relative" aria-label="Extraction">
                <Chapter4 data={contentData.chapter4} />
              </section>
              <section id="home-extract-2" className="relative" aria-label="Extract 2">
                <Chapter4Extract2 data={contentData.chapter4} />
              </section>
              <section id="home-who" className="relative" aria-label="Who we are">
                <Chapter5 data={contentData.chapter5} />
              </section>
              <section id="home-studio" className="relative" aria-label="The Studio">
                <Chapter6 data={contentData.chapter6} contact={contentData.contact} />
              </section>
            </div>
          </motion.div>
      )}
    </>
  );
}
