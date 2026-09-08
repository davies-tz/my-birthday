import React, { useRef, useState } from 'react';
import { Award, Sparkles, Download, Share2, ArrowRight, Camera, Check } from 'lucide-react';
import { BirthdayWish, PerceptionAnswer, DeepThoughtAnswer } from '../../types';
import { PERSONAL_INFO } from '../../data/mastemindData';
import { playBellGong, playClick, playWinChime } from '../../utils/audio';
import { triggerBigCelebration } from '../celebration/CelebrationCanvas';

interface PersonalizedResultProps {
  quizScore: number;
  perception: PerceptionAnswer;
  deepThought: DeepThoughtAnswer;
  wish: BirthdayWish;
  onExploreMore: () => void;
}

export const PersonalizedResult: React.FC<PersonalizedResultProps> = ({
  quizScore,
  perception,
  deepThought,
  wish,
  onExploreMore,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Dynamic persona summary generator
  const getDynamicSummary = () => {
    const trait = perception.strongestTrait || 'ambitious';
    const area = perception.improveTrait || 'focus';
    const annoying = perception.annoyance || 'overthinking';

    return `You seem to see Mastemind as ${trait.toLowerCase()}, driven by curiosity, while wishing for more ${area.toLowerCase()} — and secretly laughing at his ${annoying.toLowerCase()}. 😂`;
  };

  const handleCopyCardText = async () => {
    playClick();
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const textToShare = `🥊 MASTEMIND // ANOTHER ROUND 🎂\n09 • 08 • 2026 Birthday Experience\n\nI scored ${quizScore}% on how well I know Mastemind! 👀\nMy wish: "${wish.message}"\n- ${wish.name}\n\nCheck it out & send yours: ${shareUrl}`;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToShare);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToShare;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadCard = () => {
    playClick();
    setDownloading(true);
    triggerBigCelebration();

    // Render client-side Canvas for crisp PNG download
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1350;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setDownloading(false);
        return;
      }

      // Background
      const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1350);
      bgGrad.addColorStop(0, '#0a0b12');
      bgGrad.addColorStop(0.5, '#131520');
      bgGrad.addColorStop(1, '#07080c');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1350);

      // Gold / Red accents
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, 1000, 1270);

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1;
      ctx.strokeRect(52, 52, 976, 1246);

      // Header Tag
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 28px monospace';
      ctx.fillText('MASTEMIND SYSTEM // BIRTHDAY PROTOCOL', 80, 120);

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 68px sans-serif';
      ctx.fillText('ANOTHER ROUND 🥊', 80, 200);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 32px sans-serif';
      ctx.fillText('09 • 08 • 2026 • OFFICIAL GUEST PASS', 80, 260);

      // Separator line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, 310);
      ctx.lineTo(1000, 310);
      ctx.stroke();

      // Guest Name Badge
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 24px monospace';
      ctx.fillText('GUEST OF HONOR // ANALYZER', 80, 380);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 52px sans-serif';
      ctx.fillText(wish.name || 'Friend', 80, 440);

      // Score Box
      ctx.fillStyle = 'rgba(245, 158, 11, 0.1)';
      ctx.fillRect(80, 490, 920, 160);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.strokeRect(80, 490, 920, 160);

      ctx.fillStyle = '#fbbf24';
      ctx.font = '800 72px monospace';
      ctx.fillText(`${quizScore}%`, 120, 595);

      ctx.fillStyle = '#e4e4e7';
      ctx.font = '600 32px sans-serif';
      ctx.fillText('KNOWLEDGE ACCURACY SCORE', 340, 560);
      ctx.font = '400 24px sans-serif';
      ctx.fillStyle = '#a1a1aa';
      ctx.fillText('Certified Real One in the Birthday Circle', 340, 600);

      // Birthday Message Block
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 24px monospace';
      ctx.fillText('YOUR BIRTHDAY MESSAGE:', 80, 720);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic 34px sans-serif';
      // Simple multi-line text wrapper
      const words = wish.message.split(' ');
      let line = '';
      let y = 780;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 900 && n > 0) {
          ctx.fillText(`"${line.trim()}"`, 80, y);
          line = words[n] + ' ';
          y += 50;
          if (y > 980) break;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(`"${line.trim()}"`, 80, y);

      // Advice snippet
      if (deepThought.nextChapterGoals.length > 0) {
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 24px monospace';
        ctx.fillText('ADVICE FOR NEXT CHAPTER:', 80, y + 80);

        ctx.fillStyle = '#d4d4d8';
        ctx.font = '500 28px sans-serif';
        ctx.fillText(deepThought.nextChapterGoals.slice(0, 2).join(' • '), 80, y + 130);
      }

      // Footer
      ctx.fillStyle = '#71717a';
      ctx.font = '24px monospace';
      ctx.fillText('STILL FIGHTING. STILL BUILDING. STILL BECOMING. 🥊', 80, 1240);

      // Export as PNG
      const link = document.createElement('a');
      link.download = `MASTEMIND-ROUND2026-${(wish.name || 'GUEST').replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setDownloading(false);
    } catch {
      setDownloading(false);
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>ROUND 5 // THE DOSSIER</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
          YOUR MASTEMIND PROFILE 👀
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Hapa ndio muhtasari wa jinsi ulivyonichambua.
        </p>
      </div>

      {/* Main Profile Summary Card (Screenshot-worthy) */}
      <div
        ref={cardRef}
        className="relative bg-gradient-to-b from-[#11131d] via-[#0c0e15] to-[#08090d] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(245,158,11,0.15)] backdrop-blur-2xl overflow-hidden mb-8"
      >
        {/* Decorative corner brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/80" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/80" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/80" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/80" />

        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-white/10 mb-6">
          <div>
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
              MASTEMIND // ANOTHER ROUND 🥊
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              GUEST PASS: {wish.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-xl">
            <span className="text-2xl font-black font-mono text-amber-400">{quizScore}%</span>
            <span className="text-[10px] font-mono text-zinc-300 uppercase leading-tight">
              ACCURACY<br />SCORE
            </span>
          </div>
        </div>

        {/* Dynamic Persona Insight */}
        <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>HOW YOU SEE MASTEMIND:</span>
          </div>
          <p className="text-zinc-200 text-sm sm:text-base font-medium leading-relaxed font-sans">
            &ldquo;{getDynamicSummary()}&rdquo;
          </p>
        </div>

        {/* Advice for this new chapter */}
        <div className="mb-6">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
            Your Advice For This New Chapter:
          </div>
          <div className="flex flex-wrap gap-2">
            {deepThought.nextChapterGoals.map((goal, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs font-medium"
              >
                {goal}
              </span>
            ))}
          </div>
        </div>

        {/* Your Birthday Message */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/30 to-amber-950/20 border border-red-500/25 mb-4">
          <div className="text-xs font-mono text-red-400 uppercase tracking-wider mb-1">
            Your Birthday Wish:
          </div>
          <p className="text-white text-sm sm:text-base italic font-sans">
            &ldquo;{wish.message}&rdquo;
          </p>
          <div className="text-right text-xs font-mono text-zinc-400 mt-2">
            — {wish.name} ❤️
          </div>
        </div>

        {/* Footer Tag */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-2">
          <span>09 • 08 • 2026 // STILL FIGHTING. STILL BUILDING. 🥊</span>
          <span className="text-amber-400">MASTEMIND BIRTHDAY PROTOCOL</span>
        </div>
      </div>

      {/* Shareable Card Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
        <button
          onClick={handleDownloadCard}
          disabled={downloading}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>{downloading ? 'CREATING CARD...' : 'CREATE MY BIRTHDAY CARD 🎂'}</span>
        </button>

        <button
          onClick={handleCopyCardText}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.05] border border-white/15 hover:bg-white/10 text-zinc-200 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300">COPIED TO CLIPBOARD!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>SHARE TO WHATSAPP / SOCIALS</span>
            </>
          )}
        </button>
      </div>

      {/* Continue exploring journey */}
      <div className="text-center pt-6 border-t border-white/[0.08]">
        <p className="text-xs text-zinc-400 mb-3 font-mono">
          Now check out moments from the journey, the fighter frame & projects:
        </p>
        <button
          onClick={() => {
            playClick();
            onExploreMore();
          }}
          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95"
        >
          <span>VIEW PHOTO GALLERY & ABOUT MASTEMIND</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>
    </section>
  );
};
