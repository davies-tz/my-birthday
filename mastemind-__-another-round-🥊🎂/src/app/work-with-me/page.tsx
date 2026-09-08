import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MessageCircle, Rocket, Send, Sparkles, X, RotateCcw, Heart, Flame } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/mastemindData';
import { useJourney } from '../../context/JourneyContext';
import { playClick, playBellGong, playPunchThud } from '../../utils/audio';
import { triggerBigCelebration } from '../../components/celebration/CelebrationCanvas';
import { CyberCard } from '../../components/ui/CyberCard';

export default function WorkWithMePage() {
  const navigate = useNavigate();
  const { restartJourney } = useJourney();

  const [modalOpen, setModalOpen] = useState(false);
  const [projectType, setProjectType] = useState('AI / Machine Learning');
  const [projectDescription, setProjectDescription] = useState('');
  const [clientName, setClientName] = useState('');

  const services = [
    { label: '📊 Data Analysis & Insights', name: 'Data Analysis' },
    { label: '🤖 AI & Machine Learning Systems', name: 'AI / Machine Learning' },
    { label: '🌐 High-Performance Web Apps', name: 'Web Systems' },
    { label: '📈 Real-time Analytics Dashboards', name: 'Dashboards' },
    { label: '⚙️ Workflow Automation & APIs', name: 'Automation' },
    { label: '💻 Full-Stack Software Architecture', name: 'Software Projects' },
  ];

  const cleanPhone = PERSONAL_INFO.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(PERSONAL_INFO.whatsappPrefillText);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

  const handleLaunchProjectWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    const customMessage = encodeURIComponent(
      `Habari Mastemind! 🚀 Naitwa ${clientName || 'Partner'}. Nina project kuhusu *${projectType}*.\n\nMaelezo:\n${projectDescription || 'Nahitaji tujadili solution bora.'}\n\nLet's build together!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${customMessage}`, '_blank');
    setModalOpen(false);
  };

  const handlePunchGong = () => {
    playPunchThud();
    setTimeout(() => playBellGong(), 120);
    triggerBigCelebration();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>CHAPTER 09 // WORK WITH ME</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
          COLLABORATE & BUILD 🚀
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 font-sans">
          Since you&apos;re already here… maybe you didn&apos;t just come to wish me. Maybe you have something bold you want built.
        </p>
      </div>

      {/* Main Work Card */}
      <CyberCard glow="amber" className="p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
            SOLUTIONS & ENGINEERING
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            &ldquo;Bring the problem. Let&apos;s build the solution.&rdquo;
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Production-grade systems crafted with clean architecture and scalable code.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {services.map((svc) => (
            <div
              key={svc.name}
              className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 text-zinc-200 text-xs sm:text-sm font-medium transition-colors"
            >
              {svc.label}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              playClick();
              setModalOpen(true);
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>START A PROJECT</span>
            <Rocket className="w-4 h-4" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_25px_rgba(16,185,129,0.15)]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>CHAT ON WHATSAPP (+255 652 233 233)</span>
          </a>
        </div>
      </CyberCard>

      {/* Final Celebration Climax Banner */}
      <div className="rounded-3xl bg-gradient-to-t from-black via-zinc-950 to-black/80 border border-white/10 p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="space-y-4 max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs mb-2">
            <span>🥊 ROUND 2026 COMPLETE</span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight uppercase leading-tight">
            ANOTHER YEAR.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-amber-300">
              ANOTHER ROUND.
            </span> 🥊
          </h3>

          <div className="text-zinc-300 font-mono text-sm sm:text-base space-y-1">
            <p>Still fighting.</p>
            <p>Still building.</p>
            <p className="text-amber-400 font-bold">Still becoming.</p>
          </div>

          <p className="text-zinc-400 text-xs font-mono pt-4">
            Thank you for experiencing the Mastemind Birthday Journey.
          </p>
        </div>

        {/* Celebration Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
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
            <span>LAUNCH CELEBRATION</span>
            <span>🎆</span>
          </button>

          <button
            onClick={restartJourney}
            className="px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-300 font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>START OVER</span>
          </button>
        </div>
      </div>

      {/* Project Inquiry Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-lg bg-zinc-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h4 className="text-xl font-bold text-white font-heading mb-4 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-amber-400" />
              <span>Tell me about your project</span>
            </h4>

            <form onSubmit={handleLaunchProjectWhatsApp} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  Your Name:
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  Project Domain:
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                >
                  {services.map((s) => (
                    <option key={s.name} value={s.name} className="bg-zinc-900">
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  Brief Project Overview:
                </label>
                <textarea
                  rows={3}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="What are we building, and what problem does it solve?"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <span>OPEN IN WHATSAPP CHAT</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
