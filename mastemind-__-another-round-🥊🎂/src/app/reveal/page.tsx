import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Cake, Flame, Download, Share2, ArrowRight, Check, Trophy, Heart } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import { PERSONAL_INFO } from '../../data/mastemindData';
import { playBellGong, playClick, playWinChime, playPunchThud } from '../../utils/audio';
import { triggerBigCelebration } from '../../components/celebration/CelebrationCanvas';
import { CyberCard } from '../../components/ui/CyberCard';

export default function RevealPage() {
  const navigate = useNavigate();
  const { quizScore, perception, deepThought, wish, candlesBlown, setCandlesBlown } = useJourney();

  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Trigger celebration on initial mount
  useEffect(() => {
    triggerBigCelebration();
  }, []);

  const handleBlowCandles = () => {
    playClick();
    playWinChime();
    playBellGong();
    triggerBigCelebration();
    setCandlesBlown(true);
  };

  const handleShareText = async () => {
    playClick();
    const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const text = `🥊 MASTEMIND // ANOTHER ROUND 🎂\n09 • 08 • 2026 Birthday Experience\n\nI scored ${quizScore}% on how well I know Mastemind! 👀\nMy wish: "${wish?.message || 'More wins & unstoppable growth!'}"\n- ${wish?.name || 'Friend'}\n\nJoin the journey: ${shareUrl}`;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadCard = () => {
    playClick();
    setDownloading(true);
    triggerBigCelebration();

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1350;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setDownloading(false);
        return;
      }

      // Background Gradient
      const bg = ctx.createLinearGradient(0, 0, 1080, 1350);
      bg.addColorStop(0, '#0a0b12');
      bg.addColorStop(0.5, '#151220');
      bg.addColorStop(1, '#07080c');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 1080, 1350);

      // Border accents
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, 1000, 1270);

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1;
      ctx.strokeRect(52, 52, 976, 1246);

      // Header Tag
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 26px monospace';
      ctx.fillText('MASTEMIND SYSTEM // BIRTHDAY PROTOCOL 2026', 80, 110);

      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 64px sans-serif';
      ctx.fillText('ANOTHER ROUND 🥊', 80, 200);

      // Subtitle
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 32px monospace';
      ctx.fillText('SEPTEMBER 08, 2026 • OFFICIAL PASS', 80, 260);

      // Score Box
      ctx.fillStyle = '#1e1c2a';
      ctx.fillRect(80, 310, 920, 160);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(80, 310, 920, 160);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('VISITOR QUIZ RATING', 110, 355);

      ctx.fillStyle = '#f59e0b';
      ctx.font = '900 70px sans-serif';
      ctx.fillText(`${quizScore}% ACCURACY`, 110, 435);

      // Perception & Advice Box
      ctx.fillStyle = '#14141e';
      ctx.fillRect(80, 500, 920, 240);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(80, 500, 920, 240);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 24px monospace';
      ctx.fillText('PERCEPTION VERDICT:', 110, 545);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText(`Strongest Trait: ${perception.strongestTrait}`, 110, 595);
      ctx.fillText(`Growth Focus: ${perception.improveTrait}`, 110, 640);
      ctx.fillText(`Known Quirk: ${perception.annoyance}`, 110, 685);

      // Wish Box
      ctx.fillStyle = '#18121a';
      ctx.fillRect(80, 770, 920, 300);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.strokeRect(80, 770, 920, 300);

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 24px monospace';
      ctx.fillText('PERSONAL BIRTHDAY WISH:', 110, 815);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'italic 28px serif';
      const wishText = wish ? `"${wish.message}"` : '"Happy Birthday to the realest fighter!"';
      ctx.fillText(wishText.slice(0, 55), 110, 875);
      if (wishText.length > 55) {
        ctx.fillText(wishText.slice(55, 110), 110, 915);
      }

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText(`— ${wish?.name || 'A Genuine Friend'}`, 110, 990);

      // Footer
      ctx.fillStyle = '#64748b';
      ctx.font = '20px monospace';
      ctx.fillText('MASTEMIND.DEV • DAR ES SALAAM 🇹🇿 • 2026 EDITION', 80, 1220);

      const link = document.createElement('a');
      link.download = `mastemind-birthday-pass-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      // fallback
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CHAPTER 06 // THE BIRTHDAY REVEAL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
          THE BIRTHDAY REVEAL 🎂
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base mt-2 font-sans">
          Make a wish, blow out the candles, and unlock your personalized Mastemind 2026 Pass!
        </p>
      </div>

      {/* Interactive Birthday Cake */}
      <CyberCard glow="amber" className="p-6 sm:p-8 max-w-xl mx-auto mb-10 text-center">
        <div className="relative inline-block my-4">
          <div className="text-6xl sm:text-7xl select-none mb-2">
            🎂
          </div>

          {/* Candle Flame FX */}
          {!candlesBlown ? (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
              <span className="animate-bounce text-amber-400 text-xl filter drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">🔥</span>
              <span className="animate-pulse text-red-400 text-2xl filter drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">🔥</span>
              <span className="animate-bounce text-amber-400 text-xl filter drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">🔥</span>
            </div>
          ) : (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-zinc-400 text-xs font-mono animate-fade-out">
              💨 [CANDLES BLOWN!]
            </div>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-1">
          {candlesBlown ? 'THE WISH IS SEALED! 🎉' : 'BLOW OUT THE CANDLES'}
        </h3>
        <p className="text-zinc-400 text-xs sm:text-sm mb-4">
          {candlesBlown
            ? 'Blessings unlocked! Your wish is registered into the universe.'
            : 'Click the button below to blow out the virtual candles and ignite the celebration!'}
        </p>

        <button
          onClick={handleBlowCandles}
          className={`px-6 py-3 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            candlesBlown
              ? 'bg-white/[0.08] text-amber-300 border border-amber-500/30'
              : 'bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95'
          }`}
        >
          {candlesBlown ? 'BLOW AGAIN FOR MORE CONFETTI 💥' : 'BLOW CANDLES 💨'}
        </button>
      </CyberCard>

      {/* The Personalized Digital Pass */}
      <CyberCard glow="red" className="p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              OFFICIAL PASS
            </span>
            <span className="text-xs font-mono text-zinc-400 uppercase">
              MASTEMIND // 2026 EDITION
            </span>
          </div>
          <span className="text-xs font-mono text-red-400 font-bold">
            09 • 08 • 2026
          </span>
        </div>

        {/* Visitor Journey Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-black/60 border border-white/10">
            <span className="text-[10px] font-mono text-amber-400 uppercase block mb-1">
              QUIZ ACCURACY RATING
            </span>
            <div className="text-3xl font-black text-white font-heading">
              {quizScore}%
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              {quizScore >= 80 ? 'Certified Real One 🫡' : 'Good instincts, more chai needed! ☕'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-white/10">
            <span className="text-[10px] font-mono text-cyan-400 uppercase block mb-1">
              PERCEIVED STRENGTH
            </span>
            <div className="text-xl font-bold text-white font-heading truncate">
              {perception.strongestTrait}
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Growth focus: {perception.improveTrait}
            </p>
          </div>
        </div>

        {/* Wish & Advice Display */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-red-950/40 via-black to-zinc-950 border border-red-500/30 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 mb-2">
            <Heart className="w-3.5 h-3.5 fill-red-400" />
            <span>RECORDED WISH:</span>
          </div>
          <p className="text-zinc-200 text-sm sm:text-base italic font-serif leading-relaxed">
            &ldquo;{wish ? wish.message : 'Happy Birthday to the most resilient fighter and builder!'}&rdquo;
          </p>
          <div className="text-right text-xs font-mono text-amber-400 font-bold mt-2">
            — {wish ? wish.name : 'A Real One'}
          </div>
        </div>

        {/* Message from Mastemind */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 text-left">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
            A PERSONAL NOTE FROM MASTEMIND:
          </div>
          <p className="text-zinc-300 text-sm font-sans leading-relaxed">
            &ldquo;Thank you for being part of my journey. Whether you know me from late-night code sprints, the boxing gym, or life conversations — your presence in my world matters. Here&apos;s to another round of building, fighting for what matters, and refusing to settle.&rdquo;
          </p>
        </div>

        {/* Card Actions (Download & Share) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleDownloadCard}
              disabled={downloading}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>{downloading ? 'GENERATING...' : 'DOWNLOAD PASS PNG'}</span>
            </button>

            <button
              onClick={handleShareText}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-amber-400" />}
              <span>{copied ? 'COPIED!' : 'SHARE'}</span>
            </button>
          </div>

          <button
            onClick={() => {
              playClick();
              navigate('/gallery');
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-black font-black font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] cursor-pointer"
          >
            <span>EXPLORE PHOTO ARCHIVE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </CyberCard>
    </div>
  );
}
