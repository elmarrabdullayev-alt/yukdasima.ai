import React from 'react';
import { Truck, Car, Phone, MessageSquare, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { ServiceType } from '../types';
import { generateWhatsAppLink } from '../utils/calculator';
import { CONTACT_INFO } from '../constants/contact';

interface FooterProps {
  onSelectService: (service: ServiceType) => void;
  onOpenCallback: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService, onOpenCallback }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavService = (service: ServiceType) => {
    onSelectService(service);
    scrollToSection('estimator-section');
  };

  const handleWhatsApp = () => {
    window.open(generateWhatsAppLink('Salam, yukdasima.ai xidmətləri ilə bağlı məlumat almaq istəyirəm.'), '_blank');
  };

  return (
    <footer className="bg-white text-slate-500 pt-16 pb-28 md:pb-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-xs">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-blue-700">
                yukdasima<span className="text-slate-900">.ai</span>
              </span>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Azərbaycan üzrə yükdaşıma və 24/7 operativ evakuasiya xidmətlərinin ilkin qiymətləndirilməsi və sürətli sifariş platforması.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href={CONTACT_INFO.HOTLINE_TEL}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors font-bold text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{CONTACT_INFO.HOTLINE_DISPLAY}</span>
              </a>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors font-bold text-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">
              Xidmətlər
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavService('yukdasima')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Mənzil daşınması
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavService('yukdasima')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Mebel daşınması & Usta
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavService('yukdasima')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Ofis köçürülməsi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavService('yukdasima')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Fəhlə briqadası
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavService('evakuasiya')}
                  className="hover:text-blue-600 transition-colors cursor-pointer font-semibold text-slate-800"
                >
                  24/7 Evakuator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">
              Keçidlər
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('estimator-section')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Qiymət hesabla
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('how-it-works-section')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Necə işləyir?
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('ai-question-section')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Sual-Cavab (AI)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('faq-section')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Tez-tez verilən suallar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCallback}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Əlaqə & Zəng sifarişi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts & Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">
              Əlaqə & İş saatları
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>24/7 Fasiləsiz Xidmət</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Bakı, Abşeron və bütün Azərbaycan</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a href={CONTACT_INFO.HOTLINE_TEL} className="hover:text-blue-600 font-bold text-slate-900">
                    {CONTACT_INFO.HOTLINE_DISPLAY}
                  </a>
                  <a href={CONTACT_INFO.MOBILE_TEL} className="hover:text-blue-600 font-semibold text-slate-600 text-xs">
                    {CONTACT_INFO.MOBILE_DISPLAY}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex gap-6">
            <span>© {new Date().getFullYear()} yukdasima.ai — Bütün hüquqlar qorunur</span>
            <span className="hover:text-slate-700 cursor-pointer">Xidmət şərtləri</span>
            <span className="hover:text-slate-700 cursor-pointer">Məxfilik siyasəti</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-bold text-xs">24/7 Xidmət</span>
            <span>Bakı, Azərbaycan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
