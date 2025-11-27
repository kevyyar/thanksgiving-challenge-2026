import React from 'react';
import { Gift, Heart, X } from 'lucide-react';
import { DonationItem } from '../types';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DONATION_ITEMS: DonationItem[] = [
  {
    id: '1',
    name: 'Sponsor a Holiday Meal',
    amount: '$25',
    impact: 'Feeds a family of 4',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Provide a Whole Turkey',
    amount: '$40',
    impact: 'The centerpiece for a family gathering',
    image: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Monthly Food Box',
    amount: '$50',
    impact: 'Staples for a family for 2 weeks',
    image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'Community Feast Sponsor',
    amount: '$100',
    impact: 'Provides hot meals for 20 people',
    image: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&q=80&w=800'
  }
];

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
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
            <div className="p-2 bg-red-100 rounded-full text-red-600">
              <Heart size={24} className="fill-current" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-harvest-900">Make an Impact</h2>
              <p className="text-sm text-stone-500">Your donation changes lives immediately.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
           <div className="bg-hope-50 border border-hope-200 rounded-lg p-4 mb-6 text-hope-800 text-sm flex items-start gap-3">
              <Gift className="shrink-0 mt-0.5" size={18} />
              <p>Every dollar you donate provides <strong>5 meals</strong> to families in our community thanks to our partnerships with grocery distributors.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DONATION_ITEMS.map((item) => (
              <div key={item.id} className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-harvest-400 hover:shadow-lg transition-all">
                <div className="flex h-32 md:h-40">
                  <div className="w-1/3 relative overflow-hidden">
                     <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-stone-800 text-lg leading-tight mb-1">{item.name}</h3>
                      <p className="text-sm text-stone-500">{item.impact}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                       <span className="text-xl font-bold text-harvest-700">{item.amount}</span>
                       <button className="bg-harvest-600 hover:bg-harvest-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                         Give Now
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
             <p className="text-stone-600 mb-4 font-serif">Prefer to give a custom amount?</p>
             <div className="flex max-w-sm mx-auto gap-2">
                <input type="number" placeholder="$ Amount" className="flex-1 border border-stone-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-harvest-500" />
                <button className="bg-stone-800 text-white px-6 py-2 rounded-lg font-bold">Donate</button>
             </div>
          </div>
        </div>
        
        <div className="p-4 bg-stone-50 text-center text-xs text-stone-400 border-t border-stone-100">
           Harvest Hope Foundation is a 501(c)(3) non-profit. All donations are tax-deductible.
        </div>
      </div>
    </div>
  );
};
