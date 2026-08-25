import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock, CheckCircle2, Phone } from 'lucide-react';
import { ServiceType } from '../types';
import { CONTACT_INFO } from '../constants/contact';

interface HeroSectionProps {
  activeService: ServiceType;
  onSelectService: (service: ServiceType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeService,
  onSelectService,
}) => {
  const handleSelect = (service: ServiceType) => {
    onSelectService(service);
    const element = document.getElementById('estimator-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-slate-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Daşıma qiymətinizi <span className="text-blue-600">asanlıqla</span> öyrənin
          </h1>

          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Yükdaşıma və evakuasiya xidmətləri üçün məlumatları daxil edin, ilkin qiyməti öyrənin və sifarişinizi bizə göndərin.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <a
              id="hero-quick-call-hotline"
              href={CONTACT_INFO.HOTLINE_TEL}
              aria-label="878 qaynar xəttinə zəng et"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-800 hover:text-blue-600 text-xs sm:text-sm font-bold shadow-2xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Təcili sifariş üçün Qaynar xətt: {CONTACT_INFO.HOTLINE_NUMBER}</span>
            </a>
          </div>
        </div>

        {/* TWO EQUALLY PROMINENT SERVICE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* CARD 1: YÜKDAŞIMA */}
          <div
            id="hero-card-yukdasima"
            onClick={() => handleSelect('yukdasima')}
            className={`bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group flex flex-col h-full cursor-pointer ${
              activeService === 'yukdasima' ? 'border-blue-600 ring-2 ring-blue-500/20' : ''
            }`}
          >
            <div className="w-16 h-16 bg-blue-50 text-3xl flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform">
              🚚
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-3 text-left">
              Yükdaşıma
            </h3>
            <p className="text-slate-500 mb-8 flex-1 text-left">
              Əşyalarınızın şəkillərini göndərin. AI yükünüzü analiz etsin və ilkin qiyməti öyrənin.
            </p>

            <button
              type="button"
              id="hero-btn-yukdasima"
              className={`w-full py-4 font-bold rounded-xl transition-colors cursor-pointer ${
                activeService === 'yukdasima'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-white group-hover:bg-blue-600'
              }`}
            >
              Yükümü hesabla
            </button>
          </div>

          {/* CARD 2: EVAKUASİYA */}
          <div
            id="hero-card-evakuasiya"
            onClick={() => handleSelect('evakuasiya')}
            className={`bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group flex flex-col h-full cursor-pointer ${
              activeService === 'evakuasiya' ? 'border-blue-600 ring-2 ring-blue-500/20' : ''
            }`}
          >
            <div className="w-16 h-16 bg-blue-50 text-3xl flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform">
              🚗
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-3 text-left">
              Evakuasiya
            </h3>
            <p className="text-slate-500 mb-8 flex-1 text-left">
              Avtomobilin götürüləcəyi və aparılacağı ünvanı qeyd edin, ilkin evakuasiya qiymətini öyrənin.
            </p>

            <button
              type="button"
              id="hero-btn-evakuasiya"
              className={`w-full py-4 font-bold rounded-xl transition-colors cursor-pointer ${
                activeService === 'evakuasiya'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-white group-hover:bg-blue-600'
              }`}
            >
              Evakuasiya qiymətini hesabla
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
