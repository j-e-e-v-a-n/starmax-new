import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../../types';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const prev = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onNavigate(prev);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const next = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onNavigate(next);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2.5 rounded-[2px] bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Close image preview"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-[2px] bg-white/10 text-white hover:bg-white/25 transition-colors focus-visible:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-[2px] bg-white/10 text-white hover:bg-white/25 transition-colors focus-visible:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main content */}
      <div className="relative max-w-5xl max-h-[85vh] p-4 flex flex-col items-center">
        <div className="relative rounded-[2px] overflow-hidden max-h-[72vh] flex items-center justify-center bg-black/40 border border-white/10">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="max-h-[70vh] w-auto max-w-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="mt-5 text-center max-w-2xl text-white">
          <div className="text-xs uppercase tracking-[0.14em] text-[#8FB0F0] font-semibold mb-2">
            {currentItem.categoryLabel}
          </div>
          <h3 className="text-xl font-normal text-white mb-1 font-display">
            {currentItem.title}
          </h3>
          <p className="text-sm text-slate-300">
            {currentItem.caption}
          </p>
          <div className="text-xs text-slate-400 mt-2 font-mono">
            {currentIndex + 1} of {items.length}
          </div>
        </div>
      </div>
    </div>
  );
};
