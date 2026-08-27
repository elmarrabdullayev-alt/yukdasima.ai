import { PageSeoConfig, BreadcrumbItem, FAQItem } from './metadata';
import { lookupEvacuatorTariff, lookupRouteTariff } from '../services/tariffService';
import tariffDatabaseV1 from '../data/yukdasima_ai_tarif_bazasi_v1.json';
import { resolveDestination, normalizeDestinationName } from '../services/destinationResolver';
import { getRouteContentProfile } from './regionalContent';

export interface ApprovedRouteConfig {
  slug: string; // e.g. 'baki-agdas'
  origin: string; // e.g. 'Bakı'
  destination: string; // e.g. 'Ağdaş'
  destinationDative: string; // e.g. 'Ağdaşa' (for 'Bakıdan Ağdaşa')
  destinationAblative: string; // e.g. 'Ağdaşdan' (for 'Ağdaşdan Bakıya')
  destinationLocative: string; // e.g. 'Ağdaşda'
  zoneName: string; // 'Zona 2 Mərkəzi Aran'
  routePath: string; // '/evakuator/baki-agdas'
  primaryHighway: string; // 'M2 və ya M4 magistralı'
  estimatedTravelTime: string; // '3 – 3.5 saat'
  aliases: string[]; // ['baki-agdas', 'baki-agdash', 'baki-aqdas', 'agdas', 'agdash']
  descriptionText: string;
}

/**
 * Helper to compute precise Azerbaijani grammar inflections for destination names
 */
function getAzeInflections(name: string): { dative: string; ablative: string; locative: string } {
  const specialMap: Record<string, { dative: string; ablative: string; locative: string }> = {
    'Ağdam (Quzanlı)': { dative: 'Ağdam Quzanlıya', ablative: 'Ağdam Quzanlıdan', locative: 'Ağdam Quzanlıda' },
    'Qobustan (Şamaxı)': { dative: 'Qobustana (Şamaxı)', ablative: 'Qobustandan (Şamaxı)', locative: 'Qobustanda (Şamaxı)' },
    'Qobustan (Qaradağ)': { dative: 'Qobustana (Qaradağ)', ablative: 'Qobustandan (Qaradağ)', locative: 'Qobustanda (Qaradağ)' },
    'Qırmızı Körpü': { dative: 'Qırmızı Körpüyə', ablative: 'Qırmızı Körpüdən', locative: 'Qırmızı Körpüdə' },
    'Qırmızı Bazar': { dative: 'Qırmızı Bazara', ablative: 'Qırmızı Bazardan', locative: 'Qırmızı Bazarda' },
    'Kəlbəcər İstisu': { dative: 'Kəlbəcər İstisuya', ablative: 'Kəlbəcər İstisudan', locative: 'Kəlbəcər İstisuda' },
    'Laçın Qorçu': { dative: 'Laçın Qorçuya', ablative: 'Laçın Qorçudan', locative: 'Laçın Qorçuda' },
    'Böyük Tağlar': { dative: 'Böyük Tağlara', ablative: 'Böyük Tağlardan', locative: 'Böyük Tağlarda' },
  };

  if (specialMap[name]) return specialMap[name];

  const clean = name.replace(/\([^)]*\)/g, '').trim();
  const lower = clean.toLowerCase();

  const vowels = 'aıoueəiöü';
  let lastVowel = '';
  for (let i = lower.length - 1; i >= 0; i--) {
    if (vowels.includes(lower[i])) {
      lastVowel = lower[i];
      break;
    }
  }

  const endsWithVowel = vowels.includes(lower[lower.length - 1]);
  const isHard = ['a', 'ı', 'o', 'u'].includes(lastVowel);

  let dative = '';
  let ablative = '';
  let locative = '';

  if (isHard) {
    dative = endsWithVowel ? `${clean}ya` : `${clean}a`;
    ablative = `${clean}dan`;
    locative = `${clean}da`;
  } else {
    dative = endsWithVowel ? `${clean}yə` : `${clean}ə`;
    ablative = `${clean}dən`;
    locative = `${clean}də`;
  }

  return { dative, ablative, locative };
}

