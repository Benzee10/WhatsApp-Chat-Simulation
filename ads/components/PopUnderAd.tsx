/**
 * PopUnderAd — Fires a pop-under ad.
 *
 * Two modes:
 * 1) `script` provided: extracts the external script `src` and loads it properly.
 * 2) `url` provided: opens `url` in a new window and immediately blurs it
 *    (classic pop-under behaviour; may be blocked by browsers).
 *
 * Config fields used: url, script, delay
 */
import React, { useEffect, useRef } from 'react';
import { PopUnderAd as PopUnderAdConfig } from '../types';

/** Extract a src URL from a <script src="..."> tag string */
const extractScriptSrc = (script: string): string | null => {
  const match = script.match(/src\s*=\s*["']([^"']+)["']/i);
  return match ? match[1] : null;
};

interface PopUnderAdProps {
  ad: PopUnderAdConfig;
}

const PopUnderAd: React.FC<PopUnderAdProps> = ({ ad }) => {
  const firedRef = useRef(false);

  const firePopUnder = () => {
    if (firedRef.current) return;
    firedRef.current = true;

    // Option 1: load the network-provided external script by src
    const src = ad.script ? extractScriptSrc(ad.script) : null;
    if (src) {
      try {
        const scriptEl = document.createElement('script');
        scriptEl.src = src;
        scriptEl.async = true;
        scriptEl.crossOrigin = 'anonymous';
        scriptEl.onerror = () => {
          // Script failed to load — silently ignore
        };
        document.head.appendChild(scriptEl);
      } catch {
        // ignore injection errors
      }
      return;
    }

    // Option 2: classic window.open pop-under (fallback when only url is set)
    if (ad.url) {
      try {
        const pop = window.open(ad.url, '_blank', 'noopener');
        if (pop) {
          pop.blur();
          window.focus();
        }
      } catch {
        // pop-ups blocked — nothing to do
      }
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
