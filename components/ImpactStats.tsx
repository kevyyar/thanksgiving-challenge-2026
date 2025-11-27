import { Truck, Users, Utensils } from 'lucide-react';
import React from 'react';

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => (
  <div className="group flex flex-col items-center p-8 transition-transform hover:-translate-y-2">
    <div className="mb-6 text-stone-300 transition-colors group-hover:text-harvest-500">
      {icon}
    </div>
    <h3 className="mb-2 font-serif text-5xl font-light text-stone-900 md:text-6xl">{value}</h3>
    <div className="mb-4 h-px w-12 bg-harvest-500/30" />
    <p className="text-sm font-bold uppercase tracking-widest text-stone-500">{label}</p>
  </div>
);

export const ImpactStats: React.FC = () => {
  const stats = [
    {
      icon: <Users size={32} strokeWidth={1.5} />,
      value: '15k+',
      label: 'Families Served',
    },
    {
      icon: <Utensils size={32} strokeWidth={1.5} />,
      value: '50k',
      label: 'Meals Shared',
    },
    {
      icon: <Truck size={32} strokeWidth={1.5} />,
      value: '120',
      label: 'Partners',
    },
  ];

  return (
    <section id="mission" className="relative z-20 bg-harvest-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-stone-200 border-y border-stone-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};
