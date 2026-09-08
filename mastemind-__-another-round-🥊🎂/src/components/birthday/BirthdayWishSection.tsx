import React, { useState } from 'react';
import { Heart, Sparkles, Send, CheckCircle2, Award } from 'lucide-react';
import { BirthdayWish } from '../../types';
import { playBellGong, playWinChime, playClick } from '../../utils/audio';
import { triggerBigCelebration } from '../celebration/CelebrationCanvas';

interface BirthdayWishSectionProps {
  quizScore: number;
  strongestTrait?: string;
  onWishSubmitted: (wish: BirthdayWish) => void;
}

export const BirthdayWishSection: React.FC<BirthdayWishSectionProps> = ({
  quizScore,
  strongestTrait,
  onWishSubmitted,
}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedWish, setSubmittedWish] = useState<BirthdayWish | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!name.trim()) {
      setError('Tafadhali andika jina lako ili nijue ni nani!');
      return;
    }
    if (!message.trim()) {
      setError('Usiniache mikono mitupu bana 😂 Andika walau wish moja!');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const newWish: BirthdayWish = {
      id: 'wish-' + Date.now(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now(),
      score: quizScore,
      strongestTrait,
    };

    // Save to LocalStorage archive
    try {
      const existing = localStorage.getItem('mastemind_birthday_wishes');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newWish);
      localStorage.setItem('mastemind_birthday_wishes', JSON.stringify(list));
    } catch {
      // LocalStorage fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedWish(newWish);

      // Celebration climax
      playWinChime();
      playBellGong();
      triggerBigCelebration();
    }, 400);
  };

  const handleProceedToProfile = () => {
    if (submittedWish) {
      onWishSubmitted(submittedWish);
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Climax Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs mb-3 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400/30 animate-pulse" />
          <span>ROUND 4 // THE EMOTIONAL CLIMAX</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight">
          Now it&apos;s your turn. 🎂
        </h1>

        <div className="mt-3 text-zinc-300 text-sm sm:text-base font-sans leading-relaxed max-w-md mx-auto">
          <p>You&apos;ve judged me.</p>
          <p>You&apos;ve analyzed me.</p>
          <p>You&apos;ve advised me.</p>
          <p className="text-amber-400 font-bold mt-2 font-mono text-base">
            Sasa… niwish kitu. ❤️
          </p>
        </div>
      </div>

      {/* Form Card or Success Confirmation */}
      {!isSubmitted ? (
        <div className="bg-[#0f1118]/95 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name input */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                Your Name / Nickname:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kelvin, Sarah, Bro wako wa coding..."
                className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-all placeholder:text-zinc-600 font-sans"
              />
            </div>

            {/* Birthday Message textarea */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                Your Birthday Message:
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ujumbe wako, baraka, prayer, or just pure birthday love..."
                className="w-full p-4 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-all placeholder:text-zinc-600 font-sans resize-none"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 bg-size-200 text-black font-extrabold font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <span>SENDING TO ARCHIVE...</span>
              ) : (
                <>
                  <span>SEND MY WISH</span>
                  <span className="text-base">💌</span>
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* Confirmation State */
        <div className="bg-[#0f1118]/95 border border-emerald-500/40 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl text-center animate-in zoom-in-95 duration-400">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest mb-1">
            MESSAGE RECEIVED ✓
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-3">
            Thank you, {submittedWish?.name}. ❤️
          </h3>

          <p className="text-zinc-300 text-sm sm:text-base font-sans max-w-md mx-auto mb-6 leading-relaxed">
            Your message has officially entered the{' '}
            <span className="text-amber-400 font-semibold font-mono">
              Birthday Archive
            </span>
            . Baraka tele zimerudi kwako pia! 🥊
          </p>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left max-w-md mx-auto mb-8">
            <div className="text-[11px] font-mono text-zinc-500 uppercase mb-1">
              Archived Note from {submittedWish?.name}:
            </div>
            <p className="text-zinc-200 text-sm italic font-sans">
              &ldquo;{submittedWish?.message}&rdquo;
            </p>
          </div>

          <button
            onClick={handleProceedToProfile}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 mx-auto hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <span>VIEW YOUR MASTEMIND PROFILE & CARD</span>
            <Award className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
};
