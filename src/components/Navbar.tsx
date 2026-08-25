import React, { useState } from 'react';
import { Phone, ArrowRight, Menu, X, Truck, Car, Shield } from 'lucide-react';
import { ServiceType } from '../types';
import { CONTACT_INFO } from '../constants/contact';
import { Link, useRouter } from '../router/RouterContext';

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
  const { pathname, navigate } = useRouter();

  const handleNavClick = (targetPath: string, sectionId?: string) => {
    setMobileMenuOpen(false);
    if (pathname === targetPath) {
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(targetPath);
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link
              id="brand-logo-link"
              href="/"
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
                <Truck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-blue-700">
                yukdasima<span className="text-slate-900">.ai</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link
              id="nav-home"
              href="/"
              className={`hover:text-blue-600 transition-colors ${pathname === '/' ? 'text-blue-600 font-semibold' : 'text-slate-600'}`}
            >
              Ana səhifə
            </Link>
            <Link
              id="nav-yukdasima"
              href="/yukdasima"
              onClick={() => onSelectService('yukdasima')}
              className={`hover:text-blue-600 transition-colors flex items-center gap-1.5 ${
                pathname === '/yukdasima' ? 'text-blue-600 font-semibold' : 'text-slate-600'
              }`}
            >
              Yükdaşıma
            </Link>
            <Link
              id="nav-evakuasiya"
              href="/evakuasiya"
              onClick={() => onSelectService('evakuasiya')}
              className={`hover:text-blue-600 transition-colors flex items-center gap-1.5 ${
                pathname === '/evakuasiya' ? 'text-blue-600 font-semibold' : 'text-slate-600'
              }`}
            >
              Evakuasiya
            </Link>
            <Link
              id="nav-qiymetler"
              href="/qiymetler"
              className={`hover:text-blue-600 transition-colors ${pathname === '/qiymetler' ? 'text-blue-600 font-semibold' : 'text-slate-600'}`}
            >
              Qiymətlər
            </Link>
            <button
              id="nav-services"
              type="button"
              onClick={() => handleNavClick('/', 'services-section')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Xidmətlər
            </button>
            <button
              id="nav-faq"
              type="button"
              onClick={() => handleNavClick('/', 'faq-section')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <Link
              id="nav-contact"
              href="/elaqe"
              className={`hover:text-blue-600 transition-colors ${pathname === '/elaqe' ? 'text-blue-600 font-semibold' : 'text-slate-600'}`}
            >
              Əlaqə
            </Link>
          </nav>

          {/* Right Action: Info Center & Primary CTA */}
          <div className="hidden sm:flex items-center gap-6">
            <a
              id="header-phone-hotline"
              href={CONTACT_INFO.HOTLINE_TEL}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors group"
              title={CONTACT_INFO.HOTLINE_DISPLAY}
              aria-label="878 qaynar xəttinə zəng et"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Qaynar xətt</span>
                <span className="text-base font-extrabold text-slate-900 leading-none group-hover:text-blue-600 transition-colors">{CONTACT_INFO.HOTLINE_SHORT_DISPLAY}</span>
              </div>
            </a>

            <button
              id="header-calculate-cta"
              onClick={() => handleNavClick('/', 'estimator-section')}
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-sm transition-colors"
              title={CONTACT_INFO.HOTLINE_DISPLAY}
              aria-label="878 qaynar xəttinə zəng et"
            >
              <Phone className="w-4 h-4" />
              <span>{CONTACT_INFO.HOTLINE_SHORT_DISPLAY}</span>
            </a>
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
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
            <Link
              href="/yukdasima"
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectService('yukdasima');
              }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold ${
                pathname === '/yukdasima' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-700'
              }`}
            >
              <Truck className="w-5 h-5 text-blue-600" />
              Yükdaşıma
            </Link>
            <Link
              href="/evakuasiya"
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectService('evakuasiya');
              }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold ${
                pathname === '/evakuasiya' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-700'
              }`}
            >
              <Car className="w-5 h-5 text-blue-600" />
              Evakuasiya
            </Link>
          </div>

          <Link
            href="/evden-eve-yukdasima"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Evdən Evə Daşıma
          </Link>
          <Link
            href="/mebel-dasinmasi"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Mebel Daşınması
          </Link>
          <Link
            href="/ofis-dasinmasi"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Ofis Daşınması
          </Link>
          <Link
            href="/yuk-masini"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Yük Maşını Sifarişi
          </Link>
          <Link
            href="/fehle-xidmeti"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Fəhlə Xidməti
          </Link>
          <Link
            href="/qiymetler"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Qiymətlər
          </Link>
          <Link
            href="/elaqe"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Əlaqə
          </Link>

          <div className="pt-2 space-y-2">
            <a
              id="mobile-drawer-hotline"
              href={CONTACT_INFO.HOTLINE_TEL}
              aria-label="878 qaynar xəttinə zəng et"
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-xs text-center flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Qaynar Xətt: {CONTACT_INFO.HOTLINE_NUMBER}</span>
            </a>

            <button
              onClick={() => handleNavClick('/', 'estimator-section')}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md text-center flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors cursor-pointer"
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
