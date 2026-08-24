import React, { useState } from 'react';
import { DEFAULT_VEHICLE_CONFIG, VehicleSpec } from '../config/vehicles';
import { DirectYukdasimaOrder } from '../components/DirectYukdasimaOrder';
import { Link } from '../router/RouterContext';
import { Truck, ShieldCheck, CheckCircle2, ArrowRight, Gauge, Box, Maximize2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';

interface YukMasiniPageProps {
  onOpenCallback: (phone?: string) => void;
}

export const YukMasiniPage: React.FC<YukMasiniPageProps> = ({ onOpenCallback }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleSpec>(DEFAULT_VEHICLE_CONFIG.vehicles[0]);

  return (
    <article className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header / Intro with Primary H1 */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <Truck className="w-4 h-4" />
            <span>Geniş Avtopark</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Yük Maşını Sifarişi və İcarəsi
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Bakı şəhəri və rayonlararası hər növ yük həcminə uyğun 2 metrlik Ford Transit-dən 7 metrlik böyük tutumlu furqonlaradək təmiz və baxımlı nəqliyyat vasitələri.
          </p>
        </header>

        {/* Vehicle Fleet Grid */}
        <section aria-label="Yük Maşınları Avtoparkı">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Yük Maşını Modelləri və Ölçüləri</h2>
            <p className="text-sm text-slate-600 mt-1">Yükünüzün həcminə uyğun maşın seçərək dərhal sifariş verə bilərsiniz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEFAULT_VEHICLE_CONFIG.vehicles.map((v) => {
              const isSelected = selectedVehicle.id === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicle(v)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer bg-white flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        {v.badge}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">{v.category.toUpperCase()} kateqoriyası</span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{v.name}</h3>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{v.description}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Uzunluq</div>
                        <div className="text-xs font-bold text-slate-800">{v.lengthM} m</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">En / Hünd.</div>
                        <div className="text-xs font-bold text-slate-800">{v.widthM}x{v.heightM}m</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Həcm</div>
                        <div className="text-xs font-bold text-blue-600">~{v.practicalCapacityM3} m³</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Daşıma qabiliyyəti: {v.maxCarryingWeightKg} kq</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVehicle(v);
                        const el = document.getElementById('direct-order-form');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Sifariş et</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Embedded Direct Order Flow */}
        <section id="direct-order-form" aria-label="Birbaşa Yük Maşını Sifarişi">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Birbaşa Yük Maşını Sifarişi</h2>
            <p className="text-sm text-slate-600 mt-1">Ünvanları daxil edin və seçilmiş {selectedVehicle.name} üçün ilkin hesablamanı görün</p>
          </div>
          <DirectYukdasimaOrder
            defaultVehicle={selectedVehicle}
            onOpenCallback={onOpenCallback}
          />
        </section>

        {/* Internal Linking */}
        <section className="space-y-6" aria-label="Əlaqəli Xidmətlər">
          <h2 className="text-2xl font-bold text-slate-900">Əlaqəli Xidmətlər</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/fehle-xidmeti"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Fəhlə Xidməti</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Maşınla bərabər işçi qüvvəsi sifarişi.</p>
            </Link>

            <Link
              href="/qiymetler"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Tariflər Cədvəli</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Bütün avtomobil növləri üzrə qiymətlər.</p>
            </Link>

            <Link
              href="/evden-eve-yukdasima"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Mənzil Köçürülməsi</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-1">Kompleks evdən evə daşıma.</p>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
};
