import { PersonalInfo, QuizQuestion, SkillItem, GalleryPhoto } from '../types';

/**
 * =======================================================================
 * MASTEMIND CONFIGURATION & DATA SOURCE
 * Replace or customize this file with your own real details, photos,
 * WhatsApp number, and questions.
 * =======================================================================
 */

export const PERSONAL_INFO: PersonalInfo = {
  name: "Mastemind",
  handle: "@mastemind",
  role: "Data Science Student & System Builder",
  bio: "I’m a Data Science student, technology enthusiast and builder who enjoys turning ideas into real systems. I work around Data Science, AI, software systems, analytics and automation. I’m interested in building technology that solves actual problems — not just technology that looks impressive.",
  birthdayDate: "09 • 08 • 2026",
  location: "Dar es Salaam, Tanzania 🇹🇿",
  tagline: "You came to wish me… but kwanza, let's see how well you know me.",
  heroSubtext: "Still fighting. Still building. Still becoming.",
  whatsappNumber: "+255652233233",
  whatsappPrefillText: "Yo Mastemind! 🥊 Happy Birthday bro! Nimeona birthday web app yako, wanted to wish you a massive year & connect!",
  email: "mastemind@example.com",
  socials: [
    { platform: "GitHub", url: "https://github.com", icon: "Github" },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { platform: "Twitter / X", url: "https://x.com", icon: "Twitter" },
    { platform: "WhatsApp", url: "https://wa.me/255652233233", icon: "MessageCircle" },
  ]
};

export const MASTEMIND = PERSONAL_INFO;

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionSwahili: "Ni kitu gani unaona kina-match na mimi zaidi?",
    questionEnglish: "Which of these best defines what I do?",
    options: [
      { text: "💻 Building systems & Code", isCorrect: true },
      { text: "📊 Data & AI Models", isCorrect: true },
      { text: "🎮 Pro Gaming All Night", isCorrect: false },
      { text: "😴 Sleeping 14 hours a day", isCorrect: false },
    ],
    correctFeedback: "CORRECT ✓\nAah… you actually know me 😂🫡 Building systems & data is the real DNA.",
    wrongFeedback: "INCORRECT ❌\nBro… umenijudge vibaya hapa 😂 Kulala masaa 14 wapi na wapi!"
  },
  {
    id: 2,
    questionSwahili: "Nikipata free time ya masaa matano bila disturbance, utanishika wapi?",
    questionEnglish: "If I get 5 hours of uninterrupted free time, where do you find me?",
    options: [
      { text: "💻 Locked in, breaking code & experimenting", isCorrect: true },
      { text: "🥊 Boxing gym throwing combinations", isCorrect: true },
      { text: "🛋️ Chilling on the sofa watching telenovelas", isCorrect: false },
      { text: "📱 Arguing on Twitter space for 4 hours", isCorrect: false },
    ],
    correctFeedback: "CORRECT ✓\nUko sahihi! Either locked in on the terminal or hitting the bags. Respect 🫡",
    wrongFeedback: "INCORRECT ❌\nTelenovelas kweli? 😂 We need to have a serious talk bana!"
  },
  {
    id: 3,
    questionSwahili: "Kitu gani kinanipa motivation ya kuamka asubuhi na kupambana?",
    questionEnglish: "What's the deepest fuel that keeps me moving forward?",
    options: [
      { text: "🚀 Becoming the master of my craft & building real impact", isCorrect: true },
      { text: "💰 Money only, nothing else matters", isCorrect: false },
      { text: "✨ Clout and Instagram likes", isCorrect: false },
      { text: "🤷‍♂️ Sina mpango, ninafuata upepo tu", isCorrect: false },
    ],
    correctFeedback: "CORRECT ✓\nBoom! Mastering the craft and building real solutions that outlive us. Hapo umenipata 🎯",
    wrongFeedback: "INCORRECT ❌\nClout? Aisee unanidharau 😂 Usicheze safe hapa, I'm built for the craft."
  },
  {
    id: 4,
    questionSwahili: "Ni kipi kati ya hivi kinaniboa/kinanichefua zaidi kazini au maishani?",
    questionEnglish: "What annoys me the absolute most?",
    options: [
      { text: "🚫 Excuses, lack of discipline & bad wifi", isCorrect: true },
      { text: "🍕 People putting pineapple on pizza", isCorrect: false },
      { text: "☀️ Joto la Dar es Salaam", isCorrect: false },
      { text: "🎧 Listening to upbeat music", isCorrect: false },
    ],
    correctFeedback: "CORRECT ✓\nExactly! Excuses and lack of discipline kill momentum faster than bad code.",
    wrongFeedback: "INCORRECT ❌\nWrong answer 😂 Joto la Dar tunalizoea, but lack of discipline is unforgivable."
  },
  {
    id: 5,
    questionSwahili: "Falsafa yangu ya maisha inafanana zaidi na mchezo gani?",
    questionEnglish: "Which sports philosophy matches my lifestyle energy?",
    options: [
      { text: "🥊 Boxing: Take hits, stay disciplined, counter & win another round", isCorrect: true },
      { text: "♟️ Chess: Sit quiet and do nothing for 2 hours", isCorrect: false },
      { text: "🎲 Ludo: Leaving everything to luck and rolls", isCorrect: false },
      { text: "⛳ Golf: Very polite and whispering softly", isCorrect: false },
    ],
    correctFeedback: "CORRECT ✓\nANOTHER ROUND! 🥊 Boxing spirit always — keep taking the hits and standing back up.",
    wrongFeedback: "INCORRECT ❌\nLudo na bahati? Hapa hatubahatishi mwanangu, we fight for every inch 🥊"
  },
  {
    id: 6,
    questionSwahili: "Unapofikiria future yangu miaka michache ijayo, unaniona wapi?",
    questionEnglish: "Where do you envision me in the coming years?",
    options: [
      { text: "🌍 Leading major tech/AI solutions & scaling scalable systems", isCorrect: true },
      { text: "🏆 Winning my own battles and lifting those around me", isCorrect: true },
      { text: "🏝️ Retiring to a remote island to farm cassavas", isCorrect: false },
      { text: "📺 Reality TV celebrity", isCorrect: false },
    ],
    correctFeedback: "CORRECT ✓\nAmen to that! Scaling tech, solving real problems, and bringing the team along.",
    wrongFeedback: "INCORRECT ❌\nKufuga mihogo kisiwani? Bado tuna kazi kubwa ya kufanya kabla ya kustaafu 😂"
  }
];

