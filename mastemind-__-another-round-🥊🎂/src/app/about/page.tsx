import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Code2, Database, Cpu, Activity, Wrench, Globe, ArrowRight, Shield, Award } from 'lucide-react';
import { PERSONAL_INFO, SKILLS } from '../../data/mastemindData';
import { playClick } from '../../utils/audio';
import { CyberCard } from '../../components/ui/CyberCard';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs mb-3">
          <User className="w-3.5 h-3.5" />
          <span>CHAPTER 08 // ORIGIN & ARSENAL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight">
          WHO IS MASTEMIND?
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-4 rounded-full" />
      </div>

      {/* Main Bio Card */}
      <CyberCard glow="amber" className="p-6 sm:p-10 mb-12 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl mx-auto space-y-5 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-500/50 flex-shrink-0 shadow-[0_0_30px_rgba(245,158,11,0.25)] bg-zinc-900 group">
              <img
                src="/images/boxing.jpg"
                alt="Mastemind Fighter & Developer"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[9px] font-mono text-amber-400 font-bold border border-amber-500/30">
                🥊 DEV
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                {PERSONAL_INFO.role}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading mt-0.5">
                Building technology that solves actual problems.
              </h3>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                📍 {PERSONAL_INFO.location} • 2026 BIRTHDAY EDITION
              </p>
            </div>
          </div>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed pt-2 font-sans">
            {PERSONAL_INFO.bio}
          </p>

          <div className="p-4 rounded-2xl bg-black/50 border border-amber-500/20 text-zinc-300 text-xs sm:text-sm font-sans italic">
            &ldquo;I believe in disciplined repetitions — both in front of the terminal and inside the boxing ring. When code breaks, you don&apos;t panic; you stay in the pocket, analyze the leverage, and throw the counter.&rdquo;
          </div>
        </div>
      </CyberCard>

      {/* Skills Grid */}
      <div className="space-y-6 mb-12">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-heading flex items-center gap-2">
            <span>CORE ARSENAL & CAPABILITIES</span>
            <span className="text-xs font-mono text-amber-400 font-normal">/ 06 DOMAINS</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((skill, index) => (
            <div
              key={skill.name}
              className="p-5 rounded-2xl bg-zinc-950/80 hover:bg-zinc-900/90 border border-white/10 hover:border-amber-500/40 transition-all duration-300 group shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl p-2.5 rounded-xl bg-black/50 border border-white/10 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-amber-400/80 transition-colors">
                  0{index + 1}
                </span>
              </div>

              <div className="text-[11px] font-mono text-amber-400/80 uppercase font-semibold mb-1">
                {skill.category}
              </div>

              <h4 className="text-base font-bold text-white font-heading mb-1.5 group-hover:text-amber-300 transition-colors">
                {skill.name}
              </h4>

              <p className="text-zinc-400 text-xs leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Step CTA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
            FINAL CHAPTER 09
          </span>
          <h4 className="text-xl font-bold text-white font-heading">
            Ready to collaborate or connect?
          </h4>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans">
            Reach out directly for engineering consulting, ventures, or to say hi!
          </p>
        </div>

        <button
          onClick={() => {
            playClick();
            navigate('/work-with-me');
          }}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] cursor-pointer shrink-0"
        >
          <span>WORK WITH ME</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
