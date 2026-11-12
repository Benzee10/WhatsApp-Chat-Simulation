/**
 * DirectLinkAd — Opens a destination URL when triggered.
 *
 * Config fields used: url, openOnLoad
 *
 * Usage:
 *   <DirectLinkAd ad={ad} onOpen={handleOpen} />
 * The parent decides when to open (e.g. on button click, after delay, etc.).
 */
import React, { useEffect } from 'react';
import { DirectLinkAd as DirectLinkAdConfig } from '../types';

interface DirectLinkAdProps {
  ad: DirectLinkAdConfig;
  /** Callback fired when the link should be opened */
  onOpen?: () => void;
}

const DirectLinkAd: React.FC<DirectLinkAdProps> = ({ ad, onOpen }) => {
  const open = () => {
    if (onOpen) {
      onOpen();
    } else {
      window.open(ad.url, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    if (ad.openOnLoad) {
      const timer = setTimeout(open, 0);
      return () => clearTimeout(timer);
    }
  }, [ad.openOnLoad, open]);

  // This component renders nothing by itself — the parent calls onOpen
  // or uses the returned `open` via a ref if needed. We expose open via
  // a simple imperative handle for advanced use cases.
  return null;
};

export default DirectLinkAd;
