import { REGIONAL_DESTINATIONS, RegionalDestination } from './regionalData';
import { BATCH3_REGIONAL_CONTENT } from './batch3RegionalContent';
import { BATCH4_REGIONAL_CONTENT } from './batch4RegionalContent';
import { BATCH5_REGIONAL_CONTENT } from './batch5RegionalContent';
import { BATCH6_REGIONAL_CONTENT } from './batch6RegionalContent';

export type DestinationCategory =
  | 'major_city'
  | 'tourism_hub'
  | 'industrial_hub'
  | 'mountain_hub'
  | 'border_hub'
  | 'regional_district';

export interface RouteFaqItem {
  question: string;
  answer: string;
}

export interface RouteVehicleType {
  name: string;
  specs: string;
  bestFor: string;
}

export interface RoutePricingFactor {
  factor: string;
  detail: string;
}

export interface RouteTargetAudience {
  title: string;
  description: string;
}

export interface RouteOrderStep {
  step: number;
  title: string;
  desc: string;
}

export interface RouteContentProfile {
  slug: string;
  destination: string;
  category: DestinationCategory;
  distanceKm: number;
  corridor: string;
  economicRegion: string;
  terrain: 'düzənlik' | 'dağətəyi' | 'dağlıq' | 'sahilyanı';
  distanceTier: 'suburban' | 'medium' | 'long_haul';
  estimatedHours: string;

  // Direct Answers for Generative AI Search (ChatGPT, Gemini, Perplexity)
  directAnswerYukdasima: string;
  directAnswerEvakuator: string;

  // Structured Information Blocks
  targetAudienceYukdasima: RouteTargetAudience[];
  targetAudienceEvakuator: RouteTargetAudience[];
  cargoTypesYukdasima: string[];
  vehicleTypesYukdasima: RouteVehicleType[];
  vehicleTypesEvakuator: RouteVehicleType[];
  pricingFactorsYukdasima: RoutePricingFactor[];
  pricingFactorsEvakuator: RoutePricingFactor[];
  orderStepsYukdasima: RouteOrderStep[];
  orderStepsEvakuator: RouteOrderStep[];

  // Detailed Text
  yukdasimaOverview: string;
  yukdasimaReverseOverview: string;
  yukdasimaVehicleNotes: string;
  yukdasimaLoadingNotes: string;
  yukdasimaFaqs: RouteFaqItem[];

  evakuatorOverview: string;
  evakuatorReverseOverview: string;
  evakuatorPlatformNotes: string;
  evakuatorFaqs: RouteFaqItem[];

  metaTitleYukdasima: string;
  metaDescYukdasima: string;
  metaTitleEvakuator: string;
  metaDescEvakuator: string;
}

// Dedicated GEO / AI Search optimized profiles for Pilot and Batch Regions
export interface PilotContent {
  directAnswerYukdasima: string;
  directAnswerEvakuator: string;
  targetAudienceYukdasima: RouteTargetAudience[];
  targetAudienceEvakuator: RouteTargetAudience[];
  cargoTypesYukdasima: string[];
  vehicleTypesYukdasima: RouteVehicleType[];
  vehicleTypesEvakuator: RouteVehicleType[];
  pricingFactorsYukdasima: RoutePricingFactor[];
  pricingFactorsEvakuator: RoutePricingFactor[];
  yukdasimaFaqs: RouteFaqItem[];
  evakuatorFaqs: RouteFaqItem[];
  yukdasimaOverview?: string;
  yukdasimaReverseOverview?: string;
  evakuatorOverview?: string;
  evakuatorReverseOverview?: string;
  yukdasimaVehicleNotes?: string;
  yukdasimaLoadingNotes?: string;
  evakuatorPlatformNotes?: string;
}

