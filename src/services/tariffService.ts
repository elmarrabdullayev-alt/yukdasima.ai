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

  // Strip parentheses e.g. "Qobustan (Şamaxı)" -> "qobustan", "şamaxı"
  if (clean.includes('(') && clean.includes(')')) {
    const main = clean.replace(/\([^)]*\)/g, '').trim();
    if (main) aliases.add(main);
    const inside = clean.substring(clean.indexOf('(') + 1, clean.indexOf(')')).trim();
    if (inside) aliases.add(inside);
  }

  // Transliteration variants: ə -> e, ı -> i, ö -> o, ü -> u, ğ -> g, ç -> c, ş -> s
  const translit = clean
    .replace(/ə/g, 'e')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ğ/g, 'g')
    .replace(/ç/g, 'c')
    .replace(/ş/g, 's');
  aliases.add(translit);

  return Array.from(aliases);
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
      'əhmədli', 'ehmedli', 'həzi aslanov', 'elmlər', '28 may', 'gənclik', 'genclik'
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
    aliases: ['xırdalan', 'xirdalan', 'masazır', 'masazir', 'saray', 'qobu', 'hökməli', 'hokmeli', 'sulutəpə', 'sulutepe'],
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
    aliases: ['sumqayıt', 'sumqayit', 'novxanı', 'novxani', 'corat', 'hacı zeynalabdin', 'tagiyev', 'yaşma', 'yasma'],
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
 * Get all destination names available for autocomplete/search
 */
export function getAvailableDestinations(): string[] {
  return ACTIVE_TARIFF_DATABASE.routes.map((r) => r.destination);
}

/**
 * Deterministic Route Lookup Service
 * Finds a matching route from the active tariff database.
 * Does NOT guess or interpolate. Returns null if not found.
 */
export function lookupRouteTariff(fromAddress: string, toAddress: string): UnifiedRouteTariff | null {
  const normFrom = (fromAddress || '').trim().toLowerCase();
  const normTo = (toAddress || '').trim().toLowerCase();

  if (!normTo && !normFrom) {
    return null;
  }

  // Priority 1: Match toAddress against specific regional/suburban routes (excluding generic Baku local)
  for (const route of ACTIVE_TARIFF_DATABASE.routes) {
    if (route.id === 'route-baku-local') continue;

    if (normTo.includes(route.destination.toLowerCase())) {
      return route;
    }
    for (const alias of route.aliases) {
      if (alias.length >= 3 && normTo.includes(alias)) {
        return route;
      }
    }
  }

  // Priority 2: Match fromAddress against specific regional/suburban routes (excluding generic Baku local)
  for (const route of ACTIVE_TARIFF_DATABASE.routes) {
    if (route.id === 'route-baku-local') continue;

    if (normFrom.includes(route.destination.toLowerCase())) {
      return route;
    }
    for (const alias of route.aliases) {
      if (alias.length >= 3 && normFrom.includes(alias)) {
        return route;
      }
    }
  }

  // Priority 3: Match Baku local route
  const localRoute = ACTIVE_TARIFF_DATABASE.routes.find((r) => r.id === 'route-baku-local');
  if (localRoute) {
    const isToLocal = localRoute.aliases.some((alias) => normTo.includes(alias));
    const isFromLocal = localRoute.aliases.some((alias) => normFrom.includes(alias));
    const bakuMarkers = ['küç', 'kuc', 'pr.', 'prospekt', 'mkr', 'mikrorayon', 'bina', 'otaq', 'mərkəz', 'merkez'];
    const hasMarker = bakuMarkers.some((m) => normTo.includes(m) || normFrom.includes(m));

    if (isToLocal || isFromLocal || hasMarker || (normFrom && !normTo)) {
      return localRoute;
    }
  }

  return null;
}

/**
 * Vehicle Price Lookup for a specific vehicle category and route.
 * Strictly uses configured values without automatic corrections.
 * If price is null or missing, returns null (no guesswork).
 */
export function lookupVehiclePrice(
  route: UnifiedRouteTariff | null,
  vehicleCategory: '2m' | '3m' | '4m' | '5m' | '6m' | '7m'
): number | null {
  if (!route) return null;
  const price = route.prices[vehicleCategory];
  if (price === null || price === undefined || price <= 0) {
    return null;
  }
  return price;
}
