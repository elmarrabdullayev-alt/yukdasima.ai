import React, { useState } from 'react';
import {
  ApprovedRouteConfig,
  getApprovedEvakuatorRoute,
  getAllApprovedEvakuatorRoutes,
} from '../seo/routeRegistry';
import { lookupEvacuatorTariff, lookupRouteTariff } from '../services/tariffService';
import { EvakuasiyaEstimator } from '../components/EvakuasiyaEstimator';
import { Link } from '../router/RouterContext';
import {
  Car,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  ChevronDown,
  Navigation,
  Wrench,
  AlertCircle,
  Truck,
  Sparkles,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { generateWhatsAppLink } from '../utils/calculator';
import { generateRouteSeoConfig } from '../seo/routeRegistry';

interface EvakuatorRoutePageProps {
  routeConfig?: ApprovedRouteConfig;
  routeSlug?: string;
  onOpenCallback: (phone?: string) => void;
}

export const EvakuatorRoutePage: React.FC<EvakuatorRoutePageProps> = ({
  routeConfig: propRouteConfig,
  routeSlug,
  onOpenCallback,
}) => {
  // Resolve config either from direct prop or by slug
  const routeConfig = propRouteConfig || (routeSlug ? getApprovedEvakuatorRoute(routeSlug) : null);

  // State for FAQ accordion
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0, 1]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // 404 / Invalid route state
  if (!routeConfig) {
    return (
      <article className="py-16 sm:py-24 bg-slate-50 min-h-screen text-slate-900">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Axtardığınız evakuator marşrutu tapılmadı
          </h1>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Daxil etdiyiniz marşrut üzrə avtomatik səhifə mövcud deyil və ya ünvan düzgün qeyd olunmayıb. Bütün rəsmi Azərbaycan rayonları üzrə qiyməti əsas evakuasiya səhifəmizdə onlayn hesablaya bilərsiniz.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/evakuasiya"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-colors"
            >
              <Car className="w-4 h-4" />
              <span>Bütün Evakuator Qiymətləri</span>
            </Link>
            <a
              href={CONTACT_INFO.HOTLINE_TEL}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Qaynar Xətt: 878</span>
            </a>
          </div>
        </div>
      </article>
    );
  }

  // Retrieve truthful, live data from centralized tariff database
  const evacTariff = lookupEvacuatorTariff(routeConfig.origin, routeConfig.destination);
  const routeTariff = lookupRouteTariff(routeConfig.origin, routeConfig.destination);
  const seoConfig = generateRouteSeoConfig(routeConfig);

  const priceFormatted = evacTariff.price ? `${evacTariff.price} AZN` : '210 AZN';
  const distanceKm = evacTariff.distanceKm || routeTariff?.distanceKm || 281;

  const handleWhatsApp = () => {
    const text = `Salam, ${routeConfig.origin}dan ${routeConfig.destinationDative} evakuator sifarişi vermək istəyirəm.`;
    window.open(generateWhatsAppLink(text), '_blank');
  };

  return (
    <article className="py-6 sm:py-10 bg-slate-50 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-slate-500">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Ana səhifə
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">/</li>
            <li>
              <Link href="/evakuasiya" className="hover:text-blue-600 transition-colors">
                Evakuasiya
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">/</li>
            <li className="font-semibold text-slate-800" aria-current="page">
              {routeConfig.origin}–{routeConfig.destination} Evakuator
            </li>
          </ol>
        </nav>

        {/* Primary Page Header with the single H1 */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <Car className="w-4 h-4" />
            <span>24/7 Rayonlararası Təcili Evakuator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {seoConfig.h1}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {routeConfig.descriptionText} Rəsmi sabit tarif: <strong>{priceFormatted}</strong> ({distanceKm} km). 15–30 dəqiqə ərzində operativ çıxış və 100% sığortalı təhlükəsiz daşınma.
          </p>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={CONTACT_INFO.HOTLINE_TEL}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-xs transition-colors"
              title="Qaynar xəttə zəng et"
            >
              <Phone className="w-4 h-4" />
              <span>Qaynar Xətt: {CONTACT_INFO.HOTLINE_NUMBER}</span>
            </a>

            <button
              onClick={handleWhatsApp}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs transition-colors cursor-pointer"
              title="WhatsApp vasitəsilə sifariş et"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp ilə Sifariş</span>
            </button>

            <button
              onClick={() => onOpenCallback()}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold shadow-xs transition-colors cursor-pointer"
              title="Geri zəng sifariş et"
            >
              <Clock className="w-4 h-4" />
              <span>Zəng Sifarişi</span>
            </button>
          </div>
        </header>

        {/* Section 1: Route Metrics & Key Parameters Bar */}
        <section aria-labelledby="route-metrics-heading" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 id="route-metrics-heading" className="sr-only">
            {routeConfig.origin}–{routeConfig.destination} marşrut göstəriciləri
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="pt-3 md:pt-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                Rəsmi Tarif
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                {priceFormatted}
              </div>
              <span className="text-xs text-slate-500 mt-1 block">Minik / Sedan / Hetçbek</span>
            </div>

            <div className="pt-3 md:pt-0 md:pl-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                Dəqiq Məsafə
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {distanceKm} km
              </div>
              <span className="text-xs text-slate-500 mt-1 block">{routeConfig.origin} – {routeConfig.destination}</span>
            </div>

            <div className="pt-3 md:pt-0 md:pl-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                Yol Müddəti
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {routeConfig.estimatedTravelTime}
              </div>
              <span className="text-xs text-slate-500 mt-1 block">Magistral yol üzrə</span>
            </div>

            <div className="pt-3 md:pt-0 md:pl-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                Operativ Çıxış
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                15–30 dəq
              </div>
              <span className="text-xs text-slate-500 mt-1 block">24/7 Fasiləsiz</span>
            </div>
          </div>
        </section>

        {/* Section 2: Embedded Interactive Calculator Preloaded with the Route */}
        <section aria-labelledby="interactive-estimator-heading" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 id="interactive-estimator-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Onlayn Evakuator Hesablayıcısı
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Aşağıdakı kalkulyatorda {routeConfig.origin} və {routeConfig.destination} ünvanlarını daxil edərək rəsmi tarifi dərhal yoxlayın və sifarişinizi tamamlayın.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
            <EvakuasiyaEstimator onOpenCallback={onOpenCallback} />
          </div>
        </section>

        {/* Section 3: Detailed Price Breakdown & Vehicle Classes Table */}
        <section aria-labelledby="pricing-breakdown-heading" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 id="pricing-breakdown-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {routeConfig.origin}–{routeConfig.destination} Evakuator və Daşıma Qiymətləri
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Daşınan nəqliyyat vasitəsinin növünə və texniki vəziyyətinə uyğun şəffaf qiymət cədvəli
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-700 font-semibold">
                    <th className="py-3.5 px-4 sm:px-6">Nəqliyyat Növü / Kateqoriya</th>
                    <th className="py-3.5 px-4 sm:px-6">Xüsusiyyətlər</th>
                    <th className="py-3.5 px-4 sm:px-6">Rəsmi Qiymət</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Sifariş</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="bg-blue-50/40">
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 flex items-center gap-2">
                      <Car className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Standart Minik Avtomobili</span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600">
                      Sedan, hetçbek, kupe (çəkisi 1.6 tona qədər)
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-extrabold text-blue-600 text-base">
                      {priceFormatted}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        onClick={handleWhatsApp}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Sifariş et
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 flex items-center gap-2">
                      <Car className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Krossover / SUV / Cip</span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600">
                      Böyük ölçülü və ağır çəkili (1.8 – 2.8 ton) ciplər
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                      {evacTariff.price ? `${evacTariff.price + 20} – ${evacTariff.price + 40} AZN` : 'Razılaşma ilə'}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        onClick={handleWhatsApp}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Sifariş et
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Təkəri / Karobkası Kilidlənmiş</span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600">
                      Qəzalı, təkəri dönməyən maşınlar üçün xüsusi diyircəklər
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                      Tarif + 20 AZN
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        onClick={handleWhatsApp}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Sifariş et
                      </button>
                    </td>
                  </tr>

                  {/* Freight vehicles comparison from the same database */}
                  {routeTariff && (
                    <>
                      <tr>
                        <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 flex items-center gap-2">
                          <Truck className="w-4 h-4 text-slate-500 shrink-0" />
                          <span>Yükdaşıma Furqonu (Ford Transit 3m/4m)</span>
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-slate-600">
                          Mebel, məişət texnikası və tikinti yükləri
                        </td>
                        <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                          {routeTariff.prices['3m'] || 240} – {routeTariff.prices['4m'] || 270} AZN
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-right">
                          <Link
                            href="/yukdasima"
                            className="inline-block px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                          >
                            Ətraflı
                          </Link>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 p-4 border-t border-slate-200 text-xs text-slate-500">
              * Qiymətlərə avtomobilin platformaya qaldırılması, xüsusi təhlükəsizlik kəmərləri ilə fiksasiyası və birbaşa ünvana çatdırılması daxildir. Heç bir gizli xərc və ya yolda əlavə ödəniş yoxdur.
            </div>
          </div>
        </section>

        {/* Section 4: Route Logistics & Transportation Process */}
        <section aria-labelledby="logistics-heading" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 id="logistics-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {routeConfig.origin}dan {routeConfig.destinationDative} Avtomobil Necə Daşınır?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              4 sadə mərhələdə rahat və tam təhlükəsiz evakuasiya xidməti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-base">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Sifariş və Ünvan Təyini
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                878 nömrəsinə zəng edirsiniz və ya WhatsApp vasitəsilə avtomobilin dəqiq yerləşdiyi ünvanı (lokasiyanı) və maşının modelini göndərirsiniz.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-base">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Operativ Çıxış (15–30 dəq)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Növbətçi evakuatorumuz dərhal ünvanınıza göndərilir və 15–30 dəqiqə ərzində olduğunuz yerə çatır.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-base">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Təhlükəsiz Yükləmə
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Avtomobil hidravlik sürüşən platformaya ehtiyatla qaldırılır və 4 nöqtədən xüsusi möhkəm təkər bağlayıcıları ilə bərkidilir.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-base">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {routeConfig.destinationDative} Çatdırılma
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {routeConfig.primaryHighway} vasitəsilə maşınınız təxminən {routeConfig.estimatedTravelTime} ərzində {routeConfig.destinationLocative} istənilən ünvana və ya servisə təhvil verilir.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Why choose yukdasima.ai for this route */}
        <section aria-labelledby="why-us-heading" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 id="why-us-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Niyə {routeConfig.origin}–{routeConfig.destination} Evakuatorunda Bizi Seçirlər?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Müştərilərimizə yüksək səviyyəli xidmət və tam təhlükəsizlik zəmanəti təqdim edirik
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">100% Təhlükəsizlik və Sığorta</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Daşınan hər bir avtomobil daşıma müddətində tam sığortalanır və təhlükəsizliyinə zəmanət verilir.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Sabit və Şəffaf Qiymət</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Saytda təyin olunan rəsmi tarif ({priceFormatted}) son qiymətdir. Yolda heç bir gözlənilməz əlavə tələb olunmur.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">24/7 Fasiləsiz Növbətçilik</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Gecə və gündüz, bayram günləri də daxil olmaqla istənilən hava şəraitində operativ xidmət göstəririk.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Navigation className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">GPS İzləmə Sistemi</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Evakuatorun hərəkət marşrutunu və təxmini çatma vaxtını operativ dispetçerimiz vasitəsilə izləyə bilərsiniz.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Müasir Hidravlik Park</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Aşağı klirensli idman avtomobilləri və lüks maşınlar üçün xüsusi sürüşən platformalı texnika.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">İkitərəfli Daşıma İmkanı</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Həm {routeConfig.origin}dan {routeConfig.destinationDative}, həm də {routeConfig.destinationAblative} {routeConfig.origin}ya və digər şəhərlərə daşıma imkanı.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: FAQ Accordion */}
        <section aria-labelledby="route-faq-heading" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 id="route-faq-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Tez-tez Verilən Suallar ({routeConfig.origin}–{routeConfig.destination})
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Marşrut, qiymət və daşıma şərtləri haqqında ən çox soruşulan sualların cavabları
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {seoConfig.faqs?.map((faq, index) => {
              const isOpen = openFaqIndexes.includes(index);
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 px-5 sm:px-6 text-left font-bold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-4 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 7: Other Popular Evakuasiya Routes */}
        <section aria-labelledby="other-routes-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 id="other-routes-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
                Digər Rayonlar Üzrə Evakuasiya Marşrutları
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Bakıdan Azərbaycanın digər şəhər və rayonlarına 24/7 operativ evakuator xidmətləri:
              </p>
            </div>
            <Link
              href="/evakuasiya"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 shrink-0"
            >
              <span>Bütün rayonlar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getAllApprovedEvakuatorRoutes()
              .filter((r) => r.slug !== routeConfig.slug)
              .slice(0, 8)
              .map((r) => {
                const tariff = lookupEvacuatorTariff(r.origin, r.destination);
                return (
                  <Link
                    key={r.slug}
                    href={r.routePath}
                    className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">
                        {r.origin} – {r.destination}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                      <span>{tariff.distanceKm ? `${tariff.distanceKm} km` : 'Magistral'}</span>
                      <span className="font-bold text-blue-600">{tariff.price ? `${tariff.price} AZN` : 'Tarif'}</span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>

        {/* Section 8: Contextual Internal Links to Other Relevant Pages */}
        <section aria-labelledby="related-services-heading" className="bg-slate-100/70 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
          <h2 id="related-services-heading" className="text-lg sm:text-xl font-bold text-slate-900">
            Digər Əlaqəli Xidmətlər və Qiymət Cədvəlləri
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/evakuasiya"
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all flex items-center justify-between group"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  Bütün Evakuasiya Xidmətləri
                </span>
                <span className="text-xs text-slate-500 block">Bakı və bütün rayonlar</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </Link>

            <Link
              href="/yukdasima"
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all flex items-center justify-between group"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  Yükdaşıma Xidməti
                </span>
                <span className="text-xs text-slate-500 block">Bakı–{routeConfig.destination} yük daşınması</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </Link>

            <Link
              href="/qiymetler"
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all flex items-center justify-between group"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  Tarif Cədvəli
                </span>
                <span className="text-xs text-slate-500 block">Bütün bölgələr üzrə qiymətlər</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </Link>

            <Link
              href="/elaqe"
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all flex items-center justify-between group"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  Əlaqə və Qaynar Xətt
                </span>
                <span className="text-xs text-slate-500 block">878 və 24/7 Dəstək</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
};