const PILOT_REGIONAL_CONTENT: Record<string, PilotContent> = {
  'baki-gence': {
    directAnswerYukdasima:
      'Bakıdan Gəncəyə yükdaşıma xidməti mümkündürmü? Bəli, M2 magistralı boyunca (364 km) Bakıdan Gəncəyə və Gəncədən Bakıya hər gün təhlükəsiz yük və mebel daşınması təşkil edilir. Mənzil və ofis köçürülməsi, ticarət malları və sənaye avadanlıqları üçün 2 metrdən 7 metrədək qapalı furqonlar, təcrübəli mebel ustaları və fəhlə briqadası təmin olunur. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə foto göndərərək dərhal qiymət təklifi ala bilərsiniz.',
    directAnswerEvakuator:
      'Bakıdan Gəncəyə və Gəncədən Bakıya evakuator necə sifariş edilir? M2 magistralı üzrə (364 km) 24/7 fasiləsiz operativ evakuasiya xidməti fəaliyyət göstərir. Minik, cip, krossover, mikroavtobus və təkəri/karobkası kilidlənmiş qəzalı avtomobillər hidravlik sürüşən platformalı xüsusi texnika ilə daşınır. Növbətçi evakuator çağırmaq üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp üzərindən canlı məkan (lokasiya) göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Gəncə arasında yaşayış yerini dəyişən və bütün mebel-məişət əşyalarını bir reyslə təhlükəsiz daşıtmaq istəyən ailələr.',
      },
      {
        title: 'Ticarət və Sahibkarlar',
        description: 'Gəncənin ticarət mərkəzləri, anbarları və pərakəndə satış nöqtələrinə Bakıdan müntəzəm mal və avadanlıq göndərən şirkətlər.',
      },
      {
        title: 'Fərdi və Tələbə Yükləri',
        description: 'Kiçik həcmli mebellər, soyuducu, paltaryuyan və ya şəxsi qutuları sərfəli şəkildə çatdırmaq istəyən fərdi müştərilər.',
      },
      {
        title: 'Ofis və İstehsalat Köçü',
        description: 'Ofis mebelləri, sənədlər, server və istehsalat dəzgahlarının zədələnmədən, xüsusi qablaşdırma ilə regional daşınması.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Yolda Qalan Sürücülər',
        description: 'M2 magistralında (Bakı–Kürdəmir–Yevlax–Goranboy–Gəncə) mühərrik, transmissiya və ya elektrik nasazlığı səbəbindən hərəkətsiz qalanlar.',
      },
      {
        title: 'Qəzalı Avtomobil Sahibləri',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində deformasiyaya uğramış, təkəri və ya sükanı kilidlənmiş avtomobillərin Bakı və ya Gəncə servisinə daşınması.',
      },
      {
        title: 'Servis və Diler Transferləri',
        description: 'Yeni alınmış, nömrəsiz və ya rəsmi diler diaqnostikasına göndərilən lüks, idman və elektrikli nəqliyyat vasitələri.',
      },
      {
        title: 'Ağır SUV və Kommersiya Texnikası',
        description: 'Pikaplar, zirehli maşınlar və yüngül mikroavtobusların uzun məsafəli etibarlı platforma ilə daşınması.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri (yataq, qonaq, mətbəx mebelləri, divan-kreslo)',
      'Böyük məişət texnikası (soyuducu, paltaryuyan, qabyuyan, plitə)',
      'Qablaşdırılmış fərdi əşyalar, geyim və arxiv qutuları',
      'Kommersiya malları, tikinti materialları və ehtiyat hissələri',
      'Həssas əşyalar, musiqi alətləri və xüsusi avadanlıqlar',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon (Ford Transit)',
        specs: 'Həcm: 9–11 m³ | Yük: 1.5 tona qədər',
        bestFor: '1 otaqlı mənzil, kiçik mebellər, bağ ləvazimatları və fərdi əşyalar.',
      },
      {
        name: '4.2 Metrlik Qapalı Sprinter / Iveco',
        specs: 'Həcm: 15–18 m³ | Yük: 2.5 tona qədər',
        bestFor: '2-3 otaqlı mənzil köçü, standart mebel dəstləri və məişət texnikası.',
      },
      {
        name: '5.2–6 Metrlik Böyük Furqon',
        specs: 'Həcm: 22–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Geniş həyət evi, 4 otaqlı mənzil və ya iri kommersiya partiyaları.',
      },
      {
        name: '7 Metrlik Ağır Yük Maşını (TIR/Atego)',
        specs: 'Həcm: 36–45 m³ | Yük: 5–10 ton',
        bestFor: 'Böyük anbar köçürülməsi, sənaye malları və toplu daşımalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 tona qədər',
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin təhlükəsiz daşınması.',
      },
      {
        name: 'Gücləndirilmiş Sürüşən Platforma',
        specs: 'Yük tutumu: 3.5–4 ton',
        bestFor: 'Böyük SUV, cip, pikap və zirehli avtomobillər.',
      },
      {
        name: 'Diyircəkli Təkər Arabacıqlı Texnika',
        specs: 'Xüsusi Dolli təkər sistemi',
        bestFor: 'Təkəri, asması və ya avtomat karobkası kilidlənmiş qəzalı maşınlar.',
      },
      {
        name: 'İkitərəfli Uzun Magistral Evakuatoru',
        specs: 'GPS təchizatlı, 4 nöqtəli fiksasiya',
        bestFor: 'Bakı–Gəncə (364 km) arası uzaq məsafəli etibarlı tranzit.',
      },
    ],
    pricingFactorsYukdasima: [
      {
        factor: 'Məsafə və Marşrut Dəhlizi',
        detail: 'Bakı–Gəncə M2 magistralı üzrə 364 km əsas baza məsafəsi.',
      },
      {
        factor: 'Seçilən Nəqliyyatın Ölçüsü',
        detail: '3m, 4m, 5m və ya 7m qapalı furqonun kuzov tutumu və yanacaq sərfiyyatı.',
      },
      {
        factor: 'Fəhlə və Mebel Ustası Xidməti',
        detail: 'Yükləmə-boşaltma briqadasının sayı və mebel sökülüb-yığılması zərurəti.',
      },
      {
        factor: 'Mərtəbə və Giriş Şəraiti',
        detail: 'Hər iki ünvanda liftin olması və ya pilləkənlə mərtəbələrə daşıma şərtləri.',
      },
      {
        factor: 'Qayıdan / Yolüstü Maşın İmkanı',
        detail: 'Gəncədən Bakıya və ya Bakıdan Gəncəyə qayıdan boş maşınlarda xüsusi endirim imkanı.',
      },
    ],
    pricingFactorsEvakuator: [
      {
        factor: 'Dəqiq Məsafə (364 km)',
        detail: 'Magistral boyu yükləmə və boşaltma ünvanı arasındakı faktiki kilometraj.',
      },
      {
        factor: 'Avtomobilin Kateqoriyası və Çəkisi',
        detail: 'Minik sedan (1.5t), ağır SUV/cip (2.5t+) və ya mikroavtobus fərqi.',
      },
      {
        factor: 'Nasazlığın Xarakteri',
        detail: 'Sərbəst diyirlənən maşın və ya təkər/karobka kilidi olan qəzalı vəziyyət.',
      },
      {
        factor: 'Çıxış Vaxtı və Təcililik',
        detail: 'Günün saatı (24/7 növbətçilik) və dərhal çıxış tələbi.',
      },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Gəncəyə yükdaşıma necə təşkil olunur və nə qədər vaxt çəkir?',
        answer:
          'Sifariş rəsmiləşdirildikdən sonra yük maşını Bakıdakı ünvanınıza təyin olunmuş vaxtda çatır. Yükləmə tamamlandıqdan sonra M2 magistralı ilə təxminən 4–5 saat ərzində Gəncədəki istənilən ünvana (Yeni Gəncə, Gülüstan, Sevimli Şəhər və s.) təhlükəsiz çatdırılır.',
      },
      {
        question: 'Gəncədən Bakıya əks istiqamətdə yük daşımaq mümkündürmü?',
        answer:
          'Bəli, xidmətimiz tam ikitərəflidir. Gəncədən Bakıya mənzil köçü, kommersiya malları və ya fərdi yüklərin daşınması üçün Gəncə bölgəsində növbətçi və ya Bakıdan gələn qayıdan yük maşınları ayrılır.',
      },
      {
        question: 'Bakı–Gəncə marşrutu üzrə mebel ustası və fəhlə xidməti daxildirmi?',
        answer:
          'Bəli, istəyinizə uyğun olaraq mebellərin peşəkar sökülüb xüsusi qablaşdırılması, yük maşınına möhkəm bərkidilməsi və Gəncədəki yeni mənzildə yenidən quraşdırılması üçün usta və fəhlə briqadası təmin olunur.',
      },
      {
        question: 'Gəncə marşrutunda hansı tutumlu yük maşınları istifadə olunur?',
        answer:
          'Yükün həcmindən asılı olaraq 3 metrlik (kiçik köç və qutular), 4–4.5 metrlik Mercedes Sprinter/Iveco (2-3 otaqlı mənzil) və 5–7 metrlik böyük tutumlu furqonlar (geniş həcmli köç və anbar yükləri) təqdim edilir.',
      },
      {
        question: 'Gəncə yolüstü Göygöl, Şəmkir və ya Goranboya da yük çatdırmaq olar?',
        answer:
          'Bəli, M2 magistral dəhlizi boyunca yerləşən Goranboy, Naftalan, Göygöl, Samux və Şəmkir rayonlarına da eyni reyslə və ya ayrıca yükdaşıma xidməti göstərilir.',
      },
      {
        question: 'Bakı–Gəncə yükdaşıma qiyməti nədən asılıdır?',
        answer:
          'Qiymət seçilən yük maşınının ölçüsünə (3m/4m/5m/6m), fəhlə və mebel ustası sayına, mərtəbə şəraitinə və əlavə qablaşdırma materiallarına əsasən formalaşır. 050 250 31 70 ilə dəqiq hesablama apara bilərsiniz.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Gəncəyə evakuator nə qədər vaxta çıxış edir?',
        answer:
          'Bakı daxilində çağırış edildikdə növbətçi evakuator 15–30 dəqiqə ərzində avtomobilin dayandığı ünvana çatır və platformaya yüklədikdən sonra birbaşa M2 magistralı ilə Gəncəyə istiqamətlənir.',
      },
      {
        question: 'Gəncədə yolda qalmış avtomobili Bakıdakı servisə gətirmək mümkündürmü?',
        answer:
          'Bəli, Gəncə şəhəri, eləcə də M2 yolu boyu (Goranboy, Yevlax, Kürdəmir keçidləri) qəzalı və ya texniki nasaz maşınları Bakıdakı rəsmi diler və ya fərdi servis mərkəzlərinə 24/7 daşıyırıq.',
      },
      {
        question: 'Ağır çəkili SUV, pikap və ya mikroavtobuslar üçün evakuator varmı?',
        answer:
          'Bəli, avtoparkımızda 3.5 tona qədər ağır çəkili ciplər, elektrikli avtomobillər (EV), pikaplar və uzun bazalı mikroavtobuslar üçün gücləndirilmiş hidravlik platformalı evakuatorlar mövcuddur.',
      },
      {
        question: 'Təkərləri və ya avtomat sürətlər qutusu kilidlənmiş maşın necə yüklənir?',
        answer:
          'Təkəri dönməyən və ya elektron əyləci kilidlənmiş avtomobillər üçün xüsusi diyircəkli köməkçi arabacıqlar (dolli) tətbiq olunur və güclü elektrikli bucurqadla asma zərər görmədən platformaya qaldırılır.',
      },
      {
        question: 'Daşıma zamanı avtomobilin təhlükəsizliyinə zəmanət verilirmi?',
        answer:
          'Bəli, bütün avtomobillər hidravlik platforma üzərində 4 nöqtədən xüsusi sertifikatlı təkər kəmərləri ilə bərkidilir və yol boyu tam sığortalı daşınır.',
      },
      {
        question: 'Bakı–Gəncə evakuator xidmətinin qiyməti necə hesablanır?',
        answer:
          'Qiymət 364 km məsafəyə, nəqliyyat vasitəsinin çəkisinə (sedan/SUV/mikroavtobus) və təkər kilidi kimi texniki mürəkkəbliklərə əsasən hesablanır. Cari uyğun tarif üçün 050 250 31 70 ilə əlaqə saxlayın.',
      },
    ],
  },
  'baki-qebele': {
    directAnswerYukdasima:
      'Bakıdan Qəbələyə yükdaşıma xidməti mümkündürmü? Bəli, M4 magistralı üzrə (218 km) Bakıdan Qəbələyə və Qəbələdən Bakıya müntəzəm yükdaşıma və köçürülmə xidməti həyata keçirilir. Bağ və villa əşyaları, otel və restoran avadanlıqları, mebellər və fərdi yüklər üçün 2 metrdən 6 metrədək təmiz qapalı furqonlar təmin olunur. Sifariş vermək və ya qiymət öyrənmək üçün 050 250 31 70 nömrəsi ilə əlaqə saxlaya və ya WhatsApp-dan istifadə edə bilərsiniz.',
    directAnswerEvakuator:
      'Bakıdan Qəbələyə və Qəbələdən Bakıya evakuator necə çağırılır? M4 Şamaxı–İsmayıllı–Qəbələ marşrutu üzrə (218 km) 7/24 operativ evakuator və yol yardımı xidməti fəaliyyət göstərir. Dağətəyi və enişli-yoxuşlu yol şəraitinə uyğunlaşdırılmış hidravlik platformalı texnikamızla minik, yolsuzluq və qəzalı maşınlar təhlükəsiz daşınır. Çağırış üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp üzərindən lokasiya göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Bağ Evi və Villa Sahibləri',
        description: 'Qəbələ, Vəndam, Nohurqışlaq və ətraf istirahət zonalarındakı bağ evlərinə mebel, bəzək və məişət əşyalarını köçürənlər.',
      },
      {
        title: 'Turizm, Otel və Restoranlar',
        description: 'Qəbələnin turizm obyektlərinə mətbəx avadanlıqları, tekstil, mebel və kommersiya ləvazimatlarının çatdırılması.',
      },
      {
        title: 'Mənzil və Fərdi Köçlər',
        description: 'Bakıdan Qəbələyə və ya Qəbələdən Bakıya daimi yaşayış və ya iş məqsədilə ev əşyalarını daşıyan vətəndaşlar.',
      },
      {
        title: 'Tikinti və Təmir Layihələri',
        description: 'Villa və kottec tikintisi üçün həssas inşaat və təmir materiallarının qapalı nəqliyyatla daşınması.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'M4 Dağətəyi Yolunda Qalanlar',
        description: 'Şamaxı aşırımı, İsmayıllı və Qəbələ dağətəyi magistralında nasazlıqla üzləşən sürücülər.',
      },
      {
        title: 'Turist və Qonaqlar',
        description: 'Tufandağ, Nohurgöl və dağ kəndlərinə səyahət edərkən texniki yardıma və ya evakuatora ehtiyacı olan avtomobil sahibləri.',
      },
      {
        title: 'Servisə Qayıdan Avtomobillər',
        description: 'Qəbələdən Bakıdakı ixtisaslaşmış və ya rəsmi diler mərkəzinə çatdırılmalı olan qəzalı/arızalı maşınlar.',
      },
      {
        title: 'Qış Mövsümü və Qar Şəraiti',
        description: 'Qış aylarında sürüşkən dağ yollarında xəndəyə düşən və ya hərəkətsiz qalan avtomobillərə güclü bucurqadlı yardım.',
      },
    ],
    cargoTypesYukdasima: [
      'Villa və kottec mebelləri (bağ mebelləri, qonaq otağı dəstləri)',
      'Məişət texnikası və istilik avadanlıqları (kombi, soyuducu, generator)',
      'Otel və restoran inventarları, mətbəx texnikası',
      'Fərdi qablaşdırılmış əşyalar və həssas bəzək elementləri',
      'Tikinti, təmir materialları və santexnika malları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Qapalı Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        bestFor: 'Bağ ləvazimatları, tək mebel parçaları və fərdi qutular.',
      },
      {
        name: '4.2 Metrlik Mercedes Sprinter',
        specs: 'Həcm: 16 m³ | Yük: 2.5 ton',
        bestFor: 'Villa və mənzil köçü, standart mebel dəstləri üçün ən populyar seçim.',
      },
      {
        name: '5.2 Metrlik Iveco Daily Furqon',
        specs: 'Həcm: 22 m³ | Yük: 3.5 ton',
        bestFor: 'Böyük bağ evi əşyaları, restoran avadanlıqları və geniş köçlər.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Alçaq Bucaq Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və lüks idman maşınlarının zədəsiz yüklənməsi.',
      },
      {
        name: 'Güclü Dağ Evakuatoru (Bucurqadlı)',
        specs: 'Yük tutumu: 3.5–4 ton | 6t Elektrik lebyodka',
        bestFor: 'Dağ yollarında xəndəkdən çıxarma və ağır SUV-ların daşınması.',
      },
      {
        name: 'Köməkçi Təkər Arabacıqlı Sistem',
        specs: 'Dolli sistemli',
        bestFor: 'Təkəri və ya transmissiyası bloklanmış nəqliyyat vasitələri.',
      },
    ],
    pricingFactorsYukdasima: [
      {
        factor: 'M4 Marşrut Məsafəsi (218 km)',
        detail: 'Bakı–Şamaxı–İsmayıllı–Qəbələ yolu üzrə faktiki kilometraj.',
      },
      {
        factor: 'Nəqliyyatın Tutumu (3m/4m/5m)',
        detail: 'Kuzovun həcminə və yükün çəkisinə uyğun seçilən avtomobil.',
      },
      {
        factor: 'Fəhlə və Qablaşdırma Xidməti',
        detail: 'Mebellərin sökülməsi, streçlənməsi və mərtəbələrə qaldırılması.',
      },
      {
        factor: 'Ünvanın Giriş Şəraiti',
        detail: 'Qəbələ daxilində və ya dağətəyi kəndlərdə ünvanın relyefi.',
      },
    ],
    pricingFactorsEvakuator: [
      {
        factor: 'Məsafə (218 km)',
        detail: 'Bakı və Qəbələ ünvanları arasındakı magistral yolu.',
      },
      {
        factor: 'Avtomobilin Çəkisi və Klirensi',
        detail: 'Minik, yolsuzluq (SUV) və ya xüsusi idman avtomobili fərqi.',
      },
      {
        factor: 'Yol Şəraiti və Texniki Vəziyyət',
        detail: 'Düz magistral yükləməsi və ya dağ relyefindən bucurqadla çıxarma.',
      },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Qəbələyə villa və ya bağ evi əşyalarını daşımaq neçə saat çəkir?',
        answer:
          'Yükləmə tamamlandıqdan sonra M4 magistralı ilə Şamaxı–İsmayıllı marşrutu üzrə Qəbələyə (Vəndam, Nohurqışlaq, mərkəz, Tufandağ ətrafı) çatma müddəti təxminən 3–3.5 saatdır.',
      },
      {
        question: 'Qəbələdən Bakıya geri qayıdan maşınla daşıma etmək mümkündürmü?',
        answer:
          'Bəli, Qəbələ–Bakı əks marşrutu üzrə həm fərdi köçlər, həm də mövsümi kənd təsərrüfatı və kommersiya yükləri üçün sərfəli daşıma imkanı təqdim edirik.',
      },
      {
        question: 'M4 marşrutundakı dağətəyi yol mebellərin təhlükəsizliyinə təsir edirmi?',
        answer:
          'Xeyr, bütün mebellər xüsusi qoruyucu köpük və streçlə bükülür, qapalı furqon daxilində divar kəmərləri ilə bərkidilir ki, dağətəyi döngələrdə sürtünmə və yerdəyişmə olmasın.',
      },
      {
        question: 'Qəbələdəki turizm obyektləri və restoranlar üçün kommersiya yükü daşıyırsınız?',
        answer:
          'Bəli, otel, restoran və istirahət mərkəzləri üçün mətbəx avadanlıqları, tekstil, mebel və sənaye mallarının vaxtında və sənədləşdirilmiş daşınması təşkil edilir.',
      },
      {
        question: 'Qəbələ marşrutunda hansı yük maşınları daha əlverişlidir?',
        answer:
          'M4 dağətəyi yolu və Qəbələ kəndlərinə rahat giriş üçün 3.5 metrlik və 4.2 metrlik bortlu və ya qapalı Mercedes Sprinter və Iveco furqonları ən optimal seçimdir.',
      },
      {
        question: 'Bakı–Qəbələ yükdaşıma sifarişini necə rəsmiləşdirmək olar?',
        answer:
          '050 250 31 70 nömrəsinə zəng edərək, WhatsApp ilə əşyaların şəkillərini göndərərək və ya saytımızdakı onlayn kalkulyatordan istifadə edərək bir neçə dəqiqəyə sifariş verə bilərsiniz.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Qəbələdə dağ yolunda və ya qış aylarında yolda qalmış avtomobilə evakuator necə çatır?',
        answer:
          'Qəbələ və İsmayıllı zonasında növbətçi dağ şəraitinə uyğun güclü evakuatorlarımız fəaliyyət göstərir. Tufandağ, Nohurgöl və dağətəyi yollara dərhal yardım göndərilir.',
      },
      {
        question: 'Qəbələdən Bakıdakı servisə avtomobil çatdırılması mümkündürmü?',
        answer:
          'Bəli, Qəbələ və ətraf kəndlərdən qəzalı və ya transmissiyası sıradan çıxmış nəqliyyat vasitələri Bakının istənilən rəsmi diler və ya usta mərkəzinə təhlükəsiz gətirilir.',
      },
      {
        question: 'Aşağı klirensli idman avtomobilləri və ya lüks ciplər üçün platforma uyğundurmu?',
        answer:
          'Bəli, tam sürüşən hidravlik alçaq bucaqlı platformalarımız buferə və asmaya heç bir zərər vurmadan lüks və idman avtomobillərini rahatlıqla yükləyir.',
      },
      {
        question: 'Təkəri kilidlənmiş avtomobil necə daşınır?',
        answer:
          'Xüsusi təkər arabacıqları vasitəsilə təkəri dönməyən maşın diyirləndirilərək platformaya qaldırılır və 4 nöqtədən etibarlı fiksasiya olunur.',
      },
      {
        question: 'Bakı–Qəbələ evakuator xidməti 24 saat açıqdırmı?',
        answer:
          'Bəli, xidmətimiz həftənin 7 günü, 24 saat fasiləsiz növbətçilik rejimində işləyir.',
      },
      {
        question: 'Bakı–Qəbələ evakuasiya qiyməti necə müəyyən edilir?',
        answer:
          '218 km məsafə, avtomobilin növü (sedan, SUV, pikap) və yol şəraitinin mürəkkəbliyi əsasında şəffaf hesablanır. 050 250 31 70 ilə dərhal öyrənə bilərsiniz.',
      },
    ],
  },
  'baki-seki': {
    directAnswerYukdasima:
      'Bakıdan Şəkiyə yükdaşıma xidməti mümkündürmü? Bəli, Bakıdan Şəkiyə və Şəkidən Bakıya (305 km) hər gün təhlükəsiz yükdaşıma, mebel və mənzil köçürülməsi xidmətləri göstərilir. Şəkinin qədim məhəllələrinə və fərdi evlərinə uyğun manevrli 3 metrdən 6 metrədək qapalı furqonlar, təcrübəli fəhlələr və mebel ustaları təmin edilir. Əlaqə üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə müraciət edə bilərsiniz.',
    directAnswerEvakuator:
      'Bakıdan Şəkiyə və Şəkidən Bakıya evakuator necə sifariş edilir? Bakı–Şəki marşrutu üzrə (305 km) 24/7 operativ evakuasiya və daşıma xidməti fəaliyyət göstərir. Minik maşınları, krossoverlər, ciplər və qəzalı nəqliyyat vasitələri hidravlik platformalı texnika ilə daşınır. Növbətçi evakuator çağırmaq üçün 050 250 31 70 nömrəsi ilə əlaqə saxlaya və ya WhatsApp-dan məkan göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Həyət Evi Köçürənlər',
        description: 'Bakı ilə Şəki arasında evini köçürən, mebel və məişət əşyalarını qüsursuz çatdırmaq istəyən fərdi şəxslər.',
      },
      {
        title: 'Sənətkarlıq və Kommersiya Malları',
        description: 'Şəkinin ipək, qənnadı, sənətkarlıq məhsullarını Bakıya və ya paytaxtdan Şəkiyə ticarət mallarını daşıtdıran sahibkarlar.',
      },
      {
        title: 'Qədim Məhəllələrə Giriş Tələb Edən Köçlər',
        description: 'Yuxarı Baş, Dodu və daş döşəməli dar küçələrdəki evlərə xüsusi ölçülü manevrli yük maşını ilə xidmət ehtiyacı olanlar.',
      },
      {
        title: 'Təmir və İnşaat Avadanlıqları',
        description: 'Rayondakı fərdi tikililər və obyektlər üçün mühəndis avadanlıqları və tikinti materiallarının daşınması.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Uzaq Magistralda Nasaz Qalanlar',
        description: 'Bakı–Şəki marşrutunda (İsmayıllı–Qəbələ–Oğuz və ya Yevlax yolu) texniki problem yaşayan sürücülər.',
      },
      {
        title: 'Servis və Diaqnostika Daşımaları',
        description: 'Şəkidən Bakıdakı rəsmi avtomobil mərkəzlərinə planlı və ya təcili təmirə göndərilən maşınlar.',
      },
      {
        title: 'Qəzalı və Kilidli Nəqliyyat',
        description: 'Sükanı, təkəri və ya transmissiyası bloklanmış nəqliyyat vasitələrinin təhlükəsiz evakuasiyası.',
      },
      {
        title: '4x4 və Ağır Yolsuzluq Cipləri',
        description: 'Şəki və ətraf dağətəyi kəndlərdə daşıma tələb edən tam ötürücülü avtomobillər.',
      },
    ],
    cargoTypesYukdasima: [
      'Klassik və müasir mebel dəstləri (qonaq, yataq, dolablar)',
      'Böyük ölçülü məişət texnikası və audio-video sistemlər',
      'Şəki sənətkarlıq məhsulları, ipək və qablaşdırılmış qida malları',
      'Fərdi yaşayış əşyaları, xalçalar və arxiv qutuları',
      'Otel, qonaq evi və restoran avadanlıqları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Şəhərdaxili & Regional Transit',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        bestFor: 'Şəkinin dar küçələrinə rahat giriş, kiçik və orta həcmli köçlər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon (Sprinter)',
        specs: 'Həcm: 17 m³ | Yük: 2.5 ton',
        bestFor: '2-3 otaqlı tam mənzil köçü və standart mebel dəstləri.',
      },
      {
        name: '5.5–6 Metrlik İri Tutumlu Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 ton',
        bestFor: 'Geniş həyət evi köçü və toplu kommersiya yükləri.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Sürüşən Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Minik avtomobilləri və krossoverlərin təhlükəsiz daşınması.',
      },
      {
        name: 'Ağır Çəkili Magistral Evakuatoru',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Böyük SUV, pikap və mikroavtobuslar.',
      },
      {
        name: 'Diyircəkli Təkər Arabacıqlı Sistem',
        specs: 'Dolli sistemi ilə',
        bestFor: 'Təkəri və ya transmissiyası bloklanmış qəzalı maşınlar.',
      },
    ],
    pricingFactorsYukdasima: [
      {
        factor: 'Məsafə və Seçilən Yol (305 km)',
        detail: 'M4 (Qəbələ üzərindən) və ya M2/Yevlax magistral dəhlizi.',
      },
      {
        factor: 'Furqon Tutumu və Reys Sayı',
        detail: 'Yükün kubmetrinə uyğun olaraq tək reyslə daşıma təminatı.',
      },
      {
        factor: 'Fəhlə və Mebel Ustası Heyəti',
        detail: 'Mebellərin sökülməsi, qablaşdırılması və quraşdırılması.',
      },
      {
        factor: 'Mərtəbə Şərtləri və Giriş',
        detail: 'Pilləkən mərtəbələri və ya həyət daxilinə daşıma məsafəsi.',
      },
    ],
    pricingFactorsEvakuator: [
      {
        factor: 'Məsafə (305 km)',
        detail: 'Bakı və Şəki nöqtələri arasındakı magistral məsafəsi.',
      },
      {
        factor: 'Nəqliyyat Növü',
        detail: 'Sedan, SUV, tam ötürücülü 4x4 və ya mikroavtobus.',
      },
      {
        factor: 'Nasazlıq Şəraiti',
        detail: 'Sərbəst hərəkət edən və ya təkər kilidi olan vəziyyət.',
      },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Şəkiyə yükdaşıma hansı marşrutla aparılır?',
        answer:
          'Hava və yol şəraitindən asılı olaraq M4 (Bakı–Şamaxı–Qəbələ–Şəki) və ya M2 (Bakı–Kürdəmir–Yevlax–Şəki) sürətli magistralı seçilir. Tranzit müddəti təxminən 4–4.5 saat təşkil edir.',
      },
      {
        question: 'Şəkinin daş döşəməli və ya dar küçələrinə yük maşını daxil ola bilirmi?',
        answer:
          'Bəli, Şəkinin tarixi məhəllələri (Yuxarı Baş, Dodu və s.) üçün xüsusi manevr qabiliyyətinə malik 3–4 metrlik Mercedes Sprinter və Ford Transit furqonları cəlb olunur.',
      },
      {
        question: 'Şəkidən Bakıya əks istiqamətdə yük və əşya köçürmək olarmı?',
        answer:
          'Bəli, Şəki–Bakı marşrutu üzrə fərdi ev köçləri, kənd təsərrüfatı və sənətkarlıq məhsullarının paytaxta gətirilməsi üçün növbətçi və qayıdan yük maşınları təqdim edilir.',
      },
      {
        question: 'Mebellərin qablaşdırılması və quraşdırılması necə aparılır?',
        answer:
          'Təcrübəli mebel ustalarımız mebelləri ehtiyatla sökür, köpüklü material və streçlə bükür, ünvana çatdıqda isə otaqlarda tam şəkildə yığıb təhvil verir.',
      },
      {
        question: 'Şəki ilə yanaşı Qax, Zaqatala və Oğuz istiqamətinə də yük daşıyırsınız?',
        answer:
          'Bəli, Şəki–Zaqatala iqtisadi zonasının bütün rayonlarına (Oğuz, Şəki, Qax, Zaqatala, Balakən) vahid keyfiyyət standartı ilə xidmət göstərilir.',
      },
      {
        question: 'Bakı–Şəki yükdaşıma qiyməti nəyə əsasən müəyyən edilir?',
        answer:
          'Məsafə (305 km), maşın tutumu, fəhlə sayı və mərtəbə şərtləri nəzərə alınır. Dəqiq və şəffaf qiymət üçün 050 250 31 70 ilə əlaqə saxlayın.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Şəkiyə və ya Şəkidən Bakıya evakuator neçə saata çatır?',
        answer:
          'Bakı və Şəki üzrə çıxış 15–30 dəqiqə ərzində icra olunur. Magistral üzrə daşınma müddəti təxminən 4–5 saat çəkir.',
      },
      {
        question: 'Şəkidə nasaz qalmış maşını Bakıdakı rəsmi servisə aparmaq mümkündürmü?',
        answer:
          'Bəli, mühərrik, transmissiya və ya elektronika problemi olan avtomobillər Şəkidən birbaşa Bakıdakı istənilən servis mərkəzinə çatdırılır.',
      },
      {
        question: 'SUV və tam ötürücülü (4x4) maşınların daşınması necə təmin edilir?',
        answer:
          'Bütün 4x4 və avtomat qutulu avtomobillər asma və ötürücü zədələnməsinin qarşısını almaq üçün təkərləri tam platforma üzərinə qaldırılaraq daşınır.',
      },
      {
        question: 'Qəzalı və ya təkəri dönməyən maşın üçün əlavə avadanlıq varmı?',
        answer:
          'Bəli, güclü elektrik bucurqadı və diyircəkli xüsusi təkər arabacıqları ilə qəzalı maşınlar təhlükəsiz yüklənir.',
      },
      {
        question: 'Gecə saatlarında Şəki marşrutu üzrə evakuator çağırmaq mümkündürmü?',
        answer:
          'Bəli, 24/7 rejimində 050 250 31 70 nömrəsi ilə əlaqə saxlayaraq istənilən saatda evakuator sifariş edə bilərsiniz.',
      },
      {
        question: 'Bakı–Şəki evakuasiya tarifi necə hesablanır?',
        answer:
          '305 km məsafə və avtomobilin kateqoriyasına uyğun olaraq şəffaf hesablanır. Cari uyğun qiymət üçün əlaqə saxlayın.',
      },
    ],
  },
  'baki-quba': {
    directAnswerYukdasima:
      'Bakıdan Qubaya yükdaşıma xidməti mümkündürmü? Bəli, M1 magistralı üzrə (168 km) Bakıdan Qubaya və Qubadan Bakıya gündəlik operativ yükdaşıma xidməti təşkil edilir. Bağ və villa köçürülməsi, mənzil əşyaları, kommersiya malları və tikinti materialları üçün 2 metrdən 7 metrədək qapalı furqonlar, fəhlə və mebel ustası xidməti təqdim olunur. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp-dan istifadə edə bilərsiniz.',
    directAnswerEvakuator:
      'Bakıdan Qubaya və Qubadan Bakıya evakuator necə çağırılır? M1 Bakı–Quba sürət yolu boyunca (168 km) 24/7 fasiləsiz operativ evakuator və yol yardımı xidməti göstərilir. Minik, SUV, pikap və texniki nasaz nəqliyyat vasitələri alçaq bucaqlı sürüşən platformalı texnika ilə daşınır. Növbətçi evakuator üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp üzərindən canlı lokasiya göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Bağ Evi və Villa Köçürənlər',
        description: 'Quba, Qəçrəş, Qırmızı Qəsəbə və ətraf dağətəyi kəndlərdəki bağ evlərinə mebel və məişət əşyalarını daşıyan ailələr.',
      },
      {
        title: 'Fərdi Mənzil Köçü',
        description: 'Bakı ilə Quba arasında daimi yaşayış yerini dəyişən və tam əşyalarını bir reyslə etibarlı köçürmək istəyənlər.',
      },
      {
        title: 'Kənd Təsərrüfatı və Ticarət Malları',
        description: 'Qubadan paytaxta kənd təsərrüfatı malları, Bakıdan isə Qubaya kommersiya və ərzaq məhsulları göndərən sahibkarlar.',
      },
      {
        title: 'Tikinti və Təmir Layihələri',
        description: 'Şimal bölgəsindəki fərdi kottec və turizm obyektləri üçün inşaat və təmir avadanlıqlarının daşınması.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'M1 Magistralında Yolda Qalanlar',
        description: 'Bakı–Quba yeni ödənişli və ya standart magistral yolunda texniki nasazlıqla üzləşən sürücülər.',
      },
      {
        title: 'Şahdağ və Quba Turistləri',
        description: 'Qış və yay aylarında Şimal istirahət mərkəzlərinə səyahət edərkən operativ evakuasiyaya ehtiyac duyanlar.',
      },
      {
        title: 'Servis və Dilerə Çatdırılma',
        description: 'Qubadan Bakıdakı ixtisaslaşmış servis və diler mərkəzlərinə planlı və ya qəza sonrası daşınan maşınlar.',
      },
      {
        title: 'Qəzalı və Kilidli Nəqliyyat',
        description: 'Təkəri, asması və ya transmissiyası bloklanmış nəqliyyat vasitələrinin zərərsiz platformaya qaldırılması.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və bağ mebelləri (masalar, yelləncəklər, divanlar)',
      'Böyük məişət avadanlıqları (soyuducular, qızdırıcı sistemlər, TV)',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Tikinti, bağçılıq və təmir ləvazimatları',
      'Meyvə-tərəvəz və qapalı furqonda kommersiya yükləri',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Bortlu & Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        bestFor: 'Bağ ləvazimatları, tək mebel parçaları və təcili kiçik köçlər.',
      },
      {
        name: '4.2 Metrlik Mercedes Sprinter',
        specs: 'Həcm: 16 m³ | Yük: 2.5 ton',
        bestFor: '2-3 otaqlı ev və villa köçü, standart mebel dəstləri.',
      },
      {
        name: '5–6 Metrlik İri Həcmli Furqon',
        specs: 'Həcm: 24–30 m³ | Yük: 3.5 ton',
        bestFor: 'Böyük villa və həyət evi köçürülməsi, anbar və kommersiya yükləri.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Sürüşən Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin sürətli daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Ağır ciplər, pikaplar və dağətəyi yolsuzluq avtomobilləri.',
      },
      {
        name: 'Xüsusi Dolli Təkər Arabacıqlı Sistem',
        specs: 'Köməkçi təkər arabacıqları',
        bestFor: 'Təkəri və ya karobkası kilidlənmiş qəzalı avtomobillər.',
      },
    ],
    pricingFactorsYukdasima: [
      {
        factor: 'M1 Magistral Məsafəsi (168 km)',
        detail: 'Bakıdan Qubanın istənilən ünvanınadək dəqiq məsafə.',
      },
      {
        factor: 'Furqonun Həcmi və Tipi',
        detail: '3m, 4m, 5m və ya 6m qapalı furqon seçimi.',
      },
      {
        factor: 'Fəhlə və Usta Xidməti',
        detail: 'Mebellərin sökülüb yığılması və peşəkar yükləmə.',
      },
      {
        factor: 'Qəçrəş / Dağətəyi Kəndlər Girişi',
        detail: 'Dağlıq və ya bağ massivlərinə daxilolma şəraiti.',
      },
    ],
    pricingFactorsEvakuator: [
      {
        factor: 'Məsafə (168 km)',
        detail: 'Bakı və Quba arasındakı sürət magistralı məsafəsi.',
      },
      {
        factor: 'Avtomobilin Növü və Ağırlığı',
        detail: 'Minik avtomobili, yolsuzluq maşını və ya mikroavtobus.',
      },
      {
        factor: 'Nasazlıq Dərəcəsi',
        detail: 'Təkər fırlanması və ya tam kilidlənmiş vəziyyət.',
      },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Qubaya bağ evi və ya mənzil köçürülməsi nə qədər vaxt aparır?',
        answer:
          'M1 yeni sürət magistralı ilə Bakıdan Qubaya (Qəçrəş, Qırmızı Qəsəbə, mərkəz və kəndlər) daşınma müddəti cəmi 2–2.5 saat təşkil edir.',
      },
      {
        question: 'Qubadan Bakıya geri istiqamətdə kənd təsərrüfatı və ya fərdi yük daşımaq olarmı?',
        answer:
          'Bəli, Quba–Bakı xətti üzrə həm fərdi ev əşyaları, həm də meyvə-tərəvəz və kommersiya malları üçün qapalı furqonlar ayrılır.',
      },
      {
        question: 'Quba dağ kəndlərinə və ya dərə massivlərinə yük maşını gedirmi?',
        answer:
          'Bəli, Qəçrəş, Təngəaltı və digər dağətəyi ərazilərə yüksək keçid qabiliyyətinə malik xüsusi 3m–4m yük maşınları yönləndirilir.',
      },
      {
        question: 'Yüklərin zədələnməməsi üçün hansı qoruyucu tədbirlər görülür?',
        answer:
          'Mebellər streç və hava qabarcıqlı plyonka ilə bükülür, furqon daxilində yan kəmərlərlə möhkəm bərkidilir.',
      },
      {
        question: 'Quba ilə yanaşı Qusar, Xaçmaz və Şahdağ istiqamətlərinə də xidmət göstərilirmi?',
        answer:
          'Bəli, Quba–Xaçmaz iqtisadi zonasının bütün rayonlarına (Şabran, Siyəzən, Quba, Qusar, Xaçmaz, Xudat, Şahdağ) gündəlik reyslər təşkil olunur.',
      },
      {
        question: 'Bakı–Quba yükdaşıma qiyməti necə hesablanır?',
        answer:
          '168 km məsafəyə, avtomobilin həcminə və tələb olunan fəhlə briqadasına əsasən dəqiq hesablanır. 050 250 31 70 ilə dərhal qiymət öyrənə bilərsiniz.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakı–Quba magistralında yolda qalmış avtomobilə evakuator nə qədər vaxta çatır?',
        answer:
          'M1 magistralı və Quba ərazisində növbətçi evakuatorlarımız 15–30 dəqiqə ərzində ünvana çatır.',
      },
      {
        question: 'Quba və Şahdağ zonasından qış aylarında qarda qalmış maşınların evakuasiyası mümkündürmü?',
        answer:
          'Bəli, qış mövsümündə Şahdağ və Quba dağ yollarında sürüşmə və ya xəndəyə düşmə hallarında güclü bucurqadlı xüsusi evakuatorlarımız köməyə çatır.',
      },
      {
        question: 'Qubadan Bakıdakı servisə avtomobil daşıtmaq neçəyə başa gəlir?',
        answer:
          'Qiymət 168 km məsafəyə və avtomobilin modelinə (minik, cip, mikroavtobus) görə müəyyən edilir. Şəffaf və münasib tarif üçün 050 250 31 70 ilə əlaqə saxlayın.',
      },
      {
        question: 'Təkəri kilidlənmiş və ya qəzalı maşınlar necə yüklənir?',
        answer:
          'Təkər arabacıqları və sürüşən hidravlik platforma ilə avtomobilin kuzov və asmasına zərər dəymədən yükləmə icra edilir.',
      },
      {
        question: 'Evakuator xidməti bayram və istirahət günləri işləyirmi?',
        answer:
          'Bəli, 7/24 rejimində fasiləsiz xidmət göstərilir.',
      },
      {
        question: 'Bakıdan Qubaya yeni alınmış və ya nömrəsiz avtomobili daşımaq olarmı?',
        answer:
          'Bəli, tranzit və ya qeydiyyatsız avtomobillər tam sığortalı və təhlükəsiz şəkildə ünvana çatdırılır.',
      },
    ],
  },
  'baki-lenkeran': {
    directAnswerYukdasima:
      'Bakıdan Lənkərana yükdaşıma xidməti mümkündürmü? Bəli, M3 yeni sürətli magistralı boyunca (268 km) Bakıdan Lənkərana və Lənkərandan Bakıya hər gün təhlükəsiz yük və mebel daşınması təmin edilir. Mənzil köçürülməsi, subtropik iqlimə uyğun qapalı izotermik furqonlar, kommersiya və kənd təsərrüfatı yükləri üçün 2 metrdən 7 metrədək yük maşınları və peşəkar fəhlə briqadası fəaliyyət göstərir. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə müraciət edə bilərsiniz.',
    directAnswerEvakuator:
      'Bakıdan Lənkərana və Lənkərandan Bakıya evakuator necə çağırılır? M3 Bakı–Astara magistralı boyunca (268 km) 24/7 operativ evakuator və texniki yardım xidməti mövcuddur. Minik avtomobilləri, yolsuzluq maşınları, pikaplar və qəzalı nəqliyyat vasitələri hidravlik platformalı müasir texnika ilə daşınır. Növbətçi evakuator çağırmaq üçün 050 250 31 70 nömrəsi ilə əlaqə saxlaya və ya WhatsApp-dan lokasiya göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Lənkəran arasında yaşayış yerini dəyişən və mebellərini rütubətdən qorunmuş təmiz furqonda daşıtmaq istəyənlər.',
      },
      {
        title: 'Kənd Təsərrüfatı və Sitrus İstehsalçıları',
        description: 'Lənkərandan Bakı bazarlarına və anbarlarına sitrus, çay, tərəvəz və digər məhsulları çatdıran fermer və sahibkarlar.',
      },
      {
        title: 'Kommersiya və Mağaza Malları',
        description: 'Bakıdan Lənkəran ticarət mərkəzlərinə məişət texnikası, geyim, ərzaq və tikinti malları daşıyan şirkətlər.',
      },
      {
        title: 'Fərdi və Mövsümi Yüklər',
        description: 'Kiçik həcmli fərdi bağ əşyaları, məişət texnikası və ya bağ ləvazimatlarının etibarlı çatdırılması.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'M3 Magistralında Nasaz Qalanlar',
        description: 'Bakı–Ələt–Salyan–Biləsuvar–Cəlilabad–Masallı–Lənkəran sürət yolunda texniki yardıma ehtiyac duyan sürücülər.',
      },
      {
        title: 'Bakıdakı Servisə Daşıma',
        description: 'Lənkəran və ətraf rayonlardan paytaxtdakı rəsmi diler və servis mərkəzlərinə göndərilən maşınlar.',
      },
      {
        title: 'Lerik və Dağətəyi Ərazilərdə Kömək',
        description: 'Lənkəran–Lerik dolama dağ yollarında qəzaya uğrayan və ya xəndəyə düşən avtomobillərə güclü bucurqadlı dəstək.',
      },
      {
        title: 'Ağır SUV, Pikap və Mikroavtobuslar',
        description: 'Cənub bölgəsində hərəkət edən böyük çəkili avtomobillərin gücləndirilmiş platforma ilə daşınması.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri (qonaq, yataq, mətbəx mebeli, yumşaq mebellər)',
      'İri və xırda məişət texnikası (soyuducular, kondisionerlər, TV)',
      'Qapalı izotermik furqonlarda kənd təsərrüfatı və sitrus malları',
      'Qablaşdırılmış fərdi köç qutuları və tekstil məhsulları',
      'Tikinti, təmir materialları və ticarət inventarları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Qapalı Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        bestFor: 'Kiçik köçlər, fərdi bağ əşyaları və təcili yüklər.',
      },
      {
        name: '4.2 Metrlik Mercedes Sprinter / Iveco',
        specs: 'Həcm: 17 m³ | Yük: 2.5 ton',
        bestFor: '2-3 otaqlı mənzil köçü və standart mebel dəstləri üçün ən populyar seçim.',
      },
      {
        name: '5.5–6 Metrlik İri Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 ton',
        bestFor: 'Geniş həyət evi, kommersiya malları və böyük partiyalar.',
      },
      {
        name: '7 Metrlik Böyük Yük Maşını',
        specs: 'Həcm: 38–45 m³ | Yük: 5–10 ton',
        bestFor: 'Toplu kənd təsərrüfatı məhsulları və sənaye daşımaları.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Sürüşən Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek tipli minik maşınlarının sürətli daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5–4 ton',
        bestFor: 'Ağır ciplər, pikaplar və mikroavtobuslar.',
      },
      {
        name: 'Dolli Təkər Arabacıqlı Sistem',
        specs: 'Diyircəkli köməkçi təkərlər',
        bestFor: 'Təkəri və ya elektron əyləci kilidlənmiş qəzalı nəqliyyat vasitələri.',
      },
    ],
    pricingFactorsYukdasima: [
      {
        factor: 'M3 Magistral Məsafəsi (268 km)',
        detail: 'Bakıdan Lənkəranın istənilən qəsəbə və ya kəndinədək məsafə.',
      },
      {
        factor: 'Furqonun Ölçüsü (3m/4m/5m/6m/7m)',
        detail: 'Kuzovun həcminə və yükün çəkisinə görə təyin edilən avtomobil.',
      },
      {
        factor: 'Fəhlə və Mebel Ustası Sayı',
        detail: 'Sökülmə, qablaşdırma və mərtəbələrə daşıma xidməti.',
      },
      {
        factor: 'Qayıdan Boş Maşın İmkanı',
        detail: 'Lənkəran–Bakı və ya Bakı–Lənkəran xəttində qayıdan maşınlarla qənaət fürsəti.',
      },
    ],
    pricingFactorsEvakuator: [
      {
        factor: 'Məsafə (268 km)',
        detail: 'Bakı və Lənkəran arasındakı sürətli magistral kilometrajı.',
      },
      {
        factor: 'Nəqliyyat Növü',
        detail: 'Minik sedan, böyük yolsuzluq cip və ya mikroavtobus.',
      },
      {
        factor: 'Nasazlığın Vəziyyəti',
        detail: 'Diyirlənən təkərlər və ya təkər kilidi olan qəzalı vəziyyət.',
      },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Lənkərana yükdaşıma nə qədər vaxt çəkir?',
        answer:
          'M3 yeni müasir magistral yolu ilə Bakıdan Lənkərana (mərkəz, Haftoni, İstisu, Liman və kəndlər) daşınma müddəti təxminən 3–3.5 saatdır.',
      },
      {
        question: 'Lənkəranın rütubətli iqlimində mebel və texnikanın qorunması necə təmin edilir?',
        answer:
          'Bütün nəqliyyat vasitələrimiz tam qapalı, izolyasiyalı furqonlardır. Mebellər və elektron avadanlıqlar nəm və toz keçirməyən xüsusi qoruyucu plyonkalarla qablaşdırılır.',
      },
      {
        question: 'Lənkərandan Bakıya əks istiqamətdə köç və ya kommersiya malları daşımaq olarmı?',
        answer:
          'Bəli, Lənkəran–Bakı xətti üzrə həm mənzil köçü, həm də sitrus, çay və kənd təsərrüfatı malları üçün gündəlik qayıdan yük maşınlarımız mövcuddur.',
      },
      {
        question: 'Lənkərana mebel ustası və fəhlə xidməti göndərilirmi?',
        answer:
          'Bəli, Bakıda mebelləri sökən, Lənkəranda isə yeni mənzilinizdə quraşdıran peşəkar briqada təmin edilir.',
      },
      {
        question: 'Lənkəran ilə bərabər Masallı, Astara və Lerik rayonlarına da daşınma mümkündürmü?',
        answer:
          'Bəli, Cənub bölgəsinin bütün istiqamətlərinə (Salyan, Biləsuvar, Cəlilabad, Masallı, Lənkəran, Astara, Lerik, Yardımlı) operativ xidmət göstərilir.',
      },
      {
        question: 'Bakı–Lənkəran yükdaşıma qiyməti nədən asılıdır?',
        answer:
          '268 km məsafə, yük maşınının ölçüsü (3m/4m/5m/6m/7m) və əlavə xidmətlər (fəhlə, usta) əsasında hesablanır. 050 250 31 70 ilə dəqiq öyrənə bilərsiniz.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Lənkərana və ya Lənkərandan Bakıya evakuator sifarişi nə qədər vaxta çatır?',
        answer:
          'Bakı və Lənkəranda növbətçi evakuator 15–30 dəqiqəyə ünvana çatır. M3 magistralı üzrə daşınma təxminən 3–3.5 saat davam edir.',
      },
      {
        question: 'Lənkəranda yolda qalmış qəzalı maşını Bakıdakı servisə daşımaq olarmı?',
        answer:
          'Bəli, M3 magistralında və ya Lənkəran daxilində sıradan çıxmış avtomobillər təhlükəsiz şəkildə Bakıdakı diler və ya usta mərkəzinə çatdırılır.',
      },
      {
        question: 'Ağır SUV, mikroavtobus və pikaplar üçün xüsusi evakuator varmı?',
        answer:
          'Bəli, 3.5 tona qədər yük götürmə qabiliyyətinə malik gücləndirilmiş hidravlik platformalarımız xidmətinizdədir.',
      },
      {
        question: 'Təkərləri və ya elektron əyləci kilidlənmiş avtomobil necə yüklənir?',
        answer:
          'Xüsusi diyircəkli təkər arabacıqları (dolli) ilə avtomobil heç bir sürtünmə və zərər olmadan platformaya qaldırılır.',
      },
      {
        question: 'Lənkərandan Lerik dağ yoluna evakuator xidməti göstərilirmi?',
        answer:
          'Bəli, Lənkəran–Lerik dağətəyi və dolama yollarında qəzaya uğramış və ya nasaz maşınlara 24/7 texniki yardım və evakuasiya göstərilir.',
      },
      {
        question: 'Bakı–Lənkəran evakuasiya qiyməti necə təyin edilir?',
        answer:
          '268 km məsafəyə və avtomobilin kateqoriyasına uyğun olaraq şəffaf qiymətləndirilir. Cari qiymət üçün 050 250 31 70 ilə əlaqə saxlayın.',
      },
    ],
  },
};

