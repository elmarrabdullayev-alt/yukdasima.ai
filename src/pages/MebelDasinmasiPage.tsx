import React from 'react';
import { YukdasimaEstimator } from '../components/YukdasimaEstimator';
import { Link } from '../router/RouterContext';
import { Layers, Wrench, ShieldCheck, CheckCircle2, ArrowRight, Package, Truck, Sparkles } from 'lucide-react';
import { CallbackInitialData } from '../types';

interface MebelDasinmasiPageProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const MebelDasinmasiPage: React.FC<MebelDasinmasiPageProps> = ({ onOpenCallback }) => {
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
            <h3 className="font-bold text-slate-900 text-lg">Xüsusi Qablaşdırma Materialları</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Cızılma və sürtünmənin qarşısını almaq üçün mebel fasadları, şüşə hissələr və künclər qabarcıqlı klyonka və kardonla qorunur.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Xüsusi Əşyalar: Piano və Seyf</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Pianino, royal və ağır seyflər xüsusi qaldırıcı kəmərlər və təcrübəli mütəxəssislər tərəfindən həssaslıqla daşınır.
            </p>
          </div>
        </section>

        {/* Embedded Interactive Estimator */}
        <section id="mebel-calculator-section" aria-label="Mebel Daşınması Kalkulyatoru">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Mebellərin Daşınması Üçün Qiymət Hesabla</h2>
            <p className="text-sm text-slate-600 mt-1">Mebel şəkillərini yükləyərək tələb olunan maşın və işçi sayını dərhal öyrənin</p>
          </div>
          <YukdasimaEstimator onOpenCallback={onOpenCallback} />
        </section>

        {/* Internal Linking */}
        <section className="space-y-6" aria-label="Əlaqəli Xidmətlər">
          <h2 className="text-2xl font-bold text-slate-900">Əlaqəli Daşıma Xidmətləri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/evden-eve-yukdasima"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Evdən Evə Yükdaşıma</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Mənzil və evlərin bütöv köçürülməsi.</p>
            </Link>

            <Link
              href="/fehle-xidmeti"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Fəhlə Xidməti</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Ağır əşyaların qaldırılması və fəhlələr.</p>
            </Link>

            <Link
              href="/yuk-masini"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Yük Maşını Sifarişi</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Geniş həcmli və örtülü yük avtomobilləri.</p>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
};
