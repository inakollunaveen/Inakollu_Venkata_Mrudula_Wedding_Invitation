/**
 * Audio Context & Music Controller
 * Features:
 * - Opening song plays automatically on website load (with browser interaction fallback)
 * - Tapping "ఆహ్వానము తెరవండి" ensures seamless music play
 * - When user clicks/plays any video: song pauses immediately
 * - When user stops/pauses the video OR video completes: song plays automatically!
 * - Floating music control with play/pause and mute/unmute
 *
 * Cross-browser notes (Android Chrome incl. "Desktop site" mode, Safari/macOS):
 * - Android Chrome gives audio focus to whichever media starts last. If the song
 *   starts while a video is playing, the video gets paused. So every audio.play()
 *   call goes through safePlay(), which refuses to start while a video holds the lock.
 * - All lock / mute / wantMusic values are mirrored in refs so event listeners and
 *   the callbacks below never read stale state (this was restarting the song while
 *   a video was open, and stopping the video).
 * - Callbacks are referentially stable, so effects that depend on them in
 *   components don't re-run (and fire their cleanups) when mute/music state changes.
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

  // Always-current mirrors of state, safe to read from listeners and stable callbacks
  const lockRef = useRef<boolean>(false);
  const wantMusicRef = useRef<boolean>(true);
  const mutedRef = useRef<boolean>(false);

  const setLock = useCallback((value: boolean) => {
    lockRef.current = value;
    setVideoHoldingLock(value);
  }, []);

  const setWant = useCallback((value: boolean) => {
    wantMusicRef.current = value;
    setWantMusic(value);
  }, []);

  /** Start the song only when nothing (a video) is holding the audio lock. */
  const safePlay = useCallback(async (): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio || lockRef.current || !wantMusicRef.current) return false;
    try {
      await audio.play();
      return true;
    } catch {
      return false;
    }
  }, []);

  const pauseSong = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) audio.pause();
  }, []);

  /** Resume the song after a video is finished / stopped / closed. */
  const resumeSongIfWanted = useCallback(() => {
    if (wantMusicRef.current && !mutedRef.current) {
      void safePlay();
    }
  }, [safePlay]);

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

    // First-interaction fallback for browsers that block autoplay.
    // Skips entirely while a video holds the lock, so tapping a video's play
    // button never starts the song on top of it.
    const interactionEvents: Array<keyof WindowEventMap> = ['click', 'touchend', 'pointerup', 'keydown'];
    const removeInteractionListeners = () => {
      interactionEvents.forEach((evt) => window.removeEventListener(evt, triggerPlay));
    };
    function triggerPlay() {
      if (lockRef.current) return; // keep listening until it is safe to start
      removeInteractionListeners();
      void safePlay().then((ok) => {
        if (ok) {
          setIsPlaying(true);
          setHasStartedOnce(true);
        }
      });
    }

    // Automatic play attempt on site load
    void safePlay().then((ok) => {
      if (ok) {
        setIsPlaying(true);
        setHasStartedOnce(true);
      } else {
        interactionEvents.forEach((evt) => window.addEventListener(evt, triggerPlay, { passive: true }));
      }
    });

    // Visibility change handling: pause when hidden, resume only if nothing blocks it
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!audio.paused) {
          audio.pause();
        }
      } else if (wantMusicRef.current && !lockRef.current && !mutedRef.current) {
        void safePlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      removeInteractionListeners();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      audio.pause();
      audio.src = '';
    };
  }, [safePlay]);

  // Sync mute state to audio element
  useEffect(() => {
    mutedRef.current = isMuted;
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Start opening music on envelope tap or explicit action
  const startOpeningMusic = useCallback(async () => {
    setHasStartedOnce(true);
    setWant(true);
    setAudioError(null);

    if (audioRef.current && audioRef.current.paused) {
      const ok = await safePlay();
      if (ok) setIsPlaying(true);
    }
  }, [safePlay, setWant]);

  // Toggle play/pause by guest explicitly
  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setWant(false); // Guest chose to stop
    } else {
      setWant(true); // Guest wants music
      if (!lockRef.current) {
        audio.play().catch(() => {
          setAudioError('సంగీతం ప్లే చేయడంలో సమస్య తలెత్తింది.');
        });
      }
    }
  }, [setWant]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      mutedRef.current = next;
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      return next;
    });
  }, []);

  // When user clicks on video: immediately pause music and hold the lock
  const notifyVideoPlayStarted = useCallback(() => {
    setLock(true);
    pauseSong();
  }, [setLock, pauseSong]);

  // When user stops/pauses the video: automatically resume song
  const notifyVideoStopped = useCallback(() => {
    setLock(false);
    resumeSongIfWanted();
  }, [setLock, resumeSongIfWanted]);

  // When video completes or fails: automatically resume song
  const notifyVideoEndedOrFailed = useCallback(() => {
    setLock(false);
    resumeSongIfWanted();
  }, [setLock, resumeSongIfWanted]);

  // Drive Iframe modal open/close
  const notifyDriveIframeActive = useCallback((active: boolean) => {
    if (active) {
      setLock(true);
      pauseSong();
    } else {
      setLock(false);
      resumeSongIfWanted();
    }
  }, [setLock, pauseSong, resumeSongIfWanted]);

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