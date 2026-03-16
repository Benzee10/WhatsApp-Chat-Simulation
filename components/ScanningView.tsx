
import React, { useState, useEffect } from 'react';
import { SCAN_STEPS } from '../constants';

interface ScanningViewProps {
  onComplete: () => void;
}

const ScanningView: React.FC<ScanningViewProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(SCAN_STEPS[0]);

  useEffect(() => {
    const duration = 4000; // 4 seconds total
    const intervalTime = 50;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Update text based on progress
    const textIndex = Math.floor((progress / 100) * SCAN_STEPS.length);
    if (textIndex < SCAN_STEPS.length) {
      setCurrentText(SCAN_STEPS[textIndex]);
    }

    if (progress >= 100) {
      const timeout = setTimeout(onComplete, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 text-center animate-fadeIn w-full relative overflow-hidden">
      {/* Shimmer Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none"></div>

      <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div 
          className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="fa-solid fa-satellite-dish text-teal-600 text-2xl md:text-3xl animate-pulse"></i>
        </div>
      </div>

      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Scanning Database...</h3>
      <p className="text-gray-500 text-xs md:text-sm mb-6">Locating active partners in your area</p>
      
      {/* Skeleton Profile Preview */}
      <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center space-x-4 animate-pulse">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-3 md:h-4 mb-4 overflow-hidden">
        <div 
          className="whatsapp-green h-full transition-all duration-75 ease-linear shadow-[0_0_10px_rgba(37,211,102,0.5)]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex items-center justify-center space-x-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
        </span>
        <p className="text-teal-600 font-bold h-6 text-sm md:text-base truncate">{currentText}</p>
      </div>
      
      <p className="text-gray-400 text-[10px] md:text-xs mt-6 md:mt-8 italic uppercase tracking-widest">Secure Encrypted Connection</p>
    </div>
  );
};

export default ScanningView;
