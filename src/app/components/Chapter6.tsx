import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageWithFallback } from './figma/ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

interface Chapter6Props {
  data: {
    headline: string;
    description: string;
  };
  contact: {
    address: string;
    city: string;
    state: string;
    zip: string;
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
        scrub: 1,
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

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: 'var(--stone-warm-white)' }}
    >
      {/* Hero Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1765285775503-b7fb6b519d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBzaG9wJTIwaW50ZXJpb3IlMjB3YXJtJTIwd29vZHxlbnwxfHx8fDE3NzEzODQ2MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Tea studio interior"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.7)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        <h2 className="text-white mb-6 tracking-wide uppercase" style={{ fontSize: '4rem', fontWeight: 300 }}>
          {data.headline}
        </h2>
        <p className="text-white/90 max-w-2xl mb-12" style={{ fontSize: '1.5rem', fontWeight: 300, letterSpacing: '0.05em' }}>
          {data.description}
        </p>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm text-white py-12"
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address */}
          <div>
            <h3 className="uppercase tracking-wider mb-4" style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.6 }}>
              Visit Us
            </h3>
            <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.6 }}>
              {contact.address}<br />
              {contact.city}, {contact.state} {contact.zip}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="uppercase tracking-wider mb-4" style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.6 }}>
              Contact
            </h3>
            <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.6 }}>
              <a href={`mailto:${contact.email}`} className="hover:text-[var(--matcha-green)] transition-colors">
                {contact.email}
              </a>
              <br />
              <a href={`tel:${contact.phone}`} className="hover:text-[var(--matcha-green)] transition-colors">
                {contact.phone}
              </a>
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="uppercase tracking-wider mb-4" style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.6 }}>
              Hours
            </h3>
            <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.6 }}>
              Mon - Fri: 8am - 6pm<br />
              Sat - Sun: 9am - 5pm
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-8 mt-8 pt-8 border-t border-white/20 text-center">
          <p style={{ fontSize: '0.875rem', fontWeight: 300, opacity: 0.5 }}>
            © 2026 CONSTANCE. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
