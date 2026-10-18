import React from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { GodLogo } from './GodLogo';

export const InvitationCard: React.FC = () => {
  return (
    <section id="main-invitation" className="py-12 px-4 sm:px-6 relative scroll-mt-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="relative bg-gradient-to-b from-[#3b0a14] via-[#2d0710] to-[#20040b] rounded-2xl p-6 sm:p-12 royal-border shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-center overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1 }}
        >
          {/* Subtle Background Gopuram Watermark Silhouette */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-10 pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 400 240" fill="none" className="w-96 h-auto">
              <path d="M200,20 L230,60 L240,120 L260,200 L140,200 L160,120 L170,60 Z" fill="#dfb86c" />
            </svg>
          </div>

          {/* Golden Corner Ornaments */}
          <div className="absolute top-3 left-3 text-[#dfb86c]/60 text-2xl select-none" aria-hidden="true">⚜</div>
          <div className="absolute top-3 right-3 text-[#dfb86c]/60 text-2xl select-none" aria-hidden="true">⚜</div>
          <div className="absolute bottom-3 left-3 text-[#dfb86c]/60 text-2xl select-none" aria-hidden="true">⚜</div>
          <div className="absolute bottom-3 right-3 text-[#dfb86c]/60 text-2xl select-none" aria-hidden="true">⚜</div>

          {/* Divine God Logo at Header */}
          <div className="flex justify-center mb-4">
            <GodLogo size="lg" showText={true} />
          </div>

          {/* Top Invocations */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6">
            <span className="text-[#f5d68b] font-semibold text-base sm:text-lg tracking-wider font-telugu">
              {weddingData.invocation.sriRastu}
            </span>
            <span className="text-[#dfb86c]/40">•</span>
            <span className="text-[#f5d68b] font-semibold text-base sm:text-lg tracking-wider font-telugu">
              {weddingData.invocation.subhamastu}
            </span>
            <span className="text-[#dfb86c]/40">•</span>
            <span className="text-[#f5d68b] font-semibold text-base sm:text-lg tracking-wider font-telugu">
              {weddingData.invocation.avinamastu}
            </span>
          </div>

          {/* Traditional Sanskrit Shloka */}
          <div className="my-6 p-4 sm:p-6 rounded-xl bg-[#26050c]/80 border border-[#c9a24b]/40 max-w-2xl mx-auto shadow-inner">
            <p className="text-base sm:text-lg text-[#fef08a] font-medium font-telugu leading-relaxed">
              "{weddingData.invocation.shloka}"
            </p>
            <p className="text-xs sm:text-sm text-[#dfb86c]/80 mt-2 font-telugu italic">
              — {weddingData.invocation.shlokaMeaning}
            </p>
          </div>

          {/* Inviting Hosts Line (Bride's family) */}
          <div className="my-6 text-center max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm text-[#dfb86c] tracking-wider uppercase mb-1 font-telugu font-medium">
              {weddingData.brideFamily.title}
            </p>
            <p className="text-lg sm:text-xl text-[#fbf3e0] font-semibold font-telugu">
              {weddingData.brideFamily.parents}
            </p>
            <p className="text-xs sm:text-sm text-[#dfb86c]/80 font-telugu mt-0.5">
              {weddingData.brideFamily.fullAddress}
            </p>
          </div>

          {/* Main Invitation Note */}
          <div className="my-6 py-4 border-y border-[#c9a24b]/30 max-w-2xl mx-auto">
            <p className="text-base sm:text-lg text-[#fbf3e0] font-telugu leading-relaxed">
              {weddingData.invitationNote}
            </p>
          </div>

          {/* Bride & Groom Grand Typography */}
          <div className="my-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-2xl mx-auto text-center">
              {/* Bride Column */}
              <div className="p-4 rounded-xl bg-[#3b0a14]/60 border border-[#c9a24b]/30">
                <span className="text-xs text-[#dfb86c] tracking-widest block font-telugu mb-1">వధువు</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-telugu text-gold-shimmer mb-1">
                  {weddingData.bride.fullName}
                </h3>
                <span className="inline-block text-xs text-[#dfb86c]/90 font-cinzel">
                  {weddingData.bride.qualification}
                </span>
                <p className="text-xs text-[#fbf3e0]/80 mt-2 font-telugu">
                  {weddingData.bride.line}
                </p>
              </div>

              {/* Groom Column */}
              <div className="p-4 rounded-xl bg-[#3b0a14]/60 border border-[#c9a24b]/30">
                <span className="text-xs text-[#dfb86c] tracking-widest block font-telugu mb-1">వరుడు</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-telugu text-gold-shimmer mb-1">
                  {weddingData.groom.fullName}
                </h3>
                <span className="inline-block text-xs text-[#dfb86c]/90 font-cinzel">
                  {weddingData.groom.qualification}
                </span>
                <p className="text-xs text-[#fbf3e0]/80 mt-2 font-telugu">
                  {weddingData.groom.line}
                </p>
              </div>
            </div>
          </div>

          {/* Groom's Family Details (explicitly included alongside Bride's family as required) */}
          <div className="my-6 p-4 rounded-xl bg-[#26050c]/80 border border-[#c9a24b]/40 max-w-2xl mx-auto text-center">
            <p className="text-xs sm:text-sm text-[#dfb86c] font-medium font-telugu mb-1">
              {weddingData.groomFamily.title}
            </p>
            <p className="text-base sm:text-lg text-[#fbf3e0] font-semibold font-telugu">
              {weddingData.groomFamily.parents}
            </p>
            <p className="text-xs sm:text-sm text-[#dfb86c]/80 font-telugu mt-0.5">
              {weddingData.groomFamily.fullAddress}
            </p>
          </div>

          {/* Muhurtham & Auspicious Lagna Section with Divine God Logo */}
          <div className="my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#2b060e] via-[#3b0a14] to-[#2b060e] border border-[#c9a24b]/60 relative shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <GodLogo size="sm" />
              <div className="text-center px-2">
                <span className="text-xs sm:text-sm text-[#dfb86c] tracking-widest uppercase font-telugu font-semibold">
                  నిశ్చయ తాంబూల సుముహూర్తం
                </span>
                <h4 className="text-lg sm:text-2xl text-[#fef08a] font-bold font-telugu mt-1">
                  {weddingData.muhurtham.englishDateFormatted}
                </h4>
              </div>
              <GodLogo size="sm" />
            </div>

            <p className="text-sm sm:text-base text-[#fbf3e0] font-telugu leading-relaxed my-3 max-w-2xl mx-auto">
              {weddingData.muhurtham.dateDescription}
            </p>

            <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-[#1c0509]/80 border border-[#c9a24b]/50 text-xs sm:text-sm text-[#dfb86c] font-telugu">
              {weddingData.muhurtham.exactTime}
            </div>

            <p className="text-[11px] sm:text-xs text-[#dfb86c]/70 mt-2 font-telugu">
              * {weddingData.muhurtham.verifiedNote}
            </p>
          </div>

          {/* Closing Invocations & Family Blessings */}
          <div className="mt-8 pt-6 border-t border-[#c9a24b]/30">
            <p className="text-base sm:text-lg text-[#fbf3e0] font-telugu leading-relaxed font-medium">
              "{weddingData.closingText}"
            </p>
            <p className="text-sm sm:text-base text-[#dfb86c] mt-2 font-telugu">
              {weddingData.closingWishes}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
