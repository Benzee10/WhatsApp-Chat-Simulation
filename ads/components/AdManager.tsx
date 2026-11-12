/**
 * AdManager — Renders all enabled ads for a given placement.
 *
 * Use this component wherever you want ads to appear:
 *   <AdManager placement="result" />
 *
 * Ad types handled per placement:
 *   - banner       → rendered inline
 *   - direct-link  → returned via render prop (parent controls trigger)
 *   - pop-under    → fires automatically on mount (global only)
 *   - social-bar   → renders sticky bar / injects script (global only)
 */
import React, { ReactNode } from 'react';
import {
  AdConfig,
  AdPlacement,
  isDirectLink,
  isBanner,
  isPopUnder,
  isSocialBar,
} from '../types';
import { getAdsByPlacement, canShowAd, recordAdImpression } from '../config';
import BannerAd from './BannerAd';
import PopUnderAd from './PopUnderAd';
import SocialBarAd from './SocialBarAd';

interface AdManagerProps {
  placement: AdPlacement;
  /** Optional render prop for direct-link ads so the parent can trigger them */
  renderDirectLink?: (ad: Extract<AdConfig, { type: 'direct-link' }>) => ReactNode;
}

const AdManager: React.FC<AdManagerProps> = ({
  placement,
  renderDirectLink,
}) => {
  const ads = getAdsByPlacement(placement);

  const banners = ads.filter(
    (ad): ad is Extract<AdConfig, { type: 'banner' }> =>
      ad.type === 'banner' && canShowAd(ad.id, ad.maxPerDay),
  );
  const popUnders = ads.filter(
    (ad): ad is Extract<AdConfig, { type: 'pop-under' }> =>
      ad.type === 'pop-under' && canShowAd(ad.id, ad.maxPerDay),
  );
  const socialBars = ads.filter(
    (ad): ad is Extract<AdConfig, { type: 'social-bar' }> =>
      ad.type === 'social-bar' && canShowAd(ad.id, ad.maxPerDay),
  );
  const directLinks = ads.filter(
    (ad): ad is Extract<AdConfig, { type: 'direct-link' }> =>
      ad.type === 'direct-link' && canShowAd(ad.id, ad.maxPerDay),
  );

  // Record impressions for non-interactive ad types
  banners.forEach((ad) => recordAdImpression(ad.id));
  popUnders.forEach((ad) => recordAdImpression(ad.id));
  socialBars.forEach((ad) => recordAdImpression(ad.id));

  return (
    <>
      {banners.map((ad) => (
        <BannerAd key={ad.id} ad={ad} />
      ))}

      {popUnders.map((ad) => (
        <PopUnderAd key={ad.id} ad={ad} />
      ))}

      {socialBars.map((ad) => (
        <SocialBarAd key={ad.id} ad={ad} />
      ))}

      {directLinks.map((ad) =>
        renderDirectLink ? renderDirectLink(ad) : null,
      )}
    </>
  );
};

export default AdManager;
