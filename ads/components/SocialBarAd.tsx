/**
 * SocialBarAd — Renders a sticky social-bar ad at the top or bottom.
 *
 * Two modes:
 * 1) `script` provided: extracts the external script `src` and loads it properly.
 * 2) No script: renders a simple sticky placeholder bar you can style.
 *
 * Config fields used: position, script
 */
import React, { useEffect, useRef } from 'react';
import { SocialBarAd as SocialBarAdConfig } from '../types';

/** Extract a src URL from a <script src="..."> tag string */
const extractScriptSrc = (script: string): string | null => {
  const match = script.match(/src\s*=\s*["']([^"']+)["']/i);
  return match ? match[1] : null;
};

interface SocialBarAdProps {
  ad: SocialBarAdConfig;
}

const SocialBarAd: React.FC<SocialBarAdProps> = ({ ad }) => {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (injectedRef.current) return;

    const src = ad.script ? extractScriptSrc(ad.script) : null;
    if (!src) return;

    injectedRef.current = true;
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
  }, [ad.script]);

  // Fallback placeholder bar when no script is provided
  if (!ad.script || !extractScriptSrc(ad.script)) {
    return (
      <div
        className={`fixed left-0 right-0 ${
          ad.position === 'top' ? 'top-0' : 'bottom-0'
        } z-50 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-white bg-zinc-900/90 backdrop-blur border border-zinc-700/50 shadow-xl rounded-full mx-4 md:mx-6`}
      >
        <span className="flex items-center gap-1 text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          Sponsored
        </span>
        <a
          href={ad.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-green-300 transition-colors"
        >
          Visit offer
        </a>
        <button
          onClick={(e) => {
            e.preventDefault();
            // no-op placeholder
          }}
          className="ml-2 text-zinc-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    );
  }

  // When a script is provided the network renders its own UI; render nothing.
  return null;
};

export default SocialBarAd;
