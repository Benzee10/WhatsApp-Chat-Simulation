export type SupportedLanguage = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'it';

export interface Translations {
  header: {
    brandName: string;
    live: string;
    peopleOnline: string;
    near: string;
  };
  landing: {
    title: string;
    subtitleWithCity: string;
    subtitleGeneral: string;
    selectCountry: string;
    nearCity: string;
    lookingFor: string;
    preferences: {
      text: { label: string; desc: string };
      video: { label: string; desc: string };
      voice: { label: string; desc: string };
    };
    submitBtn: string;
    connecting: string;
    badges: {
      encrypted: string;
      instant: string;
      active: string;
    };
    storiesTitle: string;
    storiesSubtitle: string;
    verified: string;
    disclaimer: string;
  };
  quiz: {
    headerTitle: string;
    stepOf: string;
    anonymous: string;
    questions: Array<{
      text: string;
      options: string[];
    }>;
  };
  scanning: {
    title: string;
    subtitle: string;
    detectingProfile: string;
    livePing: string;
    privacyProtected: string;
    steps: string[];
  };
  result: {
    premiumMatch: string;
    connectionFound: string;
    encryptedSuccess: string;
    expiresIn: string;
    onlineNow: string;
    nearby: string;
    responseRate: string;
    activity: string;
    vHigh: string;
    privateNumber: string;
    startChatting: string;
    verifiedSecured: string;
    toastIncoming: string;
    justNow: string;
  };
  teaser: {
    onlineStatus: string;
    typing: string;
    encryptedNotice: string;
    firstMsgText: string;
    firstMsgVideo: string;
    firstMsgVoice: string;
    tapToListen: string;
    privatePhoto: string;
    viewOnce: string;
    unlockFullChat: string;
  };
  shareGate: {
    badge: string;
    title: string;
    description: string;
    progressLabel: string;
    groupLabel: string;
    shareBtn: string;
    shareBtnNext: string;
    shareBtnFinal: string;
    unlockedBtn: string;
    toastAlert: string;
    congratsTitle: string;
    congratsDesc: string;
    step1Done: string;
    step2Done: string;
    step3Done: string;
    viralMessage: string;
    copyLink: string;
    linkCopied: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    header: {
      brandName: "QuickChat Finder",
      live: "Live",
      peopleOnline: "people online",
      near: "near"
    },
    landing: {
      title: "Find Active Chat Partners",
      subtitleWithCity: "Connect with verified users near {city} instantly.",
      subtitleGeneral: "Connect with verified users in your area instantly.",
      selectCountry: "Select Country",
      nearCity: "Near {city}",
      lookingFor: "I am looking for...",
      preferences: {
        text: { label: "Text Chat", desc: "Private 1-on-1 messaging" },
        video: { label: "Video Call", desc: "Live instant face-to-face" },
        voice: { label: "Voice Note", desc: "Casual audio chatting" }
      },
      submitBtn: "FIND CHAT PARTNERS NOW",
      connecting: "Connecting securely...",
      badges: {
        encrypted: "100% Encrypted",
        instant: "Instant Connect",
        active: "Active Now"
      },
      storiesTitle: "Recent Success Stories",
      storiesSubtitle: "Real connections made today",
      verified: "Verified",
      disclaimer: "By continuing you confirm you are 18+ and agree to community standards."
    },
    quiz: {
      headerTitle: "Quick Verification",
      stepOf: "Step {current} of {total}",
      anonymous: "Your answers are anonymous",
      questions: [
        {
          text: "Are you at least 18 years of age?",
          options: ["Yes, I am 18+", "No, I am younger"]
        },
        {
          text: "What is your primary goal for chatting?",
          options: ["Casual Conversation", "Making Friends", "Dating/Romance", "Just Bored"]
        },
        {
          text: "Do you agree to respect other users' privacy and follow our community guidelines?",
          options: ["I Agree", "Tell me more"]
        }
      ]
    },
    scanning: {
      title: "Scanning Database...",
      subtitle: "Locating active partners near {city}",
      detectingProfile: "Detecting profile...",
      livePing: "Live Ping",
      privacyProtected: "256-bit SSL Protected",
      steps: [
        "Connecting to encrypted server...",
        "Scanning local area networks...",
        "Filtering active online profiles...",
        "Verifying connection status...",
        "Optimizing for your preferences...",
        "Match found! Fetching details..."
      ]
    },
    result: {
      premiumMatch: "PREMIUM MATCH",
      connectionFound: "New Connection Found",
      encryptedSuccess: "Encrypted matching successful",
      expiresIn: "Connection expires in:",
      onlineNow: "ONLINE NOW",
      nearby: "Nearby {city} • {distance} km away",
      responseRate: "Response Rate",
      activity: "Activity",
      vHigh: "V. High",
      privateNumber: "Private WhatsApp Number",
      startChatting: "START CHATTING NOW",
      verifiedSecured: "VERIFIED CONNECTION SECURED",
      toastIncoming: "Hey! I'm waiting for you in chat... 😉",
      justNow: "Just now"
    },
    teaser: {
      onlineStatus: "online • WhatsApp active",
      typing: "typing...",
      encryptedNotice: "End-to-end encrypted",
      firstMsgText: "Hey there! Finally someone active near {city} 😉 Are you free to chat right now?",
      firstMsgVideo: "Hey! Just saw your profile near {city} 🥰 Are you free for a quick video call?",
      firstMsgVoice: "Hey! So glad we matched near {city} 💕 Sent you a voice message below!",
      tapToListen: "Tap to Listen",
      privatePhoto: "1 Private Photo",
      viewOnce: "View Once • Tap to reveal",
      unlockFullChat: "Unlock full chat on WhatsApp"
    },
    shareGate: {
      badge: "VERIFICATION STEP",
      title: "Share to 3 WhatsApp Groups to Unlock",
      description: "To prevent spam and verify active WhatsApp users, you must share this connection link to 3 different WhatsApp groups before chatting.",
      progressLabel: "Group Verification Progress",
      groupLabel: "WhatsApp Group",
      shareBtn: "Share to WhatsApp Group 1/3",
      shareBtnNext: "Share to WhatsApp Group 2/3",
      shareBtnFinal: "Share to WhatsApp Group 3/3 (Final Step)",
      unlockedBtn: "Access Unlocked! Start Chatting",
      toastAlert: "⚠️ Action Required: Please share this link to {remaining} more WhatsApp group(s) to unlock your connection!",
      congratsTitle: "✓ Verification Successful (3/3 Groups Shared)",
      congratsDesc: "You have verified 3 WhatsApp groups. Your connection is now fully unlocked!",
      step1Done: "Group 1 Verified! 2 more to go",
      step2Done: "Group 2 Verified! Just 1 more group left",
      step3Done: "All 3 Groups Verified! Access Granted",
      viralMessage: "🔥 Hey! I just found active WhatsApp chat partners near here. Check your match here for free: {link}",
      copyLink: "Copy Link",
      linkCopied: "Link Copied!"
    }
  },

