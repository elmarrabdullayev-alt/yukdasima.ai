import React, { useState, useMemo } from 'react';
import {
  Truck,
  MapPin,
  Check,
  Phone,
  MessageSquare,
  AlertTriangle,
  Info,
  Users,
  Wrench,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { DEFAULT_VEHICLE_CONFIG, VehicleSpec } from '../config/vehicles';
import { calculateTransportationPricing } from '../pricing/pricingEngine';
import { getAvailableDestinations } from '../services/tariffService';
import { findDestinationSuggestions } from '../services/destinationResolver';
import { generateWhatsAppLink } from '../utils/calculator';
import { POPULAR_LOCATIONS } from '../data/mockData';

import { CallbackInitialData } from '../types';
import { t } from '../i18n';

interface DirectYukdasimaOrderProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
  onSwitchToAi?: () => void;
  initialFromAddress?: string;
  initialToAddress?: string;
  initialSelectedCategory?: '2m' | '3m' | '4m' | '5m' | '6m' | '7m' | 'tir';
  defaultVehicle?: VehicleSpec;
}

export const DirectYukdasimaOrder: React.FC<DirectYukdasimaOrderProps> = ({
  onOpenCallback,
  onSwitchToAi,
  initialFromAddress = 'Bakı',
  initialToAddress = '',
  initialSelectedCategory = '4m',
  defaultVehicle,
}) => {
  // Vehicle selection state (default to defaultVehicle.category or initialSelectedCategory)
  const [selectedCategory, setSelectedCategory] = useState<'2m' | '3m' | '4m' | '5m' | '6m' | '7m' | 'tir'>(
    defaultVehicle?.category || initialSelectedCategory
  );

  // Route state
  const [fromAddress, setFromAddress] = useState<string>(initialFromAddress || 'Bakı');
  const [toAddress, setToAddress] = useState<string>(initialToAddress || '');

  // Optional services
  const [needsWorkers, setNeedsWorkers] = useState<boolean>(false);
  const [workerCount, setWorkerCount] = useState<number>(2);
  const [needsAssembly, setNeedsAssembly] = useState<boolean>(false);

  // Contact details
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');

  const vehicles = DEFAULT_VEHICLE_CONFIG.vehicles;
  // Filtered destination suggestions with alias matching & canonical suggestions
  const destinationSuggestions = useMemo(() => {
    if (!toAddress.trim() || toAddress.length < 2) return [];
    return findDestinationSuggestions(toAddress, 5).map((s) => s.canonicalName);
  }, [toAddress]);

  // Selected vehicle spec from central config
  const currentVehicle: VehicleSpec = useMemo(() => {
    return vehicles.find((v) => v.category === selectedCategory) || vehicles[2];
  }, [vehicles, selectedCategory]);

  // Pricing result from centralized deterministic pricing engine
  const pricingResult = useMemo(() => {
    return calculateTransportationPricing(
      null,
      {
        fromAddress,
        toAddress,
        fromFloor: '1',
        toFloor: '1',
        hasElevator: 'yes',
        itemsFitElevator: 'yes',
        workerCount: needsWorkers ? workerCount : 0,
        needsAssembly,
        phone: customerPhone,
        details: '',
        images: [],
      },
      {
        selectedVehicleCategory: selectedCategory,
      }
    );
  }, [fromAddress, toAddress, selectedCategory, needsWorkers, workerCount, needsAssembly, customerPhone]);

  // Handle WhatsApp Submission
  const handleWhatsAppOrder = () => {
    let msg = t(`Salam. yukdasima.ai saytından ${selectedCategory === 'tir' ? t('TIR') : t('yük maşını')} sifariş etmək istəyirəm.\n\n`);
    
    const routeDisplay = pricingResult.routeSummary
      ? pricingResult.routeSummary
      : `${fromAddress.trim() || 'Bakı'} → ${toAddress.trim() || 'Təyin edilməyib'}`;

    msg += t(`Avtomobil: ${currentVehicle.category === 'tir' ? t('TIR') : `${currentVehicle.name} (${currentVehicle.category})`}\n`);
    msg += t(`Marşrut: ${routeDisplay}\n`);
    msg += t(`Avtomobil üçün ilkin qiymət: ${pricingResult.vehicleTransportPriceDisplay}\n`);
    msg += t(`Fəhlə: ${needsWorkers ? t(`Bəli (${workerCount} nəfər)`) : t('Xeyr')}\n`);
    msg += t(`Mebel sökülməsi/yığılması: ${needsAssembly ? t('Bəli') : t('Xeyr')}\n`);
    if (selectedCategory === 'tir') {
      msg += t(`Qeyd: TIR üçün yükün çəkisi, həcmi və uyğun avtomobil tipi operatorla dəqiqləşdirilir.\n`);
    }

    if (customerName.trim()) {
      msg += t(`Ad: ${customerName.trim()}\n`);
    }
    if (customerPhone.trim()) {
      msg += t(`Telefon: ${customerPhone.trim()}\n`);
    }

    msg += t(`\nZəhmət olmasa sifarişi dəqiqləşdirib təsdiq edəsiniz.`);

    window.open(generateWhatsAppLink(t(msg)), '_blank');
  };

  return (
    <div className="space-y-8">
      {/* 1. VEHICLE SELECTION */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <span>{t("1. Avtomobili seçin")}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{t("Ehtiyacınıza uyğun olan yük maşınını seçin.")}</p>
          </div>
          {t(onSwitchToAi && (
            <button
              type="button"
              onClick={onSwitchToAi}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 py-1.5 px-3 rounded-lg self-start sm:self-auto transition-colors cursor-pointer"
            >{t("✨ Avtomobili seçməkdə çətinlik çəkirsiniz? AI ilə təyin edin")}</button>
          ))}
        </div>

        {/* VEHICLE CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {vehicles.map((v) => {
            const isSelected = v.category === selectedCategory;
            const isTir = v.category === 'tir';
            return (
              <div
                key={v.id}
                id={`vehicle-card-${v.category}`}
                onClick={() => setSelectedCategory(v.category)}
                className={`relative rounded-2xl p-4 sm:p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {t(isTir ? 'TIR' : v.category)}
                    </span>
                    {t(isSelected && (
                      <span className="flex items-center gap-1 text-xs font-bold text-blue-700">
                        <Check className="w-4 h-4" />{t(" Seçildi")}</span>
                    ))}
                  </div>

                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    {t(v.name)}
                  </h4>

                  {/* Specifications */}
                  {t(isTir ? (
                    <div className="mt-3 text-xs text-slate-600 bg-slate-100/70 p-2.5 rounded-xl border border-slate-200/60 font-medium">{t("Marşrut üzrə TIR qiymətini öyrənin.")}</div>
                  ) : (
                    <div className="mt-3 space-y-1.5 text-xs text-slate-600 bg-slate-100/70 p-2.5 rounded-xl border border-slate-200/60">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t("Kuzov ölçüsü:")}</span>
                        <span className="font-semibold text-slate-900">
                          {t(v.lengthM.toFixed(2))} × {t(v.widthM.toFixed(2))} × {t(v.heightM.toFixed(2))}{t(" m")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t("Təxmini tutum:")}</span>
                        <span className="font-semibold text-slate-900">
                          {t(v.practicalCapacityM3)}{t(" m³")}</span>
                      </div>
                    </div>
                  ))}

                  {t(!isTir && (
                    <p className="mt-2.5 text-xs text-slate-500 line-clamp-2">
                      {t(v.description)}
                    </p>
                  ))}
                </div>

                {/* Selection Button */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {t(isSelected ? '✓ Seçilmiş maşın' : 'Bu maşını seç')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. ROUTE SECTION */}
      <div className="space-y-4 pt-2">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>{t("2. Marşrutu qeyd edin")}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{t("Yükün haradan götürülüb haraya çatdırılacağını daxil edin.")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* FROM */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <span>{t("Haradan?")}</span>
            </label>
            <div className="relative">
              <input
                id="direct-from-address"
                type="text"
                value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)}
                placeholder={t("Məsələn: Bakı, Nərimanov")}
                className="w-full pl-3.5 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 bg-white"
              />
            </div>
          </div>

          {/* TO */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <span>{t("Haraya?")}</span>
            </label>
            <div className="relative">
              <input
                id="direct-to-address"
                type="text"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                placeholder={t("Məsələn: Gəncə, Xırdalan, Yasamal...")}
                className="w-full pl-3.5 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 bg-white"
              />
            </div>

            {/* Suggestions */}
            {t(destinationSuggestions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-slate-400 self-center">{t("Təkliflər:")}</span>
                {destinationSuggestions.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => setToAddress(dest)}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/60 transition-colors cursor-pointer"
                  >
                    {t(dest)}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Popular Locations Quick Select */}
        <div className="space-y-1.5 pt-1">
          <span className="text-xs text-slate-500 font-medium">{t("Tez-tez seçilən istiqamətlər:")}</span>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_LOCATIONS.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setToAddress(loc);
                }}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  toAddress.toLowerCase().includes(loc.toLowerCase())
                    ? 'bg-blue-600 text-white border-blue-600 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-medium'
                }`}
              >
                {t(loc)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. TARIFF PRICING DISPLAY CARD */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50/30 p-5 sm:p-6 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">{t("Avtomobil üçün ilkin qiymət")}</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {t(pricingResult.vehicleTransportPriceDisplay)}
            </div>
          </div>

          <div className="text-xs text-slate-500 sm:text-right">
            <span className="font-semibold text-slate-700 block">
              {t(currentVehicle.category === 'tir' ? 'TIR' : `${currentVehicle.name} (${currentVehicle.category})`)}
            </span>
            <span>
              {t(pricingResult.routeSummary || `${fromAddress || 'Bakı'} → ${toAddress || 'Təyin edilməyib'}`)}
            </span>
          </div>
        </div>

        {t(selectedCategory === 'tir' ? (
          <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 text-blue-900 text-xs sm:text-sm">
            <p className="font-medium text-slate-800">{t("ℹ️ TIR üçün yükün çəkisi, həcmi və uyğun avtomobil tipi operator tərəfindən dəqiqləşdirilir.")}</p>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-slate-600 pt-1">{t("ℹ️ Bu məbləğ avtomobilin sifariş/daşınma qiymətidir. Əlavə xidmətlər ayrıca hesablana bilər.")}</p>
        ))}

        {t(pricingResult.hasMissingTariff && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{t("Bu marşrut üçün avtomatik qiymət mövcud deyil.")}</span>
            </div>
            <p className="text-amber-800">
              {t(selectedCategory === 'tir'
                ? 'TIR üçün yükün çəkisi, həcmi və uyğun avtomobil tipi operator tərəfindən dəqiqləşdirilir.'
                : 'Dəqiq qiymət üçün bizimlə əlaqə saxlayın.')}
            </p>
          </div>
        ))}
      </div>

      {/* 4. OPTIONAL SERVICES */}
      <div className="space-y-4 pt-2">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>{t("3. Əlavə xidmətlər")}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{t("Fəhlə və mebel ustası xidməti tələb olunursa qeyd edin.")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* WORKERS OPTION */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>{t("Fəhlə lazımdır?")}</span>
              </label>
              <div className="flex rounded-lg bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setNeedsWorkers(false)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    !needsWorkers
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >{t("Xeyr")}</button>
                <button
                  type="button"
                  onClick={() => setNeedsWorkers(true)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    needsWorkers
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >{t("Bəli")}</button>
              </div>
            </div>

            {t(needsWorkers && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">{t("İşçi sayı:")}</span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setWorkerCount(cnt)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-colors cursor-pointer ${
                          workerCount === cnt
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {t(cnt)}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600">
                  {t(pricingResult.isIntercity
                    ? 'Rayonlararası sifarişlərdə fəhlə xidmətinin qiyməti ayrıca hesablanır.'
                    : 'Fəhlə xidməti 1 nəfər üçün 20 AZN-dən başlayır.')}
                </p>
              </div>
            ))}
          </div>

          {/* FURNITURE DISASSEMBLY / ASSEMBLY */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>{t("Mebelin sökülməsi/yığılması lazımdır?")}</span>
              </label>
              <div className="flex rounded-lg bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setNeedsAssembly(false)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    !needsAssembly
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >{t("Xeyr")}</button>
                <button
                  type="button"
                  onClick={() => setNeedsAssembly(true)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    needsAssembly
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >{t("Bəli")}</button>
              </div>
            </div>

            {t(needsAssembly && (
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-600">{t("Mebelin sökülməsi və yığılması usta xidmətidir və ayrıca hesablanır.")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. CONTACT DETAILS (OPTIONAL LEAD CAPTURE) */}
      <div className="space-y-4 pt-2">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-600" />
            <span>{t("4. Əlaqə məlumatlarınız")}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{t("Sifarişin təsdiqlənməsi üçün adınızı və telefon nömrənizi qeyd edin.")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">{t("Adınız")}</label>
            <input
              id="direct-customer-name"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder={t("Məsələn: Rəşad Məmmədov")}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">{t("Telefon nömrəniz")}</label>
            <input
              id="direct-customer-phone"
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="+994 50 123 45 67"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-medium text-slate-900 bg-white"
            />
          </div>
        </div>
      </div>

      {/* 6. ORDER SUMMARY (SIFARISINIZ) */}
      <div className="rounded-2xl border-2 border-slate-900 bg-slate-900 text-white p-5 sm:p-7 space-y-4 shadow-xl">
        <h3 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center justify-between">
          <span>{t("Sifarişiniz")}</span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/30 text-blue-200">
            {t(currentVehicle.category === 'tir' ? 'TIR' : currentVehicle.category)}
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm pt-1 border-t border-slate-800">
          <div className="space-y-1">
            <span className="text-slate-400 block text-xs">{t("Avtomobil:")}</span>
            <span className="font-bold text-white text-base">
              {t(currentVehicle.category === 'tir' ? 'TIR' : currentVehicle.name)}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 block text-xs">{t("Marşrut:")}</span>
            <span className="font-bold text-white text-base">
              {t(pricingResult.routeSummary || `${fromAddress || 'Bakı'} → ${toAddress || 'Təyin edilməyib'}`)}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 block text-xs">{t("Avtomobil üçün ilkin qiymət:")}</span>
            <span className="font-bold text-emerald-400 text-base">
              {t(pricingResult.vehicleTransportPriceDisplay)}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 block text-xs">{t("Fəhlə:")}</span>
            <span className="font-bold text-white">
              {t(needsWorkers ? `${workerCount} nəfər (${pricingResult.workerServiceDisplay})` : 'Tələb olunmur')}
            </span>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <span className="text-slate-400 block text-xs">{t("Mebel sökülməsi/yığılması:")}</span>
            <span className="font-bold text-white">
              {t(needsAssembly ? 'Tələb olunur (Ayrıca hesablanır)' : 'Tələb olunmur')}
            </span>
          </div>
        </div>

        {t(selectedCategory === 'tir' && (
          <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-300">{t("ℹ️ TIR üçün yükün çəkisi, həcmi və uyğun avtomobil tipi operator tərəfindən dəqiqləşdirilir.")}</div>
        ))}

        {/* ACTION BUTTONS: WHATSAPP & CALLBACK */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-800">
          <button
            id="direct-btn-whatsapp"
            type="button"
            onClick={handleWhatsAppOrder}
            className="flex-1 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{t(selectedCategory === 'tir' ? '💬 Operatorla dəqiqləşdir' : '💬 WhatsApp ilə sifariş et')}</span>
          </button>

          <button
            id="direct-btn-callback"
            type="button"
            onClick={() =>
              onOpenCallback({
                phone: customerPhone,
                name: customerName,
                service: 'yukdasima',
                source: 'Birbaşa Maşın Sifarişi',
                route: pricingResult.routeSummary || `${fromAddress || 'Bakı'} → ${toAddress || 'Təyin edilməyib'}`,
                vehicle: currentVehicle.category === 'tir' ? 'TIR' : currentVehicle.name,
                estimatedPrice: pricingResult.vehicleTransportPriceDisplay,
                notes: `Fəhlə: ${needsWorkers ? `${workerCount} nəfər` : 'Tələb olunmur'}, Mebel montajı: ${needsAssembly ? 'Var' : 'Yox'}`,
              })
            }
            className="py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
          >
            <Phone className="w-4 h-4" />
            <span>{t(selectedCategory === 'tir' ? '📞 Operatorla əlaqə' : '📞 Zəng sifariş et')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
