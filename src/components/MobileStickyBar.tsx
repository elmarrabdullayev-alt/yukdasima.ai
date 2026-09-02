import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';
import { useRouter } from '../router/RouterContext';
import { getContextualWhatsAppUrl, getServiceAndRouteFromPath } from '../utils/whatsappHelper';
import { trackConversionEvent } from '../utils/analytics';
import { ServiceType } from '../types';

interface MobileStickyBarProps {
  activeService?: ServiceType;
  onSelectService?: (service: ServiceType) => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = () => {
  const { pathname } = useRouter();
  const whatsappUrl = getContextualWhatsAppUrl(pathname);
  const { service, route } = getServiceAndRouteFromPath(pathname);

  const handleCallClick = () => {
    trackConversionEvent('mobile_call_click', {
      page_path: pathname,
      service_type: service,
      route,
      cta_location: 'sticky_mobile_bar',
    });
  };

  const handleWhatsAppClick = () => {
    trackConversionEvent('mobile_whatsapp_click', {
      page_path: pathname,
      service_type: service,
      route,
      cta_location: 'sticky_mobile_bar',
    });
  };

  return (
    <aside
      id="mobile-sticky-bottom-bar"
      aria-label="Mobil əlaqə paneli"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_24px_rgba(15,23,42,0.12)] transition-all"
    >
      <div className="max-w-md mx-auto px-3.5 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] flex items-center gap-2.5">
        {/* 1. CLICK-TO-CALL PRIMARY PHONE BUTTON */}
        <a
          id="mobile-sticky-call-btn"
          href={CONTACT_INFO.PRIMARY_PHONE_TEL}
          onClick={handleCallClick}
          aria-label={`${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsinə birbaşa zəng et`}
          className="flex-1 h-12 flex items-center justify-center gap-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm tracking-wide shadow-xs transition-all active:scale-[0.98] select-none cursor-pointer"
        >
          <Phone className="w-4 h-4 shrink-0 fill-current" />
          <span className="truncate">Zəng et</span>
          <span className="text-[11px] font-bold bg-blue-700/80 px-1.5 py-0.5 rounded-md text-blue-100 hidden sm:inline">
            {CONTACT_INFO.PRIMARY_PHONE_DISPLAY}
          </span>
        </a>

        {/* 2. CONTEXT-AWARE WHATSAPP BUTTON */}
        <a
          id="mobile-sticky-whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          aria-label="WhatsApp vasitəsilə bizə dərhal yaz"
          className="flex-1 h-12 flex items-center justify-center gap-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm tracking-wide shadow-xs transition-all active:scale-[0.98] select-none cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 shrink-0 fill-current" />
          <span className="truncate">WhatsApp</span>
        </a>
      </div>
    </aside>
  );
};
