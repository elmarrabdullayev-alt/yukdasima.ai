import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu, X, Truck, Car } from 'lucide-react';
import { ServiceType } from '../types';
import { CONTACT_INFO } from '../constants/contact';
import { Link, useRouter } from '../router/RouterContext';
import { trackConversionEvent } from '../utils/analytics';
import { LanguageSwitcher } from './LanguageSwitcher';
import { t } from '../i18n';

interface NavbarProps {
  activeService: ServiceType;
  onSelectService: (service: ServiceType) => void;
  onOpenCallback: () => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuChange?: (isOpen: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeService,
  onSelectService,
  onOpenCallback,
  isMobileMenuOpen,
  onMobileMenuChange,
}) => {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const { pathname, navigate } = useRouter();

  const mobileMenuOpen = isMobileMenuOpen !== undefined ? isMobileMenuOpen : internalMenuOpen;

  const setMobileMenuOpen = (isOpen: boolean) => {
    if (onMobileMenuChange) {
      onMobileMenuChange(isOpen);
    }
    setInternalMenuOpen(isOpen);
  };

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2 xl:gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              id="brand-logo-link"
              href="/"
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors shrink-0">
                <Truck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-blue-700 whitespace-nowrap">{t("yukdasima")}<span className="text-slate-900">{t(".ai")}</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-3 text-xs xl:text-[13px] 2xl:text-sm font-semibold text-slate-700 whitespace-nowrap">
            <Link
              id="nav-yukdasima"
              href="/yukdasima"
              onClick={() => onSelectService('yukdasima')}
              className={`hover:text-blue-600 transition-colors py-1.5 px-1.5 xl:px-2 rounded-md ${
                pathname === '/yukdasima' ? 'text-blue-600 font-bold bg-blue-50/70' : 'text-slate-700'
              }`}
            >{t("Yükdaşıma")}</Link>

            <Link
              id="nav-evakuasiya"
              href="/evakuator"
              onClick={() => onSelectService('evakuasiya')}
              className={`hover:text-blue-600 transition-colors py-1.5 px-1.5 xl:px-2 rounded-md ${
                pathname === '/evakuator' ? 'text-blue-600 font-bold bg-blue-50/70' : 'text-slate-700'
              }`}
            >{t("Evakuator")}</Link>

            <Link
              id="nav-evden-eve"
              href="/evden-eve-yukdasima"
              className={`hover:text-blue-600 transition-colors py-1.5 px-1.5 xl:px-2 rounded-md ${
                pathname === '/evden-eve-yukdasima' ? 'text-blue-600 font-bold bg-blue-50/70' : 'text-slate-700'
              }`}
            >{t("Evdən Evə Daşıma")}</Link>

            <Link
              id="nav-mebel"
              href="/mebel-dasinmasi"
              className={`hover:text-blue-600 transition-colors py-1.5 px-1.5 xl:px-2 rounded-md ${
                pathname === '/mebel-dasinmasi' ? 'text-blue-600 font-bold bg-blue-50/70' : 'text-slate-700'
              }`}
            >{t("Mebel Daşınması")}</Link>

            <Link
              id="nav-ofis"
              href="/ofis-dasinmasi"
              className={`hover:text-blue-600 transition-colors py-1.5 px-1.5 xl:px-2 rounded-md ${
                pathname === '/ofis-dasinmasi' ? 'text-blue-600 font-bold bg-blue-50/70' : 'text-slate-700'
              }`}
            >{t("Ofis Daşınması")}</Link>

            <Link
              id="nav-yuk-masini"
              href="/yuk-masini"
              className={`hover:text-blue-600 transition-colors py-1.5 px-1.5 xl:px-2 rounded-md ${
                pathname === '/yuk-masini' ? 'text-blue-600 font-bold bg-blue-50/70' : 'text-slate-700'
              }`}
            >{t("Yük Maşını Sifarişi")}</Link>

            <Link
              id="nav-fehle"
              href="/fehle-xidmeti"
              className={`hover:text-blue-600 transition-colors py-1.5 px-1.5 xl:px-2 rounded-md ${
                pathname === '/fehle-xidmeti' ? 'text-blue-600 font-bold bg-blue-50/70' : 'text-slate-700'
              }`}
            >{t("Fəhlə Xidməti")}</Link>

            <Link
              id="nav-qiymetler"
              href="/qiymetler"
              className={`hover:text-blue-600 transition-colors py-1.5 px-1.5 xl:px-2 rounded-md ${
                pathname === '/qiymetler' ? 'text-blue-600 font-bold bg-blue-50/70' : 'text-slate-700'
              }`}
            >{t("Qiymətlər")}</Link>

            <Link
              id="nav-contact"
              href="/elaqe"
              className={`hover:text-blue-600 transition-colors py-1.5 px-1.5 xl:px-2 rounded-md ${
                pathname === '/elaqe' ? 'text-blue-600 font-bold bg-blue-50/70' : 'text-slate-700'
              }`}
            >{t("Əlaqə")}</Link>
          </nav>

          {/* Right Action: Info Center & Primary CTA */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 shrink-0">
            <LanguageSwitcher />
            <a
              id="header-phone-hotline"
              href={CONTACT_INFO.HOTLINE_TEL}
              onClick={() => {
                trackConversionEvent('mobile_call_click', {
                  page_path: pathname,
                  cta_location: 'navbar_header',
                });
              }}
              className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-slate-100 transition-colors group"
              title={t(CONTACT_INFO.HOTLINE_DISPLAY)}
              aria-label={t("878 qaynar xəttinə zəng et")}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{t("Qaynar xətt")}</span>
                <span className="text-base font-extrabold text-slate-900 leading-none group-hover:text-blue-600 transition-colors">{t(CONTACT_INFO.HOTLINE_SHORT_DISPLAY)}</span>
              </div>
            </a>

            <button
              id="header-calculate-cta"
              onClick={() => handleNavClick('/', 'estimator-section')}
              className="bg-blue-600 text-white px-3.5 xl:px-4 py-2 rounded-lg text-xs xl:text-sm font-semibold shadow-sm hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >{t("Qiymət hesabla")}</button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <a
              id="mobile-phone-btn"
              href={CONTACT_INFO.HOTLINE_TEL}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-sm transition-colors"
              title={t(CONTACT_INFO.HOTLINE_DISPLAY)}
              aria-label={t("878 qaynar xəttinə zəng et")}
            >
              <Phone className="w-4 h-4" />
              <span>{t(CONTACT_INFO.HOTLINE_SHORT_DISPLAY)}</span>
            </a>
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label={t(mobileMenuOpen ? 'Menyunu bağla' : 'Menyunu aç')}
            >
              {t(mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />)}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {t(mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="lg:hidden fixed inset-x-0 top-18 sm:top-20 z-50 bg-white border-b border-slate-200 shadow-2xl overflow-y-auto overscroll-contain h-[calc(100dvh-4.5rem)] px-4 pt-2 pb-[calc(3rem+env(safe-area-inset-bottom,0px))] flex flex-col justify-between"
        >
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
              <Truck className="w-5 h-5 text-blue-600" />{t("Yükdaşıma")}</Link>
            <Link
              href="/evakuator"
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectService('evakuasiya');
              }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold ${
                pathname === '/evakuator' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-700'
              }`}
            >
              <Car className="w-5 h-5 text-blue-600" />{t("Evakuator")}</Link>
          </div>

          <Link
            href="/evden-eve-yukdasima"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >{t("Evdən Evə Daşıma")}</Link>
          <Link
            href="/mebel-dasinmasi"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >{t("Mebel Daşınması")}</Link>
          <Link
            href="/ofis-dasinmasi"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >{t("Ofis Daşınması")}</Link>
          <Link
            href="/yuk-masini"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >{t("Yük Maşını Sifarişi")}</Link>
          <Link
            href="/fehle-xidmeti"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >{t("Fəhlə Xidməti")}</Link>
          <Link
            href="/qiymetler"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >{t("Qiymətlər")}</Link>
          <Link
            href="/elaqe"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >{t("Əlaqə")}</Link>

          <div className="pt-4 pb-2 space-y-2.5 shrink-0 border-t border-slate-100 mt-4">
            <a
              id="mobile-drawer-call-btn"
              href={CONTACT_INFO.PRIMARY_PHONE_TEL}
              onClick={() => {
                trackConversionEvent('mobile_call_click', {
                  page_path: pathname,
                  cta_location: 'navbar_mobile_drawer',
                });
              }}
              aria-label={t(`${CONTACT_INFO.PRIMARY_PHONE_DISPLAY} nömrəsinə zəng et`)}
              className="w-full py-3.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-xs text-center flex items-center justify-center gap-2 hover:bg-slate-800 active:bg-slate-950 transition-colors"
            >
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{t("Zəng et: ")}{t(CONTACT_INFO.PRIMARY_PHONE_DISPLAY)}</span>
            </a>

            <button
              onClick={() => handleNavClick('/', 'estimator-section')}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md text-center flex items-center justify-center gap-2 hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
            >
              <span>{t("Qiymət hesabla")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </header>
  );
};
