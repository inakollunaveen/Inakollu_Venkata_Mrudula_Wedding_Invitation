import React, { useEffect, useState } from 'react';

export const ScrollGarland: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1.5 z-40 bg-[#26050c]/80 backdrop-blur-xs pointer-events-none select-none"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="పేజీ చదివిన పురోగతి"
    >
      {/* Gold garland progress fill */}
      <div
        className="h-full bg-gradient-to-r from-[#8a6721] via-[#c9a24b] to-[#f5d68b] transition-[width] duration-150 ease-out relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Leading blooming flower indicator */}
        {scrollProgress > 1 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#fef08a] shadow-[0_0_8px_#f59e0b] animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};