  es: {
    header: {
      brandName: "QuickChat Finder",
      live: "En Vivo",
      peopleOnline: "personas en línea",
      near: "cerca de"
    },
    landing: {
      title: "Encuentra Contactos Activos",
      subtitleWithCity: "Conéctate al instante con usuarios verificados cerca de {city}.",
      subtitleGeneral: "Conéctate al instante con usuarios verificados en tu área.",
      selectCountry: "Selecciona País",
      nearCity: "Cerca de {city}",
      lookingFor: "Estoy buscando...",
      preferences: {
        text: { label: "Chat de Texto", desc: "Mensajes privados 1 a 1" },
        video: { label: "Videollamada", desc: "En vivo cara a cara" },
        voice: { label: "Notas de Voz", desc: "Charlas de audio casuales" }
      },
      submitBtn: "BUSCAR CONTACTOS AHORA",
      connecting: "Conectando de forma segura...",
      badges: {
        encrypted: "100% Encriptado",
        instant: "Conexión Instantánea",
        active: "Activo Ahora"
      },
      storiesTitle: "Historias de Éxito Recientes",
      storiesSubtitle: "Conexiones reales realizadas hoy",
      verified: "Verificado",
      disclaimer: "Al continuar confirmas tener más de 18 años y aceptar las normas de la comunidad."
    },
    quiz: {
      headerTitle: "Verificación Rápida",
      stepOf: "Paso {current} de {total}",
      anonymous: "Tus respuestas son anónimas",
      questions: [
        {
          text: "¿Tienes al menos 18 años de edad?",
          options: ["Sí, soy mayor de 18", "No, soy menor"]
        },
        {
          text: "¿Cuál es tu objetivo principal al chatear?",
          options: ["Charla casual", "Hacer amigos", "Citas y Romance", "Solo aburrimiento"]
        },
        {
          text: "¿Aceptas respetar la privacidad de otros miembros y las reglas de la comunidad?",
          options: ["Acepto", "Saber más"]
        }
      ]
    },
    scanning: {
      title: "Escaneando Base de Datos...",
      subtitle: "Buscando perfiles activos cerca de {city}",
      detectingProfile: "Detectando perfil...",
      livePing: "Ping en Vivo",
      privacyProtected: "Protegido con SSL de 256 bits",
      steps: [
        "Conectando a servidor cifrado...",
        "Escaneando redes de la zona...",
        "Filtrando perfiles en línea activos...",
        "Verificando estado de conexión...",
        "Optimizando según tus preferencias...",
        "¡Coincidencia encontrada! Obteniendo datos..."
      ]
    },
    result: {
      premiumMatch: "MATCH PREMIUM",
      connectionFound: "Nueva Conexión Encontrada",
      encryptedSuccess: "Conexión cifrada exitosa",
      expiresIn: "La conexión expira en:",
      onlineNow: "EN LÍNEA AHORA",
      nearby: "Cerca de {city} • a {distance} km",
      responseRate: "Tasa de Respuesta",
      activity: "Actividad",
      vHigh: "Muy Alta",
      privateNumber: "Número Privado de WhatsApp",
      startChatting: "EMPEZAR A CHATEAR AHORA",
      verifiedSecured: "CONEXIÓN VERIFICADA Y SEGURA",
      toastIncoming: "¡Hola! Te estoy esperando en el chat... 😉",
      justNow: "Ahora mismo"
    },
    teaser: {
      onlineStatus: "en línea • WhatsApp activo",
      typing: "escribiendo...",
      encryptedNotice: "Cifrado de extremo a extremo",
      firstMsgText: "¡Hola! Por fin alguien activo cerca de {city} 😉 ¿Tienes tiempo para chatear?",
      firstMsgVideo: "¡Hola! Vi tu perfil cerca de {city} 🥰 ¿Te apetece una videollamada?",
      firstMsgVoice: "¡Hola! Qué bueno coincidir cerca de {city} 💕 ¡Te dejé un audio abajo!",
      tapToListen: "Toca para escuchar",
      privatePhoto: "1 Foto Privada",
      viewOnce: "Ver una vez • Toca para revelar",
      unlockFullChat: "Desbloquear chat en WhatsApp"
    },
    shareGate: {
      badge: "PASO DE VERIFICACIÓN",
      title: "Comparte en 3 Grupos de WhatsApp para Desbloquear",
      description: "Para evitar spam y verificar usuarios reales, debes compartir este enlace en 3 grupos de WhatsApp distintos antes de chatear.",
      progressLabel: "Progreso de Verificación de Grupos",
      groupLabel: "Grupo de WhatsApp",
      shareBtn: "Compartir en Grupo de WhatsApp 1/3",
      shareBtnNext: "Compartir en Grupo de WhatsApp 2/3",
      shareBtnFinal: "Compartir en Grupo de WhatsApp 3/3 (Paso Final)",
      unlockedBtn: "¡Acceso Desbloqueado! Empezar a Chatear",
      toastAlert: "⚠️ Acción requerida: ¡Debes compartir en {remaining} grupo(s) más de WhatsApp para desbloquear el chat!",
      congratsTitle: "✓ Verificación Completada (3/3 Grupos Compartidos)",
      congratsDesc: "Has compartido en 3 grupos de WhatsApp. ¡Tu conexión ahora está 100% desbloqueada!",
      step1Done: "¡Grupo 1 Verificado! Faltan 2 grupos",
      step2Done: "¡Grupo 2 Verificado! Solo falta 1 grupo",
      step3Done: "¡Los 3 Grupos Verificados! Acceso Concedido",
      viralMessage: "🔥 ¡Hola! Acabo de encontrar contactos activos de WhatsApp cerca de aquí. Mira tu match gratis aquí: {link}",
      copyLink: "Copiar Enlace",
      linkCopied: "¡Enlace Copiado!"
    }
  },

