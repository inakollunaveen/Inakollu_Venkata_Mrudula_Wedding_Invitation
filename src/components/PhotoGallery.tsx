import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { SectionHeader } from './SectionHeader';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';

interface PhotoItem {
  id: string;
  title: string;
  subtitle: string;
  primarySrc: string;
  driveId?: string;
  aspect: string;
  isCenter?: boolean;
}

export const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [loadErrors, setLoadErrors] = useState<Record<string, boolean>>({});

  // Strict order: Groom on LEFT, Couple in MIDDLE, Bride on RIGHT
  const photos: PhotoItem[] = [
    {
      id: 'groom',
      title: 'వరుడు',
      subtitle: weddingData.groom.fullName,
      primarySrc: weddingData.groom.photoUrl,
      driveId: weddingData.groom.driveId,
      aspect: 'aspect-[3/4]',
      isCenter: false,
    },
    {
      id: 'couple',
      title: 'వధూవరులు',
      subtitle: `${weddingData.bride.name} & ${weddingData.groom.name}`,
      primarySrc: weddingData.couple.photoUrl,
      driveId: weddingData.couple.driveId,
      aspect: 'aspect-[3/4]',
      isCenter: true,
    },
    {
      id: 'bride',
      title: 'వధువు',
      subtitle: weddingData.bride.fullName,
      primarySrc: weddingData.bride.photoUrl,
      driveId: weddingData.bride.driveId,
      aspect: 'aspect-[3/4]',
      isCenter: false,
    },
  ];

  const handleImageError = (id: string) => {
    setLoadErrors(prev => ({ ...prev, [id]: true }));
  };

  const getEffectiveSrc = (photo: PhotoItem) => {
    if (loadErrors[photo.id] && photo.driveId) {
      return `https://drive.google.com/thumbnail?id=${photo.driveId}&sz=w1600`;
    }
    return photo.primarySrc;
  };

  return (
    <section className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          kicker="మధుర స్మృతులు"
          title="వధూవరుల చిత్రమాలిక"
          subtitle="జీవితంలో ఒక్కసారే వచ్చే ఈ పవిత్ర బంధపు మంగళకర క్షణాలు"
        />

        {/* 3 Photos Grid with Center Enlarge and Royal Arch Frames */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center mt-10">
          {photos.map((photo) => {
            const hasError = loadErrors[photo.id] && !photo.driveId;
            const imgSrc = getEffectiveSrc(photo);

            return (
              <motion.div
                key={photo.id}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  photo.isCenter
                    ? 'md:-translate-y-4 md:scale-105 z-10'
                    : 'hover:-translate-y-2'
                }`}
                whileHover={{ scale: photo.isCenter ? 1.07 : 1.03 }}
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Gold Arch Frame Container */}
                <div
                  className={`royal-card rounded-t-full rounded-b-2xl p-3 sm:p-4 text-center transition-all ${
                    photo.isCenter
                      ? 'border-2 border-[#dfb86c] shadow-[0_0_35px_rgba(201,162,75,0.45)]'
                      : 'border border-[#c9a24b]/40 hover:border-[#dfb86c]'
                  }`}
                >
                  {/* Decorative Arch Peak Motif */}
                  <div className="text-center text-[#dfb86c] text-sm -mt-1 mb-2 select-none" aria-hidden="true">
                    ⚜
                  </div>

                  {/* Photo Display / Arch Window */}
                  <div className="relative w-full aspect-[3/4] rounded-t-full rounded-b-xl overflow-hidden bg-[#26050c] border border-[#c9a24b]/30">
                    {!hasError ? (
                      <img
                        src={imgSrc}
                        alt={photo.subtitle}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={() => handleImageError(photo.id)}
                      />
                    ) : (
                      /* Traditional Andhra Portrait Fallback Box */
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#3b0a14] to-[#1c0509]">
                        <div className="w-16 h-16 rounded-full bg-[#26050c] border border-[#c9a24b]/40 flex items-center justify-center text-[#dfb86c] mb-3">
                          <ImageIcon className="w-8 h-8 opacity-70" />
                        </div>
                        <p className="text-base font-bold font-telugu text-[#fef08a] mb-1">
                          {photo.title}
                        </p>
                        <p className="text-xs font-telugu text-[#dfb86c]/90 mb-3">
                          {photo.subtitle}
                        </p>
                        <div className="px-3 py-1.5 rounded bg-[#1c0509]/80 border border-[#c9a24b]/30 text-[11px] text-[#fbf3e0]/70">
                          ఫోటోను /public{photo.primarySrc} లో ఉంచండి
                        </div>
                      </div>
                    )}

                    {/* Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="p-3 rounded-full bg-[#1c0509]/80 border border-[#dfb86c] text-[#fef08a] shadow-lg">
                        <ZoomIn className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Caption & Title */}
                  <div className="pt-4 pb-2">
                    <span className="text-xs text-[#dfb86c] font-cinzel tracking-wider uppercase block">
                      {photo.title}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold font-telugu text-[#fef08a] mt-0.5">
                      {photo.subtitle}
                    </h4>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Swipe Notice */}
        <p className="text-xs text-center text-[#dfb86c]/60 mt-4 md:hidden font-telugu">
          (ఫోటోలను పెద్దగా వీక్షించడానికి తాకండి)
        </p>

        {/* Full-Screen Lightbox with Ken Burns Zoom */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 p-3 rounded-full bg-[#3b0a14]/90 border border-[#dfb86c] text-[#dfb86c] hover:bg-[#6b1224] transition-colors focus:outline-none z-50 cursor-pointer"
                onClick={() => setSelectedPhoto(null)}
                aria-label="చిత్రాన్ని మూసివేయండి"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Lightbox Content Container */}
              <motion.div
                className="relative max-w-2xl w-full max-h-[85vh] royal-card rounded-2xl p-4 sm:p-6 overflow-hidden flex flex-col items-center"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full max-h-[65vh] rounded-xl overflow-hidden bg-[#1c0509] flex items-center justify-center">
                  {!loadErrors[selectedPhoto.id] || selectedPhoto.driveId ? (
                    <motion.img
                      src={getEffectiveSrc(selectedPhoto)}
                      alt={selectedPhoto.subtitle}
                      className="w-full h-auto max-h-[65vh] object-contain rounded-lg"
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.05 }}
                      transition={{ duration: 7, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
                      onError={() => handleImageError(selectedPhoto.id)}
                    />
                  ) : (
                    <div className="p-8 text-center">
                      <ImageIcon className="w-12 h-12 text-[#dfb86c] mx-auto mb-3" />
                      <p className="text-sm font-telugu text-[#dfb86c]">
                        ఈ ఫోటో /public{selectedPhoto.primarySrc} లో అప్‌లోడ్ చేసిన తర్వాత ఇక్కడ కనిపిస్తుంది.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <span className="text-xs text-[#dfb86c] font-cinzel tracking-wider uppercase block">
                    {selectedPhoto.title}
                  </span>
                  <h3 className="text-xl font-bold font-telugu text-[#fef08a] mt-0.5">
                    {selectedPhoto.subtitle}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
