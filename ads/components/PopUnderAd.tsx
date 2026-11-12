/**
 * PopUnderAd — Fires a pop-under ad.
 *
 * Two modes:
 * 1) `script` provided: injects the network's pop-under script as a <script> tag.
 * 2) `url` provided: opens `url` in a new window and immediately blurs it
 *    (classic pop-under behaviour; may be blocked by browsers).
 *
 * Config fields used: url, script, delay
 */
import React, { useEffect, useRef } from 'react';
import { PopUnderAd as PopUnderAdConfig } from '../types';

interface PopUnderAdProps {
  ad: PopUnderAdConfig;
}

const PopUnderAd: React.FC<PopUnderAdProps> = ({ ad }) => {
  const firedRef = useRef(false);

  const firePopUnder = () => {
    if (firedRef.current) return;
    firedRef.current = true;

    // Option 1: run the network-provided script
    if (ad.script && ad.script.trim()) {
      try {
        const scriptEl = document.createElement('script');
        scriptEl.textContent = ad.script;
        scriptEl.async = true;
        document.head.appendChild(scriptEl);
      } catch {
        // ignore injection errors
      }
      return;
    }

    // Option 2: classic window.open pop-under
    try {
      const pop = window.open(ad.url, '_blank', 'noopener');
      if (pop) {
        pop.blur();
        window.focus();
      }
    } catch {
      // pop-ups blocked — nothing to do
    }
  };

  useEffect(() => {
    if (ad.delay && ad.delay > 0) {
      const timer = setTimeout(firePopUnder, ad.delay);
      return () => clearTimeout(timer);
    }
    firePopUnder();
  }, [ad.url, ad.script, ad.delay]);

  return null;
};

export default PopUnderAd;
