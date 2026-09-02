import React, { useState } from 'react';
import {
  ApprovedYukdasimaRouteConfig,
  getApprovedYukdasimaRoute,
  getAllApprovedYukdasimaRoutes,
  getApprovedEvakuatorRoute,
  generateYukdasimaRouteSeoConfig,
} from '../seo/routeRegistry';
import {
  getGeographicNeighbors,
  getEconomicRegionGroup,
} from '../seo/regionalData';
import { getRouteContentProfile } from '../seo/regionalContent';
import { lookupRouteTariff } from '../services/tariffService';
import { YukdasimaEstimator } from '../components/YukdasimaEstimator';
import { Link } from '../router/RouterContext';
import {
  Truck,
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
  HelpCircle,
  Users,
  PackageCheck,
  Boxes,
  Layers,
  Sparkles,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { generateWhatsAppLink } from '../utils/calculator';
import { getContextualWhatsAppUrl } from '../utils/whatsappHelper';
import { trackConversionEvent } from '../utils/analytics';
import { DEFAULT_VEHICLE_CONFIG } from '../config/vehicles';
import { CallbackInitialData } from '../types';

interface YukdasimaRoutePageProps {
  routeConfig?: ApprovedYukdasimaRouteConfig;
  routeSlug?: string;
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const YukdasimaRoutePage: React.FC<YukdasimaRoutePageProps> = ({
  routeConfig: propRouteConfig,
  routeSlug,
  onOpenCallback,
}) => {
  // Resolve config either from direct prop or by slug
  const routeConfig = propRouteConfig || (routeSlug ? getApprovedYukdasimaRoute(routeSlug) : null);

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
            Axtardığınız yükdaşıma marşrutu tapılmadı
          </h1>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Daxil etdiyiniz marşrut üzrə avtomatik səhifə mövcud deyil və ya rayon adı düzgün qeyd olunmayıb. Bütün rəsmi Azərbaycan rayonları üzrə qiyməti əsas yükdaşıma səhifəmizdə onlayn hesablaya bilərsiniz.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/yukdasima"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-colors"
            >
              <Truck className="w-4 h-4" />
              <span>Bütün Yükdaşıma Qiymətləri</span>
            </Link>
            <a
              href={CONTACT_INFO.PRIMARY_PHONE_TEL}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Zəng et: {CONTACT_INFO.PRIMARY_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </article>
    );
  }

  // Retrieve truthful data from centralized database
  const liveRouteTariff = lookupRouteTariff(routeConfig.origin, routeConfig.destination);
  const seoConfig = generateYukdasimaRouteSeoConfig(routeConfig);
  const distanceKm = routeConfig.distanceKm || liveRouteTariff?.distanceKm || 280;

  // Prices from database
  const prices = routeConfig.prices;
  const validPrices = Object.values(prices).filter((p): p is number => typeof p === 'number' && p > 0);
  const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : null;
  const startingPriceDisplay = minPrice ? `${minPrice} AZN-dən` : 'Sərfəli Tarif';

  // WhatsApp quick text
  const handleWhatsApp = () => {
    trackConversionEvent('mobile_whatsapp_click', {
      page_path: `/yukdasima/${routeConfig.slug}`,
      service_type: 'yukdasima',
      route: `${routeConfig.origin}–${routeConfig.destination}`,
      cta_location: 'hero',
    });
    const text = `Salam, ${routeConfig.origin}dan ${routeConfig.destinationDative} yükdaşıma sifarişi vermək istəyirəm.`;
    window.open(generateWhatsAppLink(text), '_blank');
  };

  const handleHotlineClick = () => {
    trackConversionEvent('mobile_call_click', {
      page_path: `/yukdasima/${routeConfig.slug}`,
      service_type: 'yukdasima',
      route: `${routeConfig.origin}–${routeConfig.destination}`,
      cta_location: 'hero',
    });
  };

  // Geographic neighbor routes for balanced, crawlable internal linking
  const allRoutes = getAllApprovedYukdasimaRoutes();
  const neighborData = getGeographicNeighbors(routeConfig.slug);
  const regionGroup = getEconomicRegionGroup(routeConfig.slug);

  let neighborRoutes = neighborData
    .map((n) => allRoutes.find((r) => r.slug === n.slug))
    .filter((r): r is ApprovedYukdasimaRouteConfig => !!r);

  if (neighborRoutes.length < 4 && regionGroup) {
    const fallbackRoutes = regionGroup.destinationSlugs
      .filter((slug) => slug !== routeConfig.slug && !neighborRoutes.some((nr) => nr.slug === slug))
      .map((slug) => allRoutes.find((r) => r.slug === slug))
      .filter((r): r is ApprovedYukdasimaRouteConfig => !!r);
    neighborRoutes = [...neighborRoutes, ...fallbackRoutes].slice(0, 6);
  }

  // Cross-service evakuator counterpart check
  const counterpartEvakuator = getApprovedEvakuatorRoute(routeConfig.slug);
  const routeProfile = getRouteContentProfile(routeConfig.slug);

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
              <Link href="/yukdasima" className="hover:text-blue-600 transition-colors">
                Yükdaşıma
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">/</li>
            <li className="font-semibold text-slate-800" aria-current="page">
              {routeConfig.origin}–{routeConfig.destination} Yükdaşıma
            </li>
          </ol>
        </nav>

        {/* Primary Page Header with the single H1 */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <Truck className="w-4 h-4" />
            <span>Bakı–{routeConfig.destination} Rayonlararası Yükdaşıma</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {seoConfig.h1}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {routeConfig.descriptionText} ({distanceKm} km). 2m-dən 7m-dək qapalı yük maşınları, peşəkar mebel ustası və fəhlə briqadası.
          </p>
          <p className="text-xs text-slate-500 max-w-xl mx-auto italic">
            Qiymət marşrut, avtomobilin mövcudluğu, yolüstü daşınma imkanı və sifariş detallarına görə dəyişə bilər. Cari ən uyğun qiymət üçün bizimlə əlaqə saxlayın.
          </p>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={CONTACT_INFO.PRIMARY_PHONE_TEL}
              onClick={handleHotlineClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-xs transition-colors"
              title={`${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsinə zəng et`}
              aria-label={`${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsinə zəng et`}
            >
              <Phone className="w-4 h-4" />
              <span>Zəng et: {CONTACT_INFO.PRIMARY_PHONE_DISPLAY}</span>
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-sm font-bold transition-colors cursor-pointer"
            >
              <span>Operator Zəng Etsin</span>
            </button>
          </div>

          {/* Route Quick Summary Metadata Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Məsafə: <strong>{distanceKm} km</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Təxmini yol: <strong>{routeConfig.estimatedTravelTime}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <Navigation className="w-4 h-4 text-blue-600" />
              <span>Əsas yol: <strong>{routeConfig.primaryHighway}</strong></span>
            </div>
          </div>
        </header>

        {/* Section 1: H2 - Official Vehicle Tariffs Matrix */}
        <section className="space-y-6" aria-label="Yükdaşıma Qiymət Cədvəli">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Şəffaf Tarif Cədvəli</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Bakı–{routeConfig.destination} Yükdaşıma Qiymətləri və Avtomobil Növləri
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Mərkəzləşdirilmiş tarif bazamız əsasında Bakı–{routeConfig.destination} marşrutu üzrə rəsmi avtomobil daşıma qiymətləri. Ehtiyacınıza uyğun maşın növünü seçin:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEFAULT_VEHICLE_CONFIG.vehicles.map((spec) => {
              const priceVal = prices[spec.category as keyof typeof prices];
              const isAvailable = typeof priceVal === 'number' && priceVal > 0;

              return (
                <div
                  key={spec.category}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-extrabold text-xs">
                        {spec.category.toUpperCase()} Yük Maşını
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        Tutum: <strong>{spec.badge}</strong>
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        {spec.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Ölçülər: {spec.lengthM}m x {spec.widthM}m x {spec.heightM}m • Max: {spec.maxCarryingWeightKg} kq
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {spec.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-500 font-medium">Tarif:</span>
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                        Cari qiyməti yoxla
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('yukdasima-interactive-calculator');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Qiyməti öyrən</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Rules & Disclaimers Box */}
          <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/80 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Qiymətləndirmə Qaydaları və Şərtlər:</span>
            </div>
            <ul className="text-xs sm:text-sm text-blue-800 space-y-1.5 pl-6 list-disc">
              <li><strong>Avtomobil üçün ilkin qiymət</strong> — Cədvəldə göstərilən məbləğ avtomobilin yanacaq və sürücü xidməti daxil olmaqla Bakıdan {routeConfig.destinationDative} (və ya əksinə) birbaşa daşıma tarifidir.</li>
              <li><strong>Fəhlə, usta, mərtəbə və digər əlavə xidmətlər ayrıca hesablana bilər.</strong> Rayonlararası fəhlə sayı, mərtəbəyə qaldırma və mebel sökülüb-yığılması sifarişçinin istəyinə əsasən dəqiq hesablanır.</li>
              <li>Bütün yüklər nəqliyyat bölməsində xüsusi kəmərlərlə möhkəm bərkidilir və təhlükəsiz çatdırılmaya tam zəmanət verilir.</li>
            </ul>
          </div>
        </section>

        {/* Section 2: H2 - Which Truck is Suitable? Guidance */}
        <section className="space-y-6" aria-label="Uyğun Yük Maşınının Seçimi">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Boxes className="w-4 h-4" />
              <span>Praktik Bələdçi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Hansı Yük Maşını Uyğundur?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Yükünüzün həcmini düzgün qiymətləndirmək həm xərclərinizə qənaət edir, həm də daşınmanı daha sürətli edir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">
                1. Süni İntellektlə Şəkil Analizi (Avtomatik)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Daşımaq istədiyiniz otaqların və ya mebellərin şəkillərini çəkib aşağıdakı kalkulyatora yükləyin. Süni intellektimiz əşyaların ümumi həcmini (m³) avtomatik hesablayaraq ən uyğun avtomobili dərhal təyin edir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">
                2. Sadəcə Maşın Seçimi (Birbaşa Sifariş)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Əgər lazım olan avtomobil növünü (məsələn, 4m Ford Transit və ya 6m İsuzu) dəqiq bilirsinizsə, birbaşa avtomobil kateqoriyasını və əlavə fəhlə seçimlərini qeyd edərək dərhal sifariş göndərə bilərsiniz.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Prominent Interactive Calculator & AI Estimator */}
        <section
          id="yukdasima-interactive-calculator"
          className="space-y-6 pt-4 scroll-mt-20"
          aria-label="Bakı Rayonlararası Yükdaşıma Kalkulyatoru"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Onlayn Hesablama və Sifariş</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Bakı–{routeConfig.destination} Yükdaşıma Kalkulyatoru
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Şəkilləri yükləyərək süni intellektlə həcmi müəyyən edin və ya birbaşa maşın seçərək Bakıdan {routeConfig.destinationDative} sifarişinizi tamamlayın:
            </p>
          </div>

          <div className="bg-white rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-sm">
            <YukdasimaEstimator
              onOpenCallback={onOpenCallback}
              initialFromAddress="Bakı"
              initialToAddress={routeConfig.destination}
            />
          </div>
        </section>

        {/* Section 4: H2 - Route Specific Logistics & Reverse Transport Overview */}
        {routeProfile && (
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xs space-y-6" aria-label="Marşrut Xüsusiyyətləri və Əks İstiqamət">
            <div className="max-w-3xl space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                <Navigation className="w-4 h-4" />
                <span>Marşrut Logistikası və Əks Daşınma</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Bakı–{routeConfig.destination} və {routeConfig.destinationAblative} Bakıya Daşınma Şərtləri
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {routeProfile.yukdasimaOverview}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <Truck className="w-4 h-4" />
                  <span>Nəqliyyat Seçimi</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {routeProfile.yukdasimaVehicleNotes}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Yükləmə & Bərkitmə</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {routeProfile.yukdasimaLoadingNotes}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <Layers className="w-4 h-4" />
                  <span>{routeConfig.destination} → Bakı İstiqaməti</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {routeProfile.yukdasimaReverseOverview}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Section 5: H2 - How Pricing is Calculated */}

        <section className="space-y-6" aria-label="Qiymətin Hesablanma Qaydası">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <PackageCheck className="w-4 h-4" />
              <span>Şəffaflıq</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Yükdaşıma Qiyməti Necə Hesablanır?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Bizim sistemdə heç bir gizli xərc və ya sonradan artırılan ödəniş yoxdur. Qiymət 4 aydın meyar əsasında formalaşır:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="text-blue-600 font-extrabold text-sm">01. Marşrut & Məsafə</div>
              <h3 className="font-bold text-slate-900 text-base">Sabit Magistral Tarifi</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bakı–{routeConfig.destination} ({distanceKm} km) marşrutu üzrə avtomobilin əsas yanacaq və yol xərcləri mərkəzi tarif bazasına uyğun sabit müəyyənləşdirilir.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="text-blue-600 font-extrabold text-sm">02. Avtomobilin Həcmi</div>
              <h3 className="font-bold text-slate-900 text-base">2m-dən 7m-dək Seçim</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yükün həcminə görə kiçik Transitdən böyük İsuzuya qədər ən optimal maşın təyin olunur, artıq yer üçün əlavə ödəniş etmirsiniz.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="text-blue-600 font-extrabold text-sm">03. Fəhlə Xidməti</div>
              <h3 className="font-bold text-slate-900 text-base">İstəyə Uyğun Briqada</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yükləmə və boşaltma üçün peşəkar fəhlə sayı (1, 2, 3 və ya daha çox) və mərtəbə şərtləri nəzərə alınaraq ayrıca hesablanır.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="text-blue-600 font-extrabold text-sm">04. Mebel Ustası & Xüsusi Yüklər</div>
              <h3 className="font-bold text-slate-900 text-base">Sökülmə & Yığılma</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Böyük qarderob, dəhliz mebeli, yataq dəstləri, həmçinin pianino və ya ağır seyflər üçün xüsusi peşəkar xidmət təşkil edilir.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: H2 - Labor & Furniture Disassembly/Assembly Services */}
        <section className="space-y-6" aria-label="Fəhlə və Usta Xidmətləri">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Users className="w-4 h-4" />
              <span>Kompleks Xidmət</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Fəhlə və Mebel Ustası Xidməti
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Bakıdan {routeConfig.destinationDative} ev və ya ofis köçürülməsi zamanı ağır işləri peşəkarlara həvalə edin:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Peşəkar Fəhlə Briqadası</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Daimi təlim keçmiş, fiziki cəhətdən hazırlıqlı fəhlələrimiz əşyaları ehtiyatla qaldırır, daşıyır və avtomobilə səliqə ilə yerləşdirir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Mebel Sökülməsi və Yığılması</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Təcrübəli mebel ustalarımız iri mebelləri səliqə ilə hissələrə ayırır, çatdırılma ünvanında isə yenidən dəqiq və möhkəm quraşdırır.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Qoruyucu Qablaşdırma</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Zərif mebel səthləri, şüşələr və texnika streç lent, hava qabarcıqlı plyonka və kartonla etibarlı şəkildə qorunur.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: H2 - Value Propositions */}
        <section className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white space-y-8" aria-label="Xidmət Üstünlükləri">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Niyə Biz?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Niyə yukdasima.ai ilə Bakı–{routeConfig.destination} Yükdaşıma?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Müasir avtoparkımız, texnoloji qiymətləndirməmiz və məsuliyyətli yanaşmamızla rayonlararası daşınmanı tam etibarlı edirik:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Operativ Çıxış</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Təyin olunmuş vaxtda və ya təcili sifarişlərdə avtomobil 20 dəqiqə ərzində Bakıdakı ünvanınıza çatır.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">100% Zəmanət</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Bütün əşyalarınız möhkəm fiksasiya edilir və təhlükəsiz çatdırılmasına tam məsuliyyət daşıyırıq.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Məsuliyyətli Heyət</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Təcrübəli sürücülər, mebel ustaları və daimi briqada ilə yüksək keyfiyyətli xidmət.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">24/7 Dəstək Xətti</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Günün istənilən vaxtında suallarınızı cavablandıran və {CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsi ilə operativ sifariş qəbul edən dispetçer mərkəzi.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: H2 - Geographic Neighbor Regional Cargo Routes */}
        <section className="space-y-6" aria-label="Yaxın Rayonlar Üzrə Yükdaşıma Marşrutları">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>{regionGroup ? regionGroup.name : 'Bölgə'} və Qonşu Rayonlar</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Yaxın Rayonlar Üzrə Yükdaşıma Marşrutları
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Bakıdan {routeConfig.destination} və qonşu rayonlara sərfəli yükdaşıma tarifləri:
              </p>
            </div>
            <Link
              href="/yukdasima"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 shrink-0"
            >
              <span>Bütün rayonlar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {neighborRoutes.map((r) => {
              return (
                <Link
                  key={r.slug}
                  href={r.routePath}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all group block space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600">Bakı → {r.destination}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    Bakı–{r.destination} Yükdaşıma
                  </h3>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <span className="text-slate-500">{r.distanceKm ? `${r.distanceKm} km` : 'Rayon'}</span>
                    <span className="font-extrabold text-blue-600 group-hover:text-blue-700">
                      Qiyməti öyrən
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Section 8: H2 - Route Specific FAQ Accordion */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xs space-y-8" aria-label="Tez-tez Verilən Suallar">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Məlumat Mərkəzi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tez-tez Verilən Suallar
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Bakı–{routeConfig.destination} marşrutu üzrə yükdaşıma qiymətləri, avtomobillər və fəhlə xidməti haqqında əsas sualların cavabları:
            </p>
          </div>

          <div className="space-y-3 max-w-4xl">
            {seoConfig.faqs.map((faq, index) => {
              const isOpen = openFaqIndexes.includes(index);
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-50 hover:bg-slate-100 transition-colors gap-4"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-5 bg-white border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed space-y-2">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 9: Contextual Internal Links */}
        <section className="space-y-6" aria-label="Əlaqəli Xidmətlər">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Əlaqəli Daşıma və Evakuasiya Xidmətləri</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">Digər ixtisaslaşmış xidmətlərimizlə tanış olun:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/evden-eve-yukdasima"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-2xs transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Evdən Evə Yükdaşıma</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Mənzillərin tam qablaşdırılma və köçürülməsi.</p>
            </Link>

            <Link
              href="/mebel-dasinmasi"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-2xs transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Mebel Daşınması & Usta</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Mebellərin sökülməsi, daşınması və yığılması.</p>
            </Link>

            <Link
              href="/fehle-xidmeti"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-2xs transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Fəhlə Xidməti</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Təcrübəli briqada ilə yükləmə və boşaltma.</p>
            </Link>

            {counterpartEvakuator ? (
              <Link
                href={counterpartEvakuator.routePath}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-2xs transition-all group"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  <span>Bakı–{routeConfig.destination} Evakuator</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-slate-600 mt-2">24/7 operativ avtomobil evakuasiyası və texniki yardım.</p>
              </Link>
            ) : (
              <Link
                href="/evakuator"
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-2xs transition-all group"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  <span>24/7 Evakuator Xidməti</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-slate-600 mt-2">Bütün respublika üzrə operativ evakuasiya xidməti.</p>
              </Link>
            )}
          </div>
        </section>

        {/* Section 10: Bottom Call to Action Banner */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white shadow-md text-center space-y-6" aria-label="Sürətli Sifariş Çağırışı">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Bakı–{routeConfig.destination} Yükdaşıma Sifarişi Üçün Dərhal Əlaqə Saxlayın
            </h2>
            <p className="text-blue-100 text-xs sm:text-base leading-relaxed">
              Mənzil, ofis və ya kommersiya yüklərinizin təhlükəsiz daşınması üçün bizə zəng edin və ya onlayn müraciət göndərin.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={CONTACT_INFO.PRIMARY_PHONE_TEL}
              aria-label={`${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsinə zəng et`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-extrabold text-sm shadow-sm transition-all"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Zəng et: {CONTACT_INFO.PRIMARY_PHONE_DISPLAY}</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenCallback()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm border border-blue-400/30 shadow-sm transition-all cursor-pointer"
            >
              <span>Operator Sizi Yığsın</span>
            </button>
          </div>
        </section>
      </div>
    </article>
  );
};
