import { PageSeoConfig, SITE_NAME, SITE_URL } from './metadata';
import { CONTACT_INFO } from '../constants/contact';

export function buildStructuredData(seo: PageSeoConfig): Record<string, unknown> {
  const graphNodes: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: 'Bakı və Azərbaycan üzrə operativ yükdaşıma və 24/7 evakuasiya xidməti platforması',
      inLanguage: 'az',
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      telephone: CONTACT_INFO.PRIMARY_PHONE_RAW,
      areaServed: [
        {
          '@type': 'City',
          name: 'Bakı',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Abşeron',
        },
        {
          '@type': 'Country',
          name: 'Azərbaycan',
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
    inLanguage: 'az',
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
          name: 'Bakı',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Abşeron',
        },
        {
          '@type': 'Country',
          name: 'Azərbaycan',
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
