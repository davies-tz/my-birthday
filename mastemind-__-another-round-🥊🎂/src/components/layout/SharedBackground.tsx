import React from 'react';
import { BackgroundPortrait } from '../background/BackgroundPortrait';
import { CelebrationCanvas } from '../celebration/CelebrationCanvas';

export const SharedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Layer 1 & 2: Background Portrait & Dark/Cinematic Overlay */}
      <BackgroundPortrait />

      {/* Layer 3 & 4: Fireworks, Balloons, Firecrackers & Ambient Confetti Canvas */}
      <CelebrationCanvas />

      {/* Ambient Radial Vignette for Futuristic Focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#08090d_85%)] opacity-80 pointer-events-none" />

      {/* Subtle Floating Birthday Micro-Decorations */}
      <div className="absolute top-24 left-10 text-amber-500/15 text-3xl select-none animate-pulse duration-1000 hidden md:block">
        🎂
      </div>
      <div className="absolute bottom-32 right-12 text-red-500/15 text-4xl select-none animate-bounce duration-1000 hidden md:block">
        🥊
      </div>
      <div className="absolute top-1/2 left-8 text-amber-400/10 text-2xl select-none hidden lg:block">
        ✨
      </div>
      <div className="absolute top-1/3 right-8 text-cyan-400/10 text-2xl select-none hidden lg:block">
        ⚡
      </div>
    </div>
  );
};
