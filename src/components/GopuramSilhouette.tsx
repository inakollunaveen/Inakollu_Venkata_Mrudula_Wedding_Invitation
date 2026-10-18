import React from 'react';

interface GopuramSilhouetteProps {
  className?: string;
  opacity?: number;
  height?: number;
}

export const GopuramSilhouette: React.FC<GopuramSilhouetteProps> = ({
  className = '',
  opacity = 0.22,
  height = 240,
}) => {
  return (
    <div
      className={`pointer-events-none select-none flex justify-center items-end ${className}`}
      style={{ height, opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-4xl h-full"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* Gradients */}
        <defs>
          <linearGradient id="gopuramGold" x1="300" y1="0" x2="300" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#dfb86c" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#c9a24b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8a6721" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Five Kalasams on crest */}
        {[-40, -20, 0, 20, 40].map((offset, i) => (
          <g key={i} transform={`translate(${300 + offset}, 28)`}>
            {/* Kalasa pot and pinnacle */}
            <path d="M0,0 L0,-16 M-3,-6 C-5,-10 5,-10 3,-6 C4,-3 -4,-3 -3,-6" stroke="#c9a24b" strokeWidth="1.5" />
            <circle cx="0" cy="-6" r="3" fill="#dfb86c" />
            <path d="M0,-16 L-2,-20 L2,-20 Z" fill="#f5d68b" />
          </g>
        ))}

        {/* Top Shikhara Arch */}
        <path
          d="M240,42 Q300,24 360,42 L370,60 L230,60 Z"
          fill="url(#gopuramGold)"
          stroke="#c9a24b"
          strokeWidth="1.2"
        />

        {/* Tier 1 (Highest) */}
        <path
          d="M225,60 L375,60 L385,92 L215,92 Z"
          fill="url(#gopuramGold)"
          stroke="#c9a24b"
          strokeWidth="1.2"
        />
        {/* Tier 1 Kudus (Arch windows) */}
        <circle cx="300" cy="76" r="6" stroke="#c9a24b" strokeWidth="1" fill="#26050c" />
        <circle cx="260" cy="76" r="4.5" stroke="#c9a24b" strokeWidth="1" fill="#26050c" />
        <circle cx="340" cy="76" r="4.5" stroke="#c9a24b" strokeWidth="1" fill="#26050c" />

        {/* Tier 2 */}
        <path
          d="M205,92 L395,92 L410,132 L190,132 Z"
          fill="url(#gopuramGold)"
          stroke="#c9a24b"
          strokeWidth="1.2"
        />
        {/* Tier 2 Pilasters & Arches */}
        {[-80, -40, 0, 40, 80].map((dx, i) => (
          <path
            key={i}
            d={`M${300 + dx},102 Q${300 + dx},96 ${300 + dx + 10},96 Q${300 + dx + 20},96 ${300 + dx + 20},102 L${300 + dx + 20},122 L${300 + dx},122 Z`}
            stroke="#c9a24b"
            strokeWidth="0.8"
            fill="#26050c"
          />
        ))}

        {/* Tier 3 */}
        <path
          d="M180,132 L420,132 L440,180 L160,180 Z"
          fill="url(#gopuramGold)"
          stroke="#c9a24b"
          strokeWidth="1.2"
        />
        {/* Tier 3 decorative corbels */}
        <line x1="160" y1="180" x2="440" y2="180" stroke="#dfb86c" strokeWidth="2" />

        {/* Tier 4 */}
        <path
          d="M150,180 L450,180 L475,236 L125,236 Z"
          fill="url(#gopuramGold)"
          stroke="#c9a24b"
          strokeWidth="1.2"
        />

        {/* Tier 5 (Base / Adhishthana) */}
        <path
          d="M115,236 L485,236 L510,310 L90,310 Z"
          fill="url(#gopuramGold)"
          stroke="#c9a24b"
          strokeWidth="1.5"
        />

        {/* Temple Gateway Arch (మహా ద్వారా శిఖరం) */}
        <path
          d="M235,360 L235,275 Q300,240 365,275 L365,360 Z"
          fill="#1c0509"
          stroke="#c9a24b"
          strokeWidth="2"
        />
        <path
          d="M250,360 L250,285 Q300,255 350,285 L350,360"
          stroke="#dfb86c"
          strokeWidth="1"
          strokeDasharray="4 3"
        />

        {/* Plinth Base Line */}
        <rect x="60" y="310" width="480" height="48" fill="url(#gopuramGold)" stroke="#c9a24b" strokeWidth="1.5" />
        <line x1="40" y1="358" x2="560" y2="358" stroke="#c9a24b" strokeWidth="3" />
      </svg>
    </div>
  );
};
