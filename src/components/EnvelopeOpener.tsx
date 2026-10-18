import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { KolamSvg } from './KolamSvg';
import { ToranBanner } from './ToranBanner';
import { GopuramSilhouette } from './GopuramSilhouette';
import { GodLogo } from './GodLogo';
import { PetalShower } from './PetalShower';
import { useWeddingAudio } from '../context/AudioContext';
import { segmentGraphemes } from '../utils/teluguSegmenter';

interface EnvelopeOpenerProps {
  onOpened: () => void;
  isOpened: boolean;
}

export const EnvelopeOpener: React.FC<EnvelopeOpenerProps> = ({
  onOpened,
  isOpened,
}) => {
  const { startOpeningMusic } = useWeddingAudio();
  const [openingState, setOpeningState] = useState<'closed' | 'opening' | 'open'>(
    isOpened ? 'open' : 'closed'
  );
  const [showPetals, setShowPetals] = useState<boolean>(false);
  const [sealCracked, setSealCracked] = useState<boolean>(false);

  // Segment Telugu names properly without breaking vowel signs or conjuncts
  const brideGraphemes = segmentGraphemes(weddingData.bride.name);
  const groomGraphemes = segmentGraphemes(weddingData.groom.name);

  const handleOpenEnvelope = async () => {
    if (openingState !== 'closed') return;

    // 1. Start audio immediately in the user interaction event
    startOpeningMusic();

    // 2. Crack seal
    setSealCracked(true);
    setOpeningState('opening');

    // 3. Trigger petals shower
    setTimeout(() => {
      setShowPetals(true);
    }, 400);

    // 4. Curtains part & complete open after animations
    setTimeout(() => {
      setOpeningState('open');
      onOpened();
      // Smooth scroll to main card
      const target = document.getElementById('main-invitation');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1800);
  };

  if (openingState === 'open') {
    return (
      <PetalShower
        active={showPetals}
        durationSeconds={4}
        count={24}
        onComplete={() => setShowPetals(false)}
      />
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1c0509] via-[#3b0a14] to-[#1c0509] px-4 py-8 z-30 select-none">
      {/* Petal burst during opening */}
      <PetalShower
        active={showPetals}
        durationSeconds={4}
        count={24}
        onComplete={() => setShowPetals(false)}
      />

      {/* Top Swaying Mango Leaf Toran */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <ToranBanner sway={true} />
      </div>

      {/* Rising Gopuram Silhouette Background */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 0.18 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <GopuramSilhouette height={320} opacity={0.3} />
      </motion.div>

      {/* Divine God Logo flanking the envelope on starting screen */}
      <div className="absolute bottom-8 left-6 md:left-20 hidden sm:block">
        <GodLogo size="lg" showText={true} />
      </div>
      <div className="absolute bottom-8 right-6 md:right-20 hidden sm:block">
        <GodLogo size="lg" showText={true} />
      </div>

      {/* Left and Right Curtains for opening parting */}
      <AnimatePresence>
        {openingState === 'opening' && (
          <>
            <motion.div
              className="fixed inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#1c0509] to-[#3b0a14] border-r-2 border-[#c9a24b]/40 z-40 pointer-events-none shadow-2xl"
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="fixed inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#1c0509] to-[#3b0a14] border-l-2 border-[#c9a24b]/40 z-40 pointer-events-none shadow-2xl"
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main 3D Royal Gold Envelope Presentation */}
      <motion.div
        className="relative w-full max-w-xl mx-auto perspective-1000 mt-6"
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        {/* Animated Gold Kolam Behind/Above Envelope with Central God Logo */}
        <div className="flex flex-col items-center justify-center -mb-6 relative z-10">
          <GodLogo size="xl" showText={true} className="mb-2" />
          <KolamSvg size={110} animate={true} />
        </div>

        {/* Envelope Container */}
        <div className="relative bg-gradient-to-b from-[#3b0a14] to-[#26050c] rounded-2xl p-6 sm:p-9 royal-border shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center preserve-3d">
          
          {/* Ornate Gold Corner Filigree */}
          <div className="absolute top-2 left-2 text-[#c9a24b]/50 select-none text-xl" aria-hidden="true">❖</div>
          <div className="absolute top-2 right-2 text-[#c9a24b]/50 select-none text-xl" aria-hidden="true">❖</div>
          <div className="absolute bottom-2 left-2 text-[#c9a24b]/50 select-none text-xl" aria-hidden="true">❖</div>
          <div className="absolute bottom-2 right-2 text-[#c9a24b]/50 select-none text-xl" aria-hidden="true">❖</div>

          {/* Subhamastu Sacred Heading */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c9a24b]" />
            <span className="text-[#dfb86c] text-sm sm:text-base font-semibold tracking-wider">
              {weddingData.invocation.subhamastu}
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c9a24b]" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg sm:text-2xl text-[#f5d68b] font-medium tracking-wide mb-4 font-telugu"
          >
            {weddingData.invocation.mainHeading}
          </motion.h1>

          {/* Bride & Groom Names with Intl.Segmenter Grapheme Clustering & Gold Shimmer */}
          <div className="py-4 my-2 border-y border-[#c9a24b]/30">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-telugu text-gold-shimmer leading-relaxed tracking-normal">
              {/* Bride Name graphemes */}
              <span className="inline-block">
                {brideGraphemes.map((char, idx) => (
                  <motion.span
                    key={`b-${idx}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.05, duration: 0.5 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              <span className="text-[#dfb86c] mx-3 font-normal text-2xl sm:text-3xl">&</span>

              {/* Groom Name graphemes */}
              <span className="inline-block">
                {groomGraphemes.map((char, idx) => (
                  <motion.span
                    key={`g-${idx}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + idx * 0.05, duration: 0.5 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h2>

            {/* Qualifications */}
            <p className="text-xs sm:text-sm text-[#dfb86c]/80 mt-1 font-cinzel tracking-widest">
              B.Tech. &nbsp;|&nbsp; B.Tech.
            </p>
          </div>

          {/* Cordial Invitation Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-[#fbf3e0]/90 text-sm sm:text-base my-4 font-telugu leading-relaxed"
          >
            {weddingData.invocation.tagline}
          </motion.p>

          {/* 3D Envelope Flap & ॐ Wax Seal */}
          <div className="relative my-6 flex flex-col items-center">
            {/* Animated 3D Flap */}
            <motion.div
              className="w-full h-16 relative overflow-hidden"
              animate={openingState === 'opening' ? { rotateX: -180, opacity: 0 } : { rotateX: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top center' }}
            >
              <svg viewBox="0 0 400 60" fill="none" className="w-full h-full">
                <path
                  d="M0,0 L200,55 L400,0 Z"
                  fill="#6b1224"
                  stroke="#c9a24b"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>

            {/* Sacred ॐ Wax Seal (ముద్ర) */}
            <motion.div
              className="relative -mt-9 z-20 cursor-pointer"
              onClick={handleOpenEnvelope}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#dfb86c] via-[#c9a24b] to-[#8a6721] p-0.5 shadow-[0_6px_20px_rgba(0,0,0,0.7)] flex items-center justify-center transition-transform ${
                  sealCracked ? 'filter blur-[1px]' : ''
                }`}
              >
                <div className="w-full h-full rounded-full bg-[#520d1c] border-2 border-[#dfb86c] flex items-center justify-center shadow-inner relative overflow-hidden">
                  {/* Wax texture concentric circles */}
                  <div className="absolute inset-1 rounded-full border border-[#c9a24b]/40 pointer-events-none" />
                  
                  {/* ॐ Symbol */}
                  <span className="text-2xl sm:text-3xl text-[#f5d68b] font-bold select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    ॐ
                  </span>

                  {/* Crack Animation Line */}
                  {sealCracked && (
                    <motion.svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path d="M10,12 L30,34 L28,45 L50,60" stroke="#fef08a" strokeWidth="2.5" fill="none" />
                    </motion.svg>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Button: ఆహ్వానము తెరవండి (Pulsing) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-2 mb-2"
          >
            <button
              onClick={handleOpenEnvelope}
              disabled={openingState === 'opening'}
              className="relative group px-8 py-3.5 rounded-full font-telugu font-bold text-base sm:text-lg text-[#26050c] bg-gradient-to-r from-[#dfb86c] via-[#f5d68b] to-[#c9a24b] shadow-[0_0_25px_rgba(201,162,75,0.6)] hover:shadow-[0_0_35px_rgba(245,214,139,0.9)] active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#f5d68b] cursor-pointer"
              aria-label="ఆహ్వానము తెరవండి — శుభ ఆహ్వాన పత్రికను వీక్షించండి"
            >
              {/* Outer pulsing ring */}
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#dfb86c] to-[#f5d68b] opacity-40 group-hover:opacity-75 animate-ping duration-1000 pointer-events-none" />
              
              <span className="relative flex items-center justify-center gap-2">
                <span>ఆహ్వానము తెరవండి</span>
                <span className="text-xl">✨</span>
              </span>
            </button>
          </motion.div>

          <p className="text-xs text-[#dfb86c]/70 mt-3 font-telugu">
            (ఆహ్వానాన్ని తెరిచి మంగళ వాయిద్యం వినండి)
          </p>
        </div>
      </motion.div>
    </div>
  );
};
