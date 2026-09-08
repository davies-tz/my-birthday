import React from 'react';
import { useJourney } from '../../context/JourneyContext';
import { JOURNEY_STEPS } from '../../data/journeySteps';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { playClick } from '../../utils/audio';

interface ProgressIndicatorProps {
  variant?: 'top' | 'compact' | 'full';
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ variant = 'top' }) => {
  const { currentStepIndex, visitedSteps, goToPath } = useJourney();

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-xs font-mono">
        <span className="text-amber-400 font-bold">
          {JOURNEY_STEPS[currentStepIndex].stepNumber}
        </span>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-400 font-bold">09</span>
        <span className="text-zinc-600">•</span>
        <span className="text-white font-semibold truncate max-w-[120px]">
          {JOURNEY_STEPS[currentStepIndex].title}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-3">
      {/* Horizontal Step Pills for Desktop / Tablet */}
      <div className="hidden lg:flex items-center justify-between gap-1 p-1.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl">
        {JOURNEY_STEPS.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPast = idx < currentStepIndex || visitedSteps.includes(step.path);

          return (
            <button
              key={step.id}
              onClick={() => {
                playClick();
                goToPath(step.path);
              }}
              title={`${step.stepNumber} ${step.title}: ${step.shortDesc}`}
              className={`group flex-1 flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 text-black font-extrabold shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-[1.02]'
                  : isPast
                  ? 'bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white border border-white/5'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'
              }`}
            >
              <span className={`text-[10px] font-bold ${isActive ? 'text-black' : isPast ? 'text-amber-400' : 'text-zinc-600'}`}>
                {step.stepNumber}
              </span>
              <span className="truncate tracking-wider font-sans font-bold text-[11px]">
                {step.title}
              </span>
              {isPast && !isActive && (
                <CheckCircle2 className="w-3 h-3 text-amber-400/80 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile Horizontal Scrolling Step Tracker */}
      <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {JOURNEY_STEPS.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPast = idx < currentStepIndex || visitedSteps.includes(step.path);

          return (
            <button
              key={step.id}
              onClick={() => {
                playClick();
                goToPath(step.path);
              }}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-red-500 text-black font-extrabold shadow-md'
                  : isPast
                  ? 'bg-zinc-900 text-zinc-300 border border-white/10'
                  : 'bg-black/40 text-zinc-500 border border-white/5'
              }`}
            >
              <span className="text-[10px]">{step.stepNumber}</span>
              <span className="font-sans font-semibold">{step.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
