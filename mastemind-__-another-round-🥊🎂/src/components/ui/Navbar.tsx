import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, MessageSquareHeart, Image as ImageIcon, User, Briefcase, Zap, Menu, X } from 'lucide-react';
import { setSoundMuted, getSoundMuted, playClick } from '../../utils/audio';

interface NavbarProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
  onQuickCelebration: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  onQuickCelebration,
}) => {
  const [muted, setMutedState] = useState(getSoundMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const nextState = !muted;
    setMutedState(nextState);
    setSoundMuted(nextState);
    if (!nextState) {
      playClick();
    }
  };

  const navItems = [
    { id: 'quiz', label: 'Quiz', icon: Zap },
    { id: 'perception', label: 'Truth', icon: MessageSquareHeart },
    { id: 'wish', label: 'Wish 🎂', icon: Sparkles },
    { id: 'gallery', label: 'Frames', icon: ImageIcon },
    { id: 'about', label: 'About', icon: User },
    { id: 'work', label: 'Build', icon: Briefcase },
  ];

  const handleMobileNav = (id: string) => {
    playClick();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[#08090d]/90 border-b border-white/[0.08] transition-all">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand & Round Badge */}
        <button
          onClick={() => {
            playClick();
            onNavigate('landing');
          }}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-red-500/20 border border-amber-500/30 flex items-center justify-center text-sm shadow-[0_0_12px_rgba(245,158,11,0.2)] group-hover:border-amber-400 transition-colors">
            🥊
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-sm text-white font-mono">MASTEMIND</span>
              <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-mono font-semibold border border-red-500/30">
                ROUND 2026
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 font-mono hidden sm:block">
              09 • 08 • 2026
            </div>
          </div>
        </button>

        {/* Section Navigation Links (desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playClick();
                  onNavigate(item.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action controls (Sound + Quick Celebration + Mobile Menu Toggle) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClick();
              onQuickCelebration();
            }}
            title="Pop Fireworks!"
            className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400 transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.1)] active:scale-95 cursor-pointer"
          >
            <span>🎉</span>
            <span className="hidden sm:inline">Celebrate</span>
          </button>

          <button
            onClick={toggleSound}
            title={muted ? 'Unmute sound effects' : 'Mute sound effects'}
            className="w-8 h-8 rounded-lg bg-zinc-900/80 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
          >
            {muted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle navigation menu"
            className="md:hidden w-8 h-8 rounded-lg bg-zinc-900/80 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#08090d]/98 px-4 py-4 space-y-1.5 animate-in slide-in-from-top-2 duration-200">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-2 pb-1">
            EXPERIENCE PROTOCOL
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleMobileNav(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-zinc-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">&gt;</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
