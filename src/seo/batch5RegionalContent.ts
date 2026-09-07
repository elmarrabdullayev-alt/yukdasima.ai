import { PilotContent } from './regionalContent';

export const BATCH5_REGIONAL_CONTENT: Record<string, PilotContent> = {
  // 1. Qazax
  'baki-qazax': {
    directAnswerYukdasima:
      'Bakıdan Qazaxa yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun yüklərin daşınması üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Qazaxdan Bakıya daşınma sifarişi üzrə xidmət detalları və qiymət operator tərəfindən dəqiqləşdirilir. Sifariş üçün: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Qazaxa evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Qazaxdan Bakıya evakuator sifarişi üzrə qiymət və detallar operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 250 31 70.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Qazax arasında yaşayış yerini dəyişən və ev əşyalarını səliqəli şəkildə daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel və Əşya Daşıdanlar',
        description: 'Fərdi mebel dəstlərini və ya məişət texnikasını ünvandan ünvana çatdırmaq istəyən fərdi şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Qazax istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən şirkətlər və sahibkarlar.',
      },
      {
        title: 'Bakı ilə Region Arasında Yük Göndərənlər',
        description: 'Bakıdan Qazaxa və Qazaxdan Bakıya müntəzəm və ya birdəfəlik yük daşıtmaq istəyənlər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Nasaz Avtomobil Sahibləri',
        description: 'Mühərrik, transmissiya və ya elektrik nasazlığı səbəbindən hərəkətsiz qalan nəqliyyat vasitələrinin sahibləri.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində zədələnmiş və ya təkərləri kilidlənmiş avtomobillərin təhlükəsiz daşınması.',
      },
      {
        title: 'Bakı ilə Region Arasında Servis Transferi',
        description: 'Avtomobilini Qazax və ya Bakıdakı texniki servis mərkəzlərinə etibarlı şəkildə çatdırmaq istəyənlər.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis avadanlığı və mebeli',
      'Kommersiya və təsərrüfat yükləri',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: 'Kiçik mənzil əşyaları, fərdi yüklər və qutular.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü, mebel dəstləri və kommersiya malları.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Geniş ev köçləri və iri partiyalı daşınmalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri, böyük krossoverlər və pikaplar.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri və ya sükanı kilidlənmiş avtomobillər.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Qazax arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən 2m, 3m, 4m, 5m, 6m və ya 7m qapalı furqon.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Qazax marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Qazaxa yükdaşıma necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Qazaxdan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Qazaxdan Bakı istiqamətinə daşınma şərtləri və nəqliyyat təyinatı operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Uyğun yük maşını necə seçilir?',
        answer: 'Yükünüzün həcmi və çəkisinə uyğun olaraq 2 metrdən 7 metrədək qapalı furqonlardan ən münasibi təklif olunur.',
      },
      {
        question: 'Fəhlə xidməti əlavə etmək mümkündür?',
        answer: 'Bəli, tələbata uyğun olaraq yükləmə-boşaltma və mebel ustası xidməti sifarişə əlavə edilə bilər.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Xidmət haqqı rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidməti tələbatına əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Qazaxa evakuator necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə avtomobilin modelini və ünvanını bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Qazaxdan Bakıya evakuator sifariş etmək mümkündür?',
        answer: 'Bəli, Qazax ərazisindən Bakı istiqamətinə nasaz və ya qəzalı avtomobillərin daşınması mümkündür; qiymət operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Nasaz avtomobil daşına bilər?',
        answer: 'Bəli, mühərrik, transmissiya və ya elektrik nasazlığı olan nəqliyyat vasitələri hidravlik platforma ilə daşınır.',
      },
      {
        question: 'Qəzalı avtomobil üçün hansı məlumatlar lazımdır?',
        answer: 'Avtomobilin təkərlərinin sərbəst hərəkət edib-etməməsi (kilidli vəziyyət) və xüsusi avadanlığa ehtiyac öncədən bildirilməlidir.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Qiymət məsafə, avtomobilin növü (sedan, SUV, minivan və s.) və kilidli təkər kimi vəziyyətlərə əsasən hesablanır.',
      },
    ],
  },

  // 2. Ağstafa
  'baki-agstafa': {
    directAnswerYukdasima:
      'Bakıdan Ağstafaya yükdaşıma xidməti təşkil olunur. Ev və mənzil əşyaları, mebel və digər uyğun yüklər üçün münasib tutumlu qapalı furqon seçilə bilər. Ağstafadan Bakıya daşınma sifarişi üzrə xidmət detalları operatorla dəqiqləşdirilir. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Ağstafaya evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı nəqliyyat vasitələrinin hidravlik platformada daşınması üçün 24/7 müraciət edə bilərsiniz. Ağstafadan Bakıya evakuator sifarişi üzrə detallar operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 250 31 70.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Ağstafa arasında köç edən və əşyalarını bir reyslə etibarlı şəkildə daşıtdırmaq istəyən vətəndaşlar.',
      },
      {
        title: 'Mebel və Əşya Daşıdanlar',
        description: 'Mebel dəstlərini və ya iri məişət texnikasını qapalı furqonla ünvana çatdırmaq istəyən şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Ağstafa istiqamətində ticarət inventarı, ofis avadanlığı və mallar göndərən sahibkarlar.',
      },
      {
        title: 'Bakı ilə Region Arasında Yük Göndərənlər',
        description: 'Bakıdan Ağstafaya və Ağstafadan Bakıya fərdi və ya kommersiya yükləri daşıtmaq istəyənlər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Nasaz Avtomobil Sahibləri',
        description: 'Yolda texniki nasazlıq səbəbindən hərəkəti dayanan avtomobillərin sahibləri.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Qəza nəticəsində hərəkətsiz qalan və xüsusi yükləmə tələb edən nəqliyyat vasitələrinin sahibləri.',
      },
      {
        title: 'Bakı ilə Region Arasında Servis Transferi',
        description: 'Avtomobilini Ağstafadan Bakıdakı servis mərkəzinə və ya əks istiqamətdə daşıtdırmaq istəyənlər.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis avadanlığı və mebeli',
      'Kommersiya və təsərrüfat malları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: 'Kiçik mənzil əşyaları, bağ ləvazimatları və fərdi yüklər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü, mebel dəstləri və kommersiya malları.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Geniş həyət evləri və böyük partiyalı yüklər.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri, böyük krossoverlər və pikaplar.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri və ya sükanı kilidlənmiş nəqliyyat vasitələri.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Ağstafa arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən 2m, 3m, 4m, 5m, 6m və ya 7m qapalı furqon.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Ağstafa marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Ağstafaya yükdaşıma necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yük haqqında məlumat verərək sifariş edə bilərsiniz.',
      },
      {
        question: 'Ağstafadan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Ağstafadan Bakı istiqamətinə daşınma sifarişi üzrə detallar operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Uyğun yük maşını necə seçilir?',
        answer: 'Yükün həcminə və xarakterinə uyğun olaraq 2 metrdən 7 metrədək qapalı furqonlardan ən münasibi təklif edilir.',
      },
      {
        question: 'Fəhlə xidməti əlavə etmək mümkündür?',
        answer: 'Bəli, ehtiyaca uyğun olaraq təcrübəli fəhlə və mebel ustası xidməti sifarişə daxil edilə bilər.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Xidmət haqqı məsafə, seçilən yük maşınının həcmi və fəhlə xidmətinə olan tələbata əsasən müəyyənləşir.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Ağstafaya evakuator necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək avtomobilin markasını və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Ağstafadan Bakıya evakuator sifariş etmək mümkündür?',
        answer: 'Bəli, Ağstafadan Bakı istiqamətinə avtomobillərin təhlükəsiz daşınması mümkündür; detallar operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Nasaz avtomobil daşına bilər?',
        answer: 'Bəli, texniki nasazlığı olan avtomobillər hidravlik platforma vasitəsilə təhlükəsiz daşınır.',
      },
      {
        question: 'Qəzalı avtomobil üçün hansı məlumatlar lazımdır?',
        answer: 'Təkərlərin vəziyyəti, sükan kilidlənməsi və xüsusi avadanlıq tələbatı öncədən bildirilməlidir.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Daşıma haqqı məsafə, avtomobilin növü və kilidli təkər kimi amillərə əsasən hesablanır.',
      },
    ],
  },

  // 3. Gədəbəy
  'baki-gedebey': {
    directAnswerYukdasima:
      'Bakıdan Gədəbəyə yükdaşıma xidməti sifariş etmək mümkündür. Mənzil köçü, mebel və digər uyğun əşyalar üçün yükün həcminə uyğun qapalı nəqliyyat vasitəsi seçilə bilər. Gədəbəydən Bakıya daşınma sifarişi üzrə xidmət detalları operatorla dəqiqləşdirilir. Əlaqə: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Gədəbəyə evakuator xidməti göstərilir. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Gədəbəydən Bakıya evakuator sifarişi üzrə qiymət və şərtlər operator tərəfindən dəqiqləşdirilir. Sifariş: 050 250 31 70.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Gədəbəy arasında ev əşyalarını və mebellərini səliqəli şəkildə köçürmək istəyən ailələr.',
      },
      {
        title: 'Mebel və Əşya Daşıdanlar',
        description: 'Fərdi mebel və məişət cihazlarını təhlükəsiz qapalı furqonla daşıtdırmaq istəyənlər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Gədəbəy istiqamətində ticarət malları, ofis ləvazimatları və avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Bakı ilə Region Arasında Yük Göndərənlər',
        description: 'Bakıdan Gədəbəyə və Gədəbəydən Bakıya etibarlı daşıma sifariş etmək istəyən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Nasaz Avtomobil Sahibləri',
        description: 'Mühərrik və ya digər texniki nasazlıq səbəbindən hərəkətsiz qalan avtomobillərin sürücüləri.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Qəza nəticəsində zədələnmiş və təhlükəsiz evakuasiyaya ehtiyacı olan avtomobil sahibləri.',
      },
      {
        title: 'Bakı ilə Region Arasında Servis Transferi',
        description: 'Avtomobilini Gədəbəydən Bakıdakı rəsmi və ya fərdi təmir mərkəzlərinə çatdırmaq istəyənlər.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis avadanlığı və mebeli',
      'Kommersiya və təsərrüfat yükləri',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: 'Kiçik mənzil əşyaları, bağ ləvazimatları və fərdi yüklər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü, mebel dəstləri və kommersiya malları.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Böyük ev köçləri və iri həcmli daşınmalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri, böyük krossoverlər və pikaplar.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri və ya sürətlər qutusu kilidlənmiş qəzalı avtomobillər.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Gədəbəy arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən 2m, 3m, 4m, 5m, 6m və ya 7m qapalı furqon.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Gədəbəy marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Gədəbəyə yükdaşıma necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Gədəbəydən Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Gədəbəydən Bakı istiqamətinə daşınma sifarişi üzrə detallar operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Uyğun yük maşını necə seçilir?',
        answer: 'Yükünüzün həcmi və çəkisinə uyğun olaraq 2 metrdən 7 metrədək qapalı furqonlardan ən münasibi təklif olunur.',
      },
      {
        question: 'Fəhlə xidməti əlavə etmək mümkündür?',
        answer: 'Bəli, tələbata uyğun olaraq yükləmə-boşaltma və mebel ustası xidməti sifarişə daxil edilə bilər.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən furqonun ölçüsü və fəhlə xidmətinə olan tələbata əsasən hesablanır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Gədəbəyə evakuator necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş edə bilərsiniz.',
      },
      {
        question: 'Gədəbəydən Bakıya evakuator sifariş etmək mümkündür?',
        answer: 'Bəli, Gədəbəy ərazisindən Bakıya nasaz və ya qəzalı avtomobillərin daşınması mümkündür; qiymət operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Nasaz avtomobil daşına bilər?',
        answer: 'Bəli, hərəkətsiz qalmış nasaz avtomobillər hidravlik platforma vasitəsilə daşınır.',
      },
      {
        question: 'Qəzalı avtomobil üçün hansı məlumatlar lazımdır?',
        answer: 'Təkərlərin kilidli vəziyyəti və xüsusi avadanlığa ehtiyac öncədən bildirilməlidir.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü və kilidli təkər kimi amillərə əsasən hesablanır.',
      },
    ],
  },

  // 4. Daşkəsən
  'baki-daskesen': {
    directAnswerYukdasima:
      'Bakıdan Daşkəsənə yükdaşıma xidməti təşkil edilir. Ev əşyaları, mebel və digər uyğun yüklər üçün yükün həcminə uyğun qapalı furqon seçilə bilər. Daşkəsəndən Bakıya daşınma sifarişi üzrə xidmət detalları operatorla dəqiqləşdirilir. Əlaqə: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Daşkəsənə evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platformada daşınması üçün 24/7 xidmət göstərilir. Daşkəsəndən Bakıya evakuator sifarişi üzrə qiymət və detallar operator tərəfindən dəqiqləşdirilir. Sifariş: 050 250 31 70.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Daşkəsən arasında yaşayış yerini dəyişən və əşyalarını etibarlı daşıtdırmaq istəyən vətəndaşlar.',
      },
      {
        title: 'Mebel və Əşya Daşıdanlar',
        description: 'Fərdi mebel və ya məişət cihazlarını qapalı furqonla ünvana çatdırmaq istəyən şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Daşkəsən istiqamətində ticarət malları, avadanlıq və ya ofis ləvazimatları göndərən sahibkarlar.',
      },
      {
        title: 'Bakı ilə Region Arasında Yük Göndərənlər',
        description: 'Hər iki istiqamətdə müntəzəm və ya birdəfəlik yük daşıtmaq istəyən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Nasaz Avtomobil Sahibləri',
        description: 'Texniki nasazlıq səbəbindən hərəkətsiz qalan nəqliyyat vasitələrinin sahibləri.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində zədələnmiş avtomobillərin təhlükəsiz daşınması.',
      },
      {
        title: 'Bakı ilə Region Arasında Servis Transferi',
        description: 'Avtomobilini Daşkəsəndən Bakıdakı servis mərkəzinə çatdırmaq istəyən avtomobil sahibləri.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis avadanlığı və mebeli',
      'Kommersiya və təsərrüfat malları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: 'Kiçik mənzil əşyaları, bağ ləvazimatları və fərdi yüklər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü, mebel dəstləri və kommersiya malları.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Böyük ev köçləri və həcmli partiyalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri, böyük krossoverlər və pikaplar.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri və ya sükanı kilidlənmiş avtomobillər.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Daşkəsən arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən 2m, 3m, 4m, 5m, 6m və ya 7m qapalı furqon.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Daşkəsən marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Daşkəsənə yükdaşıma necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Daşkəsəndən Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Daşkəsəndən Bakı istiqamətinə daşınma şərtləri operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Uyğun yük maşını necə seçilir?',
        answer: 'Yükünüzün ümumi həcmi və çəkisinə əsasən 2 metrdən 7 metrədək qapalı furqonlardan ən münasibi təklif olunur.',
      },
      {
        question: 'Fəhlə xidməti əlavə etmək mümkündür?',
        answer: 'Bəli, ehtiyacınıza uyğun olaraq yükləmə-boşaltma və mebel ustası xidməti sifarişə daxil edilə bilər.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Daşkəsənə evakuator necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək avtomobilin modelini və ünvanını bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Daşkəsəndən Bakıya evakuator sifariş etmək mümkündür?',
        answer: 'Bəli, Daşkəsəndən Bakı istiqamətinə avtomobillərin təhlükəsiz daşınması mümkündür; detallar operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Nasaz avtomobil daşına bilər?',
        answer: 'Bəli, mühərrik və ya elektrik nasazlığı olan nəqliyyat vasitələri hidravlik platforma ilə daşınır.',
      },
      {
        question: 'Qəzalı avtomobil üçün hansı məlumatlar lazımdır?',
        answer: 'Avtomobilin təkərlərinin vəziyyəti və kilidli olub-olmaması öncədən bildirilməlidir.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  // 5. Goranboy
  'baki-goranboy': {
    directAnswerYukdasima:
      'Bakıdan Goranboya yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun kommersiya yükləri üçün yükün həcminə uyğun qapalı furqon seçilə bilər. Goranboydan Bakıya daşınma sifarişi üzrə xidmət detalları operatorla dəqiqləşdirilir. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Goranboya evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Goranboydan Bakıya evakuator sifarişi üzrə qiymət və detallar operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 250 31 70.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Goranboy arasında daimi yaşayış yerini dəyişən və ev əşyalarını daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel və Əşya Daşıdanlar',
        description: 'Fərdi mebel dəstlərini və ya məişət texnikasını ünvandan ünvana çatdırmaq istəyən şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Goranboy istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Bakı ilə Region Arasında Yük Göndərənlər',
        description: 'Həm Bakıdan Goranboya, həm də Goranboydan Bakıya müntəzəm və ya birdəfəlik yük göndərən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Nasaz Avtomobil Sahibləri',
        description: 'Mühərrik və ya transmissiya nasazlığı səbəbindən hərəkətsiz qalan avtomobillərin sahibləri.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində zədələnmiş və təhlükəsiz evakuasiyaya ehtiyacı olan nəqliyyat vasitələri.',
      },
      {
        title: 'Bakı ilə Region Arasında Servis Transferi',
        description: 'Avtomobilini Goranboydan Bakıdakı texniki servis mərkəzinə çatdırmaq istəyən avtomobil sahibləri.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis avadanlığı və mebeli',
      'Kommersiya və təsərrüfat malları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: 'Kiçik mənzil əşyaları, fərdi yüklər və qutular.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü, mebel dəstləri və kommersiya malları.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Böyük ev köçləri və həcmli partiyalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri, böyük krossoverlər və pikaplar.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri və ya sükanı kilidlənmiş avtomobillər.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Goranboy arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən 2m, 3m, 4m, 5m, 6m və ya 7m qapalı furqon.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Goranboy marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Goranboya yükdaşıma necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Goranboydan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Goranboydan Bakı istiqamətinə daşınma şərtləri operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Uyğun yük maşını necə seçilir?',
        answer: 'Yükünüzün ümumi həcmi və çəkisinə əsasən 2 metrdən 7 metrədək qapalı furqonlardan ən münasibi təklif olunur.',
      },
      {
        question: 'Fəhlə xidməti əlavə etmək mümkündür?',
        answer: 'Bəli, ehtiyacınıza uyğun olaraq yükləmə-boşaltma və mebel ustası xidməti sifarişə daxil edilə bilər.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Goranboya evakuator necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Goranboydan Bakıya evakuator sifariş etmək mümkündür?',
        answer: 'Bəli, Goranboy ərazisindən Bakı istiqamətinə avtomobillərin təhlükəsiz daşınması mümkündür; detallar operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Nasaz avtomobil daşına bilər?',
        answer: 'Bəli, mühərrik və ya elektrik nasazlığı olan nəqliyyat vasitələri hidravlik platforma ilə daşınır.',
      },
      {
        question: 'Qəzalı avtomobil üçün hansı məlumatlar lazımdır?',
        answer: 'Avtomobilin təkərlərinin sərbəst hərəkət edib-etməməsi (kilidli vəziyyət) və xüsusi avadanlığa ehtiyac öncədən bildirilməlidir.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  // 6. Naftalan
  'baki-naftalan': {
    directAnswerYukdasima:
      'Bakıdan Naftalana yükdaşıma xidməti təşkil olunur. Ev və mənzil əşyaları, mebel və digər uyğun yüklər üçün münasib tutumlu qapalı furqon seçilə bilər. Naftalandan Bakıya daşınma sifarişi üzrə xidmət detalları operatorla dəqiqləşdirilir. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Naftalana evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Naftalandan Bakıya evakuator sifarişi üzrə qiymət və detallar operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 250 31 70.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Naftalan arasında yaşayış yerini dəyişən və əşyalarını səliqəli şəkildə köçürmək istəyən vətəndaşlar.',
      },
      {
        title: 'Mebel və Əşya Daşıdanlar',
        description: 'Fərdi ev mebellərini, soyuducu, paltaryuyan və digər avadanlıqları daşıtdırmaq istəyənlər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Naftalan istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Bakı ilə Region Arasında Yük Göndərənlər',
        description: 'Hər iki istiqamətdə təhlükəsiz və qapalı furqonla yük daşıtmaq istəyən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Nasaz Avtomobil Sahibləri',
        description: 'Yolda texniki nasazlıq səbəbindən hərəkətsiz qalan nəqliyyat vasitələrinin sahibləri.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində zədələnmiş avtomobillərin etibarlı daşınması.',
      },
      {
        title: 'Bakı ilə Region Arasında Servis Transferi',
        description: 'Avtomobilini Naftalandan Bakıdakı servis mərkəzinə çatdırmaq istəyən avtomobil sahibləri.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis avadanlığı və mebeli',
      'Kommersiya və təsərrüfat malları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: 'Kiçik mənzil əşyaları, fərdi yüklər və qutular.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü, mebel dəstləri və kommersiya malları.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Geniş ev köçləri və həcmli partiyalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri, böyük krossoverlər və pikaplar.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri və ya sükanı kilidlənmiş avtomobillər.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Naftalan arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən 2m, 3m, 4m, 5m, 6m və ya 7m qapalı furqon.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Naftalan marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Naftalana yükdaşıma necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Naftalandan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Naftalandan Bakı istiqamətinə daşınma şərtləri operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Uyğun yük maşını necə seçilir?',
        answer: 'Yükünüzün ümumi həcmi və çəkisinə əsasən 2 metrdən 7 metrədək qapalı furqonlardan ən münasibi təklif olunur.',
      },
      {
        question: 'Fəhlə xidməti əlavə etmək mümkündür?',
        answer: 'Bəli, ehtiyacınıza uyğun olaraq yükləmə-boşaltma və mebel ustası xidməti sifarişə daxil edilə bilər.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Naftalana evakuator necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Naftalandan Bakıya evakuator sifariş etmək mümkündür?',
        answer: 'Bəli, Naftalan ərazisindən Bakı istiqamətinə avtomobillərin təhlükəsiz daşınması mümkündür; qiymət operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Nasaz avtomobil daşına bilər?',
        answer: 'Bəli, mühərrik və ya elektrik nasazlığı olan nəqliyyat vasitələri hidravlik platforma ilə daşınır.',
      },
      {
        question: 'Qəzalı avtomobil üçün hansı məlumatlar lazımdır?',
        answer: 'Avtomobilin təkərlərinin sərbəst hərəkət edib-etməməsi (kilidli vəziyyət) və xüsusi avadanlığa ehtiyac öncədən bildirilməlidir.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  // 7. Yevlax
  'baki-yevlax': {
    directAnswerYukdasima:
      'Bakıdan Yevlaxa yükdaşıma xidməti sifariş etmək mümkündür. Mənzil köçü, mebel və digər uyğun kommersiya yükləri üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Yevlaxdan Bakıya daşınma sifarişi üzrə xidmət detalları operatorla dəqiqləşdirilir. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Yevlaxa evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Yevlaxdan Bakıya evakuator sifarişi üzrə qiymət və detallar operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 250 31 70.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Yevlax arasında yaşayış yerini dəyişən və əşyalarını səliqəli daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel və Əşya Daşıdanlar',
        description: 'Fərdi mebel dəstlərini və ya məişət avadanlıqlarını ünvandan ünvana çatdırmaq istəyən fərdi şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Yevlax istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən şirkətlər.',
      },
      {
        title: 'Bakı ilə Region Arasında Yük Göndərənlər',
        description: 'Hər iki istiqamətdə müntəzəm və ya birdəfəlik yük daşıtmaq istəyən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Nasaz Avtomobil Sahibləri',
        description: 'Mühərrik və ya transmissiya nasazlığı səbəbindən hərəkətsiz qalan nəqliyyat vasitələrinin sahibləri.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində zədələnmiş və təkərləri kilidlənmiş avtomobillərin daşınması.',
      },
      {
        title: 'Bakı ilə Region Arasında Servis Transferi',
        description: 'Avtomobilini Yevlaxdan Bakıdakı servis mərkəzinə çatdırmaq istəyən avtomobil sahibləri.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis avadanlığı və mebeli',
      'Kommersiya və təsərrüfat malları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: 'Kiçik mənzil əşyaları, bağ ləvazimatları və fərdi yüklər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü, mebel dəstləri və kommersiya malları.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Geniş ev köçləri və həcmli partiyalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri, böyük krossoverlər və pikaplar.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri və ya sükanı kilidlənmiş avtomobillər.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Yevlax arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən 2m, 3m, 4m, 5m, 6m və ya 7m qapalı furqon.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Yevlax marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Yevlaxa yükdaşıma necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Yevlaxdan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Yevlaxdan Bakı istiqamətinə daşınma şərtləri operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Uyğun yük maşını necə seçilir?',
        answer: 'Yükünüzün ümumi həcmi və çəkisinə əsasən 2 metrdən 7 metrədək qapalı furqonlardan ən münasibi təklif olunur.',
      },
      {
        question: 'Fəhlə xidməti əlavə etmək mümkündür?',
        answer: 'Bəli, ehtiyacınıza uyğun olaraq yükləmə-boşaltma və mebel ustası xidməti sifarişə daxil edilə bilər.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Yevlaxa evakuator necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Yevlaxdan Bakıya evakuator sifariş etmək mümkündür?',
        answer: 'Bəli, Yevlax ərazisindən Bakı istiqamətinə avtomobillərin təhlükəsiz daşınması mümkündür; detallar operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Nasaz avtomobil daşına bilər?',
        answer: 'Bəli, mühərrik və ya elektrik nasazlığı olan nəqliyyat vasitələri hidravlik platforma ilə daşınır.',
      },
      {
        question: 'Qəzalı avtomobil üçün hansı məlumatlar lazımdır?',
        answer: 'Avtomobilin təkərlərinin sərbəst hərəkət edib-etməməsi (kilidli vəziyyət) və xüsusi avadanlığa ehtiyac öncədən bildirilməlidir.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  // 8. Mingəçevir
  'baki-mingecevir': {
    directAnswerYukdasima:
      'Bakıdan Mingəçevirə yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun yüklərin daşınması üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Mingəçevirdən Bakıya daşınma sifarişi üzrə xidmət detalları operatorla dəqiqləşdirilir. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Mingəçevirə evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Mingəçevirdən Bakıya evakuator sifarişi üzrə qiymət və detallar operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 250 31 70.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Mingəçevir arasında daimi yaşayış yerini dəyişən və ev əşyalarını daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel və Əşya Daşıdanlar',
        description: 'Fərdi mebel dəstlərini və ya məişət texnikasını ünvandan ünvana çatdırmaq istəyən şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Mingəçevir istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Bakı ilə Region Arasında Yük Göndərənlər',
        description: 'Həm Bakıdan Mingəçevirə, həm də Mingəçevirdən Bakıya müntəzəm və ya birdəfəlik yük göndərən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Nasaz Avtomobil Sahibləri',
        description: 'Mühərrik və ya elektrik nasazlığı səbəbindən hərəkətsiz qalan nəqliyyat vasitələrinin sahibləri.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində zədələnmiş və təkərləri kilidlənmiş avtomobillərin təhlükəsiz daşınması.',
      },
      {
        title: 'Bakı ilə Region Arasında Servis Transferi',
        description: 'Avtomobilini Mingəçevirdən Bakıdakı servis mərkəzinə çatdırmaq istəyən avtomobil sahibləri.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis avadanlığı və mebeli',
      'Kommersiya və təsərrüfat malları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: 'Kiçik mənzil əşyaları, fərdi yüklər və qutular.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü, mebel dəstləri və kommersiya malları.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Böyük ev köçləri və həcmli partiyalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri, böyük krossoverlər və pikaplar.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri və ya sükanı kilidlənmiş avtomobillər.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Mingəçevir arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən 2m, 3m, 4m, 5m, 6m və ya 7m qapalı furqon.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Mingəçevir marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Mingəçevirə yükdaşıma necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Mingəçevirdən Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Mingəçevirdən Bakı istiqamətinə daşınma şərtləri operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Uyğun yük maşını necə seçilir?',
        answer: 'Yükünüzün ümumi həcmi və çəkisinə əsasən 2 metrdən 7 metrədək qapalı furqonlardan ən münasibi təklif olunur.',
      },
      {
        question: 'Fəhlə xidməti əlavə etmək mümkündür?',
        answer: 'Bəli, ehtiyacınıza uyğun olaraq yükləmə-boşaltma və mebel ustası xidməti sifarişə daxil edilə bilər.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Mingəçevirə evakuator necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Mingəçevirdən Bakıya evakuator sifariş etmək mümkündür?',
        answer: 'Bəli, Mingəçevir ərazisindən Bakı istiqamətinə avtomobillərin təhlükəsiz daşınması mümkündür; detallar operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Nasaz avtomobil daşına bilər?',
        answer: 'Bəli, mühərrik və ya elektrik nasazlığı olan nəqliyyat vasitələri hidravlik platforma ilə daşınır.',
      },
      {
        question: 'Qəzalı avtomobil üçün hansı məlumatlar lazımdır?',
        answer: 'Avtomobilin təkərlərinin sərbəst hərəkət edib-etməməsi (kilidli vəziyyət) və xüsusi avadanlığa ehtiyac öncədən bildirilməlidir.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  // 9. Oğuz
  'baki-oguz': {
    directAnswerYukdasima:
      'Bakıdan Oğuza yükdaşıma xidməti sifariş etmək mümkündür. Mənzil və bağ evi əşyaları, mebel və digər uyğun yüklər üçün münasib tutumlu qapalı furqon seçilə bilər. Oğuzdan Bakıya daşınma sifarişi üzrə xidmət detalları operatorla dəqiqləşdirilir. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Oğuza evakuator xidməti göstərilir. Nasaz və qəzalı nəqliyyat vasitələrinin hidravlik platformada daşınması üçün 24/7 sifariş qəbul edilir. Oğuzdan Bakıya evakuator sifarişi üzrə detallar və qiymət operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 250 31 70.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Oğuz arasında daimi yaşayış yerini dəyişən və ev əşyalarını daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel və Əşya Daşıdanlar',
        description: 'Fərdi mebel dəstlərini və ya məişət texnikasını ünvandan ünvana çatdırmaq istəyən şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Oğuz istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Bakı ilə Region Arasında Yük Göndərənlər',
        description: 'Həm Bakıdan Oğuza, həm də Oğuzdan Bakıya müntəzəm və ya birdəfəlik yük göndərən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Nasaz Avtomobil Sahibləri',
        description: 'Mühərrik və ya elektrik nasazlığı səbəbindən hərəkətsiz qalan nəqliyyat vasitələrinin sahibləri.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində zədələnmiş və təkərləri kilidlənmiş avtomobillərin təhlükəsiz daşınması.',
      },
      {
        title: 'Bakı ilə Region Arasında Servis Transferi',
        description: 'Avtomobilini Oğuzdan Bakıdakı servis mərkəzinə çatdırmaq istəyən avtomobil sahibləri.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis avadanlığı və mebeli',
      'Kommersiya və təsərrüfat malları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: 'Kiçik mənzil əşyaları, fərdi yüklər və qutular.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü, mebel dəstləri və kommersiya malları.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Böyük ev köçləri və həcmli partiyalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri, böyük krossoverlər və pikaplar.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri və ya sükanı kilidlənmiş avtomobillər.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Oğuz arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən 2m, 3m, 4m, 5m, 6m və ya 7m qapalı furqon.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Oğuz marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Oğuza yükdaşıma necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Oğuzdan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Oğuzdan Bakı istiqamətinə daşınma şərtləri operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Uyğun yük maşını necə seçilir?',
        answer: 'Yükünüzün ümumi həcmi və çəkisinə əsasən 2 metrdən 7 metrədək qapalı furqonlardan ən münasibi təklif olunur.',
      },
      {
        question: 'Fəhlə xidməti əlavə etmək mümkündür?',
        answer: 'Bəli, ehtiyacınıza uyğun olaraq yükləmə-boşaltma və mebel ustası xidməti sifarişə daxil edilə bilər.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Oğuza evakuator necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Oğuzdan Bakıya evakuator sifariş etmək mümkündür?',
        answer: 'Bəli, Oğuz ərazisindən Bakı istiqamətinə avtomobillərin təhlükəsiz daşınması mümkündür; detallar operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Nasaz avtomobil daşına bilər?',
        answer: 'Bəli, mühərrik və ya elektrik nasazlığı olan nəqliyyat vasitələri hidravlik platforma ilə daşınır.',
      },
      {
        question: 'Qəzalı avtomobil üçün hansı məlumatlar lazımdır?',
        answer: 'Avtomobilin təkərlərinin sərbəst hərəkət edib-etməməsi (kilidli vəziyyət) və xüsusi avadanlığa ehtiyac öncədən bildirilməlidir.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  // 10. Qax
  'baki-qax': {
    directAnswerYukdasima:
      'Bakıdan Qaxa yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun yüklərin daşınması üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Qaxdan Bakıya daşınma sifarişi üzrə xidmət detalları operatorla dəqiqləşdirilir. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Qaxa evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Qaxdan Bakıya evakuator sifarişi üzrə qiymət və detallar operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 250 31 70.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Qax arasında daimi yaşayış yerini dəyişən və ev əşyalarını daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel və Əşya Daşıdanlar',
        description: 'Fərdi mebel dəstlərini və ya məişət texnikasını ünvandan ünvana çatdırmaq istəyən şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Qax istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Bakı ilə Region Arasında Yük Göndərənlər',
        description: 'Həm Bakıdan Qaxa, həm də Qaxdan Bakıya müntəzəm və ya birdəfəlik yük göndərən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Nasaz Avtomobil Sahibləri',
        description: 'Mühərrik və ya elektrik nasazlığı səbəbindən hərəkətsiz qalan nəqliyyat vasitələrinin sahibləri.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində zədələnmiş və təkərləri kilidlənmiş avtomobillərin təhlükəsiz daşınması.',
      },
      {
        title: 'Bakı ilə Region Arasında Servis Transferi',
        description: 'Avtomobilini Qaxdan Bakıdakı servis mərkəzinə çatdırmaq istəyən avtomobil sahibləri.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis avadanlığı və mebeli',
      'Kommersiya və təsərrüfat malları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: 'Kiçik mənzil əşyaları, fərdi yüklər və qutular.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü, mebel dəstləri və kommersiya malları.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Böyük ev köçləri və həcmli partiyalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri, böyük krossoverlər və pikaplar.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri və ya sükanı kilidlənmiş avtomobillər.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Qax arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən 2m, 3m, 4m, 5m, 6m və ya 7m qapalı furqon.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Qax marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Qaxa yükdaşıma necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Qaxdan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Qaxdan Bakı istiqamətinə daşınma şərtləri operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Uyğun yük maşını necə seçilir?',
        answer: 'Yükünüzün ümumi həcmi və çəkisinə əsasən 2 metrdən 7 metrədək qapalı furqonlardan ən münasibi təklif olunur.',
      },
      {
        question: 'Fəhlə xidməti əlavə etmək mümkündür?',
        answer: 'Bəli, ehtiyacınıza uyğun olaraq yükləmə-boşaltma və mebel ustası xidməti sifarişə daxil edilə bilər.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Qaxa evakuator necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Qaxdan Bakıya evakuator sifariş etmək mümkündür?',
        answer: 'Bəli, Qax ərazisindən Bakı istiqamətinə avtomobillərin təhlükəsiz daşınması mümkündür; detallar operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Nasaz avtomobil daşına bilər?',
        answer: 'Bəli, mühərrik və ya elektrik nasazlığı olan nəqliyyat vasitələri hidravlik platforma ilə daşınır.',
      },
      {
        question: 'Qəzalı avtomobil üçün hansı məlumatlar lazımdır?',
        answer: 'Avtomobilin təkərlərinin sərbəst hərəkət edib-etməməsi (kilidli vəziyyət) və xüsusi avadanlığa ehtiyac öncədən bildirilməlidir.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  // 11. Zaqatala
  'baki-zaqatala': {
    directAnswerYukdasima:
      'Bakıdan Zaqatalaya yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun kommersiya yükləri üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Zaqataladan Bakıya daşınma sifarişi üzrə xidmət detalları operatorla dəqiqləşdirilir. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Zaqatalaya evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Zaqataladan Bakıya evakuator sifarişi üzrə qiymət və detallar operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 250 31 70.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Zaqatala arasında daimi yaşayış yerini dəyişən və ev əşyalarını daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel və Əşya Daşıdanlar',
        description: 'Fərdi mebel dəstlərini və ya məişət texnikasını ünvandan ünvana çatdırmaq istəyən şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Zaqatala istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Bakı ilə Region Arasında Yük Göndərənlər',
        description: 'Həm Bakıdan Zaqatalaya, həm də Zaqataladan Bakıya müntəzəm və ya birdəfəlik yük göndərən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Nasaz Avtomobil Sahibləri',
        description: 'Mühərrik və ya elektrik nasazlığı səbəbindən hərəkətsiz qalan nəqliyyat vasitələrinin sahibləri.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində zədələnmiş və təkərləri kilidlənmiş avtomobillərin təhlükəsiz daşınması.',
      },
      {
        title: 'Bakı ilə Region Arasında Servis Transferi',
        description: 'Avtomobilini Zaqataladan Bakıdakı servis mərkəzinə çatdırmaq istəyən avtomobil sahibləri.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis avadanlığı və mebeli',
      'Kommersiya və təsərrüfat malları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: 'Kiçik mənzil əşyaları, fərdi yüklər və qutular.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü, mebel dəstləri və kommersiya malları.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Böyük ev köçləri və həcmli partiyalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri, böyük krossoverlər və pikaplar.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri və ya sükanı kilidlənmiş avtomobillər.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Zaqatala arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən 2m, 3m, 4m, 5m, 6m və ya 7m qapalı furqon.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Zaqatala marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Zaqatalaya yükdaşıma necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Zaqataladan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Zaqataladan Bakı istiqamətinə daşınma şərtləri operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Uyğun yük maşını necə seçilir?',
        answer: 'Yükünüzün ümumi həcmi və çəkisinə əsasən 2 metrdən 7 metrədək qapalı furqonlardan ən münasibi təklif olunur.',
      },
      {
        question: 'Fəhlə xidməti əlavə etmək mümkündür?',
        answer: 'Bəli, ehtiyacınıza uyğun olaraq yükləmə-boşaltma və mebel ustası xidməti sifarişə daxil edilə bilər.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Zaqatalaya evakuator necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Zaqataladan Bakıya evakuator sifariş etmək mümkündür?',
        answer: 'Bəli, Zaqatala ərazisindən Bakı istiqamətinə avtomobillərin təhlükəsiz daşınması mümkündür; detallar operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Nasaz avtomobil daşına bilər?',
        answer: 'Bəli, mühərrik və ya elektrik nasazlığı olan nəqliyyat vasitələri hidravlik platforma ilə daşınır.',
      },
      {
        question: 'Qəzalı avtomobil üçün hansı məlumatlar lazımdır?',
        answer: 'Avtomobilin təkərlərinin sərbəst hərəkət edib-etməməsi (kilidli vəziyyət) və xüsusi avadanlığa ehtiyac öncədən bildirilməlidir.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  // 12. Balakən
  'baki-balaken': {
    directAnswerYukdasima:
      'Bakıdan Balakənə yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun yüklərin daşınması üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Balakəndən Bakıya daşınma sifarişi üzrə xidmət detalları operatorla dəqiqləşdirilir. Sifariş: 050 250 31 70.',
    directAnswerEvakuator:
      'Bakıdan Balakənə evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Balakəndən Bakıya evakuator sifarişi üzrə qiymət və detallar operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 250 31 70.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Balakən arasında daimi yaşayış yerini dəyişən və ev əşyalarını daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel və Əşya Daşıdanlar',
        description: 'Fərdi mebel dəstlərini və ya məişət texnikasını ünvandan ünvana çatdırmaq istəyən şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Balakən istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Bakı ilə Region Arasında Yük Göndərənlər',
        description: 'Həm Bakıdan Balakənə, həm də Balakəndən Bakıya müntəzəm və ya birdəfəlik yük göndərən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Nasaz Avtomobil Sahibləri',
        description: 'Mühərrik və ya elektrik nasazlığı səbəbindən hərəkətsiz qalan nəqliyyat vasitələrinin sahibləri.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində zədələnmiş və təkərləri kilidlənmiş avtomobillərin təhlükəsiz daşınması.',
      },
      {
        title: 'Bakı ilə Region Arasında Servis Transferi',
        description: 'Avtomobilini Balakəndən Bakıdakı servis mərkəzinə çatdırmaq istəyən avtomobil sahibləri.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis avadanlığı və mebeli',
      'Kommersiya və təsərrüfat malları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: 'Kiçik mənzil əşyaları, fərdi yüklər və qutular.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü, mebel dəstləri və kommersiya malları.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Böyük ev köçləri və həcmli partiyalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri, böyük krossoverlər və pikaplar.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri və ya sükanı kilidlənmiş avtomobillər.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Balakən arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən 2m, 3m, 4m, 5m, 6m və ya 7m qapalı furqon.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Balakən marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Balakənə yükdaşıma necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Balakəndən Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Balakəndən Bakı istiqamətinə daşınma şərtləri operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Uyğun yük maşını necə seçilir?',
        answer: 'Yükünüzün ümumi həcmi və çəkisinə əsasən 2 metrdən 7 metrədək qapalı furqonlardan ən münasibi təklif olunur.',
      },
      {
        question: 'Fəhlə xidməti əlavə etmək mümkündür?',
        answer: 'Bəli, ehtiyacınıza uyğun olaraq yükləmə-boşaltma və mebel ustası xidməti sifarişə daxil edilə bilər.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Balakənə evakuator necə sifariş edilir?',
        answer: '050 250 31 70 nömrəsinə zəng edərək avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Balakəndən Bakıya evakuator sifariş etmək mümkündür?',
        answer: 'Bəli, Balakən ərazisindən Bakı istiqamətinə avtomobillərin təhlükəsiz daşınması mümkündür; detallar operator tərəfindən dəqiqləşdirilir.',
      },
      {
        question: 'Nasaz avtomobil daşına bilər?',
        answer: 'Bəli, mühərrik və ya elektrik nasazlığı olan nəqliyyat vasitələri hidravlik platforma ilə daşınır.',
      },
      {
        question: 'Qəzalı avtomobil üçün hansı məlumatlar lazımdır?',
        answer: 'Avtomobilin təkərlərinin sərbəst hərəkət edib-etməməsi (kilidli vəziyyət) və xüsusi avadanlığa ehtiyac öncədən bildirilməlidir.',
      },
      {
        question: 'Qiymət necə müəyyən edilir?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },
};
