import React from 'react';
import { Zap, Sparkles, MessageCircle, Layers, ShieldCheck } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const trustItems = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: 'Sürətli qiymətləndirmə',
      desc: 'Bir neçə məlumatla ilkin qiyməti öyrənin.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-blue-600" />,
      title: 'AI dəstəyi',
      desc: 'Yükdaşıma zamanı şəkillər süni intellekt ilə analiz edilir.',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-emerald-600" />,
      title: 'Birbaşa əlaqə',
      desc: 'İlkin qiymətdən sonra WhatsApp vasitəsilə operatorla əlaqə saxlayın.',
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      title: 'Yükdaşıma + Evakuasiya',
      desc: 'Daşıma ehtiyaclarınızı bir platformadan idarə edin.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Etibarlı & Müasir</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Niyə yukdasima.ai?
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Daşıma və evakuasiya xidmətlərini müasir texnologiya və peşəkar komanda ilə birləşdirdik.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-6 sm:p-7 bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-5 shadow-xs">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