// Universal fallback order steps
const STANDARD_ORDER_STEPS_YUKDASIMA: RouteOrderStep[] = [
  {
    step: 1,
    title: 'Sifariş və Qiymətləndirmə',
    desc: '050 250 31 70 nömrəsinə zəng edirsiniz və ya WhatsApp vasitəsilə əşyaların fotolarını göndərərək dərhal dəqiq qiymət təklifi alırsınız.',
  },
  {
    step: 2,
    title: 'Avtomobil və Briqada Təyini',
    desc: 'Yükün həcminə uyğun 3m-dən 7m-dək qapalı furqon, mebel ustası və peşəkar fəhlə briqadası seçilərək vaxt dəqiqləşdirilir.',
  },
  {
    step: 3,
    title: 'Qablaşdırma və Bərkidilmə',
    desc: 'Mebellər sökülür, streç və köpüklü materiallarla qablaşdırılır, avtomobilin kuzovunda kəmərlərlə möhkəm fiksasiya edilir.',
  },
  {
    step: 4,
    title: 'Ünvana Təhlükəsiz Çatdırılma',
    desc: 'Təyin olunan magistral marşrutu ilə qapıyadək çatdırılır, mərtəbəyə qaldırılır və mebellər yenidən səliqəli quraşdırılır.',
  },
];

