import React from 'react';
import { useJourney } from '../../context/JourneyContext';
import { JOURNEY_STEPS } from '../../data/journeySteps';
import { ChevronLeft, ChevronRight, Home, ArrowRight, RotateCcw } from 'lucide-react';
import { playClick } from '../../utils/audio';

export const BottomJourneyBar: React.FC = () => {
  const { currentStepIndex, currentStep, goToNext, goToPrev, goToPath, restartJourney } = useJourney();

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === JOURNEY_STEPS.length - 1;
  const nextStep = !isLastStep ? JOURNEY_STEPS[currentStepIndex + 1] : null;
  const prevStep = !isFirstStep ? JOURNEY_STEPS[currentStepIndex - 1] : null;

  return (
    <aside aria-label="Journey Navigation" className="fixed bottom-0 left-0 right-0 z-40 bg-[#08090d]/90 backdrop-blur-2xl border-t border-white/10 px-4 py-3 sm:py-4 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Back button & Home button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClick();
              goToPath('/');
            }}
            className="p-2.5 sm:px-3 sm:py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
            title="Return to Home / System Boot"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">HOME</span>
          </button>

          {!isFirstStep && (
            <button
              onClick={goToPrev}
              className="p-2.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 transition-all flex items-center gap-1 text-xs font-mono cursor-pointer"
              title={prevStep ? `Back to ${prevStep.title}` : 'Back'}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">BACK</span>
              {prevStep && (
                <span className="hidden md:inline text-zinc-500 font-sans text-[11px]">
                  ({prevStep.title})
                </span>
              )}
            </button>
          )}
        </div>

        {/* Center: Current Step Status Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-center">
          <span className="text-amber-400 font-bold">{currentStep.stepNumber}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400">09</span>
          <span className="text-zinc-500 hidden sm:inline">•</span>
          <span className="text-white font-bold tracking-wider hidden sm:inline">
            {currentStep.title}
          </span>
        </div>

        {/* Right: Continue button */}
        <div className="flex items-center gap-2">
          {!isLastStep ? (
            <button
              onClick={goToNext}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 hover:from-amber-400 hover:to-red-400 text-black font-extrabold text-xs sm:text-sm font-sans tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>CONTINUE</span>
              {nextStep && (
                <span className="hidden md:inline font-mono text-xs opacity-80">
                  ➔ {nextStep.title}
                </span>
              )}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={restartJourney}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(239,68,68,0.3)] transition-all transform hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESTART JOURNEY</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
