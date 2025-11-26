import { GoogleGenAI, Schema, Type } from '@google/genai';
import type { Recipe } from '../types';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const recipeSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: 'The name of the dish.' },
    description: { type: Type.STRING, description: 'A warm, appetizing description of the dish.' },
    prepTime: { type: Type.STRING, description: "Preparation time (e.g., '15 mins')." },
    cookTime: { type: Type.STRING, description: "Cooking time (e.g., '2 hours')." },
    servings: { type: Type.INTEGER, description: 'Number of people it serves.' },
    ingredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of ingredients with quantities.',
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Step-by-step cooking instructions.',
    },
    tips: { type: Type.STRING, description: "A chef's tip for making it perfect." },
  },
  required: ['title', 'description', 'prepTime', 'cookTime', 'ingredients', 'instructions'],
};

export const generateRecipe = async (preferences: string): Promise<Recipe> => {
  const prompt = `
    You are a professional chef for American Harvest Foods.
    Create a unique, warm, and inviting Thanksgiving recipe based on the user's request: "${preferences}".
    The recipe should use accessible ingredients but feel special for the holiday.
    If the request is vague, suggest a classic Thanksgiving staple with a twist.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: recipeSchema,
      temperature: 0.7,
    },
  });

  const text = response.text;
  if (!text) throw new Error('No response from AI');

  return JSON.parse(text) as Recipe;
};