export const PERCEPTION_TRAITS = [
  { label: "🔥 Ambition", value: "Ambition", desc: "Always aiming for the next level" },
  { label: "🧠 Curiosity", value: "Curiosity", desc: "Always digging to understand how things work" },
  { label: "💪 Persistence", value: "Persistence", desc: "Refusing to quit when things break" },
  { label: "💡 Creativity", value: "Creativity", desc: "Finding unconventional solutions" },
  { label: "🚀 Crazy Ideas", value: "Crazy ideas", desc: "Dreaming way beyond standard limits" },
];

export const IMPROVEMENT_AREAS = [
  { label: "⏳ Patience", value: "Patience", desc: "Trusting the slow compounding process" },
  { label: "🎯 Focus", value: "Focus", desc: "Zeroing in on 1-2 big bets at a time" },
  { label: "🧠 Overthinking", value: "Overthinking", desc: "Executing faster without over-analyzing" },
  { label: "📚 Consistency", value: "Consistency", desc: "Daily steady cadence over occasional sprints" },
  { label: "🗣️ Communication", value: "Communication", desc: "Sharing updates more frequently" },
];

export const ANNOYANCE_OPTIONS = [
  { label: "😂 Overthinking everything", value: "Overthinking" },
  { label: "💻 Too much tech talk", value: "Too much tech" },
  { label: "🚀 Too many new ideas every week", value: "Too many ideas" },
  { label: "🗣️ Talking too passionately", value: "Talking too much" },
  { label: "😈 Being stubborn once mind is set", value: "Being stubborn" },
  { label: "✍️ Other (Nitakueleza...)", value: "Other" },
];

export const CHAPTER_ADVICE_OPTIONS = [
  "💰 Build wealth & financial freedom",
  "📚 Learn deeper & master AI/Math",
  "🌍 Travel & explore new places",
  "💻 Build bigger, high-impact systems",
  "❤️ Focus on genuine relationships",
  "🧠 Deep personal inner work & peace",
  "🔥 Take even bolder, calculated risks",
];

