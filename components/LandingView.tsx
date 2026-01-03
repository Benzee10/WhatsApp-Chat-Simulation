
import React, { useState, useRef, useEffect } from 'react';
import { COUNTRIES, PREFERENCES } from '../constants';

interface LandingViewProps {
  onStart: (country: string, preference: string) => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onStart }) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState(COUNTRIES[0]?.code || 'US');
  const [selectedPreferenceId, setSelectedPreferenceId] = useState(PREFERENCES[0]?.id || 'text');
  
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isPreferenceOpen, setIsPreferenceOpen] = useState(false);

  const countryRef = useRef<HTMLDivElement>(null);
  const preferenceRef = useRef<HTMLDivElement>(null);

  const selectedCountry = COUNTRIES.find(c => c.code === selectedCountryCode) || COUNTRIES[0];
  const selectedPreference = PREFERENCES.find(p => p.id === selectedPreferenceId) || PREFERENCES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
      if (preferenceRef.current && !preferenceRef.current.contains(event.target as Node)) {
        setIsPreferenceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(selectedCountryCode, selectedPreferenceId);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeIn mx-auto w-full">
      <div className="p-6 md:p-8">
        <div className="text-center mb-6 md:mb-8">
          <div className="bg-gray-100 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-users-viewfinder text-teal-600 text-xl md:text-2xl"></i>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Find Active Chat Partners</h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">Connect with verified users in your area instantly.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          {/* Custom Country Dropdown */}
          <div className="relative" ref={countryRef}>
            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 px-1">Select Country</label>
            <button
              type="button"
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className={`w-full bg-gray-50 border ${isCountryOpen ? 'border-teal-500 ring-2 ring-teal-50/50' : 'border-gray-200'} rounded-xl py-3 px-4 flex items-center justify-between transition-all duration-200 outline-none`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg md:text-xl">{selectedCountry.flag}</span>
                <span className="text-gray-900 font-medium text-sm md:text-base truncate max-w-[180px] md:max-w-none">{selectedCountry.name}</span>
              </div>
              <i className={`fa-solid fa-chevron-down text-[10px] text-gray-400 transition-transform duration-200 ${isCountryOpen ? 'rotate-180' : ''}`}></i>
            </button>
            
            {isCountryOpen && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-52 md:max-h-60 overflow-y-auto animate-fadeIn py-2">
                {COUNTRIES.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setSelectedCountryCode(c.code);
                      setIsCountryOpen(false);
                    }}
                    className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-teal-50 transition-colors text-left ${selectedCountryCode === c.code ? 'bg-teal-50' : ''}`}
                  >
                    <span className="text-lg md:text-xl">{c.flag}</span>
                    <span className={`text-sm font-medium ${selectedCountryCode === c.code ? 'text-teal-700' : 'text-gray-700'}`}>
                      {c.name}
                    </span>
                    {selectedCountryCode === c.code && <i className="fa-solid fa-check text-teal-600 text-[10px] ml-auto"></i>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Custom Preference Dropdown */}
          <div className="relative" ref={preferenceRef}>
            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 px-1">Chat Preference</label>
            <button
              type="button"
              onClick={() => setIsPreferenceOpen(!isPreferenceOpen)}
              className={`w-full bg-gray-50 border ${isPreferenceOpen ? 'border-teal-500 ring-2 ring-teal-50/50' : 'border-gray-200'} rounded-xl py-3 px-4 flex items-center justify-between transition-all duration-200 outline-none`}
            >
              <div className="flex items-center space-x-3">
                <i className={`fa-solid ${selectedPreference.icon} text-teal-600 text-sm md:text-base`}></i>
                <span className="text-gray-900 font-medium text-sm md:text-base">{selectedPreference.label}</span>
              </div>
              <i className={`fa-solid fa-chevron-down text-[10px] text-gray-400 transition-transform duration-200 ${isPreferenceOpen ? 'rotate-180' : ''}`}></i>
            </button>
            
            {isPreferenceOpen && (
              <div className="absolute z-40 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl animate-fadeIn py-2">
                {PREFERENCES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSelectedPreferenceId(p.id);
                      setIsPreferenceOpen(false);
                    }}
                    className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-teal-50 transition-colors text-left ${selectedPreferenceId === p.id ? 'bg-teal-50' : ''}`}
                  >
                    <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center ${selectedPreferenceId === p.id ? 'bg-teal-100' : 'bg-gray-100'}`}>
                      <i className={`fa-solid ${p.icon} text-xs md:text-sm ${selectedPreferenceId === p.id ? 'text-teal-600' : 'text-gray-500'}`}></i>
                    </div>
                    <span className={`text-sm font-medium ${selectedPreferenceId === p.id ? 'text-teal-700' : 'text-gray-700'}`}>
                      {p.label}
                    </span>
                    {selectedPreferenceId === p.id && <i className="fa-solid fa-check text-teal-600 text-[10px] ml-auto"></i>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full whatsapp-green text-white font-bold py-3.5 md:py-4 rounded-xl shadow-lg hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 text-base md:text-lg mt-6"
          >
            <span>START SEARCH</span>
            <i className="fa-solid fa-magnifying-glass text-sm"></i>
          </button>
        </form>
      </div>
      
      <div className="bg-gray-50 px-4 md:px-8 py-4 border-t border-gray-100 grid grid-cols-3 gap-1 text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center">
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-1.5 space-y-1 md:space-y-0">
          <i className="fa-solid fa-shield-halved text-teal-500 text-xs md:text-sm"></i>
          <span>Secure</span>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-1.5 space-y-1 md:space-y-0">
          <i className="fa-solid fa-bolt text-teal-500 text-xs md:text-sm"></i>
          <span>Instant</span>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-1.5 space-y-1 md:space-y-0">
          <i className="fa-solid fa-user-check text-teal-500 text-xs md:text-sm"></i>
          <span>Verified</span>
        </div>
      </div>
    </div>
  );
};

export default LandingView;
