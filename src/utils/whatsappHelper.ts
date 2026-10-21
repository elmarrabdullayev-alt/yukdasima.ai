import { CONTACT_INFO } from '../constants/contact';
import { getApprovedYukdasimaRoute, getApprovedEvakuatorRoute } from '../seo/routeRegistry';
import { t } from '../i18n';

/**
 * Parses pathname into service type and optional regional route information
 */
export function getServiceAndRouteFromPath(pathname: string): { service: string; route?: string } {
  const cleanPath = (pathname || '/').toLowerCase().trim();

  // 1. Evakuator regional routes: /evakuator/{slug}
  if (cleanPath.startsWith('/evakuator/') && cleanPath !== '/evakuator') {
    const slug = cleanPath.replace('/evakuator/', '').replace(/\/$/, '');
    const route = getApprovedEvakuatorRoute(slug);
    if (route) {
      return {
        service: 'evakuator',
        route: `${route.origin}–${route.destination}`,
      };
    }
    return { service: 'evakuator', route: slug };
  }

  // 2. Yukdasima regional routes: /yukdasima/{slug}
  if (cleanPath.startsWith('/yukdasima/') && cleanPath !== '/yukdasima') {
    const slug = cleanPath.replace('/yukdasima/', '').replace(/\/$/, '');
    const route = getApprovedYukdasimaRoute(slug);
    if (route) {
      return {
        service: 'yukdasima',
        route: `${route.origin}–${route.destination}`,
      };
    }
    return { service: 'yukdasima', route: slug };
  }

  if (cleanPath === '/evakuator') return { service: 'evakuator' };
  if (cleanPath === '/yukdasima') return { service: 'yukdasima' };
  if (cleanPath === '/evden-eve-yukdasima') return { service: 'evden-eve' };
  if (cleanPath === '/mebel-dasinmasi') return { service: 'mebel-dasinmasi' };
  if (cleanPath === '/ofis-dasinmasi') return { service: 'ofis-dasinmasi' };
  if (cleanPath === '/yuk-masini') return { service: 'yuk-masini' };
  if (cleanPath === '/fehle-xidmeti') return { service: 'fehle-xidmeti' };
  if (cleanPath === '/qiymetler') return { service: 'qiymetler' };
  if (cleanPath === '/elaqe') return { service: 'elaqe' };

  return { service: 'general' };
}

/**
 * Generates dynamic, context-aware prefilled WhatsApp message based on current page / regional route.
 */
export function getContextualWhatsAppMessage(pathname: string): string {
  const cleanPath = (pathname || '/').toLowerCase().trim();

  // 1. Evakuator regional route (e.g. /evakuator/baki-quba)
  if (cleanPath.startsWith('/evakuator/') && cleanPath !== '/evakuator') {
    const slug = cleanPath.replace('/evakuator/', '').replace(/\/$/, '');
    const route = getApprovedEvakuatorRoute(slug);
    if (route) {
      return `Salam, ${route.origin}–${route.destination} evakuator xidməti ilə maraqlanıram.`;
    }
    return 'Salam, evakuator xidməti ilə maraqlanıram.';
  }

  // 2. Yukdasima regional route (e.g. /yukdasima/baki-gence)
  if (cleanPath.startsWith('/yukdasima/') && cleanPath !== '/yukdasima') {
    const slug = cleanPath.replace('/yukdasima/', '').replace(/\/$/, '');
    const route = getApprovedYukdasimaRoute(slug);
    if (route) {
      return `Salam, ${route.origin}–${route.destination} yükdaşıma xidməti ilə maraqlanıram.`;
    }
    return 'Salam, yükdaşıma xidməti ilə maraqlanıram.';
  }

  // 3. Static and service landing pages
  switch (cleanPath) {
    case '/evakuator':
      return 'Salam, evakuator xidməti ilə maraqlanıram.';
    case '/yukdasima':
      return 'Salam, yükdaşıma xidməti ilə maraqlanıram.';
    case '/evden-eve-yukdasima':
      return 'Salam, evdən-evə yükdaşıma xidməti ilə maraqlanıram.';
    case '/mebel-dasinmasi':
      return 'Salam, mebel daşınması və usta xidməti ilə maraqlanıram.';
    case '/ofis-dasinmasi':
      return 'Salam, ofis köçürülməsi xidməti ilə maraqlanıram.';
    case '/yuk-masini':
      return 'Salam, yük maşını sifarişi ilə maraqlanıram.';
    case '/fehle-xidmeti':
      return 'Salam, fəhlə xidməti ilə maraqlanıram.';
    case '/qiymetler':
      return 'Salam, daşıma qiymətləri və tarifləri ilə maraqlanıram.';
    case '/elaqe':
      return 'Salam, yukdasima.ai üzərindən əlaqə saxlayıram, xidmətlərinizlə maraqlanıram.';
    case '/':
    default:
      return 'Salam, yukdasima.ai üzərindən əlaqə saxlayıram, daşıma xidməti ilə maraqlanıram.';
  }
}

/**
 * Builds full WhatsApp click-to-chat URL using centralized source of truth phone number.
 */
export function getContextualWhatsAppUrl(pathname: string, customMessage?: string): string {
  const message = customMessage || getContextualWhatsAppMessage(pathname);
  // On Russian pages the prefilled WhatsApp text is in Russian
  const encoded = encodeURIComponent(t(message));
  return `https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}?text=${encoded}`;
}
