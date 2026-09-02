import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageSquare } from 'lucide-react';
import { FAQ_DATA } from '../data/mockData';
import { generateWhatsAppLink } from '../utils/calculator';
import { CONTACT_INFO } from '../constants/contact';

interface FaqSectionProps {
  onOpenCallback: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenCallback }) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-5']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWhatsAppGeneral = () => {
    const text = 'Salam, daşıma xidməti ilə bağlı əlavə sualım var.';
    window.open(generateWhatsAppLink(text), '_blank');
  };

  return (
    <section id="faq-section" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Məlumat Mərkəzi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tez-tez verilən suallar
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Yükdaşıma və evakuasiya xidmətlərimiz haqqında ən çox maraqlanılan sualların cavabları.
          </p>
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-blue-500/80 shadow-md ring-1 ring-blue-500/20'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 sm:px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* STILL HAVE QUESTIONS CARD */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-blue-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-blue-600/20">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Başqa sualınız qaldı?</h3>
            <p className="mt-1 text-blue-100 text-sm">
              Operatorlarımız 24/7 bütün suallarınızı cavablandırmağa hazırdır.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleWhatsAppGeneral}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-sm hover:bg-blue-50 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp ilə yaz</span>
            </button>
            <a
              href={CONTACT_INFO.PRIMARY_PHONE_TEL}
              aria-label={`${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsinə zəng et`}
              className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{CONTACT_INFO.PRIMARY_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
