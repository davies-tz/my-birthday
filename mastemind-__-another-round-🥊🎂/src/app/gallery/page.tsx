import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowRight, Sparkles } from 'lucide-react';
import { PhotoGallery } from '../../components/gallery/PhotoGallery';
import { playClick } from '../../utils/audio';

export default function GalleryPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Visual Archive */}
      <PhotoGallery />

      {/* Footer Navigation CTA */}
      <div className="w-full max-w-4xl mx-auto px-4 pb-12 text-center">
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
              NEXT CHAPTER
            </span>
            <h4 className="text-xl font-bold text-white font-heading">
              Ready to learn the origin story?
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm font-sans">
              Discover the engineering creed, milestones, and what drives Mastemind.
            </p>
          </div>

          <button
            onClick={() => {
              playClick();
              navigate('/about');
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 text-black font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] cursor-pointer shrink-0"
          >
            <span>CONTINUE TO ABOUT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
