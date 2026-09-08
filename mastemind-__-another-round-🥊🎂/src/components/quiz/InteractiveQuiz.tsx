import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/mastemindData';
import { playWinChime, playWrongBuzz, playClick } from '../../utils/audio';
import { triggerMiniPunchConfetti } from '../celebration/CelebrationCanvas';

interface InteractiveQuizProps {
  onComplete: (scorePercentage: number, userAnswers: Record<number, number>) => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const progressPercent = ((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnswered) return;

    setSelectedOption(optionIndex);
    setHasAnswered(true);

    const isCorrect = currentQ.options[optionIndex].isCorrect;
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }));

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      playWinChime();
      triggerMiniPunchConfetti(0.5, 0.4);
    } else {
      playWrongBuzz();
    }
  };

  const handleNext = () => {
    playClick();
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const finalScorePercent = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  const getScoreRating = (percent: number) => {
    if (percent >= 85) return { title: "CERTIFIED REAL ONE 🫡", desc: "You actually know me inside out. Respect!" };
    if (percent >= 60) return { title: "PRETTY ACCURATE 👀", desc: "You know the core vibe well bana!" };
    if (percent >= 40) return { title: "AVERAGE DETECTIVE 😂", desc: "Umenijudge nusu-nusu, we need more chai sessions." };
    return { title: "SUSPECT DETECTED 🚨", desc: "Bro… umenijudge vibaya hapa! But good try 😂" };
  };

  if (quizFinished) {
    const rating = getScoreRating(finalScorePercent);
    return (
      <div className="w-full max-w-xl mx-auto my-8 p-6 sm:p-8 bg-zinc-900/90 border border-amber-500/30 rounded-2xl shadow-2xl backdrop-blur-xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-3xl mb-4">
          🥊
        </div>

        <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
          ROUND 1 QUIZ COMPLETE
        </div>

        <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mb-2">
          {finalScorePercent}% SCORE
        </h3>

        <div className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold mb-4">
          {rating.title}
        </div>

        <p className="text-zinc-300 text-sm mb-6 max-w-sm mx-auto">
          {rating.desc}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onComplete(finalScorePercent, userAnswers)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-black font-extrabold font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <span>SAWA, SASA NIAMBIE UKWELI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const isCurrentCorrect = selectedOption !== null && currentQ.options[selectedOption]?.isCorrect;

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* Intro Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs mb-3">
          <span>🥊 ROUND 1 // THE KNOWLEDGE TEST</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          “Leo si mimi nitakueleza kuhusu mimi…”
        </h2>
        <p className="text-zinc-400 text-sm mt-1 font-medium">
          “Let&apos;s see what <span className="text-amber-400 font-bold">YOU</span> already know.” 👀
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-[#0f1118]/90 border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Progress Header */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
          <span>QUESTION {String(currentIndex + 1).padStart(2, '0')} / {String(QUIZ_QUESTIONS.length).padStart(2, '0')}</span>
          <span className="text-amber-400 font-semibold">{Math.round(progressPercent)}%</span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Title */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
            {currentQ.questionSwahili}
          </h3>
          {currentQ.questionEnglish && (
            <p className="text-xs text-zinc-400 mt-1 italic font-sans">
              ({currentQ.questionEnglish})
            </p>
          )}
        </div>

        {/* Options Grid */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            let btnStyle = "bg-white/[0.03] border-white/10 text-zinc-200 hover:bg-white/[0.07] hover:border-white/20";

            if (hasAnswered) {
              if (isSelected) {
                btnStyle = option.isCorrect
                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  : "bg-red-500/20 border-red-500/50 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]";
              } else if (option.isCorrect) {
                btnStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
              } else {
                btnStyle = "bg-white/[0.02] border-white/5 text-zinc-600 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between text-sm font-medium ${btnStyle} cursor-pointer active:scale-[0.99]`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-zinc-400">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option.text}</span>
                </div>

                {hasAnswered && (
                  <div>
                    {option.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Reaction Feedback Box */}
        {hasAnswered && (
          <div
            className={`p-4 rounded-xl mb-6 border animate-in fade-in slide-in-from-bottom-2 duration-300 ${
              isCurrentCorrect
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                : 'bg-red-950/40 border-red-500/30 text-red-200'
            }`}
          >
            <div className="whitespace-pre-line text-xs sm:text-sm font-mono leading-relaxed">
              {isCurrentCorrect ? currentQ.correctFeedback : currentQ.wrongFeedback}
            </div>
          </div>
        )}

        {/* Action button */}
        {hasAnswered && (
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'SWALI LINALOFUATA' : 'FINISH QUIZ'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
