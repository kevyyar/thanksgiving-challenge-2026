import React from 'react';
import { Menu, X, Heart } from 'lucide-react';

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onDonateClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  onDonateClick,
}) => {
  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-harvest-500 to-pumpkin-600 text-white p-2 rounded-lg">
              <Heart className="h-6 w-6 fill-current" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif font-bold text-xl text-stone-900 tracking-tight">Harvest Hope</span>
              <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">Foundation</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#mission" className="nav-link-hover text-stone-600 hover:text-harvest-600 font-medium transition-colors">Our Mission</a>
            <a href="#events" className="nav-link-hover text-stone-600 hover:text-harvest-600 font-medium transition-colors">Events</a>
            <a href="#find-help" className="nav-link-hover text-stone-600 hover:text-harvest-600 font-medium transition-colors">Find Help</a>
            <a href="#stories" className="nav-link-hover text-stone-600 hover:text-harvest-600 font-medium transition-colors">Stories</a>
            <button
              onClick={onDonateClick}
              className="bg-harvest-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-harvest-700 transition-colors shadow-md shadow-harvest-600/20 flex items-center gap-2"
            >
              <Heart size={18} className="fill-current" />
              Donate Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-stone-600">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 absolute w-full px-4 py-4 shadow-lg flex flex-col space-y-4 h-screen">
          <a href="#mission" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-stone-700 p-2">Our Mission</a>
          <a href="#events" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-stone-700 p-2">Events & Volunteer</a>
          <a href="#find-help" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-stone-700 p-2">Find Food</a>
          <a href="#stories" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-stone-700 p-2">Stories</a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onDonateClick();
            }}
            className="bg-harvest-600 text-white py-4 rounded-xl font-bold w-full flex items-center justify-center gap-2 mt-4"
          >
            <Heart size={20} className="fill-current" /> Donate Now
          </button>
        </div>
      )}
    </nav>
  );
};
