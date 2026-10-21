import React, { useState } from 'react';
import { YukdasimaEstimator } from '../components/YukdasimaEstimator';
import { Link } from '../router/RouterContext';
import {
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  MapPin,
  Users,
  PhoneCall,
  Phone,
  MessageSquare,
  ChevronDown,
  Sparkles,
  Calculator,
  HelpCircle,
  BadgePercent,
  Layers,
  Home,
  Building2,
  Wrench,
  Navigation,
  AlertTriangle,
  Box,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { generateWhatsAppLink } from '../utils/calculator';
import { getContextualWhatsAppUrl } from '../utils/whatsappHelper';
import { trackConversionEvent } from '../utils/analytics';
import { YUKDASIMA_FAQS } from '../seo/metadata';
import { getAllApprovedYukdasimaRoutes } from '../seo/routeRegistry';
import { ECONOMIC_REGION_GROUPS } from '../seo/regionalData';
import { DEFAULT_VEHICLE_CONFIG } from '../config/vehicles';
import { CallbackInitialData } from '../types';
import { BakuDistrictsGeoSection } from '../components/BakuDistrictsGeoSection';
import { t } from '../i18n';

interface YukdasimaPageProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const YukdasimaPage: React.FC<YukdasimaPageProps> = ({ onOpenCallback }) => {
  const regionalRoutes = getAllApprovedYukdasimaRoutes();

  // State for active FAQ accordion items (first two expanded by default for smooth UX)
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0, 1]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleWhatsApp = () => {
    trackConversionEvent('mobile_whatsapp_click', {
      page_path: '/yukdasima',
      service_type: 'yukdasima',
      cta_location: 'hero',
    });
    window.open(getContextualWhatsAppUrl('/yukdasima'), '_blank');
  };

  const handleHotlineClick = () => {
    trackConversionEvent('mobile_call_click', {
      page_path: '/yukdasima',
      service_type: 'yukdasima',
      cta_location: 'hero',
    });
  };

  // Featured key popular canonical routes for quick access
  const popularRouteSlugs = [
    'baki-gence',
    'baki-sumqayit',
    'baki-quba',
    'baki-seki',
    'baki-qebele',
    'baki-lenkeran',
    'baki-xacmaz',
    'baki-mingecevir',
  ];
  const popularRoutes = popularRouteSlugs
    .map((slug) => regionalRoutes.find((r) => r.slug === slug))
    .filter((r): r is typeof regionalRoutes[0] => !!r);

  return (
    <article className="py-6 sm:py-10 bg-slate-50 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label={t("Breadcrumb")} className="text-xs sm:text-sm text-slate-500">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">{t("Ana səhifə")}</Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">/</li>
            <li className="font-semibold text-slate-800" aria-current="page">{t("Yükdaşıma")}</li>
          </ol>
        </nav>

        {/* Primary Page Header with the single H1 */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <Truck className="w-4 h-4" />
            <span>{t("Bakı və Azərbaycan Üzrə Peşəkar Xidmət")}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">{t("Yükdaşıma Xidməti – Bakı və Regionlar")}</h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">{t("Bakı şəhəri, Abşeron və bütün Azərbaycan regionları üzrə təhlükəsiz və operativ ")}<strong>{t("yükdaşıma xidməti")}</strong>{t(". Mənzil köçürülməsi, ofis daşınması, mebel montajı və yük maşını sifarişi üçün şəffaf onlayn qiymət hesablanması və sürətli əlaqə.")}</p>

          {/* Quick Hotline and WhatsApp Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={CONTACT_INFO.PRIMARY_PHONE_TEL}
              onClick={handleHotlineClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-xs transition-colors"
              title={t(`${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsinə zəng et`)}
              aria-label={t(`${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsinə zəng et`)}
            >
              <Phone className="w-4 h-4" />
              <span>{t("Zəng et: ")}{t(CONTACT_INFO.PRIMARY_PHONE_DISPLAY)}</span>
            </a>

            <button
              onClick={handleWhatsApp}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs transition-colors cursor-pointer"
              title={t("WhatsApp vasitəsilə yaz")}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t("WhatsApp ilə Sifariş")}</span>
            </button>

            <a
              href="#yukdasima-calculator-section"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-colors"
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>{t("Qiyməti Hesabla")}</span>
            </a>
          </div>
        </header>

        {/* Section 1: Embedded Price Calculator & AI Volume Estimator */}
        <section
          id="yukdasima-calculator-section"
          aria-label={t("Yükdaşıma Qiymətləri Kalkulyatoru və Sifariş")}
          className="space-y-4"
        >
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-200 text-xs font-semibold uppercase tracking-wide">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>{t("Onlayn Qiymətləndirmə")}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{t("Yükdaşıma qiymətini dərhal hesablayın")}</h2>
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">{t("Ünvanları daxil edərək və ya əşyaların şəkillərini yükləyərək süni intellekt analizi ilə yükün həcmini və ")}<strong>{t("yükdaşıma qiymətlərini")}</strong>{t(" saniyələr ərzində dəqiq hesablayın.")}</p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenCallback()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-sm shadow-sm transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-blue-600" />
                  <span>{t("Operator Zəngi Sifariş Et")}</span>
                </button>
              </div>
            </div>

            {/* Embedded Full Interactive Estimator */}
            <div className="pt-2">
              <YukdasimaEstimator onOpenCallback={onOpenCallback} />
            </div>
          </div>
        </section>

        {/* Section 2: H2 - Yükdaşıma xidmətləri */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label={t("Yükdaşıma Xidmətləri")}>
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>{t("İxtisaslaşmış Həllər")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t("Yükdaşıma xidmətləri")}</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{t("Fərdi və korporativ müştərilərimiz üçün müxtəlif tələblərə uyğunlaşdırılmış kompleks ")}<strong>{t("yükdaşıma")}</strong>{t(" həlləri təqdim edirik:")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ev və Mənzil Daşınması */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-4 hover:border-blue-200 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{t("Ev və Mənzil Daşınması")}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Mənzil və bağ evlərinin tam köçürülməsi. Məişət texnikası, kövrək əşyalar və fərdi əşyalar xüsusi qablaşdırılır və səliqəli daşınır.")}</p>
              </div>
              <Link
                href="/evden-eve-yukdasima"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>{t("Evdən evə daşıma")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Ofis Daşınması */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-4 hover:border-blue-200 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{t("Ofis Daşınması")}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Şirkətlər üçün fasiləsiz iş qrafiki ilə korporativ köçürülmə. Kompüter avadanlıqları, arxiv sənədləri və ofis masalarının təhlükəsiz daşınması.")}</p>
              </div>
              <Link
                href="/ofis-dasinmasi"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>{t("Ofis köçürülməsi")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mebel Daşınması */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-4 hover:border-blue-200 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{t("Mebel Daşınması & Montaj")}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Qonaq, yataq və mətbəx mebellərinin təcrübəli usta tərəfindən sökülməsi, qoruyucu plyonka ilə bükülməsi və yeni mənzildə quraşdırılması.")}</p>
              </div>
              <Link
                href="/mebel-dasinmasi"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>{t("Mebel ustası və daşıma")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Müxtəlif Həcmli Yüklərin Daşınması */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-4 hover:border-blue-200 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Box className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{t("Müxtəlif Həcmli Yüklər")}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Tək mebel, tikinti materialları, anbar və ticarət yükləri üçün təmiz və qapalı yük avtomobillərinin təminatı.")}</p>
              </div>
              <Link
                href="/yuk-masini"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>{t("Yük maşını seçimi")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Bakı Daxili Daşınma */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-4 hover:border-blue-200 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{t("Bakı Daxili Daşınma")}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Paytaxtın bütün rayon və qəsəbələrində operativ xidmət. 20–30 dəqiqə ərzində növbətçi maşın və fəhlə heyətinin ünvana çatdırılması.")}</p>
              </div>
              <Link
                href="/fehle-xidmeti"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>{t("Fəhlə briqadası")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Bakıdan Regionlara Daşınma */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-4 hover:border-blue-200 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                  <Navigation className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{t("Bakıdan Regionlara Daşınma")}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Azərbaycanın bütün şəhər və rayonlarına kilometraj əsasında rəsmi sabit tariflərlə təhlükəsiz şəhərlərarası daşıma.")}</p>
              </div>
              <Link
                href="/qiymetler"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>{t("Tarif cədvəli")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 3: H2 - Yükdaşıma qiyməti necə hesablanır? */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label={t("Qiymət Hesablama Qaydaları")}>
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <BadgePercent className="w-4 h-4" />
              <span>{t("Şəffaf və Rəsmi Tariflər")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t("Yükdaşıma qiyməti necə hesablanır?")}</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{t("Platformamızda ")}<strong>{t("yükdaşıma qiymətləri")}</strong>{t(" tam şəffaf şəkildə formalaşır. Daşınma haqqı heç bir gizli xərc olmadan aşağıdakı real meyarlar əsasında hesablanır:")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Marşrut və Məsafə")}</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Bakı şəhərdaxili marşrutlar üzrə sabit başlanğıc tarifi, şəhərətrafı qəsəbələrə və Azərbaycan rayonlarına isə rəsmi bazamızdakı dəqiq kilometraj əsasında hesablanır.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Yükün Həcmi və Avtomobil")}</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("2 metrlik Ford Transit-dən 7 metrlik böyük tutumlu furqonlaradək yükün real həcminə uyğun avtomobil seçilir. Doğru seçim artıq xərclərin qarşısını alır.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Fəhlə Ehtiyacı və Briqada")}</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Əşyaların miqdarına görə 2, 3 və ya 4 nəfərlik fəhlə briqadası cəlb edilir. Fəhlələrimiz yükləmə, boşaltma və mərtəbələrə təhlükəsiz daşımanı təmin edir.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Mərtəbə və Lift Vəziyyəti")}</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Binalarda işlək yük liftinin olub-olmaması və pilləkənlə qaldırılacaq mərtəbə sayı hesablamada şəffaf nəzərə alınır.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Xüsusi Ağır Əşyalar")}</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Piano, iri seyf, tibbi və ya xüsusi qabaritli ağır avadanlıqlar üçün xüsusi kəmərlər və əlavə işçi qüvvəsi təşkil olunur.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Mebel Ustası və Qablaşdırma")}</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Mebellərin peşəkar sökülüb-yığılması və keyfiyyətli qoruyucu plyonkalarla (streç, hava qabarcıqlı material) bükülməsi daxildir.")}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-blue-900 text-xs sm:text-sm">{t("Bütün xidmət növləri və istiqamətlər üzrə rəsmi cədvəllə tanış olmaq istəyirsiniz?")}</p>
            <Link
              href="/qiymetler"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-colors whitespace-nowrap"
            >
              <span>{t("Şəffaf Qiymətlər Cədvəli")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Section 4: H2 - Hansı yük maşını sizə uyğundur? */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label={t("Yük Maşını Modelləri")}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                <Truck className="w-4 h-4" />
                <span>{t("Geniş Avtopark")}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t("Hansı yük maşını sizə uyğundur?")}</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{t("Yükün həcminə və növünə uyğun avtomobil seçmək həm daşımanın təhlükəsizliyini təmin edir, həm də xərcləri minimuma endirir:")}</p>
            </div>

            <Link
              href="/yuk-masini"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors self-start sm:self-auto shrink-0"
            >
              <span>{t("Bütün Avtopark")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {DEFAULT_VEHICLE_CONFIG.vehicles.map((v) => {
              const isTir = v.category === 'tir';
              return (
                <div
                  key={v.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3 hover:border-blue-300 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                        {t(v.badge)}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {t(isTir ? 'TIR' : `${v.category.toUpperCase()} kateqoriyası`)}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">{t(v.name)}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{t(v.description)}</p>
                  </div>

                  {t(isTir ? (
                    <div className="p-2.5 rounded-xl bg-white border border-slate-100 text-center">
                      <p className="text-[11px] text-slate-500">{t("TIR üçün yükün çəkisi, həcmi və uyğun avtomobil tipi operator tərəfindən dəqiqləşdirilir.")}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-white border border-slate-100 text-center text-xs">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-medium">{t("Uzunluq")}</div>
                        <div className="font-bold text-slate-800">{t(v.lengthM)}{t(" m")}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-medium">{t("Tutum")}</div>
                        <div className="font-bold text-slate-800">{t(v.practicalCapacityM3)}{t(" m³")}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-medium">{t("Yük")}</div>
                        <div className="font-bold text-slate-800">{t(v.maxCarryingWeightKg)}{t(" kq")}</div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: H2 - Bakıda yükdaşıma xidməti */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label={t("Bakıda Yükdaşıma")}>
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>{t("Şəhərdaxili Operativlik")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t("Bakıda yükdaşıma xidməti")}</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{t("Paytaxt Bakının sıx küçələrində və geniş ətraf qəsəbələrində operativ ")}<strong>{t("Bakıda yükdaşıma")}</strong>{t(" tələblərinə uyğun növbətçi maşınlarımız 24/7 fəaliyyət göstərir:")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Evdən Evə Mənzil Köçürülməsi")}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Yasamal, Nərimanov, Xətai, Nəsimi, Binəqədi və digər mərkəzi rayonlarda mənzillərin qapalı furqonlarla təhlükəsiz köçürülməsi.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Ofis və Şirkət Köçürmələri")}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Biznes mərkəzləri və ofislər üçün kompüter avadanlıqları, arxiv sənədləri və ofis mebellərinin planlı köçürülməsi.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Mebel və Məişət Texnikası")}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Tək-tək mebel dəstləri, soyuducu, paltaryuyan və kövrək əşyaların qoruyucu materiallarla etibarlı çatdırılması.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Mağaza və Anbar Daşımaları")}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Ticarət obyektləri, anbarlar və mağazalar üçün malların, qutuların və avadanlıqların operativ daşınması.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Kiçik və Böyük Həcmli Yüklər")}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("2 metrlik yığcam maşınlardan tutmuş 7 metrlik böyük tutumlu furqonlaradək istənilən həcmdə yüklərin daşınması.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Abşeron və Qəsəbələr")}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Xırdalan, Masazır, Sumqayıt, Mərdəkan, Şüvəlan, Bilgəh, Novxanı və digər qəsəbələrə 20–30 dəqiqə ərzində sürətli çıxış.")}</p>
            </div>
          </div>
        </section>

        {/* Section 6: H2 - Bakıdan regionlara yükdaşıma */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label={t("Regionlara Yükdaşıma")}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                <Navigation className="w-4 h-4" />
                <span>{t("Şəhərlərarası Magistrallar")}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t("Bakıdan regionlara yükdaşıma")}</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{t("Bakıdan Azərbaycanın bütün şəhər və rayonlarına, eləcə də əks istiqamətdə rəsmi sabit tariflərlə ")}<strong>{t("yükdaşıma xidməti")}</strong>{t(" göstərilir. Əsas populyar marşrutlarımız:")}</p>
            </div>

            <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-2 rounded-xl shrink-0">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{t(regionalRoutes.length)}{t(" Təsdiqlənmiş Marşrut")}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularRoutes.map((r) => (
              <Link
                key={r.slug}
                href={r.routePath}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200/80 hover:border-blue-300 transition-all group block space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600">{t("Bakı → ")}{t(r.destination)}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{t("Bakı–")}{t(r.destination)}{t(" Yükdaşıma")}</h3>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/50">
                  <span className="text-slate-500">{t(r.distanceKm ? `${r.distanceKm} km` : 'Rayon')}</span>
                  <span className="font-extrabold text-blue-600 group-hover:text-blue-700">{t("Qiyməti öyrən")}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 7: H2 - Yükdaşıma sifarişi necə verilir? */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label={t("Sifariş Prosesi")}>
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>{t("Sadə və Aydın Proses")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t("Yükdaşıma sifarişi necə verilir?")}</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{t("yukdasima.ai platformasında ")}<strong>{t("yük maşını sifarişi")}</strong>{t(" və köçürülmə xidməti 5 rahat mərhələdən ibarətdir:")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">{t("Marşrutu Seçin")}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{t("Çıxış və çatdırılma ünvanlarını kalkulyatorda qeyd edin.")}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">{t("Yükü Bildirin")}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{t("Əşyaların təsvirini qeyd edin və ya foto yükləyərək AI analizi aparın.")}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">{t("Avtomobil və Xidmət")}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{t("Yükün həcminə uyğun maşın ölçüsü, fəhlə və usta ehtiyacını təyin edin.")}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-base">{t("Sifarişi Göndərin")}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{t("İlkin qiymətlə tanış olub əlaqə nömrənizi daxil edin.")}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                5
              </div>
              <h3 className="font-bold text-slate-900 text-base">{t("Operativ Əlaqə")}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{t("Operatorumuz dərhal əlaqə saxlayır və ən yaxın növbətçi maşını yönləndirir.")}</p>
            </div>
          </div>
        </section>

        {/* Section 8: H2 - Ucuz yükdaşıma seçərkən nələrə diqqət etmək lazımdır? */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label={t("Sərfəli və Təhlükəsiz Yükdaşıma")}>
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>{t("Sərfəli və Etibarlı Seçim")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t("Ucuz yükdaşıma seçərkən nələrə diqqət etmək lazımdır?")}</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{t("İstifadəçilər tez-tez ")}<strong>{t("ucuz yükdaşıma")}</strong>{t(" axtararkən yalnız qiymət rəqəminə diqqət yetirirlər. Lakin əşyaların zədələnmədən daşınması və sonradan gözlənilməz əlavə xərclərin çıxmaması üçün aşağıdakı məqamları nəzərə almaq vacibdir:")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Uyğun Maşın Seçimi")}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Yükün həcminə uyğun olmayan çox kiçik maşın seçildikdə əlavə reyslər tələb oluna və ümumi xərc arta bilər. Düzgün ölçü optimal xərci təmin edir.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Yükün Təhlükəsizliyi")}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Keyfiyyətsiz daşıma zamanı mebellərin cızılması və ya elektronikanın zədələnməsi daha böyük ziyan vura bilər. Təmiz furqon və etibarlı bərkitmə əsas şərtdir.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <BadgePercent className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Əvvəlcədən Düzgün Məlumat")}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Əşyaların sayı, liftin olub-olmaması və mərtəbə vəziyyəti əvvəlcədən dəqiq bildirildikdə sifariş zamanı təyin olunmuş qiymət sabit qalır.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Əlavə Xərclərin Aydın Olması")}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Bəzi fərdi sürücülər telefonda çox aşağı qiymət deyib sonradan əlavə məbləğ tələb edə bilərlər. Platformamızda bütün şərtlər öncədən aydın razılaşdırılır.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                <Navigation className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Düzgün Marşrut Planlaması")}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Optimal marşrut və tıxacların nəzərə alınması vaxta qənaət edir və daşınmanın vaxtında tamamlanmasını təmin edir.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t("Peşəkar İşçi Heyəti")}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Təlim keçmiş fəhlə və mebel ustaları işi daha tez və səliqəli tamamlayaraq həm vaxtınızı, həm də əsəblərinizi qoruyur.")}</p>
            </div>
          </div>
        </section>

        {/* Section 9: H2 - Niyə yukdasima.ai? */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8" aria-label={t("Üstünlüklərimiz")}>
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{t("Etibarlı Xidmət Standartları")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{t("Niyə yukdasima.ai?")}</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{t("Müasir texnoloji imkanları peşəkar daşıma təcrübəsi ilə birləşdirərək aşağıdakı real üstünlükləri təqdim edirik:")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">{t("Onlayn İlkin Hesablamalar")}</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{t("Ünvanları daxil edərək və ya əşyaların şəkillərini yükləyərək AI analizi ilə qiyməti və lazımi avtomobili dərhal onlayn öyrənin.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">{t("Müxtəlif Ölçülü Yük Avtomobilləri")}</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{t("2 metrlik Ford Transit-dən 7 metrlik böyük furqonlaradək təmiz və baxımlı nəqliyyat vasitələri.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Navigation className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">{t("Bakı və Region Marşrutları")}</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{t("Bakı və Abşeronun bütün əraziləri, eləcə də respublikanın 80-dən çox şəhər və rayonuna fasiləsiz daşıma.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">{t("Məlumat Əsasında Uyğun Seçim")}</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{t("Yükün növü və həcmi nəzərə alınaraq ən uyğun avtomobil ölçüsü və lazımi fəhlə sayı təyin olunur.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">{t("Sürətli Sifariş Kanalları")}</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {t(CONTACT_INFO.PRIMARY_PHONE_DISPLAY)}{t(" əlaqə nömrəsi, WhatsApp və saytdan bir kliklə geri zəng sifarişi ilə operativ dispetçer dəstəyi.")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">{t("Təhlükəsiz Daşıma Zəmanəti")}</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{t("Əşyaların qoruyucu plyonkalarla qablaşdırılması və qapalı yük bölməsində xüsusi kəmərlərlə möhkəm bərkidilməsi.")}</p>
            </div>
          </div>
        </section>

        {/* Section 10: H2 - Tez-tez verilən suallar (Visible FAQ Accordion) */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label={t("Tez-tez verilən suallar")}>
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>{t("Məlumat Mərkəzi")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t("Tez-tez verilən suallar")}</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{t("Yükdaşıma xidməti, qiymətlər, fəhlə və mebel ustası sifarişi ilə bağlı ən çox verilən sualların cavabları:")}</p>
          </div>

          <div className="space-y-3 max-w-4xl">
            {YUKDASIMA_FAQS.map((faq, index) => {
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
                    className="w-full flex items-center justify-between p-5 text-left bg-slate-50 hover:bg-slate-100 transition-colors gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {t(faq.question)}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {/* Answer stays in the HTML (visible to search engines) and is only hidden when closed */}
                  <div hidden={!isOpen} className="p-5 bg-white border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed space-y-2">
                    <p>{t(faq.answer)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 10: Baku Districts GEO / AI Search Optimization (Batch 2) */}
        <BakuDistrictsGeoSection
          defaultMode="yukdasima"
          onOpenCallback={onOpenCallback}
        />

        {/* Section 11: Complete Regional Directory by Economic Regions */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label={t("Bölgələr üzrə yükdaşıma marşrutları")}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                <Navigation className="w-4 h-4" />
                <span>{t("İqtisadi Rayonlar və Nəqliyyat Dəhlizləri")}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t("Bölgələr üzrə yükdaşıma kataloqu")}</h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">{t("Bakıdan Azərbaycanın bütün iqtisadi rayonlarına, şəhər və qəsəbələrinə rəsmi tariflərlə yükdaşıma xidməti. Marşrutu seçərək tələblərinizə uyğun təklif alın.")}</p>
            </div>
            <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-2 rounded-xl shrink-0">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{t(regionalRoutes.length)}{t(" Marşrut")}</span>
            </span>
          </div>

          <div className="space-y-10">
            {ECONOMIC_REGION_GROUPS.map((group) => {
              const groupRoutes = group.destinationSlugs
                .map((slug) => regionalRoutes.find((r) => r.slug === slug))
                .filter((r): r is typeof regionalRoutes[0] => !!r);

              if (groupRoutes.length === 0) return null;

              return (
                <div key={group.id} className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-slate-100">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                        {t(group.name)}
                      </h3>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {t(group.description)} • <span className="text-blue-600 font-medium">{t(group.corridor)}</span>
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      {t(groupRoutes.length)}{t(" istiqamət")}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
                    {groupRoutes.map((r) => (
                      <Link
                        key={r.slug}
                        href={r.routePath}
                        className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200/70 hover:border-blue-300 transition-all group flex flex-col justify-between gap-1.5"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-slate-800 group-hover:text-blue-700 text-xs sm:text-sm transition-colors truncate">
                            {t(r.destination)}
                          </span>
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/50">
                          <span>{t(r.distanceKm ? `${r.distanceKm} km` : 'Rayon')}</span>
                          <span className="font-extrabold text-blue-600 group-hover:text-blue-700">{t("Qiyməti öyrən")}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 12: Related Internal Links Navigation */}
        <section className="space-y-6" aria-label={t("Əlaqəli Xidmətlər və Keçidlər")}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{t("Əlaqəli Daşıma və Evakuasiya Xidmətləri")}</h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">{t("Digər ixtisaslaşmış xidmətlərimizlə və tariflərlə tanış olun:")}</p>
            </div>
            <Link
              href="/elaqe"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              <span>{t("Bizimlə əlaqə")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/evden-eve-yukdasima"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>{t("Evdən Evə Yükdaşıma")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">{t("Mənzil və bağ evlərinin tam qablaşdırma və köçürülmə xidməti.")}</p>
            </Link>

            <Link
              href="/mebel-dasinmasi"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>{t("Mebel Daşınması & Usta")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">{t("Mebellərin sökülməsi, qablaşdırılması, daşınması və quraşdırılması.")}</p>
            </Link>

            <Link
              href="/ofis-dasinmasi"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>{t("Ofis Daşınması")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">{t("Şirkət avadanlıqlarının və arxivlərin fasiləsiz iş qrafiki ilə köçürülməsi.")}</p>
            </Link>

            <Link
              href="/yuk-masini"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>{t("Yük Maşını Sifarişi")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">{t("Ford Transit və İsuzu yük maşınlarının sərfəli şərtlərlə icarəsi.")}</p>
            </Link>

            <Link
              href="/fehle-xidmeti"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>{t("Fəhlə Xidməti")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">{t("Yükləmə, boşaltma və mərtəbəyə qaldırma üçün təcrübəli fəhlə briqadası.")}</p>
            </Link>

            <Link
              href="/qiymetler"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>{t("Şəffaf Qiymətlər & Tariflər")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">{t("Bakı və bütün rayonlar üzrə rəsmi və sabit tarif cədvəli.")}</p>
            </Link>

            <Link
              href="/evakuator"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>{t("24/7 Evakuator Xidməti")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">{t("Operativ evakuator və 24/7 texniki yardım xidməti.")}</p>
            </Link>

            <Link
              href="/elaqe"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>{t("Əlaqə & Zəng Sifarişi")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">{t(CONTACT_INFO.PRIMARY_PHONE_DISPLAY)}{t(" nömrəsi, WhatsApp və operativ geri zəng sifarişi.")}</p>
            </Link>
          </div>
        </section>

        {/* Section 13: Bottom Call to Action Banner */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white shadow-md text-center space-y-6" aria-label={t("Sürətli Sifariş Çağırışı")}>
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{t("Yükdaşıma Xidməti Üçün Dərhal Əlaqə Saxlayın")}</h2>
            <p className="text-blue-100 text-xs sm:text-base leading-relaxed">{t("Mənzil, ofis və ya mebellərinizin təhlükəsiz daşınması üçün bizə zəng edin və ya onlayn geri zəng sifarişi göndərin. Komandamız 20 dəqiqə ərzində xidmətinizdədir!")}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={CONTACT_INFO.PRIMARY_PHONE_TEL}
              aria-label={t(`${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsinə zəng et`)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-extrabold text-sm shadow-sm transition-all"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>{t("Zəng et: ")}{t(CONTACT_INFO.PRIMARY_PHONE_DISPLAY)}</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenCallback()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm border border-blue-400/30 shadow-sm transition-all cursor-pointer"
            >
              <span>{t("Operator Sizi Yığsın")}</span>
            </button>
          </div>
        </section>
      </div>
    </article>
  );
};
