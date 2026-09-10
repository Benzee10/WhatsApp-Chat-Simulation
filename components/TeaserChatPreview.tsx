import React, { useState, useEffect } from 'react';
import { SupportedLanguage, TRANSLATIONS } from '../translations';

interface TeaserChatPreviewProps {
  name: string;
  avatar: string;
  city: string;
  preference: string;
  onUnlock: () => void;
  lang?: SupportedLanguage;
  isUnlocked?: boolean;
}

const TeaserChatPreview: React.FC<TeaserChatPreviewProps> = ({
  name,
  avatar,
  city,
  preference,
  onUnlock,
  lang = 'en',
  isUnlocked = false
}) => {
  const [showTyping, setShowTyping] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    // Stage 1: Display message 1, then start typing after 800ms
    const typingTimer = setTimeout(() => {
      setShowTyping(true);
    }, 800);

    // Stage 2: Typing finishes after 2.8s total, showing second message with voice note & blurred photo
    const secondMessageTimer = setTimeout(() => {
      setShowTyping(false);
      setShowSecondMessage(true);
    }, 3200);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(secondMessageTimer);
    };
  }, []);

  const handlePlayVoiceOrMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingVoice(true);
    // Instant feedback then trigger unlock action
    setTimeout(() => {
      onUnlock();
    }, 300);
  };

  const getFirstMessageText = () => {
    if (preference === 'video') {
      return (t.teaser?.firstMsgVideo || `Hey! Just saw your profile near {city} 🥰 Are you free for a quick video call?`).replace('{city}', city);
    }
    if (preference === 'voice') {
      return (t.teaser?.firstMsgVoice || `Hey! So glad we matched near {city} 💕 Sent you a voice message below!`).replace('{city}', city);
    }
    return (t.teaser?.firstMsgText || `Hey there! Finally someone active near {city} 😉 Are you free to chat right now?`).replace('{city}', city);
  };

  return (
    <div className="mb-6 rounded-2xl overflow-hidden border border-[#e2d9cd] shadow-md bg-[#efeae2]">
      {/* WhatsApp Mini Header */}
      <div className="bg-[#075e54] text-white px-3.5 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <img
              src={avatar}
              alt={name}
              className="w-8 h-8 rounded-full object-cover border border-white/50"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25d366] rounded-full border border-white"></span>
          </div>
          <div>
            <div className="text-xs font-bold leading-tight flex items-center space-x-1">
              <span>{name}</span>
              <i className="fa-solid fa-circle-check text-[#34b7f1] text-[10px]"></i>
            </div>
            <div className="text-[10px] text-teal-100/90 leading-tight">
              {showTyping ? (
                <span className="text-[#25d366] font-semibold animate-pulse">{t.teaser?.typing || 'typing...'}</span>
              ) : (
                <span>{t.teaser?.onlineStatus || 'online • WhatsApp active'}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-white/80 text-xs">
          <button 
            type="button" 
            onClick={onUnlock} 
            title="Video Call" 
            className="hover:text-white hover:scale-110 active:scale-95 transition-all"
          >
            <i className="fa-solid fa-video"></i>
          </button>
          <button 
            type="button" 
            onClick={onUnlock} 
            title="Phone Call" 
            className="hover:text-white hover:scale-110 active:scale-95 transition-all"
          >
            <i className="fa-solid fa-phone"></i>
          </button>
        </div>
      </div>

      {/* Chat Canvas */}
      <div 
        className="p-3 space-y-2.5 text-xs text-gray-800"
        style={{
          backgroundImage: `radial-gradient(#dfd6c7 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
          backgroundColor: '#efeae2'
        }}
      >
        {/* Date / Security Badge */}
        <div className="flex justify-center">
          <span className="bg-[#fcf5eb] text-gray-500 text-[10px] px-2.5 py-0.5 rounded-full shadow-xs border border-amber-100 font-medium">
            <i className="fa-solid fa-lock text-[9px] mr-1 text-[#075e54]"></i>
            {t.teaser?.encryptedNotice || 'End-to-end encrypted'}
          </span>
        </div>

        {/* Message 1: Text Greeting */}
        <div className="flex flex-col items-start animate-fadeIn">
          <div className="bg-white rounded-2xl rounded-tl-xs px-3 py-2 shadow-xs max-w-[88%] border border-gray-100 relative">
            <p className="text-gray-800 text-xs leading-relaxed">
              {getFirstMessageText()}
            </p>
            <div className="flex items-center justify-end space-x-1 mt-1 text-[9px] text-gray-400">
              <span>{t.result?.justNow || 'Just now'}</span>
              <span className="text-[#34b7f1] font-bold">✓✓</span>
            </div>
          </div>
        </div>

        {/* Typing Indicator Bubble */}
        {showTyping && (
          <div className="flex items-center animate-fadeIn">
            <div className="bg-white rounded-2xl rounded-tl-xs px-3.5 py-2 shadow-xs border border-gray-100 flex items-center space-x-1.5">
              <span className="text-[10px] text-teal-600 font-semibold mr-1">{t.teaser?.typing || 'typing'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block typing-dot-1"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block typing-dot-2"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block typing-dot-3"></span>
            </div>
          </div>
        )}

        {/* Message 2: Voice Note + Blurred Photo + Unlock Prompt */}
        {showSecondMessage && (
          <div className="flex flex-col items-start space-y-2 animate-bounceIn max-w-[92%]">
            <div className="bg-white rounded-2xl rounded-tl-xs p-3 shadow-md border border-teal-100 w-full">
              
              {/* WhatsApp Voice Note Bar */}
              <div 
                onClick={handlePlayVoiceOrMedia}
                className="bg-[#f0f2f5] hover:bg-[#e4e6eb] rounded-xl p-2.5 flex items-center space-x-3 cursor-pointer transition-all border border-gray-200 group"
              >
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-[#25d366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 active:scale-95 transition-all"
                >
                  <i className={`fa-solid ${isPlayingVoice ? 'fa-spinner fa-spin' : 'fa-play'} text-sm ml-0.5`}></i>
                </button>

                <div className="flex-1 min-w-0">
                  {/* Audio Waveform Bars */}
                  <div className="flex items-center space-x-0.5 h-6">
                    {[40, 70, 30, 90, 60, 85, 45, 100, 75, 50, 95, 65, 80, 40, 85, 55, 90, 70, 40, 60].map((h, i) => (
                      <span
                        key={i}
                        className={`w-1 rounded-full transition-all duration-300 ${
                          i < 7 ? 'bg-[#25d366]' : 'bg-gray-300'
                        } ${isPlayingVoice ? 'animate-pulse' : ''}`}
                        style={{ height: `${h}%` }}
                      ></span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-gray-500 font-medium mt-1">
                    <span className="text-[#075e54] font-bold flex items-center">
                      <i className="fa-solid fa-microphone text-[9px] mr-1 text-[#25d366]"></i>
                      0:14
                    </span>
                    <span className="text-[9px] text-teal-700 font-semibold bg-teal-50 px-1.5 py-0.2 rounded">
                      {t.teaser?.tapToListen || 'Tap to Listen'}
                    </span>
                  </div>
                </div>

                <div className="relative shrink-0">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-7 h-7 rounded-full object-cover border border-teal-300"
                  />
                  <i className="fa-solid fa-microphone text-[8px] text-[#25d366] absolute -bottom-1 -right-1 bg-white rounded-full p-0.5"></i>
                </div>
              </div>

              {/* Blurred Photo Preview */}
              <div 
                onClick={handlePlayVoiceOrMedia}
                className="mt-2.5 relative rounded-xl overflow-hidden cursor-pointer border border-gray-200 group"
              >
                <div className="relative h-28 w-full bg-gray-200 overflow-hidden">
                  <img
                    src={avatar}
                    alt="Private preview"
                    className="w-full h-full object-cover filter blur-md scale-110 group-hover:scale-115 group-hover:blur-sm transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-2 text-center">
                    <div className={`w-9 h-9 rounded-full ${isUnlocked ? 'bg-green-500/80' : 'bg-white/25'} backdrop-blur-md flex items-center justify-center mb-1 group-hover:scale-110 transition-transform`}>
                      <i className={`fa-solid ${isUnlocked ? 'fa-lock-open text-white' : 'fa-lock text-white'} text-sm`}></i>
                    </div>
                    <span className="font-bold text-xs tracking-tight">
                      {isUnlocked ? '✓ Photo Unlocked' : (t.teaser?.privatePhoto || '1 Private Photo')}
                    </span>
                    <span className="text-[10px] text-teal-200 mt-0.5 font-medium">
                      {isUnlocked ? 'Tap to view full media' : (t.teaser?.viewOnce || 'View Once • Tap to reveal')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Unlock Action Button */}
              <button
                type="button"
                onClick={handlePlayVoiceOrMedia}
                className={`mt-2.5 w-full ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-emerald-600 to-[#25d366]'
                    : 'bg-gradient-to-r from-[#128c7e] to-[#25d366]'
                } hover:brightness-105 active:scale-95 text-white font-bold py-2 px-3 rounded-xl shadow-sm text-xs flex items-center justify-center space-x-2 transition-all`}
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
                <span>
                  {isUnlocked ? '✓ Start WhatsApp Chat' : (t.teaser?.unlockFullChat || 'Unlock full chat on WhatsApp')}
                </span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </button>

              <div className="flex items-center justify-end space-x-1 mt-1.5 text-[9px] text-gray-400">
                <span>{t.result?.justNow || 'Just now'}</span>
                <span className="text-[#34b7f1] font-bold">✓✓</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeaserChatPreview;
