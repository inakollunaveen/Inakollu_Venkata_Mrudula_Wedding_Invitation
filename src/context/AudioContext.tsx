/**
 * Audio Context & Music Controller
 * Features:
 * - Opening song plays automatically on website load (with browser interaction fallback)
 * - Tapping "ఆహ్వానము తెరవండి" ensures seamless music play
 * - When user clicks/plays any video: song pauses immediately
 * - When user stops/pauses the video OR video completes: song plays automatically!
 * - Floating music control with play/pause and mute/unmute
 */

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { weddingData } from '../data/weddingData';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  hasStartedOnce: boolean;
  wantMusic: boolean;
  videoHoldingLock: boolean;
  audioError: string | null;
  startOpeningMusic: () => Promise<void>;
  togglePlayPause: () => void;
  toggleMute: () => void;
  notifyVideoPlayStarted: () => void;
  notifyVideoStopped: () => void;
  notifyVideoEndedOrFailed: () => void;
  notifyDriveIframeActive: (active: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStartedOnce, setHasStartedOnce] = useState<boolean>(false);
  const [wantMusic, setWantMusic] = useState<boolean>(true); // default true for automatic play
  const [videoHoldingLock, setVideoHoldingLock] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Initialize single shared audio instance
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';
    audio.src = weddingData.music.audioUrl;

    const handlePlay = () => {
      setIsPlaying(true);
      setHasStartedOnce(true);
    };
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      if (weddingData.music.driveId && audio.src !== `https://drive.google.com/uc?export=download&id=${weddingData.music.driveId}`) {
        audio.src = `https://drive.google.com/uc?export=download&id=${weddingData.music.driveId}`;
        audio.load();
      } else {
        setAudioError('సంగీత ఫైల్ /public/media/music.mp3 అందుబాటులో ఉన్నప్పుడు స్వయంచాలకంగా ప్లే అవుతుంది.');
        setIsPlaying(false);
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    audioRef.current = audio;

    // Automatic play attempt on site load
    const startAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setHasStartedOnce(true);
      } catch {
        // Modern browsers may require first user interaction
        const triggerPlay = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
            setHasStartedOnce(true);
          } catch {
            // Silence if media file not found yet
          }
        };

        window.addEventListener('click', triggerPlay, { once: true });
        window.addEventListener('touchstart', triggerPlay, { once: true });
        window.addEventListener('pointerdown', triggerPlay, { once: true });
        window.addEventListener('keydown', triggerPlay, { once: true });
      }
    };

    startAudio();

    // Visibility change handling
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!audio.paused) {
          audio.pause();
        }
      } else {
        if (wantMusic && !videoHoldingLock && !isMuted) {
          audio.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Sync mute state to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Start opening music on envelope tap or explicit action
  const startOpeningMusic = useCallback(async () => {
    setHasStartedOnce(true);
    setWantMusic(true);
    setAudioError(null);

    if (audioRef.current) {
      try {
        if (audioRef.current.paused) {
          await audioRef.current.play();
        }
        setIsPlaying(true);
      } catch (err) {
        console.warn('Audio play request:', err);
      }
    }
  }, []);

  // Toggle play/pause by guest explicitly
  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setWantMusic(false); // Guest chose to stop
    } else {
      setWantMusic(true); // Guest wants music
      if (!videoHoldingLock) {
        audioRef.current.play().catch(() => {
          setAudioError('సంగీతం ప్లే చేయడంలో సమస్య తలెత్తింది.');
        });
      }
    }
  }, [isPlaying, videoHoldingLock]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      return next;
    });
  }, []);

  // When user clicks on video: immediately pause music
  const notifyVideoPlayStarted = useCallback(() => {
    setVideoHoldingLock(true);
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, []);

  // When user stops/pauses the video: automatically resume song
  const notifyVideoStopped = useCallback(() => {
    setVideoHoldingLock(false);
    if (wantMusic && !isMuted && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [wantMusic, isMuted]);

  // When video completes or fails: automatically resume song
  const notifyVideoEndedOrFailed = useCallback(() => {
    setVideoHoldingLock(false);
    if (wantMusic && !isMuted && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [wantMusic, isMuted]);

  // Drive Iframe modal open/close
  const notifyDriveIframeActive = useCallback((active: boolean) => {
    if (active) {
      setVideoHoldingLock(true);
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    } else {
      setVideoHoldingLock(false);
      if (wantMusic && !isMuted && audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [wantMusic, isMuted]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        hasStartedOnce,
        wantMusic,
        videoHoldingLock,
        audioError,
        startOpeningMusic,
        togglePlayPause,
        toggleMute,
        notifyVideoPlayStarted,
        notifyVideoStopped,
        notifyVideoEndedOrFailed,
        notifyDriveIframeActive,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useWeddingAudio = (): AudioContextType => {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error('useWeddingAudio must be used within an AudioProvider');
  }
  return ctx;
};
