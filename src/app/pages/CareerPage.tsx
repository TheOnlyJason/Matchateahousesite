import React, { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

// Placeholder images – replace with your own assets
const PLACEHOLDER = {
  hero: 'https://placehold.co/1200x700/f5f3f0/2a2a2a?text=Careers+Hero',
  value: (label: string) => `https://placehold.co/400x280/f5f3f0/558b2f?text=${encodeURIComponent(label)}`,
  role: 'https://placehold.co/200x120/f5f3f0/2a2a2a?text=Role',
};

type Role = {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
};

const roles: Role[] = [
  { id: 'barista', title: 'Barista', location: 'San Francisco', type: 'Full-time', description: 'Prepare matcha and tea, maintain quality and ritual.' },
  { id: 'pastry-lead', title: 'Pastry Lead', location: 'San Francisco', type: 'Full-time', description: 'Create daily pastries and seasonal specials.' },
  { id: 'front-of-house', title: 'Front of House', location: 'San Francisco', type: 'Part-time', description: 'Welcome guests and support service.' },
];

const values = [
  { title: 'Craft', text: 'We take time with every bowl and every cup.' },
  { title: 'Community', text: 'The house is a place for connection and calm.' },
  { title: 'Sourcing', text: 'We work directly with growers we trust.' },
];

export function CareerPage() {
  const [activeRole, setActiveRole] = useState<Role | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // In a real app, send formData to your backend or an API endpoint.
    // For now, we just reset and close.
    event.currentTarget.reset();
    setActiveRole(null);
    // Optional: show a simple confirmation
    alert('Thank you for your application. We will be in touch.');
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: 'var(--stone-warm-white)' }}
    >
      {/* Hero */}
      <section className="relative min-h-[45vh] sm:min-h-[55vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url(${PLACEHOLDER.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.9)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--stone-warm-white)]/90 to-[var(--stone-warm-white)]" />
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
            Careers
          </h1>
          <p
            className="max-w-xl mx-auto"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 300, color: 'var(--stone-dark)', opacity: 0.85, letterSpacing: '0.05em' }}
          >
            Join a team that cares about craft, community, and the ritual of tea.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        <h2
          className="uppercase tracking-[0.25em] mb-12 text-center"
          style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--matcha-dark)' }}
        >
          What we value
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="mb-4 rounded-lg overflow-hidden aspect-[4/3]">
                <img
                  src={PLACEHOLDER.value(v.title)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 400, color: 'var(--stone-dark)', marginBottom: '0.5rem' }}>
                {v.title}
              </h3>
              <p style={{ fontSize: '0.9375rem', fontWeight: 300, color: 'var(--stone-dark)', opacity: 0.8 }}>
                {v.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open roles */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: 'var(--stone-grey)' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
          <h2
            className="uppercase tracking-[0.25em] mb-12"
            style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--matcha-dark)' }}
          >
            Open roles
          </h2>
          <ul className="space-y-8">
            {roles.map((role, i) => (
              <motion.li
                key={role.title}
                className="p-5 sm:p-8 rounded-xl transition-colors hover:bg-white/60 flex flex-wrap items-start gap-4 sm:gap-6 md:flex-nowrap"
                style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="shrink-0 rounded-lg overflow-hidden w-40 h-24 md:w-48 md:h-28">
                  <img
                    src={PLACEHOLDER.role}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--stone-dark)' }}>
                      {role.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', fontWeight: 300, color: 'var(--stone-dark)', opacity: 0.7 }}>
                      {role.location} · {role.type}
                    </p>
                    <p className="mt-2" style={{ fontSize: '0.9375rem', fontWeight: 300, color: 'var(--stone-dark)', opacity: 0.85 }}>
                      {role.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveRole(role)}
                    className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-4 uppercase tracking-wider whitespace-nowrap transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--matcha-dark)] focus-visible:ring-offset-2 rounded-full"
                    style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--matcha-dark)', backgroundColor: 'transparent', border: '1px solid var(--matcha-dark)' }}
                  >
                    Apply
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <p className="mb-6" style={{ fontSize: '1rem', fontWeight: 300, color: 'var(--stone-dark)', opacity: 0.9 }}>
          Don’t see a fit? We’d still like to hear from you.
        </p>
        <a
          href="mailto:careers@tea.com"
          className="inline-flex items-center justify-center min-h-[48px] min-w-[48px] uppercase tracking-[0.2em] px-8 py-3 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--matcha-dark)] focus-visible:ring-offset-2"
          style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--matcha-dark)' }}
        >
          careers@tea.com
        </a>
        <div className="mt-10 sm:mt-12">
          <Link
            to="/"
            className="inline-flex items-center min-h-[44px] text-[var(--stone-dark)] opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--matcha-dark)] focus-visible:ring-offset-2 rounded"
            style={{ fontSize: '0.875rem', fontWeight: 300 }}
          >
            ← Back to Home
          </Link>
        </div>
      </section>

      {/* Application form dialog */}
      {activeRole && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setActiveRole(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="application-title"
        >
          <div
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--stone-warm-white)' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-[var(--border)]">
              <div>
                <h2
                  id="application-title"
                  className="uppercase tracking-[0.2em] mb-1"
                  style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--stone-dark)' }}
                >
                  Apply for
                </h2>
                <p style={{ fontSize: '1.125rem', fontWeight: 400, color: 'var(--stone-dark)' }}>
                  {activeRole.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveRole(null)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[var(--stone-dark)] hover:bg-[var(--stone-grey)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--matcha-dark)] focus-visible:ring-offset-2"
                aria-label="Close application form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 uppercase tracking-[0.12em]"
                    style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--stone-dark)' }}
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-white"
                    style={{ fontSize: '0.875rem' }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 uppercase tracking-[0.12em]"
                    style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--stone-dark)' }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-white"
                    style={{ fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-1 uppercase tracking-[0.12em]"
                    style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--stone-dark)' }}
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-white"
                    style={{ fontSize: '0.875rem' }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="availability"
                    className="block mb-1 uppercase tracking-[0.12em]"
                    style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--stone-dark)' }}
                  >
                    Availability
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-white"
                    style={{ fontSize: '0.875rem' }}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="weekends">Weekends only</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="resume"
                  className="block mb-1 uppercase tracking-[0.12em]"
                  style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--stone-dark)' }}
                >
                  Resume (PDF or DOC)
                </label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="block w-full text-sm text-[var(--stone-dark)] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[var(--stone-grey)] file:text-[var(--stone-dark)] hover:file:bg-[var(--matcha-green)] hover:file:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 uppercase tracking-[0.12em]"
                  style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--stone-dark)' }}
                >
                  Short note
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-white"
                  style={{ fontSize: '0.875rem' }}
                  placeholder="Tell us briefly why you’d like to join the team."
                />
              </div>

              <div className="flex items-center justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveRole(null)}
                  className="px-4 py-2 text-[var(--stone-dark)] hover:opacity-80"
                  style={{ fontSize: '0.875rem', fontWeight: 400 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full uppercase tracking-[0.16em] bg-[var(--matcha-dark)] text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--matcha-dark)] focus-visible:ring-offset-2"
                  style={{ fontSize: '0.75rem', fontWeight: 500 }}
                >
                  Submit application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
