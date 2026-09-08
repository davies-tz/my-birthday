import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, ArrowRight, Check, MessageSquareCode, Sparkles, ShieldCheck } from 'lucide-react';
import { CHAPTER_ADVICE_OPTIONS } from '../../data/mastemindData';
import { useJourney } from '../../context/JourneyContext';
import { playClick, playBellGong } from '../../utils/audio';
import { CyberCard } from '../../components/ui/CyberCard';

export default function AdviseMePage() {
  const navigate = useNavigate();
  const { deepThought, setDeepThought } = useJourney();

  const [honestMessage, setHonestMessage] = useState<string>(deepThought.honestMessage || '');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    deepThought.nextChapterGoals && deepThought.nextChapterGoals.length > 0
      ? deepThought.nextChapterGoals
      : [CHAPTER_ADVICE_OPTIONS[3] || 'Build bigger things']
  );
  const [error, setError] = useState<string>('');

  const quickPrompts = [
    'Stop overthinking and just ship it faster.',
    'Take genuine breaks and protect your peace.',
    'Double down on your boxing discipline.',
    'Go all in on your biggest, scariest dream.',
  ];

  const toggleGoal = (goal: string) => {
    playClick();
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!honestMessage.trim()) {
      setError('Write at least one honest sentence! Tell me something I really need to hear.');
      return;
    }
    if (selectedGoals.length === 0) {
      setError('Choose at least one focus milestone for this next chapter!');
      return;
    }

    setError('');
    setDeepThought({
      honestMessage,
      nextChapterGoals: selectedGoals,
    });
    playBellGong();
    navigate('/wish-me');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs mb-3">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>CHAPTER 04 // ADVICE & REAL TALK</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
          ADVISE ME & TELL ME THE TRUTH 💡
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 font-sans">
          Something you&apos;ve wanted to tell me, a wake-up call, or a piece of wisdom to carry into this new chapter.
        </p>
      </div>

      <CyberCard glow="cyan" className="p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl">
        <form onSubmit={handleNext} className="space-y-8">
          {/* Honest Message */}
          <div>
            <label className="block text-base font-bold text-white mb-2 flex items-center justify-between">
              <span>Tell me something I truly need to hear:</span>
              <span className="text-xs font-mono text-cyan-400 font-normal">Real Talk</span>
            </label>
            <textarea
              rows={4}
              value={honestMessage}
              onChange={(e) => setHonestMessage(e.target.value)}
              placeholder="Write your genuine advice, hard truth, or encouragement here..."
              className="w-full p-4 rounded-xl bg-black/60 border border-white/15 text-zinc-100 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors placeholder:text-zinc-500 resize-none font-sans"
            />

            {/* Quick Inspiration Pills */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono text-zinc-500 mr-1">Quick fill:</span>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    playClick();
                    setHonestMessage(prompt);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] text-zinc-300 transition-colors cursor-pointer"
                >
                  &ldquo;{prompt.slice(0, 30)}...&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Next Chapter Focus Goals (Multi-select) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-base font-bold text-white">
                What should I prioritize in this next chapter?
              </label>
              <span className="text-xs font-mono text-amber-400">Multi-select</span>
            </div>
            <p className="text-xs text-zinc-400 mb-3 font-sans">
              Select one or more challenges you think I should conquer in 2026:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CHAPTER_ADVICE_OPTIONS.map((goal) => {
                const isSelected = selectedGoals.includes(goal);
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleGoal(goal)}
                    className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span>{goal}</span>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Validation Error */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs sm:text-sm">
              {error}
            </div>
          )}

          {/* Action button */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-amber-500 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(6,182,212,0.25)] cursor-pointer"
            >
              <span>SUBMIT ADVICE & PROCEED TO WISH</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </CyberCard>
    </div>
  );
}
