import React from 'react';
import { Calendar } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-1.5 z-30 w-full bg-[#1c0509]/85 backdrop-blur-md border-b border-[#c9a24b]/30 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand wordmark (single line, no descriptors) */}
        <a
          href="#main-invitation"
          className="text-base sm:text-lg font-bold font-telugu text-[#fef08a] hover:text-[#dfb86c] whitespace-nowrap shrink-0 transition-colors"
        >
          వెంకట మృదుల &amp; మల్లికార్జున
        </a>

        {/* Zone 2: 4-5 single-line clean text links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium font-telugu text-[#dfb86c]">
          <a href="#main-invitation" className="hover:text-[#fef08a] transition-colors whitespace-nowrap shrink-0">
            ఆహ్వానం
          </a>
          <a href="#ceremony-schedule" className="hover:text-[#fef08a] transition-colors whitespace-nowrap shrink-0">
            కార్యక్రమాలు
          </a>
          <a href="#photo-gallery" className="hover:text-[#fef08a] transition-colors whitespace-nowrap shrink-0">
            చిత్రమాలిక
          </a>
          <a href="#seven-steps" className="hover:text-[#fef08a] transition-colors whitespace-nowrap shrink-0">
            సప్తపది
          </a>
          <a href="#venues" className="hover:text-[#fef08a] transition-colors whitespace-nowrap shrink-0">
            వేదిక &amp; మ్యాప్
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#calendar"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold font-telugu bg-[#3b0a14] hover:bg-[#6b1224] text-[#fef08a] border border-[#c9a24b]/60 transition-colors whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-[#dfb86c]" />
            <span>క్యాలెండర్</span>
          </a>
        </div>
      </div>
    </header>
  );
};
