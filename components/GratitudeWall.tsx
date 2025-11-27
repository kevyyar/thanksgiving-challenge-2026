import React, { useState, useEffect } from 'react';
import { Story } from '../types';
import { Quote, X, MessageSquare, User, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

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
    <section
      id="stories"
      className="relative overflow-hidden border-t border-harvest-100 bg-harvest-50 py-20"
    >
      {/* Background decoration */}
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-harvest-200 opacity-30 mix-blend-multiply blur-3xl filter"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-hope-200 opacity-30 mix-blend-multiply blur-3xl filter"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-hope-600">
            Voices of Community
          </span>
          <h2 className="mb-6 font-serif text-3xl font-bold text-harvest-900 md:text-5xl">
            Stories of Hope
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-stone-600">
            Real stories from neighbors helping neighbors. This is why we do what we do.
          </p>
        </div>

        {/* Stories Grid - 3x3 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedStories.map((story, index) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className={`transform cursor-pointer rounded-xl border-t-4 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${index % 2 === 0 ? 'border-harvest-500' : 'border-hope-500'}`}
            >
              <div className="mb-6 flex justify-start">
                <Quote className="rotate-180 text-stone-300" size={32} />
              </div>
              <p className="mb-6 line-clamp-4 font-serif text-lg italic leading-relaxed text-stone-700">
                "{story.message}"
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{story.author}</h4>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${getRoleColor(story.role)}`}
                  >
                    {story.role}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Add Story CTA Card - only show on last page or if grid has space */}
          {currentPage === totalPages && (
            <div
              onClick={() => setShowAddModal(true)}
              className="flex transform cursor-pointer flex-col items-center justify-center rounded-xl bg-harvest-600 p-8 text-center text-white shadow-lg transition-transform hover:scale-105"
            >
              <MessageSquare size={48} className="mb-4 text-harvest-200" />
              <h3 className="mb-2 font-serif text-2xl font-bold">Share Your Story</h3>
              <p className="mb-6 text-sm text-harvest-100">
                Have you volunteered or received help? Inspire others with your experience.
              </p>
              <button className="flex items-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-bold text-harvest-700 transition-colors hover:bg-harvest-50">
                <Plus size={16} />
                Submit a Testimonial
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-harvest-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={24} className="text-harvest-600" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-full text-sm font-bold transition-colors ${
                    currentPage === page
                      ? 'bg-harvest-600 text-white'
                      : 'bg-white text-stone-600 hover:bg-harvest-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-harvest-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={24} className="text-harvest-600" />
            </button>
          </div>
        )}
      </div>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setSelectedStory(null)}
          />
          <div className="relative w-full max-w-lg animate-fade-in-up rounded-2xl bg-white p-8 shadow-2xl md:p-12">
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
          </div>
        </div>
      )}

      {/* Add Story Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative max-h-[90vh] w-full max-w-2xl animate-fade-in-up overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-100 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-harvest-100 p-2 text-harvest-600">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-harvest-900">
                    Share Your Story
                  </h2>
                  <p className="text-sm text-stone-500">Inspire others with your experience</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-full p-2 text-stone-500 transition-colors hover:bg-stone-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-6 flex items-start gap-3 rounded-lg border border-hope-200 bg-hope-50 p-4 text-sm text-hope-800">
                <Quote className="mt-0.5 shrink-0" size={18} />
                <p>
                  Your story matters! Share how Harvest Hope has touched your life and inspire
                  others in our community.
                </p>
              </div>

              <form onSubmit={handleAddStory} className="space-y-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label className="mb-1 block text-sm font-bold text-stone-700">Your Name</label>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g., Maria S."
                      maxLength={50}
                      required
                      className="w-full rounded-lg border border-stone-200 px-4 py-3 outline-none transition-all focus:border-harvest-500 focus:ring-2 focus:ring-harvest-500/20"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="mb-1 block text-sm font-bold text-stone-700">Your Role</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 outline-none transition-all focus:border-harvest-500 focus:ring-2 focus:ring-harvest-500/20"
                    >
                      {ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1 mt-3 block text-sm font-bold text-stone-700">
                    Your Story
                    <span className="ml-2 font-normal text-stone-400">
                      ({250 - newMessage.length} chars left)
                    </span>
                  </label>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value.slice(0, 250))}
                    placeholder="Share how Harvest Hope has impacted your life..."
                    maxLength={250}
                    required
                    rows={4}
                    className="w-full resize-none rounded-lg border border-stone-200 px-4 py-3 outline-none transition-all focus:border-harvest-500 focus:ring-2 focus:ring-harvest-500/20"
                  />
                </div>

                {/* Preview */}
                {newMessage && (
                  <div className="rounded-lg border border-stone-100 bg-stone-50 p-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-400">
                      Preview
                    </p>
                    <p className="font-serif italic text-stone-700">"{newMessage}"</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200">
                        <User size={14} className="text-stone-500" />
                      </div>
                      <span className="text-sm font-medium text-stone-600">
                        {newName || 'Your Name'}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-xs ${getRoleColor(newRole)}`}>
                        {newRole}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!newName.trim() || !newMessage.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-harvest-600 py-3 font-bold text-white transition-colors hover:bg-harvest-700 disabled:cursor-not-allowed disabled:bg-stone-300"
                >
                  <Plus size={20} />
                  Add My Story
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="border-t border-stone-100 bg-stone-50 p-4 text-center text-xs text-stone-400">
              Your story may be displayed on our website to inspire others.
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
