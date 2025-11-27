import { ChevronLeft, ChevronRight, PenTool, Plus, Quote, Send, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { Story } from '../types';

const INITIAL_STORIES: Story[] = [
  {
    id: '1',
    author: 'Maria S.',
    role: 'Beneficiary',
    message:
      'The food box we received last year saved our Thanksgiving. We had nothing, and suddenly we had a feast. Thank you.',
  },
  {
    id: '2',
    author: 'John D.',
    role: 'Volunteer',
    message:
      'Serving dinner at the shelter reminded me what community really means. Best Thanksgiving ever.',
  },
  {
    id: '3',
    author: 'The Carter Family',
    role: 'Donor',
    message:
      'We decided to donate our turkey budget this year. Teaching our kids that giving is better than receiving.',
  },
  {
    id: '4',
    author: 'Sarah J.',
    role: 'Beneficiary',
    message:
      'I was embarrassed to ask for help, but the volunteers treated me with such dignity and warmth. God bless you.',
  },
  {
    id: '5',
    author: 'Pastor Mike',
    role: 'Partner',
    message:
      'Harvest Hope allows our church to feed 200 families every November. We could not do it without you.',
  },
];

const ROLES = ['Donor', 'Volunteer', 'Beneficiary', 'Partner', 'Community Member'] as const;
const STORAGE_KEY = 'harvest-hope-stories';
const ITEMS_PER_PAGE = 6;

export const GratitudeWall: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Form state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<string>(ROLES[0]);
  const [newMessage, setNewMessage] = useState('');

  // Load stories from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const userStories: Story[] = JSON.parse(stored);
      setStories([...INITIAL_STORIES, ...userStories]);
    } else {
      setStories(INITIAL_STORIES);
    }
  }, []);

  // Pagination
  const totalPages = Math.ceil(stories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStories = stories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAddStory = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newName.trim() || !newMessage.trim()) return;

    const newStory: Story = {
      id: `user-${Date.now()}`,
      author: newName.trim(),
      role: newRole,
      message: newMessage.trim(),
    };

    // Get existing user stories from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    const userStories: Story[] = stored ? JSON.parse(stored) : [];

    // Add new story and save
    const updatedUserStories = [...userStories, newStory];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUserStories));

    // Update state
    setStories([...INITIAL_STORIES, ...updatedUserStories]);

    // Reset form
    setNewName('');
    setNewRole(ROLES[0]);
    setNewMessage('');
    setShowAddModal(false);

    // Go to last page to see new story
    const newTotalPages = Math.ceil((stories.length + 1) / ITEMS_PER_PAGE);
    setCurrentPage(newTotalPages);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Donor':
        return 'bg-harvest-100 text-harvest-700';
      case 'Volunteer':
        return 'bg-hope-100 text-hope-700';
      case 'Beneficiary':
        return 'bg-emerald-100 text-emerald-700';
      case 'Partner':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-stone-100 text-stone-600';
    }
  };

  return (
    <section id="stories" className="relative overflow-hidden bg-stone-900 py-32 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-24 text-center">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-harvest-500">
            Voices of Community
          </span>
          <h2 className="font-serif text-5xl font-light md:text-7xl">
            Stories of <span className="italic text-harvest-500">Hope</span>
          </h2>
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 gap-8 md:columns-2 lg:columns-3">
          {paginatedStories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="group mb-8 break-inside-avoid cursor-pointer rounded-none border border-stone-800 bg-stone-900/50 p-8 transition-all hover:border-harvest-500/50 hover:bg-stone-800"
            >
              <Quote className="mb-6 rotate-180 text-stone-700 transition-colors group-hover:text-harvest-500" size={40} />
              <p className="mb-8 font-serif text-xl font-light leading-relaxed text-stone-300 group-hover:text-white">
                "{story.message}"
              </p>
              <div className="flex items-center gap-4 border-t border-stone-800 pt-6 group-hover:border-stone-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-stone-400 group-hover:bg-harvest-500 group-hover:text-white">
                  <User size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-white">{story.author}</h4>
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-500 group-hover:text-harvest-400">
                    {story.role}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Add Story CTA */}
          <div
            onClick={() => setShowAddModal(true)}
            className="group mb-8 flex break-inside-avoid cursor-pointer flex-col items-center justify-center border border-dashed border-stone-700 bg-transparent p-12 text-center transition-all hover:border-harvest-500 hover:bg-stone-800/50"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-800 text-stone-400 transition-colors group-hover:bg-harvest-500 group-hover:text-white">
              <Plus size={32} />
            </div>
            <h3 className="mb-2 font-serif text-2xl text-white">Share Your Story</h3>
            <p className="text-sm text-stone-500 group-hover:text-stone-400">
              Inspire others with your experience
            </p>
          </div>
        </div>

        {/* Minimalist Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="text-stone-500 transition-colors hover:text-white disabled:opacity-30"
            >
              <ChevronLeft size={32} />
            </button>
            <span className="font-serif text-xl text-stone-500">
              <span className="text-white">{currentPage}</span> / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="text-stone-500 transition-colors hover:text-white disabled:opacity-30"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        )}
      </div>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm"
              onClick={() => setSelectedStory(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl md:p-12"
            >
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute right-4 top-4 rounded-full bg-stone-100 p-2 text-stone-500 transition-colors hover:bg-stone-200"
              >
                <X size={24} />
              </button>

              <Quote className="mx-auto mb-6 text-harvest-200" size={64} />

              <p className="mb-8 text-center font-serif text-2xl italic leading-relaxed text-stone-800">
                "{selectedStory.message}"
              </p>

              <div className="flex flex-col items-center justify-center gap-2">
                <span className="text-lg font-bold text-stone-900">{selectedStory.author}</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${getRoleColor(selectedStory.role)}`}
                >
                  {selectedStory.role}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Story Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close button */}
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute right-4 top-4 z-20 p-2 bg-white/80 backdrop-blur-md hover:bg-white rounded-full transition-colors text-stone-500 shadow-sm"
              >
                <X size={20} />
              </button>

              {/* Left Side - Image & Inspiration */}
              <div className="hidden md:flex w-2/5 bg-stone-900 relative flex-col text-white">
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000&auto=format&fit=crop"
                    alt="People sharing stories"
                    className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 to-stone-900/90" />
                </div>

                <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-harvest-500 text-white">
                    <PenTool size={24} />
                  </div>
                  
                  <h2 className="text-3xl font-serif font-bold mb-4 leading-tight">
                    Your Voice Matters
                  </h2>
                  <p className="text-stone-300 font-light leading-relaxed mb-8">
                    Every story adds a thread to the fabric of our community. Share your experience and inspire hope in others.
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center gap-3 text-sm text-stone-400">
                      <div className="w-8 h-px bg-stone-600"></div>
                      <span>Join 500+ others sharing hope</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="flex-1 flex flex-col overflow-hidden bg-white">
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                  <div className="md:hidden mb-6">
                    <h2 className="text-2xl font-serif font-bold text-stone-900">Share Your Story</h2>
                    <p className="text-stone-500 text-sm">Inspire others with your experience</p>
                  </div>

                  <form onSubmit={handleAddStory} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-stone-700 uppercase tracking-wide">Your Name</label>
                          <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="e.g., Maria S."
                            maxLength={50}
                            required
                            className="w-full border-b-2 border-stone-200 bg-stone-50/50 px-4 py-3 outline-none focus:border-harvest-500 focus:bg-white transition-all rounded-t-lg"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-bold text-stone-700 uppercase tracking-wide">Your Role</label>
                          <select
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            className="w-full border-b-2 border-stone-200 bg-stone-50/50 px-4 py-3 outline-none focus:border-harvest-500 focus:bg-white transition-all rounded-t-lg cursor-pointer"
                          >
                            {ROLES.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-stone-700 uppercase tracking-wide">
                          Your Story
                          <span className="ml-2 font-normal text-stone-400 text-xs normal-case">
                            ({250 - newMessage.length} chars left)
                          </span>
                        </label>
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value.slice(0, 250))}
                          placeholder="Share how Harvest Hope has impacted your life..."
                          maxLength={250}
                          required
                          rows={5}
                          className="w-full resize-none border-2 border-stone-100 bg-stone-50/30 rounded-xl px-4 py-3 outline-none focus:border-harvest-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Preview */}
                    {newMessage && (
                      <div className="rounded-xl border border-stone-100 bg-stone-50 p-6 relative overflow-hidden">
                        <Quote className="absolute top-4 right-4 text-stone-200 rotate-180" size={48} />
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-400">
                          Preview
                        </p>
                        <p className="font-serif italic text-stone-700 text-lg relative z-10">"{newMessage}"</p>
                        <div className="mt-4 flex items-center gap-3 relative z-10">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200">
                            <User size={14} className="text-stone-500" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-stone-900 block leading-none">
                              {newName || 'Your Name'}
                            </span>
                            <span className="text-xs text-stone-500">
                              {newRole}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </form>
                </div>

                <div className="p-6 md:p-8 border-t border-stone-100 bg-stone-50">
                  <button
                    onClick={handleAddStory}
                    disabled={!newName.trim() || !newMessage.trim()}
                    className="group relative w-full overflow-hidden rounded-full bg-stone-900 py-4 text-white transition-all hover:bg-harvest-600 disabled:bg-stone-300 disabled:cursor-not-allowed"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase tracking-widest">
                      <span>Share Story</span>
                      <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </button>
                  <p className="mt-4 text-center text-xs text-stone-400">
                    Your story may be displayed on our website to inspire others.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
