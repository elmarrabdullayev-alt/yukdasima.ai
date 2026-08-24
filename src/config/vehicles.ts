/**
 * VEHICLE DATABASE CONFIGURATION
 * 
 * Centralized vehicle specifications, dimensions, and practical capacity factors.
 * Admin-ready architecture: this configuration can later be persisted or managed via an admin panel.
 */

export interface VehicleSpec {
  id: 'vehicle_2m' | 'vehicle_3m' | 'vehicle_4m' | 'vehicle_5m' | 'vehicle_6m' | 'vehicle_7m';
  name: string;
  shortName: string;
  category: '2m' | '3m' | '4m' | '5m' | '6m' | '7m';
  lengthM: number;
  widthM: number;
  heightM: number;
  /** Theoretical rectangular volume in m³ = length * width * height */
  theoreticalVolumeM3: number;
  /** Practical usable volume in m³ (considering furniture packing factor) */
  practicalCapacityM3: number;
  /** Max volume threshold for auto-assignment */
  maxVolumeThresholdM3: number;
  /** Description in Azerbaijani */
  description: string;
  badge: string;
  maxCarryingWeightKg?: number;
}

export interface VehicleConfig {
  /** Default practical utilization factor for furniture packing (default: 0.80) */
  practicalUtilizationFactor: number;
  /** Minimum starting vehicle order price in AZN */
  minimumVehicleOrderPrice: number;
  /** Upper volume limit above which single vehicle cannot be automatically promised */
  maxAutoAssignableVolumeM3: number;
  /** Vehicle fleet catalog */
  vehicles: VehicleSpec[];
}

export const DEFAULT_VEHICLE_CONFIG: VehicleConfig = {
  practicalUtilizationFactor: 0.80,
  minimumVehicleOrderPrice: 20,
  maxAutoAssignableVolumeM3: 32.0,
  vehicles: [
    {
      id: 'vehicle_2m',
      name: '2m Ford Transit',
      shortName: '2m Transit',
      category: '2m',
      lengthM: 2.40,
      widthM: 1.30,
      heightM: 1.30,
      theoreticalVolumeM3: 4.06,
      practicalCapacityM3: 3.2,
      maxVolumeThresholdM3: 3.2,
      description: 'Kiçik həcmli yüklər, tək-tək mebellər və qutular üçün kompakt və çevik nəqliyyat.',
      badge: '0 – 3.2 m³',
      maxCarryingWeightKg: 1200,
    },
    {
      id: 'vehicle_3m',
      name: '3m yük maşını',
      shortName: '3m avtomobil',
      category: '3m',
      lengthM: 3.00,
      widthM: 1.50,
      heightM: 1.80,
      theoreticalVolumeM3: 8.10,
      practicalCapacityM3: 6.5,
      maxVolumeThresholdM3: 6.5,
      description: '1 otaqlı mənzil, kiçik ofis və ya orta ölçülü mebel dəstləri üçün ideal seçim.',
      badge: '3.2 – 6.5 m³',
      maxCarryingWeightKg: 1800,
    },
    {
      id: 'vehicle_4m',
      name: '4m yük maşını',
      shortName: '4m avtomobil',
      category: '4m',
      lengthM: 4.00,
      widthM: 2.00,
      heightM: 2.00,
      theoreticalVolumeM3: 16.00,
      practicalCapacityM3: 12.8,
      maxVolumeThresholdM3: 12.8,
      description: '2-3 otaqlı standart mənzillər və standart kommersiya yükləri üçün ən populyar seçim.',
      badge: '6.5 – 12.8 m³',
      maxCarryingWeightKg: 3000,
    },
    {
      id: 'vehicle_5m',
      name: '5m yük maşını',
      shortName: '5m avtomobil',
      category: '5m',
      lengthM: 5.00,
      widthM: 2.00,
      heightM: 2.00,
      theoreticalVolumeM3: 20.00,
      practicalCapacityM3: 16.0,
      maxVolumeThresholdM3: 16.0,
      description: 'Geniş 3 otaqlı mənzillər, böyük dolablar və həcmli mebel dəstləri üçün geniş furqon.',
      badge: '12.8 – 16 m³',
      maxCarryingWeightKg: 3500,
    },
    {
      id: 'vehicle_6m',
      name: '6m yük maşını',
      shortName: '6m avtomobil',
      category: '6m',
      lengthM: 6.00,
      widthM: 2.40,
      heightM: 2.40,
      theoreticalVolumeM3: 34.56,
      practicalCapacityM3: 27.5,
      maxVolumeThresholdM3: 27.5,
      description: '4+ otaqlı mənzillər, bağ evləri, böyük ofislər və anbar köçürmələri üçün.',
      badge: '16 – 27.5 m³',
      maxCarryingWeightKg: 5000,
    },
    {
      id: 'vehicle_7m',
      name: '7m yük maşını',
      shortName: '7m avtomobil',
      category: '7m',
      lengthM: 7.00,
      widthM: 2.40,
      heightM: 2.40,
      theoreticalVolumeM3: 40.32,
      practicalCapacityM3: 32.0,
      maxVolumeThresholdM3: 32.0,
      description: 'Maksimum tutumlu furqon, villa, böyük şirkət və genişmiqyaslı köçürmələr üçün.',
      badge: '27.5 – 32 m³',
      maxCarryingWeightKg: 7500,
    },
  ],
};

/**
 * Helper to get a vehicle by its category key ('2m' | '3m' | ...)
 */
export function getVehicleByCategory(
  category: '2m' | '3m' | '4m' | '5m' | '6m' | '7m',
  config: VehicleConfig = DEFAULT_VEHICLE_CONFIG
): VehicleSpec | undefined {
  return config.vehicles.find((v) => v.category === category);
}