/**
 * Maps geographical zone to primary Azerbaijani arterial highway
 */
function getHighwayForZone(zone: string): string {
  if (zone.includes('Zona 1')) return 'M2 (Bakı–Kürdəmir–Yevlax–Gəncə–Qazax) magistralı';
  if (zone.includes('Zona 2')) return 'M2 və ya M4 (Bakı–Kürdəmir–Ucar–Ağdaş–Yevlax) magistralı';
  if (zone.includes('Zona 3')) return 'M4 (Bakı–Şamaxı–İsmayıllı–Qəbələ–Şəki–Zaqatala) magistralı';
  if (zone.includes('Zona 4')) return 'M4 (Bakı–Şamaxı–Ağsu–Göyçay) magistralı';
  if (zone.includes('Zona 5')) return 'M3 (Bakı–Ələt–Salyan–Cəlilabad–Lənkəran–Astara) magistralı';
  if (zone.includes('Zona 6')) return 'M2 və ya M3 (Bakı–Hacıqabul–Şirvan–Salyan) magistralı';
  if (zone.includes('Zona 7')) return 'M1 (Bakı–Quba–Qusar–Rusiya sərhədi) magistralı';
  if (zone.includes('Zona 8')) return 'Zəfər Yolu və M6/M2 (Bakı–Füzuli–Şuşa–Qarabağ) magistralı';
  return 'Respublika əhəmiyyətli magistral avtomobil yolu';
}

/**
 * Calculates realistic intercity travel time by distance
 */
function getTravelTime(km: number | null): string {
  if (!km) return '3 – 4 saat';
  if (km <= 70) return '45 dəq – 1 saat';
  if (km <= 110) return '1 – 1.5 saat';
  if (km <= 150) return '1.5 – 2 saat';
  if (km <= 200) return '2 – 2.5 saat';
  if (km <= 250) return '2.5 – 3 saat';
  if (km <= 300) return '3 – 3.5 saat';
  if (km <= 350) return '3.5 – 4 saat';
  if (km <= 400) return '4 – 5 saat';
  return '5 – 6.5 saat';
}

/**
 * Generates canonical slug from destination name
 */
function generateCanonicalSlug(destination: string): string {
  let clean = destination
    .replace(/İ/g, 'I')
    .replace(/i̇/g, 'i')
    .replace(/I/g, 'i')
    .toLowerCase();

  if (clean.includes('qobustan') && (clean.includes('şirvan') || clean.includes('qaradağ') || clean.includes('qaradag'))) {
    return 'baki-qobustan-qaradag';
  }
  if (clean.includes('qobustan') && (clean.includes('şamaxı') || clean.includes('samaxi'))) {
    return 'baki-qobustan-samaxi';
  }
  if (clean.includes('ağdam') && (clean.includes('quzanlı') || clean.includes('quzanli'))) {
    return 'baki-agdam-quzanli';
  }
  if (clean.includes('kəlbəcər') && clean.includes('istisu')) {
    return 'baki-kelbecer-istisu';
  }
  if (clean.includes('laçın') && clean.includes('qorçu')) {
    return 'baki-lacin-qorcu';
  }

  return (
    'baki-' +
    clean
      .replace(/\([^)]*\)/g, '')
      .replace(/ə/g, 'e')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ğ/g, 'g')
      .replace(/ç/g, 'c')
      .replace(/ş/g, 's')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  );
}

/**
 * Generate exhaustive aliases for a route (including Latin, Azerbaijani, and short town names)
 */
