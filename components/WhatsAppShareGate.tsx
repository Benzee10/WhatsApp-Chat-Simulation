import React, { useState, useEffect } from 'react';
import { SupportedLanguage, TRANSLATIONS } from '../translations';

interface WhatsAppShareGateProps {
  sharesCount: number;
  onShare: () => void;
  lang?: SupportedLanguage;
  targetName?: string;
  isHighlighted?: boolean;
}

const WhatsAppShareGate: React.FC<WhatsAppShareGateProps> = ({
  sharesCount,
  onShare,
  lang = 'en',
  targetName = 'your match',
  isHighlighted = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [justShared, setJustShared] = useState(false);
  const t = TRANSLATIONS[lang]?.shareGate || TRANSLATIONS.en.shareGate;

  const progressPercent = Math.min(100, Math.round((sharesCount / 3) * 100));
  const remaining = Math.max(0, 3 - sharesCount);

  // Derive the shareable URL
  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href.split('#')[0];
    }
    return 'https://ais-pre-su3f36cj6abbj5dwkflrgk-146266919693.europe-west3.run.app';
  };

  const handleShareClick = () => {
    const shareUrl = getShareUrl();
    const message = t.viralMessage.replace('{link}', shareUrl);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in new window/tab
    window.open(whatsappUrl, '_blank');

    // Trigger state change
    setJustShared(true);
    onShare();

    setTimeout(() => {
      setJustShared(false);
    }, 4000);
  };

  const handleCopyLink = () => {
    const shareUrl = getShareUrl();
    navigator.clipboard?.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div
      id="whatsapp-share-gate"
      className={`rounded-2xl transition-all duration-300 p-5 md:p-6 mb-6 border ${
        sharesCount >= 3
          ? 'bg-gradient-to-br from-teal-900/10 via-green-50 to-teal-50 border-teal-300 shadow-md'
          : isHighlighted
          ? 'bg-amber-50/80 border-amber-400 shadow-xl ring-4 ring-amber-300/50 scale-[1.01]'
          : 'bg-gradient-to-b from-gray-50 to-emerald-50/30 border-emerald-200 shadow-sm'
      }`}
    >
      {/* Header Tag */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center space-x-1 ${
            sharesCount >= 3
              ? 'bg-teal-600 text-white shadow-xs'
              : 'bg-amber-500 text-white shadow-xs animate-pulse'
          }`}
        >
          <i
            className={`fa-solid ${
              sharesCount >= 3 ? 'fa-circle-check' : 'fa-triangle-exclamation'
            } mr-1 text-[11px]`}
          ></i>
          <span>{sharesCount >= 3 ? t.congratsTitle : t.badge}</span>
        </span>
        <span className="text-xs font-black text-gray-700">
          {sharesCount}/3 {t.groupLabel}s
        </span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="mb-4">
        <h3 className="text-base md:text-lg font-black text-gray-900 leading-snug flex items-center">
          <i className="fa-brands fa-whatsapp text-green-600 text-xl mr-2"></i>
          {sharesCount >= 3 ? t.congratsTitle : t.title}
        </h3>
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
          {sharesCount >= 3
            ? t.congratsDesc.replace('{name}', targetName)
            : t.description}
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-gray-200/80 mb-4 shadow-xs">
        <div className="flex justify-between items-center text-xs font-bold mb-1.5">
          <span className="text-gray-700 flex items-center">
            <i className="fa-solid fa-chart-pie text-teal-600 mr-1.5 text-[11px]"></i>
            {t.progressLabel}
          </span>
          <span
            className={`font-black ${
              sharesCount >= 3 ? 'text-teal-600' : 'text-amber-600'
            }`}
          >
            {progressPercent}%
          </span>
        </div>

        {/* Bar */}
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden p-0.5 relative">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end ${
              sharesCount >= 3
                ? 'bg-gradient-to-r from-teal-500 to-green-500'
                : 'bg-gradient-to-r from-amber-500 via-teal-500 to-[#25d366]'
            }`}
            style={{ width: `${progressPercent}%` }}
          >
            {progressPercent > 10 && (
              <span className="w-2 h-2 rounded-full bg-white/70 mr-0.5 animate-pulse"></span>
            )}
          </div>
        </div>

        {/* 3 Step Badges */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-gray-100">
          {[1, 2, 3].map((stepNum) => {
            const isCompleted = sharesCount >= stepNum;
            const isCurrent = sharesCount === stepNum - 1;

            return (
              <div
                key={stepNum}
                className={`p-2 rounded-lg text-center transition-all ${
                  isCompleted
                    ? 'bg-teal-50 border border-teal-200 text-teal-800'
                    : isCurrent
                    ? 'bg-amber-50 border border-amber-300 text-amber-900 shadow-xs'
                    : 'bg-gray-50/70 border border-gray-200 text-gray-400 opacity-70'
                }`}
              >
                <div className="flex items-center justify-center space-x-1 mb-0.5">
                  <i
                    className={`fa-solid text-[10px] ${
                      isCompleted
                        ? 'fa-circle-check text-teal-600'
                        : isCurrent
                        ? 'fa-spinner fa-spin text-amber-600'
                        : 'fa-lock text-gray-400'
                    }`}
                  ></i>
                  <span className="text-[10px] font-bold">
                    {t.groupLabel} #{stepNum}
                  </span>
                </div>
                <span className="text-[9px] block font-medium">
                  {isCompleted
                    ? '✓ Verified'
                    : isCurrent
                    ? 'Next Step'
                    : 'Locked'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Feedback Toast for recent share */}
      {justShared && sharesCount < 3 && (
        <div className="bg-teal-100/90 border border-teal-300 text-teal-900 p-2.5 rounded-xl text-xs font-semibold mb-3 flex items-center space-x-2 animate-fadeIn">
          <i className="fa-solid fa-circle-check text-teal-600 text-sm"></i>
          <span>
            {sharesCount === 1
              ? t.step1Done
              : sharesCount === 2
              ? t.step2Done
              : t.step3Done}
          </span>
        </div>
      )}

      {/* Main Action Button */}
      {sharesCount < 3 ? (
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleShareClick}
            className="w-full whatsapp-green text-white font-black py-3.5 px-4 rounded-xl shadow-md hover:brightness-105 active:scale-[0.98] transition-all flex flex-col items-center justify-center space-y-0.5 group"
          >
            <div className="flex items-center space-x-2 text-sm md:text-base">
              <i className="fa-brands fa-whatsapp text-xl group-hover:scale-110 transition-transform"></i>
              <span>
                {sharesCount === 0
                  ? t.shareBtn
                  : sharesCount === 1
                  ? t.shareBtnNext
                  : t.shareBtnFinal}
              </span>
            </div>
            <span className="text-[10px] text-teal-100 font-medium">
              Tap to open WhatsApp & select a group
            </span>
          </button>

          {/* Fallback Copy Link Option */}
          <div className="flex items-center justify-center space-x-2 pt-1 text-[11px] text-gray-500">
            <span>Or copy invite link:</span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="text-teal-700 font-bold hover:underline flex items-center space-x-1"
            >
              <i className={`fa-solid ${copied ? 'fa-check text-green-600' : 'fa-copy'}`}></i>
              <span>{copied ? t.linkCopied : t.copyLink}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-teal-600 text-white p-3.5 rounded-xl shadow-xs text-center flex items-center justify-center space-x-2 animate-fadeIn">
          <i className="fa-solid fa-circle-check text-lg text-yellow-300"></i>
          <span className="text-xs md:text-sm font-black tracking-wide">
            {t.unlockedBtn}
          </span>
        </div>
      )}
    </div>
  );
};

export default WhatsAppShareGate;
