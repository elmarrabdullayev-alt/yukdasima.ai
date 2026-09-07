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
  primaryPhone: PhoneEntry;
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
    fullDisplay: '878',
    telNumber: '878',
    telHref: 'tel:878',
  },
  primaryPhone: {
    label: 'Əlaqə nömrəsi',
    displayNumber: '050 250 31 70',
    telNumber: '+994502503170',
    telHref: 'tel:+994502503170',
  },
  mobileNumbers: [
    {
      label: 'Mobil / WhatsApp',
      displayNumber: '050 250 31 70',
      telNumber: '+994502503170',
      telHref: 'tel:+994502503170',
    },
  ],
  whatsapp: {
    label: 'WhatsApp',
    displayNumber: '+994 50 250 31 70',
    normalizedNumber: '994502503170',
    baseUrl: 'https://wa.me/994502503170',
  },
};

export const CONTACT_INFO = {
  // 1. Header-only Hotline (878)
  HOTLINE_NUMBER: PHONE_CONFIG.hotline.telNumber,
  HOTLINE_DISPLAY: PHONE_CONFIG.hotline.fullDisplay,
  HOTLINE_SHORT_DISPLAY: PHONE_CONFIG.hotline.shortDisplay,
  HOTLINE_TEL: PHONE_CONFIG.hotline.telHref,
  HOTLINE_SHORT: '878',

  // 2. Primary Contact / Call number everywhere outside Header (050 250 31 70)
  PRIMARY_PHONE_DISPLAY: PHONE_CONFIG.primaryPhone.displayNumber,
  PRIMARY_PHONE_TEL: PHONE_CONFIG.primaryPhone.telHref,
  PRIMARY_PHONE_RAW: PHONE_CONFIG.primaryPhone.telNumber,

  // Mobile / Backwards-compatibility aliases
  MOBILE_DISPLAY: PHONE_CONFIG.primaryPhone.displayNumber,
  MOBILE_NORMALIZED: PHONE_CONFIG.whatsapp.normalizedNumber,
  MOBILE_TEL: PHONE_CONFIG.primaryPhone.telHref,
  MOBILE_RAW: PHONE_CONFIG.primaryPhone.telNumber,

  // 3. WhatsApp (+994 50 250 31 70 / 994502503170)
  WHATSAPP_NUMBER: PHONE_CONFIG.whatsapp.normalizedNumber,
  WHATSAPP_DISPLAY: PHONE_CONFIG.whatsapp.displayNumber,
  WHATSAPP_URL_BASE: PHONE_CONFIG.whatsapp.baseUrl,

  // Structured Config References
  hotline: PHONE_CONFIG.hotline,
  primaryPhone: PHONE_CONFIG.primaryPhone,
  mobileNumbers: PHONE_CONFIG.mobileNumbers,
  whatsapp: PHONE_CONFIG.whatsapp,
};


