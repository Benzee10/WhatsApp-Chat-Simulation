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
    useExactLocation?: string;
    exactLocationBadge?: string;
    locatingExact?: string;
    exactMatchesDesc?: string;
    approxMatchesDesc?: string;
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
      disclaimer: "By continuing you confirm you are 18+ and agree to community standards.",
      useExactLocation: "Use exact location",
      exactLocationBadge: "Exact GPS",
      locatingExact: "Acquiring exact GPS location...",
      exactMatchesDesc: "Matching with verified users in your exact neighborhood",
      approxMatchesDesc: "Estimated regional location · Tap to use exact GPS"
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
    }
  }
};

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
