import { ArrowUpRight, Clock, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { CommunityEvent } from '../types';
import { EventModal } from './EventModal';

const EVENTS: CommunityEvent[] = [
  {
    id: '1',
    title: 'Annual Turkey Drive Sort-a-Thon',
    date: 'Nov 22, 2025',
    time: '9:00 AM - 2:00 PM',
    location: 'Harvest Hope Warehouse',
    type: 'volunteer',
    description:
      'Help us sort and pack over 5,000 turkeys and meal boxes for distribution to local families. Join hundreds of volunteers in our warehouse facility as we prepare holiday meals for those in need.',
    image:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '2',
    title: 'Community Thanksgiving Feast',
    date: 'Nov 27, 2025',
    time: '11:00 AM - 3:00 PM',
    location: 'City Center Park',
    type: 'community',
    description:
      'A free, hot Thanksgiving meal open to anyone in the community. Volunteers needed for serving. Live music, kids activities, and warm fellowship await.',
    image:
      'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '3',
    title: 'Mobile Pantry: Westside',
    date: 'Nov 25, 2025',
    time: '4:00 PM - 7:00 PM',
    location: 'Westside Community Center',
    type: 'distribution',
    description:
      'Drive-through food distribution event. Fresh produce and holiday staples provided. No registration required—just show up and receive groceries for your family.',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200',
  },
];

interface EventSectionProps {
  onVolunteerClick: () => void;
}

export const EventSection: React.FC<EventSectionProps> = ({ onVolunteerClick }) => {
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  return (
    <section id="events" className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-24 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="max-w-2xl">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-harvest-600">
              Get Involved
            </span>
            <h2 className="font-serif text-5xl font-light text-stone-900 md:text-7xl">
              Upcoming <span className="italic text-stone-400">Events</span>
            </h2>
          </div>
          <p className="max-w-md text-lg font-light leading-relaxed text-stone-600">
            Join us in making a difference. Whether you give your time, your voice, or your hands,
            you are helping feed a neighbor in need.
          </p>
        </div>

        <div className="flex flex-col">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
              onClick={() => setSelectedEvent(event)}
              className="group relative cursor-pointer border-t border-stone-200 py-12 transition-all hover:bg-stone-50"
            >
              <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                {/* Date */}
                <div className="w-32 shrink-0">
                  <span className="block text-sm font-bold uppercase tracking-widest text-stone-400 group-hover:text-harvest-500">
                    {event.date.split(' ')[0]}
                  </span>
                  <span className="font-serif text-4xl text-stone-900">
                    {event.date.split(' ')[1]?.replace(',', '') || ''}
                  </span>
                </div>

                {/* Title & Info */}
                <div className="flex-grow">
                  <h3 className="mb-2 font-serif text-3xl font-light text-stone-900 transition-colors group-hover:text-harvest-600 md:text-4xl">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-6 text-sm text-stone-500">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="shrink-0 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:-translate-x-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-900 text-white">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>

              {/* Hover Image Reveal (Desktop) */}
              <div
                className={`pointer-events-none absolute right-20 top-1/2 z-10 hidden h-64 w-96 -translate-y-1/2 overflow-hidden rounded-lg opacity-0 shadow-2xl transition-all duration-500 lg:block ${
                  hoveredEvent === event.id ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
              >
                <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
          <div className="border-t border-stone-200" />
        </div>
      </div>

      <EventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onVolunteerClick={onVolunteerClick}
      />
    </section>
  );
};
