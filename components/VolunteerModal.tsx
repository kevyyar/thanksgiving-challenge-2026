import React, { useState } from 'react';
import { Users, X, Check, Loader2 } from 'lucide-react';

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
}

const AVAILABILITY_OPTIONS = [
  'Weekday mornings',
  'Weekday afternoons',
  'Weekday evenings',
  'Weekend mornings',
  'Weekend afternoons',
  'Flexible schedule',
];

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    availability: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-stone-100 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-hope-100 rounded-full text-hope-600">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">Join Our Team</h2>
              <p className="text-sm text-stone-500">Sign up to volunteer with us</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {formState === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">You're In!</h3>
              <p className="text-stone-600 mb-6">
                Thanks for signing up, {formData.firstName}! We'll be in touch soon with volunteer opportunities.
              </p>
              <button
                onClick={handleClose}
                className="bg-stone-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-stone-800 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-stone-700 mb-1">
                    First name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-stone-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-hope-500 focus:border-transparent transition-shadow"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-stone-700 mb-1">
                    Last name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-stone-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-hope-500 focus:border-transparent transition-shadow"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-stone-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-hope-500 focus:border-transparent transition-shadow"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
                  Phone <span className="text-stone-400 font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-stone-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-hope-500 focus:border-transparent transition-shadow"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-stone-700 mb-1">
                  Availability *
                </label>
                <select
                  id="availability"
                  name="availability"
                  required
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full border border-stone-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-hope-500 focus:border-transparent transition-shadow bg-white"
                >
                  <option value="">Select your availability</option>
                  {AVAILABILITY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full bg-hope-600 hover:bg-hope-700 disabled:bg-hope-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mt-6"
              >
                {formState === 'submitting' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Signing up...
                  </>
                ) : (
                  'Sign Up to Volunteer'
                )}
              </button>
            </form>
          )}
        </div>

        {formState !== 'success' && (
          <div className="p-4 bg-stone-50 text-center text-xs text-stone-400 border-t border-stone-100">
            We respect your privacy. Your information will only be used for volunteer coordination.
          </div>
        )}
      </div>
    </div>
  );
};
