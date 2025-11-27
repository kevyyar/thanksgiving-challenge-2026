import React from 'react';
import { Calendar, MapPin, Clock, Users, X, ArrowRight, ExternalLink } from 'lucide-react';
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
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Hero Image */}
            <div className="relative h-56 overflow-hidden">
              <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <X size={20} />
              </button>

              {/* Type badge */}
              <div className="absolute left-4 top-4">
                <span
                  className={`${config.color} rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white`}
                >
                  {config.label}
                </span>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="font-serif text-2xl font-bold leading-tight text-white md:text-3xl">
                  {event.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Date/Time/Location grid */}
              <div className="mb-6 grid grid-cols-1 gap-3">
                <a
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-pumpkin-50 group flex items-center gap-4 rounded-2xl bg-stone-50 p-4 transition-colors"
                >
                  <div className="bg-pumpkin-100 rounded-xl p-3 text-pumpkin-600">
                    <Calendar size={22} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                      Date
                    </p>
                    <p className="font-bold text-stone-800">{event.date}</p>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-stone-400 transition-colors group-hover:text-pumpkin-500"
                  />
                </a>

                <a
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl bg-stone-50 p-4 transition-colors hover:bg-hope-50"
                >
                  <div className="rounded-xl bg-hope-100 p-3 text-hope-600">
                    <Clock size={22} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                      Time
                    </p>
                    <p className="font-bold text-stone-800">{event.time}</p>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-stone-400 transition-colors group-hover:text-hope-500"
                  />
                </a>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl bg-stone-50 p-4 transition-colors hover:bg-harvest-50"
                >
                  <div className="rounded-xl bg-harvest-100 p-3 text-harvest-600">
                    <MapPin size={22} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                      Location
                    </p>
                    <p className="font-bold text-stone-800">{event.location}</p>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-stone-400 transition-colors group-hover:text-harvest-500"
                  />
                </a>
              </div>

              {/* Description */}
              <p className="mb-6 leading-relaxed text-stone-600">{event.description}</p>

              {/* CTA */}
              <button
                onClick={() => {
                  onClose();
                  onVolunteerClick();
                }}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-hope-600 py-4 font-bold text-white transition-all hover:bg-hope-700"
              >
                <Users size={20} />
                Sign Up to Volunteer
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
