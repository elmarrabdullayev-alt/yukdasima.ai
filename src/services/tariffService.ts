/**
 * TARIFF LOOKUP SERVICE (SINGLE SOURCE OF TRUTH)
 * 
 * Directly parses and queries the centralized V1 database:
 * /src/data/yukdasima_ai_tarif_bazasi_v1.json
 * 
 * HOT-SWAPPABLE ARCHITECTURE:
 * When V2 database JSON is provided, simply update the import or path reference.
 * Gemini image analysis, vehicle selection, frontend, lead system, and pricing engine
 * will continue to work without modification.
 */

import tariffDatabaseV1 from '../data/yukdasima_ai_tarif_bazasi_v1.json';
import {
  resolveDestination,
  getCanonicalDestinations,
  isBakuOrigin,
  classifyRoute,
  DestinationResolutionResult
} from './destinationResolver';

export interface RoutePriceMatrix {
  '2m': number | null;
  '3m': number | null;
  '4m': number | null;
  '5m': number | null;
  '6m': number | null;
  '7m': number | null;
  evacuator: number | null;
  tir: number | null;
}

export interface UnifiedRouteTariff {
  id: string;
  zone: string;
  origin: string;
  destination: string;
  distanceKm: number | null;
  isIntercity: boolean;
  prices: RoutePriceMatrix;
  aliases: string[];
}

export interface TariffDatabase {
  schemaVersion: string;
  datasetStatus: string;
  vehicles: typeof tariffDatabaseV1.vehicles;
  businessRules: typeof tariffDatabaseV1.business_rules;
  routes: UnifiedRouteTariff[];
  rawLocalTariffs: typeof tariffDatabaseV1.local_tariffs_raw;
  rawLoadingRules: typeof tariffDatabaseV1.loading_unloading_rules_raw;
}

/**
 * Generate search aliases for fuzzy matching user inputs (Latin/Cyrillic/Azerbaijani chars)
 */
function generateAliases(name: string): string[] {
  const clean = name.toLowerCase().trim();
  const aliases = new Set<string>();
  aliases.add(clean);

  // Split by / or , or -
  if (clean.includes('/')) {
    clean.split('/').forEach((part) => {
      const p = part.trim();
      if (p) aliases.add(p);
    });
  }

  // Strip parentheses e.g. "Qobustan (Şamaxı)" -> "qobustan", "şamaxı"
  if (clean.includes('(') && clean.includes(')')) {
    const main = clean.replace(/\([^)]*\)/g, '').trim();
    if (main) aliases.add(main);
    const inside = clean.substring(clean.indexOf('(') + 1, clean.indexOf(')')).trim();
    if (inside) aliases.add(inside);
  }

  // Transliteration variants: ə -> e, ı -> i, ö -> o, ü -> u, ğ -> g, ç -> c, ş -> s
  Array.from(aliases).forEach((a) => {
    const translit = a
      .replace(/ə/g, 'e')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ğ/g, 'g')
      .replace(/ç/g, 'c')
      .replace(/ş/g, 's');
    aliases.add(translit);

    const latinShCh = a
      .replace(/ş/g, 'sh')
      .replace(/ç/g, 'ch')
      .replace(/x/g, 'kh')
      .replace(/ə/g, 'e')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ğ/g, 'gh');
    aliases.add(latinShCh);
  });

  return Array.from(aliases).filter((a) => a.length >= 2);
}

/**
 * Load and compile the active V1 dataset into the unified runtime structure.
 */
