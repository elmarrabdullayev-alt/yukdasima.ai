import React from 'react';
import { YukdasimaEstimator } from '../components/YukdasimaEstimator';
import { Link } from '../router/RouterContext';
import { Home, ShieldCheck, CheckCircle2, ArrowRight, Package, Truck, Users, Clock, Phone, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { getContextualWhatsAppUrl } from '../utils/whatsappHelper';
import { trackConversionEvent } from '../utils/analytics';
import { CallbackInitialData } from '../types';

interface EvdenEveYukdasimaPageProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const EvdenEveYukdasimaPage: React.FC<EvdenEveYukdasimaPageProps> = ({ onOpenCallback }) => {
  const whatsappUrl = getContextualWhatsAppUrl('/evden-eve-yukdasima');

  const handleCallClick = () => {
    trackConversionEvent('mobile_call_click', {
      page_path: '/evden-eve-yukdasima',
      service_type: 'evden-eve',
      cta_location: 'hero',
    });
  };

  const handleWhatsAppClick = () => {
    trackConversionEvent('mobile_whatsapp_click', {
      page_path: '/evden-eve-yukdasima',
      service_type: 'evden-eve',
      cta_location: 'hero',
    });
  };

  return (
    <article className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header / Intro with Primary H1 */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <Home className="w-4 h-4" />
            <span>Mənzil və Ev Köçürülməsi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Bakıda Evdən Evə Yükdaşıma və Mənzil Köçürülməsi
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Mənzil, həyət evi və bağ evlərinin əziyyətsiz və zəmanətli köçürülməsi. Mebellərin sökülməsi, xüsusi qoruyucu materiallarla qablaşdırılması və yeni ünvanda quraşdırılması.
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

        {/* Step-by-Step Moving Flow */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4" aria-label="Ev Köçürmə Mərhələləri">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">Həcmin Hesablanması</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Otaqların və ya əşyaların şəkillərini yükləyərək AI ilə dəqiq maşın ölçüsünü təyin edin.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">Sökülmə və Qablaşdırma</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Təcrübəli mebel ustalarımız iri mebelləri səliqəli sökür və stretch/bubble filmlə bükür.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">Yükləmə və Daşınma</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fəhlə briqadası əşyaları maşına səliqə ilə yığır və xüsusi kəmərlərlə bağlayır.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base">Yeni Ünvanda Təhvil</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Əşyalar yeni mənzildə mərtəbəyə qaldırılır, mebellər yığılır və yerbəyer edilir.
            </p>
          </div>
        </section>

        {/* Embedded Interactive Estimator */}
        <section id="evden-eve-calculator-section" aria-label="Mənzil Daşıma Kalkulyatoru">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Mənzil Köçürülməsi Üçün Qiymət Hesabla</h2>
            <p className="text-sm text-slate-600 mt-1">Şəkilləri yükləyin və ya birbaşa maşın seçərək sifariş verin</p>
          </div>
          <YukdasimaEstimator onOpenCallback={onOpenCallback} />
        </section>

        {/* Semantic Content & FAQ on Home Moving */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6" aria-label="Mənzil Köçürmə Xidməti Haqqında">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Evdən Evə Daşınma Zamanı Nələrə Diqqət Yetiririk?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 leading-relaxed">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Qablaşdırma və Qorunma</span>
              </div>
              <p>
                Xüsusi qoruyucu filmlər, künclük materiallar və qalın qutular vasitəsilə kövrək əşyalarınız və cilalı mebel səthləri cızılmalardan 100% qorunur.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Təcrübəli Mebel Ustası</span>
              </div>
              <p>
                Bütün növ mürəkkəb dolablar, mətbəx mebelləri və yataq dəstləri peşəkar şəkildə sökülür, yeni mənzildə səliqə ilə yenidən qurulur.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Uyğun Tutumlu Yük Maşını</span>
              </div>
              <p>
                Mənzilin otaq sayına və əşyaların həcminə görə <Link href="/yuk-masini" className="text-blue-600 hover:underline font-semibold">uyğun yük maşını seçimi</Link> edilərək köçürülmə bir gedişlə, vaxt itkisi olmadan həyata keçirilir.
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};
