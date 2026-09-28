import React, { useState } from 'react';
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

    window.open(whatsappUrl, '_blank');
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
      className={`rounded-2xl transition-all duration-300 p-4 md:p-5 mb-6 border ${
        sharesCount >= 3
          ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
          : isHighlighted
          ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-300/60 shadow-md'
          : 'bg-zinc-50/80 border-zinc-200 shadow-xs'
      }`}
    >
      {/* Header Info - Clean unboxed text */}
      <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 mb-2">
        <span className="flex items-center space-x-1.5">
          <i className="fa-brands fa-whatsapp text-emerald-600 text-sm"></i>
          <span>{sharesCount >= 3 ? t.congratsTitle : t.title}</span>
        </span>
        <span className="text-[11px] font-mono text-zinc-500">
          {sharesCount}/3 {t.groupLabel}s
        </span>
      </div>

      <p className="text-xs text-zinc-600 mb-3 leading-relaxed">
        {sharesCount >= 3
          ? t.congratsDesc.replace('{name}', targetName)
          : t.description}
      </p>

      {/* Minimalist 3-Step Segmented Progress */}
      <div className="space-y-2 mb-4">
        <div className="grid grid-cols-3 gap-1.5">
          {[1, 2, 3].map((stepNum) => {
            const isCompleted = sharesCount >= stepNum;
            const isCurrent = sharesCount === stepNum - 1;

            return (
              <div
                key={stepNum}
                className={`py-1.5 px-2 rounded-lg text-center transition-all text-[11px] font-medium border ${
                  isCompleted
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : isCurrent
                    ? 'bg-white border-zinc-300 text-zinc-900 shadow-xs'
                    : 'bg-zinc-100/60 border-zinc-200/60 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-center space-x-1">
                  <i
                    className={`fa-solid text-[9px] ${
                      isCompleted
                        ? 'fa-check text-emerald-600'
                        : isCurrent
                        ? 'fa-circle-dot text-emerald-600 animate-pulse'
                        : 'fa-lock text-zinc-300'
                    }`}
                  ></i>
                  <span className="text-[10px]">
                    Step {stepNum}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slender Progress Line */}
        <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Share Toast Confirmation */}
      {justShared && sharesCount < 3 && (
        <div className="bg-emerald-100/80 border border-emerald-300 text-emerald-900 py-1.5 px-3 rounded-lg text-xs font-medium mb-3 flex items-center space-x-2 animate-fadeIn">
          <i className="fa-solid fa-check text-emerald-600 text-xs"></i>
          <span>
            {sharesCount === 1
              ? t.step1Done
              : sharesCount === 2
              ? t.step2Done
              : t.step3Done}
          </span>
        </div>
      )}

      {/* Action Controls */}
      {sharesCount < 3 ? (
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleShareClick}
            className="w-full whatsapp-green text-white font-bold py-3 px-4 rounded-xl shadow-xs hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 text-sm"
          >
            <i className="fa-brands fa-whatsapp text-lg"></i>
            <span>
              {sharesCount === 0
                ? t.shareBtn
                : sharesCount === 1
                ? t.shareBtnNext
                : t.shareBtnFinal}
            </span>
          </button>

          <div className="flex items-center justify-center space-x-2 pt-1 text-[11px] text-zinc-500">
            <span>Or copy link:</span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="text-emerald-700 font-semibold hover:underline flex items-center space-x-1"
            >
              <i className={`fa-solid ${copied ? 'fa-check text-emerald-600' : 'fa-copy'}`}></i>
              <span>{copied ? t.linkCopied : t.copyLink}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-600 text-white py-2.5 px-3.5 rounded-xl shadow-xs text-center flex items-center justify-center space-x-2 animate-fadeIn text-xs font-bold">
          <i className="fa-solid fa-circle-check text-sm text-white"></i>
          <span>{t.unlockedBtn}</span>
        </div>
      )}
    </div>
  );
};

export default WhatsAppShareGate;
