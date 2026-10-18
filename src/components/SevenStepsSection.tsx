import React, { useState } from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { SectionHeader } from './SectionHeader';
import { Sparkles } from 'lucide-react';

// Golden Footprints SVG (పాద ముద్రలు)
const FootprintSvg: React.FC<{ active: boolean; index: number }> = ({ active, index }) => (
  <svg
    width="28"
    height="36"
    viewBox="0 0 28 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-700 ${
      active
        ? 'drop-shadow-[0_0_10px_rgba(254,240,138,0.8)] opacity-100 scale-105'
        : 'opacity-40'
    }`}
  >
    {/* Main Sole */}
    <path
      d="M14,14 C19,14 22,22 20,30 C18,35 10,35 8,30 C6,22 9,14 14,14 Z"
      fill={active ? '#dfb86c' : '#8a6721'}
    />
    {/* Five Toes */}
    <circle cx="7" cy="8" r="2.4" fill={active ? '#fef08a' : '#8a6721'} />
    <circle cx="11" cy="5" r="2.6" fill={active ? '#fef08a' : '#8a6721'} />
    <circle cx="16" cy="5" r="2.8" fill={active ? '#fef08a' : '#8a6721'} />
    <circle cx="21" cy="7" r="3.2" fill={active ? '#fef08a' : '#8a6721'} />
    <circle cx="24" cy="11" r="2.2" fill={active ? '#fef08a' : '#8a6721'} />
  </svg>
);

export const SevenStepsSection: React.FC = () => {
  // Flip state for interactive card flip
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (stepNumber: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  return (
    <section className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          kicker="సప్తపది"
          title="పెళ్లి ఏడు అడుగులు — జీవితాంతం కలిసి నడిచే ఏడు వాగ్దానాలు"
          subtitle="అగ్నిసాక్షిగా వధూవరులు తీసుకునే పవిత్రమైన ఏడు ప్రమాణాలు"
        />

        {/* Seven Golden Footprints Path Visualizer */}
        <div className="my-8 py-4 px-4 rounded-2xl bg-[#26050c]/80 border border-[#c9a24b]/40 shadow-inner flex flex-wrap items-center justify-around gap-2 sm:gap-4">
          {weddingData.sevenSteps.map((step, idx) => (
            <motion.div
              key={step.stepNumber}
              className="flex flex-col items-center gap-1.5 cursor-pointer"
              whileHover={{ scale: 1.15 }}
              onClick={() => toggleFlip(step.stepNumber)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <FootprintSvg active={true} index={idx} />
              <span className="text-[11px] sm:text-xs font-cinzel text-[#dfb86c]">
                అడుగు {step.stepNumber}
              </span>
            </motion.div>
          ))}
        </div>

        {/* 7 Interactive Cards with 3D Flip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {weddingData.sevenSteps.map((step, idx) => {
            const isFlipped = !!flippedCards[step.stepNumber];

            return (
              <motion.div
                key={step.stepNumber}
                className="perspective-1000 h-64 cursor-pointer"
                onClick={() => toggleFlip(step.stepNumber)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
              >
                <div
                  className={`relative w-full h-full rounded-2xl transition-transform duration-700 preserve-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Front Face of Step Card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden royal-card rounded-2xl p-6 flex flex-col justify-between border border-[#c9a24b]/40 shadow-lg group hover:border-[#dfb86c]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-cinzel text-[#dfb86c] tracking-wider">
                        {step.teluguNumber}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#3b0a14] border border-[#c9a24b]/40 flex items-center justify-center text-[#dfb86c] text-xs">
                        {step.stepNumber}
                      </div>
                    </div>

                    <div className="my-auto text-center">
                      <h4 className="text-xl font-bold font-telugu text-[#fef08a] mb-2">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#dfb86c]/90 font-cinzel">
                        {step.englishMeaning}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-[#dfb86c]/70 font-telugu pt-2 border-t border-[#c9a24b]/20">
                      <Sparkles className="w-3.5 h-3.5 text-[#c9a24b]" />
                      <span>వాగ్దానాన్ని చూడటానికి తాకండి</span>
                    </div>
                  </div>

                  {/* Back Face of Step Card (The Sacred Vow) */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-2xl p-6 bg-gradient-to-b from-[#2b050e] to-[#1c0509] border-2 border-[#dfb86c] shadow-[0_0_25px_rgba(201,162,75,0.3)] flex flex-col justify-between text-center"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#c9a24b]/30">
                      <span className="text-xs font-telugu font-semibold text-[#fef08a]">
                        {step.teluguNumber} — వాగ్దానం
                      </span>
                      <span className="text-xs text-[#dfb86c]">🕉</span>
                    </div>

                    <p className="text-sm sm:text-base text-[#fbf3e0] font-telugu leading-relaxed my-auto">
                      "{step.vow}"
                    </p>

                    <div className="text-[11px] text-[#dfb86c]/70 font-telugu">
                      (తిరిగి చూడటానికి తాకండి)
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Line with Blooming Lotus */}
        <motion.div
          className="mt-12 text-center p-6 rounded-2xl bg-[#26050c]/80 border border-[#c9a24b]/40 max-w-2xl mx-auto shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Blooming Lotus Icon */}
          <div className="flex justify-center mb-3">
            <svg width="48" height="30" viewBox="0 0 48 30" fill="none">
              <path d="M24,2 C20,10 20,20 24,28 C28,20 28,10 24,2 Z" fill="#dfb86c" />
              <path d="M24,14 C14,8 8,15 9,24 C15,26 21,22 24,17" fill="#c9a24b" />
              <path d="M24,14 C34,8 40,15 39,24 C33,26 27,22 24,17" fill="#c9a24b" />
            </svg>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-telugu text-[#fef08a] leading-relaxed">
            "{weddingData.sevenStepsClosing}"
          </h3>

          <p className="text-xs text-[#dfb86c]/80 mt-3 font-telugu italic">
            {weddingData.sevenStepsTraditionNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
