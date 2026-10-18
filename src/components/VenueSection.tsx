import React from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { SectionHeader } from './SectionHeader';
import { MapPin, Navigation, ExternalLink, Calendar, Clock } from 'lucide-react';

export const VenueSection: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          kicker="వేదిక వివరములు"
          title="కళ్యాణ వేదికల స్థల మార్గదర్శి"
          subtitle="వివాహ వేడుకలు జరిగే పవిత్ర స్థలాలు మరియు సులభ మార్గము"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mt-8">
          {weddingData.events.map((event) => {
            const hasMaps = !!event.mapsUrl;

            return (
              <motion.div
                key={event.id}
                className="royal-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-[#dfb86c] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7 }}
              >
                <div>
                  {/* Event Type & Date */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#c9a24b]/20 mb-4">
                    <span className="text-xs font-semibold text-[#dfb86c] font-cinzel">
                      {event.title}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#dfb86c]/90 font-telugu">
                      <Calendar className="w-3.5 h-3.5 text-[#c9a24b]" />
                      <span>{event.teluguDate}</span>
                    </div>
                  </div>

                  {/* Title & Time */}
                  <h3 className="text-xl sm:text-2xl font-bold font-telugu text-[#fef08a] mb-2">
                    {event.teluguTitle}
                  </h3>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#fbf3e0] font-telugu mb-3 bg-[#26050c]/60 p-2 rounded-lg border border-[#c9a24b]/20">
                    <Clock className="w-4 h-4 text-[#dfb86c] shrink-0" />
                    <span>{event.time}</span>
                  </div>

                  {/* Location Text */}
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-[#fbf3e0]/90 font-telugu mb-4">
                    <MapPin className="w-4 h-4 text-[#dfb86c] shrink-0 mt-0.5" />
                    <span>{event.location}</span>
                  </div>

                  {event.note && (
                    <p className="text-[11px] sm:text-xs text-[#dfb86c]/80 font-telugu mb-4 italic">
                      * {event.note}
                    </p>
                  )}
                </div>

                {/* For events WITH Maps link: show large decorative royal map preview panel */}
                {hasMaps ? (
                  <div className="mt-auto pt-2">
                    <a
                      href={event.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative w-full h-44 rounded-xl overflow-hidden border border-[#c9a24b]/50 shadow-md group-hover:shadow-[0_0_20px_rgba(201,162,75,0.4)] group-hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fef08a]"
                      aria-label={`Google Maps లో ${event.title} స్థలం తెరవండి`}
                    >
                      {/* Styled Royal Theme Decorative Map Graphics */}
                      <svg
                        viewBox="0 0 320 180"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full object-cover bg-gradient-to-br from-[#2b050e] via-[#3b0a14] to-[#1c0509]"
                        preserveAspectRatio="none"
                      >
                        {/* Subtle Grid Roads & Contours */}
                        <path
                          d="M-20,40 Q100,60 160,30 T340,50"
                          stroke="#c9a24b"
                          strokeWidth="2"
                          strokeOpacity="0.35"
                        />
                        <path
                          d="M-10,130 Q80,100 180,140 T330,110"
                          stroke="#c9a24b"
                          strokeWidth="2.5"
                          strokeOpacity="0.4"
                        />
                        <path
                          d="M90,-10 Q110,90 140,190"
                          stroke="#dfb86c"
                          strokeWidth="1.5"
                          strokeOpacity="0.3"
                          strokeDasharray="4 4"
                        />
                        <path
                          d="M220,-10 Q200,80 230,190"
                          stroke="#dfb86c"
                          strokeWidth="1.5"
                          strokeOpacity="0.3"
                          strokeDasharray="4 4"
                        />

                        {/* Topo Rings around venue */}
                        <circle cx="160" cy="85" r="45" stroke="#dfb86c" strokeWidth="1" strokeOpacity="0.2" />
                        <circle cx="160" cy="85" r="30" stroke="#dfb86c" strokeWidth="1" strokeOpacity="0.3" />
                        <circle cx="160" cy="85" r="15" stroke="#f5d68b" strokeWidth="1.2" strokeOpacity="0.4" />
                      </svg>

                      {/* Bouncing Gold Pin in Center */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#dfb86c] to-[#fef08a] p-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.8)] flex items-center justify-center">
                            <div className="w-full h-full rounded-full bg-[#3b0a14] flex items-center justify-center text-[#fef08a]">
                              <MapPin className="w-5 h-5 fill-current" />
                            </div>
                          </div>
                          {/* Pin Shadow */}
                          <div className="w-4 h-1.5 rounded-full bg-black/60 filter blur-[1px] mt-1" />
                        </motion.div>

                        <span className="text-xs font-bold font-telugu text-[#fef08a] bg-[#1c0509]/90 px-3 py-1 rounded-full border border-[#c9a24b]/60 mt-2 shadow">
                          {event.venueName}
                        </span>
                        <span className="text-[11px] text-[#dfb86c] mt-0.5 font-telugu">
                          మ్యాప్‌లో తెరవడానికి నొక్కండి
                        </span>
                      </div>

                      {/* External Link badge in corner */}
                      <div className="absolute top-2 right-2 p-1.5 rounded-full bg-[#1c0509]/80 border border-[#c9a24b]/40 text-[#dfb86c]">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </a>

                    {/* Google Maps Explicit Button */}
                    <a
                      href={event.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#dfb86c] to-[#f5d68b] text-[#26050c] font-telugu font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow hover:shadow-[0_0_15px_rgba(201,162,75,0.5)] transition-all cursor-pointer"
                    >
                      <Navigation className="w-4 h-4 text-[#26050c]" />
                      <span>Google Maps లో చూడండి</span>
                    </a>
                  </div>
                ) : (
                  /* For విందు: No Maps link, show written location only, no map panel, no button */
                  <div className="mt-auto p-4 rounded-xl bg-[#26050c]/60 border border-[#c9a24b]/20 text-center">
                    <p className="text-xs text-[#dfb86c] font-telugu">
                      వధువు స్వగృహం నందు విందు ఏర్పాటు చేయబడింది.
                    </p>
                    <p className="text-[11px] text-[#fbf3e0]/70 font-telugu mt-1">
                      (మాచవరం గ్రామం, కందుకూరు మండలం)
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
