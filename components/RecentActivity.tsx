
import React, { useState, useEffect } from 'react';
import { RECENT_ACTIVITY_NAMES, COUNTRIES } from '../constants';

const RecentActivity: React.FC = () => {
  const [current, setCurrent] = useState<{name: string, country: string, flag: string} | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showRandom = () => {
      const name = RECENT_ACTIVITY_NAMES[Math.floor(Math.random() * RECENT_ACTIVITY_NAMES.length)];
      const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
      
      setCurrent({ name, country: country.name, flag: country.flag });
      setVisible(true);

      setTimeout(() => setVisible(false), 4000);
    };

    const interval = setInterval(() => {
      showRandom();
    }, 8000); // Show every 8 seconds

    showRandom(); // Show first one immediately

    return () => clearInterval(interval);
  }, []);

  if (!current) return null;

  return (
    <div 
      className={`fixed bottom-24 md:bottom-28 left-4 z-40 transition-all duration-500 transform ${
        visible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-3 border border-gray-100 flex items-center space-x-3 max-w-[240px]">
        <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="fa-solid fa-check text-green-600 text-xs"></i>
        </div>
        <div className="overflow-hidden">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Live Connection</p>
          <p className="text-xs text-gray-800 font-medium leading-tight">
            <span className="font-bold">{current.name}</span> from {current.flag} {current.country} just connected!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
