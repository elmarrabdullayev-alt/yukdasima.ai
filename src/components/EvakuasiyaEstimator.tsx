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
  Zap
} from 'lucide-react';
import { EvakuasiyaFormData, EvakuasiyaResult, CarType } from '../types';
import { calculateEvakuasiyaEstimate, generateWhatsAppLink } from '../utils/calculator';
import { POPULAR_LOCATIONS } from '../data/mockData';

interface EvakuasiyaEstimatorProps {
  onOpenCallback: (initialPhone?: string) => void;
}

const CAR_TYPES: { type: CarType; icon: string; desc: string }[] = [
  { type: 'Sedan', icon: '🚗', desc: 'Standart minik' },
  { type: 'SUV / Jeep', icon: '🚙', desc: 'Krossover & Cip' },
  { type: 'Hetçbek', icon: '🚘', desc: 'Kompakt avtomobil' },
  { type: 'Minivan', icon: '🚐', desc: 'Geniş ailə maşını' },
  { type: 'Mikroavtobus', icon: '🚌', desc: 'Sprinter və s.' },
  { type: 'Digər', icon: '🏎️', desc: 'Xüsusi texnika' },
];

export const EvakuasiyaEstimator: React.FC<EvakuasiyaEstimatorProps> = ({ onOpenCallback }) => {
  const [formData, setFormData] = useState<EvakuasiyaFormData>({
    fromAddress: 'Nərimanov, Bakı',
    toAddress: 'Xırdalan',
    carType: 'Sedan',
    canMove: 'Bəli',
    conditionNotes: '',
    phone: '',
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<EvakuasiyaResult | null>(null);

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
    }, 900);
  };

  const handleWhatsAppOrder = () => {
    const msg = `Salam, yukdasima.ai üzərindən evakuasiya xidməti sifariş etmək istəyirəm.\n` +
      `📍 Marşrut: ${formData.fromAddress} ➔ ${formData.toAddress}\n` +
      `📏 Təxmini məsafə: ${result?.distanceKm || 18} km\n` +
      `🚗 Avtomobil: ${formData.carType}\n` +
      `⚙️ Hərəkət vəziyyəti: ${formData.canMove}\n` +
      (formData.conditionNotes ? `📝 Vəziyyət: ${formData.conditionNotes}\n` : '') +
      `💰 İlkin qiymət: ${result?.estimatedPrice || '35-45 AZN'}\n` +
      `Zəhmət olmasa təcili evakuator göndərə bilərsiniz?`;

    window.open(generateWhatsAppLink(msg), '_blank');
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
              onChange={(e) => setFormData({ ...formData, fromAddress: e.target.value })}
              placeholder="Məsələn: Nərimanov, Bakı"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm bg-slate-50/50 outline-none"
            />
            {/* Quick Location Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Nərimanov', 'Yasamal', '28 May', 'Koroğlu', 'Bakıxanov'].map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setFormData({ ...formData, fromAddress: loc })}
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
              onChange={(e) => setFormData({ ...formData, toAddress: e.target.value })}
              placeholder="Məsələn: Xırdalan"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm bg-slate-50/50 outline-none"
            />
            {/* Quick Location Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Xırdalan', 'Sumqayıt', 'Əhmədli', 'Masazır', 'Mərdəkan'].map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setFormData({ ...formData, toAddress: loc })}
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
                onClick={() => setFormData({ ...formData, carType: item.type })}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  formData.carType === item.type
                    ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-xs ring-2 ring-blue-500/20 font-bold'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-bold leading-tight">{item.type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* DRIVABLE YES/NO TOGGLE */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-900">
            Avtomobil hərəkət edə bilir?
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, canMove: 'Bəli' })}
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
              type="button"
              onClick={() => setFormData({ ...formData, canMove: 'Xeyr' })}
              className={`py-3 px-4 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                formData.canMove === 'Xeyr'
                  ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Xeyr (Nasaz / Kilidli)</span>
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
            onChange={(e) => setFormData({ ...formData, conditionNotes: e.target.value })}
            placeholder="Məsələn: avtomobil qəza edib, təkər kilidlənib və s."
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
          className="mt-10 rounded-2xl border-2 border-blue-600 bg-linear-to-b from-white to-blue-50/40 p-6 sm:p-8 shadow-xl animate-in fade-in zoom-in-95 duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wide mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Marşrut təyin edildi</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                İlkin evakuasiya qiyməti
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">İlkin qiymət</span>
              <span className="text-3xl sm:text-4xl font-black text-blue-600 tracking-tight">
                {result.estimatedPrice}
              </span>
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
                {result.distanceKm} km
              </span>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Avtomobil növü</span>
              <span className="text-base sm:text-lg font-bold text-slate-900 mt-1 block">
                {result.carType} ({result.canMove === 'Bəli' ? 'Hərəkətli' : 'Nasaz'})
              </span>
            </div>
          </div>

          {/* DISCLAIMER */}
          <div className="mt-5 p-3.5 rounded-xl bg-slate-100/90 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
            <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p>
              <strong>Qeyd:</strong> Qiymət marşrut və təqdim olunan məlumatlar əsasında ilkin hesablamadır. Yekun qiymət operator tərəfindən təsdiqlənir.
            </p>
          </div>

          {/* ACTIONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3.5">
            <button
              id="evak-btn-whatsapp"
              type="button"
              onClick={handleWhatsAppOrder}
              className="flex-1 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-5 h-5" />
              <span>💬 WhatsApp ilə sifariş et</span>
            </button>

            <button
              id="evak-btn-callback"
              type="button"
              onClick={() => onOpenCallback(formData.phone)}
              className="py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <Phone className="w-4 h-4" />
              <span>📞 Mənimlə əlaqə saxlayın</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