  pt: {
    header: {
      brandName: "QuickChat Finder",
      live: "Ao Vivo",
      peopleOnline: "pessoas online",
      near: "perto de"
    },
    landing: {
      title: "Encontre Contatos Ativos",
      subtitleWithCity: "Conecte-se instantaneamente com usuários verificados perto de {city}.",
      subtitleGeneral: "Conecte-se instantaneamente com usuários verificados na sua área.",
      selectCountry: "Selecionar País",
      nearCity: "Perto de {city}",
      lookingFor: "Estou procurando...",
      preferences: {
        text: { label: "Chat de Texto", desc: "Mensagens privadas 1 a 1" },
        video: { label: "Chamada de Vídeo", desc: "Ao vivo cara a cara" },
        voice: { label: "Mensagem de Voz", desc: "Áudio casual e descontraído" }
      },
      submitBtn: "ENCONTRAR CONTATOS AGORA",
      connecting: "Conectando com segurança...",
      badges: {
        encrypted: "100% Criptografado",
        instant: "Conexão Instantânea",
        active: "Ativo Agora"
      },
      storiesTitle: "Histórias de Sucesso Recentes",
      storiesSubtitle: "Conexões reais realizadas hoje",
      verified: "Verificado",
      disclaimer: "Ao continuar você confirma ter 18+ anos e concordar com os termos da comunidade."
    },
    quiz: {
      headerTitle: "Verificação Rápida",
      stepOf: "Passo {current} de {total}",
      anonymous: "Suas respostas são anônimas",
      questions: [
        {
          text: "Você tem pelo menos 18 anos de idade?",
          options: ["Sim, tenho 18+", "Não, sou menor"]
        },
        {
          text: "Qual é o seu objetivo principal no chat?",
          options: ["Conversa casual", "Fazer amizades", "Namoro e Romance", "Apenas tédio"]
        },
        {
          text: "Você concorda em respeitar a privacidade e as regras da comunidade?",
          options: ["Concordo", "Saber mais"]
        }
      ]
    },
    scanning: {
      title: "Varrendo Base de Dados...",
      subtitle: "Localizando pessoas ativas perto de {city}",
      detectingProfile: "Detectando perfil...",
      livePing: "Ping ao Vivo",
      privacyProtected: "Protegido com SSL 256-bit",
      steps: [
        "Conectando ao servidor criptografado...",
        "Escaneando redes da sua região...",
        "Filtrando perfis online disponíveis...",
        "Verificando status de conexão...",
        "Otimizando para suas preferências...",
        "Match encontrado! Carregando dados..."
      ]
    },
    result: {
      premiumMatch: "MATCH PREMIUM",
      connectionFound: "Nova Conexão Encontrada",
      encryptedSuccess: "Conexão criptografada estabelecida",
      expiresIn: "A conexão expira em:",
      onlineNow: "ONLINE AGORA",
      nearby: "Perto de {city} • a {distance} km",
      responseRate: "Taxa de Resposta",
      activity: "Atividade",
      vHigh: "Muito Alta",
      privateNumber: "Número Privado de WhatsApp",
      startChatting: "COMEÇAR A CONVERSAR AGORA",
      verifiedSecured: "CONEXÃO VERIFICADA E SEGURA",
      toastIncoming: "Oi! Tô te esperando no chat... 😉",
      justNow: "Agora mesmo"
    },
    teaser: {
      onlineStatus: "online • WhatsApp ativo",
      typing: "digitando...",
      encryptedNotice: "Criptografia de ponta a ponta",
      firstMsgText: "Oi! Finalmente alguém perto de {city} 😉 Tá livre pra conversar agora?",
      firstMsgVideo: "Oi! Vi seu perfil perto de {city} 🥰 Topa uma chamada de vídeo?",
      firstMsgVoice: "Oi! Que bom que combinamos perto de {city} 💕 Mandei um áudio aqui embaixo!",
      tapToListen: "Toque para ouvir",
      privatePhoto: "1 Foto Privada",
      viewOnce: "Visualização única • Toque para ver",
      unlockFullChat: "Liberar conversa no WhatsApp"
    },
    shareGate: {
      badge: "ETAPA DE VERIFICAÇÃO",
      title: "Compartilhe em 3 Grupos do WhatsApp para Liberar",
      description: "Para evitar spam e verificar usuários reais, você precisa compartilhar este link em 3 grupos diferentes do WhatsApp antes de conversar.",
      progressLabel: "Progresso de Verificação dos Grupos",
      groupLabel: "Grupo do WhatsApp",
      shareBtn: "Compartilhar no Grupo do WhatsApp 1/3",
      shareBtnNext: "Compartilhar no Grupo do WhatsApp 2/3",
      shareBtnFinal: "Compartilhar no Grupo do WhatsApp 3/3 (Passo Final)",
      unlockedBtn: "Acesso Liberado! Iniciar Conversa",
      toastAlert: "⚠️ Ação necessária: Compartilhe em mais {remaining} grupo(s) do WhatsApp para liberar sua conexão!",
      congratsTitle: "✓ Verificação Concluída (3/3 Grupos Compartilhados)",
      congratsDesc: "Você compartilhou em 3 grupos do WhatsApp. Sua conexão agora está totalmente liberada!",
      step1Done: "Grupo 1 Verificado! Faltam 2 grupos",
      step2Done: "Grupo 2 Verificado! Falta apenas 1 grupo",
      step3Done: "Todos os 3 Grupos Verificados! Acesso Liberado",
      viralMessage: "🔥 Oi! Acabei de encontrar contatos ativos no WhatsApp aqui perto. Veja seu match grátis aqui: {link}",
      copyLink: "Copiar Link",
      linkCopied: "Link Copiado!"
    }
  },

