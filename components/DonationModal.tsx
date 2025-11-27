import React, { useState, useEffect, useCallback } from 'react';
import { Gift, Heart, X, Loader2, CheckCircle } from 'lucide-react';
import { DonationItem } from '../types';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DonationState = 'idle' | 'loading' | 'success';

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

// Confetti component
const Confetti: React.FC = () => {
  const colors = ['#d97706', '#ea580c', '#65a30d', '#dc2626', '#f59e0b', '#84cc16'];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    size: 8 + Math.random() * 8
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px'
          }}
        />
      ))}
    </div>
  );
};

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [donationState, setDonationState] = useState<DonationState>('idle');
  const [showConfetti, setShowConfetti] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedId(null);
      setAmount('');
      setDonationState('idle');
      setShowConfetti(false);
    }
  }, [isOpen]);

  const handleSelectDonation = useCallback((item: DonationItem) => {
    setSelectedId(item.id);
    setAmount(item.amount.replace('$', ''));
  }, []);

  const handleDonate = async () => {
    if (!amount || donationState === 'loading') return;

    setDonationState('loading');

    // Mock API request
    await new Promise(resolve => setTimeout(resolve, 1500));

    setDonationState('success');
    setShowConfetti(true);

    // Hide confetti after animation
    setTimeout(() => setShowConfetti(false), 4000);
  };

  if (!isOpen) return null;

  return (
    <>
      {showConfetti && <Confetti />}
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
            {DONATION_ITEMS.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`group bg-white rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-harvest-500 shadow-lg ring-2 ring-harvest-200'
                      : 'border-stone-200 hover:border-harvest-400 hover:shadow-lg'
                  }`}
                  onClick={() => handleSelectDonation(item)}
                >
                  <div className="flex h-32 md:h-40">
                    <div className="w-1/3 relative overflow-hidden">
                      {isSelected && (
                        <div className="absolute inset-0 bg-harvest-500/20 z-10 flex items-center justify-center">
                          <CheckCircle className="text-harvest-600" size={32} />
                        </div>
                      )}
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectDonation(item);
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                            isSelected
                              ? 'bg-harvest-700 text-white'
                              : 'bg-harvest-600 hover:bg-harvest-700 text-white'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Give Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            {donationState === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-sm mx-auto">
                <CheckCircle className="mx-auto text-green-600 mb-3" size={48} />
                <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
                <p className="text-green-700">Your ${amount} donation will provide {Math.floor(Number(amount) * 5)} meals to families in need.</p>
              </div>
            ) : (
              <>
                <p className="text-stone-600 mb-4 font-serif">
                  {selectedId ? 'Confirm your donation or enter a custom amount' : 'Select a donation option or enter a custom amount'}
                </p>
                <div className="flex max-w-sm mx-auto gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-medium">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        setSelectedId(null);
                      }}
                      placeholder="Amount"
                      className="w-full border border-stone-300 rounded-lg pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-harvest-500 text-lg font-medium"
                    />
                  </div>
                  <button
                    onClick={handleDonate}
                    disabled={!amount || donationState === 'loading'}
                    className="bg-stone-800 hover:bg-stone-900 disabled:bg-stone-400 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 min-w-[120px] justify-center"
                  >
                    {donationState === 'loading' ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Processing</span>
                      </>
                    ) : (
                      'Donate'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="p-4 bg-stone-50 text-center text-xs text-stone-400 border-t border-stone-100">
           Harvest Hope Foundation is a 501(c)(3) non-profit. All donations are tax-deductible.
        </div>
      </div>
      </div>
    </>
  );
};
