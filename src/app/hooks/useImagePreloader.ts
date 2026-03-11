// src/app/hooks/useImagePreloader.ts
import { useState, useEffect } from 'react';

export function useImagePreloader(imageUrls: string[]) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    let loadedCount = 0;
    const total = imageUrls.length;
    const loadedImages: HTMLImageElement[] = [];

    imageUrls.forEach((url, index) => {
      const img = new Image();
      img.src = url; // This line triggers the browser download
      img.onload = () => {
        loadedCount++;
        loadedImages[index] = img;
        setProgress(Math.floor((loadedCount / total) * 100));
        if (loadedCount === total) {
          setImages(loadedImages);
          setIsReady(true);
        }
      };
    });
  }, [imageUrls]);

  return { progress, isReady, images };
}