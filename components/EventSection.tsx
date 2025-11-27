import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { CommunityEvent } from '../types';

const EVENTS: CommunityEvent[] = [
  {
    id: '1',
    title: 'Annual Turkey Drive Sort-a-Thon',
    date: 'Nov 22, 2025',
    time: '9:00 AM - 2:00 PM',
    location: 'Harvest Hope Warehouse',
    type: 'volunteer',
    description: 'Help us sort and pack over 5,000 turkeys and meal boxes for distribution to local families.'
  },
  {
    id: '2',
    title: 'Community Thanksgiving Feast',
    date: 'Nov 27, 2025',
    time: '11:00 AM - 3:00 PM',
    location: 'City Center Park',
    type: 'community',
    description: 'A free, hot Thanksgiving meal open to anyone in the community. Volunteers needed for serving.'
  },
  {
    id: '3',
    title: 'Mobile Pantry: Westside',
    date: 'Nov 25, 2025',
    time: '4:00 PM - 7:00 PM',
    location: 'Westside Community Center',
    type: 'distribution',
    description: 'Drive-through food distribution event. Fresh produce and holiday staples provided.'
  }
];

interface EventSectionProps {
  onVolunteerClick: () => void;
}

export const EventSection: React.FC<EventSectionProps> = ({ onVolunteerClick }) => {
  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-pumpkin-600 font-bold tracking-wider text-sm uppercase mb-2 block">Get Involved</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-harvest-900 mb-6">
            Upcoming Events
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Join us in making a difference. Whether you give your time, your voice, or your hands, you are helping feed a neighbor in need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="bg-hope-700 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Calendar size={64} />
                </div>
                <h3 className="text-2xl font-serif font-bold relative z-10 mb-2">{event.title}</h3>
                <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  {event.type}
                </span>
              </div>
              
              <div className="p-6 flex-grow">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-stone-700">
                    <Calendar className="text-pumpkin-500" size={20} />
                    <span className="font-bold">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-600">
                    <Clock className="text-hope-600" size={20} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-600">
                    <MapPin className="text-hope-600" size={20} />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  {event.description}
                </p>
              </div>
              
              <div className="p-6 pt-0 mt-auto">
                <button
                  onClick={onVolunteerClick}
                  className="w-full bg-stone-100 hover:bg-hope-100 text-stone-800 hover:text-hope-800 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Users size={18} /> Sign Up to Volunteer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
