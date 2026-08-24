/**
 * DETERMINISTIC PRICING ENGINE TEST SUITE
 * 
 * Verifies all required pricing and vehicle selection test cases:
 * 1. 2m³ cargo -> 2m Transit
 * 2. Bakı -> Gəncə + 8-10m³ cargo (upper estimate 10m³) -> 4m -> 280 AZN & intercity worker disclaimer
 * 3. Bakı -> Quba + 5m³ cargo -> 3m -> 170 AZN
 * 4. Bakı -> Şəki + 15m³ cargo -> 5m -> 320 AZN
 * 5. Bakı -> Xırdalan + 3m³ cargo -> 2m Transit -> 35 AZN
 * 6. Bakı -> Sumqayıt + 7m³ cargo -> 4m -> 65 AZN
 * 7. Bakı daxili + 1m³ cargo -> 2m Transit -> minimum order price rule
 * 8. 28m³ cargo -> 7m vehicle
 * 9. 35m³ cargo -> Over capacity warning (> 32m³)
 * 10. Piano detected -> Piano 80 AZN+ rule & fit warning
 * 11. Safe / Heavy equipment detected -> Special item calculation notice
 * 12. Local Bakı + 5th floor + No elevator -> Stairs warning notice
 * 13. Missing tariff -> Displays "Dəqiq qiymət üçün bizimlə əlaqə saxlayın." without guessing
 * 14. Tovuz / Gazakh / Shusha regional V1 tariffs lookup
 */

import { calculateTransportationPricing } from './pricingEngine';
import { CargoAnalysisData, YukdasimaFormData, EvakuasiyaFormData } from '../types';
import { calculateEvakuasiyaEstimate } from '../utils/calculator';
import { lookupEvacuatorTariff, lookupRouteTariff } from '../services/tariffService';
import {
  resolveDestination,
  findDestinationSuggestions,
  normalizeDestinationName,
  isBakuOrigin,
  classifyRoute
} from '../services/destinationResolver';

function createMockAnalysis(minVol: number, maxVol: number, items: Array<{ name: string; qty: number; vol: number }> = []): CargoAnalysisData {
  return {
    items: items.map((it, idx) => ({
      id: `item-${idx}`,
      name: it.name,
      quantity: it.qty,
      estimatedVolumeM3: it.vol,
      confidence: 'high',
    })),
    estimatedTotalVolumeMinM3: minVol,
    estimatedTotalVolumeMaxM3: maxVol,
    analysisConfidence: 'high',
  };
}

function createMockForm(overrides: Partial<YukdasimaFormData> = {}): YukdasimaFormData {
  return {
    images: [],
    details: '',
    fromAddress: 'Bakı, Nərimanov',
    toAddress: 'Bakı, Yasamal',
    fromFloor: '1',
    toFloor: '1',
    hasElevator: 'yes',
    itemsFitElevator: 'yes',
    phone: '+994502311728',
    ...overrides,
  };
}

