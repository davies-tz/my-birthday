import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Sparkles, ArrowRight, Flame, Shield, Award, ChevronRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/mastemindData';
import { JOURNEY_STEPS } from '../data/journeySteps';
import { useJourney } from '../context/JourneyContext';
import { playBellGong, playClick, playPunchThud } from '../utils/audio';
import { triggerBigCelebration } from '../components/celebration/CelebrationCanvas';
import { CyberCard } from '../components/ui/CyberCard';

export default function IntroPage() {
  const navigate = useNavigate();
  const { visitedSteps } = useJourney();
  const [protocolSteps, setProtocolSteps] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const protocols = [
    { label: 'Identity Protocol', status: 'ONLINE', detail: 'Mastemind v2026' },
    { label: 'Fighter Engine', status: 'ARMED', detail: 'boxing.jpg Loaded' },
    { label: 'Celebration Canvas', status: 'READY', detail: 'Fireworks & Confetti' },
    { label: 'Birthday Vault', status: 'ACTIVE', detail: 'September 08' },
    { label: 'Community Feed', status: 'SYNCED', detail: '9-Stage Journey' },
  ];

  useEffect(() => {
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
    }, 240);

    return () => clearInterval(interval);
  }, [protocols.length]);

  const handleBeginJourney = () => {
    playClick();
    playBellGong();
    playPunchThud();
    triggerBigCelebration();
    navigate('/know-me');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center text-center">
      {/* Background Ambient Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[340px] sm:w-[620px] h-[340px] sm:h-[620px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* System Boot Protocol Terminal */}
      <div className="w-full max-w-lg mx-auto mb-8 bg-black/70 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4 sm:p-5 text-left font-mono shadow-[0_0_35px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-amber-300 font-bold tracking-widest uppercase">
              MASTEMIND_OS // BOOT SEQUENCE
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-zinc-500 mr-2">SYS_OK</span>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="text-amber-400/90 font-semibold flex items-center gap-2">
            <span className="animate-pulse">❯</span>
            <span>INITIALIZING 9-STAGE BIRTHDAY JOURNEY...</span>
          </div>

          <div className="space-y-1 pt-1">
            {protocols.map((p, idx) => {
              const active = idx < protocolSteps;
              return (
                <div
                  key={p.label}
                  className={`flex items-center justify-between transition-opacity duration-300 ${
                    active ? 'opacity-100' : 'opacity-20'
                  }`}
                >
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <span className="text-amber-500 text-[10px]">{active ? '✓' : '○'}</span>
                    {p.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-600 hidden sm:inline">{p.detail}</span>
                    <span className="text-emerald-400 font-bold font-mono text-[11px]">
                      {p.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {isLoaded && (
            <div className="text-[11px] text-zinc-400 pt-2.5 border-t border-white/10 flex items-center justify-between font-mono">
              <span className="text-zinc-400">READY FOR DISCOVERY</span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <span>ALL SYSTEMS GO</span>
                <span className="animate-ping text-xs">●</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Featured Fighter Avatar Badge */}
      <div className="relative inline-block mb-4 group cursor-pointer" onClick={() => playPunchThud()}>
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-2 border-amber-500/60 shadow-[0_0_40px_rgba(245,158,11,0.3)] bg-zinc-900 mx-auto transition-transform duration-500 group-hover:scale-105">
          <img
            src="/images/boxing.jpg"
            alt="Mastemind Fighter Hero"
            loading="eager"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-600 border border-red-400 text-[10px] font-mono font-black text-white uppercase tracking-wider shadow-lg whitespace-nowrap flex items-center gap-1.5">
          <span>🥊</span>
          <span>ANOTHER ROUND // 2026</span>
        </div>
      </div>

      {/* Headline & Date */}
      <div className="space-y-4 max-w-3xl mx-auto mt-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-amber-300 font-mono tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '5s' }} />
          <span>{PERSONAL_INFO.birthdayDate}</span>
          <span className="text-zinc-500">•</span>
          <span>IMMERSIVE BIRTHDAY EXPERIENCE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase text-white font-heading leading-tight">
          ANOTHER <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-amber-300">ROUND</span> 🥊
        </h1>

        <p className="text-lg sm:text-2xl text-zinc-200 font-medium max-w-2xl mx-auto italic font-sans leading-relaxed">
          &ldquo;{PERSONAL_INFO.tagline}&rdquo;
        </p>

        <p className="text-sm sm:text-base font-mono text-zinc-400 tracking-wide max-w-xl mx-auto">
          {PERSONAL_INFO.heroSubtext}
        </p>
      </div>

      {/* Main Call to Action: Start Guided 9-Page Journey */}
      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        <button
          onClick={handleBeginJourney}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-red-600 to-amber-500 bg-size-200 text-black font-black font-mono text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(245,158,11,0.4)] hover:shadow-[0_0_50px_rgba(239,68,68,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        >
          <span>BEGIN THE JOURNEY</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>

      {/* Journey Map Overview (9 Dedicated Chapters) */}
      <div className="w-full max-w-4xl mt-16 text-left">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
              EXPERIENCE ARCHITECTURE
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
              The 9 Chapters of Mastemind&apos;s World
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            {visitedSteps.length} of 9 Explored
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {JOURNEY_STEPS.map((step, idx) => {
            const isVisited = visitedSteps.includes(step.path);
            const isFirst = idx === 0;

            return (
              <div
                key={step.id}
                onClick={() => {
                  playClick();
                  navigate(step.path);
                }}
                className={`group p-4 rounded-2xl border transition-all cursor-pointer ${
                  isFirst
                    ? 'bg-amber-500/10 border-amber-500/40 hover:border-amber-400'
                    : isVisited
                    ? 'bg-zinc-900/80 border-white/15 hover:border-amber-400/50'
                    : 'bg-black/40 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/[0.06] text-amber-400">
                    {step.stepNumber}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    {step.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>{step.title}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-amber-400" />
                </h4>
                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  {step.shortDesc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