function generateRouteAliases(canonicalSlug: string, destination: string): string[] {
  const aliases = new Set<string>();
  aliases.add(canonicalSlug);

  const bareSlug = canonicalSlug.replace(/^baki-/, '');
  if (bareSlug) {
    aliases.add(bareSlug);
  }

  const norm = normalizeDestinationName(destination);
  if (norm) {
    const normSlug = norm.replace(/\s+/g, '-');
    aliases.add(normSlug);
    aliases.add(`baki-${normSlug}`);
  }

  // Common transliteration variants
  const commonTranslit: Record<string, string[]> = {
    'Ağdaş': ['baki-agdash', 'baki-aqdas', 'agdas', 'agdash', 'aqdas'],
    'Qəbələ': ['baki-qabala', 'baki-gabala', 'qebele', 'qabala', 'gabala', 'gebele'],
    'Şəki': ['baki-sheki', 'baki-shaki', 'seki', 'sheki', 'shaki'],
    'Gəncə': ['baki-ganja', 'baki-gandja', 'gence', 'ganja', 'gandja'],
    'Lənkəran': ['baki-lankaran', 'baki-lenkoran', 'lenkeran', 'lankaran'],
    'Xaçmaz': ['baki-khachmaz', 'baki-hachmaz', 'xacmaz', 'khachmaz'],
    'Şamaxı': ['baki-shamakhi', 'baki-shamakhy', 'samaxi', 'shamakhi'],
    'İsmayıllı': ['baki-ismailly', 'baki-ismailli', 'ismayilli', 'ismailly'],
    'Göyçay': ['baki-goychay', 'goycay', 'goychay'],
    'Mingəçevir': ['baki-mingachevir', 'baki-mingechevir', 'mingecevir', 'mingachevir'],
    'Quba': ['baki-guba', 'quba', 'guba'],
    'Qusar': ['baki-gusar', 'qusar', 'gusar'],
    'Şuşa': ['baki-shusha', 'susa', 'shusha'],
  };

  if (commonTranslit[destination]) {
    commonTranslit[destination].forEach((a) => aliases.add(a));
  }

  return Array.from(aliases);
}

/**
 * Builds the comprehensive registry of all verified evacuator routes
 * from the centralized tariff database.
 */
function buildApprovedEvakuatorRoutes(): Record<string, ApprovedRouteConfig> {
  const routes: Record<string, ApprovedRouteConfig> = {};

  for (const zoneGroup of tariffDatabaseV1.regional_tariffs) {
    for (const route of zoneGroup.routes) {
      // STRICT BUSINESS RULE: Only routes with verified evacuator tariffs in the official database
      if (route.prices_azn && route.prices_azn.evacuator && route.prices_azn.evacuator > 0) {
        const slug = generateCanonicalSlug(route.destination);
        const inflections = getAzeInflections(route.destination);
        const primaryHighway = getHighwayForZone(zoneGroup.zone);
        const estimatedTravelTime = getTravelTime(route.distance_km);
        const aliases = generateRouteAliases(slug, route.destination);

        routes[slug] = {
          slug,
          origin: 'Bakı',
          destination: route.destination,
          destinationDative: inflections.dative,
          destinationAblative: inflections.ablative,
          destinationLocative: inflections.locative,
          zoneName: zoneGroup.zone,
          routePath: `/evakuator/${slug}`,
          primaryHighway,
          estimatedTravelTime,
          aliases,
          descriptionText: `Bakıdan ${inflections.dative} və ${inflections.ablative} Bakıya hər növ minik, SUV və kommersiya avtomobillərinin təhlükəsiz, sığortalı və 24/7 operativ evakuasiyası.`,
        };
      }
    }
  }

  return routes;
}

/**
 * Approved Evakuator Routes Registry
 * STRICT BUSINESS RULE: Only routes with verified tariffs in the official database
 * and approved canonical slugs can be listed here.
 */
export const APPROVED_EVAKUATOR_ROUTES: Record<string, ApprovedRouteConfig> = buildApprovedEvakuatorRoutes();

