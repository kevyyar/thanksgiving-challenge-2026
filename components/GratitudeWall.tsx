import React, { useState } from 'react';
import { Story } from '../types';
import { Quote, X, MessageSquare, User } from 'lucide-react';

const INITIAL_STORIES: Story[] = [
  { id: '1', author: 'Maria S.', role: 'Beneficiary', message: 'The food box we received last year saved our Thanksgiving. We had nothing, and suddenly we had a feast. Thank you.' },
  { id: '2', author: 'John D.', role: 'Volunteer', message: 'Serving dinner at the shelter reminded me what community really means. Best Thanksgiving ever.' },
  { id: '3', author: 'The Carter Family', role: 'Donor', message: 'We decided to donate our turkey budget this year. Teaching our kids that giving is better than receiving.' },
  { id: '4', author: 'Sarah J.', role: 'Beneficiary', message: 'I was embarrassed to ask for help, but the volunteers treated me with such dignity and warmth. God bless you.' },
  { id: '5', author: 'Pastor Mike', role: 'Partner', message: 'Harvest Hope allows our church to feed 200 families every November. We could not do it without you.' },
];

export const GratitudeWall: React.FC = () => {
  const [stories] = useState<Story[]>(INITIAL_STORIES);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Removed AI polishing logic. This is now a static display for the demo or simple input.
  
  return (
    <section id="stories" className="py-20 bg-harvest-50 border-t border-harvest-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-harvest-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-hope-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-hope-600 font-bold tracking-wider text-sm uppercase mb-2 block">Voices of Community</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-harvest-900 mb-6">
            Stories of Hope
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Real stories from neighbors helping neighbors. This is why we do what we do.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <div 
              key={story.id} 
              onClick={() => setSelectedStory(story)}
              className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300 cursor-pointer border-t-4 ${index % 2 === 0 ? 'border-harvest-500' : 'border-hope-500'}`}
            >
              <div className="mb-6 flex justify-start">
                 <Quote className="text-stone-300 rotate-180" size={32} />
              </div>
              <p className="font-serif text-lg text-stone-700 mb-6 leading-relaxed italic">
                "{story.message}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{story.author}</h4>
                  <span className="text-xs font-bold uppercase tracking-wide text-stone-400">{story.role}</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Call to Action Card */}
          <div className="bg-harvest-600 rounded-xl p-8 text-white flex flex-col justify-center items-center text-center shadow-lg transform hover:scale-105 transition-transform">
             <MessageSquare size={48} className="mb-4 text-harvest-200" />
             <h3 className="font-serif font-bold text-2xl mb-2">Share Your Story</h3>
             <p className="text-harvest-100 mb-6 text-sm">Have you volunteered or received help? Inspire others with your experience.</p>
             <button className="bg-white text-harvest-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-harvest-50 transition-colors">
               Submit a Testimonial
             </button>
          </div>
        </div>
      </div>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setSelectedStory(null)}
          />
          <div className="bg-white relative w-full max-w-lg rounded-2xl shadow-2xl p-8 md:p-12 animate-fade-in-up">
            <button 
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors text-stone-500"
            >
              <X size={24} />
            </button>
            
            <Quote className="text-harvest-200 mx-auto mb-6" size={64} />
            
            <p className="font-serif text-2xl text-stone-800 text-center leading-relaxed mb-8 italic">
              "{selectedStory.message}"
            </p>
            
            <div className="flex flex-col items-center justify-center gap-2">
               <span className="font-bold text-lg text-stone-900">{selectedStory.author}</span>
               <span className="bg-stone-100 px-3 py-1 rounded-full text-xs font-bold text-stone-500 uppercase tracking-wide">{selectedStory.role}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
