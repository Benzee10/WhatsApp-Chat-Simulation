
import React, { useMemo, useState, useEffect } from 'react';
import { SMART_LINK, NAMES, COUNTRIES, AVATAR_URLS, PROFILE_STATUSES } from '../constants';
import TeaserChatPreview from './TeaserChatPreview';
import WhatsAppShareGate from './WhatsAppShareGate';
import { SupportedLanguage, TRANSLATIONS } from '../translations';

interface ResultViewProps {
  country: string;
  preference: string;
  detectedCity?: string;
  lang?: SupportedLanguage;
}

const ResultView: React.FC<ResultViewProps> = ({ country, preference, detectedCity, lang = 'en' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [sharesCount, setSharesCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quickchat_shares_count');
      return saved ? parseInt(saved, 10) || 0 : 0;
    }
    return 0;
  });
  const [isGateHighlighted, setIsGateHighlighted] = useState(false);
  const [showShareAlert, setShowShareAlert] = useState(false);
  const sessionIndex = useMemo(() => Math.floor(Math.random() * NAMES.length), []);
  const [timeLeft, setTimeLeft] = useState(299); // 5 minutes in seconds

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const notificationTimer = setTimeout(() => {
        setShowNotification(true);
        // Hide after 5 seconds
        setTimeout(() => setShowNotification(false), 5000);
      }, 4000);
      return () => clearTimeout(notificationTimer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (timeLeft <= 0 || isLoading) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isLoading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const randomName = useMemo(() => {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    return Math.random() > 0.8 ? `${name} (Active)` : name;
  }, []);

  const randomAvatar = useMemo(() => AVATAR_URLS[Math.floor(Math.random() * AVATAR_URLS.length)], []);
  const randomStatus = useMemo(() => PROFILE_STATUSES[Math.floor(Math.random() * PROFILE_STATUSES.length)], []);
  const countryData = useMemo(() => COUNTRIES.find(c => c.code === country), [country]);
  const displayCity = useMemo(() => {
    return detectedCity?.trim() || countryData?.city || 'Your Area';
  }, [detectedCity, countryData]);

  const handleShare = () => {
    setSharesCount(prev => {
      const next = Math.min(3, prev + 1);
      if (typeof window !== 'undefined') {
        localStorage.setItem('quickchat_shares_count', next.toString());
      }
      return next;
    });
  };

  const handleCtaClick = () => {
    if (sharesCount < 3) {
      setIsGateHighlighted(true);
      setShowShareAlert(true);
      const gate = document.getElementById('whatsapp-share-gate');
      if (gate) {
        gate.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setTimeout(() => setIsGateHighlighted(false), 3000);
      setTimeout(() => setShowShareAlert(false), 5000);
      return;
    }

    window.open(SMART_LINK, '_blank');
  };

  const phoneNumber = useMemo(() => {
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

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-pulse w-full border border-gray-100">
        <div className="bg-gray-200 h-32 w-full flex items-center justify-center">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-16 bg-gray-50 rounded-2xl"></div>
            <div className="h-16 bg-gray-50 rounded-2xl"></div>
          </div>
          <div className="h-44 bg-gray-100 rounded-2xl"></div>
          <div className="h-20 bg-gray-900/10 rounded-2xl"></div>
          <div className="h-16 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-bounceIn w-full border border-gray-100 relative">
      {/* Fake Notification Toast */}
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-center space-x-4 transition-all duration-500 ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="relative">
          <img src={randomAvatar} className="w-12 h-12 rounded-full object-cover" alt="Avatar" />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-900">{randomName}</span>
            <span className="text-[10px] text-gray-400">{t.result?.justNow || 'Just now'}</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-1">{t.result?.toastIncoming || "Hey! I'm waiting for you in chat... 😉"}</p>
        </div>
        <div className="bg-teal-50 p-2 rounded-full">
          <i className="fa-brands fa-whatsapp text-teal-600"></i>
        </div>
      </div>

      <div className="whatsapp-teal p-5 md:p-6 text-center text-white relative">
        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
          {t.result?.premiumMatch || 'PREMIUM MATCH'}
        </div>
        <h2 className="text-xl md:text-2xl font-bold">{t.result?.connectionFound || 'New Connection Found'}</h2>
        <p className="text-teal-50/70 text-xs mt-1">{t.result?.encryptedSuccess || 'Encrypted matching successful'}</p>
      </div>

      <div className="p-6 md:p-8">
        {/* Countdown Timer */}
        <div className="mb-6 flex items-center justify-center space-x-2 bg-red-50 py-2 rounded-xl border border-red-100">
          <i className="fa-solid fa-clock text-red-500 animate-pulse text-sm"></i>
          <span className="text-red-700 font-bold text-sm">{t.result?.expiresIn || 'Connection expires in:'} {formatTime(timeLeft)}</span>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <div className="absolute -top-1 -left-1 z-10 bg-green-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-100 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-300"></span>
              </span>
              <span>{t.result?.onlineNow || 'ONLINE NOW'}</span>
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
              {(t.result?.nearby || 'Nearby {city} • {distance} km away').replace('{city}', displayCity).replace('{distance}', distance)}
            </div>
          </div>
        </div>

        {/* Dynamic Stats for Social Engineering */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{t.result?.responseRate || 'Response Rate'}</p>
            <p className="text-lg font-black text-green-600">99.4%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{t.result?.activity || 'Activity'}</p>
            <p className="text-lg font-black text-blue-600">{t.result?.vHigh || 'V. High'}</p>
          </div>
        </div>

        {/* Verification Alert Banner */}
        {showShareAlert && (
          <div className="mb-4 p-3.5 bg-amber-500 text-white text-xs font-bold rounded-2xl shadow-lg flex items-center justify-between animate-bounce">
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-triangle-exclamation text-base"></i>
              <span>
                {t.shareGate?.toastAlert.replace('{remaining}', (3 - sharesCount).toString()) ||
                  `Share this app link to ${3 - sharesCount} more WhatsApp group(s) to unlock chat!`}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowShareAlert(false)}
              className="text-white/80 hover:text-white ml-2 p-1"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        {/* Interactive Teaser WhatsApp Chat Preview */}
        <TeaserChatPreview
          name={randomName}
          avatar={randomAvatar}
          city={displayCity}
          preference={preference}
          onUnlock={handleCtaClick}
          lang={lang}
          isUnlocked={sharesCount >= 3}
        />

        {/* WhatsApp Group Share Locker Gate (Required: Share to 3 groups before unlocking) */}
        <WhatsAppShareGate
          sharesCount={sharesCount}
          onShare={handleShare}
          lang={lang}
          targetName={randomName}
          isHighlighted={isGateHighlighted}
        />

        {/* WhatsApp Number Reveal Box */}
        <div
          className={`rounded-2xl p-5 mb-6 shadow-inner relative overflow-hidden group transition-all duration-500 ${
            sharesCount >= 3
              ? 'bg-gradient-to-r from-teal-950 via-gray-900 to-teal-950 border-2 border-teal-400/80 shadow-lg'
              : 'bg-gray-900 border border-gray-800'
          }`}
        >
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
            <i
              className={`fa-solid ${
                sharesCount >= 3 ? 'fa-circle-check text-green-400' : 'fa-shield-halved text-white'
              } text-3xl`}
            ></i>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              {t.result?.privateNumber || 'Private WhatsApp Number'}
            </span>
            {sharesCount >= 3 ? (
              <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/40 px-2 py-0.5 rounded-full font-bold flex items-center space-x-1">
                <i className="fa-solid fa-check text-[9px]"></i>
                <span>UNLOCKED</span>
              </span>
            ) : (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold flex items-center space-x-1">
                <i className="fa-solid fa-lock text-[9px]"></i>
                <span>LOCKED ({sharesCount}/3 SHARES)</span>
              </span>
            )}
          </div>
          <div className="text-xl md:text-2xl font-mono font-bold text-white tracking-tighter flex items-center justify-center">
            <span className="text-teal-400">+{phoneNumber.phoneCode}</span>
            <span className="mx-1">({phoneNumber.areaCode}) {phoneNumber.midSegment}-</span>
            {sharesCount >= 3 ? (
              <span className="text-green-400 font-bold tracking-normal animate-fadeIn">
                {phoneNumber.lastFour}
              </span>
            ) : (
              <span className="blur-md select-none opacity-40">9834</span>
            )}
          </div>
          {sharesCount < 3 && (
            <p className="text-[10px] text-center text-amber-300/80 mt-1.5 font-medium">
              Share to 3 WhatsApp groups above to unblur and reveal direct number
            </p>
          )}
        </div>

        <div className="space-y-4">
          <button
            onClick={handleCtaClick}
            className={`w-full text-white font-black py-4 md:py-5 rounded-2xl shadow-[0_10px_20px_-5px_rgba(37,211,102,0.5)] flex flex-col items-center justify-center space-y-0.5 hover:brightness-110 active:scale-95 transition-all ${
              sharesCount >= 3
                ? 'whatsapp-green animate-pulse-green'
                : 'bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-700'
            }`}
          >
            <div className="flex items-center space-x-2 text-lg md:text-xl">
              <i className="fa-brands fa-whatsapp text-2xl"></i>
              <span>
                {sharesCount >= 3
                  ? (t.result?.startChatting || 'START CHATTING NOW')
                  : `SHARE TO 3 GROUPS TO CHAT (${sharesCount}/3)`}
              </span>
            </div>
            <span className="text-[10px] opacity-90 font-medium">
              {sharesCount >= 3
                ? (t.result?.verifiedSecured || 'VERIFIED CONNECTION SECURED')
                : `🔒 ${Math.max(0, 3 - sharesCount)} MORE GROUP(S) REQUIRED TO UNLOCK`}
            </span>
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
