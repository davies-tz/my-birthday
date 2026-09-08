import React, { useState } from 'react';
import { ArrowRight, Lightbulb, Check } from 'lucide-react';
import { CHAPTER_ADVICE_OPTIONS } from '../../data/mastemindData';
import { DeepThoughtAnswer } from '../../types';
import { playClick } from '../../utils/audio';

interface TellMeSectionProps {
  onComplete: (deepThought: DeepThoughtAnswer) => void;
}

export const TellMeSection: React.FC<TellMeSectionProps> = ({ onComplete }) => {
  const [honestMessage, setHonestMessage] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([CHAPTER_ADVICE_OPTIONS[3]]); // default "Build bigger things"
  const [error, setError] = useState('');

  const toggleGoal = (goal: string) => {
    playClick();
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleNext = () => {
    playClick();
    if (!honestMessage.trim()) {
      setError('Andika hata mstari mmoja tu bana! Tell me something I really need to hear.');
      return;
    }
    if (selectedGoals.length === 0) {
      setError('Chagua angalau lengo moja la sura hii mpya!');
      return;
    }
    setError('');
    onComplete({
      honestMessage,
      nextChapterGoals: selectedGoals
    });
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs mb-3">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>ROUND 3 // REAL TALK</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          “Tell me something I need to hear.”
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Something you&apos;ve wanted to tell me but never really did.
        </p>
      </div>

      <div className="bg-[#0f1118]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
        {/* Open Text Area */}
        <div>
          <label className="block text-sm sm:text-base font-bold text-white mb-2">
            Ushauri au ukweli wako kwa uwazi kabisa:
          </label>
          <textarea
            rows={4}
            value={honestMessage}
            onChange={(e) => setHonestMessage(e.target.value)}
            placeholder="Write your honest message, wake-up call, or real thoughts here..."
            className="w-full p-4 rounded-xl bg-black/40 border border-white/10 text-zinc-100 text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-zinc-600 resize-none font-sans"
          />
        </div>

        {/* Multi-select: One thing you think I should do in this next chapter */}
        <div>
          <label className="block text-sm sm:text-base font-bold text-white mb-2">
            One (or more) things you think I should do in this next chapter?
          </label>
          <p className="text-xs text-zinc-400 mb-3 font-mono">
            (Unaweza kuchagua zaidi ya moja)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CHAPTER_ADVICE_OPTIONS.map((goal) => {
              const isSelected = selectedGoals.includes(goal);
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                      : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/[0.06]'
                  }`}
                >
                  <span>{goal}</span>
                  {isSelected && <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
            {error}
          </div>
        )}

        {/* Continue Button */}
        <div className="flex justify-end pt-2 border-t border-white/[0.08]">
          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 hover:brightness-110 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
          >
            <span>SASAHIVI… NIWISH KITU 🎂</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
