
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 md:py-8 px-4 md:px-6 text-center">
      <p className="text-gray-400 text-[9px] md:text-[10px] uppercase tracking-widest max-w-sm mx-auto leading-relaxed opacity-80">
        This service is for entertainment purposes only. No private data is stored or shared. 
        Connection is simulated for matchmaking. 18+ only. 
        <br className="hidden md:block" />
        <span className="block mt-1 md:inline md:mt-0 md:ml-1">
          &copy; {new Date().getFullYear()} QuickChat Finder. Not affiliated with WhatsApp Inc.
        </span>
      </p>
    </footer>
  );
};

export default Footer;
