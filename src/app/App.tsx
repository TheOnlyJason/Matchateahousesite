import React from 'react';
import { Routes, Route } from 'react-router';
import { motion } from 'motion/react';
import { Navigation } from './components/Navigation';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { CareerPage } from './pages/CareerPage';

function App() {
  return (
    <main className="bg-background">
      <ScrollToTop />
      <Navigation />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="relative z-10"
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/careers" element={<CareerPage />} />
        </Routes>
      </motion.div>
    </main>
  );
}

export default App;