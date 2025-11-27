import React from 'react';

interface CTASectionProps {
  onDonateClick: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onDonateClick }) => {
  return (
    <section className="relative overflow-hidden py-24 px-4 text-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1607227063002-677dc5fdf96f?q=80&w=2940&auto=format&fit=crop"
          alt="Thanksgiving gathering"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/85"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
          Be the Reason Someone Smiles
        </h2>
        <p className="text-stone-300 text-lg mb-10 max-w-2xl mx-auto">
          $25 provides a complete Thanksgiving dinner for a family of four. Your contribution goes directly to purchasing fresh food from local farmers.
        </p>
        <button
          onClick={onDonateClick}
          className="bg-harvest-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-harvest-600 transition-colors shadow-2xl hover:scale-105 transform transition-transform"
        >
          Donate Today
        </button>
      </div>
    </section>
  );
};
