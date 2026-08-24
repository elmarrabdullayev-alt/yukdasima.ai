import React from 'react';
import { YukdasimaEstimator } from '../components/YukdasimaEstimator';
import { Link } from '../router/RouterContext';
import { Briefcase, ShieldCheck, CheckCircle2, ArrowRight, Server, FileText, Clock, Users } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';

interface OfisDasinmasiPageProps {
  onOpenCallback: (phone?: string) => void;
}

export const OfisDasinmasiPage: React.FC<OfisDasinmasiPageProps> = ({ onOpenCallback }) => {
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
            <h3 className="font-bold text-slate-900 text-lg">Server və IT Avadanlıqları</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Server rəfləri, monitorlar və həssas texnika antistatik və zərbəyədavamlı materiallarla bükülərək daşınır.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Arxiv və Sənəd Qutuları</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Sənədlər və qovluqlar şöbələr üzrə nömrələnmiş qutulara yığılır və yeni ünvanda yerbəyer təhvil verilir.
            </p>
          </div>
        </section>

        {/* Embedded Interactive Estimator */}
        <section id="ofis-calculator-section" aria-label="Ofis Daşıma Qiymətləndirilməsi">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Ofis Köçürülməsi Üçün İlkin Qiymət Hesabla</h2>
            <p className="text-sm text-slate-600 mt-1">Avadanlıq və otaq şəkillərini yükləyərək tələb olunan nəqliyyat həcmini dərhal öyrənin</p>
          </div>
          <YukdasimaEstimator onOpenCallback={onOpenCallback} />
        </section>

        {/* Internal Linking */}
        <section className="space-y-6" aria-label="Əlaqəli Keçidlər">
          <h2 className="text-2xl font-bold text-slate-900">Əlaqəli Xidmətlər</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/mebel-dasinmasi"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Mebel Daşınması & Usta</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Ofis masaları və dolabların sökülməsi.</p>
            </Link>

            <Link
              href="/yuk-masini"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Böyük Tutumlu Yük Maşınları</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">4m, 5m və 7m yük avtomobilləri.</p>
            </Link>

            <Link
              href="/fehle-xidmeti"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Fəhlə Briqadası</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Geniş tərkibli peşəkar işçi qüvvəsi.</p>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
};
