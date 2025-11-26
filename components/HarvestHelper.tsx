import React, { useState } from 'react';
import { generateRecipe } from '../services/geminiService';
import { Recipe, LoadingState } from '../types';
import { RecipeCard } from './RecipeCard';
import { Sparkles, Loader2, UtensilsCrossed, ChefHat } from 'lucide-react';

export const HarvestHelper: React.FC = () => {
  const [input, setInput] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoadingState(LoadingState.LOADING);
    setError('');
    setRecipe(null);

    try {
      const result = await generateRecipe(input);
      setRecipe(result);
      setLoadingState(LoadingState.SUCCESS);
    } catch {
      setError('The kitchen is a bit busy! Please try asking the chef again.');
      setLoadingState(LoadingState.ERROR);
    }
  };

  const suggestions = [
    "Gluten-free stuffing",
    "Spicy cranberry sauce",
    "Leftover turkey casserole",
    "Vegan pumpkin pie"
  ];

  return (
    <section id="recipe-helper" className="py-16 md:py-24 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-harvest-100 text-harvest-700 rounded-full mb-4">
          <ChefHat size={32} />
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-harvest-900 mb-4">
          The Harvest Helper
        </h2>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          Stuck on a side dish? Need to use up leftovers? Or hosting a guest with allergies? 
          Tell our AI Chef what you need, and get a custom recipe instantly.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-2 max-w-3xl mx-auto mb-12">
        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 'A side dish with sweet potatoes and pecans'..."
            className="flex-1 p-4 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-harvest-400 bg-transparent text-lg"
          />
          <button
            type="submit"
            disabled={loadingState === LoadingState.LOADING || !input.trim()}
            className="bg-harvest-600 hover:bg-harvest-700 text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-md"
          >
            {loadingState === LoadingState.LOADING ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Sparkles />
            )}
            Create Recipe
          </button>
        </form>
        <div className="px-4 py-3 border-t border-stone-100 flex flex-wrap gap-2 items-center text-sm text-stone-500">
          <span>Try asking for:</span>
          {suggestions.map((s) => (
            <button 
              key={s}
              onClick={() => setInput(s)}
              className="text-harvest-600 hover:text-harvest-800 hover:underline transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loadingState === LoadingState.LOADING && (
        <div className="flex flex-col items-center justify-center py-12 text-stone-500 animate-pulse">
          <UtensilsCrossed size={48} className="mb-4 text-harvest-400" />
          <p className="font-serif text-xl">The chef is brainstorming...</p>
        </div>
      )}

      {loadingState === LoadingState.ERROR && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center max-w-2xl mx-auto">
          {error}
        </div>
      )}

      {recipe && (
        <div className="animate-fade-in">
          <RecipeCard recipe={recipe} />
        </div>
      )}
    </section>
  );
};