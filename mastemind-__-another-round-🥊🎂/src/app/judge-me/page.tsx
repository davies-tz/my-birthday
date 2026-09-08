import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Scale, Check, MessageSquareWarning, Sparkles } from 'lucide-react';
import { PERCEPTION_TRAITS, IMPROVEMENT_AREAS, ANNOYANCE_OPTIONS } from '../../data/mastemindData';
import { useJourney } from '../../context/JourneyContext';
import { playClick, playPunchThud } from '../../utils/audio';
import { CyberCard } from '../../components/ui/CyberCard';

export default function JudgeMePage() {
  const navigate = useNavigate();
  const { perception, setPerception } = useJourney();

  const [strongestTrait, setStrongestTrait] = useState<string>(perception.strongestTrait || '');
  const [improveTrait, setImproveTrait] = useState<string>(perception.improveTrait || '');
  const [annoyance, setAnnoyance] = useState<string>(perception.annoyance || '');
  const [customAnnoyance, setCustomAnnoyance] = useState<string>(perception.customAnnoyance || '');
  const [error, setError] = useState<string>('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!strongestTrait || !improveTrait || !annoyance) {
      setError('Please select all 3 traits first — be completely honest, no filter! 😂');
      return;
    }
    if (annoyance === 'Other' && !customAnnoyance.trim()) {
      setError('You selected "Other" — write down what it is!');
      return;
    }

    setError('');
    const updated = {
      strongestTrait,
      improveTrait,
      annoyance,
      customAnnoyance: annoyance === 'Other' ? customAnnoyance : undefined,
    };
    setPerception(updated);
    playPunchThud();
    navigate('/advise-me');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>CHAPTER 03 // UNFILTERED PERCEPTION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
          WHAT DO YOU THINK ABOUT ME? ⚖️
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 font-sans">
          No pleasantries or sugar-coating. Tell it exactly as you see it. Real growth requires real mirrors.
        </p>
      </div>

      <CyberCard className="p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl">
        <form onSubmit={handleNext} className="space-y-8">
          {/* Question 1: Strongest Trait */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center font-black">
                  1
                </span>
                <span>What is my strongest trait?</span>
              </label>
              <span className="text-[11px] font-mono text-amber-400/80">Select one</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PERCEPTION_TRAITS.map((trait) => {
                const isSelected = strongestTrait === trait.value;
                return (
                  <button
                    key={trait.value}
                    type="button"
                    onClick={() => {
                      playClick();
                      setStrongestTrait(trait.value);
                    }}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className="font-semibold">{trait.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: What should I improve? */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center font-black">
                  2
                </span>
                <span>What do you think I need to improve?</span>
              </label>
              <span className="text-[11px] font-mono text-amber-400/80">Growth area</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {IMPROVEMENT_AREAS.map((area) => {
                const isSelected = improveTrait === area.value;
                return (
                  <button
                    key={area.value}
                    type="button"
                    onClick={() => {
                      playClick();
                      setImproveTrait(area.value);
                    }}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className="font-semibold">{area.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3: Biggest quirk or annoyance */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 font-mono text-xs flex items-center justify-center font-black">
                  3
                </span>
                <span>What annoys or surprises you the most about me?</span>
              </label>
              <span className="text-[11px] font-mono text-red-400/80">Keep it 100%</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {ANNOYANCE_OPTIONS.map((opt) => {
                const isSelected = annoyance === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      playClick();
                      setAnnoyance(opt.value);
                    }}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-red-500/20 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                        : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className="font-semibold">{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-red-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {annoyance === 'Other' && (
              <div className="mt-3 animate-in fade-in duration-200">
                <input
                  type="text"
                  value={customAnnoyance}
                  onChange={(e) => setCustomAnnoyance(e.target.value)}
                  placeholder="Tell me the unfiltered truth here..."
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-red-500/40 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 font-sans"
                />
              </div>
            )}
          </div>

          {/* Validation Error */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-center gap-2">
              <MessageSquareWarning className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action button */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(245,158,11,0.25)] cursor-pointer"
            >
              <span>LOCK IN VERDICT & CONTINUE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </CyberCard>
    </div>
  );
}
