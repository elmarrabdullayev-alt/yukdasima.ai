import React, { useState } from 'react';
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
  Sparkles,
  Calculator,
  HelpCircle,
  BadgePercent,
  Layers,
  Navigation,
  Wrench,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { generateWhatsAppLink } from '../utils/calculator';
import { EVAKUASIYA_FAQS } from '../seo/metadata';
import { getAllApprovedEvakuatorRoutes } from '../seo/routeRegistry';
import { ECONOMIC_REGION_GROUPS } from '../seo/regionalData';
import { lookupEvacuatorTariff } from '../services/tariffService';

import { CallbackInitialData } from '../types';

interface EvakuasiyaPageProps {
  onOpenCallback: (initialData?: string | CallbackInitialData) => void;
}

export const EvakuasiyaPage: React.FC<EvakuasiyaPageProps> = ({ onOpenCallback }) => {
  const evacRoutes = getAllApprovedEvakuatorRoutes();
  const sortedAzEvacRoutes = [...evacRoutes].sort((a, b) =>
    a.destination.localeCompare(b.destination, 'az')
  );

  const groupedAzEvacRoutes = sortedAzEvacRoutes.reduce((acc, route) => {
    const letter = route.destination.charAt(0).toLocaleUpperCase('az');
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(route);
    return acc;
  }, {} as Record<string, typeof sortedAzEvacRoutes>);

  // State for active FAQ accordion items (first two expanded by default for smooth UX)
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0, 1]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleWhatsApp = () => {
    window.open(generateWhatsAppLink('Salam, təcili evakuator xidmətinə ehtiyacım var.'), '_blank');
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
              Evakuasiya
            </li>
          </ol>
        </nav>

        {/* Primary Page Header with the single H1 */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold">
            <Car className="w-4 h-4" />
            <span>24/7 Təcili Evakuator Xidməti</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Bakı Evakuator Xidməti və Qiymətləri
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Bakı şəhəri, Abşeron yarımadası və bütün Azərbaycan rayonları üzrə 24/7 operativ <strong>evakuator xidməti</strong>. Sərfəli rəsmi tariflər, təhlükəsiz avtomobil daşıma və 15–20 dəqiqə ərzində ünvana operativ çatma.
          </p>

          {/* Quick Hotline and WhatsApp Action Buttons */}
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
              title="WhatsApp vasitəsilə yaz"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp ilə Sifariş</span>
            </button>
          </div>
        </header>

        {/* Section 1: Embedded Interactive Evakuasiya Estimator */}
        <section
          id="evakuasiya-calculator-section"
          aria-label="Evakuator Qiymət Kalkulyatoru və Sifariş"
          className="space-y-4"
        >
          <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-200 text-xs font-semibold uppercase tracking-wide">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Onlayn Qiymət Hesablama</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Evakuator Qiymətini Dərhal Hesablayın
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                  Çıxış və çatdırılma ünvanını daxil edərək, avtomobilin tipini seçin və rəsmi tarif bazamız əsasında <strong>evakuator qiymətlərini</strong> dərhal onlayn öyrənin.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenCallback()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-sm shadow-sm transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Operator Zəngi Sifariş Et</span>
                </button>
              </div>
            </div>

            {/* Embedded Full Interactive Evakuasiya Estimator */}
            <div className="pt-2">
              <EvakuasiyaEstimator onOpenCallback={onOpenCallback} />
            </div>
          </div>
        </section>

        {/* Section 2: H2 - Evakuator xidməti necə işləyir? */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label="Xidmət Prosesi">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Sadə və Şəffaf Proses</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Evakuator xidməti necə işləyir?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Yolda nasazlıq və ya qəza baş verdikdə peşəkar <strong>evakuasiya xidməti</strong> almaq bir neçə sadə addımdan ibarətdir:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Məlumatın Qəbulu</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Kalkulyatorda ünvanları seçin və ya qaynar xəttimizə zəng edərək avtomobilin markasını, yerləşdiyi ünvanı və texniki vəziyyətini bildirin.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Növbətçi Təyini</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Dispetçerimiz dərhal ən yaxın ərazidəki növbətçi evakuatoru təyin edir və sürücü 15–20 dəqiqə ərzində ünvanınıza istiqamətlənir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Təhlükəsiz Yükləmə</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Hidravlik sürüşən platforma və etibarlı bərkitmə kəmərləri vasitəsilə avtomobiliniz heç bir zədə almadan platformaya qaldırılır və bərkidilir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Təyinat Yerinə Çatdırılma</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Avtomobiliniz göstərdiyiniz ünvana, rəsmi servis mərkəzinə və ya fərdi qaraja təhlükəsiz çatdırılaraq səliqəli şəkildə boşaldılır.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: H2 - Evakuator qiymətləri necə hesablanır? */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label="Qiymət Hesablama Qaydaları">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <BadgePercent className="w-4 h-4" />
              <span>Şəffaf və Rəsmi Tariflər</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Evakuator qiymətləri necə hesablanır?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Müştərilərimiz üçün <strong>ucuz evakuator</strong> və tam şəffaf qiymətləndirmə təmin edirik. Daşınma haqqı heç bir gözlənilməz artım olmadan aşağıdakı real meyarlar əsasında hesablanır:
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
                Bakı şəhərdaxili marşrutlar üzrə operativ və sərfəli başlanğıc tarifi, şəhərətrafı qəsəbələrə və Azərbaycan rayonlarına isə rəsmi bazamızdakı dəqiq kilometraj əsasında sərfəli qiymətlər tətbiq olunur.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Car className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Avtomobilin Növü və Çəkisi</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Standart sedan və hetçbeklər, daha böyük krossoverlər (SUV / Cip), geniş minivanlar və ya mikroavtobuslar üçün müvafiq yükgötürmə qabiliyyətinə malik evakuatorlar ayrılır və çəkiyə uyğun dərəcələndirilir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Təkərlərin Hərəkət Qabiliyyəti</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Təkərləri sərbəst fırlanan maşınlar adi bucurqadla asanlıqla çəkilir. Qəza və ya nasazlıq səbəbindən çarxları bloklanmış maşınlar üçün isə əlavə qaldırıcı kran və ya köməkçi təkər arabacıqları tələb olunur.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Günün Saatı və Təcililik</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Xidmətimiz günün 24 saatı və həftənin 7 günü fasiləsiz fəaliyyət göstərir. Gecə və ya gündüz sifarişlərində qiymətlər rəsmi tarif cədvəlinə tam uyğun olaraq qabaqcadan bildirilir.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-blue-900 text-xs sm:text-sm">
              Bütün rayonlar və xidmət növləri üzrə rəsmi tarif cədvəlinə baxmaq istəyirsiniz?
            </p>
            <Link
              href="/qiymetler"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-colors whitespace-nowrap"
            >
              <span>Şəffaf Tariflər Cədvəli</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Section 4: H2 - Bakı daxilində evakuator xidməti */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label="Bakı Daxili Evakuasiya">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Paytaxt və Abşeron Ərazisi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bakı daxilində evakuator xidməti
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Bakının bütün inzibati rayonlarında və sıx hərəkətli prospektlərində növbətçi <strong>Bakı evakuator</strong> briqadalarımız gecə-gündüz fəaliyyət göstərir:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Mərkəzi Rayonlar</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Yasamal, Nəsimi, Səbail, Nərimanov və Xətai rayonları üzrə sıx tıxaclarda belə 15–20 dəqiqəyə operativ yaxınlaşma.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Şimal və Qərb Əraziləri</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Binəqədi, Biləcəri, Xırdalan, Masazır, Sulutəpə və Saray qəsəbələrində növbətçi evakuasiya avtomobilləri.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Şərq və Cənub Əraziləri</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Nizami, Sabunçu, Suraxanı, Xəzər (Mərdəkan, Şüvəlan, Hava Limanı) və Qaradağ (Lökbatan, Səngəçal) istiqamətləri.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: H2 - Bakıdan rayonlara evakuator */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label="Rayonlara Evakuator">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Navigation className="w-4 h-4" />
              <span>Şəhərlərarası və Rayonlararası</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bakıdan rayonlara evakuator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Bakıdan Azərbaycanın bütün bölgələrinə və əksinə — rayonlardan paytaxta avtomobillərin təhlükəsiz və rəsmi tariflərlə daşınması təmin edilir:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Navigation className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Qərb və Mərkəzi Magistrallar</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Bakı – Gəncə, Mingəçevir, Yevlax, Şəmkir, Tovuz, Qazax, Bərdə, Ağdam, Ağdaş, Göyçay, Ucar, Kürdəmir və Hacıqabul marşrutları üzrə rəsmi kilometraj tarifi ilə <strong>avtomobil evakuatoru</strong> təminatı.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Navigation className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Şimal və Cənub Marşrutları</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Bakı – Sumqayıt, Quba, Qusar, Xaçmaz, Şabran, Siyəzən, eləcə də Şamaxı, İsmayıllı, Qəbələ, Şəki, Zaqatala, Salyan, Biləsuvar, Cəlilabad, Masallı, Lənkəran və Astara istiqamətləri.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: H2 - Hansı avtomobillər daşına bilər? */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label="Daşına Bilən Nəqliyyat Vasitələri">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hansı avtomobillər daşına bilər?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Müasir texniki bazamız və fərqli daşıma gücünə malik evakuatorlarımızla geniş kateqoriyalı nəqliyyat vasitələrinə xidmət göstəririk:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="text-3xl">🚗</div>
              <h3 className="font-bold text-slate-900 text-lg">Sedan və Hetçbek</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Bütün növ minik avtomobillərinin şəhərdaxili və şəhərlərarası operativ və təhlükəsiz daşınması.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="text-3xl">🚙</div>
              <h3 className="font-bold text-slate-900 text-lg">SUV və Krossoverlər</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Ağır çəkili və tam ötürücülü (4x4) ciplərin gücləndirilmiş platforma ilə etibarlı evakuasiyası.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="text-3xl">🚐</div>
              <h3 className="font-bold text-slate-900 text-lg">Minivan və Mikroavtobus</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Sprinter, Vito, Ford Transit kimi uzun bazalı və hündür kommersiya nəqliyyatının daşınması.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="text-3xl">🛠️</div>
              <h3 className="font-bold text-slate-900 text-lg">Qəzalı və Nasaz Nəqliyyat</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Təkəri kilidlənmiş, mühərriki işə düşməyən və ya qəzaya uğramış nəqliyyat vasitələrinin xüsusi avadanlıqla daşınması.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: H2 - Evakuator sifarişi necə verilir? */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label="Sifariş Qaydaları">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Evakuator sifarişi necə verilir?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Təcili və ya planlaşdırılmış <strong>avtomobil daşıma</strong> üçün sizə ən uyğun əlaqə kanalını seçə bilərsiniz:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">878 Qaynar Xətt</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Günün 24 saatı zəng edərək operatorumuza ünvanı və nasazlığı bildirin. Növbətçi maşın dərhal yola düşsün.
              </p>
              <a
                href={CONTACT_INFO.HOTLINE_TEL}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900"
              >
                <span>Zəng et: {CONTACT_INFO.HOTLINE_NUMBER}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">WhatsApp Lokasiya</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Yol kənarında dəqiq ünvanı bilmədikdə canlı yerləşmə (location) göndərərək ən sürətli dəstəyi əldə edin.
              </p>
              <button
                onClick={handleWhatsApp}
                type="button"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
              >
                <span>WhatsApp ilə Yaz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Onlayn Kalkulyator</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Səhifənin yuxarı hissəsindəki kalkulyatordan istifadə edərək qiyməti hesablayın və bir kliklə geri zəng sifariş edin.
              </p>
              <button
                onClick={() => onOpenCallback()}
                type="button"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer"
              >
                <span>Geri zəng sifarişi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Section 8: H2 - Niyə yukdasima.ai? */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8" aria-label="Üstünlüklərimiz">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Etibarlı Xidmət Standartları</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Niyə yukdasima.ai?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Yolda qaldığınız zaman operativlik və etibarlılıq ən mühüm amildir. Platformamız sizə aşağıdakı real üstünlükləri təqdim edir:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">15–20 Dəqiqəyə Ünvanda</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Bakı və Abşeron ərazisindəki növbətçi məntəqələrimiz sayəsində çağırış daxil olan kimi ən yaxın avtomobil operativ yönləndirilir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <BadgePercent className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">Şəffaf Tarif Zəmanəti</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Sifariş zamanı bildirilən qiymət sondur. Daşınma başa çatdıqdan sonra heç bir gözlənilməz əlavə xərc tələb edilmir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">Təhlükəsiz Hidravlik Platforma</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Alçaq asqılı (low clearance) sport və ya lüks avtomobillərin belə bamper və asqı sistemləri zədələnmədən səliqəli yüklənməsi.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">7/24 Fasiləsiz Qaynar Xətt</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Günün və gecənin istənilən saatında hava şəraitindən asılı olmayaraq fasiləsiz çağrı qəbulu və texniki kömək.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Navigation className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">Bütün Azərbaycan Rayonları</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Təkcə Bakıda deyil, regionlararası bütün magistral yollarda uzaq məsafəli təhlükəsiz avtomobil daşıma.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg">Təcrübəli Sürücü Heyəti</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Mürəkkəb qəza şəraitlərində və çətin relyefdə nəqliyyat vasitələrini düzgün bərkitmə və idarəetmə təcrübəsinə malik peşəkarlar.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: H2 - Tez-tez verilən suallar (Visible FAQ Accordion) */}
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
              Evakuasiya xidməti, qiymətlər, təcili sifariş və texniki imkanlar haqqında ən çox verilən sualların cavabları:
            </p>
          </div>

          <div className="space-y-3 max-w-4xl">
            {EVAKUASIYA_FAQS.map((faq, index) => {
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

        {/* Section 10: Complete Regional Directory by Economic Regions */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8" aria-label="Bölgələr üzrə evakuator kataloqu">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                <Navigation className="w-4 h-4" />
                <span>İqtisadi Rayonlar və Nəqliyyat Dəhlizləri</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Bölgələr üzrə evakuator kataloqu
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
                Bakıdan və Bakıya Azərbaycanın bütün iqtisadi rayonları, şəhər və magistralları üzrə 24/7 peşəkar və operativ evakuator xidməti. İstədiyiniz istiqaməti seçərək dəqiq xidmət şərtlərini öyrənin.
              </p>
            </div>
            <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-2 rounded-xl shrink-0">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{evacRoutes.length} Marşrut</span>
            </span>
          </div>

          <div className="space-y-10">
            {ECONOMIC_REGION_GROUPS.map((group) => {
              const groupRoutes = group.destinationSlugs
                .map((slug) => evacRoutes.find((r) => r.slug === slug))
                .filter((r): r is typeof evacRoutes[0] => !!r);

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
                    {groupRoutes.map((r) => {
                      const tariff = lookupEvacuatorTariff(r.origin, r.destination);
                      const distance = tariff.distanceKm;

                      return (
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
                            <span>{distance ? `${distance} km` : 'Rayon'}</span>
                            <span className="font-extrabold text-blue-600 group-hover:text-blue-700">
                              Qiyməti öyrən
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 11: Crawlable Internal Links Navigation */}
        <section className="space-y-6" aria-label="Əlaqəli Xidmətlər və Keçidlər">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Əlaqəli Xidmətlər və Qiymətlər</h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">Digər ixtisaslaşmış yükdaşıma və logistika xidmətlərimizlə tanış olun:</p>
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
              href="/yukdasima"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Yükdaşıma Xidməti</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Bakı və bütün rayonlar üzrə operativ yükdaşıma xidməti və qiymətləri.</p>
            </Link>

            <Link
              href="/evden-eve-yukdasima"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Evdən Evə Yükdaşıma</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Mənzil və bağ evlərinin təhlükəsiz qablaşdırma ilə köçürülməsi.</p>
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
              <p className="text-xs text-slate-600 mt-2">Korporativ ofis və arxiv avadanlıqlarının peşəkar köçürülməsi.</p>
            </Link>

            <Link
              href="/yuk-masini"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Yük Maşını Sifarişi</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Ford Transit və İsuzu yük furqonlarının sərfəli icarəsi.</p>
            </Link>

            <Link
              href="/fehle-xidmeti"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Fəhlə Xidməti</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Yükləmə, boşaltma və mərtəbəyə qaldırma briqadası.</p>
            </Link>

            <Link
              href="/evakuator/baki-agdas"
              className="p-5 rounded-2xl bg-white border border-blue-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Bakı – Ağdaş Evakuator</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">281 km məsafəyə operativ və təhlükəsiz evakuasiya xidməti.</p>
            </Link>

            <Link
              href="/evakuator/baki-qebele"
              className="p-5 rounded-2xl bg-white border border-blue-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Bakı – Qəbələ Evakuator</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">216 km məsafəyə operativ və təhlükəsiz evakuasiya xidməti.</p>
            </Link>

            <Link
              href="/evakuator/baki-seki"
              className="p-5 rounded-2xl bg-white border border-blue-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Bakı – Şəki Evakuator</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">297 km məsafəyə operativ və təhlükəsiz evakuasiya xidməti.</p>
            </Link>

            <Link
              href="/evakuator/baki-gence"
              className="p-5 rounded-2xl bg-white border border-blue-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Bakı – Gəncə Evakuator</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">362 km məsafəyə operativ və təhlükəsiz evakuasiya xidməti.</p>
            </Link>

            <Link
              href="/qiymetler"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Şəffaf Qiymətlər & Tariflər</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">Evakuasiya və yükdaşıma üzrə rəsmi qiymətlər cədvəli.</p>
            </Link>

            <Link
              href="/elaqe"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>Əlaqə & Zəng Sifarişi</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs text-slate-600 mt-2">878 Qaynar xətt, WhatsApp və operativ geri zəng mərkəzi.</p>
            </Link>
          </div>
        </section>

        {/* Section 11: Bottom Call to Action Banner */}
        <section className="bg-gradient-to-r from-blue-600 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-md text-center space-y-6" aria-label="Sürətli Evakuator Çağırışı">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Təcili Evakuatora Ehtiyacınız Var?
            </h2>
            <p className="text-blue-100 text-xs sm:text-base leading-relaxed">
              Günün istənilən saatında bizə zəng edin və ya WhatsApp ilə yerləşmə göndərin. Növbətçi evakuatorumuz 15–20 dəqiqə ərzində yanınızda olacaq!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={CONTACT_INFO.HOTLINE_TEL}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-extrabold text-sm shadow-sm transition-all"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Qaynar Xətt: {CONTACT_INFO.HOTLINE_NUMBER}</span>
            </a>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp ilə Lokasiya Göndər</span>
            </button>
          </div>
        </section>
      </div>
    </article>
  );
};
