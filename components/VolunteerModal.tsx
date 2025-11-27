import { ArrowRight, Calendar, Check, Clock, Loader2, MapPin, Users, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = 'idle' | 'submitting' | 'success';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  availability: string;
  interests: string[];
}

const AVAILABILITY_OPTIONS = [
  'Weekday mornings',
  'Weekday afternoons',
  'Weekday evenings',
  'Weekend mornings',
  'Weekend afternoons',
  'Flexible schedule',
];

const INTEREST_OPTIONS = [
  'Food Distribution',
  'Event Planning',
  'Community Outreach',
  'Administrative Support',
  'Driver / Delivery',
];

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    availability: '',
    interests: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setFormState('success');
  };

  const handleClose = () => {
    setFormState('idle');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      availability: '',
      interests: [],
    });
    onClose();
  };

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
            onClick={handleClose}
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
              onClick={handleClose}
              className="absolute right-4 top-4 z-20 p-2 bg-white/80 backdrop-blur-md hover:bg-white rounded-full transition-colors text-stone-500 shadow-sm"
            >
              <X size={20} />
            </button>

            {/* Left Side - Image & Info */}
            <div className="hidden md:flex w-2/5 bg-hope-900 relative flex-col text-white">
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop"
                  alt="Volunteers working together"
                  className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-hope-900/50 to-hope-900/90" />
              </div>

              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-hope-500 text-white">
                  <Users size={24} />
                </div>
                
                <h2 className="text-3xl font-serif font-bold mb-4 leading-tight">
                  Join Our Community of Helpers
                </h2>
                <p className="text-hope-100 font-light leading-relaxed mb-8">
                  Volunteers are the heart of our mission. Whether you can give an hour or a day, your time makes a real difference.
                </p>

                <div className="mt-auto space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Calendar size={20} className="text-hope-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-hope-200">Flexible Shifts</h3>
                      <p className="text-sm text-hope-100/80 mt-1">Morning, afternoon, and evening opportunities available.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <MapPin size={20} className="text-hope-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-hope-200">Multiple Locations</h3>
                      <p className="text-sm text-hope-100/80 mt-1">Serve at our main pantry or community distribution centers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col overflow-hidden bg-white">
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {formState === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                    >
                      <Check className="text-green-600" size={40} />
                    </motion.div>
                    <h3 className="text-3xl font-serif font-bold text-stone-900 mb-4">Welcome Aboard!</h3>
                    <p className="text-stone-600 text-lg max-w-md mx-auto mb-8">
                      Thanks for signing up, {formData.firstName}! We've sent a confirmation email to {formData.email} with next steps.
                    </p>
                    <button
                      onClick={handleClose}
                      className="inline-flex items-center justify-center rounded-full bg-stone-900 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-hope-600"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="md:hidden mb-6">
                      <h2 className="text-2xl font-serif font-bold text-stone-900">Volunteer Sign Up</h2>
                      <p className="text-stone-500 text-sm">Join us in making a difference.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-bold text-stone-700 uppercase tracking-wide">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full border-b-2 border-stone-200 bg-stone-50/50 px-4 py-3 outline-none focus:border-hope-500 focus:bg-white transition-all rounded-t-lg"
                          placeholder="Jane"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-bold text-stone-700 uppercase tracking-wide">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full border-b-2 border-stone-200 bg-stone-50/50 px-4 py-3 outline-none focus:border-hope-500 focus:bg-white transition-all rounded-t-lg"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold text-stone-700 uppercase tracking-wide">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full border-b-2 border-stone-200 bg-stone-50/50 px-4 py-3 outline-none focus:border-hope-500 focus:bg-white transition-all rounded-t-lg"
                          placeholder="jane@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-bold text-stone-700 uppercase tracking-wide">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full border-b-2 border-stone-200 bg-stone-50/50 px-4 py-3 outline-none focus:border-hope-500 focus:bg-white transition-all rounded-t-lg"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="availability" className="text-sm font-bold text-stone-700 uppercase tracking-wide">
                        Preferred Availability
                      </label>
                      <div className="relative">
                        <select
                          id="availability"
                          name="availability"
                          required
                          value={formData.availability}
                          onChange={handleInputChange}
                          className="w-full appearance-none border-b-2 border-stone-200 bg-stone-50/50 px-4 py-3 outline-none focus:border-hope-500 focus:bg-white transition-all rounded-t-lg cursor-pointer"
                        >
                          <option value="">Select when you can help...</option>
                          {AVAILABILITY_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                          <Clock size={18} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-stone-700 uppercase tracking-wide">
                        Areas of Interest
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {INTEREST_OPTIONS.map((interest) => {
                          const isSelected = formData.interests.includes(interest);
                          return (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => toggleInterest(interest)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                                isSelected
                                  ? 'bg-hope-100 border-hope-500 text-hope-800'
                                  : 'bg-white border-stone-200 text-stone-600 hover:border-hope-300'
                              }`}
                            >
                              {interest}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {formState !== 'success' && (
                <div className="p-6 md:p-8 border-t border-stone-100 bg-stone-50">
                  <button
                    onClick={handleSubmit}
                    disabled={formState === 'submitting'}
                    className="group relative w-full overflow-hidden rounded-full bg-stone-900 py-4 text-white transition-all hover:bg-hope-600 disabled:bg-stone-300 disabled:cursor-not-allowed"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase tracking-widest">
                      {formState === 'submitting' ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          <span>Signing Up...</span>
                        </>
                      ) : (
                        <>
                          <span>Complete Sign Up</span>
                          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </div>
                  </button>
                  <p className="mt-4 text-center text-xs text-stone-400">
                    By signing up, you agree to our volunteer guidelines and privacy policy.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
