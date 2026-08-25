import React from 'react';
import { YukdasimaEstimator } from '../components/YukdasimaEstimator';
import { Link } from '../router/RouterContext';
import { Home, ShieldCheck, CheckCircle2, ArrowRight, Package, Truck, Users, Clock, Phone, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { CallbackInitialData } from '../types';

interface EvdenEveYukdasimaPageProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const EvdenEveYukdasimaPage: React.FC<EvdenEveYukdasimaPageProps> = ({ onOpenCallback }) => {
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
              href={CONTACT_INFO.HOTLINE_TEL}
              aria-label="878 qaynar xəttinə zəng et"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Qaynar Xətt: {CONTACT_INFO.HOTLINE_NUMBER}</span>
            </a>
            <a
              href={CONTACT_INFO.WHATSAPP_URL_BASE}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp vasitəsilə yaz"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Məişət Texnikasının Təhlükəsizliyi</span>
              </h3>
              <p>
                Soyuducu, paltaryuyan, televizor və digər həssas elektronika xüsusi amortizasiyalı qablaşdırma materialları ilə örtülür və şaquli vəziyyətdə daşınır.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Qab-Qacaq və Kövrək Əşyalar</span>
              </h3>
              <p>
                Şüşə, çini və dekorativ əşyalar üçün xüsusi möhkəm qutulardan və qoruyucu kağız/köpük qatlardan istifadə olunur.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Linking */}
        <section className="space-y-6" aria-label="Əlaqəli Keçidlər">
          <h2 className="text-2xl font-bold text-slate-900">Digər Faydalı Xidmətlər</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/mebel-dasinmasi"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Mebel Daşınması</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Usta heyəti və montaj xidmətləri.</p>
            </Link>

            <Link
              href="/fehle-xidmeti"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Fəhlə Xidməti</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Mərtəbəyə qaldırma və fəhlə briqadası.</p>
            </Link>

            <Link
              href="/qiymetler"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Daşıma Qiymətləri</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Bütün marşrutlar üzrə şəffaf qiymətlər.</p>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
};
