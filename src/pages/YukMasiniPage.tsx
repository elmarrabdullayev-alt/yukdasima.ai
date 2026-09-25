import React, { useState } from 'react';
import { DEFAULT_VEHICLE_CONFIG, VehicleSpec } from '../config/vehicles';
import { DirectYukdasimaOrder } from '../components/DirectYukdasimaOrder';
import { Link } from '../router/RouterContext';
import {
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Gauge,
  Box,
  Maximize2,
  Phone,
  MessageSquare,
  ChevronDown,
  HelpCircle,
  Clock,
  Layers,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { getContextualWhatsAppUrl } from '../utils/whatsappHelper';
import { trackConversionEvent } from '../utils/analytics';
import { CallbackInitialData } from '../types';
import { YUK_MASINI_FAQS } from '../seo/metadata';

interface YukMasiniPageProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const YukMasiniPage: React.FC<YukMasiniPageProps> = ({ onOpenCallback }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleSpec>(DEFAULT_VEHICLE_CONFIG.vehicles[0]);
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0, 1, 2, 3, 4]);
  const whatsappUrl = getContextualWhatsAppUrl('/yuk-masini');

  const toggleFaq = (index: number) => {
    setOpenFaqIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

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

        {/* New SEO Section: Yük maşını sifarişi necə verilir? */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6" aria-label="Sifariş Prosesi">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Yük maşını sifarişi necə verilir?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Yük maşını sifarişi prosesi sistemimiz üzərindən 4 sadə addımla həyata keçirilir:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">Uyğun yük maşınını seçin</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Daşınacaq əşyaların həcminə və ölçüsünə uyğun avtomobil növünü (2 metrdən 7 metrədək furqonlar) müəyyən edin.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">Marşrutu qeyd edin</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yükləmə və çatdırılma ünvanlarını daxil edin. Xidmət Bakı şəhərdaxili və rayonlararası istiqamətləri əhatə edir.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">Əlavə xidmətləri seçin</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yükləmə və boşaldılma üçün tələb olunduqda fəhlə briqadası və ya mebel ustası xidmətini sifarişə əlavə edin.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-base">Əlaqə məlumatlarını daxil edin</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Telefon nömrənizi qeyd edərək onlayn müraciət göndərin, 050 250 31 70 nömrəsinə zəng edin və ya WhatsApp ilə sifariş yaradın.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label="Tez-tez verilən suallar">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Məlumat Mərkəzi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tez-tez Verilən Suallar
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Yük maşını sifarişi, avtopark ölçüləri, fəhlə xidməti və qiymətləndirmə ilə bağlı sualların cavabları:
            </p>
          </div>

          <div className="space-y-3 max-w-4xl">
            {YUK_MASINI_FAQS.map((faq, index) => {
              const isOpen = openFaqIndexes.includes(index);
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-50 hover:bg-slate-100 transition-colors gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`p-5 bg-white border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed space-y-2 ${
                      isOpen ? 'block' : 'hidden'
                    }`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Related Services Internal Links */}
        <section className="space-y-6" aria-label="Əlaqəli Xidmətlər və Keçidlər">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Əlaqəli Daşıma Xidmətləri</h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">Digər xidmətlərimizlə və qiymət tarifləri ilə tanış olun:</p>
            </div>
            <Link
              href="/qiymetler"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              <span>Bütün tariflər</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/yukdasima"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Yükdaşıma Xidməti</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Bakı və bütün rayonlararası peşəkar yükdaşıma platforması.</p>
            </Link>

            <Link
              href="/evden-eve-yukdasima"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Evdən Evə Yükdaşıma</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Mənzil və bağ evlərinin tam qablaşdırma ilə köçürülməsi.</p>
            </Link>

            <Link
              href="/mebel-dasinmasi"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Mebel Daşınması & Usta</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Mebellərin sökülməsi, qablaşdırılması və quraşdırılması.</p>
            </Link>

            <Link
              href="/ofis-dasinmasi"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Ofis Daşınması</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Ofis avadanlıqları və arxiv sənədlərinin planlı köçürülməsi.</p>
            </Link>

            <Link
              href="/fehle-xidmeti"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Fəhlə Xidməti</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Ağır əşyaların yüklənməsi, boşaldılması və mərtəbəyə qaldırılması.</p>
            </Link>

            <Link
              href="/elaqe"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Əlaqə & Operator Dəstəyi</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">{CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsi və WhatsApp xətti ilə sürətli əlaqə.</p>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
};

