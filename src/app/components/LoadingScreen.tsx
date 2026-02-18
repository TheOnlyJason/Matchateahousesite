import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (isComplete) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'var(--stone-warm-white)' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Brand Name */}
        <motion.h1
          className="mb-8 tracking-[0.3em] uppercase"
          style={{ fontSize: '3rem', fontWeight: 200, color: 'var(--stone-dark)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Constance
        </motion.h1>

        {/* Progress Bar */}
        <div className="w-64 h-0.5 bg-black/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--matcha-green)]"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.p
          className="mt-4 tracking-wider"
          style={{ fontSize: '0.875rem', fontWeight: 300, color: 'var(--stone-dark)', opacity: 0.6 }}
        >
          {Math.floor(progress)}%
        </motion.p>
      </div>
    </motion.div>
  );
}
