export type ServiceType = 'yukdasima' | 'evakuasiya';

export interface UploadedImage {
  id: string;
  url: string;
  name: string;
  size: number;
  base64?: string;
  mimeType?: string;
}

export interface CargoItem {
  id: string;
  name: string;
  quantity: number;
  estimatedVolumeM3: number;
  confidence: 'high' | 'medium' | 'low';
  isSpecialOrHeavy?: boolean;
  specialNote?: string;
}

export interface CargoAnalysisData {
  items: CargoItem[];
  estimatedTotalVolumeMinM3: number;
  estimatedTotalVolumeMaxM3: number;
  analysisConfidence: 'high' | 'medium' | 'low';
  notes?: string[];
}

export interface YukdasimaFormData {
  images: UploadedImage[];
  details: string;
  fromAddress: string;
  toAddress: string;
  fromFloor: string;
  toFloor: string;
  hasElevator: 'yes' | 'no' | 'from_only' | 'to_only' | '';
  itemsFitElevator?: 'yes' | 'no' | 'partial' | '';
  workerCount?: number;
  needsAssembly?: boolean;
  phone: string;
}

export interface SpecialItemDetected {
  type: string;
  name: string;
  startingPrice?: number;
  message: string;
  requiresFitConfirmation: boolean;
  requiresOperatorConfirmation: boolean;
}

export interface DeterministicPricingResult {
  /** Upper bound of Gemini estimated volume range used for vehicle selection */
  evaluatedVolumeM3: number;
  /** Volume range display e.g. "5–7 m³" */
  volumeRangeDisplay: string;
  
  /** Recommended vehicle info */
  vehicleCategory?: '2m' | '3m' | '4m' | '5m' | '6m' | '7m' | 'tir';
  vehicleName: string;
  vehicleDimensionsDisplay?: string;
  vehicleTheoreticalVolumeM3?: number;
  vehiclePracticalCapacityM3?: number;

  /** Status flags */
  isOverCapacity: boolean;
  requiresOperatorConfirmation: boolean;
  hasLargeItemFitRisk: boolean;
  hasMissingTariff: boolean;
  isIntercity: boolean;

  /** Pricing fields (Deterministic application calculations) */
  vehicleTransportPrice?: number;
  vehicleTransportPriceDisplay: string; // e.g. "280 AZN" or "Tarif mövcud deyil"

  /** Worker service calculation */
  workerCount: number;
  workerStartingPricePerPerson: number;
  workerServiceStatus: 'included_initial' | 'intercity_excluded' | 'stairs_extra_required' | 'not_requested';
  workerServiceDisplay: string;
  workerDisclaimer?: string;

  /** Assembly service */
  needsAssembly: boolean;
  assemblyServiceDisplay: string;

  /** Stairs / Floor status */
  stairsNotice?: string;

  /** Special/Heavy items detected */
  specialItems: SpecialItemDetected[];

  /** Disclaimers and notices */
  notices: string[];

  /** Route metadata */
  routeSummary?: string;
  distanceKm?: number;
}

export interface YukdasimaResult {
  volume: string;
  truckSize: string;
  movers: string;
  estimatedPrice: string;
  routeInfo?: string;
  detailsSummary?: string;
}

export type CarType = 'Sedan' | 'SUV / Jeep' | 'Hetçbek' | 'Minivan' | 'Mikroavtobus' | 'Digər';

export interface EvakuasiyaFormData {
  fromAddress: string;
  toAddress: string;
  carType: CarType;
  canMove: 'Bəli' | 'Xeyr';
  conditionNotes: string;
  phone: string;
}

export interface EvakuasiyaResult {
  fromAddress: string;
  toAddress: string;
  distanceKm?: number;
  carType: string;
  canMove: 'Bəli' | 'Xeyr';
  estimatedPrice: string;
  hasMissingTariff?: boolean;
  tariffDisclaimer?: string;
  isIntercity?: boolean;
  rawPrice?: number | null;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: 'yukdasima' | 'evakuasiya' | 'all';
}

export interface AiPromptSample {
  id: string;
  label: string;
  query: string;
  service: 'yukdasima' | 'evakuasiya';
}

export interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  iconName: 'truck' | 'sofa' | 'building' | 'users' | 'container' | 'car';
  features: string[];
}

export interface CallbackRequestPayload {
  name?: string;
  phone: string;
  service?: string;
  message?: string;
  source?: string;
  route?: string;
  vehicle?: string;
  estimatedPrice?: string;
  notes?: string;
}

export interface CallbackInitialData {
  name?: string;
  phone?: string;
  service?: 'yukdasima' | 'evakuasiya';
  message?: string;
  source?: string;
  route?: string;
  vehicle?: string;
  estimatedPrice?: string;
  notes?: string;
}

