import React, { useMemo, useState, useEffect } from 'react';
import { SMART_LINK, NAMES, COUNTRIES, AVATAR_URLS, generateNigerianPhoneNumber } from '../constants';
import TeaserChatPreview from './TeaserChatPreview';
import { SupportedLanguage, TRANSLATIONS } from '../translations';

interface ResultViewProps {
  country: string;
  preference: string;
  detectedCity?: string;
  lang?: SupportedLanguage;
}

const DAILY_CHAT_KEY = 'quickchat_daily_chat_usage';

interface DailyChatData {
  date: string; // YYYY-MM-DD
  count: number;
}

const getTodayDateStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const getDailyChatsUsed = (): number => {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem(DAILY_CHAT_KEY);
    if (!raw) return 0;
    const data: DailyChatData = JSON.parse(raw);
    const today = getTodayDateStr();
    if (data.date === today) {
      return data.count || 0;
    }
    return 0; // New day
  } catch {
    return 0;
  }
};

const incrementDailyChats = (): number => {
  if (typeof window === 'undefined') return 1;
  try {
    const today = getTodayDateStr();
    const current = getDailyChatsUsed();
    const next = current + 1;
    localStorage.setItem(DAILY_CHAT_KEY, JSON.stringify({ date: today, count: next }));
    return next;
  } catch {
    return 1;
  }
};

