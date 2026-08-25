import React, { useState } from 'react';
import { EstimatorSection } from '../components/EstimatorSection';
import { Link } from '../router/RouterContext';
import { DollarSign, Truck, Car, ShieldCheck, CheckCircle2, ArrowRight, HelpCircle, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { ServiceType, CallbackInitialData } from '../types';

interface QiymetlerPageProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const QiymetlerPage: React.FC<QiymetlerPageProps> = ({ onOpenCallback }) => {
  const [activeTab, setActiveTab] = useState<ServiceType>('yukdasima');

  return (
    <article className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header / Intro with Primary H1 */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <DollarSign className="w-4 h-4" />
            <span>Şəffaf Tariflər</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Yükdaşıma və Evakuasiya Qiymətləri
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Bakı şəhəri, Abşeron və bütün Azərbaycan regionları üzrə rəsmi və şəffaf qiymət tarifləri. Gizli əlavə xərclər olmadan dəqiq hesablama.
          </p>
        </header>

        {/* Pricing Overview Tables */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8" aria-label="Tarif Cədvəlləri">
          {/* Yükdaşıma Table */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Yükdaşıma Xidməti</h2>
                <p className="text-xs text-slate-500">Avtomobil kateqoriyaları və cari tariflər</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Avtomobil Növü</th>
                    <th className="py-3 px-3">Həcm</th>
                    <th className="py-3 px-3 text-right">Tarif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-900">2m Ford Transit</td>
                    <td className="py-3 px-3 text-slate-500">~3.2 m³</td>
                    <td className="py-3 px-3 text-right font-bold text-blue-600">Qiyməti öyrən</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-900">3m Yük Maşını</td>
                    <td className="py-3 px-3 text-slate-500">~6.5 m³</td>
                    <td className="py-3 px-3 text-right font-bold text-blue-600">Qiyməti öyrən</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-900">4m Yük Maşını</td>
                    <td className="py-3 px-3 text-slate-500">~12.8 m³</td>
                    <td className="py-3 px-3 text-right font-bold text-blue-600">Qiyməti öyrən</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-900">5m Yük Maşını</td>
                    <td className="py-3 px-3 text-slate-500">~16.0 m³</td>
                    <td className="py-3 px-3 text-right font-bold text-blue-600">Qiyməti öyrən</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-900">Fəhlə Xidməti</td>
                    <td className="py-3 px-3 text-slate-500">1 nəfər</td>
                    <td className="py-3 px-3 text-right font-bold text-blue-600">Qiyməti öyrən</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-500 italic">
              * Qiymət marşrut, avtomobilin mövcudluğu, yolüstü daşınma imkanı və sifariş detallarına görə dəyişə bilər. Cari ən uyğun qiymət üçün bizimlə əlaqə saxlayın.
            </p>
          </div>

          {/* Evakuasiya Table */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Evakuasiya Xidməti</h2>
                <p className="text-xs text-slate-500">Marşrutlar və standart minik tarifləri</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Marşrut</th>
                    <th className="py-3 px-3">Nəqliyyat</th>
                    <th className="py-3 px-3 text-right">Tarif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-900">Bakı Şəhərdaxili</td>
                    <td className="py-3 px-3 text-slate-500">Standart Minik</td>
                    <td className="py-3 px-3 text-right font-bold text-blue-600">Cari qiyməti yoxla</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-900">Bakı → Xırdalan</td>
                    <td className="py-3 px-3 text-slate-500">Standart Minik</td>
                    <td className="py-3 px-3 text-right font-bold text-blue-600">Cari qiyməti yoxla</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-900">Bakı → Sumqayıt</td>
                    <td className="py-3 px-3 text-slate-500">Standart Minik</td>
                    <td className="py-3 px-3 text-right font-bold text-blue-600">Cari qiyməti yoxla</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-900">Bakı → Quba</td>
                    <td className="py-3 px-3 text-slate-500">Standart Minik</td>
                    <td className="py-3 px-3 text-right font-bold text-blue-600">Cari qiyməti yoxla</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-900">Bakı → Gəncə</td>
                    <td className="py-3 px-3 text-slate-500">Standart Minik</td>
                    <td className="py-3 px-3 text-right font-bold text-blue-600">Cari qiyməti yoxla</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-500 italic">
              * Qiymət marşrut, avtomobilin mövcudluğu, yolüstü daşınma imkanı və sifariş detallarına görə dəyişə bilər. Cari ən uyğun qiymət üçün bizimlə əlaqə saxlayın.
            </p>
          </div>
        </section>

        {/* Embedded Interactive Estimators for Exact Calculations */}
        <section id="pricing-estimator-section" aria-label="İnteraktiv Qiymət Kalkulyatoru">
          <div className="mb-6 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Dəqiq Qiyməti Dərhal Hesablayın</h2>
            <p className="text-sm text-slate-600 mt-2">Aşağıdakı kalkulyatordan istifadə edərək daşıma və ya evakuasiya qiymətinizi anında öyrənin</p>
          </div>
          <EstimatorSection
            activeService={activeTab}
            onSelectService={setActiveTab}
            onOpenCallback={onOpenCallback}
          />
        </section>

        {/* Internal Linking */}
        <section className="space-y-6" aria-label="Əlaqəli Xidmətlər">
          <h2 className="text-2xl font-bold text-slate-900">Əlaqəli Səhifələr</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/yukdasima"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Yükdaşıma Xidməti</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">AI həcm təyini və daşıma.</p>
            </Link>

            <Link
              href="/evakuasiya"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>24/7 Evakuator</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Rayonlar və şəhər üzrə evakuasiya.</p>
            </Link>

            <Link
              href="/elaqe"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Bizimlə Əlaqə</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">878 Qaynar xətt və zəng sifarişi.</p>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
};
