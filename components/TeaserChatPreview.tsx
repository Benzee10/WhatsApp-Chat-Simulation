import React, { useState, useEffect, useMemo } from 'react';
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

const ICE_BREAKERS: Record<SupportedLanguage, string[]> = {
  en: [
    "Hey! Just saw we matched near {city} 😉 Are you free to chat right now?",
    "Hey stranger! Finally someone active nearby 😊 What are you up to tonight?",
    "Hey there! Your profile caught my eye 👀 Are you free for a quick chat?",
    "Hey! Don't usually message first, but couldn't resist saying hi 👋 How's your day going?",
    "Hey! Just hopped on WhatsApp, glad we connected near {city} 🥰 Free to talk?",
    "Hey! Saw you were online near {city} 💕 What brings you here today?",
    "Hey there! Finally someone fun in {city} 😉 Let's see if we click!",
    "Hey! Just saw your match 💕 Free for a quick chat or voice note?",
    "Hey stranger! You seemed way too interesting to pass up 😉 How's your night going?",
    "Hey! Happy we matched 😊 Tell me what you're looking for on here..."
  ],
  es: [
    "¡Hola! Vi que hicimos match cerca de {city} 😉 ¿Tienes tiempo para hablar ahora?",
    "¡Hola! Por fin alguien activo por aquí 😊 ¿Qué haces hoy?",
    "¡Hola! Tu perfil me llamó la atención 👀 ¿Hablamos un rato?",
    "¡Hola! No suelo mandar mensaje primero, pero me pareciste genial 👋",
    "¡Hola! Qué bueno coincidir por {city} 🥰 ¿Estás libre para chatear?",
    "¡Hola! Vi que estás en línea por {city} 💕 ¿Qué tal tu día?"
  ],
  pt: [
    "Oi! Vi que demos match perto de {city} 😉 Tá livre pra conversar agora?",
    "Oi sumido(a)! Finalmente alguém ativo por perto 😊 O que tá fazendo hoje?",
    "Oi! Seu perfil me chamou atenção 👀 Bora trocar uma ideia?",
    "Oi! Não costumo mandar mensagem primeiro, mas adorei seu perfil 👋",
    "Oi! Que bom que conectamos perto de {city} 🥰 Tá por aí?",
    "Oi! Vi que você tá online por {city} 💕 Como tá seu dia?"
  ],
  fr: [
    "Coucou ! Je viens de voir qu'on a matché près de {city} 😉 Tu es dispo pour discuter ?",
    "Salut ! Enfin quelqu'un d'actif dans le coin 😊 Tu fais quoi de beau ?",
    "Coucou ! Ton profil m'a tapé dans l'œil 👀 Dispo pour discuter un peu ?",
    "Salut ! Je n'envoie pas souvent le premier message, mais j'ai craqué 👋",
    "Coucou ! Contente qu'on soit connectés près de {city} 🥰 Tu es là ?"
  ],
  de: [
    "Hey! Habe gerade gesehen, dass wir ein Match in der Nähe von {city} haben 😉 Hast du Zeit zu chatten?",
    "Hey! Endlich mal jemand Aktives hier in der Nähe 😊 Was machst du heute noch?",
    "Hey! Dein Profil ist mir direkt aufgefallen 👀 Lust auf einen kurzen Chat?",
    "Hey! Schreibe sonst nicht zuerst, aber musste einfach Hallo sagen 👋",
    "Hey! Schön, dass wir uns in der Nähe von {city} gefunden haben 🥰 Bist du online?"
  ],
  it: [
    "Ciao! Ho visto che siamo compatibili vicino a {city} 😉 Sei libero/a per chattare adesso?",
    "Ciao! Finalmente qualcuno di attivo qui vicino 😊 Cosa fai stasera?",
    "Ciao! Il tuo profilo mi ha colpito subito 👀 Ti va di fare due chiacchiere?",
    "Ciao! Di solito non scrivo per prima, ma non ho resistito 👋 Com'è andata la tua giornata?",
    "Ciao! Che bello esserci trovati vicino a {city} 🥰 Sei online?"
  ]
};