export interface ApprovedYukdasimaRouteConfig {
  slug: string; // e.g. 'baki-gence'
  origin: string; // 'Bakı'
  destination: string; // e.g. 'Gəncə'
  destinationDative: string; // e.g. 'Gəncəyə'
  destinationAblative: string; // e.g. 'Gəncədən'
  destinationLocative: string; // e.g. 'Gəncədə'
  zoneName: string; // 'Zona 1 Gəncə - Qazax'
  routePath: string; // '/yukdasima/baki-gence'
  primaryHighway: string; // 'M2 (Bakı–Kürdəmir–Yevlax–Gəncə–Qazax) magistralı'
  estimatedTravelTime: string; // '3.5 – 4 saat'
  distanceKm: number | null; // e.g. 362
  aliases: string[];
  descriptionText: string;
  prices: {
    '2m': number | null;
    '3m': number | null;
    '4m': number | null;
    '5m': number | null;
    '6m': number | null;
    '7m': number | null;
  };
}

/**
 * Builds the comprehensive registry of all verified yukdasima routes
 * from the centralized tariff database.
 */
function buildApprovedYukdasimaRoutes(): Record<string, ApprovedYukdasimaRouteConfig> {
  const routes: Record<string, ApprovedYukdasimaRouteConfig> = {};

  for (const zoneGroup of tariffDatabaseV1.regional_tariffs) {
    for (const route of zoneGroup.routes) {
      const p = route.prices_azn || {};
      const hasAnyYukdasimaPrice = Boolean(
        (p['2m'] && p['2m'] > 0) ||
        (p['3m'] && p['3m'] > 0) ||
        (p['4m'] && p['4m'] > 0) ||
        (p['5m'] && p['5m'] > 0) ||
        (p['6m'] && p['6m'] > 0) ||
        (p['7m'] && p['7m'] > 0)
      );

      // STRICT BUSINESS RULE: Only destinations with valid cargo vehicle prices in the official database
      if (hasAnyYukdasimaPrice) {
        const slug = generateCanonicalSlug(route.destination);
        const inflections = getAzeInflections(route.destination);
        const primaryHighway = getHighwayForZone(zoneGroup.zone);
        const estimatedTravelTime = getTravelTime(route.distance_km);
        const aliases = generateRouteAliases(slug, route.destination);

        routes[slug] = {
          slug,
          origin: 'Bakı',
          destination: route.destination,
          destinationDative: inflections.dative,
          destinationAblative: inflections.ablative,
          destinationLocative: inflections.locative,
          zoneName: zoneGroup.zone,
          routePath: `/yukdasima/${slug}`,
          primaryHighway,
          estimatedTravelTime,
          distanceKm: route.distance_km,
          aliases,
          descriptionText: `Bakıdan ${inflections.dative} və ${inflections.ablative} Bakıya hər ölçüdə (2m–7m) yük maşınları, peşəkar fəhlə və mebel ustası briqadası ilə operativ və sığortalı yükdaşıma xidməti.`,
          prices: {
            '2m': p['2m'] ?? null,
            '3m': p['3m'] ?? null,
            '4m': p['4m'] ?? null,
            '5m': p['5m'] ?? null,
            '6m': p['6m'] ?? null,
            '7m': p['7m'] ?? null,
          },
        };
      }
    }
  }

  return routes;
}

/**
 * Approved Yukdasima Routes Registry
 * STRICT BUSINESS RULE: Only routes with verified tariffs in the official database
 * and approved canonical slugs can be listed here.
 */
export const APPROVED_YUKDASIMA_ROUTES: Record<string, ApprovedYukdasimaRouteConfig> = buildApprovedYukdasimaRoutes();

/**
 * Returns an array of all approved yukdasima routes.
 */
export function getAllApprovedYukdasimaRoutes(): ApprovedYukdasimaRouteConfig[] {
  return Object.values(APPROVED_YUKDASIMA_ROUTES);
}

