import React from 'react';
import { motion } from 'motion/react';

interface ToranBannerProps {
  className?: string;
  sway?: boolean;
}

export const ToranBanner: React.FC<ToranBannerProps> = ({
  className = '',
  sway = true,
}) => {
  return (
    <div
      className={`w-full overflow-hidden pointer-events-none select-none z-20 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className={`w-full flex justify-center ${sway ? 'animate-toran-sway' : ''}`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <svg
          viewBox="0 0 1200 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-7xl h-auto drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
          preserveAspectRatio="none"
        >
          {/* Main Gold Hanging Thread / Rope */}
          <path
            d="M0,12 Q150,30 300,12 Q450,30 600,12 Q750,30 900,12 Q1050,30 1200,12"
            stroke="#c9a24b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M0,12 Q150,30 300,12 Q450,30 600,12 Q750,30 900,12 Q1050,30 1200,12"
            stroke="#dfb86c"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />

          {/* Repeating Mango Leaves (మామిడాకులు) & Marigold / Jasmine Blooms */}
          {[
            50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600,
            650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150
          ].map((x, idx) => {
            // Y position on catenary rope approximation
            const segment = (x % 300) / 300;
            const ropeY = 12 + 18 * Math.sin(segment * Math.PI);
            const isCenterOfArc = Math.abs(x % 300 - 150) < 30;

            return (
              <g key={x} transform={`translate(${x}, ${ropeY})`}>
                {/* Mango Leaf */}
                <path
                  d="M0,0 C-12,20 -15,45 0,72 C15,45 12,20 0,0 Z"
                  fill={idx % 2 === 0 ? '#1f5c4a' : '#143d31'}
                  stroke="#2d7a64"
                  strokeWidth="0.8"
                />
                {/* Leaf Central Vein */}
                <path d="M0,4 L0,68" stroke="#3da083" strokeWidth="0.7" opacity="0.8" />
                <path d="M0,18 Q-6,26 -9,30" stroke="#3da083" strokeWidth="0.5" opacity="0.6" />
                <path d="M0,18 Q6,26 9,30" stroke="#3da083" strokeWidth="0.5" opacity="0.6" />
                <path d="M0,34 Q-7,42 -9,46" stroke="#3da083" strokeWidth="0.5" opacity="0.6" />
                <path d="M0,34 Q7,42 9,46" stroke="#3da083" strokeWidth="0.5" opacity="0.6" />

                {/* Marigold (బంతి పూవు - Gold/Orange) */}
                <circle cx="0" cy="2" r="6" fill="#f59e0b" />
                <circle cx="0" cy="2" r="4" fill="#fbbf24" />
                <circle cx="0" cy="2" r="2" fill="#d97706" />

                {/* Jasmine flower bud (మల్లె మొగ్గ) in the center of arcs */}
                {isCenterOfArc && (
                  <g transform="translate(0, 72)">
                    <ellipse cx="0" cy="6" rx="4" ry="7" fill="#fefcf7" />
                    <circle cx="0" cy="0" r="2.5" fill="#1f5c4a" />
                    <circle cx="0" cy="12" r="2" fill="#fbbf24" />
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
};
