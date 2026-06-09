import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ConstanceWordmark } from './ConstanceWordmark';

gsap.registerPlugin(ScrollTrigger);

interface Chapter6Props {
  data: {
    kicker?: string;
    headline: string;
    description: string;
    signoff?: string;
  };
  contact: {
    venueName?: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    neighborhood?: string;
    email: string;
    phone: string;
  };
}

export function Chapter6({ data, contact }: Chapter6Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const footer = footerRef.current;

    if (!section || !content || !footer) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 1.15,
        anticipatePin: 1,
      },
    });

    // Fade in content
    tl.from(content, {
      opacity: 0,
      y: 50,
      duration: 0.5,
    }, 0);

    // Reveal footer
    tl.from(footer, {
      y: 100,
      opacity: 0,
      duration: 0.5,
    }, 0.5);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const { kicker, signoff } = data;

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: 'var(--stone-warm-white)' }}
    >
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1765285775503-b7fb6b519d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBzaG9wJTIwaW50ZXJpb3IlMjB3YXJtJTIwd29vZHxlbnwxfHx8fDE3NzEzODQ2MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Tea studio interior"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.72) contrast(1.05)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="film-grain" aria-hidden />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8"
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        {kicker ? <p className="luxury-kicker text-white/60 mb-6 sm:mb-8">{kicker}</p> : null}
        <h2 className="luxury-display text-white mb-4 sm:mb-6" style={{ fontSize: 'clamp(2rem, 6.5vw, 4.25rem)' }}>
          {data.headline}
        </h2>
        <p className="luxury-body text-white/88 max-w-2xl mb-6 sm:mb-8" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
          {data.description}
        </p>
        {signoff ? (
          <p
            className="luxury-body text-white/72 max-w-2xl italic"
            style={{ fontSize: 'clamp(0.9375rem, 2vw, 1.2rem)', lineHeight: 1.55 }}
          >
            {signoff}
          </p>
        ) : null}
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm text-white py-8 sm:py-12 px-4 sm:px-6 md:px-8"
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Address */}
          <div>
            <h3 className="luxury-kicker mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Visit
            </h3>
            <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.6 }}>
              {contact.venueName ? (
                <>
                  {contact.venueName}
                  <br />
                </>
              ) : null}
              {contact.address}
              <br />
              {contact.city}, {contact.state} {contact.zip}
              {contact.neighborhood ? (
                <>
                  <br />
                  <span style={{ opacity: 0.88 }}>{contact.neighborhood}</span>
                </>
              ) : null}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="luxury-kicker mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Inquiries
            </h3>
            <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
              <a
                href={`mailto:${contact.email}`}
                className="inline-block py-2 -my-2 transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center hover:text-[var(--luxury-moss-hover)]"
                style={{ color: 'rgba(255,255,255,0.92)' }}
              >
                {contact.email}
              </a>
              <br />
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                className="inline-block py-2 -my-2 transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center hover:text-[var(--luxury-moss-hover)]"
                style={{ color: 'rgba(255,255,255,0.92)' }}
              >
                {contact.phone}
              </a>
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="luxury-kicker mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Hours
            </h3>
            <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.6 }}>
              Mon - Fri: 8am - 6pm<br />
              Sat - Sun: 9am - 5pm
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20 text-center">
          <ConstanceWordmark
            size="footer"
            color="white"
            stacked
            className="mx-auto mb-4"
            opacity={0.6}
          />
          <p style={{ fontSize: '0.875rem', fontWeight: 300, opacity: 0.4 }}>
            © 2026 Constance. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
