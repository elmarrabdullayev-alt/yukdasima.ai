/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ServiceType, CallbackInitialData } from './types';
import { Navbar } from './components/Navbar';
import { MobileStickyBar } from './components/MobileStickyBar';
import { ContactCallbackModal } from './components/ContactCallbackModal';
import { Footer } from './components/Footer';
import { RouterProvider, useRouter } from './router/RouterContext';
import { useSeo } from './seo/useSeo';
import { PAGE_SEO_CONFIGS } from './seo/metadata';

// Page Components
import { HomePage } from './pages/HomePage';
import { YukdasimaPage } from './pages/YukdasimaPage';
import { EvakuasiyaPage } from './pages/EvakuasiyaPage';
import { EvdenEveYukdasimaPage } from './pages/EvdenEveYukdasimaPage';
import { MebelDasinmasiPage } from './pages/MebelDasinmasiPage';
import { OfisDasinmasiPage } from './pages/OfisDasinmasiPage';
import { YukMasiniPage } from './pages/YukMasiniPage';
import { FehleXidmetiPage } from './pages/FehleXidmetiPage';
import { QiymetlerPage } from './pages/QiymetlerPage';
import { ElaqePage } from './pages/ElaqePage';
import { EvakuatorRoutePage } from './pages/EvakuatorRoutePage';
import { YukdasimaRoutePage } from './pages/YukdasimaRoutePage';
import { NotFoundPage } from './pages/NotFoundPage';

/** Static pages (same list that is prerendered and listed in the sitemap). */
const STATIC_PAGE_PATHS = new Set(Object.keys(PAGE_SEO_CONFIGS));

function AppContent() {
  const { pathname } = useRouter();
  const [activeService, setActiveService] = useState<ServiceType>('yukdasima');
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackData, setCallbackData] = useState<CallbackInitialData | undefined>(undefined);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu automatically on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isDynamicRoute =
    pathname.startsWith('/evakuator/') || (pathname.startsWith('/yukdasima/') && pathname !== '/yukdasima');
  const isNotFound = !isDynamicRoute && !STATIC_PAGE_PATHS.has(pathname);

  // Dynamically update document head (meta tags, title, canonical link, JSON-LD)
  useSeo(pathname, isNotFound);

  const handleOpenCallback = (data?: string | CallbackInitialData) => {
    if (typeof data === 'string') {
      setCallbackData({ phone: data });
    } else if (data) {
      setCallbackData(data);
    } else {
      setCallbackData(undefined);
    }
    setIsCallbackOpen(true);
  };

  const handleCloseCallback = () => {
    setIsCallbackOpen(false);
    setCallbackData(undefined);
  };

  // Route router switcher
  const renderCurrentPage = () => {
    // 1. Programmatic dynamic evacuator routes (e.g. /evakuator/baki-agdas)
    if (pathname.startsWith('/evakuator/')) {
      const slug = pathname.replace('/evakuator/', '');
      return <EvakuatorRoutePage routeSlug={slug} onOpenCallback={handleOpenCallback} />;
    }

    // 2. Programmatic dynamic yukdasima routes (e.g. /yukdasima/baki-gence)
    if (pathname.startsWith('/yukdasima/') && pathname !== '/yukdasima') {
      const slug = pathname.replace('/yukdasima/', '');
      return <YukdasimaRoutePage routeSlug={slug} onOpenCallback={handleOpenCallback} />;
    }

    switch (pathname) {
      case '/yukdasima':
        return <YukdasimaPage onOpenCallback={handleOpenCallback} />;
      case '/evakuator':
        return <EvakuasiyaPage onOpenCallback={handleOpenCallback} />;
      case '/evden-eve-yukdasima':
        return <EvdenEveYukdasimaPage onOpenCallback={handleOpenCallback} />;
      case '/mebel-dasinmasi':
        return <MebelDasinmasiPage onOpenCallback={handleOpenCallback} />;
      case '/ofis-dasinmasi':
        return <OfisDasinmasiPage onOpenCallback={handleOpenCallback} />;
      case '/yuk-masini':
        return <YukMasiniPage onOpenCallback={handleOpenCallback} />;
      case '/fehle-xidmeti':
        return <FehleXidmetiPage onOpenCallback={handleOpenCallback} />;
      case '/qiymetler':
        return <QiymetlerPage onOpenCallback={handleOpenCallback} />;
      case '/elaqe':
        return <ElaqePage onOpenCallback={handleOpenCallback} />;
      case '/':
        return (
          <HomePage
            activeService={activeService}
            onSelectService={setActiveService}
            onOpenCallback={handleOpenCallback}
          />
        );
      default:
        // Unknown address: "page not found" instead of a copy of the home page
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* 1. Header / Navbar */}
      <Navbar
        activeService={activeService}
        onSelectService={setActiveService}
        onOpenCallback={() => handleOpenCallback()}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuChange={setIsMobileMenuOpen}
      />

      {/* 2. Main Page Content View */}
      <main className="grow pb-20 lg:pb-0">
        {renderCurrentPage()}
      </main>

      {/* 3. Global Footer */}
      <Footer
        onSelectService={setActiveService}
        onOpenCallback={() => handleOpenCallback()}
      />

      {/* 4. Persistent Mobile Sticky Bottom Bar */}
      <MobileStickyBar
        activeService={activeService}
        onSelectService={setActiveService}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* 5. Quick Contact Callback Modal */}
      <ContactCallbackModal
        isOpen={isCallbackOpen}
        initialData={callbackData}
        onClose={handleCloseCallback}
      />
    </div>
  );
}

export default function App({ initialPath }: { initialPath?: string } = {}) {
  return (
    <RouterProvider initialPath={initialPath}>
      <AppContent />
    </RouterProvider>
  );
}

