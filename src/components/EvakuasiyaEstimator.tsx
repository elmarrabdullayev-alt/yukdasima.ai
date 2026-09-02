import React, { useState, useEffect, useRef } from 'react';
import {
  Car,
  MapPin,
  Compass,
  Phone,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  HelpCircle,
  Truck
} from 'lucide-react';
import { EvakuasiyaFormData, EvakuasiyaResult, CarType, CallbackInitialData } from '../types';
import { calculateEvakuasiyaEstimate, generateWhatsAppLink } from '../utils/calculator';
import { findDestinationSuggestions } from '../services/destinationResolver';
import { CONTACT_INFO } from '../constants/contact';

interface EvakuasiyaEstimatorProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
  initialFrom?: string;
  initialTo?: string;
}

const CAR_TYPES: { type: CarType; icon: string; desc: string }[] = [
  { type: 'Sedan', icon: '🚗', desc: 'Standart minik' },
  { type: 'SUV / Jeep', icon: '🚙', desc: 'Krossover & Cip' },
  { type: 'Hetçbek', icon: '🚘', desc: 'Kompakt avtomobil' },
  { type: 'Minivan', icon: '🚐', desc: 'Geniş ailə maşını (+10 AZN)' },
  { type: 'Mikroavtobus', icon: '🚌', desc: 'Operatorla dəqiqləşdirilir' },
  { type: 'Digər', icon: '🏎️', desc: 'Xüsusi texnika' },
];

/**
 * Modern flatbed tow-truck (platformalı evakuator) vector graphic carrying an automobile
 */
const TowTruckGraphic: React.FC<{ className?: string }> = ({ className = 'w-14 h-7 sm:w-16 sm:h-8' }) => (
  <svg
    viewBox="0 0 96 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* 1. WINCH CABLE & HEADACHE RACK BEHIND CAB */}
    <path d="M57 19L50 21" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M57 14V26" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <path d="M54 16H57" stroke="#64748B" strokeWidth="1.5" />

    {/* 2. CAR LOADED ON FLATBED */}
    <path
      d="M12 24L15 19C16.5 16.5 19 15 22 15H36C39 15 41.5 16.5 43 19L47 21C49 22 50 23 50 25V26H10V25C10 24.5 10.8 24.2 12 24Z"
      fill="#60A5FA"
      stroke="#2563EB"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path
      d="M21 16H35L39 19.5H18L21 16Z"
      fill="#EFF6FF"
      stroke="#1D4ED8"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <line x1="28" y1="16" x2="28" y2="19.5" stroke="#93C5FD" strokeWidth="1" />
    {/* Car wheels on deck */}
    <circle cx="19" cy="26" r="3" fill="#0F172A" stroke="#475569" strokeWidth="1" />
    <circle cx="19" cy="26" r="1.2" fill="#CBD5E1" />
    <circle cx="41" cy="26" r="3" fill="#0F172A" stroke="#475569" strokeWidth="1" />
    <circle cx="41" cy="26" r="1.2" fill="#CBD5E1" />

    {/* 3. FLATBED TOW TRUCK DECK */}
    <path
      d="M4 27.5L58 27.5L58 29.5L4 29.5Z"
      fill="#2563EB"
      stroke="#1D4ED8"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <line x1="6" y1="28.5" x2="56" y2="28.5" stroke="#93C5FD" strokeWidth="0.8" strokeDasharray="3 2" />

    {/* Subframe & tool container under bed */}
    <path d="M12 29.5H58V33H16L12 29.5Z" fill="#1E293B" />
    <rect x="30" y="30" width="10" height="3.5" rx="1" fill="#475569" stroke="#334155" strokeWidth="0.8" />

    {/* 4. TOW TRUCK FRONT CAB */}
    <path
      d="M58 16C58 14.5 59.2 13.5 60.5 13.5H74C75.5 13.5 77 14.5 78 16.5L84 25.5C84.8 26.5 85.5 27.5 87 27.5H91C92 27.5 92.5 28.5 92.5 29.5V33C92.5 34 91.5 34.5 90.5 34.5H58V16Z"
      fill="#1D4ED8"
      stroke="#1E40AF"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path
      d="M62 16H73.5C74.5 16 75.5 16.8 76.2 18L80.5 24.5H62V16Z"
      fill="#DBEAFE"
      stroke="#1E40AF"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <path d="M62 25H72V33H62V25Z" fill="#2563EB" stroke="#1E40AF" strokeWidth="0.8" />
    <rect x="64" y="26.5" width="2.5" height="1" rx="0.5" fill="#CBD5E1" />
    <rect x="88" y="28.5" width="4" height="4" rx="0.8" fill="#0F172A" />
    <path d="M89 29.5H91.5" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" />
    <circle cx="87.5" cy="27" r="1.5" fill="#FEF08A" />

    {/* 5. ROOF EMERGENCY BEACON LIGHT */}
    <rect x="66" y="10.5" width="6" height="3" rx="1.5" fill="#F59E0B" stroke="#D97706" strokeWidth="0.8" />
    <circle cx="69" cy="12" r="1.2" fill="#FEF08A" className="animate-ping" />

    {/* 6. TOW TRUCK WHEELS */}
    <g>
      <circle cx="24" cy="34" r="5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
      <circle cx="24" cy="34" r="2.2" fill="#94A3B8" stroke="#0F172A" strokeWidth="0.8" />
      <circle cx="24" cy="34" r="0.8" fill="#F8FAFC" />
    </g>
    <g>
      <circle cx="46" cy="34" r="5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
      <circle cx="46" cy="34" r="2.2" fill="#94A3B8" stroke="#0F172A" strokeWidth="0.8" />
      <circle cx="46" cy="34" r="0.8" fill="#F8FAFC" />
    </g>
    <g>
      <circle cx="78" cy="34" r="5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
      <circle cx="78" cy="34" r="2.2" fill="#94A3B8" stroke="#0F172A" strokeWidth="0.8" />
      <circle cx="78" cy="34" r="0.8" fill="#F8FAFC" />
    </g>
  </svg>
);

