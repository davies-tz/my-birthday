import React, { useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Sparkles, ZoomIn, ZoomOut } from 'lucide-react';
import { GALLERY_IMAGES } from '../../data/mastemindData';
import { GalleryPhoto } from '../../types';
import { playClick, playPunchThud } from '../../utils/audio';

export const PhotoGallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'fighter' | 'tech' | 'moments'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [imgLoadErrors, setImgLoadErrors] = useState<Record<string, boolean>>({});

  const filteredPhotos = GALLERY_IMAGES.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleImageError = (photoId: string) => {
    setImgLoadErrors((prev) => ({ ...prev, [photoId]: true }));
  };

  const openLightbox = (photo: GalleryPhoto) => {
    if (photo.isBoxingHero) {
      playPunchThud();
    } else {
      playClick();
    }
    setActivePhoto(photo);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    playClick();
    setActivePhoto(null);
    setZoomLevel(1);
  };

  const currentIndex = activePhoto
    ? filteredPhotos.findIndex((p) => p.id === activePhoto.id)
    : -1;

  const navigatePhoto = (direction: 'next' | 'prev') => {
    playClick();
    if (currentIndex === -1 || filteredPhotos.length === 0) return;
    setZoomLevel(1);
    const nextIdx =
      direction === 'next'
        ? (currentIndex + 1) % filteredPhotos.length
        : (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIdx]);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!activePhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigatePhoto('next');
      } else if (e.key === 'ArrowLeft') {
        navigatePhoto('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, currentIndex, filteredPhotos]);

  const toggleZoom = () => {
    playClick();
    setZoomLevel((prev) => (prev === 1 ? 1.5 : 1));
  };

  const categories: { id: 'all' | 'fighter' | 'tech' | 'moments'; label: string; count: number }[] = [
    { id: 'all', label: 'All Frames', count: GALLERY_IMAGES.length },
    { id: 'fighter', label: 'Fighter & Boxing 🥊', count: GALLERY_IMAGES.filter(p => p.category === 'fighter').length },
    { id: 'tech', label: 'Code & Tech 💻', count: GALLERY_IMAGES.filter(p => p.category === 'tech').length },
    { id: 'moments', label: 'Milestones & Life ✨', count: GALLERY_IMAGES.filter(p => p.category === 'moments').length },
  ];

  return (
    <section id="gallery" className="w-full max-w-6xl mx-auto px-4 py-12 sm:py-16">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>VISUAL ARCHIVE // {GALLERY_IMAGES.length} FRAMES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
          A FEW FRAMES FROM THE JOURNEY 📸
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 font-sans">
          Different days. Same mission. Building memories, fighting for every inch, and still becoming.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 border border-amber-400 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-zinc-400'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Masonry / Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredPhotos.map((photo, idx) => {
          const isHero = photo.isBoxingHero && selectedCategory === 'all';

          return (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo)}
              className={`group relative rounded-2xl overflow-hidden border bg-zinc-900 cursor-pointer shadow-xl transition-all duration-500 flex flex-col justify-end ${
                isHero
                  ? 'md:col-span-2 min-h-[360px] sm:min-h-[440px] border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]'
                  : 'min-h-[260px] sm:min-h-[300px] border-white/10 hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.1)]'
              }`}
            >
              {!imgLoadErrors[photo.id] ? (
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(photo.id)}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 text-center">
                  <span className="text-4xl mb-2">{photo.isBoxingHero ? '🥊' : '📸'}</span>
                  <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider mb-1">
                    FRAME #{String(idx + 1).padStart(2, '0')}
                  </span>
                  <h5 className="text-sm font-bold text-white">{photo.title}</h5>
                </div>
              )}

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity pointer-events-none" />

              {/* Badges */}
              {photo.isBoxingHero && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-red-600/90 text-white font-mono font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-red-600/40 border border-red-400/50">
                    <span>ANOTHER ROUND</span>
                    <span>🥊</span>
                  </span>
                </div>
              )}

              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 p-5 sm:p-6">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block mb-1">
                  FRAME #{String(idx + 1).padStart(2, '0')} // {photo.category.toUpperCase()}
                </span>
                <h4 className={`font-bold text-white font-heading ${isHero ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
                  {photo.title}
                </h4>
                <p className="text-zinc-300 text-xs sm:text-sm mt-1 line-clamp-2 font-sans">
                  {photo.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>


      {/* Lightbox / Fullscreen Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Lightbox Header Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
            <div className="text-xs font-mono text-zinc-400">
              FRAME {currentIndex + 1} / {GALLERY_IMAGES.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleZoom}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={zoomLevel === 1 ? 'Zoom In' : 'Zoom Out'}
              >
                {zoomLevel === 1 ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4" />}
              </button>

              <button
                onClick={closeLightbox}
                className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-200 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => navigatePhoto('prev')}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
            title="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigatePhoto('next')}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
            title="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Display */}
          <div className="relative max-w-4xl max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/10">
            {!imgLoadErrors[activePhoto.id] ? (
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                onError={() => handleImageError(activePhoto.id)}
                style={{ transform: `scale(${zoomLevel})` }}
                className="max-h-[70vh] max-w-full object-contain transition-transform duration-300"
              />
            ) : (
              <div className="w-[320px] sm:w-[500px] h-[360px] flex flex-col items-center justify-center bg-zinc-900/90 rounded-2xl p-8 text-center border border-amber-500/30">
                <span className="text-6xl mb-3">{activePhoto.isBoxingHero ? '🥊' : '📸'}</span>
                <span className="font-mono text-xs text-amber-400 uppercase tracking-wider mb-2">
                  {activePhoto.imageUrl.replace('/images/', '')}
                </span>
                <h3 className="text-xl font-bold text-white">{activePhoto.title}</h3>
                <p className="text-zinc-400 text-xs mt-2">{activePhoto.caption}</p>
              </div>
            )}
          </div>

          {/* Lightbox Caption */}
          <div className="mt-4 text-center max-w-xl px-4 z-20">
            {activePhoto.isBoxingHero && (
              <span className="inline-block px-3 py-1 rounded-full bg-red-600/30 text-red-400 font-mono text-xs font-bold border border-red-500/40 mb-2">
                ANOTHER ROUND 🥊
              </span>
            )}
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
              {activePhoto.title}
            </h3>
            <p className="text-zinc-300 text-sm mt-1 font-sans">
              {activePhoto.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
