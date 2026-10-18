import React from 'react';
import { motion } from 'motion/react';

interface GodLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animate?: boolean;
}

/**
 * Sacred God Logo (శ్రీ గణేశ / విఘ్నేశ్వర చిహ్నం)
 * Replaces the traditional oil lamps across the entire wedding website
 * with the auspicious divine golden Lord Ganesha emblem and halo.
 */
export const GodLogo: React.FC<GodLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  animate = true,
}) => {
  const sizeMap = {
    sm: { width: 36, height: 36, textClass: 'text-[9px]' },
    md: { width: 52, height: 52, textClass: 'text-[11px]' },
    lg: { width: 72, height: 72, textClass: 'text-xs' },
    xl: { width: 100, height: 100, textClass: 'text-sm' },
  };

  const { width, height, textClass } = sizeMap[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <motion.div
        className="relative flex items-center justify-center"
        style={{ width, height }}
        initial={animate ? { scale: 0.85, opacity: 0 } : false}
        animate={animate ? { scale: 1, opacity: 1 } : false}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full animate-god-aura"
        >
          <defs>
            {/* Rich Antique Gold Linear Gradient */}
            <linearGradient id="godGold" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="30%" stopColor="#dfb86c" />
              <stop offset="70%" stopColor="#c9a24b" />
              <stop offset="100%" stopColor="#8a6721" />
            </linearGradient>

            {/* Glowing Aura Radial */}
            <radialGradient id="godAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#c9a24b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#c9a24b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Divine Radiant Halo */}
          <circle cx="50" cy="50" r="46" fill="url(#godAura)" />
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#godGold)"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            opacity="0.6"
          />

          {/* Divine Ganesha Sacred Iconography */}
          <g transform="translate(0, 0)">
            {/* Crown (కిరీటం / Kireetam) */}
            <path
              d="M42,22 L50,8 L58,22 L55,27 L45,27 Z"
              fill="url(#godGold)"
              stroke="#dfb86c"
              strokeWidth="0.8"
            />
            {/* Crown Crest Jewel */}
            <circle cx="50" cy="14" r="2.2" fill="#fef08a" />
            <path d="M50,4 L50,8" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />

            {/* Forehead / Kumbha (మస్తకం) */}
            <path
              d="M34,32 C36,25 44,24 50,24 C56,24 64,25 66,32 C68,38 65,44 60,46 C56,48 53,46 50,46 C47,46 44,48 40,46 C35,44 32,38 34,32 Z"
              fill="url(#godGold)"
            />

            {/* Sacred Tilak / Namam on Forehead (తిలకం / త్రిపుండ్రము) */}
            <path d="M46,28 L54,28" stroke="#dc2626" strokeWidth="1" strokeLinecap="round" />
            <path d="M47,31 L53,31" stroke="#dc2626" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="50" cy="35" r="1.5" fill="#fef08a" stroke="#dc2626" strokeWidth="0.5" />

            {/* Left Ear (Ganesha Right Ear / భక్త దృష్టిలో ఎడమ) */}
            <path
              d="M34,30 C24,30 20,40 25,50 C28,54 34,54 36,48"
              stroke="url(#godGold)"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Ear (Ganesha Left Ear) */}
            <path
              d="M66,30 C76,30 80,40 75,50 C72,54 66,54 64,48"
              stroke="url(#godGold)"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Beautiful Graceful Trunk (శుండము / తొండము curving to right/left with modaka) */}
            <path
              d="M50,42 C51,52 50,64 56,72 C62,78 72,76 74,68 C75,62 70,58 64,60 C60,62 60,67 63,68"
              stroke="url(#godGold)"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Single Sacred Tusk (ఏకదంతము) */}
            <path d="M42,48 L37,53" stroke="#fefcf7" strokeWidth="2.2" strokeLinecap="round" />

            {/* Auspicious Modaka / Laddu on trunk tip (మోదకము) */}
            <circle cx="66" cy="63" r="3.2" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />

            {/* Eyes (కనులు) */}
            <ellipse cx="44" cy="38" rx="1.5" ry="1" fill="#1c0509" />
            <ellipse cx="56" cy="38" rx="1.5" ry="1" fill="#1c0509" />

            {/* Bottom Lotus Petal Base (కమల పీఠం) */}
            <path
              d="M30,86 C38,82 46,84 50,88 C54,84 62,82 70,86 C64,92 56,92 50,90 C44,92 36,92 30,86 Z"
              fill="url(#godGold)"
              opacity="0.85"
            />
          </g>
        </svg>
      </motion.div>

      {/* Optional Inscribed Divine Name */}
      {showText && (
        <span
          className={`font-telugu font-bold text-[#fef08a] mt-1 tracking-wider text-center drop-shadow-sm ${textClass}`}
        >
          శ్రీ గణేశాయ నమః
        </span>
      )}
    </div>
  );
};
