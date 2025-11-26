import React from 'react';
import { X, ShoppingBag, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Whole Turkey',
    price: '$24.99',
    category: 'Meat',
    image: 'https://images.unsplash.com/photo-1574672174772-e06aa3dea66b?auto=format&fit=crop&q=80&w=800',
    link: 'https://example.com/turkey'
  },
  {
    id: '2',
    name: 'Artisan Pumpkin Pie',
    price: '$12.50',
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1510137600163-2729bc699931?auto=format&fit=crop&q=80&w=800',
    link: 'https://example.com/pie'
  },
  {
    id: '3',
    name: 'Organic Cranberry Sauce',
    price: '$4.99',
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1511019088667-27b2c011e406?auto=format&fit=crop&q=80&w=800',
    link: 'https://example.com/cranberry'
  },
  {
    id: '4',
    name: 'Harvest Spice Blend',
    price: '$6.99',
    category: 'Spices',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    link: 'https://example.com/spice'
  },
  {
    id: '5',
    name: 'Rustic Cornbread Mix',
    price: '$5.50',
    category: 'Baking',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800',
    link: 'https://example.com/cornbread'
  },
  {
    id: '6',
    name: 'Farm Fresh Sweet Potatoes',
    price: '$3.99/lb',
    category: 'Produce',
    image: 'https://images.unsplash.com/photo-1596097635121-14b63b7f0c19?auto=format&fit=crop&q=80&w=800',
    link: 'https://example.com/potatoes'
  }
];

export const StoreModal: React.FC<StoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <div className="sticky top-0 bg-white z-10 border-b border-stone-100 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-harvest-100 rounded-full text-harvest-600">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-harvest-900">Holiday Pantry</h2>
              <p className="text-sm text-stone-500">Stock up for the season</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group bg-stone-50 rounded-xl overflow-hidden border border-stone-200 hover:border-harvest-300 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 bg-white/90 backdrop-blur text-stone-900 text-xs font-bold px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-stone-800">{product.name}</h3>
                  <span className="text-harvest-700 font-bold">{product.price}</span>
                </div>
                <a 
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 bg-stone-800 hover:bg-harvest-600 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Buy Now <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-harvest-50 text-center text-sm text-stone-600 border-t border-harvest-100">
           Free shipping on orders over $50 with code <strong>GOBBLE25</strong>
        </div>
      </div>
    </div>
  );
};