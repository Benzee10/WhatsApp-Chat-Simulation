
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingView from './components/LandingView';
import ScanningView from './components/ScanningView';
import ResultView from './components/ResultView';

type AppStep = 'landing' | 'scanning' | 'result';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedPreference, setSelectedPreference] = useState('text');

  const handleStartSearch = (country: string, preference: string) => {
    setSelectedCountry(country);
    setSelectedPreference(preference);
    setStep('scanning');
  };

  const handleScanComplete = () => {
    setStep('result');
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md mx-auto">
          {step === 'landing' && (
            <LandingView onStart={handleStartSearch} />
          )}
          
          {step === 'scanning' && (
            <ScanningView onComplete={handleScanComplete} />
          )}
          
          {step === 'result' && (
            <ResultView 
              country={selectedCountry} 
              preference={selectedPreference} 
            />
          )}
        </div>
      </main>

      {/* Sticky Telegram Button - Right Side and Raised */}
      <a 
        href="https://t.me/xxx_pulse" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50 bg-[#0088cc] text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center text-xl md:text-2xl transition-all duration-300 hover:scale-110 active:scale-95 group overflow-hidden"
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
