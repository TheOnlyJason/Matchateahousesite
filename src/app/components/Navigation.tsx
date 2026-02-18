import { useEffect, useState } from 'react';

export function Navigation() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between mix-blend-difference">
        <div className="text-white tracking-[0.3em] uppercase" style={{ fontSize: '0.875rem', fontWeight: 400 }}>
          Constance
        </div>
        <button 
          className="text-white uppercase tracking-wider" 
          style={{ fontSize: '0.75rem', fontWeight: 400 }}
        >
          Menu
        </button>
      </nav>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-white/20 z-50">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </>
  );
}
