import React from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { SectionHeader } from './SectionHeader';
import { Users, Heart, MapPin, GraduationCap } from 'lucide-react';

export const CoupleCards: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          kicker="వధూవరుల పరిచయం"
          title="శుభ పరిచయ వేదిక"
          subtitle="మంగళ ప్రదమైన ఈ కల్యాణ బంధంలో ఏకమౌతున్న చి.ల.సౌ. వెంకట మృదుల మరియు చి. మల్లికార్జున"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Bride Card (వధువు వివరాలు) */}
          <motion.div
            className="royal-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#dfb86c]/70 transition-all duration-300"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-[#c9a24b]/30">
              <span className="text-xs font-semibold tracking-wider text-[#dfb86c] font-telugu">
                {weddingData.bride.salutation}
              </span>
              <span className="text-xs text-[#c9a24b] px-3 py-1 rounded-full bg-[#1c0509]/60 border border-[#c9a24b]/30 font-telugu">
                వధువు
              </span>
            </div>

            {/* Name & Qualification */}
            <div className="my-6">
              <h3 className="text-2xl sm:text-3xl font-bold font-telugu text-[#fef08a] mb-2 leading-snug">
                {weddingData.bride.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-[#dfb86c] font-cinzel">
                <GraduationCap className="w-4 h-4 text-[#c9a24b]" />
                <span>{weddingData.bride.qualification}</span>
              </div>
              <p className="text-sm sm:text-base text-[#fbf3e0]/90 mt-3 font-telugu leading-relaxed">
                "{weddingData.bride.line}"
              </p>
            </div>

            {/* Parents & Native Family Info */}
            <div className="pt-5 border-t border-[#c9a24b]/20 bg-[#26050c]/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
              <div className="flex items-start gap-3 mb-3">
                <Heart className="w-5 h-5 text-[#dfb86c] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#dfb86c]/80 block font-telugu">తల్లిదండ్రులు</span>
                  <p className="text-sm sm:text-base font-semibold text-[#fbf3e0] font-telugu">
                    {weddingData.brideFamily.parents}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#dfb86c] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#dfb86c]/80 block font-telugu">స్వస్థలం</span>
                  <p className="text-xs sm:text-sm text-[#fbf3e0]/90 font-telugu">
                    {weddingData.brideFamily.fullAddress}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Groom Card (వరుడు వివరాలు) */}
          <motion.div
            className="royal-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#dfb86c]/70 transition-all duration-300"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-[#c9a24b]/30">
              <span className="text-xs font-semibold tracking-wider text-[#dfb86c] font-telugu">
                {weddingData.groom.salutation}
              </span>
              <span className="text-xs text-[#c9a24b] px-3 py-1 rounded-full bg-[#1c0509]/60 border border-[#c9a24b]/30 font-telugu">
                వరుడు
              </span>
            </div>

            {/* Name & Qualification */}
            <div className="my-6">
              <h3 className="text-2xl sm:text-3xl font-bold font-telugu text-[#fef08a] mb-2 leading-snug">
                {weddingData.groom.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-[#dfb86c] font-cinzel">
                <GraduationCap className="w-4 h-4 text-[#c9a24b]" />
                <span>{weddingData.groom.qualification}</span>
              </div>
              <p className="text-sm sm:text-base text-[#fbf3e0]/90 mt-3 font-telugu leading-relaxed">
                "{weddingData.groom.line}"
              </p>
            </div>

            {/* Parents & Native Family Info */}
            <div className="pt-5 border-t border-[#c9a24b]/20 bg-[#26050c]/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
              <div className="flex items-start gap-3 mb-3">
                <Heart className="w-5 h-5 text-[#dfb86c] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#dfb86c]/80 block font-telugu">తల్లిదండ్రులు</span>
                  <p className="text-sm sm:text-base font-semibold text-[#fbf3e0] font-telugu">
                    {weddingData.groomFamily.parents}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#dfb86c] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#dfb86c]/80 block font-telugu">స్వస్థలం</span>
                  <p className="text-xs sm:text-sm text-[#fbf3e0]/90 font-telugu">
                    {weddingData.groomFamily.fullAddress}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Groom Family Members Card (Rendered directly from groomFamilyMembers array) */}
        <motion.div
          className="mt-8 royal-card rounded-2xl p-6 sm:p-7 border border-[#c9a24b]/40 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#c9a24b]/30">
            <Users className="w-5 h-5 text-[#dfb86c]" />
            <h4 className="text-base sm:text-lg font-bold font-telugu text-[#f5d68b]">
              వరుని కుటుంబ సభ్యులు (Groom's Family)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {weddingData.groomFamilyMembers.map((member, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#26050c]/70 border border-[#c9a24b]/30 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm sm:text-base font-medium font-telugu text-[#fbf3e0]">
                    {member.name}
                  </p>
                  <span className="text-xs text-[#dfb86c]/80 font-telugu">
                    {member.relation}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#3b0a14] border border-[#c9a24b]/40 flex items-center justify-center text-xs text-[#dfb86c]">
                  🙏
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#dfb86c]/70 mt-3 font-telugu text-center">
            సీతారామపురం (సంగసానిపల్లి) గ్రామం, ఉదయగిరి మండలం, నెల్లూరు జిల్లా వాస్తవ్యులు
          </p>
        </motion.div>
      </div>
    </section>
  );
};
