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
import { CargoAnalysisData, YukdasimaFormData } from '../types';

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

  // Test 3: Bakı -> Quba + 5m³ cargo -> 3m -> 170 AZN
  {
    const analysis = createMockAnalysis(4.0, 5.0);
    const form = createMockForm({ fromAddress: 'Bakı', toAddress: 'Quba' });
    const result = calculateTransportationPricing(analysis, form);
    assert(
      result.vehicleCategory === '3m' && result.vehicleTransportPrice === 170,
      'Test 3: Bakı -> Quba + 5m³ -> 3m -> 170 AZN'
    );
  }

  // Test 4: Bakı -> Şəki + 15m³ cargo -> 5m -> 320 AZN
  {
    const analysis = createMockAnalysis(13.0, 15.0);
    const form = createMockForm({ fromAddress: 'Bakı', toAddress: 'Şəki' });
    const result = calculateTransportationPricing(analysis, form);
    assert(
      result.vehicleCategory === '5m' && result.vehicleTransportPrice === 320,
      'Test 4: Bakı -> Şəki + 15m³ -> 5m -> 320 AZN'
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
      result.vehicleCategory === '4m' && result.vehicleTransportPrice === 330,
      'Test 14: Bakı -> Tovuz + 10m³ -> 4m -> 330 AZN'
    );
  }

  console.log(`[Pricing Engine Verification] ${passed}/${total} tests passed.`);
  return passed === total;
}
