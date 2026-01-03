
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="whatsapp-teal text-white py-3 md:py-4 px-4 md:px-6 shadow-md flex items-center justify-center space-x-3 sticky top-0 z-40">
      <i className="fa-brands fa-whatsapp text-2xl md:text-3xl"></i>
      <h1 className="text-lg md:text-xl font-bold tracking-tight">QuickChat Finder</h1>
    </header>
  );
};

export default Header;
