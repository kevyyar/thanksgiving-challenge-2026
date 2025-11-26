import React from 'react';
import { Product } from '../types';
import { ArrowRight } from 'lucide-react';

const FEATURED: Product[] = [
  {
    id: 'f1',
    name: 'Thanksgiving Essentials Kit',
    price: '$45.00',
    category: 'Bundle',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    link: '#'
  },
  {
    id: 'f2',
    name: 'Limited Edition Pumpkin Puree',
    price: '$3.50',
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1506543730435-e2c1d455b571?auto=format&fit=crop&q=80&w=800',
    link: '#'
  },
  {
    id: 'f3',
    name: 'Maple Glazed Ham',
    price: '$34.99',
    category: 'Meat',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    link: '#'
  }
];

interface ProductShowcaseProps {
  onOpenStore: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onOpenStore }) => {
  return (
    <section id="products" className="py-20 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-pumpkin-600 font-bold tracking-wider text-sm uppercase mb-2 block">Seasonal Favorites</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-harvest-900 mb-4">
              From Our Pantry to Yours
            </h2>
            <p className="text-lg text-stone-600">
              Discover the ingredients that make every Thanksgiving memorable.
            </p>
          </div>
          <button 
            onClick={onOpenStore}
            className="group flex items-center gap-2 text-harvest-700 font-bold hover:text-harvest-900 transition-colors"
          >
            View Full Catalog <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer" onClick={onOpenStore}>
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-pumpkin-600 mb-2 uppercase tracking-wide">{item.category}</div>
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">{item.name}</h3>
                <p className="text-stone-500 mb-4">The perfect addition to your holiday table.</p>
                <div className="flex items-center justify-between border-t border-stone-100 pt-4">
                  <span className="text-lg font-bold text-harvest-800">{item.price}</span>
                  <span className="text-sm font-medium text-stone-400 group-hover:text-harvest-600 transition-colors">Shop Item</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};