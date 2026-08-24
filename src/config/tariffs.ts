/**
 * TRANSPORT PRICING DATABASE (ROUTE TARIFFS - ACTIVE V1)
 * 
 * Centralized Route Tariff Architecture.
 * All route transport prices for 2m, 3m, 4m, 5m, 6m, 7m, Evacuator, and TIR
 * are strictly defined in this centralized dataset.
 * 
 * ARCHITECTURAL PRINCIPLES:
 * 1. AI/Gemini NEVER invents, guesses, or outputs a price.
 * 2. All displayed vehicle prices originate exclusively from this database.
 * 3. Hot-swappable: replacing V1 with V2 requires updating only this file.
 * 4. Data Quality: Raw stored tariffs are used as configured without automatic corrections.
 * 5. If a tariff is missing: returns undefined and triggers "Dəqiq qiymət üçün bizimlə əlaqə saxlayın."
 */

export const TARIFF_DATABASE_VERSION = 'v1.0';

export interface RouteTariff {
  id: string;
  destination: string;
  origin: string;
  distanceKm: number;
  isIntercity: boolean;
  price2m?: number;
  price3m?: number;
  price4m?: number;
  price5m?: number;
  price6m?: number;
  price7m?: number;
  evacuatorPrice?: number;
  tirPrice?: number;
  /** Search aliases for fuzzy matching user inputs */
  aliases: string[];
  notes?: string;
}

/**
 * ACTIVE V1 TRANSPORTATION TARIFF DATASET
 */
