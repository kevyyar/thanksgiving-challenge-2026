import React from 'react';
import { Users, Utensils, Truck } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => (
  <div className="p-4">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-4xl font-bold text-stone-900 mb-2">{value}</h3>
    <p className="text-stone-500 font-medium">{label}</p>
  </div>
);

export const ImpactStats: React.FC = () => {
  const stats = [
    {
      icon: <Users size={40} className="text-hope-600" />,
      value: '15,000+',
      label: 'Families Served Last Year',
    },
    {
      icon: <Utensils size={40} className="text-pumpkin-500" />,
      value: '50,000',
      label: 'Meals Distributed',
    },
    {
      icon: <Truck size={40} className="text-harvest-600" />,
      value: '120',
      label: 'Partner Agencies',
    },
  ];

  return (
    <section id="mission" className="py-16 bg-white relative -mt-20 z-20 max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl border-t border-stone-100 p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-stone-100">
        {stats.map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
      </div>
    </section>
  );
};
