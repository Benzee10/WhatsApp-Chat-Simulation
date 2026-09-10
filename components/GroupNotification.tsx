
import React, { useState, useEffect } from 'react';
import { SupportedLanguage } from '../translations';

interface GroupNotificationProps {
  lang?: SupportedLanguage;
}

const STORAGE_KEY = 'quickchat_whatsapp_group_last_shown';
const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const hasShownInLast24Hours = (): boolean => {
  if (typeof window === 'undefined') return true;
  try {
    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (!lastShown) return false;
    const timestamp = parseInt(lastShown, 10);
    if (isNaN(timestamp)) return false;
    return Date.now() - timestamp < ONE_DAY_MS;
  } catch {
    return false;
  }
};

const LABELS: Record<SupportedLanguage, { exit: string; join: string; badge: string; newGroup: string; subtitle: string }> = {
  en: {
    exit: 'Exit',
    join: 'Join Group',
    badge: 'Hot & Uncensored',
    newGroup: 'New Group Added!',
    subtitle: '18+ Only • 42 girls online now...'
  },
  es: {
    exit: 'Salir',
    join: 'Unirse al Grupo',
    badge: 'Sin Censura',
    newGroup: '¡Nuevo Grupo Agregado!',
    subtitle: 'Solo 18+ • 42 chicas en línea...'
  },
  pt: {
    exit: 'Sair',
    join: 'Entrar no Grupo',
    badge: 'Sem Censura',
    newGroup: 'Novo Grupo Adicionado!',
    subtitle: 'Apenas 18+ • 42 garotas online...'
  },
  fr: {
    exit: 'Quitter',
    join: 'Rejoindre',
    badge: 'Sans Censure',
    newGroup: 'Nouveau Groupe Ajouté !',
    subtitle: '18+ Uniquement • 42 filles en ligne...'
  },
  de: {
    exit: 'Beenden',
    join: 'Gruppe Beitreten',
    badge: 'Unzensiert',
    newGroup: 'Neue Gruppe Hinzugefügt!',
    subtitle: 'Nur 18+ • 42 Mädels online...'
  },
  it: {
    exit: 'Esci',
    join: 'Entra nel Gruppo',
    badge: 'Senza Censura',
    newGroup: 'Nuovo Gruppo Aggiunto!',
    subtitle: 'Solo 18+ • 42 ragazze online...'
  }
};

const GroupNotification: React.FC<GroupNotificationProps> = ({ lang = 'en' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(() => hasShownInLast24Hours());

  const currentLabels = LABELS[lang] || LABELS.en;

  useEffect(() => {
    // If already shown within the last 24 hours, do not show again
    if (hasShownInLast24Hours()) {
      setIsClosed(true);
      return;
    }

    // Delay between 3 and 7 seconds before showing once per day
    const delay = Math.floor(Math.random() * 4000) + 3000;
    const timer = setTimeout(() => {
      if (!isClosed && !hasShownInLast24Hours()) {
        setIsVisible(true);
        try {
          // Record that it has been shown today
          localStorage.setItem(STORAGE_KEY, Date.now().toString());
        } catch {
          // Ignore local storage errors
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isClosed]);

  if (isClosed) return null;

  const handleClick = () => {
    window.open('https://whatsapplinkhub.vercel.app/', '_blank');
  };

  const handleExit = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      // Ensure the timestamp is marked so it doesn't pop up again today
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {
      // Ignore
    }
    setIsVisible(false);
    setTimeout(() => setIsClosed(true), 500); // Wait for transition animation
  };

  return (
    <div 
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-80 z-[60] transition-all duration-700 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div 
        onClick={handleClick}
        className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border-2 border-teal-500 p-4 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all relative group overflow-hidden"
      >
        {/* Naughty Badge */}
        <div className="absolute top-0 right-10 bg-red-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-b-lg uppercase tracking-tighter animate-pulse shadow-xs">
          {currentLabels.badge}
        </div>

        {/* Top-Right Exit / Close Button */}
        <button 
          type="button"
          onClick={handleExit}
          title={currentLabels.exit}
          aria-label={currentLabels.exit}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors z-10 shadow-xs"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        <div className="flex items-center space-x-3.5 pr-6 mt-1">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-teal-50">
              <i className="fa-solid fa-users text-teal-600 text-xl"></i>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-black text-teal-600 uppercase tracking-tight mb-0.5">
              {currentLabels.newGroup}
            </h4>
            <p className="text-sm text-gray-800 font-bold leading-tight truncate">
              "Late Night Secrets 😈"
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5 italic truncate">
              {currentLabels.subtitle}
            </p>
          </div>
        </div>

        {/* Action Controls: Clear Exit Button & Join Button */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 space-x-2">
          <button
            type="button"
            onClick={handleExit}
            className="flex-1 py-1.5 px-3 text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 active:scale-95 rounded-xl transition-all flex items-center justify-center space-x-1.5 border border-gray-200 shadow-xs"
          >
            <i className="fa-solid fa-arrow-right-from-bracket text-[11px] text-gray-500"></i>
            <span>{currentLabels.exit}</span>
          </button>

          <button
            type="button"
            onClick={handleClick}
            className="flex-1 py-1.5 px-3 text-xs font-black text-white bg-gradient-to-r from-teal-600 to-[#25d366] hover:brightness-105 active:scale-95 rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>{currentLabels.join}</span>
          </button>
        </div>

        {/* Progress Bar (Urgency Animation) */}
        <div className="absolute bottom-0 left-0 h-1 bg-teal-500/20 w-full">
          <div className="h-full bg-teal-500 animate-[loading_10s_linear_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default GroupNotification;

