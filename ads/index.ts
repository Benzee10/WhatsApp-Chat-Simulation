/**
 * QuickChat Ads - Public API
 *
 * Paste your ad codes in ads/config.ts (the ADS array).
 * Import AdManager into any view to render enabled ads for a placement:
 *
 *   import { AdManager } from '../ads';
 *   <AdManager placement="result" />
 */

// Values (config + components)
export {
  ADS,
  getAdsByPlacement,
  getGlobalAds,
  canShowAd,
  recordAdImpression,
  isDirectLink,
  isPopUnder,
  isBanner,
  isSocialBar,
} from './config';
export { default as AdManager } from './components/AdManager';

// Types
export type {
  AdConfig,
  AdNetwork,
  AdType,
  AdPlacement,
  BaseAd,
  DirectLinkAd,
  PopUnderAd,
  BannerAd,
  SocialBarAd,
} from './types';

// Individual ad components (import from './ads/components' if needed directly)
export { default as BannerAdComponent } from './components/BannerAd';
export { default as DirectLinkAdComponent } from './components/DirectLinkAd';
export { default as PopUnderAdComponent } from './components/PopUnderAd';
export { default as SocialBarAdComponent } from './components/SocialBarAd';
