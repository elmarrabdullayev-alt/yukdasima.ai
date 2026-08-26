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
 * Calculates Evakuasiya price estimate using the centralized tariff database and deterministic adjustments.
 * 
 * Rules:
 * 1. Base route pricing: reads ONLY prices_azn.evacuator from the regional database or local tariff.
 * 2. Vehicle condition surcharge:
 *    - Working ('Bəli'): +0 AZN
 *    - Non-working / locked ('Xeyr'): +5 AZN
 * 3. Vehicle type surcharge:
 *    - Sedan: +0 AZN
 *    - SUV / Jeep: +0 AZN
 *    - Hetçbek: +0 AZN
 *    - Minivan: +10 AZN
 *    - Mikroavtobus & Digər: No automatic AZN estimate; requires operator confirmation.
 * 4. Deterministic calculation order:
 *    finalEstimate = baseRoutePrice + vehicleTypeSurcharge + conditionSurcharge
 * 5. If evacuator tariff is missing/null or route unsupported, displays clear contact notice without an invented price.
 */
export function calculateEvakuasiyaEstimate(data: EvakuasiyaFormData): EvakuasiyaResult {
  const tariffResult = lookupEvacuatorTariff(data.fromAddress, data.toAddress);

  // 1. Mikroavtobus and Digər (or any unlisted type) require operator confirmation (NO automatic numeric estimate)
  const isOperatorConfirmedType =
    data.carType === 'Mikroavtobus' ||
    data.carType === 'Digər' ||
    !['Sedan', 'SUV / Jeep', 'Hetçbek', 'Minivan'].includes(data.carType);

  if (isOperatorConfirmedType) {
    return {
      fromAddress: data.fromAddress || 'Qeyd olunmayıb',
      toAddress: data.toAddress || 'Qeyd olunmayıb',
      distanceKm: tariffResult.distanceKm,
      carType: data.carType,
      canMove: data.canMove,
      estimatedPrice: 'Operatorla dəqiqləşdirilir',
      hasMissingTariff: true,
      requiresOperatorConfirmation: true,
      tariffDisclaimer: 'Bu avtomobil növü üçün qiymət operator tərəfindən dəqiqləşdirilir.',
      isIntercity: tariffResult.isIntercity,
      rawPrice: null,
      basePrice: tariffResult.price,
      vehicleTypeSurcharge: 0,
      conditionSurcharge: 0,
    };
  }

  // 2. Check if route has missing tariff or is unsupported in database
  if (tariffResult.hasMissingTariff || tariffResult.price === null || tariffResult.price <= 0) {
    return {
      fromAddress: data.fromAddress || 'Qeyd olunmayıb',
      toAddress: data.toAddress || 'Qeyd olunmayıb',
      distanceKm: tariffResult.distanceKm,
      carType: data.carType,
      canMove: data.canMove,
      estimatedPrice: 'Dəqiq qiymət üçün bizimlə əlaqə saxlayın.',
      hasMissingTariff: true,
      requiresOperatorConfirmation: true,
      tariffDisclaimer: tariffResult.disclaimer || 'Bu marşrut üçün avtomatik qiymət mövcud deyil.',
      isIntercity: tariffResult.isIntercity,
      rawPrice: null,
      basePrice: null,
      vehicleTypeSurcharge: 0,
      conditionSurcharge: 0,
    };
  }

  // 3. Supported automatically priced types (Sedan, SUV / Jeep, Hetçbek, Minivan)
  const baseRoutePrice = tariffResult.price;
  const vehicleTypeSurcharge = data.carType === 'Minivan' ? 10 : 0;
  const conditionSurcharge = data.canMove === 'Xeyr' ? 5 : 0;
  const finalPrice = baseRoutePrice + vehicleTypeSurcharge + conditionSurcharge;

  // Preserve "35 AZN-dən" style for local Baku routes, and "XX AZN" for specific/regional routes
  const isBakuLocal = !tariffResult.isIntercity && tariffResult.displayPrice.includes('-dən');
  const displayPrice = isBakuLocal ? `${finalPrice} AZN-dən` : `${finalPrice} AZN`;

  return {
    fromAddress: data.fromAddress || 'Qeyd olunmayıb',
    toAddress: data.toAddress || 'Qeyd olunmayıb',
    distanceKm: tariffResult.distanceKm,
    carType: data.carType,
    canMove: data.canMove,
    estimatedPrice: displayPrice,
    hasMissingTariff: false,
    requiresOperatorConfirmation: false,
    tariffDisclaimer: tariffResult.disclaimer,
    isIntercity: tariffResult.isIntercity,
    rawPrice: finalPrice,
    basePrice: baseRoutePrice,
    vehicleTypeSurcharge,
    conditionSurcharge,
  };
}

export function generateWhatsAppLink(text: string): string {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}?text=${encoded}`;
}
