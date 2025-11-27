import React from 'react';

interface CTASectionProps {
  onDonateClick: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onDonateClick }) => {
  return (
    <section className="relative overflow-hidden py-32 text-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1607227063002-677dc5fdf96f?q=80&w=2940&auto=format&fit=crop"
          alt="Thanksgiving gathering"
          className="h-full w-full object-cover opacity-40 grayscale transition-all duration-1000 hover:scale-105 hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-stone-900/90 mix-blend-multiply"></div>
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <h2 className="mb-8 font-serif text-5xl font-light text-white md:text-7xl">
          Be the Reason <br />
          <span className="italic text-harvest-500">Someone Smiles</span>
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-xl font-light leading-relaxed text-stone-300">
          $25 provides a complete Thanksgiving dinner for a family of four. Your contribution goes
          directly to purchasing fresh food from local farmers.
        </p>
        <button
          onClick={onDonateClick}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-12 py-4 text-sm font-bold uppercase tracking-widest text-stone-900 transition-all hover:bg-harvest-500 hover:text-white"
        >
          <span className="relative z-10">Donate Today</span>
        </button>
      </div>
    </section>
  );
};