const ResultView: React.FC<ResultViewProps> = ({ country, preference, detectedCity, lang = 'en' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [dailyChatsUsed, setDailyChatsUsed] = useState<number>(() => getDailyChatsUsed());
  const [timeLeft, setTimeLeft] = useState(299); // 5 minutes in seconds

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const notificationTimer = setTimeout(() => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4500);
      }, 3500);
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
    return NAMES[Math.floor(Math.random() * NAMES.length)];
  }, []);

  const randomAvatar = useMemo(() => AVATAR_URLS[Math.floor(Math.random() * AVATAR_URLS.length)], []);
  const countryData = useMemo(() => COUNTRIES.find(c => c.code === country), [country]);
  const displayCity = useMemo(() => {
    if (detectedCity?.trim()) return detectedCity.trim();
    if (typeof window !== 'undefined') {
      const cached = sessionStorage.getItem('quickchat_exact_city');
      if (cached?.trim()) return cached.trim();
    }
    return countryData?.city || 'Your Area';
  }, [detectedCity, countryData]);

  // Generates randomized phone number for WhatsApp direct link without displaying it on screen
  const phoneNumber = useMemo(() => {
    const isNigeria = country === 'NG' || countryData?.code === 'NG' || countryData?.phoneCode === '234';

    if (isNigeria) {
      // Local format: e.g. "08031234567"
      const localNumber = generateNigerianPhoneNumber();
      // WhatsApp API requires international format: "234" + local without leading 0
      const intlNumber = `234${localNumber.startsWith('0') ? localNumber.slice(1) : localNumber}`;
      return {
        phoneCode: '234',
        localNumber,
        fullDigits: intlNumber
      };
    }

    const cleanPhoneCode = countryData?.phoneCode?.replace(/\D/g, '') || '1';
    const areaCode = (100 + Math.floor(Math.random() * 899)).toString();
    const midSegment = (100 + Math.floor(Math.random() * 899)).toString();
    const lastFour = (1000 + Math.floor(Math.random() * 8999)).toString();
    
    return {
      phoneCode: cleanPhoneCode,
      localNumber: `${areaCode}${midSegment}${lastFour}`,
      fullDigits: `${cleanPhoneCode}${areaCode}${midSegment}${lastFour}`
    };
  }, [country, countryData]);

  const handleStartChat = () => {
    const usedToday = getDailyChatsUsed();

    if (usedToday < 2) {
      // 1st or 2nd chat of the day -> direct to WhatsApp with random number
      incrementDailyChats();
      setDailyChatsUsed(prev => prev + 1);

      const greeting = encodeURIComponent(
        lang === 'es' ? `¡Hola ${randomName}! Vi tu perfil en QuickChat 👋` :
        lang === 'pt' ? `Olá ${randomName}! Vi seu perfil no QuickChat 👋` :
        lang === 'fr' ? `Salut ${randomName} ! J'ai vu ton profil sur QuickChat 👋` :
        lang === 'de' ? `Hallo ${randomName}! Ich habe dein Profil auf QuickChat gesehen 👋` :
        lang === 'it' ? `Ciao ${randomName}! Ho visto il tuo profilo su QuickChat 👋` :
        `Hey ${randomName}! Saw your profile on QuickChat 👋`
      );

      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber.fullDigits}&text=${greeting}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // 3rd generation and beyond -> Adsterra smart link
      incrementDailyChats();
      setDailyChatsUsed(prev => prev + 1);
      window.open(SMART_LINK, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl shadow-zinc-900/5 p-6 md:p-8 animate-pulse w-full border border-zinc-200/80">
        <div className="flex justify-between items-center mb-6">
          <div className="h-4 bg-zinc-200 rounded w-24"></div>
          <div className="h-4 bg-zinc-200 rounded w-16"></div>
        </div>
        <div className="h-48 bg-zinc-100 rounded-2xl mb-4"></div>
        <div className="h-14 bg-zinc-200 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-zinc-900/5 overflow-hidden animate-bounceIn w-full border border-zinc-200/80 relative">
      {/* Toast Notification with Blurred Avatar */}
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm bg-white rounded-2xl shadow-xl border border-zinc-200/80 p-3.5 flex items-center space-x-3 transition-all duration-500 ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 ring-1 ring-zinc-200">
          <img src={randomAvatar} className="w-full h-full object-cover filter blur-[4px] scale-110" alt="Avatar" />
          <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-3 h-3 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-900 truncate">{randomName}</span>
            <span className="text-[10px] text-zinc-400 shrink-0 ml-1">{t.result?.justNow || 'Just now'}</span>
          </div>
          <p className="text-xs text-zinc-600 line-clamp-1">{t.result?.toastIncoming || "Hey! I'm waiting for you in chat... 😉"}</p>
        </div>
        <div className="bg-emerald-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
          <i className="fa-brands fa-whatsapp text-emerald-600 text-sm"></i>
        </div>
      </div>

      {/* Minimal Top Header Bar */}
      <div className="px-5 py-3.5 md:px-6 md:py-4 border-b border-zinc-100 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-zinc-900 tracking-tight">
            {randomName}
          </span>
          <span className="text-zinc-300">·</span>
          <span className="text-zinc-500 font-medium">
            {countryData?.flag} {displayCity}
          </span>
        </div>

        <div className="flex items-center space-x-1.5 text-zinc-500 font-mono text-[11px]">
          <i className="fa-regular fa-clock text-zinc-400"></i>
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="p-5 md:p-6">
        {/* Minimalist Teaser WhatsApp Chat Preview */}
        <TeaserChatPreview
          name={randomName}
          avatar={randomAvatar}
          city={displayCity}
          preference={preference}
          onUnlock={handleStartChat}
          lang={lang}
          isUnlocked={true}
        />

        {/* Primary CTA Button */}
        <div>
          <button
            onClick={handleStartChat}
            className="w-full text-white font-bold py-3.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2 text-sm md:text-base whatsapp-green hover:brightness-105 active:scale-[0.99]"
          >
            <i className="fa-brands fa-whatsapp text-lg"></i>
            <span>{t.result?.startChatting || 'Start Chatting on WhatsApp'}</span>
          </button>
          
          {/* Subtle Security Footnote */}
          <p className="text-[11px] text-zinc-400 text-center font-normal flex items-center justify-center space-x-1.5 mt-3">
            <i className="fa-solid fa-lock text-[10px] text-zinc-400"></i>
            <span>End-to-end encrypted · 100% private</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
