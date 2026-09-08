# MASTEMIND // ANOTHER ROUND 🥊🎂

> **“You came to wish me… but kwanza, let's see how well you know me.”**  
> 09 • 08 • 2026 // A Developer's Birthday Party Inside a Futuristic Interface

An interactive, responsive, mobile-first birthday web experience combining:
- 🎂 Birthday celebration & particle fireworks
- 🥊 Fighter energy & boxing spirit
- 🎮 Interactive knowledge quiz & honest perception mirror
- 💻 Futuristic developer aesthetic & terminal protocols
- 🌐 Professional portfolio & skill architecture
- 🇹🇿 Authentic conversational Tanzanian Swahili + English personality

---

## 1. Installation

Clone or download the repository, then install dependencies:

```bash
# Install packages
npm install
```

---

## 2. Development

Start the local development server:

```bash
npm run dev
```

Visit `http://localhost:3000` (or the indicated port) in your browser.

To verify build before deploying:

```bash
npm run build
```

---

## 3. How to Add Your Photos

All gallery images are configured in:
📁 `src/data/mastemindData.ts` -> `GALLERY_IMAGES`

The application is pre-configured for these exact 5 images:
- `boxing.jpg` (**Featured Hero Fighter Frame** 🥊)
- `me-01.jpg` (Origin & Roots)
- `me-02.jpg` (Milestones & Discipline)
- `me-03.jpg` (Deep in the Code)
- `me-04.jpg` (Another Chapter)

Simply place these 5 files inside the `public/images/` folder (or directly in `public/`):
```text
public/
  images/
    boxing.jpg   <- Featured Hero
    me-01.jpg
    me-02.jpg
    me-03.jpg
    me-04.jpg
```

### Option B: Cloud/Hosted URLs
You can also directly paste direct URLs (e.g. from Google Cloud Storage, Cloudinary, Imgur, or Unsplash).

---

## 4. How to Change Personal Information

All personal data, birthday dates, bio, and questions are cleanly isolated in:
📁 `src/data/mastemindData.ts`

- **Name, Role, Tagline, Date & Bio**: Update `PERSONAL_INFO`:
  ```ts
  export const PERSONAL_INFO = {
    name: "Mastemind",
    handle: "@mastemind",
    role: "Data Science Student & System Builder",
    birthdayDate: "09 • 08 • 2026",
    location: "Dar es Salaam, Tanzania 🇹🇿",
    ...
  }
  ```
- **Quiz Questions**: Customize questions, options, correct answers, and Swahili reactions in `QUIZ_QUESTIONS`.
- **Perception Questions**: Modify traits and options in `PERCEPTION_TRAITS`, `IMPROVEMENT_AREAS`, and `ANNOYANCE_OPTIONS`.
- **Next Chapter Advice Options**: Edit `CHAPTER_ADVICE_OPTIONS`.
- **Skills**: Update your technical skill cards in `SKILLS`.

---

## 5. How to Change WhatsApp Number

In `src/data/mastemindData.ts`, find `PERSONAL_INFO.whatsappNumber`:

```ts
export const PERSONAL_INFO: PersonalInfo = {
  ...
  // Use international country code format (e.g., +255 for Tanzania)
  whatsappNumber: "+255712345678",
  whatsappPrefillText: "Yo Mastemind! 🥊 Happy Birthday bro! Nimeona birthday web app yako, wanted to wish you a massive year & connect!",
  ...
};
```

When visitors tap **“WHATSAPP ME 💬”** or **“DISCUSS ON WHATSAPP”**, it will automatically open a chat with this phone number and the prefilled greeting.

---

## 6. How to Deploy for Free to Vercel

This app is built with standard Vite + React + TypeScript + Tailwind CSS and can be deployed to Vercel in 60 seconds:

### Via Vercel Web Dashboard (Easiest)
1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** -> **"Import Git Repository"**.
4. Framework Preset will automatically detect **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**!

### Via Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## Tech Stack & Highlights
- **Vite 6** + **React 19** + **TypeScript**
- **Tailwind CSS** for sleek dark cyber styling
- **Web Audio API Synthesizer** for zero-dependency sound effects (bell gong, glove punch, celebration chime) with a top mute/unmute toggle
- **Canvas Particle Engine** for fireworks, firecrackers, floating balloons, and confetti without CPU lag
- **Canvas Card Generator** for instantaneous screenshot-ready birthday card PNG generation and WhatsApp sharing
- **LocalStorage Archive** for persisted visitor birthday wishes

---

*MASTEMIND // BIRTHDAY PROTOCOL v1.0*  
*ANOTHER YEAR. ANOTHER ROUND. 🥊*