  fr: {
    header: {
      brandName: "QuickChat Finder",
      live: "En Direct",
      peopleOnline: "personnes en ligne",
      near: "près de"
    },
    landing: {
      title: "Trouvez des Partenaires Actifs",
      subtitleWithCity: "Connectez-vous instantanément avec des profils vérifiés près de {city}.",
      subtitleGeneral: "Connectez-vous instantanément avec des profils vérifiés dans votre région.",
      selectCountry: "Sélectionnez le pays",
      nearCity: "Près de {city}",
      lookingFor: "Je recherche...",
      preferences: {
        text: { label: "Chat Écrit", desc: "Messages privés 1 à 1" },
        video: { label: "Appel Vidéo", desc: "En direct face à face" },
        voice: { label: "Messages Vocaux", desc: "Échanges audio spontanés" }
      },
      submitBtn: "TROUVER DES PROFILS MAINTENANT",
      connecting: "Connexion sécurisée en cours...",
      badges: {
        encrypted: "100% Chiffré",
        instant: "Connexion Immédiate",
        active: "Actif Maintenant"
      },
      storiesTitle: "Connexions Récentes Réussies",
      storiesSubtitle: "Vraies rencontres faites aujourd'hui",
      verified: "Vérifié",
      disclaimer: "En continuant, vous confirmez avoir 18 ans et accepter la charte de la communauté."
    },
    quiz: {
      headerTitle: "Vérification Rapide",
      stepOf: "Étape {current} sur {total}",
      anonymous: "Vos réponses sont anonymes",
      questions: [
        {
          text: "Avez-vous au moins 18 ans ?",
          options: ["Oui, j'ai 18 ans+", "Non, je suis mineur(e)"]
        },
        {
          text: "Quel est votre objectif principal sur le chat ?",
          options: ["Discussion détendue", "Se faire des amis", "Rencontres & Romance", "Passer le temps"]
        },
        {
          text: "Acceptez-vous de respecter la vie privée des membres et les règles ?",
          options: ["J'accepte", "En savoir plus"]
        }
      ]
    },
    scanning: {
      title: "Analyse de la Base...",
      subtitle: "Recherche de profils actifs près de {city}",
      detectingProfile: "Détection du profil...",
      livePing: "Signal en direct",
      privacyProtected: "Protégé par SSL 256 bits",
      steps: [
        "Connexion au serveur sécurisé...",
        "Balayage des réseaux locaux...",
        "Filtrage des profils actifs...",
        "Vérification du statut de connexion...",
        "Optimisation selon vos critères...",
        "Profil trouvé ! Récupération des données..."
      ]
    },
    result: {
      premiumMatch: "MATCH PREMIUM",
      connectionFound: "Nouvelle Rencontre Trouvée",
      encryptedSuccess: "Correspondance sécurisée réussie",
      expiresIn: "La connexion expire dans :",
      onlineNow: "EN LIGNE ACTUELLEMENT",
      nearby: "Près de {city} • à {distance} km",
      responseRate: "Taux de Réponse",
      activity: "Activité",
      vHigh: "Très Forte",
      privateNumber: "Numéro Privé WhatsApp",
      startChatting: "COMMENCER À DISCUTER",
      verifiedSecured: "CONNEXION VÉRIFIÉE ET SÉCURISÉE",
      toastIncoming: "Coucou ! Je t'attends sur le chat... 😉",
      justNow: "À l'instant"
    },
    teaser: {
      onlineStatus: "en ligne • WhatsApp actif",
      typing: "écrit...",
      encryptedNotice: "Chiffré de bout en bout",
      firstMsgText: "Coucou ! Enfin quelqu'un près de {city} 😉 Tu es dispo pour discuter là ?",
      firstMsgVideo: "Coucou ! J'ai vu ton profil près de {city} 🥰 Dispo pour un court appel vidéo ?",
      firstMsgVoice: "Coucou ! Trop bien d'avoir matché près de {city} 💕 Je t'ai laissé un audio !",
      tapToListen: "Toucher pour écouter",
      privatePhoto: "1 Photo Privée",
      viewOnce: "Vue unique • Toucher pour révéler",
      unlockFullChat: "Débloquer le chat sur WhatsApp"
    },
    shareGate: {
      badge: "ÉTAPE DE VÉRIFICATION",
      title: "Partagez dans 3 Groupes WhatsApp pour Débloquer",
      description: "Pour éviter les faux profils et vérifier les utilisateurs réels, vous devez partager ce lien dans 3 groupes WhatsApp différents avant de discuter.",
      progressLabel: "Progression de la Vérification par Groupe",
      groupLabel: "Groupe WhatsApp",
      shareBtn: "Partager dans un Groupe WhatsApp 1/3",
      shareBtnNext: "Partager dans un Groupe WhatsApp 2/3",
      shareBtnFinal: "Partager dans un Groupe WhatsApp 3/3 (Étape Finale)",
      unlockedBtn: "Accès Débloqué ! Commencer à Discuter",
      toastAlert: "⚠️ Action requise : Partagez ce lien dans encore {remaining} groupe(s) WhatsApp pour débloquer votre contact !",
      congratsTitle: "✓ Vérification Réussie (3/3 Groupes Partagés)",
      congratsDesc: "Vous avez partagé dans 3 groupes WhatsApp. Votre connexion est maintenant débloquée !",
      step1Done: "Groupe 1 Vérifié ! Encore 2 groupes",
      step2Done: "Groupe 2 Vérifié ! Plus qu'un groupe",
      step3Done: "Les 3 Groupes sont Vérifiés ! Accès Autorisé",
      viralMessage: "🔥 Salut ! Je viens de trouver des contacts actifs sur WhatsApp près d'ici. Regarde ton match gratuitement ici : {link}",
      copyLink: "Copier le Lien",
      linkCopied: "Lien Copié !"
    }
  },

