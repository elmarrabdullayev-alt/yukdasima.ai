import tariffDatabaseV1 from '../data/yukdasima_ai_tarif_bazasi_v1.json';

export interface DestinationInfo {
  canonicalName: string;
  zone: string;
  isIntercity: boolean;
  distanceKm: number | null;
  curatedAliases: string[];
}

export interface DestinationResolutionResult {
  canonicalName: string;
  zone: string;
  isIntercity: boolean;
  distanceKm: number | null;
  matchType: 'exact_canonical' | 'exact_alias' | 'normalized_canonical' | 'normalized_alias' | 'token_match' | 'fuzzy';
  matchedQuery: string;
  confidence: number;
  matchedAlias?: string;
  suggestionText?: string;
}

export interface DestinationSuggestion {
  canonicalName: string;
  zone: string;
  isIntercity: boolean;
  matchedBy: string;
}

/**
 * 1. NORMALIZATION
 * Normalizes input strings by lowercasing, trimming, stripping punctuation,
 * collapsing spaces, and standardizing Azerbaijani characters for comparison.
 */
export function normalizeDestinationName(input: string): string {
  if (!input) return '';
  return input
    .toLowerCase()
    .replace(/['`"״’‘]/g, '')
    .replace(/[.,/#!$%^&*;:{}=\-_`~()\\+[\]?<>|@]/g, ' ')
    .replace(/ə/g, 'e')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ğ/g, 'g')
    .replace(/ç/g, 'c')
    .replace(/ş/g, 's')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Street / landmark markers (normalized form). A place name directly before one of these
 * words is a street name inside a city (e.g. "Gəncə prospekti" is in Bakı, not in Gəncə).
 */
const STREET_MARKERS = new Set([
  'prospekti', 'prospekt', 'pr', 'kucesi', 'kuce', 'kuc', 'kucesinde', 'kucede',
  'meydani', 'meydan', 'dongesi', 'donge', 'dalani', 'dalan', 'sossesi', 'sosesi', 'sosse',
  'bulvari', 'bulvar', 'metrosu', 'metro', 'stansiyasi', 'parki', 'tini', 'ms',
]);

/** Words that mark the previous word as a real settlement (stop stripping there). */
const PLACE_DESCRIPTORS = new Set([
  'seheri', 'seher', 'rayonu', 'rayon', 'r', 'qesebesi', 'qesebe', 'qes', 'kendi', 'kend', 'k',
]);

/**
 * Removes street names (e.g. "Gəncə prospekti 25", "Qara Qarayev pr.") from an address so that
 * a street named after a city is not mistaken for that city. Works per comma-separated segment.
 * Returns the remaining normalized text and whether any street marker was found.
 */
export function stripStreetNames(input: string): { text: string; hadStreetMarker: boolean } {
  if (!input) return { text: '', hadStreetMarker: false };
  let hadStreetMarker = false;
  const segments = input.split(/[,;\n]/);
  const kept: string[] = [];

  for (const segment of segments) {
    const tokens = normalizeDestinationName(segment).split(' ').filter(Boolean);
    const out: string[] = [];
    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i];
      if (STREET_MARKERS.has(tok)) {
        hadStreetMarker = true;
        // Remove up to two words before the marker, stopping at a place descriptor ("Gəncə şəhəri")
        let removed = 0;
        while (removed < 2 && out.length > 0 && !PLACE_DESCRIPTORS.has(out[out.length - 1])) {
          out.pop();
          removed++;
        }
        // Skip a house number directly after the marker ("prospekti 25")
        if (i + 1 < tokens.length && /^\d+[a-z]?$/.test(tokens[i + 1])) i++;
        continue;
      }
      out.push(tok);
    }
    if (out.length) kept.push(out.join(' '));
  }

  return { text: kept.join(' ').trim(), hadStreetMarker };
}

/** Common Azerbaijani case suffixes (normalized), e.g. "Qəbələyə", "Bakıdan", "Gəncənin". */
const CASE_SUFFIX = '(?:ya|ye|a|e|da|de|ta|te|dan|den|tan|ten|in|un|nin|nun|i|u|ni|nu|ya qeder|ye qeder)?';

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * True when `alias` appears in `text` as a whole word (optionally followed by a case suffix).
 * "qala" matches "qala kendi" and "qalada", but not "qalaalti".
 */
export function containsPlaceWord(text: string, alias: string): boolean {
  if (!text || !alias) return false;
  const re = new RegExp(`(?:^|\\s)${escapeRegex(alias)}${CASE_SUFFIX}(?=\\s|$)`);
  return re.test(text);
}

/**
 * Strips all spaces for compact phonetic comparisons
 */
export function compactNormalize(input: string): string {
  return normalizeDestinationName(input).replace(/\s+/g, '');
}

/**
 * Comprehensive curated aliases for all destinations in the V1 database.
 * Every single destination in Azerbaijan has rich Azerbaijani, Latin, phonetic,
 * and Russian transliteration variants.
 */
const CURATED_DESTINATION_ALIASES: Record<string, string[]> = {
  // Bakı & Absheron Metropolitan Corridor
  'Bakı (şəhərdaxili)': [
    'bakı', 'baki', 'baku', 'şəhərdaxili', 'seherdaxili', 'seher daxili', 'şəhər daxili', 'baku city',
    'nərimanov', 'nerimanov', 'yasamal', 'nəsimi', 'nesimi', 'xətai', 'xetai', 'khatai', 'səbail', 'sebail',
    'binəqədi', 'bineqedi', 'nizami', 'sabunçu', 'sabuncu', 'suraxanı', 'suraxani', 'xəzər', 'xezer', 'pirallahı', 'pirallahi',
    'əhmədli', 'ehmedli', 'həzi aslanov', 'hezi aslanov', 'elmlər', 'elmler', '28 may', 'gənclik', 'genclik',
    'koroğlu', 'koroglu', 'bakıxanov', 'bakixanov', 'inşaatçılar', 'insaatcilar', 'sahil',
    'içərişəhər', 'iceriseher', 'memar əcəmi', 'memar ecemi', 'dərnəgül', 'dernegul',
    'xalqlar dostluğu', 'xalqlar dostlugu', 'neftçilər', 'neftciler', 'qara qarayev',
    'köhnə günəşli', 'kohne gunesli', 'yeni günəşli', 'yeni gunesli', 'badamdar', 'bayıl', 'bayil',
    'bibiheybət', 'bibiheybet', 'lökbatan', 'lokbatan', 'hövsan', 'hovsan', 'zığ', 'zig',
    'bülbülə', 'bulbule', 'əmircan', 'emircan', 'ramana', 'zabrat', 'kürdəxanı', 'kurdexani',
    'pirşağı', 'pirsagi', 'nardaran', 'biləcəri', 'bileceri', 'binə', 'bine',
    'qaraçuxur', 'qaracuxur', 'karachukhur', 'günəşli', 'gunesli', 'şıxov', 'sixov', 'shikhov',
    'keşlə', 'kesle', 'ağ şəhər', 'ag seher', 'ağşəhər', 'agseher', 'montin', 'bakmil',
    'yeni yasamal', 'sahil qəsəbəsi', 'sahil qesebesi'
  ],
  'Xırdalan': [
    'xırdalan', 'xirdalan', 'khirdalan', 'hirdalan', 'khyrdalan', 'xirdalan seheri',
    'masazır', 'masazir', 'saray', 'qobu', 'hökməli', 'hokmeli', 'sulutəpə', 'sulutepe',
    'mehdiabad', 'ceyranbatan', 'jeyranbatan', 'digah', 'fatmayı', 'fatmayi', 'abşeron rayonu', 'abseron rayonu'
  ],
  'Sumqayıt': [
    'sumqayıt', 'sumqayit', 'sumgayit', 'sumgait', 'sumqait', 'sumqait city',
    'novxanı', 'novxani', 'corat', 'jorat', 'hacı zeynalabdin', 'tagiyev'
  ],
  'Abşeron qəsəbələri (Mərdəkan, Bilgəh, Şüvəlan)': [
    'abşeron', 'absheron', 'abseron', 'abşeron qəsəbələri', 'absheron qesebeleri',
    'mərdəkan', 'merdekan', 'mardakan', 'bilgəh', 'bilgeh', 'bilgah',
    'şüvəlan', 'suvelan', 'shuvelan', 'zagulba', 'zağulba', 'buzovna',
    'qala', 'türkan', 'turkan', 'zirə', 'zire', 'dübəndi', 'dubendi', 'maştağa', 'mastaga', 'mashtaga'
  ],

  // Zona 1: Gəncə - Qazax
  'Naftalan': ['naftalan'],
  'Goranboy': ['goranboy', 'goran boy'],
  'Gəncə': ['gəncə', 'gence', 'ganja', 'gandja', 'ganja city', 'gence seheri', 'gyandzha'],
  'Samux': ['samux', 'samukh'],
  'Daşkəsən': ['daşkəsən', 'daskesen', 'dashkesen', 'dashkasan', 'daskasan'],
  'Şəmkir': ['şəmkir', 'semkir', 'shemkir', 'shamkir', 'shamkhor'],
  'Tovuz': ['tovuz', 'tauz', 'tovuz rayonu'],
  'Gədəbəy': ['gədəbəy', 'gedebey', 'gadabay', 'gadabey', 'gedabey'],
  'Ağstafa': ['ağstafa', 'agstafa', 'aghstafa', 'akstafa', 'aqstafa'],
  'Qazax': ['qazax', 'gazakh', 'kazakh', 'qazakh', 'gazax', 'kazax'],
  'Qırmızı Körpü': ['qırmızı körpü', 'qirmizi korpu', 'krasny most', 'red bridge', 'qirmizikorpu'],
  'Göygül (Hacıkənd)': ['göygül (hacıkənd)', 'göygül', 'goygul', 'hacıkənd', 'hacikend', 'hajikend', 'goygol hacikend'],
  'Göygöl (Xanlar)': ['göygöl (xanlar)', 'göygöl', 'goygol', 'goy-gol', 'xanlar', 'khanlar', 'xanlar rayonu', 'khanlar region'],

  // Zona 2: Mərkəzi Aran
  'Kürdəmir': ['kürdəmir', 'kurdemir', 'kurdamir', 'kyurdamir'],
  'Ucar': ['ucar', 'udzhar', 'ujar'],
  'İmişli': ['imişli', 'i̇mişli', 'imisli', 'imishli', 'imishly'],
  'Beyləqan': ['beyləqan', 'beyleqan', 'beylagan', 'zhdanov'],
  'Ağdaş': ['ağdaş', 'agdas', 'aqdas', 'agdash', 'aqdash', 'agdash region', 'agdas seheri'],
  'Zərdab': ['zərdab', 'zerdab', 'zardab'],
  'Yevlax': ['yevlax', 'yevlakh', 'yevlax seheri'],
  'Ağcabədi': ['ağcabədi', 'agcabedi', 'aghcabedi', 'aghjabadi', 'agjabadi', 'agdjabedi'],
  'Mingəçevir': ['mingəçevir', 'mingecevir', 'mingechevir', 'mingachevir', 'mingechaur', 'mingecevir seheri'],
  'Bərdə': ['bərdə', 'berde', 'barda', 'barda region'],
  'Tərtər': ['tərtər', 'terter', 'tartar', 'terter rayonu'],
  'Ağdam (Quzanlı)': ['ağdam (quzanlı)', 'quzanlı', 'quzanli', 'agdam quzanli', 'quzanly'],
  'Horadiz': ['horadiz', 'goradiz'],

  // Zona 3: Şəki - Zaqatala
  'Qəbələ': ['qəbələ', 'qebele', 'qabala', 'gabala', 'gebele', 'qabala city', 'gabala resort'],
  'Oğuz': ['oğuz', 'oguz', 'oghuz', 'oguz rayonu'],
  'Şəki': ['şəki', 'seki', 'sheki', 'shaki', 'sheki city', 'seki seheri'],
  'Qax': ['qax', 'qakh', 'gakh', 'kakh', 'gakh region'],
  'Zaqatala': ['zaqatala', 'zagatala', 'zakatala'],
  'Balakən': ['balakən', 'balaken', 'balakan', 'belokan'],

  // Zona 4: Şamaxı & Şirvan
  'Qobustan (Şamaxı)': ['qobustan (şamaxı)', 'qobustan samaxi', 'qobustan shamakhi', 'maraza qobustan'],
  'Cəngi': ['cəngi', 'cengi', 'jengi', 'dzhangi'],
  'Mərəzə': ['mərəzə', 'mereze', 'maraza'],
  'Şamaxı': ['şamaxı', 'samaxi', 'shamakhy', 'shamaxi', 'shamakhi', 'schemacha'],
  'Pirqulu': ['pirqulu', 'pirgulu', 'pirkuli'],
  'İsmayıllı': ['i̇smayıllı', 'ismayıllı', 'ismayilli', 'ismailly', 'ismailli', 'ismaili', 'ismayilly'],
  'Ağsu': ['ağsu', 'agsu', 'aghsu', 'aksu'],
  'Göyçay': ['göyçay', 'goycay', 'goychay', 'geokchay'],

  // Zona 5: Cənub bölgəsi
  'Bilasuvar': ['bilasuvar', 'biləsuvar', 'bilesuvar', 'bilyasuvar'],
  'Cəlilabad': ['cəlilabad', 'celilabad', 'jalilabad', 'dzhalilabad'],
  'Masallı': ['masallı', 'masalli', 'masally'],
  'Lənkəran': ['lənkəran', 'lenkeran', 'lankaran', 'lenkoran', 'lankaran city', 'lənkəran şəhəri'],
  'Yardımlı': ['yardımlı', 'yardimli', 'yardimly'],
  'Astara': ['astara', 'ostoro'],
  'Lerik': ['lerik'],

  // Zona 6: Şirvan & Muğan
  'Qobustan (Qaradağ)': ['qobustan (qaradağ)', 'qobustan qaradag', 'qobustan qaradagh', 'gobustan rock art'],
  'Hacıqabul': ['hacıqabul', 'haciqabul', 'hajigabul', 'qazıməmməd', 'gazimamed'],
  'Şirvan': ['şirvan', 'sirvan', 'shirvan', 'ali bayramli', 'əli bayramlı', 'eli bayramli'],
  'Salyan': ['salyan', 'salyany'],
  'Sabirabad': ['sabirabad', 'sabirabat'],
  'Neftçala': ['neftçala', 'neftcala', 'neftchala', 'neftchala rayonu'],
  'Saatlı': ['saatlı', 'saatli', 'saatly'],
  'Nəvai': ['nəvai', 'nevai', 'navahi', 'navai'],

  // Zona 7: Şimal bölgəsi
  'Zarat': ['zarat'],
  'Yaşma': ['yaşma', 'yasma', 'yashma'],
  'Sitalçay': ['sitalçay', 'sitalcay', 'sitalchay'],
  'SDK': ['sdk', 'sdk postu', 'sdk ypx'],
  'Giləzi': ['giləzi', 'gilezi', 'kilazi'],
  'Siyəzən': ['siyəzən', 'siyezen', 'siazan', 'qızılburun'],
  'Xızı': ['xızı', 'xizi', 'khizi', 'altıağac', 'altiagac'],
  'Şabran': ['şabran', 'sabran', 'shabran', 'dəvəçi', 'deveci'],
  'Qəndob': ['qəndob', 'qendob', 'gandob', 'kandob'],
  'Quba': ['quba', 'guba', 'kuba', 'quba seheri', 'guba city'],
  'Xaçmaz': ['xaçmaz', 'xacmaz', 'khachmaz', 'hachmaz', 'khachmas'],
  'Xudat': ['xudat', 'khudat', 'hudat'],
  'Qusar': ['qusar', 'gusar', 'kusar', 'qusar rayonu'],
  'Yalama': ['yalama'],
  'Nabran': ['nabran', 'nabran istirahet'],
  'Şahdağ': ['şahdağ', 'sahdag', 'shahdag', 'shahdagh', 'shahdag resort'],

  // Zona 8: Qarabağ & Şərqi Zəngəzur
  'Füzuli': ['füzuli', 'fuzuli', 'fizuli', 'fuzuli aeroport', 'fuzuli seheri'],
  'Hadrut': ['hadrut'],
  'Suqovuşan': ['suqovuşan', 'suqovusan', 'suqovushan', 'madagiz'],
  'Ağbənd': ['ağbənd', 'agbend', 'aghbend', 'akbend'],
  'Ağdərə': ['ağdərə', 'agdere', 'aghdere', 'mardakert'],
  'Cəbrayıl': ['cəbrayıl', 'cebrayil', 'jabrayil', 'dzhabrail'],
  'Qubadlı': ['qubadlı', 'qubadli', 'gubadli', 'kubadly'],
  'Şuşa': ['şuşa', 'susa', 'shusha', 'shusha city', 'şuşa şəhəri'],
  'Zəngilan': ['zəngilan', 'zengilan', 'zangilan', 'agali', 'ağalı'],
  'Kəlbəcər': ['kəlbəcər', 'kelbecer', 'kalbajar', 'kelbadzhar'],
  'Kəlbəcər İstisu': ['kəlbəcər i̇stisu', 'kelbecer istisu', 'istisu', 'kalbajar istisu'],
  'Laçın': ['laçın', 'lacin', 'lachin', 'latschin', 'lacin seheri'],
  'Laçın Qorçu': ['laçın qorçu', 'lacin qorcu', 'lachin qorchu', 'qorçu', 'gorchu'],
  'Ağdam': ['ağdam', 'agdam', 'aghdam', 'agdam seheri'],
  'Böyük Tağlar': ['böyük tağlar', 'boyuk taglar', 'boyuk taghlar'],
  'Sığnaq': ['sığnaq', 'signaq', 'sighnaq'],
  'Toğana': ['toğana', 'togana', 'toghana'],
  'Daşaltı': ['daşaltı', 'dasalti', 'dashalti'],
  'Xocavənd': ['xocavənd', 'xocavend', 'khocavend', 'martuni'],
  'Mincivan': ['mincivan', 'minjivan'],
  'Minkənd': ['minkənd', 'minkend'],
  'Şükürbəyli': ['şükürbəyli', 'sukurbeyli', 'shukurbeyli'],
  'Xocalı': ['xocalı', 'xocali', 'khocali', 'khojaly'],
  'Xankəndi': ['xankəndi', 'xankendi', 'khankendi', 'stepanakert', 'xankendi seheri'],
  'Qırmızı Bazar': ['qırmızı bazar', 'qirmizi bazar', 'krasny bazar'],
  'Sanqaçal': ['sanqaçal', 'sanqacal', 'sanqachal', 'sangachal', 'sanqacal terminali'],
  'Ələt (Qaradağ)': ['ələt (qaradağ)', 'ələt', 'elet', 'alat', 'alat port', 'elet qaradag', 'elet qesebesi']
};

/**
 * Helper to compute Levenshtein distance between two strings
 */
export function calculateLevenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Internal compilation of all canonical destinations and generated alias maps.
 */
class DestinationResolverService {
  private destinations: DestinationInfo[] = [];
  private aliasToCanonicalMap = new Map<string, DestinationInfo>();
  private canonicalMap = new Map<string, DestinationInfo>();

  constructor() {
    this.init();
  }

  private init() {
    // 1. Add Baku & Absheron local/suburban destinations
    const localDests: DestinationInfo[] = [
      {
        canonicalName: 'Bakı (şəhərdaxili)',
        zone: 'Bakı və Abşeron',
        isIntercity: false,
        distanceKm: 15,
        curatedAliases: CURATED_DESTINATION_ALIASES['Bakı (şəhərdaxili)'] || [],
      },
      {
        canonicalName: 'Xırdalan',
        zone: 'Bakı və Abşeron',
        isIntercity: false,
        distanceKm: 18,
        curatedAliases: CURATED_DESTINATION_ALIASES['Xırdalan'] || [],
      },
      {
        canonicalName: 'Sumqayıt',
        zone: 'Bakı və Abşeron',
        isIntercity: false,
        distanceKm: 35,
        curatedAliases: CURATED_DESTINATION_ALIASES['Sumqayıt'] || [],
      },
      {
        canonicalName: 'Abşeron qəsəbələri (Mərdəkan, Bilgəh, Şüvəlan)',
        zone: 'Bakı və Abşeron',
        isIntercity: false,
        distanceKm: 32,
        curatedAliases: CURATED_DESTINATION_ALIASES['Abşeron qəsəbələri (Mərdəkan, Bilgəh, Şüvəlan)'] || [],
      },
    ];

    for (const d of localDests) {
      this.destinations.push(d);
      this.canonicalMap.set(d.canonicalName.toLowerCase(), d);
    }

    // 2. Parse all 98 regional destinations from database
    for (const zoneGroup of tariffDatabaseV1.regional_tariffs) {
      for (const route of zoneGroup.routes) {
        const curated = CURATED_DESTINATION_ALIASES[route.destination] || [];
        const destInfo: DestinationInfo = {
          canonicalName: route.destination,
          zone: zoneGroup.zone,
          isIntercity: true,
          distanceKm: route.distance_km,
          curatedAliases: curated,
        };
        this.destinations.push(destInfo);
        this.canonicalMap.set(destInfo.canonicalName.toLowerCase(), destInfo);
      }
    }

    // 3. Populate alias map with exhaustive algorithmic and curated entries
    for (const dest of this.destinations) {
      const aliasSet = new Set<string>();

      // Canonical forms
      aliasSet.add(dest.canonicalName.toLowerCase());
      aliasSet.add(normalizeDestinationName(dest.canonicalName));
      aliasSet.add(compactNormalize(dest.canonicalName));

      // Parentheses decompositions (e.g. "Göygöl (Xanlar)" -> "goygol", "xanlar")
      if (dest.canonicalName.includes('(') && dest.canonicalName.includes(')')) {
        const main = dest.canonicalName.replace(/\([^)]*\)/g, '').trim();
        if (main) {
          aliasSet.add(main.toLowerCase());
          aliasSet.add(normalizeDestinationName(main));
        }
        const inside = dest.canonicalName.substring(dest.canonicalName.indexOf('(') + 1, dest.canonicalName.indexOf(')')).trim();
        if (inside) {
          aliasSet.add(inside.toLowerCase());
          aliasSet.add(normalizeDestinationName(inside));
        }
      }

      // Add all curated aliases
      for (const alias of dest.curatedAliases) {
        aliasSet.add(alias.toLowerCase());
        aliasSet.add(normalizeDestinationName(alias));
        aliasSet.add(compactNormalize(alias));
      }

      // Automatic transliteration expansions for each alias
      Array.from(aliasSet).forEach((a) => {
        const norm = normalizeDestinationName(a);
        if (norm) aliasSet.add(norm);

        // a/e variants (e.g. "qebele" -> "qabala", "lenkeran" -> "lankaran")
        const aVariant = norm.replace(/e/g, 'a');
        if (aVariant !== norm && aVariant.length >= 3) aliasSet.add(aVariant);

        // sh/ch/kh variants
        const shVariant = norm.replace(/s/g, 'sh');
        if (shVariant !== norm) aliasSet.add(shVariant);

        const chVariant = norm.replace(/c/g, 'ch');
        if (chVariant !== norm) aliasSet.add(chVariant);

        const khVariant = norm.replace(/x/g, 'kh');
        if (khVariant !== norm) aliasSet.add(khVariant);

        // g/q/k variants
        const gToQ = norm.replace(/^g/, 'q');
        if (gToQ !== norm) aliasSet.add(gToQ);

        const qToG = norm.replace(/^q/, 'g');
        if (qToG !== norm) aliasSet.add(qToG);

        const qToK = norm.replace(/^q/, 'k');
        if (qToK !== norm) aliasSet.add(qToK);

        const aqToAg = norm.replace(/aq/g, 'ag');
        if (aqToAg !== norm) aliasSet.add(aqToAg);

        const agToAq = norm.replace(/ag/g, 'aq');
        if (agToAq !== norm) aliasSet.add(agToAq);
      });

      // Register all generated aliases to the canonical destination
      for (const alias of aliasSet) {
        const trimmed = alias.trim();
        if (trimmed.length >= 2) {
          // Do not overwrite existing more-specific alias if already bound unless identical
          if (!this.aliasToCanonicalMap.has(trimmed)) {
            this.aliasToCanonicalMap.set(trimmed, dest);
          }
        }
      }
    }
  }

  /**
   * Returns all canonical destination records
   */
  public getAllDestinations(): DestinationInfo[] {
    return this.destinations;
  }

  /**
   * Returns all canonical destination names
   */
  public getCanonicalNames(): string[] {
    return this.destinations.map((d) => d.canonicalName);
  }

  /**
   * Main deterministic resolution method.
   * Order:
   * 1. Exact canonical match
   * 2. Exact normalized alias match
   * 3. Normalized canonical match
   * 4. Multi-word/token match in longer user input
   * 5. Safe fuzzy match (typo tolerance) with high confidence
   */
  public resolve(input: string): DestinationResolutionResult | null {
    if (!input) return null;
    const rawTrimmed = input.trim();
    if (!rawTrimmed) return null;

    const lowerInput = rawTrimmed.toLowerCase();
    const normalizedInput = normalizeDestinationName(rawTrimmed);
    const compactInput = compactNormalize(rawTrimmed);

    // 1. Exact Canonical Match
    for (const dest of this.destinations) {
      if (dest.canonicalName.toLowerCase() === lowerInput) {
        return {
          canonicalName: dest.canonicalName,
          zone: dest.zone,
          isIntercity: dest.isIntercity,
          distanceKm: dest.distanceKm,
          matchType: 'exact_canonical',
          matchedQuery: rawTrimmed,
          confidence: 1.0,
        };
      }
    }

    // 2. Exact Alias Match (direct lookup in alias map)
    const exactAliasMatch = this.aliasToCanonicalMap.get(lowerInput) || 
                            this.aliasToCanonicalMap.get(normalizedInput) || 
                            this.aliasToCanonicalMap.get(compactInput);
    if (exactAliasMatch) {
      return {
        canonicalName: exactAliasMatch.canonicalName,
        zone: exactAliasMatch.zone,
        isIntercity: exactAliasMatch.isIntercity,
        distanceKm: exactAliasMatch.distanceKm,
        matchType: 'exact_alias',
        matchedQuery: rawTrimmed,
        confidence: 0.98,
        matchedAlias: normalizedInput,
      };
    }

    // 3. Normalized Canonical Match
    for (const dest of this.destinations) {
      if (normalizeDestinationName(dest.canonicalName) === normalizedInput) {
        return {
          canonicalName: dest.canonicalName,
          zone: dest.zone,
          isIntercity: dest.isIntercity,
          distanceKm: dest.distanceKm,
          matchType: 'normalized_canonical',
          matchedQuery: rawTrimmed,
          confidence: 0.99,
        };
      }
    }

    // 4. Token matching for conversational phrases (e.g. "Bakıdan Qəbələyə", "Ağdaş şəhəri").
    // Street names are removed first ("Gəncə prospekti" is a street in Bakı, not the city Gəncə),
    // and names must match as whole words ("Qalaaltı" must not match "Qala").
    const { text: phraseInput, hadStreetMarker } = stripStreetNames(rawTrimmed);
    if (!phraseInput) {
      return null;
    }

    // An address that is entirely a street name + a district (e.g. "Gəncə prospekti 25, Nərimanov")
    // may now be an exact alias.
    const strippedAliasMatch = hadStreetMarker
      ? this.aliasToCanonicalMap.get(phraseInput) || this.aliasToCanonicalMap.get(phraseInput.replace(/\s+/g, ''))
      : undefined;
    if (strippedAliasMatch) {
      return {
        canonicalName: strippedAliasMatch.canonicalName,
        zone: strippedAliasMatch.zone,
        isIntercity: strippedAliasMatch.isIntercity,
        distanceKm: strippedAliasMatch.distanceKm,
        matchType: 'exact_alias',
        matchedQuery: rawTrimmed,
        confidence: 0.96,
        matchedAlias: phraseInput,
      };
    }

    // Test regional destinations first, sorted by length descending so longer specific names match first
    const sortedDestinations = [...this.destinations].sort((a, b) => b.canonicalName.length - a.canonicalName.length);

    for (const dest of sortedDestinations) {
      // Check canonical in phrase
      const normCanonical = normalizeDestinationName(dest.canonicalName);
      if (normCanonical.length >= 3 && containsPlaceWord(phraseInput, normCanonical)) {
        return {
          canonicalName: dest.canonicalName,
          zone: dest.zone,
          isIntercity: dest.isIntercity,
          distanceKm: dest.distanceKm,
          matchType: 'token_match',
          matchedQuery: rawTrimmed,
          confidence: 0.95,
        };
      }

      // Check aliases in phrase
      for (const alias of dest.curatedAliases) {
        const normAlias = normalizeDestinationName(alias);
        if (normAlias.length >= 3) {
          // Whole-word match (with optional case suffix), never a bare substring
          if (containsPlaceWord(phraseInput, normAlias)) {
            return {
              canonicalName: dest.canonicalName,
              zone: dest.zone,
              isIntercity: dest.isIntercity,
              distanceKm: dest.distanceKm,
              matchType: 'token_match',
              matchedQuery: rawTrimmed,
              confidence: 0.93,
              matchedAlias: alias,
            };
          }
        }
      }
    }

    // 5. Safe Fuzzy Match (Typo Tolerance)
    // Only applied on single or double words, with strict Levenshtein threshold
    // Skipped for street addresses: a leftover word like "qara" (from "Qara Qarayev pr.")
    // must not be fuzzy-matched to a different place.
    if (!hadStreetMarker && normalizedInput.length >= 4 && normalizedInput.split(' ').length <= 2) {
      let bestMatch: DestinationInfo | null = null;
      let minDistance = 999;
      let matchedAliasName = '';
      let ambiguityCount = 0;

      for (const [alias, dest] of this.aliasToCanonicalMap.entries()) {
        // Skip very short aliases for fuzzy matching to prevent false positives
        if (alias.length < 4) continue;

        const distance = calculateLevenshteinDistance(normalizedInput, alias);
        const maxAllowedDistance = alias.length <= 5 ? 1 : 2;

        if (distance <= maxAllowedDistance) {
          if (distance < minDistance) {
            minDistance = distance;
            bestMatch = dest;
            matchedAliasName = alias;
            ambiguityCount = 1;
          } else if (distance === minDistance && bestMatch && bestMatch.canonicalName !== dest.canonicalName) {
            // Ambiguity between different destinations (e.g. equally close to two cities)
            ambiguityCount++;
          }
        }
      }

      // Only accept if unambiguous and distance is low
      if (bestMatch && minDistance <= 2 && ambiguityCount === 1) {
        const confidence = minDistance === 1 ? 0.88 : 0.78;
        return {
          canonicalName: bestMatch.canonicalName,
          zone: bestMatch.zone,
          isIntercity: bestMatch.isIntercity,
          distanceKm: bestMatch.distanceKm,
          matchType: 'fuzzy',
          matchedQuery: rawTrimmed,
          confidence,
          matchedAlias: matchedAliasName,
          suggestionText: `${bestMatch.canonicalName} nəzərdə tutursunuz?`,
        };
      }
    }

    return null;
  }

  /**
   * Suggestion autocomplete helper for user inputs.
   * If user types "qab", suggests "Qəbələ"
   * If user types "agdas", suggests "Ağdaş"
   */
  public getSuggestions(query: string, limit = 6): DestinationSuggestion[] {
    if (!query || query.trim().length < 2) return [];
    const normQuery = normalizeDestinationName(query);
    const compactQuery = compactNormalize(query);

    const suggestions: DestinationSuggestion[] = [];
    const seen = new Set<string>();

    // 1. Prefix match on canonical name
    for (const dest of this.destinations) {
      const normCanonical = normalizeDestinationName(dest.canonicalName);
      if (normCanonical.startsWith(normQuery) || dest.canonicalName.toLowerCase().startsWith(query.toLowerCase())) {
        if (!seen.has(dest.canonicalName)) {
          seen.add(dest.canonicalName);
          suggestions.push({
            canonicalName: dest.canonicalName,
            zone: dest.zone,
            isIntercity: dest.isIntercity,
            matchedBy: dest.canonicalName,
          });
        }
      }
    }

    // 2. Prefix or inclusion match on aliases
    for (const [alias, dest] of this.aliasToCanonicalMap.entries()) {
      if (suggestions.length >= limit) break;
      if (alias.startsWith(normQuery) || alias.startsWith(compactQuery) || alias.includes(normQuery)) {
        if (!seen.has(dest.canonicalName)) {
          seen.add(dest.canonicalName);
          suggestions.push({
            canonicalName: dest.canonicalName,
            zone: dest.zone,
            isIntercity: dest.isIntercity,
            matchedBy: alias,
          });
        }
      }
    }

    // 3. Fallback fuzzy search if few suggestions found
    if (suggestions.length < limit && normQuery.length >= 3) {
      for (const [alias, dest] of this.aliasToCanonicalMap.entries()) {
        if (suggestions.length >= limit) break;
        if (alias.length >= 4 && Math.abs(alias.length - normQuery.length) <= 2) {
          const dist = calculateLevenshteinDistance(normQuery, alias);
          if (dist <= 1 && !seen.has(dest.canonicalName)) {
            seen.add(dest.canonicalName);
            suggestions.push({
              canonicalName: dest.canonicalName,
              zone: dest.zone,
              isIntercity: dest.isIntercity,
              matchedBy: `${dest.canonicalName} (${alias})`,
            });
          }
        }
      }
    }

    return suggestions.slice(0, limit);
  }
}

/** Singleton instance */
export const destinationResolver = new DestinationResolverService();

/**
 * Resolve destination name from user input to canonical destination record.
 */
export function resolveDestination(input: string): DestinationResolutionResult | null {
  return destinationResolver.resolve(input);
}

/**
 * Autocomplete search for UI components.
 */
export function findDestinationSuggestions(query: string, limit = 6): DestinationSuggestion[] {
  return destinationResolver.getSuggestions(query, limit);
}

/**
 * List all available canonical destination names.
 */
export function getCanonicalDestinations(): string[] {
  return destinationResolver.getCanonicalNames();
}

export type RouteClassification =
  | { type: 'baku_local'; description: string }
  | { type: 'baku_suburban'; destination: string; description: string }
  | { type: 'baku_regional'; destination: string; description: string }
  | { type: 'non_baku_origin'; origin: string; destination: string; description: string }
  | { type: 'unsupported'; description: string };

/**
 * Checks if an origin address string resolves strictly to Bakı.
 * 
 * Rules:
 * 1. Empty or omitted origin defaults to Baku in local context.
 * 2. Explicit Baku names & Baku districts (Nərimanov, Yasamal, Nəsimi, Xətai, etc.) resolve to Bakı -> true.
 * 3. Sumqayıt, Xırdalan, Abşeron settlements, and all 98 regional destinations are NOT Bakı -> false.
 * 4. General Baku address markers (e.g., "küç.", "pr.", "mkr") without regional keywords -> true.
 */
export function isBakuOrigin(originAddress?: string): boolean {
  if (!originAddress || !originAddress.trim()) {
    return true;
  }

  const clean = originAddress.trim();
  const resolved = resolveDestination(clean);

  if (resolved) {
    // Only 'Bakı (şəhərdaxili)' is considered Baku origin.
    // Sumqayıt, Xırdalan, Abşeron, and regional cities are NOT Baku origin.
    return resolved.canonicalName === 'Bakı (şəhərdaxili)';
  }

  // Street names such as "Gəncə prospekti" are inside Bakı and must not count as other cities
  const { text: norm, hadStreetMarker } = stripStreetNames(clean);

  // Check if string contains any non-Baku regional or suburban keywords
  const nonBakuKeywords = [
    'sumqayit', 'sumgayit', 'sumgait', 'sumqait',
    'xirdalan', 'khirdalan', 'masazir', 'saray', 'qobu', 'hokmeli', 'sulutepe',
    'gence', 'ganja', 'quba', 'qusar', 'seki', 'sheki', 'lenkeran', 'lankaran',
    'agdas', 'aqdas', 'agdash', 'qebele', 'qabala', 'gabala', 'mingecevir',
    'berde', 'barda', 'tovuz', 'qazax', 'semkir', 'shamkir', 'zaqatala',
    'xacmaz', 'khachmaz', 'ismayilli', 'ismailly', 'samaxi', 'shamakhi',
    'goycay', 'goychay', 'masalli', 'salyan', 'sirvan', 'shirvan', 'astara',
    'bilasuvar', 'celilabad', 'jalilabad', 'naxcivan', 'nakhchivan', 'susa', 'shusha'
  ];

  if (nonBakuKeywords.some((kw) => containsPlaceWord(norm, kw))) {
    return false;
  }

  // Check for Baku markers
  if (hadStreetMarker || hasBakuAddressMarker(norm)) {
    return true;
  }

  return false;
}

/**
 * Generic Baku address markers (micro-district, building, "Bakı" itself).
 * Expects normalized text.
 */
export function hasBakuAddressMarker(normalizedText: string): boolean {
  const markerWords = ['baki', 'baku', 'seherdaxili', 'mkr', 'mikrorayon', 'mikrorayonu', 'bina', 'binasi', 'merkez'];
  return markerWords.some((m) => containsPlaceWord(normalizedText, m));
}

/**
 * Classifies a route before any tariff lookup:
 * 1. Bakı → Bakı/local area
 * 2. Bakı → region / suburban
 * 3. Non-Bakı origin → any other destination (explicit route only)
 * 4. Unsupported
 */
export function classifyRoute(fromAddress?: string, toAddress?: string): RouteClassification {
  const normFrom = (fromAddress || '').trim();
  const normTo = (toAddress || '').trim();

  if (!normFrom && !normTo) {
    return { type: 'unsupported', description: 'Marşrut daxil edilməyib' };
  }

  const originIsBaku = isBakuOrigin(normFrom);

  if (!originIsBaku) {
    return {
      type: 'non_baku_origin',
      origin: normFrom,
      destination: normTo,
      description: `Qeyri-Bakı marşrutu (${normFrom} → ${normTo})`,
    };
  }

  // Origin is Baku: check destination
  if (!normTo) {
    return { type: 'baku_local', description: 'Bakı şəhərdaxili' };
  }

  const resolvedTo = resolveDestination(normTo);

  if (!resolvedTo) {
    // Check if destination has Baku markers (street address or district markers)
    const { text: norm, hadStreetMarker } = stripStreetNames(normTo);
    if (hadStreetMarker || hasBakuAddressMarker(norm)) {
      return { type: 'baku_local', description: 'Bakı şəhərdaxili' };
    }
    return { type: 'unsupported', description: 'Naməlum təyinat məntəqəsi' };
  }

  if (resolvedTo.canonicalName === 'Bakı (şəhərdaxili)') {
    return { type: 'baku_local', description: 'Bakı şəhərdaxili' };
  }

  if (resolvedTo.canonicalName === 'Xırdalan' || resolvedTo.canonicalName === 'Sumqayıt' || resolvedTo.canonicalName.includes('Abşeron qəsəbələri')) {
    return {
      type: 'baku_suburban',
      destination: resolvedTo.canonicalName,
      description: `Bakı → ${resolvedTo.canonicalName}`,
    };
  }

  if (resolvedTo.isIntercity) {
    return {
      type: 'baku_regional',
      destination: resolvedTo.canonicalName,
      description: `Bakı → ${resolvedTo.canonicalName}`,
    };
  }

  return { type: 'unsupported', description: 'Naməlum təyinat məntəqəsi' };
}