function loadActiveTariffDatabase(): TariffDatabase {
  const routes: UnifiedRouteTariff[] = [];

  // 1. Add Local Baku & Absheron Routes
  routes.push({
    id: 'route-baku-local',
    zone: 'Bakı və Abşeron',
    origin: 'Bakı',
    destination: 'Bakı (şəhərdaxili)',
    distanceKm: 15,
    isIntercity: false,
    prices: {
      '2m': 25,
      '3m': 35,
      '4m': 50,
      '5m': 65,
      '6m': 85,
      '7m': 110,
      evacuator: 35,
      tir: 180,
    },
    aliases: [
      'bakı', 'baki', 'baku', 'şəhərdaxili', 'seherdaxili', 'nərimanov', 'yasamal', 'nəsimi', 'xətai', 'səbail', 
      'binəqədi', 'nizami', 'sabunçu', 'suraxanı', 'xəzər', 'pirallahı',
      'nerimanov', 'nesimi', 'xetai', 'sebail', 'bineqedi', 'sabuncu', 'suraxani', 'xezer',
      'əhmədli', 'ehmedli', 'həzi aslanov', 'elmlər', '28 may', 'gənclik', 'genclik',
      'koroğlu', 'koroglu', 'bakıxanov', 'bakixanov', 'inşaatçılar', 'insaatcilar', 'sahil',
      'içərişəhər', 'iceriseher', 'memar əcəmi', 'memar ecemi', 'dərnəgül', 'dernegul',
      'xalqlar dostluğu', 'xalqlar dostlugu', 'neftçilər', 'neftciler', 'qara qarayev',
      'köhnə günəşli', 'kohne gunesli', 'yeni günəşli', 'yeni gunesli', 'badamdar', 'bayıl', 'bayil',
      'bibiheybət', 'bibiheybet', 'lökbatan', 'lokbatan', 'hövsan', 'hovsan', 'zığ', 'zig',
      'bülbülə', 'bulbule', 'əmircan', 'emircan', 'ramana', 'zabrat', 'kürdəxanı', 'kurdexani',
      'pirşağı', 'pirsagi', 'nardaran', 'biləcəri', 'bileceri', 'binə', 'bine'
    ],
  });

  routes.push({
    id: 'route-xirdalan',
    zone: 'Bakı və Abşeron',
    origin: 'Bakı',
    destination: 'Xırdalan',
    distanceKm: 18,
    isIntercity: false,
    prices: {
      '2m': 35,
      '3m': 45,
      '4m': 60,
      '5m': 75,
      '6m': 95,
      '7m': 120,
      evacuator: 40,
      tir: 190,
    },
    aliases: ['xırdalan', 'xirdalan', 'khirdalan', 'masazır', 'masazir', 'saray', 'qobu', 'hökməli', 'hokmeli', 'sulutəpə', 'sulutepe'],
  });

  routes.push({
    id: 'route-sumqayit',
    zone: 'Bakı və Abşeron',
    origin: 'Bakı',
    destination: 'Sumqayıt',
    distanceKm: 35,
    isIntercity: false,
    prices: {
      '2m': 40,
      '3m': 55,
      '4m': 65,
      '5m': 90,
      '6m': 120,
      '7m': 150,
      evacuator: 55,
      tir: 220,
    },
    aliases: ['sumqayıt', 'sumqayit', 'sumgayit', 'novxanı', 'novxani', 'corat', 'jorat', 'hacı zeynalabdin', 'tagiyev'],
  });

  routes.push({
    id: 'route-absheron-peninsula',
    zone: 'Bakı və Abşeron',
    origin: 'Bakı',
    destination: 'Abşeron qəsəbələri (Mərdəkan, Bilgəh, Şüvəlan)',
    distanceKm: 32,
    isIntercity: false,
    prices: {
      '2m': 35,
      '3m': 50,
      '4m': 70,
      '5m': 90,
      '6m': 115,
      '7m': 140,
      evacuator: 45,
      tir: 200,
    },
    aliases: [
      'mərdəkan', 'merdekan', 'bilgəh', 'bilgeh', 'şüvəlan', 'suvelan', 'shuvelan', 'zagulba', 'zağulba', 
      'buzovna', 'qala', 'türkan', 'turkan', 'zirə', 'zire', 'dübəndi', 'dubendi', 'maştağa', 'mastaga', 'mashtaga'
    ],
  });

  // 2. Parse Regional Tariffs from V1 JSON
  for (const zoneGroup of tariffDatabaseV1.regional_tariffs) {
    for (const route of zoneGroup.routes) {
      const id = `route-${route.destination.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      routes.push({
        id,
        zone: zoneGroup.zone,
        origin: 'Bakı',
        destination: route.destination,
        distanceKm: route.distance_km,
        isIntercity: true,
        prices: {
          '2m': route.prices_azn['2m'],
          '3m': route.prices_azn['3m'],
          '4m': route.prices_azn['4m'],
          '5m': route.prices_azn['5m'],
          '6m': route.prices_azn['6m'],
          '7m': route.prices_azn['7m'],
          evacuator: route.prices_azn.evacuator,
          tir: route.prices_azn.tir,
        },
        aliases: generateAliases(route.destination),
      });
    }
  }

  return {
    schemaVersion: tariffDatabaseV1.schema_version,
    datasetStatus: tariffDatabaseV1.dataset_status,
    vehicles: tariffDatabaseV1.vehicles,
    businessRules: tariffDatabaseV1.business_rules,
    routes,
    rawLocalTariffs: tariffDatabaseV1.local_tariffs_raw,
    rawLoadingRules: tariffDatabaseV1.loading_unloading_rules_raw,
  };
}

/** Active Singleton Dataset instance */
export const ACTIVE_TARIFF_DATABASE = loadActiveTariffDatabase();

/**
 * Helper to clean and normalize search text
 */
function cleanSearchText(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Get all destination names available for autocomplete/search
 */
export function getAvailableDestinations(): string[] {
  return getCanonicalDestinations();
}

/**
 * Deterministic Route Lookup Service
 * Finds a matching route from the active tariff database via centralized destinationResolver.
 * Does NOT guess or interpolate. Returns null if not found.
 * 
 * Precedence and Rules:
 * 1. Both fromAddress and toAddress empty -> return null.
 * 2. Origin classification via isBakuOrigin(fromAddress):
 *    - The current regional tariff database strictly represents routes originating from BAKI.
 *    - If origin is NOT Bakı (e.g. Sumqayıt, Gəncə, Quba, Xırdalan, etc.):
 *      Check for an explicit origin-destination matching route. In V1 database, none exist, so return null.
 * 3. When origin IS Bakı:
 *    - If toAddress resolves to 'Bakı (şəhərdaxili)' or is empty -> return route-baku-local
 *    - If toAddress resolves to a regional or suburban canonical destination (e.g., Ağdaş, Gəncə, Sumqayıt, Xırdalan):
 *      Find route in database where origin is 'Bakı' and destination matches canonical name.
 *    - If toAddress has Baku street/district markers without regional keywords -> return route-baku-local
 * 4. Return null if no route is found in the database.
 */
export function lookupRouteTariff(fromAddress: string, toAddress: string): UnifiedRouteTariff | null {
  const normFrom = cleanSearchText(fromAddress);
  const normTo = cleanSearchText(toAddress);

  if (!normTo && !normFrom) {
    return null;
  }

  // Check if origin resolves to Bakı
  const originIsBaku = isBakuOrigin(fromAddress);

  // If origin is NOT Bakı (e.g. Sumqayıt -> Ağdaş, Gəncə -> Ağdaş, Quba -> Gəncə)
  if (!originIsBaku) {
    // Only return if an explicit non-Baku origin-destination tariff exists
    const resolvedFrom = resolveDestination(fromAddress);
    const resolvedTo = normTo ? resolveDestination(toAddress) : null;

    if (resolvedFrom && resolvedTo) {
      const explicitRoute = ACTIVE_TARIFF_DATABASE.routes.find(
        (r) =>
          r.origin.toLowerCase() === resolvedFrom.canonicalName.toLowerCase() &&
          r.destination.toLowerCase() === resolvedTo.canonicalName.toLowerCase()
      );
      if (explicitRoute) {
        return explicitRoute;
      }
    }
    // No explicit route configured for non-Bakı origin -> strictly null (no fallback to Bakı)
    return null;
  }

  // Origin IS Bakı: match destination
  if (normTo) {
    const resolvedTo = resolveDestination(toAddress);
    if (resolvedTo) {
      if (resolvedTo.canonicalName === 'Bakı (şəhərdaxili)') {
        const localBaku = ACTIVE_TARIFF_DATABASE.routes.find((r) => r.id === 'route-baku-local');
        if (localBaku) return localBaku;
      }

      // Find matching route in database originating from Bakı
      const route = ACTIVE_TARIFF_DATABASE.routes.find(
        (r) =>
          r.origin.toLowerCase() === 'bakı' &&
          r.destination.toLowerCase() === resolvedTo.canonicalName.toLowerCase()
      );
      if (route) {
        return route;
      }
    }

    // Check Baku local districts/markers
    const localBaku = ACTIVE_TARIFF_DATABASE.routes.find((r) => r.id === 'route-baku-local');
    if (localBaku) {
      const isToLocal = localBaku.aliases.some((alias) => normTo === alias || normTo.includes(alias));
      const bakuMarkers = ['küç', 'kuc', 'pr ', 'prospekt', 'mkr', 'mikrorayon', 'bina', 'otaq', 'mərkəz', 'merkez'];
      const hasMarker = bakuMarkers.some((m) => normTo.includes(m));

      if (isToLocal || hasMarker) {
        return localBaku;
      }
    }
  } else {
    // Destination is empty, origin is Baku -> default to Baku local
    const localBaku = ACTIVE_TARIFF_DATABASE.routes.find((r) => r.id === 'route-baku-local');
    if (localBaku) return localBaku;
  }

  // Unsupported route -> return null
  return null;
}

/**
 * Vehicle Price Lookup for a specific vehicle category and route.
 * Strictly uses configured values without automatic corrections.
 * If price is null or missing, returns null (no guesswork).
 */
export function lookupVehiclePrice(
  route: UnifiedRouteTariff | null,
  vehicleCategory: '2m' | '3m' | '4m' | '5m' | '6m' | '7m' | 'tir'
): number | null {
  if (!route) return null;
  const price = route.prices[vehicleCategory];
  if (price === null || price === undefined || price <= 0) {
    return null;
  }
  return price;
}

export interface EvacuatorPriceLookupResult {
  price: number | null;
  displayPrice: string;
  hasMissingTariff: boolean;
  disclaimer?: string;
  isIntercity: boolean;
  distanceKm?: number;
}

/**
 * Deterministic Evacuator Tariff Lookup
 * 
 * Rules:
 * 1. For Bakı -> rayon (regional routes): reads ONLY prices_azn.evacuator from the regional database.
 * 2. If evacuator tariff is null/missing or route unsupported:
 *    display: "Dəqiq qiymət üçün bizimlə əlaqə saxlayın."
 *    disclaimer: "Bu marşrut üçün avtomatik qiymət mövcud deyil."
 * 3. For Bakı local area:
 *    - Bakı şəhərdaxili: "35 AZN-dən" (35 AZN base)
 *    - Xırdalan: 40 AZN
 *    - Sumqayıt: 55 AZN
 *    - Abşeron qəsəbələri: 45 AZN
 * 4. NEVER falls back to 50 AZN or Bakı regional tariffs for non-Bakı origins.
 */
export function lookupEvacuatorTariff(fromAddress: string, toAddress: string): EvacuatorPriceLookupResult {
  const route = lookupRouteTariff(fromAddress, toAddress);

  if (!route) {
    return {
      price: null,
      displayPrice: 'Dəqiq qiymət üçün bizimlə əlaqə saxlayın.',
      hasMissingTariff: true,
      disclaimer: 'Bu marşrut üçün avtomatik qiymət mövcud deyil.',
      isIntercity: false,
    };
  }

  const evacPrice = route.prices.evacuator;

  if (route.isIntercity) {
    if (evacPrice !== null && evacPrice !== undefined && evacPrice > 0) {
      return {
        price: evacPrice,
        displayPrice: `${evacPrice} AZN`,
        hasMissingTariff: false,
        isIntercity: true,
        distanceKm: route.distanceKm || undefined,
      };
    } else {
      return {
        price: null,
        displayPrice: 'Dəqiq qiymət üçün bizimlə əlaqə saxlayın.',
        hasMissingTariff: true,
        disclaimer: 'Bu marşrut üçün avtomatik qiymət mövcud deyil.',
        isIntercity: true,
        distanceKm: route.distanceKm || undefined,
      };
    }
  }

  // Local Baku & suburban routes
  if (route.id === 'route-baku-local') {
    return {
      price: 35,
      displayPrice: '35 AZN-dən',
      hasMissingTariff: false,
      isIntercity: false,
      distanceKm: 15,
    };
  }

  if (evacPrice !== null && evacPrice !== undefined && evacPrice > 0) {
    return {
      price: evacPrice,
      displayPrice: `${evacPrice} AZN`,
      hasMissingTariff: false,
      isIntercity: false,
      distanceKm: route.distanceKm || undefined,
    };
  }

  return {
    price: null,
    displayPrice: 'Dəqiq qiymət üçün bizimlə əlaqə saxlayın.',
    hasMissingTariff: true,
    disclaimer: 'Bu marşrut üçün avtomatik qiymət mövcud deyil.',
    isIntercity: false,
    distanceKm: route.distanceKm || undefined,
  };
}
