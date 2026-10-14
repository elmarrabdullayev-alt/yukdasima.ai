import { PilotContent, RouteVehicleType } from './regionalContent';

/**
 * BATCH 6 — route-specific content for 15 high-demand routes that previously used only the
 * generated template (Xaçmaz, Nabran, Şahdağ, Siyəzən, Xızı, Şirvan, İsmayıllı, Ağsu, Şəmkir,
 * Saatlı, Lerik, Şuşa, Xankəndi, Füzuli, Ağdam).
 *
 * Every page gets facts that are true only for that route: the road and what lies on it,
 * seasons, the typical orders there, and what that means for the vehicle choice.
 * Exact hours and prices are deliberately not stated here: prices come from the tariff
 * calculator, and travel time depends on traffic and weather.
 */

const PHONE = '050 250 31 70';

/** Yükdaşıma vehicle list (not shown on the page, kept for the data model). */
const STANDARD_TRUCKS: RouteVehicleType[] = [
  { name: '3 Metrlik Furqon', specs: 'Yük həcmi: ~6 m³', bestFor: 'Fərdi əşyalar, bir neçə mebel və qutular.' },
  { name: '4–5 Metrlik Qapalı Furqon', specs: 'Yük həcmi: ~13–16 m³', bestFor: '2–3 otaqlı mənzil və ofis köçü.' },
  { name: '6–7 Metrlik Böyük Furqon', specs: 'Yük həcmi: ~27–32 m³', bestFor: 'Böyük ev köçləri və həcmli kommersiya yükləri.' },
];

const EVAC_FLAT: RouteVehicleType[] = [
  { name: 'Standart Sürüşən Platforma', specs: 'Sedan, hetçbek, krossover', bestFor: 'Magistralda nasaz qalan minik avtomobilləri.' },
  { name: 'Gücləndirilmiş SUV Platforması', specs: 'Ağır cip və pikaplar', bestFor: 'Yolsuzluq avtomobilləri və minivanlar.' },
  { name: 'Dolli və Bucurqad', specs: 'Kilidli təkər və sükan üçün', bestFor: 'Qəzalı və təkəri fırlanmayan avtomobillər.' },
];

const EVAC_MOUNTAIN: RouteVehicleType[] = [
  { name: 'Bucurqadlı Gücləndirilmiş Platforma', specs: 'Elektrik bucurqad, 4 nöqtəli fiksasiya', bestFor: 'Yoxuşda və dar dağ yolunda yükləmə.' },
  { name: 'Gücləndirilmiş SUV Platforması', specs: 'Ağır cip və pikaplar', bestFor: 'Dağ kəndlərindən yolsuzluq avtomobillərinin çıxarılması.' },
  { name: 'Dolli və Bucurqad', specs: 'Kilidli təkər və sükan üçün', bestFor: 'Qəzalı və təkəri fırlanmayan avtomobillər.' },
];

const EVAC_PRICING = (route: string, extra: { factor: string; detail: string }) => [
  { factor: 'Marşrut', detail: `${route} istiqamətinin tarif bazasındakı evakuator qiyməti əsas götürülür.` },
  { factor: 'Avtomobil Növü', detail: 'Sedan, hetçbek və SUV üçün əlavə yoxdur; minivan +10 AZN; mikroavtobus fərdi hesablanır.' },
  { factor: 'Texniki Vəziyyət', detail: 'Təkəri və ya sükanı kilidli, işə düşməyən avtomobil +5 AZN.' },
  extra,
];

const KARABAKH_ACCESS_NOTE =
  'Qarabağ və Şərqi Zəngəzur bölgəsinə səfər və yük daşınması üçün qüvvədə olan giriş qaydaları sifariş zamanı operatorla əvvəlcədən dəqiqləşdirilir.';