export const EvakuasiyaEstimator: React.FC<EvakuasiyaEstimatorProps> = ({
  onOpenCallback,
  initialFrom = 'Nərimanov, Bakı',
  initialTo = 'Xırdalan',
}) => {
  const [formData, setFormData] = useState<EvakuasiyaFormData>({
    fromAddress: initialFrom,
    toAddress: initialTo,
    carType: 'Sedan',
    canMove: 'Bəli',
    conditionNotes: '',
    phone: '',
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [calcProgress, setCalcProgress] = useState(0);
  const [calcStage, setCalcStage] = useState<1 | 2 | 3>(1);
  const [calcStatusText, setCalcStatusText] = useState('Marşrut hesablanır...');
  const [result, setResult] = useState<EvakuasiyaResult | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const updateFormAndRecalculate = (updates: Partial<EvakuasiyaFormData>) => {
    const updated = { ...formData, ...updates };
    setFormData(updated);
    if (result && !isCalculating) {
      setResult(calculateEvakuasiyaEstimate(updated));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCalculating) return; // Prevent multiple concurrent calculations

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setIsCalculating(true);
    setResult(null);
    setCalcProgress(0);
    setCalcStage(1);
    setCalcStatusText('Marşrut hesablanır...');

    // Smoothly scroll down towards calculation area if needed
    setTimeout(() => {
      const loaderEl = document.getElementById('evakuasiya-route-loader');
      if (loaderEl) {
        loaderEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 50);

    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const totalDuration = prefersReducedMotion ? 350 : 2200;
    const startTime = performance.now();

    timerRef.current = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progressRatio = Math.min(elapsed / totalDuration, 1);
      const currentProgress = progressRatio * 100;
      setCalcProgress(currentProgress);

      if (currentProgress < 35) {
        setCalcStage(1);
        setCalcStatusText('Marşrut hesablanır...');
      } else if (currentProgress < 70) {
        setCalcStage(2);
        setCalcStatusText('Avtomobil məlumatları yoxlanılır...');
      } else {
        setCalcStage(3);
        setCalcStatusText('Qiymət hesablanır...');
      }

      if (progressRatio >= 1) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        setTimeout(() => {
          const est = calculateEvakuasiyaEstimate(formData);
          setResult(est);
          setIsCalculating(false);

          setTimeout(() => {
            const resEl = document.getElementById('evakuasiya-result-card');
            if (resEl) {
              resEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 100);
        }, 150);
      }
    }, 25);
  };

  const isOperatorType = formData.carType === 'Mikroavtobus' || formData.carType === 'Digər';
  const requiresManualConfirm = Boolean(result?.requiresOperatorConfirmation || result?.hasMissingTariff || isOperatorType);

  const handleWhatsAppOrder = () => {
    const distancePart = result?.distanceKm ? `📏 Təxmini məsafə: ${result.distanceKm} km\n` : '';
    const notesPart = formData.conditionNotes ? `📝 Vəziyyət: ${formData.conditionNotes}\n` : '';
    const conditionText = formData.canMove === 'Bəli' ? 'Hərəkətli (İşlək)' : 'Nasaz / Kilidli';

    let msg = `Salam, yukdasima.ai üzərindən evakuasiya xidməti sifariş etmək istəyirəm.\n` +
      `📍 Marşrut: ${formData.fromAddress} ➔ ${formData.toAddress}\n` +
      distancePart +
      `🚗 Avtomobil: ${formData.carType}\n` +
      `⚙️ Hərəkət vəziyyəti: ${conditionText}\n` +
      notesPart;

    if (requiresManualConfirm) {
      msg += `⚠️ Qiymət: Operator tərəfindən dəqiqləşdirilməlidir\n` +
        `Zəhmət olmasa bu avtomobil növü üçün dəqiq evakuasiya qiymətini və mövcudluğunu bildirə bilərsiniz?`;
    } else {
      msg += `💰 İlkin qiymət: ${result?.estimatedPrice || '35 AZN-dən'}\n` +
        `Zəhmət olmasa təcili evakuator göndərə bilərsiniz?`;
    }

    window.open(generateWhatsAppLink(msg), '_blank');
  };

  const handleCallbackClick = () => {
    const conditionText = formData.canMove === 'Bəli' ? 'Hərəkətli' : 'Nasaz / Kilidli';
    const vehicleText = `${formData.carType} (${conditionText})`;

    if (requiresManualConfirm) {
      const notesArray = ['Qiymət operator tərəfindən dəqiqləşdirilməlidir.'];
      if (formData.conditionNotes) {
        notesArray.push(`Vəziyyət: ${formData.conditionNotes}`);
      }
      onOpenCallback({
        phone: formData.phone,
        service: 'evakuasiya',
        source: 'Evakuasiya Hesablayıcı',
        route: `${formData.fromAddress} → ${formData.toAddress}`,
        vehicle: vehicleText,
        estimatedPrice: undefined, // Strictly NO fabricated price
        notes: notesArray.join(' | '),
      });
    } else {
      onOpenCallback({
        phone: formData.phone,
        service: 'evakuasiya',
        source: 'Evakuasiya Hesablayıcı',
        route: `${formData.fromAddress} → ${formData.toAddress}`,
        vehicle: vehicleText,
        estimatedPrice: result?.estimatedPrice || undefined,
        notes: formData.conditionNotes ? `Vəziyyət: ${formData.conditionNotes}` : undefined,
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-5 sm:p-8 md:p-10 transition-all">
      {/* Header */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Car className="w-4 h-4 text-amber-600" />
          <span>24/7 Evakuasiya Hesablayıcısı</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Evakuasiya qiymətini hesablayın
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          Avtomobilin götürüləcəyi və aparılacağı ünvanı qeyd edin. Sizə ilkin evakuasiya qiymətini göstərək.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-7">
        {/* ROUTE INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Haradan götürüləcək */}
          <div className="space-y-2">
            <label htmlFor="evak-from-address" className="block text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Haradan götürüləcək?</span>
            </label>
            <input
              id="evak-from-address"
              type="text"
              required
              disabled={isCalculating}
              value={formData.fromAddress}
              onChange={(e) => updateFormAndRecalculate({ fromAddress: e.target.value })}
              placeholder="Məsələn: Nərimanov, Bakı"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm bg-slate-50/50 outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            />
            {/* Quick Location Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Nərimanov', 'Yasamal', '28 May', 'Koroğlu', 'Bakıxanov'].map((loc) => (
                <button
                  key={loc}
                  type="button"
                  disabled={isCalculating}
                  onClick={() => updateFormAndRecalculate({ fromAddress: loc })}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-100 text-[11px] text-slate-600 hover:text-blue-700 font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Haraya aparılacaq */}
          <div className="space-y-2">
            <label htmlFor="evak-to-address" className="block text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Haraya aparılacaq?</span>
            </label>
            <input
              id="evak-to-address"
              type="text"
              required
              disabled={isCalculating}
              value={formData.toAddress}
              onChange={(e) => updateFormAndRecalculate({ toAddress: e.target.value })}
              placeholder="Məsələn: Xırdalan"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm bg-slate-50/50 outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            />
            {/* Dynamic Search Suggestions */}
            {formData.toAddress.trim().length >= 2 && !isCalculating && (() => {
              const dynamicSuggestions = findDestinationSuggestions(formData.toAddress, 5);
              if (dynamicSuggestions.length === 0) return null;
              return (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-blue-700 font-bold">Təkliflər:</span>
                  {dynamicSuggestions.map((s) => (
                    <button
                      key={s.canonicalName}
                      type="button"
                      onClick={() => updateFormAndRecalculate({ toAddress: s.canonicalName })}
                      className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-[11px] text-blue-700 font-bold hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      {s.canonicalName}
                    </button>
                  ))}
                </div>
              );
            })()}
            {/* Quick Location Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Xırdalan', 'Sumqayıt', 'Əhmədli', 'Masazır', 'Mərdəkan', 'Gəncə', 'Quba'].map((loc) => (
                <button
                  key={loc}
                  type="button"
                  disabled={isCalculating}
                  onClick={() => updateFormAndRecalculate({ toAddress: loc })}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-100 text-[11px] text-slate-600 hover:text-blue-700 font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CAR TYPE SELECTOR (VISUAL CARDS) */}
        <div className="space-y-2.5">
          <label className="block text-sm font-bold text-slate-900">
            Avtomobil növü
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {CAR_TYPES.map((item) => (
              <button
                key={item.type}
                type="button"
                id={`evak-type-${item.type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                disabled={isCalculating}
                onClick={() => updateFormAndRecalculate({ carType: item.type })}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 disabled:opacity-75 ${
                  formData.carType === item.type
                    ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-xs ring-2 ring-blue-500/20 font-bold'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-bold leading-tight">{item.type}</span>
                {item.type === 'Minivan' && (
                  <span className="text-[10px] text-blue-700 font-semibold">+10 AZN</span>
                )}
                {(item.type === 'Mikroavtobus' || item.type === 'Digər') && (
                  <span className="text-[10px] text-amber-700 font-medium">Dəqiqləşdirilir</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* DRIVABLE YES/NO TOGGLE */}
        <div className="space-y-2">
          <div className="flex items-center justify-between max-w-md">
            <label className="block text-sm font-bold text-slate-900">
              Avtomobil hərəkət edə bilir? (İşlək / Nasaz)
            </label>
            <span className="text-xs font-semibold text-slate-500">Nasaz/Kilidli: +5 AZN</span>
          </div>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <button
              id="evak-condition-working"
              type="button"
              disabled={isCalculating}
              onClick={() => updateFormAndRecalculate({ canMove: 'Bəli' })}
              className={`py-3 px-4 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75 ${
                formData.canMove === 'Bəli'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Bəli (Hərəkət edir)</span>
            </button>

            <button
              id="evak-condition-broken"
              type="button"
              disabled={isCalculating}
              onClick={() => updateFormAndRecalculate({ canMove: 'Xeyr' })}
              className={`py-3 px-4 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75 ${
                formData.canMove === 'Xeyr'
                  ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Xeyr (Nasaz / Kilidli +5₼)</span>
            </button>
          </div>
        </div>

        {/* OPTIONAL CONDITION NOTES */}
        <div className="space-y-2">
          <label htmlFor="evak-condition" className="block text-sm font-bold text-slate-900">
            Əlavə vəziyyət <span className="text-xs font-normal text-slate-500">(İstəyə görə)</span>
          </label>
          <textarea
            id="evak-condition"
            rows={2}
            disabled={isCalculating}
            value={formData.conditionNotes}
            onChange={(e) => updateFormAndRecalculate({ conditionNotes: e.target.value })}
            placeholder="Məsələn: avtomobil qəza edib, sükan və ya təkər kilidlənib..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50 outline-none disabled:opacity-70 disabled:cursor-not-allowed"
          />
        </div>

        {/* PHONE NUMBER (OPTIONAL) */}
        <div className="max-w-md space-y-1.5">
          <label htmlFor="evak-phone" className="block text-sm font-bold text-slate-800">
            Əlaqə nömrəsi <span className="text-xs font-normal text-slate-500">(İstəyə görə)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="evak-phone"
              type="tel"
              disabled={isCalculating}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+994 50 123 45 67"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 text-sm bg-slate-50/50 outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2">
          <button
            id="btn-calculate-evakuasiya"
            type="submit"
            disabled={isCalculating}
            className="w-full sm:w-auto min-w-[280px] py-4 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {isCalculating ? (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Hesablanır... ({Math.round(calcProgress)}%)</span>
              </>
            ) : (
              <>
                <span className="text-xl">🚗</span>
                <span>Evakuasiya qiymətini hesabla</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* PROFESSIONAL ROUTE & PROGRESS LOADING COMPONENT */}
      {isCalculating && (
        <div
          id="evakuasiya-route-loader"
          aria-live="polite"
          className="mt-10 rounded-2xl border-2 border-blue-500/40 bg-linear-to-b from-blue-50/70 via-white to-slate-50/80 p-6 sm:p-8 shadow-xl shadow-blue-500/5 transition-all duration-300 animate-in fade-in zoom-in-95"
        >
          {/* Header Status & Progress Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold uppercase tracking-wide mb-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                <span>Aktiv marşrut təhlili</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight transition-all">
                {calcStatusText}
              </h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Tərəqqi</span>
              <span className="text-2xl sm:text-3xl font-black text-blue-600 font-mono">
                {Math.round(calcProgress)}%
              </span>
            </div>
          </div>

          {/* Route Corridor Visual with Moving Tow-Truck */}
          <div className="pt-8 pb-6 px-1 sm:px-4">
            <div className="relative flex items-center justify-between py-6">
              {/* Route line track background */}
              <div className="absolute left-6 right-6 sm:left-10 sm:right-10 top-1/2 -translate-y-1/2 h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                {/* Active animated progress bar fill */}
                <div
                  className="h-full bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-full transition-all duration-75 ease-out shadow-xs"
                  style={{ width: `${Math.min(Math.max(calcProgress, 0), 100)}%` }}
                />
              </div>

              {/* Moving Tow-Truck Graphic along horizontal route line */}
              <div
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-10 transition-all duration-75 ease-out"
                style={{
                  left: `calc(24px + (100% - 48px) * ${Math.min(Math.max(calcProgress, 0), 100) / 100})`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white rounded-xl shadow-md border border-slate-200/90 flex items-center justify-center">
                  <TowTruckGraphic className="w-14 h-7 sm:w-16 sm:h-8" />
                </div>
              </div>

              {/* Point A (Başlanğıc nöqtəsi) */}
              <div className="relative z-0 flex flex-col items-center text-center">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-600 text-white font-black text-base shadow-lg shadow-blue-600/30 flex items-center justify-center ring-4 ring-white border border-blue-700">
                  A
                </div>
                <span className="text-[11px] font-extrabold text-blue-700 uppercase tracking-wider mt-2.5">
                  Götürülmə
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 max-w-[100px] sm:max-w-[160px] truncate mt-0.5">
                  {formData.fromAddress || 'Nərimanov'}
                </span>
              </div>

              {/* Point B (Təyinat nöqtəsi) */}
              <div className="relative z-0 flex flex-col items-center text-center">
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl font-black text-base shadow-lg flex items-center justify-center ring-4 ring-white border transition-all duration-300 ${
                    calcProgress >= 95
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-emerald-600/30 ring-emerald-200'
                      : 'bg-slate-100 text-slate-700 border-slate-300 shadow-slate-300/40'
                  }`}
                >
                  B
                </div>
                <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mt-2.5">
                  Çatdırılma
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 max-w-[100px] sm:max-w-[160px] truncate mt-0.5">
                  {formData.toAddress || 'Xırdalan'}
                </span>
              </div>
            </div>
          </div>

          {/* Sequential Step Progress Pills */}
          <div className="mt-4 pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                calcStage >= 1
                  ? 'bg-blue-50 border-blue-200 text-blue-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                calcStage > 1 ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800'
              }`}>
                {calcStage > 1 ? '✓' : '1'}
              </span>
              <span>Marşrut təyini</span>
            </div>

            <div
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                calcStage >= 2
                  ? 'bg-blue-50 border-blue-200 text-blue-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                calcStage > 2 ? 'bg-blue-600 text-white' : calcStage === 2 ? 'bg-blue-200 text-blue-800' : 'bg-slate-200 text-slate-500'
              }`}>
                {calcStage > 2 ? '✓' : '2'}
              </span>
              <span>Avtomobil və vəziyyət</span>
            </div>

            <div
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                calcStage >= 3
                  ? 'bg-blue-50 border-blue-200 text-blue-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                calcProgress >= 100 ? 'bg-emerald-600 text-white' : calcStage === 3 ? 'bg-blue-200 text-blue-800' : 'bg-slate-200 text-slate-500'
              }`}>
                {calcProgress >= 100 ? '✓' : '3'}
              </span>
              <span>Qiymət hesablanması</span>
            </div>
          </div>

          {/* Quick specs pill summary */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 pt-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-semibold">
                🚗 {formData.carType}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-semibold">
                ⚙️ {formData.canMove === 'Bəli' ? 'İşlək' : 'Nasaz / Kilidli (+5 AZN)'}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 italic">
              Avtomatik marşrut xətti hesablanır
            </span>
          </div>
        </div>
      )}

      {/* RESULT CARD */}
      {result && !isCalculating && (
        <div
          id="evakuasiya-result-card"
          className={`mt-10 rounded-2xl border-2 p-6 sm:p-8 shadow-xl animate-in fade-in zoom-in-95 duration-300 ${
            requiresManualConfirm
              ? 'border-amber-400 bg-linear-to-b from-white to-amber-50/30'
              : 'border-blue-600 bg-linear-to-b from-white to-blue-50/40'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200">
            <div>
              {requiresManualConfirm ? (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wide mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Operator dəqiqləşdirməsi</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wide mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Marşrut və avtomobil təyin edildi</span>
                </div>
              )}
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {requiresManualConfirm ? 'Qiymət dəqiqləşdirilir' : 'İlkin evakuasiya qiyməti'}
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                {requiresManualConfirm ? 'Status' : 'İlkin qiymət'}
              </span>
              {requiresManualConfirm ? (
                <span className="text-base sm:text-lg font-bold text-amber-700 tracking-tight block">
                  {result.estimatedPrice}
                </span>
              ) : (
                <span className="text-3xl sm:text-4xl font-black text-blue-600 tracking-tight block">
                  {result.estimatedPrice}
                </span>
              )}
            </div>
          </div>

          {/* SPECIFICATIONS */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Marşrut</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 mt-1 block">
                {result.fromAddress} → {result.toAddress}
              </span>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Təxmini məsafə</span>
              <span className="text-base sm:text-lg font-bold text-slate-900 mt-1 block">
                {result.distanceKm ? `${result.distanceKm} km` : 'Dəqiqləşdirilir'}
              </span>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Avtomobil və vəziyyət</span>
              <span className="text-base sm:text-lg font-bold text-slate-900 mt-1 block">
                {result.carType} ({result.canMove === 'Bəli' ? 'İşlək' : 'Nasaz/Kilidli'})
              </span>
            </div>
          </div>

          {/* DISCLAIMER & NOTICES */}
          {requiresManualConfirm ? (
            <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200/90 flex items-start gap-3 text-xs text-amber-950">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-sm text-amber-900">
                  {result.tariffDisclaimer || 'Bu avtomobil növü üçün qiymət operator tərəfindən dəqiqləşdirilir.'}
                </p>
                <p className="text-amber-800 leading-relaxed">
                  Mikroavtobus, xüsusi texnika və ya qeyri-standart marşrutlarda ən uyğun evakuator növü və dəqiq qiymət dərhal operatorumuz tərəfindən təqdim olunur.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-5 p-3.5 rounded-xl bg-slate-100/90 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
              <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p>
                <strong>Qeyd:</strong> Qiymət marşrut, avtomobil növü ({result.carType}) və texniki vəziyyət ({result.canMove === 'Bəli' ? 'hərəkətli' : 'nasaz/kilidli (+5 AZN)'}) nəzərə alınmaqla ilkin hesablanmışdır. Yekun qiymət operator təsdiqi ilə qüvvəyə minir.
              </p>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {/* Primary Action Button */}
            {requiresManualConfirm ? (
              <button
                id="evak-btn-operator-confirm"
                type="button"
                onClick={handleCallbackClick}
                className="flex-1 py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                <span>Operatorla dəqiqləşdir</span>
              </button>
            ) : (
              <button
                id="evak-btn-callback"
                type="button"
                onClick={handleCallbackClick}
                className="flex-1 py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                <span>Mənimlə əlaqə saxlayın</span>
              </button>
            )}

            {/* Quick Dial Button */}
            <a
              id="evak-btn-call"
              href={CONTACT_INFO.PRIMARY_PHONE_TEL}
              aria-label={`${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsinə zəng et`}
              className="py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Zəng et: {CONTACT_INFO.PRIMARY_PHONE_DISPLAY}</span>
            </a>

            {/* WhatsApp Button */}
            <button
              id="evak-btn-whatsapp"
              type="button"
              onClick={handleWhatsAppOrder}
              className="py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

