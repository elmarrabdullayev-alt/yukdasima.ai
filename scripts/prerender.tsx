import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import App from '../src/App';
import {
  getAllApprovedEvakuatorRoutes,
  getAllApprovedYukdasimaRoutes,
} from '../src/seo/routeRegistry';
import {
  PAGE_SEO_CONFIGS,
  getPageSeo,
  SITE_NAME,
  SITE_URL,
  PageSeoConfig,
  getOgImage,
} from '../src/seo/metadata';
import { registerRuDictionary, splitLangPath } from '../src/i18n';
import { RU_AVAILABLE_PATHS, toRuPath } from '../src/i18n/paths';
import { RU_DICTIONARY } from '../src/i18n/ru';

// Russian pages are rendered with the Russian dictionary (Azerbaijani pages are not affected)
registerRuDictionary(RU_DICTIONARY);
import { buildLlmsTxt } from '../src/seo/llms';
import { buildStructuredData } from '../src/seo/structuredData';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export interface PrerenderResult {
  totalRoutes: number;
  staticCount: number;
  evakuatorCount: number;
  yukdasimaCount: number;
  generatedFiles: string[];
  durationMs: number;
}

export function getAllPrerenderRoutes(): {
  staticRoutes: string[];
  evacRoutes: string[];
  yukRoutes: string[];
  ruRoutes: string[];
  allRoutes: string[];
} {
  const staticRoutes = Object.keys(PAGE_SEO_CONFIGS);
  const evacRoutes = getAllApprovedEvakuatorRoutes().map((r) => r.routePath);
  const yukRoutes = getAllApprovedYukdasimaRoutes().map((r) => r.routePath);
  const ruRoutes = RU_AVAILABLE_PATHS.map(toRuPath);
  const allRoutes = [...staticRoutes, ...evacRoutes, ...yukRoutes, ...ruRoutes];

  return { staticRoutes, evacRoutes, yukRoutes, ruRoutes, allRoutes };
}

export function injectSeoIntoHtml(
  templateHtml: string,
  route: string,
  bodyHtml: string
): string {
  const { lang, path: pagePath } = splitLangPath(route);
  const seo = getPageSeo(pagePath, lang);
  const ogImage = getOgImage(lang);
  const structuredData = buildStructuredData(seo);

  let html = templateHtml;

  // 0. Page language
  html = html.replace(/<html([^>]*?)\slang="[^"]*"/i, `<html$1 lang="${lang}"`);

  // 1. Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);

  // 2. Head Tags to inject
  const headElements: string[] = [];

  // Description
  headElements.push(`<meta name="description" content="${escapeAttr(seo.metaDescription)}">`);

  // Keywords
  if (seo.keywords && seo.keywords.length > 0) {
    headElements.push(`<meta name="keywords" content="${escapeAttr(seo.keywords.join(', '))}">`);
  }

  // Canonical
  headElements.push(`<link rel="canonical" href="${escapeAttr(seo.canonicalUrl)}">`);

  // Open Graph
  headElements.push(`<meta property="og:title" content="${escapeAttr(seo.title)}">`);
  headElements.push(`<meta property="og:description" content="${escapeAttr(seo.metaDescription)}">`);
  headElements.push(`<meta property="og:url" content="${escapeAttr(seo.canonicalUrl)}">`);
  headElements.push(`<meta property="og:type" content="${escapeAttr(seo.ogType || 'website')}">`);
  headElements.push(`<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}">`);
  headElements.push(`<meta property="og:locale" content="${lang === 'ru' ? 'ru_RU' : 'az_AZ'}">`);
  headElements.push(`<meta property="og:image" content="${escapeAttr(ogImage.url)}">`);
  headElements.push(`<meta property="og:image:width" content="${ogImage.width}">`);
  headElements.push(`<meta property="og:image:height" content="${ogImage.height}">`);
  headElements.push(`<meta property="og:image:alt" content="${escapeAttr(ogImage.alt)}">`);

  // Twitter
  headElements.push(`<meta name="twitter:card" content="summary_large_image">`);
  headElements.push(`<meta name="twitter:title" content="${escapeAttr(seo.title)}">`);
  headElements.push(`<meta name="twitter:description" content="${escapeAttr(seo.metaDescription)}">`);
  headElements.push(`<meta name="twitter:url" content="${escapeAttr(seo.canonicalUrl)}">`);
  headElements.push(`<meta name="twitter:image" content="${escapeAttr(ogImage.url)}">`);

  // hreflang: the Azerbaijani and Russian versions of the same page point to each other
  if (seo.alternates) {
    headElements.push(`<link rel="alternate" hreflang="az" href="${escapeAttr(seo.alternates.az)}">`);
    headElements.push(`<link rel="alternate" hreflang="ru" href="${escapeAttr(seo.alternates.ru)}">`);
    headElements.push(`<link rel="alternate" hreflang="x-default" href="${escapeAttr(seo.alternates.az)}">`);
  }

  // JSON-LD Structured Data
  headElements.push(
    `<script id="seo-structured-data-jsonld" type="application/ld+json">${JSON.stringify(structuredData)}</script>`
  );

  // Remove existing generic tags from template to avoid duplication
  html = html.replace(/<meta\s+name="description"[\s\S]*?>/gi, '');
  html = html.replace(/<meta\s+name="keywords"[\s\S]*?>/gi, '');
  html = html.replace(/<meta\s+property="og:[^"]*"[\s\S]*?>/gi, '');
  html = html.replace(/<meta\s+name="twitter:[^"]*"[\s\S]*?>/gi, '');
  html = html.replace(/<link\s+rel="canonical"[\s\S]*?>/gi, '');
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*>/gi, '');
  html = html.replace(/<script\s+id="seo-structured-data-jsonld"[\s\S]*?<\/script>/gi, '');

  const injectedHead = '\n    ' + headElements.join('\n    ') + '\n  ';
  html = html.replace('</head>', `${injectedHead}</head>`);

  // 3. Inject Pre-rendered React Body into #root
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>/i,
    `<div id="root">${bodyHtml}</div>`
  );

  return html;
}

