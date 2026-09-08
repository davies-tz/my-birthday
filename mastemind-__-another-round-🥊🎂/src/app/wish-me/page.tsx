import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cake, Sparkles, Send, Heart, CheckCircle2, ArrowRight, MessageCircleHeart } from 'lucide-react';
import { BirthdayWish } from '../../types';
import { useJourney } from '../../context/JourneyContext';
import { playBellGong, playWinChime, playClick } from '../../utils/audio';
import { triggerBigCelebration } from '../../components/celebration/CelebrationCanvas';
import { CyberCard } from '../../components/ui/CyberCard';

export default function WishMePage() {
  const navigate = useNavigate();
  const { quizScore, perception, wish, setWish } = useJourney();

  const [name, setName] = useState<string>(wish?.name || '');
  const [message, setMessage] = useState<string>(wish?.message || '');
  const [relation, setRelation] = useState<string>('Friend & Real One');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!wish);
  const [error, setError] = useState<string>('');

  const relationOptions = [
    'Friend & Real One',
    'Tech & Code Brother/Sister',
    'Fellow Fighter in Life',
    'Family & Day One',
    'Mentee / Mentor',
    'Secret Admirer',
  ];

  const quickWishes = [
    'More wins, bigger fights, and unstoppable growth in 2026! 🥊',
    'May your code compile on first try and your dreams scale globally! 💻',
    'Happy Birthday Mastemind! Keep inspiring everyone around you! 🎂',
    'Health, wealth, peace of mind, and continuous blessings! ✨',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!name.trim()) {
      setError('Please write your name so I know who this beautiful wish came from!');
      return;
    }
    if (!message.trim()) {
      setError("Don't leave without dropping at least one heartfelt birthday line! 😂");
      return;
    }

    setError('');

    const newWish: BirthdayWish = {
      id: 'wish-' + Date.now(),
      name: `${name.trim()} (${relation})`,
      message: message.trim(),
      timestamp: Date.now(),
      score: quizScore,
      strongestTrait: perception.strongestTrait,
    };

    setWish(newWish);

    // Save to local storage archive
    try {
      const existing = localStorage.getItem('mastemind_birthday_wishes');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newWish);
      localStorage.setItem('mastemind_birthday_wishes', JSON.stringify(list));
    } catch {
      // ignore
    }

    setIsSubmitted(true);
    playWinChime();
    playBellGong();
    triggerBigCelebration();
  };

  const handleProceedToReveal = () => {
    playClick();
    navigate('/reveal');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 font-mono text-xs mb-3">
          <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />
          <span>CHAPTER 05 // BIRTHDAY WISH FORM</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
          NOW IT&apos;S YOUR TURN. 🎂
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base mt-2 font-sans">
          You&apos;ve tested your knowledge, judged me, and shared your advice. Sasa... drop your genuine birthday wish!
        </p>
      </div>

      <CyberCard glow="red" className="p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name input */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                Your Name / Nickname:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kelvin, Maria, CodeNinja..."
                className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 font-sans"
              />
            </div>

            {/* Relationship tag */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                Who are you to Mastemind?
              </label>
              <div className="flex flex-wrap gap-2">
                {relationOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      playClick();
                      setRelation(opt);
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                      relation === opt
                        ? 'bg-red-500/20 border-red-500 text-red-200 font-bold'
                        : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Message input */}
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                Your Birthday Wish & Message:
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Drop your blessings, prayers, jokes, or birthday love here..."
                className="w-full p-4 rounded-xl bg-black/60 border border-white/15 text-zinc-100 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-colors placeholder:text-zinc-500 resize-none font-sans"
              />

              {/* Quick Inspiration Wishes */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="text-[11px] font-mono text-zinc-500">Quick wish:</span>
                {quickWishes.map((w, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      playClick();
                      setMessage(w);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] text-zinc-300 transition-colors text-left"
                  >
                    {w.slice(0, 32)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs sm:text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-white font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(239,68,68,0.35)] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>SEAL WISH WITH CELEBRATION 💥</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 animate-in fade-in duration-300 space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto text-3xl shadow-[0_0_30px_rgba(239,68,68,0.25)]">
              🎂
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                WISH RECEIVED & PERMANENTLY LOGGED
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                Thank you, {wish?.name.split(' (')[0]}! ❤️
              </h3>
              <p className="text-zinc-300 text-sm max-w-md mx-auto italic font-sans">
                &ldquo;{wish?.message}&rdquo;
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-left text-xs font-mono space-y-1.5 max-w-md mx-auto">
              <div className="flex justify-between text-zinc-400">
                <span>Quiz Score Tracked:</span>
                <span className="text-amber-400 font-bold">{quizScore}%</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Perceived Strength:</span>
                <span className="text-white font-semibold">{perception.strongestTrait}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Status:</span>
                <span className="text-emerald-400 font-bold">READY FOR REVEAL 🔓</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/10 text-xs font-mono cursor-pointer"
              >
                Edit Wish
              </button>

              <button
                type="button"
                onClick={handleProceedToReveal}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] cursor-pointer"
              >
                <span>CONTINUE TO REVEAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </CyberCard>
    </div>
  );
}
