import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onDonateClick: () => void;
  onVolunteerClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onDonateClick, onVolunteerClick }) => {
  return (
    <section className="relative pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2940&auto=format&fit=crop"
          alt="Volunteers Packing Food"
          className="w-full h-[650px] md:h-[800px] object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[650px] md:h-[800px] flex flex-col justify-center items-start text-left">
        <span className="bg-hope-500/90 text-white font-bold tracking-[0.2em] uppercase text-xs md:text-sm px-4 py-2 rounded mb-6 animate-fade-in inline-block">
          Thanksgiving Food Drive 2025
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white mb-8 leading-[1.1] drop-shadow-2xl max-w-4xl">
          Hunger Doesn't Take a <span className="text-harvest-400">Holiday.</span>
        </h1>
        <p className="text-lg md:text-2xl text-stone-200 max-w-2xl font-light mb-10 leading-relaxed">
          Join thousands of volunteers in Tampa Bay ensuring every family has a warm meal this Thanksgiving.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={onDonateClick}
            className="bg-harvest-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-harvest-600 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2"
          >
            Give a Meal <ChevronRight size={20} />
          </button>
          <button
            onClick={onVolunteerClick}
            className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all shadow-xl flex items-center justify-center"
          >
            Volunteer With Us
          </button>
        </div>
      </div>
    </section>
  );
};
