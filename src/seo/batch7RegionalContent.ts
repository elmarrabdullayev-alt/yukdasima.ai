import { PilotContent, RouteVehicleType, RouteTargetAudience, RouteFaqItem } from './regionalContent';

/**
 * BATCH 7 — route-specific content for the remaining 29 routes that used only the generated
 * template. Only facts the author is confident in are stated (road, landmarks, terrain, what
 * people typically order). Where details are uncertain (exact district of a small village,
 * travel hours, tunnel/airport status) the text stays general on purpose.
 */

const PHONE = '050 250 31 70';

const STANDARD_TRUCKS: RouteVehicleType[] = [
  { name: '3 Metrlik Furqon', specs: 'Yük həcmi: ~6 m³', bestFor: 'Fərdi əşyalar, bir neçə mebel və qutular.' },
  { name: '4–5 Metrlik Qapalı Furqon', specs: 'Yük həcmi: ~13–16 m³', bestFor: '2–3 otaqlı mənzil və ofis köçü.' },
  { name: '6–7 Metrlik Böyük Furqon', specs: 'Yük həcmi: ~27–32 m³', bestFor: 'Böyük ev köçləri və həcmli yüklər.' },
];

const EVAC_FLAT: RouteVehicleType[] = [
  { name: 'Standart Sürüşən Platforma', specs: 'Sedan, hetçbek, krossover', bestFor: 'Yolda nasaz qalan minik avtomobilləri.' },
  { name: 'Gücləndirilmiş SUV Platforması', specs: 'Ağır cip və pikaplar', bestFor: 'Yolsuzluq avtomobilləri və minivanlar.' },
  { name: 'Dolli və Bucurqad', specs: 'Kilidli təkər və sükan üçün', bestFor: 'Qəzalı və təkəri fırlanmayan avtomobillər.' },
];

const EVAC_MOUNTAIN: RouteVehicleType[] = [
  { name: 'Bucurqadlı Gücləndirilmiş Platforma', specs: 'Elektrik bucurqad, 4 nöqtəli fiksasiya', bestFor: 'Yoxuşda və dar dağ yolunda yükləmə.' },
  { name: 'Gücləndirilmiş SUV Platforması', specs: 'Ağır cip və pikaplar', bestFor: 'Dağ ərazisindən yolsuzluq avtomobillərinin çıxarılması.' },
  { name: 'Dolli və Bucurqad', specs: 'Kilidli təkər və sükan üçün', bestFor: 'Qəzalı və təkəri fırlanmayan avtomobillər.' },
];

const KARABAKH_ACCESS_NOTE =
  'Qarabağ və Şərqi Zəngəzur bölgəsinə səfər və yük daşınması üçün qüvvədə olan giriş qaydaları sifariş zamanı operatorla əvvəlcədən dəqiqləşdirilir.';

interface RouteFacts {
  name: string;
  dative: string;
  ablative: string;
  km: number;
  mountain: boolean;
  karabakh?: boolean;
  /** Short answer box: what this route is, the road, the typical order. */
  answer: string;
  answerEvac: string;
  overview: string;
  reverse?: string;
  vehicle: string;
  loading: string;
  evac: string;
  audiences: RouteTargetAudience[];
  evacAudiences: RouteTargetAudience[];
  cargo: string[];
  priceFactors: { factor: string; detail: string }[];
  evacFactor: { factor: string; detail: string };
  faqs: RouteFaqItem[];
  evacFaqs: RouteFaqItem[];
}

