import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=1200&auto=format&fit=crop',
    alt: 'Volunteers sorting food donations',
    caption: 'Our dedicated volunteers sorting donations',
  },
  {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
    alt: 'Hands reaching for bread',
    caption: 'Every hand that gives, feeds a family',
  },
  {
    url: 'https://images.unsplash.com/photo-1574607383476-f517f260d30b?q=80&w=1200&auto=format&fit=crop',
    alt: 'Thanksgiving dinner table',
    caption: 'A warm meal brings families together',
  },
  {
    url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1200&auto=format&fit=crop',
    alt: 'Donation box with hands',
    caption: 'Your donations make a difference',
  },
  {
    url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1200&auto=format&fit=crop',
    alt: 'Community volunteers united',
    caption: 'Community strength in unity',
  },
  {
    url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1200&auto=format&fit=crop',
    alt: 'Helping hands',
    caption: 'Together we can end hunger',
  },
];

export const ImageGallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goToPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % galleryImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  return (
    <section className="bg-stone-100 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-harvest-600">
            Our Community in Action
          </span>
          <h2 className="font-serif text-3xl font-bold text-stone-900 md:text-5xl">
            Moments of Hope
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <button
              key={image.url}
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden rounded-xl focus:outline-none focus:ring-4 focus:ring-harvest-500/50 ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                  index === 0 ? 'h-[300px] md:h-[500px]' : 'h-[150px] md:h-[240px]'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-sm font-medium text-white drop-shadow-lg md:text-base">
                  {image.caption}
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/95 p-4">
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:left-8"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:right-8"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>

          <div className="flex max-h-[85vh] max-w-5xl flex-col items-center">
            <img
              src={galleryImages[selectedIndex].url.replace('w=1200', 'w=1920')}
              alt={galleryImages[selectedIndex].alt}
              className="max-h-[75vh] rounded-lg object-contain shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-lg font-medium text-white">
                {galleryImages[selectedIndex].caption}
              </p>
              <p className="mt-1 text-sm text-stone-400">
                {selectedIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