/**
 * Resolves a route pathname (e.g. '/yukdasima/baki-gence') or slug to an approved yukdasima route config.
 * Handles alias normalization.
 */
export function getApprovedYukdasimaRoute(pathnameOrSlug: string): ApprovedYukdasimaRouteConfig | null {
  if (!pathnameOrSlug) return null;

  // Clean the path or slug
  let slug = pathnameOrSlug.toLowerCase().trim();
  if (slug.startsWith('/yukdasima/')) {
    slug = slug.replace('/yukdasima/', '');
  }
  if (slug.startsWith('/')) {
    slug = slug.replace('/', '');
  }
  if (slug.endsWith('/')) {
    slug = slug.slice(0, -1);
  }

  // 1. Direct match
  if (APPROVED_YUKDASIMA_ROUTES[slug]) {
    return APPROVED_YUKDASIMA_ROUTES[slug];
  }

  // 2. Alias match
  for (const route of Object.values(APPROVED_YUKDASIMA_ROUTES)) {
    if (route.aliases.includes(slug)) {
      return route;
    }
  }

  // 3. Fallback resolution through central destination resolver
  if (!slug.includes('-') || slug.startsWith('baki-')) {
    const cleanDestinationQuery = slug.replace(/^baki-/, '').replace(/-/g, ' ');
    const resolved = resolveDestination(cleanDestinationQuery);
    if (resolved && resolved.isIntercity) {
      const canonicalSlug = generateCanonicalSlug(resolved.canonicalName);
      if (APPROVED_YUKDASIMA_ROUTES[canonicalSlug]) {
        return APPROVED_YUKDASIMA_ROUTES[canonicalSlug];
      }
    }
  }

  return null;
}

/**
 * Returns an array of all approved evacuator routes.
 */
export function getAllApprovedEvakuatorRoutes(): ApprovedRouteConfig[] {
  return Object.values(APPROVED_EVAKUATOR_ROUTES);
}

/**
 * Resolves a route pathname (e.g. '/evakuator/baki-agdas') or slug to an approved route config.
 * Handles alias normalization.
 */
export function getApprovedEvakuatorRoute(pathnameOrSlug: string): ApprovedRouteConfig | null {
  if (!pathnameOrSlug) return null;

  // Clean the path or slug
  let slug = pathnameOrSlug.toLowerCase().trim();
  if (slug.startsWith('/evakuator/')) {
    slug = slug.replace('/evakuator/', '');
  }
  if (slug.startsWith('/')) {
    slug = slug.replace('/', '');
  }
  if (slug.endsWith('/')) {
    slug = slug.slice(0, -1);
  }

  // 1. Direct match
  if (APPROVED_EVAKUATOR_ROUTES[slug]) {
    return APPROVED_EVAKUATOR_ROUTES[slug];
  }

  // 2. Alias match
  for (const route of Object.values(APPROVED_EVAKUATOR_ROUTES)) {
    if (route.aliases.includes(slug)) {
      return route;
    }
  }

  // 3. Fallback resolution through central destination resolver
  if (!slug.includes('-') || slug.startsWith('baki-')) {
    const cleanDestinationQuery = slug.replace(/^baki-/, '').replace(/-/g, ' ');
    const resolved = resolveDestination(cleanDestinationQuery);
    if (resolved && resolved.isIntercity) {
      const canonicalSlug = generateCanonicalSlug(resolved.canonicalName);
      if (APPROVED_EVAKUATOR_ROUTES[canonicalSlug]) {
        return APPROVED_EVAKUATOR_ROUTES[canonicalSlug];
      }
    }
  }

  return null;
}

/**
 * Dynamically builds comprehensive PageSeoConfig for an approved route
 * using live tariff data and centralized regional content profiles.
 */