export function runPricingEngineVerificationTests(): boolean {
  let passed = 0;
  let total = 0;

  function assert(condition: boolean, desc: string) {
    total++;
    if (condition) {
      passed++;
      console.log(`[PASS] Test ${total}: ${desc}`);
    } else {
      console.error(`[FAIL] Test ${total}: ${desc}`);
    }
  }

  // Test 1: 2m³ cargo -> 2m Transit (<= 3.2 m³)
  {
    const analysis = createMockAnalysis(1.5, 2.0);
    const form = createMockForm();
    const result = calculateTransportationPricing(analysis, form);
    assert(result.vehicleCategory === '2m', 'Test 1: 2m³ assigns 2m Ford Transit');
  }

  // Test 2: Bakı -> Gəncə + 8–10m³ cargo (Upper 10m³) -> 4m -> 280 AZN, intercity workers excluded
  {
    const analysis = createMockAnalysis(8.0, 10.0);
    const form = createMockForm({ fromAddress: 'Bakı', toAddress: 'Gəncə' });
    const result = calculateTransportationPricing(analysis, form);
    assert(
      result.evaluatedVolumeM3 === 10 &&
      result.vehicleCategory === '4m' &&
      result.vehicleTransportPrice === 280 &&
      result.vehicleTransportPriceDisplay === '280 AZN' &&
      result.workerServiceStatus === 'intercity_excluded' &&
      result.isIntercity === true,
      'Test 2: Bakı -> Gəncə + 8-10m³ -> 10m³ upper -> 4m -> 280 AZN & intercity worker disclaimer'
    );
  }

  // Test 3: Bakı -> Quba + 5m³ cargo -> 3m -> 150 AZN
  {
    const analysis = createMockAnalysis(4.0, 5.0);
    const form = createMockForm({ fromAddress: 'Bakı', toAddress: 'Quba' });
    const result = calculateTransportationPricing(analysis, form);
    assert(
      result.vehicleCategory === '3m' && result.vehicleTransportPrice === 150,
      'Test 3: Bakı -> Quba + 5m³ -> 3m -> 150 AZN'
    );
  }

  // Test 4: Bakı -> Şəki + 15m³ cargo -> 5m -> 330 AZN
  {
    const analysis = createMockAnalysis(13.0, 15.0);
    const form = createMockForm({ fromAddress: 'Bakı', toAddress: 'Şəki' });
    const result = calculateTransportationPricing(analysis, form);
    assert(
      result.vehicleCategory === '5m' && result.vehicleTransportPrice === 330,
      'Test 4: Bakı -> Şəki + 15m³ -> 5m -> 330 AZN'
    );
  }

  // Test 5: Bakı -> Xırdalan + 3m³ cargo -> 2m Transit -> 35 AZN
  {
    const analysis = createMockAnalysis(2.0, 3.0);
    const form = createMockForm({ fromAddress: 'Bakı', toAddress: 'Xırdalan' });
    const result = calculateTransportationPricing(analysis, form);
    assert(
      result.vehicleCategory === '2m' && result.vehicleTransportPrice === 35,
      'Test 5: Bakı -> Xırdalan + 3m³ -> 2m Transit -> 35 AZN'
    );
  }

  // Test 6: Bakı -> Sumqayıt + 7m³ cargo -> 4m -> 65 AZN
  {
    const analysis = createMockAnalysis(5.5, 7.0);
    const form = createMockForm({ fromAddress: 'Bakı', toAddress: 'Sumqayıt' });
    const result = calculateTransportationPricing(analysis, form);
    assert(
      result.vehicleCategory === '4m' && result.vehicleTransportPrice === 65,
      'Test 6: Bakı -> Sumqayıt + 7m³ -> 4m -> 65 AZN'
    );
  }

  // Test 7: Bakı daxili + 1m³ cargo -> 2m Transit -> 25 AZN
  {
    const analysis = createMockAnalysis(0.5, 1.0);
    const form = createMockForm({ fromAddress: 'Bakı, Nərimanov', toAddress: 'Bakı, Yasamal' });
    const result = calculateTransportationPricing(analysis, form);
    assert(
      result.vehicleCategory === '2m' && (result.vehicleTransportPrice || 0) === 25,
      'Test 7: Bakı daxili + 1m³ -> 2m Transit -> 25 AZN'
    );
  }

  // Test 8: 28m³ cargo -> 7m vehicle (27.5 < vol <= 32)
  {
    const analysis = createMockAnalysis(25.0, 28.0);
    const form = createMockForm();
    const result = calculateTransportationPricing(analysis, form);
    assert(result.vehicleCategory === '7m', 'Test 8: 28m³ cargo assigns 7m vehicle');
  }

  // Test 9: 35m³ cargo -> Over capacity warning
  {
    const analysis = createMockAnalysis(30.0, 35.0);
    const form = createMockForm();
    const result = calculateTransportationPricing(analysis, form);
    assert(
      result.isOverCapacity === true && result.requiresOperatorConfirmation === true,
      'Test 9: 35m³ cargo triggers over capacity and operator confirmation'
    );
  }

  // Test 10: Piano detected -> Piano starting from 80 AZN warning & fit alert
  {
    const analysis = createMockAnalysis(2.0, 3.0, [{ name: 'Pianino', qty: 1, vol: 1.5 }]);
    const form = createMockForm({ details: 'Pianino daşınmalıdır' });
    const result = calculateTransportationPricing(analysis, form);
    const hasPiano = result.specialItems.some((sp) => sp.type === 'piano');
    assert(
      hasPiano && result.hasLargeItemFitRisk === true && result.requiresOperatorConfirmation === true,
      'Test 10: Piano detection triggers special item rule & fit confirmation'
    );
  }

  // Test 11: Safe / Heavy equipment detected
  {
    const analysis = createMockAnalysis(2.0, 3.0, [{ name: 'Böyük Dəmir Seyf', qty: 1, vol: 0.8 }]);
    const form = createMockForm();
    const result = calculateTransportationPricing(analysis, form);
    const hasSafe = result.specialItems.some((sp) => sp.type === 'safe');
    assert(
      hasSafe && result.requiresOperatorConfirmation === true,
      'Test 11: Safe detection triggers special calculation notice'
    );
  }

  // Test 12: Local Bakı + 5th floor + No elevator -> Stairs warning notice
  {
    const analysis = createMockAnalysis(4.0, 5.0);
    const form = createMockForm({
      fromAddress: 'Bakı, Nərimanov',
      toAddress: 'Bakı, Yasamal',
      fromFloor: '5',
      hasElevator: 'no',
    });
    const result = calculateTransportationPricing(analysis, form);
    assert(
      result.workerServiceStatus === 'stairs_extra_required' &&
      !!result.stairsNotice &&
      result.requiresOperatorConfirmation === true,
      'Test 12: 5th floor without elevator triggers stairs extra notice'
    );
  }

  // Test 13: Missing tariff destination -> No price guessed or interpolated
  {
    const analysis = createMockAnalysis(2.0, 3.0);
    const form = createMockForm({
      fromAddress: 'Bakı',
      toAddress: 'Xarici Ölkə / Tbilisi',
    });
    const result = calculateTransportationPricing(analysis, form);
    assert(
      result.hasMissingTariff === true &&
      result.vehicleTransportPrice === undefined &&
      result.vehicleTransportPriceDisplay === 'Dəqiq qiymət üçün bizimlə əlaqə saxlayın.',
      'Test 13: Missing route tariff shows exact disclaimer without guessing'
    );
  }

  // Test 14: Regional Tovuz and Karabakh route checks
  {
    const analysis = createMockAnalysis(8.0, 10.0);
    const form = createMockForm({ fromAddress: 'Bakı', toAddress: 'Tovuz' });
    const result = calculateTransportationPricing(analysis, form);
    assert(
      result.vehicleCategory === '4m' && result.vehicleTransportPrice === 350,
      'Test 14: Bakı -> Tovuz + 10m³ -> 4m -> 350 AZN'
    );
  }

  // --- EVAKUASIYA PRICING VERIFICATION TESTS ---

  // Test 15: Bakı -> Ağdaş Evakuasiya (Expected: 210 AZN from JSON database)
  {
    const evacForm: EvakuasiyaFormData = {
      fromAddress: 'Bakı',
      toAddress: 'Ağdaş',
      carType: 'Sedan',
      canMove: 'Bəli',
      conditionNotes: '',
      phone: '+994502311728',
    };
    const result = calculateEvakuasiyaEstimate(evacForm);
    assert(
      result.rawPrice === 210 &&
      result.estimatedPrice === '210 AZN' &&
      result.hasMissingTariff === false &&
      result.isIntercity === true,
      'Test 15: Bakı -> Ağdaş Evakuasiya uses JSON tariff 210 AZN (no 50 AZN fallback)'
    );
  }

  // Test 16: Bakı -> Gəncə Evakuasiya (Expected: 240 AZN from JSON database)
  {
    const evacForm: EvakuasiyaFormData = {
      fromAddress: 'Bakı',
      toAddress: 'Gəncə',
      carType: 'SUV / Jeep',
      canMove: 'Xeyr',
      conditionNotes: '',
      phone: '+994502311728',
    };
    const result = calculateEvakuasiyaEstimate(evacForm);
    assert(
      result.rawPrice === 240 &&
      result.estimatedPrice === '240 AZN' &&
      result.hasMissingTariff === false &&
      result.isIntercity === true,
      'Test 16: Bakı -> Gəncə Evakuasiya uses JSON tariff 240 AZN'
    );
  }

  // Test 17: Bakı -> Quba Evakuasiya (Expected: 150 AZN from JSON database)
  {
    const evacForm: EvakuasiyaFormData = {
      fromAddress: 'Bakı',
      toAddress: 'Quba',
      carType: 'Sedan',
      canMove: 'Bəli',
      conditionNotes: '',
      phone: '+994502311728',
    };
    const result = calculateEvakuasiyaEstimate(evacForm);
    assert(
      result.rawPrice === 150 &&
      result.estimatedPrice === '150 AZN' &&
      result.hasMissingTariff === false &&
      result.isIntercity === true,
      'Test 17: Bakı -> Quba Evakuasiya uses JSON tariff 150 AZN'
    );
  }

  // Test 18: Bakı -> Şəki Evakuasiya (Expected: 240 AZN from JSON database)
  {
    const evacForm: EvakuasiyaFormData = {
      fromAddress: 'Bakı',
      toAddress: 'Şəki',
      carType: 'Sedan',
      canMove: 'Bəli',
      conditionNotes: '',
      phone: '+994502311728',
    };
    const result = calculateEvakuasiyaEstimate(evacForm);
    assert(
      result.rawPrice === 240 &&
      result.estimatedPrice === '240 AZN' &&
      result.hasMissingTariff === false &&
      result.isIntercity === true,
      'Test 18: Bakı -> Şəki Evakuasiya uses JSON tariff 240 AZN'
    );
  }

  // Test 19: Missing evacuator tariff route (Cəngi / Ağdərə in JSON has evacuator: null)
  {
    const evacForm: EvakuasiyaFormData = {
      fromAddress: 'Bakı',
      toAddress: 'Cəngi',
      carType: 'Sedan',
      canMove: 'Bəli',
      conditionNotes: '',
      phone: '+994502311728',
    };
    const result = calculateEvakuasiyaEstimate(evacForm);
    assert(
      result.rawPrice === null &&
      result.hasMissingTariff === true &&
      result.estimatedPrice === 'Dəqiq qiymət üçün bizimlə əlaqə saxlayın.' &&
      result.tariffDisclaimer === 'Bu marşrut üçün avtomatik qiymət mövcud deyil.',
      'Test 19: Missing evacuator tariff displays contact notice without 50 AZN or invented price'
    );
  }

  // Test 20: Bakı local area Evakuasiya (Expected: 35 AZN-dən)
  {
    const evacForm: EvakuasiyaFormData = {
      fromAddress: 'Bakı, Nərimanov',
      toAddress: 'Bakı, Yasamal',
      carType: 'Sedan',
      canMove: 'Bəli',
      conditionNotes: '',
      phone: '+994502311728',
    };
    const result = calculateEvakuasiyaEstimate(evacForm);
    assert(
      result.rawPrice === 35 &&
      result.estimatedPrice === '35 AZN-dən' &&
      result.hasMissingTariff === false &&
      result.isIntercity === false,
      'Test 20: Bakı local area Evakuasiya uses local tariff 35 AZN-dən'
    );
  }

  // Test 21: Bakı -> Xırdalan / Sumqayıt suburban Evakuasiya
  {
    const xirdalanRes = calculateEvakuasiyaEstimate({
      fromAddress: 'Bakı',
      toAddress: 'Xırdalan',
      carType: 'Sedan',
      canMove: 'Bəli',
      conditionNotes: '',
      phone: '+994502311728',
    });
    const sumqayitRes = calculateEvakuasiyaEstimate({
      fromAddress: 'Bakı',
      toAddress: 'Sumqayıt',
      carType: 'Sedan',
      canMove: 'Bəli',
      conditionNotes: '',
      phone: '+994502311728',
    });
    assert(
      xirdalanRes.estimatedPrice === '40 AZN' && sumqayitRes.estimatedPrice === '55 AZN',
      'Test 21: Suburban routes Xırdalan (40 AZN) and Sumqayıt (55 AZN) are correct'
    );
  }

  // --- DESTINATION RESOLUTION & ALIAS MATCHING TESTS ---

  // Test 22: Ağdaş variants ("agdas", "Agdas", "aqdas", "agdash")
  {
    const variants = ['Ağdaş', 'agdas', 'Agdas', 'aqdas', 'agdash'];
    const allMatch = variants.every((v) => {
      const res = resolveDestination(v);
      const evac = lookupEvacuatorTariff('Bakı', v);
      return res?.canonicalName === 'Ağdaş' && evac.price === 210;
    });
    assert(allMatch, 'Test 22: Ağdaş variants ("agdas", "aqdas", "agdash") resolve to Ağdaş with 210 AZN Evacuator tariff');
  }

  // Test 23: Qəbələ variants ("qabala", "qebele", "gabala", "gebele")
  {
    const variants = ['Qəbələ', 'qabala', 'qebele', 'gabala', 'gebele'];
    const allMatch = variants.every((v) => {
      const res = resolveDestination(v);
      const evac = lookupEvacuatorTariff('Bakı', v);
      const route = lookupRouteTariff('Bakı', v);
      return res?.canonicalName === 'Qəbələ' && evac.price === 210 && route?.prices['4m'] === 260;
    });
    assert(allMatch, 'Test 23: Qəbələ variants ("qabala", "qebele", "gabala", "gebele") resolve to Qəbələ with 210 AZN Evacuator & 260 AZN 4m tariff');
  }

  // Test 24: Gəncə variants ("gence", "ganja", "Gence")
  {
    const variants = ['Gəncə', 'gence', 'ganja', 'Gence'];
    const allMatch = variants.every((v) => {
      const res = resolveDestination(v);
      const evac = lookupEvacuatorTariff('Bakı', v);
      return res?.canonicalName === 'Gəncə' && evac.price === 240;
    });
    assert(allMatch, 'Test 24: Gəncə variants ("gence", "ganja") resolve to Gəncə with 240 AZN Evacuator tariff');
  }

  // Test 25: Şəki variants ("seki", "sheki", "shaki")
  {
    const variants = ['Şəki', 'seki', 'sheki', 'shaki'];
    const allMatch = variants.every((v) => {
      const res = resolveDestination(v);
      const evac = lookupEvacuatorTariff('Bakı', v);
      return res?.canonicalName === 'Şəki' && evac.price === 240;
    });
    assert(allMatch, 'Test 25: Şəki variants ("seki", "sheki", "shaki") resolve to Şəki with 240 AZN Evacuator tariff');
  }

  // Test 26: Lənkəran variants ("lenkeran", "lankaran")
  {
    const variants = ['Lənkəran', 'lenkeran', 'lankaran'];
    const allMatch = variants.every((v) => {
      const res = resolveDestination(v);
      const evac = lookupEvacuatorTariff('Bakı', v);
      return res?.canonicalName === 'Lənkəran' && evac.price === 210;
    });
    assert(allMatch, 'Test 26: Lənkəran variants ("lenkeran", "lankaran") resolve to Lənkəran with 210 AZN Evacuator tariff');
  }

  // Test 27: Xaçmaz variants ("xacmaz", "khachmaz")
  {
    const variants = ['Xaçmaz', 'xacmaz', 'khachmaz'];
    const allMatch = variants.every((v) => {
      const res = resolveDestination(v);
      const evac = lookupEvacuatorTariff('Bakı', v);
      return res?.canonicalName === 'Xaçmaz' && evac.price === 140;
    });
    assert(allMatch, 'Test 27: Xaçmaz variants ("xacmaz", "khachmaz") resolve to Xaçmaz with 140 AZN Evacuator tariff');
  }

  // Test 28: İsmayıllı variants ("ismayilli", "ismailly")
  {
    const variants = ['İsmayıllı', 'ismayıllı', 'ismayilli', 'ismailly'];
    const allMatch = variants.every((v) => {
      const res = resolveDestination(v);
      const evac = lookupEvacuatorTariff('Bakı', v);
      return res?.canonicalName === 'İsmayıllı' && evac.price === 180;
    });
    assert(allMatch, 'Test 28: İsmayıllı variants ("ismayilli", "ismailly") resolve to İsmayıllı with 180 AZN Evacuator tariff');
  }

  // Test 29: Autocomplete suggestions for partial queries
  {
    const qabSuggestions = findDestinationSuggestions('qab').map((s) => s.canonicalName);
    const shekSuggestions = findDestinationSuggestions('shek').map((s) => s.canonicalName);
    const agdasSuggestions = findDestinationSuggestions('agdas').map((s) => s.canonicalName);

    assert(
      qabSuggestions.includes('Qəbələ') &&
      shekSuggestions.includes('Şəki') &&
      agdasSuggestions.includes('Ağdaş'),
      'Test 29: Autocomplete finds canonical destinations from transliterated substrings ("qab" -> Qəbələ, "shek" -> Şəki)'
    );
  }

  // Test 30: End-to-end Yükdaşıma pricing with non-Azerbaijani letters ("qebele", "ganja")
  {
    const qebeleAnalysis = createMockAnalysis(8.0, 10.0);
    const qebeleForm = createMockForm({ fromAddress: 'Bakı', toAddress: 'qebele' });
    const qebeleResult = calculateTransportationPricing(qebeleAnalysis, qebeleForm);

    const ganjaAnalysis = createMockAnalysis(8.0, 10.0);
    const ganjaForm = createMockForm({ fromAddress: 'Bakı', toAddress: 'ganja' });
    const ganjaResult = calculateTransportationPricing(ganjaAnalysis, ganjaForm);

    assert(
      qebeleResult.vehicleTransportPrice === 260 &&
      qebeleResult.isIntercity === true &&
      ganjaResult.vehicleTransportPrice === 280 &&
      ganjaResult.isIntercity === true,
      'Test 30: End-to-end Yükdaşıma pricing calculates correctly with transliterated destination inputs ("qebele" -> 260 AZN, "ganja" -> 280 AZN)'
    );
  }

  // --- ROUTE ORIGIN CLASSIFICATION & NON-BAKU ORIGIN ISOLATION TESTS ---

  // Test 31: Sumqayıt -> Ağdaş route tariff lookup must NOT use Bakı -> Ağdaş regional tariff
  {
    const sumqayitToAgdasRoute = lookupRouteTariff('Sumqayıt', 'Ağdaş');
    const bakuToAgdasRoute = lookupRouteTariff('Bakı', 'Ağdaş');
    const isSumqayitBaku = isBakuOrigin('Sumqayıt');
    const isBakuBaku = isBakuOrigin('Bakı');

    assert(
      sumqayitToAgdasRoute === null &&
      bakuToAgdasRoute !== null &&
      bakuToAgdasRoute.prices.evacuator === 210 &&
      isSumqayitBaku === false &&
      isBakuBaku === true,
      'Test 31: Sumqayıt -> Ağdaş returns null (does NOT use Bakı -> Ağdaş regional tariff)'
    );
  }

  // Test 32: Gəncə -> Ağdaş and Quba -> Gəncə route lookups return null
  {
    const genceToAgdas = lookupRouteTariff('Gəncə', 'Ağdaş');
    const qubaToGence = lookupRouteTariff('Quba', 'Gəncə');
    const xirdalanToAgdas = lookupRouteTariff('Xırdalan', 'Ağdaş');

    assert(
      genceToAgdas === null &&
      qubaToGence === null &&
      xirdalanToAgdas === null,
      'Test 32: Non-Bakı origins (Gəncə -> Ağdaş, Quba -> Gəncə, Xırdalan -> Ağdaş) return null'
    );
  }

  // Test 33: Evacuator lookup for non-Bakı origins returns null price & missing tariff disclaimer
  {
    const sumqayitAgdasEvac = lookupEvacuatorTariff('Sumqayıt', 'Ağdaş');
    const genceAgdasEvac = lookupEvacuatorTariff('Gəncə', 'Ağdaş');
    const bakiAgdasEvac = lookupEvacuatorTariff('Bakı', 'Ağdaş');

    assert(
      sumqayitAgdasEvac.price === null &&
      sumqayitAgdasEvac.hasMissingTariff === true &&
      sumqayitAgdasEvac.displayPrice === 'Dəqiq qiymət üçün bizimlə əlaqə saxlayın.' &&
      genceAgdasEvac.price === null &&
      genceAgdasEvac.hasMissingTariff === true &&
      bakiAgdasEvac.price === 210 &&
      bakiAgdasEvac.hasMissingTariff === false,
      'Test 33: Evacuator for non-Bakı origin returns price: null and "Dəqiq qiymət üçün bizimlə əlaqə saxlayın."'
    );
  }

  // Test 34: Evakuasiya Estimate calculation for Sumqayıt -> Ağdaş
  {
    const evakRes = calculateEvakuasiyaEstimate({
      fromAddress: 'Sumqayıt',
      toAddress: 'Ağdaş',
      carType: 'Sedan',
      canMove: 'Bəli',
      conditionNotes: '',
      phone: '+994502311728',
    });

    assert(
      evakRes.hasMissingTariff === true &&
      evakRes.estimatedPrice === 'Dəqiq qiymət üçün bizimlə əlaqə saxlayın.' &&
      evakRes.isIntercity === false,
      'Test 34: Evakuasiya Estimate for Sumqayıt -> Ağdaş requires operator confirmation and shows missing tariff'
    );
  }

  // Test 35: End-to-end Yükdaşıma pricing for Sumqayıt -> Ağdaş returns missing tariff & requires operator confirmation
  {
    const analysis = createMockAnalysis(8.0, 10.0);
    const form = createMockForm({ fromAddress: 'Sumqayıt', toAddress: 'Ağdaş' });
    const result = calculateTransportationPricing(analysis, form);

    assert(
      result.hasMissingTariff === true &&
      result.requiresOperatorConfirmation === true &&
      result.vehicleTransportPrice === undefined &&
      result.vehicleTransportPriceDisplay === 'Dəqiq qiymət üçün bizimlə əlaqə saxlayın.' &&
      result.notices.some((n) => n.includes('Bu marşrut üçün avtomatik qiymət mövcud deyil')),
      'Test 35: End-to-end Yükdaşıma pricing for Sumqayıt -> Ağdaş shows missing tariff notice and no automatic price'
    );
  }

  console.log(`[Pricing Engine Verification] ${passed}/${total} tests passed.`);
  return passed === total;
}
