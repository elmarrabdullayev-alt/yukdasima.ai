import { REGIONAL_DESTINATIONS, RegionalDestination } from './regionalData';

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

  // --- 1. Yükdaşıma Descriptions & Text ---
  let yukOverview = '';
  let yukReverse = '';
  let yukVehicleNotes = '';
  let yukLoadingNotes = '';

  if (distanceTier === 'suburban') {
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

  if (isMountain) {
    yukOverview += ` Dağlıq və dağətəyi relyef nəzərə alınaraq nəqliyyatın texniki sazlığına və əyləc sisteminə ciddi nəzarət edilir.`;
  }

  // --- 2. Yükdaşıma FAQs ---
  const yukFaqs: RouteFaqItem[] = [
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

  // --- 3. Evakuator Descriptions & Text ---
  let evacOverview = '';
  let evacReverse = '';
  let evacPlatformNotes = '';

  if (distanceTier === 'suburban') {
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

  // --- 4. Evakuator FAQs ---
  const evacFaqs: RouteFaqItem[] = [
    {
      question: `Bakıdan ${dName} istiqamətinə evakuator necə sifariş edilir?`,
      answer: `050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp üzərindən avtomobilinizin markasını, nasazlıq vəziyyətini (sükan və ya təkər kilidi) və dəqiq koordinatları bildirməklə dərhal uyğun evakuator təyin edilir.`,
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

  // --- 5. Meta Titles & Descriptions with controlled variety ---
  let metaTitleYuk = '';
  let metaDescYuk = '';
  let metaTitleEvac = '';
  let metaDescEvac = '';

  if (category === 'major_city') {
    metaTitleYuk = `Bakı ${dName} Yükdaşıma Xidməti | Mebel və Yük Köçürülməsi`;
    metaDescYuk = `Bakıdan ${dName} şəhərinə və əks istiqamətdə (${distanceKm} km) təhlükəsiz yükdaşıma. 3m-dən 7m-dək qapalı maşınlar, mebel ustası və fəhlə. Dərhal cari qiyməti öyrən: 050 231 17 28.`;
    metaTitleEvac = `Bakı ${dName} Evakuator | 24/7 Avtomobil Daşıma | yukdasima.ai`;
    metaDescEvac = `Bakı–${dName} marşrutu üzrə (${distanceKm} km) 24/7 operativ evakuator xidməti. Minik və yolsuzluq maşınlarının təhlükəsiz daşınması. Qiyməti öyrən: 050 231 17 28.`;
  } else if (category === 'tourism_hub') {
    metaTitleYuk = `Bakı ${dName} Yükdaşıma | Bağ Evi və Mənzil Köçürülməsi`;
    metaDescYuk = `Bakıdan ${dName} bölgəsinə (${distanceKm} km) sürətli və etibarlı yükdaşıma. Əşyaların xüsusi qablaşdırılması və peşəkar fəhlə xidməti. Təklif al: 050 231 17 28.`;
    metaTitleEvac = `Bakı ${dName} Evakuator Xidməti | 7/24 Yol Yardımı`;
    metaDescEvac = `Bakıdan ${dName} istiqamətinə (${distanceKm} km) operativ evakuator və texniki yardım. Dağətəyi və magistral yollarda 24/7 xidmət. Əlaqə: 050 231 17 28.`;
  } else if (category === 'mountain_hub') {
    metaTitleYuk = `Bakı ${dName} Yükdaşıma | Dağ Bölgələrinə Təhlükəsiz Çatdırılma`;
    metaDescYuk = `Bakı–${dName} istiqamətində (${distanceKm} km) dağ marşrutu üzrə etibarlı yükdaşıma. Qapalı furqonlar və təcrübəli sürücülər. Cari qiyməti dəqiqləşdir: 050 231 17 28.`;
    metaTitleEvac = `Bakı ${dName} Evakuator | 24/7 Dağ Yolları Evakuasiyası`;
    metaDescEvac = `Bakıdan ${dName} rayonuna (${distanceKm} km) gücləndirilmiş platformalı evakuator xidməti. Nasaz və qəzalı maşınların etibarlı daşınması: 050 231 17 28.`;
  } else {
    metaTitleYuk = `Bakı ${dName} Yükdaşıma Xidməti | Sərfəli Tariflər | yukdasima.ai`;
    metaDescYuk = `Bakıdan ${dName} rayonuna və geriyə (${distanceKm} km) operativ yükdaşıma xidməti. Mebel, fərdi əşyalar və kommersiya yükləri. Zəng et: 050 231 17 28.`;
    metaTitleEvac = `Bakı ${dName} Evakuator | 7/24 Sürətli Xidmət | yukdasima.ai`;
    metaDescEvac = `Bakıdan ${dName} istiqamətinə və geriyə (${distanceKm} km) 24/7 operativ evakuator xidməti. Təhlükəsiz fiksasiya, dərhal cari qiyməti öyrən: 050 231 17 28.`;
  }

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
