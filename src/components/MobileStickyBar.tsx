import React from 'react';
import { Truck, Car, MessageCircle } from 'lucide-react';
import { ServiceType } from '../types';
import { generateWhatsAppLink } from '../utils/calculator';

interface MobileStickyBarProps {
  activeService: ServiceType;
  onSelectService: (service: ServiceType) => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  activeService,
  onSelectService,
}) => {
  const handleServiceClick = (service: ServiceType) => {
    onSelectService(service);
    const element = document.getElementById('estimator-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    const text = 'Salam, yukdasima.ai üzərindən əlaqə saxlamaq istəyirəm.';
    window.open(generateWhatsAppLink(text), '_blank');
  };

  return (
    <div
      id="mobile-sticky-bottom-bar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-slate-200 shadow-2xl z-50 max-w-[95vw]"
    >
      {/* 1. YÜKDAŞIMA */}
      <button
        type="button"
        id="sticky-btn-yukdasima"
        onClick={() => handleServiceClick('yukdasima')}
        className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap ${
          activeService === 'yukdasima'
            ? 'bg-slate-900 text-white shadow-xs'
            : 'hover:bg-slate-100 text-slate-700'
        }`}
      >
        <span className="text-base sm:text-lg">🚚</span>
        <span>Yükdaşıma</span>
      </button>

      {/* 2. EVAKUASİYA */}
      <button
        type="button"
        id="sticky-btn-evakuasiya"
        onClick={() => handleServiceClick('evakuasiya')}
        className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap ${
          activeService === 'evakuasiya'
            ? 'bg-slate-900 text-white shadow-xs'
            : 'hover:bg-slate-100 text-slate-700'
        }`}
      >
        <span className="text-base sm:text-lg">🚗</span>
        <span>Evakuasiya</span>
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-slate-200 mx-1 sm:mx-2 shrink-0"></div>

      {/* 3. WHATSAPP */}
      <button
        type="button"
        id="sticky-btn-whatsapp"
        onClick={handleWhatsAppClick}
        className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap border border-emerald-200/60"
      >
        <span className="text-base sm:text-lg">💬</span>
        <span>WhatsApp</span>
      </button>
    </div>
  );
};
