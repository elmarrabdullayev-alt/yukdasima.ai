import React from 'react';
import { Phone } from 'lucide-react';
import { ServiceType } from '../types';
import { generateWhatsAppLink } from '../utils/calculator';
import { CONTACT_INFO } from '../constants/contact';

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
      className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md p-1 sm:p-1.5 rounded-full border border-slate-200 shadow-2xl z-50 max-w-[96vw]"
    >
      {/* 1. YÜKDAŞIMA */}
      <button
        type="button"
        id="sticky-btn-yukdasima"
        onClick={() => handleServiceClick('yukdasima')}
        className={`flex items-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold text-xs transition-colors cursor-pointer whitespace-nowrap ${
          activeService === 'yukdasima'
            ? 'bg-slate-900 text-white shadow-xs'
            : 'hover:bg-slate-100 text-slate-700'
        }`}
      >
        <span className="text-sm">🚚</span>
        <span>Yükdaşıma</span>
      </button>

      {/* 2. EVAKUASİYA */}
      <button
        type="button"
        id="sticky-btn-evakuasiya"
        onClick={() => handleServiceClick('evakuasiya')}
        className={`flex items-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold text-xs transition-colors cursor-pointer whitespace-nowrap ${
          activeService === 'evakuasiya'
            ? 'bg-slate-900 text-white shadow-xs'
            : 'hover:bg-slate-100 text-slate-700'
        }`}
      >
        <span className="text-sm">🚗</span>
        <span>Evakuasiya</span>
      </button>

      {/* Divider */}
      <div className="w-px h-5 bg-slate-200 mx-0.5 shrink-0"></div>

      {/* 3. CLICK-TO-CALL HOTLINE */}
      <a
        id="sticky-btn-call"
        href={CONTACT_INFO.HOTLINE_TEL}
        aria-label="878 qaynar xəttinə zəng et"
        title={CONTACT_INFO.HOTLINE_DISPLAY}
        className="flex items-center gap-1 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer whitespace-nowrap shadow-xs"
      >
        <Phone className="w-3.5 h-3.5" />
        <span>878</span>
      </a>

      {/* 4. WHATSAPP */}
      <button
        type="button"
        id="sticky-btn-whatsapp"
        onClick={handleWhatsAppClick}
        aria-label="WhatsApp vasitəsilə yaz"
        className="flex items-center gap-1 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition-colors cursor-pointer whitespace-nowrap border border-emerald-200/60"
      >
        <span className="text-sm">💬</span>
        <span className="hidden xs:inline">WP</span>
      </button>
    </div>
  );
};

