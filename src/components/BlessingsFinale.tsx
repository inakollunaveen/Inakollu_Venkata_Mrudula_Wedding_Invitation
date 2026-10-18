import React, { useState } from 'react';
import { motion } from 'motion/react';
import { weddingData } from '../data/weddingData';
import { GodLogo } from './GodLogo';
import { PetalShower } from './PetalShower';
import { Share2, Heart, RotateCcw } from 'lucide-react';

interface BlessingsFinaleProps {
  onReopenEnvelope?: () => void;
}

export const BlessingsFinale: React.FC<BlessingsFinaleProps> = ({ onReopenEnvelope }) => {
  const [finaleShowerActive, setFinaleShowerActive] = useState<boolean>(false);
  const [showerPlayed, setShowerPlayed] = useState<boolean>(false);

  // Trigger 4-second petal shower once when scrolled into view
  const handleInView = () => {
    if (!showerPlayed) {
      setFinaleShowerActive(true);
      setShowerPlayed(true);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `${weddingData.finalBlessings.invitationShareText} ${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'వెంకట మృదుల & మల్లికార్జున వివాహ ఆహ్వానము',
          text: weddingData.finalBlessings.invitationShareText,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to whatsapp link below
      }
    }

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="py-16 px-4 sm:px-6 relative bg-gradient-to-b from-[#26050c] via-[#3b0a14] to-[#1c0509] border-t border-[#c9a24b]/40">
      {/* 4-Second Finale Petal Shower */}
      <PetalShower
        active={finaleShowerActive}
        durationSeconds={4}
        count={24}
        onComplete={() => setFinaleShowerActive(false)}
      />

      <div className="max-w-4xl mx-auto text-center">
        {/* Divine God Logo Row */}
        <motion.div
          className="flex flex-col items-center justify-center mb-8"
          onViewportEnter={handleInView}
          viewport={{ once: true, margin: '-40px' }}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'backOut' }}
        >
          <GodLogo size="xl" showText={true} />
        </motion.div>

        {/* Both Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs sm:text-sm text-[#dfb86c] tracking-widest uppercase font-telugu block mb-2">
            నూతన వధూవరులు
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-telugu text-gold-shimmer mb-4">
            వెంకట మృదుల &amp; మల్లికార్జున
          </h2>
        </motion.div>

        {/* Both Families Details Side by Side */}
        <motion.div
          className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Bride's Family */}
          <div className="p-5 rounded-2xl bg-[#26050c]/80 border border-[#c9a24b]/40 shadow-inner">
            <span className="text-xs text-[#dfb86c] font-telugu block mb-1">
              వధువు తరఫు కుటుంబం
            </span>
            <p className="text-base sm:text-lg font-bold font-telugu text-[#fef08a] mb-1">
              శ్రీ ఇనకొల్లు సుబ్రమణ్యం – శ్రీమతి సుప్రజ గార్లు
            </p>
            <p className="text-xs text-[#dfb86c]/90 font-telugu">
              మరియు కుటుంబ సభ్యులు (మాచవరం గ్రామం)
            </p>
          </div>

          {/* Groom's Family (Shown alongside Bride's Family as strictly required) */}
          <div className="p-5 rounded-2xl bg-[#26050c]/80 border border-[#c9a24b]/40 shadow-inner">
            <span className="text-xs text-[#dfb86c] font-telugu block mb-1">
              వరుని తరఫు కుటుంబం
            </span>
            <p className="text-base sm:text-lg font-bold font-telugu text-[#fef08a] mb-1">
              శ్రీ కొణతం మాలకొండయ్య – శ్రీమతి నారాయణమ్మ గార్లు
            </p>
            <p className="text-xs text-[#dfb86c]/90 font-telugu">
              మరియు కుటుంబ సభ్యులు (సీతారామపురం గ్రామం)
            </p>
          </div>
        </motion.div>

        {/* Thank You (ధన్యవాదములు) */}
        <motion.div
          className="my-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#1c0509]/80 border border-[#dfb86c]/50 mb-3 shadow">
            <Heart className="w-4 h-4 text-[#dfb86c]" />
            <span className="text-lg sm:text-xl font-bold font-telugu text-[#fef08a]">
              {weddingData.finalBlessings.thankYou}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#fbf3e0]/80 font-telugu max-w-md mx-auto">
            మీ రాక మాకెంతో సంతోషం. మీ అమూల్యమైన ఆశీస్సులు వధూవరులకు శ్రీరామరక్ష!
          </p>
        </motion.div>

        {/* Action Buttons: WhatsApp Share & Re-experience Envelope */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          {/* WhatsApp Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#1f5c4a] via-[#2d7a64] to-[#1f5c4a] border border-[#3da083] text-[#fef08a] font-telugu font-bold text-sm sm:text-base shadow-lg hover:shadow-[0_0_20px_rgba(45,122,100,0.6)] active:scale-95 transition-all cursor-pointer"
            aria-label="ఈ ఆహ్వాన పత్రికను WhatsApp లో షేర్ చేయండి"
          >
            <Share2 className="w-5 h-5 text-[#86efac]" />
            <span>WhatsApp లో షేర్ చేయండి</span>
          </button>

          {/* Reopen Envelope Button */}
          {onReopenEnvelope && (
            <button
              onClick={onReopenEnvelope}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#3b0a14] border border-[#c9a24b]/60 text-[#dfb86c] hover:bg-[#6b1224] text-xs sm:text-sm font-telugu transition-all cursor-pointer"
              aria-label="ఆహ్వాన పత్రికను తిరిగి మొదటి నుండి వీక్షించండి"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ఆహ్వానాన్ని తిరిగి తెరవండి</span>
            </button>
          )}
        </div>

        {/* Quiet Auspicious Copyright / Signoff */}
        <div className="mt-12 pt-6 border-t border-[#c9a24b]/20 text-xs text-[#dfb86c]/60 font-telugu">
          మంగళం మహత్ — శ్రీరస్తు • శుభమస్తు • అవిఘ్నమస్తు
        </div>
      </div>
    </footer>
  );
};
