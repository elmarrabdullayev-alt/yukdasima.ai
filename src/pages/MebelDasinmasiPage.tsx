import React from 'react';
import { YukdasimaEstimator } from '../components/YukdasimaEstimator';
import { Link } from '../router/RouterContext';
import { Layers, Wrench, ShieldCheck, CheckCircle2, ArrowRight, Package, Truck, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { getContextualWhatsAppUrl } from '../utils/whatsappHelper';
import { trackConversionEvent } from '../utils/analytics';
import { CallbackInitialData } from '../types';

interface MebelDasinmasiPageProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const MebelDasinmasiPage: React.FC<MebelDasinmasiPageProps> = ({ onOpenCallback }) => {
  const whatsappUrl = getContextualWhatsAppUrl('/mebel-dasinmasi');

  const handleCallClick = () => {
    trackConversionEvent('mobile_call_click', {
      page_path: '/mebel-dasinmasi',
      service_type: 'mebel-dasinmasi',
      cta_location: 'hero',
    });
  };

  const handleWhatsAppClick = () => {
    trackConversionEvent('mobile_whatsapp_click', {
      page_path: '/mebel-dasinmasi',
      service_type: 'mebel-dasinmasi',
      cta_location: 'hero',
    });
  };

  return (
    <article className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header / Intro with Primary H1 */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <Layers className="w-4 h-4" />
            <span>Mebel Daşınması & Usta Xidməti</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Mebel Daşınması və Peşəkar Usta Xidməti
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Hər növ yataq dəsti, qonaq otağı mebeli, mətbəx mebeli, dolab və qarderobların peşəkar ustalar tərəfindən sökülməsi, qablaşdırılması, daşınması və yenidən quraşdırılması.
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

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Mebel Xidməti Növləri">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Mebel Sökülməsi və Yığılması</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Mürəkkəb mebel konstruksiyaları (kupe dolablar, modul mebellər) xüsusi alətlərlə zədələnmədən sökülür və yeni məkanda dəqiqliklə yığılır.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Xüsusi Qoruyucu Qablaşdırma</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Mebellərin hər bir hissəsi qalın qabarcıqlı klyonka və streç filmlərlə sarınır, künclər zədələrdən müdafiə olunur.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Xırda Təmir və Düzəliş</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Montaj zamanı petlələrin nizamlanması, qulpların bərkidilməsi və səliqəli yerləşdirilməsi təmin edilir.
            </p>
          </div>
        </section>

        {/* Embedded Interactive Estimator */}
        <section id="mebel-calculator-section" aria-label="Mebel Daşınması Kalkulyatoru">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Mebel Daşınması Qiymətini Hesabla</h2>
            <p className="text-sm text-slate-600 mt-1">Mebel şəkillərini yükləyərək tələb olunan maşın və işçi sayını öyrənin</p>
          </div>
          <YukdasimaEstimator onOpenCallback={onOpenCallback} />
        </section>

        {/* Detailed Moving Guide */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6" aria-label="Mebel Daşınması Haqqında Məlumat">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Niyə Mebel Daşınmasını Peşəkar Ustaya Həvalə Etməlisiniz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 leading-relaxed">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>MDF və Laminatların Qorunması</span>
              </div>
              <p>
                Qeyri-peşəkar sökülmə zamanı şrupların yeri genişlənir və təkrar yığılanda mebel boşalır. Ustalarımız xüsusi alətlərlə hər bir detala zərər yetirmədən işləyir.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Vaxt və Əmək Qənaəti</span>
              </div>
              <p>
                Böyük qarderob və ya mətbəx mebelinin sökülüb-yığılması günlərlə vaxt apara bilər. Təcrübəli briqadamız bütün prosesi bir neçə saat ərzində tamamlayır.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Qapalı Banla Daşınma</span>
              </div>
              <p>
                Sökülmüş və qablaşdırılmış mebel hissələrinin tozdan və yağışdan qorunması üçün xüsusi kəmərlərlə təchiz edilmiş qapalı <Link href="/yuk-masini" className="text-blue-600 hover:underline font-semibold">yük maşını sifarişi</Link> təmin olunur.
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};
