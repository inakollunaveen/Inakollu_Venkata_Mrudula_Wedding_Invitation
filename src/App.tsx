/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AudioProvider } from './context/AudioContext';
import { EnvelopeOpener } from './components/EnvelopeOpener';
import { ScrollGarland } from './components/ScrollGarland';
import { Navbar } from './components/Navbar';
import { ToranBanner } from './components/ToranBanner';
import { GopuramSilhouette } from './components/GopuramSilhouette';
import { InvitationCard } from './components/InvitationCard';
import { CoupleCards } from './components/CoupleCards';
import { CountdownTimer } from './components/CountdownTimer';
import { CeremonyTimeline } from './components/CeremonyTimeline';
import { PhotoGallery } from './components/PhotoGallery';
import { VideoSection } from './components/VideoSection';
import { SevenStepsSection } from './components/SevenStepsSection';
import { VenueSection } from './components/VenueSection';
import { CalendarSection } from './components/CalendarSection';
import { ContactSection } from './components/ContactSection';
import { BlessingsFinale } from './components/BlessingsFinale';
import { FloatingMusicButton } from './components/FloatingMusicButton';

export default function App() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <AudioProvider>
      <div className="min-h-screen bg-[#1c0509] text-[#fbf3e0] relative selection:bg-[#c9a24b] selection:text-[#3b0a14]">
        
        {/* Thin Gold Garland Scroll Progress Bar (Top) */}
        <ScrollGarland />

        {/* Section 1: Opening Screen (3D Gold Envelope) */}
        {!isOpened ? (
          <EnvelopeOpener
            isOpened={isOpened}
            onOpened={() => setIsOpened(true)}
          />
        ) : (
          <>
            {/* Sticky Top Navigation */}
            <Navbar />

            {/* Top Swaying Mango Leaf Toranam across the opened page */}
            <div className="relative w-full z-10 -mb-6">
              <ToranBanner sway={true} />
            </div>

            {/* Parallax Layered Background Gopuram Silhouettes */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
              <div className="absolute -bottom-10 -left-20 opacity-10">
                <GopuramSilhouette height={400} opacity={0.2} />
              </div>
              <div className="absolute -bottom-10 -right-20 opacity-10">
                <GopuramSilhouette height={400} opacity={0.2} />
              </div>
            </div>

            {/* Main Content Sections Flow */}
            <main className="relative z-10 pb-12">
              {/* Section 2: Main Invitation Card */}
              <InvitationCard />

              {/* Section 3: Bride and Groom Introduction */}
              <CoupleCards />

              {/* Section 4: Live Countdown to 29 Oct 2026, 10:10 PM IST */}
              <div id="countdown">
                <CountdownTimer />
              </div>

              {/* Section 5: Ceremony Schedule Timeline */}
              <div id="ceremony-schedule">
                <CeremonyTimeline />
              </div>

              {/* Section 6: Photo Gallery (Groom left, Couple center, Bride right) */}
              <div id="photo-gallery">
                <PhotoGallery />
              </div>

              {/* Section 7: Video Section */}
              <div id="invitation-video">
                <VideoSection />
              </div>

              {/* Section 8: Seven Steps (సప్తపది) */}
              <div id="seven-steps">
                <SevenStepsSection />
              </div>

              {/* Section 9: Venue Cards with Tappable Map */}
              <div id="venues">
                <VenueSection />
              </div>

              {/* Section 10: Calendar (.ics & Google Calendar) */}
              <div id="calendar">
                <CalendarSection />
              </div>

              {/* Section 11: Contact Cards */}
              <div id="contacts">
                <ContactSection />
              </div>

              {/* Section 12: Final Blessings and Thank You */}
              <BlessingsFinale onReopenEnvelope={() => setIsOpened(false)} />
            </main>

            {/* Floating Music Control Widget (always visible after opening) */}
            <FloatingMusicButton />
          </>
        )}
      </div>
    </AudioProvider>
  );
}
