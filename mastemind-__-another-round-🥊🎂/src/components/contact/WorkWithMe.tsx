import React, { useState } from 'react';
import { MessageCircle, Rocket, Send, CheckCircle2, Sparkles, X } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/mastemindData';
import { playClick } from '../../utils/audio';

export const WorkWithMe: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [projectType, setProjectType] = useState('AI / Machine Learning');
  const [projectDescription, setProjectDescription] = useState('');
  const [clientName, setClientName] = useState('');

  const services = [
    { label: '📊 Data Analysis', name: 'Data Analysis' },
    { label: '🤖 AI / Machine Learning', name: 'AI / Machine Learning' },
    { label: '🌐 Web Systems', name: 'Web Systems' },
    { label: '📈 Dashboards', name: 'Dashboards' },
    { label: '⚙️ Automation', name: 'Automation' },
    { label: '💻 Software Projects', name: 'Software Projects' },
  ];

  // Clean WhatsApp phone number link
  const cleanPhone = PERSONAL_INFO.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(PERSONAL_INFO.whatsappPrefillText);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

  const handleLaunchProjectWhatsApp = () => {
    playClick();
    const customMessage = encodeURIComponent(
      `Habari Mastemind! 🚀 Naitwa ${clientName || 'Partner'}. Nina project kuhusu *${projectType}*.\n\nMaelezo kidogo:\n${projectDescription || 'Nahitaji tujadili solution bora.'}\n\nLet's build!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${customMessage}`, '_blank');
    setModalOpen(false);
  };

  return (
    <section id="work" className="w-full max-w-4xl mx-auto px-4 py-16">
      {/* Container */}
      <div className="relative bg-gradient-to-b from-[#121522] to-[#0a0b12] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-12 shadow-[0_0_50px_rgba(245,158,11,0.1)] backdrop-blur-2xl overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Intro */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
            Since you&apos;re already here…
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
            Maybe you didn&apos;t just come to wish me.
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base font-sans">
            Maybe you have something you want built.
          </p>
        </div>

        {/* Got a Project Section */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GOT A PROJECT?</span>
          </div>

          <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
            I CAN HELP YOU ENGINEER:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6 text-left">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-200 text-xs sm:text-sm font-medium flex items-center gap-2"
              >
                <span>{svc.label}</span>
              </div>
            ))}
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
            &ldquo;Bring the problem. Let&apos;s build the solution.&rdquo;
          </h3>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              playClick();
              setModalOpen(true);
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>LET&apos;S BUILD SOMETHING</span>
            <Rocket className="w-4 h-4" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-emerald-900/20"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WHATSAPP ME (+255 652 233 233) 💬</span>
          </a>
        </div>
      </div>

      {/* Quick Project Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="w-full max-w-lg bg-[#0e1017] border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <Rocket className="w-4 h-4" />
              <span>START A BUILD WITH MASTEMIND</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading mb-4">
              What are we building?
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  Your Name / Company:
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. John / TechHub"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  Project Domain:
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                >
                  {services.map((s) => (
                    <option key={s.name} value={s.name} className="bg-zinc-900 text-white">
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  Brief Problem / Goals:
                </label>
                <textarea
                  rows={3}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Tell me what problem you are solving or what system you need built..."
                  className="w-full p-3.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={handleLaunchProjectWhatsApp}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>DISCUSS ON WHATSAPP</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
