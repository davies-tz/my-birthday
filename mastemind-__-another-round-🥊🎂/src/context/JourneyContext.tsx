import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { JOURNEY_STEPS, getStepIndexByPath } from '../data/journeySteps';
import { PerceptionAnswer, DeepThoughtAnswer, BirthdayWish } from '../types';
import { playClick } from '../utils/audio';

interface JourneyContextType {
  currentStepIndex: number;
  currentStep: typeof JOURNEY_STEPS[0];
  visitedSteps: string[];
  quizScore: number;
  setQuizScore: (score: number) => void;
  quizAnswers: Record<number, number>;
  setQuizAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  perception: PerceptionAnswer;
  setPerception: React.Dispatch<React.SetStateAction<PerceptionAnswer>>;
  deepThought: DeepThoughtAnswer;
  setDeepThought: React.Dispatch<React.SetStateAction<DeepThoughtAnswer>>;
  wish: BirthdayWish | null;
  setWish: React.Dispatch<React.SetStateAction<BirthdayWish | null>>;
  candlesBlown: boolean;
  setCandlesBlown: (blown: boolean) => void;
  goToNext: () => void;
  goToPrev: () => void;
  goToPath: (path: string) => void;
  restartJourney: () => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const JourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentStepIndex = getStepIndexByPath(location.pathname);
  const currentStep = JOURNEY_STEPS[currentStepIndex];

  // Persistent storage state
  const [visitedSteps, setVisitedSteps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mastemind_visited_steps');
      return saved ? JSON.parse(saved) : ['/'];
    } catch {
      return ['/'];
    }
  });

  const [quizScore, setQuizScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('mastemind_quiz_score');
      return saved ? Number(saved) : 85;
    } catch {
      return 85;
    }
  });

  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('mastemind_quiz_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [perception, setPerception] = useState<PerceptionAnswer>(() => {
    try {
      const saved = localStorage.getItem('mastemind_perception');
      return saved
        ? JSON.parse(saved)
        : {
            strongestTrait: 'Relentless Ambition',
            improveTrait: 'Resting & Taking Breaks',
            annoyance: 'Coding at 3:00 AM',
          };
    } catch {
      return {
        strongestTrait: 'Relentless Ambition',
        improveTrait: 'Resting & Taking Breaks',
        annoyance: 'Coding at 3:00 AM',
      };
    }
  });

  const [deepThought, setDeepThought] = useState<DeepThoughtAnswer>(() => {
    try {
      const saved = localStorage.getItem('mastemind_deep_thought');
      return saved
        ? JSON.parse(saved)
        : {
            honestMessage: 'Keep building at global scale. Never lose the hunger or the discipline.',
            nextChapterGoals: ['Launch breakthrough AI tools', 'Step into the boxing ring with pride'],
          };
    } catch {
      return {
        honestMessage: 'Keep building at global scale. Never lose the hunger or the discipline.',
        nextChapterGoals: ['Launch breakthrough AI tools', 'Step into the boxing ring with pride'],
      };
    }
  });

  const [wish, setWish] = useState<BirthdayWish | null>(() => {
    try {
      const saved = localStorage.getItem('mastemind_wish');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [candlesBlown, setCandlesBlown] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mastemind_visited_steps', JSON.stringify(visitedSteps));
    } catch {
      // ignore
    }
  }, [visitedSteps]);

  useEffect(() => {
    try {
      localStorage.setItem('mastemind_quiz_score', String(quizScore));
    } catch {
      // ignore
    }
  }, [quizScore]);

  useEffect(() => {
    try {
      localStorage.setItem('mastemind_quiz_answers', JSON.stringify(quizAnswers));
    } catch {
      // ignore
    }
  }, [quizAnswers]);

  useEffect(() => {
    try {
      localStorage.setItem('mastemind_perception', JSON.stringify(perception));
    } catch {
      // ignore
    }
  }, [perception]);

  useEffect(() => {
    try {
      localStorage.setItem('mastemind_deep_thought', JSON.stringify(deepThought));
    } catch {
      // ignore
    }
  }, [deepThought]);

  useEffect(() => {
    if (wish) {
      try {
        localStorage.setItem('mastemind_wish', JSON.stringify(wish));
      } catch {
        // ignore
      }
    }
  }, [wish]);

  // Track visited steps on route change
  useEffect(() => {
    setVisitedSteps((prev) => {
      if (!prev.includes(location.pathname)) {
        return [...prev, location.pathname];
      }
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const goToNext = () => {
    playClick();
    if (currentStepIndex < JOURNEY_STEPS.length - 1) {
      const nextStep = JOURNEY_STEPS[currentStepIndex + 1];
      navigate(nextStep.path);
    }
  };

  const goToPrev = () => {
    playClick();
    if (currentStepIndex > 0) {
      const prevStep = JOURNEY_STEPS[currentStepIndex - 1];
      navigate(prevStep.path);
    }
  };

  const goToPath = (path: string) => {
    playClick();
    navigate(path);
  };

  const restartJourney = () => {
    playClick();
    navigate('/');
  };

  return (
    <JourneyContext.Provider
      value={{
        currentStepIndex,
        currentStep,
        visitedSteps,
        quizScore,
        setQuizScore,
        quizAnswers,
        setQuizAnswers,
        perception,
        setPerception,
        deepThought,
        setDeepThought,
        wish,
        setWish,
        candlesBlown,
        setCandlesBlown,
        goToNext,
        goToPrev,
        goToPath,
        restartJourney,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => {
  const ctx = useContext(JourneyContext);
  if (!ctx) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return ctx;
};
