export interface QuizQuestion {
  id: number;
  questionSwahili: string;
  questionEnglish?: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  correctFeedback: string;
  wrongFeedback: string;
}

export interface PerceptionAnswer {
  strongestTrait: string;
  improveTrait: string;
  annoyance: string;
  customAnnoyance?: string;
}

export interface DeepThoughtAnswer {
  honestMessage: string;
  nextChapterGoals: string[];
}

export interface BirthdayWish {
  id: string;
  name: string;
  message: string;
  timestamp: number;
  score?: number;
  strongestTrait?: string;
}

export interface VisitorSessionState {
  hasEntered: boolean;
  currentStep: number; // 0 = landing, 1 = quiz, 2 = perception, 3 = deep thought, 4 = wish, 5 = result, 6 = gallery, 7 = about, 8 = finale
  quizScore: number;
  quizTotal: number;
  quizAnswers: Record<number, number>;
  perception: PerceptionAnswer;
  deepThought: DeepThoughtAnswer;
  wish: BirthdayWish | null;
  cardGenerated: boolean;
}

export interface SkillItem {
  name: string;
  icon: string;
  category: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  isBoxingHero?: boolean;
  category: 'fighter' | 'tech' | 'moments' | 'building';
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface PersonalInfo {
  name: string;
  handle: string;
  role: string;
  bio: string;
  birthdayDate: string; // e.g. "09 • 08 • 2026"
  location: string;
  tagline: string;
  heroSubtext: string;
  whatsappNumber: string;
  whatsappPrefillText: string;
  email: string;
  socials: {
    platform: string;
    url: string;
    icon: string;
  }[];
}
