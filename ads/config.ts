/**
 * QuickChat Ads - Configuration
 * ============================================================================
 * PASTE YOUR AD CODES HERE
 * ============================================================================
 *
 * Each entry in the ADS array is one ad. Edit the fields, set `enabled: true`,
 * and paste your network-provided URLs / scripts where indicated.
 *
 * Supported types: 'direct-link' | 'pop-under' | 'banner' | 'social-bar'
 * Supported networks: 'adsterra' | 'monetag' | 'admaven' | 'popads' |
 *                     'propeller' | 'custom' | 'other'
 * Supported placements: 'result' | 'landing' | 'scanning' | 'global'
 *
 * All examples below are disabled (enabled: false) by default so nothing
 * shows until you explicitly turn them on.
 * ============================================================================
 */

import {
  AdConfig,
  AdPlacement,
  isDirectLink,
  isPopUnder,
  isBanner,
  isSocialBar,
} from './types';

export const ADS: AdConfig[] = [
  // -------------------------------------------------------------------------
  // DIRECT LINK — Adsterra (example)
  // -------------------------------------------------------------------------
  // Paste your Adsterra direct-link URL in `url`.
  // Set openOnLoad: true to open immediately when the page loads.
  {
    id: 'direct-link-adsterra',
    network: 'adsterra',
    type: 'direct-link',
    placement: 'result',
    enabled: false,
    label: 'Adsterra Direct Link (Result page)',
    url: 'https://html-starter-6nu.pages.dev',
    openOnLoad: false,
    maxPerDay: 1,
  },

  // -------------------------------------------------------------------------
  // DIRECT LINK — Monetag / custom (example)
  // -------------------------------------------------------------------------
  {
    id: 'direct-link-monetag',
    network: 'monetag',
    type: 'direct-link',
    placement: 'landing',
    enabled: false,
    label: 'Monetag Direct Link (Landing page)',
    url: 'https://your-monetag-direct-link.com',
    openOnLoad: false,
    maxPerDay: 1,
  },

  // -------------------------------------------------------------------------
  // POP-UNDER — Adsterra (example)
  // -------------------------------------------------------------------------
  // Paste your Adsterra pop-under URL in `url`.
  // Optionally paste the full network script in `script`.
  {
    id: 'pop-under-adsterra',
    network: 'adsterra',
    type: 'pop-under',
    placement: 'global',
    enabled: false,
    label: 'Adsterra Pop Under',
    url: 'https://your-adsterra-popunder.com',
    script: `
      // Paste Adsterra pop-under script here
      // Example:
      // (function() { ... })();
    `,
    delay: 1500,
    maxPerDay: 2,
  },

  // -------------------------------------------------------------------------
  // POP-UNDER — Monetag (example)
  // -------------------------------------------------------------------------
  {
    id: 'pop-under-monetag',
    network: 'monetag',
    type: 'pop-under',
    placement: 'global',
    enabled: false,
    label: 'Monetag Pop Under',
    url: 'https://your-monetag-popunder.com',
    script: `
      // Paste Monetag pop-under script here
    `,
    delay: 2000,
    maxPerDay: 2,
  },

  // -------------------------------------------------------------------------
  // POP-UNDER — PopAds / Propeller / custom (example)
  // -------------------------------------------------------------------------
  {
    id: 'pop-under-custom',
    network: 'custom',
    type: 'pop-under',
    placement: 'global',
    enabled: false,
    label: 'Custom Pop Under',
    url: 'https://your-custom-popunder.com',
    script: '',
    delay: 1000,
    maxPerDay: 3,
  },

  // -------------------------------------------------------------------------
  // BANNER — Result page (example)
  // -------------------------------------------------------------------------
  // Paste your banner image URL in `src` and the click-through URL in `link`.
  {
    id: 'banner-result',
    network: 'custom',
    type: 'banner',
    placement: 'result',
    enabled: false,
    label: 'Result Page Banner',
    src: 'https://example.com/banner-300x250.jpg',
    link: 'https://example.com',
    width: 300,
    height: 250,
    alt: 'Advertisement',
    maxPerDay: 0,
  },

  // -------------------------------------------------------------------------
  // BANNER — Landing page (example)
  // -------------------------------------------------------------------------
  {
    id: 'banner-landing',
    network: 'custom',
    type: 'banner',
    placement: 'landing',
    enabled: false,
    label: 'Landing Page Banner',
    src: 'https://example.com/banner-728x90.jpg',
    link: 'https://example.com',
    width: 728,
    height: 90,
    alt: 'Advertisement',
    maxPerDay: 0,
  },

  // -------------------------------------------------------------------------
  // SOCIAL BAR — Adsterra (example)
  // -------------------------------------------------------------------------
  // Paste your Adsterra social bar script in `script`.
  {
    id: 'social-bar-adsterra',
    network: 'adsterra',
    type: 'social-bar',
    placement: 'global',
    enabled: false,
    label: 'Adsterra Social Bar',
    position: 'bottom',
    script: `
      // Paste Adsterra social bar script here
    `,
    maxPerDay: 0,
  },

  // -------------------------------------------------------------------------
  // SOCIAL BAR — Ad Maven (example)
  // -------------------------------------------------------------------------
  // Paste your Ad Maven social bar script in `script`.
  {
    id: 'social-bar-admaven',
    network: 'admaven',
    type: 'social-bar',
    placement: 'global',
    enabled: false,
    label: 'Ad Maven Social Bar',
    position: 'bottom',
    script: `
      // Paste Ad Maven social bar script here
    `,
    maxPerDay: 0,
  },

  // -------------------------------------------------------------------------
  // ADD MORE ADS BELOW
  // -------------------------------------------------------------------------
  // Copy one of the blocks above, change the id, network, type, placement,
  // and paste your own url / script / src / link values.
  //
  // Example structure for a new network:
  // {
  //   id: 'my-new-ad',
  //   network: 'other',
  //   type: 'banner',          // or 'direct-link' | 'pop-under' | 'social-bar'
  //   placement: 'result',     // or 'landing' | 'scanning' | 'global'
  //   enabled: false,
  //   label: 'My New Ad Network',
  //   // type-specific fields go here
  //   maxPerDay: 0,
  // },
];

/**
 * Returns all enabled ads for a given placement.
 */
export const getAdsByPlacement = (placement: AdPlacement): AdConfig[] =>
  ADS.filter((ad) => ad.enabled && ad.placement === placement);

/**
 * Returns all enabled global ads (pop-unders, social bars, etc.).
 */
export const getGlobalAds = (): AdConfig[] =>
  ADS.filter((ad) => ad.enabled && ad.placement === 'global');

/**
 * Daily impression tracker (in-memory, resets on page reload).
 * Used to enforce maxPerDay caps.
 */
const dailyCounts = new Map<string, number>();

export const canShowAd = (adId: string, maxPerDay?: number): boolean => {
  if (!maxPerDay || maxPerDay <= 0) return true;
  const count = dailyCounts.get(adId) || 0;
  return count < maxPerDay;
};

export const recordAdImpression = (adId: string): void => {
  const count = dailyCounts.get(adId) || 0;
  dailyCounts.set(adId, count + 1);
};

export { isDirectLink, isPopUnder, isBanner, isSocialBar };

