export interface JourneyStep {
  id: string;
  stepNumber: string;
  title: string;
  path: string;
  shortDesc: string;
  badge: string;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'intro',
    stepNumber: '01',
    title: 'INTRO',
    path: '/',
    shortDesc: 'System Boot & Welcome',
    badge: 'ROUND ONE'
  },
  {
    id: 'know-me',
    stepNumber: '02',
    title: 'KNOW ME',
    path: '/know-me',
    shortDesc: 'Interactive Quiz',
    badge: 'THE TEST'
  },
  {
    id: 'judge-me',
    stepNumber: '03',
    title: 'JUDGE ME',
    path: '/judge-me',
    shortDesc: 'What do you think about me?',
    badge: 'UNFILTERED'
  },
  {
    id: 'advise-me',
    stepNumber: '04',
    title: 'ADVISE ME',
    path: '/advise-me',
    shortDesc: 'Advice + Things to tell me',
    badge: 'WISDOM'
  },
  {
    id: 'wish-me',
    stepNumber: '05',
    title: 'WISH ME',
    path: '/wish-me',
    shortDesc: 'Birthday Wish Form',
    badge: 'CELEBRATION'
  },
  {
    id: 'reveal',
    stepNumber: '06',
    title: 'REVEAL',
    path: '/reveal',
    shortDesc: 'Birthday Reveal',
    badge: 'THE MOMENT'
  },
  {
    id: 'gallery',
    stepNumber: '07',
    title: 'GALLERY',
    path: '/gallery',
    shortDesc: 'Personal Photo Gallery',
    badge: '26 FRAMES'
  },
  {
    id: 'about',
    stepNumber: '08',
    title: 'ABOUT',
    path: '/about',
    shortDesc: 'About Mastemind',
    badge: 'THE PROFILE'
  },
  {
    id: 'work-with-me',
    stepNumber: '09',
    title: 'WORK WITH ME',
    path: '/work-with-me',
    shortDesc: 'Collaborate & Connect',
    badge: 'NEXT ROUND'
  }
];

export const getStepIndexByPath = (pathname: string): number => {
  const clean = pathname === '' ? '/' : pathname;
  const idx = JOURNEY_STEPS.findIndex((s) => s.path === clean);
  return idx !== -1 ? idx : 0;
};
