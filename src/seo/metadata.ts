import {
  getApprovedEvakuatorRoute,
  generateRouteSeoConfig,
  getApprovedYukdasimaRoute,
  generateYukdasimaRouteSeoConfig,
} from './routeRegistry';

export type FAQItem = PageFaqItem;

export interface PageFaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface PageSeoConfig {
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  canonicalUrl: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  schemaType?: 'WebSite' | 'Service' | 'ContactPage';
  serviceName?: string;
  serviceTypeDetail?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: PageFaqItem[];
}

export const SITE_URL = 'https://yukdasima.ai';
export const SITE_NAME = 'yukdasima.ai';

export const YUKDASIMA_FAQS: PageFaqItem[] = [
  {
    question: 'Yükdaşıma qiyməti necə hesablanır?',
    answer:
      'Yükdaşıma qiyməti daşınma məsafəsinə (Bakı şəhərdaxili və ya rayonlararası kilometraj), seçilən yük maşınının həcminə (2 metrlik Ford Transit-dən 7 metrlik böyük furqonlaradək), tələb olunan fəhlə sayına, mərtəbə/lift vəziyyətinə və əlavə xidmətlərə (mebel ustası, qablaşdırma) əsasən şəffaf şəkildə formalaşır.',
  },
  {
    question: 'Bakıda yükdaşıma sifarişi necə verilir?',
    answer:
      'Saytımızdakı onlayn kalkulyatordan marşrutu və yükün detallarını daxil edərək, 878 qaynar xəttimizə zəng edərək və ya WhatsApp vasitəsilə məkan və əşya şəkillərini göndərərək dərhal sifariş verə bilərsiniz. Dispetçerimiz sizə ən yaxın növbətçi avtomobili operativ yönləndirir.',
  },
  {
    question: 'Hansı ölçüdə yük maşını seçməliyəm?',
    answer:
      'Yük maşını əşyaların ümumi həcminə görə seçilir: tək-tək mebel və qutular üçün 2 metrlik, 1 otaqlı mənzil üçün 3 metrlik, 2–3 otaqlı mənzillər üçün 4–5 metrlik, böyük həcmli ev və ofislər üçün isə 6–7 metrlik furqonlar uyğundur. Onlayn AI kalkulyatorumuz şəkillər əsasında ən uyğun maşını dərhal təyin edir.',
  },
  {
    question: 'Fəhlə xidməti sifariş etmək mümkündür?',
    answer:
      'Bəli, sifariş zamanı tələbata uyğun olaraq 2, 3 və ya 4 nəfərlik peşəkar fəhlə briqadası cəlb edə bilərsiniz. Fəhlələrimiz əşyaların yüklənməsi, boşaldılması və mərtəbələrə təhlükəsiz qaldırılmasını həyata keçirir.',
  },
  {
    question: 'Bakıdan rayonlara yükdaşıma mümkündür?',
    answer:
      'Bəli, Bakıdan Azərbaycanın bütün şəhər və rayonlarına (Gəncə, Sumqayıt, Quba, Qəbələ, Şəki, Lənkəran və digər 80-dən çox istiqamətə) və əks istiqamətdə təhlükəsiz şəhərlərarası yükdaşıma xidməti göstəririk.',
  },
  {
    question: 'Mebel daşınması həyata keçirilirmi?',
    answer:
      'Bəli, mebel daşınması üçün xüsusi ustalarımız mövcuddur. Qarderob, yataq dəstləri və modul mebellər zədələnmədən sökülür, qoruyucu plyonkalarla qablaşdırılır, yeni ünvanda isə dəqiqliklə yenidən quraşdırılaraq təhvil verilir.',
  },
  {
    question: 'Ev köçürülməsi üçün hansı xidmətlər mövcuddur?',
    answer:
      'Evdən evə köçürülmə zamanı tam xidmət paketi təklif olunur: uyğun ölçülü qapalı yük maşını, mebellərin sökülüb-yığılması, məişət texnikasının və kövrək əşyaların qablaşdırılması, fəhlə xidməti və yeni ünvanda mərtəbəyə qaldırılma.',
  },
  {
    question: 'Yük maşınını ayrıca sifariş etmək mümkündür?',
    answer:
      'Bəli, fəhlə və ya usta xidməti tələb olunmadıqda yalnız ehtiyacınıza uyğun 2m-dən 7m-dək təmiz və qapalı yük maşınını sürücü ilə birlikdə birbaşa sifariş edə bilərsiniz.',
  },
];

