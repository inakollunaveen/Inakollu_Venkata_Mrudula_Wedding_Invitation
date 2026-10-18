import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { SectionHeader } from './SectionHeader';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isWithin24Hours: boolean;
  isCompleted: boolean;
}

const calculateTimeLeft = (targetIso: string): TimeLeft => {
  const target = new Date(targetIso).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isWithin24Hours: false,
      isCompleted: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  const isWithin24Hours = diff < 24 * 60 * 60 * 1000;

  return { days, hours, minutes, seconds, isWithin24Hours, isCompleted: false };
};

// Flip Digit Display Component
const FlipDigitCard: React.FC<{
  value: number;
  label: string;
  isGlowing: boolean;
}> = ({ value, label, isGlowing }) => {
  const formatted = value.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-18 sm:w-24 md:w-28 h-22 sm:h-28 md:h-32 rounded-xl bg-gradient-to-b from-[#3b0a14] to-[#1c0509] border ${
          isGlowing
            ? 'border-[#fef08a] shadow-[0_0_20px_rgba(254,240,138,0.5)]'
            : 'border-[#c9a24b]/50 shadow-[0_8px_20px_rgba(0,0,0,0.6)]'
        } flex items-center justify-center overflow-hidden preserve-3d`}
      >
        {/* Horizontal center crease */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-[#1c0509]/80 z-20 shadow-sm" />

        {/* Top half reflection */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-white/5 pointer-events-none" />

        {/* Animated digit with smooth flip transition */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formatted}
            initial={{ rotateX: 60, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -60, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-cinzel tabular-nums text-[#f5d68b] select-none"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Telugu Label */}
      <span className="text-xs sm:text-sm font-semibold font-telugu text-[#dfb86c] mt-2.5">
        {label}
      </span>
    </div>
  );
};

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(weddingData.muhurtham.targetTimestamp)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingData.muhurtham.targetTimestamp));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          kicker="సుముహూర్తం కౌంట్‌డౌన్"
          title="కళ్యాణ మహోత్సవ సమయ వేళ"
          subtitle="గురువారం, 29 అక్టోబర్ 2026, రాత్రి 10:10 నిమిషములకు (మిథున లగ్న పుష్కరాంశము నందు)"
        />

        <div className="royal-card rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden">
          {/* Subtle Ambient Pulse */}
          {timeLeft.isWithin24Hours && (
            <div className="absolute inset-0 bg-[#fef08a]/5 animate-pulse pointer-events-none" />
          )}

          <div className="flex items-center justify-center gap-2 mb-6 text-xs sm:text-sm text-[#dfb86c] font-telugu">
            <Clock className="w-4 h-4 text-[#c9a24b]" />
            <span>సుముహూర్తమునకు మిగిలిన సమయం</span>
          </div>

          {timeLeft.isCompleted ? (
            <div className="p-6 rounded-xl bg-[#26050c] border border-[#fef08a] text-[#fef08a]">
              <h3 className="text-2xl font-bold font-telugu mb-2">
                కళ్యాణ మహోత్సవ సమయం ఆసన్నమైనది!
              </h3>
              <p className="text-sm font-telugu text-[#dfb86c]">
                వధూవరులకు ఆయురారోగ్య ఐశ్వర్యాభివృద్ధి ప్రార్థనలతో శుభమస్తు!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 justify-center max-w-xl mx-auto">
              <FlipDigitCard
                value={timeLeft.days}
                label="రోజులు"
                isGlowing={timeLeft.isWithin24Hours}
              />
              <FlipDigitCard
                value={timeLeft.hours}
                label="గంటలు"
                isGlowing={timeLeft.isWithin24Hours}
              />
              <FlipDigitCard
                value={timeLeft.minutes}
                label="నిమిషాలు"
                isGlowing={timeLeft.isWithin24Hours}
              />
              <FlipDigitCard
                value={timeLeft.seconds}
                label="సెకన్లు"
                isGlowing={timeLeft.isWithin24Hours}
              />
            </div>
          )}

          <div className="mt-8 text-xs sm:text-sm text-[#dfb86c]/80 font-telugu">
            స్థలం: వరుని స్వగృహము, సీతారామపురం (సంగసానిపల్లి), ఉదయగిరి మండలం, నెల్లూరు జిల్లా.
          </div>
        </div>
      </div>
    </section>
  );
};
