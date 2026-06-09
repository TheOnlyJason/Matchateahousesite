import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Chapter3Props {
  data: {
    kicker?: string;
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
  rotation: number;
  spin: number;
  shade: number;
}

const LEAF_PALETTE = [
  { r: 122, g: 148, b: 88 },
  { r: 98, g: 128, b: 72 },
  { r: 76, g: 108, b: 58 },
  { r: 142, g: 162, b: 102 },
] as const;

function drawTeaLeaf(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  opacity: number,
  shade: number
) {
  const palette = LEAF_PALETTE[Math.floor(shade * LEAF_PALETTE.length) % LEAF_PALETTE.length];
  const w = size * 2.4;
  const h = size * 3.8;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = opacity;

  ctx.beginPath();
  ctx.moveTo(0, -h * 0.46);
  ctx.bezierCurveTo(w * 0.62, -h * 0.34, w * 0.56, h * 0.34, 0, h * 0.5);
  ctx.bezierCurveTo(-w * 0.56, h * 0.34, -w * 0.62, -h * 0.34, 0, -h * 0.46);
  ctx.closePath();
  ctx.fillStyle = `rgb(${palette.r}, ${palette.g}, ${palette.b})`;
  ctx.fill();

  ctx.strokeStyle = `rgba(${Math.max(palette.r - 28, 0)}, ${Math.max(palette.g - 32, 0)}, ${Math.max(palette.b - 22, 0)}, ${opacity * 0.55})`;
  ctx.lineWidth = Math.max(0.45, size * 0.14);
  ctx.beginPath();
  ctx.moveTo(0, -h * 0.32);
  ctx.lineTo(0, h * 0.36);
  ctx.stroke();

  ctx.lineWidth = Math.max(0.3, size * 0.1);
  ctx.beginPath();
  ctx.moveTo(0, -h * 0.05);
  ctx.quadraticCurveTo(w * 0.28, h * 0.08, w * 0.34, h * 0.22);
  ctx.moveTo(0, h * 0.02);
  ctx.quadraticCurveTo(-w * 0.26, h * 0.14, -w * 0.32, h * 0.26);
  ctx.stroke();

  ctx.restore();
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
      for (let i = 0; i < 120; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: Math.random() * 1.6 + 0.8,
          size: Math.random() * 3.5 + 2.5,
          opacity: Math.random() * 0.55 + 0.25,
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.018,
          shade: Math.random(),
        });
      }
    };
    initParticles();

    // Animation loop
    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particlesRef.current.forEach((particle) => {
        const speed = 1 + Math.abs(scrollVelocityRef.current) * 5;
        particle.y += particle.vy * speed;
        particle.x += particle.vx;
        particle.rotation += particle.spin * speed;

        if (particle.y > canvas.height + 30) {
          particle.y = -30;
          particle.x = Math.random() * canvas.width;
          particle.rotation = Math.random() * Math.PI * 2;
        }
        if (particle.x < -30 || particle.x > canvas.width + 30) {
          particle.x = Math.random() * canvas.width;
        }

        drawTeaLeaf(
          ctx,
          particle.x,
          particle.y,
          particle.size,
          particle.rotation,
          particle.opacity,
          particle.shade
        );
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
        scrub: 1.15,
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

  const { kicker } = data;

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
        {kicker ? (
          <p className="luxury-kicker mb-6 sm:mb-8" style={{ color: 'var(--luxury-moss)' }}>
            {kicker}
          </p>
        ) : null}
        <h2
          className="luxury-display mb-4"
          style={{ fontSize: 'clamp(2rem, 6.5vw, 4.25rem)', color: 'var(--luxury-charcoal)' }}
        >
          {data.headline}
        </h2>
        <p className="luxury-body max-w-2xl" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: 'var(--luxury-charcoal)', opacity: 0.82 }}>
          {data.description}
        </p>
      </div>
    </div>
  );
}
