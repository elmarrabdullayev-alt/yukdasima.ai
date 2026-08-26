import React, { useState } from 'react';
import {
  Car,
  MapPin,
  Compass,
  Phone,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Clock,
  ShieldCheck,
  Zap,
  HelpCircle
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
  const [result, setResult] = useState<EvakuasiyaResult | null>(null);

  const updateFormAndRecalculate = (updates: Partial<EvakuasiyaFormData>) => {
    const updated = { ...formData, ...updates };
    setFormData(updated);
    if (result) {
      setResult(calculateEvakuasiyaEstimate(updated));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setResult(null);

    setTimeout(() => {
      setIsCalculating(false);
      const est = calculateEvakuasiyaEstimate(formData);
      setResult(est);

      setTimeout(() => {
        const resEl = document.getElementById('evakuasiya-result-card');
        if (resEl) {
          resEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }, 400);
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
              value={formData.fromAddress}
              onChange={(e) => updateFormAndRecalculate({ fromAddress: e.target.value })}
              placeholder="Məsələn: Nərimanov, Bakı"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm bg-slate-50/50 outline-none"
            />
            {/* Quick Location Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Nərimanov', 'Yasamal', '28 May', 'Koroğlu', 'Bakıxanov'].map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => updateFormAndRecalculate({ fromAddress: loc })}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-100 text-[11px] text-slate-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
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
              value={formData.toAddress}
              onChange={(e) => updateFormAndRecalculate({ toAddress: e.target.value })}
              placeholder="Məsələn: Xırdalan"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm bg-slate-50/50 outline-none"
            />
            {/* Dynamic Search Suggestions */}
            {formData.toAddress.trim().length >= 2 && (() => {
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
                  onClick={() => updateFormAndRecalculate({ toAddress: loc })}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-100 text-[11px] text-slate-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
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
                onClick={() => updateFormAndRecalculate({ carType: item.type })}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
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
              onClick={() => updateFormAndRecalculate({ canMove: 'Bəli' })}
              className={`py-3 px-4 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
              onClick={() => updateFormAndRecalculate({ canMove: 'Xeyr' })}
              className={`py-3 px-4 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
            value={formData.conditionNotes}
            onChange={(e) => updateFormAndRecalculate({ conditionNotes: e.target.value })}
            placeholder="Məsələn: avtomobil qəza edib, sükan və ya təkər kilidlənib..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50 outline-none"
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
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+994 50 123 45 67"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 text-sm bg-slate-50/50 outline-none"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2">
          <button
            id="btn-calculate-evakuasiya"
            type="submit"
            disabled={isCalculating}
            className="w-full sm:w-auto min-w-[280px] py-4 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-75"
          >
            {isCalculating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Marşrut və məlumatlar hesablanır...</span>
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

            {/* Quick Hotline Dial Button */}
            <a
              id="evak-btn-hotline"
              href={CONTACT_INFO.HOTLINE_TEL}
              aria-label="878 qaynar xəttinə zəng et"
              className="py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>878-ə zəng et</span>
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