export const ACTIVE_TARIFF_DATABASE_V1: RouteTariff[] = [
  // ==========================================
  // 1. BAKU & ABSHERON METROPOLITAN CORRIDOR
  // ==========================================
  {
    id: 'route-baku-local',
    origin: 'Bakı',
    destination: 'Bakı (şəhərdaxili)',
    distanceKm: 15,
    isIntercity: false,
    price2m: 25,
    price3m: 35,
    price4m: 50,
    price5m: 65,
    price6m: 85,
    price7m: 110,
    evacuatorPrice: 35,
    tirPrice: 180,
    aliases: [
      'şəhərdaxili', 'nərimanov', 'yasamal', 'nəsimi', 'xətai', 'səbail', 
      'binəqədi', 'nizami', 'sabunçu', 'suraxanı', 'xəzər', 'pirallahı',
      'nerimanov', 'nesimi', 'xetai', 'sebail', 'bineqedi', 'sabuncu', 'suraxani', 'xezer',
      'əhmədli', 'ehmedli', 'həzi aslanov', 'elmlər', '28 may', 'gənclik', 'genclik'
    ],
    notes: 'Bakı şəhəri daxilində standart daşıma tarifi.',
  },
  {
    id: 'route-xirdalan',
    origin: 'Bakı',
    destination: 'Xırdalan',
    distanceKm: 18,
    isIntercity: false,
    price2m: 35,
    price3m: 45,
    price4m: 60,
    price5m: 75,
    price6m: 95,
    price7m: 120,
    evacuatorPrice: 40,
    tirPrice: 190,
    aliases: ['xırdalan', 'xirdalan', 'masazır', 'masazir', 'saray', 'qobu', 'hökməli', 'hokmeli', 'sulutəpə', 'sulutepe'],
    notes: 'Abşeron rayonu Xırdalan və ətraf qəsəbələr.',
  },
  {
    id: 'route-sumqayit',
    origin: 'Bakı',
    destination: 'Sumqayıt',
    distanceKm: 35,
    isIntercity: false,
    price2m: 40,
    price3m: 55,
    price4m: 65,
    price5m: 90,
    price6m: 120,
    price7m: 150,
    evacuatorPrice: 55,
    tirPrice: 220,
    aliases: ['sumqayıt', 'sumqayit', 'novxanı', 'novxani', 'corat', 'hacı zeynalabdin', 'tagiyev', 'yaşma', 'yasma'],
    notes: 'Sumqayıt şəhəri və sənaye zonası.',
  },
  {
    id: 'route-absheron-peninsula',
    origin: 'Bakı',
    destination: 'Abşeron qəsəbələri (Mərdəkan, Bilgəh, Şüvəlan)',
    distanceKm: 32,
    isIntercity: false,
    price2m: 35,
    price3m: 50,
    price4m: 70,
    price5m: 90,
    price6m: 115,
    price7m: 140,
    evacuatorPrice: 45,
    tirPrice: 200,
    aliases: [
      'mərdəkan', 'merdekan', 'bilgəh', 'bilgeh', 'şüvəlan', 'suvelan', 'zagulba', 'zağulba', 
      'buzovna', 'qala', 'türkan', 'turkan', 'zirə', 'zire', 'pirallahı', 'dübəndi', 'dubendi', 'maştağa', 'mastaga'
    ],
    notes: 'Abşeron yarımadası bağ massivləri.',
  },

  // ==========================================
  // 2. WESTERN REGION (GƏNCƏ - QAZAX - TOVUZ)
  // ==========================================
  {
    id: 'route-ganja',
    origin: 'Bakı',
    destination: 'Gəncə',
    distanceKm: 362,
    isIntercity: true,
    price2m: 200,
    price3m: 260,
    price4m: 280,
    price5m: 300,
    price6m: 330,
    price7m: 350,
    evacuatorPrice: 240,
    tirPrice: 430,
    aliases: ['gəncə', 'gence', 'ganja', 'ganca'],
    notes: 'Bakı – Gəncə magistral marşrutu.',
  },
  {
    id: 'route-shamkir',
    origin: 'Bakı',
    destination: 'Şəmkir',
    distanceKm: 400,
    isIntercity: true,
    price2m: 220,
    price3m: 280,
    price4m: 310,
    price5m: 335,
    price6m: 365,
    price7m: 390,
    evacuatorPrice: 260,
    tirPrice: 460,
    aliases: ['şəmkir', 'semkir', 'shamkir'],
  },
  {
    id: 'route-tovuz',
    origin: 'Bakı',
    destination: 'Tovuz',
    distanceKm: 435,
    isIntercity: true,
    price2m: 240,
    price3m: 300,
    price4m: 330,
    price5m: 360,
    price6m: 390,
    price7m: 420,
    evacuatorPrice: 280,
    tirPrice: 490,
    aliases: ['tovuz', 'qovlar'],
  },
  {
    id: 'route-qazax',
    origin: 'Bakı',
    destination: 'Qazax',
    distanceKm: 470,
    isIntercity: true,
    price2m: 260,
    price3m: 320,
    price4m: 350,
    price5m: 380,
    price6m: 420,
    price7m: 450,
    evacuatorPrice: 300,
    tirPrice: 520,
    aliases: ['qazax', 'gazakh'],
  },
  {
    id: 'route-agstafa',
    origin: 'Bakı',
    destination: 'Ağstafa',
    distanceKm: 455,
    isIntercity: true,
    price2m: 250,
    price3m: 310,
    price4m: 340,
    price5m: 370,
    price6m: 410,
    price7m: 440,
    evacuatorPrice: 290,
    tirPrice: 510,
    aliases: ['ağstafa', 'agstafa'],
  },
  {
    id: 'route-gedebey',
    origin: 'Bakı',
    destination: 'Gədəbəy',
    distanceKm: 445,
    isIntercity: true,
    price2m: 250,
    price3m: 315,
    price4m: 345,
    price5m: 375,
    price6m: 410,
    price7m: 440,
    evacuatorPrice: 295,
    tirPrice: 515,
    aliases: ['gədəbəy', 'gedebey', 'slavyanka'],
  },
  {
    id: 'route-dashkasan',
    origin: 'Bakı',
    destination: 'Daşkəsən',
    distanceKm: 395,
    isIntercity: true,
    price2m: 230,
    price3m: 290,
    price4m: 320,
    price5m: 350,
    price6m: 380,
    price7m: 410,
    evacuatorPrice: 270,
    tirPrice: 470,
    aliases: ['daşkəsən', 'daskesen'],
  },
  {
    id: 'route-goranboy',
    origin: 'Bakı',
    destination: 'Goranboy / Naftalan',
    distanceKm: 325,
    isIntercity: true,
    price2m: 185,
    price3m: 245,
    price4m: 270,
    price5m: 290,
    price6m: 320,
    price7m: 340,
    evacuatorPrice: 220,
    tirPrice: 400,
    aliases: ['goranboy', 'naftalan', 'dəlilməmmədli', 'delilmemmedli'],
  },

  // ==========================================
  // 3. NORTHERN REGION (QUBA - QUSAR - XAÇMAZ)
  // ==========================================
  {
    id: 'route-quba',
    origin: 'Bakı',
    destination: 'Quba',
    distanceKm: 168,
    isIntercity: true,
    price2m: 130,
    price3m: 170,
    price4m: 190,
    price5m: 210,
    price6m: 240,
    price7m: 260,
    evacuatorPrice: 160,
    tirPrice: 290,
    aliases: ['quba', 'guba', 'qırmızı qəsəbə', 'qirmizi qesebe'],
  },
  {
    id: 'route-qusar',
    origin: 'Bakı',
    destination: 'Qusar',
    distanceKm: 180,
    isIntercity: true,
    price2m: 140,
    price3m: 180,
    price4m: 200,
    price5m: 220,
    price6m: 250,
    price7m: 270,
    evacuatorPrice: 170,
    tirPrice: 310,
    aliases: ['qusar', 'gusar', 'şahdağ', 'shahdag', 'samur'],
  },
  {
    id: 'route-xachmaz',
    origin: 'Bakı',
    destination: 'Xaçmaz',
    distanceKm: 155,
    isIntercity: true,
    price2m: 120,
    price3m: 160,
    price4m: 180,
    price5m: 200,
    price6m: 230,
    price7m: 250,
    evacuatorPrice: 150,
    tirPrice: 280,
    aliases: ['xaçmaz', 'xacmaz', 'xachmaz', 'nabran', 'xudat', 'yalama'],
  },
  {
    id: 'route-shabran',
    origin: 'Bakı',
    destination: 'Şabran / Siyəzən',
    distanceKm: 125,
    isIntercity: true,
    price2m: 100,
    price3m: 135,
    price4m: 155,
    price5m: 175,
    price6m: 205,
    price7m: 225,
    evacuatorPrice: 130,
    tirPrice: 245,
    aliases: ['şabran', 'sabran', 'siyəzən', 'siyezen', 'dəvəçi', 'deveci'],
  },

  // ==========================================
  // 4. NORTH-WEST (ŞƏKİ - ZAQATALA - QƏBƏLƏ)
  // ==========================================
  {
    id: 'route-sheki',
    origin: 'Bakı',
    destination: 'Şəki',
    distanceKm: 305,
    isIntercity: true,
    price2m: 190,
    price3m: 240,
    price4m: 280,
    price5m: 320,
    price6m: 340,
    price7m: 370,
    evacuatorPrice: 230,
    tirPrice: 410,
    aliases: ['şəki', 'seki', 'sheki'],
  },
  {
    id: 'route-qebele',
    origin: 'Bakı',
    destination: 'Qəbələ',
    distanceKm: 225,
    isIntercity: true,
    price2m: 160,
    price3m: 205,
    price4m: 230,
    price5m: 250,
    price6m: 280,
    price7m: 300,
    evacuatorPrice: 190,
    tirPrice: 350,
    aliases: ['qəbələ', 'qebele', 'gabala', 'vəndam', 'vendam'],
  },
  {
    id: 'route-oguz',
    origin: 'Bakı',
    destination: 'Oğuz',
    distanceKm: 270,
    isIntercity: true,
    price2m: 175,
    price3m: 225,
    price4m: 255,
    price5m: 280,
    price6m: 310,
    price7m: 335,
    evacuatorPrice: 215,
    tirPrice: 385,
    aliases: ['oğuz', 'oguz'],
  },
  {
    id: 'route-qax',
    origin: 'Bakı',
    destination: 'Qax',
    distanceKm: 350,
    isIntercity: true,
    price2m: 210,
    price3m: 270,
    price4m: 300,
    price5m: 330,
    price6m: 360,
    price7m: 385,
    evacuatorPrice: 250,
    tirPrice: 440,
    aliases: ['qax', 'ilisu'],
  },
  {
    id: 'route-zaqatala',
    origin: 'Bakı',
    destination: 'Zaqatala',
    distanceKm: 430,
    isIntercity: true,
    price2m: 240,
    price3m: 300,
    price4m: 330,
    price5m: 355,
    price6m: 385,
    price7m: 410,
    evacuatorPrice: 275,
    tirPrice: 480,
    aliases: ['zaqatala', 'zaqala'],
  },
  {
    id: 'route-balaken',
    origin: 'Bakı',
    destination: 'Balakən',
    distanceKm: 450,
    isIntercity: true,
    price2m: 250,
    price3m: 310,
    price4m: 340,
    price5m: 370,
    price6m: 400,
    price7m: 430,
    evacuatorPrice: 290,
    tirPrice: 500,
    aliases: ['balakən', 'balaken', 'mazımçay'],
  },

  // ==========================================
  // 5. SHAMAKHI - ISMAYILLI CORRIDOR
  // ==========================================
  {
    id: 'route-shamaxi',
    origin: 'Bakı',
    destination: 'Şamaxı',
    distanceKm: 120,
    isIntercity: true,
    price2m: 100,
    price3m: 135,
    price4m: 155,
    price5m: 175,
    price6m: 200,
    price7m: 220,
    evacuatorPrice: 130,
    tirPrice: 240,
    aliases: ['şamaxı', 'samaxi', 'shamakhi', 'çuxuryurd', 'cuxuryurd', 'pirqulu', 'qobustan mərkəz'],
  },
  {
    id: 'route-ismayilli',
    origin: 'Bakı',
    destination: 'İsmayıllı',
    distanceKm: 175,
    isIntercity: true,
    price2m: 135,
    price3m: 175,
    price4m: 195,
    price5m: 215,
    price6m: 245,
    price7m: 265,
    evacuatorPrice: 165,
    tirPrice: 300,
    aliases: ['ismayıllı', 'ismayilli', 'lahıc', 'lahic', 'ivanovka', 'basqal'],
  },

  // ==========================================
  // 6. SOUTHERN REGION (LƏNKƏRAN - ASTARA - MASALLI)
  // ==========================================
  {
    id: 'route-lenkeran',
    origin: 'Bakı',
    destination: 'Lənkəran',
    distanceKm: 268,
    isIntercity: true,
    price2m: 180,
    price3m: 230,
    price4m: 250,
    price5m: 270,
    price6m: 300,
    price7m: 320,
    evacuatorPrice: 210,
    tirPrice: 390,
    aliases: ['lənkəran', 'lenkeran', 'lankaran', 'liman'],
  },
  {
    id: 'route-astara',
    origin: 'Bakı',
    destination: 'Astara',
    distanceKm: 312,
    isIntercity: true,
    price2m: 195,
    price3m: 250,
    price4m: 275,
    price5m: 295,
    price6m: 325,
    price7m: 345,
    evacuatorPrice: 235,
    tirPrice: 420,
    aliases: ['astara'],
  },
  {
    id: 'route-masalli',
    origin: 'Bakı',
    destination: 'Masallı',
    distanceKm: 230,
    isIntercity: true,
    price2m: 160,
    price3m: 210,
    price4m: 235,
    price5m: 255,
    price6m: 285,
    price7m: 305,
    evacuatorPrice: 195,
    tirPrice: 360,
    aliases: ['masallı', 'masalli', 'boradigah'],
  },
  {
    id: 'route-calilabad',
    origin: 'Bakı',
    destination: 'Cəlilabad',
    distanceKm: 210,
    isIntercity: true,
    price2m: 150,
    price3m: 195,
    price4m: 220,
    price5m: 240,
    price6m: 270,
    price7m: 290,
    evacuatorPrice: 180,
    tirPrice: 340,
    aliases: ['cəlilabad', 'celilabad', 'göytepe', 'göytəpə'],
  },
  {
    id: 'route-lerik',
    origin: 'Bakı',
    destination: 'Lerik',
    distanceKm: 320,
    isIntercity: true,
    price2m: 205,
    price3m: 260,
    price4m: 290,
    price5m: 315,
    price6m: 345,
    price7m: 370,
    evacuatorPrice: 245,
    tirPrice: 430,
    aliases: ['lerik'],
  },
  {
    id: 'route-yardimli',
    origin: 'Bakı',
    destination: 'Yardımlı',
    distanceKm: 290,
    isIntercity: true,
    price2m: 190,
    price3m: 245,
    price4m: 270,
    price5m: 295,
    price6m: 325,
    price7m: 350,
    evacuatorPrice: 230,
    tirPrice: 410,
    aliases: ['yardımlı', 'yardimli'],
  },

  // ==========================================
  // 7. CENTRAL ARAN & SHIRVAN
  // ==========================================
  {
    id: 'route-mingachevir',
    origin: 'Bakı',
    destination: 'Mingəçevir',
    distanceKm: 275,
    isIntercity: true,
    price2m: 170,
    price3m: 220,
    price4m: 250,
    price5m: 270,
    price6m: 300,
    price7m: 320,
    evacuatorPrice: 210,
    tirPrice: 380,
    aliases: ['mingəçevir', 'mingecevir', 'mingachevir'],
  },
  {
    id: 'route-yevlax',
    origin: 'Bakı',
    destination: 'Yevlax',
    distanceKm: 290,
    isIntercity: true,
    price2m: 175,
    price3m: 230,
    price4m: 260,
    price5m: 280,
    price6m: 310,
    price7m: 330,
    evacuatorPrice: 220,
    tirPrice: 390,
    aliases: ['yevlax'],
  },
  {
    id: 'route-shirvan',
    origin: 'Bakı',
    destination: 'Şirvan / Hacıqabul',
    distanceKm: 135,
    isIntercity: true,
    price2m: 110,
    price3m: 145,
    price4m: 165,
    price5m: 185,
    price6m: 210,
    price7m: 230,
    evacuatorPrice: 140,
    tirPrice: 260,
    aliases: ['şirvan', 'shirvan', 'hacıqabul', 'haciqabul', 'əlibayramlı', 'navahi', 'padar'],
  },
  {
    id: 'route-salyan',
    origin: 'Bakı',
    destination: 'Salyan / Neftçala',
    distanceKm: 130,
    isIntercity: true,
    price2m: 110,
    price3m: 145,
    price4m: 165,
    price5m: 185,
    price6m: 210,
    price7m: 230,
    evacuatorPrice: 140,
    tirPrice: 260,
    aliases: ['salyan', 'neftçala', 'neftcala', 'bankə', 'qarauşağı'],
  },
  {
    id: 'route-bilesuvar',
    origin: 'Bakı',
    destination: 'Biləsuvar',
    distanceKm: 180,
    isIntercity: true,
    price2m: 135,
    price3m: 180,
    price4m: 205,
    price5m: 225,
    price6m: 255,
    price7m: 275,
    evacuatorPrice: 170,
    tirPrice: 310,
    aliases: ['biləsuvar', 'bilesuvar'],
  },
  {
    id: 'route-goychay',
    origin: 'Bakı',
    destination: 'Göyçay / Ucar',
    distanceKm: 220,
    isIntercity: true,
    price2m: 155,
    price3m: 200,
    price4m: 225,
    price5m: 245,
    price6m: 275,
    price7m: 295,
    evacuatorPrice: 185,
    tirPrice: 340,
    aliases: ['göyçay', 'goycay', 'ucar'],
  },
  {
    id: 'route-agdash',
    origin: 'Bakı',
    destination: 'Ağdaş',
    distanceKm: 245,
    isIntercity: true,
    price2m: 160,
    price3m: 210,
    price4m: 235,
    price5m: 255,
    price6m: 285,
    price7m: 305,
    evacuatorPrice: 195,
    tirPrice: 355,
    aliases: ['ağdaş', 'agdas'],
  },
  {
    id: 'route-kurdamir',
    origin: 'Bakı',
    destination: 'Kürdəmir',
    distanceKm: 190,
    isIntercity: true,
    price2m: 140,
    price3m: 185,
    price4m: 210,
    price5m: 230,
    price6m: 260,
    price7m: 280,
    evacuatorPrice: 175,
    tirPrice: 320,
    aliases: ['kürdəmir', 'kurdemir'],
  },
  {
    id: 'route-sabirabad',
    origin: 'Bakı',
    destination: 'Sabirabad / Saatlı',
    distanceKm: 170,
    isIntercity: true,
    price2m: 130,
    price3m: 175,
    price4m: 195,
    price5m: 215,
    price6m: 245,
    price7m: 265,
    evacuatorPrice: 165,
    tirPrice: 300,
    aliases: ['sabirabad', 'saatlı', 'saatli'],
  },
  {
    id: 'route-imishli',
    origin: 'Bakı',
    destination: 'İmişli / Beyləqan',
    distanceKm: 250,
    isIntercity: true,
    price2m: 165,
    price3m: 215,
    price4m: 240,
    price5m: 260,
    price6m: 290,
    price7m: 310,
    evacuatorPrice: 200,
    tirPrice: 360,
    aliases: ['imişli', 'imisli', 'beyləqan', 'beyleqan'],
  },

  // ==========================================
  // 8. KARABAKH & EAST ZANGAZUR
  // ==========================================
  {
    id: 'route-barda',
    origin: 'Bakı',
    destination: 'Bərdə / Tərtər / Ağdam',
    distanceKm: 310,
    isIntercity: true,
    price2m: 190,
    price3m: 240,
    price4m: 270,
    price5m: 290,
    price6m: 320,
    price7m: 340,
    evacuatorPrice: 230,
    tirPrice: 410,
    aliases: ['bərdə', 'berde', 'barda', 'tərtər', 'terter', 'ağdam', 'agdam', 'ağcabədi', 'agcabedi'],
  },
  {
    id: 'route-shusha',
    origin: 'Bakı',
    destination: 'Şuşa / Xankəndi / Füzuli',
    distanceKm: 395,
    isIntercity: true,
    price2m: 260,
    price3m: 320,
    price4m: 350,
    price5m: 380,
    price6m: 420,
    price7m: 450,
    evacuatorPrice: 300,
    tirPrice: 520,
    aliases: [
      'şuşa', 'susa', 'shusha', 'xankəndi', 'xankendi', 'füzuli', 'fuzuli', 
      'laçın', 'lacin', 'zəngilan', 'zengilan', 'qubadlı', 'qubadli', 'cəbrayıl', 'cebrayil', 'kəlbəcər', 'kelbecer', 'xocavənd', 'xocali'
    ],
    notes: 'Qarabağ və Şərqi Zəngəzur bölgələri.',
  },

  // ==========================================
  // 9. NAKHCHIVAN (TRANSIT / AIR-CORRIDOR)
  // ==========================================
  {
    id: 'route-nakhchivan',
    origin: 'Bakı',
    destination: 'Naxçıvan',
    distanceKm: 550,
    isIntercity: true,
    price2m: 350,
    price3m: 450,
    price4m: 520,
    price5m: 580,
    price6m: 650,
    price7m: 720,
    evacuatorPrice: 480,
    tirPrice: 900,
    aliases: ['naxçıvan', 'naxcivan', 'nakhchivan', 'ordubad', 'culfa', 'şərur', 'serur', 'şahbuz'],
    notes: 'Naxçıvan Muxtar Respublikası xüsusi tranzit daşınma.',
  },
];

