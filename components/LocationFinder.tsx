import React, { useState } from 'react';
import { MapPin, Navigation, Search, Phone, Clock, ExternalLink } from 'lucide-react';
import { PartnerLocation } from '../types';

const MOCK_LOCATIONS: PartnerLocation[] = [
  {
    id: '1',
    name: 'Grace Community Church',
    address: '123 Hope Ave, Springfield',
    type: 'Church',
    distance: '0.8 miles',
    hours: 'Mon-Fri: 9am - 5pm',
    phone: '(555) 123-4567'
  },
  {
    id: '2',
    name: 'Harvest Food Pantry',
    address: '450 Oak St, Springfield',
    type: 'Food Bank',
    distance: '1.2 miles',
    hours: 'Tue, Thu: 10am - 6pm',
    phone: '(555) 987-6543'
  },
  {
    id: '3',
    name: 'St. Mary’s Soup Kitchen',
    address: '88 River Rd, Springfield',
    type: 'Shelter',
    distance: '2.5 miles',
    hours: 'Daily: 11am - 1pm',
    phone: '(555) 555-0199'
  }
];

export const LocationFinder: React.FC = () => {
  const [searching, setSearching] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [locations, setLocations] = useState<PartnerLocation[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    // Simulate API search
    setTimeout(() => {
      setLocations(MOCK_LOCATIONS);
      setSearching(false);
      setSearched(true);
    }, 1500);
  };

  const handleUseLocation = () => {
    setSearching(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // In a real app, we would use position.coords.latitude and longitude
          // For this demo, we simulate a successful find
          setTimeout(() => {
            setLocations(MOCK_LOCATIONS);
            setSearching(false);
            setSearched(true);
          }, 1500);
        },
        (error) => {
          console.error("Error getting location", error);
          setSearching(false);
          alert("We couldn't get your location. Please enter your zip code.");
        }
      );
    } else {
      setSearching(false);
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getMapLink = (address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  return (
    <section id="find-help" className="py-20 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 md:items-stretch">
          
          <div className="flex-1">
            <span className="text-hope-600 font-bold tracking-wider text-sm uppercase mb-2 block">Find Assistance</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
              Locate a Partner Agency
            </h2>
            <p className="text-lg text-stone-600 mb-8">
              We partner with over 500 local churches, shelters, and food pantries to ensure no one goes hungry this Thanksgiving. Enter your location to find the nearest distribution center.
            </p>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Enter Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="flex-1 p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-hope-500 focus:border-transparent outline-none"
                />
                <button
                  type="submit"
                  className="bg-hope-700 hover:bg-hope-800 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Search size={18} /> Search
                </button>
              </form>
              
              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-grow h-px bg-stone-200"></div>
                <span className="text-stone-400 text-sm">OR</span>
                <div className="flex-grow h-px bg-stone-200"></div>
              </div>

              <button
                onClick={handleUseLocation}
                className="w-full mt-2 border-2 border-hope-600 text-hope-700 hover:bg-hope-50 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Navigation size={18} /> Use My Current Location
              </button>
            </div>
          </div>

          <div className="flex-1 w-full">
            {searching ? (
              <div className="h-full min-h-[300px] bg-white rounded-xl shadow-inner flex flex-col items-center justify-center text-stone-400 animate-pulse">
                <MapPin size={48} className="mb-4 text-hope-300" />
                <p>Searching for nearby partners...</p>
              </div>
            ) : searched ? (
              <div className="space-y-4">
                <h3 className="font-bold text-stone-700 flex items-center gap-2">
                  <MapPin className="text-pumpkin-500" size={20} />
                  Found {locations.length} locations near you
                </h3>
                {locations.map((loc) => (
                  <div key={loc.id} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-hope-500 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif font-bold text-xl text-stone-900">{loc.name}</h4>
                        <span className="inline-block bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded mt-1">{loc.type}</span>
                      </div>
                      <span className="text-hope-600 font-bold text-sm">{loc.distance}</span>
                    </div>
                    
                    <div className="mt-4 space-y-2 text-stone-600 text-sm">
                      <p className="flex items-center gap-2"><MapPin size={16} className="text-stone-400" /> {loc.address}</p>
                      <p className="flex items-center gap-2"><Clock size={16} className="text-stone-400" /> {loc.hours}</p>
                      <p className="flex items-center gap-2"><Phone size={16} className="text-stone-400" /> {loc.phone}</p>
                    </div>

                    <a 
                      href={getMapLink(loc.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-hope-700 font-bold text-sm hover:underline"
                    >
                      Get Directions <ExternalLink size={14} />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full min-h-[300px] bg-stone-200 rounded-xl flex items-center justify-center overflow-hidden">
                 <svg className="w-32 h-32 text-stone-400" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                 </svg>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
