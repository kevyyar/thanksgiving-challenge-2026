import { ExternalLink, Filter, Search, ShoppingBag, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
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

const CATEGORIES = ['All', 'Meat', 'Bakery', 'Pantry', 'Spices', 'Baking', 'Produce'];

export const StoreModal: React.FC<StoreModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-stone-900/70 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex-none bg-white z-10 border-b border-stone-100 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="p-3 bg-harvest-100 rounded-full text-harvest-600">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-harvest-900">Holiday Pantry</h2>
                  <p className="text-sm text-stone-500">Stock up for the season</p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:border-harvest-500 focus:ring-1 focus:ring-harvest-500 transition-all"
                  />
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar - Categories */}
              <div className="hidden md:block w-64 bg-stone-50 border-r border-stone-100 p-6 overflow-y-auto">
                <div className="flex items-center gap-2 mb-4 text-stone-400 text-xs font-bold uppercase tracking-widest">
                  <Filter size={14} />
                  Categories
                </div>
                <div className="space-y-1">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-white text-harvest-700 shadow-sm ring-1 ring-stone-200'
                          : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Grid */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white">
                {/* Mobile Categories */}
                <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                        selectedCategory === category
                          ? 'bg-harvest-500 border-harvest-500 text-white'
                          : 'bg-white border-stone-200 text-stone-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={product.id}
                      className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-harvest-200 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-stone-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                          {product.category}
                        </span>
                      </div>
                      
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-stone-800 text-lg leading-tight group-hover:text-harvest-700 transition-colors">
                            {product.name}
                          </h3>
                          <span className="text-harvest-600 font-bold text-lg bg-harvest-50 px-2 py-1 rounded-lg">
                            {product.price}
                          </span>
                        </div>
                        
                        <a 
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full mt-4 bg-stone-900 hover:bg-harvest-600 text-white py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group/btn"
                        >
                          Add to Cart 
                          <ExternalLink size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-20">
                    <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                      <Search size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2">No products found</h3>
                    <p className="text-stone-500">Try adjusting your search or category filter.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex-none p-4 bg-harvest-50 text-center text-sm text-stone-600 border-t border-harvest-100">
               Free shipping on orders over $50 with code <strong className="text-harvest-700">GOBBLE25</strong>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};