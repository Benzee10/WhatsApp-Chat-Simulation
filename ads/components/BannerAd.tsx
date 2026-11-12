/**
 * BannerAd — Displays an image or iframe banner ad.
 *
 * Config fields used: src, link, width, height, alt
 */
import React from 'react';
import { BannerAd as BannerAdConfig } from '../types';

interface BannerAdProps {
  ad: BannerAdConfig;
}

const BannerAd: React.FC<BannerAdProps> = ({ ad }) => {
  return (
    <div className="flex flex-col items-center justify-center my-4">
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <img
          src={ad.src}
          alt={ad.alt || 'Advertisement'}
          width={ad.width}
          height={ad.height}
          className="max-w-full h-auto rounded-lg border border-zinc-200/60 shadow-sm"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </a>
      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
        Advertisement
      </p>
    </div>
  );
};

export default BannerAd;
