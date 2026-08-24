import { getApprovedEvakuatorRoute, generateRouteSeoConfig } from './routeRegistry';

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
      'Yükdaşıma qiyməti daşınacaq məsafəyə (Bakıdaxili və ya rayonlararası), seçilən yük maşınının həcminə (2 metrlik Ford Transit-dən 7 metrlik böyük furqonlaradək), tələb olunan fəhlə sayına və mərtəbə şərtlərinə (liftin olub-olmaması) əsasən şəffaf kalkulyatorumuz vasitəsilə hesablanır.',
  },
  {
    question: 'Bakı daxilində yükdaşıma neçə manatdır?',
    answer:
      'Bakı şəhəri daxilində ilkin yükdaşıma tarifləri kiçik həcmli yüklər (2m Ford Transit) üçün 25 AZN-dən, standart 3–4 metrlik yük maşınları üçün isə 35–45 AZN-dən başlayır. Dəqiq qiymət yükün növünə və ünvanlar arasındakı məsafəyə görə onlayn kalkulyatorda dərhal təyin edilir.',
  },
  {
    question: 'Rayonlara yükdaşıma xidməti göstərirsiniz?',
    answer:
      'Bəli, Bakıdan bütün Azərbaycan rayonlarına (Gəncə, Sumqayıt, Xırdalan, Quba, Şəki, Lənkəran və s.) və əks istiqamətdə təhlükəsiz yükdaşıma xidməti göstəririk. Rayonlararası marşrutlar üzrə kilometraj və maşın növünə uyğun sabit rəsmi tariflər tətbiq olunur.',
  },
  {
    question: 'Yükdaşıma üçün neçə fəhlə sifariş etmək lazımdır?',
    answer:
      'Fəhlə sayı daşınacaq əşyaların həcminə və çəkisinə görə müəyyən edilir. Adətən 1 otaqlı mənzil və ya tək-tək mebellər üçün 2 fəhlə, 2–3 otaqlı mənzillər və ofislər üçün isə 3–4 nəfərlik peşəkar briqada tövsiyə olunur.',
  },
  {
    question: 'Mebel daşınması və sökülüb-yığılması necə həyata keçirilir?',
    answer:
      'Təcrübəli mebel ustalarımız qarderob, yataq dəsti və modul mebelləri xüsusi alətlərlə zədələmədən sökür, qoruyucu plyonka (stretch/bubble film) ilə qablaşdırır və yeni mənzildə dəqiqliklə quraşdıraraq təhvil verir.',
  },
  {
    question: 'Qiyməti əvvəlcədən onlayn hesablamaq mümkündürmü?',
    answer:
      'Bəli! Səhifəmizdəki interaktiv kalkulyator və AI foto analiz funksiyası ilə əşyalarınızın şəklini yükləyərək və ya birbaşa ünvanları seçərək ilkin qiyməti heç bir gizli xərc olmadan saniyələr ərzində öyrənə bilərsiniz.',
  },
  {
    question: 'Təcili yük maşını nə qədər vaxta ünvana çatır?',
    answer:
      'Bakı şəhərinin müxtəlif ərazilərində növbətçi avtomobillərimiz olduğundan, təcili sifarişlərdə yük maşını təxminən 20–30 dəqiqə ərzində ünvanınıza yaxınlaşır.',
  },
];

