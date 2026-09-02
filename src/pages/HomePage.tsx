import React from 'react';
import { ServiceType, CallbackInitialData } from '../types';
import { HeroSection } from '../components/HeroSection';
import { EstimatorSection } from '../components/EstimatorSection';
import { HowItWorks } from '../components/HowItWorks';
import { AiQuestionBox } from '../components/AiQuestionBox';
import { ServicesSection } from '../components/ServicesSection';
import { TrustSection } from '../components/TrustSection';
import { FaqSection } from '../components/FaqSection';
import { BakuDistrictsGeoSection } from '../components/BakuDistrictsGeoSection';
import { Link } from '../router/RouterContext';
import { ArrowRight, ShieldCheck, Truck, Car, Home, Layers, Briefcase, Users, DollarSign } from 'lucide-react';

interface HomePageProps {
  activeService: ServiceType;
  onSelectService: (service: ServiceType) => void;
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  activeService,
  onSelectService,
  onOpenCallback,
}) => {
  return (
    <div className="space-y-0">
      {/* Visual H1 in Hero section & structured content */}
      <HeroSection
        activeService={activeService}
        onSelectService={onSelectService}
      />

      {/* Quick Price Section & Service-Specific Estimator Flow */}
      <EstimatorSection
        activeService={activeService}
        onSelectService={onSelectService}
        onOpenCallback={onOpenCallback}
      />

      {/* Internal SEO Hub: Key Services Crawlable Links */}
      <section className="py-12 bg-white border-y border-slate-200" aria-label="Əsas Xidmət İstiqamətləri">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Peşəkar Daşıma və Evakuasiya Xidmətləri
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Bakı şəhəri və bütün Azərbaycan regionları üzrə fərdi və korporativ daşıma həlləri
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/yukdasima"
              className="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all bg-slate-50/60 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  Yükdaşıma Xidməti
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Şəhərdaxili və rayonlararası təhlükəsiz yükdaşıma, avtopark və AI həcm təyini.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 gap-1">
                <span>Ətraflı məlumat</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/evakuator"
              className="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all bg-slate-50/60 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Car className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  24/7 Evakuator
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  24/7 operativ və etibarlı evakuator xidməti. Bakı və bütün rayonlara təcili çıxış.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 gap-1">
                <span>Tariflərə bax</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/evden-eve-yukdasima"
              className="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all bg-slate-50/60 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  Evdən Evə Daşıma
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Mənzil və bağ evlərinin tam təhlükəsiz, qablaşdırmalı və zəmanətli köçürülməsi.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 gap-1">
                <span>Xidmətlə tanış ol</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/mebel-dasinmasi"
              className="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all bg-slate-50/60 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  Mebel Daşınması
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Peşəkar mebel ustaları, sökülmə, xüsusi materiallarla bükülmə və montaj.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 gap-1">
                <span>Usta xidmətləri</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/ofis-dasinmasi"
              className="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all bg-slate-50/60 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  Ofis Daşınması
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  İş fasiləsizliyi qorunmaqla şirkət, arxiv və server avadanlıqlarının operativ daşınması.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 gap-1">
                <span>Korporativ şərtlər</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/yuk-masini"
              className="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all bg-slate-50/60 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  Yük Maşını Sifarişi
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  2m-dən 7m-dək müxtəlif tutumlu təmiz və baxımlı yük maşınları birbaşa sifarişlə.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 gap-1">
                <span>Maşınlara bax</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/fehle-xidmeti"
              className="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all bg-slate-50/60 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  Fəhlə Xidməti
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Yükləmə, boşaltma, mərtəbəyə qaldırma və ağır əşyaların daşınması üzrə təcrübəli briqada.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 gap-1">
                <span>Briqada sifarişi</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/qiymetler"
              className="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all bg-slate-50/60 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  Şəffaf Qiymətlər
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Bakı və bütün rayonlar üzrə rəsmi tarif cədvəli və ilkin kalkulyasiya imkanı.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 gap-1">
                <span>Cədvələ bax</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works (Necə işləyir?) */}
      <HowItWorks onSelectService={onSelectService} />

      {/* AI Question Box */}
      <AiQuestionBox onSelectService={onSelectService} />

      {/* Services Section */}
      <ServicesSection onSelectService={onSelectService} />

      {/* Baku Districts GEO / AI Search Optimization (Batch 2) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BakuDistrictsGeoSection
          defaultMode={activeService === 'evakuator' ? 'evakuator' : 'yukdasima'}
          onOpenCallback={onOpenCallback}
        />
      </div>

      {/* Trust Section */}
      <TrustSection />

      {/* FAQ Section */}
      <FaqSection onOpenCallback={onOpenCallback} />
    </div>
  );
};
