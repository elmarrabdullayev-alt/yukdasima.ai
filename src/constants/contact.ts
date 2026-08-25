export interface PhoneEntry {
  label: string;
  displayNumber: string;
  telNumber: string;
  telHref: string;
}

export interface HotlineConfig extends PhoneEntry {
  shortDisplay: string;
  fullDisplay: string;
}

export interface ContactConfig {
  hotline: HotlineConfig;
  mobileNumbers: PhoneEntry[];
  whatsapp: {
    label: string;
    displayNumber: string;
    normalizedNumber: string;
    baseUrl: string;
  };
}

export const PHONE_CONFIG: ContactConfig = {
  hotline: {
    label: 'Qaynar xətt',
    displayNumber: '878',
    shortDisplay: '878',
    fullDisplay: 'Qaynar xətt: 878',
    telNumber: '878',
    telHref: 'tel:878',
  },
  mobileNumbers: [
    {
      label: 'Mobil / WhatsApp',
      displayNumber: '+994 50 231 17 28',
      telNumber: '+994502311728',
      telHref: 'tel:+994502311728',
    },
  ],
  whatsapp: {
    label: 'WhatsApp',
    displayNumber: '+994 50 231 17 28',
    normalizedNumber: '994502311728',
    baseUrl: 'https://wa.me/994502311728',
  },
};

export const CONTACT_INFO = {
  // Hotline
  HOTLINE_NUMBER: PHONE_CONFIG.hotline.telNumber,
  HOTLINE_DISPLAY: PHONE_CONFIG.hotline.fullDisplay,
  HOTLINE_SHORT_DISPLAY: PHONE_CONFIG.hotline.shortDisplay,
  HOTLINE_TEL: PHONE_CONFIG.hotline.telHref,

  // Mobile
  MOBILE_DISPLAY: PHONE_CONFIG.mobileNumbers[0].displayNumber,
  MOBILE_NORMALIZED: PHONE_CONFIG.whatsapp.normalizedNumber,
  MOBILE_TEL: PHONE_CONFIG.mobileNumbers[0].telHref,

  // WhatsApp
  WHATSAPP_NUMBER: PHONE_CONFIG.whatsapp.normalizedNumber,
  WHATSAPP_URL_BASE: PHONE_CONFIG.whatsapp.baseUrl,

  // Structured Config References
  hotline: PHONE_CONFIG.hotline,
  mobileNumbers: PHONE_CONFIG.mobileNumbers,
  whatsapp: PHONE_CONFIG.whatsapp,
};

