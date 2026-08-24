import React, { useState } from 'react';
import { Phone, ArrowRight, Menu, X, Truck, Car, Shield } from 'lucide-react';
import { ServiceType } from '../types';
import { CONTACT_INFO } from '../constants/contact';

interface NavbarProps {
  activeService: ServiceType;
  onSelectService: (service: ServiceType) => void;
  onOpenCallback: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeService,
  onSelectService,
  onOpenCallback,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavService = (service: ServiceType) => {
    onSelectService(service);
    scrollToSection('estimator-section');
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a
              id="brand-logo-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
                <Truck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-blue-700">
                yukdasima<span className="text-slate-900">.ai</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              id="nav-home"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Ana səhifə
            </button>
            <button
              id="nav-yukdasima"
              onClick={() => handleNavService('yukdasima')}
              className={`hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeService === 'yukdasima' ? 'text-blue-600 font-semibold' : 'text-slate-600'
              }`}
            >
              Yükdaşıma
            </button>
            <button
              id="nav-evakuasiya"
              onClick={() => handleNavService('evakuasiya')}
              className={`hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeService === 'evakuasiya' ? 'text-blue-600 font-semibold' : 'text-slate-600'
              }`}
            >
              Evakuasiya
            </button>
            <button
              id="nav-services"
              onClick={() => scrollToSection('services-section')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Xidmətlər
            </button>
            <button
              id="nav-faq"
              onClick={() => scrollToSection('faq-section')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <button
              id="nav-contact"
              onClick={onOpenCallback}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Əlaqə
            </button>
          </nav>

          {/* Right Action: Info Center & Primary CTA */}
          <div className="hidden sm:flex items-center gap-6">
            <a
              id="header-phone-hotline"
              href={CONTACT_INFO.HOTLINE_TEL}
              className="flex flex-col items-end leading-tight text-right hover:text-blue-600 transition-colors"
              title={CONTACT_INFO.HOTLINE_DISPLAY}
            >
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Qaynar xətt</span>
              <span className="text-lg font-bold text-slate-900 leading-none">{CONTACT_INFO.HOTLINE_SHORT_DISPLAY}</span>
            </a>

            <button
              id="header-calculate-cta"
              onClick={() => scrollToSection('estimator-section')}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Qiymət hesabla
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              id="mobile-phone-btn"
              href={CONTACT_INFO.HOTLINE_TEL}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm"
              title={CONTACT_INFO.HOTLINE_DISPLAY}
            >
              <Phone className="w-4 h-4" />
              <span>{CONTACT_INFO.HOTLINE_SHORT_DISPLAY}</span>
            </a>
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-2">
            <button
              onClick={() => handleNavService('yukdasima')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold ${
                activeService === 'yukdasima' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-700'
              }`}
            >
              <Truck className="w-5 h-5 text-blue-600" />
              Yükdaşıma
            </button>
            <button
              onClick={() => handleNavService('evakuasiya')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold ${
                activeService === 'evakuasiya' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-700'
              }`}
            >
              <Car className="w-5 h-5 text-blue-600" />
              Evakuasiya
            </button>
          </div>

          <button
            onClick={() => scrollToSection('services-section')}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Xidmətlərimiz
          </button>
          <button
            onClick={() => scrollToSection('how-it-works-section')}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Necə işləyir?
          </button>
          <button
            onClick={() => scrollToSection('ai-question-section')}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Sual-Cavab (AI)
          </button>
          <button
            onClick={() => scrollToSection('faq-section')}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Tez-tez verilən suallar (FAQ)
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCallback();
            }}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Mənimlə əlaqə saxlayın
          </button>

          <div className="pt-2">
            <button
              onClick={() => scrollToSection('estimator-section')}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md text-center flex items-center justify-center gap-2"
            >
              <span>Qiymət hesabla</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
