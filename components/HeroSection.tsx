import { ChevronRight } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

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
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden bg-stone-900">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={image.url}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="h-full w-full object-cover opacity-60"
            />
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-transparent to-transparent opacity-80" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6 pt-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="mb-8 inline-flex animate-fade-in items-center gap-3 border-l-2 border-harvest-500 pl-4 opacity-0">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-harvest-400">
                Thanksgiving Drive 2025
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-8 animate-fade-in-up font-serif text-6xl font-light leading-[1.1] text-white opacity-0 md:text-8xl lg:text-9xl">
              Hunger Doesn't <br />
              <span className="font-bold italic text-harvest-500">Take a Holiday.</span>
            </h1>

            {/* Subheadline */}
            <p className="mb-12 max-w-xl animate-fade-in-up text-lg font-light leading-relaxed text-stone-300 opacity-0 delay-200 md:text-xl">
              Join a movement of compassion in Seattle. We're ensuring every family experiences the
              warmth of a shared meal this season.
            </p>

            {/* Actions */}
            <div className="flex animate-fade-in-up flex-col gap-6 opacity-0 delay-300 sm:flex-row sm:items-center">
              <button
                onClick={onDonateClick}
                className="group flex items-center gap-4 text-left transition-all hover:translate-x-2"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-harvest-500 text-white transition-transform group-hover:scale-110">
                  <ChevronRight size={28} />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-stone-400">
                    Make an Impact
                  </span>
                  <span className="font-serif text-2xl text-white">Give a Meal</span>
                </div>
              </button>

              <div className="hidden h-12 w-px bg-stone-700 sm:block" />

              <button
                onClick={onVolunteerClick}
                className="group flex items-center gap-4 text-left transition-all hover:translate-x-2"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-stone-600 bg-transparent text-white transition-colors group-hover:border-white group-hover:bg-white group-hover:text-stone-900">
                  <ChevronRight size={28} />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-stone-400">
                    Join the Team
                  </span>
                  <span className="font-serif text-2xl text-white">Volunteer</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-stone-500">
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-stone-500 to-transparent" />
      </div>
    </section>
  );
};