export const EVAKUATOR_FAQS: PageFaqItem[] = [
  {
    question: 'Evakuator qiyməti necə hesablanır?',
    answer:
      'Evakuator qiyməti marşrut məsafəsi (Bakı şəhərdaxili və ya regionlararası kilometraj), nəqliyyat vasitəsinin növü (Sedan, Hetçbek, SUV / Cip, Minivan) və texniki vəziyyətinə (təkərlərin hərəkət qabiliyyəti) əsasən şəffaf kalkulyatorumuz vasitəsilə hesablanır.',
  },
  {
    question: 'Nasaz və ya təkəri kilidlənmiş avtomobilin daşınması fərqli qiymətləndirilirmi?',
    answer:
      'Bəli. Sükanı və təkərləri sərbəst hərəkət edən avtomobillər standart bucurqadla asanlıqla platformaya qaldırılır. Təkəri kilidlənmiş, qəzalı və ya asqı sistemi zədələnmiş maşınların təhlükəsiz yüklənməsi üçün əlavə xüsusi avadanlıq və köməkçi təkər arabacıqları tələb olunduğundan ilkin tarifə əlavə texniki xidmət haqqı (+5 AZN) tətbiq olunur.',
  },
  {
    question: 'Bakıdan regionlara evakuator sifariş etmək olar?',
    answer:
      'Bəli. Bakıdan Azərbaycanın bütün şəhər və rayonlarına (Gəncə, Quba, Qəbələ, Şəki, Lənkəran, Xaçmaz və digər 80-dən çox istiqamətə), eləcə də regionlardan Bakıya 24/7 operativ şəhərlərarası evakuator xidməti təşkil olunur.',
  },
  {
    question: 'Minivan və ya iri həcmli avtomobillər üçün evakuator qiyməti fərqlənirmi?',
    answer:
      'Bəli. Nəqliyyat vasitəsinin çəkisi və ölçüləri daşıyıcı platforma tələblərinə təsir edir. Sedan və hetçbeklərə nisbətən Minivan kateqoriyalı avtomobillər üçün tarif fərqi (+10 AZN) nəzərdə tutulur. Mikroavtobus və xüsusi texnika kimi digər böyük nəqliyyat vasitələrinin daşınma şərtləri isə operatorumuz tərəfindən fərdi dəqiqləşdirilir.',
  },
  {
    question: 'Evakuator sifarişi necə verilir?',
    answer:
      '878 Qaynar xəttimizə zəng edərək, WhatsApp vasitəsilə canlı məkan (lokasiya) göndərərək və ya saytımızdakı interaktiv kalkulyatordan geri zəng sifariş edərək dərhal evakuator çağıra bilərsiniz. Operatorumuz sizə ən yaxın növbətçi maşını dərhal yönləndirir.',
  },
];

// Backwards compatibility alias
export const EVAKUASIYA_FAQS = EVAKUATOR_FAQS;

