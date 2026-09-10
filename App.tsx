
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingView from './components/LandingView';
import QuizView from './components/QuizView';
import ScanningView from './components/ScanningView';
import ResultView from './components/ResultView';
import RecentActivity from './components/RecentActivity';
import GroupNotification from './components/GroupNotification';
import { COUNTRIES } from './constants';
import { SupportedLanguage, detectLanguage } from './translations';

type AppStep = 'landing' | 'quiz' | 'scanning' | 'result';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedPreference, setSelectedPreference] = useState('text');
  const [detectedCity, setDetectedCity] = useState<string | undefined>(undefined);
  const [lang, setLang] = useState<SupportedLanguage>(() => detectLanguage());
  const [userSelectedLangManually, setUserSelectedLangManually] = useState(false);

  const handleStartSearch = (country: string, preference: string, city?: string) => {
    setSelectedCountry(country);
    setSelectedPreference(preference);
    setDetectedCity(city);
    setStep('quiz');
  };

  const handleQuizComplete = () => {
    setStep('scanning');
  };

  const handleScanComplete = () => {
    setStep('result');
  };

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLang(newLang);
    setUserSelectedLangManually(true);
  };

  const countryData = COUNTRIES.find(c => c.code === selectedCountry);
  const activeCity = detectedCity || countryData?.city || 'London';

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <Header 
        city={activeCity} 
        lang={lang} 
        onSelectLang={handleLanguageChange} 
      />
      
      <main className="flex-grow flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md mx-auto">
          {step === 'landing' && (
            <LandingView 
              onStart={handleStartSearch} 
              onLocationDetected={(city, country) => {
                setDetectedCity(city);
                setSelectedCountry(country);
                if (!userSelectedLangManually) {
                  const detected = detectLanguage(country);
                  setLang(detected);
                }
              }}
              lang={lang}
            />
          )}

          {step === 'quiz' && (
            <QuizView onComplete={handleQuizComplete} lang={lang} />
          )}
          
          {step === 'scanning' && (
            <ScanningView onComplete={handleScanComplete} city={detectedCity} lang={lang} />
          )}
          
          {step === 'result' && (
            <ResultView 
              country={selectedCountry} 
              preference={selectedPreference}
              detectedCity={detectedCity}
              lang={lang}
            />
          )}
        </div>
      </main>

      {/* Social Proof Toasts */}
      <RecentActivity />
      
      {/* New Group Notification */}
      <GroupNotification />

      {/* Sticky Telegram Button - Right Side and Raised above the group notification */}
      <a 
        href="https://t.me/xxx_pulse" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-32 right-4 md:bottom-36 md:right-6 z-50 bg-[#0088cc] text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center text-xl md:text-2xl transition-all duration-300 hover:scale-110 active:scale-95 group overflow-hidden"
        title="Join our Telegram"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <i className="fa-brands fa-telegram animate-bounce-subtle"></i>
        <div className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 flex h-3.5 w-3.5 md:h-4 md:w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 md:h-4 md:w-4 bg-red-500"></span>
        </div>
      </a>

      <Footer />
    </div>
  );
};

export default App;
