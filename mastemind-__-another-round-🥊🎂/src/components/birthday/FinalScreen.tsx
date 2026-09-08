import React from 'react';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/mastemindData';
import { playBellGong, playPunchThud, playClick } from '../../utils/audio';
import { triggerBigCelebration } from '../celebration/CelebrationCanvas';

interface FinalScreenProps {
  onRestart: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({ onRestart }) => {
  const handlePunchGong = () => {
    playPunchThud();
    setTimeout(() => playBellGong(), 120);
    triggerBigCelebration();
  };

  return (
    <footer className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-t from-black via-[#07080c] to-transparent border-t border-white/[0.08] overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-glow-pulse" />

      {/* Main Cinematic Typography */}
      <div className="space-y-4 max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs mb-2">
          <span>🥊 ROUND 2026 COMPLETE</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white font-heading tracking-tight uppercase leading-tight">
          ANOTHER YEAR.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-amber-300">
            ANOTHER ROUND.
          </span> 🥊
        </h2>

        <div className="pt-2 text-zinc-300 font-mono text-sm sm:text-base space-y-1">
          <p>Still fighting.</p>
          <p>Still building.</p>
          <p className="text-amber-400 font-bold">Still becoming.</p>
        </div>

        <div className="pt-6">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-wide">
            HAPPY BIRTHDAY TO ME. 🎂🥂
          </h3>
          <p className="text-zinc-500 text-xs mt-1 font-mono">
            Thank you for being part of this round.
          </p>
        </div>
      </div>

      {/* Interactive celebratory triggers */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <button
          onClick={handlePunchGong}
          className="px-6 py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-red-900/20"
        >
          <span>THROW ANOTHER PUNCH</span>
          <span>🥊</span>
        </button>

        <button
          onClick={() => {
            playClick();
            triggerBigCelebration();
          }}
          className="px-6 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-amber-900/20"
        >
          <span>MORE FIREWORKS</span>
          <span>🎆</span>
        </button>

        <button
          onClick={() => {
            playClick();
            onRestart();
          }}
          className="px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>REPLAY EXPERIENCE</span>
        </button>
      </div>

      {/* Small Technical Footer */}
      <div className="pt-8 border-t border-white/[0.06] w-full max-w-md mx-auto text-center space-y-1">
        <div className="text-xs font-mono text-zinc-400 font-bold tracking-widest uppercase">
          MASTEMIND // BIRTHDAY PROTOCOL v1.0
        </div>
        <div className="text-[11px] font-mono text-zinc-600">
          09.08.2026 • BUILT WITH PASSION, TECH & DISCIPLINE 🇹🇿
        </div>
      </div>
    </footer>
  );
};
