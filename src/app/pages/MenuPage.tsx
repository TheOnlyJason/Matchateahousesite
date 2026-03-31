import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

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
      { name: 'Iced Matcha', description: 'Shaken, lightly sweetened', price: '6.5' },
      { name: 'Matcha Lemonade', description: 'House lemonade, hint of mint', price: '7' },
    ],
  },
  {
    title: 'Tea',
    items: [
      { name: 'Sencha', description: 'Steamed green, Uji', price: '5' },
      { name: 'Hojicha', description: 'Roasted green, nutty', price: '5' },
      { name: 'Genmaicha', description: 'Green tea with roasted rice', price: '5.5' },
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
    <div className="min-h-screen w-full" style={{ backgroundColor: 'var(--stone-warm-white)' }}>
      <section className="relative min-h-[52vh] sm:min-h-[62vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-28"
          style={{
            backgroundImage: `url(${PLACEHOLDER.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.88)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--stone-warm-white)]/85 to-[var(--stone-warm-white)]" />
        <motion.div
          className="relative z-10 px-2"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="luxury-kicker mb-8 md:mb-10" style={{ color: 'var(--luxury-moss)' }}>
            Offerings
          </p>
          <h1
            className="luxury-display mb-6 md:mb-8"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 4.5rem)', color: 'var(--luxury-charcoal)' }}
          >
            Menu
          </h1>
          <p className="luxury-body max-w-xl mx-auto" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'var(--luxury-charcoal)', opacity: 0.82 }}>
            Stone-ground matcha, single-origin teas, and house-made pastries.
          </p>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-20 sm:py-28 md:py-36">
        {menuSections.map((section, i) => (
          <motion.div
            key={section.title}
            className="mb-24 md:mb-32 last:mb-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.65, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="luxury-kicker mb-12 md:mb-16 pb-4 border-b"
              style={{ color: 'var(--luxury-moss)', borderColor: 'var(--luxury-line)' }}
            >
              {section.title}
            </h2>
            <div className="mb-14 md:mb-16 overflow-hidden rounded-sm aspect-video max-w-2xl border border-[var(--luxury-line)] shadow-[0_24px_64px_rgba(28,28,28,0.06)]">
              <img src={PLACEHOLDER.section(section.title)} alt="" className="w-full h-full object-cover" />
            </div>
            <ul className="space-y-12 md:space-y-14">
              {section.items.map((item) => (
                <li key={item.name} className="flex flex-wrap items-baseline justify-between gap-6 gap-y-2">
                  <div className="min-w-0 flex-1">
                    <p
                      className="mb-1.5"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
                        fontWeight: 400,
                        color: 'var(--luxury-charcoal)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {item.name}
                    </p>
                    <p className="luxury-body" style={{ fontSize: '0.9375rem', color: 'var(--luxury-charcoal)', opacity: 0.68 }}>
                      {item.description}
                    </p>
                  </div>
                  <span className="luxury-price shrink-0 text-[1.125rem] md:text-[1.25rem] tabular-nums">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>

      <section className="py-20 md:py-28 text-center border-t" style={{ backgroundColor: 'var(--stone-grey)', borderColor: 'var(--luxury-line)' }}>
        <p className="luxury-body mb-10 md:mb-12" style={{ fontSize: '1rem', color: 'var(--luxury-charcoal)', opacity: 0.88 }}>
          Visit us for the full experience.
        </p>
        <Link
          to="/"
          className="group inline-flex items-center gap-4 min-h-[48px] px-2 luxury-kicker transition-colors duration-300 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--luxury-moss)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--stone-grey)]"
          style={{ color: 'var(--luxury-charcoal)' }}
        >
          <svg
            className="w-5 h-5 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Index</span>
        </Link>
      </section>
    </div>
  );
}
