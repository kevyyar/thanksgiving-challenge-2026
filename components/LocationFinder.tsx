import { Clock, ExternalLink, MapPin, Navigation, Phone, Search } from 'lucide-react';
import React, { useState } from 'react';
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
    <section id="find-help" className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Search Column */}
          <div>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-harvest-600">
              Find Assistance
            </span>
            <h2 className="mb-8 font-serif text-5xl font-light text-stone-900 md:text-6xl">
              Locate a Partner <span className="italic text-stone-400">Agency</span>
            </h2>
            <p className="mb-12 text-lg font-light leading-relaxed text-stone-600">
              We partner with over 500 local churches, shelters, and food pantries to ensure no one
              goes hungry this Thanksgiving. Enter your location to find the nearest distribution
              center.
            </p>

            <div className="rounded-none border border-stone-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl">
              <form onSubmit={handleSearch} className="mb-8 flex flex-col gap-4 sm:flex-row">
                <input
                  type="text"
                  placeholder="Enter Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="flex-1 border-b border-stone-300 bg-transparent px-0 py-3 text-lg text-stone-900 placeholder:text-stone-400 focus:border-harvest-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-stone-900 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-harvest-500"
                >
                  <Search size={16} /> Search
                </button>
              </form>

              <div className="relative mb-8 flex items-center gap-4 py-2">
                <div className="h-px flex-grow bg-stone-100"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
                  OR
                </span>
                <div className="h-px flex-grow bg-stone-100"></div>
              </div>

              <button
                onClick={handleUseLocation}
                className="flex w-full items-center justify-center gap-2 border border-stone-200 bg-stone-50 py-4 text-sm font-bold uppercase tracking-widest text-stone-600 transition-colors hover:border-harvest-500 hover:bg-white hover:text-harvest-600"
              >
                <Navigation size={16} /> Use My Current Location
              </button>
            </div>
          </div>

          {/* Results Column */}
          <div className="relative min-h-[500px]">
            {searching ? (
              <div className="flex h-full flex-col items-center justify-center rounded-none border border-stone-100 bg-stone-50 text-stone-400">
                <div className="mb-4 animate-bounce">
                  <MapPin size={48} className="text-harvest-300" />
                </div>
                <p className="animate-pulse text-sm font-bold uppercase tracking-widest">
                  Searching nearby...
                </p>
              </div>
            ) : searched ? (
              <div className="h-full space-y-6">
                <div className="flex items-center gap-3 border-b border-stone-100 pb-6">
                  <MapPin className="text-harvest-500" size={24} />
                  <h3 className="font-serif text-2xl text-stone-900">
                    Found {locations.length} locations near you
                  </h3>
                </div>
                <div className="space-y-6">
                  {locations.map((loc) => (
                    <div
                      key={loc.id}
                      className="group border-b border-stone-100 pb-6 last:border-0"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h4 className="mb-2 font-serif text-xl text-stone-900 transition-colors group-hover:text-harvest-600">
                            {loc.name}
                          </h4>
                          <span className="inline-block bg-stone-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-stone-500">
                            {loc.type}
                          </span>
                        </div>
                        <span className="font-serif text-lg italic text-harvest-500">
                          {loc.distance}
                        </span>
                      </div>

                      <div className="mb-4 space-y-2 text-sm text-stone-500">
                        <p className="flex items-center gap-3">
                          <MapPin size={16} className="text-stone-300" /> {loc.address}
                        </p>
                        <p className="flex items-center gap-3">
                          <Clock size={16} className="text-stone-300" /> {loc.hours}
                        </p>
                        <p className="flex items-center gap-3">
                          <Phone size={16} className="text-stone-300" /> {loc.phone}
                        </p>
                      </div>

                      <a
                        href={getMapLink(loc.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors hover:text-harvest-600"
                      >
                        Get Directions <ExternalLink size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-none bg-stone-100">
                <div className="text-center opacity-20">
                  <MapPin size={120} className="mx-auto mb-4 text-stone-400" />
                  <p className="font-serif text-2xl text-stone-500">Map Area</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
