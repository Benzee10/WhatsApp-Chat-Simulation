
import React, { useMemo, useState, useEffect } from 'react';
import { SMART_LINK, NAMES, COUNTRIES, AVATAR_URLS, PROFILE_STATUSES } from '../constants';

interface ResultViewProps {
  country: string;
  preference: string;
}

const ResultView: React.FC<ResultViewProps> = ({ country, preference }) => {
  const sessionIndex = useMemo(() => Math.floor(Math.random() * NAMES.length), []);
  const [timeLeft, setTimeLeft] = useState(299); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const randomName = useMemo(() => {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    // Add a slight chance for a double name or nickname
    return Math.random() > 0.8 ? `${name} (Active)` : name;
  }, []);

  const randomAvatar = useMemo(() => AVATAR_URLS[Math.floor(Math.random() * AVATAR_URLS.length)], []);
  const randomStatus = useMemo(() => PROFILE_STATUSES[Math.floor(Math.random() * PROFILE_STATUSES.length)], []);
  const countryData = useMemo(() => COUNTRIES.find(c => c.code === country), [country]);

  const handleCtaClick = () => {
    window.open(SMART_LINK, '_blank');
  };

  const phoneNumber = useMemo(() => {
    // Generate randomized phone segments
    const areaCode = (100 + Math.floor(Math.random() * 899)).toString();
    const midSegment = (100 + Math.floor(Math.random() * 899)).toString();
    const lastFour = (1000 + Math.floor(Math.random() * 8999)).toString();
    
    return {
      phoneCode: countryData?.phoneCode || '1',
      areaCode,
      midSegment,
      lastFour
    };
  }, [countryData]);

  const distance = useMemo(() => (0.5 + Math.random() * 4.5).toFixed(1), []);

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-bounceIn w-full border border-gray-100">
      <div className="whatsapp-teal p-5 md:p-6 text-center text-white relative">
        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
          PREMIUM MATCH
        </div>
        <h2 className="text-xl md:text-2xl font-bold">New Connection Found</h2>
        <p className="text-teal-50/70 text-xs mt-1">Encrypted matching successful</p>
      </div>

      <div className="p-6 md:p-8">
        {/* Countdown Timer */}
        <div className="mb-6 flex items-center justify-center space-x-2 bg-red-50 py-2 rounded-xl border border-red-100">
          <i className="fa-solid fa-clock text-red-500 animate-pulse text-sm"></i>
          <span className="text-red-700 font-bold text-sm">Connection expires in: {formatTime(timeLeft)}</span>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <div className="absolute -top-1 -left-1 z-10 bg-green-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-100 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-300"></span>
              </span>
              <span>ONLINE NOW</span>
            </div>
            <img 
              src={randomAvatar}
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl object-cover ring-4 ring-green-100"
            />
            <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-lg">
              <i className="fa-solid fa-circle-check text-blue-500 text-xl"></i>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">{randomName}</h3>
            <p className="text-teal-600 font-medium text-xs mt-1 italic">"{randomStatus}"</p>
            <div className="text-gray-500 text-sm font-medium flex items-center justify-center mt-2">
              <span className="text-lg mr-2">{countryData?.flag}</span>
              Nearby {countryData?.city || 'Your Area'} • {distance} km away
            </div>
          </div>
        </div>

        {/* Dynamic Stats for Social Engineering */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Response Rate</p>
            <p className="text-lg font-black text-green-600">99.4%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Activity</p>
            <p className="text-lg font-black text-blue-600">V. High</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-5 mb-6 shadow-inner relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
            <i className="fa-solid fa-shield-halved text-white text-3xl"></i>
          </div>
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Private WhatsApp Number</div>
          <div className="text-xl md:text-2xl font-mono font-bold text-white tracking-tighter flex items-center justify-center">
            <span className="text-teal-400">+{phoneNumber.phoneCode}</span>
            <span className="mx-1">({phoneNumber.areaCode}) {phoneNumber.midSegment}-</span>
            <span className="blur-md select-none opacity-40">{phoneNumber.lastFour}</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleCtaClick}
            className="w-full whatsapp-green text-white font-black py-4 md:py-5 rounded-2xl shadow-[0_10px_20px_-5px_rgba(37,211,102,0.5)] animate-pulse-green flex flex-col items-center justify-center space-y-0.5 hover:brightness-110 active:scale-95 transition-all"
          >
            <div className="flex items-center space-x-2 text-lg md:text-xl">
              <i className="fa-brands fa-whatsapp text-2xl"></i>
              <span>START CHATTING NOW</span>
            </div>
            <span className="text-[10px] opacity-80 font-medium">VERIFIED CONNECTION SECURED</span>
          </button>
          
          <div className="flex items-center justify-center space-x-4 opacity-40 grayscale hover:grayscale-0 transition-all duration-300">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Norton_by_Symantec_logo.svg" className="h-4" alt="Norton" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/McAfee_logo.svg" className="h-4" alt="McAfee" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Trustpilot_logo.svg" className="h-3" alt="Trustpilot" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