export const BATCH6_REGIONAL_CONTENT: Record<string, PilotContent> = {
  // ---------------------------------------------------------------- Quba–Xaçmaz
  'baki-xacmaz': {
    directAnswerYukdasima:
      `Bakıdan Xaçmaza yükdaşıma M1 magistralı ilə, Sumqayıt, Siyəzən və Şabran üzərindən (157 km) həyata keçirilir. Ən çox sifariş mənzil köçü, Xaçmaz və Nabran meşə zonasındakı bağ evlərinə mebel, payızda isə Xaçmazdan Bakıya meyvə-tərəvəz daşınmasıdır. Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–Xaçmaz (157 km) evakuatoru M1 magistralı üzrə 24/7 işləyir. Yay həftəsonlarında Nabran istiqamətində sıxlıq və həddən artıq qızan mühərriklər səbəbindən çağırışlar artır. Avtomobilin yerini WhatsApp ilə göndərin: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Bağ Evi Sahibləri', description: 'Mövsüm başlamazdan əvvəl Xaçmaz, Nabran və Xudat ətrafındakı bağ evlərinə mebel, çarpayı və məişət texnikası aparanlar.' },
      { title: 'Meyvə-Tərəvəz Tədarükçüləri', description: 'Payız məhsulunu (alma, tərəvəz) Xaçmaz bağlarından Bakı bazarlarına və anbarlarına çatdıran fermerlər.' },
      { title: 'Şəhərə Köçən Ailələr', description: 'Xaçmaz şəhəri ilə Bakı arasında daimi yaşayış yerini dəyişən ailələr.' },
    ],
    targetAudienceEvakuator: [
      { title: 'Yay Mövsümü Sürücüləri', description: 'İstidə və tıxacda mühərriki qızan, M1-də yarı yolda qalan istirahətə gedənlər.' },
      { title: 'Qəzalı Avtomobil Sahibləri', description: 'M1 magistralında yol hadisəsinə düşmüş avtomobilləri Bakı servisinə aparmaq istəyənlər.' },
      { title: 'Servis Transferi', description: 'Xaçmazda alınmış və ya təmir üçün Bakıya göndərilən avtomobillər.' },
    ],
    cargoTypesYukdasima: [
      'Bağ evi mebeli və yataq dəstləri',
      'Soyuducu, kondisioner və digər məişət texnikası',
      'Meyvə-tərəvəz qutuları (mövsümi)',
      'Mənzil köçü əşyaları',
      'Kiçik ticarət obyektləri üçün mal',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_FLAT,
    pricingFactorsYukdasima: [
      { factor: 'Maşın Ölçüsü', detail: 'Bağ evi üçün adətən 3–4 metrlik, tam mənzil köçü üçün 5–7 metrlik furqon seçilir.' },
      { factor: 'Ünvana Giriş', detail: 'Meşə zonasındakı bağ evlərinə gedən dar yollarda böyük maşın girməyə bilər; bu, maşın seçiminə təsir edir.' },
      { factor: 'Mövsüm', detail: 'May–iyun və sentyabr aylarında bağ mövsümü başlayanda və bitəndə sifariş çox olur, maşını əvvəlcədən sifariş etmək məsləhətdir.' },
      { factor: 'Fəhlə', detail: 'Rayonlararası sifarişdə fəhlə xidməti ayrıca hesablanır.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–Xaçmaz', { factor: 'Yükləmə Yeri', detail: 'Magistral kənarı ilə meşə içi və ya qumlu ərazidən çıxarma fərqli vaxt tələb edir.' }),
    yukdasimaOverview:
      'Bakı–Xaçmaz marşrutu M1 magistralı ilə Xəzər sahili boyunca keçir: Sumqayıt, Siyəzən (Beşbarmaq dağının yanı) və Şabran üzərindən Xaçmaza çatılır. Xaçmaz rayonu bağları və Nabran, Xudat, Yalama istiqamətindəki istirahət zonası ilə tanınır. Buna görə sifarişlərin xeyli hissəsi bağ evlərinə mebel və texnika daşınmasıdır.',
    yukdasimaReverseOverview:
      'Xaçmazdan Bakıya isə ən çox payız məhsulu (alma və tərəvəz qutuları), mövsüm bitəndə bağ evlərindən qaytarılan əşyalar və daimi köç daşınır. Əks istiqamət üçün qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Meşə zonasındakı bağ evlərinə gedən yollar çox vaxt dar və torpaq yoldur. Belə ünvanlar üçün 3–4 metrlik furqon daha rahatdır. Mənzil köçündə 5–7 metrlik maşın bir reysə sığır.',
    yukdasimaLoadingNotes:
      'Meyvə-tərəvəz qutuları havalandırılan şəkildə, üst-üstə çox yığılmadan yüklənir. Bağ evi mebeli torpaq yolda silkələnməsin deyə kəmərlə bərkidilir.',
    evakuatorOverview:
      'Bakı–Xaçmaz evakuatoru M1 magistralı boyunca işləyir. Yayda Nabran istiqamətinə axın artanda tıxacda qızan mühərrik, akkumulyator və təkər problemləri ilə bağlı çağırışlar çoxalır.',
    evakuatorReverseOverview:
      'Xaçmaz, Nabran və Xudatdan Bakıdakı servislərə nasaz və qəzalı avtomobillərin daşınması da 24/7 qəbul edilir.',
    yukdasimaFaqs: [
      { question: 'Bakıdan Xaçmaza yük hansı yolla aparılır?', answer: 'M1 magistralı ilə: Sumqayıt, Siyəzən və Şabran üzərindən Xaçmaza (157 km). Ünvan Nabran və ya Xudat istiqamətindədirsə, marşrut oradan davam edir.' },
      { question: 'Meşə içindəki bağ evinə böyük maşın girə bilərmi?', answer: 'Bəzi bağ evlərinə gedən yollar dar və torpaqdır. Ünvanı əvvəlcədən bildirsəniz, giriş üçün uyğun ölçülü (adətən 3–4 metrlik) maşın təyin edilir.' },
      { question: 'Xaçmazdan Bakıya meyvə-tərəvəz daşıyırsınız?', answer: 'Bəli, mövsümi məhsul qutularla daşınır. Həcmə görə 4–7 metrlik qapalı furqon seçilir, qiymət operatorla dəqiqləşdirilir.' },
      { question: 'Bağ mövsümündə maşını nə vaxt sifariş etmək lazımdır?', answer: 'May–iyun və sentyabr aylarında sifariş çox olur. Bir neçə gün əvvəl sifariş vermək istədiyiniz vaxta maşın tapmağı asanlaşdırır.' },
      { question: 'Qiyməti necə öyrənə bilərəm?', answer: `Saytdakı kalkulyatorda marşrutu və maşın ölçüsünü seçərək ilkin qiyməti görə və ya ${PHONE} nömrəsinə zəng edə bilərsiniz.` },
    ],
    evakuatorFaqs: [
      { question: 'M1-də Xaçmaz yolunda qaldım, evakuator nə qədər tez gəlir?', answer: 'Gəlmə vaxtı avtomobilin yerindən və növbətçi evakuatorun harada olmasından asılıdır. WhatsApp ilə canlı lokasiya göndərsəniz, operator dəqiq vaxtı deyir.' },
      { question: 'Yayda tıxacda mühərrik qızıb, avtomobil gedə bilmir. Nə etməli?', answer: 'Mühərriki söndürüb təhlükəsiz yerdə dayanın və bizə zəng edin. Avtomobil platformaya yüklənib Bakıya və ya Xaçmazdakı servisə aparılır.' },
      { question: 'Nabrandan Bakıya evakuator sifariş etmək olar?', answer: 'Bəli, Nabran, Xudat və Xaçmazdan Bakıya avtomobil daşınması mümkündür; qiymət operatorla dəqiqləşdirilir.' },
      { question: 'Təkəri kilidli avtomobil necə yüklənir?', answer: 'Dolli (köməkçi təkər arabacığı) və bucurqadla, avtomobilə zərər vermədən yüklənir. Bunun üçün +5 AZN əlavə olunur.' },
    ],
  },

  'baki-nabran': {
    directAnswerYukdasima:
      `Bakıdan Nabrana yükdaşıma M1 magistralı və Xaçmaz–Nabran sahil yolu ilə (195 km) aparılır. Nabran Xəzər sahilindəki istirahət zonasıdır: əsas sifarişlər mövsüm öncəsi bağ evlərinə və istirahət obyektlərinə mebel, çarpayı, kondisioner və mətbəx avadanlığı daşınmasıdır. Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–Nabran (195 km) evakuatoru 24/7 işləyir. Yay aylarında M1-də sıxlıq, qızan mühərrik və qumlu sahil yollarında ilişib qalan avtomobillər ən çox rast gəlinən çağırışlardır. Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Bağ Evi və Villa Sahibləri', description: 'Yay mövsümünə hazırlıq üçün Nabrandakı evlərinə mebel, yataq dəstləri və texnika aparanlar.' },
      { title: 'İstirahət Obyektləri', description: 'Kotec, kiçik otel və restoranlar üçün mövsüm öncəsi avadanlıq və inventar daşıyan sahibkarlar.' },
      { title: 'Mövsüm Sonu Qayıdanlar', description: 'Sentyabrda əşyalarını Nabrandan Bakıya geri gətirənlər.' },
    ],
    targetAudienceEvakuator: [
      { title: 'İstirahətə Gedənlər', description: 'Uzun yolda və tıxacda nasaz qalan ailə avtomobilləri.' },
      { title: 'Sahildə İlişib Qalanlar', description: 'Qumlu və torpaq yollarda təkəri batan, öz gücü ilə çıxa bilməyən avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Mövsüm dövründə yol hadisəsinə düşən avtomobillərin Bakıya daşınması.' },
    ],
    cargoTypesYukdasima: [
      'Bağ evi və villa mebeli',
      'Kondisioner, soyuducu və mətbəx texnikası',
      'Kotec və kiçik otellər üçün çarpayı, döşək, inventar',
      'Restoran və kafe avadanlığı',
      'Bağ və həyət əşyaları (stol-stul, çardaq)',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_FLAT,
    pricingFactorsYukdasima: [
      { factor: 'Mövsüm', detail: 'May–iyun (mövsüm başlanğıcı) və sentyabr (mövsüm sonu) ən yüklü dövrdür; əvvəlcədən sifariş məsləhətdir.' },
      { factor: 'Ünvana Giriş', detail: 'Sahil və meşə içindəki dar yollar böyük maşının girişini çətinləşdirə bilər.' },
      { factor: 'Maşın Ölçüsü', detail: 'Bir bağ evi üçün adətən 3–5 metrlik, kotec və otel avadanlığı üçün 6–7 metrlik furqon seçilir.' },
      { factor: 'Fəhlə', detail: 'Rayonlararası sifarişdə fəhlə xidməti ayrıca hesablanır.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–Nabran', { factor: 'Çıxarma Şəraiti', detail: 'Qumdan və ya torpaq yoldan çıxarma əlavə vaxt və bucurqad tələb edə bilər.' }),
    yukdasimaOverview:
      'Nabran Xəzər sahilində, Xaçmaz rayonundakı ən məşhur istirahət zonasıdır. Bakıdan yol M1 magistralı ilə Xaçmaza, oradan sahil boyu Nabrana gedir (195 km). Burada yükdaşıma mövsümidir: əksər sifarişlər yay mövsümü başlamazdan əvvəl bağ evlərinə və istirahət obyektlərinə mebel və avadanlıq daşınmasıdır.',
    yukdasimaReverseOverview:
      'Mövsüm bitəndə (adətən sentyabrda) əşyaların Nabrandan Bakıya qaytarılması da tez-tez sifariş edilir. Əks istiqamət üçün qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Nabrandakı bir çox ev meşə içində və ya sahilə yaxın dar yollardadır. Böyük furqon girə bilmirsə, yük ya kiçik maşınla, ya da yolun girişində boşaldılıb daşınır. Bunu sifariş zamanı bildirin.',
    yukdasimaLoadingNotes:
      'Kondisioner və soyuducular dik vəziyyətdə daşınır, çatdırılandan sonra işə salmazdan əvvəl bir neçə saat gözləmək məsləhətdir. Döşəklər nəmdən qorumaq üçün plyonkaya bükülür.',
    evakuatorOverview:
      'Yay aylarında Bakı–Nabran yolunda hərəkət çox sıx olur. Ən çox çağırış qızan mühərrik, akkumulyator və qumlu sahil yolunda ilişən avtomobillərlədir.',
    evakuatorReverseOverview:
      'Nabran və ətraf istirahət zonasından avtomobillərin Bakıdakı servisə daşınması 24/7 təşkil edilir.',
    yukdasimaFaqs: [
      { question: 'Nabrana bağ evi mebelini nə vaxt göndərmək daha yaxşıdır?', answer: 'Mövsüm başlamazdan əvvəl, aprel–may aylarında. İyun və sentyabrda sifariş çox olduğu üçün bir neçə gün əvvəl sifariş vermək məsləhətdir.' },
      { question: 'Evim meşənin içindədir, böyük maşın girə bilərmi?', answer: 'Bəzi yollar dar və torpaqdır. Ünvanı və yolun vəziyyətini əvvəlcədən bildirsəniz, uyğun ölçülü maşın təyin edilir.' },
      { question: 'Kotec və ya kiçik otel üçün avadanlıq daşıyırsınız?', answer: 'Bəli, çarpayı, döşək, mətbəx və restoran avadanlığı daşınır. Həcmə görə 6–7 metrlik furqon və ya bir neçə reys planlaşdırılır.' },
      { question: 'Mövsüm bitəndə əşyaları Bakıya geri gətirə bilərsiniz?', answer: 'Bəli, Nabrandan Bakıya qaytarma da sifariş edilə bilər; qiymət operatorla dəqiqləşdirilir.' },
      { question: 'Qiyməti necə öyrənə bilərəm?', answer: `Saytdakı kalkulyatordan və ya ${PHONE} nömrəsinə zəng edərək.` },
    ],
    evakuatorFaqs: [
      { question: 'Avtomobilim Nabranda qumda ilişib qalıb, çıxara bilərsiniz?', answer: 'Bəli, bucurqadlı evakuator avtomobili qumdan çıxarıb platformaya yükləyir. Yeri WhatsApp ilə göndərin.' },
      { question: 'Yayda yolda mühərrik qızdı, nə etməli?', answer: 'Mühərriki söndürün, təhlükəsiz yerdə dayanın və zəng edin. Avtomobil servisə və ya Bakıya aparılır.' },
      { question: 'Nabrandan Bakıya evakuator gecə də işləyir?', answer: 'Bəli, xidmət 24/7 işləyir.' },
      { question: 'Minivanın daşınması fərqli qiymətlidir?', answer: 'Bəli, minivan üçün +10 AZN əlavə olunur. Avtomobil işləmirsə, daha +5 AZN.' },
    ],
  },

  'baki-sahdag': {
    directAnswerYukdasima:
      `Bakıdan Şahdağa yükdaşıma M1 magistralı ilə Qusara, oradan Qusar–Şahdağ dağ yolu ilə (210 km) aparılır. Şahdağ Turizm Kompleksinə otel və kotec avadanlığı, xizək mövsümünə hazırlıq yükləri daşınır. Qışda dağ yolunda qar və buz olduğu üçün qış təkərli maşın təyin edilir. Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–Şahdağ (210 km) evakuatoru 24/7 işləyir. Qışda buz bağlamış yoxuşlarda ilişən, yay təkərli və ya qəzaya düşən avtomobillər bucurqadlı gücləndirilmiş platforma ilə çıxarılır. Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Otel və Kotec Sahibləri', description: 'Şahdağ kurort zonasındakı otel, kotec və mənzillərə mebel və inventar daşıyanlar.' },
      { title: 'Xizək İcarəsi və Kafe-Restoranlar', description: 'Qış mövsümü başlamazdan əvvəl avadanlıq və mal göndərən sahibkarlar.' },
      { title: 'Mənzil Sahibləri', description: 'Kurort zonasındakı mənzilini əşyalandıran və ya boşaldan fərdi müştərilər.' },
    ],
    targetAudienceEvakuator: [
      { title: 'Qışda Yolda Qalanlar', description: 'Buzlu dağ yolunda yoxuşu çıxa bilməyən və ya sürüşüb ilişən avtomobillər.' },
      { title: 'Kurort Qonaqları', description: 'Kurortda akkumulyatoru boşalan və ya nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Dağ yolunda yol hadisəsinə düşən avtomobillərin Qusara və ya Bakıya daşınması.' },
    ],
    cargoTypesYukdasima: [
      'Otel və kotec mebeli',
      'Çarpayı, döşək və tekstil',
      'Restoran və kafe avadanlığı',
      'Xizək və qış idmanı avadanlığı',
      'Mənzil köçü əşyaları',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_MOUNTAIN,
    pricingFactorsYukdasima: [
      { factor: 'Fəsil və Yol Şəraiti', detail: 'Qışda qar və buz səbəbindən qış təkərli maşın lazımdır, çatdırılma vaxtı hava şəraitinə görə dəyişə bilər.' },
      { factor: 'Maşın Ölçüsü', detail: 'Kurort ərazisinə və dağ yoluna uyğun olaraq adətən 3–5 metrlik furqon üstünlük təşkil edir.' },
      { factor: 'Fəhlə və Mərtəbə', detail: 'Kurortdakı yaşayış binalarında mərtəbə və lift vəziyyəti əvvəlcədən bildirilməlidir; rayonlararası fəhlə ayrıca hesablanır.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–Şahdağ', { factor: 'Qış Şəraiti', detail: 'Buzlu yoxuşda yükləmə bucurqad və əlavə təhlükəsizlik tədbirləri tələb edir.' }),
    yukdasimaOverview:
      'Şahdağ Turizm Kompleksi Qusar rayonunda, dağlıq ərazidə yerləşir. Bakıdan yol M1 magistralı ilə Qusara, oradan isə dağ yolu ilə kurorta qalxır (210 km). Burada yükdaşıma kurortun mövsümlərinə bağlıdır: qış mövsümündən (dekabr–mart) əvvəl otel, kotec və kafelərə avadanlıq daşınması zirvəyə çatır.',
    yukdasimaReverseOverview:
      'Mövsüm sonu kurortdan Bakıya avadanlıq və şəxsi əşyaların qaytarılması da sifariş edilə bilər. Əks istiqamət üçün qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Qusardan sonra yol dağ yoludur: döngəli, yoxuşlu və qışda qarlı. Buna görə qışda qış təkərli və lazım olduqda zəncirlə təchiz olunmuş maşın təyin edilir. Çox böyük furqon əvəzinə adətən 3–5 metrlik maşınlar seçilir.',
    yukdasimaLoadingNotes:
      'Dağ yolunun döngələrində yük yerini dəyişməsin deyə mebel kəmərlə bərkidilir. Qışda tekstil və döşəklər nəmdən qorunmaq üçün plyonkaya bükülür.',
    evakuatorOverview:
      'Şahdağ yolunda evakuator çağırışları qışda çoxalır: buz bağlamış yoxuşda ilişən, yay təkərli və ya sürüşüb yoldan çıxan avtomobillər. Belə hallarda bucurqadlı gücləndirilmiş platforma istifadə olunur.',
    evakuatorReverseOverview:
      'Kurortdan və Qusar rayonundan Bakıdakı servislərə avtomobillərin daşınması 24/7 qəbul edilir.',
    yukdasimaFaqs: [
      { question: 'Qışda Şahdağa yük aparmaq olurmu?', answer: 'Bəli. Qışda qış təkərli maşın təyin edilir; qar yağanda çatdırılma vaxtı yolun vəziyyətinə görə dəyişə bilər və operator bu barədə sizə xəbər verir.' },
      { question: 'Bakıdan Şahdağa yük hansı yolla aparılır?', answer: 'M1 magistralı ilə Qusara, oradan dağ yolu ilə Şahdağ Turizm Kompleksinə (210 km).' },
      { question: 'Otel və kotec üçün çox avadanlıq daşıyırsınız?', answer: 'Bəli, həcmə görə bir və ya bir neçə reys planlaşdırılır. Dağ yolu səbəbindən adətən 3–5 metrlik maşınlarla daşınır.' },
      { question: 'Kurortdakı mənzildən Bakıya əşyaları gətirə bilərsiniz?', answer: 'Bəli, əks istiqamət də mümkündür; qiymət operatorla dəqiqləşdirilir.' },
    ],
    evakuatorFaqs: [
      { question: 'Avtomobilim buzlu yoxuşda ilişib qalıb, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın, qəza işıqlarını yandırın və WhatsApp ilə yerinizi göndərin. Bucurqadlı evakuator avtomobili yükləyib aparır.' },
      { question: 'Şahdağdan Bakıya evakuator gəlirmi?', answer: 'Bəli, kurort ərazisindən Bakıya və ya Qusardakı servisə avtomobil daşınır.' },
      { question: 'Qışda gəlmə vaxtı uzanırmı?', answer: 'Qar və buz olanda dağ yolunda hərəkət yavaşlayır. Operator gəlmə vaxtını yolun vəziyyətinə görə deyir.' },
      { question: 'Cip daşımaq üçün xüsusi evakuator lazımdır?', answer: 'Ağır cip və pikaplar gücləndirilmiş platforma ilə daşınır; sedan və SUV üçün əlavə haqq yoxdur.' },
    ],
  },

  'baki-siyezen': {
    directAnswerYukdasima:
      `Bakıdan Siyəzənə yükdaşıma M1 magistralı ilə (102 km) aparılır; yol Sumqayıtdan sonra Xəzər sahili boyu, Beşbarmaq dağının yanından keçir. Orta məsafə olduğu üçün mənzil köçü çox vaxt bir gündə yüklənib çatdırılır. Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–Siyəzən (102 km) evakuatoru M1 magistralı üzrə 24/7 işləyir. Siyəzən Bakı ilə Quba–Xaçmaz zonası arasındakı yolun ortasında olduğu üçün M1-də nasaz qalan avtomobillər bu istiqamətdə tez-tez daşınır. Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Mənzil Köçürənlər', description: 'Siyəzən şəhəri ilə Bakı arasında köç edən ailələr; məsafə bir günlük daşımaya imkan verir.' },
      { title: 'Sahil Evləri Sahibləri', description: 'Siyəzən sahilindəki bağ evlərinə mebel aparanlar.' },
      { title: 'Kiçik Sahibkarlar', description: 'Siyəzəndəki mağaza və emalatxanalara mal və avadanlıq göndərənlər.' },
    ],
    targetAudienceEvakuator: [
      { title: 'M1 Sürücüləri', description: 'Quba və Xaçmaz istiqamətinə gedərkən yolda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Magistralda yol hadisəsinə düşən avtomobillərin Bakıya daşınması.' },
      { title: 'Servis Transferi', description: 'Siyəzəndən Bakıdakı rəsmi servisə göndərilən avtomobillər.' },
    ],
    cargoTypesYukdasima: [
      'Mənzil köçü əşyaları',
      'Bağ evi mebeli',
      'Məişət texnikası',
      'Mağaza malları və rəflər',
      'Tikinti və təmir materialları (qablaşdırılmış)',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_FLAT,
    pricingFactorsYukdasima: [
      { factor: 'Maşın Ölçüsü', detail: 'Orta məsafədə maşın ölçüsü əsas qiymət amilidir: kiçik yük üçün 2–3 metrlik, mənzil üçün 4–5 metrlik furqon.' },
      { factor: 'Bir Günlük Daşıma', detail: '102 km məsafə yükləmə, yol və boşaltmanın eyni gündə bitməsinə imkan verir.' },
      { factor: 'Fəhlə və Mərtəbə', detail: 'Rayonlararası sifarişdə fəhlə ayrıca hesablanır; liftsiz yüksək mərtəbə əlavə haqq tələb edə bilər.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–Siyəzən', { factor: 'Yükləmə Yeri', detail: 'Magistral kənarında təhlükəsiz yükləmə üçün yol vəziyyəti nəzərə alınır.' }),
    yukdasimaOverview:
      'Siyəzən Bakı ilə Quba–Xaçmaz bölgəsi arasında, M1 magistralının üstündə yerləşir. Sumqayıtdan sonra yol Xəzər sahili ilə gedir və Beşbarmaq dağının yanından keçərək Siyəzənə çatır (102 km). Məsafə orta olduğu üçün mənzil köçü adətən səhər yüklənib həmin gün çatdırılır.',
    yukdasimaReverseOverview:
      'Siyəzəndən Bakıya köç və yük daşınması da mümkündür; əks istiqamət üçün qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Mənzil köçü üçün 4–5 metrlik qapalı furqon adətən kifayət edir. Sahil boyu küləkli havada açıq bortlu maşın əvəzinə qapalı furqon seçilir.',
    yukdasimaLoadingNotes:
      'Bir günlük daşımada əşyalar boşaltma ardıcıllığına görə yüklənir: əvvəl lazım olacaq əşyalar sonda yüklənir ki, ilk çıxarılsın.',
    evakuatorOverview:
      'Siyəzən M1 magistralının ortasında olduğu üçün Bakıdan Quba, Qusar və Xaçmaza gedən avtomobillərin yolda qaldığı hallarda evakuator tez-tez bu istiqamətdə işləyir.',
    evakuatorReverseOverview:
      'Siyəzən və ətrafından Bakıdakı servislərə avtomobil daşınması 24/7 təşkil olunur.',
    yukdasimaFaqs: [
      { question: 'Bakıdan Siyəzənə köçü bir gündə etmək olar?', answer: 'Bəli, 102 km məsafə yükləmə, yol və boşaltmanın adətən eyni gündə bitməsinə imkan verir.' },
      { question: 'Hansı maşın seçməliyəm?', answer: 'Bir neçə mebel və qutu üçün 2–3 metrlik, 2–3 otaqlı mənzil üçün 4–5 metrlik qapalı furqon uyğundur. Saytdakı AI analizi şəkillərə görə maşını təklif edir.' },
      { question: 'Siyəzəndən Bakıya da daşıyırsınız?', answer: 'Bəli, əks istiqamət mümkündür; qiymət operatorla dəqiqləşdirilir.' },
      { question: 'Qiyməti necə öyrənə bilərəm?', answer: `Saytdakı kalkulyatordan və ya ${PHONE} nömrəsinə zəng edərək.` },
    ],
    evakuatorFaqs: [
      { question: 'M1-də Siyəzən yaxınlığında qaldım, nə etməli?', answer: 'Avtomobili yolun kənarına çəkin, qəza işıqlarını yandırın və WhatsApp ilə yerinizi göndərin.' },
      { question: 'Siyəzəndən Bakıya avtomobil daşınır?', answer: 'Bəli, Bakıdakı istənilən servisə və ya ünvana daşınır.' },
      { question: 'Gecə də evakuator gəlir?', answer: 'Bəli, xidmət 24/7 işləyir.' },
      { question: 'Avtomobil işə düşmürsə qiymət dəyişir?', answer: 'Təkəri və ya sükanı kilidli, işləməyən avtomobil üçün +5 AZN əlavə olunur.' },
    ],
  },

  'baki-xizi': {
    directAnswerYukdasima:
      `Bakıdan Xızıya yükdaşıma M1 magistralı və oradan ayrılan dağətəyi yolla (104 km) aparılır. Xızı Qırmızı dağları və Altıağac Milli Parkı ilə tanınır; əsas sifarişlər buradakı bağ evləri və villalara mebel, texnika və tikinti materialı daşınmasıdır. Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–Xızı (104 km) evakuatoru 24/7 işləyir. Magistraldan sonrakı dağətəyi yolda enişlərdə əyləc qızması, torpaq yollarda ilişmə kimi hallarda bucurqadlı evakuator göndərilir. Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Bağ Evi və Villa Sahibləri', description: 'Xızı və Altıağac ətrafındakı evlərə mebel və texnika aparanlar.' },
      { title: 'Tikinti Aparanlar', description: 'Ev tikən və təmir edənlərə qablaşdırılmış material və avadanlıq çatdırılması.' },
      { title: 'Kənd Sakinləri', description: 'Xızı kəndləri ilə Bakı arasında köç edən ailələr.' },
    ],
    targetAudienceEvakuator: [
      { title: 'Dağətəyi Yol Sürücüləri', description: 'Uzun enişlərdə əyləci qızan və ya yoxuşda dayanan avtomobillər.' },
      { title: 'Torpaq Yolda İlişənlər', description: 'Yağışdan sonra torpaq kənd yollarında ilişib qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
    ],
    cargoTypesYukdasima: [
      'Bağ evi və villa mebeli',
      'Məişət texnikası',
      'Qablaşdırılmış tikinti və təmir materialları',
      'Bağ əşyaları və alətlər',
      'Köç əşyaları',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_MOUNTAIN,
    pricingFactorsYukdasima: [
      { factor: 'Ünvana Giriş', detail: 'Kəndlərə və bağ evlərinə gedən yolların bir hissəsi dar və torpaq yoldur; maşın ölçüsü buna görə seçilir.' },
      { factor: 'Hava Şəraiti', detail: 'Güclü yağışdan sonra torpaq yollar çətin keçilən ola bilər; çatdırılma vaxtı buna görə planlaşdırılır.' },
      { factor: 'Fəhlə', detail: 'Rayonlararası sifarişdə fəhlə xidməti ayrıca hesablanır.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–Xızı', { factor: 'Çıxarma Şəraiti', detail: 'Yamacdan və ya palçıqlı yoldan çıxarma bucurqad tələb edə bilər.' }),
    yukdasimaOverview:
      'Xızı rayonu Bakıya yaxın dağətəyi bölgədir: Qırmızı dağlar (rəngli qayalar) və Altıağac Milli Parkı buradadır. Bakıdan yol M1 magistralı ilə şimala, sonra magistraldan ayrılıb dağətəyi yolla Xızıya gedir (104 km). Son illərdə burada bağ evləri və villalar çoxaldığı üçün sifarişlərin çoxu bu evlərin əşyalandırılmasıdır.',
    yukdasimaReverseOverview:
      'Xızıdan Bakıya köç və yük daşınması da mümkündür; əks istiqamət üçün qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Magistraldan sonrakı yol döngəli və enişli-yoxuşludur, kəndlərdə isə dar küçələr var. Adətən 3–5 metrlik furqon seçilir; ünvana böyük maşın gedə bilmirsə bu, sifariş zamanı dəqiqləşdirilir.',
    yukdasimaLoadingNotes:
      'Döngəli yolda mebel və texnika kəmərlə bərkidilir, şüşəli əşyalar ayrıca qablaşdırılır.',
    evakuatorOverview:
      'Xızı yolunda magistraldan sonra uzun enişlər və döngələr başlayır. Əyləci qızan, yoxuşda dayanan və ya torpaq yolda ilişən avtomobillər üçün bucurqadlı evakuator göndərilir.',
    evakuatorReverseOverview:
      'Xızı və Altıağac ətrafından Bakıdakı servislərə avtomobil daşınması 24/7 təşkil olunur.',
    yukdasimaFaqs: [
      { question: 'Altıağacdakı bağ evinə mebel aparmaq olar?', answer: 'Bəli. Evə gedən yolun vəziyyətini bildirsəniz, girişə uyğun ölçülü maşın təyin edilir.' },
      { question: 'Bakıdan Xızıya yük hansı yolla gedir?', answer: 'M1 magistralı ilə şimala, sonra magistraldan ayrılan dağətəyi yolla Xızıya (104 km).' },
      { question: 'Tikinti materialı daşıyırsınız?', answer: 'Qablaşdırılmış material və avadanlıq qapalı furqonla daşınır. Çox ağır və ya uzun materiallar üçün şərtlər operatorla dəqiqləşdirilir.' },
      { question: 'Qiyməti necə öyrənə bilərəm?', answer: `Saytdakı kalkulyatordan və ya ${PHONE} nömrəsinə zəng edərək.` },
    ],
    evakuatorFaqs: [
      { question: 'Enişdə əyləc qızıb, avtomobil təhlükəlidir. Nə etməli?', answer: 'Dərhal dayanın, əl əyləcini çəkin və zəng edin. Avtomobil evakuatorla servisə aparılır.' },
      { question: 'Torpaq yolda ilişmiş avtomobili çıxarırsınız?', answer: 'Bəli, bucurqadlı evakuator avtomobili çıxarıb yükləyir.' },
      { question: 'Xızıdan Bakıya evakuator gecə də işləyir?', answer: 'Bəli, 24/7.' },
      { question: 'Cip üçün qiymət fərqlidir?', answer: 'SUV və cip üçün əlavə haqq yoxdur; minivan üçün +10 AZN.' },
    ],
  },

  // ---------------------------------------------------------------- Şirvan, Dağlıq Şirvan
  'baki-sirvan': {
    directAnswerYukdasima:
      `Bakıdan Şirvana yükdaşıma Hacıqabul üzərindən (134 km) aparılır. Şirvan Kür çayı sahilində sənaye şəhəridir: mənzil köçü ilə yanaşı müəssisələrə avadanlıq, ofis və anbar yükləri tez-tez daşınır. Məsafə bir günlük daşımaya imkan verir. Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–Şirvan (134 km) evakuatoru 24/7 işləyir. Düzən yolda uzun məsafəli daşıma olduğu üçün avtomobil 4 nöqtədən kəmərlə bərkidilir. Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Mənzil Köçürənlər', description: 'Şirvan şəhəri ilə Bakı arasında köç edən ailələr.' },
      { title: 'Müəssisələr', description: 'Şirvandakı sənaye və xidmət müəssisələrinə avadanlıq və inventar göndərən şirkətlər.' },
      { title: 'Ticarət Obyektləri', description: 'Mağaza və anbarlara mal və rəf sistemləri çatdıranlar.' },
    ],
    targetAudienceEvakuator: [
      { title: 'Magistral Sürücüləri', description: 'Bakı–Şirvan yolunda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya və ya Şirvandakı servisə daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Şirvandan Bakıdakı rəsmi servisə göndərilən avtomobillər.' },
    ],
    cargoTypesYukdasima: [
      'Mənzil köçü əşyaları',
      'Ofis mebeli və texnikası',
      'Kiçik sənaye avadanlığı (qablaşdırılmış)',
      'Mağaza malları və rəflər',
      'Məişət texnikası',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_FLAT,
    pricingFactorsYukdasima: [
      { factor: 'Yükün Növü', detail: 'Ağır və ya qeyri-standart sənaye avadanlığı üçün şərtlər operatorla ayrıca dəqiqləşdirilir.' },
      { factor: 'Maşın Ölçüsü', detail: 'Mənzil üçün 4–5 metrlik, ofis və anbar yükü üçün 6–7 metrlik furqon seçilir.' },
      { factor: 'Fəhlə', detail: 'Rayonlararası sifarişdə fəhlə ayrıca hesablanır.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–Şirvan', { factor: 'Ünvan', detail: 'Şəhər daxilində və ya sənaye ərazisində yükləmə yeri əvvəlcədən dəqiqləşdirilir.' }),
    yukdasimaOverview:
      'Şirvan (keçmiş Əli Bayramlı) Kür çayının sahilində yerləşən sənaye şəhəridir; yaxınlığında ceyranları ilə tanınan Şirvan Milli Parkı var. Bakıdan yol Hacıqabul üzərindən düzən ərazi ilə gedir (134 km). Burada mənzil köçü ilə yanaşı müəssisələr üçün avadanlıq və ofis yükləri də çox daşınır.',
    yukdasimaReverseOverview:
      'Şirvandan Bakıya köç, ofis və anbar yükləri də daşınır; əks istiqamət üçün qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Yol düzən olduğu üçün böyük furqonlar rahat hərəkət edir: anbar və ofis yükləri üçün 6–7 metrlik maşın bir reysə daha çox yük götürür.',
    yukdasimaLoadingNotes:
      'Avadanlıq taxta altlıqlar üzərində və ya orijinal qablaşdırmada yüklənir, ağır hissələr kuzovun ön tərəfinə yerləşdirilir.',
    evakuatorOverview:
      'Bakı–Şirvan yolu düzən ərazidən keçir. Burada çağırışların çoxu mühərrik və transmissiya nasazlıqları, təkər problemləri və yol hadisələri ilə bağlıdır.',
    evakuatorReverseOverview:
      'Şirvan şəhərindən və ətraf kəndlərdən Bakıya avtomobil daşınması 24/7 təşkil olunur.',
    yukdasimaFaqs: [
      { question: 'Bakıdan Şirvana yük hansı yolla gedir?', answer: 'Hacıqabul üzərindən düzən yolla (134 km). Mənzil köçü adətən bir gündə yüklənib çatdırılır.' },
      { question: 'Müəssisə üçün avadanlıq daşıyırsınız?', answer: 'Bəli, qablaşdırılmış avadanlıq və ofis əşyaları daşınır. Çox ağır və ya qeyri-standart yük üçün şərtlər əvvəlcədən dəqiqləşdirilir.' },
      { question: 'Şirvandan Bakıya köç mümkündür?', answer: 'Bəli, əks istiqamət də mümkündür; qiymət operatorla dəqiqləşdirilir.' },
      { question: 'Qiyməti necə öyrənə bilərəm?', answer: `Saytdakı kalkulyatordan və ya ${PHONE} nömrəsinə zəng edərək.` },
    ],
    evakuatorFaqs: [
      { question: 'Bakı–Şirvan yolunda qaldım, nə etməli?', answer: 'Yolun kənarında təhlükəsiz dayanın və WhatsApp ilə yerinizi göndərin; ən yaxın evakuator yönləndirilir.' },
      { question: 'Şirvandan Bakıya avtomobil daşınır?', answer: 'Bəli, istənilən ünvana və ya servisə.' },
      { question: 'Avtomobil uzun yolda necə bərkidilir?', answer: 'Təkərlər 4 nöqtədən xüsusi kəmərlərlə platformaya bərkidilir.' },
      { question: 'Minivanın qiyməti fərqlidir?', answer: 'Bəli, minivan üçün +10 AZN; işləməyən avtomobil üçün daha +5 AZN.' },
    ],
  },

  'baki-ismayilli': {
    directAnswerYukdasima:
      `Bakıdan İsmayıllıya yükdaşıma M4 magistralı ilə Şamaxı üzərindən (174 km) aparılır; Şamaxıdan sonra yol meşəli dağətəyi ərazidən keçir. İsmayıllı şəhərinə və Basqal, İvanovka kimi kəndlərə adi furqonla getmək olur, Lahıc kimi dar dağ yollu kəndlərə isə kiçik maşın təyin edilir. Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–İsmayıllı (174 km) evakuatoru 24/7 işləyir. Şamaxıdan sonrakı döngəli dağ yolunda nasaz və qəzalı avtomobillər bucurqadlı platforma ilə daşınır. Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Bağ və Kənd Evi Sahibləri', description: 'İsmayıllının meşəli kəndlərindəki evlərə mebel və texnika aparanlar.' },
      { title: 'Turizm Obyektləri', description: 'İstirahət mərkəzi və qonaq evlərinə avadanlıq çatdıran sahibkarlar.' },
      { title: 'Şəhərə Köçənlər', description: 'İsmayıllı ilə Bakı arasında köç edən ailələr.' },
    ],
    targetAudienceEvakuator: [
      { title: 'Dağ Yolu Sürücüləri', description: 'Döngəli yolda nasaz qalan və ya əyləci qızan avtomobillər.' },
      { title: 'Turistlər', description: 'İsmayıllıya istirahətə gəlib avtomobili nasazlaşanlar.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
    ],
    cargoTypesYukdasima: [
      'Kənd və bağ evi mebeli',
      'Qonaq evi və istirahət mərkəzi avadanlığı',
      'Məişət texnikası',
      'Köç əşyaları',
      'Kənd təsərrüfatı məhsulları (əks istiqamətdə)',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_MOUNTAIN,
    pricingFactorsYukdasima: [
      { factor: 'Kəndin Yeri', detail: 'Şəhərə və əsas yol üzərindəki kəndlərə adi furqon, dar dağ yollu kəndlərə (məsələn, Lahıc) kiçik maşın gedir.' },
      { factor: 'Maşın Ölçüsü', detail: 'Döngəli yol səbəbindən çox vaxt 3–5 metrlik furqon seçilir.' },
      { factor: 'Fəhlə', detail: 'Rayonlararası sifarişdə fəhlə ayrıca hesablanır.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–İsmayıllı', { factor: 'Yol Şəraiti', detail: 'Dağ yolunda yoxuşda və ya dar yerdə yükləmə əlavə vaxt tələb edir.' }),
    yukdasimaOverview:
      'İsmayıllı Böyük Qafqazın ətəyində, meşəli rayondur. Bakıdan yol M4 magistralı ilə Şamaxıya, oradan döngəli dağətəyi yolla İsmayıllıya gedir (174 km). Rayon misgərlik ənənəsi ilə tanınan Lahıc, kəlağayısı ilə məşhur Basqal və İvanovka kəndləri ilə məşhurdur; sifarişlərin xeyli hissəsi qonaq evləri və kənd evləri üçündür.',
    yukdasimaReverseOverview:
      'İsmayıllıdan Bakıya köç əşyaları və kənd təsərrüfatı məhsulları da daşınır; əks istiqamət üçün qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Lahıca gedən yol dar dağ yoludur və böyük furqon üçün uyğun deyil. Belə ünvanlar üçün kiçik maşın təyin edilir. İsmayıllı şəhəri və əsas yol üzərindəki kəndlər üçün 4–5 metrlik furqon da istifadə olunur.',
    yukdasimaLoadingNotes:
      'Döngəli yol boyunca mebel kəmərlə bərkidilir, şüşə və kövrək əşyalar ayrıca qablaşdırılır.',
    evakuatorOverview:
      'Şamaxı–İsmayıllı yolu döngəli və enişli-yoxuşludur. Burada əyləci qızan, yoxuşda dayanan və ya döngədə qəzaya düşən avtomobillər üçün bucurqadlı platforma göndərilir.',
    evakuatorReverseOverview:
      'İsmayıllı şəhərindən və kəndlərindən Bakıdakı servislərə avtomobil daşınması 24/7 təşkil olunur.',
    yukdasimaFaqs: [
      { question: 'Lahıca yük aparmaq olur?', answer: 'Bəli, amma Lahıc yolu dar dağ yolu olduğu üçün kiçik maşınla aparılır. Böyük həcmdə bir neçə reys planlaşdırıla bilər.' },
      { question: 'Bakıdan İsmayıllıya yük hansı yolla gedir?', answer: 'M4 magistralı ilə Şamaxıya, oradan dağətəyi yolla İsmayıllıya (174 km).' },
      { question: 'Qonaq evi üçün avadanlıq daşıyırsınız?', answer: 'Bəli, mebel, çarpayı, döşək və mətbəx avadanlığı daşınır.' },
      { question: 'İsmayıllıdan Bakıya da daşıyırsınız?', answer: 'Bəli, əks istiqamət mümkündür; qiymət operatorla dəqiqləşdirilir.' },
      { question: 'Qiyməti necə öyrənə bilərəm?', answer: `Saytdakı kalkulyatordan və ya ${PHONE} nömrəsinə zəng edərək.` },
    ],
    evakuatorFaqs: [
      { question: 'İsmayıllı yolunda əyləc qızdı, nə etməli?', answer: 'Dərhal dayanın, əl əyləcini çəkin və zəng edin; avtomobil evakuatorla aparılır.' },
      { question: 'Kənddən Bakıya avtomobil daşınır?', answer: 'Bəli, ünvana çıxış yolu bildirilərsə, uyğun evakuator göndərilir.' },
      { question: 'Gecə də işləyirsiniz?', answer: 'Bəli, 24/7.' },
      { question: 'Qəzalı avtomobil necə yüklənir?', answer: 'Dolli və bucurqadla; kilidli təkər üçün +5 AZN əlavə olunur.' },
    ],
  },

  'baki-agsu': {
    directAnswerYukdasima:
      `Bakıdan Ağsuya yükdaşıma M4 magistralı ilə Şamaxı üzərindən (154 km) aparılır. Şamaxı ilə Ağsu arasında döngəli və uzun enişli Ağsu aşırımı var; buna görə yük kəmərlə bərkidilir və texniki cəhətdən sazlığı yoxlanmış maşın göndərilir. Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–Ağsu (154 km) evakuatoru 24/7 işləyir. Ağsu aşırımının uzun enişlərində əyləci qızan və ya döngədə nasaz qalan avtomobillər bucurqadlı platforma ilə daşınır. Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Köç Edən Ailələr', description: 'Ağsu ilə Bakı arasında yaşayış yerini dəyişənlər.' },
      { title: 'Fermerlər', description: 'Ağsunun kənd təsərrüfatı məhsullarını Bakıya göndərənlər (əks istiqamət).' },
      { title: 'Ticarət Obyektləri', description: 'Ağsudakı mağazalara mal və avadanlıq çatdıranlar.' },
    ],
    targetAudienceEvakuator: [
      { title: 'Aşırım Sürücüləri', description: 'Ağsu aşırımının enişində əyləci qızan və ya yoxuşunda dayanan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Döngəli yolda yol hadisəsinə düşən avtomobillər.' },
      { title: 'Servis Transferi', description: 'Ağsudan Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargoTypesYukdasima: [
      'Köç əşyaları və mebel',
      'Məişət texnikası',
      'Mağaza malları',
      'Kənd təsərrüfatı məhsulları (əks istiqamətdə)',
      'Təmir materialları (qablaşdırılmış)',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_MOUNTAIN,
    pricingFactorsYukdasima: [
      { factor: 'Yol Şəraiti', detail: 'Ağsu aşırımının döngələri və enişləri səbəbindən yük xüsusi diqqətlə bərkidilir.' },
      { factor: 'Maşın Ölçüsü', detail: 'Kiçik yük üçün 3 metrlik, mənzil üçün 4–5 metrlik furqon.' },
      { factor: 'Fəhlə', detail: 'Rayonlararası sifarişdə fəhlə ayrıca hesablanır.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–Ağsu', { factor: 'Yükləmə Yeri', detail: 'Aşırımda, döngədə yükləmə təhlükəsizlik tədbirləri ilə aparılır.' }),
    yukdasimaOverview:
      'Ağsu Şirvan düzünün kənarında, Şamaxıdan sonra yerləşir. Bakıdan yol M4 magistralı ilə Şamaxıya, oradan Ağsu aşırımı ilə düzənliyə enir (154 km). Aşırım döngəli və uzun enişlidir, ona görə bu marşrutda yükün bərkidilməsinə və maşının əyləc sisteminə xüsusi diqqət yetirilir.',
    yukdasimaReverseOverview:
      'Ağsudan Bakıya köç və kənd təsərrüfatı məhsulları da daşınır; əks istiqamət üçün qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Aşırımda yüklü maşın enişdə mühərriklə əyləc edir, ona görə yükün maşının tutumuna uyğun olması vacibdir. Mənzil üçün 4–5 metrlik furqon adətən kifayətdir.',
    yukdasimaLoadingNotes:
      'Ağır əşyalar kuzovun ön hissəsinə və aşağıya yerləşdirilir, mebel enişdə yerini dəyişməsin deyə kəmərlə bərkidilir.',
    evakuatorOverview:
      'Ağsu aşırımında ən çox rast gəlinən hallar uzun enişdə qızan əyləc, yoxuşda qızan mühərrik və döngədə yol hadisələridir. Belə yerlərdə yükləmə bucurqadlı platforma ilə və təhlükəsizlik tədbirləri ilə aparılır.',
    evakuatorReverseOverview:
      'Ağsudan və aşırım boyunca olan ərazilərdən Bakıya avtomobil daşınması 24/7 təşkil olunur.',
    yukdasimaFaqs: [
      { question: 'Bakıdan Ağsuya yük hansı yolla gedir?', answer: 'M4 magistralı ilə Şamaxıya, oradan Ağsu aşırımı ilə Ağsuya (154 km).' },
      { question: 'Ağsu aşırımı yükə təsir edirmi?', answer: 'Aşırım döngəli və enişlidir. Yük kəmərlə bərkidilir, ağır əşyalar aşağıya yerləşdirilir ki, döngələrdə yerini dəyişməsin.' },
      { question: 'Ağsudan Bakıya məhsul daşıyırsınız?', answer: 'Bəli, əks istiqamət mümkündür; qiymət operatorla dəqiqləşdirilir.' },
      { question: 'Qiyməti necə öyrənə bilərəm?', answer: `Saytdakı kalkulyatordan və ya ${PHONE} nömrəsinə zəng edərək.` },
    ],
    evakuatorFaqs: [
      { question: 'Ağsu aşırımında əyləc qızdı, nə etməli?', answer: 'Mümkün olan ilk təhlükəsiz yerdə dayanın, əl əyləcini çəkin və zəng edin.' },
      { question: 'Aşırımda qəzalı avtomobil necə çıxarılır?', answer: 'Bucurqadlı platforma ilə, yolda təhlükəsizlik tədbirləri görülərək yüklənir.' },
      { question: 'Ağsudan Bakıya evakuator 24/7 işləyir?', answer: 'Bəli.' },
      { question: 'Cip daşınmasının qiyməti fərqlidir?', answer: 'SUV və cip üçün əlavə haqq yoxdur; minivan üçün +10 AZN.' },
    ],
  },

  // ---------------------------------------------------------------- Gəncə–Qazax
  'baki-semkir': {
    directAnswerYukdasima:
      `Bakıdan Şəmkirə yükdaşıma M2 magistralı ilə Gəncə üzərindən (398 km) aparılır. Uzun məsafə olduğu üçün yük səhər tezdən yüklənir, mebel tam qablaşdırılıb kəmərlə bərkidilir. Şəmkirdən Bakıya isə köç əşyaları və kənd təsərrüfatı məhsulları daşınır. Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–Şəmkir (398 km) evakuatoru M2 magistralı üzrə 24/7 işləyir. Uzun məsafədə avtomobil 4 nöqtədən bərkidilir. Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Köç Edən Ailələr', description: 'Şəmkir ilə Bakı arasında yaşayış yerini dəyişənlər.' },
      { title: 'Kənd Təsərrüfatı', description: 'Şəmkirin üzüm, meyvə və digər məhsullarını Bakıya göndərənlər (əks istiqamət).' },
      { title: 'Ticarət və Ofislər', description: 'Şəmkirdəki obyektlərə mal və avadanlıq çatdıranlar.' },
    ],
    targetAudienceEvakuator: [
      { title: 'M2 Sürücüləri', description: 'Gəncə–Qazax istiqamətində uzun yolda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Şəmkirdən Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargoTypesYukdasima: [
      'Mənzil və ev köçü əşyaları',
      'Mebel dəstləri',
      'Məişət texnikası',
      'Kənd təsərrüfatı məhsulları (əks istiqamətdə)',
      'Ticarət malları',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_FLAT,
    pricingFactorsYukdasima: [
      { factor: 'Uzun Məsafə', detail: '398 km-lik marşrutda qiymət əsasən maşın ölçüsünə görə tarif bazasından götürülür.' },
      { factor: 'Bir Reys Prinsipi', detail: 'Uzun yolda bütün əşyaların bir reysə sığması üçün maşın ölçüsünü düzgün seçmək vacibdir; saytdakı AI analizi bunu şəkillərə görə təklif edir.' },
      { factor: 'Fəhlə', detail: 'Rayonlararası sifarişdə fəhlə ayrıca hesablanır.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–Şəmkir', { factor: 'Uzun Məsafə', detail: 'Avtomobilin bütün yol boyu 4 nöqtədən fiksasiyası.' }),
    yukdasimaOverview:
      'Şəmkir Gəncə–Qazax bölgəsində, Gəncədən qərbdə yerləşir. Bakıdan yol M2 magistralı ilə Kürdəmir, Yevlax və Gəncə üzərindən Şəmkirə gedir (398 km). Rayon Kür çayı üzərindəki su anbarı və kənd təsərrüfatı ilə tanınır. Uzun məsafə olduğu üçün yük adətən səhər tezdən yüklənir.',
    yukdasimaReverseOverview:
      'Şəmkirdən Bakıya köç və kənd təsərrüfatı məhsulları da daşınır; əks istiqamət üçün qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Uzun yolda iki reys çox baha başa gəlir, ona görə maşın ölçüsü bütün əşyaların bir reysə sığmasına görə seçilir. Ev köçü üçün adətən 5–7 metrlik qapalı furqon tövsiyə olunur.',
    yukdasimaLoadingNotes:
      'Uzun yolda mebel tam qablaşdırılır, divan və şkafların küncləri qorunur, hər şey kəmərlə bərkidilir.',
    evakuatorOverview:
      'Bakı–Şəmkir evakuatoru M2 magistralı boyunca işləyir. Uzun məsafədə avtomobil 4 nöqtədən təkər kəmərləri ilə bərkidilir və yolda yoxlanılır.',
    evakuatorReverseOverview:
      'Şəmkirdən və Gəncə–Qazax bölgəsindən Bakıya avtomobil daşınması 24/7 təşkil olunur.',
    yukdasimaFaqs: [
      { question: 'Bakıdan Şəmkirə yük hansı yolla gedir?', answer: 'M2 magistralı ilə Kürdəmir, Yevlax və Gəncə üzərindən Şəmkirə (398 km).' },
      { question: 'Ev köçü üçün hansı maşın seçməliyəm?', answer: 'Uzun yolda bütün əşyalar bir reysə sığmalıdır. Adətən 5–7 metrlik qapalı furqon tövsiyə olunur; saytdakı AI analizi şəkillərə görə maşını təklif edir.' },
      { question: 'Şəmkirdən Bakıya məhsul daşıyırsınız?', answer: 'Bəli, əks istiqamət mümkündür; qiymət operatorla dəqiqləşdirilir.' },
      { question: 'Qiyməti necə öyrənə bilərəm?', answer: `Saytdakı kalkulyatordan və ya ${PHONE} nömrəsinə zəng edərək.` },
    ],
    evakuatorFaqs: [
      { question: 'M2-də Şəmkir istiqamətində qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin.' },
      { question: 'Şəmkirdən Bakıya avtomobil daşınır?', answer: 'Bəli, istənilən ünvana və ya servisə.' },
      { question: 'Uzun yolda avtomobil zədələnməzmi?', answer: 'Avtomobil 4 nöqtədən təkər kəmərləri ilə bərkidilir və yolda yoxlanılır.' },
      { question: 'Minivan üçün qiymət fərqlidir?', answer: 'Bəli, +10 AZN; işləməyən avtomobil üçün daha +5 AZN.' },
    ],
  },

  // ---------------------------------------------------------------- Mil-Muğan
  'baki-saatli': {
    directAnswerYukdasima:
      `Bakıdan Saatlıya yükdaşıma Sabirabad istiqaməti ilə (182 km) aparılır. Saatlı Muğan düzündə, kənd təsərrüfatı rayonudur: köç əşyaları ilə yanaşı kənd təsərrüfatı avadanlığı və əks istiqamətdə məhsul daşınması sifariş olunur. Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–Saatlı (182 km) evakuatoru 24/7 işləyir. Düzən yolda daşıma olsa da, kənd yollarında yükləmə yeri əvvəlcədən dəqiqləşdirilir. Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Fermerlər', description: 'Kənd təsərrüfatı avadanlığı və ləvazimatı aparan, məhsulunu Bakıya göndərən təsərrüfatlar.' },
      { title: 'Köç Edən Ailələr', description: 'Saatlı ilə Bakı arasında yaşayış yerini dəyişənlər.' },
      { title: 'Ticarət Obyektləri', description: 'Saatlıdakı mağazalara mal çatdıranlar.' },
    ],
    targetAudienceEvakuator: [
      { title: 'Kənd Yolu Sürücüləri', description: 'Yağışdan sonra torpaq yolda ilişən avtomobillər.' },
      { title: 'Magistral Sürücüləri', description: 'Bakı yolunda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
    ],
    cargoTypesYukdasima: [
      'Köç əşyaları və mebel',
      'Kiçik kənd təsərrüfatı avadanlığı və ləvazimat (qablaşdırılmış)',
      'Kənd təsərrüfatı məhsulları (əks istiqamətdə)',
      'Məişət texnikası',
      'Mağaza malları',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_FLAT,
    pricingFactorsYukdasima: [
      { factor: 'Yükün Növü', detail: 'Ağır və ya qeyri-standart kənd təsərrüfatı texnikası üçün şərtlər operatorla ayrıca dəqiqləşdirilir.' },
      { factor: 'Ünvana Giriş', detail: 'Kənd ünvanlarında torpaq yolun vəziyyəti, xüsusilə yağışdan sonra, nəzərə alınır.' },
      { factor: 'Fəhlə', detail: 'Rayonlararası sifarişdə fəhlə ayrıca hesablanır.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–Saatlı', { factor: 'Çıxarma Şəraiti', detail: 'Palçıqlı kənd yolundan çıxarma bucurqad tələb edə bilər.' }),
    yukdasimaOverview:
      'Saatlı Muğan düzündə, Kür və Araz çaylarının birləşdiyi Sabirabad ərazisinə yaxın kənd təsərrüfatı rayonudur. Bakıdan yol düzən ərazi ilə Sabirabad istiqamətində gedir (182 km). Burada köç əşyaları ilə yanaşı təsərrüfatlar üçün ləvazimat daşınması da tez-tez sifariş edilir.',
    yukdasimaReverseOverview:
      'Saatlıdan Bakıya kənd təsərrüfatı məhsulları və köç əşyaları da daşınır; əks istiqamət üçün qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Yol düzəndir, böyük furqonlar rahat gedir. Kənd ünvanlarında isə yağışdan sonra torpaq yollar çətin keçilən ola bilər; bu halda maşın ölçüsü buna görə seçilir.',
    yukdasimaLoadingNotes:
      'Kənd təsərrüfatı məhsulları havalandırılan qablarda, üst-üstə çox yığılmadan yüklənir.',
    evakuatorOverview:
      'Bakı–Saatlı yolu düzən ərazidən keçir. Kənd ünvanlarında, xüsusilə yağışdan sonra, torpaq yolda ilişən avtomobillər bucurqadla çıxarılır.',
    evakuatorReverseOverview:
      'Saatlıdan və Muğan bölgəsindən Bakıya avtomobil daşınması 24/7 təşkil olunur.',
    yukdasimaFaqs: [
      { question: 'Bakıdan Saatlıya yük hansı yolla gedir?', answer: 'Düzən yolla Sabirabad istiqamətində (182 km).' },
      { question: 'Kənd təsərrüfatı avadanlığı daşıyırsınız?', answer: 'Qablaşdırılmış ləvazimat və kiçik avadanlıq daşınır. Ağır texnika üçün şərtlər əvvəlcədən dəqiqləşdirilir.' },
      { question: 'Saatlıdan Bakıya məhsul göndərmək olar?', answer: 'Bəli, əks istiqamət mümkündür; qiymət operatorla dəqiqləşdirilir.' },
      { question: 'Qiyməti necə öyrənə bilərəm?', answer: `Saytdakı kalkulyatordan və ya ${PHONE} nömrəsinə zəng edərək.` },
    ],
    evakuatorFaqs: [
      { question: 'Avtomobilim kənd yolunda palçıqda ilişib, çıxarırsınız?', answer: 'Bəli, bucurqadlı evakuator avtomobili çıxarıb yükləyir.' },
      { question: 'Saatlıdan Bakıya avtomobil daşınır?', answer: 'Bəli, istənilən ünvana və ya servisə.' },
      { question: 'Gecə də işləyirsiniz?', answer: 'Bəli, 24/7.' },
      { question: 'İşləməyən avtomobil üçün qiymət fərqlidir?', answer: 'Bəli, kilidli təkər və ya sükan üçün +5 AZN.' },
    ],
  },

  // ---------------------------------------------------------------- Lənkəran–Astara
  'baki-lerik': {
    directAnswerYukdasima:
      `Bakıdan Lerikə yükdaşıma M3 magistralı ilə Lənkərana, oradan Talış dağlarına qalxan dağ yolu ilə (323 km) aparılır. Lənkərandan sonrakı yol döngəli və yoxuşludur, qışda qar ola bilər; buna görə adətən orta ölçülü furqon təyin edilir. Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–Lerik (323 km) evakuatoru 24/7 işləyir. Lerik dağ yolunda nasaz qalan avtomobillər bucurqadlı gücləndirilmiş platforma ilə Lənkərana və ya Bakıya daşınır. Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Köç Edən Ailələr', description: 'Lerik ilə Bakı arasında yaşayış yerini dəyişənlər.' },
      { title: 'Dağ Kəndlərinə Yük Göndərənlər', description: 'Lerik kəndlərindəki evlərə mebel və texnika aparanlar.' },
      { title: 'Turizm Obyektləri', description: 'Dağdakı qonaq evlərinə avadanlıq çatdıranlar.' },
    ],
    targetAudienceEvakuator: [
      { title: 'Dağ Yolu Sürücüləri', description: 'Lənkəran–Lerik yolunda nasaz qalan avtomobillər.' },
      { title: 'Qışda Yolda Qalanlar', description: 'Qarlı və buzlu yoxuşda ilişən avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Lənkərana və ya Bakıya daşınacaq avtomobillər.' },
    ],
    cargoTypesYukdasima: [
      'Köç əşyaları və mebel',
      'Məişət texnikası',
      'Qonaq evi avadanlığı',
      'Qablaşdırılmış tikinti materialları',
      'Kənd məhsulları (əks istiqamətdə)',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_MOUNTAIN,
    pricingFactorsYukdasima: [
      { factor: 'Dağ Yolu', detail: 'Lənkərandan sonrakı döngəli dağ yolu səbəbindən adətən 3–5 metrlik furqon seçilir.' },
      { factor: 'Fəsil', detail: 'Qışda qar və buz yolu çətinləşdirə bilər; çatdırılma vaxtı hava şəraitinə görə planlaşdırılır.' },
      { factor: 'Fəhlə', detail: 'Rayonlararası sifarişdə fəhlə ayrıca hesablanır.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–Lerik', { factor: 'Dağ Şəraiti', detail: 'Yoxuşda və dar dağ yolunda yükləmə bucurqad və əlavə vaxt tələb edir.' }),
    yukdasimaOverview:
      'Lerik Talış dağlarında yerləşən dağlıq rayondur və uzunömürlüləri ilə tanınır. Bakıdan yol M3 magistralı ilə Salyan, Masallı üzərindən Lənkərana, oradan isə dağ yolu ilə Lerikə qalxır (323 km). Lənkərandan sonra yol döngəli və yoxuşlu olduğu üçün maşın seçimi və yükün bərkidilməsi buna görə planlaşdırılır.',
    yukdasimaReverseOverview:
      'Lerikdən Bakıya köç əşyaları və kənd məhsulları da daşınır; əks istiqamət üçün qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Dağ yolunda çox böyük furqon əvəzinə adətən 3–5 metrlik maşın seçilir. Kəndlərə gedən yollar daha dar ola bilər; ünvanı əvvəlcədən bildirin.',
    yukdasimaLoadingNotes:
      'Döngəli yoxuşlarda mebel kəmərlə bərkidilir, ağır əşyalar kuzovun ön hissəsinə yerləşdirilir.',
    evakuatorOverview:
      'Lənkəran–Lerik dağ yolunda evakuator çağırışları ən çox yoxuşda qızan mühərrik, enişdə qızan əyləc və qışda buzla bağlıdır. Belə hallarda bucurqadlı gücləndirilmiş platforma göndərilir.',
    evakuatorReverseOverview:
      'Lerikdən Lənkərandakı və ya Bakıdakı servislərə avtomobil daşınması 24/7 təşkil olunur.',
    yukdasimaFaqs: [
      { question: 'Bakıdan Lerikə yük hansı yolla gedir?', answer: 'M3 magistralı ilə Lənkərana, oradan dağ yolu ilə Lerikə (323 km).' },
      { question: 'Qışda Lerikə yük aparmaq olur?', answer: 'Bəli, amma qar və buz yolu çətinləşdirə bilər. Çatdırılma vaxtı hava şəraitinə görə dəqiqləşdirilir.' },
      { question: 'Dağ kəndinə böyük maşın gedə bilərmi?', answer: 'Kənd yollarının bəziləri dardır. Ünvanı bildirsəniz uyğun ölçülü maşın təyin edilir.' },
      { question: 'Lerikdən Bakıya da daşıyırsınız?', answer: 'Bəli, əks istiqamət mümkündür; qiymət operatorla dəqiqləşdirilir.' },
      { question: 'Qiyməti necə öyrənə bilərəm?', answer: `Saytdakı kalkulyatordan və ya ${PHONE} nömrəsinə zəng edərək.` },
    ],
    evakuatorFaqs: [
      { question: 'Lerik yolunda yoxuşda dayandım, nə etməli?', answer: 'Əl əyləcini çəkin, qəza işıqlarını yandırın və WhatsApp ilə yerinizi göndərin.' },
      { question: 'Avtomobili Lənkərandakı servisə apara bilərsiniz?', answer: 'Bəli, Lənkərana və ya Bakıya daşınma mümkündür.' },
      { question: 'Qışda da işləyirsiniz?', answer: 'Bəli, 24/7. Qarlı havada gəlmə vaxtı yolun vəziyyətinə görə dəyişə bilər.' },
      { question: 'Cip üçün qiymət fərqlidir?', answer: 'SUV və cip üçün əlavə haqq yoxdur; minivan üçün +10 AZN.' },
    ],
  },

  // ---------------------------------------------------------------- Qarabağ
  'baki-susa': {
    directAnswerYukdasima:
      `Bakıdan Şuşaya yükdaşıma Füzuli üzərindən, Zəfər Yolu ilə (373 km) aparılır. Şuşa yüksək dağ yaylasında yerləşir: yol yoxuşlu və döngəlidir, qışda qar və duman olur. Əsas sifarişlər bərpa olunan yaşayış binalarına, ofislərə və otellərə mebel və avadanlıq daşınmasıdır. ${KARABAKH_ACCESS_NOTE} Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–Şuşa (373 km) evakuatoru üçün sifariş qəbul edilir. Dağ yolunda nasaz avtomobillər bucurqadlı gücləndirilmiş platforma ilə daşınır. ${KARABAKH_ACCESS_NOTE} Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Şuşaya Köçənlər', description: 'Bərpa olunan yaşayış binalarına köçən ailələr.' },
      { title: 'Ofis və Müəssisələr', description: 'Şuşada fəaliyyətə başlayan idarə və şirkətlərə mebel və texnika daşıyanlar.' },
      { title: 'Otel və Turizm', description: 'Otel, restoran və muzeylərə avadanlıq çatdıranlar.' },
    ],
    targetAudienceEvakuator: [
      { title: 'Dağ Yolu Sürücüləri', description: 'Zəfər Yolunda və Şuşa yoxuşunda nasaz qalan avtomobillər.' },
      { title: 'Qışda Yolda Qalanlar', description: 'Qarlı və dumanlı havada yolda qalan avtomobillər.' },
      { title: 'Servis Transferi', description: 'Şuşadan Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargoTypesYukdasima: [
      'Köç əşyaları və mebel',
      'Ofis mebeli və texnikası',
      'Otel və restoran avadanlığı',
      'Məişət texnikası',
      'Qablaşdırılmış təmir materialları',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_MOUNTAIN,
    pricingFactorsYukdasima: [
      { factor: 'Uzun Dağ Marşrutu', detail: '373 km-lik yolun son hissəsi yoxuşlu dağ yoludur; maşın və vaxt buna görə planlaşdırılır.' },
      { factor: 'Fəsil', detail: 'Qışda qar və duman səbəbindən çatdırılma vaxtı dəyişə bilər.' },
      { factor: 'Giriş Qaydaları', detail: 'Bölgəyə giriş üçün tələb olunan sənədlər sifariş zamanı dəqiqləşdirilir.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–Şuşa', { factor: 'Dağ Şəraiti', detail: 'Yoxuşlu yolda yükləmə bucurqad və əlavə təhlükəsizlik tədbirləri tələb edir.' }),
    yukdasimaOverview:
      'Şuşa Qarabağ dağlarında, yüksək yaylada yerləşən şəhərdir və Azərbaycanın mədəniyyət paytaxtı elan edilib. Bakıdan yol Füzuliyə, oradan Zəfər Yolu ilə Şuşaya qalxır (373 km). Şəhərdə bərpa işləri davam etdiyi üçün sifarişlərin çoxu yeni yaşayış binalarına, idarələrə və otellərə mebel və avadanlıq daşınmasıdır.',
    yukdasimaReverseOverview:
      'Şuşadan Bakıya daşınma da mümkündür; əks istiqamət üçün şərtlər və qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Uzun və yoxuşlu yol səbəbindən texniki sazlığı yoxlanmış qapalı furqon göndərilir. Yük həcminə görə 4–7 metrlik maşın seçilir.',
    yukdasimaLoadingNotes:
      'Uzun yolda mebel tam qablaşdırılır, döngəli yoxuşda yerini dəyişməsin deyə hər şey kəmərlə bərkidilir.',
    evakuatorOverview:
      'Şuşa yolunun son hissəsi yoxuşlu dağ yoludur, qışda qar və duman olur. Burada nasaz qalan avtomobillər bucurqadlı gücləndirilmiş platforma ilə daşınır.',
    evakuatorReverseOverview:
      'Şuşadan Bakıdakı servislərə avtomobil daşınması üçün sifariş qəbul edilir; şərtlər operatorla dəqiqləşdirilir.',
    yukdasimaFaqs: [
      { question: 'Bakıdan Şuşaya yük hansı yolla gedir?', answer: 'Füzuliyə, oradan Zəfər Yolu ilə Şuşaya (373 km).' },
      { question: 'Şuşaya yük aparmaq üçün icazə lazımdır?', answer: 'Bölgəyə giriş qaydaları qüvvədə olan tələblərə uyğun olaraq sifariş zamanı operatorla dəqiqləşdirilir.' },
      { question: 'Ofis və otel üçün avadanlıq daşıyırsınız?', answer: 'Bəli, mebel, texnika və restoran avadanlığı qapalı furqonla daşınır.' },
      { question: 'Qışda Şuşaya yük getmək olur?', answer: 'Bəli, amma qar və duman yolu çətinləşdirə bilər; çatdırılma vaxtı buna görə planlaşdırılır.' },
      { question: 'Qiyməti necə öyrənə bilərəm?', answer: `Saytdakı kalkulyatordan və ya ${PHONE} nömrəsinə zəng edərək.` },
    ],
    evakuatorFaqs: [
      { question: 'Şuşa yolunda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin; operator gəlmə vaxtını və şərtləri deyir.' },
      { question: 'Şuşadan Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
      { question: 'Dağ yolunda qəzalı avtomobil necə yüklənir?', answer: 'Bucurqadlı gücləndirilmiş platforma ilə, təhlükəsizlik tədbirləri görülərək.' },
      { question: 'Minivan üçün qiymət fərqlidir?', answer: 'Bəli, +10 AZN; işləməyən avtomobil üçün daha +5 AZN.' },
    ],
  },

  'baki-xankendi': {
    directAnswerYukdasima:
      `Bakıdan Xankəndiyə yükdaşıma Bərdə və Ağdam üzərindən, Əsgəran yolu ilə (385 km) aparılır. Şəhərdə bərpa və məskunlaşma davam etdiyi üçün əsas sifarişlər yaşayış binalarına köç, idarə və müəssisələrə mebel və avadanlıq daşınmasıdır. ${KARABAKH_ACCESS_NOTE} Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–Xankəndi (385 km) evakuatoru üçün sifariş qəbul edilir. Uzun məsafədə avtomobil 4 nöqtədən bərkidilir. ${KARABAKH_ACCESS_NOTE} Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Xankəndiyə Köçənlər', description: 'Yeni və bərpa olunan yaşayış binalarına köçən ailələr.' },
      { title: 'İdarə və Müəssisələr', description: 'Xankəndidə fəaliyyətə başlayan təşkilatlara mebel və texnika daşıyanlar.' },
      { title: 'Ticarət və Xidmət', description: 'Mağaza, kafe və xidmət obyektlərinə avadanlıq çatdıranlar.' },
    ],
    targetAudienceEvakuator: [
      { title: 'Uzun Yol Sürücüləri', description: 'Bakı–Ağdam–Xankəndi yolunda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Xankəndidən Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargoTypesYukdasima: [
      'Köç əşyaları və mebel',
      'Ofis mebeli və texnikası',
      'Məişət texnikası',
      'Ticarət avadanlığı',
      'Qablaşdırılmış təmir materialları',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_FLAT,
    pricingFactorsYukdasima: [
      { factor: 'Uzun Məsafə', detail: '385 km-lik marşrutda bütün yükün bir reysə sığması üçün maşın ölçüsü düzgün seçilir.' },
      { factor: 'Giriş Qaydaları', detail: 'Bölgəyə giriş üçün tələb olunan sənədlər sifariş zamanı dəqiqləşdirilir.' },
      { factor: 'Fəhlə', detail: 'Rayonlararası sifarişdə fəhlə ayrıca hesablanır.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–Xankəndi', { factor: 'Uzun Məsafə', detail: 'Avtomobilin bütün yol boyu 4 nöqtədən fiksasiyası.' }),
    yukdasimaOverview:
      'Xankəndi Qarabağın mərkəzi şəhərlərindən biridir. Bakıdan yol Bərdə və Ağdam üzərindən, Əsgəran istiqamətində Xankəndiyə gedir (385 km). Şəhərdə bərpa və məskunlaşma davam etdiyi üçün sifarişlərin çoxu yaşayış binalarına köç və yeni açılan idarələr üçün avadanlıqdır.',
    yukdasimaReverseOverview:
      'Xankəndidən Bakıya daşınma da mümkündür; əks istiqamət üçün şərtlər və qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Uzun yolda iki reys baha başa gəldiyi üçün ev köçündə adətən 5–7 metrlik qapalı furqon seçilir.',
    yukdasimaLoadingNotes:
      'Mebel tam qablaşdırılır, texnika orijinal qutusunda və ya yumşaq materialla qorunaraq daşınır.',
    evakuatorOverview:
      'Bakı–Xankəndi evakuatoru Bərdə və Ağdam üzərindən uzun məsafəli marşrutla işləyir. Avtomobil 4 nöqtədən təkər kəmərləri ilə bərkidilir.',
    evakuatorReverseOverview:
      'Xankəndidən Bakıdakı servislərə avtomobil daşınması üçün sifariş qəbul edilir; şərtlər operatorla dəqiqləşdirilir.',
    yukdasimaFaqs: [
      { question: 'Bakıdan Xankəndiyə yük hansı yolla gedir?', answer: 'Bərdə və Ağdam üzərindən, Əsgəran istiqamətində (385 km).' },
      { question: 'Xankəndiyə yük aparmaq üçün icazə lazımdır?', answer: 'Bölgəyə giriş qaydaları qüvvədə olan tələblərə uyğun olaraq sifariş zamanı operatorla dəqiqləşdirilir.' },
      { question: 'Ev köçü üçün hansı maşın lazımdır?', answer: 'Uzun yolda bütün əşyalar bir reysə sığmalıdır; adətən 5–7 metrlik qapalı furqon seçilir.' },
      { question: 'Qiyməti necə öyrənə bilərəm?', answer: `Saytdakı kalkulyatordan və ya ${PHONE} nömrəsinə zəng edərək.` },
    ],
    evakuatorFaqs: [
      { question: 'Xankəndi yolunda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin; operator şərtləri və gəlmə vaxtını deyir.' },
      { question: 'Xankəndidən Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
      { question: 'Uzun yolda avtomobil necə bərkidilir?', answer: '4 nöqtədən təkər kəmərləri ilə.' },
      { question: 'İşləməyən avtomobil üçün qiymət fərqlidir?', answer: 'Bəli, kilidli təkər və ya sükan üçün +5 AZN.' },
    ],
  },

  'baki-fuzuli': {
    directAnswerYukdasima:
      `Bakıdan Füzuliyə yükdaşıma Horadiz istiqaməti ilə (312 km) aparılır. Füzulidə yeni şəhər salınır və beynəlxalq hava limanı fəaliyyət göstərir; Zəfər Yolu da buradan Şuşaya qalxır. Əsas sifarişlər yeni yaşayış binalarına köç, idarə və müəssisələrə avadanlıq daşınmasıdır. ${KARABAKH_ACCESS_NOTE} Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–Füzuli (312 km) evakuatoru üçün sifariş qəbul edilir. Uzun məsafədə avtomobil 4 nöqtədən bərkidilir. ${KARABAKH_ACCESS_NOTE} Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Füzuliyə Köçənlər', description: 'Yeni salınan yaşayış məhəllələrinə köçən ailələr.' },
      { title: 'İdarə və Müəssisələr', description: 'Füzulidə fəaliyyətə başlayan təşkilatlara mebel və texnika daşıyanlar.' },
      { title: 'Ticarət və Xidmət', description: 'Yeni açılan obyektlərə avadanlıq çatdıranlar.' },
    ],
    targetAudienceEvakuator: [
      { title: 'Uzun Yol Sürücüləri', description: 'Bakı–Füzuli yolunda nasaz qalan avtomobillər.' },
      { title: 'Zəfər Yolu Sürücüləri', description: 'Şuşa istiqamətində yolda qalan avtomobillər.' },
      { title: 'Servis Transferi', description: 'Füzulidən Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargoTypesYukdasima: [
      'Köç əşyaları və mebel',
      'Ofis mebeli və texnikası',
      'Məişət texnikası',
      'Ticarət avadanlığı',
      'Qablaşdırılmış təmir materialları',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_FLAT,
    pricingFactorsYukdasima: [
      { factor: 'Uzun Məsafə', detail: '312 km-lik marşrutda yük bir reysə sığacaq ölçüdə maşınla daşınır.' },
      { factor: 'Giriş Qaydaları', detail: 'Bölgəyə giriş üçün tələb olunan sənədlər sifariş zamanı dəqiqləşdirilir.' },
      { factor: 'Fəhlə', detail: 'Rayonlararası sifarişdə fəhlə ayrıca hesablanır.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–Füzuli', { factor: 'Uzun Məsafə', detail: 'Avtomobilin bütün yol boyu 4 nöqtədən fiksasiyası.' }),
    yukdasimaOverview:
      'Füzuli Qarabağın cənub-şərq qapısıdır: burada yeni şəhər salınır, Füzuli Beynəlxalq Hava Limanı fəaliyyət göstərir və Şuşaya aparan Zəfər Yolu buradan başlayır. Bakıdan yol Horadiz istiqaməti ilə Füzuliyə gedir (312 km). Sifarişlərin çoxu yeni yaşayış binalarına köç və yeni idarələr üçün avadanlıqdır.',
    yukdasimaReverseOverview:
      'Füzulidən Bakıya daşınma da mümkündür; əks istiqamət üçün şərtlər və qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Yolun əsas hissəsi düzəndir, böyük qapalı furqonlar rahat gedir. Ev köçü üçün adətən 5–7 metrlik maşın seçilir.',
    yukdasimaLoadingNotes:
      'Mebel tam qablaşdırılır, texnika orijinal qutusunda və ya yumşaq materialla qorunaraq daşınır.',
    evakuatorOverview:
      'Bakı–Füzuli evakuatoru Horadiz istiqaməti ilə uzun məsafəli marşrutla işləyir. Şuşaya gedən Zəfər Yolunda qalan avtomobillər üçün də sifariş qəbul edilir.',
    evakuatorReverseOverview:
      'Füzulidən Bakıdakı servislərə avtomobil daşınması üçün sifariş qəbul edilir; şərtlər operatorla dəqiqləşdirilir.',
    yukdasimaFaqs: [
      { question: 'Bakıdan Füzuliyə yük hansı yolla gedir?', answer: 'Horadiz istiqaməti ilə (312 km).' },
      { question: 'Füzuliyə yük aparmaq üçün icazə lazımdır?', answer: 'Bölgəyə giriş qaydaları qüvvədə olan tələblərə uyğun olaraq sifariş zamanı operatorla dəqiqləşdirilir.' },
      { question: 'Yeni mənzilə köç üçün mebel ustası verirsiniz?', answer: 'Bəli, mebelin sökülüb-yığılması üçün usta xidməti ayrıca hesablanır.' },
      { question: 'Qiyməti necə öyrənə bilərəm?', answer: `Saytdakı kalkulyatordan və ya ${PHONE} nömrəsinə zəng edərək.` },
    ],
    evakuatorFaqs: [
      { question: 'Füzuli yolunda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin; operator şərtləri və gəlmə vaxtını deyir.' },
      { question: 'Zəfər Yolunda nasaz qalan avtomobili daşıyırsınız?', answer: 'Bəli, sifariş qəbul edilir; şərtlər operatorla dəqiqləşdirilir.' },
      { question: 'Füzulidən Bakıya avtomobil daşınır?', answer: 'Bəli.' },
      { question: 'Minivan üçün qiymət fərqlidir?', answer: 'Bəli, +10 AZN; işləməyən avtomobil üçün daha +5 AZN.' },
    ],
  },

  'baki-agdam': {
    directAnswerYukdasima:
      `Bakıdan Ağdama yükdaşıma Bərdə üzərindən (362 km) aparılır. Ağdam şəhəri yenidən qurulur və burada sənaye parkı fəaliyyətə başlayıb; əsas sifarişlər yeni yaşayış binalarına köç, müəssisələrə avadanlıq və tikinti-təmir yükləridir. ${KARABAKH_ACCESS_NOTE} Sifariş: ${PHONE}.`,
    directAnswerEvakuator:
      `Bakı–Ağdam (362 km) evakuatoru üçün sifariş qəbul edilir. Uzun məsafədə avtomobil 4 nöqtədən bərkidilir. ${KARABAKH_ACCESS_NOTE} Əlaqə: ${PHONE}.`,
    targetAudienceYukdasima: [
      { title: 'Ağdama Köçənlər', description: 'Yenidən qurulan şəhərin yaşayış binalarına köçən ailələr.' },
      { title: 'Müəssisələr', description: 'Sənaye parkı və yeni müəssisələrə avadanlıq göndərən şirkətlər.' },
      { title: 'Ticarət və Xidmət', description: 'Yeni açılan obyektlərə mal və inventar çatdıranlar.' },
    ],
    targetAudienceEvakuator: [
      { title: 'Uzun Yol Sürücüləri', description: 'Bakı–Bərdə–Ağdam yolunda nasaz qalan avtomobillər.' },
      { title: 'Qəzalı Avtomobillər', description: 'Yol hadisəsindən sonra Bakıya daşınacaq avtomobillər.' },
      { title: 'Servis Transferi', description: 'Ağdamdan Bakıdakı servisə göndərilən avtomobillər.' },
    ],
    cargoTypesYukdasima: [
      'Köç əşyaları və mebel',
      'Kiçik sənaye avadanlığı (qablaşdırılmış)',
      'Ofis mebeli və texnikası',
      'Ticarət avadanlığı',
      'Qablaşdırılmış təmir materialları',
    ],
    vehicleTypesYukdasima: STANDARD_TRUCKS,
    vehicleTypesEvakuator: EVAC_FLAT,
    pricingFactorsYukdasima: [
      { factor: 'Yükün Növü', detail: 'Ağır və ya qeyri-standart sənaye avadanlığı üçün şərtlər operatorla ayrıca dəqiqləşdirilir.' },
      { factor: 'Giriş Qaydaları', detail: 'Bölgəyə giriş üçün tələb olunan sənədlər sifariş zamanı dəqiqləşdirilir.' },
      { factor: 'Fəhlə', detail: 'Rayonlararası sifarişdə fəhlə ayrıca hesablanır.' },
    ],
    pricingFactorsEvakuator: EVAC_PRICING('Bakı–Ağdam', { factor: 'Uzun Məsafə', detail: 'Avtomobilin bütün yol boyu 4 nöqtədən fiksasiyası.' }),
    yukdasimaOverview:
      'Ağdam Qarabağın düzənlik hissəsində yerləşir və tarixən "Qarabağın qapısı" adlanır. Şəhər yenidən qurulur, burada sənaye parkı fəaliyyətə başlayıb. Bakıdan yol Bərdə üzərindən Ağdama gedir (362 km). Sifarişlərin çoxu yeni yaşayış binalarına köç və müəssisələr üçün avadanlıqdır.',
    yukdasimaReverseOverview:
      'Ağdamdan Bakıya daşınma da mümkündür; əks istiqamət üçün şərtlər və qiymət operatorla dəqiqləşdirilir.',
    yukdasimaVehicleNotes:
      'Yol əsasən düzəndir, böyük qapalı furqonlar rahat gedir. Avadanlıq və ev köçü üçün adətən 5–7 metrlik maşın seçilir.',
    yukdasimaLoadingNotes:
      'Avadanlıq taxta altlıqlar üzərində və ya orijinal qablaşdırmada yüklənir, ağır hissələr kuzovun ön tərəfinə yerləşdirilir.',
    evakuatorOverview:
      'Bakı–Ağdam evakuatoru Bərdə üzərindən uzun məsafəli marşrutla işləyir. Avtomobil 4 nöqtədən təkər kəmərləri ilə bərkidilir.',
    evakuatorReverseOverview:
      'Ağdamdan Bakıdakı servislərə avtomobil daşınması üçün sifariş qəbul edilir; şərtlər operatorla dəqiqləşdirilir.',
    yukdasimaFaqs: [
      { question: 'Bakıdan Ağdama yük hansı yolla gedir?', answer: 'Bərdə üzərindən (362 km).' },
      { question: 'Ağdama yük aparmaq üçün icazə lazımdır?', answer: 'Bölgəyə giriş qaydaları qüvvədə olan tələblərə uyğun olaraq sifariş zamanı operatorla dəqiqləşdirilir.' },
      { question: 'Müəssisə üçün avadanlıq daşıyırsınız?', answer: 'Bəli, qablaşdırılmış avadanlıq daşınır. Çox ağır və ya qeyri-standart yük üçün şərtlər əvvəlcədən dəqiqləşdirilir.' },
      { question: 'Qiyməti necə öyrənə bilərəm?', answer: `Saytdakı kalkulyatordan və ya ${PHONE} nömrəsinə zəng edərək.` },
    ],
    evakuatorFaqs: [
      { question: 'Ağdam yolunda qaldım, nə etməli?', answer: 'Təhlükəsiz yerdə dayanın və WhatsApp ilə yerinizi göndərin; operator şərtləri və gəlmə vaxtını deyir.' },
      { question: 'Ağdamdan Bakıya avtomobil daşınır?', answer: 'Bəli, şərtlər operatorla dəqiqləşdirilir.' },
      { question: 'Uzun yolda avtomobil necə bərkidilir?', answer: '4 nöqtədən təkər kəmərləri ilə.' },
      { question: 'İşləməyən avtomobil üçün qiymət fərqlidir?', answer: 'Bəli, kilidli təkər və ya sükan üçün +5 AZN.' },
    ],
  },
};
