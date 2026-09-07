import { PilotContent } from './regionalContent';

export const BATCH3_REGIONAL_CONTENT: Record<string, PilotContent> = {
  'baki-samaxi': {
    directAnswerYukdasima:
      'Bakıdan Şamaxıya yükdaşıma xidməti mümkündürmü? Bəli, M4 magistralı üzrə (122 km) Bakı–Şamaxı və Şamaxı–Bakı istiqamətində gündəlik yük və mebel daşınması həyata keçirilir. Şamaxı şəhər mərkəzi və ətraf ərazilərə mənzil köçü, mebel, tikinti materialları və kommersiya yükləri üçün 3 metrdən 7 metrədək qapalı furqonlar, mebel ustaları və fəhlə briqadası ayrılır. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Şamaxıya evakuator necə sifariş edilir? M4 Bakı–Şamaxı magistralı üzrə (122 km) 24/7 operativ evakuator və yol yardımı fəaliyyət göstərir. Minik, SUV, pikap və təkəri/karobkası kilidlənmiş avtomobillər hidravlik sürüşən platforma ilə daşınır. Növbətçi evakuator üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp-la məkan göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Bağ Evi və Villa Sahibləri',
        description: 'Şamaxı ərazisindəki bağ evlərinə və villalara Bakıdan mebel, məişət texnikası və həyət ləvazimatları daşıyan ailələr.',
      },
      {
        title: 'Mənzil və Yaşayış Köçü',
        description: 'Bakı ilə Şamaxı şəhəri arasında ev əşyalarını səliqəli və sığortalı şəkildə köçürmək istəyən vətəndaşlar.',
      },
      {
        title: 'Ticarət və Kommersiya Malları',
        description: 'Şamaxıdakı ticarət və xidmət obyektlərinə Bakıdan müntəzəm mal, avadanlıq və inventar göndərən şirkətlər.',
      },
      {
        title: 'Tikinti və Təmir Yükləri',
        description: 'Dağətəyi ərazilərdə fərdi ev tikintisi və təmiri üçün materialların, profil və santexnika avadanlıqlarının daşınması.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'M4 Magistralında Qalan Sürücülər',
        description: 'M4 magistralında mühərrik, transmissiya və ya elektrik nasazlığı yaşayan nəqliyyat vasitələri.',
      },
      {
        title: 'Qəzalı Avtomobil Sahibləri',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində hərəkətsiz qalmış avtomobillərin Bakı və ya yerli servislərə təhlükəsiz daşınması.',
      },
      {
        title: 'Dağ Yollarında Qalan Sürücülər',
        description: 'Rayonun dağ relyefli yollarında mühərriki qızan, sürüşən və ya texniki nasazlıq yaşayan avtomobil sahibləri.',
      },
      {
        title: 'Servis və Diler Transferləri',
        description: 'Şamaxıdan Bakıdakı rəsmi servis mərkəzlərinə zədəsiz daşınması tələb olunan avtomobillər.',
      },
    ],
    cargoTypesYukdasima: [
      'Bağ və həyət evi mebelləri, çardaq ləvazimatları',
      'Məişət texnikası (soyuducu, qızdırıcı, generator, TV)',
      'Tikinti və təmir materialları, boya və taxta məmulatları',
      'Qablaşdırılmış fərdi əşyalar və tekstil qutuları',
      'Kommersiya yükləri və təsərrüfat avadanlıqları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Qapalı Furqon (Ford Transit)',
        specs: 'Həcm: 10 m³ | Yük: 1.5 tona qədər',
        bestFor: 'Bağ əşyaları, 1 otaqlı ev və kiçik partiyalı təcili daşınmalar.',
      },
      {
        name: '4.2 Metrlik Mercedes Sprinter / Iveco',
        specs: 'Həcm: 17 m³ | Yük: 2.5 tona qədər',
        bestFor: '2-3 otaqlı mənzil köçü, standart mebellər və texnika.',
      },
      {
        name: '5.5–6 Metrlik İri Həcmli Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Böyük bağ evi köçü və ya kommersiya malları.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Sürüşən Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan, hetçbek və yüngül krossoverlər.',
      },
      {
        name: 'Gücləndirilmiş Dağüstü Platforma',
        specs: 'Yük tutumu: 3.5–4 ton, güclü lebyodka',
        bestFor: 'Ağır ciplər, mikroavtobuslar və xəndəkdən dartılma.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə (122 km)', detail: 'Bakı–Şamaxı M4 magistralı üzrə baza kilometrajı.' },
      { factor: 'Nəqliyyat Növü', detail: 'Seçilən furqonun ölçüsü (3m, 4m, 5m, 6m, 7m).' },
      { factor: 'Relyef və Ünvan', detail: 'Şamaxı şəhər mərkəzi və ya dağətəyi ərazilər.' },
      { factor: 'İşçi Briqadası', detail: 'Fəhlə və mebel ustası sayı, mərtəbə şərtləri.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Kilometraj (122 km)', detail: 'Bakıdan yükləmə nöqtəsinədək magistral məsafəsi.' },
      { factor: 'Maşının Vəziyyəti', detail: 'Sərbəst diyirlənən təkərlər və ya kilidli transmissiya.' },
      { factor: 'Avtomobil Kateqoriyası', detail: 'Minik avtomobili, SUV və ya kommersiya mikroavtobusu.' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Şamaxıya yükdaşıma nə qədər vaxt çəkir?',
        answer: 'Yol və hava şəraitindən asılı olaraq M4 magistralı ilə Bakıdan Şamaxı mərkəzinə təxmini hərəkət müddəti 1.5–2 saat təşkil edir.',
      },
      {
        question: 'Şamaxıdan Bakıya qayıdan boş maşınla yük göndərmək olarmı?',
        answer: 'Bəli, Şamaxı–Bakı əks istiqamətində qayıdan yük maşınlarımız mövcuddur və operativ daşınma təmin olunur.',
      },
      {
        question: 'Şamaxının kənd və bağ evlərinə çatdırılma varmı?',
        answer: 'Bəli, Şamaxı şəhər mərkəzi ilə yanaşı rayonun bütün kəndlərinə və fərdi yaşayış massivlərinə birbaşa qapıyadək çatdırılma həyata keçirilir.',
      },
      {
        question: 'Mebel ustası mebelləri Şamaxıda quraşdırırmı?',
        answer: 'Bəli, mebel ustalarımız Bakıda mebelləri səliqəli sökür, qablaşdırır və Şamaxıdakı ünvanda tam quraşdırıb təhvil verir.',
      },
      {
        question: 'Bakı–Şamaxı yükdaşıma qiyməti necə müəyyənləşir?',
        answer: 'Məsafə (122 km), maşının ölçüsü və fəhlə xidmətinə əsasən hesablanır. 050 250 31 70 nömrəsi ilə əlaqə saxlayaraq dəqiq məlumat ala bilərsiniz.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Şamaxı yolunda qaldıqda evakuator nə qədər vaxta gəlir?',
        answer: 'Evakuatorun çatma vaxtı avtomobilin yerləşdiyi ərazi, mövcud nəqliyyat vasitəsinin mövqeyi və yol şəraitindən asılıdır. Dəqiq məlumat sifariş zamanı operator tərəfindən bildirilir.',
      },
      {
        question: 'Şamaxıdan avtomobili Bakıdakı servisə apara bilərsiniz?',
        answer: 'Bəli, Şamaxı şəhəri və ya M4 boyunca hərəkətsiz qalmış nəqliyyat vasitəsi təhlükəsiz şəkildə Bakıdakı istənilən servisə aparılır.',
      },
      {
        question: 'Təkəri və ya sükanı kilidlənmiş avtomobili qaldırmaq mümkündürmü?',
        answer: 'Bəli, güclü elektrik bucurqadı və xüsusi diyircəkli arabacıqlar vasitəsilə avtomobilə heç bir ziyan dəymədən platformaya yüklənir.',
      },
      {
        question: 'Qarlı və ya buzlu hava şəraitində evakuator işləyirmi?',
        answer: 'Bəli, 7/24 fasiləsiz xidmət göstərilir və qış mövsümündə zəncirli, yüksək keçiricilikli texnikalar cəlb edilir.',
      },
      {
        question: 'Evakuasiya qiyməti nəyə əsasən formalaşır?',
        answer: 'Məsafə, avtomobilin çəkisi (sedan/SUV) və nasazlığın xarakterinə görə şəffaf təyin edilir. Dərhal öyrənmək üçün: 050 250 31 70.',
      },
    ],
  },

  'baki-masalli': {
    directAnswerYukdasima:
      'Bakıdan Masallıya yükdaşıma mümkündürmü? Bəli, M3 müasir magistralı üzrə (215 km) Bakı–Masallı və Masallı–Bakı reysləri hər gün təşkil olunur. Masallı şəhər mərkəzi və ətraf ərazilərə ev köçürülməsi, kommersiya malları və mebel daşınması üçün 3m–7m qapalı furqonlar və fəhlə briqadası təmin edilir. Əlaqə: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Masallıya və Masallıdan Bakıya evakuator necə sifariş edilir? M3 magistralında (215 km) 24/7 operativ evakuasiya xidməti fəaliyyət göstərir. Minik, SUV, mikroavtobus və qəzalı nəqliyyat vasitələri hidravlik platforma ilə təhlükəsiz daşınır. Növbətçi evakuator üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə GPS məkanınızı göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Masallı arasında yaşayış yerini dəyişən və bütün ev əşyalarını bir reyslə təhlükəsiz daşıtmaq istəyən ailələr.',
      },
      {
        title: 'Ticarət və Pərakəndə Sahibkarları',
        description: 'Masallının ticarət mərkəzlərinə və mağazalarına Bakıdan müntəzəm ərzaq, geyim və məişət malları daşıyan sahibkarlar.',
      },
      {
        title: 'Regional Xidmət Müəssisələri',
        description: 'Rayondakı xidmət və istirahət obyektlərinə mebel, avadanlıq və xüsusi ləvazimat tədarük edən müəssisələr.',
      },
      {
        title: 'Fərdi Əşya və Kiçik Yüklər',
        description: 'Tələbələr və fərdi şəxslər üçün soyuducu, paltaryuyan və qablaşdırılmış qutuların sərfəli daşınması.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'M3 Magistralında Nasaz Qalanlar',
        description: 'M3 sürət yolunda texniki nasazlıq səbəbindən hərəkətsiz qalan sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Sahibləri',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində hərəkət qabiliyyətini itirmiş avtomobillərin Bakı və ya Masallı servisinə daşınması.',
      },
      {
        title: 'Bakıdakı Servisə Transfer',
        description: 'Masallıdan Bakıdakı rəsmi diler və usta mərkəzlərinə göndərilən premium və zəmanətli avtomobillər.',
      },
      {
        title: 'Ağır SUV və Mikroavtobuslar',
        description: 'Cənub zonasında hərəkət edən böyük çəkili maşınların gücləndirilmiş platforma ilə uzaq məsafəli tranziti.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri (qonaq, yataq, mətbəx mebeli)',
      'Böyük və kiçik məişət texnikası (soyuducu, paltaryuyan, TV)',
      'Kommersiya malları və təsərrüfat məhsulları',
      'Qablaşdırılmış fərdi köç qutuları və tekstil',
      'Tikinti materialları və santexnika avadanlıqları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Qapalı Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        bestFor: '1 otaqlı mənzil, bağ əşyaları və təcili yüklər.',
      },
      {
        name: '4.2 Metrlik Mercedes Sprinter / Iveco',
        specs: 'Həcm: 17 m³ | Yük: 2.5 ton',
        bestFor: '2-3 otaqlı tam mənzil köçü və standart mebellər.',
      },
      {
        name: '5.5–6 Metrlik İri Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 ton',
        bestFor: 'Geniş həyət evi, kommersiya malları və böyük partiyalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek tipli minik maşınları.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5–4 ton',
        bestFor: 'Ağır ciplər, pikaplar və mikroavtobuslar.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə (215 km)', detail: 'M3 yeni magistralı üzrə dəqiq kilometraj.' },
      { factor: 'Furqon Tutumu', detail: '3m, 4m, 5m və ya 6m qapalı furqon seçimi.' },
      { factor: 'Xidmət Tərkibi', detail: 'Fəhlə sayı, mebel ustası və qablaşdırma tələbi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Magistral Kilometrajı (215 km)', detail: 'Yüklənmə və boşaldılma nöqtələri arasındakı məsafə.' },
      { factor: 'Nəqliyyatın Kateqoriyası', detail: 'Minik, cip və ya kommersiya mikroavtobusu.' },
      { factor: 'Nasazlıq Dərəcəsi', detail: 'Təkər kilidi, sükan kilidi və ya sərbəst diyirlənmə.' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Masallıya yükdaşıma nə qədər vaxt çəkir?',
        answer: 'Yol və hava şəraitindən asılı olaraq M3 magistralı ilə Bakıdan Masallıya təxmini hərəkət müddəti 2.5–3 saat təşkil edir.',
      },
      {
        question: 'Masallının kəndlərinə çatdırılma varmı?',
        answer: 'Bəli, Masallı şəhər mərkəzi ilə yanaşı rayonun bütün kəndlərinə və yaşayış massivlərinə birbaşa çatdırılır.',
      },
      {
        question: 'Masallıdan Bakıya kommersiya malları daşımaq mümkündürmü?',
        answer: 'Bəli, Masallı–Bakı əks reysi ilə həm kommersiya malları, həm də mənzil köçü daşınır.',
      },
      {
        question: 'Mebellər yolda zədələnməməsi üçün necə bərkidilir?',
        answer: 'Qapalı furqon daxilində mebellər xüsusi bərkidici kəmərlərlə divarlara fiksasiya edilir və streç-plyonka ilə qorunur.',
      },
      {
        question: 'Masallı yükdaşıma qiymətini necə öyrənmək olar?',
        answer: 'Baza məsafəsi (215 km) və yükün həcminə uyğun olaraq fərdi hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'M3 magistralında qalsam Masallıya evakuator nə qədər vaxta gəlir?',
        answer: 'Evakuatorun çatma vaxtı avtomobilin yerləşdiyi ərazi, mövcud nəqliyyat vasitəsinin mövqeyi və yol şəraitindən asılıdır. Dəqiq məlumat sifariş zamanı operator tərəfindən bildirilir.',
      },
      {
        question: 'Masallıdan Bakıdakı rəsmi servisə daşıma xidməti göstərirsiniz?',
        answer: 'Bəli, avtomobil Masallıdan birbaşa Bakıdakı istədiyiniz diler və ya usta mərkəzinə çatdırılır.',
      },
      {
        question: 'Təkəri kilidlənmiş maşın platformaya necə yüklənir?',
        answer: 'Xüsusi dolli diyircəkli arabacıqlar və lebyodka vasitəsilə avtomobil zərərsiz platformaya qaldırılır.',
      },
      {
        question: 'Gecə saatlarında evakuator çağırmaq mümkündürmü?',
        answer: 'Bəli, xidmətimiz 7/24 fasiləsizdir. Gecə və ya gündüz istənilən saatda zəng edə bilərsiniz.',
      },
      {
        question: 'Evakuator qiyməti nə qədərdir?',
        answer: '215 km məsafəyə və maşının tipinə əsasən şəffaf təyin edilir. 050 250 31 70 nömrəsindən öyrənə bilərsiniz.',
      },
    ],
  },

  'baki-astara': {
    directAnswerYukdasima:
      'Bakıdan Astaraya yükdaşıma mümkündürmü? Bəli, M3 magistralının cənub dəhlizi ilə (283 km) Bakı–Astara və Astara–Bakı marşrutunda gündəlik yükdaşıma xidməti göstərilir. Astara şəhər mərkəzi və ətraf ərazilərə mənzil köçü, kommersiya malları və mebel daşınması üçün 3m–7m qapalı furqonlar və fəhlə briqadası ayrılır. Əlaqə: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Astaraya evakuator necə sifariş edilir? M3 magistralı üzrə (283 km) 24/7 operativ evakuasiya xidməti fəaliyyət göstərir. Minik, SUV, pikap və tranzit nəqliyyat vasitələri hidravlik platformalı xüsusi texnika ilə təhlükəsiz daşınır. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp-dan məkan göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Astara arasında daimi yaşayış yerini dəyişən və bütün ev əşyalarını daşıtdıran ailələr.',
      },
      {
        title: 'Ticarət və Distribüter Şirkətləri',
        description: 'Astara bölgəsindəki ticarət obyektlərinə və anbarlara Bakıdan müntəzəm yük və inventar daşıyan şirkətlər.',
      },
      {
        title: 'Regional Təsərrüfat Sahibləri',
        description: 'Cənub bölgəsində təsərrüfat malları, ərzaq və məhsulların daşınmasını təşkil edən sahibkarlar.',
      },
      {
        title: 'Fərdi Əşya Sahibləri',
        description: 'Məişət texnikası, tək-tək mebellər və şəxsi bağ yüklərini sərfəli daşıtmaq istəyən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'M3 Cənub Yolunda Qalanlar',
        description: 'Bakı–Lənkəran–Astara magistralında mühərrik, elektronika və ya təkər problemi yaşayan sürücülər.',
      },
      {
        title: 'Magistralda Nasaz Qalan Nəqliyyat',
        description: 'Cənub dəhlizində texniki nasazlıq səbəbindən hərəkətsiz qalan avtomobillərin servislərə daşınması.',
      },
      {
        title: 'Bakı Servis Mərkəzinə Çatdırılma',
        description: 'Astaradan Bakıdakı rəsmi diler mərkəzlərinə zəmanətli və sığortalı avtomobil daşınması.',
      },
      {
        title: 'Ağır Cip və Kommersiya Texnikası',
        description: 'Regionda fəaliyyət göstərən pikap, mikroavtobus və ciplərin uzaq məsafəli evakuasiyası.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Ərzaq və təsərrüfat məhsulları',
      'Məişət elektronika və avadanlıqları',
      'Kommersiya və anbar yükləri',
      'Tikinti materialları və inventar',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Qapalı Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        bestFor: 'Kiçik köç və fərdi bağ əşyaları.',
      },
      {
        name: '4.2 Metrlik Mercedes Sprinter / Iveco',
        specs: 'Həcm: 17 m³ | Yük: 2.5 ton',
        bestFor: '2-3 otaqlı tam mənzil köçü və standart mebellər.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 ton',
        bestFor: 'Geniş həyət evi və kommersiya yükləri.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek minik avtomobilləri.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5–4 ton',
        bestFor: 'Ağır ciplər və mikroavtobuslar.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə (283 km)', detail: 'Bakı–Astara M3 dəhlizi üzrə rəsmi məsafə.' },
      { factor: 'Kuzov Həcmi', detail: '3m-dən 7m-dək seçilən nəqliyyat tutumu.' },
      { factor: 'Fəhlə və Quraşdırma', detail: 'Mebel sökülməsi və yükləmə-boşaltma xidməti.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Dəqiq Məsafə (283 km)', detail: 'Bakı və Astara arasındakı magistral məsafəsi.' },
      { factor: 'Avtomobil Modeli', detail: 'Minik, krossover və ya ağır yolsuzluq maşını.' },
      { factor: 'Nasazlıq Şəraiti', detail: 'Təkər fırlanması və ya kilidlənmiş vəziyyət.' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Astaraya yükdaşıma nə qədər vaxt çəkir?',
        answer: 'Yol və hava şəraitindən asılı olaraq M3 magistralı ilə Bakıdan Astaraya təxmini hərəkət müddəti 3.5–4 saat təşkil edir.',
      },
      {
        question: 'Astaradan Bakıya qayıdan maşınla yük göndərmək mümkündürmü?',
        answer: 'Bəli, Astara–Bakı əks istiqamətində qayıdan maşınlarımızla kommersiya yükləri və mənzil əşyaları daşınır.',
      },
      {
        question: 'Astarada mebellərin boşaldılması və quraşdırılması təmin olunur?',
        answer: 'Bəli, peşəkar fəhlə və mebel ustası briqadamız mebelləri yeni ünvanda səliqəli şəkildə quraşdırır.',
      },
      {
        question: 'Yüklərin rütubətdən qorunması necə həyata keçirilir?',
        answer: 'Bütün furqonlarımız tam hermetik qapalıdır, əşyalar suya və toza qarşı xüsusi polietilenlə qablaşdırılır.',
      },
      {
        question: 'Bakı–Astara daşıma qiyməti nə qədərdir?',
        answer: 'Qiymət məsafə (283 km) və seçilən maşın tipinə görə hesablanır. Dəqiq qiymət üçün: 050 250 31 70.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Astara yolunda evakuator nə qədər vaxta gəlir?',
        answer: 'Evakuatorun çatma vaxtı avtomobilin yerləşdiyi ərazi, mövcud nəqliyyat vasitəsinin mövqeyi və yol şəraitindən asılıdır. Dəqiq məlumat sifariş zamanı operator tərəfindən bildirilir.',
      },
      {
        question: 'Astaradan Bakıdakı servisə çatdırılma neçə saat çəkir?',
        answer: 'Yol və hava şəraitindən asılı olaraq M3 magistralı ilə Bakıya daşınma müddəti təxminən 3.5–4 saat təşkil edə bilər.',
      },
      {
        question: 'Təkəri kilidlənmiş avtomobil necə yüklənir?',
        answer: 'Xüsusi diyircəkli dolli arabacıqları ilə avtomobilin asqı sisteminə zərər vurmadan platformaya qaldırılır.',
      },
      {
        question: 'Gecə vaxtı Astaraya evakuator çağırmaq olar?',
        answer: 'Bəli, dispetçer xidmətimiz və növbətçi sürücülərimiz 24/7 fasiləsiz rejimdə çalışır.',
      },
      {
        question: 'Evakuasiya qiyməti necə təyin edilir?',
        answer: '283 km məsafəyə və avtomobilin çəkisinə uyğun hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
  },

  'baki-tovuz': {
    directAnswerYukdasima:
      'Bakıdan Tovuza yükdaşıma xidməti mümkündürmü? Bəli, M2 magistralı boyunca (451 km) Bakı–Tovuz və Tovuz–Bakı istiqamətində müntəzəm yükdaşıma həyata keçirilir. Tovuz şəhər mərkəzi və ətraf ərazilərə ev köçürülməsi, kommersiya malları və mebel daşınması üçün 3m–7m qapalı furqonlar, mebel ustaları və fəhlələr ayrılır. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Tovuza evakuator necə sifariş edilir? M2 magistralında (451 km) 24/7 fasiləsiz operativ evakuasiya xidməti fəaliyyət göstərir. Minik, SUV, pikap, mikroavtobus və qəzalı nəqliyyat vasitələri hidravlik platformalı texnika ilə daşınır. Növbətçi evakuator üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp üzərindən GPS koordinatlarınızı göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Tovuz arasında yaşayış yerini dəyişən və uzun məsafəyə əşyalarını təhlükəsiz daşıtmaq istəyən ailələr.',
      },
      {
        title: 'Sahibkarlar və Ticarət Şəbəkələri',
        description: 'Tovuzun mağaza və anbarlarına Bakıdan məişət texnikası, geyim və sənaye malları göndərən şirkətlər.',
      },
      {
        title: 'Regional İstehsalat və Təsərrüfat',
        description: 'Tovuz rayonundakı emal, təsərrüfat və ticarət müəssisələrinə avadanlıq və inventar çatdırılması.',
      },
      {
        title: 'Fərdi Əşya və Köç Qutuları',
        description: 'Tələbələr və fərdi şəxslər üçün az həcmli mebel və qablaşdırılmış əşyaların etibarlı daşınması.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'M2 Magistralında Yolda Qalanlar',
        description: 'M2 magistralında texniki nasazlıqla üzləşən sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Sahibləri',
        description: 'Magistralda qəzaya uğramış, təkəri və ya transmissiyası kilidlənmiş nəqliyyat vasitələrinin daşınması.',
      },
      {
        title: 'Bakıdakı Diler Servisinə Daşıma',
        description: 'Tovuzdan Bakıdakı rəsmi servis mərkəzlərinə zəmanətli və təhlükəsiz avtomobil transferi.',
      },
      {
        title: 'Ağır Yolsuzluq və Tranzit Maşınları',
        description: 'Bölgədə hərəkət edən ağır SUV və kommersiya nəqliyyatının evakuasiyası.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri (qonaq, yataq, mətbəx mebeli)',
      'Böyük məişət texnikası (soyuducu, paltaryuyan, kondisioner)',
      'Qablaşdırılmış fərdi köç qutuları və tekstil',
      'Kommersiya malları və avadanlıqlar',
      'Tikinti materialları və ehtiyat hissələri',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Qapalı Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        bestFor: 'Kiçik köç və fərdi bağ əşyaları.',
      },
      {
        name: '4.2 Metrlik Mercedes Sprinter / Iveco',
        specs: 'Həcm: 17 m³ | Yük: 2.5 ton',
        bestFor: '2-3 otaqlı tam mənzil köçü və standart mebellər.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 ton',
        bestFor: 'Geniş həyət evi, kommersiya malları və böyük partiyalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek minik maşınları.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5–4 ton',
        bestFor: 'Ağır ciplər, pikaplar və mikroavtobuslar.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Uzaq Məsafə (451 km)', detail: 'M2 magistralı üzrə baza kilometrajı.' },
      { factor: 'Kuzov Həcmi', detail: '3m, 4m, 5m, 6m və ya 7m qapalı furqon.' },
      { factor: 'Fəhlə və Usta Briqadası', detail: 'Yükləmə, sökülmə və quraşdırma xidməti.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Magistral Kilometrajı (451 km)', detail: 'Bakı və Tovuz arasındakı faktiki məsafə.' },
      { factor: 'Avtomobil Kateqoriyası', detail: 'Minik, krossover və ya mikroavtobus.' },
      { factor: 'Nasazlıq Şəraiti', detail: 'Sərbəst diyirlənmə və ya kilidli təkərlər.' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Tovuza yükdaşıma nə qədər vaxt aparır?',
        answer: 'Yol və hava şəraitindən asılı olaraq M2 magistralı ilə Bakıdan Tovuza təxmini hərəkət müddəti 5–6 saat çəkir.',
      },
      {
        question: 'Tovuzun kəndlərinə çatdırılma mümkündürmü?',
        answer: 'Bəli, Tovuz şəhər mərkəzi ilə yanaşı rayonun bütün kənd və yaşayış məntəqələrinə birbaşa çatdırılır.',
      },
      {
        question: 'Tovuzdan Bakıya qayıdan maşınla yük göndərmək olar?',
        answer: 'Bəli, Tovuz–Bakı xətti üzrə qayıdan yük maşınlarımız mövcuddur və operativ daşınma təmin edilir.',
      },
      {
        question: 'Uzun yolda mebellərin təhlükəsizliyi necə qorunur?',
        answer: 'Mebellər streç və qabarcıqlı plyonka ilə bükülür, furqon daxilində xüsusi kəmərlərlə möhkəm bərkidilir.',
      },
      {
        question: 'Bakı–Tovuz yükdaşıma qiymətini necə öyrənmək olar?',
        answer: 'Məsafə (451 km) və seçilən furqon ölçüsünə görə rəsmi bazadan hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakı–Tovuz yolunda evakuator nə qədər vaxta çatır?',
        answer: 'Evakuatorun çatma vaxtı avtomobilin yerləşdiyi ərazi, mövcud nəqliyyat vasitəsinin mövqeyi və yol şəraitindən asılıdır. Dəqiq məlumat sifariş zamanı operator tərəfindən bildirilir.',
      },
      {
        question: 'Tovuzdan Bakıdakı servisə avtomobil daşımaq neçə saat çəkir?',
        answer: 'Yol və hava şəraitindən asılı olaraq M2 magistralı ilə Bakıya daşınma müddəti təxminən 5–6 saat təşkil edə bilər.',
      },
      {
        question: 'Qəzalı və ya təkəri qopmuş avtomobili qaldıra bilirsiniz?',
        answer: 'Bəli, hidravlik sürüşən platforma və xüsusi bucurqadla avtomobil təhlükəsiz şəkildə yüklənir.',
      },
      {
        question: 'Gecə saatlarında Tovuzdan evakuator sifariş etmək mümkündürmü?',
        answer: 'Bəli, dispetçer mərkəzimiz 24/7 rejimində fasiləsiz xidmət göstərir.',
      },
      {
        question: 'Tovuz evakuasiya qiyməti necə müəyyən edilir?',
        answer: '451 km məsafəyə və avtomobilin kateqoriyasına uyğun şəffaf hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
  },

  'baki-agdas': {
    directAnswerYukdasima:
      'Bakıdan Ağdaşa yükdaşıma mümkündürmü? Bəli, M2 və M4 magistral dəhlizləri ilə (281 km) Bakı–Ağdaş və Ağdaş–Bakı reysləri gündəlik təşkil olunur. Ağdaş şəhər mərkəzi və ətraf ərazilərə mənzil köçü, kommersiya malları və mebel daşınması üçün 3m–7m qapalı furqonlar və fəhlə briqadası ayrılır. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Ağdaşa evakuator necə sifariş edilir? M2/M4 magistralında (281 km) 24/7 operativ evakuasiya xidməti fəaliyyət göstərir. Minik, SUV, mikroavtobus və qəzalı avtomobillər hidravlik platforma ilə təhlükəsiz daşınır. Növbətçi evakuator çağırmaq üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə lokasiya göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Ağdaş arasında yaşayış yerini dəyişən və əşyalarını səliqəli şəkildə daşıtmaq istəyən ailələr.',
      },
      {
        title: 'Ticarət və Regional Sahibkarlar',
        description: 'Ağdaşın ticarət obyektlərinə və anbarlarına Bakıdan müntəzəm mal və avadanlıq daşıyan şirkətlər.',
      },
      {
        title: 'Regional Təsərrüfat Müəssisələri',
        description: 'Rayondakı təsərrüfat və ticarət obyektlərinə avadanlıq və inventar daşıyan sahibkarlar.',
      },
      {
        title: 'Fərdi Əşya Sahibləri',
        description: 'Tək-tək mebellər, soyuducu, paltaryuyan və ya şəxsi qutuların sərfəli çatdırılması.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'M2/M4 Yolunda Qalan Sürücülər',
        description: 'Magistral marşrutunda mühərrik və ya təkər nasazlığı səbəbindən dayananlar.',
      },
      {
        title: 'Qəzalı Nəqliyyat Vasitələri',
        description: 'Ağdaş ərazisində qəzaya uğrayan avtomobillərin Bakı və ya yerli servislərə təxliyyəsi.',
      },
      {
        title: 'Bakı Servislərinə Çatdırılma',
        description: 'Ağdaşdan paytaxtdakı rəsmi diler və usta mərkəzlərinə zədəsiz avtomobil transferi.',
      },
      {
        title: 'Kommersiya və Mikroavtobuslar',
        description: 'Mərkəzi Aranda fəaliyyət göstərən kommersiya nəqliyyatının uzaq məsafəli evakuasiyası.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət elektronika və texnikası',
      'Təsərrüfat məhsulları və inventar',
      'Qablaşdırılmış köç qutuları və tekstil',
      'Tikinti materialları və santexnika',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Qapalı Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        bestFor: '1 otaqlı ev və kiçik bağ əşyaları.',
      },
      {
        name: '4.2 Metrlik Mercedes Sprinter / Iveco',
        specs: 'Həcm: 17 m³ | Yük: 2.5 ton',
        bestFor: '2-3 otaqlı tam mənzil köçü və standart mebellər.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 ton',
        bestFor: 'Geniş həyət evi və kommersiya yükləri.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek minik avtomobilləri.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5–4 ton',
        bestFor: 'Ağır ciplər və mikroavtobuslar.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə (281 km)', detail: 'M2/M4 magistralı üzrə baza kilometrajı.' },
      { factor: 'Avtomobil Həcmi', detail: '3m-dən 7m-dək furqon seçimi.' },
      { factor: 'Fəhlə və Usta', detail: 'Yükləmə-boşaltma və mebel montajı.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Məsafə (281 km)', detail: 'Magistral kilometrajı.' },
      { factor: 'Maşının Tipi', detail: 'Sedan, SUV və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Diyirlənən və ya kilidli təkərlər.' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Ağdaşa yükdaşıma nə qədər vaxt çəkir?',
        answer: 'Yol və hava şəraitindən asılı olaraq Bakıdan Ağdaşa təxmini hərəkət müddəti 3.5–4 saat təşkil edir.',
      },
      {
        question: 'Ağdaşın kəndlərinə çatdırılma varmı?',
        answer: 'Bəli, Ağdaş şəhər mərkəzi ilə yanaşı rayonun bütün kənd və yaşayış massivlərinə çatdırılır.',
      },
      {
        question: 'Ağdaşdan Bakıya əks marşrutla yük daşımaq mümkündürmü?',
        answer: 'Bəli, Ağdaş–Bakı marşrutu üzrə qayıdan yük maşınlarımızla daşınma təşkil olunur.',
      },
      {
        question: 'Mebellərin qablaşdırılması xidməti təmin edilir?',
        answer: 'Bəli, mebellər streç və qoruyucu materiallarla səliqəli qablaşdırılır.',
      },
      {
        question: 'Bakı–Ağdaş yükdaşıma qiyməti necə təyin olunur?',
        answer: '281 km məsafə və maşının ölçüsünə əsasən hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Ağdaş yolunda evakuator nə qədər vaxta gəlir?',
        answer: 'Evakuatorun çatma vaxtı avtomobilin yerləşdiyi ərazi, mövcud nəqliyyat vasitəsinin mövqeyi və yol şəraitindən asılıdır. Dəqiq məlumat sifariş zamanı operator tərəfindən bildirilir.',
      },
      {
        question: 'Ağdaşdan Bakıdakı servisə daşıma mümkündürmü?',
        answer: 'Bəli, avtomobil təhlükəsiz şəkildə Bakıdakı rəsmi diler və ya usta mərkəzinə çatdırılır.',
      },
      {
        question: 'Təkəri kilidlənmiş maşın necə yüklənir?',
        answer: 'Xüsusi dolli diyircəkləri ilə avtomobil zərərsiz platformaya qaldırılır.',
      },
      {
        question: 'Evakuator xidməti 24 saat işləyirmi?',
        answer: 'Bəli, 7/24 fasiləsiz növbətçi dispetçer sistemi fəaliyyət göstərir.',
      },
      {
        question: 'Evakuasiya qiyməti nə qədərdir?',
        answer: '281 km məsafə və maşının çəkisinə görə şəffaf təyin edilir. Əlaqə: 050 250 31 70.',
      },
    ],
  },

  'baki-goycay': {
    directAnswerYukdasima:
      'Bakıdan Göyçaya yükdaşıma xidməti mümkündürmü? Bəli, M4 magistral dəhlizi ilə (260 km) Bakı–Göyçay və Göyçay–Bakı xəttində gündəlik təhlükəsiz yük və mebel daşınması təşkil edilir. Göyçay şəhər mərkəzi və ətraf ərazilərə mənzil köçü, kommersiya malları və mebel daşınması üçün 3m–7m qapalı furqonlar və fəhlə briqadası ayrılır. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Göyçaya evakuator necə sifariş edilir? M4 magistralı üzrə (260 km) 24/7 operativ evakuasiya xidməti fəaliyyət göstərir. Minik, SUV, mikroavtobus və qəzalı nəqliyyat vasitələri hidravlik platforma ilə daşınır. Növbətçi evakuator üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp üzərindən GPS məkanınızı göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Göyçay arasında yaşayış yerini dəyişən və ev əşyalarını bir reyslə daşıtmaq istəyən ailələr.',
      },
      {
        title: 'Regional İstehsalat və Emal Müəssisələri',
        description: 'Göyçay rayonundakı emal və təsərrüfat müəssisələrinə Bakıdan avadanlıq və xammal çatdıran şirkətlər.',
      },
      {
        title: 'Ticarət və Mağaza Sahibkarları',
        description: 'Göyçay ticarət mərkəzlərinə müntəzəm məişət malları, geyim və ərzaq daşıyan kommersiya obyektləri.',
      },
      {
        title: 'Fərdi Əşya Sahibləri',
        description: 'Soyuducu, paltaryuyan, televizor və şəxsi köç qutularını sərfəli daşıtmaq istəyənlər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'M4 Yolunda Qalanlar',
        description: 'Magistralda mühərrik qızması və transmissiya nasazlığı yaşayanlar.',
      },
      {
        title: 'Qəzalı Avtomobil Sahibləri',
        description: 'Magistral yolda zədələnmiş maşınların Bakı servislərinə etibarlı daşınması.',
      },
      {
        title: 'Bakıdakı Servisə Transfer',
        description: 'Göyçaydan Bakıdakı diler və servis mərkəzlərinə göndərilən zəmanətli avtomobillər.',
      },
      {
        title: 'SUV və Yüngül Yük Maşınları',
        description: 'Regionda hərəkət edən ağır pikap və mikroavtobusların hidravlik platforma ilə təxliyyəsi.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Kommersiya malları və regional məhsullar',
      'Qablaşdırılmış köç qutuları və tekstil',
      'Tikinti materialları və inventar',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Qapalı Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        bestFor: '1 otaqlı ev və kiçik həcmli fərdi yüklər.',
      },
      {
        name: '4.2 Metrlik Mercedes Sprinter / Iveco',
        specs: 'Həcm: 17 m³ | Yük: 2.5 ton',
        bestFor: '2-3 otaqlı tam mənzil köçü və standart mebellər.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 ton',
        bestFor: 'Geniş həyət evi və kommersiya malları.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek minik maşınları.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5–4 ton',
        bestFor: 'Ağır ciplər və mikroavtobuslar.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə (260 km)', detail: 'Bakı–Göyçay magistralı üzrə baza kilometrajı.' },
      { factor: 'Nəqliyyat Növü', detail: '3m, 4m, 5m və ya 6m furqon tutumu.' },
      { factor: 'İşçi Briqadası', detail: 'Fəhlə sayı və mebel montajı xidməti.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Məsafə (260 km)', detail: 'Magistral kilometrajı.' },
      { factor: 'Avtomobil Modeli', detail: 'Minik, krossover və ya mikroavtobus.' },
      { factor: 'Nasazlıq Şəraiti', detail: 'Təkər kilidi və ya sərbəst diyirlənmə.' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Göyçaya yükdaşıma nə qədər vaxt aparır?',
        answer: 'Yol və hava şəraitindən asılı olaraq Bakıdan Göyçaya təxmini hərəkət müddəti 3–3.5 saat təşkil edir.',
      },
      {
        question: 'Göyçayın kəndlərinə çatdırılma varmı?',
        answer: 'Bəli, Göyçay şəhər mərkəzi ilə yanaşı rayonun bütün kənd və yaşayış məntəqələrinə çatdırılır.',
      },
      {
        question: 'Göyçaydan Bakıya geri qayıdan maşınla yük göndərmək olar?',
        answer: 'Bəli, Göyçay–Bakı xətti üzrə qayıdan qapalı furqonlarımızla kommersiya malları və ev əşyaları təhlükəsiz daşınır.',
      },
      {
        question: 'Mebel ustası Göyçaya göndərilirmi?',
        answer: 'Bəli, mebel ustalarımız Bakıda mebelləri sökür və Göyçayda tam quraşdırır.',
      },
      {
        question: 'Göyçay yükdaşıma qiymətini necə öyrənə bilərəm?',
        answer: '260 km məsafə və seçilən maşın tipinə uyğun olaraq rəsmi tariflə hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Göyçay yolunda qaldıqda evakuator nə vaxta gəlir?',
        answer: 'Evakuatorun çatma vaxtı avtomobilin yerləşdiyi ərazi, mövcud nəqliyyat vasitəsinin mövqeyi və yol şəraitindən asılıdır. Dəqiq məlumat sifariş zamanı operator tərəfindən bildirilir.',
      },
      {
        question: 'Göyçaydan Bakıdakı servisə daşıma mümkündürmü?',
        answer: 'Bəli, avtomobil birbaşa Bakıdakı rəsmi diler və ya usta mərkəzinə çatdırılır.',
      },
      {
        question: 'Təkəri kilidlənmiş avtomobili qaldıra bilirsiniz?',
        answer: 'Bəli, xüsusi köməkçi təkər arabacıqları (dolli) ilə zərərsiz platformaya qaldırılır.',
      },
      {
        question: 'Gecə vaxtı Göyçaya evakuator çağırmaq olar?',
        answer: 'Bəli, 7/24 fasiləsiz operativ dispetçer xidmətimiz fəaliyyət göstərir.',
      },
      {
        question: 'Evakuasiya qiyməti necə müəyyənləşir?',
        answer: '260 km məsafəyə və avtomobilin kateqoriyasına uyğun şəffaf hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
  },

  'baki-imisli': {
    directAnswerYukdasima:
      'Bakıdan İmişliyə yükdaşıma mümkündürmü? Bəli, Hacıqabul–Bəhramtəpə magistralı üzrə (210 km) Bakı–İmişli və İmişli–Bakı reysləri hər gün təşkil olunur. İmişli şəhər mərkəzi və ətraf ərazilərə ev köçü, kommersiya malları və mebel daşınması üçün 3m–7m qapalı furqonlar və fəhlələr ayrılır. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan İmişliyə evakuator necə sifariş edilir? Hacıqabul–Bəhramtəpə magistralında (210 km) 24/7 operativ evakuasiya xidməti fəaliyyət göstərir. Minik, SUV, mikroavtobus və qəzalı nəqliyyat vasitələri hidravlik platforma ilə daşınır. Növbətçi evakuator üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə məkan göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə İmişli arasında yaşayış yerini dəyişən və ev əşyalarını təhlükəsiz daşıtmaq istəyən ailələr.',
      },
      {
        title: 'Sənaye və Regional Müəssisələr',
        description: 'İmişli rayonundakı sənaye, istehsal və emal müəssisələrinə Bakıdan avadanlıq və ehtiyat hissələri göndərən şirkətlər.',
      },
      {
        title: 'Aqrar və Ticarət Sahibkarları',
        description: 'İmişlinin mağaza və bazarlarına Bakıdan müntəzəm ərzaq, geyim və məişət texnikası daşıyanlar.',
      },
      {
        title: 'Fərdi Əşya Sahibləri',
        description: 'Soyuducu, paltaryuyan, divan və şəxsi qutuları sərfəli daşıtmaq istəyən fərdi müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Hacıqabul–İmişli Yolunda Qalanlar',
        description: 'Magistralda mühərrik, transmissiya və ya elektrik nasazlığı səbəbindən hərəkətsiz qalan sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Sahibləri',
        description: 'İmişli ərazisində qəzaya uğrayan nəqliyyat vasitələrinin Bakı və ya yerli servislərə təxliyyəsi.',
      },
      {
        title: 'Bakı Servislərinə Çatdırılma',
        description: 'İmişlidən paytaxtdakı rəsmi diler və usta mərkəzlərinə zəmanətli avtomobil transferi.',
      },
      {
        title: 'Ağır SUV və Mikroavtobuslar',
        description: 'Mərkəzi Aranda hərəkət edən böyük çəkili maşınların hidravlik platforma ilə təhlükəsiz daşınması.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Sənaye avadanlıqları və ehtiyat hissələri',
      'Qablaşdırılmış köç qutuları və tekstil',
      'Tikinti materialları və aqrar mallar',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Qapalı Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        bestFor: '1 otaqlı ev və kiçik həcmli yüklər.',
      },
      {
        name: '4.2 Metrlik Mercedes Sprinter / Iveco',
        specs: 'Həcm: 17 m³ | Yük: 2.5 ton',
        bestFor: '2-3 otaqlı tam mənzil köçü və standart mebellər.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 ton',
        bestFor: 'Geniş həyət evi və kommersiya malları.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek minik maşınları.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5–4 ton',
        bestFor: 'Ağır ciplər və mikroavtobuslar.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə (210 km)', detail: 'Hacıqabul–Bəhramtəpə magistralı üzrə kilometraj.' },
      { factor: 'Furqon Tutumu', detail: '3m, 4m, 5m və ya 6m qapalı furqon.' },
      { factor: 'İşçi Briqadası', detail: 'Fəhlə sayı və mebel ustası xidməti.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Məsafə (210 km)', detail: 'Magistral kilometrajı.' },
      { factor: 'Avtomobil Modeli', detail: 'Minik, cip və ya mikroavtobus.' },
      { factor: 'Nasazlıq Şəraiti', detail: 'Təkər kilidi və ya sərbəst diyirlənmə.' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan İmişliyə yükdaşıma nə qədər vaxt çəkir?',
        answer: 'Yol və hava şəraitindən asılı olaraq Bakıdan İmişliyə təxmini hərəkət müddəti 2.5–3 saat təşkil edir.',
      },
      {
        question: 'İmişlinin kəndlərinə çatdırılma varmı?',
        answer: 'Bəli, İmişli şəhər mərkəzi ilə yanaşı rayonun bütün kənd və yaşayış məntəqələrinə çatdırılır.',
      },
      {
        question: 'İmişlidən Bakıya geri qayıdan maşınla yük göndərmək olar?',
        answer: 'Bəli, İmişli–Bakı reysi ilə qayıdan yük maşınlarımız mövcuddur.',
      },
      {
        question: 'Mebellər furqonda necə bərkidilir?',
        answer: 'Qapalı furqon daxilində mebellər xüsusi kəmərlərlə möhkəm bərkidilir və örtüklərlə qorunur.',
      },
      {
        question: 'Bakı–İmişli daşıma qiyməti nə qədərdir?',
        answer: '210 km məsafə və seçilən maşın tutumuna görə hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'İmişli yolunda qalsam evakuator nə qədər vaxta gəlir?',
        answer: 'Evakuatorun çatma vaxtı avtomobilin yerləşdiyi ərazi, mövcud nəqliyyat vasitəsinin mövqeyi və yol şəraitindən asılıdır. Dəqiq məlumat sifariş zamanı operator tərəfindən bildirilir.',
      },
      {
        question: 'İmişlidən Bakıdakı servisə daşıma mümkündürmü?',
        answer: 'Bəli, avtomobil təhlükəsiz şəkildə Bakıdakı diler və ya servis mərkəzinə çatdırılır.',
      },
      {
        question: 'Təkəri kilidlənmiş avtomobili yükləmək mümkündürmü?',
        answer: 'Bəli, xüsusi dolli diyircəkli arabacıqları ilə avtomobilə zərər dəymədən platformaya qaldırılır.',
      },
      {
        question: 'İmişli evakuator xidməti 24 saat işləyirmi?',
        answer: 'Bəli, 7/24 fasiləsiz operativ dispetçer xidməti mövcuddur.',
      },
      {
        question: 'Evakuasiya qiyməti necə müəyyən edilir?',
        answer: '210 km məsafəyə və avtomobilin çəkisinə uyğun şəffaf hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
  },

  'baki-sabirabad': {
    directAnswerYukdasima:
      'Bakıdan Sabirabada yükdaşıma xidməti mümkündürmü? Bəli, Hacıqabul–Sabirabad–İmişli yolu boyunca (171 km) Bakı–Sabirabad və Sabirabad–Bakı reysləri hər gün təşkil olunur. Sabirabad şəhər mərkəzi və ətraf ərazilərə ev köçü, kommersiya malları və mebel daşınması üçün 3m–7m qapalı furqonlar və fəhlə briqadası ayrılır. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Sabirabada evakuator necə sifariş edilir? Sabirabad marşrutu üzrə (171 km) 24/7 operativ evakuasiya xidməti fəaliyyət göstərir. Minik, SUV, mikroavtobus və qəzalı nəqliyyat vasitələri hidravlik platforma ilə daşınır. Növbətçi evakuator üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə məkan göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Sabirabad arasında yaşayış yerini dəyişən və əşyalarını səliqəli daşıtmaq istəyən ailələr.',
      },
      {
        title: 'Regional Təsərrüfat və Sahibkarlıq',
        description: 'Sabirabad rayonunda təsərrüfat, ticarət və istehsal sahəsində fəaliyyət göstərən sahibkarlar.',
      },
      {
        title: 'Ticarət və Mağaza Sahibkarları',
        description: 'Sabirabad ticarət obyektlərinə Bakıdan müntəzəm ərzaq, geyim və məişət texnikası daşıyanlar.',
      },
      {
        title: 'Fərdi Əşya Sahibləri',
        description: 'Soyuducu, paltaryuyan və ya şəxsi qutuları operativ və sərfəli daşıtmaq istəyən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Sabirabad Yolunda Qalan Sürücülər',
        description: 'Magistralda mühərrik və ya təkər nasazlığı səbəbindən yolda qalanlar.',
      },
      {
        title: 'Qəzalı Avtomobil Sahibləri',
        description: 'Rayon ərazisində qəzaya uğrayan avtomobillərin Bakı və ya yerli servislərə daşınması.',
      },
      {
        title: 'Bakı Servisinə Transfer',
        description: 'Sabirabaddan Bakıdakı rəsmi diler və usta mərkəzlərinə zəmanətli avtomobil çatdırılması.',
      },
      {
        title: 'Pikap və Yüngül Yük Texnikası',
        description: 'Bölgədə işləyən kommersiya avtomobillərinin hidravlik platforma ilə təxliyyəsi.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Regional məhsullar və təsərrüfat malları',
      'Qablaşdırılmış köç qutuları və tekstil',
      'Tikinti materialları və santexnika',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Qapalı Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        bestFor: '1 otaqlı ev və kiçik həcmli yüklər.',
      },
      {
        name: '4.2 Metrlik Mercedes Sprinter / Iveco',
        specs: 'Həcm: 17 m³ | Yük: 2.5 ton',
        bestFor: '2-3 otaqlı tam mənzil köçü və standart mebellər.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 ton',
        bestFor: 'Geniş həyət evi və kommersiya malları.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek minik maşınları.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5–4 ton',
        bestFor: 'Ağır ciplər və mikroavtobuslar.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə (171 km)', detail: 'Bakı–Sabirabad yolu üzrə faktiki kilometraj.' },
      { factor: 'Furqon Tutumu', detail: '3m, 4m, 5m və ya 6m qapalı furqon.' },
      { factor: 'İşçi Briqadası', detail: 'Fəhlə sayı və mebel ustası xidməti.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Məsafə (171 km)', detail: 'Magistral kilometrajı.' },
      { factor: 'Avtomobil Modeli', detail: 'Minik, cip və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Təkər kilidi və ya sərbəst diyirlənmə.' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Sabirabada yükdaşıma nə qədər vaxt çəkir?',
        answer: 'Yol və hava şəraitindən asılı olaraq Bakıdan Sabirabada təxmini hərəkət müddəti 2–2.5 saat çəkir.',
      },
      {
        question: 'Sabirabadın kəndlərinə çatdırılma varmı?',
        answer: 'Bəli, Sabirabad şəhər mərkəzi ilə yanaşı rayonun bütün kənd və yaşayış məntəqələrinə çatdırılır.',
      },
      {
        question: 'Sabirabaddan Bakıya qayıdan maşınla yük göndərmək olar?',
        answer: 'Bəli, Sabirabad–Bakı xətti üzrə qayıdan maşınlarımızla kommersiya malları və ev əşyaları daşınır.',
      },
      {
        question: 'Mebel ustası xidməti daxildirmi?',
        answer: 'Bəli, sifariş zamanı mebelləri söküb-yığan peşəkar mebel ustası təmin edilir.',
      },
      {
        question: 'Bakı–Sabirabad yükdaşıma qiyməti necə təyin edilir?',
        answer: '171 km məsafə və seçilən furqon ölçüsünə görə hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Sabirabad yolunda evakuator nə qədər vaxta gəlir?',
        answer: 'Evakuatorun çatma vaxtı avtomobilin yerləşdiyi ərazi, mövcud nəqliyyat vasitəsinin mövqeyi və yol şəraitindən asılıdır. Dəqiq məlumat sifariş zamanı operator tərəfindən bildirilir.',
      },
      {
        question: 'Sabirabaddan Bakıdakı servisə daşıma mümkündürmü?',
        answer: 'Bəli, avtomobil təhlükəsiz şəkildə Bakıdakı rəsmi diler və ya usta mərkəzinə çatdırılır.',
      },
      {
        question: 'Təkəri kilidlənmiş maşın platformaya necə qaldırılır?',
        answer: 'Xüsusi dolli diyircəkli arabacıqlar və bucurqadla avtomobilə zərər dəymədən yüklənir.',
      },
      {
        question: 'Sabirabad evakuator xidməti 24 saat işləyirmi?',
        answer: 'Bəli, 7/24 fasiləsiz operativ dispetçer xidmətimiz fəaliyyət göstərir.',
      },
      {
        question: 'Evakuasiya qiyməti nə qədərdir?',
        answer: '171 km məsafəyə və maşının çəkisinə uyğun şəffaf hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
  },

  'baki-qusar': {
    directAnswerYukdasima:
      'Bakıdan Qusara yükdaşıma xidməti mümkündürmü? Bəli, M1 magistralı üzrə (183 km) Bakı–Qusar və Qusar–Bakı marşrutunda gündəlik yük və mebel daşınması həyata keçirilir. Qusar şəhər mərkəzi və ətraf ərazilərə mənzil köçü, bağ əşyaları və kommersiya yükləri üçün 3m–7m qapalı furqonlar və fəhlələr ayrılır. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Qusara evakuator necə sifariş edilir? M1 magistralı və dağlıq marşrut üzrə (183 km) 24/7 operativ evakuasiya və yol yardımı fəaliyyət göstərir. Minik, SUV, pikap və yolda qalan avtomobillər gücləndirilmiş platforma ilə təhlükəsiz daşınır. Növbətçi evakuator üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp üzərindən GPS məkanınızı göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Bağ Evi və Kottec Sahibləri',
        description: 'Qusar ətrafındakı bağ evlərinə mebel, kamin, məişət texnikası və həyət ləvazimatı daşıyanlar.',
      },
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Qusar arasında yaşayış yerini dəyişən və ev əşyalarını təhlükəsiz daşıtmaq istəyən ailələr.',
      },
      {
        title: 'Regional İstirahət və Turizm Obyektləri',
        description: 'Bölgədəki istirahət mərkəzləri və obyektlərə mebel, inventar və xüsusi servis avadanlıqları daşıyan şirkətlər.',
      },
      {
        title: 'Fərdi Əşya və Kiçik Yüklər',
        description: 'İdman ləvazimatları, fərdi mebellər və qablaşdırılmış qutuların operativ çatdırılması.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Dağlıq Ərazidə Qalanlar',
        description: 'Qusar dağlıq marşrutlarında hava şəraiti və ya texniki nasazlıq səbəbindən çətinliklə üzləşən sürücülər.',
      },
      {
        title: 'M1 Magistralında Nasaz Qalanlar',
        description: 'Bakı–Quba–Qusar yolunda texniki problem yaşayan nəqliyyat vasitələri.',
      },
      {
        title: 'Bakıdakı Servisə Transfer',
        description: 'Qusardan Bakıdakı rəsmi diler və usta mərkəzlərinə zəmanətli avtomobil çatdırılması.',
      },
      {
        title: 'Ağır SUV və 4x4 Offroad Texnikası',
        description: 'Dağ relyefində hərəkət edən ağır krossover və ciplərin hidravlik platforma ilə daşınması.',
      },
    ],
    cargoTypesYukdasima: [
      'Bağ və kottec mebelləri, yumşaq dəstlər',
      'Məişət texnikası (generator, qızdırıcı, soyuducu)',
      'İstirahət və servis avadanlıqları',
      'Qablaşdırılmış fərdi köç qutuları və tekstil',
      'Tikinti materialları və xüsusi inventar',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Qapalı Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        bestFor: 'Bağ əşyaları, 1 otaqlı ev və kiçik köçlər.',
      },
      {
        name: '4.2 Metrlik Mercedes Sprinter / Iveco',
        specs: 'Həcm: 17 m³ | Yük: 2.5 ton',
        bestFor: '2-3 otaqlı tam mənzil köçü və standart mebellər.',
      },
      {
        name: '5.5–6 Metrlik İri Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 ton',
        bestFor: 'Geniş kottec köçü və kommersiya partiyaları.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek minik maşınları.',
      },
      {
        name: 'Gücləndirilmiş Dağüstü Platforma',
        specs: 'Yük tutumu: 3.5–4 ton, güclü bucurqad',
        bestFor: 'Ağır ciplər, mikroavtobuslar və dağ relyefi.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə (183 km)', detail: 'M1 magistralı üzrə baza kilometrajı.' },
      { factor: 'Dağ Relyefi və Məkan', detail: 'Qusar şəhər mərkəzi və ya ətraf yüksəklik əraziləri.' },
      { factor: 'Nəqliyyat Növü', detail: '3m, 4m, 5m və ya 6m qapalı furqon.' },
      { factor: 'Fəhlə və Usta', detail: 'Yükləmə, sökülmə və quraşdırma xidməti.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Məsafə (183 km)', detail: 'Bakı–Qusar magistral kilometrajı.' },
      { factor: 'Avtomobil Kateqoriyası', detail: 'Minik, 4x4 cip və ya mikroavtobus.' },
      { factor: 'Hava və Yol Şəraiti', detail: 'Düzənlik magistral və ya qarlı dağ yoxuşu.' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Qusara yükdaşıma nə qədər vaxt çəkir?',
        answer: 'Yol və hava şəraitindən asılı olaraq M1 magistralı ilə Bakıdan Qusara təxmini hərəkət müddəti 2–2.5 saat təşkil edir.',
      },
      {
        question: 'Qusarın kəndlərinə çatdırılma varmı?',
        answer: 'Bəli, Qusar şəhər mərkəzi ilə yanaşı rayonun bütün kənd və yaşayış məntəqələrinə birbaşa çatdırılır.',
      },
      {
        question: 'Qusardan Bakıya qayıdan maşınla yük göndərmək olarmı?',
        answer: 'Bəli, Qusar–Bakı əks istiqamətində qayıdan yük maşınlarımız mövcuddur.',
      },
      {
        question: 'Dağ yollarında mebellərin qorunması necə təmin edilir?',
        answer: 'Furqon daxilində mebellər xüsusi fiksasiya kəmərləri ilə bərkidilir və qoruyucu materiallarla bükülür.',
      },
      {
        question: 'Bakı–Qusar daşıma qiyməti necə hesablanır?',
        answer: '183 km məsafə və seçilən furqon ölçüsünə görə rəsmi tariflərlə hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Qusar yolunda evakuator nə qədər vaxta çatır?',
        answer: 'Evakuatorun çatma vaxtı avtomobilin yerləşdiyi ərazi, mövcud nəqliyyat vasitəsinin mövqeyi və yol şəraitindən asılıdır. Dəqiq məlumat sifariş zamanı operator tərəfindən bildirilir.',
      },
      {
        question: 'Qusardan Bakıdakı servisə daşıma mümkündürmü?',
        answer: 'Bəli, avtomobil zədələnmədən birbaşa Bakıdakı rəsmi diler və ya usta mərkəzinə çatdırılır.',
      },
      {
        question: 'Qarlı və buzlu havada evakuator işləyirmi?',
        answer: 'Bəli, 7/24 rejimində zəncirli və yüksək keçiricilikli evakuatorlarımız xidmət göstərir.',
      },
      {
        question: 'Təkəri kilidlənmiş avtomobil necə yüklənir?',
        answer: 'Xüsusi dolli diyircəkli arabacıqları ilə avtomobilə zərər dəymədən platformaya qaldırılır.',
      },
      {
        question: 'Qusar evakuasiya qiyməti nə qədərdir?',
        answer: '183 km məsafəyə və avtomobilin kateqoriyasına uyğun şəffaf hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
  },

  'baki-sabran': {
    directAnswerYukdasima:
      'Bakıdan Şabrana yükdaşıma mümkündürmü? Bəli, M1 şimal magistralı üzrə (127 km) Bakı–Şabran və Şabran–Bakı reysləri hər gün təşkil olunur. Şabran şəhər mərkəzi və ətraf ərazilərə mənzil köçü, bağ əşyaları və kommersiya malları üçün 3m–7m qapalı furqonlar və fəhlələr təmin edilir. Əlaqə: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Şabrana evakuator necə sifariş edilir? M1 magistralında (127 km) 24/7 operativ evakuasiya və yol yardımı xidməti fəaliyyət göstərir. Minik, SUV, mikroavtobus və qəzalı nəqliyyat vasitələri hidravlik platforma ilə təhlükəsiz daşınır. Növbətçi evakuator üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə məkan göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Şabran arasında daimi yaşayış yerini dəyişən və əşyalarını səliqəli köçürmək istəyən ailələr.',
      },
      {
        title: 'Bağ və İstirahət Mülk Sahibləri',
        description: 'Şabran və ətraf istirahət zonalarındakı evlərə mebel, məişət texnikası və bağ ləvazimatı daşıyanlar.',
      },
      {
        title: 'Ticarət və İstehsalat Müəssisələri',
        description: 'Şabran ticarət mərkəzlərinə və yerli emal müəssisələrinə Bakıdan mallar və avadanlıqlar daşıyan şirkətlər.',
      },
      {
        title: 'Fərdi Əşya Sahibləri',
        description: 'Kiçik həcmli mebellər, soyuducu, paltaryuyan və qutuları sərfəli daşıtmaq istəyən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'M1 Şimal Yolunda Qalanlar',
        description: 'M1 magistral xəttində mühərrik, transmissiya və ya elektrik nasazlığı səbəbindən dayanan sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Sahibləri',
        description: 'Magistralda qəzaya uğrayan avtomobillərin Bakı və ya yerli servislərə operativ daşınması.',
      },
      {
        title: 'Bakı Servisinə Transfer',
        description: 'Şabrandan Bakıdakı diler və servis mərkəzlərinə zəmanətli avtomobil çatdırılması.',
      },
      {
        title: 'Ağır SUV və Mikroavtobuslar',
        description: 'Regionda hərəkət edən ağır krossover və kommersiya texnikasının təhlükəsiz evakuasiyası.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Bağ və istirahət ləvazimatları',
      'Qablaşdırılmış köç qutuları və tekstil',
      'Tikinti materialları və santexnika',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Qapalı Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        bestFor: '1 otaqlı ev və kiçik bağ əşyaları.',
      },
      {
        name: '4.2 Metrlik Mercedes Sprinter / Iveco',
        specs: 'Həcm: 17 m³ | Yük: 2.5 ton',
        bestFor: '2-3 otaqlı tam mənzil köçü və standart mebellər.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 ton',
        bestFor: 'Geniş həyət evi və kommersiya partiyaları.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek minik maşınları.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5–4 ton',
        bestFor: 'Ağır ciplər və mikroavtobuslar.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə (127 km)', detail: 'M1 magistralı üzrə baza kilometrajı.' },
      { factor: 'Furqon Tutumu', detail: '3m, 4m, 5m və ya 6m qapalı furqon.' },
      { factor: 'İşçi Briqadası', detail: 'Fəhlə sayı və mebel ustası xidməti.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Məsafə (127 km)', detail: 'Magistral kilometrajı.' },
      { factor: 'Avtomobil Modeli', detail: 'Minik, cip və ya mikroavtobus.' },
      { factor: 'Nasazlıq Şəraiti', detail: 'Təkər kilidi və ya sərbəst diyirlənmə.' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Şabrana yükdaşıma nə qədər vaxt çəkir?',
        answer: 'Yol və hava şəraitindən asılı olaraq M1 magistralı ilə Bakıdan Şabrana təxmini hərəkət müddəti 1.5–2 saat təşkil edir.',
      },
      {
        question: 'Şabranın kəndlərinə çatdırılma varmı?',
        answer: 'Bəli, Şabran şəhər mərkəzi ilə yanaşı rayonun bütün kənd və yaşayış məntəqələrinə çatdırılır.',
      },
      {
        question: 'Şabrandan Bakıya qayıdan maşınla yük göndərmək olar?',
        answer: 'Bəli, Şabran–Bakı xətti üzrə qayıdan yük maşınlarımız mövcuddur.',
      },
      {
        question: 'Mebellər yolda zədələnməməsi üçün necə qorunur?',
        answer: 'Mebellər qoruyucu plyonka ilə bükülür və furqon daxilində kəmərlərlə möhkəm bərkidilir.',
      },
      {
        question: 'Bakı–Şabran daşıma qiyməti necə hesablanır?',
        answer: '127 km məsafə və seçilən furqon ölçüsünə görə rəsmi tariflərlə hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Şabran yolunda evakuator nə vaxta gəlir?',
        answer: 'Evakuatorun çatma vaxtı avtomobilin yerləşdiyi ərazi, mövcud nəqliyyat vasitəsinin mövqeyi və yol şəraitindən asılıdır. Dəqiq məlumat sifariş zamanı operator tərəfindən bildirilir.',
      },
      {
        question: 'Şabrandan Bakıdakı servisə daşıma mümkündürmü?',
        answer: 'Bəli, avtomobil təhlükəsiz şəkildə Bakıdakı diler və ya usta mərkəzinə çatdırılır.',
      },
      {
        question: 'Təkəri kilidlənmiş avtomobil necə yüklənir?',
        answer: 'Xüsusi dolli diyircəkli arabacıqları ilə avtomobilə zərər dəymədən platformaya qaldırılır.',
      },
      {
        question: 'Şabran evakuator xidməti 24 saat işləyirmi?',
        answer: 'Bəli, 7/24 fasiləsiz operativ dispetçer xidməti mövcuddur.',
      },
      {
        question: 'Evakuasiya qiyməti necə müəyyən edilir?',
        answer: '127 km məsafəyə və maşının çəkisinə uyğun şəffaf hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
  },

  'baki-agcabedi': {
    directAnswerYukdasima:
      'Bakıdan Ağcabədiyə yükdaşıma xidməti mümkündürmü? Bəli, Hacıqabul–Bəhramtəpə–Ağcabədi magistralı boyunca (293 km) Bakı–Ağcabədi və Ağcabədi–Bakı reysləri hər gün təşkil olunur. Ağcabədi şəhər mərkəzi və ətraf ərazilərə mənzil köçü, kommersiya malları və mebel daşınması üçün 3m–7m qapalı furqonlar və fəhlələr ayrılır. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Ağcabədiyə evakuator necə sifariş edilir? Qarabağ və Mərkəzi Aran marşrutunda (293 km) 24/7 operativ evakuasiya xidməti fəaliyyət göstərir. Minik, SUV, mikroavtobus və qəzalı nəqliyyat vasitələri hidravlik platforma ilə təhlükəsiz daşınır. Növbətçi evakuator üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə GPS məkanınızı göndərə bilərsiniz.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Ağcabədi arasında yaşayış yerini dəyişən və ev əşyalarını təhlükəsiz daşıtmaq istəyən ailələr.',
      },
      {
        title: 'Regional Təsərrüfat və Sahibkarlıq',
        description: 'Ağcabədi rayonundakı təsərrüfat, emal və ticarət müəssisələrinə Bakıdan avadanlıq və inventar daşıyanlar.',
      },
      {
        title: 'Ticarət və Pərakəndə Sahibkarları',
        description: 'Ağcabədi ticarət mərkəzlərinə və bazarlarına Bakıdan müntəzəm ərzaq, geyim və məişət texnikası göndərən şirkətlər.',
      },
      {
        title: 'Fərdi Əşya Sahibləri',
        description: 'Soyuducu, paltaryuyan, divan və şəxsi qutuları operativ daşıtmaq istəyən fərdi müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Mərkəzi Aran Yolunda Qalanlar',
        description: 'Magistral xəttində mühərrik və ya təkər nasazlığı səbəbindən hərəkətsiz qalan sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Sahibləri',
        description: 'Ağcabədi və ətraf rayonlarda qəzaya uğrayan avtomobillərin Bakı və ya yerli servislərə təxliyyəsi.',
      },
      {
        title: 'Bakıdakı Servisə Transfer',
        description: 'Ağcabədidən paytaxtdakı rəsmi diler və usta mərkəzlərinə zəmanətli avtomobil çatdırılması.',
      },
      {
        title: 'Ağır Yolsuzluq və Kommersiya Texnikası',
        description: 'Regionda işləyən pikap, cip və mikroavtobusların hidravlik platforma ilə daşınması.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Təsərrüfat və istehsalat avadanlıqları',
      'Qablaşdırılmış köç qutuları və tekstil',
      'Tikinti materialları və santexnika',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Qapalı Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        bestFor: '1 otaqlı ev və kiçik həcmli yüklər.',
      },
      {
        name: '4.2 Metrlik Mercedes Sprinter / Iveco',
        specs: 'Həcm: 17 m³ | Yük: 2.5 ton',
        bestFor: '2-3 otaqlı tam mənzil köçü və standart mebellər.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 ton',
        bestFor: 'Geniş həyət evi və kommersiya malları.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek minik maşınları.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5–4 ton',
        bestFor: 'Ağır ciplər və mikroavtobuslar.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə (293 km)', detail: 'Bakı–Ağcabədi magistralı üzrə kilometraj.' },
      { factor: 'Furqon Tutumu', detail: '3m, 4m, 5m və ya 6m qapalı furqon.' },
      { factor: 'İşçi Briqadası', detail: 'Fəhlə sayı və mebel ustası xidməti.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Məsafə (293 km)', detail: 'Magistral kilometrajı.' },
      { factor: 'Avtomobil Modeli', detail: 'Minik, cip və ya mikroavtobus.' },
      { factor: 'Nasazlıq Şəraiti', detail: 'Təkər kilidi və ya sərbəst diyirlənmə.' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Ağcabədiyə yükdaşıma nə qədər vaxt çəkir?',
        answer: 'Yol və hava şəraitindən asılı olaraq Bakıdan Ağcabədiyə təxmini hərəkət müddəti 3.5–4 saat təşkil edir.',
      },
      {
        question: 'Ağcabədinin kəndlərinə çatdırılma varmı?',
        answer: 'Bəli, Ağcabədi şəhər mərkəzi ilə yanaşı rayonun bütün kənd və yaşayış məntəqələrinə çatdırılır.',
      },
      {
        question: 'Ağcabədidən Bakıya geri qayıdan maşınla yük göndərmək olar?',
        answer: 'Bəli, Ağcabədi–Bakı marşrutu üzrə qayıdan yük maşınlarımız mövcuddur.',
      },
      {
        question: 'Mebellər furqonda necə bərkidilir?',
        answer: 'Qapalı furqon daxilində mebellər xüsusi bərkidici kəmərlərlə möhkəm fiksasiya edilir.',
      },
      {
        question: 'Bakı–Ağcabədi yükdaşıma qiyməti necə hesablanır?',
        answer: '293 km məsafə və seçilən furqon ölçüsünə görə rəsmi bazadan hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Ağcabədi yolunda evakuator nə qədər vaxta gəlir?',
        answer: 'Evakuatorun çatma vaxtı avtomobilin yerləşdiyi ərazi, mövcud nəqliyyat vasitəsinin mövqeyi və yol şəraitindən asılıdır. Dəqiq məlumat sifariş zamanı operator tərəfindən bildirilir.',
      },
      {
        question: 'Ağcabədidən Bakıdakı servisə daşıma mümkündürmü?',
        answer: 'Bəli, avtomobil təhlükəsiz şəkildə Bakıdakı rəsmi diler və ya usta mərkəzinə çatdırılır.',
      },
      {
        question: 'Təkəri kilidlənmiş avtomobili yükləmək mümkündürmü?',
        answer: 'Bəli, xüsusi dolli diyircəkli arabacıqları ilə avtomobilə zərər dəymədən platformaya qaldırılır.',
      },
      {
        question: 'Ağcabədi evakuator xidməti 24 saat işləyirmi?',
        answer: 'Bəli, 7/24 fasiləsiz operativ dispetçer xidməti fəaliyyət göstərir.',
      },
      {
        question: 'Evakuasiya qiyməti necə müəyyən edilir?',
        answer: '293 km məsafəyə və avtomobilin çəkisinə uyğun şəffaf hesablanır. Əlaqə: 050 250 31 70.',
      },
    ],
  },
};
