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
  Package,
  Users,
  PhoneCall,
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
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { YUKDASIMA_FAQS } from '../seo/metadata';
import { getAllApprovedYukdasimaRoutes } from '../seo/routeRegistry';
import { ECONOMIC_REGION_GROUPS } from '../seo/regionalData';

interface YukdasimaPageProps {
  onOpenCallback: (phone?: string) => void;
}

export const YukdasimaPage: React.FC<YukdasimaPageProps> = ({ onOpenCallback }) => {
  const regionalRoutes = getAllApprovedYukdasimaRoutes();
  const sortedAzRoutes = [...regionalRoutes].sort((a, b) =>
    a.destination.localeCompare(b.destination, 'az')
  );

  const groupedAzRoutes = sortedAzRoutes.reduce((acc, route) => {
    const letter = route.destination.charAt(0).toLocaleUpperCase('az');
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(route);
    return acc;
  }, {} as Record<string, typeof sortedAzRoutes>);

  // State for active FAQ accordion items (first two expanded by default for best user engagement)
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0, 1]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
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
            <li className="font-semibold text-slate-800" aria-current="page">
              Yükdaşıma
            </li>
          </ol>
        </nav>

        {/* Primary Page Header with the single H1 */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <Truck className="w-4 h-4" />
            <span>Bakı və Azərbaycan Üzrə Peşəkar Xidmət</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Bakı Yükdaşıma Xidməti və Qiymətləri
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Bakı, Abşeron və Azərbaycan rayonları üzrə təhlükəsiz və operativ <strong>yükdaşıma xidməti</strong>. Mənzil köçürülməsi, mebel daşınması, ofis daşınması və yük maşını sifarişi üçün ən sərfəli və şəffaf qiymətlər.
          </p>

          {/* Quick Hotline and WhatsApp Action Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={CONTACT_INFO.HOTLINE_TEL}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-xs transition-colors"
              title="Qaynar xəttə zəng et"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Qaynar Xətt: {CONTACT_INFO.HOTLINE_NUMBER}</span>
            </a>

            <a
              href={CONTACT_INFO.WHATSAPP_URL_BASE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs transition-colors"
              title="WhatsApp vasitəsilə yaz"
            >
              <span>WhatsApp ilə Sifariş</span>
            </a>
          </div>
        </header>

        {/* Section 1: Embedded Price Calculator & AI Volume Estimator */}
        <section
          id="yukdasima-calculator-section"
          aria-label="Yükdaşıma Qiymətləri Kalkulyatoru və Sifariş"
          className="space-y-4"
        >
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-200 text-xs font-semibold uppercase tracking-wide">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Onlayn Qiymətləndirmə</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Yükdaşıma Qiymətini Dərhal Hesablayın
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                  Ünvanları daxil edərək və ya əşyaların şəkillərini yükləyərək süni intellekt analizi ilə yükün həcmini və <strong>yükdaşıma qiymətlərini</strong> saniyələr ərzində dəqiq hesablayın.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenCallback()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-sm shadow-sm transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-blue-600" />
                  <span>Geri Zəng Sifarişi</span>
                </button>
              </div>
            </div>

            {/* Embedded Full Interactive Estimator */}
            <div className="pt-2">
              <YukdasimaEstimator onOpenCallback={onOpenCallback} />
            </div>
          </div>
        </section>

        {/* Section 2: H2 - Yükdaşıma xidməti necə işləyir? */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label="Xidmət Prosesi">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Sadə və Rahat 4 Addım</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Yükdaşıma xidməti necə işləyir?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              yukdasima.ai platforması ilə <strong>yük daşıma</strong> sifarişi vermək və daşınmanı həyata keçirmək son dərəcə operativ və şəffafdır:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Qiymət və Həcm Hesablama</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Kalkulyatorda çıxış və çatdırılma ünvanını seçin və ya əşyaların şəkillərini yükləyərək AI vasitəsilə ən uyğun yük maşını ölçüsünü və ilkin qiyməti müəyyən edin.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Sifarişin Təsdiqi</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Dispetçerimiz sizinlə dərhal əlaqə saxlayır, daşınma vaxtını, tələb olunan fəhlə və usta sayını dəqiqləşdirərək ən yaxın yük maşınını istiqamətləndirir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Qablaşdırma və Yükləmə</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Peşəkar ustalarımız mebelləri səliqəli sökür, qoruyucu plyonkalarla qablaşdırır və fəhlə briqadası əşyaları təhlükəsiz şəkildə yük avtomobilinə bərkidir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Çatdırılma və Quraşdırma</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Yüklər yeni ünvana çatdırılır, mərtəbəyə qaldırılır, mebellər yenidən yığılaraq mənzildə və ya ofisdə arzuladığınız qaydada təhvil verilir.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: H2 - Yükdaşıma qiymətləri necə hesablanır? */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label="Qiymət Hesablama Qaydaları">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <BadgePercent className="w-4 h-4" />
              <span>Şəffaf Tariflər</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Yükdaşıma qiymətləri necə hesablanır?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Müştərilərimiz üçün <strong>ucuz yükdaşıma</strong> və şəffaf qiymət siyasəti əsas prinsipimizdir. Qiymətləndirmə zamanı heç bir gizli xərc əlavə olunmur və məbləğ aşağıdakı əsas amillər əsasında formalaşır:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Məsafə və Marşrut (Kilometraj)</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Bakı şəhərdaxili marşrutlarda (məsələn, Yasamal, Nəsimi, Nərimanov, Xətai) sabit başlanğıc tarifləri, şəhərətrafı qəsəbələrə (Xırdalan, Sumqayıt, Mərdəkan, Şüvəlan) və rayonlara isə kilometraj üzrə hesablanmış sərfəli tariflər tətbiq olunur.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Yük Maşınının Tutumu və Növü</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Yükün həcminə uyğun olaraq 2 metrlik yığcam Ford Transit (tək mebel və az sayda əşyalar), 3–4 metrlik standart furqonlar və ya 5–7 metrlik böyük həcmli yük maşınları seçilir. Doğru maşın seçimi xərclərinizi 30%-dək azaldır.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Fəhlə Sayı və Mərtəbə Şərtləri</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Daşınacaq əşyaların sayına görə 2, 3 və ya 4 nəfərlik peşəkar fəhlə briqadası cəlb edilir. Binalarda yük liftinin olması və ya pilləkənlə qaldırılma mərtəbələri nəzərə alınaraq dəqiq məbləğ bildirilir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Mebel Ustası və Qablaşdırma</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Qarderob, yataq mebeli və mətbəx şkaflarının peşəkar usta tərəfindən sökülüb yenidən quraşdırılması, həmçinin xüsusi qablaşdırma materialları (streç, hava qabarcıqlı plyonka, kardon qutular) qiymətləndirməyə daxil edilə bilər.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-blue-900 text-xs sm:text-sm">
              Bütün xidmət növləri və istiqamətlər üzrə rəsmi cədvəllə tanış olmaq istəyirsiniz?
            </p>
            <Link
              href="/qiymetler"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-colors whitespace-nowrap"
            >
              <span>Şəffaf Qiymətlər Cədvəli</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Section 4: Deep Specific Moving Services (H2s for Evdən Evə, Mebel, Ofis) */}
        <section className="space-y-8" aria-label="Xüsusi Yükdaşıma İstiqamətləri">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Peşəkar Daşıma İstiqamətlərimiz
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Müxtəlif tələblərə uyğun ixtisaslaşmış komandalarımızla hər növ daşınma xidmətini yüksək keyfiyyət zəmanəti ilə həyata keçiririk:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Evdən Evə Yükdaşıma Block */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Home className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Evdən evə yükdaşıma
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Mənzil və bağ evlərinin köçürülməsi böyük diqqət və məsuliyyət tələb edir. <strong>Evdən evə yükdaşıma</strong> xidmətimiz çərçivəsində bütün mebellər, məişət texnikası (soyuducu, paltaryuyan, televizor) və kövrək qab-qacaqlar xüsusi qablaşdırılır və yeni ünvana zədələnmədən çatdırılır.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Mənzil əşyalarının tam çeşidlənməsi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Mərtəbələrə qaldırma və endirmə</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Təhlükəsiz və səliqəli daşıma</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/evden-eve-yukdasima"
                className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-blue-700 font-bold text-xs sm:text-sm transition-all group"
              >
                <span>Evdən evə daşıma haqqında ətraflı</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mebel Daşınması Block */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Wrench className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Mebel daşınması
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Böyük qabaritli qonaq, yataq və mətbəx mebellərinin daşınması üçün peşəkar usta dəstəyi vacibdir. <strong>Mebel daşınması</strong> prosesində mebelləriniz cızılmadan və zədələnmədən sökülür, xüsusi materiallarla qablaşdırılır və yeni mənzildə dəqiqliklə yığılır.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Təcrübəli mebel ustası xidməti</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Qoruyucu plyonka ilə qablaşdırma</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Yeni mənzildə montaj və təhvil</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/mebel-dasinmasi"
                className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-blue-700 font-bold text-xs sm:text-sm transition-all group"
              >
                <span>Mebel ustası və daşıma xidməti</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Ofis Daşınması Block */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Ofis daşınması
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Şirkətlər və təşkilatlar üçün iş prosesini dayandırmadan operativ <strong>ofis daşınması</strong> təşkil edirik. Kompüter avadanlıqları, serverlər, sənəd qutuları və ofis masaları xüsusi etiketlənərək təhlükəsiz köçürülür.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ofis texnikasının təhlükəsiz daşınması</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Arxiv və sənədlərin qutulanması</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Qeyri-iş saatlarında operativ köçürmə</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/ofis-dasinmasi"
                className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-blue-700 font-bold text-xs sm:text-sm transition-all group"
              >
                <span>Ofis köçürülməsi haqqında ətraflı</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5: H2 - Bakı və rayonlara yükdaşıma */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label="Xidmət Ərazisi">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Navigation className="w-4 h-4" />
              <span>Geniş Coğrafi Əhatə</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bakı və rayonlara yükdaşıma
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Xidmətimiz təkcə Bakı şəhərini deyil, bütün Abşeron yarımadasını və Azərbaycanın bütün regionlarını əhatə edir. Hər bir istiqamət üzrə operativ logistika təmin olunur:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Bakı və Abşeron Qəsəbələri</h3>
                  <p className="text-xs text-slate-500">20-30 dəqiqə ərzində sürətli maşın təminatı</p>
                </div>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Yasamal, Nərimanov, Nəsimi, Xətai, Binəqədi, Səbail, Nizami, Sabunçu, Suraxanı, Xəzər, Qaradağ, Pirallahı, həmçinin Xırdalan, Sumqayıt, Masazır, Saray, Mərdəkan, Şüvəlan, Bilgəh, Novxanı və digər qəsəbələrə növbətçi <strong>yük maşını</strong> və <strong>yük taksisi</strong> briqadalarımız 24/7 xidmət göstərir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Bütün Azərbaycan Rayonları</h3>
                  <p className="text-xs text-slate-500">Şəhərlərarası təhlükəsiz və rəsmi daşıma</p>
                </div>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Bakıdan Gəncə, Sumqayıt, Şəki, Quba, Qusar, Xaçmaz, Lənkəran, Astara, Şamaxı, İsmayıllı, Qəbələ, Mingəçevir, Bərdə, Şəmkir və digər rayonlara, eləcə də əks istiqamətdə kommersiya və fərdi yüklərin etibarlı daşınması həyata keçirilir.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/yuk-masini"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-colors"
            >
              <Truck className="w-4 h-4" />
              <span>Yük Maşını Avtoparkımız</span>
            </Link>

            <Link
              href="/evakuasiya"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors"
            >
              <span>24/7 Evakuasiya Xidməti</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </Link>
          </div>
        </section>

        {/* Section 6: H2 - Niyə yukdasima.ai? */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8" aria-label="Üstünlüklərimiz">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Texnoloji Üstünlük</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Niyə yukdasima.ai?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Müasir texnologiyaları peşəkar logistika təcrübəsi ilə birləşdirərək <strong>Bakı yükdaşıma</strong> sahəsində ən yüksək xidmət səviyyəsini təqdim edirik:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">Süni İntellektlə Həcm Təyini</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Mənzildəki əşyaların şəklini yükləyərək AI vasitəsilə ən optimal maşın növünü və lazımi fəhlə sayını heç bir təxmin olmadan dərhal müəyyən edin.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <BadgePercent className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">Şəffaf və Rəsmi Tariflər</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Sifarişdən əvvəl hesablanan qiymət son qiymətdir. Daşınma zamanı heç bir gözlənilməz əlavə ödəniş və ya gizli xərc tələb olunmur.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">20 Dəqiqə Ərzində Ünvanda</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Bakının hər nöqtəsində fəaliyyət göstərən geniş avtoparkımız sayəsində təcili sifarişlərdə avtomobillər ən qısa müddətdə ünvana çatır.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">Əşyalara 100% Zəmanət</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Hər bir əşyanız peşəkar qablaşdırma ilə qorunur və yük bölməsində xüsusi kəmərlərlə möhkəm bərkidilərək təhlükəsiz çatdırılır.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">Məsuliyyətli Heyət</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Təcrübəli mebel ustaları və daimi təlim keçmiş, fiziki cəhətdən hazırlıqlı fəhlə briqadalarımızla yüksək keyfiyyətli xidmət göstəririk.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">878 Qaynar Xətt və Dəstək</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Günün istənilən saatında suallarınızı cavablandırmağa və operativ sifarişlərinizi qəbul etməyə hazır 24/7 çağrı mərkəzimiz mövcuddur.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: H2 - Tez-tez verilən suallar (FAQ) */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label="Tez-tez verilən suallar">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Məlumat Mərkəzi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tez-tez verilən suallar
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Yükdaşıma xidməti, qiymətlər, fəhlə və mebel ustası sifarişi ilə bağlı ən çox verilən sualların cavabları:
            </p>
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

        {/* Section 8: Regional Intercity Cargo Routes */}
        <section className="space-y-6" aria-label="Bakıdan Rayonlara Populyar Yükdaşıma Marşrutları">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Rayonlararası Xətlər</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Bakıdan Rayonlara Yükdaşıma Marşrutları
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Azərbaycanın bütün bölgələrinə rəsmi sabit tariflərlə yükdaşıma xidməti:
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
              {regionalRoutes.length} Təsdiqlənmiş Marşrut
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {regionalRoutes.slice(0, 16).map((r) => {
              const rValidPrices = Object.values(r.prices).filter((p): p is number => typeof p === 'number' && p > 0);
              const rMinPrice = rValidPrices.length > 0 ? Math.min(...rValidPrices) : null;

              return (
                <Link
                  key={r.slug}
                  href={r.routePath}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all group block space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600">Bakı → {r.destination}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
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

        {/* Section 9: Complete Regional Directory by Economic Regions */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label="Bölgələr üzrə yükdaşıma marşrutları">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                <Navigation className="w-4 h-4" />
                <span>İqtisadi Rayonlar və Nəqliyyat Dəhlizləri</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Bölgələr üzrə yükdaşıma kataloqu
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
                Bakıdan Azərbaycanın bütün iqtisadi rayonlarına, şəhər və qəsəbələrinə rəsmi tariflərlə yükdaşıma xidməti. Marşrutu seçərək tələblərinizə uyğun təklif alın.
              </p>
            </div>
            <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-2 rounded-xl shrink-0">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{regionalRoutes.length} Marşrut</span>
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
                        {group.name}
                      </h3>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {group.description} • <span className="text-blue-600 font-medium">{group.corridor}</span>
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      {groupRoutes.length} istiqamət
                    </span>
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
                            {r.destination}
                          </span>
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/50">
                          <span>{r.distanceKm ? `${r.distanceKm} km` : 'Rayon'}</span>
                          <span className="font-extrabold text-blue-600 group-hover:text-blue-700">
                            Qiyməti öyrən
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 10: Related Internal Links Navigation */}
        <section className="space-y-6" aria-label="Əlaqəli Xidmətlər və Keçidlər">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Əlaqəli Daşıma və Evakuasiya Xidmətləri</h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">Digər ixtisaslaşmış xidmətlərimizlə və tariflərlə tanış olun:</p>
            </div>
            <Link
              href="/elaqe"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              <span>Bizimlə əlaqə</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/evden-eve-yukdasima"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Evdən Evə Yükdaşıma</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Mənzil və bağ evlərinin tam qablaşdırma və köçürülmə xidməti.</p>
            </Link>

            <Link
              href="/mebel-dasinmasi"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Mebel Daşınması & Usta</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Mebellərin sökülməsi, qablaşdırılması, daşınması və quraşdırılması.</p>
            </Link>

            <Link
              href="/ofis-dasinmasi"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Ofis Daşınması</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Şirkət avadanlıqlarının və arxivlərin fasiləsiz iş qrafiki ilə köçürülməsi.</p>
            </Link>

            <Link
              href="/yuk-masini"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Yük Maşını Sifarişi</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Ford Transit və İsuzu yük maşınlarının sərfəli şərtlərlə icarəsi.</p>
            </Link>

            <Link
              href="/fehle-xidmeti"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Fəhlə Xidməti</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Yükləmə, boşaltma və mərtəbəyə qaldırma üçün təcrübəli fəhlə briqadası.</p>
            </Link>

            <Link
              href="/qiymetler"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Şəffaf Qiymətlər & Tariflər</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Bakı və bütün rayonlar üzrə rəsmi və sabit tarif cədvəli.</p>
            </Link>

            <Link
              href="/evakuasiya"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>24/7 Evakuasiya Xidməti</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Operativ evakuator və 24/7 texniki yardım xidməti.</p>
            </Link>

            <Link
              href="/elaqe"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Əlaqə & Zəng Sifarişi</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">878 Qaynar xətt, WhatsApp və operativ geri zəng sifarişi.</p>
            </Link>
          </div>
        </section>

        {/* Section 9: Bottom Call to Action Banner */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white shadow-md text-center space-y-6" aria-label="Sürətli Sifariş Çağırışı">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Yükdaşıma Xidməti Üçün Dərhal Əlaqə Saxlayın
            </h2>
            <p className="text-blue-100 text-xs sm:text-base leading-relaxed">
              Mənzil, ofis və ya mebellərinizin təhlükəsiz daşınması üçün bizə zəng edin və ya onlayn geri zəng sifarişi göndərin. Komandamız 20 dəqiqə ərzində xidmətinizdədir!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={CONTACT_INFO.HOTLINE_TEL}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-extrabold text-sm shadow-sm transition-all"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>Qaynar Xətt: {CONTACT_INFO.HOTLINE_NUMBER}</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenCallback()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm border border-blue-400/30 shadow-sm transition-all"
            >
              <span>Operator Sizi Yığsın</span>
            </button>
          </div>
        </section>
      </div>
    </article>
  );
};
