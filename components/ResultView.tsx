import React, { useMemo, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import BannerAd from './BannerAd';
import { 
  SMART_LINK, 
  MESSAGE_INVITE_LINK, 
  FREE_DAILY_GENERATIONS, 
  COUNTRIES, 
  generateNigerianPhoneNumber, 
  generateSouthAfricanPhoneNumber, 
  generateGhanaianPhoneNumber 
} from '../constants';
import { SupportedLanguage } from '../translations';

interface ResultViewProps {
  country: string;
  lang?: SupportedLanguage;
  onRegenerate?: () => void;
}

const DAILY_CHAT_KEY = 'quickchat_daily_chat_usage';
const SEEN_NUMBERS_KEY = 'quickchat_seen_phone_numbers';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000; // 30 days retention

interface DailyChatData {
  date: string; // YYYY-MM-DD
  count: number;
}

interface SeenNumberEntry {
  num: string;
  ts: number;
}

const getSeenNumbersSet = (): Set<string> => {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(SEEN_NUMBERS_KEY);
    if (!raw) return new Set();
    const records: SeenNumberEntry[] = JSON.parse(raw);
    const now = Date.now();
    const valid = records.filter(r => now - r.ts < THIRTY_DAYS_MS);
    return new Set(valid.map(r => r.num));
  } catch {
    return new Set();
  }
};

