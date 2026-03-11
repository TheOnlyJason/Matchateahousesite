import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

// Placeholder images – replace with your own assets
const PLACEHOLDER = {
  hero: 'https://placehold.co/1200x800/f5f3f0/2a2a2a?text=Menu+Hero',
  section: (label: string) => `https://placehold.co/800x500/f5f3f0/558b2f?text=${encodeURIComponent(label)}`,
};

const menuSections = [
  {
    title: 'Matcha',
    items: [
      { name: 'Classic Matcha', description: 'Stone-ground ceremonial grade', price: '6' },
      { name: 'Matcha Latte', description: 'Oat or dairy', price: '7' },
      { name: 'Iced Matcha', description: 'Shaken, lightly sweetened', price: '6.50' },
      { name: 'Matcha Lemonade', description: 'House lemonade, hint of mint', price: '7' },
    ],
  },
  {
    title: 'Tea',
    items: [
      { name: 'Sencha', description: 'Steamed green, Uji', price: '5' },
      { name: 'Hojicha', description: 'Roasted green, nutty', price: '5' },
      { name: 'Genmaicha', description: 'Green tea with roasted rice', price: '5.50' },
      { name: 'Kyoto Cold Brew', description: 'Slow-steeped overnight', price: '6' },
    ],
  },
  {
    title: 'Pastries & Bites',
    items: [
      { name: 'Matcha Financier', description: 'Almond, stone-ground matcha', price: '5' },
      { name: 'Warabi Mochi', description: 'Kinako, seasonal', price: '8' },
      { name: 'Rice Ball (Onigiri)', description: 'Fillings change daily', price: '6' },
    ],
  },
];

export function MenuPage() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: 'var(--stone-warm-white)' }}
    >
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${PLACEHOLDER.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.85)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--stone-warm-white)]/80 to-[var(--stone-warm-white)]" />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="tracking-[0.2em] uppercase mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 300, color: 'var(--stone-dark)' }}
          >
            Menu
          </h1>
          <p
            className="max-w-xl mx-auto"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 300, color: 'var(--stone-dark)', opacity: 0.85, letterSpacing: '0.05em' }}
          >
            Stone-ground matcha, single-origin teas, and house-made pastries.
          </p>
        </motion.div>
      </section>

      {/* Menu sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        {menuSections.map((section, i) => (
          <motion.div
            key={section.title}
            className="mb-16 last:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <h2
              className="uppercase tracking-[0.25em] mb-10 pb-3 border-b"
              style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--matcha-dark)', borderColor: 'var(--stone-grey)' }}
            >
              {section.title}
            </h2>
            <div className="mb-8 rounded-lg overflow-hidden aspect-video max-w-2xl">
              <img
                src={PLACEHOLDER.section(section.title)}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="space-y-8">
              {section.items.map((item) => (
                <li key={item.name} className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <p style={{ fontSize: '1.125rem', fontWeight: 400, color: 'var(--stone-dark)' }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 300, color: 'var(--stone-dark)', opacity: 0.7 }}>
                      {item.description}
                    </p>
                  </div>
                  <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--matcha-dark)' }}>
                    ${item.price}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section
        className="py-16 text-center"
        style={{ backgroundColor: 'var(--stone-grey)' }}
      >
        <p className="mb-6" style={{ fontSize: '1rem', fontWeight: 300, color: 'var(--stone-dark)', opacity: 0.9 }}>
          Visit us for the full experience.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center min-h-[48px] min-w-[48px] uppercase tracking-[0.2em] px-8 py-3 transition-colors hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--matcha-dark)] focus-visible:ring-offset-2"
          style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--matcha-dark)' }}
        >
          Back to Home
        </Link>
      </section>
    </div>
  );
}
