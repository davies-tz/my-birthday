import React from 'react';
import { User, Code2, Database, Cpu, Activity, Wrench, Globe, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, SKILLS } from '../../data/mastemindData';

export const AboutMastemind: React.FC = () => {
  return (
    <section id="about" className="w-full max-w-5xl mx-auto px-4 py-16">
      {/* Humorous Transition */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider block mb-2">
          Okay… enough about the birthday 😂
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight">
          WHO IS MASTEMIND?
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-4 rounded-full" />
      </div>

      {/* Main Bio Card */}
      <div className="bg-[#0f1118]/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl mb-12 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-500/40 flex-shrink-0 shadow-[0_0_25px_rgba(245,158,11,0.25)] bg-zinc-900 group">
              <img
                src="/images/boxing.jpg"
                alt="Mastemind"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[9px] font-mono text-amber-400 font-bold border border-amber-500/30">
                🥊 DEV
              </div>
            </div>
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                {PERSONAL_INFO.role}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
                Building technology that solves actual problems.
              </h3>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                📍 {PERSONAL_INFO.location}
              </p>
            </div>
          </div>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed pt-2 font-sans">
            {PERSONAL_INFO.bio}
          </p>

          <p className="text-zinc-400 text-xs sm:text-sm font-sans italic pt-1">
            &ldquo;I believe in disciplined repetitions — both in front of the terminal and inside the boxing ring. When code breaks, you don&apos;t panic; you stay in the pocket, analyze the leverage, and throw the counter.&rdquo;
          </p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-white font-heading flex items-center gap-2">
            <span>CORE ARSENAL & CAPABILITIES</span>
            <span className="text-xs font-mono text-zinc-500 font-normal">/ 06 DOMAINS</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((skill, index) => (
            <div
              key={skill.name}
              className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-amber-500/40 transition-all duration-300 group shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl p-2.5 rounded-xl bg-black/40 border border-white/5 group-hover:scale-110 transition-transform">
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
    </section>
  );
};
