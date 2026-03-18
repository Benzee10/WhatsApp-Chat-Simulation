
import React, { useState, useEffect } from 'react';

const GroupNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // Random delay between 3 and 8 seconds to pop up
    const delay = Math.floor(Math.random() * 5000) + 3000;
    const timer = setTimeout(() => {
      if (!isClosed) {
        setIsVisible(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isClosed]);

  if (isClosed) return null;

  const handleClick = () => {
    window.open('https://whatsapplinkhub.vercel.app/', '_blank');
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setTimeout(() => setIsClosed(true), 500); // Wait for transition
  };

  return (
    <div 
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-80 z-[60] transition-all duration-700 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div 
        onClick={handleClick}
        className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border-2 border-teal-500 p-4 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all relative group overflow-hidden"
      >
        {/* Naughty Badge */}
        <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-tighter animate-pulse">
          Hot & Uncensored
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-teal-50">
              <i className="fa-solid fa-users text-teal-600 text-xl"></i>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
            </div>
          </div>

          <div className="flex-1 pr-4">
            <h4 className="text-xs font-black text-teal-600 uppercase tracking-tight mb-0.5">New Group Added!</h4>
            <p className="text-sm text-gray-800 font-bold leading-tight">
              "Late Night Secrets 😈"
            </p>
            <p className="text-[10px] text-gray-500 mt-1 italic">
              18+ Only • 42 girls online now...
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-gray-300 hover:text-gray-500 transition-colors"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        {/* Progress Bar (Fake Urgency) */}
        <div className="absolute bottom-0 left-0 h-1 bg-teal-500/20 w-full">
          <div className="h-full bg-teal-500 animate-[loading_10s_linear_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default GroupNotification;
