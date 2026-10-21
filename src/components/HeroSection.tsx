import React from 'react';
import { ArrowRight, Phone, MessageSquare, ShieldCheck, Clock } from 'lucide-react';
import { ServiceType } from '../types';
import { CONTACT_INFO } from '../constants/contact';
import { useRouter } from '../router/RouterContext';
import { getContextualWhatsAppUrl } from '../utils/whatsappHelper';
import { trackConversionEvent } from '../utils/analytics';
import { t, getLang } from '../i18n';

interface HeroSectionProps {
  activeService: ServiceType;
  onSelectService: (service: ServiceType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeService,
  onSelectService,
}) => {
  const { pathname } = useRouter();
  const whatsappUrl = getContextualWhatsAppUrl(pathname);

  const handleSelect = (service: ServiceType) => {
    onSelectService(service);
    const element = document.getElementById('estimator-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroCallClick = () => {
    trackConversionEvent('mobile_call_click', {
      page_path: pathname,
      service_type: activeService,
      cta_location: 'hero',
    });
  };

  const handleHeroWhatsAppClick = () => {
    trackConversionEvent('mobile_whatsapp_click', {
      page_path: pathname,
      service_type: activeService,
      cta_location: 'hero',
    });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-16 md:pb-24 bg-slate-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>{t("24/7 Operativ Xidmət və Dərhal Əlaqə")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">{getLang() === 'ru' ? (<><span className="text-blue-600">Грузоперевозки</span> и эвакуатор в Баку{' '}</>) : (<>{t("Bakıda ")}<span className="text-blue-600">{t("Yükdaşıma")}</span>{t(" və Evakuator Xidməti")}{t(' ')}</>)}
            <span className="block mt-2 text-xl sm:text-3xl font-bold text-slate-600">
              <span className="sr-only">— </span>{t("Qiyməti onlayn öyrənin")}</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">{t("Yükdaşıma və evakuasiya xidmətləri üçün məlumatları daxil edin, ilkin qiyməti öyrənin və sifarişinizi dərhal bizə göndərin.")}</p>

          {/* Primary Quick Conversion CTAs for Mobile & Desktop */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <a
              id="hero-call-cta-btn"
              href={CONTACT_INFO.PRIMARY_PHONE_TEL}
              onClick={handleHeroCallClick}
              aria-label={t(`${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsinə zəng et`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-extrabold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>{t("Zəng et: ")}{t(CONTACT_INFO.PRIMARY_PHONE_DISPLAY)}</span>
            </a>

            <a
              id="hero-whatsapp-cta-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleHeroWhatsAppClick}
              aria-label={t("WhatsApp vasitəsilə dərhal yaz")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-extrabold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{t("WhatsApp ilə Yaz")}</span>
            </a>
          </div>
        </div>

        {/* TWO EQUALLY PROMINENT SERVICE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
          {/* CARD 1: YÜKDAŞIMA */}
          <div
            id="hero-card-yukdasima"
            onClick={() => handleSelect('yukdasima')}
            className={`bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group flex flex-col h-full cursor-pointer ${
              activeService === 'yukdasima' ? 'border-blue-600 ring-2 ring-blue-500/20' : ''
            }`}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 text-3xl flex items-center justify-center rounded-2xl mb-5 group-hover:scale-110 transition-transform">
              🚚
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 text-left">{t("Yükdaşıma")}</h3>
            <p className="text-slate-500 text-sm sm:text-base mb-6 flex-1 text-left">{t("Əşyalarınızın şəkillərini göndərin. AI yükünüzü analiz etsin və ilkin qiyməti öyrənin.")}</p>

            <button
              type="button"
              id="hero-btn-yukdasima"
              className={`w-full py-3.5 sm:py-4 font-bold rounded-xl transition-colors cursor-pointer text-sm sm:text-base ${
                activeService === 'yukdasima'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-white group-hover:bg-blue-600'
              }`}
            >{t("Yükümü hesabla")}</button>
          </div>

          {/* CARD 2: EVAKUASİYA */}
          <div
            id="hero-card-evakuasiya"
            onClick={() => handleSelect('evakuasiya')}
            className={`bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group flex flex-col h-full cursor-pointer ${
              activeService === 'evakuasiya' ? 'border-blue-600 ring-2 ring-blue-500/20' : ''
            }`}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 text-3xl flex items-center justify-center rounded-2xl mb-5 group-hover:scale-110 transition-transform">
              🚗
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 text-left">{t("Evakuasiya")}</h3>
            <p className="text-slate-500 text-sm sm:text-base mb-6 flex-1 text-left">{t("Avtomobilin götürüləcəyi və aparılacağı ünvanı qeyd edin, ilkin evakuasiya qiymətini öyrənin.")}</p>

            <button
              type="button"
              id="hero-btn-evakuasiya"
              className={`w-full py-3.5 sm:py-4 font-bold rounded-xl transition-colors cursor-pointer text-sm sm:text-base ${
                activeService === 'evakuasiya'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-white group-hover:bg-blue-600'
              }`}
            >{t("Evakuasiya qiymətini hesabla")}</button>
          </div>
        </div>
      </div>
    </section>
  );
};
