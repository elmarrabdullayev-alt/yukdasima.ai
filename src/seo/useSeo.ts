import { useEffect } from 'react';
import { getPageSeo, SITE_NAME, getOgImage } from './metadata';
import { buildStructuredData } from './structuredData';
import { Lang } from '../i18n';

export function useSeo(pathname: string, isNotFound = false, lang: Lang = 'az') {
  useEffect(() => {
    const seo = getPageSeo(pathname, lang);
    const ogImage = getOgImage(lang);

    // 1. Update Title and page language
    document.title = isNotFound
      ? `${lang === 'ru' ? 'Страница не найдена' : 'Səhifə tapılmadı'} | ${SITE_NAME}`
      : seo.title;
    document.documentElement.lang = lang;

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
    setMetaTag('property', 'og:locale', lang === 'ru' ? 'ru_RU' : 'az_AZ');
    setMetaTag('property', 'og:image', ogImage.url);
    setMetaTag('property', 'og:image:width', String(ogImage.width));
    setMetaTag('property', 'og:image:height', String(ogImage.height));
    setMetaTag('property', 'og:image:alt', ogImage.alt);

    // 4. Twitter / X Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.metaDescription);
    setMetaTag('name', 'twitter:url', seo.canonicalUrl);
    setMetaTag('name', 'twitter:image', ogImage.url);

    // 5. Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', seo.canonicalUrl);

    // 5b. hreflang links between the Azerbaijani and Russian versions of the same page
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (seo.alternates && !isNotFound) {
      const links: Array<[string, string]> = [
        ['az', seo.alternates.az],
        ['ru', seo.alternates.ru],
        ['x-default', seo.alternates.az],
      ];
      for (const [hreflang, href] of links) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        link.setAttribute('href', href);
        document.head.appendChild(link);
      }
    }

    // 6. JSON-LD Structured Data
    const structuredDataId = 'seo-structured-data-jsonld';
    let scriptTag = document.getElementById(structuredDataId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = structuredDataId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData = buildStructuredData(seo);
    scriptTag.text = JSON.stringify(structuredData);
  }, [pathname, isNotFound, lang]);
}

