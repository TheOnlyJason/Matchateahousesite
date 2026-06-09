import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { publicAssetBase } from '../utils/publicAssetBase';

interface LoadingScreenProps {
  progress: number;
  isReady: boolean;
}

export function LoadingScreen({ progress, isReady }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: 'var(--stone-warm-white)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="text-center">
            {/* Brand Logo */}
            <motion.div
              className="mb-6 sm:mb-8 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={`${publicAssetBase()}constance-stacked-black.svg`}
                alt="Constance"
                style={{ height: 'clamp(64px, 12vw, 96px)', width: 'auto' }}
              />
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-56 sm:w-64 h-0.5 bg-black/10 rounded-full overflow-hidden relative">
              {/* Actual Progress Fill */}
              <motion.div
                className="h-full bg-[var(--matcha-green)] absolute left-0 top-0"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
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
      )}
    </AnimatePresence>
  );
}