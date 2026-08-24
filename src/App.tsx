/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ServiceType } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EstimatorSection } from './components/EstimatorSection';
import { HowItWorks } from './components/HowItWorks';
import { AiQuestionBox } from './components/AiQuestionBox';
import { ServicesSection } from './components/ServicesSection';
import { TrustSection } from './components/TrustSection';
import { FaqSection } from './components/FaqSection';
import { MobileStickyBar } from './components/MobileStickyBar';
import { ContactCallbackModal } from './components/ContactCallbackModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeService, setActiveService] = useState<ServiceType>('yukdasima');
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('');

  const handleOpenCallback = (phone?: string) => {
    if (phone) setCallbackPhone(phone);
    setIsCallbackOpen(true);
  };

  const handleCloseCallback = () => {
    setIsCallbackOpen(false);
    setCallbackPhone('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* 1. Header / Navbar */}
      <Navbar
        activeService={activeService}
        onSelectService={setActiveService}
        onOpenCallback={() => handleOpenCallback()}
      />

      {/* Main Content Flow */}
      <main className="grow">
        {/* 2. Hero Section with 2 prominent service cards */}
        <HeroSection
          activeService={activeService}
          onSelectService={setActiveService}
        />

        {/* 3. Quick Price Section & Service-Specific Estimator Flow */}
        <EstimatorSection
          activeService={activeService}
          onSelectService={setActiveService}
          onOpenCallback={handleOpenCallback}
        />

        {/* 4. How It Works (Necə işləyir?) */}
        <HowItWorks onSelectService={setActiveService} />

        {/* 5. AI Question Box (Daşıma ilə bağlı sualınız var?) */}
        <AiQuestionBox onSelectService={setActiveService} />

        {/* 6. Services Section (Xidmətlərimiz) */}
        <ServicesSection onSelectService={setActiveService} />

        {/* 7. Trust Section (Niyə yukdasima.ai?) */}
        <TrustSection />

        {/* 8. FAQ Section (Tez-tez verilən suallar) */}
        <FaqSection onOpenCallback={() => handleOpenCallback()} />
      </main>

      {/* 9. Footer */}
      <Footer
        onSelectService={setActiveService}
        onOpenCallback={() => handleOpenCallback()}
      />

      {/* 10. Persistent Mobile Sticky Bottom Bar */}
      <MobileStickyBar
        activeService={activeService}
        onSelectService={setActiveService}
      />

      {/* 11. Quick Contact Callback Modal */}
      <ContactCallbackModal
        isOpen={isCallbackOpen}
        initialPhone={callbackPhone}
        onClose={handleCloseCallback}
      />
    </div>
  );
}
