import React from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { SectionHeader } from './SectionHeader';
import { GodLogo } from './GodLogo';
import { Calendar, Clock, MapPin } from 'lucide-react';

export const CeremonyTimeline: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          kicker="శుభ కార్యముల వివరములు"
          title="వివాహ మహోత్సవ కార్యక్రమ కాలపట్టిక"
          subtitle="మంగళకరమైన వేడుకలు — ఆశీర్వదించేందుకు విచ్చేయండి"
        />

        <div className="relative mt-12 mb-6">
          {/* Central Gold Thread Drawing Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-[#8a6721] via-[#c9a24b] to-[#dfb86c] shadow-[0_0_8px_rgba(201,162,75,0.4)]" />

          <div className="space-y-12">
            {weddingData.events.map((event, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={event.id}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline God Logo Milestone Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.6 }}
                      className="p-1 rounded-full bg-[#1c0509] border-2 border-[#dfb86c] shadow-[0_0_15px_rgba(201,162,75,0.6)]"
                    >
                      <GodLogo size="sm" />
                    </motion.div>
                  </div>

                  {/* Spacer for desktop 2-column alternating layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Event Card Content */}
                  <motion.div
                    className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                      isEven ? 'md:pr-10' : 'md:pl-10'
                    }`}
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="royal-card rounded-2xl p-6 sm:p-7 relative overflow-hidden group hover:border-[#dfb86c] transition-all duration-300">
                      {/* Top Bar with Number & Date */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#c9a24b]/20 mb-4">
                        <span className="text-xs font-cinzel text-[#dfb86c] tracking-wider">
                          కార్యక్రమం 0{idx + 1}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-[#dfb86c]/90 font-telugu">
                          <Calendar className="w-3.5 h-3.5 text-[#c9a24b]" />
                          <span>{event.teluguDate}</span>
                        </div>
                      </div>

                      {/* Event Title */}
                      <h3 className="text-xl sm:text-2xl font-bold font-telugu text-[#fef08a] mb-2">
                        {event.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#dfb86c]/90 font-telugu mb-3">
                        {event.teluguTitle}
                      </p>

                      {/* Time */}
                      <div className="flex items-center gap-2 text-sm text-[#fbf3e0] font-telugu mb-3 bg-[#26050c]/60 p-2.5 rounded-lg border border-[#c9a24b]/30">
                        <Clock className="w-4 h-4 text-[#dfb86c] shrink-0" />
                        <span className="font-medium">{event.time}</span>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-2 text-xs sm:text-sm text-[#fbf3e0]/80 font-telugu mb-2">
                        <MapPin className="w-4 h-4 text-[#dfb86c] shrink-0 mt-0.5" />
                        <span>{event.location}</span>
                      </div>

                      {/* Note if available */}
                      {event.note && (
                        <div className="mt-3 pt-2 border-t border-[#c9a24b]/20 text-[11px] sm:text-xs text-[#dfb86c]/80 font-telugu italic">
                          * {event.note}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
