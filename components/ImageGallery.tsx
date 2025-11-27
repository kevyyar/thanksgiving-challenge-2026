import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=1200&auto=format&fit=crop',
    alt: 'Volunteers sorting food donations',
    caption: 'Our dedicated volunteers sorting donations',
    size: 'large'
  },
  {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
    alt: 'Hands reaching for bread',
    caption: 'Every hand that gives, feeds a family',
    size: 'small'
  },
  {
    url: 'https://images.unsplash.com/photo-1574607383476-f517f260d30b?q=80&w=1200&auto=format&fit=crop',
    alt: 'Thanksgiving dinner table',
    caption: 'A warm meal brings families together',
    size: 'small'
  },
  {
    url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1200&auto=format&fit=crop',
    alt: 'Donation box with hands',
    caption: 'Your donations make a difference',
    size: 'tall'
  },
  {
    url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1200&auto=format&fit=crop',
    alt: 'Community volunteers united',
    caption: 'Community strength in unity',
    size: 'small'
  },
  {
    url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1200&auto=format&fit=crop',
    alt: 'Helping hands',
    caption: 'Together we can end hunger',
    size: 'small'
  },
];

export const ImageGallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
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
    <section className="bg-stone-50 py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-harvest-500">
            Our Community in Action
          </span>
          <h2 className="font-serif text-5xl font-light text-stone-900 md:text-7xl">
            Moments of <span className="italic text-harvest-500">Hope</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl ${
                image.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
                image.size === 'tall' ? 'md:row-span-2' : ''
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-stone-900/0 transition-colors duration-300 group-hover:bg-stone-900/30" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-full bg-white/20 p-4 backdrop-blur-md text-white">
                  <ZoomIn size={32} />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-t from-stone-900/90 to-transparent">
                <p className="text-lg font-serif text-white">
                  {image.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/95 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={closeLightbox}
            />

            <button
              onClick={closeLightbox}
              className="absolute right-6 top-6 z-20 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <X size={24} />
            </button>

            <button
              onClick={goToPrevious}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-colors hover:bg-white/20 hidden md:block"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-colors hover:bg-white/20 hidden md:block"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 max-h-[90vh] max-w-7xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedIndex]!.url.replace('w=1200', 'w=1920')}
                alt={galleryImages[selectedIndex]!.alt}
                className="max-h-[80vh] w-auto rounded-lg shadow-2xl object-contain"
              />
              <div className="mt-6 text-center">
                <p className="text-2xl font-serif text-white mb-2">
                  {galleryImages[selectedIndex]!.caption}
                </p>
                <p className="text-sm text-stone-400 uppercase tracking-widest">
                  {selectedIndex + 1} / {galleryImages.length}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
