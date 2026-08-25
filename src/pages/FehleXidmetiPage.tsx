import React from 'react';
import { YukdasimaEstimator } from '../components/YukdasimaEstimator';
import { Link } from '../router/RouterContext';
import { Users, ShieldCheck, CheckCircle2, ArrowRight, Clock, Award, Building2, Package } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { CallbackInitialData } from '../types';

interface FehleXidmetiPageProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const FehleXidmetiPage: React.FC<FehleXidmetiPageProps> = ({ onOpenCallback }) => {
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
            <h3 className="font-bold text-slate-900 text-lg">Yükləmə və Boşaltma</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              TIR, furqon və vaqonların boşaldılması, anbar daxili malların çeşidlənməsi və səliqəli şəkildə yığılması.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Ağır Yüklər: Seyf və Avadanlıq</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Xüsusi qaldırıcı kəmərlər və alətlərlə bank seyflərinin, tibbi və sənaye cihazlarının peşəkar daşınması.
            </p>
          </div>
        </section>

        {/* Embedded Interactive Estimator with Workers Option */}
        <section id="fehle-calculator-section" aria-label="Fəhləli Yükdaşıma Kalkulyatoru">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Fəhləli Yükdaşıma Qiymətini Hesabla</h2>
            <p className="text-sm text-slate-600 mt-1">Yükün həcminə və mərtəbə şərtlərinə uyğun fəhlə xərcləri dərhal hesablanır</p>
          </div>
          <YukdasimaEstimator onOpenCallback={onOpenCallback} />
        </section>

        {/* Internal Linking */}
        <section className="space-y-6" aria-label="Əlaqəli Xidmətlər">
          <h2 className="text-2xl font-bold text-slate-900">Əlaqəli Xidmətlər</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/yuk-masini"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Yük Maşını Sifarişi</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Fərqli tutumlu yük nəqliyyatları.</p>
            </Link>

            <Link
              href="/mebel-dasinmasi"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Mebel Daşınması</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Usta heyəti və montaj.</p>
            </Link>

            <Link
              href="/qiymetler"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Qiymətlər & Tariflər</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Fəhlə və daşıma tarifləri.</p>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
};
