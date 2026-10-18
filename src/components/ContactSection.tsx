import React from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { SectionHeader } from './SectionHeader';
import { Phone, MessageCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const encodedWhatsappText = encodeURIComponent(weddingData.whatsappMessageText);

  return (
    <section className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          kicker="సంప్రదించండి"
          title="సహాయం మరియు వివరముల కొరకు"
          subtitle="వివాహ వేదికలు లేదా వివరాల కొరకు కుటుంబ సభ్యులను సంప్రదించండి"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {weddingData.contacts.map((contact, idx) => {
            const callHref = `tel:+91${contact.phone}`;
            const whatsappHref = `https://wa.me/${contact.whatsappNumber}?text=${encodedWhatsappText}`;

            return (
              <motion.div
                key={contact.phone}
                className="royal-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-[#c9a24b]/40 hover:border-[#dfb86c] transition-all shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#c9a24b]/20 mb-3">
                    <span className="text-xs text-[#dfb86c] font-telugu font-medium">
                      {contact.relation}
                    </span>
                    <span className="text-xs font-cinzel text-[#dfb86c]/80 tracking-wider">
                      +91 {contact.phone}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-telugu text-[#fef08a] mb-1">
                    {contact.name}
                  </h3>
                  <p className="text-xs text-[#dfb86c]/80 font-telugu mb-6">
                    {idx === 0 ? 'వధువు తరఫు కుటుంబం' : 'వరుని తరఫు కుటుంబం'}
                  </p>
                </div>

                {/* Direct Action Buttons: Never call or send automatically */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#c9a24b]/20">
                  {/* Call Button */}
                  <a
                    href={callHref}
                    className="py-2.5 px-4 rounded-xl bg-[#26050c] hover:bg-[#3b0a14] border border-[#c9a24b]/50 text-[#fef08a] font-telugu font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow hover:shadow-[0_0_12px_rgba(201,162,75,0.4)] cursor-pointer"
                    aria-label={`${contact.name} కు కాల్ చేయండి`}
                  >
                    <Phone className="w-4 h-4 text-[#dfb86c]" />
                    <span>కాల్ చేయండి</span>
                  </a>

                  {/* WhatsApp Button */}
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-[#143d31] hover:bg-[#1f5c4a] border border-[#2d7a64] text-[#fbf3e0] font-telugu font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow hover:shadow-[0_0_12px_rgba(31,92,74,0.6)] cursor-pointer"
                    aria-label={`${contact.name} కు WhatsApp సందేశం పంపండి`}
                  >
                    <MessageCircle className="w-4 h-4 text-[#86efac]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
