
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
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 text-center animate-fadeIn w-full">
      <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div 
          className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="fa-solid fa-satellite-dish text-teal-600 text-2xl md:text-3xl animate-pulse"></i>
        </div>
      </div>

      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-5 md:mb-6">Scanning Database...</h3>
      
      <div className="w-full bg-gray-100 rounded-full h-3 md:h-4 mb-4 overflow-hidden">
        <div 
          className="whatsapp-green h-full transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-teal-600 font-medium h-6 text-sm md:text-base truncate">{currentText}</p>
      <p className="text-gray-400 text-xs md:text-sm mt-6 md:mt-8 italic">Please do not refresh this page</p>
    </div>
  );
};

export default ScanningView;
