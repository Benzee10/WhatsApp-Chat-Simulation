/**
 * QuickChat Configuration and Data Constants
 */
export const SMART_LINK = "https://lovelydates.short.gy/rdgHt1";
export const MESSAGE_INVITE_LINK = "https://lovelydates.short.gy/rdgHt1";
export const FREE_DAILY_GENERATIONS = 20;

export const COUNTRIES = [
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', phoneCode: '27', city: 'Johannesburg' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', phoneCode: '234', city: 'Lagos' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', phoneCode: '233', city: 'Accra' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', phoneCode: '254', city: 'Nairobi' },
];

export const PREFERENCES = [
  { id: 'text', label: 'Text Chat', icon: 'fa-comments' },
  { id: 'video', label: 'Video Call', icon: 'fa-video' },
  { id: 'voice', label: 'Voice Note', icon: 'fa-microphone' },
];

export const RECENT_ACTIVITY_NAMES = [
  "Alex", "Jordan", "Mike", "Sophie", "Chris", "Emma", "Daniel", "Luisa", "Marco", "Priya", "Chen", "Yuki", "Ahmed"
];

/**
 * Nigerian Mobile Network Prefixes (MTN, Airtel, Glo, 9mobile)
 */
export const NIGERIAN_PHONE_PREFIXES = [
  '0803',
  '0806',
  '0810',
  '0813',
  '0814',
  '0816',
  '0903',
  '0906',
  '0913',
  '0916',
  '0802',
  '0808',
  '0812',
  '0701',
  '0708',
  '0901',
  '0907',
  '0912',
  '0805',
  '0807',
  '0811',
  '0815',
  '0705',
  '0905',
  '0809',
  '0817',
  '0818',
  '0908',
  '0909'
];

/**
 * Generates random Nigerian phone number in Local format:
 * "XXXXXXXXXXX" e.g. "08031234567"
 */
export const generateNigerianPhoneNumber = (): string => {
  const prefix = NIGERIAN_PHONE_PREFIXES[Math.floor(Math.random() * NIGERIAN_PHONE_PREFIXES.length)];
  let remainingDigits = '';
  for (let i = 0; i < 7; i++) {
    remainingDigits += Math.floor(Math.random() * 10).toString();
  }
  return `${prefix}${remainingDigits}`;
};

/**
 * South African Mobile Network Prefixes
 */
export const SOUTH_AFRICAN_PHONE_PREFIXES = [
  '060',
  '061',
  '062',
  '063',
  '064',
  '065',
  '066',
  '067',
  '068',
  '069',
  '071',
  '072',
  '073',
  '074',
  '076',
  '078',
  '079',
  '081',
  '082',
  '083',
  '084'
];

/**
 * Generates random South African phone number in Local format:
 * "XXXXXXXXXX" e.g. "0712345678"
 */
export const generateSouthAfricanPhoneNumber = (): string => {
  const prefix = SOUTH_AFRICAN_PHONE_PREFIXES[Math.floor(Math.random() * SOUTH_AFRICAN_PHONE_PREFIXES.length)];
  let remainingDigits = '';
  for (let i = 0; i < 7; i++) {
    remainingDigits += Math.floor(Math.random() * 10).toString();
  }
  return `${prefix}${remainingDigits}`;
};

/**
 * Ghanaian Mobile Network Prefixes (MTN, Telecel/Vodafone, AT/AirtelTigo)
 */
export const GHANAIAN_PHONE_PREFIXES = [
  '020',
  '023',
  '024',
  '025',
  '026',
  '027',
  '028',
  '050',
  '053',
  '054',
  '055',
  '056',
  '057',
  '059'
];

/**
 * Generates random Ghanaian phone number in Local format:
 * "XXXXXXXXXX" e.g. "0241234567"
 */
export const generateGhanaianPhoneNumber = (): string => {
  const prefix = GHANAIAN_PHONE_PREFIXES[Math.floor(Math.random() * GHANAIAN_PHONE_PREFIXES.length)];
  let remainingDigits = '';
  for (let i = 0; i < 7; i++) {
    remainingDigits += Math.floor(Math.random() * 10).toString();
  }
  return `${prefix}${remainingDigits}`;
};

/**
 * Kenyan Mobile Network Prefixes (Safaricom, Airtel, Telkom)
 */
export const KENYAN_PHONE_PREFIXES = [
  '0700',
  '0701',
  '0702',
  '0703',
  '0704',
  '0705',
  '0706',
  '0707',
  '0708',
  '0709',
  '0710',
  '0711',
  '0712',
  '0713',
  '0714',
  '0715',
  '0716',
  '0717',
  '0718',
  '0719',
  '0720',
  '0721',
  '0722',
  '0723',
  '0724',
  '0725',
  '0726',
  '0727',
  '0728',
  '0729',
  '0740',
  '0741',
  '0742',
  '0743',
  '0745',
  '0746',
  '0748',
  '0750',
  '0751',
  '0752',
  '0753',
  '0754',
  '0755',
  '0756',
  '0757',
  '0758',
  '0759',
  '0760',
  '0768',
  '0769',
  '0770',
  '0771',
  '0772',
  '0773',
  '0774',
  '0775',
  '0776',
  '0777',
  '0778',
  '0779',
  '0780',
  '0781',
  '0782',
  '0783',
  '0784',
  '0785',
  '0786',
  '0787',
  '0788',
  '0789',
  '0790',
  '0791',
  '0792',
  '0793',
  '0794',
  '0795',
  '0796',
  '0797',
  '0798',
  '0799',
  '0100',
  '0101',
  '0102',
  '0103',
  '0104',
  '0105',
  '0106',
  '0107',
  '0108',
  '0109',
  '0110',
  '0111',
  '0112',
  '0113',
  '0114',
  '0115',
  '0116',
  '0117',
  '0118',
  '0119'
];

/**
 * Generates random Kenyan phone number in Local format:
 * "XXXXXXXXXX" e.g. "0712345678"
 */
export const generateKenyanPhoneNumber = (): string => {
  const prefix = KENYAN_PHONE_PREFIXES[Math.floor(Math.random() * KENYAN_PHONE_PREFIXES.length)];
  let remainingDigits = '';
  for (let i = 0; i < 6; i++) {
    remainingDigits += Math.floor(Math.random() * 10).toString();
  }
  return `${prefix}${remainingDigits}`;
};
