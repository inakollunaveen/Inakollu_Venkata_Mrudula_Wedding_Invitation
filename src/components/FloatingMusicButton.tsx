import React from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { useWeddingAudio } from '../context/AudioContext';

export const FloatingMusicButton: React.FC = () => {
  const {
    isPlaying,
    isMuted,
    hasStartedOnce,
    videoHoldingLock,
    togglePlayPause,
    toggleMute,
    audioError,
  } = useWeddingAudio();

  // Only display floating widget after opening the envelope
  if (!hasStartedOnce) return null;

  return (
    <aside
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2"
      aria-label="సంగీత నియంత్రణ"
    >
      {/* If video is temporarily silencing music, show subtle status */}
      {videoHoldingLock && (
        <div className="bg-[#3b0a14]/90 text-[#fbf3e0] text-xs px-2.5 py-1 rounded-md border border-[#c9a24b]/40 shadow-lg backdrop-blur-sm pointer-events-none transition-opacity duration-300">
          వీడియో ప్లే అవుతోంది
        </div>
      )}

      {/* Floating Control Bar */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#26050c]/90 border border-[#c9a24b]/60 shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur-md">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          disabled={videoHoldingLock}
          className={`flex items-center justify-center w-11 h-11 rounded-full text-[#3b0a14] font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5d68b] ${
            videoHoldingLock
              ? 'bg-[#8a6721]/50 cursor-not-allowed opacity-60 text-white'
              : isPlaying
              ? 'bg-gradient-to-tr from-[#dfb86c] to-[#f5d68b] shadow-[0_0_12px_rgba(201,162,75,0.6)] hover:scale-105 active:scale-95'
              : 'bg-[#8a6721] hover:bg-[#c9a24b] text-[#fbf3e0]'
          }`}
          aria-label={isPlaying ? 'సంగీతం పాజ్ చేయండి' : 'మంగళ వాయిద్యం ప్లే చేయండి'}
          title={isPlaying ? 'సంగీతం పాజ్ చేయండి' : 'మంగళ వాయిద్యం ప్లే చేయండి'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>

        {/* Mute/Unmute Toggle */}
        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[#3b0a14]/80 text-[#dfb86c] hover:bg-[#6b1224] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b]"
          aria-label={isMuted ? 'వాల్యూమ్ ఆన్ చేయండి' : 'మ్యూట్ చేయండి'}
          title={isMuted ? 'వాల్యూమ్ ఆన్ చేయండి' : 'మ్యూట్ చేయండి'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Music indicator wave when playing */}
        {isPlaying && !videoHoldingLock && (
          <div className="flex items-center gap-0.5 px-2 text-[#dfb86c]" aria-hidden="true">
            <span className="w-0.5 h-3 bg-[#c9a24b] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-5 bg-[#f5d68b] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-2 bg-[#dfb86c] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>

      {/* Media note if file is missing */}
      {audioError && !isPlaying && (
        <div className="max-w-[240px] text-[11px] text-[#fbf3e0]/80 bg-[#3b0a14]/90 p-2 rounded border border-[#c9a24b]/40 shadow text-right">
          {audioError}
        </div>
      )}
    </aside>
  );
};