export const EVAKUASIYA_FAQS: PageFaqItem[] = [
  {
    question: 'Evakuator qiyməti necə hesablanır?',
    answer:
      'Evakuator qiyməti daşınacaq məsafəyə (Bakı şəhərdaxili və ya rayonlararası marşrut), avtomobilin növünə (Sedan, SUV / Jeep, Hetçbek, Minivan və ya Mikroavtobus) və təkərlərin hərəkət qabiliyyətinə (çarxların bloklanıb-bloklanmaması) əsasən şəffaf kalkulyatorumuz vasitəsilə hesablanır.',
  },
  {
    question: 'Bakı daxilində evakuator qiyməti neçədir?',
    answer:
      'Bakı şəhəri daxilində standart sedan avtomobillər üçün evakuasiya qiyməti 35 AZN-dən başlayır. Dəqiq qiymət çıxış və çatdırılma ünvanlarını seçərək onlayn kalkulyatorda dərhal müəyyən edilir.',
  },
  {
    question: 'Bakıdan rayonlara evakuator qiyməti necə müəyyən olunur?',
    answer:
      'Bakıdan Azərbaycanın rayonlarına (Gəncə, Sumqayıt, Xırdalan, Quba, Şəki, Lənkəran və s.) rəsmi tarif bazası əsasında sabit və şəffaf qiymətlər tətbiq olunur. Qiyməti kalkulyatorda təyinat rayonunu seçərək dərhal öyrənə bilərsiniz.',
  },
  {
    question: 'Evakuator sifarişini necə verə bilərəm?',
    answer:
      '878 Qaynar xəttimizə zəng edərək, WhatsApp nömrəmizə yazaraq və ya saytımızdakı interaktiv kalkulyator vasitəsilə dərhal sifariş verə bilərsiniz. Dispetçerimiz sizə ən yaxın növbətçi evakuatoru operativ yönləndirir.',
  },
  {
    question: 'Təcili evakuator nə qədər vaxta ünvana çatır?',
    answer:
      'Bakı şəhəri və Abşeronun müxtəlif nöqtələrində növbətçi evakuatorlarımız olduğu üçün təcili çağırışlarda avtomobil təxminən 15–20 dəqiqə ərzində ünvanınıza yaxınlaşır.',
  },
  {
    question: 'Qəzalı və ya təkəri kilidlənmiş maşınları daşıyırsınız?',
    answer:
      'Bəli, xüsusi hidravlik sürüşən platforma və qaldırıcı kran/dolayı təkər arabacıqları ilə təchiz olunmuş evakuatorlarımızla texniki nasaz, təkərləri kilidlənmiş və ya qəzalı avtomobillər tam təhlükəsiz şəkildə daşınır.',
  },
  {
    question: 'Qiyməti əvvəlcədən hesablamaq mümkündürmü?',
    answer:
      'Bəli! Səhifəmizdəki onlayn evakuasiya kalkulyatoru ilə marşrutu və avtomobil tipini daxil edərək heç bir gizli ödəniş olmadan son və rəsmi qiyməti əvvəlcədən öyrənə bilərsiniz.',
  },
];

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
    title: 'Yükdaşıma Bakı | Yükdaşıma Xidməti və Qiymətləri',
    metaDescription: 'Bakıda sərfəli yükdaşıma xidməti və qiymətləri. Mənzil köçürülməsi, mebel daşınması və yük maşını sifarişi. Qiyməti dərhal onlayn hesablayın və sifariş edin.',
    h1: 'Bakı Yükdaşıma Xidməti və Qiymətləri',
    canonicalUrl: 'https://yukdasima.ai/yukdasima',
    keywords: [
      'yükdaşıma',
      'yük daşıma',
      'yükdaşıma xidməti',
      'yükdaşıma xidmətləri',
      'Bakı yükdaşıma',
      'yükdaşıma Bakı',
      'yükdaşıma qiymətləri',
      'yük daşıma qiymətləri',
      'ucuz yükdaşıma',
      'mebel daşınması',
      'evdən evə yükdaşıma',
      'ofis daşınması',
      'yük maşını',
      'yük taksisi',
    ],
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Bakı Yükdaşıma Xidməti',
    serviceTypeDetail: 'Moving and Freight Transportation Service',
    breadcrumbs: [
      { name: 'Ana səhifə', item: 'https://yukdasima.ai/' },
      { name: 'Yükdaşıma', item: 'https://yukdasima.ai/yukdasima' },
    ],
    faqs: YUKDASIMA_FAQS,
  },
  '/evakuasiya': {
    path: '/evakuasiya',
    title: 'Evakuator Bakı | Evakuator Xidməti və Qiymətləri',
    metaDescription: 'Bakıda və rayonlara 24/7 operativ evakuator xidməti. Avtomobil daşıma və evakuasiya qiymətlərini dərhal onlayn hesablayın, sərfəli və təhlükəsiz sifariş edin.',
    h1: 'Bakı Evakuator Xidməti və Qiymətləri',
    canonicalUrl: 'https://yukdasima.ai/evakuasiya',
    keywords: [
      'evakuator',
      'evakuator xidməti',
      'evakuator qiymətləri',
      'evakuator qiyməti',
      'Bakı evakuator',
      'Bakıda evakuator',
      'ucuz evakuator',
      '7/24 evakuator',
      'avtomobil evakuatoru',
      'maşın daşıma',
      'avtomobil daşıma',
      'rayonlara evakuator',
      'Bakı rayon evakuator',
      'evakuasiya xidməti',
    ],
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Bakı Evakuator Xidməti',
    serviceTypeDetail: 'Towing and Vehicle Evacuation Service',
    breadcrumbs: [
      { name: 'Ana səhifə', item: 'https://yukdasima.ai/' },
      { name: 'Evakuasiya', item: 'https://yukdasima.ai/evakuasiya' },
    ],
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

  return PAGE_SEO_CONFIGS['/'];
}
