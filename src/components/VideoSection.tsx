import React, { useRef, useState, useEffect } from 'react';
import { weddingData } from '../data/weddingData';
import { SectionHeader } from './SectionHeader';
import { useWeddingAudio } from '../context/AudioContext';
import { Play, Pause, Maximize, RotateCcw, AlertCircle, Film, ExternalLink, CheckCircle, Video } from 'lucide-react';

export const VideoSection: React.FC = () => {
  const {
    notifyVideoPlayStarted,
    notifyVideoStopped,
    notifyVideoEndedOrFailed,
    notifyDriveIframeActive,
  } = useWeddingAudio();

  const videoList = weddingData.videos || [
    {
      id: 'video-1',
      title: 'సాంప్రదాయ కళ్యాణ వైభోగం',
      subtitle: 'ఇనకోల్లు వారి కళ్యాణ మహోత్సవ ఆహ్వానం',
      badge: 'ఆహ్వానం 1',
      videoUrl: '/media/invitation.mp4',
      driveId: '',
    },
    {
      id: 'video-2',
      title: 'దివ్య మంగళ పెండ్లిపిలుపు',
      subtitle: 'ఇనకోల్లు వారి పెండ్లిపిలుపు (వధువేమో అలమేలు వరుడట శ్రీవారు)',
      badge: 'ఆహ్వానం 2',
      videoUrl: '/media/invitation2.mp4',
      driveId: '',
    },
  ];

  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const activeVideo = videoList[activeVideoIndex];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showDriveIframe, setShowDriveIframe] = useState<boolean>(false);

  // Release audio lock on unmount
  useEffect(() => {
    return () => {
      notifyVideoEndedOrFailed();
      notifyDriveIframeActive(false);
    };
  }, [notifyVideoEndedOrFailed, notifyDriveIframeActive]);

  // Switch video tab handler
  const handleSelectVideo = (index: number) => {
    if (index === activeVideoIndex) return;

    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setIsLoading(false);
    setHasError(false);
    setCurrentTime(0);
    setActiveVideoIndex(index);
    notifyVideoStopped(); // resume song when switching or stopping previous video
  };

  const handlePlayToggle = async () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      // 1. Immediately pause background song when user plays video
      notifyVideoPlayStarted();
      setIsLoading(true);

      try {
        await videoRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
        setHasError(false);
      } catch (err) {
        console.warn('Video playback error:', err);
        setIsLoading(false);
        setHasError(true);
        setErrorMessage(
          `వీడియో ఫైల్ లోడ్ కాలేదు. దయచేసి /public${activeVideo.videoUrl} ఫైల్ ఉంచండి లేదా మళ్ళీ ప్రయత్నించండి.`
        );
        notifyVideoStopped(); // resume song on error
      }
    } else {
      // 2. When user stops/pauses the video: resume opening song automatically
      videoRef.current.pause();
      setIsPlaying(false);
      notifyVideoStopped();
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    // 3. When video is completed: song plays automatically
    notifyVideoEndedOrFailed();
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setIsPlaying(false);
    setHasError(true);
    setErrorMessage(
      `వీడియో ప్లే చేయడంలో సమస్య తలెత్తింది. దయచేసి /public${activeVideo.videoUrl} ను సరిచూసుకోండి.`
    );
    notifyVideoStopped();
  };

  const handleRetry = () => {
    setHasError(false);
    if (videoRef.current) {
      videoRef.current.load();
      handlePlayToggle();
    }
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const openDriveIframeModal = () => {
    notifyDriveIframeActive(true);
    setShowDriveIframe(true);
  };

  const closeDriveIframeModal = () => {
    setShowDriveIframe(false);
    notifyDriveIframeActive(false);
  };

  const formatVideoTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="py-12 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          kicker="ప్రత్యేక దృశ్య రూపకం"
          title="వివాహ ఆహ్వాన దృశ్య రూపకాలు"
          subtitle="మా జీవితంలోని ఈ మధుర క్షణాల రెండు అందమైన ఆహ్వాన వీడియోలు"
        />

        {/* Video Selector Tabs: Supporting Both Videos */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
          {videoList.map((vid, idx) => {
            const isSelected = activeVideoIndex === idx;

            return (
              <button
                key={vid.id}
                onClick={() => handleSelectVideo(idx)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full font-telugu text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#dfb86c] to-[#f5d68b] text-[#26050c] shadow-[0_0_15px_rgba(201,162,75,0.6)] scale-105'
                    : 'bg-[#26050c]/80 text-[#dfb86c] border border-[#c9a24b]/40 hover:bg-[#3b0a14]'
                }`}
                aria-selected={isSelected}
              >
                <Video className="w-4 h-4" />
                <span>{vid.title}</span>
              </button>
            );
          })}
        </div>

        {/* Video Player Card */}
        <div
          ref={containerRef}
          className="royal-card rounded-2xl p-3 sm:p-5 relative overflow-hidden shadow-2xl border border-[#c9a24b]/50"
        >
          {/* Active Video Header Info */}
          <div className="flex items-center justify-between pb-3 px-1 border-b border-[#c9a24b]/20 mb-3">
            <div>
              <span className="text-xs font-cinzel text-[#dfb86c] block">
                {activeVideo.badge}
              </span>
              <h3 className="text-base sm:text-lg font-bold font-telugu text-[#fef08a]">
                {activeVideo.title}
              </h3>
            </div>
            <span className="text-xs text-[#dfb86c]/80 font-telugu hidden sm:inline-block">
              {activeVideo.subtitle}
            </span>
          </div>

          {/* Main Video Viewport */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
            <video
              key={activeVideo.videoUrl}
              ref={videoRef}
              src={activeVideo.videoUrl}
              className="w-full h-full object-contain"
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              onError={handleVideoError}
              onWaiting={() => setIsLoading(true)}
              onPlaying={() => {
                setIsLoading(false);
                setIsPlaying(true);
              }}
            />

            {/* Poster / Play Overlay when video is not playing */}
            {!isPlaying && !isLoading && !hasError && (
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 flex flex-col items-center justify-center cursor-pointer group"
                onClick={handlePlayToggle}
              >
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#dfb86c] to-[#f5d68b] p-0.5 shadow-[0_0_25px_rgba(201,162,75,0.7)] group-hover:scale-110 active:scale-95 transition-transform duration-300 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#3b0a14] flex items-center justify-center">
                    <Play className="w-8 h-8 text-[#fef08a] fill-[#fef08a] ml-1" />
                  </div>
                </div>
                <p className="text-sm sm:text-base font-bold font-telugu text-[#fef08a] mt-4">
                  {activeVideo.title} చూడండి
                </p>
                <span className="text-xs text-[#dfb86c]/80 font-telugu mt-1">
                  (వీడియో ప్లే అయినప్పుడు నేపథ్య సంగీతం ఆగుతుంది; ఆపినప్పుడు తిరిగి ప్రారంభమవుతుంది)
                </span>
              </div>
            )}

            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-20">
                <div className="w-12 h-12 border-3 border-[#c9a24b]/30 border-t-[#fef08a] rounded-full animate-spin mb-3" />
                <span className="text-xs text-[#fef08a] font-telugu">లోడ్ అవుతోంది...</span>
              </div>
            )}

            {/* Error Message with Retry & Drive Iframe option */}
            {hasError && (
              <div className="absolute inset-0 bg-black/90 p-6 flex flex-col items-center justify-center text-center z-30">
                <AlertCircle className="w-12 h-12 text-[#f59e0b] mb-3" />
                <h4 className="text-lg font-bold font-telugu text-[#fef08a] mb-2">
                  వీడియో ప్లే కాలేదు
                </h4>
                <p className="text-xs sm:text-sm text-[#fbf3e0]/80 font-telugu max-w-md mb-4">
                  {errorMessage}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleRetry}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#dfb86c] text-[#26050c] font-telugu font-semibold text-xs sm:text-sm hover:bg-[#f5d68b] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>మళ్ళీ ప్రయత్నించండి</span>
                  </button>

                  <button
                    onClick={openDriveIframeModal}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#3b0a14] border border-[#c9a24b] text-[#dfb86c] font-telugu text-xs sm:text-sm hover:bg-[#6b1224] transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Drive ప్లేయర్ ద్వారా చూడండి</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Custom Controls Bar */}
          <div className="mt-3 flex items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayToggle}
                className="w-10 h-10 rounded-full bg-[#3b0a14] border border-[#c9a24b]/50 text-[#dfb86c] hover:text-[#fef08a] flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                aria-label={isPlaying ? 'పాజ్ చేయండి' : 'ప్లే చేయండి'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <span className="text-xs font-cinzel text-[#dfb86c]">
                {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleFullscreen}
                className="w-10 h-10 rounded-full bg-[#3b0a14] border border-[#c9a24b]/50 text-[#dfb86c] hover:text-[#fef08a] flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                aria-label="పూర్తి స్క్రీన్‌లో చూడండి"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Google Drive Iframe Fallback Modal */}
        {showDriveIframe && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
            <div className="relative w-full max-w-3xl royal-card rounded-2xl p-4 sm:p-6 flex flex-col items-center">
              <h4 className="text-lg font-bold font-telugu text-[#fef08a] mb-2">
                Google Drive వీడియో ఆహ్వానం ({activeVideo.title})
              </h4>
              <p className="text-xs text-[#dfb86c]/90 font-telugu mb-4 text-center">
                వీడియో వీక్షించిన తర్వాత క్రింది బటన్ నొక్కండి; అప్పుడు నేపథ్య సంగీతం తిరిగి ప్రారంభమవుతుంది.
              </p>

              <div className="w-full aspect-video rounded-xl overflow-hidden bg-black mb-4">
                {activeVideo.driveId ? (
                  <iframe
                    src={`https://drive.google.com/file/d/${activeVideo.driveId}/preview`}
                    className="w-full h-full border-0"
                    allow="autoplay"
                    title={activeVideo.title}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
                    <Film className="w-12 h-12 text-[#dfb86c] mb-2" />
                    <p className="text-sm font-telugu text-[#fbf3e0]">
                      Drive ID ఇంకా జోడించబడలేదు. /public{activeVideo.videoUrl} లో వీడియో ఉంచడం శ్రేయస్కరం.
                    </p>
                  </div>
                )}
              </div>

              {/* Required Completion Button */}
              <button
                onClick={closeDriveIframeModal}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#dfb86c] to-[#f5d68b] text-[#26050c] font-telugu font-bold text-sm sm:text-base shadow-lg hover:brightness-110 cursor-pointer"
              >
                <CheckCircle className="w-5 h-5 text-[#26050c]" />
                <span>వీడియో చూడటం పూర్తయింది</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
