export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'volunteer' | 'distribution' | 'community';
}

export interface PartnerLocation {
  id: string;
  name: string;
  address: string;
  type: 'Church' | 'Food Bank' | 'Shelter';
  distance?: string;
  hours: string;
  phone: string;
}

export interface Story {
  id: string;
  author: string;
  message: string;
  role: string; // Volunteer, Donor, Beneficiary
}

export interface DonationItem {
  id: string;
  name: string;
  amount: string;
  impact: string;
  image: string;
}

export interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  tips?: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  link: string;
}