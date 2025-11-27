import { Heart, Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? 'bg-white/90 py-4 shadow-sm backdrop-blur-md'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="relative z-50 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                scrolled || mobileMenuOpen ? 'bg-harvest-500 text-white' : 'bg-white text-harvest-500'
              }`}
            >
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={`font-serif text-xl font-bold tracking-tight transition-colors ${
                  scrolled || mobileMenuOpen ? 'text-stone-900' : 'text-white'
                }`}
              >
                Harvest Hope
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-10 md:flex">
            {['Mission', 'Events', 'Stories', 'Find Help'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`nav-link-hover text-sm font-medium uppercase tracking-widest transition-colors ${
                  scrolled ? 'text-stone-600 hover:text-harvest-600' : 'text-white/90 hover:text-white'
                }`}
              >
                {item}
              </a>
            ))}
            <button
              onClick={onDonateClick}
              className={`group relative overflow-hidden rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all hover:shadow-lg ${
                scrolled
                  ? 'bg-harvest-500 text-white hover:bg-harvest-600'
                  : 'bg-white text-harvest-600 hover:bg-harvest-50'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                Donate <Heart size={16} className="fill-current" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`transition-colors ${
                scrolled || mobileMenuOpen ? 'text-stone-900' : 'text-white'
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 h-screen bg-stone-50 transition-transform duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '0', paddingTop: '80px' }}
      >
        <div className="flex h-full flex-col px-6 pb-8">
          <div className="flex flex-col space-y-6 pt-8">
            {['Mission', 'Events', 'Stories', 'Find Help'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-stone-100 pb-4 font-serif text-3xl font-light text-stone-900 transition-colors hover:text-harvest-500"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onDonateClick();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-harvest-500 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-transform active:scale-95"
            >
              <Heart size={18} className="fill-current" /> Donate Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