  de: {
    header: {
      brandName: "QuickChat Finder",
      live: "Live",
      peopleOnline: "Personen online",
      near: "in der Nähe von"
    },
    landing: {
      title: "Finde Aktive Chat-Partner",
      subtitleWithCity: "Verbinde dich sofort mit verifizierten Mitgliedern nahe {city}.",
      subtitleGeneral: "Verbinde dich sofort mit verifizierten Mitgliedern in deiner Nähe.",
      selectCountry: "Land auswählen",
      nearCity: "Nahe {city}",
      lookingFor: "Ich suche...",
      preferences: {
        text: { label: "Text-Chat", desc: "Private 1-zu-1 Nachrichten" },
        video: { label: "Video-Anruf", desc: "Live von Angesicht zu Angesicht" },
        voice: { label: "Sprachnotiz", desc: "Entspannte Audio-Nachrichten" }
      },
      submitBtn: "JETZT PARTNER FINDEN",
      connecting: "Sichere Verbindung wird hergestellt...",
      badges: {
        encrypted: "100% Verschlüsselt",
        instant: "Sofort-Verbindung",
        active: "Jetzt Aktiv"
      },
      storiesTitle: "Aktuelle Erfolgsgeschichten",
      storiesSubtitle: "Echte Verbindungen heute geknüpft",
      verified: "Verifiziert",
      disclaimer: "Mit dem Fortfahren bestätigst du, dass du 18+ bist und den Community-Richtlinien zustimmst."
    },
    quiz: {
      headerTitle: "Kurze Verifizierung",
      stepOf: "Schritt {current} von {total}",
      anonymous: "Deine Antworten sind anonym",
      questions: [
        {
          text: "Bist du mindestens 18 Jahre alt?",
          options: ["Ja, ich bin 18+", "Nein, ich bin jünger"]
        },
        {
          text: "Was ist dein Hauptziel beim Chatten?",
          options: ["Lockere Unterhaltung", "Freunde finden", "Dating & Romantik", "Einfach Langeweile"]
        },
        {
          text: "Stimmst du zu, die Privatsphäre anderer und die Regeln zu respektieren?",
          options: ["Ich stimme zu", "Mehr Infos"]
        }
      ]
    },
    scanning: {
      title: "Datenbank wird durchsucht...",
      subtitle: "Suche nach aktiven Partnern nahe {city}",
      detectingProfile: "Profil wird erfasst...",
      livePing: "Live-Signal",
      privacyProtected: "256-Bit SSL geschützt",
      steps: [
        "Verbindung zum sicheren Server...",
        "Suche in lokalen Netzwerken...",
        "Aktive Online-Profile filtern...",
        "Verbindungsstatus überprüfen...",
        "Nach deinen Vorlieben optimieren...",
        "Match gefunden! Daten werden geladen..."
      ]
    },
    result: {
      premiumMatch: "PREMIUM-MATCH",
      connectionFound: "Neuer Kontakt Gefunden",
      encryptedSuccess: "Verschlüsselung erfolgreich",
      expiresIn: "Verbindung läuft ab in:",
      onlineNow: "JETZT ONLINE",
      nearby: "Nahe {city} • {distance} km entfernt",
      responseRate: "Antwortrate",
      activity: "Aktivität",
      vHigh: "Sehr hoch",
      privateNumber: "Private WhatsApp-Nummer",
      startChatting: "JETZT CHAT STARTEN",
      verifiedSecured: "VERIFIZIERTE SICHERE VERBINDUNG",
      toastIncoming: "Hey! Ich warte schon im Chat auf dich... 😉",
      justNow: "Gerade eben"
    },
    teaser: {
      onlineStatus: "online • WhatsApp aktiv",
      typing: "schreibt...",
      encryptedNotice: "Ende-zu-Ende-verschlüsselt",
      firstMsgText: "Hey! Endlich jemand in der Nähe von {city} 😉 Hast du kurz Zeit zu schreiben?",
      firstMsgVideo: "Hey! Habe dein Profil nahe {city} gesehen 🥰 Lust auf einen kurzen Video-Call?",
      firstMsgVoice: "Hey! Schön, dass wir nahe {city} gematcht haben 💕 Habe dir eine Sprachnachricht dagelassen!",
      tapToListen: "Tippen zum Anhören",
      privatePhoto: "1 Privates Foto",
      viewOnce: "Einmalige Ansicht • Tippen zum Öffnen",
      unlockFullChat: "Ganzen Chat auf WhatsApp öffnen"
    },
    shareGate: {
      badge: "VERIFIZIERUNGSSCHRITT",
      title: "In 3 WhatsApp-Gruppen teilen zum Freischalten",
      description: "Um Spam zu verhindern und echte Nutzer zu verifizieren, musst du diesen Link in 3 verschiedenen WhatsApp-Gruppen teilen, bevor du chatten kannst.",
      progressLabel: "Gruppen-Verifizierungsfortschritt",
      groupLabel: "WhatsApp-Gruppe",
      shareBtn: "In WhatsApp-Gruppe teilen 1/3",
      shareBtnNext: "In WhatsApp-Gruppe teilen 2/3",
      shareBtnFinal: "In WhatsApp-Gruppe teilen 3/3 (Letzter Schritt)",
      unlockedBtn: "Zugang Freigeschaltet! Jetzt Chatten",
      toastAlert: "⚠️ Aktion erforderlich: Bitte teile diesen Link in {remaining} weiteren WhatsApp-Gruppe(n), um den Chat freizuschalten!",
      congratsTitle: "✓ Verifizierung Erfolgreich (3/3 Gruppen Geteilt)",
      congratsDesc: "Du hast in 3 WhatsApp-Gruppen geteilt. Deine Verbindung ist nun vollständig freigeschaltet!",
      step1Done: "Gruppe 1 verifiziert! Noch 2 Gruppen",
      step2Done: "Gruppe 2 verifiziert! Nur noch 1 Gruppe",
      step3Done: "Alle 3 Gruppen verifiziert! Zugriff gewährt",
      viralMessage: "🔥 Hey! Ich habe gerade aktive WhatsApp-Kontakte in der Nähe gefunden. Schau dir deinen Match hier kostenlos an: {link}",
      copyLink: "Link Kopieren",
      linkCopied: "Link Kopiert!"
    }
  },

