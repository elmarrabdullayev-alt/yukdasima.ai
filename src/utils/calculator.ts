import { YukdasimaFormData, YukdasimaResult, EvakuasiyaFormData, EvakuasiyaResult } from '../types';
import { CONTACT_INFO } from '../constants/contact';
import { calculateTransportationPricing } from '../pricing/pricingEngine';
import { lookupEvacuatorTariff } from '../services/tariffService';

export function calculateYukdasimaEstimate(data: YukdasimaFormData): YukdasimaResult {
  const result = calculateTransportationPricing(null, data);

  return {
    volume: result.volumeRangeDisplay,
    truckSize: result.vehicleName,
    movers: `${result.workerCount} nəfər`,
    estimatedPrice: result.vehicleTransportPriceDisplay,
    routeInfo: result.routeSummary || (data.fromAddress && data.toAddress ? `${data.fromAddress} → ${data.toAddress}` : undefined),
    detailsSummary: data.details ? data.details.slice(0, 80) : undefined,
  };
}

/**
 * Calculates Evakuasiya price estimate using the centralized tariff database.
 * 
 * Rules:
 * 1. For Bakı -> Rayon routes, reads ONLY prices_azn.evacuator from the regional database.
 * 2. Does NOT use any generic 50 AZN fallback for regional routes.
 * 3. Does NOT use truck (2m, 3m, 4m, 5m, 6m, 7m, tir) prices for evacuator.
 * 4. If evacuator tariff is missing/null or route unsupported, displays clear contact notice without an invented price.
 * 5. Separates Bakı local pricing from regional pricing.
 */
export function calculateEvakuasiyaEstimate(data: EvakuasiyaFormData): EvakuasiyaResult {
  const tariffResult = lookupEvacuatorTariff(data.fromAddress, data.toAddress);

  return {
    fromAddress: data.fromAddress || 'Qeyd olunmayıb',
    toAddress: data.toAddress || 'Qeyd olunmayıb',
    distanceKm: tariffResult.distanceKm,
    carType: data.carType,
    canMove: data.canMove,
    estimatedPrice: tariffResult.displayPrice,
    hasMissingTariff: tariffResult.hasMissingTariff,
    tariffDisclaimer: tariffResult.disclaimer,
    isIntercity: tariffResult.isIntercity,
    rawPrice: tariffResult.price,
  };
}

export function generateWhatsAppLink(text: string): string {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}?text=${encoded}`;
}