export function generateRouteSeoConfig(route: ApprovedRouteConfig): PageSeoConfig {
  const evacTariff = lookupEvacuatorTariff(route.origin, route.destination);
  const routeTariff = lookupRouteTariff(route.origin, route.destination);
  const profile = getRouteContentProfile(route.slug);

  const distanceKm = evacTariff.distanceKm || routeTariff?.distanceKm || (profile ? profile.distanceKm : 281);

  const title = profile?.metaTitleEvakuator || `Bakı ${route.destination} Evakuator | 7/24 Sürətli Xidmət | yukdasima.ai`;
  const metaDescription = profile?.metaDescEvakuator || `Bakıdan ${route.destinationDative} və ${route.destinationAblative} Bakıya 7/24 operativ evakuator xidməti (${distanceKm} km). Təhlükəsiz fiksasiya, dərhal cari qiyməti öyrən: 878.`;
  const canonicalUrl = `https://yukdasima.ai${route.routePath}`;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Ana səhifə', item: 'https://yukdasima.ai/' },
    { name: 'Evakuator', item: 'https://yukdasima.ai/evakuator' },
    { name: `${route.origin}–${route.destination} Evakuator`, item: canonicalUrl },
  ];

  const faqs: FAQItem[] = profile?.evakuatorFaqs && profile.evakuatorFaqs.length > 0
    ? profile.evakuatorFaqs
    : [
        {
          question: `Bakıdan ${route.destinationDative} evakuator sifarişi necə edilir?`,
          answer: `878 qaynar xətti və ya WhatsApp üzərindən avtomobilinizin markasını, nasazlıq vəziyyətini və ünvanı bildirməklə dərhal uyğun evakuator yönləndirilir.`,
        },
        {
          question: `${route.destinationAblative} Bakıya da evakuator çağırmaq olar?`,
          answer: `Bəli, xidmətimiz ikitərəflidir. Siz həm Bakıdan ${route.destinationDative}, həm də ${route.destinationLocative} və ətraf kəndlərdə qəzalı və ya nasaz avtomobilinizi Bakıdakı istənilən servisə daşıtmaq üçün 878 nömrəsi ilə 24/7 əlaqə saxlaya bilərsiniz.`,
        },
        {
          question: `Evakuator sifariş edildikdən sonra nə qədər vaxta çatır?`,
          answer: `Bakı şəhəri üzrə çağırış edildikdə evakuator 15–30 dəqiqə ərzində ünvanınıza çatır və avtomobili platformaya yükləyərək birbaşa ${route.destinationDative} yola düşür. Yol müddəti təxminən ${route.estimatedTravelTime} təşkil edir.`,
        },
        {
          question: `SUV, krossover və ya təkəri kilidlənmiş maşınların daşınması necə aparılır?`,
          answer: `Ağır çəkili SUV, pikap və ya təkəri/ötürücü qutusu kilidlənmiş avtomobillər üçün xüsusi hidravlik sürüşən platforma və diyircəkli xüsusi arabacıqlardan istifadə olunur.`,
        },
      ];

  return {
    path: route.routePath,
    title,
    metaDescription,
    h1: `Bakıdan ${route.destinationDative} Evakuator Xidməti və Qiyməti`,
    canonicalUrl,
    keywords: [
      `Bakı ${route.destination} evakuator`,
      `Bakıdan ${route.destinationDative} evakuator`,
      `Bakı ${route.destination} evakuator qiyməti`,
      `Bakı ${route.destination} evakuator xidməti`,
      `${route.destination} evakuator`,
      `${route.destinationDative} evakuator`,
      `Bakıdan ${route.destinationDative} maşın daşıma`,
      `${route.destination} Bakı evakuator`,
      `${route.destinationAblative} Bakıya evakuator`,
    ],
    ogType: 'website',
    schemaType: 'Service',
    serviceName: `Bakı–${route.destination} Evakuator Xidməti`,
    serviceTypeDetail: 'Intercity Towing and Vehicle Evacuation Service',
    breadcrumbs,
    faqs,
  };
}

