import React from 'react';
import { Outlet } from 'react-router-dom';
import { SharedBackground } from './SharedBackground';
import { JourneyNavigation } from './JourneyNavigation';
import { ProgressIndicator } from './ProgressIndicator';
import { BottomJourneyBar } from './BottomJourneyBar';
import { PageTransition } from './PageTransition';

export const SharedLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#08090d] text-slate-100 selection:bg-amber-500 selection:text-black flex flex-col">
      {/* Persistent Background (Never resets on route changes) */}
      <SharedBackground />

      {/* Top Header Navigation */}
      <JourneyNavigation />

      {/* Persistent Step Progress Indicator */}
      <nav aria-label="Journey Progress">
        <ProgressIndicator variant="top" />
      </nav>

      {/* Page Content with Smooth Transition */}
      <main className="relative z-10 flex-1 flex flex-col pb-24 sm:pb-28">
        <PageTransition>
          {children || <Outlet />}
        </PageTransition>
      </main>

      {/* Bottom Sticky Journey Navigation (Back, Continue, Home, Progress) */}
      <BottomJourneyBar />
    </div>
  );
};