/**
 * Active Route Tariffs reference.
 * Pointed to ACTIVE_TARIFF_DATABASE_V1 for current deployment.
 */
export const ROUTE_TARIFFS: RouteTariff[] = ACTIVE_TARIFF_DATABASE_V1;

/**
 * Match a destination/origin string to a configured route tariff in the active database.
 * Prioritizes destination (toAddress), then origin (fromAddress).
 * AI NEVER guesses prices — if no route matches, returns null.
 */
export function findRouteTariff(fromAddress: string, toAddress: string): RouteTariff | null {
  const normFrom = (fromAddress || '').trim().toLowerCase();
  const normTo = (toAddress || '').trim().toLowerCase();

  if (!normTo && !normFrom) {
    return null;
  }

  // Priority 1: Check if toAddress matches an intercity or specific route (excluding generic local)
  for (const route of ROUTE_TARIFFS) {
    if (route.id === 'route-baku-local') continue;

    if (normTo.includes(route.destination.toLowerCase())) {
      return route;
    }
    for (const alias of route.aliases) {
      if (normTo.includes(alias.toLowerCase())) {
        return route;
      }
    }
  }

  // Priority 2: Check if fromAddress matches an intercity or specific route (excluding generic local)
  for (const route of ROUTE_TARIFFS) {
    if (route.id === 'route-baku-local') continue;

    if (normFrom.includes(route.destination.toLowerCase())) {
      return route;
    }
    for (const alias of route.aliases) {
      if (normFrom.includes(alias.toLowerCase())) {
        return route;
      }
    }
  }

  // Priority 3: Check Baku local route
  const localRoute = ROUTE_TARIFFS.find((r) => r.id === 'route-baku-local');
  if (localRoute) {
    // If destination matches specific Baku districts or aliases
    const toIsBakuLocal = localRoute.aliases.some((alias) => normTo.includes(alias.toLowerCase()));
    if (toIsBakuLocal) {
      return localRoute;
    }

    // If destination is explicitly "Bakı" or "şəhərdaxili"
    if (normTo === 'bakı' || normTo === 'baki' || normTo === 'baku' || normTo === 'şəhərdaxili' || normTo === 'seherdaxili') {
      return localRoute;
    }

    // If both origin and destination have Baku address keywords
    const bakuAddressMarkers = ['küç', 'kuc', 'pr.', 'prospekt', 'mkr', 'mikrorayon', 'bina', 'otaq', 'mərkəz', 'merkez'];
    const toHasBakuMarker = bakuAddressMarkers.some((m) => normTo.includes(m));
    const fromHasBakuMarker = bakuAddressMarkers.some((m) => normFrom.includes(m)) || normFrom.includes('bakı') || normFrom.includes('baki');
    
    if (toHasBakuMarker && fromHasBakuMarker) {
      return localRoute;
    }

    // If toAddress is not provided, but fromAddress is within Baku
    if (!normTo && (normFrom.includes('bakı') || normFrom.includes('baki') || localRoute.aliases.some((a) => normFrom.includes(a)))) {
      return localRoute;
    }
  }

  return null;
}
