
import React, { useMemo } from 'react';
import { SMART_LINK, NAMES, COUNTRIES, AVATAR_URLS } from '../constants';

interface ResultViewProps {
  country: string;
  preference: string;
}

const ResultView: React.FC<ResultViewProps> = ({ country, preference }) => {
  // Use a stable index for the user session to keep name and avatar consistent
  const sessionIndex = useMemo(() => Math.floor(Math.random() * NAMES.length), []);
  
  const randomName = useMemo(() => NAMES[sessionIndex], [sessionIndex]);
  const randomAvatar = useMemo(() => {
    // Pick an avatar from the list. Wrap index if list lengths differ.
    const avatarIndex = sessionIndex % AVATAR_URLS.length;
    return AVATAR_URLS[avatarIndex];
  }, [sessionIndex]);

  const countryData = useMemo(() => COUNTRIES.find(c => c.code === country), [country]);

  const handleCtaClick = () => {
    window.open(SMART_LINK, '_blank');
  };

  /**
   * Generates a realistic-looking randomized and partially masked phone number
   * structure based on typical international formats.
   */
  const phoneNumber = useMemo(() => {
    const areaCode = Math.floor(100 + Math.random() * 899).toString();
    const suffix = Math.floor(1000 + Math.random() * 8999).toString();
    return {
      phoneCode: countryData?.phoneCode || '1',
      areaCode,
      suffix
    };
  }, [countryData]);

  return (
    <div 
      className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-bounceIn transition-all duration-500 md:hover:scale-[1.02] md:hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] group cursor-default w-full"
    >
      <div className="whatsapp-teal p-5 md:p-6 text-center text-white transition-colors duration-300 md:group-hover:bg-[#0e7065]">
        <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-1.5 md:mb-2">
          Match Found!
        </div>
        <h2 className="text-xl md:text-2xl font-bold">Connection Ready</h2>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <div className="relative mb-3 md:mb-4 md:group-hover:scale-105 transition-transform duration-500">
            <img 
              src={randomAvatar}
              alt="Profile"
              className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="absolute bottom-1 right-2 bg-white p-1 rounded-full shadow-sm">
              <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-green-500 rounded-full animate-ping absolute"></div>
              <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-green-500 rounded-full relative"></div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">{randomName}</h3>
            <div className="flex items-center justify-center space-x-2 text-green-600 font-semibold mt-0.5 md:mt-1 text-sm md:text-base">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Online Now</span>
            </div>
            <div className="text-gray-500 text-xs md:text-sm mt-1">
              {countryData?.flag} Based in {countryData?.name}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 md:mb-8 border border-gray-100 transition-colors duration-300 md:group-hover:bg-gray-100/50">
          <div className="flex justify-between items-center mb-2.5 text-[11px] md:text-sm">
            <span className="text-gray-400 font-semibold uppercase tracking-tighter">Verified Number</span>
            <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-[9px] font-black uppercase">Private</span>
          </div>
          <div className="text-lg md:text-2xl font-mono font-bold text-gray-800 tracking-tighter flex items-center justify-center whitespace-nowrap">
            <span className="text-teal-600">+{phoneNumber.phoneCode}</span>
            <span className="mx-0.5 md:mx-1"> ({phoneNumber.areaCode}) ***-</span>
            <span className="blur-[3px] md:blur-sm select-none">{phoneNumber.suffix}</span>
            <i className="fa-solid fa-lock text-gray-300 ml-2 md:ml-3 text-[10px] md:text-sm"></i>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleCtaClick}
            className="w-full whatsapp-green text-white font-black py-4 md:py-5 rounded-2xl shadow-xl animate-pulse-green flex items-center justify-center space-x-2 md:space-x-3 text-lg md:text-xl uppercase tracking-tight hover:brightness-110 active:scale-95 transition-all"
          >
            <i className="fa-brands fa-whatsapp text-2xl md:text-3xl"></i>
            <span>Unlock & Chat Now</span>
          </button>
          
          <p className="text-center text-[10px] md:text-[11px] text-gray-400 font-medium px-2">
            Clicking will verify your age and secure a private chat session.
          </p>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 bg-gray-50 border-t border-gray-100 grid grid-cols-3 gap-1 transition-colors duration-300 md:group-hover:bg-gray-100/80 text-center">
        <div className="flex flex-col items-center space-y-0.5">
          <i className="fa-solid fa-bolt whatsapp-green-text text-xs md:text-sm"></i>
          <span className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Instant</span>
        </div>
        <div className="flex flex-col items-center space-y-0.5">
          <i className="fa-solid fa-shield-halved whatsapp-green-text text-xs md:text-sm"></i>
          <span className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Secure</span>
        </div>
        <div className="flex flex-col items-center space-y-0.5">
          <i className="fa-solid fa-check-double whatsapp-green-text text-xs md:text-sm"></i>
          <span className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Verified</span>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
