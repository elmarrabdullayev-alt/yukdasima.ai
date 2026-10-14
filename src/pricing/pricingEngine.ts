/**
 * DETERMINISTIC TRANSPORTATION PRICING ENGINE
 * 
 * IMPORTANT ARCHITECTURAL PRINCIPLES:
 * 1. Gemini AI NEVER invents, guesses, generates, or decides transportation prices.
 * 2. All vehicle prices originate strictly and exclusively from the configured Tariff Database.
 * 3. Hot-swappable architecture: updating tariffs requires changing only the tariff database config.
 * 4. Data Quality: Raw stored tariff values are used as configured without automatic corrections.
 * 5. If a tariff is missing: display "Dəqiq qiymət üçün bizimlə əlaqə saxlayın." (No interpolation).
 */

import {
  CargoItem,
  CargoAnalysisData,
  YukdasimaFormData,
  DeterministicPricingResult,
  SpecialItemDetected,
} from '../types';
import {
  DEFAULT_VEHICLE_CONFIG,
  VehicleConfig,
  VehicleSpec,
  getVehicleByCategory,
} from '../config/vehicles';
import {
  BUSINESS_PRICING_RULES,
  BusinessPricingRules,
  SpecialItemRule,
} from '../config/pricingRules';
import {
  lookupRouteTariff,
  lookupVehiclePrice,
  UnifiedRouteTariff,
} from '../services/tariffService';
import { normalizeDestinationName } from '../services/destinationResolver';

export interface PricingEngineOptions {
  vehicleConfig?: VehicleConfig;
  pricingRules?: BusinessPricingRules;
  selectedVehicleCategory?: '2m' | '3m' | '4m' | '5m' | '6m' | '7m' | 'tir';
}

/**
 * Main Deterministic Pricing Calculation Function
 */
