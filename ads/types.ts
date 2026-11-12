/**
 * QuickChat Ads - Type Definitions
 *
 * This file defines the shape of every supported ad type.
 * Add new ad types here when integrating a new network/format.
 */

export type AdNetwork =
  | 'adsterra'
  | 'monetag'
  | 'admaven'
  | 'popads'
  | 'propeller'
  | 'custom'
  | 'other';

export type AdType = 'direct-link' | 'pop-under' | 'banner' | 'social-bar';

export type AdPlacement = 'result' | 'landing' | 'scanning' | 'global';

/** Shared fields every ad config has */
export interface BaseAd {
  /** Unique identifier for this ad entry */
  id: string;
  /** Ad network (used for labelling / debugging) */
  network: AdNetwork;
  /** Format of the ad */
  type: AdType;
  /** Where this ad should appear */
  placement: AdPlacement;
  /** Set false to disable without deleting the entry */
  enabled: boolean;
  /** Human-friendly name shown in code comments only */
  label?: string;
  /** How many times per day this ad may fire (0 = unlimited) */
  maxPerDay?: number;
}

/** Direct link: opens a destination URL in a new tab */
export interface DirectLinkAd extends BaseAd {
  type: 'direct-link';
  /** Destination URL */
  url: string;
  /** Open immediately when the placement mounts */
  openOnLoad?: boolean;
}

/** Pop-under: opens a destination behind the main window */
export interface PopUnderAd extends BaseAd {
  type: 'pop-under';
  /** Pop-under destination URL */
  url: string;
  /** Raw script snippet provided by the network (optional) */
  script?: string;
  /** Delay in ms before the pop-under fires */
  delay?: number;
}

/** Banner: image or iframe ad shown at a specific spot */
export interface BannerAd extends BaseAd {
  type: 'banner';
  /** Image URL or iframe src */
  src: string;
  /** Click-through URL */
  link: string;
  width: number;
  height: number;
  alt?: string;
}

/** Social bar: sticky top/bottom bar (Adsterra, Ad Maven, etc.) */
export interface SocialBarAd extends BaseAd {
  type: 'social-bar';
  /** 'top' or 'bottom' of the viewport */
  position: 'top' | 'bottom';
  /** Raw script snippet provided by the network (optional) */
  script?: string;
}

export type AdConfig = DirectLinkAd | PopUnderAd | BannerAd | SocialBarAd;

/** Filter helpers */
export const isDirectLink = (ad: AdConfig): ad is DirectLinkAd =>
  ad.type === 'direct-link';
export const isPopUnder = (ad: AdConfig): ad is PopUnderAd =>
  ad.type === 'pop-under';
export const isBanner = (ad: AdConfig): ad is BannerAd =>
  ad.type === 'banner';
export const isSocialBar = (ad: AdConfig): ad is SocialBarAd =>
  ad.type === 'social-bar';