export function runPrerender(): PrerenderResult {
  const startTime = Date.now();
  const distDir = path.resolve(process.cwd(), 'dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    throw new Error(
      `Prerender Error: dist/index.html not found at ${templatePath}. Run 'vite build' first.`
    );
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  const { staticRoutes, evacRoutes, yukRoutes, ruRoutes, allRoutes } = getAllPrerenderRoutes();

  console.log(`\n======================================================`);
  console.log(`🚀 [P2 Prerender Engine] Starting Native Static Build-Time Prerendering`);
  console.log(`======================================================`);
  console.log(`  - Static Main Pages:     ${staticRoutes.length}`);
  console.log(`  - Evakuasiya Routes:     ${evacRoutes.length}`);
  console.log(`  - Yükdaşıma Routes:      ${yukRoutes.length}`);
  console.log(`  - Russian Pages (/ru):   ${ruRoutes.length}`);
  console.log(`  - Total Canonical Routes: ${allRoutes.length}`);
  console.log(`------------------------------------------------------`);

  const generatedFiles: string[] = [];

  for (const route of allRoutes) {
    // 1. Render React tree
    const bodyHtml = renderToString(React.createElement(App, { initialPath: route }));

    // 2. Inject SEO meta tags, title, canonical, structured data & body
    const finalHtml = injectSeoIntoHtml(templateHtml, route, bodyHtml);

    // 3. Determine target file path
    let targetFilePath: string;
    if (route === '/') {
      targetFilePath = path.join(distDir, 'index.html');
    } else {
      const relativeFolder = route.replace(/^\//, '');
      const folderPath = path.join(distDir, relativeFolder);
      fs.mkdirSync(folderPath, { recursive: true });
      targetFilePath = path.join(folderPath, 'index.html');
    }

    fs.writeFileSync(targetFilePath, finalHtml, 'utf-8');
    generatedFiles.push(targetFilePath);
  }

  // Ensure sitemap.xml and robots.txt are in dist
  const publicDir = path.resolve(process.cwd(), 'public');
  if (fs.existsSync(path.join(publicDir, 'sitemap.xml'))) {
    fs.copyFileSync(path.join(publicDir, 'sitemap.xml'), path.join(distDir, 'sitemap.xml'));
  }
  if (fs.existsSync(path.join(publicDir, 'robots.txt'))) {
    fs.copyFileSync(path.join(publicDir, 'robots.txt'), path.join(distDir, 'robots.txt'));
  }

  // llms.txt: short, factual summary of the business for AI assistants (ChatGPT, Gemini, Perplexity...),
  // generated from the same tariff and route data the site uses, so it never goes out of date.
  fs.writeFileSync(path.join(distDir, 'llms.txt'), buildLlmsTxt(), 'utf-8');

  const durationMs = Date.now() - startTime;

  console.log(`\n✅ [P2 Prerender Engine] Completed successfully in ${durationMs}ms`);
  console.log(`   Total Static HTML Files Written: ${generatedFiles.length}/${allRoutes.length}`);
  console.log(`======================================================\n`);

  return {
    totalRoutes: allRoutes.length,
    staticCount: staticRoutes.length,
    evakuatorCount: evacRoutes.length,
    yukdasimaCount: yukRoutes.length,
    generatedFiles,
    durationMs,
  };
}

// Direct CLI execution
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('prerender.tsx')) {
  try {
    runPrerender();
  } catch (err) {
    console.error('❌ Prerender failed:', err);
    process.exit(1);
  }
}