export const PAGE_SEO_CONFIGS: Record<string, PageSeoConfig> = {
  '/': {
    path: '/',
    title: 'Yükdaşıma Bakı | Yükdaşıma və Evakuasiya Xidməti',
    metaDescription: 'Bakı və Azərbaycan üzrə peşəkar yükdaşıma və 24/7 evakuasiya xidməti. AI ilə həcm analizi, şəffaf tariflər və sürətli sifariş.',
    h1: 'Bakıda Yükdaşıma və Evakuasiya Xidməti',
    canonicalUrl: 'https://yukdasima.ai/',
    keywords: ['yükdaşıma', 'yükdaşıma xidməti', 'yükdaşıma Bakı', 'yük daşıma', 'yük maşını', 'evakuasiya', 'evakuator'],
    ogType: 'website',
    schemaType: 'WebSite',
  },
  '/yukdasima': {
    path: '/yukdasima',
    title: 'Yükdaşıma Xidməti – Bakı və Regionlar | yukdasima.ai',
    metaDescription: 'Bakı və regionlar üzrə peşəkar yükdaşıma xidməti. Ev, ofis, mebel və müxtəlif yüklərin daşınması üçün uyğun yük maşını seçin və onlayn sifariş edin.',
    h1: 'Yükdaşıma Xidməti – Bakı və Regionlar',
    canonicalUrl: 'https://yukdasima.ai/yukdasima',
    keywords: [
      'yükdaşıma',
      'yük daşıma',
      'yükdaşıma xidməti',
      'yük daşıma xidməti',
      'Bakıda yükdaşıma',
      'yükdaşıma qiymətləri',
      'ucuz yükdaşıma',
      'yük maşını sifarişi',
      'mebel daşınması',
      'evdən evə yükdaşıma',
      'ofis daşınması',
      'fəhlə xidməti',
    ],
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Yükdaşıma Xidməti – Bakı və Regionlar',
    serviceTypeDetail: 'Freight and Moving Services in Baku and Azerbaijan Regions',
    breadcrumbs: [
      { name: 'Ana səhifə', item: 'https://yukdasima.ai/' },
      { name: 'Yükdaşıma', item: 'https://yukdasima.ai/yukdasima' },
    ],
    faqs: YUKDASIMA_FAQS,
  },
  '/evakuator': {
    path: '/evakuator',
    title: 'Evakuator Xidməti – Bakı və Regionlar | yukdasima.ai',
    metaDescription: 'Bakı və regionlar üzrə operativ evakuator xidməti. İlkin evakuator qiymətini onlayn hesablayın və ya 24/7 operatorla əlaqə saxlayaraq sifariş edin.',
    h1: 'Evakuator Xidməti – Bakı və Regionlar',
    canonicalUrl: 'https://yukdasima.ai/evakuator',
    keywords: [
      'evakuator xidməti',
      'evakuator',
      'ucuz evakuator',
      'evakuator qiyməti',
      'Bakı evakuator xidməti',
      'Bakı və regionlara evakuator',
      'avtomobil evakuasiyası',
      'Bakı evakuator',
      '24/7 evakuator',
      'avtomobil evakuatoru',
      'maşın daşıma',
      'avtomobil daşıma',
      'rayonlara evakuator',
    ],
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Evakuator Xidməti – Bakı və Regionlar',
    serviceTypeDetail: 'Towing and Vehicle Evacuation Service',
    breadcrumbs: [
      { name: 'Ana səhifə', item: 'https://yukdasima.ai/' },
      { name: 'Evakuator', item: 'https://yukdasima.ai/evakuator' },
    ],
    faqs: EVAKUATOR_FAQS,
  },
  '/evden-eve-yukdasima': {
    path: '/evden-eve-yukdasima',
    title: 'Evdən Evə Yükdaşıma Bakı | Mənzil Köçürülməsi Xidməti',
    metaDescription: 'Mənzil və bağ evlərinin təhlükəsiz köçürülməsi. Mebellərin sökülüb yığılması, qablaşdırma və peşəkar fəhlə xidməti ilə evdən evə daşıma.',
    h1: 'Bakıda Evdən Evə Yükdaşıma və Mənzil Köçürülməsi',
    canonicalUrl: 'https://yukdasima.ai/evden-eve-yukdasima',
    keywords: ['evdən evə yükdaşıma', 'mənzil köçürülməsi', 'ev köçürmə Bakı', 'ev əşyalarının daşınması'],
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Evdən Evə Yükdaşıma',
  },
  '/mebel-dasinmasi': {
    path: '/mebel-dasinmasi',
    title: 'Mebel Daşınması Bakı | Mebel Ustası və Qablaşdırma',
    metaDescription: 'Hər növ mebellərin peşəkar ustalar tərəfindən sökülməsi, qablaşdırılması, təhlükəsiz daşınması və yeni ünvanda quraşdırılması xidməti.',
    h1: 'Mebel Daşınması və Peşəkar Usta Xidməti',
    canonicalUrl: 'https://yukdasima.ai/mebel-dasinmasi',
    keywords: ['mebel daşınması', 'mebel ustası', 'mebel sökülməsi yığılması', 'mebel qablaşdırma'],
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Mebel Daşınması və Usta Xidməti',
  },
  '/ofis-dasinmasi': {
    path: '/ofis-dasinmasi',
    title: 'Ofis Daşınması Bakı | Korporativ və Ofis Köçürülməsi',
    metaDescription: 'Ofis avadanlıqlarının, sənədlərin və mebellərin iş prosesini dayandırmadan operativ köçürülməsi. Korporativ müştərilər üçün xüsusi şərtlər.',
    h1: 'Bakıda Peşəkar Ofis Daşınması və Köçürülməsi',
    canonicalUrl: 'https://yukdasima.ai/ofis-dasinmasi',
    keywords: ['ofis daşınması', 'ofis köçürülməsi Bakı', 'korporativ yükdaşıma', 'ofis avadanlıqlarının daşınması'],
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Ofis Daşınması',
  },
  '/yuk-masini': {
    path: '/yuk-masini',
    title: 'Yük Maşını Sifarişi Bakı | Ford Transit və İsuzu İcarəsi',
    metaDescription: 'Bakı daxili və rayonlararası yük maşını sifarişi. 2 metrlik Transit-dən 7 metrlik böyük tutumlu maşınlaradək geniş avtopark xidmətinizdədir.',
    h1: 'Yük Maşını Sifarişi və İcarəsi',
    canonicalUrl: 'https://yukdasima.ai/yuk-masini',
    keywords: ['yük maşını', 'yük maşını sifarişi', 'ford transit sifarişi', 'isuzu yük maşını', 'yük taksisi'],
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Yük Maşını Sifarişi',
  },
  '/fehle-xidmeti': {
    path: '/fehle-xidmeti',
    title: 'Fəhlə Xidməti Bakı | Peşəkar Yükdaşıma Fəhlələri',
    metaDescription: 'Ağır və həcmli yüklərin, mebellərin və inşaat materiallarının daşınması üçün təcrübəli fəhlə briqadası. Saatlıq və günlük xidmət.',
    h1: 'Bakıda Peşəkar Fəhlə Xidməti',
    canonicalUrl: 'https://yukdasima.ai/fehle-xidmeti',
    keywords: ['fəhlə xidməti', 'yükdaşıma fəhləsi', 'fəhlə sifarişi', 'yükləmə boşaltma'],
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Fəhlə Xidməti',
  },
  '/qiymetler': {
    path: '/qiymetler',
    title: 'Yükdaşıma və Evakuator Qiymətləri Bakı | Şəffaf Tariflər',
    metaDescription: 'Bakı şəhərdaxili və rayonlararası yükdaşıma və evakuator qiymətləri. Gizli ödənişsiz, şəffaf və rəsmi tarif cədvəli ilə tanış olun.',
    h1: 'Yükdaşıma və Evakuasiya Qiymətləri',
    canonicalUrl: 'https://yukdasima.ai/qiymetler',
    keywords: ['yükdaşıma qiymətləri', 'evakuator qiymətləri', 'yükdaşıma tarifləri', 'evakuasiya qiyməti'],
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Tariflər və Qiymətləndirmə',
  },
  '/elaqe': {
    path: '/elaqe',
    title: 'Əlaqə | yukdasima.ai — 24/7 Daşıma və Evakuator',
    metaDescription: 'yukdasima.ai ilə əlaqə: 878 Qaynar xətt, WhatsApp və operativ zəng sifarişi. Bakı və bütün Azərbaycan üzrə 24/7 xidmətinizdəyik.',
    h1: 'Bizimlə Əlaqə və Operativ Sifariş',
    canonicalUrl: 'https://yukdasima.ai/elaqe',
    keywords: ['yükdaşıma əlaqə', 'evakuator nömrəsi', 'yükdaşıma qaynar xətt', '878 qaynar xətt'],
    ogType: 'website',
    schemaType: 'ContactPage',
    serviceName: 'Əlaqə və Dəstək',
  },
};

export function getPageSeo(pathname: string): PageSeoConfig {
  const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  
  // 1. Check static predefined page SEO configs
  if (PAGE_SEO_CONFIGS[normalizedPath]) {
    return PAGE_SEO_CONFIGS[normalizedPath];
  }

  // 2. Check programmatic approved evacuator route SEO configs
  if (normalizedPath.startsWith('/evakuator/')) {
    const approvedRoute = getApprovedEvakuatorRoute(normalizedPath);
    if (approvedRoute) {
      return generateRouteSeoConfig(approvedRoute);
    }
  }

  // 3. Check programmatic approved yukdasima route SEO configs
  if (normalizedPath.startsWith('/yukdasima/')) {
    const approvedRoute = getApprovedYukdasimaRoute(normalizedPath);
    if (approvedRoute) {
      return generateYukdasimaRouteSeoConfig(approvedRoute);
    }
  }

  return PAGE_SEO_CONFIGS['/'];
}
