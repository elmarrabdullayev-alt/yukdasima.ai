import React from 'react';
import {
  Truck,
  Armchair,
  Building2,
  Users2,
  Container,
  Car,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { ServiceType } from '../types';
import { SERVICES_DATA } from '../data/mockData';

interface ServicesSectionProps {
  onSelectService: (service: ServiceType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'truck':
        return <Truck className="w-6 h-6 text-blue-600" />;
      case 'sofa':
        return <Armchair className="w-6 h-6 text-blue-600" />;
      case 'building':
        return <Building2 className="w-6 h-6 text-blue-600" />;
      case 'users':
        return <Users2 className="w-6 h-6 text-blue-600" />;
      case 'container':
        return <Container className="w-6 h-6 text-blue-600" />;
      case 'car':
        return <Car className="w-6 h-6 text-blue-600" />;
      default:
        return <Truck className="w-6 h-6 text-blue-600" />;
    }
  };

  const handleCardClick = (id: string) => {
    if (id === 'srv-6') {
      onSelectService('evakuasiya');
    } else {
      onSelectService('yukdasima');
    }
    const element = document.getElementById('estimator-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services-section" className="py-14 sm:py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Peşəkar Logistika & Daşıma</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Xidmətlərimiz
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Mənzil köçürülməsindən tutmuş 24/7 qəza evakuasiyasına qədər bütün xidmətlər bir ünvanda.
          </p>
        </div>

        {/* 6 SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((srv) => (
            <div
              key={srv.id}
              onClick={() => handleCardClick(srv.id)}
              className="group rounded-2xl p-6 sm:p-7 bg-slate-50/70 border border-slate-200/90 hover:border-blue-500 hover:bg-white hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-13 h-13 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                  {getIcon(srv.iconName)}
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  {srv.title}
                </h3>

                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                  {srv.description}
                </p>

                {/* Features list */}
                <div className="mt-5 space-y-2">
                  {srv.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>Qiymət hesabla</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
