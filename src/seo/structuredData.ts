import { PageSeoConfig, SITE_NAME, SITE_URL, OG_IMAGE, LOGO_URL, GOOGLE_BUSINESS_PROFILE } from './metadata';
import { CONTACT_INFO } from '../constants/contact';
import { translateTo } from '../i18n';

export function buildStructuredData(seo: PageSeoConfig): Record<string, unknown> {
  // Texts in the schema follow the page language (Russian pages get Russian descriptions)
  const lang = seo.lang ?? 'az';
  const tr = (text: string): string => translateTo(text, lang);

  const graphNodes: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: tr('Bakı və Azərbaycan üzrə operativ yükdaşıma və 24/7 evakuasiya xidməti platforması'),
      inLanguage: ['az', 'ru'],
      publisher: {
        '@id': `${SITE_URL}/#business`,
      },
    },
    {
      // Moving company + tow service. The same business as the Google Business Profile
      // (linked through hasMap / sameAs), so search engines and AI assistants see one entity.
      '@type': ['MovingCompany', 'AutoTowing'],
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      alternateName: [GOOGLE_BUSINESS_PROFILE.name, 'Yükdaşıma AI'],
      description: tr(
        'Bakı və regionlarda yükdaşıma və evakuator xidməti: ev və ofis köçürülməsi, mebel daşınması, yük maşını sifarişi, fəhlə xidməti və 24/7 evakuator. Şəkillərlə AI həcm analizi və onlayn ilkin qiymət.'
      ),
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
        width: 512,
        height: 512,
      },
      image: OG_IMAGE.url,
      hasMap: GOOGLE_BUSINESS_PROFILE.mapsUrl,
      sameAs: [GOOGLE_BUSINESS_PROFILE.mapsUrl],
      telephone: CONTACT_INFO.PRIMARY_PHONE_RAW,
      areaServed: [
        {
          '@type': 'City',
          name: tr('Bakı'),
        },
        {
          '@type': 'AdministrativeArea',
          name: tr('Abşeron'),
        },
        {
          '@type': 'Country',
          name: tr('Azərbaycan'),
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bakı',
        addressCountry: 'AZ',
      },
      priceRange: '$$',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: CONTACT_INFO.PRIMARY_PHONE_RAW,
        contactType: 'customer service',
        availableLanguage: 'Azerbaijani',
      },
      knowsAbout: [
        tr('Yükdaşıma'),
        tr('Evdən evə köçürülmə'),
        tr('Ofis daşınması'),
        tr('Mebel daşınması'),
        tr('Yük maşını sifarişi'),
        tr('Fəhlə xidməti'),
        tr('Evakuator xidməti'),
      ],
    },
  ];

  // Add WebPage Schema
  graphNodes.push({
    '@type': 'WebPage',
    '@id': `${seo.canonicalUrl}#webpage`,
    url: seo.canonicalUrl,
    name: seo.title,
    description: seo.metaDescription,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    inLanguage: lang,
  });

  // Add Service Schema if schemaType is Service
  if (seo.schemaType === 'Service') {
    graphNodes.push({
      '@type': 'Service',
      '@id': `${seo.canonicalUrl}#service`,
      name: seo.serviceName || seo.h1,
      description: seo.metaDescription,
      provider: {
        '@id': `${SITE_URL}/#business`,
      },
      areaServed: [
        {
          '@type': 'City',
          name: tr('Bakı'),
        },
        {
          '@type': 'AdministrativeArea',
          name: tr('Abşeron'),
        },
        {
          '@type': 'Country',
          name: tr('Azərbaycan'),
        },
      ],
      serviceType: seo.serviceTypeDetail || 'Moving and Freight Transportation Service',
      url: seo.canonicalUrl,
    });
  }

  // Add BreadcrumbList if defined
  if (seo.breadcrumbs && seo.breadcrumbs.length > 0) {
    graphNodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${seo.canonicalUrl}#breadcrumbs`,
      itemListElement: seo.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.item,
      })),
    });
  }

  // Add FAQPage Schema if faqs defined
  if (seo.faqs && seo.faqs.length > 0) {
    graphNodes.push({
      '@type': 'FAQPage',
      '@id': `${seo.canonicalUrl}#faq`,
      mainEntity: seo.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  };
}
