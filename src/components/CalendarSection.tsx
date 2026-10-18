import React from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { SectionHeader } from './SectionHeader';
import { buildGoogleCalendarUrl, downloadIcsFile } from '../utils/calendarGenerator';
import { CalendarPlus, Download, Check } from 'lucide-react';

export const CalendarSection: React.FC = () => {
  const handleDownloadAll = () => {
    downloadIcsFile(weddingData.events, 'VenkataMrudula-Mallikarjuna-All-Events.ics');
  };

  const handleDownloadSingle = (eventId: string) => {
    const ev = weddingData.events.find(e => e.id === eventId);
    if (ev) {
      downloadIcsFile([ev], `${ev.id}-wedding.ics`);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          kicker="క్యాలెండర్ రిమైండర్"
          title="మీ క్యాలెండర్‌లో జోడించండి"
          subtitle="మీ అనుకూలత కొరకు గూగుల్ క్యాలెండర్ లేదా ఆపిల్ / ఔట్లుక్ (.ics) లో సులభంగా భద్రపరుచుకోండి"
        />

        {/* Master Action: All Events in One Click */}
        <motion.div
          className="royal-card rounded-2xl p-6 sm:p-8 text-center mb-8 border-2 border-[#dfb86c] shadow-[0_0_30px_rgba(201,162,75,0.25)]"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-14 h-14 rounded-full bg-[#1c0509] border border-[#dfb86c] text-[#fef08a] flex items-center justify-center mx-auto mb-3 shadow">
            <CalendarPlus className="w-7 h-7" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-telugu text-[#fef08a] mb-2">
            అన్ని కార్యక్రమాలను ఒకేసారి జోడించండి
          </h3>
          <p className="text-xs sm:text-sm text-[#dfb86c]/90 font-telugu max-w-lg mx-auto mb-5 leading-relaxed">
            గంధపు నలుగు, శుభ విందు మరియు కళ్యాణ మహోత్సవం మూడు కార్యక్రమాల పూర్తి సమాచారంతో కూడిన .ics క్యాలెండర్ ఫైల్.
          </p>

          <button
            onClick={handleDownloadAll}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#dfb86c] via-[#f5d68b] to-[#c9a24b] text-[#26050c] font-telugu font-bold text-sm sm:text-base shadow-lg hover:shadow-[0_0_20px_rgba(201,162,75,0.7)] active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>అన్ని కార్యక్రమాలు (.ics) డౌన్‌లోడ్ చేయండి</span>
          </button>
        </motion.div>

        {/* Individual Event Calendar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weddingData.events.map((event) => {
            const googleUrl = buildGoogleCalendarUrl(event);

            return (
              <div
                key={event.id}
                className="royal-card rounded-xl p-5 flex flex-col justify-between border border-[#c9a24b]/40 hover:border-[#dfb86c] transition-colors"
              >
                <div>
                  <span className="text-xs font-cinzel text-[#dfb86c] tracking-wider block mb-1">
                    {event.title}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold font-telugu text-[#fef08a] mb-2">
                    {event.teluguTitle}
                  </h4>
                  <p className="text-xs text-[#dfb86c] font-telugu mb-1">
                    📅 {event.teluguDate}
                  </p>
                  <p className="text-xs text-[#fbf3e0]/80 font-telugu mb-4">
                    ⏰ {event.time}
                  </p>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-[#c9a24b]/20">
                  {/* Google Calendar Link */}
                  <a
                    href={googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-[#3b0a14] hover:bg-[#6b1224] border border-[#c9a24b]/40 text-[#fef08a] font-telugu text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-[#dfb86c]" />
                    <span>Google Calendar లో జోడించండి</span>
                  </a>

                  {/* .ics Download Link */}
                  <button
                    onClick={() => handleDownloadSingle(event.id)}
                    className="w-full py-2 px-3 rounded-lg bg-[#26050c] hover:bg-[#3b0a14] border border-[#c9a24b]/30 text-[#dfb86c] font-telugu text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Apple / .ics డౌన్‌లోడ్</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
