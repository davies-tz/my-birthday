import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { JourneyProvider } from './context/JourneyContext';
import { SharedLayout } from './components/layout/SharedLayout';

// Page Routes
import IntroPage from './app/page';
import KnowMePage from './app/know-me/page';
import JudgeMePage from './app/judge-me/page';
import AdviseMePage from './app/advise-me/page';
import WishMePage from './app/wish-me/page';
import RevealPage from './app/reveal/page';
import GalleryPage from './app/gallery/page';
import AboutPage from './app/about/page';
import WorkWithMePage from './app/work-with-me/page';

/**
 * ScrollToTop helper: scrolls viewport to top when route path changes
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <JourneyProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<SharedLayout />}>
            {/* 01: System Boot & Landing */}
            <Route path="/" element={<IntroPage />} />

            {/* 02: Interactive Quiz */}
            <Route path="/know-me" element={<KnowMePage />} />

            {/* 03: What do you think about me? */}
            <Route path="/judge-me" element={<JudgeMePage />} />

            {/* 04: Advice + Things to tell me */}
            <Route path="/advise-me" element={<AdviseMePage />} />

            {/* 05: Birthday Wish Form */}
            <Route path="/wish-me" element={<WishMePage />} />

            {/* 06: Birthday Reveal */}
            <Route path="/reveal" element={<RevealPage />} />

            {/* 07: Personal Photo Gallery */}
            <Route path="/gallery" element={<GalleryPage />} />

            {/* 08: About Mastemind */}
            <Route path="/about" element={<AboutPage />} />

            {/* 09: Work With Me */}
            <Route path="/work-with-me" element={<WorkWithMePage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </JourneyProvider>
    </BrowserRouter>
  );
}