export const SKILLS: SkillItem[] = [
  {
    name: "Data Science",
    icon: "📊",
    category: "Analytics & Modeling",
    description: "Statistical modeling, exploratory data analysis, Pandas, NumPy, predictive insights."
  },
  {
    name: "AI & Machine Learning",
    icon: "🤖",
    category: "Intelligence Systems",
    description: "LLM integrations, agentic workflows, supervised ML, clustering, deep neural architectures."
  },
  {
    name: "Software Development",
    icon: "💻",
    category: "Engineering",
    description: "Modern full-stack web applications, TypeScript, Python, backend APIs, clean architecture."
  },
  {
    name: "Analytics & Dashboards",
    icon: "📈",
    category: "Visualization",
    description: "Interactive real-time metrics, KPI command centers, data storytelling, executive charts."
  },
  {
    name: "Automation & Pipelines",
    icon: "⚙️",
    category: "Efficiency",
    description: "Automated scripts, workflow optimization, web scraping, bots, scheduled data pipelines."
  },
  {
    name: "Web Systems",
    icon: "🌐",
    category: "Platforms",
    description: "Responsive web apps, cloud deployment, performant frontends with smooth reactive UX."
  },
];

/**
 * Gallery configuration using exact images:
 * - boxing.jpg (Hero/featured image)
 * - me-01.jpg
 * - me-02.jpg
 * - me-03.jpg
 * - me-04.jpg
 */
