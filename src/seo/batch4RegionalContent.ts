import { PilotContent } from './regionalContent';

export const BATCH4_REGIONAL_CONTENT: Record<string, PilotContent> = {
  'baki-salyan': {
    directAnswerYukdasima:
      'Bakıdan Salyana yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun kommersiya yükləri üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Salyandan Bakıya daşınma sifarişi üçün də operatorla əlaqə saxlamaq mümkündür. Sifariş: 050 231 17 28.',
    directAnswerEvakuator:
      'Bakıdan Salyana evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Salyandan Bakıya evakuator sifarişi üzrə qiymət və xidmət detalları operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 231 17 28.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Salyan arasında daimi yaşayış yerini dəyişən və ev əşyalarını daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel və Əşya Daşıdanlar',
        description: 'Fərdi mebel dəstlərini və ya məişət texnikasını ünvandan ünvana çatdırmaq istəyən fərdi şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Salyan istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Region ilə Bakı Arasında Yük Göndərənlər',
        description: 'Həm Bakıdan Salyana, həm də Salyandan Bakıya müntəzəm və ya birdəfəlik yük göndərən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Avtomobili Nasaz Qalanlar',
        description: 'Magistralda və ya rayon daxilində mühərrik, transmissiya və ya elektrik nasazlığı səbəbindən hərəkətsiz qalan sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində zədələnmiş və təkəri/sükanı kilidlənmiş nəqliyyat vasitələrinin sahibləri.',
      },
      {
        title: 'Region–Bakı Servis Transferi İstəyənlər',
        description: 'Avtomobilini Salyandan Bakıdakı texniki servis mərkəzinə çatdırmaq istəyən avtomobil sahibləri.',
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
        bestFor: 'Sedan, hetçbek və kiçik krossoverlərin təhlükəsiz daşınması.',
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
      { factor: 'Məsafə', detail: 'Bakı və Salyan arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən 2m, 3m, 4m, 5m, 6m və ya 7m qapalı furqon.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Salyan marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Salyana yükdaşıma necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Salyandan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Salyandan Bakı istiqamətinə daşınma şərtləri və nəqliyyat təyinatı operator tərəfindən dəqiqləşdirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Salyana evakuator necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Salyandan Bakıya evakuator çağırmaq mümkündür?',
        answer: 'Bəli, Salyan ərazisindən Bakı istiqamətinə nasaz və ya qəzalı avtomobillərin təhlükəsiz daşınması həyata keçirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü (sedan, SUV, minivan və s.) və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  'baki-neftcala': {
    directAnswerYukdasima:
      'Bakıdan Neftçalaya yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun yüklər üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Neftçaladan Bakıya daşınma sifarişi üçün də operatorla əlaqə saxlamaq mümkündür. Sifariş: 050 231 17 28.',
    directAnswerEvakuator:
      'Bakıdan Neftçalaya evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Neftçaladan Bakıya evakuator sifarişi üzrə qiymət və xidmət detalları operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 231 17 28.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Neftçala arasında yaşayış yerini dəyişən və əşyalarını səliqəli şəkildə köçürmək istəyən vətəndaşlar.',
      },
      {
        title: 'Mebel və Məişət Texnikası Daşıdanlar',
        description: 'Fərdi ev mebellərini, soyuducu, paltaryuyan və digər avadanlıqları daşıtdırmaq istəyənlər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Neftçala istiqamətində fəaliyyət göstərən sahibkarlar və təşkilatlar üçün inventar və malların çatdırılması.',
      },
      {
        title: 'Region ilə Bakı Arasında Yük Göndərənlər',
        description: 'Hər iki istiqamətdə təhlükəsiz və qapalı furqonla yük daşıtmaq istəyən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Avtomobili Nasaz Qalanlar',
        description: 'Marşrut boyunca texniki nasazlıq səbəbindən hərəkətsiz qalan nəqliyyat vasitələrinin sahibləri.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Zədələnmiş və təkərləri kilidlənmiş avtomobillərin təhlükəsiz şəkildə evakuasiyası.',
      },
      {
        title: 'Region–Bakı Servis Transferi İstəyənlər',
        description: 'Neftçala ərazisindən Bakıdakı diler və ya ixtisaslaşmış təmir mərkəzinə avtomobil göndərənlər.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis və kommersiya avadanlığı',
      'Təsərrüfat və tikinti ləvazimatları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: '1 otaqlı mənzil əşyaları və fərdi yüklər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart ev köçü və mebel daşınması.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Geniş həcmli mənzil köçü və kommersiya yükləri.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek avtomobillərinin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Böyük yolsuzluq avtomobilləri və pikaplar.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri kilidlənmiş və ya qəzalı nəqliyyat vasitələri.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Neftçala arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən furqon ölçüsü.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Neftçala marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Neftçalaya yükdaşıma necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Neftçaladan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Neftçaladan Bakı istiqamətinə daşınma şərtləri və nəqliyyat təyinatı operator tərəfindən dəqiqləşdirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Neftçalaya evakuator necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Neftçaladan Bakıya evakuator çağırmaq mümkündür?',
        answer: 'Bəli, Neftçala ərazisindən Bakı istiqamətinə nasaz və ya qəzalı avtomobillərin təhlükəsiz daşınması həyata keçirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü (sedan, SUV, minivan və s.) və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  'baki-haciqabul': {
    directAnswerYukdasima:
      'Bakıdan Hacıqabula yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun kommersiya yükləri üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Hacıqabuldan Bakıya daşınma sifarişi üçün də operatorla əlaqə saxlamaq mümkündür. Sifariş: 050 231 17 28.',
    directAnswerEvakuator:
      'Bakıdan Hacıqabula evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Hacıqabuldan Bakıya evakuator sifarişi üzrə qiymət və xidmət detalları operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 231 17 28.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Hacıqabul arasında daimi yaşayış yerini dəyişən və əşyalarını daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel Daşıdanlar',
        description: 'Fərdi mebelləri, dolab, yataq və mətbəx dəstlərini təhlükəsiz şəkildə çatdırmaq istəyənlər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Hacıqabul istiqamətində ticarət malları, anbar inventarı və ya avadanlıq göndərən şirkətlər.',
      },
      {
        title: 'Region ilə Bakı Arasında Yük Göndərənlər',
        description: 'Hər iki istiqamətdə müntəzəm və ya birdəfəlik yük daşınmasına ehtiyacı olan müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Avtomobili Nasaz Qalanlar',
        description: 'Magistral qovşağında və ya rayon ərazisində texniki nasazlıq səbəbindən hərəkətsiz qalan sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Zədələnmiş və təkərləri kilidlənmiş nəqliyyat vasitələrinin təhlükəsiz evakuasiyası.',
      },
      {
        title: 'Region–Bakı Servis Transferi İstəyənlər',
        description: 'Avtomobilini Hacıqabuldan Bakıdakı servis mərkəzlərinə daşıtdırmaq istəyənlər.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis və anbar avadanlığı',
      'Kommersiya malları və tikinti materialları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: '1 otaqlı mənzil əşyaları və fərdi kiçik yüklər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü və mebel daşınması.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Həcmli mənzil köçləri və böyük partiyalar.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek avtomobillərinin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri və krossoverlər.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri kilidlənmiş qəzalı nəqliyyat vasitələri.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Hacıqabul arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən furqon ölçüsü.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Hacıqabul marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Hacıqabula yükdaşıma necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Hacıqabuldan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Hacıqabuldan Bakı istiqamətinə daşınma şərtləri və nəqliyyat təyinatı operator tərəfindən dəqiqləşdirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Hacıqabula evakuator necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Hacıqabuldan Bakıya evakuator çağırmaq mümkündür?',
        answer: 'Bəli, Hacıqabul ərazisindən Bakı istiqamətinə nasaz və ya qəzalı avtomobillərin təhlükəsiz daşınması həyata keçirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü (sedan, SUV, minivan və s.) və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  'baki-kurdemir': {
    directAnswerYukdasima:
      'Bakıdan Kürdəmirə yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun kommersiya yükləri üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Kürdəmirdən Bakıya daşınma sifarişi üçün də operatorla əlaqə saxlamaq mümkündür. Sifariş: 050 231 17 28.',
    directAnswerEvakuator:
      'Bakıdan Kürdəmirə evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Kürdəmirdən Bakıya evakuator sifarişi üzrə qiymət və xidmət detalları operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 231 17 28.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Kürdəmir arasında yaşayış yerini dəyişən və əşyalarını səliqəli köçürmək istəyən ailələr.',
      },
      {
        title: 'Mebel Daşıdanlar',
        description: 'Fərdi mebelləri, dolab və qonaq otağı dəstlərini etibarlı çatdırmaq istəyən şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Kürdəmir istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Region ilə Bakı Arasında Yük Göndərənlər',
        description: 'Hər iki istiqamətdə daşınma xidmətinə ehtiyacı olan fərdi və korporativ müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Avtomobili Nasaz Qalanlar',
        description: 'Magistral xəttində texniki nasazlıq səbəbindən hərəkətsiz qalan sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Yol-nəqliyyat hadisəsi nəticəsində zədələnmiş və təkəri kilidlənmiş avtomobillərin sahibləri.',
      },
      {
        title: 'Region–Bakı Servis Transferi İstəyənlər',
        description: 'Kürdəmirdən Bakıdakı texniki servis mərkəzlərinə avtomobil çatdırmaq istəyənlər.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis və ticarət avadanlıqları',
      'Kommersiya malları və inventar',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: '1 otaqlı mənzil əşyaları və fərdi yüklər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü və mebel daşınması.',
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
        bestFor: 'Sedan və hetçbek avtomobillərinin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri və krossoverlər.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri kilidlənmiş qəzalı nəqliyyat vasitələri.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Kürdəmir arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən furqon ölçüsü.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Kürdəmir marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Kürdəmirə yükdaşıma necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Kürdəmirdən Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Kürdəmirdən Bakı istiqamətinə daşınma şərtləri və nəqliyyat təyinatı operator tərəfindən dəqiqləşdirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Kürdəmirə evakuator necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Kürdəmirdən Bakıya evakuator çağırmaq mümkündür?',
        answer: 'Bəli, Kürdəmir ərazisindən Bakı istiqamətinə nasaz və ya qəzalı avtomobillərin təhlükəsiz daşınması həyata keçirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü (sedan, SUV, minivan və s.) və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  'baki-ucar': {
    directAnswerYukdasima:
      'Bakıdan Ucara yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun kommersiya yükləri üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Ucardan Bakıya daşınma sifarişi üçün də operatorla əlaqə saxlamaq mümkündür. Sifariş: 050 231 17 28.',
    directAnswerEvakuator:
      'Bakıdan Ucara evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Ucardan Bakıya evakuator sifarişi üzrə qiymət və xidmət detalları operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 231 17 28.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Ucar arasında köç edən və bütün ev əşyalarını səliqəli daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel Daşıdanlar',
        description: 'Yeni və ya istifadə olunmuş mebel dəstlərini ünvandan ünvana çatdırmaq istəyənlər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Ucar rayonu istiqamətində malların, təchizat inventarının və ya avadanlıqların daşınması.',
      },
      {
        title: 'Region ilə Bakı Arasında Yük Göndərənlər',
        description: 'İkitərəfli marşrut üzrə qapalı furqonla etibarlı yükdaşıma sifariş edən müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Avtomobili Nasaz Qalanlar',
        description: 'Yolda mühərrik, transmissiya və ya elektrik nasazlığı yaşayan sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Qəza nəticəsində hərəkətsiz qalan və təkərləri kilidlənmiş avtomobil sahibləri.',
      },
      {
        title: 'Region–Bakı Servis Transferi İstəyənlər',
        description: 'Ucardan Bakıdakı rəsmi servis və ya təmir emalatxanasına avtomobil göndərənlər.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis və ticarət inventarı',
      'Kommersiya malları və tikinti materialları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: '1 otaqlı mənzil əşyaları və kiçik köçlər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü və mebel dəstləri.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Böyük həcmli ev köçləri və kommersiya yükləri.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek avtomobillərinin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri və krossoverlər.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri kilidlənmiş qəzalı nəqliyyat vasitələri.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Ucar arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən furqon ölçüsü.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Ucar marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Ucara yükdaşıma necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Ucardan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Ucardan Bakı istiqamətinə daşınma şərtləri və nəqliyyat təyinatı operator tərəfindən dəqiqləşdirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Ucara evakuator necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Ucardan Bakıya evakuator çağırmaq mümkündür?',
        answer: 'Bəli, Ucar ərazisindən Bakı istiqamətinə nasaz və ya qəzalı avtomobillərin təhlükəsiz daşınması həyata keçirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü (sedan, SUV, minivan və s.) və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  'baki-zerdab': {
    directAnswerYukdasima:
      'Bakıdan Zərdaba yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun kommersiya yükləri üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Zərdabdan Bakıya daşınma sifarişi üçün də operatorla əlaqə saxlamaq mümkündür. Sifariş: 050 231 17 28.',
    directAnswerEvakuator:
      'Bakıdan Zərdaba evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Zərdabdan Bakıya evakuator sifarişi üzrə qiymət və xidmət detalları operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 231 17 28.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Zərdab arasında yaşayış yerini dəyişən və bütün ev əşyalarını daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel Daşıdanlar',
        description: 'Fərdi mebelləri, dolab, divan və yataq otağı dəstlərini etibarlı çatdırmaq istəyənlər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Zərdab istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Region ilə Bakı Arasında Yük Göndərənlər',
        description: 'Hər iki istiqamətdə daşınma xidmətinə ehtiyacı olan fərdi və korporativ müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Avtomobili Nasaz Qalanlar',
        description: 'Magistralda və ya rayon yollarında texniki nasazlıq yaşayan nəqliyyat vasitələrinin sahibləri.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Zədələnmiş və təkərləri kilidlənmiş avtomobillərin təhlükəsiz evakuasiyası.',
      },
      {
        title: 'Region–Bakı Servis Transferi İstəyənlər',
        description: 'Zərdabdan Bakıdakı texniki servis və təmir mərkəzlərinə avtomobil göndərənlər.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis və ticarət avadanlığı',
      'Kommersiya və təsərrüfat malları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: '1 otaqlı mənzil əşyaları və fərdi yüklər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü və mebel daşınması.',
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
        bestFor: 'Sedan və hetçbek avtomobillərinin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri və krossoverlər.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri kilidlənmiş qəzalı nəqliyyat vasitələri.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Zərdab arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən furqon ölçüsü.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Zərdab marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Zərdaba yükdaşıma necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Zərdabdan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Zərdabdan Bakı istiqamətinə daşınma şərtləri və nəqliyyat təyinatı operator tərəfindən dəqiqləşdirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Zərdaba evakuator necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Zərdabdan Bakıya evakuator çağırmaq mümkündür?',
        answer: 'Bəli, Zərdab ərazisindən Bakı istiqamətinə nasaz və ya qəzalı avtomobillərin təhlükəsiz daşınması həyata keçirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü (sedan, SUV, minivan və s.) və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  'baki-berde': {
    directAnswerYukdasima:
      'Bakıdan Bərdəyə yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun kommersiya yükləri üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Bərdədən Bakıya daşınma sifarişi üçün də operatorla əlaqə saxlamaq mümkündür. Sifariş: 050 231 17 28.',
    directAnswerEvakuator:
      'Bakıdan Bərdəyə evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Bərdədən Bakıya evakuator sifarişi üzrə qiymət və xidmət detalları operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 231 17 28.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Bərdə arasında yaşayış yerini dəyişən və əşyalarını səliqəli şəkildə köçürmək istəyən ailələr.',
      },
      {
        title: 'Mebel Daşıdanlar',
        description: 'Fərdi mebelləri, qonaq, yataq və mətbəx dəstlərini etibarlı çatdırmaq istəyən fərdi şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Bərdə istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Region ilə Bakı Arasında Yük Göndərənlər',
        description: 'Hər iki istiqamətdə daşınma xidmətinə ehtiyacı olan fərdi və korporativ müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Avtomobili Nasaz Qalanlar',
        description: 'Magistralda və ya rayon yollarında texniki nasazlıq səbəbindən hərəkətsiz qalan sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Zədələnmiş və təkərləri kilidlənmiş avtomobillərin təhlükəsiz şəkildə evakuasiyası.',
      },
      {
        title: 'Region–Bakı Servis Transferi İstəyənlər',
        description: 'Bərdədən Bakıdakı ixtisaslaşmış servis və təmir mərkəzlərinə avtomobil çatdırmaq istəyənlər.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis və ticarət avadanlıqları',
      'Kommersiya malları və inventar',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: '1 otaqlı mənzil əşyaları və fərdi kiçik yüklər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü və mebel daşınması.',
      },
      {
        name: '5.5–6 Metrlik Böyük Furqon',
        specs: 'Yük həcmi: 24–30 m³ | Yük: 3.5 tona qədər',
        bestFor: 'Böyük həcmli ev köçləri və kommersiya yükləri.',
      },
    ],
    vehicleTypesEvakuator: [
      {
        name: 'Standart Hidravlik Platforma',
        specs: 'Yük tutumu: 2.5 ton',
        bestFor: 'Sedan və hetçbek avtomobillərinin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri və krossoverlər.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri kilidlənmiş qəzalı nəqliyyat vasitələri.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Bərdə arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən furqon ölçüsü.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Bərdə marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Bərdəyə yükdaşıma necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Bərdədən Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Bərdədən Bakı istiqamətinə daşınma şərtləri və nəqliyyat təyinatı operator tərəfindən dəqiqləşdirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Bərdəyə evakuator necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Bərdədən Bakıya evakuator çağırmaq mümkündür?',
        answer: 'Bəli, Bərdə ərazisindən Bakı istiqamətinə nasaz və ya qəzalı avtomobillərin təhlükəsiz daşınması həyata keçirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü (sedan, SUV, minivan və s.) və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  'baki-terter': {
    directAnswerYukdasima:
      'Bakıdan Tərtərə yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun kommersiya yükləri üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Tərtərdən Bakıya daşınma sifarişi üçün də operatorla əlaqə saxlamaq mümkündür. Sifariş: 050 231 17 28.',
    directAnswerEvakuator:
      'Bakıdan Tərtərə evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Tərtərdən Bakıya evakuator sifarişi üzrə qiymət və xidmət detalları operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 231 17 28.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Tərtər arasında daimi yaşayış yerini dəyişən və ev əşyalarını daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel Daşıdanlar',
        description: 'Mebel dəstlərini və ya məişət texnikasını ünvandan ünvana çatdırmaq istəyən şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Tərtər istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Region ilə Bakı Arasında Yük Göndərənlər',
        description: 'Hər iki istiqamətdə daşınma xidmətinə ehtiyacı olan fərdi və korporativ müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Avtomobili Nasaz Qalanlar',
        description: 'Magistralda və ya rayon daxilində texniki nasazlıq səbəbindən hərəkətsiz qalan sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Zədələnmiş və təkərləri kilidlənmiş nəqliyyat vasitələrinin təhlükəsiz evakuasiyası.',
      },
      {
        title: 'Region–Bakı Servis Transferi İstəyənlər',
        description: 'Tərtərdən Bakıdakı rəsmi servis mərkəzlərinə avtomobil göndərənlər.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis və ticarət avadanlığı',
      'Kommersiya malları və tikinti materialları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: '1 otaqlı mənzil əşyaları və fərdi yüklər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü və mebel daşınması.',
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
        bestFor: 'Sedan və hetçbek avtomobillərinin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri və krossoverlər.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri kilidlənmiş qəzalı nəqliyyat vasitələri.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Tərtər arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən furqon ölçüsü.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Tərtər marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Tərtərə yükdaşıma necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Tərtərdən Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Tərtərdən Bakı istiqamətinə daşınma şərtləri və nəqliyyat təyinatı operator tərəfindən dəqiqləşdirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Tərtərə evakuator necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Tərtərdən Bakıya evakuator çağırmaq mümkündür?',
        answer: 'Bəli, Tərtər ərazisindən Bakı istiqamətinə nasaz və ya qəzalı avtomobillərin təhlükəsiz daşınması həyata keçirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü (sedan, SUV, minivan və s.) və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  'baki-agdam-quzanli': {
    directAnswerYukdasima:
      'Bakıdan Ağdam Quzanlıya yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun kommersiya yükləri üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Ağdam Quzanlıdan Bakıya daşınma sifarişi üçün də operatorla əlaqə saxlamaq mümkündür. Sifariş: 050 231 17 28.',
    directAnswerEvakuator:
      'Bakıdan Ağdam Quzanlıya evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Ağdam Quzanlıdan Bakıya evakuator sifarişi üzrə qiymət və xidmət detalları operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 231 17 28.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Ağdam (Quzanlı) arasında daimi yaşayış yerini dəyişən və əşyalarını daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel Daşıdanlar',
        description: 'Mebel dəstlərini və ya məişət texnikasını ünvandan ünvana çatdırmaq istəyən vətəndaşlar.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Ağdam Quzanlı istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Region ilə Bakı Arasında Yük Göndərənlər',
        description: 'Hər iki istiqamətdə daşınma xidmətinə ehtiyacı olan fərdi və korporativ müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Avtomobili Nasaz Qalanlar',
        description: 'Marşrut boyunca texniki nasazlıq səbəbindən hərəkətsiz qalan sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Zədələnmiş və təkərləri kilidlənmiş nəqliyyat vasitələrinin təhlükəsiz evakuasiyası.',
      },
      {
        title: 'Region–Bakı Servis Transferi İstəyənlər',
        description: 'Ağdam Quzanlıdan Bakıdakı rəsmi servis mərkəzlərinə avtomobil göndərənlər.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis və ticarət avadanlığı',
      'Kommersiya malları və tikinti materialları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: '1 otaqlı mənzil əşyaları və fərdi yüklər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü və mebel daşınması.',
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
        bestFor: 'Sedan və hetçbek avtomobillərinin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri və krossoverlər.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri kilidlənmiş qəzalı nəqliyyat vasitələri.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Ağdam (Quzanlı) arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən furqon ölçüsü.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Ağdam Quzanlı marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Ağdam Quzanlıya yükdaşıma necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Ağdam Quzanlıdan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Ağdam Quzanlıdan Bakı istiqamətinə daşınma şərtləri və nəqliyyat təyinatı operator tərəfindən dəqiqləşdirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Ağdam Quzanlıya evakuator necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Ağdam Quzanlıdan Bakıya evakuator çağırmaq mümkündür?',
        answer: 'Bəli, Ağdam Quzanlı ərazisindən Bakı istiqamətinə nasaz və ya qəzalı avtomobillərin təhlükəsiz daşınması həyata keçirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü (sedan, SUV, minivan və s.) və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  'baki-beyleqan': {
    directAnswerYukdasima:
      'Bakıdan Beyləqana yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun kommersiya yükləri üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Beyləqandan Bakıya daşınma sifarişi üçün də operatorla əlaqə saxlamaq mümkündür. Sifariş: 050 231 17 28.',
    directAnswerEvakuator:
      'Bakıdan Beyləqana evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Beyləqandan Bakıya evakuator sifarişi üzrə qiymət və xidmət detalları operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 231 17 28.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Beyləqan arasında daimi yaşayış yerini dəyişən və əşyalarını daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel Daşıdanlar',
        description: 'Fərdi mebelləri, dolab, yataq və mətbəx dəstlərini etibarlı çatdırmaq istəyənlər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Beyləqan istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Region ilə Bakı Arasında Yük Göndərənlər',
        description: 'Hər iki istiqamətdə daşınma xidmətinə ehtiyacı olan fərdi və korporativ müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Avtomobili Nasaz Qalanlar',
        description: 'Magistral xəttində texniki nasazlıq səbəbindən hərəkətsiz qalan sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Zədələnmiş və təkərləri kilidlənmiş avtomobillərin təhlükəsiz evakuasiyası.',
      },
      {
        title: 'Region–Bakı Servis Transferi İstəyənlər',
        description: 'Beyləqandan Bakıdakı texniki servis mərkəzlərinə avtomobil göndərənlər.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis və ticarət avadanlığı',
      'Kommersiya malları və inventar',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: '1 otaqlı mənzil əşyaları və fərdi yüklər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü və mebel daşınması.',
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
        bestFor: 'Sedan və hetçbek avtomobillərinin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri və krossoverlər.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri kilidlənmiş qəzalı nəqliyyat vasitələri.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Beyləqan arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən furqon ölçüsü.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Beyləqan marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Beyləqana yükdaşıma necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Beyləqandan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Beyləqandan Bakı istiqamətinə daşınma şərtləri və nəqliyyat təyinatı operator tərəfindən dəqiqləşdirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Beyləqana evakuator necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Beyləqandan Bakıya evakuator çağırmaq mümkündür?',
        answer: 'Bəli, Beyləqan ərazisindən Bakı istiqamətinə nasaz və ya qəzalı avtomobillərin təhlükəsiz daşınması həyata keçirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü (sedan, SUV, minivan və s.) və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  'baki-bilasuvar': {
    directAnswerYukdasima:
      'Bakıdan Biləsuvara yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun kommersiya yükləri üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Biləsuvardan Bakıya daşınma sifarişi üçün də operatorla əlaqə saxlamaq mümkündür. Sifariş: 050 231 17 28.',
    directAnswerEvakuator:
      'Bakıdan Biləsuvara evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Biləsuvardan Bakıya evakuator sifarişi üzrə qiymət və xidmət detalları operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 231 17 28.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Biləsuvar arasında yaşayış yerini dəyişən və əşyalarını səliqəli köçürmək istəyən ailələr.',
      },
      {
        title: 'Mebel Daşıdanlar',
        description: 'Fərdi mebelləri, dolab, yataq və qonaq otağı dəstlərini etibarlı çatdırmaq istəyən şəxslər.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Biləsuvar istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən sahibkarlar.',
      },
      {
        title: 'Region ilə Bakı Arasında Yük Göndərənlər',
        description: 'Hər iki istiqamətdə daşınma xidmətinə ehtiyacı olan fərdi və korporativ müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Avtomobili Nasaz Qalanlar',
        description: 'Magistral yol boyunca texniki nasazlıq səbəbindən hərəkətsiz qalan sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Zədələnmiş və təkərləri kilidlənmiş nəqliyyat vasitələrinin təhlükəsiz evakuasiyası.',
      },
      {
        title: 'Region–Bakı Servis Transferi İstəyənlər',
        description: 'Biləsuvardan Bakıdakı rəsmi servis və təmir mərkəzlərinə avtomobil göndərənlər.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis və ticarət avadanlığı',
      'Kommersiya malları və tikinti materialları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: '1 otaqlı mənzil əşyaları və fərdi kiçik yüklər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü və mebel daşınması.',
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
        bestFor: 'Sedan və hetçbek avtomobillərinin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri və krossoverlər.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri kilidlənmiş qəzalı nəqliyyat vasitələri.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Biləsuvar arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən furqon ölçüsü.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Biləsuvar marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Biləsuvara yükdaşıma necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Biləsuvardan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Biləsuvardan Bakı istiqamətinə daşınma şərtləri və nəqliyyat təyinatı operator tərəfindən dəqiqləşdirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Biləsuvara evakuator necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Biləsuvardan Bakıya evakuator çağırmaq mümkündür?',
        answer: 'Bəli, Biləsuvar ərazisindən Bakı istiqamətinə nasaz və ya qəzalı avtomobillərin təhlükəsiz daşınması həyata keçirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü (sedan, SUV, minivan və s.) və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },

  'baki-celilabad': {
    directAnswerYukdasima:
      'Bakıdan Cəlilabada yükdaşıma xidməti sifariş etmək mümkündür. Ev əşyaları, mebel və digər uyğun kommersiya yükləri üçün yükün həcminə uyğun nəqliyyat vasitəsi seçilə bilər. Cəlilabaddan Bakıya daşınma sifarişi üçün də operatorla əlaqə saxlamaq mümkündür. Sifariş: 050 231 17 28.',
    directAnswerEvakuator:
      'Bakıdan Cəlilabada evakuator xidməti sifariş etmək mümkündür. Nasaz və qəzalı avtomobillərin hidravlik platforma ilə daşınması üçün 24/7 sifariş qəbul edilir. Cəlilabaddan Bakıya evakuator sifarişi üzrə qiymət və xidmət detalları operator tərəfindən dəqiqləşdirilir. Əlaqə: 050 231 17 28.',
    targetAudienceYukdasima: [
      {
        title: 'Mənzil və Ev Köçürənlər',
        description: 'Bakı ilə Cəlilabad arasında daimi yaşayış yerini dəyişən və ev əşyalarını daşıtdırmaq istəyən ailələr.',
      },
      {
        title: 'Mebel Daşıdanlar',
        description: 'Fərdi mebel dəstlərini və məişət texnikasını etibarlı çatdırmaq istəyən vətəndaşlar.',
      },
      {
        title: 'Ofis və Kommersiya Daşınması',
        description: 'Cəlilabad istiqamətində ticarət malları, ofis inventarı və ya avadanlıq göndərən şirkətlər.',
      },
      {
        title: 'Region ilə Bakı Arasında Yük Göndərənlər',
        description: 'Hər iki istiqamətdə daşınma xidmətinə ehtiyacı olan fərdi və korporativ müştərilər.',
      },
    ],
    targetAudienceEvakuator: [
      {
        title: 'Avtomobili Nasaz Qalanlar',
        description: 'Magistral xəttində texniki nasazlıq səbəbindən hərəkətsiz qalan sürücülər.',
      },
      {
        title: 'Qəzalı Avtomobil Daşıdanlar',
        description: 'Zədələnmiş və təkərləri kilidlənmiş nəqliyyat vasitələrinin təhlükəsiz evakuasiyası.',
      },
      {
        title: 'Region–Bakı Servis Transferi İstəyənlər',
        description: 'Cəlilabaddan Bakıdakı rəsmi servis və təmir mərkəzlərinə avtomobil göndərənlər.',
      },
    ],
    cargoTypesYukdasima: [
      'Mebel dəstləri və ev əşyaları',
      'Məişət texnikası və elektronika',
      'Qablaşdırılmış köç qutuları və fərdi əşyalar',
      'Ofis və ticarət avadanlığı',
      'Kommersiya malları və tikinti materialları',
    ],
    vehicleTypesYukdasima: [
      {
        name: '3 Metrlik Furqon',
        specs: 'Yük həcmi: 10–12 m³ | Yük: 1.5 tona qədər',
        bestFor: '1 otaqlı mənzil əşyaları və fərdi yüklər.',
      },
      {
        name: '4.2 Metrlik Qapalı Furqon',
        specs: 'Yük həcmi: 16–18 m³ | Yük: 2.5 tona qədər',
        bestFor: 'Standart mənzil köçü və mebel daşınması.',
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
        bestFor: 'Sedan və hetçbek avtomobillərinin daşınması.',
      },
      {
        name: 'Gücləndirilmiş SUV Platforması',
        specs: 'Yük tutumu: 3.5 ton',
        bestFor: 'Yolsuzluq avtomobilləri və krossoverlər.',
      },
      {
        name: 'Köməkçi Dolli Qurğusu',
        specs: 'Təkər arabacıqları və bucurqad',
        bestFor: 'Təkəri kilidlənmiş qəzalı nəqliyyat vasitələri.',
      },
    ],
    pricingFactorsYukdasima: [
      { factor: 'Məsafə', detail: 'Bakı və Cəlilabad arasındakı rəsmi marşrut məsafəsi.' },
      { factor: 'Nəqliyyat Növü', detail: 'Yükün həcminə uyğun seçilən furqon ölçüsü.' },
      { factor: 'Fəhlə və Usta Xidməti', detail: 'Yükləmə, boşaltma və mebel sökülmə-quraşdırılma tələbatı.' },
      { factor: 'Mərtəbə Şərtləri', detail: 'Binalarda liftin olması və ya pilləkənlə daşıma məsafəsi.' },
    ],
    pricingFactorsEvakuator: [
      { factor: 'Daşıma Məsafəsi', detail: 'Bakı–Cəlilabad marşrutu üzrə kilometraj.' },
      { factor: 'Nəqliyyat Kateqoriyası', detail: 'Sedan, SUV, minivan (+10 AZN) və ya mikroavtobus.' },
      { factor: 'Nasazlıq Vəziyyəti', detail: 'Sərbəst diyirlənən və ya kilidli/qəzalı təkər (+5 AZN).' },
    ],
    yukdasimaFaqs: [
      {
        question: 'Bakıdan Cəlilabada yükdaşıma necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə yükün növünü, həcmini və ünvanları bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Cəlilabaddan Bakıya yükdaşıma mümkündür?',
        answer: 'Bəli, xidmət ikitərəflidir. Cəlilabaddan Bakı istiqamətinə daşınma şərtləri və nəqliyyat təyinatı operator tərəfindən dəqiqləşdirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Qiymət rəsmi tarif bazası, məsafə, seçilən avtomobilin ölçüsü və fəhlə xidmətinə olan tələbata əsasən formalaşır.',
      },
    ],
    evakuatorFaqs: [
      {
        question: 'Bakıdan Cəlilabada evakuator necə sifariş edilir?',
        answer: '050 231 17 28 nömrəsinə zəng edərək və ya WhatsApp vasitəsilə avtomobilin modelini və yerləşdiyi ünvanı bildirməklə sifariş verə bilərsiniz.',
      },
      {
        question: 'Cəlilabaddan Bakıya evakuator çağırmaq mümkündür?',
        answer: 'Bəli, Cəlilabad ərazisindən Bakı istiqamətinə nasaz və ya qəzalı avtomobillərin təhlükəsiz daşınması həyata keçirilir.',
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
        question: 'Qiymət necə müəyyən olunur?',
        answer: 'Xidmət haqqı məsafə, avtomobilin növü (sedan, SUV, minivan və s.) və kilidli təkər kimi xüsusi şərtlərə əsasən hesablanır.',
      },
    ],
  },
};
