import { useState, useEffect } from 'react';

/**
 * Detects if the user is on a mobile device
 */
export function useIsMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Hook to detect window size changes
 */
export function useWindowSize() {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  
  const getSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
