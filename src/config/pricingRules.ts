/**
 * BUSINESS PRICING RULES CONFIGURATION
 * 
 * Centralized business rules for deterministic moving prices, worker fees,
 * floor/elevator handling, special items, and assembly services.
 * 
 * Admin-ready architecture: these values can later be made dynamic in an admin panel.
 */

export interface SpecialItemRule {
  type: 'piano' | 'safe' | 'oversized_fridge' | 'long_furniture' | 'commercial_equipment' | 'other_heavy';
  keywords: string[];
  name: string;
  startingPrice?: number;
  message: string;
  requiresFitConfirmation: boolean;
  requiresOperatorConfirmation: boolean;
}

export interface BusinessPricingRules {
  /** Smallest vehicle starting price in AZN */
  minimumVehicleOrderPrice: number;
  /** Worker baseline starting price per person in AZN */
  workerBaseStartingPrice: number;
  /** Floor threshold for stairs carrying consideration (e.g., 3rd floor and above) */
  stairsFloorThreshold: number;
  /** Starting additional carrying charge for stairs jobs in AZN */
  stairsExtraStartingPrice: number;
  /** Piano transportation starting price in AZN */
  pianoStartingPrice: number;
  /** Disassembly & Assembly craftsman disclaimer */
  assemblyDisclaimer: string;
  /** Intercity worker disclaimer */
  intercityWorkerDisclaimer: string;
  /** Missing route tariff standard disclaimer */
  missingTariffDisclaimer: string;
  /** Large cargo overload message (> 32 m³) */
  overloadMessage: string;
  /** Large item dimension fit warning message */
  largeItemFitWarning: string;
  /** Rules for special/heavy items */
  specialItemRules: SpecialItemRule[];
}

export const BUSINESS_PRICING_RULES: BusinessPricingRules = {
  minimumVehicleOrderPrice: 20,
  workerBaseStartingPrice: 20,
  stairsFloorThreshold: 3,
  stairsExtraStartingPrice: 25,
  pianoStartingPrice: 80,

  assemblyDisclaimer: 'Mebelin sökülməsi və yığılması usta xidmətidir və ayrıca hesablanır.',
  intercityWorkerDisclaimer: 'Rayonlararası sifarişlərdə fəhlə xidmətinin qiyməti ayrıca hesablanır.',
  missingTariffDisclaimer: 'Bu istiqamət üçün avtomatik tarif mövcud deyil. Dəqiq qiymət üçün bizimlə əlaqə saxlayın.',
  overloadMessage: 'Yük həcminiz böyükdür. Uyğun avtomobil və ya bir neçə reys üçün mütəxəssis təsdiqi tələb olunur.',
  largeItemFitWarning: 'Yük həcminə əsasən avtomobil seçilib, lakin iri ölçülü əşya aşkarlandığı üçün avtomobil ölçüsü mütəxəssis tərəfindən təsdiqlənməlidir.',

  specialItemRules: [
    {
      type: 'piano',
      keywords: ['piano', 'pianino', 'royal', 'fortepiano'],
      name: 'Pianino / Royal',
      startingPrice: 80,
      message: 'Piano daşınması 80 AZN-dən başlayır. Dəqiq qiymət daşınma şəraitinə görə müəyyən edilir.',
      requiresFitConfirmation: true,
      requiresOperatorConfirmation: true,
    },
    {
      type: 'safe',
      keywords: ['seyf', 'safe', 'dəmir seyf', 'demir seyf', 'silah seyfi', 'ağır seyf'],
      name: 'Seyf / Dəmir şkaf',
      message: 'Bu əşya üçün qiymət ağırlıq və daşınma şəraitinə görə ayrıca hesablanır.',
      requiresFitConfirmation: false,
      requiresOperatorConfirmation: true,
    },
    {
      type: 'oversized_fridge',
      keywords: [
        'iri soyuducu', 'ikiqapılı soyuducu', 'side by side', 'restoran soyuducusu', 
        'vitrin soyuducu', 'böyük soyuducu', 'boyuk soyuducu', 'dondurucu vitrin'
      ],
      name: 'İri / İkiqapılı soyuducu',
      message: 'Bu əşya üçün qiymət ağırlıq və daşınma şəraitinə görə ayrıca hesablanır.',
      requiresFitConfirmation: true,
      requiresOperatorConfirmation: true,
    },
    {
      type: 'long_furniture',
      keywords: [
        'böyük dolab', 'iri qarderob', 'uzun divan', 'künc divan', 'böyük masa', 
        'konfrans masası', 'vitrin', 'şkaf-kupe', '3 metr divan'
      ],
      name: 'İri ölçülü mebel / Uzun divan / Qarderob',
      message: 'Yük həcminə əsasən avtomobil seçilib, lakin iri ölçülü əşya aşkarlandığı üçün avtomobil ölçüsü mütəxəssis tərəfindən təsdiqlənməlidir.',
      requiresFitConfirmation: true,
      requiresOperatorConfirmation: true,
    },
    {
      type: 'commercial_equipment',
      keywords: ['dəzgah', 'avadanlıq', 'kommersiya avadanlığı', 'tibbi avadanlıq', 'generator', 'printer плоттер'],
      name: 'Kommersiya / Sənaye avadanlığı',
      message: 'Bu əşya üçün qiymət ağırlıq və daşınma şəraitinə görə ayrıca hesablanır.',
      requiresFitConfirmation: true,
      requiresOperatorConfirmation: true,
    },
  ],
};