const TeaserChatPreview: React.FC<TeaserChatPreviewProps> = ({
  name,
  avatar,
  city,
  preference,
  onUnlock,
  lang = 'en',
  isUnlocked = true
}) => {
  const [showTyping, setShowTyping] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Random delay between 3 and 8 seconds (3000ms - 8000ms)
  const typingDuration = useMemo(() => {
    return Math.floor(Math.random() * 5000) + 3000;
  }, []);

  // Pick a random ice breaker message
  const iceBreakerText = useMemo(() => {
    const list = ICE_BREAKERS[lang] || ICE_BREAKERS.en;
    const template = list[Math.floor(Math.random() * list.length)];
    return template.replace('{city}', city || 'your area');
  }, [lang, city]);

  useEffect(() => {
    // Show typing right away, then deliver the ice breaker message 3-8 seconds later
    const timer = setTimeout(() => {
      setShowTyping(false);
      setShowMessage(true);
    }, typingDuration);

    return () => clearTimeout(timer);
  }, [typingDuration]);

  return (
    <div className="mb-6 rounded-2xl overflow-hidden border border-zinc-200/90 shadow-sm bg-[#efeae2]">
      {/* Minimalist WhatsApp Top Bar */}
      <div className="bg-[#075e54] text-white px-3.5 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/30 shrink-0">
            {/* Blurred mini profile picture */}
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover filter blur-[4px] scale-110"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#25d366] rounded-full border border-white"></span>
          </div>
          <div>
            <div className="text-xs font-semibold leading-tight flex items-center space-x-1">
              <span>{name}</span>
              <i className="fa-solid fa-circle-check text-[#34b7f1] text-[10px]"></i>
            </div>
            <div className="text-[10px] text-teal-100/80 leading-tight">
              {showTyping ? (
                <span className="text-[#25d366] font-medium animate-pulse">{t.teaser?.typing || 'typing...'}</span>
              ) : (
                <span>{t.teaser?.onlineStatus || 'online'}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-white/70 text-xs">
          <button 
            type="button" 
            onClick={onUnlock} 
            title="Video Call" 
            className="hover:text-white transition-colors"
          >
            <i className="fa-solid fa-video"></i>
          </button>
          <button 
            type="button" 
            onClick={onUnlock} 
            title="Voice Call" 
            className="hover:text-white transition-colors"
          >
            <i className="fa-solid fa-phone"></i>
          </button>
        </div>
      </div>

      {/* WhatsApp Message Canvas */}
      <div 
        className="p-3.5 space-y-2.5 text-xs text-zinc-800 min-h-[140px] flex flex-col justify-between"
        style={{
          backgroundImage: `radial-gradient(#dfd6c7 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
          backgroundColor: '#efeae2'
        }}
      >
        <div className="space-y-2.5">
          {/* Subtle Security / Encryption Notice */}
          <div className="flex justify-center">
            <span className="text-zinc-500 text-[10px] px-2 py-0.5 font-normal flex items-center space-x-1">
              <i className="fa-solid fa-lock text-[9px] text-zinc-400"></i>
              <span>{t.teaser?.encryptedNotice || 'End-to-end encrypted'}</span>
            </span>
          </div>

          {/* Typing Indicator Bubble (displayed for 3 to 8 seconds) */}
          {showTyping && (
            <div className="flex items-center animate-fadeIn pt-1">
              <div className="bg-white rounded-xl rounded-tl-xs px-3.5 py-2 shadow-xs border border-zinc-200/50 flex items-center space-x-2">
                <span className="text-[10px] text-zinc-400 font-medium">{t.teaser?.typing || 'typing'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block typing-dot-1"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block typing-dot-2"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block typing-dot-3"></span>
              </div>
            </div>
          )}

          {/* Random Ice Breaker Message (appears 3-8 seconds after typing) */}
          {showMessage && (
            <div className="animate-bounceIn">
              {/* Text Message Bubble */}
              <div 
                onClick={onUnlock}
                className="bg-white hover:bg-zinc-50 rounded-xl rounded-tl-xs px-3.5 py-2.5 shadow-xs max-w-[92%] border border-zinc-200/60 cursor-pointer transition-colors"
              >
                <p className="text-zinc-800 text-xs leading-relaxed font-normal">
                  {iceBreakerText}
                </p>
                <div className="flex items-center justify-end space-x-1 mt-1 text-[9px] text-zinc-400">
                  <span>{t.result?.justNow || 'Just now'}</span>
                  <span className="text-[#34b7f1] font-semibold">✓✓</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp Chat Input Bar (Click to Reply / Open Chat) */}
        <div 
          onClick={onUnlock}
          className="bg-white rounded-full px-3 py-1.5 flex items-center justify-between shadow-xs border border-zinc-200/70 cursor-pointer mt-3 group hover:border-emerald-400 transition-colors"
        >
          <div className="flex items-center space-x-2 text-zinc-400 text-xs">
            <i className="fa-regular fa-face-smile text-zinc-400 group-hover:text-emerald-500 transition-colors"></i>
            <span className="text-[11px] text-zinc-400 select-none">Reply to {name}...</span>
          </div>
          <div className="flex items-center space-x-2 text-zinc-400 text-xs">
            <i className="fa-solid fa-microphone text-zinc-400"></i>
            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <i className="fa-solid fa-paper-plane text-[9px] ml-0.5"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaserChatPreview;
