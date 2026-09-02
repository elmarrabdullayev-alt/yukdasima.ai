import React from 'react';
import { YukdasimaEstimator } from '../components/YukdasimaEstimator';
import { Link } from '../router/RouterContext';
import { Briefcase, ShieldCheck, CheckCircle2, ArrowRight, Server, FileText, Clock, Users, Phone, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { getContextualWhatsAppUrl } from '../utils/whatsappHelper';
import { trackConversionEvent } from '../utils/analytics';
import { CallbackInitialData } from '../types';

interface OfisDasinmasiPageProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const OfisDasinmasiPage: React.FC<OfisDasinmasiPageProps> = ({ onOpenCallback }) => {
  const whatsappUrl = getContextualWhatsAppUrl('/ofis-dasinmasi');

  const handleCallClick = () => {
    trackConversionEvent('mobile_call_click', {
      page_path: '/ofis-dasinmasi',
      service_type: 'ofis-dasinmasi',
      cta_location: 'hero',
    });
  };

  const handleWhatsAppClick = () => {
    trackConversionEvent('mobile_whatsapp_click', {
      page_path: '/ofis-dasinmasi',
      service_type: 'ofis-dasinmasi',
      cta_location: 'hero',
    });
  };

  return (
    <article className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header / Intro with Primary H1 */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <Briefcase className="w-4 h-4" />
            <span>Korporativ Logistika</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Bakıda Peşəkar Ofis Daşınması və Köçürülməsi
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Şirkət, ofis, arxiv və bank filiallarının iş fasiləsizliyi qorunmaqla operativ köçürülməsi. Kompüter, server və sənədlərin tam təhlükəsiz qablaşdırılması və daşınması.
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

        {/* Corporate Benefits */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Ofis Köçürmə Üstünlükləri">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Qeyri-İş Saatlarında Daşıma</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              İş prosesinizin dayanmaması üçün axşam və ya həftəsonu qrafikləri ilə ofis köçürməsi təşkil olunur.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Texnika və Serverlərin Qorunması</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Monitorlar, prosessorlar və server avadanlıqları antistatik və zərbəyədavamlı xüsusi materiallarla qablaşdırılır.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Sənəd və Arxivlərin Nizamlanması</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Qovluqlar və hüquqi sənədlər nömrələnmiş qutulara yığılır və yeni ofisdə dəqiq şöbələr üzrə təhvil verilir.
            </p>
          </div>
        </section>

        {/* Embedded Interactive Estimator */}
        <section id="ofis-calculator-section" aria-label="Ofis Daşınması Kalkulyatoru">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Ofis Köçürülməsi Üçün Qiymət Hesabla</h2>
            <p className="text-sm text-slate-600 mt-1">İşçi sayı və ya otaq şəkillərini yükləyərək ilkin büdcəni müəyyən edin</p>
          </div>
          <YukdasimaEstimator onOpenCallback={onOpenCallback} />
        </section>

        {/* Detailed Office Moving FAQ */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6" aria-label="Ofis Daşınması Qaydaları">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ofis Daşınması Prosesi Necə Təşkil Olunur?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>İlkin Baxış və Planlaşdırma</span>
              </div>
              <p>
                Menecerimiz ofisinizə baxış keçirərək və ya video-zənglə inventarlaşdırma apararaq optimal maşın və işçi sayını müəyyən edir, dəqiq smeta tərtib olunur.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Müqavilə və Rəsmi Zəmanət</span>
              </div>
              <p>
                Hüquqi şəxslərlə rəsmi müqavilə bağlanır, köçürmə zamanı bütün əmlaka görə maddi məsuliyyət daşıyırıq və köçürmə sonrası rəsmi elektron qaimə-faktura təqdim edilir.
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};
