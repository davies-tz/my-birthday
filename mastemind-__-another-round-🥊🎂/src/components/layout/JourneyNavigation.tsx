import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJourney } from '../../context/JourneyContext';
import { JOURNEY_STEPS } from '../../data/journeySteps';
import { MASTEMIND } from '../../data/mastemindData';
import { triggerBigCelebration } from '../celebration/CelebrationCanvas';
import { playClick, playPunchThud, toggleAudio, isAudioEnabled } from '../../utils/audio';
import { Volume2, VolumeX, Sparkles, Menu, X, Home, ChevronRight, Compass } from 'lucide-react';

export const JourneyNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { currentStepIndex, currentStep, goToPath } = useJourney();
  const [audioActive, setAudioActive] = useState<boolean>(isAudioEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleAudioToggle = () => {
    const newState = toggleAudio();
    setAudioActive(newState);
    playClick();
  };

  const handleCelebrationClick = () => {
    playPunchThud();
    triggerBigCelebration();
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#08090d]/80 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo / Identity */}
        <Link
          to="/"
          onClick={playClick}
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-red-600 to-amber-700 p-0.5 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center font-mono font-black text-amber-400 text-sm">
              M
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-white text-base sm:text-lg tracking-wider group-hover:text-amber-400 transition-colors">
                {MASTEMIND.name}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-red-600/30 text-red-400 border border-red-500/30">
                2026
              </span>
            </div>
            <p className="text-[10px] font-mono text-zinc-400">
              BIRTHDAY JOURNEY • {MASTEMIND.birthdayDate}
            </p>
          </div>
        </Link>

        {/* Current Active Step Badge (Desktop center) */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono">
          <span className="text-amber-400 font-bold">{currentStep.stepNumber}</span>
          <span className="text-zinc-500">/</span>
          <span className="text-zinc-400 font-bold">09</span>
          <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-white font-bold">{currentStep.title}</span>
          <span className="text-zinc-500 text-[10px] hidden lg:inline">({currentStep.shortDesc})</span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Celebration Trigger */}
          <button
            onClick={handleCelebrationClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-red-600/20 hover:from-amber-500/30 hover:to-red-600/30 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)] cursor-pointer"
            title="Launch Celebration Fireworks & Confetti"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="hidden sm:inline">CELEBRATE</span>
            <span>🎉</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleAudioToggle}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
            title={audioActive ? 'Mute FX' : 'Enable FX'}
          >
            {audioActive ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mobile All Chapters Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 transition-all cursor-pointer md:hidden"
            title="Browse Chapters"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Compass className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu for All 9 Chapters */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#08090d]/95 backdrop-blur-2xl px-4 py-4 max-h-[80vh] overflow-y-auto">
          <div className="text-xs font-mono text-zinc-400 mb-3 uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Select Chapter / Route</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {JOURNEY_STEPS.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                    goToPath(step.path);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-red-600 text-black font-bold'
                      : 'bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs opacity-75">{step.stepNumber}</span>
                    <span className="font-semibold text-sm">{step.title}</span>
                  </div>
                  <span className="text-xs opacity-75 font-mono">{step.shortDesc}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
