import React from 'react';
import { Calendar, MapPin, Clock, Users, X, ArrowRight } from 'lucide-react';
import { CommunityEvent } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface EventModalProps {
  event: CommunityEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onVolunteerClick: () => void;
}

const typeConfig = {
  volunteer: { label: 'Volunteer Event', color: 'bg-amber-500' },
  distribution: { label: 'Food Distribution', color: 'bg-emerald-500' },
  community: { label: 'Community Event', color: 'bg-hope-500' },
};

export const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose, onVolunteerClick }) => {
  if (!event) return null;

  const config = typeConfig[event.type];

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
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            {/* Hero Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Type badge */}
              <div className="absolute top-4 left-4">
                <span className={`${config.color} text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide`}>
                  {config.label}
                </span>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
                  {event.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Date/Time/Location grid */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl">
                  <div className="p-3 bg-pumpkin-100 rounded-xl text-pumpkin-600">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wide font-medium">Date</p>
                    <p className="font-bold text-stone-800">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl">
                  <div className="p-3 bg-hope-100 rounded-xl text-hope-600">
                    <Clock size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wide font-medium">Time</p>
                    <p className="font-bold text-stone-800">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl">
                  <div className="p-3 bg-harvest-100 rounded-xl text-harvest-600">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wide font-medium">Location</p>
                    <p className="font-bold text-stone-800">{event.location}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-stone-600 leading-relaxed mb-6">
                {event.description}
              </p>

              {/* CTA */}
              <button
                onClick={() => {
                  onClose();
                  onVolunteerClick();
                }}
                className="w-full bg-hope-600 hover:bg-hope-700 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 group"
              >
                <Users size={20} />
                Sign Up to Volunteer
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