function build(f: RouteFacts): PilotContent {
  const access = f.karabakh ? ` ${KARABAKH_ACCESS_NOTE}` : '';
  const yukFaqs: RouteFaqItem[] = [...f.faqs];
  const evacFaqs: RouteFaqItem[] = [...f.evacFaqs];
  if (f.karabakh) {
    yukFaqs.push({
      question: `${f.dative} yük aparmaq üçün icazə lazımdır?`,
      answer: `${f.name} istiqamətinə yük maşınının girişi üçün qüvvədə olan qaydalar və lazım olan sənədlər sifariş verərkən operatorla dəqiqləşdirilir.`,
    });
  }
  yukFaqs.push({
    question: `${f.ablative} Bakıya da daşıyırsınız?`,
    answer: `Bəli, ${f.name}–Bakı istiqamətində də (${f.km} km) daşınma təşkil edilir; bu istiqamət üçün qiymət operatorla dəqiqləşdirilir.`,
  });
  evacFaqs.push({
    question: 'İşləməyən və ya təkəri kilidli avtomobil üçün qiymət dəyişir?',
    answer: 'Bəli, kilidli təkər və ya sükan üçün +5 AZN, minivan üçün +10 AZN əlavə olunur; mikroavtobus fərdi hesablanır.',
  });

  return {
    directAnswerYukdasima: `${f.answer}${access} Sifariş: ${PHONE}.`,
    directAnswerEvakuator: `${f.answerEvac}${access} Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: f.audiences,
    targetAudienceEvakuator: f.evacAudiences,
    cargoTypesYukdasima: f.cargo,
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: f.mountain ? EVAC_MOUNTAIN : EVAC_FLAT,
    pricingFactorsYukdasima: [
      ...f.priceFactors,
      { factor: 'Fəhlə', detail: 'Rayonlararası sifarişdə fəhlə xidməti ayrıca hesablanır.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Marşrut', detail: `Bakı–${f.name} istiqamətinin tarif bazasındakı evakuator qiyməti əsas götürülür.` },
      { factor: 'Avtomobil Növü', detail: 'Sedan, hetçbek və SUV üçün əlavə yoxdur; minivan +10 AZN; mikroavtobus fərdi hesablanır.' },
      { factor: 'Texniki Vəziyyət', detail: 'Təkəri və ya sükanı kilidli, işə düşməyən avtomobil +5 AZN.' },
      f.evacFactor,
    ],
    yukdasimaOverview: f.overview,
    yukdasimaReverseOverview:
      f.reverse || `${f.ablative} Bakıya köç və yük daşınması da mümkündür; əks istiqamət üçün qiymət operatorla dəqiqləşdirilir.`,
    yukdasimaVehicleNotes: f.vehicle,
    yukdasimaLoadingNotes: f.loading,
    evakuatorOverview: f.evac,
    evakuatorReverseOverview: `${f.ablative} Bakıdakı servislərə avtomobil daşınması üçün sifariş qəbul edilir; şərtlər operatorla dəqiqləşdirilir.`,
    yukdasimaFaqs: yukFaqs,
    evakuatorFaqs: evacFaqs,
  };
}

const ROUTES: Record<string, RouteFacts> = {
  // ------------------------------------------------------------- Abşeron / Şirvan yaxınlığı
  'baki-qobustan-qaradag': {
    name: 'Qobustan (Qaradağ)', dative: 'Qobustana', ablative: 'Qobustandan', km: 65, mountain: false,
    answer: 'Bakıdan Qaradağ rayonundakı Qobustan qəsəbəsinə yükdaşıma Bakı–Ələt yolu ilə (65 km) aparılır. Yaxın məsafə olduğu üçün köç adətən yarım gündə tamamlanır; qəsəbədəki evlərə mebel, tikinti-təmir yükləri və kiçik müəssisələrə avadanlıq daşınır.',
    answerEvac: 'Bakı–Qobustan (Qaradağ) evakuatoru Bakı–Ələt yolu üzrə 24/7 işləyir. Yaxın məsafə olduğu üçün evakuator adətən tez çatır.',
    overview: 'Qobustan qəsəbəsi Bakıdan cənubda, Xəzər sahili boyunca uzanan Bakı–Ələt yolunun üzərindədir (65 km). Yaxınlıqda qayaüstü təsvirləri ilə UNESCO siyahısına daxil olan Qobustan qoruğu və palçıq vulkanları yerləşir. Məsafə qısa olduğu üçün yükləmə, yol və boşaltma çox vaxt yarım günə sığır.',
    vehicle: 'Yol düzən və genişdir, istənilən ölçülü furqon rahat gedir. Qəsəbə daxilindəki həyət evləri üçün 3–5 metrlik maşın adətən kifayətdir.',
    loading: 'Sahil boyu küləkli havada əşyalar qapalı furqonda daşınır, yüngül əşyalar bağlanır ki, yüklənmə zamanı küləyə düşməsin.',
    evac: 'Bakı–Ələt yolunda sıx yük maşını hərəkəti olur. Burada nasaz qalan minik avtomobilləri yolun kənarından təhlükəsiz şəkildə platformaya yüklənir.',
    audiences: [
      { title: 'Qəsəbə Sakinləri', description: 'Qobustan qəsəbəsi ilə Bakı arasında köç edən ailələr.' },
      { title: 'Ev Tikənlər', description: 'Qəsəbədəki həyət evlərinə mebel və qablaşdırılmış material aparanlar.' },
      { title: 'Kiçik Müəssisələr', description: 'Ələt istiqamətindəki obyektlərə avadanlıq göndərənlər.' },
    ],
    evacAudiences: [
      { title: 'Bakı–Ələt Yolu Sürücüləri', description: 'Cənub istiqamətinə gedərkən nasaz qalan avtomobillər.' },
      { title: 'Turistlər', description: 'Qobustan qoruğuna və palçıq vulkanlarına gedərkən yolda qalanlar.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Qablaşdırılmış tikinti-təmir materialları', 'Məişət texnikası', 'Kiçik müəssisə avadanlığı'],
    priceFactors: [
      { factor: 'Qısa Məsafə', detail: '65 km-lik marşrutda qiymət əsasən maşın ölçüsündən asılıdır.' },
      { factor: 'Ünvana Giriş', detail: 'Qəsəbədəki həyət evlərinin darvazası və küçəsinin eni maşın seçiminə təsir edir.' },
    ],
    evacFactor: { factor: 'Yükləmə Yeri', detail: 'Sıx yük hərəkəti olan magistral kənarında təhlükəsiz yükləmə üçün yer seçilir.' },
    faqs: [
      { question: 'Bakıdan Qobustana köç nə qədər vaxt aparır?', answer: 'Məsafə 65 km-dir; yükləmə və boşaltma ilə birlikdə köç adətən yarım gündə bitir.' },
      { question: 'Qobustan qəsəbəsi hansı yolla gedilir?', answer: 'Bakıdan cənuba, Xəzər sahili boyunca Bakı–Ələt yolu ilə.' },
      { question: 'Tikinti materialı daşıyırsınız?', answer: 'Qablaşdırılmış material qapalı furqonla daşınır; çox ağır və ya uzun yüklər üçün şərtlər əvvəlcədən dəqiqləşdirilir.' },
    ],
    evacFaqs: [
      { question: 'Qobustan qoruğuna gedərkən avtomobilim xarab oldu, nə etməli?', answer: 'Yolun kənarında təhlükəsiz dayanın və WhatsApp ilə yerinizi göndərin; Bakıya yaxın olduğu üçün evakuator adətən tez çatır.' },
      { question: 'Bakı–Ələt yolunda gecə də işləyirsiniz?', answer: 'Bəli, 24/7.' },
    ],
  },

  'baki-mereze': {
    name: 'Mərəzə', dative: 'Mərəzəyə', ablative: 'Mərəzədən', km: 85, mountain: false,
    answer: 'Bakıdan Mərəzəyə yükdaşıma Bakı–Şamaxı yolu (M4) ilə (85 km) aparılır. Mərəzə Qobustan rayonunun mərkəzidir; burada mənzil köçü, idarə və mağazalara əşya daşınması çox sifariş edilir, məsafə bir neçə saatlıq daşımaya imkan verir.',
    answerEvac: 'Bakı–Mərəzə evakuatoru M4 magistralı üzrə 24/7 işləyir. Şamaxı istiqamətinə gedən yolda nasaz qalan avtomobillər Mərəzədən və ya Bakıdan gələn evakuatorla daşınır.',
    overview: 'Mərəzə Qobustan rayonunun mərkəzi olan şəhərdir və Bakı–Şamaxı yolunun (M4) üstündədir (85 km). Şəhərin yaxınlığında XV əsrə aid Diri Baba türbəsi yerləşir. Yol Qobustan yaylası ilə gedir, məsafə orta olduğu üçün köç bir neçə saata tamamlanır.',
    vehicle: 'Yol yaxşı vəziyyətdədir, mənzil köçü üçün 4–5 metrlik qapalı furqon adətən kifayətdir.',
    loading: 'Yayla boyunca küləkli hava tez-tez olur; mebel tam qapalı furqonda, plyonka ilə qorunaraq daşınır.',
    evac: 'M4 magistralının Qobustan yaylasından keçən hissəsində çağırışlar adətən mühərrik nasazlığı, təkər problemləri və qışda buzlu yolla bağlıdır.',
    audiences: [
      { title: 'Şəhər Sakinləri', description: 'Mərəzə ilə Bakı arasında köç edən ailələr.' },
      { title: 'İdarə və Mağazalar', description: 'Rayon mərkəzindəki obyektlərə mebel və mal çatdıranlar.' },
      { title: 'Kənd Evləri', description: 'Qobustan rayonunun kəndlərindəki evlərə əşya aparanlar.' },
    ],
    evacAudiences: [
      { title: 'M4 Sürücüləri', description: 'Şamaxı istiqamətinə gedərkən yaylada nasaz qalan avtomobillər.' },
      { title: 'Qışda Yolda Qalanlar', description: 'Buzlu yolda sürüşüb yoldan çıxan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
    ],
    cargo: ['Mənzil köçü əşyaları', 'İdarə mebeli', 'Mağaza malları və rəflər', 'Məişət texnikası'],
    priceFactors: [
      { factor: 'Maşın Ölçüsü', detail: 'Mənzil köçü üçün 4–5 metrlik, kiçik yük üçün 2–3 metrlik furqon.' },
      { factor: 'Mərtəbə', detail: 'Mərəzədəki yaşayış binalarında lift vəziyyəti əvvəlcədən bildirilməlidir.' },
    ],
    evacFactor: { factor: 'Fəsil', detail: 'Qışda yayladakı buzlu yolda yükləmə əlavə təhlükəsizlik tədbirləri tələb edir.' },
    faqs: [
      { question: 'Bakıdan Mərəzəyə yük hansı yolla gedir?', answer: 'Bakı–Şamaxı magistralı (M4) ilə, Qobustan yaylasından keçərək (85 km).' },
      { question: 'Mərəzəyə köç bir gündə olurmu?', answer: 'Bəli, məsafə orta olduğu üçün yükləmə, yol və boşaltma adətən eyni gündə bitir.' },
    ],
    evacFaqs: [
      { question: 'Qışda M4-də yaylada qaldım, nə etməli?', answer: 'Qəza işıqlarını yandırın, təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin.' },
      { question: 'Mərəzədən Bakıya avtomobil daşınır?', answer: 'Bəli, istənilən servisə və ya ünvana.' },
    ],
  },

  'baki-qobustan-samaxi': {
    name: 'Qobustan (Şamaxı)', dative: 'Qobustana', ablative: 'Qobustandan', km: 90, mountain: false,
    answer: 'Bakıdan Bakı–Şamaxı yolu üzərindəki Qobustan rayonu kəndlərinə yükdaşıma M4 magistralı ilə (təxminən 90 km) aparılır. Sifarişlərin çoxu kənd evlərinə köç, təsərrüfat ləvazimatı və mebel daşınmasıdır.',
    answerEvac: 'Bakı–Qobustan (Şamaxı yolu) evakuatoru M4 üzrə 24/7 işləyir. Kənd yollarında ilişən və magistralda nasaz qalan avtomobillər daşınır.',
    overview: 'Bu marşrut Qaradağdakı Qobustan qəsəbəsi deyil, Bakı–Şamaxı yolunun (M4) üzərindəki Qobustan rayonunun kəndləridir (təxminən 90 km). Rayon geniş yaylada yerləşir, əhali əsasən kəndlərdə yaşayır və heyvandarlıqla məşğul olur. Buna görə sifarişlərin xeyli hissəsi kənd evlərinə köç və təsərrüfat ləvazimatıdır.',
    vehicle: 'Magistral rahatdır, kəndlərə gedən yollar isə bəzən torpaq yoldur. Belə ünvanlar üçün 3–4 metrlik furqon seçilir.',
    loading: 'Torpaq yolda silkələnməsin deyə mebel və texnika kəmərlə bərkidilir.',
    evac: 'Kəndlərə gedən torpaq yollarda, xüsusilə yağışdan sonra, ilişən avtomobillər bucurqadla çıxarılır.',
    audiences: [
      { title: 'Kənd Sakinləri', description: 'Qobustan rayonunun kəndləri ilə Bakı arasında köç edənlər.' },
      { title: 'Təsərrüfatlar', description: 'Heyvandarlıq və kənd təsərrüfatı üçün ləvazimat aparanlar.' },
      { title: 'Ev Tikənlər', description: 'Kənd evlərinə mebel və material göndərənlər.' },
    ],
    evacAudiences: [
      { title: 'Kənd Yolu Sürücüləri', description: 'Torpaq yolda ilişib qalan avtomobillər.' },
      { title: 'M4 Sürücüləri', description: 'Magistralda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
    ],
    cargo: ['Kənd evi mebeli', 'Təsərrüfat ləvazimatı (qablaşdırılmış)', 'Məişət texnikası', 'Köç əşyaları'],
    priceFactors: [
      { factor: 'Ünvana Giriş', detail: 'Kəndə gedən yolun torpaq və ya asfalt olması maşın seçiminə təsir edir.' },
      { factor: 'Hava Şəraiti', detail: 'Güclü yağışdan sonra torpaq yollar çətin keçilən ola bilər.' },
    ],
    evacFactor: { factor: 'Çıxarma Şəraiti', detail: 'Palçıqlı kənd yolundan çıxarma bucurqad tələb edə bilər.' },
    faqs: [
      { question: 'Bu marşrut Qaradağdakı Qobustanla eynidirmi?', answer: 'Xeyr. Bu səhifə Bakı–Şamaxı yolu üzərindəki Qobustan rayonunun kəndləri üçündür. Bakı–Ələt yolundakı Qobustan qəsəbəsi üçün ayrıca səhifə var.' },
      { question: 'Kəndə gedən torpaq yola maşın girə bilərmi?', answer: 'Yolun vəziyyətini bildirsəniz, uyğun ölçülü (adətən 3–4 metrlik) maşın təyin edilir.' },
    ],
    evacFaqs: [
      { question: 'Kənd yolunda palçıqda ilişdim, çıxarırsınız?', answer: 'Bəli, bucurqadlı evakuator avtomobili çıxarıb yükləyir.' },
      { question: 'Qobustan rayonundan Bakıya avtomobil daşınır?', answer: 'Bəli, 24/7.' },
    ],
  },

  'baki-pirqulu': {
    name: 'Pirqulu', dative: 'Pirquluya', ablative: 'Pirquludan', km: 139, mountain: true,
    answer: 'Bakıdan Pirquluya yükdaşıma Şamaxı üzərindən, oradan dağ meşəsi ilə qalxan yolla (139 km) aparılır. Pirqulu Şamaxı Astrofizika Rəsədxanası və meşəli istirahət zonası ilə tanınır; əsas sifarişlər bağ evləri və istirahət obyektləri üçündür.',
    answerEvac: 'Bakı–Pirqulu evakuatoru 24/7 işləyir. Şamaxıdan sonrakı meşəli dağ yolunda, qışda qar və buzda qalan avtomobillər bucurqadlı platforma ilə daşınır.',
    overview: 'Pirqulu Şamaxının şimalında, dağ meşələrinin arasında yerləşir və Şamaxı Astrofizika Rəsədxanası ilə tanınır. Bakıdan yol M4 ilə Şamaxıya, oradan dağ yolu ilə Pirquluya qalxır (139 km). Bu ərazidə bağ evləri və istirahət mərkəzləri çoxdur, ona görə sifarişlərin çoxu onlar üçündür.',
    vehicle: 'Şamaxıdan sonrakı yol döngəli və yoxuşludur, meşə içində dar hissələr var. Adətən 3–4 metrlik furqon seçilir.',
    loading: 'Dağ yolunun döngələrində yerini dəyişməsin deyə mebel kəmərlə bərkidilir; qışda əşyalar nəmdən qorunur.',
    evac: 'Pirqulu yolunda qışda qar və buz olur, yoxuşda ilişən avtomobillər tez-tez rast gəlinir. Belə hallarda bucurqadlı gücləndirilmiş platforma göndərilir.',
    audiences: [
      { title: 'Bağ Evi Sahibləri', description: 'Pirqulu meşəsindəki bağ evlərinə mebel və texnika aparanlar.' },
      { title: 'İstirahət Mərkəzləri', description: 'Qonaq evləri və istirahət obyektlərinə avadanlıq çatdıranlar.' },
      { title: 'Kənd Sakinləri', description: 'Pirqulu kəndləri ilə Bakı arasında köç edənlər.' },
    ],
    evacAudiences: [
      { title: 'Qışda Yolda Qalanlar', description: 'Qarlı və buzlu yoxuşda ilişən avtomobillər.' },
      { title: 'İstirahətə Gələnlər', description: 'Həftəsonu istirahət zamanı avtomobili nasaz qalanlar.' },
      { title: 'Qəzalı Avtomobillər', description: 'Dağ yolunda yol hadisəsinə düşən avtomobillər.' },
    ],
    cargo: ['Bağ evi mebeli', 'Qonaq evi avadanlığı', 'Məişət texnikası', 'Köç əşyaları'],
    priceFactors: [
      { factor: 'Dağ Yolu', detail: 'Şamaxıdan sonrakı döngəli meşə yolu səbəbindən adətən kiçik və orta furqon seçilir.' },
      { factor: 'Fəsil', detail: 'Qışda qar və buz çatdırılma vaxtına təsir edə bilər.' },
    ],
    evacFactor: { factor: 'Qış Şəraiti', detail: 'Buzlu yoxuşda yükləmə bucurqad və əlavə vaxt tələb edir.' },
    faqs: [
      { question: 'Bakıdan Pirquluya yük hansı yolla gedir?', answer: 'M4 ilə Şamaxıya, oradan dağ meşəsi ilə qalxan yolla Pirquluya (139 km).' },
      { question: 'Qışda Pirquluya yük aparmaq olur?', answer: 'Bəli, amma qar və buz olanda çatdırılma vaxtı yolun vəziyyətinə görə planlaşdırılır.' },
    ],
    evacFaqs: [
      { question: 'Pirqulu yolunda qarda ilişdim, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin; bucurqadlı evakuator göndərilir.' },
      { question: 'Pirquludan Bakıya avtomobil daşınır?', answer: 'Bəli, 24/7.' },
    ],
  },

  // ------------------------------------------------------------- Quba–Xaçmaz
  'baki-qendob': {
    name: 'Qəndob', dative: 'Qəndoba', ablative: 'Qəndobdan', km: 135, mountain: false,
    answer: 'Bakıdan Qəndoba yükdaşıma M1 magistralı ilə (135 km) aparılır; Qəndob Xaçmaza çatmamış, magistralın üstündədir. Kənd evlərinə köç, mebel və bağ ləvazimatı daşınması çox sifariş edilir.',
    answerEvac: 'Bakı–Qəndob evakuatoru M1 magistralı üzrə 24/7 işləyir. Şimal istiqamətində nasaz qalan avtomobillər Bakıya və ya yaxın servisə daşınır.',
    overview: 'Qəndob Bakı–Quba–Xaçmaz istiqamətində, M1 magistralının üstündə, Xaçmaza çatmamış yerləşən yaşayış məntəqəsidir (135 km). Magistrala yaxın olduğu üçün ünvana çatmaq asandır və köç adətən bir gündə tamamlanır.',
    vehicle: 'Magistral boyu böyük furqonlar rahat gedir; kənd küçələri üçün 3–5 metrlik maşın daha əlverişlidir.',
    loading: 'Bir günlük daşımada əşyalar boşaltma ardıcıllığına görə yüklənir.',
    evac: 'Qəndob M1 magistralının üstündə olduğu üçün Quba, Qusar və Xaçmaz istiqamətinə gedən avtomobillərin yolda qaldığı hallarda evakuator bu ərazidə tez-tez işləyir.',
    audiences: [
      { title: 'Kənd Sakinləri', description: 'Qəndob ilə Bakı arasında köç edən ailələr.' },
      { title: 'Bağ Evi Sahibləri', description: 'Şimal bölgəsindəki evlərinə mebel aparanlar.' },
      { title: 'Kiçik Sahibkarlar', description: 'Magistral boyu obyektlərə mal çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'M1 Sürücüləri', description: 'Şimal istiqamətində nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Magistralda yol hadisəsinə düşən avtomobillər.' },
      { title: 'Servis Transferi', description: 'Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Bağ ləvazimatı', 'Məişət texnikası', 'Mağaza malları'],
    priceFactors: [
      { factor: 'Maşın Ölçüsü', detail: 'Kiçik yük üçün 2–3 metrlik, ev köçü üçün 4–5 metrlik furqon.' },
      { factor: 'Bir Günlük Daşıma', detail: '135 km məsafə yükləmə və boşaltmanın eyni gündə bitməsinə imkan verir.' },
    ],
    evacFactor: { factor: 'Yükləmə Yeri', detail: 'Magistral kənarında təhlükəsiz yükləmə üçün yer seçilir.' },
    faqs: [
      { question: 'Qəndob hansı yolda yerləşir?', answer: 'Bakı–Quba–Xaçmaz istiqamətində, M1 magistralının üstündə, Xaçmaza çatmamış (135 km).' },
      { question: 'Qəndoba köç bir gündə olurmu?', answer: 'Bəli, adətən yükləmə, yol və boşaltma eyni gündə bitir.' },
    ],
    evacFaqs: [
      { question: 'M1-də Qəndob yaxınlığında qaldım, nə etməli?', answer: 'Yolun kənarına çəkin, qəza işıqlarını yandırın və WhatsApp ilə yerinizi göndərin.' },
      { question: 'Gecə də işləyirsiniz?', answer: 'Bəli, 24/7.' },
    ],
  },

  'baki-xudat': {
    name: 'Xudat', dative: 'Xudata', ablative: 'Xudatdan', km: 184, mountain: false,
    answer: 'Bakıdan Xudata yükdaşıma M1 magistralı ilə Xaçmaz üzərindən (184 km) aparılır. Xudat Xaçmaz rayonunda, Bakı–Rusiya dəmir yolunun üstündə şəhərdir; mənzil köçü və yaxın sahil zonasındakı bağ evlərinə mebel daşınması çox sifariş olunur.',
    answerEvac: 'Bakı–Xudat evakuatoru M1 magistralı üzrə 24/7 işləyir. Yay mövsümündə sahil istiqamətinə gedən avtomobillərin yolda qaldığı hallar artır.',
    overview: 'Xudat Xaçmaz rayonunun şəhəridir və Bakı–Rusiya dəmir yolu xəttinin üstündə yerləşir. Bakıdan yol M1 magistralı ilə Xaçmaza, oradan Xudata gedir (184 km). Şəhərin yaxınlığında Xəzər sahili və meşəli istirahət zonası olduğu üçün mənzil köçü ilə yanaşı bağ evlərinə də yük daşınır.',
    vehicle: 'Şəhər daxili üçün 4–5 metrlik furqon, sahil zonasındakı dar yollu bağ evləri üçün 3–4 metrlik maşın seçilir.',
    loading: 'Uzun yolda mebel kəmərlə bərkidilir, şüşəli əşyalar ayrıca qablaşdırılır.',
    evac: 'Yayda Xudat və sahil istiqamətinə hərəkət artanda qızan mühərrik və tıxacda qalan avtomobillərlə bağlı çağırışlar çoxalır.',
    audiences: [
      { title: 'Şəhər Sakinləri', description: 'Xudat ilə Bakı arasında köç edən ailələr.' },
      { title: 'Bağ Evi Sahibləri', description: 'Sahil zonasındakı evlərinə mebel aparanlar.' },
      { title: 'Ticarət Obyektləri', description: 'Şəhərdəki mağazalara mal çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Yay Mövsümü Sürücüləri', description: 'Sahilə gedərkən mühərriki qızan avtomobillər.' },
      { title: 'M1 Sürücüləri', description: 'Uzun yolda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
    ],
    cargo: ['Mənzil köçü əşyaları', 'Bağ evi mebeli', 'Məişət texnikası', 'Mağaza malları'],
    priceFactors: [
      { factor: 'Ünvan', detail: 'Şəhər daxili ilə sahil zonasındakı dar yollu bağ evləri arasında maşın seçimi fərqlənir.' },
      { factor: 'Mövsüm', detail: 'Yay aylarında sifariş çox olur, maşını əvvəlcədən sifariş etmək məsləhətdir.' },
    ],
    evacFactor: { factor: 'Mövsüm', detail: 'Yayda yol sıxlığı səbəbindən gəlmə vaxtı dəyişə bilər.' },
    faqs: [
      { question: 'Bakıdan Xudata yük hansı yolla gedir?', answer: 'M1 magistralı ilə Xaçmaza, oradan Xudata (184 km).' },
      { question: 'Sahil zonasındakı bağ evinə yük aparırsınız?', answer: 'Bəli; yolun vəziyyətini bildirsəniz uyğun ölçülü maşın təyin edilir.' },
    ],
    evacFaqs: [
      { question: 'Xudata gedərkən mühərrik qızdı, nə etməli?', answer: 'Mühərriki söndürün, təhlükəsiz yerdə dayanın və zəng edin.' },
      { question: 'Xudatdan Bakıya avtomobil daşınır?', answer: 'Bəli, 24/7.' },
    ],
  },

  'baki-yalama': {
    name: 'Yalama', dative: 'Yalamaya', ablative: 'Yalamadan', km: 205, mountain: false,
    answer: 'Bakıdan Yalamaya yükdaşıma M1 magistralı ilə (205 km) aparılır. Yalama Samur çayı yaxınlığında, Rusiya sərhədi yanında yerləşir və meşəli istirahət zonası ilə tanınır; əsas sifarişlər bağ evləri və istirahət obyektləri üçündür.',
    answerEvac: 'Bakı–Yalama evakuatoru M1 magistralı üzrə 24/7 işləyir. Sərhəd istiqamətinə gedən uzun yolda nasaz qalan avtomobillər Bakıya daşınır.',
    overview: 'Yalama Azərbaycanın şimal ucunda, Samur çayının yaxınlığında, Rusiya ilə sərhəddə yerləşir. Ərazidə Samur–Yalama Milli Parkının sıx meşələri və Xəzər sahili var. Bakıdan yol M1 magistralı ilə Xaçmaz üzərindən Yalamaya gedir (205 km). Sifarişlərin çoxu meşə içindəki bağ evləri və istirahət obyektlərinə mebel daşınmasıdır.',
    vehicle: 'Meşə içindəki evlərə gedən yollar dar ola bilər; belə ünvanlar üçün 3–4 metrlik furqon seçilir.',
    loading: 'Nəmli meşə havasında döşək və tekstil plyonkaya bükülür.',
    evac: 'Yalama yolu M1-in son hissəsidir; uzun yolda mühərrik, təkər və akkumulyator nasazlıqları üzrə çağırışlar olur. Yayda meşə yollarında ilişən avtomobillər də bucurqadla çıxarılır.',
    audiences: [
      { title: 'Bağ Evi Sahibləri', description: 'Yalama meşəsindəki evlərinə mebel aparanlar.' },
      { title: 'İstirahət Obyektləri', description: 'Meşə və sahil zonasındakı obyektlərə avadanlıq çatdıranlar.' },
      { title: 'Kənd Sakinləri', description: 'Yalama ilə Bakı arasında köç edənlər.' },
    ],
    evacAudiences: [
      { title: 'Uzun Yol Sürücüləri', description: 'M1-in şimal hissəsində nasaz qalan avtomobillər.' },
      { title: 'Meşə Yolunda İlişənlər', description: 'İstirahət zonasının torpaq yollarında qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
    ],
    cargo: ['Bağ evi mebeli', 'İstirahət obyekti avadanlığı', 'Məişət texnikası', 'Köç əşyaları'],
    priceFactors: [
      { factor: 'Ünvana Giriş', detail: 'Meşə içindəki dar yollar maşın ölçüsünə təsir edir.' },
      { factor: 'Mövsüm', detail: 'Yay mövsümündə sifariş çox olur.' },
    ],
    evacFactor: { factor: 'Çıxarma Şəraiti', detail: 'Meşə və ya qumlu yoldan çıxarma bucurqad tələb edə bilər.' },
    faqs: [
      { question: 'Yalama harada yerləşir?', answer: 'Azərbaycanın şimal ucunda, Samur çayı yaxınlığında, Rusiya sərhədi yanında; Bakıdan M1 ilə 205 km.' },
      { question: 'Meşə içindəki evə yük gedə bilərmi?', answer: 'Bəli; yolun vəziyyətini bildirsəniz uyğun ölçülü maşın təyin edilir.' },
    ],
    evacFaqs: [
      { question: 'Yalama meşəsində yolda ilişdim, çıxarırsınız?', answer: 'Bəli, bucurqadlı evakuator göndərilir.' },
      { question: 'Yalamadan Bakıya avtomobil daşınır?', answer: 'Bəli, 24/7.' },
    ],
  },

  // ------------------------------------------------------------- Gəncə–Qazax
  'baki-samux': {
    name: 'Samux', dative: 'Samuxa', ablative: 'Samuxdan', km: 365, mountain: false,
    answer: 'Bakıdan Samuxa yükdaşıma M2 magistralı ilə Gəncə istiqamətində (365 km) aparılır. Samux rayonunun mərkəzi Nəbiağalı qəsəbəsidir; köç əşyaları və kənd təsərrüfatı ləvazimatı daşınır, əks istiqamətdə isə məhsul Bakıya gətirilir.',
    answerEvac: 'Bakı–Samux evakuatoru M2 magistralı üzrə 24/7 işləyir. Uzun məsafədə avtomobil 4 nöqtədən bərkidilir.',
    overview: 'Samux rayonu Gəncə ilə Mingəçevir arasındakı düzənlikdə yerləşir, mərkəzi Nəbiağalı qəsəbəsidir. Bakıdan yol M2 magistralı ilə Gəncə istiqamətinə, oradan Samuxa gedir (365 km). Rayon kənd təsərrüfatı ilə məşğuldur, buna görə köç əşyaları ilə yanaşı təsərrüfat ləvazimatı və məhsul daşınması da çox sifariş edilir.',
    vehicle: 'Uzun yolda iki reys baha başa gəldiyi üçün ev köçündə adətən 5–7 metrlik qapalı furqon seçilir.',
    loading: 'Uzun yolda mebel tam qablaşdırılır, hər şey kəmərlə bərkidilir.',
    evac: 'Bakı–Samux evakuatoru M2 magistralı ilə uzun məsafəli marşrutla işləyir; avtomobil 4 nöqtədən təkər kəmərləri ilə bərkidilir.',
    audiences: [
      { title: 'Köç Edən Ailələr', description: 'Samux ilə Bakı arasında yaşayış yerini dəyişənlər.' },
      { title: 'Fermerlər', description: 'Təsərrüfat ləvazimatı aparan və məhsulunu Bakıya göndərənlər.' },
      { title: 'Ticarət Obyektləri', description: 'Rayondakı mağazalara mal çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'M2 Sürücüləri', description: 'Uzun yolda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Samuxdan Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Təsərrüfat ləvazimatı (qablaşdırılmış)', 'Kənd təsərrüfatı məhsulları (əks istiqamətdə)', 'Məişət texnikası'],
    priceFactors: [
      { factor: 'Uzun Məsafə', detail: '365 km-lik marşrutda bütün yükün bir reysə sığması üçün maşın ölçüsü düzgün seçilir.' },
      { factor: 'Ünvan', detail: 'Kənd ünvanlarında yolun vəziyyəti əvvəlcədən bildirilməlidir.' },
    ],
    evacFactor: { factor: 'Uzun Məsafə', detail: 'Avtomobilin bütün yol boyu 4 nöqtədən fiksasiyası.' },
    faqs: [
      { question: 'Bakıdan Samuxa yük hansı yolla gedir?', answer: 'M2 magistralı ilə Gəncə istiqamətində, oradan Samuxa (365 km).' },
      { question: 'Samux rayonunun mərkəzi haradır?', answer: 'Nəbiağalı qəsəbəsi. Ünvan kənddədirsə, kəndin adını və yolun vəziyyətini bildirin.' },
    ],
    evacFaqs: [
      { question: 'M2-də Samux istiqamətində qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin.' },
      { question: 'Samuxdan Bakıya avtomobil daşınır?', answer: 'Bəli, 24/7.' },
    ],
  },

  'baki-qirmizi-korpu': {
    name: 'Qırmızı Körpü', dative: 'Qırmızı Körpüyə', ablative: 'Qırmızı Körpüdən', km: 498, mountain: false,
    answer: 'Bakıdan Qırmızı Körpüyə yükdaşıma M2 magistralı ilə Gəncə və Qazax üzərindən (498 km) aparılır. Qırmızı Körpü Qazax rayonunda, Xram çayı üzərindəki tarixi körpünün yanında Gürcüstanla sərhəd keçid məntəqəsidir. Yük sərhədə qədər çatdırılır; sərhədi keçən yüklər üçün şərtlər operatorla ayrıca dəqiqləşdirilir.',
    answerEvac: 'Bakı–Qırmızı Körpü (498 km) evakuatoru M2 magistralı üzrə işləyir; bu, saytdakı ən uzun marşrutlardan biridir. Avtomobil bütün yol boyu 4 nöqtədən bərkidilir.',
    overview: 'Qırmızı Körpü Azərbaycanın qərb ucunda, Qazax rayonunda, Xram çayı üzərindəki XVII əsrə aid tarixi körpünün yanında yerləşən Gürcüstanla sərhəd keçid məntəqəsidir. Bakıdan yol M2 magistralı ilə Kürdəmir, Yevlax, Gəncə və Qazax üzərindən gedir (498 km). Bu, saytdakı ən uzun yükdaşıma marşrutlarından biridir.',
    reverse: 'Qırmızı Körpü ərazisindən Bakıya daşınma da mümkündür. Sərhədi keçən yüklər üçün gömrük və sənəd şərtləri operatorla ayrıca dəqiqləşdirilir.',
    vehicle: 'Uzun yolda iki reys çox baha başa gəlir, ona görə maşın ölçüsü bütün yükün bir reysə sığmasına görə seçilir; adətən 5–7 metrlik qapalı furqon.',
    loading: 'Uzun yolda mebel tam qablaşdırılır, künclər qorunur, hər şey kəmərlə bərkidilir.',
    evac: 'Bakı–Qırmızı Körpü evakuatoru M2 magistralının bütün uzunluğu boyunca işləyir. Avtomobil 4 nöqtədən bərkidilir və yolda yoxlanılır.',
    audiences: [
      { title: 'Sərhədə Yük Göndərənlər', description: 'Yükünü sərhəd keçid məntəqəsinə çatdırmaq istəyənlər.' },
      { title: 'Qazax Rayonu Sakinləri', description: 'Rayonun qərb hissəsi ilə Bakı arasında köç edənlər.' },
      { title: 'Ticarət', description: 'Sərhəd ərazisindəki obyektlərə mal çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Uzun Yol Sürücüləri', description: 'M2-nin qərb hissəsində nasaz qalan avtomobillər.' },
      { title: 'Sərhəddən Qayıdanlar', description: 'Sərhəd yaxınlığında avtomobili nasaz qalanlar.' },
      { title: 'Servis Transferi', description: 'Avtomobilini Bakıdakı servisə göndərmək istəyənlər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Ticarət malları', 'Məişət texnikası', 'Ofis avadanlığı'],
    priceFactors: [
      { factor: 'Ən Uzun Marşrut', detail: '498 km; qiymət maşın ölçüsünə görə tarif bazasından götürülür.' },
      { factor: 'Sərhəd', detail: 'Yük sərhədə qədər çatdırılır; sərhədi keçən yüklər üçün şərtlər ayrıca dəqiqləşdirilir.' },
    ],
    evacFactor: { factor: 'Uzun Məsafə', detail: 'Avtomobilin bütün yol boyu 4 nöqtədən fiksasiyası.' },
    faqs: [
      { question: 'Qırmızı Körpü harada yerləşir?', answer: 'Qazax rayonunda, Xram çayı üzərindəki tarixi körpünün yanında; Gürcüstanla sərhəd keçid məntəqəsidir.' },
      { question: 'Yükü Gürcüstana keçirirsiniz?', answer: 'Yük sərhəd məntəqəsinə qədər çatdırılır. Sərhədi keçən yüklər üçün gömrük və sənəd şərtləri operatorla ayrıca dəqiqləşdirilir.' },
    ],
    evacFaqs: [
      { question: 'Sərhəd yaxınlığında avtomobilim xarab oldu, Bakıya apara bilərsiniz?', answer: 'Bəli, M2 magistralı ilə Bakıya daşınır; avtomobil 4 nöqtədən bərkidilir.' },
      { question: 'Bu qədər uzun yolda gecə də işləyirsiniz?', answer: 'Bəli, sifarişlər 24/7 qəbul edilir.' },
    ],
  },

  // ------------------------------------------------------------- Lənkəran–Astara
  'baki-yardimli': {
    name: 'Yardımlı', dative: 'Yardımlıya', ablative: 'Yardımlıdan', km: 286, mountain: true,
    answer: 'Bakıdan Yardımlıya yükdaşıma M3 magistralı ilə Masallıya, oradan Talış dağlarına qalxan yolla (286 km) aparılır. Yardımlı İranla sərhəddə yerləşən dağlıq rayondur; Masallıdan sonrakı yol döngəli olduğu üçün adətən orta ölçülü furqon təyin edilir.',
    answerEvac: 'Bakı–Yardımlı evakuatoru 24/7 işləyir. Masallı–Yardımlı dağ yolunda nasaz qalan avtomobillər bucurqadlı platforma ilə Masallıya və ya Bakıya daşınır.',
    overview: 'Yardımlı Talış dağlarında, İranla sərhəddə yerləşən dağlıq və meşəli rayondur. Bakıdan yol M3 magistralı ilə Salyan üzərindən Masallıya, oradan dağ yolu ilə Yardımlıya qalxır (286 km). Masallıdan sonra yol döngəli və yoxuşludur, qışda qar ola bilər.',
    vehicle: 'Dağ yolunda adətən 3–5 metrlik furqon seçilir; kəndlərə gedən yollar daha dar ola bilər.',
    loading: 'Döngəli yoxuşlarda mebel kəmərlə bərkidilir, ağır əşyalar kuzovun ön hissəsinə yerləşdirilir.',
    evac: 'Masallı–Yardımlı dağ yolunda yoxuşda qızan mühərrik, enişdə qızan əyləc və qışda buzla bağlı çağırışlar olur.',
    audiences: [
      { title: 'Köç Edən Ailələr', description: 'Yardımlı ilə Bakı arasında köç edənlər.' },
      { title: 'Dağ Kəndləri', description: 'Kənd evlərinə mebel və texnika aparanlar.' },
      { title: 'Ticarət Obyektləri', description: 'Rayon mərkəzindəki mağazalara mal çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Dağ Yolu Sürücüləri', description: 'Masallı–Yardımlı yolunda nasaz qalan avtomobillər.' },
      { title: 'Qışda Yolda Qalanlar', description: 'Qarlı və buzlu yoxuşda ilişən avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra daşınacaq avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Məişət texnikası', 'Mağaza malları', 'Kənd məhsulları (əks istiqamətdə)'],
    priceFactors: [
      { factor: 'Dağ Yolu', detail: 'Masallıdan sonrakı döngəli yol səbəbindən adətən kiçik və orta furqon seçilir.' },
      { factor: 'Fəsil', detail: 'Qışda qar və buz çatdırılma vaxtına təsir edə bilər.' },
    ],
    evacFactor: { factor: 'Dağ Şəraiti', detail: 'Yoxuşda və dar yolda yükləmə bucurqad və əlavə vaxt tələb edir.' },
    faqs: [
      { question: 'Bakıdan Yardımlıya yük hansı yolla gedir?', answer: 'M3 magistralı ilə Masallıya, oradan dağ yolu ilə Yardımlıya (286 km).' },
      { question: 'Dağ kəndinə böyük maşın gedə bilərmi?', answer: 'Bəzi kənd yolları dardır; ünvanı bildirsəniz uyğun ölçülü maşın təyin edilir.' },
    ],
    evacFaqs: [
      { question: 'Yardımlı yolunda yoxuşda qaldım, nə etməli?', answer: 'Əl əyləcini çəkin, qəza işıqlarını yandırın və WhatsApp ilə yerinizi göndərin.' },
      { question: 'Avtomobili Masallıdakı servisə apara bilərsiniz?', answer: 'Bəli, Masallıya və ya Bakıya.' },
    ],
  },

  // ------------------------------------------------------------- Füzuli–Cəbrayıl–Zəngilan
  'baki-horadiz': {
    name: 'Horadiz', dative: 'Horadizə', ablative: 'Horadizdən', km: 310, mountain: false, karabakh: true,
    answer: 'Bakıdan Horadizə yükdaşıma (310 km) Araz boyu düzənlik yolla aparılır. Horadiz Füzuli rayonunun şəhəridir və Cəbrayıl, Zəngilan, Ağbənd istiqamətinə gedən yolların başlanğıcıdır; köç əşyaları və yeni obyektlər üçün avadanlıq daşınır.',
    answerEvac: 'Bakı–Horadiz (310 km) evakuatoru üçün sifariş qəbul edilir. Düzən yolda uzun məsafəli daşımada avtomobil 4 nöqtədən bərkidilir.',
    overview: 'Horadiz Füzuli rayonunda, Araz çayının yaxınlığında yerləşən şəhərdir və dəmir yolu stansiyası var. Şəhər Cəbrayıl, Zəngilan və Ağbənd istiqamətinə gedən yolların qovşağıdır. Bakıdan yol düzənliklə Horadizə gedir (310 km). Sifarişlərin çoxu köç əşyaları və bölgədəki yeni obyektlər üçün avadanlıqdır.',
    vehicle: 'Yol düzən olduğu üçün böyük qapalı furqonlar rahat gedir; ev köçü üçün adətən 5–7 metrlik maşın seçilir.',
    loading: 'Uzun yolda mebel tam qablaşdırılır, texnika orijinal qutusunda daşınır.',
    evac: 'Horadiz istiqamətində uzun düzən yolda çağırışlar adətən mühərrik, təkər və transmissiya nasazlıqları ilə bağlıdır.',
    audiences: [
      { title: 'Köç Edən Ailələr', description: 'Horadiz ilə Bakı arasında köç edənlər.' },
      { title: 'Yeni Obyektlər', description: 'Bölgədə açılan idarə və müəssisələrə avadanlıq göndərənlər.' },
      { title: 'Ticarət', description: 'Şəhərdəki mağazalara mal çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Uzun Yol Sürücüləri', description: 'Horadiz istiqamətində nasaz qalan avtomobillər.' },
      { title: 'Qarabağa Gedənlər', description: 'Cəbrayıl və Zəngilan yolunda qalan avtomobillər.' },
      { title: 'Servis Transferi', description: 'Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Ofis mebeli və texnikası', 'Ticarət malları', 'Məişət texnikası'],
    priceFactors: [
      { factor: 'Uzun Məsafə', detail: '310 km-lik marşrutda bütün yükün bir reysə sığması üçün maşın düzgün seçilir.' },
    ],
    evacFactor: { factor: 'Uzun Məsafə', detail: 'Avtomobilin bütün yol boyu 4 nöqtədən fiksasiyası.' },
    faqs: [
      { question: 'Horadiz harada yerləşir?', answer: 'Füzuli rayonunda, Araz çayı yaxınlığında; Cəbrayıl, Zəngilan və Ağbənd yollarının qovşağıdır.' },
      { question: 'Ev köçü üçün hansı maşın lazımdır?', answer: 'Uzun yolda adətən 5–7 metrlik qapalı furqon tövsiyə olunur.' },
    ],
    evacFaqs: [
      { question: 'Horadiz yolunda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin; operator şərtləri və gəlmə vaxtını deyir.' },
      { question: 'Horadizdən Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
    ],
  },

  'baki-sukurbeyli': {
    name: 'Şükürbəyli', dative: 'Şükürbəyliyə', ablative: 'Şükürbəylidən', km: 330, mountain: false, karabakh: true,
    answer: 'Bakıdan Şükürbəyliyə yükdaşıma Horadiz üzərindən (330 km) aparılır. Şükürbəyli Cəbrayıl istiqamətində, düzən ərazidə yerləşən kənddir; bərpa və məskunlaşma ilə bağlı köç və ev əşyaları daşınır.',
    answerEvac: 'Bakı–Şükürbəyli (330 km) evakuatoru üçün sifariş qəbul edilir; avtomobil Horadiz üzərindən Bakıya daşınır.',
    overview: 'Şükürbəyli Horadizdən Cəbrayıla gedən istiqamətdə, düzənlikdə yerləşən kənddir. Bakıdan yol Horadiz üzərindən Şükürbəyliyə gedir (330 km). Kənd ərazisi düzən olduğu üçün maşınların girişi adətən çətin deyil; sifarişlərin çoxu yeni evlərə köç və məişət əşyalarıdır.',
    vehicle: 'Düzən ərazidə böyük furqonlar da gedə bilir; kənd küçəsinin enini bildirsəniz maşın ona görə seçilir.',
    loading: 'Uzun yolda mebel tam qablaşdırılır və kəmərlə bərkidilir.',
    evac: 'Şükürbəyli istiqamətində avtomobil Horadiz üzərindən uzun məsafəli marşrutla daşınır, 4 nöqtədən bərkidilir.',
    audiences: [
      { title: 'Kəndə Köçənlər', description: 'Yeni evlərə köçən ailələr.' },
      { title: 'Ev Əşyası Göndərənlər', description: 'Kənddəki evə mebel və texnika aparanlar.' },
      { title: 'Təsərrüfatlar', description: 'Kənd təsərrüfatı üçün ləvazimat göndərənlər.' },
    ],
    evacAudiences: [
      { title: 'Uzun Yol Sürücüləri', description: 'Horadiz–Cəbrayıl istiqamətində nasaz qalan avtomobillər.' },
      { title: 'Kənd Sakinləri', description: 'Avtomobilini Bakıdakı servisə göndərmək istəyənlər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra daşınacaq avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Məişət texnikası', 'Təsərrüfat ləvazimatı (qablaşdırılmış)'],
    priceFactors: [
      { factor: 'Uzun Məsafə', detail: '330 km-lik marşrutda maşın ölçüsü bütün yükün bir reysə sığmasına görə seçilir.' },
    ],
    evacFactor: { factor: 'Uzun Məsafə', detail: 'Avtomobilin bütün yol boyu 4 nöqtədən fiksasiyası.' },
    faqs: [
      { question: 'Şükürbəyli hansı istiqamətdədir?', answer: 'Horadizdən Cəbrayıla gedən istiqamətdə, düzənlikdə; Bakıdan təxminən 330 km.' },
      { question: 'Kəndə böyük maşın girə bilərmi?', answer: 'Ərazi düzəndir, adətən girə bilir; küçənin enini bildirsəniz maşın ona görə seçilir.' },
    ],
    evacFaqs: [
      { question: 'Şükürbəylidən Bakıya avtomobil daşınır?', answer: 'Bəli, Horadiz üzərindən; şərtlər operatorla dəqiqləşdirilir.' },
      { question: 'Avtomobil necə bərkidilir?', answer: '4 nöqtədən təkər kəmərləri ilə.' },
    ],
  },

  'baki-cebrayil': {
    name: 'Cəbrayıl', dative: 'Cəbrayıla', ablative: 'Cəbrayıldan', km: 341, mountain: false, karabakh: true,
    answer: 'Bakıdan Cəbrayıla yükdaşıma Horadiz üzərindən (341 km) aparılır. Cəbrayıl rayonu Araz çayı boyunca yerləşir, tarixi Xudafərin körpüləri buradadır. Şəhərdə bərpa və məskunlaşma davam etdiyi üçün köç əşyaları və yeni obyektlər üçün avadanlıq daşınır.',
    answerEvac: 'Bakı–Cəbrayıl (341 km) evakuatoru üçün sifariş qəbul edilir. Horadiz üzərindən uzun məsafədə avtomobil 4 nöqtədən bərkidilir.',
    overview: 'Cəbrayıl rayonu Araz çayının sol sahili boyunca, düzənlikdən dağətəyinə keçən ərazidə yerləşir. Rayonun ən tanınmış abidəsi Araz üzərindəki tarixi Xudafərin körpüləridir. Bakıdan yol Horadiz üzərindən Cəbrayıla gedir (341 km). Şəhər yenidən qurulduğu üçün sifarişlərin çoxu yeni yaşayış binalarına köç və idarələr üçün avadanlıqdır.',
    vehicle: 'Horadizə qədər yol düzəndir; rayon daxilində dağətəyi hissələr var. Ev köçü üçün adətən 5–7 metrlik qapalı furqon seçilir.',
    loading: 'Mebel tam qablaşdırılır, texnika orijinal qutusunda və ya yumşaq materialla qorunaraq daşınır.',
    evac: 'Bakı–Cəbrayıl evakuatoru Horadiz üzərindən uzun məsafəli marşrutla işləyir; avtomobil 4 nöqtədən təkər kəmərləri ilə bərkidilir.',
    audiences: [
      { title: 'Cəbrayıla Köçənlər', description: 'Yeni yaşayış binalarına köçən ailələr.' },
      { title: 'İdarə və Müəssisələr', description: 'Cəbrayılda fəaliyyətə başlayan təşkilatlara mebel və texnika daşıyanlar.' },
      { title: 'Ticarət və Xidmət', description: 'Yeni açılan obyektlərə avadanlıq çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Uzun Yol Sürücüləri', description: 'Horadiz–Cəbrayıl yolunda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Cəbrayıldan Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Ofis mebeli və texnikası', 'Ticarət avadanlığı', 'Qablaşdırılmış təmir materialları'],
    priceFactors: [
      { factor: 'Uzun Məsafə', detail: '341 km-lik marşrutda yük bir reysə sığacaq ölçüdə maşınla daşınır.' },
    ],
    evacFactor: { factor: 'Uzun Məsafə', detail: 'Avtomobilin bütün yol boyu 4 nöqtədən fiksasiyası.' },
    faqs: [
      { question: 'Bakıdan Cəbrayıla yük hansı yolla gedir?', answer: 'Horadiz üzərindən (341 km).' },
      { question: 'Xudafərin körpüləri Cəbrayıldadır?', answer: 'Bəli, Araz çayı üzərindəki tarixi Xudafərin körpüləri Cəbrayıl rayonundadır.' },
    ],
    evacFaqs: [
      { question: 'Cəbrayıl yolunda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin; operator şərtləri və gəlmə vaxtını deyir.' },
      { question: 'Cəbrayıldan Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
    ],
  },

  'baki-qubadli': {
    name: 'Qubadlı', dative: 'Qubadlıya', ablative: 'Qubadlıdan', km: 387, mountain: true, karabakh: true,
    answer: 'Bakıdan Qubadlıya yükdaşıma Horadiz və Cəbrayıl istiqamətindən, oradan dağ yolu ilə (387 km) aparılır. Qubadlı Bərgüşad çayının vadisində, dağlıq ərazidə yerləşir; bərpa olunan şəhərə köç və avadanlıq daşınır.',
    answerEvac: 'Bakı–Qubadlı (387 km) evakuatoru üçün sifariş qəbul edilir. Dağ yolunda avtomobil bucurqadlı gücləndirilmiş platforma ilə yüklənir.',
    overview: 'Qubadlı Bərgüşad çayının vadisində, dağlıq ərazidə yerləşən rayondur. Bakıdan yol Horadiz və Cəbrayıl istiqamətindən, oradan dağ yolu ilə Qubadlıya gedir (387 km). Yolun son hissəsi döngəli və yoxuşlu olduğu üçün maşın seçimi və yükün bərkidilməsi buna görə planlaşdırılır.',
    vehicle: 'Dağ yolu səbəbindən adətən 4–5 metrlik furqon seçilir; böyük həcmdə iki maşın planlaşdırıla bilər.',
    loading: 'Döngəli yolda mebel kəmərlə bərkidilir, ağır əşyalar kuzovun ön hissəsinə yerləşdirilir.',
    evac: 'Qubadlı yolunun dağ hissəsində nasaz qalan avtomobillər bucurqadlı gücləndirilmiş platforma ilə yüklənir.',
    audiences: [
      { title: 'Qubadlıya Köçənlər', description: 'Bərpa olunan şəhərin yaşayış binalarına köçən ailələr.' },
      { title: 'İdarə və Müəssisələr', description: 'Yeni açılan təşkilatlara mebel və texnika daşıyanlar.' },
      { title: 'Ticarət', description: 'Yeni obyektlərə mal və avadanlıq çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Dağ Yolu Sürücüləri', description: 'Qubadlı yolunda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Qubadlıdan Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Ofis mebeli və texnikası', 'Məişət texnikası', 'Qablaşdırılmış təmir materialları'],
    priceFactors: [
      { factor: 'Dağ Marşrutu', detail: '387 km-lik yolun son hissəsi dağ yoludur; maşın və vaxt buna görə planlaşdırılır.' },
    ],
    evacFactor: { factor: 'Dağ Şəraiti', detail: 'Yoxuşlu yolda yükləmə bucurqad və əlavə vaxt tələb edir.' },
    faqs: [
      { question: 'Qubadlı hansı ərazidə yerləşir?', answer: 'Bərgüşad çayının vadisində, dağlıq ərazidə; Bakıdan təxminən 387 km.' },
      { question: 'Ev köçü üçün hansı maşın lazımdır?', answer: 'Dağ yolu səbəbindən adətən 4–5 metrlik furqon; böyük həcmdə iki maşın planlaşdırıla bilər.' },
    ],
    evacFaqs: [
      { question: 'Qubadlı yolunda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin; operator şərtləri və gəlmə vaxtını deyir.' },
      { question: 'Qubadlıdan Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
    ],
  },

  'baki-zengilan': {
    name: 'Zəngilan', dative: 'Zəngilana', ablative: 'Zəngilandan', km: 382, mountain: false, karabakh: true,
    answer: 'Bakıdan Zəngilana yükdaşıma Horadiz üzərindən (382 km) aparılır. Zəngilanda beynəlxalq hava limanı fəaliyyət göstərir, Ağalıda ilk "ağıllı kənd" salınıb; bərpa olunan yaşayış məntəqələrinə köç və avadanlıq daşınması əsas sifarişlərdir.',
    answerEvac: 'Bakı–Zəngilan (382 km) evakuatoru üçün sifariş qəbul edilir. Horadiz üzərindən uzun məsafədə avtomobil 4 nöqtədən bərkidilir.',
    overview: 'Zəngilan Azərbaycanın cənub-qərbində, Araz çayı yaxınlığında yerləşən rayondur. Burada Zəngilan Beynəlxalq Hava Limanı fəaliyyət göstərir, Ağalı kəndində ölkənin ilk "ağıllı kənd" layihəsi həyata keçirilib, çinar meşələri ilə tanınan Bəsitçay qoruğu da bu rayondadır. Bakıdan yol Horadiz üzərindən gedir (382 km).',
    vehicle: 'Ev köçü üçün adətən 5–7 metrlik qapalı furqon seçilir; kənd ünvanları üçün yolun vəziyyəti əvvəlcədən bildirilməlidir.',
    loading: 'Uzun yolda mebel tam qablaşdırılır, texnika orijinal qutusunda daşınır.',
    evac: 'Bakı–Zəngilan evakuatoru Horadiz üzərindən uzun məsafəli marşrutla işləyir; avtomobil 4 nöqtədən təkər kəmərləri ilə bərkidilir.',
    audiences: [
      { title: 'Zəngilana Köçənlər', description: 'Ağalı və digər bərpa olunan yaşayış məntəqələrinə köçən ailələr.' },
      { title: 'İdarə və Müəssisələr', description: 'Rayonda fəaliyyətə başlayan təşkilatlara avadanlıq daşıyanlar.' },
      { title: 'Ticarət və Xidmət', description: 'Yeni açılan obyektlərə mal çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Uzun Yol Sürücüləri', description: 'Horadiz–Zəngilan yolunda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Zəngilandan Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Ofis mebeli və texnikası', 'Məişət texnikası', 'Ticarət avadanlığı'],
    priceFactors: [
      { factor: 'Uzun Məsafə', detail: '382 km-lik marşrutda bütün yükün bir reysə sığması üçün maşın düzgün seçilir.' },
    ],
    evacFactor: { factor: 'Uzun Məsafə', detail: 'Avtomobilin bütün yol boyu 4 nöqtədən fiksasiyası.' },
    faqs: [
      { question: 'Ağalı kəndinə köç edirəm, yükü aparırsınız?', answer: 'Bəli, Ağalı və Zəngilanın digər yaşayış məntəqələrinə köç əşyaları daşınır.' },
      { question: 'Bakıdan Zəngilana yük hansı yolla gedir?', answer: 'Horadiz üzərindən (382 km).' },
    ],
    evacFaqs: [
      { question: 'Zəngilan yolunda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin; operator şərtləri və gəlmə vaxtını deyir.' },
      { question: 'Zəngilandan Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
    ],
  },

  'baki-agbend': {
    name: 'Ağbənd', dative: 'Ağbəndə', ablative: 'Ağbənddən', km: 420, mountain: false, karabakh: true,
    answer: 'Bakıdan Ağbəndə yükdaşıma Horadiz–Ağbənd yolu ilə (420 km) aparılır. Ağbənd Zəngilan rayonunda, Araz çayı yaxınlığında, ölkənin cənub-qərb ucunda yerləşir və Zəngəzur dəhlizinin başlanğıc nöqtəsi hesab olunur.',
    answerEvac: 'Bakı–Ağbənd (420 km) evakuatoru üçün sifariş qəbul edilir; bu, saytdakı ən uzun marşrutlardandır. Avtomobil bütün yol boyu 4 nöqtədən bərkidilir.',
    overview: 'Ağbənd Zəngilan rayonunda, Araz çayının yaxınlığında, Azərbaycanın cənub-qərb ucunda yerləşən kənddir və Zəngəzur dəhlizinin başlanğıc nöqtəsi kimi tanınır. Bakıdan yol Horadiz–Ağbənd avtomobil yolu ilə gedir (420 km). Uzun məsafə olduğu üçün yük səhər tezdən yüklənir.',
    vehicle: 'Uzun yolda bütün yükün bir reysə sığması vacibdir; adətən 5–7 metrlik qapalı furqon seçilir.',
    loading: 'Uzun yolda mebel tam qablaşdırılır, künclər qorunur, hər şey kəmərlə bərkidilir.',
    evac: 'Bakı–Ağbənd evakuatoru Horadiz–Ağbənd yolu ilə çox uzun məsafəli marşrutla işləyir; avtomobil yolda yoxlanılır.',
    audiences: [
      { title: 'Köç Edən Ailələr', description: 'Ağbənd və ətraf yaşayış məntəqələrinə köçənlər.' },
      { title: 'Layihə və Tikinti', description: 'Bölgədəki layihələr üçün ofis və yaşayış avadanlığı göndərənlər.' },
      { title: 'Ticarət', description: 'Yeni obyektlərə mal çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Uzun Yol Sürücüləri', description: 'Horadiz–Ağbənd yolunda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Ağbənddən Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Ofis və yaşayış avadanlığı', 'Məişət texnikası'],
    priceFactors: [
      { factor: 'Çox Uzun Məsafə', detail: '420 km; maşın ölçüsü bütün yükün bir reysə sığmasına görə seçilir.' },
    ],
    evacFactor: { factor: 'Uzun Məsafə', detail: 'Avtomobilin bütün yol boyu 4 nöqtədən fiksasiyası.' },
    faqs: [
      { question: 'Ağbənd harada yerləşir?', answer: 'Zəngilan rayonunda, Araz çayı yaxınlığında, ölkənin cənub-qərb ucunda; Bakıdan təxminən 420 km.' },
      { question: 'Bakıdan Ağbəndə yük hansı yolla gedir?', answer: 'Horadiz–Ağbənd avtomobil yolu ilə.' },
    ],
    evacFaqs: [
      { question: 'Ağbənd yolunda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin; operator şərtləri və gəlmə vaxtını deyir.' },
      { question: 'Bu qədər uzun yolda avtomobil necə bərkidilir?', answer: '4 nöqtədən təkər kəmərləri ilə; yolda yoxlanılır.' },
    ],
  },

  'baki-mincivan': {
    name: 'Mincivan', dative: 'Mincivana', ablative: 'Mincivandan', km: 395, mountain: false, karabakh: true,
    answer: 'Bakıdan Mincivana yükdaşıma Horadiz üzərindən (395 km) aparılır. Mincivan Zəngilan rayonunda, tarixən dəmir yolu qovşağı olmuş qəsəbədir; bərpa olunan yaşayış məntəqəsinə köç və avadanlıq daşınır.',
    answerEvac: 'Bakı–Mincivan (395 km) evakuatoru üçün sifariş qəbul edilir. Horadiz üzərindən uzun məsafədə avtomobil 4 nöqtədən bərkidilir.',
    overview: 'Mincivan Zəngilan rayonunda, Bərgüşad və Araz vadisinə yaxın yerləşən qəsəbədir və tarixən bölgənin dəmir yolu qovşaqlarından biri olub. Bakıdan yol Horadiz üzərindən Mincivana gedir (395 km). Qəsəbə bərpa olunduğu üçün sifarişlərin çoxu köç və yeni obyektlər üçün avadanlıqdır.',
    vehicle: 'Ev köçü üçün adətən 5–7 metrlik qapalı furqon seçilir.',
    loading: 'Uzun yolda mebel tam qablaşdırılır, texnika orijinal qutusunda daşınır.',
    evac: 'Bakı–Mincivan evakuatoru Horadiz üzərindən uzun məsafəli marşrutla işləyir; avtomobil 4 nöqtədən təkər kəmərləri ilə bərkidilir.',
    audiences: [
      { title: 'Mincivana Köçənlər', description: 'Bərpa olunan qəsəbəyə köçən ailələr.' },
      { title: 'Layihə və Müəssisələr', description: 'Bölgədəki obyektlərə avadanlıq göndərənlər.' },
      { title: 'Ticarət', description: 'Yeni açılan obyektlərə mal çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Uzun Yol Sürücüləri', description: 'Horadiz–Zəngilan istiqamətində nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Mincivandan Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Ofis avadanlığı', 'Məişət texnikası'],
    priceFactors: [
      { factor: 'Uzun Məsafə', detail: '395 km-lik marşrutda maşın ölçüsü bütün yükün bir reysə sığmasına görə seçilir.' },
    ],
    evacFactor: { factor: 'Uzun Məsafə', detail: 'Avtomobilin bütün yol boyu 4 nöqtədən fiksasiyası.' },
    faqs: [
      { question: 'Mincivan hansı rayondadır?', answer: 'Zəngilan rayonunda; Bakıdan Horadiz üzərindən təxminən 395 km.' },
      { question: 'Ev köçü üçün hansı maşın lazımdır?', answer: 'Uzun yolda adətən 5–7 metrlik qapalı furqon tövsiyə olunur.' },
    ],
    evacFaqs: [
      { question: 'Mincivandan Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
      { question: 'Yolda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin.' },
    ],
  },

  // ------------------------------------------------------------- Xocavənd / Hadrut / Şuşa ətrafı
  'baki-hadrut': {
    name: 'Hadrut', dative: 'Hadruta', ablative: 'Hadrutdan', km: 340, mountain: true, karabakh: true,
    answer: 'Bakıdan Hadruta yükdaşıma Füzuli istiqamətindən, oradan dağ yolu ilə (340 km) aparılır. Hadrut Xocavənd rayonunda, dağlıq ərazidə yerləşən qəsəbədir; yolun son hissəsi yoxuşlu olduğu üçün orta ölçülü furqon təyin edilir.',
    answerEvac: 'Bakı–Hadrut (340 km) evakuatoru üçün sifariş qəbul edilir. Dağ yolunda nasaz avtomobillər bucurqadlı gücləndirilmiş platforma ilə daşınır.',
    overview: 'Hadrut Xocavənd rayonunun dağlıq hissəsində yerləşən qəsəbədir. Bakıdan yol Füzuli istiqamətindən, oradan dağ yolu ilə Hadruta qalxır (340 km). Yolun son hissəsi döngəli və yoxuşludur, ona görə maşın seçimi və yükün bərkidilməsi buna görə planlaşdırılır.',
    vehicle: 'Dağ yolu səbəbindən adətən 3–5 metrlik furqon seçilir.',
    loading: 'Döngəli yoxuşda yerini dəyişməsin deyə mebel kəmərlə bərkidilir.',
    evac: 'Hadrut yolunun dağ hissəsində yoxuşda və enişdə nasaz qalan avtomobillər bucurqadlı platforma ilə yüklənir.',
    audiences: [
      { title: 'Hadruta Köçənlər', description: 'Qəsəbəyə köçən ailələr.' },
      { title: 'Müəssisələr', description: 'Qəsəbədəki obyektlərə avadanlıq göndərənlər.' },
      { title: 'Ev Əşyası Göndərənlər', description: 'Mebel və texnika aparanlar.' },
    ],
    evacAudiences: [
      { title: 'Dağ Yolu Sürücüləri', description: 'Hadrut yolunda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Məişət texnikası', 'Ofis avadanlığı'],
    priceFactors: [
      { factor: 'Dağ Yolu', detail: 'Füzulidən sonrakı yoxuşlu yol səbəbindən adətən kiçik və orta furqon seçilir.' },
    ],
    evacFactor: { factor: 'Dağ Şəraiti', detail: 'Yoxuşlu yolda yükləmə bucurqad və əlavə vaxt tələb edir.' },
    faqs: [
      { question: 'Hadrut hansı rayondadır?', answer: 'Xocavənd rayonunun dağlıq hissəsində; Bakıdan təxminən 340 km.' },
      { question: 'Hadruta böyük maşın gedə bilərmi?', answer: 'Dağ yolu səbəbindən adətən 3–5 metrlik furqon seçilir.' },
    ],
    evacFaqs: [
      { question: 'Hadrut yolunda yoxuşda qaldım, nə etməli?', answer: 'Əl əyləcini çəkin, qəza işıqlarını yandırın və WhatsApp ilə yerinizi göndərin.' },
      { question: 'Hadrutdan Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
    ],
  },

  'baki-boyuk-taglar': {
    name: 'Böyük Tağlar', dative: 'Böyük Tağlara', ablative: 'Böyük Tağlardan', km: 350, mountain: true, karabakh: true,
    answer: 'Bakıdan Böyük Tağlar kəndinə yükdaşıma Hadrut istiqamətindən (350 km) aparılır. Kənd Xocavənd rayonunun dağlıq hissəsindədir; kənd yolları dar olduğu üçün kiçik və orta ölçülü furqon təyin edilir.',
    answerEvac: 'Bakı–Böyük Tağlar (350 km) evakuatoru üçün sifariş qəbul edilir. Dağ kəndindən avtomobillər bucurqadlı platforma ilə çıxarılır.',
    overview: 'Böyük Tağlar Xocavənd rayonunun dağlıq hissəsində, Hadrut ətrafında yerləşən kənddir. Bakıdan yol Füzuli və Hadrut istiqamətindən kəndə qalxır (350 km). Kənd yolları dar və yoxuşlu olduğu üçün böyük furqon əvəzinə adətən kiçik maşın seçilir.',
    vehicle: 'Kənd yolları dardır; adətən 3–4 metrlik furqon seçilir, böyük həcmdə iki reys planlaşdırıla bilər.',
    loading: 'Dar və yoxuşlu kənd yolunda yük kəmərlə möhkəm bərkidilir.',
    evac: 'Dağ kəndinin dar yolunda avtomobil bucurqadla platformaya çəkilir; yükləmə yeri əvvəlcədən dəqiqləşdirilir.',
    audiences: [
      { title: 'Kəndə Köçənlər', description: 'Böyük Tağlara köçən ailələr.' },
      { title: 'Ev Əşyası Göndərənlər', description: 'Kənd evinə mebel və texnika aparanlar.' },
      { title: 'Təsərrüfatlar', description: 'Kənd təsərrüfatı üçün ləvazimat göndərənlər.' },
    ],
    evacAudiences: [
      { title: 'Dağ Kəndi Sakinləri', description: 'Avtomobilini Bakıdakı servisə göndərmək istəyənlər.' },
      { title: 'Dağ Yolu Sürücüləri', description: 'Hadrut ətrafında yolda qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra daşınacaq avtomobillər.' },
    ],
    cargo: ['Köç əşyaları', 'Kənd evi mebeli', 'Məişət texnikası', 'Təsərrüfat ləvazimatı (qablaşdırılmış)'],
    priceFactors: [
      { factor: 'Dar Kənd Yolu', detail: 'Kiçik maşınla bir neçə reys lazım ola bilər.' },
    ],
    evacFactor: { factor: 'Dağ Kəndi', detail: 'Dar yoxuşlu yolda yükləmə bucurqad və əlavə vaxt tələb edir.' },
    faqs: [
      { question: 'Böyük Tağlar harada yerləşir?', answer: 'Xocavənd rayonunun dağlıq hissəsində, Hadrut ətrafında; Bakıdan təxminən 350 km.' },
      { question: 'Kəndə hansı maşın gedə bilər?', answer: 'Kənd yolları dar olduğu üçün adətən 3–4 metrlik furqon.' },
    ],
    evacFaqs: [
      { question: 'Kənddən Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
      { question: 'Dar kənd yolunda avtomobil necə yüklənir?', answer: 'Bucurqadla platformaya çəkilir.' },
    ],
  },

  'baki-qirmizi-bazar': {
    name: 'Qırmızı Bazar', dative: 'Qırmızı Bazara', ablative: 'Qırmızı Bazardan', km: 355, mountain: true, karabakh: true,
    answer: 'Bakıdan Qırmızı Bazara yükdaşıma Füzuli istiqamətindən (355 km) aparılır. Qırmızı Bazar Xocavənd rayonunda, dağətəyi və dağlıq ərazidə yerləşən qəsəbədir; köç və ev əşyaları daşınır.',
    answerEvac: 'Bakı–Qırmızı Bazar (355 km) evakuatoru üçün sifariş qəbul edilir. Dağ yolunda avtomobil bucurqadlı platforma ilə yüklənir.',
    overview: 'Qırmızı Bazar Xocavənd rayonunda, Füzuli–Şuşa istiqamətinə yaxın dağlıq ərazidə yerləşən qəsəbədir. Bakıdan yol Füzuli istiqamətindən qəsəbəyə gedir (355 km). Son hissə yoxuşlu olduğu üçün orta ölçülü maşın seçilir.',
    vehicle: 'Adətən 3–5 metrlik furqon seçilir; ünvana gedən yolun vəziyyəti əvvəlcədən bildirilməlidir.',
    loading: 'Yoxuşlu yolda mebel kəmərlə bərkidilir, ağır əşyalar aşağıya yerləşdirilir.',
    evac: 'Qırmızı Bazar ətrafında dağ yolunda nasaz qalan avtomobillər bucurqadlı gücləndirilmiş platforma ilə yüklənir.',
    audiences: [
      { title: 'Qəsəbəyə Köçənlər', description: 'Qırmızı Bazara köçən ailələr.' },
      { title: 'Ev Əşyası Göndərənlər', description: 'Mebel və texnika aparanlar.' },
      { title: 'Obyektlər', description: 'Qəsəbədəki obyektlərə avadanlıq çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Dağ Yolu Sürücüləri', description: 'Qəsəbə ətrafında yolda qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Məişət texnikası', 'Kiçik obyekt avadanlığı'],
    priceFactors: [
      { factor: 'Dağ Yolu', detail: 'Yoxuşlu son hissə səbəbindən adətən orta ölçülü furqon seçilir.' },
    ],
    evacFactor: { factor: 'Dağ Şəraiti', detail: 'Yoxuşlu yolda yükləmə bucurqad tələb edir.' },
    faqs: [
      { question: 'Qırmızı Bazar hansı rayondadır?', answer: 'Xocavənd rayonunda; Bakıdan Füzuli istiqamətindən təxminən 355 km.' },
      { question: 'Hansı maşın seçilir?', answer: 'Yoxuşlu yol səbəbindən adətən 3–5 metrlik furqon.' },
    ],
    evacFaqs: [
      { question: 'Qırmızı Bazardan Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
      { question: 'Dağ yolunda yoxuşda qaldım, nə etməli?', answer: 'Əl əyləcini çəkin və WhatsApp ilə yerinizi göndərin.' },
    ],
  },

  'baki-xocavend': {
    name: 'Xocavənd', dative: 'Xocavəndə', ablative: 'Xocavənddən', km: 345, mountain: false, karabakh: true,
    answer: 'Bakıdan Xocavəndə yükdaşıma Ağdam və ya Füzuli istiqamətindən (345 km) aparılır. Xocavənd rayonu düzənlikdən dağlara keçən ərazidədir; rayon mərkəzinə köç və yeni obyektlər üçün avadanlıq daşınır.',
    answerEvac: 'Bakı–Xocavənd (345 km) evakuatoru üçün sifariş qəbul edilir. Uzun məsafədə avtomobil 4 nöqtədən bərkidilir.',
    overview: 'Xocavənd rayonu Qarabağın cənub-şərqində, Ağdam və Füzuli arasında, düzənlikdən dağlara keçən ərazidə yerləşir. Bakıdan yol Ağdam və ya Füzuli istiqamətindən Xocavəndə gedir (345 km). Rayon mərkəzinə köç və yeni açılan obyektlər üçün avadanlıq ən çox sifariş olunur.',
    vehicle: 'Rayon mərkəzi üçün 5–7 metrlik qapalı furqon, dağ kəndləri üçün kiçik maşın seçilir.',
    loading: 'Uzun yolda mebel tam qablaşdırılır və kəmərlə bərkidilir.',
    evac: 'Bakı–Xocavənd evakuatoru uzun məsafəli marşrutla işləyir; dağ kəndlərindən çıxarma üçün bucurqadlı platforma göndərilir.',
    audiences: [
      { title: 'Xocavəndə Köçənlər', description: 'Rayon mərkəzinə və kəndlərə köçən ailələr.' },
      { title: 'İdarə və Müəssisələr', description: 'Yeni açılan təşkilatlara avadanlıq daşıyanlar.' },
      { title: 'Ticarət', description: 'Obyektlərə mal çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Uzun Yol Sürücüləri', description: 'Ağdam–Füzuli istiqamətində nasaz qalan avtomobillər.' },
      { title: 'Dağ Kəndi Sakinləri', description: 'Kənddən avtomobilini Bakıya göndərənlər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra daşınacaq avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Ofis mebeli və texnikası', 'Ticarət avadanlığı', 'Məişət texnikası'],
    priceFactors: [
      { factor: 'Ünvan', detail: 'Rayon mərkəzi ilə dağ kəndləri arasında maşın seçimi fərqlənir.' },
    ],
    evacFactor: { factor: 'Ünvan', detail: 'Dağ kəndindən çıxarma bucurqad tələb edə bilər.' },
    faqs: [
      { question: 'Bakıdan Xocavəndə yük hansı yolla gedir?', answer: 'Ağdam və ya Füzuli istiqamətindən (təxminən 345 km); marşrut ünvana görə seçilir.' },
      { question: 'Dağ kəndinə yük aparırsınız?', answer: 'Bəli, yolun vəziyyətinə görə kiçik maşın təyin edilir.' },
    ],
    evacFaqs: [
      { question: 'Xocavənddən Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
      { question: 'Yolda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin.' },
    ],
  },

  'baki-dasalti': {
    name: 'Daşaltı', dative: 'Daşaltıya', ablative: 'Daşaltıdan', km: 370, mountain: true, karabakh: true,
    answer: 'Bakıdan Daşaltıya yükdaşıma Füzuli və Şuşa istiqamətindən (370 km) aparılır. Daşaltı Şuşa rayonunda, Şuşa yaylasının qayalıq yamaclarının altında, dərədə yerləşən kənddir; dar dağ yolları üçün kiçik maşın təyin edilir.',
    answerEvac: 'Bakı–Daşaltı (370 km) evakuatoru üçün sifariş qəbul edilir. Dərədəki dar yolda avtomobil bucurqadlı platforma ilə yüklənir.',
    overview: 'Daşaltı Şuşa rayonunda, Şuşa yaylasının qayalıq yamaclarının altında, dərədə yerləşən kənddir. Bakıdan yol Füzuliyə, oradan Şuşa istiqamətinə gedir (370 km). Dərəyə enən yol dar və enişli olduğu üçün böyük furqon əvəzinə kiçik maşın seçilir.',
    vehicle: 'Dərəyə enən dar yol üçün adətən 3 metrlik furqon seçilir; böyük həcmdə bir neçə reys planlaşdırılır.',
    loading: 'Dik enişdə yük yerini dəyişməsin deyə hər şey möhkəm bərkidilir.',
    evac: 'Daşaltı dərəsinə enən dar yolda nasaz qalan avtomobillər bucurqadla yuxarı çəkilib platformaya yüklənir.',
    audiences: [
      { title: 'Kəndə Köçənlər', description: 'Daşaltıya köçən ailələr.' },
      { title: 'Ev Əşyası Göndərənlər', description: 'Kənd evinə mebel və texnika aparanlar.' },
      { title: 'Turizm Obyektləri', description: 'Şuşa ətrafındakı obyektlərə avadanlıq çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Dərə Yolu Sürücüləri', description: 'Dik və dar yolda qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları', 'Kənd evi mebeli', 'Məişət texnikası'],
    priceFactors: [
      { factor: 'Dar Dərə Yolu', detail: 'Kiçik maşınla bir neçə reys lazım ola bilər.' },
    ],
    evacFactor: { factor: 'Dik Yol', detail: 'Dərədən çıxarma bucurqad və əlavə vaxt tələb edir.' },
    faqs: [
      { question: 'Daşaltı harada yerləşir?', answer: 'Şuşa rayonunda, Şuşa yaylasının altında, dərədə; Bakıdan təxminən 370 km.' },
      { question: 'Daşaltıya böyük maşın enə bilərmi?', answer: 'Yol dar və enişlidir; adətən 3 metrlik furqon seçilir.' },
    ],
    evacFaqs: [
      { question: 'Dərə yolunda avtomobilim qaldı, çıxarırsınız?', answer: 'Bəli, bucurqadla yuxarı çəkilib platformaya yüklənir.' },
      { question: 'Daşaltıdan Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
    ],
  },

  'baki-signaq': {
    name: 'Sığnaq', dative: 'Sığnaqa', ablative: 'Sığnaqdan', km: 360, mountain: true, karabakh: true,
    answer: 'Bakıdan Sığnaqa yükdaşıma Füzuli üzərindən, Şuşa istiqamətindəki dağ yolu ilə (360 km) aparılır. Sığnaq dağlıq ərazidə yerləşən kənddir; kənd yolları üçün kiçik və orta ölçülü furqon təyin edilir.',
    answerEvac: 'Bakı–Sığnaq (360 km) evakuatoru üçün sifariş qəbul edilir. Dağ yolunda avtomobil bucurqadlı platforma ilə yüklənir.',
    overview: 'Sığnaq Şuşa istiqamətindəki dağlıq ərazidə yerləşən kənddir. Bakıdan yol Füzuliyə, oradan Zəfər Yolu istiqamətində dağ yolu ilə gedir (360 km). Yolun son hissəsi yoxuşlu və döngəli olduğu üçün maşın seçimi buna görə aparılır.',
    vehicle: 'Dağ kəndi üçün adətən 3–4 metrlik furqon seçilir.',
    loading: 'Döngəli yoxuşda mebel kəmərlə bərkidilir.',
    evac: 'Sığnaq ətrafındakı dağ yolunda nasaz qalan avtomobillər bucurqadlı gücləndirilmiş platforma ilə yüklənir.',
    audiences: [
      { title: 'Kəndə Köçənlər', description: 'Sığnaqa köçən ailələr.' },
      { title: 'Ev Əşyası Göndərənlər', description: 'Kənd evinə mebel və texnika aparanlar.' },
      { title: 'Təsərrüfatlar', description: 'Ləvazimat göndərənlər.' },
    ],
    evacAudiences: [
      { title: 'Dağ Yolu Sürücüləri', description: 'Şuşa istiqamətində yolda qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları', 'Kənd evi mebeli', 'Məişət texnikası'],
    priceFactors: [
      { factor: 'Dağ Kəndi', detail: 'Yoxuşlu kənd yolu səbəbindən adətən kiçik furqon seçilir.' },
    ],
    evacFactor: { factor: 'Dağ Şəraiti', detail: 'Yoxuşlu yolda yükləmə bucurqad tələb edir.' },
    faqs: [
      { question: 'Bakıdan Sığnaqa yük hansı yolla gedir?', answer: 'Füzuliyə, oradan Şuşa istiqamətindəki dağ yolu ilə (təxminən 360 km).' },
      { question: 'Hansı maşın seçilir?', answer: 'Dağ kəndi üçün adətən 3–4 metrlik furqon.' },
    ],
    evacFaqs: [
      { question: 'Sığnaqdan Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
      { question: 'Yoxuşda qaldım, nə etməli?', answer: 'Əl əyləcini çəkin və WhatsApp ilə yerinizi göndərin.' },
    ],
  },

  'baki-xocali': {
    name: 'Xocalı', dative: 'Xocalıya', ablative: 'Xocalıdan', km: 375, mountain: false, karabakh: true,
    answer: 'Bakıdan Xocalıya yükdaşıma Bərdə və Ağdam üzərindən, Əsgəran yolu ilə (375 km) aparılır. Xocalı Xankəndinin yaxınlığında yerləşən şəhərdir; bərpa olunan yaşayış binalarına köç və avadanlıq daşınır.',
    answerEvac: 'Bakı–Xocalı (375 km) evakuatoru üçün sifariş qəbul edilir. Uzun məsafədə avtomobil 4 nöqtədən bərkidilir.',
    overview: 'Xocalı Qarabağda, Xankəndinin yaxınlığında, Ağdam–Xankəndi yolunun üstündə yerləşən şəhərdir. Bakıdan yol Bərdə və Ağdam üzərindən, Əsgəran istiqamətində gedir (375 km). Şəhər bərpa olunduğu üçün sifarişlərin çoxu yeni yaşayış binalarına köç və idarələr üçün avadanlıqdır.',
    vehicle: 'Ev köçü üçün adətən 5–7 metrlik qapalı furqon seçilir.',
    loading: 'Uzun yolda mebel tam qablaşdırılır, texnika orijinal qutusunda daşınır.',
    evac: 'Bakı–Xocalı evakuatoru Bərdə və Ağdam üzərindən uzun məsafəli marşrutla işləyir; avtomobil 4 nöqtədən bərkidilir.',
    audiences: [
      { title: 'Xocalıya Köçənlər', description: 'Bərpa olunan yaşayış binalarına köçən ailələr.' },
      { title: 'İdarə və Müəssisələr', description: 'Yeni açılan təşkilatlara avadanlıq daşıyanlar.' },
      { title: 'Ticarət', description: 'Obyektlərə mal çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Uzun Yol Sürücüləri', description: 'Ağdam–Xankəndi yolunda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Ofis mebeli və texnikası', 'Məişət texnikası'],
    priceFactors: [
      { factor: 'Uzun Məsafə', detail: '375 km-lik marşrutda maşın ölçüsü bütün yükün bir reysə sığmasına görə seçilir.' },
    ],
    evacFactor: { factor: 'Uzun Məsafə', detail: 'Avtomobilin bütün yol boyu 4 nöqtədən fiksasiyası.' },
    faqs: [
      { question: 'Bakıdan Xocalıya yük hansı yolla gedir?', answer: 'Bərdə və Ağdam üzərindən, Əsgəran istiqamətində (375 km).' },
      { question: 'Ev köçü üçün hansı maşın lazımdır?', answer: 'Uzun yolda adətən 5–7 metrlik qapalı furqon tövsiyə olunur.' },
    ],
    evacFaqs: [
      { question: 'Xocalıdan Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
      { question: 'Yolda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin.' },
    ],
  },

  'baki-suqovusan': {
    name: 'Suqovuşan', dative: 'Suqovuşana', ablative: 'Suqovuşandan', km: 345, mountain: false, karabakh: true,
    answer: 'Bakıdan Suqovuşana yükdaşıma Bərdə və Tərtər üzərindən (345 km) aparılır. Suqovuşan Tərtər rayonunda, Sərsəng su anbarının yaxınlığında, dağətəyi ərazidə yerləşən kənddir; köç və ev əşyaları daşınır.',
    answerEvac: 'Bakı–Suqovuşan (345 km) evakuatoru üçün sifariş qəbul edilir. Tərtər üzərindən uzun məsafədə avtomobil 4 nöqtədən bərkidilir.',
    overview: 'Suqovuşan Tərtər rayonunda, Tərtər çayı vadisində, Sərsəng su anbarına yaxın dağətəyi ərazidə yerləşən kənddir. Bakıdan yol Bərdə və Tərtər üzərindən gedir (345 km). Tərtərə qədər yol düzəndir, kəndə yaxınlaşdıqca ərazi dağətəyinə keçir.',
    vehicle: 'Tərtərə qədər böyük furqon rahat gedir; kənd ünvanı üçün adətən 4–5 metrlik maşın seçilir.',
    loading: 'Dağətəyi yolda mebel kəmərlə bərkidilir.',
    evac: 'Bakı–Suqovuşan evakuatoru Bərdə və Tərtər üzərindən işləyir; dağətəyi hissədə yükləmə yeri əvvəlcədən dəqiqləşdirilir.',
    audiences: [
      { title: 'Kəndə Köçənlər', description: 'Suqovuşana köçən ailələr.' },
      { title: 'Ev Əşyası Göndərənlər', description: 'Kənd evinə mebel və texnika aparanlar.' },
      { title: 'Təsərrüfatlar', description: 'Ləvazimat göndərənlər.' },
    ],
    evacAudiences: [
      { title: 'Uzun Yol Sürücüləri', description: 'Bərdə–Tərtər istiqamətində nasaz qalan avtomobillər.' },
      { title: 'Kənd Sakinləri', description: 'Avtomobilini Bakıya göndərmək istəyənlər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra daşınacaq avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Məişət texnikası', 'Təsərrüfat ləvazimatı (qablaşdırılmış)'],
    priceFactors: [
      { factor: 'Uzun Məsafə', detail: '345 km-lik marşrutda maşın ölçüsü bütün yükün bir reysə sığmasına görə seçilir.' },
    ],
    evacFactor: { factor: 'Uzun Məsafə', detail: 'Avtomobilin bütün yol boyu 4 nöqtədən fiksasiyası.' },
    faqs: [
      { question: 'Suqovuşan harada yerləşir?', answer: 'Tərtər rayonunda, Sərsəng su anbarına yaxın; Bakıdan Bərdə və Tərtər üzərindən təxminən 345 km.' },
      { question: 'Hansı maşın seçilir?', answer: 'Kənd ünvanı üçün adətən 4–5 metrlik furqon.' },
    ],
    evacFaqs: [
      { question: 'Suqovuşandan Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
      { question: 'Yolda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin.' },
    ],
  },

  // ------------------------------------------------------------- Laçın / Kəlbəcər
  'baki-lacin': {
    name: 'Laçın', dative: 'Laçına', ablative: 'Laçından', km: 450, mountain: true, karabakh: true,
    answer: 'Bakıdan Laçına yükdaşıma (450 km) Qubadlı və ya Kəlbəcər istiqamətindən dağ yolları ilə aparılır. Laçın Həkəri çayı vadisində, yüksək dağlıq ərazidə yerləşən şəhərdir; uzun dağ marşrutu üçün texniki cəhətdən yoxlanmış orta ölçülü furqon göndərilir.',
    answerEvac: 'Bakı–Laçın (450 km) evakuatoru üçün sifariş qəbul edilir. Dağ yollarında avtomobil bucurqadlı gücləndirilmiş platforma ilə yüklənir.',
    overview: 'Laçın Həkəri çayının vadisində, yüksək dağlıq ərazidə yerləşən şəhərdir. Bakıdan yol uzun və dağlıqdır (450 km): marşrut Qubadlı və ya Kəlbəcər istiqamətindən keçir. Şəhər bərpa olunduğu üçün sifarişlərin çoxu köç və yeni idarələr üçün avadanlıqdır.',
    vehicle: 'Uzun dağ marşrutu üçün adətən 4–5 metrlik furqon seçilir; böyük həcmdə iki maşın planlaşdırıla bilər.',
    loading: 'Döngəli dağ yollarında mebel tam qablaşdırılır və kəmərlə bərkidilir.',
    evac: 'Laçın istiqamətindəki dağ yollarında nasaz qalan avtomobillər bucurqadlı gücləndirilmiş platforma ilə yüklənir; qışda yolun vəziyyəti nəzərə alınır.',
    audiences: [
      { title: 'Laçına Köçənlər', description: 'Bərpa olunan şəhərə köçən ailələr.' },
      { title: 'İdarə və Müəssisələr', description: 'Yeni açılan təşkilatlara avadanlıq daşıyanlar.' },
      { title: 'Ticarət', description: 'Obyektlərə mal çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Dağ Yolu Sürücüləri', description: 'Laçın yolunda nasaz qalan avtomobillər.' },
      { title: 'Qışda Yolda Qalanlar', description: 'Qarlı dağ yolunda ilişən avtomobillər.' },
      { title: 'Servis Transferi', description: 'Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Ofis mebeli və texnikası', 'Məişət texnikası'],
    priceFactors: [
      { factor: 'Uzun Dağ Marşrutu', detail: '450 km-lik yolun böyük hissəsi dağ yoludur; maşın və vaxt buna görə planlaşdırılır.' },
    ],
    evacFactor: { factor: 'Dağ Şəraiti', detail: 'Yoxuşlu yolda yükləmə bucurqad və əlavə vaxt tələb edir.' },
    faqs: [
      { question: 'Bakıdan Laçına yük hansı yolla gedir?', answer: 'Qubadlı və ya Kəlbəcər istiqamətindən dağ yolları ilə (təxminən 450 km); marşrut sifariş zamanı dəqiqləşdirilir.' },
      { question: 'Qışda Laçına yük aparmaq olur?', answer: 'Bəli, amma qar yolu çətinləşdirə bilər; çatdırılma vaxtı hava şəraitinə görə planlaşdırılır.' },
    ],
    evacFaqs: [
      { question: 'Laçın yolunda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin; operator şərtləri və gəlmə vaxtını deyir.' },
      { question: 'Laçından Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
    ],
  },

  'baki-minkend': {
    name: 'Minkənd', dative: 'Minkəndə', ablative: 'Minkənddən', km: 475, mountain: true, karabakh: true,
    answer: 'Bakıdan Minkəndə yükdaşıma Laçın üzərindən dağ yolu ilə (475 km) aparılır. Minkənd Laçın rayonunun yüksək dağ kəndidir; dar dağ yolu üçün kiçik maşın təyin edilir və çatdırılma hava şəraitinə görə planlaşdırılır.',
    answerEvac: 'Bakı–Minkənd (475 km) evakuatoru üçün sifariş qəbul edilir. Dağ kəndindən avtomobil bucurqadlı platforma ilə çıxarılır.',
    overview: 'Minkənd Laçın rayonunun yüksək dağlıq hissəsində yerləşən kənddir. Bakıdan yol Laçına, oradan dar dağ yolu ilə Minkəndə qalxır (475 km). Saytdakı ən uzun və ən çətin marşrutlardan biridir: dağ yolu dar və yoxuşludur, qışda qar olur.',
    vehicle: 'Dar dağ yolu üçün adətən 3 metrlik furqon seçilir; böyük həcmdə bir neçə reys planlaşdırılır.',
    loading: 'Dik və döngəli yolda hər şey möhkəm bərkidilir, kövrək əşyalar ayrıca qablaşdırılır.',
    evac: 'Minkənd yolunda nasaz qalan avtomobillər bucurqadlı gücləndirilmiş platforma ilə çıxarılır; qışda gəlmə vaxtı yolun vəziyyətindən asılıdır.',
    audiences: [
      { title: 'Kəndə Köçənlər', description: 'Minkəndə köçən ailələr.' },
      { title: 'Ev Əşyası Göndərənlər', description: 'Dağ kəndindəki evə mebel və texnika aparanlar.' },
      { title: 'Təsərrüfatlar', description: 'Ləvazimat göndərənlər.' },
    ],
    evacAudiences: [
      { title: 'Dağ Kəndi Sakinləri', description: 'Avtomobilini Bakıya göndərmək istəyənlər.' },
      { title: 'Qışda Yolda Qalanlar', description: 'Qarlı dağ yolunda ilişən avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra daşınacaq avtomobillər.' },
    ],
    cargo: ['Köç əşyaları', 'Kənd evi mebeli', 'Məişət texnikası'],
    priceFactors: [
      { factor: 'Ən Çətin Marşrut', detail: '475 km-lik yolun son hissəsi dar dağ yoludur; kiçik maşınla bir neçə reys lazım ola bilər.' },
    ],
    evacFactor: { factor: 'Dağ Şəraiti', detail: 'Dar yoxuşlu yolda yükləmə bucurqad və əlavə vaxt tələb edir.' },
    faqs: [
      { question: 'Minkənd harada yerləşir?', answer: 'Laçın rayonunun yüksək dağlıq hissəsində; Bakıdan Laçın üzərindən təxminən 475 km.' },
      { question: 'Minkəndə hansı maşın gedə bilər?', answer: 'Dar dağ yolu səbəbindən adətən 3 metrlik furqon.' },
    ],
    evacFaqs: [
      { question: 'Minkənddən Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
      { question: 'Qışda gəlirsiniz?', answer: 'Sifariş qəbul edilir; qarlı havada gəlmə vaxtı yolun vəziyyətinə görə deyilir.' },
    ],
  },

  'baki-kelbecer': {
    name: 'Kəlbəcər', dative: 'Kəlbəcərə', ablative: 'Kəlbəcərdən', km: 445, mountain: true, karabakh: true,
    answer: 'Bakıdan Kəlbəcərə yükdaşıma Göygöl–Toğanalı istiqamətindən, Murov dağı yolu ilə (445 km) aparılır. Kəlbəcər yüksək dağlıq rayondur, İstisu mineral bulaqları ilə tanınır; dağ marşrutu üçün orta ölçülü furqon təyin edilir və qışda yolun vəziyyəti nəzərə alınır.',
    answerEvac: 'Bakı–Kəlbəcər (445 km) evakuatoru üçün sifariş qəbul edilir. Dağ yolunda avtomobil bucurqadlı gücləndirilmiş platforma ilə yüklənir.',
    overview: 'Kəlbəcər Kiçik Qafqaz dağlarında, yüksək dağlıq ərazidə yerləşən rayondur və İstisu mineral bulaqları ilə tanınır. Bakıdan yol M2 ilə Gəncə istiqamətinə, oradan Göygöl və Toğanalı üzərindən Murov dağına doğru gedir (445 km). Yolun dağ hissəsi uzun və yoxuşludur, qışda qar olur.',
    vehicle: 'Dağ marşrutu üçün adətən 4–5 metrlik furqon seçilir; böyük həcmdə iki maşın planlaşdırıla bilər.',
    loading: 'Uzun dağ yolunda mebel tam qablaşdırılır, hər şey kəmərlə bərkidilir.',
    evac: 'Kəlbəcər yolunun dağ hissəsində nasaz qalan avtomobillər bucurqadlı gücləndirilmiş platforma ilə yüklənir; qışda gəlmə vaxtı yolun vəziyyətindən asılıdır.',
    audiences: [
      { title: 'Kəlbəcərə Köçənlər', description: 'Bərpa olunan yaşayış məntəqələrinə köçən ailələr.' },
      { title: 'İdarə və Müəssisələr', description: 'Yeni açılan təşkilatlara avadanlıq daşıyanlar.' },
      { title: 'Turizm', description: 'İstisu və dağ turizmi obyektlərinə avadanlıq çatdıranlar.' },
    ],
    evacAudiences: [
      { title: 'Dağ Yolu Sürücüləri', description: 'Murov istiqamətində nasaz qalan avtomobillər.' },
      { title: 'Qışda Yolda Qalanlar', description: 'Qarlı dağ yolunda ilişən avtomobillər.' },
      { title: 'Servis Transferi', description: 'Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları və mebel', 'Ofis mebeli və texnikası', 'Turizm obyekti avadanlığı', 'Məişət texnikası'],
    priceFactors: [
      { factor: 'Uzun Dağ Marşrutu', detail: '445 km-lik yolun dağ hissəsi yoxuşlu və döngəlidir; maşın və vaxt buna görə planlaşdırılır.' },
    ],
    evacFactor: { factor: 'Dağ Şəraiti', detail: 'Yoxuşlu yolda yükləmə bucurqad və əlavə vaxt tələb edir.' },
    faqs: [
      { question: 'Bakıdan Kəlbəcərə yük hansı yolla gedir?', answer: 'M2 ilə Gəncə istiqamətinə, oradan Göygöl və Toğanalı üzərindən Murov dağına doğru (təxminən 445 km).' },
      { question: 'İstisuya avadanlıq daşıyırsınız?', answer: 'Bəli, sifariş qəbul edilir; ünvan və yük həcmi əvvəlcədən dəqiqləşdirilir.' },
      { question: 'Qışda Kəlbəcərə yük getmək olur?', answer: 'Qar dağ yolunu çətinləşdirə bilər; çatdırılma vaxtı hava şəraitinə görə planlaşdırılır.' },
    ],
    evacFaqs: [
      { question: 'Kəlbəcər yolunda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin; operator şərtləri və gəlmə vaxtını deyir.' },
      { question: 'Kəlbəcərdən Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
    ],
  },

  'baki-togana': {
    name: 'Toğana', dative: 'Toğanaya', ablative: 'Toğanadan', km: 410, mountain: true, karabakh: true,
    answer: 'Bakıdan Toğanaya yükdaşıma M2 ilə Gəncə istiqamətinə, oradan Göygöl və Murov istiqamətindəki dağ yolu ilə (410 km) aparılır. Dağlıq ərazi olduğu üçün kiçik və orta ölçülü furqon təyin edilir.',
    answerEvac: 'Bakı–Toğana (410 km) evakuatoru üçün sifariş qəbul edilir. Dağ yolunda avtomobil bucurqadlı platforma ilə yüklənir.',
    overview: 'Toğana Göygöl–Murov istiqamətindəki dağ yolunun üstündə, dağlıq ərazidə yerləşir. Bakıdan yol M2 magistralı ilə Gəncə istiqamətinə, oradan Göygöl üzərindən dağa qalxır (410 km). Gəncəyə qədər yol düzəndir, son hissə isə yoxuşlu dağ yoludur.',
    vehicle: 'Dağ yolu səbəbindən adətən 3–5 metrlik furqon seçilir.',
    loading: 'Yoxuşlu yolda mebel kəmərlə bərkidilir, ağır əşyalar aşağıya yerləşdirilir.',
    evac: 'Göygöl–Murov istiqamətindəki dağ yolunda nasaz qalan avtomobillər bucurqadlı gücləndirilmiş platforma ilə yüklənir.',
    audiences: [
      { title: 'Köç Edənlər', description: 'Toğanaya köçən ailələr.' },
      { title: 'Ev Əşyası Göndərənlər', description: 'Dağ evinə mebel və texnika aparanlar.' },
      { title: 'Layihələr', description: 'Murov istiqamətindəki obyektlərə avadanlıq göndərənlər.' },
    ],
    evacAudiences: [
      { title: 'Dağ Yolu Sürücüləri', description: 'Göygöl–Murov yolunda nasaz qalan avtomobillər.' },
      { title: 'Qışda Yolda Qalanlar', description: 'Qarlı yolda ilişən avtomobillər.' },
      { title: 'Servis Transferi', description: 'Gəncə və ya Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargo: ['Köç əşyaları', 'Ev mebeli', 'Məişət texnikası'],
    priceFactors: [
      { factor: 'Dağ Yolu', detail: 'Göygöldən sonrakı yoxuşlu yol səbəbindən adətən kiçik və orta furqon seçilir.' },
    ],
    evacFactor: { factor: 'Dağ Şəraiti', detail: 'Yoxuşlu yolda yükləmə bucurqad tələb edir.' },
    faqs: [
      { question: 'Bakıdan Toğanaya yük hansı yolla gedir?', answer: 'M2 ilə Gəncə istiqamətinə, oradan Göygöl üzərindən dağ yolu ilə (təxminən 410 km).' },
      { question: 'Hansı maşın seçilir?', answer: 'Dağ yolu səbəbindən adətən 3–5 metrlik furqon.' },
    ],
    evacFaqs: [
      { question: 'Avtomobili Gəncədəki servisə apara bilərsiniz?', answer: 'Bəli, Gəncəyə və ya Bakıya daşınma mümkündür.' },
      { question: 'Dağ yolunda qaldım, nə etməli?', answer: 'Əl əyləcini çəkin və WhatsApp ilə yerinizi göndərin.' },
    ],
  },
};

export const BATCH7_REGIONAL_CONTENT: Record<string, PilotContent> = Object.fromEntries(
  Object.entries(ROUTES).map(([slug, facts]) => [slug, build(facts)])
);
