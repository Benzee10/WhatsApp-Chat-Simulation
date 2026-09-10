
import React, { useState, useEffect, useRef } from 'react';
import { SupportedLanguage, TRANSLATIONS } from '../translations';

interface HeaderProps {
  city?: string;
  lang: SupportedLanguage;
  onSelectLang?: (lang: SupportedLanguage) => void;
}

const LANGUAGES: Array<{ code: SupportedLanguage; label: string; flag: string }> = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
];

const Header: React.FC<HeaderProps> = ({ city, lang, onSelectLang }) => {
  // Start with a natural realistic number around 1,482
  const [onlineCount, setOnlineCount] = useState(() => 1482 + Math.floor(Math.random() * 30) - 15);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Fluctuate every 3.5 to 5 seconds
    const interval = setInterval(() => {
      setOnlineCount(prev => {
        // Delta between -5 and +8 to keep it organic and lively
        const delta = Math.floor(Math.random() * 14) - 5;
        const next = Math.max(1360, Math.min(1690, prev + delta));
        return next;
      });

      setIsUpdating(true);
      const timer = setTimeout(() => setIsUpdating(false), 600);
      return () => clearTimeout(timer);
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  const displayLocation = city?.trim() || 'London';
  const currentLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <header className="whatsapp-teal text-white py-2.5 md:py-3.5 px-4 md:px-6 shadow-md sticky top-0 z-40">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center space-x-2.5">
            <i className="fa-brands fa-whatsapp text-2xl md:text-3xl text-[#25d366]"></i>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-base md:text-lg font-bold tracking-tight">{t.header.brandName}</h1>
              <span className="bg-white/20 text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded text-white/90">
                {t.header.live}
              </span>
            </div>
          </div>

          {/* Language Selector Dropdown (Mobile visible right) */}
          <div className="relative sm:hidden" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center space-x-1 bg-black/20 hover:bg-black/30 px-2 py-1 rounded-full text-xs font-medium text-white/90 transition-all border border-white/10"
              title="Select Language"
            >
              <span>{currentLangObj.flag}</span>
              <span className="uppercase text-[11px] font-bold">{currentLangObj.code}</span>
              <i className="fa-solid fa-chevron-down text-[8px] opacity-70"></i>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-32 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-100 py-1 z-50 animate-fadeIn">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      onSelectLang?.(l.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-xs text-left flex items-center space-x-2 hover:bg-teal-50 transition-colors ${
                      lang === l.code ? 'font-bold text-teal-700 bg-teal-50/60' : ''
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side: Live Counter Pill & Desktop Language Selector */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-end">
          {/* Live Active Online Users Counter Pill */}
          <div className="inline-flex items-center space-x-2 bg-black/25 backdrop-blur-xs px-3 py-1 md:py-1.5 rounded-full border border-white/15 text-xs shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25d366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25d366]"></span>
            </span>
            <span className="text-white tracking-tight flex items-center space-x-1">
              <span
                className={`font-black text-[#25d366] transition-all duration-300 inline-block ${
                  isUpdating ? 'scale-110 text-emerald-300' : 'scale-100'
                }`}
              >
                {onlineCount.toLocaleString()}
              </span>
              <span className="text-gray-100 font-medium">{t.header.peopleOnline}</span>
              <span className="text-teal-200 font-medium truncate max-w-[130px] sm:max-w-[180px]">
                {t.header.near} {displayLocation}
              </span>
            </span>
          </div>

          {/* Desktop Language Selector Dropdown */}
          <div className="relative hidden sm:block" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center space-x-1.5 bg-black/20 hover:bg-black/30 px-2.5 py-1.5 rounded-full text-xs font-medium text-white/90 transition-all border border-white/10"
              title="Select Language"
            >
              <span>{currentLangObj.flag}</span>
              <span className="uppercase text-xs font-bold">{currentLangObj.code}</span>
              <i className="fa-solid fa-chevron-down text-[9px] opacity-70"></i>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-34 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-100 py-1 z-50 animate-fadeIn">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      onSelectLang?.(l.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-xs text-left flex items-center space-x-2 hover:bg-teal-50 transition-colors ${
                      lang === l.code ? 'font-bold text-teal-700 bg-teal-50/70' : ''
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

