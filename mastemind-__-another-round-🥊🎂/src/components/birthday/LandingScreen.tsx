import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/mastemindData';
import { playBellGong, playClick } from '../../utils/audio';
import { triggerBigCelebration } from '../celebration/CelebrationCanvas';

interface LandingScreenProps {
  onEnter: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onEnter }) => {
  const [protocolSteps, setProtocolSteps] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const protocols = [
    { label: 'Identity', status: '✓' },
    { label: 'Personality', status: '✓' },
    { label: 'Dreams', status: '✓' },
    { label: 'Projects', status: '✓' },
    { label: 'Chaos', status: '✓' },
  ];

  useEffect(() => {
    // Progressive initialization sequence
    const interval = setInterval(() => {
      setProtocolSteps((prev) => {
        if (prev < protocols.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsLoaded(true);
          return prev;
        }
      });
    }, 280);

    return () => clearInterval(interval);
  }, [protocols.length]);

  const handleEnterClick = () => {
    playClick();
    playBellGong();
    triggerBigCelebration();
    onEnter();
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-glow-pulse" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[240px] sm:w-[450px] h-[240px] sm:h-[450px] bg-red-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Terminal Initialization Protocol Window */}
      <div className="w-full max-w-md mx-auto mb-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 text-left font-mono shadow-2xl shadow-black/80">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-zinc-300 font-bold tracking-widest uppercase">
              MASTEMIND SYSTEM
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/80 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <div className="w-2 h-2 rounded-full bg-green-500/80" />
          </div>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="text-amber-400/90 font-medium flex items-center gap-2">
            <span>&gt;</span>
            <span>INITIALIZING BIRTHDAY PROTOCOL...</span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-2">
            {protocols.map((p, idx) => (
              <div
                key={p.label}
                className={`flex items-center justify-between transition-opacity duration-300 ${
                  idx < protocolSteps ? 'opacity-100' : 'opacity-20'
                }`}
              >
                <span className="text-zinc-400">{p.label}</span>
                <span className="text-emerald-400 font-bold">{p.status}</span>
              </div>
            ))}
          </div>

          {isLoaded && (
            <div className="text-[11px] text-zinc-500 pt-2 border-t border-white/[0.06] flex items-center justify-between">
              <span>STATUS: READY FOR ROUND</span>
              <span className="text-amber-400 font-bold">100% ONLINE</span>
            </div>
          )}
        </div>
      </div>

      {/* Hero Headline & Date */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {/* Featured Fighter Avatar Badge */}
        <div className="relative inline-block mb-2 group">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-[0_0_35px_rgba(245,158,11,0.25)] bg-zinc-900 mx-auto">
            <img
              src="/images/boxing.jpg"
              alt="Mastemind - Featured Fighter"
              loading="eager"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-red-600/90 border border-red-400 text-[10px] font-mono font-black text-white uppercase tracking-wider shadow-lg whitespace-nowrap flex items-center gap-1">
            <span>🥊</span>
            <span>ROUND 2026</span>
          </div>
        </div>

        <div className="pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-amber-300 font-mono tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{PERSONAL_INFO.birthdayDate}</span>
            <span className="text-zinc-500">•</span>
            <span>SPECIAL EDITION</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase text-white font-heading leading-tight">
          ANOTHER <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-amber-300">ROUND</span> 🥊
        </h1>

        <p className="text-base sm:text-xl text-zinc-300 font-medium max-w-xl mx-auto italic font-sans">
          &ldquo;{PERSONAL_INFO.tagline}&rdquo;
        </p>

        <p className="text-sm font-mono text-zinc-400 tracking-wide">
          {PERSONAL_INFO.heroSubtext}
        </p>
      </div>

      {/* Call to Action Button */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-md">
        <button
          onClick={handleEnterClick}
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-red-600 to-amber-500 bg-size-200 text-black font-extrabold font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        >
          <span>ENTER THE EXPERIENCE</span>
          <span className="text-base group-hover:translate-x-1 transition-transform">🚀</span>
        </button>
      </div>

      {/* Floating hints */}
      <div className="mt-12 text-xs font-mono text-zinc-500 flex items-center gap-2">
        <span>🎮 Interactive Game</span>
        <span>•</span>
        <span>🥊 Fighter Mode</span>
        <span>•</span>
        <span>🎂 Birthday Archive</span>
      </div>
    </section>
  );
};
