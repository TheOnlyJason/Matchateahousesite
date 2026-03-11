import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Chapter3Props {
  data: {
    headline: string;
    description: string;
  };
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function Chapter3({ data }: Chapter3Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const scrollVelocityRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const text = textRef.current;

    if (!section || !canvas || !text) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 150; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: Math.random() * 2 + 1,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
    };
    initParticles();

    // Animation loop
    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particlesRef.current.forEach(particle => {
        const speed = 1 + Math.abs(scrollVelocityRef.current) * 5;
        particle.y += particle.vy * speed;
        particle.x += particle.vx;

        // Reset particle if it goes off screen
        if (particle.y > canvas.height) {
          particle.y = -20;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.x = Math.random() * canvas.width;
        }

        // Draw particle (matcha green)
        ctx.fillStyle = `rgba(124, 179, 66, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    // GSAP ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          scrollVelocityRef.current = self.getVelocity() / 1000;
        },
      },
    });

    tl.from(text, {
      y: 100,
      opacity: 0,
      duration: 0.3,
    }, 0);

    tl.to(text, {
      y: -100,
      opacity: 0,
      duration: 0.5,
    }, 0.5);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: 'var(--stone-grey)' }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      />

      {/* Stone Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIyIiBmaWxsPSIjMDAwIi8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTAwIiByPSIxLjUiIGZpbGw9IiMwMDAiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxNTAiIHI9IjIuNSIgZmlsbD0iIzAwMCIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFpbikiLz48L3N2Zz4=)',
          backgroundSize: '200px 200px'
        }}
      />

      {/* Text Content */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center"
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        <h2 className="mb-4 tracking-wide uppercase" style={{ fontSize: 'clamp(1.75rem, 6vw, 4rem)', fontWeight: 300, color: 'var(--stone-dark)' }}>
          {data.headline}
        </h2>
        <p className="max-w-2xl" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 300, color: 'var(--stone-dark)', opacity: 0.8 }}>
          {data.description}
        </p>
      </div>
    </div>
  );
}
