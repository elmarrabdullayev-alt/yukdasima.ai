import React, { useState } from 'react';
import { DEFAULT_VEHICLE_CONFIG, VehicleSpec } from '../config/vehicles';
import { DirectYukdasimaOrder } from '../components/DirectYukdasimaOrder';
import { Link } from '../router/RouterContext';
import { Truck, ShieldCheck, CheckCircle2, ArrowRight, Gauge, Box, Maximize2, Phone, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { getContextualWhatsAppUrl } from '../utils/whatsappHelper';
import { trackConversionEvent } from '../utils/analytics';
import { CallbackInitialData } from '../types';

interface YukMasiniPageProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const YukMasiniPage: React.FC<YukMasiniPageProps> = ({ onOpenCallback }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleSpec>(DEFAULT_VEHICLE_CONFIG.vehicles[0]);
  const whatsappUrl = getContextualWhatsAppUrl('/yuk-masini');

  const handleCallClick = () => {
    trackConversionEvent('mobile_call_click', {
      page_path: '/yuk-masini',
      service_type: 'yuk-masini',
      cta_location: 'hero',
    });
  };

  const handleWhatsAppClick = () => {
    trackConversionEvent('mobile_whatsapp_click', {
      page_path: '/yuk-masini',
      service_type: 'yuk-masini',
      cta_location: 'hero',
    });
  };

  return (
    <article className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header / Intro with Primary H1 */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <Truck className="w-4 h-4" />
            <span>Geniş Avtopark</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Yük Maşını Sifarişi və İcarəsi
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Bakı şəhəri və rayonlararası hər növ yük həcminə uyğun 2 metrlik Ford Transit-dən 7 metrlik böyük tutumlu furqonlaradək təmiz və baxımlı nəqliyyat vasitələri.
          </p>

          {/* Quick Contact Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={CONTACT_INFO.PRIMARY_PHONE_TEL}
              onClick={handleCallClick}
              aria-label={`${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsinə zəng et`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-xs transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Zəng et: {CONTACT_INFO.PRIMARY_PHONE_DISPLAY}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              aria-label="WhatsApp vasitəsilə yaz"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp ilə Sifariş</span>
            </a>
          </div>
        </header>

        {/* Vehicle Fleet Grid */}
        <section aria-label="Yük Maşınları Avtoparkı">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Yük Maşını Modelləri və Ölçüləri</h2>
            <p className="text-sm text-slate-600 mt-1">Yükünüzün həcminə uyğun maşın seçərək dərhal sifariş verə bilərsiniz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEFAULT_VEHICLE_CONFIG.vehicles.map((v) => {
              const isSelected = selectedVehicle.id === v.id;
              const isTir = v.category === 'tir';
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicle(v)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer bg-white flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        {v.badge}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">{isTir ? 'TIR' : `${v.category.toUpperCase()} kateqoriyası`}</span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{v.name}</h3>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{v.description}</p>
                    </div>

                    {isTir ? (
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                        <div className="text-xs text-slate-600 font-medium">TIR üçün yükün çəkisi, həcmi və uyğun avtomobil tipi operator tərəfindən dəqiqləşdirilir.</div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                        <div>
                          <div className="text-[10px] text-slate-400 font-semibold uppercase">Uzunluq</div>
                          <div className="text-xs font-bold text-slate-800">{v.lengthM} m</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 font-semibold uppercase">En / Hünd.</div>
                          <div className="text-xs font-bold text-slate-800">{v.widthM}x{v.heightM}m</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 font-semibold uppercase">Həcm</div>
                          <div className="text-xs font-bold text-blue-600">~{v.practicalCapacityM3} m³</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      {isTir ? 'Böyük həcmli və xüsusi daşımalar' : `Daşıma qabiliyyəti: ${v.maxCarryingWeightKg} kq`}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVehicle(v);
                        const el = document.getElementById('direct-order-form');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Sifariş et</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Direct Order Form Embedded */}
        <section id="direct-order-form" aria-label="Birbaşa Sifariş Formu">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Seçilmiş Maşın Üçün Sifariş</h2>
            <p className="text-sm text-slate-600 mt-1">Məlumatları daxil edin və ya {CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsinə zəng edin</p>
          </div>
          <DirectYukdasimaOrder
            selectedVehicle={selectedVehicle}
            onOpenCallback={onOpenCallback}
          />
        </section>

        {/* Informational Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6" aria-label="Yük Maşını Seçimi Haqqında">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Hansı Yük Maşınını Seçməlisiniz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>2 və 3 Metrlik Furqonlar (Kiçik daşımalar)</span>
              </div>
              <p>
                Tək-tək mebellər (divan, soyuducu, paltaryuyan), kiçik ofis əşyaları və ya 1 otaqlı az əşyalı mənzillər üçün ən operativ və qənaətcil seçimdir. Şəhərdaxili dar küçələrdə manevr qabiliyyəti yüksəkdir.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>4 və 5 Metrlik Böyük Furqonlar (Standart ev köçürməsi)</span>
              </div>
              <p>
                2–4 otaqlı tam mənzil əşyaları, çoxlu sayda qutu, qonaq və yataq otağı dəstləri üçün idealdır. Qapalı və təmiz ban əşyalarınızın tozdan və hava şəraitindən tam qorunmasını təmin edir.
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};
