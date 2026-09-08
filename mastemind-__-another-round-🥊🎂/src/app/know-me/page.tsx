import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, XCircle, RotateCcw, Brain, Trophy } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/mastemindData';
import { playWinChime, playWrongBuzz, playClick } from '../../utils/audio';
import { triggerMiniPunchConfetti } from '../../components/celebration/CelebrationCanvas';
import { useJourney } from '../../context/JourneyContext';
import { CyberCard } from '../../components/ui/CyberCard';

export default function KnowMePage() {
  const navigate = useNavigate();
  const { quizScore, setQuizScore, setQuizAnswers } = useJourney();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [localAnswers, setLocalAnswers] = useState<Record<number, number>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const progressPercent = ((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnswered) return;

    setSelectedOption(optionIndex);
    setHasAnswered(true);

    const isCorrect = currentQ.options[optionIndex].isCorrect;
    const updatedAnswers = { ...localAnswers, [currentQ.id]: optionIndex };
    setLocalAnswers(updatedAnswers);
    setQuizAnswers(updatedAnswers);

    if (isCorrect) {
      const newCount = correctCount + 1;
      setCorrectCount(newCount);
      const newScore = Math.round((newCount / QUIZ_QUESTIONS.length) * 100);
      setQuizScore(newScore);
      playWinChime();
      triggerMiniPunchConfetti(0.5, 0.4);
    } else {
      const currentScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
      setQuizScore(currentScore);
      playWrongBuzz();
    }
  };

  const handleNextQuestion = () => {
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
    if (percent >= 85) return { title: 'CERTIFIED REAL ONE 🫡', desc: 'You actually know Mastemind inside out. Absolute respect!' };
    if (percent >= 60) return { title: 'PRETTY ACCURATE 👀', desc: 'You know the core rhythm and energy well bana!' };
    if (percent >= 40) return { title: 'AVERAGE DETECTIVE 😂', desc: 'Umenijudge nusu-nusu, we need more chai & code sessions.' };
    return { title: 'SUSPECT DETECTED 🚨', desc: 'Bro… umenijudge vibaya hapa! But good try 😂' };
  };

  const handleProceedToJudgeMe = () => {
    playClick();
    navigate('/judge-me');
  };

  const handleRestartQuiz = () => {
    playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setCorrectCount(0);
    setQuizFinished(false);
  };

  const isCurrentCorrect = selectedOption !== null && currentQ.options[selectedOption]?.isCorrect;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs mb-3">
          <Brain className="w-3.5 h-3.5" />
          <span>CHAPTER 02 // THE MASTEMIND QUIZ</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
          DO YOU REALLY KNOW ME? 🧠
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 font-sans">
          Test your knowledge before we proceed to the unfiltered truth. No cheating, be honest!
        </p>
      </div>

      {!quizFinished ? (
        <CyberCard className="p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span>ROUND {currentIndex + 1}</span>
              <span className="text-zinc-600">/</span>
              <span>{QUIZ_QUESTIONS.length}</span>
            </span>
            <span>Score: {correctCount} / {QUIZ_QUESTIONS.length}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading leading-snug">
              {currentQ.questionSwahili}
            </h3>
            {currentQ.questionEnglish && (
              <p className="text-sm font-sans text-zinc-400 mt-1 italic">
                ({currentQ.questionEnglish})
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnClass = 'bg-white/[0.03] border-white/10 hover:border-amber-400/50 hover:bg-white/[0.06] text-zinc-200';

              if (hasAnswered) {
                if (opt.isCorrect) {
                  btnClass = 'bg-emerald-500/20 border-emerald-500/80 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
                } else if (isSelected && !opt.isCorrect) {
                  btnClass = 'bg-red-500/20 border-red-500/80 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
                } else {
                  btnClass = 'bg-white/[0.02] border-white/5 text-zinc-500 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left font-sans text-sm sm:text-base font-medium transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <span>{opt.text}</span>
                  {hasAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {hasAnswered && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {hasAnswered && (
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
              <div className="text-xs sm:text-sm font-sans">
                {isCurrentCorrect ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span>🥊</span> {currentQ.correctFeedback}
                  </span>
                ) : (
                  <span className="text-red-400 font-semibold flex items-center gap-1.5">
                    <span>😅</span> {currentQ.wrongFeedback}
                  </span>
                )}
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20 cursor-pointer shrink-0"
              >
                <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'NEXT ROUND' : 'VIEW SCORE'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </CyberCard>
      ) : (
        <CyberCard className="p-8 sm:p-10 max-w-xl mx-auto text-center shadow-2xl">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500/20 to-red-600/20 border border-amber-500/40 mx-auto flex items-center justify-center text-4xl mb-4 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            <Trophy className="w-10 h-10 text-amber-400" />
          </div>

          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
            QUIZ COMPLETE • CHAPTER 02 FINISHED
          </div>

          <h3 className="text-4xl sm:text-5xl font-black text-white font-heading mb-2">
            {finalScorePercent}% SCORE
          </h3>

          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold mb-4">
            {getScoreRating(finalScorePercent).title}
          </div>

          <p className="text-zinc-300 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
            {getScoreRating(finalScorePercent).desc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border border-white/10 font-mono text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RETAKE QUIZ</span>
            </button>

            <button
              onClick={handleProceedToJudgeMe}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-black font-extrabold font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] cursor-pointer"
            >
              <span>CONTINUE TO JUDGE ME</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </CyberCard>
      )}
    </div>
  );
}
