import { FaqItem, AiPromptSample, ServiceCardData } from '../types';

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Yükdaşıma qiyməti necə hesablanır?',
    answer: 'Yükdaşıma qiyməti əşyaların həcmi və çəkisi, tələb olunan yük maşınının tutumu, mənzilin mərtəbəsi, liftin mövcudluğu, tələb olunan fəhlə sayı və ünvanlar arasındakı məsafəyə əsasən hesablanır.',
    category: 'yukdasima',
  },
  {
    id: 'faq-2',
    question: 'AI hesablaması dəqiqdirmi?',
    answer: 'Süni intellekt əşyalarınızın fotolarını və daxil etdiyiniz parametrləri analiz edərək sizə ən real ilkin qiymət aralığını təqdim edir. Yekun dəqiq qiymət isə operatorumuz tərəfindən birbaşa təsdiqlənir.',
    category: 'all',
  },
  {
    id: 'faq-3',
    question: 'Şəkilləri niyə göndərməliyəm?',
    answer: 'Şəkillər mebellərin ölçüsünü, qablaşdırma ehtiyacını və tələb olunan yük maşınının həcmini daha dəqiq müəyyən etməyə imkan verir.',
    category: 'yukdasima',
  },
  {
    id: 'faq-4',
    question: 'Evakuasiya qiyməti necə hesablanır?',
    answer: 'Evakuasiya qiyməti götürülmə və çatdırılma ünvanları arasındakı kilometraj, avtomobilin gövdə növü (sedan, SUV, mikroavtobus) və təkər/sükan kilidlənməsi kimi texniki vəziyyətdən asılı olaraq hesablanır.',
    category: 'evakuasiya',
  },
  {
    id: 'faq-5',
    question: 'Evakuasiya üçün avtomobil şəkli lazımdır?',
    answer: 'Xeyr. İlkin evakuasiya qiymətləndirilməsi üçün götürülmə və çatdırılma ünvanı, avtomobil növü və avtomobilin vəziyyəti kifayətdir.',
    category: 'evakuasiya',
  },
  {
    id: 'faq-6',
    question: 'Lift olmadıqda qiymət dəyişirmi?',
    answer: 'Bəli, lift olmadıqda əşyaların pilləkənlərlə qaldırılması və endirilməsi üçün mərtəbə sayına uyğun əlavə fəhlə əməyi hesablanır.',
    category: 'yukdasima',
  },
  {
    id: 'faq-7',
    question: 'Dəqiq qiyməti necə əldə edə bilərəm?',
    answer: 'İlkin qiymətləndirmədən dərhal sonra "WhatsApp ilə dəqiq qiymət al" və ya "Mənimlə əlaqə saxlayın" düyməsinə klikləyərək operatorumuzla saniyələr içində əlaqə qura bilərsiniz.',
    category: 'all',
  },
];

export const AI_PROMPT_SAMPLES: AiPromptSample[] = [
  {
    id: 'prompt-1',
    label: '3 otaqlı ev köçürülməsi',
    query: '3 otaqlı evin daşınması neçəyə başa gəlir?',
    service: 'yukdasima',
  },
  {
    id: 'prompt-2',
    label: 'Nərimanovdan Xırdalana evakuasiya',
    query: 'Nərimanovdan Xırdalana evakuasiya neçəyədir?',
    service: 'evakuasiya',
  },
  {
    id: 'prompt-3',
    label: 'Mebel sökülüb quraşdırılması',
    query: 'Mebellərin sökülüb yeni ünvanda yığılması xidmətiniz var?',
    service: 'yukdasima',
  },
  {
    id: 'prompt-4',
    label: 'SUV jeep üçün evakuator',
    query: 'Böyük SUV avtomobili üçün evakuator qiyməti necə hesablanır?',
    service: 'evakuasiya',
  },
  {
    id: 'prompt-5',
    label: '24/7 Gecə evakuasiyası',
    query: 'Gecə saatlarında evakuasiya xidmətiniz fəaliyyət göstərir?',
    service: 'evakuasiya',
  },
];

export const SERVICES_DATA: ServiceCardData[] = [
  {
    id: 'srv-1',
    title: 'Ev əşyalarının daşınması',
    description: 'Mənzil və fərdi evlərin tam təhlükəsiz, səliqəli və vaxtında yeni ünvana köçürülməsi.',
    iconName: 'truck',
    features: ['Qablaşdırma dəstəyi', 'Təcrübəli fəhlələr', 'Zəmanətli daşıma'],
  },
  {
    id: 'srv-2',
    title: 'Mebel daşınması',
    description: 'Qonaq, yataq və mətbəx mebellərinin peşəkar ustalar tərəfindən sökülməsi və quraşdırılması.',
    iconName: 'sofa',
    features: ['Usta xidməti', 'Qoruyucu materiallar', 'Həssas montaj'],
  },
  {
    id: 'srv-3',
    title: 'Ofis daşınması',
    description: 'Şirkət avadanlıqları, iş masaları və arxiv sənədlərinin iş prosesi dayanmadan köçürülməsi.',
    iconName: 'building',
    features: ['Planlı köçürmə', 'Arxiv qutuları', 'Sürətli icra'],
  },
  {
    id: 'srv-4',
    title: 'Fəhlə xidməti',
    description: 'Ağır, iri həcmli və həssas əşyaların qaldırılması və yüklənməsi üçün fiziki güclü heyət.',
    iconName: 'users',
    features: ['Mərtəbəyə qaldırma', 'Saatlıq və ya layihəlik', 'Nəzakətli briqada'],
  },
  {
    id: 'srv-5',
    title: 'Yük maşını xidməti',
    description: 'Fərqli kubaj və tonnajda təmiz, qapalı və xüsusi bərkidici qayışlarla təchiz olunmuş nəqliyyat.',
    iconName: 'container',
    features: ['Ford Transit & Atego', 'Təmiz yük bölməsi', 'GPS izləmə'],
  },
  {
    id: 'srv-6',
    title: 'Evakuasiya xidməti',
    description: 'Bakı, Abşeron və bütün rayonlar üzrə minik və kommersiya avtomobillərinin 24/7 evakuasiyası.',
    iconName: 'car',
    features: ['24/7 Çağırış', 'Sürətli çatma (15-25 dəq)', 'Hər növ avtomobil'],
  },
];

export const POPULAR_LOCATIONS = [
  'Nərimanov',
  'Yasamal',
  'Xətai',
  'Nəsimi',
  'Səbail',
  'Binəqədi',
  'Xırdalan',
  'Sumqayıt',
  'Əhmədli',
  'Bakıxanov',
  'Mərdəkan',
  'Bilgəh',
  'Masazır',
  'Badamdar',
];
