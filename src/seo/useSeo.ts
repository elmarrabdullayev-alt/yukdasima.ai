import { useEffect } from 'react';
import { getPageSeo, SITE_NAME, SITE_URL } from './metadata';
import { CONTACT_INFO } from '../constants/contact';

export function useSeo(pathname: string) {
  useEffect(() => {
    const seo = getPageSeo(pathname);

    // 1. Update Title
    document.title = seo.title;

    // Helper to create or update meta tag
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', seo.metaDescription);
    if (seo.keywords && seo.keywords.length > 0) {
      setMetaTag('name', 'keywords', seo.keywords.join(', '));
    }

    // 3. Open Graph Meta Tags
    setMetaTag('property', 'og:title', seo.title);
    setMetaTag('property', 'og:description', seo.metaDescription);
    setMetaTag('property', 'og:url', seo.canonicalUrl);
    setMetaTag('property', 'og:type', seo.ogType || 'website');
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:locale', 'az_AZ');

    // 4. Twitter / X Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.metaDescription);
    setMetaTag('name', 'twitter:url', seo.canonicalUrl);

    // 5. Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', seo.canonicalUrl);

    // 6. JSON-LD Structured Data
    const structuredDataId = 'seo-structured-data-jsonld';
    let scriptTag = document.getElementById(structuredDataId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = structuredDataId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    // Graph nodes array
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
        telephone: CONTACT_INFO.MOBILE_TEL.replace('tel:', ''),
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
          telephone: CONTACT_INFO.HOTLINE_NUMBER,
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

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': graphNodes,
    };

    scriptTag.text = JSON.stringify(structuredData);
  }, [pathname]);
}