export function calculateTransportationPricing(
  analysis: CargoAnalysisData | null,
  formData: YukdasimaFormData,
  options: PricingEngineOptions = {}
): DeterministicPricingResult {
  const vehicleConfig = options.vehicleConfig || DEFAULT_VEHICLE_CONFIG;
  const pricingRules = options.pricingRules || BUSINESS_PRICING_RULES;

  // 1. Evaluate Volume: Use selected vehicle capacity if direct mode, or UPPER END of Gemini volume range
  let evaluatedVolumeM3: number;
  let volumeRangeDisplay: string;
  let recommendedVehicle: VehicleSpec | undefined;
  let isOverCapacity = false;
  let requiresOperatorConfirmation = false;
  let vehicleCategory: '2m' | '3m' | '4m' | '5m' | '6m' | '7m' | 'tir' | undefined;

  if (options.selectedVehicleCategory) {
    vehicleCategory = options.selectedVehicleCategory;
    recommendedVehicle = getVehicleByCategory(options.selectedVehicleCategory, vehicleConfig);
    if (vehicleCategory === 'tir') {
      evaluatedVolumeM3 = 0;
      volumeRangeDisplay = 'TIR';
      requiresOperatorConfirmation = true;
    } else {
      evaluatedVolumeM3 = recommendedVehicle?.practicalCapacityM3 || 0;
      volumeRangeDisplay = recommendedVehicle ? `~${recommendedVehicle.practicalCapacityM3} m³` : '0 m³';
    }
  } else {
    const minVol = analysis ? analysis.estimatedTotalVolumeMinM3 : 0;
    const maxVol = analysis ? analysis.estimatedTotalVolumeMaxM3 : 0;
    evaluatedVolumeM3 = Math.max(0, maxVol);
    volumeRangeDisplay = analysis ? `${minVol}–${maxVol} m³` : '0 m³';

    // 2. Deterministic Vehicle Selection based on Upper Volume
    if (evaluatedVolumeM3 > vehicleConfig.maxAutoAssignableVolumeM3) {
      isOverCapacity = true;
      requiresOperatorConfirmation = true;
    } else if (evaluatedVolumeM3 <= 3.2) {
      vehicleCategory = '2m';
      recommendedVehicle = getVehicleByCategory('2m', vehicleConfig);
    } else if (evaluatedVolumeM3 <= 6.5) {
      vehicleCategory = '3m';
      recommendedVehicle = getVehicleByCategory('3m', vehicleConfig);
    } else if (evaluatedVolumeM3 <= 12.8) {
      vehicleCategory = '4m';
      recommendedVehicle = getVehicleByCategory('4m', vehicleConfig);
    } else if (evaluatedVolumeM3 <= 16.0) {
      vehicleCategory = '5m';
      recommendedVehicle = getVehicleByCategory('5m', vehicleConfig);
    } else if (evaluatedVolumeM3 <= 27.5) {
      vehicleCategory = '6m';
      recommendedVehicle = getVehicleByCategory('6m', vehicleConfig);
    } else {
      vehicleCategory = '7m';
      recommendedVehicle = getVehicleByCategory('7m', vehicleConfig);
    }
  }

  // 3. Detect Special / Heavy / Large items from AI items list and user notes
  const detectedSpecialItems: SpecialItemDetected[] = [];
  let hasLargeItemFitRisk = false;

  const itemNamesText = normalizeDestinationName((analysis?.items.map((i) => i.name) || []).join(' , '));
  const detailsText = normalizeDestinationName(formData.details || '');

  for (const rule of pricingRules.specialItemRules) {
    const matched = rule.keywords.some(
      (kw) => mentionsKeyword(itemNamesText, kw, false) || mentionsKeyword(detailsText, kw, true)
    );
    if (matched) {
      detectedSpecialItems.push({
        type: rule.type,
        name: rule.name,
        startingPrice: rule.startingPrice,
        message: rule.message,
        requiresFitConfirmation: rule.requiresFitConfirmation,
        requiresOperatorConfirmation: rule.requiresOperatorConfirmation,
      });

      if (rule.requiresFitConfirmation) {
        hasLargeItemFitRisk = true;
      }
      if (rule.requiresOperatorConfirmation) {
        requiresOperatorConfirmation = true;
      }
    }
  }

  // 4. Route Tariff Lookup via Centralized Tariff Service (Single Source of Truth)
  const matchedRoute = lookupRouteTariff(formData.fromAddress, formData.toAddress);
  let vehicleTransportPrice: number | undefined;
  let hasMissingTariff = false;
  const isIntercity = matchedRoute ? matchedRoute.isIntercity : checkIfIntercityFromText(formData.fromAddress, formData.toAddress);

  if (recommendedVehicle && vehicleCategory && matchedRoute) {
    // Read price for vehicle category directly from tariff database (raw configured values)
    const tariffPrice = lookupVehiclePrice(matchedRoute, vehicleCategory);

    if (tariffPrice !== null && tariffPrice > 0) {
      // Use exact configured tariff without interpolation or guessing
      vehicleTransportPrice = tariffPrice;
    } else {
      hasMissingTariff = true;
      requiresOperatorConfirmation = true;
    }
  } else if (formData.fromAddress.trim() || formData.toAddress.trim()) {
    // Destination provided but no tariff found in database -> missing tariff
    hasMissingTariff = true;
    requiresOperatorConfirmation = true;
  }

  // Format vehicle transport price display
  let vehicleTransportPriceDisplay: string;
  if (isOverCapacity) {
    vehicleTransportPriceDisplay = 'Mütəxəssis təsdiqi tələb olunur';
  } else if (hasMissingTariff || vehicleTransportPrice === undefined) {
    vehicleTransportPriceDisplay = 'Dəqiq qiymət üçün bizimlə əlaqə saxlayın.';
  } else {
    vehicleTransportPriceDisplay = `${vehicleTransportPrice} AZN`;
  }

  // 5. Worker Service Calculation & Intercity Rule
  const requestedWorkerCount = formData.workerCount !== undefined ? formData.workerCount : 2;
  let workerServiceStatus: 'included_initial' | 'intercity_excluded' | 'stairs_extra_required' | 'not_requested' = 'included_initial';
  let workerServiceDisplay = '20 AZN-dən / nəfər';
  let workerDisclaimer: string | undefined;

  // Intercity worker rule: Workers travelling to regions are EXCLUDED from automatic pricing
  if (isIntercity) {
    workerServiceStatus = 'intercity_excluded';
    workerServiceDisplay = 'Ayrıca hesablanır';
    workerDisclaimer = pricingRules.intercityWorkerDisclaimer;
    requiresOperatorConfirmation = true;
  } else {
    // Local job: Evaluate floor and elevator rules
    const fromFloorNum = parseFloorNumber(formData.fromFloor);
    const toFloorNum = parseFloorNumber(formData.toFloor);
    const hasElevator = formData.hasElevator;
    const itemsFit = formData.itemsFitElevator;

    const fromHasUsableElevator = (hasElevator === 'yes' || hasElevator === 'from_only') && itemsFit !== 'no';
    const toHasUsableElevator = (hasElevator === 'yes' || hasElevator === 'to_only') && itemsFit !== 'no';

    const highStairsAtOrigin = !fromHasUsableElevator && fromFloorNum >= pricingRules.stairsFloorThreshold;
    const highStairsAtDest = !toHasUsableElevator && toFloorNum >= pricingRules.stairsFloorThreshold;

    if (highStairsAtOrigin || highStairsAtDest) {
      workerServiceStatus = 'stairs_extra_required';
      workerServiceDisplay = '20 AZN-dən / nəfər (əlavə mərtəbə haqqı ilə)';
      workerDisclaimer = 'Mərtəbə və ağırlığa görə əlavə daşıma haqqı tələb oluna bilər.';
      requiresOperatorConfirmation = true;
    } else {
      workerServiceStatus = 'included_initial';
      workerServiceDisplay = '20 AZN-dən / nəfər (İlkin təxmin)';
    }
  }

  // 6. Furniture Disassembly / Assembly craftsman service rule
  const needsAssembly = !!formData.needsAssembly;
  const assemblyServiceDisplay = needsAssembly ? 'Ayrıca hesablanır' : 'Tələb olunmur';

  // 7. Assemble Notices and Disclaimers
  const notices: string[] = [];

  if (isOverCapacity) {
    notices.push(pricingRules.overloadMessage);
  } else if (hasLargeItemFitRisk) {
    notices.push(pricingRules.largeItemFitWarning);
  }

  if (hasMissingTariff && (formData.fromAddress || formData.toAddress)) {
    notices.push(pricingRules.missingTariffDisclaimer);
  }

  if (needsAssembly) {
    notices.push(pricingRules.assemblyDisclaimer);
  }

  // Stairs notice if applicable
  let stairsNotice: string | undefined;
  if (workerServiceStatus === 'stairs_extra_required') {
    stairsNotice = 'Mərtəbə və ağırlığa görə əlavə daşıma haqqı tələb oluna bilər.';
  }

  // Vehicle display info
  const vehicleName = recommendedVehicle
    ? recommendedVehicle.name
    : isOverCapacity
    ? 'Böyük həcmli xüsusi nəqliyyat / Çoxsaylı reys'
    : 'Yük maşını təyin edilir';

  const vehicleDimensionsDisplay = (recommendedVehicle && recommendedVehicle.category !== 'tir')
    ? `${recommendedVehicle.lengthM.toFixed(2)}m (U) × ${recommendedVehicle.widthM.toFixed(2)}m (E) × ${recommendedVehicle.heightM.toFixed(2)}m (H)`
    : undefined;

  return {
    evaluatedVolumeM3,
    volumeRangeDisplay,
    vehicleCategory,
    vehicleName,
    vehicleDimensionsDisplay,
    vehicleTheoreticalVolumeM3: recommendedVehicle?.theoreticalVolumeM3,
    vehiclePracticalCapacityM3: recommendedVehicle?.practicalCapacityM3,
    isOverCapacity,
    requiresOperatorConfirmation,
    hasLargeItemFitRisk,
    hasMissingTariff,
    isIntercity,
    vehicleTransportPrice,
    vehicleTransportPriceDisplay,
    workerCount: requestedWorkerCount,
    workerStartingPricePerPerson: pricingRules.workerBaseStartingPrice,
    workerServiceStatus,
    workerServiceDisplay,
    workerDisclaimer,
    needsAssembly,
    assemblyServiceDisplay,
    stairsNotice,
    specialItems: detectedSpecialItems,
    notices,
    routeSummary: matchedRoute
      ? `${matchedRoute.origin} → ${matchedRoute.destination}`
      : (formData.fromAddress || formData.toAddress
          ? `${formData.fromAddress || 'Bakı'} → ${formData.toAddress || 'Təyin edilməyib'}`
          : undefined),
    distanceKm: matchedRoute?.distanceKm ?? undefined,
  };
}

