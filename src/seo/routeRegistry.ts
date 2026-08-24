import { PageSeoConfig, BreadcrumbItem, FAQItem } from './metadata';
import { lookupEvacuatorTariff, lookupRouteTariff } from '../services/tariffService';

export interface ApprovedRouteConfig {
  slug: string; // e.g. 'baki-agdas'
  origin: string; // e.g. 'Bakı'
  destination: string; // e.g. 'Ağdaş'
  destinationDative: string; // e.g. 'Ağdaşa' (for 'Bakıdan Ağdaşa')
  destinationAblative: string; // e.g. 'Ağdaşdan' (for 'Ağdaşdan Bakıya')
  destinationLocative: string; // e.g. 'Ağdaşda'
  zoneName: string; // 'Zona 2 Mərkəzi Aran'
  routePath: string; // '/evakuator/baki-agdas'
  primaryHighway: string; // 'M2 (Bakı-Kürdəmir-Ucar-Ağdaş) və ya M4 (Bakı-Şamaxı-Ağsu-Göyçay-Ağdaş)'
  estimatedTravelTime: string; // '3 - 3.5 saat'
  aliases: string[]; // ['baki-agdas', 'baki-agdash', 'baki-aqdas', 'agdas', 'agdash']
  descriptionText: string;
}

/**
 * Approved Evakuator Routes Registry
 * STRICT BUSINESS RULE: Only routes with verified tariffs in the official database
 * and approved canonical slugs can be listed here.
 */
export const APPROVED_EVAKUATOR_ROUTES: Record<string, ApprovedRouteConfig> = {
  'baki-agdas': {
    slug: 'baki-agdas',
    origin: 'Bakı',
    destination: 'Ağdaş',
    destinationDative: 'Ağdaşa',
    destinationAblative: 'Ağdaşdan',
    destinationLocative: 'Ağdaşda',
    zoneName: 'Zona 2 Mərkəzi Aran',
    routePath: '/evakuator/baki-agdas',
    primaryHighway: 'M2 (Bakı–Kürdəmir–Ucar–Ağdaş) və M4 (Bakı–Şamaxı–Göyçay–Ağdaş) magistralı',
    estimatedTravelTime: '3 – 3.5 saat',
    aliases: ['baki-agdas', 'baki-agdash', 'baki-aqdas', 'agdas', 'agdash'],
    descriptionText: 'Bakıdan Ağdaşa və Ağdaş rayonundan Bakıya hər növ minik, SUV və kommersiya avtomobillərinin təhlükəsiz, sığortalı və 24/7 operativ evakuasiyası.',
  },
};

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

  return null;
}

/**
 * Dynamically builds comprehensive PageSeoConfig for an approved route
 * using live tariff data from tariffService.
 */
export function generateRouteSeoConfig(route: ApprovedRouteConfig): PageSeoConfig {
  const evacTariff = lookupEvacuatorTariff(route.origin, route.destination);
  const routeTariff = lookupRouteTariff(route.origin, route.destination);

  const priceText = evacTariff.price ? `${evacTariff.price} AZN` : 'Sərfəli Qiymət';
  const distanceKm = evacTariff.distanceKm || routeTariff?.distanceKm || 281;

  const title = `Bakı ${route.destination} Evakuator | Qiymət: ${priceText} | 7/24 Xidmət`;
  const metaDescription = `Bakıdan ${route.destinationDative} və ${route.destinationAblative} Bakıya 7/24 operativ evakuator xidməti. Rəsmi tarif: ${priceText} (${distanceKm} km). Təhlükəsiz fiksasiya, dərhal sifariş: 878.`;
  const canonicalUrl = `https://yukdasima.ai${route.routePath}`;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Ana səhifə', item: 'https://yukdasima.ai/' },
    { name: 'Evakuasiya', item: 'https://yukdasima.ai/evakuasiya' },
    { name: `${route.origin}–${route.destination} Evakuator`, item: canonicalUrl },
  ];

  const faqs: FAQItem[] = [
    {
      question: `Bakıdan ${route.destinationDative} evakuator qiyməti nə qədərdir?`,
      answer: `Bakı–${route.destination} marşrutu üzrə standart minik avtomobilləri (sedan, hetçbek) üçün rəsmi evakuator tarifi ${priceText}-dir. Məsafə ${distanceKm} km təşkil edir və qiymətə yükləmə, daşınma və təhlükəsiz fiksasiya daxildir.`,
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
      question: `SUV, krossover və ya təkəri kilidlənmiş maşınların daşınması necə hesablanır?`,
      answer: `Ağır çəkili SUV, pikap və ya təkəri/ötürücü qutusu kilidlənmiş avtomobillər üçün xüsusi hidravlik sürüşən platforma və diyircəkli xüsusi arabacıqlardan istifadə olunur. Belə hallarda standart tarifə cüzi əlavə tətbiq oluna bilər.`,
    },
    {
      question: `Bakı–${route.destination} evakuator xidməti üçün necə sifariş vermək olar?`,
      answer: `Siz 878 Qaynar Xətti ilə dərhal əlaqə saxlaya, +994 50 878 08 78 nömrəsinə WhatsApp vasitəsilə geolokasiya və avtomobil modelini göndərə və ya saytımızda geri zəng sifariş edə bilərsiniz.`,
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
