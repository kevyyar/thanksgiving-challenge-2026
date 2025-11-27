import { Facebook, Heart, Instagram, Twitter } from 'lucide-react';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-stone-200 bg-white pb-12 pt-24 text-stone-500">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-8">
        {/* Brand Column */}
        <div className="lg:col-span-4">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-harvest-500 text-white">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <span className="font-serif text-2xl font-bold text-stone-900">Harvest Hope</span>
          </div>
          <p className="mb-8 max-w-sm text-lg font-light leading-relaxed text-stone-600">
            Connecting resources with needs. We believe access to nutritious food is a basic human
            right, especially during the holidays.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-stone-400 transition-colors hover:text-harvest-500">
              <Facebook size={24} strokeWidth={1.5} />
            </a>
            <a href="#" className="text-stone-400 transition-colors hover:text-harvest-500">
              <Twitter size={24} strokeWidth={1.5} />
            </a>
            <a href="#" className="text-stone-400 transition-colors hover:text-harvest-500">
              <Instagram size={24} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-2 gap-8 lg:col-span-4">
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-stone-900">
              Organization
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="transition-colors hover:text-harvest-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-harvest-600">
                  Financials
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-harvest-600">
                  Board of Directors
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-harvest-600">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-stone-900">
              Get Help
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#find-help" className="transition-colors hover:text-harvest-600">
                  Find a Pantry
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-harvest-600">
                  Disaster Relief
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-harvest-600">
                  Senior Assistance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Column */}
        <div className="lg:col-span-4">
          <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-stone-900">
            Stay Connected
          </h4>
          <p className="mb-6 text-sm font-light text-stone-600">
            Join our newsletter for updates on our impact and volunteer opportunities.
          </p>
          <div className="flex border-b border-stone-300 pb-2 focus-within:border-harvest-500">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent py-2 text-stone-900 outline-none placeholder:text-stone-400"
            />
            <button className="text-xs font-bold uppercase tracking-widest text-harvest-600 transition-colors hover:text-harvest-800">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto mt-24 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-stone-100 px-6 pt-8 text-xs text-stone-400 md:flex-row lg:px-8">
        <span>&copy; 2025 Harvest Hope Foundation. 501(c)(3) Non-Profit.</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-stone-600">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-stone-600">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};
