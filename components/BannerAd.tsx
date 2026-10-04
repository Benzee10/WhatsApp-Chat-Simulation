import React, { useEffect, useRef, useState } from 'react';

const BannerAd: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.offsetWidth;
        if (availableWidth > 0 && availableWidth < 728) {
          setScale(availableWidth / 728);
        } else {
          setScale(1);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full my-4 flex flex-col items-center justify-center overflow-hidden min-h-[90px]"
    >
      <div 
        style={{ 
          width: '100%', 
          height: `${Math.max(45, Math.round(90 * scale))}px`,
          position: 'relative'
        }}
        className="flex items-center justify-center"
      >
        <div 
          style={{
            width: '728px',
            height: '90px',
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            position: 'absolute',
            top: 0
          }}
        >
          <iframe
            title="Sponsored Banner"
            width="728"
            height="90"
            style={{ border: 0, overflow: 'hidden', backgroundColor: 'transparent' }}
            scrolling="no"
            srcDoc={`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <script>
      atOptions = {
        'key' : '21fc2a87277a3f1a11b4bae6ebe8e4ae',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    </script>
    <script src="https://boutiquehysteria.com/21fc2a87277a3f1a11b4bae6ebe8e4ae/invoke.js"></script>
  </body>
</html>`}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerAd;
