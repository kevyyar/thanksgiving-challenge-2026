import React from 'react';

interface CTASectionProps {
  onDonateClick: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onDonateClick }) => {
  return (
    <section className="bg-stone-900 py-24 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
          Be the Reason Someone Smiles
        </h2>
        <p className="text-stone-400 text-lg mb-10 max-w-2xl mx-auto">
          $25 provides a complete Thanksgiving dinner for a family of four. Your contribution goes directly to purchasing fresh food from local farmers.
        </p>
        <button
          onClick={onDonateClick}
          className="bg-white text-stone-900 px-10 py-4 rounded-full font-bold text-xl hover:bg-stone-200 transition-colors shadow-2xl"
        >
          Donate Today
        </button>
      </div>
    </section>
  );
};
