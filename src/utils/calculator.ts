import { YukdasimaFormData, YukdasimaResult, EvakuasiyaFormData, EvakuasiyaResult } from '../types';
import { CONTACT_INFO } from '../constants/contact';
import { calculateTransportationPricing } from '../pricing/pricingEngine';

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

export function calculateEvakuasiyaEstimate(data: EvakuasiyaFormData): EvakuasiyaResult {
  const from = data.fromAddress.trim().toLowerCase();
  const to = data.toAddress.trim().toLowerCase();

  let distanceKm = 15; // default fallback

  // Sample real distances for common Azerbaijani routes
  if (
    (from.includes('nərimanov') || from.includes('nerimanov')) &&
    (to.includes('xırdalan') || to.includes('xirdalan'))
  ) {
    distanceKm = 18;
  } else if (
    (from.includes('xırdalan') || from.includes('xirdalan')) &&
    (to.includes('nərimanov') || to.includes('nerimanov'))
  ) {
    distanceKm = 18;
  } else if (from.includes('sumqayıt') || to.includes('sumqayıt') || from.includes('sumqayit') || to.includes('sumqayit')) {
    distanceKm = 32;
  } else if (from.includes('yasamal') && (to.includes('əhmədli') || to.includes('ehmedli'))) {
    distanceKm = 19;
  } else if (from.includes('mərdəkan') || to.includes('mərdəkan') || from.includes('bilgəh') || to.includes('bilgeh')) {
    distanceKm = 28;
  } else if (from.length > 2 && to.length > 2) {
    // deterministic pseudo-distance based on string lengths
    distanceKm = Math.min(45, Math.max(8, 10 + (from.length + to.length) % 22));
  }

  let minPrice = 30;
  let maxPrice = 40;

  // Distance tier
  if (distanceKm <= 10) {
    minPrice = 25;
    maxPrice = 35;
  } else if (distanceKm <= 20) {
    minPrice = 35;
    maxPrice = 45;
  } else if (distanceKm <= 35) {
    minPrice = 50;
    maxPrice = 65;
  } else {
    minPrice = 70;
    maxPrice = 90;
  }

  // Car type adjustments
  if (data.carType === 'SUV / Jeep') {
    minPrice += 10;
    maxPrice += 15;
  } else if (data.carType === 'Minivan' || data.carType === 'Mikroavtobus') {
    minPrice += 15;
    maxPrice += 20;
  }

  // Broken/immobile status
  if (data.canMove === 'Xeyr') {
    minPrice += 10;
    maxPrice += 15;
  }

  return {
    fromAddress: data.fromAddress || 'Qeyd olunmayıb',
    toAddress: data.toAddress || 'Qeyd olunmayıb',
    distanceKm,
    carType: data.carType,
    canMove: data.canMove,
    estimatedPrice: `${minPrice}–${maxPrice} AZN`,
  };
}

export function generateWhatsAppLink(text: string): string {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}?text=${encoded}`;
}
