import React, { useState } from 'react';
import {
  BAKU_DISTRICTS,
  BakuDistrictGeoProfile,
} from '../seo/bakuDistrictsData';
import { CONTACT_INFO } from '../constants/contact';
import { getContextualWhatsAppUrl } from '../utils/whatsappHelper';
import { trackConversionEvent } from '../utils/analytics';
import {
  MapPin,
  Truck,
  Phone,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  Building2,
  Clock,
  Navigation,
  Wrench,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Car,
  Layers,
} from 'lucide-react';
import { CallbackInitialData } from '../types';

interface BakuDistrictsGeoSectionProps {
  initialDistrictId?: string;
  defaultMode?: 'yukdasima' | 'evakuator';
  onOpenCallback?: (initialData?: string | CallbackInitialData) => void;
}

export const BakuDistrictsGeoSection: React.FC<BakuDistrictsGeoSectionProps> = ({
  initialDistrictId = 'yasamal',
  defaultMode = 'yukdasima',
  onOpenCallback,
}) => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(initialDistrictId);
  const [activeTab, setActiveTab] = useState<'yukdasima' | 'evakuator'>(defaultMode);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const currentDistrict: BakuDistrictGeoProfile =
    BAKU_DISTRICTS.find((d) => d.id === selectedDistrictId) || BAKU_DISTRICTS[0];

  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrictId(districtId);
    setOpenFaqIndex(0); // Reset accordion to first item for new district
  };

  const handlePhoneClick = () => {
    trackConversionEvent('mobile_call_click', {
      page_path: window.location.pathname,
      service_type: `baku_${currentDistrict.id}_${activeTab}`,
      cta_location: 'baku_geo_section',
    });
  };

  const handleWhatsAppClick = () => {
    trackConversionEvent('mobile_whatsapp_click', {
      page_path: window.location.pathname,
      service_type: `baku_${currentDistrict.id}_${activeTab}`,
      cta_location: 'baku_geo_section',
    });
    const waUrl = getContextualWhatsAppUrl(
      window.location.pathname,
      `Salam, ${currentDistrict.fullName} üzrə ${activeTab === 'yukdasima' ? 'yükdaşıma' : 'evakuator'} xidməti sifariş etmək istəyirəm.`
    );
    window.open(waUrl, '_blank');
  };

  const faqs =
    activeTab === 'yukdasima'
      ? currentDistrict.faqsYukdasima
      : currentDistrict.faqsEvakuator;

  return (
    <section
      id="baki-rayonlari-geo-section"
      className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8"
      aria-label="Bakı və Bakı Daxili Rayonlar Üzrə Xidmət Zonaları"
    >
      {/* Header section with single unified title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>GEO / AI Lokallaşdırma – 12 Bakı Rayonu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bakı Daxili Rayonlar Üzrə Yükdaşıma və Evakuator Xidməti
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Bakı şəhərinin 12 inzibati rayonu üzrə məhəllə daxili ünvanlara, prospektlərə və binalara uyğunlaşdırılmış 24/7 operativ yükdaşıma, mebel ustası və evakuasiya xidmətləri.
          </p>
        </div>

        {/* Service mode toggle: Yükdaşıma vs Evakuator */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('yukdasima')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'yukdasima'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Yükdaşıma & Köç</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('evakuator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'evakuator'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Evakuator & Yol Yardımı</span>
          </button>
        </div>
      </div>

      {/* 12 Baku Districts Pill / Grid Selector */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Rayon seçin (12 İnzibati Rayon):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {BAKU_DISTRICTS.map((district) => {
            const isSelected = district.id === selectedDistrictId;
            return (
              <button
                key={district.id}
                type="button"
                onClick={() => handleDistrictChange(district.id)}
                className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-bold text-sm">{district.name}</span>
                  <MapPin
                    className={`w-3.5 h-3.5 ${
                      isSelected ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] leading-tight line-clamp-1 ${
                    isSelected ? 'text-blue-100' : 'text-slate-500'
                  }`}
                >
                  {district.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected District Content Showcase */}
      <div className="space-y-8 animate-fadeIn">
        {/* District Headline Badge and Response Time */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-xs font-extrabold">
                {currentDistrict.fullName}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {currentDistrict.badge}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {currentDistrict.name} üzrə{' '}
              {activeTab === 'yukdasima'
                ? 'Peşəkar Yükdaşıma, Mebel Montajı və Mənzil Köçü'
                : '24/7 Operativ Evakuator və Texniki Yol Yardımı'}
            </h3>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 shadow-xs">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Çatış müddəti: ~{currentDistrict.responseTimeMinutes}</span>
            </div>
          </div>
        </div>

        {/* Generative AI Search Direct Answer Block (ChatGPT / Gemini / Perplexity snippet ready) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white space-y-3 shadow-sm border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Birbaşa Cavab / Direct Answer</span>
          </div>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            {activeTab === 'yukdasima'
              ? currentDistrict.directAnswerYukdasima
              : currentDistrict.directAnswerEvakuator}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={CONTACT_INFO.PRIMARY_PHONE_TEL}
              onClick={handlePhoneClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Zəng et: {CONTACT_INFO.PRIMARY_PHONE_DISPLAY}</span>
            </a>
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp ilə Sifariş</span>
            </button>
          </div>
        </div>

        {/* Local Geographic Context & Urban Infrastructure Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key landmarks and streets */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <Navigation className="w-5 h-5 text-blue-600" />
              <span>Əsas Prospektlər və Ünvan Nöqtələri</span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-slate-500 block mb-1">
                  Məşhur Lokasiyalar və Metrolar:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentDistrict.landmarks.map((landmark, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium"
                    >
                      {landmark}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 block mb-1">
                  Əsas Magistral və Küçələr:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentDistrict.keyStreets.map((street, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-blue-800 text-xs font-medium"
                    >
                      {street}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Building Architecture and Access Nuances */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <span>Bina Tipləri və Giriş/Tıxac Xüsusiyyətləri</span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-800">Tikili xarakteri: </strong>
                {currentDistrict.buildingCharacteristics}
              </p>
              <p>
                <strong className="text-slate-800">Giriş və parklanma: </strong>
                {currentDistrict.trafficAndAccessNotes}
              </p>
            </div>
          </div>
        </div>

        {/* Local Services Offered */}
        <div className="space-y-4">
          <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span>{currentDistrict.fullName} Üzrə Göstərilən Xidmətlər</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentDistrict.services.map((srv, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{srv.title}</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {srv.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Vehicles for This District */}
        <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-4">
          <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <span>Bu Rayon Üçün Tövsiyə Olunan Nəqliyyat Texnikası</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentDistrict.recommendedVehicles.map((v, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-blue-200/80 space-y-1.5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">
                    {v.vehicle}
                  </span>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                    {v.specs}
                  </span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {v.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Local District FAQs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>{currentDistrict.name} Rayonu Üzrə Tez-tez Verilən Suallar</span>
            </h4>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {/* Answer stays in the HTML (visible to search engines) and is only hidden when closed */}
                  <div hidden={!isOpen} className="px-4 pb-4 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 12 Rayonun Birbaşa Məlumat və AI Direct Answer Xülasə Kataloqu (SSR & Crawler Indexed) */}
        <div className="pt-6 border-t border-slate-100 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>12 Bakı Rayonu Üzrə Birbaşa Xidmət və Lokasiya Xülasəsi</span>
            </h4>
            <span className="text-xs text-slate-500 font-medium">
              24/7 Bütün Bakı qəsəbə və massivləri üzrə operativ çıxış
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BAKU_DISTRICTS.map((district) => {
              const isSelected = district.id === selectedDistrictId;
              const directAnswer =
                activeTab === 'yukdasima'
                  ? district.directAnswerYukdasima
                  : district.directAnswerEvakuator;
              const overview =
                activeTab === 'yukdasima'
                  ? district.yukdasimaOverview
                  : district.evakuatorOverview;

              return (
                <article
                  key={district.id}
                  id={`baku-district-summary-${district.id}`}
                  className={`p-5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-blue-50/40 border-blue-300 ring-1 ring-blue-300 shadow-xs'
                      : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h5 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{district.fullName}</span>
                      </h5>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        {district.badge}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleDistrictChange(district.id);
                        document.getElementById('baki-rayonlari-geo-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? 'Aktiv Rayon' : 'Ətraflı Bax'}
                    </button>
                  </div>

                  {/* Short Service Intent Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                    {overview}
                  </p>

                  {/* Direct Answer Paragraph */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 text-slate-800 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700 uppercase tracking-wide">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Direct Answer ({activeTab === 'yukdasima' ? 'Yükdaşıma' : 'Evakuator'})</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {directAnswer}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