const saveSeenNumber = (num: string) => {
  if (typeof window === 'undefined' || !num) return;
  try {
    const raw = localStorage.getItem(SEEN_NUMBERS_KEY);
    const records: SeenNumberEntry[] = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    // Retain only entries within the last 30 days, avoiding duplicate entries
    const updated = records.filter(r => now - r.ts < THIRTY_DAYS_MS && r.num !== num);
    updated.push({ num, ts: now });
    localStorage.setItem(SEEN_NUMBERS_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota or disabled errors
  }
};

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

const ResultView: React.FC<ResultViewProps> = ({ country, lang = 'en', onRegenerate }) => {
  const countryData = useMemo(() => COUNTRIES.find(c => c.code === country), [country]);

  // Generates a unique randomized phone number that has not been seen for at least 30 days
  const [phoneNumber] = useState(() => {
    const seenSet = getSeenNumbersSet();
    const cleanPhoneCode = countryData?.phoneCode?.replace(/\D/g, '') || '1';
    const isNigeria = country === 'NG' || countryData?.code === 'NG' || cleanPhoneCode === '234';
    const isSouthAfrica = country === 'ZA' || countryData?.code === 'ZA' || cleanPhoneCode === '27';
    const isGhana = country === 'GH' || countryData?.code === 'GH' || cleanPhoneCode === '233';

    let result = { phoneCode: '', localNumber: '', fullDigits: '' };
    let attempts = 0;

    while (attempts < 50) {
      attempts++;
      if (isNigeria) {
        const localNumber = generateNigerianPhoneNumber();
        const intlNumber = `234${localNumber.startsWith('0') ? localNumber.slice(1) : localNumber}`;
        result = { phoneCode: '234', localNumber, fullDigits: intlNumber };
      } else if (isSouthAfrica) {
        const localNumber = generateSouthAfricanPhoneNumber();
        const intlNumber = `27${localNumber.startsWith('0') ? localNumber.slice(1) : localNumber}`;
        result = { phoneCode: '27', localNumber, fullDigits: intlNumber };
      } else if (isGhana) {
        const localNumber = generateGhanaianPhoneNumber();
        const intlNumber = `233${localNumber.startsWith('0') ? localNumber.slice(1) : localNumber}`;
        result = { phoneCode: '233', localNumber, fullDigits: intlNumber };
      } else {
        const areaCode = (100 + Math.floor(Math.random() * 899)).toString();
        const midSegment = (100 + Math.floor(Math.random() * 899)).toString();
        const lastFour = (1000 + Math.floor(Math.random() * 8999)).toString();
        const localNumber = `${areaCode}${midSegment}${lastFour}`;
        result = {
          phoneCode: cleanPhoneCode,
          localNumber,
          fullDigits: `${cleanPhoneCode}${localNumber}`
        };
      }

      if (!seenSet.has(result.fullDigits)) {
        break;
      }
    }

    // Save this number to the 30-day seen cache so it won't be repeated
    saveSeenNumber(result.fullDigits);
    return result;
  });

  const [isDelaying, setIsDelaying] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const triggerChatNavigation = () => {
    const usedToday = getDailyChatsUsed();

    if (usedToday < FREE_DAILY_GENERATIONS) {
      // 1st through 5th chat of the day -> direct to WhatsApp with random number
      incrementDailyChats();

      const greeting = encodeURIComponent(
        lang === 'es' ? `Hola amigo(a), estoy buscando amigos. Conseguí tu número en ${MESSAGE_INVITE_LINK}` :
        lang === 'pt' ? `Olá amigo(a), estou procurando amigos. Peguei seu número em ${MESSAGE_INVITE_LINK}` :
        lang === 'fr' ? `Salut, je cherche des amis. J'ai eu ton numéro sur ${MESSAGE_INVITE_LINK}` :
        lang === 'de' ? `Hallo, ich suche nach Freunden. Ich habe deine Nummer von ${MESSAGE_INVITE_LINK} bekommen` :
        lang === 'it' ? `Ciao, sto cercando amici. Ho preso il tuo numero da ${MESSAGE_INVITE_LINK}` :
        `Hi Friend, am looking for some friends. I got your number from ${MESSAGE_INVITE_LINK}`
      );

      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber.fullDigits}&text=${greeting}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // 6th generation and beyond -> Adsterra smart link
      incrementDailyChats();
      window.open(SMART_LINK, '_blank');
    }
  };

  const handleStartChat = () => {
    if (isDelaying) return;
    setIsDelaying(true);
    setCountdown(3);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isDelaying && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (isDelaying && countdown === 0) {
      triggerChatNavigation();
      setIsDelaying(false);
      setCountdown(3);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isDelaying, countdown]);

  useEffect(() => {
    // Subtle, elegant celebratory confetti burst on reaching the result screen
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#25D366', '#128C7E', '#10B981', '#34D399', '#FBBF24'],
        ticks: 180,
        gravity: 1.1,
        scalar: 0.85,
        disableForReducedMotion: true
      });
    } catch {
      // Fallback silently if canvas is unavailable
    }
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-zinc-900/5 p-6 md:p-8 w-full border border-zinc-200/80 animate-bounceIn flex flex-col items-center justify-center">
      {/* Subtle Animated Success Checkmark */}
      <div className="mb-5 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-200/70 shadow-xs animate-checkmark-scale">
          <svg 
            className="w-7 h-7 text-emerald-600 animate-checkmark-draw" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <button
        onClick={handleStartChat}
        disabled={isDelaying}
        className={`w-full text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center space-x-3 text-base md:text-lg cursor-pointer ${
          isDelaying 
            ? 'bg-emerald-600 cursor-wait' 
            : 'whatsapp-green hover:brightness-105 active:scale-[0.99]'
        }`}
      >
        {isDelaying ? (
          <>
            <i className="fa-solid fa-circle-notch fa-spin text-xl"></i>
            <span>Connecting to Chat... ({countdown}s)</span>
          </>
        ) : (
          <>
            <i className="fa-brands fa-whatsapp text-2xl"></i>
            <span>Start Chat</span>
          </>
        )}
      </button>

      {/* Sponsored Banner Ad */}
      <BannerAd />

      {onRegenerate && (
        <button
          onClick={onRegenerate}
          disabled={isDelaying}
          className="w-full bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-semibold py-3 px-4 rounded-xl border border-zinc-200 transition-all flex items-center justify-center space-x-2 text-sm md:text-base active:scale-[0.99] cursor-pointer group disabled:opacity-50"
        >
          <i className="fa-solid fa-arrows-rotate text-zinc-400 group-hover:rotate-180 transition-transform duration-300"></i>
          <span>Regenerate</span>
        </button>
      )}
    </div>
  );
};

export default ResultView;
