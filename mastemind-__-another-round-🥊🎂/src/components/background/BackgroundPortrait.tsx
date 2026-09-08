import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../../data/mastemindData';

/**
 * BackgroundPortrait Component
 *
 * Implements Layer 1 (Background Portrait) and Layer 2 (Cinematic Dark Vignette Overlay)
 * of the birthday environment architecture:
 *
 * 1. Background portrait: Full-screen, low opacity, monochromatic, slight blur, slow pan/scale
 * 2. Dark/cinematic overlay: Deep radial vignette, smooth top/bottom gradient masks
 *
 * Sits behind:
 * 3. Fireworks and ambient particles (CelebrationCanvas)
 * 4. Balloons / confetti / cake celebration elements
 * 5. Website content (Landing, Quiz, Cards, Sections)
 * 6. Interactive UI (Navbar, Modals, Lightbox)
 */
export const BackgroundPortrait: React.FC = () => {
  const boxingPhoto = GALLERY_IMAGES.find((p) => p.isBoxingHero);
  const imageSrc = boxingPhoto?.imageUrl || '/images/boxing.jpg';

  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <div
      id="cinematic-portrait-layer"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Layer 1: Ghost Silhouette Background Portrait */}
      {!hasError && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={imageSrc}
            alt=""
            loading="eager"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover object-[center_20%] sm:object-[center_25%] md:object-center filter grayscale contrast-125 brightness-50 blur-[1px] transform animate-cinematic-pan opacity-25 sm:opacity-30 transition-opacity duration-1000"
          />
        </div>
      )}

      {/* Layer 2A: Deep Center-to-Edge Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(8,9,13,0.15) 0%, rgba(8,9,13,0.55) 50%, rgba(8,9,13,0.88) 80%, #08090d 100%)',
        }}
      />

      {/* Layer 2B: Cinematic Top & Bottom Vertical Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090d]/80 via-transparent to-[#08090d] pointer-events-none" />

      {/* Layer 2C: Subtle atmospheric fighter tint (deep crimson and amber undercurrent) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-950/20 via-transparent to-amber-950/15 mix-blend-color-dodge pointer-events-none opacity-40" />

      {/* Layer 2D: Micro-fine texture grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
