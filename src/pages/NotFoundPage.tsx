import React, { useEffect } from 'react';
import { AlertCircle, Truck, Car, Phone } from 'lucide-react';
import { Link } from '../router/RouterContext';
import { CONTACT_INFO } from '../constants/contact';

/**
 * Shown for addresses that do not exist. The server answers these with HTTP 404,
 * and the page asks search engines not to index it, so Google never indexes
 * copies of the home page under random URLs.
 */
export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const created = !robots;
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    const previous = robots.getAttribute('content');
    robots.setAttribute('content', 'noindex, follow');
    document.title = 'Səhifə tapılmadı | yukdasima.ai';

    return () => {
      // Leaving the 404 page (client-side navigation): restore indexing for the next page
      if (created) {
        robots?.remove();
      } else if (previous !== null) {
        robots?.setAttribute('content', previous);
      }
    };
  }, []);

  return (
    <article className="py-16 sm:py-24 bg-slate-50 min-h-[60vh] text-slate-900">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-200 text-slate-700 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Səhifə tapılmadı</h1>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Axtardığınız səhifə mövcud deyil və ya ünvanı dəyişib. Aşağıdakı bölmələrdən birinə keçin və ya bizimlə əlaqə saxlayın.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/yukdasima"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-colors"
          >
            <Truck className="w-4 h-4" />
            <span>Yükdaşıma</span>
          </Link>
          <Link
            href="/evakuator"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-sm transition-colors"
          >
            <Car className="w-4 h-4" />
            <span>Evakuator</span>
          </Link>
          <a
            href={CONTACT_INFO.PRIMARY_PHONE_TEL}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Zəng et: {CONTACT_INFO.PRIMARY_PHONE_DISPLAY}</span>
          </a>
        </div>
        <p className="text-sm">
          <Link href="/" className="text-blue-700 font-semibold hover:underline">
            Ana səhifəyə qayıt
          </Link>
        </p>
      </div>
    </article>
  );
};