  it: {
    header: {
      brandName: "QuickChat Finder",
      live: "In Diretta",
      peopleOnline: "persone online",
      near: "vicino a"
    },
    landing: {
      title: "Trova Contatti Attivi",
      subtitleWithCity: "Connettiti subito con utenti verificati vicino a {city}.",
      subtitleGeneral: "Connettiti subito con utenti verificati nella tua zona.",
      selectCountry: "Seleziona Paese",
      nearCity: "Vicino a {city}",
      lookingFor: "Sto cercando...",
      preferences: {
        text: { label: "Chat di Testo", desc: "Messaggi privati 1 a 1" },
        video: { label: "Videochiamata", desc: "Dal vivo faccia a faccia" },
        voice: { label: "Note Vocali", desc: "Chiacchierata audio informale" }
      },
      submitBtn: "TROVA CONTATTI ORA",
      connecting: "Connessione protetta in corso...",
      badges: {
        encrypted: "100% Crittografato",
        instant: "Connessione Immediata",
        active: "Attivo Ora"
      },
      storiesTitle: "Storie di Successo Recenti",
      storiesSubtitle: "Connessioni reali create oggi",
      verified: "Verificato",
      disclaimer: "Continuando confermi di avere 18+ anni e di accettare le regole della community."
    },
    quiz: {
      headerTitle: "Verifica Rapida",
      stepOf: "Passaggio {current} di {total}",
      anonymous: "Le tue risposte sono anonime",
      questions: [
        {
          text: "Hai almeno 18 anni di età?",
          options: ["Sì, ho 18+ anni", "No, sono minorenne"]
        },
        {
          text: "Qual è il tuo obiettivo principale in chat?",
          options: ["Chiacchierata informale", "Fare nuove amicizie", "Incontri & Romanticismo", "Solo per noia"]
        },
        {
          text: "Accetti di rispettare la privacy degli utenti e le linee guida?",
          options: ["Accetto", "Maggiori informazioni"]
        }
      ]
    },
    scanning: {
      title: "Scansione Database...",
      subtitle: "Ricerca contatti attivi vicino a {city}",
      detectingProfile: "Rilevamento profilo...",
      livePing: "Segnale Live",
      privacyProtected: "Protetto con SSL a 256 bit",
      steps: [
        "Connessione al server crittografato...",
        "Scansione reti della tua zona...",
        "Filtro profili online attivi...",
        "Verifica dello stato di connessione...",
        "Ottimizzazione in base alle tue preferenze...",
        "Match trovato! Recupero dati..."
      ]
    },
    result: {
      premiumMatch: "MATCH PREMIUM",
      connectionFound: "Nuovo Contatto Trovato",
      encryptedSuccess: "Corrispondenza crittografata riuscita",
      expiresIn: "La connessione scade tra:",
      onlineNow: "ONLINE ORA",
      nearby: "Vicino a {city} • a {distance} km",
      responseRate: "Tasso di Risposta",
      activity: "Attività",
      vHigh: "Molto Alta",
      privateNumber: "Numero Privato WhatsApp",
      startChatting: "INIZIA A CHATTARE ORA",
      verifiedSecured: "CONNESSIONE VERIFICATA E SICURA",
      toastIncoming: "Ciao! Ti sto aspettando in chat... 😉",
      justNow: "Adesso"
    },
    teaser: {
      onlineStatus: "online • WhatsApp attivo",
      typing: "sta scrivendo...",
      encryptedNotice: "Crittografia end-to-end",
      firstMsgText: "Ciao! Finalmente qualcuno attivo vicino a {city} 😉 Sei libero/a per chattare adesso?",
      firstMsgVideo: "Ciao! Ho visto il tuo profilo vicino a {city} 🥰 Ti va una videochiamata veloce?",
      firstMsgVoice: "Ciao! Che bello aver fatto match vicino a {city} 💕 Ti ho lasciato un audio qui sotto!",
      tapToListen: "Tocca per ascoltare",
      privatePhoto: "1 Foto Privata",
      viewOnce: "Visualizza una volta • Tocca per vedere",
      unlockFullChat: "Sblocca la chat su WhatsApp"
    },
    shareGate: {
      badge: "PASSAGGIO DI VERIFICA",
      title: "Condividi in 3 Gruppi WhatsApp per Sbloccare",
      description: "Per evitare lo spam e verificare utenti reali, devi condividere questo link in 3 gruppi WhatsApp diversi prima di chattare.",
      progressLabel: "Avanzamento Verifica Gruppi",
      groupLabel: "Gruppo WhatsApp",
      shareBtn: "Condividi nel Gruppo WhatsApp 1/3",
      shareBtnNext: "Condividi nel Gruppo WhatsApp 2/3",
      shareBtnFinal: "Condividi nel Gruppo WhatsApp 3/3 (Ultimo Passaggio)",
      unlockedBtn: "Accesso Sbloccato! Inizia a Chattare",
      toastAlert: "⚠️ Azione richiesta: Condividi questo link in altri {remaining} gruppo/i WhatsApp per sbloccare la chat!",
      congratsTitle: "✓ Verifica Completata (3/3 Gruppi Condivisi)",
      congratsDesc: "Hai condiviso in 3 gruppi WhatsApp. La tua connessione è ora completamente sbloccata!",
      step1Done: "Gruppo 1 Verificato! Mancano 2 gruppi",
      step2Done: "Gruppo 2 Verificato! Manca solo 1 gruppo",
      step3Done: "Tutti i 3 Gruppi Verificati! Accesso Consentito",
      viralMessage: "🔥 Ciao! Ho appena trovato contatti WhatsApp attivi qui vicino. Guarda il tuo match gratis qui: {link}",
      copyLink: "Copia Link",
      linkCopied: "Link Copiato!"
    }
  }
};

