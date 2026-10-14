import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, MessageSquare, Truck, Car, HelpCircle } from 'lucide-react';
import { ServiceType } from '../types';
import { AI_PROMPT_SAMPLES } from '../data/mockData';
import { generateWhatsAppLink } from '../utils/calculator';

interface AiQuestionBoxProps {
  onSelectService: (service: ServiceType) => void;
}

export const AiQuestionBox: React.FC<AiQuestionBoxProps> = ({ onSelectService }) => {
  const [query, setQuery] = useState('');
  const [activeAnswer, setActiveAnswer] = useState<{
    question: string;
    answer: string;
    service: 'yukdasima' | 'evakuasiya';
  } | null>({
    question: '3 otaqlı evin daşınması neçəyə başa gəlir?',
    answer:
      'Qiymət yükün həcmi, mərtəbə, lift, məsafə və fəhlə sayından asılıdır. Qiymət marşrut, avtomobilin mövcudluğu, yolüstü daşınma imkanı və sifariş detallarına görə dəyişə bilər. Cari ən uyğun qiymət üçün bizimlə əlaqə saxlayın.',
    service: 'yukdasima',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const lower = query.toLowerCase();

    // 1. Explicit evacuation words always mean evacuation
    const isExplicitEvacuation = ['evakuas', 'evakuator', 'jeep', 'sedan', 'qəza', 'qeza'].some((kw) =>
      lower.includes(kw)
    );
    // 2. Cargo words: "yük maşını", "mebel", "köçmək" are moving questions even though they contain "maşın"
    const isCargoQuestion = [
      'yük', 'yuk', 'mebel', 'köç', 'koc', 'əşya', 'esya', 'divan', 'soyuducu',
      'otaq', 'ofis', 'fəhlə', 'fehle', 'qutu', 'pianino', 'kamaz', 'furqon', 'qazel',
    ].some((kw) => lower.includes(kw));
    // 3. A car on its own ("maşınım xarab olub") means evacuation
    const mentionsCar =
      /(^|\s)maşın/.test(lower) ||
      lower.includes('avtomobil') ||
      lower.includes('minik') ||
      lower.includes('işə düşmür') ||
      lower.includes('ise dusmur');

    const isEvacuationQuestion = isExplicitEvacuation || (!isCargoQuestion && mentionsCar);

    // Check if evacuation question
    if (isEvacuationQuestion) {
      setActiveAnswer({
        question: query,
        answer:
          'Evakuasiya qiyməti məsafə, avtomobil növü və avtomobilin texniki vəziyyətindən asılıdır. Qiymət marşrut, avtomobilin mövcudluğu, yolüstü daşınma imkanı və sifariş detallarına görə dəyişə bilər. Cari ən uyğun qiymət üçün bizimlə əlaqə saxlayın.',
        service: 'evakuasiya',
      });
    } else {
      // Yukdasima question
      setActiveAnswer({
        question: query,
        answer:
          'Yükdaşıma qiyməti yükün həcmi, mərtəbə, liftin varlığı, məsafə və tələb olunan fəhlə sayından asılıdır. Qiymət marşrut, avtomobilin mövcudluğu, yolüstü daşınma imkanı və sifariş detallarına görə dəyişə bilər. Cari ən uyğun qiymət üçün bizimlə əlaqə saxlayın.',
        service: 'yukdasima',
      });
    }
  };

  const handleSelectSample = (sample: typeof AI_PROMPT_SAMPLES[0]) => {
    setQuery(sample.query);
    if (sample.service === 'evakuasiya') {
      setActiveAnswer({
        question: sample.query,
        answer:
          'Evakuasiya qiyməti məsafə, avtomobil növü və avtomobilin texniki vəziyyətindən asılıdır. Qiymət marşrut, avtomobilin mövcudluğu, yolüstü daşınma imkanı və sifariş detallarına görə dəyişə bilər. Cari ən uyğun qiymət üçün bizimlə əlaqə saxlayın.',
        service: 'evakuasiya',
      });
    } else {
      setActiveAnswer({
        question: sample.query,
        answer:
          'Qiymət yükün həcmi, mərtəbə, lift, məsafə və fəhlə sayından asılıdır. Qiymət marşrut, avtomobilin mövcudluğu, yolüstü daşınma imkanı və sifariş detallarına görə dəyişə bilər. Cari ən uyğun qiymət üçün bizimlə əlaqə saxlayın.',
        service: 'yukdasima',
      });
    }
  };

  const handleCtaClick = () => {
    if (!activeAnswer) return;
    onSelectService(activeAnswer.service);
    const element = document.getElementById('estimator-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppAsk = () => {
    const text = `Salam, saytdan bu sual ilə bağlı dəqiqləşdirmə almaq istəyirəm:\n"${activeAnswer?.question}"`;
    window.open(generateWhatsAppLink(text), '_blank');
  };

  return (
    <section id="ai-question-section" className="py-14 sm:py-20 bg-slate-50 scroll-mt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col items-center gap-4">
          <div className="flex items-center justify-between w-full">
            <h4 className="font-bold text-slate-800 text-lg sm:text-xl">
              Daşıma ilə bağlı sualınız var?
            </h4>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              AI DƏSTƏK
            </span>
          </div>

          {/* SEARCH INPUT BAR */}
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative w-full flex items-center gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Məsələn: Nərimanovdan Xırdalana evakuasiya neçəyədir?"
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-500 focus:bg-white text-sm text-slate-800 transition-all"
              />
              <button
                type="submit"
                id="btn-ask-ai"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-colors cursor-pointer shrink-0"
              >
                Soruş
              </button>
            </div>
          </form>

          {/* QUICK PROMPT PILLS */}
          <div className="flex flex-wrap gap-2 w-full text-xs text-slate-600 pt-1">
            {AI_PROMPT_SAMPLES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full border border-slate-200 text-xs text-slate-600 transition-colors cursor-pointer"
              >
                {sample.label}
              </button>
            ))}
          </div>

          {/* ANSWER CARD */}
          {activeAnswer && (
            <div className="w-full mt-4 rounded-xl bg-slate-50 border border-slate-200 p-5 animate-in fade-in duration-200 text-left">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <p className="text-xs font-semibold text-slate-400">
                    Cavab:
                  </p>
                  <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                    {activeAnswer.answer}
                  </p>
                </div>
              </div>

              {/* RELEVANT CTAS */}
              <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  {activeAnswer.service === 'yukdasima' ? (
                    <>
                      <Truck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Yükdaşıma xidməti üçün tövsiyə olunur</span>
                    </>
                  ) : (
                    <>
                      <Car className="w-3.5 h-3.5 text-blue-600" />
                      <span>Evakuasiya xidməti üçün tövsiyə olunur</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppAsk}
                    className="px-3.5 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCtaClick}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>{activeAnswer.service === 'yukdasima' ? 'Yükümü hesabla' : 'Evakuasiyanı hesabla'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
