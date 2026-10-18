import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`text-center my-8 md:my-12 px-4 ${className}`}>
      {/* Editorial Kicker */}
      {kicker && (
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-6 h-px bg-[#c9a24b]/40" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#dfb86c] font-telugu">
            {kicker}
          </span>
          <span className="w-6 h-px bg-[#c9a24b]/40" />
        </div>
      )}

      {/* Main Heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-telugu text-[#f5d68b] tracking-normal mb-3 max-w-3xl mx-auto leading-relaxed">
        {title}
      </h2>

      {/* Subtitle / Description if provided */}
      {subtitle && (
        <p className="text-sm sm:text-base text-[#fbf3e0]/80 font-telugu max-w-2xl mx-auto mb-4 leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Brushstroke Gold Underline & Blooming Lotus */}
      <div className="flex flex-col items-center justify-center relative mt-2">
        {/* Blooming Lotus SVG */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: 'backOut' }}
          className="mb-1"
        >
          <svg width="42" height="24" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Center petal */}
            <path d="M21,2 C18,8 18,16 21,22 C24,16 24,8 21,2 Z" fill="#dfb86c" />
            {/* Left petal */}
            <path d="M21,12 C13,6 7,12 8,19 C13,21 18,18 21,14" fill="#c9a24b" opacity="0.85" />
            {/* Right petal */}
            <path d="M21,12 C29,6 35,12 34,19 C29,21 24,18 21,14" fill="#c9a24b" opacity="0.85" />
            {/* Outer left */}
            <path d="M19,16 C11,15 4,18 3,21 C8,23 16,21 19,17" fill="#8a6721" opacity="0.7" />
            {/* Outer right */}
            <path d="M23,16 C31,15 38,18 39,21 C34,23 26,21 23,17" fill="#8a6721" opacity="0.7" />
          </svg>
        </motion.div>

        {/* Drawing Gold Underline Brushstroke */}
        <motion.div
          className="relative h-1 w-48 sm:w-64 max-w-full overflow-hidden"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: '100%', opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#c9a24b] to-transparent rounded-full" />
        </motion.div>
      </div>
    </div>
  );
};