const STANDARD_ORDER_STEPS_EVAKUATOR: RouteOrderStep[] = [
  {
    step: 1,
    title: 'Zəng və Məkan Paylaşımı',
    desc: '050 250 31 70 nömrəsinə zəng edirsiniz və ya WhatsApp-dan dəqiq GPS lokasiyanızı və avtomobilin modelini göndərirsiniz.',
  },
  {
    step: 2,
    title: 'Operativ Çıxış (15–30 dəq)',
    desc: 'Ən yaxın növbətçi hidravlik evakuator dərhal ünvanınıza göndərilir və 15–30 dəqiqə ərzində yerində olur.',
  },
  {
    step: 3,
    title: 'Təhlükəsiz Yükləmə və Fiksasiya',
    desc: 'Avtomobil hidravlik platformaya ehtiyatla qaldırılır və 4 nöqtədən xüsusi təkər kəmərləri ilə bərkidilir.',
  },
  {
    step: 4,
    title: 'Ünvana və ya Servisə Çatdırılma',
    desc: 'Magistral yol ilə birbaşa təyin olunmuş ünvana, evinizə və ya rəsmi servis mərkəzinə təhlükəsiz çatdırılır.',
  },
];

// Helper to determine destination archetype
function getCategory(slug: string, terrain: string): DestinationCategory {
  if (['baki-gence', 'baki-sumqayit', 'baki-xirdalan', 'baki-mingecevir', 'baki-naxcivan', 'baki-seki', 'baki-lenkeran'].includes(slug)) {
    return 'major_city';
  }
  if (['baki-quba', 'baki-qusar', 'baki-qebele', 'baki-ismayilli', 'baki-sahdag', 'baki-nabran', 'baki-susa', 'baki-naftalan'].includes(slug)) {
    return 'tourism_hub';
  }
  if (['baki-sirvan', 'baki-yevlax', 'baki-berde', 'baki-agdas', 'baki-imisli', 'baki-salyan', 'baki-haciqabul'].includes(slug)) {
    return 'industrial_hub';
  }
  if (['baki-qirmizi-korpu', 'baki-astara', 'baki-yalama', 'baki-balaken', 'baki-agbend'].includes(slug)) {
    return 'border_hub';
  }
  if (terrain === 'dağlıq' || ['baki-lerik', 'baki-yardimli', 'baki-gedebey', 'baki-daskesen', 'baki-kelbecer', 'baki-lacin'].includes(slug)) {
    return 'mountain_hub';
  }
  return 'regional_district';
}

