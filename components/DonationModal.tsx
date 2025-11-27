import { ArrowRight, CheckCircle, Gift, Heart, Loader2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useCallback, useEffect, useState } from 'react';
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {showConfetti && <Confetti />}
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
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close button */}
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 z-20 p-2 bg-white/80 backdrop-blur-md hover:bg-white rounded-full transition-colors text-stone-500 shadow-sm"
              >
                <X size={20} />
              </button>

              {/* Left Side - Image & Impact */}
              <div className="hidden md:flex w-2/5 bg-stone-100 relative flex-col">
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop" 
                    alt="Donation Impact" 
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
                </div>
                
                <div className="relative z-10 mt-auto p-8 text-white">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-harvest-500 text-white">
                    <Heart size={24} className="fill-current" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold mb-3 leading-tight">
                    Make a Difference Today
                  </h2>
                  <p className="text-stone-200 font-light leading-relaxed">
                    Your contribution directly supports families in need. 100% of public donations go to our food programs.
                  </p>
                  
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <div className="flex items-center gap-3 text-sm text-stone-300">
                      <Gift size={16} />
                      <span>Tax-deductible donation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Donation Form */}
              <div className="flex-1 flex flex-col overflow-hidden bg-white">
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                  {donationState === 'success' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                      >
                        <CheckCircle className="text-green-600" size={40} />
                      </motion.div>
                      <h3 className="text-3xl font-serif font-bold text-harvest-900 mb-4">Thank You!</h3>
                      <p className="text-stone-600 text-lg max-w-md mx-auto mb-8">
                        Your generous donation of <span className="font-bold text-harvest-700">${amount}</span> will provide {Math.floor(Number(amount) * 5)} meals to families in our community.
                      </p>
                      <button
                        onClick={onClose}
                        className="inline-flex items-center justify-center rounded-full bg-stone-900 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-harvest-500"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="md:hidden mb-6">
                        <h2 className="text-2xl font-serif font-bold text-harvest-900">Make an Impact</h2>
                        <p className="text-stone-500 text-sm">Your donation changes lives immediately.</p>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">Select Amount</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {DONATION_ITEMS.map((item) => {
                            const isSelected = selectedId === item.id;
                            return (
                              <div
                                key={item.id}
                                onClick={() => handleSelectDonation(item)}
                                className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                                  isSelected
                                    ? 'border-harvest-500 bg-harvest-50'
                                    : 'border-stone-100 bg-white hover:border-harvest-200 hover:shadow-md'
                                }`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <span className={`text-xl font-bold ${isSelected ? 'text-harvest-700' : 'text-stone-800'}`}>
                                    {item.amount}
                                  </span>
                                  {isSelected && <CheckCircle size={18} className="text-harvest-600" />}
                                </div>
                                <h4 className="font-bold text-stone-700 text-sm mb-1">{item.name}</h4>
                                <p className="text-xs text-stone-500">{item.impact}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">Or Enter Custom Amount</h3>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-serif text-xl">$</span>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => {
                              setAmount(e.target.value);
                              setSelectedId(null);
                            }}
                            placeholder="0.00"
                            className="w-full border-b-2 border-stone-200 bg-transparent pl-10 pr-4 py-4 text-3xl font-serif font-bold text-harvest-900 outline-none focus:border-harvest-500 transition-colors placeholder:text-stone-200"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {donationState !== 'success' && (
                  <div className="p-6 md:p-8 border-t border-stone-100 bg-stone-50">
                    <button
                      onClick={handleDonate}
                      disabled={!amount || donationState === 'loading'}
                      className="group relative w-full overflow-hidden rounded-full bg-stone-900 py-4 text-white transition-all hover:bg-harvest-500 disabled:bg-stone-300 disabled:cursor-not-allowed"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase tracking-widest">
                        {donationState === 'loading' ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>Donate ${amount || '0'}</span>
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </div>
                    </button>
                    <p className="mt-4 text-center text-xs text-stone-400">
                      Secure payment processing powered by Stripe.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
