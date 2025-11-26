import React from 'react';
import { Heart, Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-500 py-12 md:py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4 text-white">
            <Heart className="h-6 w-6 text-harvest-500 fill-current" />
            <span className="font-serif font-bold text-xl">Harvest Hope</span>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            Connecting resources with needs. We believe access to nutritious food is a basic human right, especially during the holidays.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Organization</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-hope-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-hope-400 transition-colors">Financials</a></li>
            <li><a href="#" className="hover:text-hope-400 transition-colors">Board of Directors</a></li>
            <li><a href="#" className="hover:text-hope-400 transition-colors">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Get Help</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#find-help" className="hover:text-hope-400 transition-colors">Find a Pantry</a></li>
            <li><a href="#" className="hover:text-hope-400 transition-colors">Disaster Relief</a></li>
            <li><a href="#" className="hover:text-hope-400 transition-colors">Senior Assistance</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Newsletter</h4>
          <p className="text-xs mb-4">Stay updated on our impact and volunteer opportunities.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="bg-stone-900 border border-stone-800 rounded-l-md px-4 py-2 text-sm w-full focus:ring-1 focus:ring-hope-500 outline-none text-white"
            />
            <button className="bg-hope-700 hover:bg-hope-600 text-white px-4 rounded-r-md text-sm font-bold">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-stone-900 text-center text-xs flex flex-col md:flex-row justify-between items-center">
        <span>&copy; 2025 Harvest Hope Foundation. 501(c)(3) Non-Profit.</span>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
