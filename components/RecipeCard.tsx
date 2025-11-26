import React from 'react';
import { Recipe } from '../types';
import { Clock, Users, ChefHat, Flame, Leaf } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-harvest-200 animate-fade-in-up">
      <div className="bg-harvest-600 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
           <Leaf size={120} />
        </div>
        <h2 className="text-3xl font-serif font-bold relative z-10">{recipe.title}</h2>
        <p className="mt-2 text-harvest-100 italic relative z-10">{recipe.description}</p>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap gap-4 mb-8 text-sm text-stone-600 font-medium">
          <div className="flex items-center gap-2 bg-harvest-50 px-3 py-1.5 rounded-full border border-harvest-100">
            <Clock size={16} className="text-harvest-600" />
            <span>Prep: {recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-2 bg-harvest-50 px-3 py-1.5 rounded-full border border-harvest-100">
            <Flame size={16} className="text-pumpkin-600" />
            <span>Cook: {recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-2 bg-harvest-50 px-3 py-1.5 rounded-full border border-harvest-100">
            <Users size={16} className="text-harvest-600" />
            <span>Serves: {recipe.servings}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-harvest-100 flex items-center justify-center text-harvest-700 text-sm">1</span>
              Ingredients
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="flex items-start gap-2 text-stone-700">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pumpkin-500 shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-harvest-100 flex items-center justify-center text-harvest-700 text-sm">2</span>
              Instructions
            </h3>
            <ol className="space-y-4">
              {recipe.instructions.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-stone-700">
                  <span className="font-bold text-harvest-600 shrink-0">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {recipe.tips && (
          <div className="mt-8 bg-stone-50 border-l-4 border-pumpkin-500 p-4 rounded-r-lg">
            <div className="flex items-center gap-2 text-pumpkin-600 font-bold mb-1">
              <ChefHat size={18} />
              <h4>Chef's Tip</h4>
            </div>
            <p className="text-stone-600">{recipe.tips}</p>
          </div>
        )}
      </div>
    </div>
  );
};