import React, { useState } from 'react';
import { ArrowRight, MessageSquareHeart, Check } from 'lucide-react';
import { PERCEPTION_TRAITS, IMPROVEMENT_AREAS, ANNOYANCE_OPTIONS } from '../../data/mastemindData';
import { PerceptionAnswer } from '../../types';
import { playClick } from '../../utils/audio';

interface PerceptionSectionProps {
  onComplete: (perception: PerceptionAnswer) => void;
}

export const PerceptionSection: React.FC<PerceptionSectionProps> = ({ onComplete }) => {
  const [strongestTrait, setStrongestTrait] = useState<string>('');
  const [improveTrait, setImproveTrait] = useState<string>('');
  const [annoyance, setAnnoyance] = useState<string>('');
  const [customAnnoyance, setCustomAnnoyance] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleNext = () => {
    playClick();
    if (!strongestTrait || !improveTrait || !annoyance) {
      setError('Tafadhali chagua majibu yote matatu kwanza! Usicheze safe hapa 😂');
      return;
    }
    if (annoyance === 'Other' && !customAnnoyance.trim()) {
      setError('Umechagua "Other", andika kidogo kinachokukera bana 😂');
      return;
    }
    setError('');
    onComplete({
      strongestTrait,
      improveTrait,
      annoyance,
      customAnnoyance: annoyance === 'Other' ? customAnnoyance : undefined
    });
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs mb-3">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>ROUND 2 // THE HONEST MIRROR</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          “Sawa, sasa niambie ukweli…”
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Be honest bana 😂 Usicheze safe hapa. Hakuna makasiriko.
        </p>
      </div>

      <div className="bg-[#0f1118]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-8">
        {/* Q1: Strongest Trait */}
        <div>
          <label className="block text-sm sm:text-base font-bold text-white mb-3">
            1. What&apos;s my strongest trait? <span className="text-amber-400 font-mono text-xs font-normal">(Chagua moja)</span>
          </label>
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
                  className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                      : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="font-semibold">{trait.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Q2: Improve Trait */}
        <div>
          <label className="block text-sm sm:text-base font-bold text-white mb-3">
            2. What do you think I should improve? <span className="text-amber-400 font-mono text-xs font-normal">(Chagua eneo la kuwekeza)</span>
          </label>
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
                  className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                      : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="font-semibold">{area.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Q3: Annoyance */}
        <div>
          <label className="block text-sm sm:text-base font-bold text-white mb-3">
            3. Kuna kitu gani kuhusu mimi kinakukera? 😂 <span className="text-zinc-400 font-mono text-xs font-normal">(Be 100% real)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
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
                  className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-red-500/20 border-red-500 text-red-200 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                      : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="font-semibold">{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-red-400" />}
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
                placeholder="Eleza hapa kile kinachokukera (keep it playful 😄)..."
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-red-500/40 text-zinc-100 text-sm focus:outline-none focus:border-red-400 transition-colors placeholder:text-zinc-600"
              />
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end pt-2 border-t border-white/[0.08]">
          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
          >
            <span>ENDELEA KWENYE USHAURI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