export const GALLERY_IMAGES: GalleryPhoto[] = [
  {
    id: "photo-boxing-hero",
    title: "The Fighter's Mindset",
    caption: "ANOTHER ROUND 🥊 Still fighting. Still building. Still becoming.",
    imageUrl: "/images/boxing.jpg",
    isBoxingHero: true,
    category: "fighter",
    aspectRatio: "portrait"
  },
  {
    id: "photo-5953",
    title: "Quiet Focus",
    caption: "Discipline in the early hours before the world wakes up.",
    imageUrl: "/images/5953.jpg",
    category: "moments",
    aspectRatio: "portrait"
  },
  {
    id: "photo-6253",
    title: "Architecting Solutions",
    caption: "Turning abstract logic into robust data systems.",
    imageUrl: "/images/6253.jpg",
    category: "tech",
    aspectRatio: "portrait"
  },
  {
    id: "photo-6319",
    title: "Campus & Vision",
    caption: "Knowledge compounds every single day.",
    imageUrl: "/images/6319.jpg",
    category: "moments",
    aspectRatio: "portrait"
  },
  {
    id: "photo-6403",
    title: "Step by Step",
    caption: "Consistency beats intensity every single time.",
    imageUrl: "/images/6403.jpg",
    category: "moments",
    aspectRatio: "portrait"
  },
  {
    id: "photo-6406",
    title: "Deep In Thought",
    caption: "Solving problems from first principles.",
    imageUrl: "/images/6406.jpg",
    category: "tech",
    aspectRatio: "portrait"
  },
  {
    id: "photo-7980",
    title: "Milestone Day",
    caption: "Proof that dedication pays off.",
    imageUrl: "/images/7980.jpg",
    category: "moments",
    aspectRatio: "portrait"
  },
  {
    id: "photo-23117",
    title: "Code Architecture",
    caption: "Crafting scalable pipelines and modern AI workflows.",
    imageUrl: "/images/23117.jpg",
    category: "tech",
    aspectRatio: "landscape"
  },
  {
    id: "photo-23117-copy",
    title: "Late Night Lab",
    caption: "Where debugging becomes second nature.",
    imageUrl: "/images/23117%20-%20Copy.jpg",
    category: "tech",
    aspectRatio: "landscape"
  },
  {
    id: "photo-30749",
    title: "Unbroken Spirit",
    caption: "Resilience isn't taught, it's forged in the ring.",
    imageUrl: "/images/30749.jpg",
    category: "fighter",
    aspectRatio: "portrait"
  },
  {
    id: "photo-35225",
    title: "Perspective & Gratitude",
    caption: "Thankful for the path traveled and hungry for what's ahead.",
    imageUrl: "/images/35225.jpg",
    category: "moments",
    aspectRatio: "portrait"
  },
  {
    id: "photo-43260",
    title: "Analytical Eye",
    caption: "Seeing the signal amidst all the noise.",
    imageUrl: "/images/43260.jpg",
    category: "tech",
    aspectRatio: "portrait"
  },
  {
    id: "photo-48118",
    title: "System Design",
    caption: "High throughput, clean abstractions, low latency.",
    imageUrl: "/images/48118.jpg",
    category: "tech",
    aspectRatio: "portrait"
  },
  {
    id: "photo-48119",
    title: "Forward Momentum",
    caption: "Never stopping. Never settling. 2026 is our year.",
    imageUrl: "/images/48119.jpg",
    category: "moments",
    aspectRatio: "portrait"
  },
  {
    id: "photo-img-boxing-alt",
    title: "Heavy Bag Session",
    caption: "Fighter focus: keep moving forward, take the hit, land the counter.",
    imageUrl: "/images/IMG_20240922_092817_742.jpg",
    category: "fighter",
    aspectRatio: "portrait"
  },
  {
    id: "photo-wa-100756",
    title: "Morning Routine",
    caption: "Clarity of mind and pure intent.",
    imageUrl: "/images/WhatsApp%20Image%202026-09-08%20at%2010.07.56.jpeg",
    category: "moments",
    aspectRatio: "portrait"
  },
  {
    id: "photo-wa-100818",
    title: "Ready For Battle",
    caption: "Stepping into every arena with confidence.",
    imageUrl: "/images/WhatsApp%20Image%202026-09-08%20at%2010.08.18.jpeg",
    category: "fighter",
    aspectRatio: "portrait"
  },
  {
    id: "photo-wa-121738-1",
    title: "Dev Workspace",
    caption: "Double monitors, mechanical clicks, and endless curiosities.",
    imageUrl: "/images/WhatsApp%20Image%202026-09-08%20at%2012.17.38%20(1).jpeg",
    category: "tech",
    aspectRatio: "portrait"
  },
  {
    id: "photo-wa-121738",
    title: "Data Science Workflow",
    caption: "Cleaning, transforming, and modeling real-world data.",
    imageUrl: "/images/WhatsApp%20Image%202026-09-08%20at%2012.17.38.jpeg",
    category: "tech",
    aspectRatio: "portrait"
  },
  {
    id: "photo-wa-121739-copy",
    title: "Celebration Eve",
    caption: "Another milestone around the sun. 🎂",
    imageUrl: "/images/WhatsApp%20Image%202026-09-08%20at%2012.17.39%20-%20Copy.jpeg",
    category: "moments",
    aspectRatio: "portrait"
  },
  {
    id: "photo-wa-121739",
    title: "Reflections",
    caption: "Grateful for every brother, sister, and mentor on the path.",
    imageUrl: "/images/WhatsApp%20Image%202026-09-08%20at%2012.17.39.jpeg",
    category: "moments",
    aspectRatio: "portrait"
  },
  {
    id: "photo-wa-121740-copy",
    title: "Inner Calm",
    caption: "Peace in the midst of chaos.",
    imageUrl: "/images/WhatsApp%20Image%202026-09-08%20at%2012.17.40%20-%20Copy.jpeg",
    category: "moments",
    aspectRatio: "portrait"
  },
  {
    id: "photo-wa-121740",
    title: "Determination",
    caption: "Eyes fixed on the horizon.",
    imageUrl: "/images/WhatsApp%20Image%202026-09-08%20at%2012.17.40.jpeg",
    category: "moments",
    aspectRatio: "portrait"
  },
  {
    id: "photo-wa-121741-copy",
    title: "The Grind",
    caption: "No shortcuts, just honest labor and discipline.",
    imageUrl: "/images/WhatsApp%20Image%202026-09-08%20at%2012.17.41%20-%20Copy.jpeg",
    category: "tech",
    aspectRatio: "portrait"
  },
  {
    id: "photo-wa-121741",
    title: "New Horizon",
    caption: "Every day is an opportunity to expand our potential.",
    imageUrl: "/images/WhatsApp%20Image%202026-09-08%20at%2012.17.41.jpeg",
    category: "moments",
    aspectRatio: "portrait"
  },
  {
    id: "photo-wa-121742",
    title: "System Master",
    caption: "Merging theory with high-impact software execution.",
    imageUrl: "/images/WhatsApp%20Image%202026-09-08%20at%2012.17.42.jpeg",
    category: "tech",
    aspectRatio: "portrait"
  },
  {
    id: "photo-wa-121743",
    title: "Birthday Round 2026",
    caption: "Still fighting. Still building. Still becoming. 🥊",
    imageUrl: "/images/WhatsApp%20Image%202026-09-08%20at%2012.17.43.jpeg",
    category: "moments",
    aspectRatio: "portrait"
  }
];
