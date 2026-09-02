import React from 'react';
import { YukdasimaEstimator } from '../components/YukdasimaEstimator';
import { Link } from '../router/RouterContext';
import { Users, ShieldCheck, CheckCircle2, ArrowRight, Clock, Award, Building2, Package, Phone, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { getContextualWhatsAppUrl } from '../utils/whatsappHelper';
import { trackConversionEvent } from '../utils/analytics';
import { CallbackInitialData } from '../types';

interface FehleXidmetiPageProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const FehleXidmetiPage: React.FC<FehleXidmetiPageProps> = ({ onOpenCallback }) => {
  const whatsappUrl = getContextualWhatsAppUrl('/fehle-xidmeti');

  const handleCallClick = () => {
    trackConversionEvent('mobile_call_click', {
      page_path: '/fehle-xidmeti',
      service_type: 'fehle-xidmeti',
      cta_location: 'hero',
    });
  };

  const handleWhatsAppClick = () => {
    trackConversionEvent('mobile_whatsapp_click', {
      page_path: '/fehle-xidmeti',
      service_type: 'fehle-xidmeti',
      cta_location: 'hero',
    });
  };

  return (
    <article className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header / Intro with Primary H1 */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <Users className="w-4 h-4" />
            <span>Peşəkar İşçi Briqadası</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Bakıda Peşəkar Fəhlə Xidməti
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Mənzillərdə, ofislərdə, anbarlarda və inşaat sahələrində ağır və həcmli yüklərin yüklənməsi, boşaldılması, mərtəbəyə qaldırılması və səliqəli yerləşdirilməsi.
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

        {/* Work Scenarios */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Fəhlə Xidməti Sahələri">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Mərtəbəyə Qaldırma və Pilləkən</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Lift olmayan binalarda və ya liftə sığmayan böyük əşyaların (divan, soyuducu) pilləkənlərlə təhlükəsiz qaldırılması.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">TIR və Vaqon Boşaldılması</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Anbar və ticarət obyektlərində böyük partiya malların, paletlərin qısa müddətdə operativ boşaldılıb nizamlanması.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Xüsusi Ağır Yüklər (Seyf, Pianino)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Xüsusi kəmərlər və takelaj texnikaları vasitəsilə 100-500 kq çəkidə olan seyf, pianino və avadanlıqların daşınması.
            </p>
          </div>
        </section>

        {/* Embedded Interactive Estimator */}
        <section id="fehle-calculator-section" aria-label="Fəhlə Xidməti Kalkulyatoru">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Fəhlə və Daşıma Xidməti Qiymətini Hesabla</h2>
            <p className="text-sm text-slate-600 mt-1">Yükün həcmini və şəkillərini daxil edərək lazımi işçi sayını müəyyən edin</p>
          </div>
          <YukdasimaEstimator onOpenCallback={onOpenCallback} />
        </section>

        {/* Informational Guidelines */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6" aria-label="Fəhlə Xidməti Haqqında">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Niyə Bizim Fəhlə Briqadamızı Seçməlisiniz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Ayıq, Punktual və Məsuliyyətli Heyət</span>
              </div>
              <p>
                İşçilərimiz təyin olunmuş ünvana vaxtında çatır, əşyalara və qapı/divar çərçivələrinə zərər vurmadan maksimum ehtiyatla hərəkət edirlər.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Saatlıq və ya Paket Ödəniş</span>
              </div>
              <p>
                İşin həcmindən asılı olaraq şəffaf qiymətləndirmə: kiçik işlər üçün saatlıq fəhlə tarifi və ya bütöv ev köçürməsi üçün sabit paket təklifi.
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};
