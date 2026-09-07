export interface BakuDistrictServiceDetail {
  title: string;
  description: string;
}

export interface BakuDistrictFaq {
  question: string;
  answer: string;
}

export interface BakuDistrictVehicleRec {
  vehicle: string;
  specs: string;
  reason: string;
}

export interface BakuDistrictGeoProfile {
  id: string;
  name: string;
  fullName: string;
  badge: string;
  landmarks: string[];
  keyStreets: string[];
  buildingCharacteristics: string;
  trafficAndAccessNotes: string;
  responseTimeMinutes: string;
  
  // Direct Answers for Generative AI Search (ChatGPT, Gemini, Perplexity)
  directAnswerYukdasima: string;
  directAnswerEvakuator: string;

  // Local Intent Content
  yukdasimaOverview: string;
  evakuatorOverview: string;

  // Services offered in this district
  services: BakuDistrictServiceDetail[];

  // Recommended vehicle fleet for this district's geography/streets
  recommendedVehicles: BakuDistrictVehicleRec[];

  // Local FAQs
  faqsYukdasima: BakuDistrictFaq[];
  faqsEvakuator: BakuDistrictFaq[];
}

export const BAKU_DISTRICTS: BakuDistrictGeoProfile[] = [
  {
    id: 'yasamal',
    name: 'Yasamal',
    fullName: 'Yasamal rayonu',
    badge: 'Hündürmərtəbəli Binalar və Sıx Məhəllələr',
    landmarks: [
      'Elmlər Akademiyası',
      'İnşaatçılar metrosu',
      '20 Yanvar',
      'Yeni Yasamal',
      'Nizami metrosu',
      'Sovetski ərazisi (Mərkəzi Park)',
      'Yasamal Yaşayış Kompleksi (MİDA)',
    ],
    keyStreets: [
      'Həsən bəy Zərdabi prospekti',
      'Tbilisi prospekti',
      'Məhəmməd Xiyabani küçəsi',
      'Şərifzadə küçəsi',
      'Əsəd Əhmədov küçəsi',
      'Abbas Mirzə Şərifzadə',
    ],
    buildingCharacteristics:
      'Yeni Yasamal və Tbilisi pr. ətrafında müasir 16–20 mərtəbəli yeni tikililər, Elmlər və İnşaatçılar ərazisində isə 5 mərtəbəli köhnə layihəli (xruşovka/stalinka) və həyət evləri üstünlük təşkil edir.',
    trafficAndAccessNotes:
      'Pik saatlarda Şərifzadə və Tbilisi prospektində sıxlıq müşahidə olunur. Yeni Yasamalın bəzi həyətlərində avtomobil parklanması sıx olduğundan 3–4.2 metrlik manevrli furqonların seçilməsi tövsiyə olunur.',
    responseTimeMinutes: '15–20 dəqiqə',
    directAnswerYukdasima:
      'Bakının Yasamal rayonunda (Yeni Yasamal, Elmlər Akademiyası, İnşaatçılar, Tbilisi pr.) yükdaşıma xidməti necə sifariş edilir? Yasamal rayonunun bütün məhəllələri üzrə hər gün fasiləsiz mənzil köçürülməsi, mebel ustası və fəhlə xidməti göstərilir. Hündürmərtəbəli binalar və dar həyətlərə uyğun 3–4.2 metrlik qapalı yük maşınları təyin edilir. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə mənzilin yerləşdiyi ünvanı və əşyaların şəkillərini göndərərək dərhal qiymət təklifi ala bilərsiniz.',
    directAnswerEvakuator:
      'Yasamal rayonunda təcili evakuator necə çağırılır? Tbilisi prospekti, Şərifzadə küçəsi, 20 Yanvar dairəsi və Yeni Yasamal ərazisində 24/7 növbətçi hidravlik evakuatorlarımız fəaliyyət göstərir. Çağırışdan sonra 15–20 dəqiqə ərzində ünvana çataraq minik, SUV və ya qəzalı nəqliyyat vasitələrini təhlükəsiz platformaya qaldırırıq. Əlaqə: 050 250 31 70.',
    yukdasimaOverview:
      'Yasamal rayonunda yükdaşıma prosesində əsas diqqət binaların mərtəbə hündürlüyünə və həyətə giriş imkanlarına yetirilir. Yeni tikililərdə yük liftindən istifadə edilərək mebellər sürətlə daşınır, köhnə 5 mərtəbəli binalarda isə təcrübəli fəhlə briqadası pilləkənlərlə təhlükəsiz endirmə və qaldırmanı icra edir. Mebellər xüsusi qoruyucu materiallarla qablaşdırılır.',
    evakuatorOverview:
      'Yasamalın sıx küçələrində və yeraltı qarajlarında (parkinq) texniki nasazlıqla üzləşən sürücülər üçün alçaq bucaqlı platforma və köməkçi arabacıqlı (dolli) evakuatorlar ayrılır. Mühərriki, sürətlər qutusu və ya təkəri kilidlənmiş nəqliyyat vasitələri zədəsiz daşınır.',
    services: [
      {
        title: 'Mənzil və Ev Köçürülməsi',
        description: 'Yeni Yasamal və Elmlər ərazisində 1, 2, 3 və 4 otaqlı mənzillərin tam qablaşdırma ilə köçürülməsi.',
      },
      {
        title: 'Mebel Sökülməsi və Quraşdırılması',
        description: 'Qonaq, yataq və mətbəx mebellərinin peşəkar ustalar tərəfindən sökülüb yeni ünvanda yığılması.',
      },
      {
        title: 'Fəhlə Briqadası',
        description: 'Pilləkən və yük lifti ilə ağır məişət texnikası, piano və qutuların səliqəli daşınması.',
      },
      {
        title: 'Evakuator və Yol Yardımı',
        description: 'Tbilisi pr., 20 Yanvar və Şərifzadə küçələrində 24/7 15 dəqiqəlik operativ evakuasiya.',
      },
    ],
    recommendedVehicles: [
      {
        vehicle: '3 Metrlik Qapalı Ford Transit',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        reason: 'Yeni Yasamalın dar həyətlərinə və yeraltı qaraj girişlərinə rahat manevr üçün ən optimal maşındır.',
      },
      {
        vehicle: '4.2 Metrlik Mercedes Sprinter',
        specs: 'Həcm: 16 m³ | Yük: 2.5 ton',
        reason: '2–3 otaqlı mənzillərin bütün mebel və əşyalarını bir reyslə tam daşımaq üçün əlverişlidir.',
      },
    ],
    faqsYukdasima: [
      {
        question: 'Yasamalda yeni tikili binalara mebel və məişət texnikası daşınması necə təşkil olunur?',
        answer:
          'Sifariş zamanı binada işlək yük liftinin olub-olmaması nəzərə alınır. Mebellər usta tərəfindən sökülərək qoruyucu köpük və streçlə bükülür, lift vasitəsilə zədələnmədən mənzilə çatdırılır və yenidən quraşdırılır.',
      },
      {
        question: 'Yeni Yasamalın dar həyətlərində böyük yük maşını saxlamaq mümkündürmü?',
        answer:
          'Yeni Yasamal ərazisi üçün kompakt və manevrli 3–4.2 metrlik qapalı furqonlar təyin olunur. Sürücülərimiz həyətdə blok girişinə ən yaxın məsafədə dayanaraq daşıma məsafəsini minimuma endirir.',
      },
      {
        question: 'Yasamal daxili yükdaşıma xidmətinin qiyməti nə qədərdir?',
        answer:
          'Qiymət yükün həcminə, seçilən avtomobilə (3m/4m), fəhlə sayına və mərtəbə şərtlərinə görə formalaşır. Dəqiq hesablama üçün 050 250 31 70 ilə əlaqə saxlaya bilərsiniz.',
      },
    ],
    faqsEvakuator: [
      {
        question: 'Yasamal ərazisinə evakuator nə qədər vaxta gəlir?',
        answer:
          'Yasamal rayonunda (Tbilisi pr., İnşaatçılar, 20 Yanvar ətrafı) növbətçi evakuatorlarımız olduğu üçün çağırışdan sonra 15–20 dəqiqə ərzində ünvana çatır.',
      },
      {
        question: 'Yeraltı parkinqdən qəzalı və ya sönmüş maşını çıxarmaq mümkündürmü?',
        answer:
          'Bəli, hündürlüyü məhdud qarajlar üçün xüsusi alçaq platformalı və bucurqadlı evakuator texnikamız mövcuddur.',
      },
    ],
  },
  {
    id: 'nerimanov',
    name: 'Nərimanov',
    fullName: 'Nərimanov rayonu',
    badge: 'Biznes Mərkəzləri, Ofislər və Geniş Prospektlər',
    landmarks: [
      'Nəriman Nərimanov metrosu',
      'Heydər Əliyev Mərkəzi',
      'Gənclik Mall ətrafı',
      'Montin qəsəbəsi',
      'Ulduz metrosu ətrafı',
      'Dədə Qorqud Parkı yaxınlığı',
    ],
    keyStreets: [
      'Heydər Əliyev prospekti',
      'Təbriz küçəsi (keçmiş Çapayev)',
      'Ziya Bünyadov prospekti',
      'Fətəli xan Xoyski küçəsi',
      'Ağa Nemətulla küçəsi',
      'Əhməd Rəcəbli küçəsi',
      'Akademik Həsən Əliyev küçəsi',
    ],
    buildingCharacteristics:
      'Geniş biznes mərkəzləri, plazalar, Əhməd Rəcəbli mebel və ofis salonları, Heydər Əliyev pr. boyunca müasir hündürmərtəbəli yaşayış kompleksləri və Montində klassik yaşayış binaları.',
    trafficAndAccessNotes:
      'Geniş prospektlər yük maşınlarının rahat hərəkətinə imkan verir. Əhməd Rəcəbli və Təbriz küçələrində gündüz saatlarında parklanma sıxlığı nəzərə alınaraq operativ yükləmə zonası seçilir.',
    responseTimeMinutes: '15–20 dəqiqə',
    directAnswerYukdasima:
      'Nərimanov rayonunda (Təbriz küç., N.Nərimanov metrosu, Əhməd Rəcəbli, Montin, Heydər Əliyev pr.) yükdaşıma və ofis köçürülməsi necə sifariş edilir? Nərimanov rayonunun bütün ofis və yaşayış binaları üçün korporativ köç, mebel daşınması və fəhlə xidməti təklif olunur. 2 metrdən 6 metrədək qapalı furqonlar və təcrübəli ustalarla xidmət göstərilir. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp-dan istifadə edə bilərsiniz.',
    directAnswerEvakuator:
      'Nərimanov rayonunda 24/7 evakuator necə çağırılır? Heydər Əliyev prospekti, Ziya Bünyadov, Koroğlu körpüsü yaxınlığı və Əhməd Rəcəbli küçəsində növbətçi evakuatorlarımız 15 dəqiqəyə çatır. Minik, SUV, biznes-klass və qəzalı maşınlar üçün alçaq bucaqlı hidravlik platforma təmin edilir. Əlaqə: 050 250 31 70.',
    yukdasimaOverview:
      'Nərimanov rayonunda həm fərdi mənzil köçləri, həm də irimiqyaslı ofis və ticarət obyektlərinin daşınması yüksək tələbatdadır. Əhməd Rəcəbli və Təbriz küçələrindəki biznes mərkəzlərində iş prosesini dayandırmadan axşam və ya həftəsonu qrafiki ilə sənədlərin, serverlərin və ofis mebellərinin təhlükəsiz köçürülməsi təmin edilir.',
    evakuatorOverview:
      'Heydər Əliyev və Ziya Bünyadov prospektlərində yüksək sürətli hərəkət zolaqlarında baş verən qəza və ya nasazlıqlarda operativ təhlükəsizlik baryeri və sürətli hidravlik yükləmə ilə avtomobil dərhal təxliyə edilir.',
    services: [
      {
        title: 'Korporativ Ofis Köçürülməsi',
        description: 'Biznes mərkəzləri, mebel və kompüter avadanlıqlarının nömrələnmiş qablaşdırma ilə köçü.',
      },
      {
        title: 'Mənzil və Yaşayış Kompleksləri',
        description: 'Təbriz küçəsi və Heydər Əliyev pr. boyunca müasir binalardan tam mənzil daşınması.',
      },
      {
        title: 'Mebel Mağazaları və Sərgi Malları',
        description: 'Əhməd Rəcəblidəki salonlardan mebellərin müştərilərin ünvanlarına çatdırılması və montajı.',
      },
      {
        title: 'Magistral və Şəhərdaxili Evakuator',
        description: 'Ziya Bünyadov və Heydər Əliyev prospektlərində 24/7 operativ texniki yardım.',
      },
    ],
    recommendedVehicles: [
      {
        vehicle: '4.2 Metrlik Mercedes Sprinter',
        specs: 'Həcm: 16 m³ | Yük: 2.5 ton',
        reason: 'Standart mənzillər və orta həcmli ofis avadanlıqları üçün ən populyar seçimdir.',
      },
      {
        vehicle: '5.2–6 Metrlik İri Furqon',
        specs: 'Həcm: 24–30 m³ | Yük: 3.5 ton',
        reason: 'Böyük ofislər, anbar malları və 4 otaqlı geniş mənzil köçləri üçün idealdır.',
      },
    ],
    faqsYukdasima: [
      {
        question: 'Nərimanovda ofis köçürülməsi qeyri-iş saatlarında aparıla bilərmi?',
        answer:
          'Bəli, şirkətinizin iş ahəngi pozulmasın deyə ofis köçürülməsini axşam saatlarında və ya şənbə-bazar günləri tam heyətlə həyata keçiririk.',
      },
      {
        question: 'Təbriz küçəsindəki yeni binalara mebel daşınması zamanı lift qorunurmu?',
        answer:
          'Bəli, mebel və ağır əşyalar qablaşdırılır və bina liftlərinə heç bir cızıq və ya zərər dəymədən səliqə ilə daşınır.',
      },
      {
        question: 'Nərimanovdan digər rayonlara yükdaşıma neçəyədir?',
        answer:
          'Rayondaxili və digər Bakı rayonlarına tariflər şəffafdır. İlkin qiymət üçün 050 250 31 70 ilə dərhal əlaqə saxlayın.',
      },
    ],
    faqsEvakuator: [
      {
        question: 'Heydər Əliyev prospektində xarab olan maşın üçün evakuator nə qədər vaxta çatır?',
        answer:
          'Heydər Əliyev və Ziya Bünyadov prospektləri üzrə daimi növbətçi maşınlarımız 15 dəqiqə ərzində ünvana çatır.',
      },
      {
        question: 'Lüks və idman avtomobilləri üçün evakuator uyğundurmu?',
        answer:
          'Bəli, alçaq asqılı və bahalı avtomobillər üçün xüsusi sürüşən alçaq bucaqlı platformalarımız tətbiq olunur.',
      },
    ],
  },
  {
    id: 'nesimi',
    name: 'Nəsimi',
    fullName: 'Nəsimi rayonu',
    badge: 'Mərkəzi Arxitektura, Klinika və Sıx Məhəllələr',
    landmarks: [
      '28 May metrosu',
      'Nizami Gəncəvi metrosu yaxınlığı',
      'Memar Əcəmi metrosu',
      'Nəsimi bazarı ətrafı',
      'Azərbaycan Tibb Universiteti ətrafı',
      'Sirk ətrafı',
      'Qış Parkı yaxınlığı',
    ],
    keyStreets: [
      'Səməd Vurğun küçəsi',
      'Bakıxanov küçəsi',
      'Cəlil Məmmədquluzadə küçəsi (Papanin)',
      'Rəşid Behbudov küçəsi',
      'Hənifə Ələsgərov küçəsi',
      'Mirəli Qaşqay küçəsi',
      'Asif Məhərrəmov küçəsi',
      'Şamil Əzizbəyov küçəsi',
    ],
    buildingCharacteristics:
      'Mərkəz hissədə qədim daş arxitekturalı binalar (yüksək tavanlı, liftsiz), 28 May ətrafında elit yeni binalar, Tibb Universiteti və Əcəmi tərəfdə isə 9 mərtəbəli və yeni komplekslər.',
    trafficAndAccessNotes:
      'Mərkəzi küçələrdə gün ərzində sıx nəqliyyat və parklanma qıtlığı var. Yükləmə-boşaltma üçün sürücülərimiz ən optimal park yerini əvvəlcədən koordinasiya edir.',
    responseTimeMinutes: '15–20 dəqiqə',
    directAnswerYukdasima:
      'Nəsimi rayonunda (28 May, Tibb Universiteti, Bakıxanov küç., Memar Əcəmi, Səməd Vurğun) yükdaşıma xidməti necə təşkil edilir? Nəsimi rayonunun tarixi və yeni binaları üçün xüsusi qablaşdırma, mebel ustası və peşəkar fəhlə xidməti göstərilir. Mərkəzi küçələrin dar həyətlərinə uyğun 3–4 metrlik yük maşınları ayrılır. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə müraciət edə bilərsiniz.',
    directAnswerEvakuator:
      'Nəsimi rayonunda operativ evakuator xidməti varmı? Bəli, 28 May, Bakıxanov küçəsi, Sirk ətrafı və Memar Əcəmi zonasında 24/7 növbətçi evakuatorlarımız 15–20 dəqiqəyə ünvana çatır. Təkəri və ya transmissiyası kilidlənmiş qəzalı avtomobillər hidravlik platforma ilə daşınır. Əlaqə: 050 250 31 70.',
    yukdasimaOverview:
      'Nəsimi rayonunun arxitektur binalarında tavanların hündür və pilləkənlərin geniş olması mebel daşınmasında xüsusi ehtiyat tələb edir. Köhnə və yeni binalarda antikvar əşyalar, musiqi alətləri (pianino, royal) və həssas mebellər çoxqatlı köpüklü materiallarla qorunaraq daşınır.',
    evakuatorOverview:
      'Nəsimi rayonunun dar küçələrində və sıx parklanmış məhəllələrində qalan avtomobillər üçün yüksək manevrli evakuator texnikası və xüsusi köməkçi arabacıqlar tətbiq edilir.',
    services: [
      {
        title: 'Mərkəzi Mənzil və Tarixi Binalar',
        description: 'Yüksək tavanlı klassik və premium yeni tikililərdə səliqəli ev köçürülməsi.',
      },
      {
        title: 'Piano və Xüsusi Ağır Əşyalar',
        description: 'Pianino, seyf və tibbi avadanlıqların xüsusi daşıyıcı kəmərlərlə daşınması.',
      },
      {
        title: 'Mebel Montajı və Qablaşdırma',
        description: 'Bütün növ modul və fərdi sifariş mebellərinin peşəkar sökülüb yığılması.',
      },
      {
        title: 'Mərkəz Üzrə Evakuator',
        description: '28 May, Bakıxanov və Səməd Vurğun küçələrində 24/7 təcili avtomobil daşıma.',
      },
    ],
    recommendedVehicles: [
      {
        vehicle: '3 Metrlik Ford Transit Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        reason: 'Nəsimi rayonunun mərkəzi dar küçələrinə və həyətlərinə daxil olmaq üçün ən çevik nəqliyyatdır.',
      },
      {
        vehicle: '4 Metrlik Qapalı Sprinter',
        specs: 'Həcm: 15 m³ | Yük: 2.2 ton',
        reason: 'Standart mənzil əşyalarını bir dəfəyə təhlükəsiz köçürmək üçün idealdır.',
      },
    ],
    faqsYukdasima: [
      {
        question: 'Nəsimi rayonundakı köhnə arxitektur binalarda lift olmadıqda daşıma necə həyata keçirilir?',
        answer:
          'Təcrübəli fəhlə heyətimiz pilləkənlərlə daşıma üçün xüsusi yumşaq kəmərlərdən istifadə edir və əşyaların divarlara və pilləkən sürahilərinə toxunmamasına tam nəzarət edir.',
      },
      {
        question: 'Pianino və ya ağır seyflərin daşınması mümkündürmü?',
        answer:
          'Bəli, piano və ağır qabaritli əşyalar üçün peşəkar ustalar və 4–6 nəfərlik xüsusi fəhlə briqadası cəlb olunur.',
      },
    ],
    faqsEvakuator: [
      {
        question: 'Nəsimi rayonunda tıxac vaxtı evakuator nə qədər vaxta çatır?',
        answer:
          'Rayon ərazisindəki növbətçi texnikamız naviqasiya ilə ən yaxın alternativ yollardan istifadə edərək 15–20 dəqiqəyə çatır.',
      },
    ],
  },
  {
    id: 'xetai',
    name: 'Xətai',
    fullName: 'Xətai rayonu',
    badge: 'Ağ Şəhər, Yeni Yaşayış Kompleksləri və Geniş Məhəllələr',
    landmarks: [
      'Xətai metrosu',
      'Bakı Ağ Şəhər (White City)',
      'Həzi Aslanov metrosu',
      'Əhmədli metrosu',
      'Ukrayna dairəsi',
      'Gənclik parkı yaxınlığı',
      'Köhnə Günəşli ərazisi',
    ],
    keyStreets: [
      '8 Noyabr prospekti (keçmiş Nobel pr.)',
      'Babək prospekti',
      'Məhəmməd Hadi küçəsi',
      'Sarayevo küçəsi',
      'General Şıxlinski küçəsi',
      'Gəncə prospekti',
      'Xocalı prospekti',
      'Yusif Səfərov küçəsi',
    ],
    buildingCharacteristics:
      'Ağ Şəhərdə müasir Avropa tipli elit binalar, Əhmədli və Həzi Aslanovda nəhəng yeni tikili kompleksləri (16–22 mərtəbə), geniş Leninqrad və Kiyev layihəli 9 mərtəbəli binalar.',
    trafficAndAccessNotes:
      'Babək və 8 Noyabr prospektləri genişdir, böyük yük maşınları və evakuatorlar üçün əla logistika imkanı yaradır. Əhmədli məhəllə daxili yollarında axşam saatlarında parklanma sıxlığı olur.',
    responseTimeMinutes: '15–20 dəqiqə',
    directAnswerYukdasima:
      'Xətai rayonunda (Ağ Şəhər, Əhmədli, Həzi Aslanov, 8 Noyabr pr., Babək pr.) yükdaşıma necə sifariş edilir? Xətai rayonunun bütün yeni kompleksləri və yaşayış məhəllələri üzrə gündəlik evdən-evə köçürülmə, mebel ustası və fəhlə xidmətləri mövcuddur. 2 metrdən 7 metrədək geniş yük maşınları ilə xidmət göstərilir. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə yazaraq dərhal qiymət öyrənə bilərsiniz.',
    directAnswerEvakuator:
      'Xətai rayonunda 24/7 evakuator necə çağırılır? Babək prospekti, 8 Noyabr pr., Nobel körpüsü və Əhmədli dairəsində növbətçi hidravlik evakuatorlarımız 15 dəqiqəyə çatır. Minik, SUV və qəzalı nəqliyyat vasitələri zərərsiz platformaya qaldırılır. Əlaqə: 050 250 31 70.',
    yukdasimaOverview:
      'Xətai rayonu Bakının ən sıx məskunlaşmış və ən çox yeni mənzil köçü həyata keçirilən rayonlarındandır. Ağ Şəhərdəki müasir komplekslərdən tutmuş Həzi Aslanov və Əhmədlidəki çoxsaylı yeni binalara qədər bütün mənzillər üçün iritutumlu qapalı furqonlar və təcrübəli mebel montajçıları təmin edilir.',
    evakuatorOverview:
      'Babək və 8 Noyabr prospektlərində avtomobil salonları, təkər mərkəzləri və intensiv hərəkət axını olduğundan növbətçi evakuatorlarımız hər növ minik və yolsuzluq avtomobillərini dərhal servislərə və ya qeyd olunan ünvana daşıyır.',
    services: [
      {
        title: 'Ağ Şəhər və Premium Komplekslər',
        description: 'Həssas əşyaların qoruyucu materiallarla qablaşdırılması və VIP daşıma xidməti.',
      },
      {
        title: 'Əhmədli və Həzi Aslanov Mənzil Köçü',
        description: '2, 3 və 4 otaqlı mənzillərin tam qablaşdırılması və sərfəli fəhlə briqadası ilə köçürülməsi.',
      },
      {
        title: 'Babək Prospekti Ticarət Daşımaları',
        description: 'Avto ehtiyat hissələri, mebel və kommersiya mallarının mağaza və anbarlara çatdırılması.',
      },
      {
        title: '24/7 Operativ Evakuator',
        description: '8 Noyabr və Babək prospektlərində operativ avtomobil evakuasiyası.',
      },
    ],
    recommendedVehicles: [
      {
        vehicle: '4.2 Metrlik Qapalı Sprinter',
        specs: 'Həcm: 16 m³ | Yük: 2.5 ton',
        reason: 'Əhmədli və Ağ Şəhərdə 2–3 otaqlı mənzil köçləri üçün ən universal avtomobildir.',
      },
      {
        vehicle: '5.5–6 Metrlik İri Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 ton',
        reason: 'Böyük 4 otaqlı mənzil və ya dubleks mənzillərin tək reyslə köçürülməsi üçün idealdır.',
      },
    ],
    faqsYukdasima: [
      {
        question: 'Bakı Ağ Şəhər ərazisində mənzil köçürülməsi üçün xüsusi şərtlər varmı?',
        answer:
          'Ağ Şəhər binalarında yeraltı qaraj və təmiz yük liftləri mövcuddur. Əşyalar döşəmə və divarlara zərər dəyməməsi üçün xüsusi örtüklərlə qablaşdırılaraq daşınır.',
      },
      {
        question: 'Əhmədli və Həzi Aslanovda köç üçün hansı vaxt daha əlverişlidir?',
        answer:
          'Günün istənilən saatında xidmət göstəririk, lakin səhər saat 09:00–12:00 və ya günorta 14:00–17:00 aralığı həyətlərdə parklanma baxımından daha rahatdır.',
      },
    ],
    faqsEvakuator: [
      {
        question: 'Babək prospektində evakuator çağırmaq nə qədər vaxt aparır?',
        answer:
          'Babək prospekti boyu mütəmadi növbətçi evakuatorlarımız olduğu üçün çağırışa reaksiya müddəti 10–15 dəqiqədir.',
      },
    ],
  },
  {
    id: 'sebail',
    name: 'Səbail',
    fullName: 'Səbail rayonu',
    badge: 'Mərkəzi Sahil, Tarixi İçərişəhər və Badamdar Villaları',
    landmarks: [
      'İçərişəhər metrosu',
      'Sahil metrosu',
      'Badamdar qəsəbəsi',
      'Bayıl qəsəbəsi',
      '20-ci Sahə',
      'Fəvvarələr Meydanı',
      'Bibiheybət ərazisi',
    ],
    keyStreets: [
      'Neftçilər prospekti',
      'İstiqlaliyyət küçəsi',
      'Nizami küçəsi (Tarqovı)',
      'Badamdar şossesi',
      'Qurban Abbasov küçəsi (Bayıl)',
      'Salyan şossesi',
      'Əziz Əliyev küçəsi',
    ],
    buildingCharacteristics:
      'Mərkəzdə qədim tarixi və arxitektur binalar, İçərişəhərdə dar qala küçələri, Bayılda terraslı evlər, Badamdarda isə lüks fərdi villalar və yeni tikili binalar.',
    trafficAndAccessNotes:
      'İçərişəhər və Fəvvarələr meydanı ətrafında avtomobil girişi məhdudiyyətlidir. Badamdar və Bayıl yoxuşlarında güclü mühərrikli və etibarlı əyləc sistemli nəqliyyat vasitələri tələb olunur.',
    responseTimeMinutes: '15–20 dəqiqə',
    directAnswerYukdasima:
      'Səbail rayonunda (Badamdar, Bayıl, İçərişəhər, Sahil, Neftçilər pr.) yükdaşıma və villa köçürülməsi necə sifariş edilir? Səbail rayonunun həm tarixi mərkəz binaları, həm də Badamdar və Bayıldakı fərdi villaları üçün xüsusi daşıma briqadası və təmiz qapalı furqonlar təmin olunur. Mebellərin qoruyucu qablaşdırılması və montajı daxildir. Sifariş üçün 050 250 31 70 nömrəsi ilə əlaqə saxlayın və ya WhatsApp-dan yazın.',
    directAnswerEvakuator:
      'Səbail rayonunda evakuator necə çağırılır? Neftçilər prospekti, Badamdar yoxuşu, Bayıl və Salyan şossesində 24/7 növbətçi evakuatorlarımız 15 dəqiqə ərzində ünvana çatır. Dağətəyi yoxuşlarda və dar küçələrdə güclü hidravlik platforma ilə təhlükəsiz daşıma təmin olunur. Əlaqə: 050 250 31 70.',
    yukdasimaOverview:
      'Səbail rayonunda daşıma xidməti iki fərqli xarakter daşıyır: Mərkəzi Sahil və İçərişəhər zonasında dar keçidlərə uyğun manevrli kiçik yük maşınları ilə antikvar və mənzil əşyaları daşınır; Badamdar və Bayılda isə böyük həcmli villaların, bağ mebellərinin və bəzək əşyalarının iritutumlu furqonlarla təhlükəsiz köçürülməsi həyata keçirilir.',
    evakuatorOverview:
      'Badamdar eniş-yoxuşlarında və Salyan şossesində qəzalı və ya əyləc sistemi sıradan çıxmış nəqliyyat vasitələri üçün güclü elektrik bucurqadlı və dördnöqtəli təkər fiksasiyalı xüsusi evakuatorlar fəaliyyət göstərir.',
    services: [
      {
        title: 'Badamdar Villa və Həyət Evləri',
        description: 'Böyük həcmli villa mebellərinin, həyət ləvazimatlarının və məişət texnikasının köçürülməsi.',
      },
      {
        title: 'Mərkəz və Tarixi Binalar',
        description: 'Sahil və Tarqovı ətrafındakı arxitektur mənzillərin ehtiyatla daşınması.',
      },
      {
        title: 'İçərişəhər Dar Küçələri Üçün Xüsusi Xidmət',
        description: 'Girişi çətin olan qala küçələrinə uyğunlaşdırılmış kompakt yük maşınları.',
      },
      {
        title: 'Yoxuş və Sahilboyu Evakuator',
        description: 'Badamdar şossesi və Neftçilər prospektində 24/7 operativ texniki yardım.',
      },
    ],
    recommendedVehicles: [
      {
        vehicle: '3 Metrlik Kompakt Furqon',
        specs: 'Həcm: 9–10 m³ | Yük: 1.5 ton',
        reason: 'İçərişəhər və mərkəzi Səbail küçələrinə rahat giriş üçün əvəzolunmazdır.',
      },
      {
        vehicle: '5 Metrlik İri Tutumlu Iveco Furqon',
        specs: 'Həcm: 22 m³ | Yük: 3.5 ton',
        reason: 'Badamdar villalarının və çoxsaylı əşyaların bir reyslə daşınması üçün optimaldır.',
      },
    ],
    faqsYukdasima: [
      {
        question: 'İçərişəhər daxilinə yük maşınının girişi necə tənzimlənir?',
        answer:
          'İçərişəhərin dar qapılarına və döngələrinə uyğun ölçüdə kompakt furqonlar göndərilir və icazəli giriş qaydalarına tam riayət olunur.',
      },
      {
        question: 'Badamdarda böyük villaların köçürülməsi neçə gün çəkir?',
        answer:
          'Standart villaların köçürülməsi böyük 5–6 metrlik furqonlar və geniş fəhlə briqadası ilə 1 gün ərzində tam başa çatdırılır.',
      },
    ],
    faqsEvakuator: [
      {
        question: 'Badamdar yoxuşunda xarab olan avtomobil necə yüklənir?',
        answer:
          'Avtomobil güclü elektrik bucurqadı və təhlükəsizlik dayaqları vasitəsilə sürüşmə riski olmadan hidravlik platformaya qaldırılır.',
      },
    ],
  },
  {
    id: 'bineqedi',
    name: 'Binəqədi',
    fullName: 'Binəqədi rayonu',
    badge: 'Mikrorayonlar, Biləcəri və Dərnəgül Sənaye Zonası',
    landmarks: [
      'Azadlıq Prospekti metrosu',
      'Dərnəgül metrosu',
      '6, 7, 8 və 9-cu mikrorayonlar',
      'Biləcəri qəsəbəsi',
      'Rəsulzadə (Pasyolka Kirov)',
      'Binəqədi qəsəbəsi (Mərkəz)',
      'Xocahəsən ətrafı',
    ],
    keyStreets: [
      'Azadlıq prospekti',
      'Ziya Bünyadov prospekti (Dərnəgül şossesi)',
      'Şövkət Məmmədova küçəsi',
      'Cəfər Xəndan küçəsi',
      'İbrahimpaşa Dadaşov küçəsi',
      'Biləcəri–Binəqədi şossesi',
      'Süleyman Sani Axundov küçəsi',
    ],
    buildingCharacteristics:
      '6, 7, 8 və 9-cu mikrorayonlarda 9 mərtəbəli Leninqrad/Kiyev və yeni tikili binalar, Biləcəri və Binəqədi qəsəbəsində geniş fərdi həyət evləri massivləri, Dərnəgüldə isə böyük sənaye və tikinti materialları anbarları.',
    trafficAndAccessNotes:
      'Dərnəgül şossesi və Azadlıq prospektində hərəkət rahatdır. Mikrorayon daxili həyətlərdə parklanma sıxlığı olur, lakin təcrübəli sürücülərimiz ən yaxın giriş nöqtəsini seçir.',
    responseTimeMinutes: '15–20 dəqiqə',
    directAnswerYukdasima:
      'Binəqədi rayonunda (Azadlıq pr., 6, 7, 8, 9-cu mikrorayonlar, Biləcəri, Dərnəgül) yükdaşıma xidməti necə sifariş edilir? Binəqədi rayonunun həm çoxmərtəbəli mikrorayon binaları, həm də Biləcəri və Binəqədi kəndindəki həyət evləri üçün mənzil köçürülməsi, mebel ustası və fəhlə briqadası təqdim edilir. 2 metrdən 6 metrədək yük maşınları ilə xidmət göstərilir. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp-dan yaza bilərsiniz.',
    directAnswerEvakuator:
      'Binəqədi rayonunda 24/7 evakuator necə çağırılır? Azadlıq prospekti, Dərnəgül yolu, Biləcəri enişi və Bakı-Sumqayıt şossesi çıxışında növbətçi evakuatorlarımız 15 dəqiqəyə çatır. Minik, SUV, mikroavtobus və qəzalı nəqliyyat üçün hidravlik platforma ayrılır. Əlaqə: 050 250 31 70.',
    yukdasimaOverview:
      'Binəqədi rayonunda daşıma xidmətləri geniş spektri əhatə edir: 6, 7, 8 və 9-cu mikrorayonlarda çoxmərtəbəli binalardan ev köçləri, Dərnəgül sənaye zonasından tikinti materialları və istehsalat avadanlıqlarının daşınması, Biləcəridə isə fərdi həyət evlərinin tam köçürülməsi təşkil edilir.',
    evakuatorOverview:
      'Dərnəgül şossesi və Bakı-Quba/Sumqayıt magistralına çıxış nöqtələrində növbətçilik edən evakuatorlarımız həm şəhərdaxili, həm də rayonlararası yolda qalan avtomobillərə operativ kömək edir.',
    services: [
      {
        title: 'Mikrorayon Mənzil Köçü',
        description: '6, 7, 8 və 9-cu mikrorayonlarda 9 mərtəbəli və yeni binalardan mənzil əşyalarının köçü.',
      },
      {
        title: 'Biləcəri və Binəqədi Həyət Evləri',
        description: 'Fərdi yaşayış evləri üçün mebel və böyük məişət texnikasının təhlükəsiz daşınması.',
      },
      {
        title: 'Dərnəgül Tikinti və Anbar Yükləri',
        description: 'Tikinti materialları, profil, boya və avadanlıqların qapalı və ya bortlu maşınlarla çatdırılması.',
      },
      {
        title: '24/7 Binəqədi Evakuatoru',
        description: 'Azadlıq pr., Dərnəgül və Biləcəri zonasında sürətli texniki evakuasiya.',
      },
    ],
    recommendedVehicles: [
      {
        vehicle: '3–4 Metrlik Qapalı Sprinter',
        specs: 'Həcm: 12–16 m³ | Yük: 2 ton',
        reason: 'Mikrorayon həyətlərinə və Biləcəri küçələrinə rahat giriş üçün çox əlverişlidir.',
      },
      {
        vehicle: 'Bortlu və ya Uzun Qapalı Furqon',
        specs: 'Həcm: 20–25 m³ | Yük: 3.5 ton',
        reason: 'Dərnəgül tikinti malları və böyük həcmli həyət evi əşyaları üçün ən yaxşı seçimdir.',
      },
    ],
    faqsYukdasima: [
      {
        question: 'Dərnəgüldən tikinti materiallarının çatdırılması üçün maşın sifariş etmək olarmı?',
        answer:
          'Bəli, Dərnəgül bazarından alacağınız taxta, alçipan, kafel və digər təmir materiallarını istənilən ünvana daşımaq üçün bortlu və ya furqon maşınlar təqdim edirik.',
      },
      {
        question: 'Mikrorayonlarda 9 mərtəbəli binalarda lift xarab olarsa daşıma necə aparılır?',
        answer:
          'Fəhlə briqadamız pilləkənlərlə mərtəbə sayına uyğun olaraq əşyaları ehtiyatla qaldırır və ya endirir.',
      },
    ],
    faqsEvakuator: [
      {
        question: 'Biləcəri enişində və ya Dərnəgüldə evakuator nə qədər vaxta gəlir?',
        answer:
          'Binəqədi və Dərnəgül üzrə növbətçi maşınlarımız 15 dəqiqə ərzində hadisə yerinə çatır.',
      },
    ],
  },
  {
    id: 'nizami',
    name: 'Nizami',
    fullName: 'Nizami rayonu',
    badge: 'Qara Qarayev, Neftçilər, 8-ci km Bazarı və Keşlə',
    landmarks: [
      'Qara Qarayev metrosu',
      'Neftçilər metrosu',
      'Xalqlar Dostluğu metrosu',
      'Koroğlu metrosu yaxınlığı',
      '8-ci kilometr bazarı (Vasmoy)',
      'Keşlə qəsəbəsi',
      'Heydər Əliyev prospekti kəsişməsi',
    ],
    keyStreets: [
      'Qara Qarayev prospekti',
      'Rüstəm Rüstəmov küçəsi',
      'Bəkir Çobanzadə küçəsi',
      'Şərifli küçəsi',
      'Naxçıvanski küçəsi',
      'Heydər Əliyev prospekti (Nizami hissəsi)',
      'Babək prospekti (Nizami hissəsi)',
    ],
    buildingCharacteristics:
      'Qara Qarayev və Neftçilər boyu çoxsaylı yeni tikili kompleksləri, klassik 5 və 9 mərtəbəli yaşayış binaları, Keşlədə fərdi həyət evləri və anbar zonaları.',
    trafficAndAccessNotes:
      'Qara Qarayev pr. və 8-ci km bazarı ətrafında xüsusilə həftəsonları nəqliyyat və piyada hərəkəti sıxdır. Təcrübəli sürücülərimiz alternativ məhəllə yollarından istifadə edir.',
    responseTimeMinutes: '15–20 dəqiqə',
    directAnswerYukdasima:
      'Nizami rayonunda (Qara Qarayev, Neftçilər, Xalqlar Dostluğu, Keşlə, 8-ci km) yükdaşıma xidməti necə sifariş edilir? Nizami rayonunun bütün məhəllələri üzrə mənzil köçürülməsi, mebel ustası və fəhlə xidməti fəaliyyət göstərir. 2 metrdən 6 metrədək qapalı furqonlar və təcrübəli ustalar təyin olunur. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə müraciət edə bilərsiniz.',
    directAnswerEvakuator:
      'Nizami rayonunda evakuator necə çağırılır? Qara Qarayev prospekti, Koroğlu qovşağı, Babək pr. və Neftçilər ərazisində 24/7 növbətçi evakuatorlarımız 15 dəqiqəyə çatır. Minik maşınları, SUV və qəzalı nəqliyyat vasitələri hidravlik platforma ilə daşınır. Əlaqə: 050 250 31 70.',
    yukdasimaOverview:
      'Nizami rayonunda mənzil köçürülməsi və ticarət obyektlərinin daşınması gündəlik həyata keçirilir. Qara Qarayev və Neftçilər metrosu ətrafındakı çoxsaylı yeni binalarda mebellərin qablaşdırılması, yük liftləri ilə daşınması və yeni ünvanda quraşdırılması təmin edilir.',
    evakuatorOverview:
      'Koroğlu nəqliyyat qovşağı və Qara Qarayev prospekti boyunca nasaz qalan avtomobillərə növbətçi texnikamız ən qısa müddətdə operativ yardım göstərir.',
    services: [
      {
        title: 'Mənzil və Ev Köçü',
        description: 'Qara Qarayev və Neftçilərdə 1–4 otaqlı mənzillərin tam qablaşdırma ilə köçürülməsi.',
      },
      {
        title: 'Mebel Montajı və Usta Xidməti',
        description: 'Qarderob, çarpayı və mətbəx mebellərinin peşəkar sökülüb yığılması.',
      },
      {
        title: '8-ci km və Ticarət Malları Daşınması',
        description: 'Ticarət obyektləri və mağazalar üçün malların operativ çatdırılması.',
      },
      {
        title: '24/7 Nizami Evakuatoru',
        description: 'Koroğlu və Qara Qarayevdə operativ evakuasiya və yol yardımı.',
      },
    ],
    recommendedVehicles: [
      {
        vehicle: '3 Metrlik Ford Transit',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        reason: 'Nizami rayonunun məhəllə daxili yollarına və bazaryanı ərazilərə rahat giriş təmin edir.',
      },
      {
        vehicle: '4.2 Metrlik Qapalı Sprinter',
        specs: 'Həcm: 16 m³ | Yük: 2.5 ton',
        reason: 'Standart ailə mənzilinin bütün əşyalarını bir dəfəyə daşımaq üçün əlverişlidir.',
      },
    ],
    faqsYukdasima: [
      {
        question: 'Qara Qarayevdəki yeni binalara mebel daşınması necə aparılır?',
        answer:
          'Mebellər ustalar tərəfindən sökülür, streç və köpük plyonka ilə bükülür, yük lifti ilə mənzilə qaldırılaraq quraşdırılır.',
      },
      {
        question: 'Keşlə qəsəbəsindəki həyət evlərinə yük maşını daxil ola bilirmi?',
        answer:
          'Bəli, Keşlənin dar küçələri üçün xüsusi yığcam və manevrli 3 metrlik yük maşınlarımız cəlb olunur.',
      },
    ],
    faqsEvakuator: [
      {
        question: 'Koroğlu körpüsü yaxınlığında qalan maşına evakuator nə qədər vaxta çatır?',
        answer:
          'Koroğlu qovşağı yaxınlığındakı növbətçi evakuatorumuz 10–15 dəqiqə ərzində çatır.',
      },
    ],
  },
  {
    id: 'sabuncu',
    name: 'Sabunçu',
    fullName: 'Sabunçu rayonu',
    badge: 'Bakıxanov, Zabrat, Maştağa, Bilgəh və Bağ Sahələri',
    landmarks: [
      'Bakıxanov qəsəbəsi (Razin)',
      'Sabunçu qəsəbəsi mərkəz',
      'Zabrat qəsəbəsi',
      'Maştağa qəsəbəsi',
      'Bilgəh və Nardaran bağları',
      'Pirşağı və Kürdəxanı',
      'Koroğlu çıxışı və Aeroport yolu',
    ],
    keyStreets: [
      'Heydər Əliyev prospekti (Aeroport şossesi)',
      'Sakif Qocayev küçəsi (Bakıxanov)',
      'Zabrat–Məhəmmədi şossesi',
      'Maştağa–Buzovna yolu',
      'Yavər Əliyev küçəsi',
      'Kürdəxanı şossesi',
    ],
    buildingCharacteristics:
      'Bakıxanovda çoxmərtəbəli binalar və yeni komplekslər; Zabrat, Maştağa, Bilgəh və Nardaranda isə geniş fərdi bağ evləri, villalar və həyət təsərrüfatları.',
    trafficAndAccessNotes:
      'Aeroport şossesi genişdir və sürətli hərəkət imkanı verir. Kəndarası yollarda bəzi küçələr torpaq və ya dar ola bilər, bu səbəbdən uyğun klirensli yük maşınları göndərilir.',
    responseTimeMinutes: '15–25 dəqiqə',
    directAnswerYukdasima:
      'Sabunçu rayonunda (Bakıxanov, Zabrat, Maştağa, Bilgəh, Nardaran) yükdaşıma və bağ evi köçürülməsi necə sifariş edilir? Sabunçu rayonunun həm qəsəbə binaları, həm də Bilgəh və Maştağadakı bağ evləri üçün təmiz qapalı furqonlar, mebel ustası və fəhlə xidməti göstərilir. 2 metrdən 6 metrədək yük maşınları ayrılır. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə müraciət edə bilərsiniz.',
    directAnswerEvakuator:
      'Sabunçu rayonunda evakuator necə çağırılır? Aeroport şossesi, Zabrat dairəsi, Bakıxanov və Maştağa yolunda 24/7 növbətçi evakuatorlarımız 15–20 dəqiqəyə çatır. Minik, SUV və bağ yollarında qalan nəqliyyat vasitələri hidravlik platforma və güclü bucurqadla daşınır. Əlaqə: 050 250 31 70.',
    yukdasimaOverview:
      'Sabunçu rayonunda xüsusilə yaz-yay aylarında şəhərdən Bilgəh, Nardaran və Maştağa bağlarına mövsümi köçlər, payızda isə geriyə daşınmalar intensivləşir. Bağ mebelləri, yelləncəklər, generatorlar və məişət texnikası xüsusi ehtiyatla daşınır.',
    evakuatorOverview:
      'Aeroport şossesində və Sabunçu qəsəbələrarası yollarda nasazlıq və ya təkər partlaması zamanı sürətli evakuasiya və təkər dəyişmə kimi yol yardımı xidmətləri göstərilir.',
    services: [
      {
        title: 'Mövsümi Bağ Evi Köçləri',
        description: 'Bilgəh, Nardaran və Pirşağı bağ evlərinə mebel və əşyaların tam daşınması.',
      },
      {
        title: 'Bakıxanov Mənzil Köçürülməsi',
        description: 'Bakıxanov qəsəbəsində yeni və köhnə binalardan mənzil daşınması və fəhlə xidməti.',
      },
      {
        title: 'Zabrat və Maştağa Həyət Evləri',
        description: 'Fərdi evlər üçün böyük məişət avadanlıqları və mebellərin sərfəli daşınması.',
      },
      {
        title: 'Aeroport Yolu və Sabunçu Evakuatoru',
        description: '24/7 magistral və qəsəbədaxili operativ evakuasiya xidməti.',
      },
    ],
    recommendedVehicles: [
      {
        vehicle: '4.2 Metrlik Mercedes Sprinter',
        specs: 'Həcm: 16 m³ | Yük: 2.5 ton',
        reason: 'Bağ evi əşyaları və bağ mebellərinin təhlükəsiz daşınması üçün ən optimal ölçüdür.',
      },
      {
        vehicle: '3 Metrlik Qapalı Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        reason: 'Maştağa və Zabratın dar kəndarası yollarına rahat girmək üçün əlverişlidir.',
      },
    ],
    faqsYukdasima: [
      {
        question: 'Şəhərdən Bilgəh və ya Nardaran bağlarına köç necə təşkil edilir?',
        answer:
          'Təyin olunmuş vaxtda yük maşını və fəhlələr şəhərdəki ünvana gəlir, əşyaları qablaşdırıb bağ evinə çatdırır və otaqlara yerləşdirir.',
      },
      {
        question: 'Kəndarası qumlu və ya dar küçələrə yük maşını gedirmi?',
        answer:
          'Bəli, sürücülərimiz kənd yollarına bələddir və relyefə uyğun keçid qabiliyyətli maşınlar göndərilir.',
      },
    ],
    faqsEvakuator: [
      {
        question: 'Aeroport yolunda qalan avtomobilə evakuator nə qədər vaxta çatır?',
        answer:
          'Aeroport şossesi boyunca daimi növbətçi texnikamız 15 dəqiqə ərzində avtomobilin yanına çatır.',
      },
    ],
  },
  {
    id: 'suraxani',
    name: 'Suraxanı',
    fullName: 'Suraxanı rayonu',
    badge: 'Qaraçuxur, Yeni Günəşli, Əmircan, Zığ və Hövsan',
    landmarks: [
      'Qaraçuxur qəsəbəsi',
      'Yeni Günəşli (D, AB, V massivləri)',
      'Əmircan və Bülbülə',
      'Hövsan qəsəbəsi və Hövsan MİDA',
      'Zığ qəsəbəsi və Zığ şossesi',
      'Suraxanı Atəşgah ətrafı',
    ],
    keyStreets: [
      'Zığ şossesi',
      'Suraxanı–Hövsan yolu',
      'Əhməd Mehbalıyev küçəsi (Qaraçuxur)',
      'General Əliağa Şıxlinski küçəsi',
      'Samir Cəfərov küçəsi',
      'Aeroport–Zığ beton yolu',
    ],
    buildingCharacteristics:
      'Yeni Günəşli və Hövsan MİDA-da çoxsaylı 9–16 mərtəbəli yaşayış kompleksləri; Qaraçuxur, Əmircan və Bülbülədə isə fərdi həyət evləri və villalar.',
    trafficAndAccessNotes:
      'Zığ şossesi və Hövsan yolu genişdir. Yeni Günəşli massivlərində yoxuşlu relyef və binalararası pilləkənli keçidlər daşıma zamanı fəhlə təcrübəsi tələb edir.',
    responseTimeMinutes: '15–25 dəqiqə',
    directAnswerYukdasima:
      'Suraxanı rayonunda (Qaraçuxur, Yeni Günəşli, Hövsan, Əmircan, Zığ) yükdaşıma necə sifariş edilir? Suraxanı rayonunun bütün massivləri və qəsəbələri üzrə mənzil köçürülməsi, mebel ustası və fəhlə xidməti göstərilir. 2 metrdən 6 metrədək təmiz qapalı furqonlar ayrılır. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə müraciət edə bilərsiniz.',
    directAnswerEvakuator:
      'Suraxanı rayonunda evakuator necə çağırılır? Zığ şossesi, Hövsan yolu, Qaraçuxur və Aeroport beton yolunda 24/7 növbətçi evakuatorlarımız 15–20 dəqiqəyə çatır. Minik, SUV və yük texnikaları üçün hidravlik platformalı evakuasiya təmin olunur. Əlaqə: 050 250 31 70.',
    yukdasimaOverview:
      'Suraxanı rayonunda xüsusilə Yeni Günəşli və Hövsan MİDA komplekslərinə köçən gənc ailələr üçün münasib tarifli və operativ evdən-evə daşıma xidməti təşkil edilir. Mebellər ustalarımız tərəfindən səliqə ilə sökülür, bükülür və yeni mənzildə quraşdırılır.',
    evakuatorOverview:
      'Zığ şossesi və Hövsan istiqamətindəki magistral yollarda hər növ minik və kommersiya avtomobillərinin təhlükəsiz evakuasiyası 24 saat həyata keçirilir.',
    services: [
      {
        title: 'Yeni Günəşli və Hövsan MİDA Köçləri',
        description: 'Yeni yaşayış komplekslərinə mənzil əşyalarının tam qablaşdırma ilə köçürülməsi.',
      },
      {
        title: 'Qaraçuxur və Əmircan Həyət Evləri',
        description: 'Fərdi evlər üçün mebel, bağ ləvazimatı və məişət texnikasının daşınması.',
      },
      {
        title: 'Mebel Sökülməsi və Quraşdırılması',
        description: 'Mətbəx və yataq mebellərinin peşəkar ustalar tərəfindən montajı.',
      },
      {
        title: 'Zığ və Hövsan Evakuatoru',
        description: '24/7 Zığ şossesi və Suraxanı ərazisində operativ yol yardımı.',
      },
    ],
    recommendedVehicles: [
      {
        vehicle: '4.2 Metrlik Mercedes Sprinter',
        specs: 'Həcm: 16 m³ | Yük: 2.5 ton',
        reason: 'Hövsan MİDA və Yeni Günəşlidə 2–3 otaqlı mənzillərin köçürülməsi üçün idealdır.',
      },
      {
        vehicle: '3 Metrlik Qapalı Furqon',
        specs: 'Həcm: 10 m³ | Yük: 1.5 ton',
        reason: 'Qaraçuxur və Əmircanın fərdi küçələrinə rahat giriş üçün əlverişlidir.',
      },
    ],
    faqsYukdasima: [
      {
        question: 'Hövsan MİDA binalarına mebel daşınması zamanı lift xidməti varmı?',
        answer:
          'Bəli, MİDA binalarında geniş yük liftləri fəaliyyət göstərir və mebellər birbaşa liftlə mənzilə çatdırılır.',
      },
      {
        question: 'Yeni Günəşlidə pilləkənli həyətlərə daşıma necə aparılır?',
        answer:
          'Pilləkənli keçidləri olan bloklarda fəhlə briqadamız əşyaları xüsusi qayışlarla təhlükəsiz daşıyır.',
      },
    ],
    faqsEvakuator: [
      {
        question: 'Hövsan yolunda evakuator nə qədər müddətə gəlir?',
        answer:
          'Zığ və Hövsan dairəsindəki növbətçi evakuatorumuz 15–20 dəqiqə ərzində yanınızda olur.',
      },
    ],
  },
  {
    id: 'xezer',
    name: 'Xəzər',
    fullName: 'Xəzər rayonu',
    badge: 'Mərdəkan, Şüvəlan, Buzovna, Qala, Şağan və Bağlar',
    landmarks: [
      'Mərdəkan qəsəbəsi (Mərdəkan dairəsi)',
      'Şüvəlan qəsəbəsi və Mayak',
      'Buzovna qəsəbəsi (Zaqulba)',
      'Qala kəndi və Qala Dövlət Tarix Qoruğu',
      'Şağan, Binə qəsəbəsi və Hövsan sərhədi',
      'Türkan və Zirə sahilboyu əraziləri',
      'Heydər Əliyev Beynəlxalq Hava Limanı',
    ],
    keyStreets: [
      'Mərdəkan şossesi',
      'Buzovna–Zaqulba yolu',
      'Şüvəlan–Qala yolu',
      'Hava Limanı yolu',
      'Zirə–Türkan sahilyanı magistralı',
      'Sergey Yesenin küçəsi (Mərdəkan)',
    ],
    buildingCharacteristics:
      'Geniş lüks villalar, bağ evləri, kottec massivləri, istirahət mərkəzləri və fərdi həyət təsərrüfatları.',
    trafficAndAccessNotes:
      'Mərdəkan və Hava Limanı şosseləri geniş və rahatdır. Bağ massivlərində bəzi daxili küçələr qumlu və dardır, buna görə sürücülərimiz yerli relyefə bələd olan texnikalarla xidmət göstərir.',
    responseTimeMinutes: '15–25 dəqiqə',
    directAnswerYukdasima:
      'Xəzər rayonunda (Mərdəkan, Şüvəlan, Buzovna, Qala, Şağan, Zirə) bağ evi və villa köçürülməsi necə sifariş edilir? Xəzər rayonunun bütün bağ və villa massivləri üçün mebel ustası, qablaşdırma və peşəkar fəhlə xidməti göstərilir. Bağ mebelləri, hovuz və istilik avadanlıqları, lüks mənzil əşyaları üçün 2 metrdən 6 metrədək təmiz qapalı furqonlar ayrılır. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə müraciət edə bilərsiniz.',
    directAnswerEvakuator:
      'Xəzər rayonunda 24/7 evakuator necə çağırılır? Mərdəkan şossesi, Şüvəlan, Buzovna və Zirə yolunda növbətçi evakuatorlarımız 15–20 dəqiqəyə çatır. Minik, SUV, lüks idman avtomobilləri və bağ yollarında qumda batan nəqliyyat vasitələri hidravlik platforma və güclü bucurqadla daşınır. Əlaqə: 050 250 31 70.',
    yukdasimaOverview:
      'Xəzər rayonu Bakının əsas bağçılıq və villa zonasıdır. Burada daşınmalar əsasən geniş həcmli villaların, dəyərli antikvar və yumşaq mebellərin, hovuz və bağ ləvazimatlarının, kondisioner və kombi sistemlərinin daşınmasından ibarətdir.',
    evakuatorOverview:
      'Mərdəkan və Buzovna sahillərində, eləcə də şossedə yüksək sürətlə hərəkət edən avtomobillərdə yaranan nasazlıqlar üçün alçaq bucaqlı platformalı evakuatorlarımız 24/7 xidmətdədir.',
    services: [
      {
        title: 'Mərdəkan və Şüvəlan Villa Köçü',
        description: 'Geniş villaların, bağ mebellərinin və məişət texnikasının təhlükəsiz köçürülməsi.',
      },
      {
        title: 'Buzovna və Zaqulba Mənzil/Bağ Daşınması',
        description: 'Dənizkənarı mülklər və kotteclər üçün tam xidmət paketi.',
      },
      {
        title: 'Həssas Qablaşdırma və Mebel Montajı',
        description: 'Lüks mebellərin usta tərəfindən xüsusi materiallarla qorunması.',
      },
      {
        title: 'Xəzər Rayonu Evakuatoru',
        description: 'Mərdəkan şossesi və bağ yollarında 24/7 operativ texniki yardım.',
      },
    ],
    recommendedVehicles: [
      {
        vehicle: '4.2 Metrlik Mercedes Sprinter',
        specs: 'Həcm: 16 m³ | Yük: 2.5 ton',
        reason: 'Standart bağ evi və villa əşyalarını bir reyslə təhlükəsiz daşımaq üçün ən uyğundur.',
      },
      {
        vehicle: '5.5–6 Metrlik İri Furqon',
        specs: 'Həcm: 25–30 m³ | Yük: 3.5 ton',
        reason: 'Böyük villaların bütün otaq əşyalarını və bağ ləvazimatlarını birdəfəlik köçürmək üçün idealdır.',
      },
    ],
    faqsYukdasima: [
      {
        question: 'Mərdəkan və Şüvəlanda qumlu bağ küçələrinə yük maşını girə bilirmi?',
        answer:
          'Bəli, sürücülərimiz Abşeron bağlarının qumlu yollarına bələddir və relyefə uyğun təkər bazası olan maşınlar göndərilir.',
      },
      {
        question: 'Bağ yelləncəkləri və həyət qril ləvazimatları daşınırmı?',
        answer:
          'Bəli, bağ yelləncəyi, manqal dəstləri, şezlonq və digər həyət inventarları ustalarımız tərəfindən sökülüb daşınır.',
      },
    ],
    faqsEvakuator: [
      {
        question: 'Şüvəlan və ya Buzovnada qumda batan maşını çıxarmaq olarmı?',
        answer:
          'Bəli, güclü elektrik bucurqadı və uzun polad kanatlı evakuatorlarımızla qumdan çıxarma və platformaya yükləmə həyata keçirilir.',
      },
    ],
  },
  {
    id: 'qaradag',
    name: 'Qaradağ',
    fullName: 'Qaradağ rayonu',
    badge: 'Lökbatan, Sədərək/Binə Bazarları, Sahil, Qobustan və Logistika',
    landmarks: [
      'Lökbatan qəsəbəsi',
      'Sədərək Ticarət Mərkəzi',
      'Binə Ticarət Mərkəzi',
      'Sahil qəsəbəsi (keçmiş Primorsk)',
      'Qobustan qəsəbəsi və Qoruğu',
      'Ələt Azad İqtisadi Zonası və Bakı Limanı',
      'Puta və Sanqaçal terminalı ətrafı',
    ],
    keyStreets: [
      'Bakı–Ələt–Qazax magistralı (M3/M2 çıxışı)',
      'Salyan şossesi (Qaradağ hissəsi)',
      'Lökbatan–Xocasən yolu',
      'Sahil qəsəbə daxili yolları',
      'Ələt liman yolu',
    ],
    buildingCharacteristics:
      'Nəhəng logistika və topdansatış ticarət mərkəzləri (Sədərək, Binə), gömrük terminalları, sənaye müəssisələri, Sahil və Lökbatanda fərdi və çoxmərtəbəli yaşayış binaları.',
    trafficAndAccessNotes:
      'Magistral yollar genişdir və ağır tonnajlı maşınlar üçün idealdır. Sədərək və Binə bazarlarının girişlərində səhər saatlarında kommersiya nəqliyyatı sıxlığı olur.',
    responseTimeMinutes: '20–30 dəqiqə',
    directAnswerYukdasima:
      'Qaradağ rayonunda (Lökbatan, Sədərək, Binə bazarı, Sahil, Ələt, Qobustan) yükdaşıma və kommersiya mallarının daşınması necə sifariş edilir? Qaradağ rayonunda həm fərdi mənzil köçləri, həm də Sədərək və Binə bazarlarından topdan kommersiya yükləri üçün 2 metrdən 7 metrədək qapalı və bortlu yük maşınları təqdim edilir. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp-dan yaza bilərsiniz.',
    directAnswerEvakuator:
      'Qaradağ rayonunda evakuator necə çağırılır? Bakı–Ələt magistralı, Sədərək dairəsi, Sahil, Sanqaçal və Ələt liman yolunda 24/7 növbətçi evakuatorlarımız mövcuddur. Minik, SUV, mikroavtobus və ağır kommersiya maşınları üçün gücləndirilmiş platforma təmin edilir. Əlaqə: 050 250 31 70.',
    yukdasimaOverview:
      'Qaradağ rayonu Bakının ən böyük logistika və kommersiya mərkəzidir. Sədərək və Binə ticarət mərkəzlərindən ölkənin bütün regionlarına və Bakı mağazalarına gündəlik mal paylanması, həmçinin Sahil və Lökbatan qəsəbələrində yaşayış evlərinin köçürülməsi həyata keçirilir.',
    evakuatorOverview:
      'Bakı–Ələt magistralında və Salyan şossesində uzaq yoldan gələn və ya yolda qalan avtomobillər üçün 24 saat fasiləsiz operativ evakuasiya xidməti göstərilir.',
    services: [
      {
        title: 'Sədərək və Binə Bazarı Kommersiya Daşımaları',
        description: 'Topdan və pərakəndə malların Bakı mağazalarına və bölgələrə çatdırılması.',
      },
      {
        title: 'Lökbatan və Sahil Mənzil Köçü',
        description: 'Fərdi və çoxmərtəbəli binalardan mənzil əşyalarının tam köçürülməsi.',
      },
      {
        title: 'Ələt Limanı və Sənaye Yükləri',
        description: 'Gömrük və anbar mallarının iritutumlu yük maşınları ilə daşınması.',
      },
      {
        title: 'Bakı–Ələt Magistral Evakuatoru',
        description: 'Magistralda və Sanqaçal ərazisində 24/7 gücləndirilmiş evakuator.',
      },
    ],
    recommendedVehicles: [
      {
        vehicle: '4.2–5 Metrlik Mercedes Sprinter / Iveco',
        specs: 'Həcm: 18–22 m³ | Yük: 2.5–3.5 ton',
        reason: 'Sədərək malları və mənzil köçləri üçün ən çox tələb olunan avtomobildir.',
      },
      {
        vehicle: '7 Metrlik İri Qapalı Yük Maşını (Atego)',
        specs: 'Həcm: 36–40 m³ | Yük: 5–8 ton',
        reason: 'Sədərək və Binə topdansatış anbarlarının iri partiyalı kommersiya yükləri üçün idealdır.',
      },
    ],
    faqsYukdasima: [
      {
        question: 'Sədərək bazarından digər rayonlara kommersiya yükü daşımaq olarmı?',
        answer:
          'Bəli, Sədərək və Binə bazarlarından həm Bakının bütün rayonlarına, həm də Azərbaycanın 80-dən çox bölgəsinə birbaşa yükdaşıma təşkil edirik.',
      },
      {
        question: 'Lökbatanda fərdi ev köçü üçün fəhlə briqadası verilirmi?',
        answer:
          'Bəli, yükləmə və boşaltma üçün təcrübəli fəhlələr və mebel ustaları ayrılır.',
      },
    ],
    faqsEvakuator: [
      {
        question: 'Bakı–Ələt yolunda qalan mikroavtobus və ya ciplər üçün evakuator varmı?',
        answer:
          'Bəli, 3.5–4 tona qədər ağır SUV və mikroavtobuslar üçün gücləndirilmiş platformalı evakuatorlarımız xidmət göstərir.',
      },
    ],
  },
  {
    id: 'pirallahi',
    name: 'Pirallahı',
    fullName: 'Pirallahı rayonu',
    badge: 'Pirallahı Adası, Gürgən, Sahil və Xüsusi Zonalar',
    landmarks: [
      'Pirallahı qəsəbəsi (keçmiş Artyom adası)',
      'Gürgən qəsəbəsi',
      'Pirallahı körpüsü (Damba)',
      'Neft Daşları körpüsü istiqaməti',
      'Dənizkənarı sənaye və yaşayış massivləri',
    ],
    keyStreets: [
      'Səməd Vurğun küçəsi (Pirallahı)',
      'Qala–Pirallahı yolu',
      'Kamil Balakişiyev küçəsi',
      'Süleyman Bağırov küçəsi',
    ],
    buildingCharacteristics:
      'Sahilyanı fərdi yaşayış evləri, azmərtəbəli qəsəbə binaları və dəniz sənayesi müəssisələri.',
    trafficAndAccessNotes:
      'Müasir Pirallahı körpüsü vasitəsilə adaya rahat və maneəsiz çıxış təmin olunur. Sahil küləkləri və rütubət nəzərə alınaraq yüklər qapalı furqonlarda tam qorunur.',
    responseTimeMinutes: '25–35 dəqiqə',
    directAnswerYukdasima:
      'Pirallahı rayonunda (Pirallahı adası, Gürgən) yükdaşıma necə sifariş edilir? Pirallahı rayonunun bütün qəsəbələri üzrə mənzil əşyaları, məişət texnikası və sənaye yüklərinin təhlükəsiz daşınması təmin edilir. Qapalı furqonlar və fəhlə briqadası ilə xidmət göstərilir. Sifariş üçün 050 250 31 70 nömrəsinə zəng edə və ya WhatsApp vasitəsilə müraciət edə bilərsiniz.',
    directAnswerEvakuator:
      'Pirallahı rayonunda evakuator necə çağırılır? Qala–Pirallahı yolu, Pirallahı körpüsü və adanın bütün ərazisində 24/7 növbətçi evakuator xidməti fəaliyyət göstərir. Minik və yolsuzluq avtomobilləri alçaq bucaqlı platforma ilə daşınır. Əlaqə: 050 250 31 70.',
    yukdasimaOverview:
      'Pirallahı rayonuna daşımalar Bakı mərkəzindən və Abşeronun digər rayonlarından təşkil olunur. Dəniz iqlimi şəraitində əşyaların nəm və tozdan qorunması üçün hermetik qapalı furqonlardan istifadə edilir.',
    evakuatorOverview:
      'Pirallahı körpüsü və Qala yolunda texniki nasazlıqla üzləşən nəqliyyat vasitələri üçün operativ evakuasiya təmin edilir.',
    services: [
      {
        title: 'Mənzil və Həyət Evi Köçü',
        description: 'Pirallahı və Gürgəndə ev əşyalarının tam qablaşdırma ilə daşınması.',
      },
      {
        title: 'Məişət Texnikası və Mebel Montajı',
        description: 'Soyuducu, paltaryuyan və mebel dəstlərinin usta ilə çatdırılması.',
      },
      {
        title: 'Sənaye və Sahil Yükləri',
        description: 'Müəssisələr üçün avadanlıq və materialların daşınması.',
      },
      {
        title: '24/7 Pirallahı Evakuatoru',
        description: 'Körpü və ada ərazisində fasiləsiz avtomobil evakuasiyası.',
      },
    ],
    recommendedVehicles: [
      {
        vehicle: '3–4 Metrlik Qapalı Sprinter',
        specs: 'Həcm: 12–16 m³ | Yük: 2.2 ton',
        reason: 'Qəsəbə küçələri və mənzil əşyaları üçün ən optimal avtomobildir.',
      },
    ],
    faqsYukdasima: [
      {
        question: 'Bakı mərkəzindən Pirallahıya daşıma prosesi necə təşkil olunur?',
        answer:
          'Hava Limanı və Qala sürət magistralı ilə birbaşa qapalı furqonlarla təhlükəsiz çatdırılma icra edilir.',
      },
      {
        question: 'Əşyalar dəniz rütubətindən necə qorunur?',
        answer:
          'Bütün mebel və texnikalar xüsusi streç və plyonkalarla bükülür və tam hermetik qapalı furqonlarda daşınır.',
      },
    ],
    faqsEvakuator: [
      {
        question: 'Pirallahı körpüsündə qalan avtomobilə evakuator necə çağırılır?',
        answer:
          '050 250 31 70 nömrəsinə zəng edərək və ya WhatsApp-dan məkan göndərərək dərhal növbətçi evakuator sifariş edə bilərsiniz.',
      },
    ],
  },
];

export function getBakuDistrictById(id: string): BakuDistrictGeoProfile | undefined {
  return BAKU_DISTRICTS.find((d) => d.id === id.toLowerCase());
}
