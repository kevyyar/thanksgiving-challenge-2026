import { ArrowRight, Calendar, ExternalLink, MapPin, Share2, Users, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { CommunityEvent } from '../types';

interface EventModalProps {
  event: CommunityEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onVolunteerClick: () => void;
}

const typeConfig = {
  volunteer: { label: 'Volunteer Event', color: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50' },
  distribution: { label: 'Food Distribution', color: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50' },
  community: { label: 'Community Event', color: 'bg-hope-500', text: 'text-hope-600', bg: 'bg-hope-50' },
};

const generateGoogleCalendarUrl = (event: CommunityEvent): string => {
  const timeParts = event.time.split(' - ');
  const startTime = timeParts[0] ?? '';
  const endTime = timeParts[1] ?? startTime;
  const dateStr = event.date;

  const parseDateTime = (date: string, time: string): string => {
    const d = new Date(`${date} ${time}`);
    return d
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '');
  };

  const start = parseDateTime(dateStr, startTime);
  const end = parseDateTime(dateStr, endTime);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const generateGoogleMapsUrl = (location: string): string => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
};

export const EventModal: React.FC<EventModalProps> = ({
  event,
  isOpen,
  onClose,
  onVolunteerClick,
}) => {
  if (!event) return null;

  const config = typeConfig[event.type];
  const calendarUrl = generateGoogleCalendarUrl(event);
  const mapsUrl = generateGoogleMapsUrl(event.location);

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
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 p-2 bg-white/80 backdrop-blur-md hover:bg-white rounded-full transition-colors text-stone-500 shadow-sm"
            >
              <X size={20} />
            </button>

            {/* Left Side - Image */}
            <div className="w-full md:w-2/5 relative h-64 md:h-auto">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-stone-900/50" />
              
              <div className="absolute top-4 left-4">
                <span className={`${config.color} text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm`}>
                  {config.label}
                </span>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-white">
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="font-serif text-3xl font-bold text-stone-900 leading-tight mb-4">
                    {event.title}
                  </h2>
                  <p className="text-stone-600 leading-relaxed text-lg">
                    {event.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href={calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-100"
                  >
                    <div className="bg-white p-3 rounded-xl shadow-sm text-stone-700 group-hover:text-harvest-600 transition-colors">
                      <Calendar size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-wide text-stone-400 mb-1">Date & Time</p>
                      <p className="font-bold text-stone-900 text-lg">{event.date}</p>
                      <p className="text-stone-600">{event.time}</p>
                    </div>
                    <ExternalLink size={18} className="text-stone-300 group-hover:text-harvest-500 transition-colors" />
                  </a>

                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-100"
                  >
                    <div className="bg-white p-3 rounded-xl shadow-sm text-stone-700 group-hover:text-harvest-600 transition-colors">
                      <MapPin size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-wide text-stone-400 mb-1">Location</p>
                      <p className="font-bold text-stone-900 text-lg">{event.location}</p>
                      <p className="text-stone-500 text-sm mt-1">Click for directions</p>
                    </div>
                    <ExternalLink size={18} className="text-stone-300 group-hover:text-harvest-500 transition-colors" />
                  </a>
                </div>
              </div>

              <div className="p-6 md:p-8 border-t border-stone-100 bg-stone-50 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    onClose();
                    onVolunteerClick();
                  }}
                  className="flex-1 group relative overflow-hidden rounded-xl bg-stone-900 py-4 text-white transition-all hover:bg-harvest-600"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2 font-bold">
                    <Users size={20} />
                    <span>Sign Up to Volunteer</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
                
                <button 
                  className="px-4 py-4 rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors flex items-center justify-center gap-2 font-bold"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: event.title,
                        text: event.description,
                        url: window.location.href,
                      }).catch(console.error);
                    }
                  }}
                >
                  <Share2 size={20} />
                  <span className="sm:hidden">Share Event</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
