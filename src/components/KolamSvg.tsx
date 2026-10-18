import React from 'react';
import { motion } from 'motion/react';

interface KolamSvgProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export const KolamSvg: React.FC<KolamSvgProps> = ({
  className = '',
  size = 180,
  animate = true,
}) => {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_8px_rgba(201,162,75,0.4)]"
      >
        {/* Outer Circular Petals */}
        <motion.circle
          cx="100"
          cy="100"
          r="92"
          stroke="#c9a24b"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.8 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />

        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke="#dfb86c"
          strokeWidth="1.2"
          initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.9 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 2, ease: 'easeInOut', delay: 0.2 }}
        />

        {/* 8-Petal Traditional Andhra Lotus Kolam */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={angle} transform={`rotate(${angle} 100 100)`}>
            <motion.path
              d="M 100 25 C 92 50 92 70 100 80 C 108 70 108 50 100 25 Z"
              stroke="#dfb86c"
              strokeWidth="1.4"
              fill="rgba(201, 162, 75, 0.08)"
              initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, delay: 0.1 * i, ease: 'easeOut' }}
            />
            {/* Inner curve */}
            <motion.path
              d="M 100 40 C 96 55 96 68 100 75 C 104 68 104 55 100 40"
              stroke="#f5d68b"
              strokeWidth="1"
              initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.1 * i + 0.2 }}
            />
          </g>
        ))}

        {/* Center Star / Yantra Lines */}
        <motion.polygon
          points="100,60 135,120 65,120"
          stroke="#c9a24b"
          strokeWidth="1.2"
          fill="none"
          initial={animate ? { pathLength: 0, rotate: -45 } : { pathLength: 1, rotate: 0 }}
          animate={{ pathLength: 1, rotate: 0 }}
          transition={{ duration: 2.2, delay: 0.5 }}
          style={{ transformOrigin: '100px 100px' }}
        />
        <motion.polygon
          points="100,140 135,80 65,80"
          stroke="#c9a24b"
          strokeWidth="1.2"
          fill="none"
          initial={animate ? { pathLength: 0, rotate: 45 } : { pathLength: 1, rotate: 0 }}
          animate={{ pathLength: 1, rotate: 0 }}
          transition={{ duration: 2.2, delay: 0.6 }}
          style={{ transformOrigin: '100px 100px' }}
        />

        {/* Center Bindu (బొట్టు / బిందువు) */}
        <motion.circle
          cx="100"
          cy="100"
          r="8"
          fill="#c9a24b"
          initial={animate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: 'backOut' }}
          style={{ transformOrigin: '100px 100px' }}
        />
        <circle cx="100" cy="100" r="3.5" fill="#fefcf7" />

        {/* Outer Dot matrix (చుక్కల ముగ్గు వివరాలు) */}
        {[0, 90, 180, 270].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 100 100)`}>
            <circle cx="100" cy="14" r="2.5" fill="#dfb86c" />
            <circle cx="90" cy="18" r="1.8" fill="#c9a24b" />
            <circle cx="110" cy="18" r="1.8" fill="#c9a24b" />
          </g>
        ))}
      </svg>
    </div>
  );
};