function getDistanceTier(km: number): 'suburban' | 'medium' | 'long_haul' {
  if (km <= 110) return 'suburban';
  if (km <= 260) return 'medium';
  return 'long_haul';
}

function getTransitDuration(km: number, isMountain: boolean): string {
  const speed = isMountain ? 50 : 65;
  const hours = km / speed;
  const lower = Math.max(1, Math.floor(hours));
  const upper = Math.ceil(hours + 0.5);
  if (lower === upper) return `təqribən ${lower} saat`;
  return `təqribən ${lower}–${upper} saat`;
}

/**
 * Builds factual, route-specific SEO content profile for each destination
 */
export function generateRouteContentProfile(dest: RegionalDestination): RouteContentProfile {
  const category = getCategory(dest.slug, dest.terrainType);
  const distanceKm = dest.approximateDistanceKm;
  const distanceTier = getDistanceTier(distanceKm);
  const isMountain = dest.terrainType === 'dağlıq' || dest.terrainType === 'dağətəyi';
  const hours = getTransitDuration(distanceKm, dest.terrainType === 'dağlıq');
  const dName = dest.destinationName;

  // Check if this destination is one of our curated pilot or batch regions
  const pilot =
    PILOT_REGIONAL_CONTENT[dest.slug] ||
    BATCH3_REGIONAL_CONTENT[dest.slug] ||
    BATCH4_REGIONAL_CONTENT[dest.slug] ||
    BATCH5_REGIONAL_CONTENT[dest.slug] ||
    BATCH6_REGIONAL_CONTENT[dest.slug];

  // --- 1. Yükdaşıma Descriptions & Text ---
  let yukOverview = '';
  let yukReverse = '';
  let yukVehicleNotes = '';
  let yukLoadingNotes = '';

  if (pilot?.yukdasimaOverview) {
    yukOverview = pilot.yukdasimaOverview;
  } else if (distanceTier === 'suburban') {
    yukOverview = `Bakıdan ${dName} istiqamətinə (${distanceKm} km) yükdaşıma xidməti ${dest.mainCorridor} vasitəsilə operativ şəkildə həyata keçirilir. Yaxın məsafəli daşınmalarda əsas diqqət ünvanın giriş şəraitinə və operativ yükləməyə yönəldilir.`;
    yukReverse = `${dName} ərazisindən Bakıya və Abşeron yarımadasına əks istiqamətdə daşınmalar da eyni qaydada təşkil edilir.`;
    yukVehicleNotes = `Kiçik və orta həcmli mebel, bağ ləvazimatları və ya tikinti yükləri üçün standart 3–4 metrlik yük avtomobilləri kifayət edir. Şəhərətrafı küçələrdə manevr imkanı yüksək olan nəqliyyat vasitələrinə üstünlük verilir.`;
    yukLoadingNotes = `Yüklərin daşınması zamanı liftin olması və ya mərtəbə sayı əvvəlcədən dəqiqləşdirilməli, iri mebellər zədələnməməsi üçün qoruyucu materiallarla bükülməlidir.`;
  } else if (distanceTier === 'medium') {
    yukOverview = `Bakı–${dName} marşrutu (${distanceKm} km) ${dest.mainCorridor} boyunca uzanır və tranzit müddəti ${hours} təşkil edir. Marşrut boyu yüklərin hava şəraitindən və yol vibrasiyasından qorunması vacibdir.`;
    yukReverse = `${dName} rayonundan Bakıya geriyə qayıdan yük avtomobilləri ilə kənd təsərrüfatı malları, fərdi əşyalar və ya kommersiya yüklərinin daşınması mümkündür.`;
    yukVehicleNotes = `Bu məsafədə qapalı furqon və ya tentli 4–5 metrlik nəqliyyat vasitələri tövsiyə olunur. Yükün həcmindən asılı olaraq Mercedes Sprinter, Iveco və ya Qazel tipli maşınlar uyğundur.`;
    yukLoadingNotes = `Orta məsafəli yollarda əşyaların kuzov daxilində xüsusi kəmərlərlə fiksasiyası məcburidir ki, döngələrdə və əyləc zamanı yerdəyişmə baş verməsin.`;
  } else {
    yukOverview = `Bakıdan ${dName} istiqamətinə uzun məsafəli (${distanceKm} km) yükdaşıma ${dest.mainCorridor} üzrə planlaşdırılır. Yük maşınının tranzit müddəti ${hours} çəkir və xüsusi yol təhlükəsizliyi qaydalarına riayət olunur.`;
    yukReverse = `${dName}–Bakı əks marşrutu üzrə məhsulların və ya köç əşyalarının paytaxta gətirilməsi üçün marşrut üzərində olan nəqliyyat vasitələrindən istifadə edilə bilər.`;
    yukVehicleNotes = `Uzun məsafələrdə tam qapalı izotermik və ya tentli 5–7 metrlik yük avtomobilləri seçilməlidir. Böyük həcmli köçlərdə 20–35 kubmetrlik furqonlar əşyaların bir reyslə çatdırılmasını təmin edir.`;
    yukLoadingNotes = `Uzun yol rejimi üçün həssas mebellərin qablaşdırılması, texniki avadanlıqların bərkidilməsi və ağırlığın oxlar üzrə düzgün paylanması zəruridir.`;
  }

  // Route-specific texts written for this destination replace the generated ones
  if (pilot?.yukdasimaReverseOverview) yukReverse = pilot.yukdasimaReverseOverview;
  if (pilot?.yukdasimaVehicleNotes) yukVehicleNotes = pilot.yukdasimaVehicleNotes;
  if (pilot?.yukdasimaLoadingNotes) yukLoadingNotes = pilot.yukdasimaLoadingNotes;

  if (isMountain && !pilot?.yukdasimaOverview) {
    yukOverview += ` Dağlıq və dağətəyi relyef nəzərə alınaraq nəqliyyatın texniki sazlığına və əyləc sisteminə ciddi nəzarət edilir.`;
  }

  // --- 2. Yükdaşıma FAQs ---
  let yukFaqs: RouteFaqItem[] = [];
  if (pilot?.yukdasimaFaqs) {
    yukFaqs = pilot.yukdasimaFaqs;
  } else {
    yukFaqs = [
      {
        question: `Bakıdan ${dName} istiqamətinə yükdaşıma necə təşkil olunur?`,
        answer: `Sifariş zamanı yükün həcmi, ünvanlar və tələb olunan xidmətlər (fəhlə, mebel ustası) dəqiqləşdirilir. Təyin olunan vaxtda uyğun tutumlu yük maşını ünvana yönləndirilir və ${dest.mainCorridor} vasitəsilə ${distanceKm} km məsafə qət edilir.`,
      },
      {
        question: `${dName} rayonundan Bakıya əks istiqamətdə daşıma mümkündürmü?`,
        answer: `Bəli, ${dName}–Bakı marşrutu üzrə həm fərdi ev əşyaları, həm də kommersiya yükləri üçün nəqliyyat təşkil edilir. Əks istiqamətdə boş qayıdan avtomobillərin mövcudluğu operativ planlamaya imkan verir.`,
      },
      {
        question: `Bakı–${dName} (${distanceKm} km) marşrutu üçün hansı yük maşını daha uyğundur?`,
        answer: `Yüngül əşyalar və kiçik köçlər üçün 3 metrlik bortlu/tentli avtomobillər, 2-3 otaqlı mənzil köçü üçün isə 4.2–5 metrlik qapalı furqonlar (Mercedes Sprinter / Iveco) tövsiyə edilir.`,
      },
      {
        question: `Daşıma qiyməti hansı amillərə əsasən hesablanır?`,
        answer: `Məzənnə və ya sabit qiymət vəd edilmir; daşıma dəyəri marşrut məsafəsi (${distanceKm} km), seçilən yük maşınının növü, fəhlə sayı, mərtəbə dərəcəsi və xüsusi qablaşdırma tələblərinə görə fərdi formalaşır.`,
      },
    ];

    if (isMountain) {
      yukFaqs.push({
        question: `${dName} ərazisinin dağ relyefi daşıma müddətinə təsir edirmi?`,
        answer: `Bəli, ${dName} istiqamətindəki enişli-yoxuşlu yol şəraiti nəzərə alınaraq hərəkət sürəti təhlükəsiz həddə saxlanılır. Təxmini çatma müddəti ${hours} təşkil edir.`,
      });
    } else {
      yukFaqs.push({
        question: `Fəhlə və mebel ustası xidməti ayrılıqda təmin edilirmi?`,
        answer: `Bəli, istəyinizə uyğun olaraq yalnız yük maşını sifariş edə və ya sökülmə-quraşdırılma üzrə təcrübəli mebel ustası və peşəkar fəhlə briqadası əlavə edə bilərsiniz.`,
      });
    }
  }

  // --- 3. Evakuator Descriptions & Text ---
  let evacOverview = '';
  let evacReverse = '';
  let evacPlatformNotes = '';

  if (pilot?.evakuatorOverview) {
    evacOverview = pilot.evakuatorOverview;
  } else if (distanceTier === 'suburban') {
    evacOverview = `Bakıdan ${dName} istiqamətinə (${distanceKm} km) 24/7 operativ evakuasiya xidməti təqdim olunur. Şəhərətrafı və Abşeron yollarında qəzalı və ya nasaz nəqliyyat vasitələrinin daşınması təhlükəsiz hidravlik platformalarla icra edilir.`;
    evacReverse = `${dName} qəsəbə və massivlərindən Bakıdakı rəsmi servis və ya təmir mərkəzlərinə avtomobillərin çatdırılması fasiləsiz təşkil olunur.`;
    evacPlatformNotes = `Sedan, hetçbek və krossoverlər standart sürüşən platformalı evakuatorla təxliyə edilir. Təkər kilidlənməsi halında xüsusi dolayı təkər arabacıqlarından istifadə olunur.`;
  } else if (distanceTier === 'medium') {
    evacOverview = `Bakı–${dName} magistralı üzrə (${distanceKm} km, ${dest.mainCorridor}) nasaz və ya hərəkətsiz qalmış minik, yolsuzluq və mikroavtobusların evakuasiyası həyata keçirilir.`;
    evacReverse = `${dName} rayonundan Bakıya avtomobillərin planlı təmiri, sənədləşməsi və ya daşınması üçün ikitərəfli evakuator xidməti mövcuddur.`;
    evacPlatformNotes = `Orta məsafəli tranzitlərdə avtomobilin 4 nöqtədən təkər fiksasiya kəmərləri ilə bərkidilməsi hərəkət təhlükəsizliyini tam təmin edir.`;
  } else {
    evacOverview = `Bakı ilə ${dName} arasında (${distanceKm} km) uzaq məsafəli magistral evakuasiya xidməti təşkil olunur. ${dest.mainCorridor} boyunca hərəkət edən evakuatorlarımız avtomobilinizi təhlükəsiz şəkildə ünvana çatdırır.`;
    evacReverse = `${dName} və ətraf rayonlardan paytaxt Bakıya zədəli və ya texniki nasaz nəqliyyat vasitələrinin etibarlı daşınması təmin edilir.`;
    evacPlatformNotes = `Uzun məsafəli daşımalarda ağır yolsuzluq avtomobilləri, mikroavtobuslar və ya xüsusi texnikalar üçün gücləndirilmiş platforma və elektrikli bucurqad (lebyodka) tətbiq olunur.`;
  }

  if (pilot?.evakuatorReverseOverview) evacReverse = pilot.evakuatorReverseOverview;
  if (pilot?.evakuatorPlatformNotes) evacPlatformNotes = pilot.evakuatorPlatformNotes;

  // --- 4. Evakuator FAQs ---
  let evacFaqs: RouteFaqItem[] = [];
  if (pilot?.evakuatorFaqs) {
    evacFaqs = pilot.evakuatorFaqs;
  } else {
    evacFaqs = [
      {
        question: `Bakıdan ${dName} istiqamətinə evakuator necə sifariş edilir?`,
        answer: `050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp üzərindən avtomobilinizin markasını, nasazlıq vəziyyətini (sükan və ya təkər kilidi) və dəqiq koordinatları bildirməklə dərhal uyğun evakuator təyin edilir.`,
      },
      {
        question: `${dName} ərazisindən Bakıya avtomobil daşımaq mümkündürmü?`,
        answer: `Bəli, ${dName} rayonundan Bakıya fərdi avtomobillərin, qəzalı nəqliyyat vasitələrinin və ya təmirdən sonra qaytarılan maşınların təhlükəsiz daşınması icra edilir.`,
      },
      {
        question: `Avtomobilin təkərləri kilidlənibsə platformaya necə yüklənir?`,
        answer: `Sükan və ya təkər kilidlənməsi olan avtomobillər üçün xüsusi köməkçi təkər arabacıqları (dolli) və güclü bucurqad sistemindən istifadə olunaraq avtomobilə zərər vermədən platformaya qaldırılır.`,
      },
      {
        question: `Gecə saatlarında və ya bayram günlərində evakuator işləyirmi?`,
        answer: `Bəli, xidmət 7/24 rejimində fasiləsiz fəaliyyət göstərir. İstənilən saatda operativ dispetçer mərkəzi ilə əlaqə saxlaya bilərsiniz.`,
      },
    ];

    if (isMountain) {
      evacFaqs.push({
        question: `${dName} dağ yollarında xüsusi evakuator tələb olunurmu?`,
        answer: `Enişli-yoxuşlu dağ yollarında avtomobilin platformada dayanıqlı bərkidilməsi və güclü tormoz sisteminə malik xüsusi evakuator nəqliyyatı cəlb olunur.`,
      });
    } else {
      evacFaqs.push({
        question: `Evakuator xidmətinin qiyməti necə müəyyənləşir?`,
        answer: `Sabit qiymət qoyulmur; xidmət haqqı məsafə (${distanceKm} km), avtomobilin çəkisi, nasazlığın xarakteri və yükləmə şəraitinin mürəkkəbliyinə əsasən hesablanır.`,
      });
    }
  }

  // --- 5. Meta Titles & Descriptions with controlled variety ---
  let metaTitleYuk = '';
  let metaDescYuk = '';
  let metaTitleEvac = '';
  let metaDescEvac = '';

  if (category === 'major_city') {
    metaTitleYuk = `Bakı ${dName} Yükdaşıma Xidməti | Mebel və Yük Köçürülməsi`;
    metaDescYuk = `Bakıdan ${dName} şəhərinə və əks istiqamətdə (${distanceKm} km) təhlükəsiz yükdaşıma. 3m-dən 7m-dək qapalı maşınlar, mebel ustası və fəhlə. Dərhal cari qiyməti öyrən: 050 250 31 70.`;
    metaTitleEvac = `Bakı ${dName} Evakuator | 24/7 Avtomobil Daşıma | yukdasima.ai`;
    metaDescEvac = `Bakı–${dName} marşrutu üzrə (${distanceKm} km) 24/7 operativ evakuator xidməti. Minik və yolsuzluq maşınlarının təhlükəsiz daşınması. Qiyməti öyrən: 050 250 31 70.`;
  } else if (category === 'tourism_hub') {
    metaTitleYuk = `Bakı ${dName} Yükdaşıma | Bağ Evi və Mənzil Köçürülməsi`;
    metaDescYuk = `Bakıdan ${dName} bölgəsinə (${distanceKm} km) sürətli və etibarlı yükdaşıma. Əşyaların xüsusi qablaşdırılması və peşəkar fəhlə xidməti. Təklif al: 050 250 31 70.`;
    metaTitleEvac = `Bakı ${dName} Evakuator Xidməti | 7/24 Yol Yardımı`;
    metaDescEvac = `Bakıdan ${dName} istiqamətinə (${distanceKm} km) operativ evakuator və texniki yardım. Dağətəyi və magistral yollarda 24/7 xidmət. Əlaqə: 050 250 31 70.`;
  } else if (category === 'mountain_hub') {
    metaTitleYuk = `Bakı ${dName} Yükdaşıma | Dağ Bölgələrinə Təhlükəsiz Çatdırılma`;
    metaDescYuk = `Bakı–${dName} istiqamətində (${distanceKm} km) dağ marşrutu üzrə etibarlı yükdaşıma. Qapalı furqonlar və təcrübəli sürücülər. Cari qiyməti dəqiqləşdir: 050 250 31 70.`;
    metaTitleEvac = `Bakı ${dName} Evakuator | 24/7 Dağ Yolları Evakuasiyası`;
    metaDescEvac = `Bakıdan ${dName} rayonuna (${distanceKm} km) gücləndirilmiş platformalı evakuator xidməti. Nasaz və qəzalı maşınların etibarlı daşınması: 050 250 31 70.`;
  } else {
    metaTitleYuk = `Bakı ${dName} Yükdaşıma Xidməti | Sərfəli Tariflər | yukdasima.ai`;
    metaDescYuk = `Bakıdan ${dName} rayonuna və geriyə (${distanceKm} km) operativ yükdaşıma xidməti. Mebel, fərdi əşyalar və kommersiya yükləri. Zəng et: 050 250 31 70.`;
    metaTitleEvac = `Bakı ${dName} Evakuator | 7/24 Sürətli Xidmət | yukdasima.ai`;
    metaDescEvac = `Bakıdan ${dName} istiqamətinə və geriyə (${distanceKm} km) 24/7 operativ evakuator xidməti. Təhlükəsiz fiksasiya, dərhal cari qiyməti öyrən: 050 250 31 70.`;
  }

  // Direct answers
  const directAnswerYukdasima =
    pilot?.directAnswerYukdasima ||
    `Bakıdan ${dName} istiqamətinə yükdaşıma xidməti mümkündürmü? Bəli, ${dest.mainCorridor} boyunca (${distanceKm} km) Bakıdan ${dName} rayonuna və əks istiqamətdə hər gün təhlükəsiz yükdaşıma xidməti göstərilir. Mənzil köçürülməsi, mebel daşınması, fərdi və kommersiya yükləri üçün 2 metrdən 7 metrədək qapalı furqonlar təmin edilir. Dərhal sifariş üçün 050 250 31 70 nömrəsi ilə əlaqə saxlaya və ya WhatsApp vasitəsilə müraciət edə bilərsiniz.`;

  const directAnswerEvakuator =
    pilot?.directAnswerEvakuator ||
    `Bakıdan ${dName} istiqamətinə evakuator necə sifariş edilir? ${dest.mainCorridor} üzrə (${distanceKm} km) 24/7 operativ evakuasiya və yol yardımı xidməti fəaliyyət göstərir. Minik, SUV, pikap və qəzalı nəqliyyat vasitələri hidravlik platforma ilə daşınır. Növbətçi evakuator çağırmaq üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp üzərindən lokasiya göndərə bilərsiniz.`;

  const targetAudienceYukdasima = pilot?.targetAudienceYukdasima || [
    {
      title: 'Mənzil və Ev Köçürənlər',
      description: `Bakı ilə ${dName} arasında yaşayış yerini dəyişən və bütün əşyalarını bir reyslə təhlükəsiz daşıtmaq istəyən ailələr.`,
    },
    {
      title: 'Bağ və Fərdi Mülk Sahibləri',
      description: `${dName} ərazisindəki bağ və həyət evlərinə mebel, texnika və bağ ləvazimatlarını köçürən vətəndaşlar.`,
    },
    {
      title: 'Ticarət və Sahibkarlar',
      description: `Bölgə üzrə ticarət obyektlərinə ərzaq, qeyri-ərzaq malları və avadanlıq göndərən şirkətlər.`,
    },
    {
      title: 'Fərdi Əşya və Kiçik Yüklər',
      description: `Tələbələr və fərdi şəxslər üçün soyuducu, paltaryuyan və ya qablaşdırılmış qutuların sərfəli daşınması.`,
    },
  ];

  const targetAudienceEvakuator = pilot?.targetAudienceEvakuator || [
    {
      title: 'Magistralda Nasaz Qalan Sürücülər',
      description: `${dest.mainCorridor} boyunca mühərrik, transmissiya və ya elektrik nasazlığı səbəbindən yolda qalanlar.`,
    },
    {
      title: 'Qəzalı Avtomobil Sahibləri',
      description: `Qəza nəticəsində hərəkətsiz qalan, sükanı və ya təkəri kilidlənmiş avtomobillərin təhlükəsiz daşınması.`,
    },
    {
      title: 'Servis və Diler Mərkəzlərinə Çatdırılma',
      description: `${dName} və Bakıdakı rəsmi diler və təmir mərkəzlərinə nəqliyyat vasitələrinin çatdırılması.`,
    },
    {
      title: 'Ağır Yolsuzluq və SUV Avtomobilləri',
      description: `3.5 tona qədər ağır ciplər, pikaplar və mikroavtobusların gücləndirilmiş platforma ilə daşınması.`,
    },
  ];

  const cargoTypesYukdasima = pilot?.cargoTypesYukdasima || [
    'Mebel dəstləri (qonaq, yataq, mətbəx mebelləri, dolablar)',
    'Məişət texnikası (soyuducu, paltaryuyan, qabyuyan, TV)',
    'Qablaşdırılmış fərdi əşyalar və arxiv qutuları',
    'Kommersiya malları və tikinti materialları',
    'Həssas əşyalar və musiqi alətləri',
  ];

  const vehicleTypesYukdasima = pilot?.vehicleTypesYukdasima || [
    {
      name: '3 Metrlik Bortlu / Qapalı Furqon',
      specs: 'Həcm: 10 m³ | Yük: 1.5 tona qədər',
      bestFor: '1 otaqlı mənzil, bağ ləvazimatları və kiçik köçlər.',
    },
    {
      name: '4.2 Metrlik Mercedes Sprinter / Iveco',
      specs: 'Həcm: 16–18 m³ | Yük: 2.5 tona qədər',
      bestFor: '2-3 otaqlı tam mənzil köçü və standart mebel dəstləri.',
    },
    {
      name: '5.5–6 Metrlik Böyük Furqon',
      specs: 'Həcm: 24–30 m³ | Yük: 3.5 tona qədər',
      bestFor: 'Geniş həyət evi, kommersiya malları və böyük partiyalar.',
    },
  ];

  const vehicleTypesEvakuator = pilot?.vehicleTypesEvakuator || [
    {
      name: 'Standart Hidravlik Sürüşən Platforma',
      specs: 'Yük tutumu: 2.5 ton',
      bestFor: 'Sedan, hetçbek və kiçik krossoverlərin təhlükəsiz daşınması.',
    },
    {
      name: 'Gücləndirilmiş SUV Platforması',
      specs: 'Yük tutumu: 3.5 ton',
      bestFor: 'Ağır ciplər, pikaplar və dağətəyi yolsuzluq avtomobilləri.',
    },
    {
      name: 'Diyircəkli Təkər Arabacıqlı Sistem (Dolli)',
      specs: 'Köməkçi təkər arabacıqları',
      bestFor: 'Təkəri və ya karobkası kilidlənmiş qəzalı avtomobillər.',
    },
  ];

  const pricingFactorsYukdasima = pilot?.pricingFactorsYukdasima || [
    {
      factor: `Marşrut Məsafəsi (${distanceKm} km)`,
      detail: `Bakı və ${dName} arasındakı əsas magistral kilometrajı.`,
    },
    {
      factor: 'Nəqliyyat Növü və Tutumu',
      detail: '3m, 4m, 5m və ya 6m qapalı furqonun həcmi və yanacaq sərfiyyatı.',
    },
    {
      factor: 'Fəhlə və Mebel Ustası Sayı',
      detail: 'Mebellərin sökülməsi, qablaşdırılması və mərtəbələrə daşınması.',
    },
    {
      factor: 'Giriş və Mərtəbə Şərtləri',
      detail: 'Liftin olub-olmaması və həyət daxili daşıma məsafəsi.',
    },
  ];

  const pricingFactorsEvakuator = pilot?.pricingFactorsEvakuator || [
    {
      factor: `Magistral Məsafəsi (${distanceKm} km)`,
      detail: `Bakı və ${dName} arasındakı faktiki evakuasiya məsafəsi.`,
    },
    {
      factor: 'Nəqliyyat Növü və Çəkisi',
      detail: 'Sedan (1.5t), böyük SUV (2.5t+) və ya mikroavtobus.',
    },
    {
      factor: 'Nasazlıq Şəraiti',
      detail: 'Sərbəst diyirlənən təkərlər və ya kilidlənmiş qəzalı vəziyyət.',
    },
  ];

  return {
    slug: dest.slug,
    destination: dName,
    category,
    distanceKm,
    corridor: dest.mainCorridor,
    economicRegion: dest.economicRegion,
    terrain: dest.terrainType,
    distanceTier,
    estimatedHours: hours,
    directAnswerYukdasima,
    directAnswerEvakuator,
    targetAudienceYukdasima,
    targetAudienceEvakuator,
    cargoTypesYukdasima,
    vehicleTypesYukdasima,
    vehicleTypesEvakuator,
    pricingFactorsYukdasima,
    pricingFactorsEvakuator,
    orderStepsYukdasima: STANDARD_ORDER_STEPS_YUKDASIMA,
    orderStepsEvakuator: STANDARD_ORDER_STEPS_EVAKUATOR,
    yukdasimaOverview: yukOverview,
    yukdasimaReverseOverview: yukReverse,
    yukdasimaVehicleNotes: yukVehicleNotes,
    yukdasimaLoadingNotes: yukLoadingNotes,
    yukdasimaFaqs: yukFaqs,
    evakuatorOverview: evacOverview,
    evakuatorReverseOverview: evacReverse,
    evakuatorPlatformNotes: evacPlatformNotes,
    evakuatorFaqs: evacFaqs,
    metaTitleYukdasima: metaTitleYuk,
    metaDescYukdasima: metaDescYuk,
    metaTitleEvakuator: metaTitleEvac,
    metaDescEvakuator: metaDescEvac,
  };
}

// Precomputed map of all 84 regional profiles
export const ROUTE_CONTENT_PROFILES: Record<string, RouteContentProfile> = {};

for (const [slug, dest] of Object.entries(REGIONAL_DESTINATIONS)) {
  ROUTE_CONTENT_PROFILES[slug] = generateRouteContentProfile(dest);
}

export function getRouteContentProfile(slug: string): RouteContentProfile | undefined {
  return ROUTE_CONTENT_PROFILES[slug];
}