/**
 * Dynamically builds comprehensive PageSeoConfig for an approved yukdasima route
 * using live multi-vehicle tariff data and centralized regional content profiles.
 */
export function generateYukdasimaRouteSeoConfig(route: ApprovedYukdasimaRouteConfig): PageSeoConfig {
  const profile = getRouteContentProfile(route.slug);
  const distanceKm = route.distanceKm || (profile ? profile.distanceKm : 280);

  const title = profile?.metaTitleYukdasima || `Bakı ${route.destination} Yükdaşıma Xidməti | yukdasima.ai`;
  const metaDescription = profile?.metaDescYukdasima || `Bakıdan ${route.destinationDative} və ${route.destinationAblative} Bakıya təhlükəsiz yükdaşıma xidməti (${distanceKm} km). 2m-dən 7m-dək yük maşınları, operativ fəhlə və mebel ustası. Dərhal cari qiyməti öyrən: 878.`;
  const canonicalUrl = `https://yukdasima.ai${route.routePath}`;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Ana səhifə', item: 'https://yukdasima.ai/' },
    { name: 'Yükdaşıma', item: 'https://yukdasima.ai/yukdasima' },
    { name: `${route.origin}–${route.destination} Yükdaşıma`, item: canonicalUrl },
  ];

  const faqs: FAQItem[] = profile?.yukdasimaFaqs && profile.yukdasimaFaqs.length > 0
    ? profile.yukdasimaFaqs
    : [
        {
          question: `Bakıdan ${route.destinationDative} yükdaşıma necə təşkil olunur?`,
          answer: `Bakı–${route.destination} marşrutu üzrə (${distanceKm} km) yükdaşıma xidməti 2m-dən 7m-dək müxtəlif tutumlu yük maşınları ilə həyata keçirilir.`,
        },
        {
          question: `Yükümün həcminə uyğun maşını necə müəyyən edə bilərəm?`,
          answer: `Siz saytımızdakı süni intellekt kalkulyatoruna əşyalarınızın şəklini yükləyərək təxmini həcmi (m³) və ən optimal maşın növünü (2m, 3m, 4m, 5m, 6m və ya 7m) təyin edə bilərsiniz.`,
        },
        {
          question: `Bakı–${route.destination} marşrutu üzrə fəhlə və mebel ustası xidməti təşkil olunur?`,
          answer: `Bəli, ehtiyac olduqda peşəkar fəhlə briqadası və mebel sökülüb-yığılması üçün usta xidməti təqdim edilir.`,
        },
        {
          question: `${route.destinationAblative} Bakıya da yük daşımaq mümkündür?`,
          answer: `Bəli, xidmətimiz ikitərəflidir. Siz həm Bakıdan ${route.destinationDative}, həm də ${route.destinationLocative} yerləşən ev, ofis və ya kommersiya obyektinizdən Bakıya təhlükəsiz daşınma sifariş edə bilərsiniz.`,
        },
      ];

  return {
    path: route.routePath,
    title,
    metaDescription,
    h1: `Bakıdan ${route.destinationDative} Yükdaşıma Xidməti və Qiymətləri`,
    canonicalUrl,
    keywords: [
      `Bakı ${route.destination} yükdaşıma`,
      `Bakıdan ${route.destinationDative} yükdaşıma`,
      `Bakı ${route.destination} yükdaşıma qiyməti`,
      `Bakı ${route.destination} yük maşını`,
      `${route.destination} yükdaşıma`,
      `${route.destinationDative} yükdaşıma`,
      `Bakı ${route.destination} mebel daşınması`,
      `Bakı ${route.destination} ev köçürülməsi`,
      `${route.destinationAblative} Bakıya yükdaşıma`,
    ],
    ogType: 'website',
    schemaType: 'Service',
    serviceName: `Bakı–${route.destination} Yükdaşıma Xidməti`,
    serviceTypeDetail: 'Intercity Cargo and Moving Transportation Service',
    breadcrumbs,
    faqs,
  };
}