const NEGATION_WORDS = new Set(['yoxdur', 'yox', 'deyil', 'olmayacaq', 'olmayacag', 'yoxdu']);

/**
 * True when `text` (normalized) mentions `keyword` as a whole word, allowing a short
 * Azerbaijani suffix ("seyfi", "pianonu") but not a different word ("Seyfəddin").
 * When `checkNegation` is set, "piano yoxdur" / "seyf deyil" do not count.
 */
export function mentionsKeyword(text: string, keyword: string, checkNegation: boolean): boolean {
  const kw = normalizeDestinationName(keyword);
  if (!text || !kw) return false;
  const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(?:^|\\s)${escaped}[a-z]{0,3}(?=\\s|$)`, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (!checkNegation) return true;
    const following = text.slice(m.index + m[0].length).trim().split(' ').slice(0, 2);
    if (!following.some((w) => NEGATION_WORDS.has(w))) return true;
  }
  return false;
}

/**
 * Parses a floor value typed by the user ("5", "5-ci", "beşinci", "zirzəmi").
 * Unknown values fall back to 1.
 */
export function parseFloorNumber(value: string | undefined): number {
  const raw = (value || '').toString().trim().toLowerCase();
  const digits = raw.match(/-?\d+/);
  if (digits) return parseInt(digits[0], 10);
  const norm = normalizeDestinationName(raw);
  const words: Record<string, number> = {
    birinci: 1, ikinci: 2, ucuncu: 3, dorduncu: 4, besinci: 5, altinci: 6, yeddinci: 7,
    sekkizinci: 8, doqquzuncu: 9, onuncu: 10, bir: 1, iki: 2, uc: 3, dord: 4, bes: 5,
    alti: 6, yeddi: 7, sekkiz: 8, doqquz: 9, on: 10,
  };
  for (const token of norm.split(' ')) {
    if (words[token] !== undefined) return words[token];
  }
  return 1;
}

/**
 * Fast helper to detect if addresses mention intercity Azerbaijani regions
 */
function checkIfIntercityFromText(from: string, to: string): boolean {
  const regions = [
    'gəncə', 'gence', 'şəki', 'seki', 'quba', 'qusar', 'lənkəran', 'lenkeran', 'astara',
    'mingəçevir', 'mingecevir', 'qəbələ', 'qebele', 'şamaxı', 'samaxi', 'ismayıllı', 'ismayilli',
    'bərdə', 'berde', 'şirvan', 'shirvan', 'zaqatala', 'xaçmaz', 'xacmaz', 'naxçıvan', 'şuşa',
    'tovuz', 'qazax', 'şəmkir', 'masallı', 'göyçay', 'salyan'
  ];
  const combined = `${from} ${to}`.toLowerCase();
  return regions.some((r) => combined.includes(r));
}
