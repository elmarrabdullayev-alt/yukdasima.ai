import React from 'react';
import { Truck, Car, ArrowDown } from 'lucide-react';
import { ServiceType, CallbackInitialData } from '../types';
import { YukdasimaEstimator } from './YukdasimaEstimator';
import { EvakuasiyaEstimator } from './EvakuasiyaEstimator';
import { t } from '../i18n';

interface EstimatorSectionProps {
  activeService: ServiceType;
  onSelectService: (service: ServiceType) => void;
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const EstimatorSection: React.FC<EstimatorSectionProps> = ({
  activeService,
  onSelectService,
  onOpenCallback,
}) => {
  return (
    <section id="estimator-section" className="py-12 sm:py-16 bg-slate-100/70 scroll-mt-20 border-y border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{t("Hansı xidmət lazımdır?")}</h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">{t("Xidmət növünü seçin və birbaşa sizə uyğun hesablayıcı formanı doldurun.")}</p>
        </div>

        {/* TWO INTERACTIVE TOGGLE BUTTONS */}
        <div className="flex justify-center mb-8">
          <div className="inline-grid grid-cols-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm w-full max-w-md">
            <button
              id="tab-btn-yukdasima"
              type="button"
              onClick={() => onSelectService('yukdasima')}
              className={`py-3.5 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeService === 'yukdasima'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className="text-lg">🚚</span>
              <span>{t("Yükdaşıma qiyməti")}</span>
            </button>

            <button
              id="tab-btn-evakuasiya"
              type="button"
              onClick={() => onSelectService('evakuasiya')}
              className={`py-3.5 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeService === 'evakuasiya'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className="text-lg">🚗</span>
              <span>{t("Evakuasiya qiyməti")}</span>
            </button>
          </div>
        </div>

        {/* ACTIVE FORM RENDER */}
        <div className="transition-all duration-300">
          {t(activeService === 'yukdasima' ? (
            <YukdasimaEstimator onOpenCallback={onOpenCallback} />
          ) : (
            <EvakuasiyaEstimator onOpenCallback={onOpenCallback} />
          ))}
        </div>
      </div>
    </section>
  );
};