/**
 * Maps country code or browser language to supported language
 */
export function detectLanguage(countryCode?: string): SupportedLanguage {
  // Check browser language first if available
  if (typeof navigator !== 'undefined' && navigator.language) {
    const navLang = navigator.language.toLowerCase();
    if (navLang.startsWith('es')) return 'es';
    if (navLang.startsWith('pt')) return 'pt';
    if (navLang.startsWith('fr')) return 'fr';
    if (navLang.startsWith('de')) return 'de';
    if (navLang.startsWith('it')) return 'it';
  }

  // Map from detected country code
  if (countryCode) {
    const code = countryCode.toUpperCase();

    // Spanish-speaking
    const spanishCountries = [
      'ES', 'MX', 'CO', 'AR', 'CL', 'PE', 'VE', 'EC', 'GT', 
      'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ'
    ];
    if (spanishCountries.includes(code)) return 'es';

    // Portuguese-speaking
    const portugueseCountries = ['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST'];
    if (portugueseCountries.includes(code)) return 'pt';

    // French-speaking
    const frenchCountries = [
      'FR', 'BE', 'SN', 'CI', 'CM', 'CD', 'CG', 'BF', 'ML', 
      'NE', 'TG', 'BJ', 'GA', 'DJ', 'KM', 'CF', 'TD', 'MG', 'RW', 'BI', 'SC', 'MC'
    ];
    if (frenchCountries.includes(code)) return 'fr';

    // German-speaking
    const germanCountries = ['DE', 'AT', 'CH', 'LI', 'LU'];
    if (germanCountries.includes(code)) return 'de';

    // Italian-speaking
    const italianCountries = ['IT', 'SM', 'VA'];
    if (italianCountries.includes(code)) return 'it';
  }

  return 'en';
}
