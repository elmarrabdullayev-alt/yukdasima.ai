import React, { useState } from 'react';
import { ArrowRight, Camera, Sparkles, DollarSign, MessageCircle, MapPin, Car, Check } from 'lucide-react';
import { ServiceType } from '../types';
import { t } from '../i18n';

interface HowItWorksProps {
  onSelectService: (service: ServiceType) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onSelectService }) => {
  const [tab, setTab] = useState<ServiceType>('yukdasima');

  const yukdasimaSteps = [
    {
      num: '1',
      icon: '📸',
      title: 'Şəkilləri göndərin',
      desc: 'Mənzildəki mebel və ya qutuların bir neçə fotosunu yükləyin.',
    },
    {
      num: '2',
      icon: '🤖',
      title: 'AI analiz etsin',
      desc: 'Süni intellekt əşyaların həcmini və uyğun maşını saniyələr içində hesablasın.',
    },
    {
      num: '3',
      icon: '💰',
      title: 'İlkin qiyməti alın',
      desc: 'Fəhlə sayı və tələb olunan yük maşınına uyğun ilkin məbləği görün.',
    },
    {
      num: '4',
      icon: '💬',
      title: 'Dəqiq qiymət üçün əlaqə saxlayın',
      desc: 'WhatsApp vasitəsilə mütəxəssislə təsdiqləşin və sifarişi qətiləşdirin.',
    },
  ];

  const evakuasiyaSteps = [
    {
      num: '1',
      icon: '📍',
      title: 'Ünvanları qeyd edin',
      desc: 'Avtomobilin haradan götürülüb haraya çatdırılacağını qeyd edin.',
    },
    {
      num: '2',
      icon: '🚗',
      title: 'Avtomobil məlumatını seçin',
      desc: 'Sedan, SUV və ya digər növü və hərəkət vəziyyətini göstərin.',
    },
    {
      num: '3',
      icon: '💰',
      title: 'İlkin qiyməti görün',
      desc: 'Məsafə və avtomobil tipinə əsasən hesablanmış ilkin qiyməti əldə edin.',
    },
    {
      num: '4',
      icon: '💬',
      title: 'Evakuator sifariş edin',
      desc: 'Tək kliklə operatora yazın və ən yaxın evakuator ünvanınıza yönləndirilsin.',
    },
  ];

  const currentSteps = tab === 'yukdasima' ? yukdasimaSteps : evakuasiyaSteps;

  const handleCtaClick = () => {
    onSelectService(tab);
    const element = document.getElementById('estimator-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how-it-works-section" className="py-14 sm:py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>{t("Sadə 4 addım")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{t("Necə işləyir?")}</h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">{t("Həm yükdaşıma, həm də evakuasiya üçün şəffaf və anlaşılan sifariş prosesi.")}</p>
        </div>

        {/* TOGGLE TABS */}
        <div className="flex justify-center mt-8 mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              id="how-tab-yukdasima"
              type="button"
              onClick={() => setTab('yukdasima')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                tab === 'yukdasima'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🚚</span>
              <span>{t("Yükdaşıma")}</span>
            </button>

            <button
              id="how-tab-evakuasiya"
              type="button"
              onClick={() => setTab('evakuasiya')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                tab === 'evakuasiya'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🚗</span>
              <span>{t("Evakuasiya")}</span>
            </button>
          </div>
        </div>

        {/* 4 STEPS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {currentSteps.map((step, idx) => (
            <div
              key={step.num}
              className="relative rounded-2xl p-6 bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-2xl flex items-center justify-center shadow-xs">
                    {t(step.icon)}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-xs font-black flex items-center justify-center">
                    {t(step.num)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {t(step.title)}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {t(step.desc)}
                </p>
              </div>

              {t(idx < currentSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 text-xs font-bold">
                    →
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-10 text-center">
          <button
            id="how-it-works-cta"
            type="button"
            onClick={handleCtaClick}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <span>{t(tab === 'yukdasima' ? 'Yükümü indi hesabla' : 'Evakuasiyanı indi hesabla')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
