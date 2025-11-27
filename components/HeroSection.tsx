import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2940&auto=format&fit=crop',
    alt: 'Volunteers Packing Food',
  },
  {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2940&auto=format&fit=crop',
    alt: 'Hands Sharing Food',
  },
  {
    url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2940&auto=format&fit=crop',
    alt: 'Giving and Sharing',
  },
  {
    url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2940&auto=format&fit=crop',
    alt: 'Community Helping Together',
  },
  {
    url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2940&auto=format&fit=crop',
    alt: 'Volunteers United',
  },
];

interface HeroSectionProps {
  onDonateClick: () => void;
  onVolunteerClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onDonateClick, onVolunteerClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <img
            key={image.url}
            src={image.url}
            alt={image.alt}
            className={`absolute inset-0 h-[650px] w-full object-cover brightness-[0.4] transition-all duration-1000 ease-in-out md:h-[800px] ${
              index === currentIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto flex h-[650px] max-w-7xl flex-col items-start justify-center px-4 text-left sm:px-6 md:h-[800px] lg:px-8">
        <span className="mb-6 inline-block animate-fade-in rounded bg-hope-500/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white md:text-sm">
          Thanksgiving Food Drive 2025
        </span>
        <h1 className="mb-8 max-w-4xl font-serif text-5xl font-black leading-[1.1] text-white drop-shadow-2xl md:text-7xl lg:text-8xl">
          Hunger Doesn't Take a <span className="text-harvest-400">Holiday.</span>
        </h1>
        <p className="mb-10 max-w-2xl text-lg font-light leading-relaxed text-stone-200 md:text-2xl">
          Join thousands of volunteers in Tampa Bay ensuring every family has a warm meal this
          Thanksgiving.
        </p>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <button
            onClick={onDonateClick}
            className="flex items-center justify-center gap-2 rounded-full bg-harvest-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-harvest-600"
          >
            Give a Meal <ChevronRight size={20} />
          </button>
          <button
            onClick={onVolunteerClick}
            className="flex items-center justify-center rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white shadow-xl backdrop-blur-md transition-all hover:bg-white/20"
          >
            Volunteer With Us
          </button>
        </div>
      </div>
    </section>
  );
};
