import fs from 'fs';
import path from 'path';
import { getAllPrerenderRoutes } from './prerender';
import { getPageSeo } from '../src/seo/metadata';

interface RouteAudit {
  route: string;
  filePath: string;
  fileSizeKb: number;
  title: string;
  metaDescription: string;
  canonical: string;
  h1: string;
  hasRootContent: boolean;
  rootLength: number;
  hasStructuredData: boolean;
  structuredDataTypes: string[];
}

export function auditPrerenderedRoutes() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const { staticRoutes, evacRoutes, yukRoutes, allRoutes } = getAllPrerenderRoutes();

  console.log(`\n======================================================`);
  console.log(`🔍 [P2 Audit Engine] Auditing Static Prerendered HTML Files`);
  console.log(`======================================================`);

  const sampleRoutes = [
    '/',
    '/yukdasima',
    '/evakuator',
    '/yukdasima/baki-gence',
    '/evakuator/baki-qebele',
  ];

  const sampleAudits: RouteAudit[] = [];

  let totalFilesChecked = 0;
  let priceLeakMatches: Array<{ file: string; match: string }> = [];

  // Fixed price leak regex patterns that might expose internal fixed tariffs directly in public copy
  // (Note: we allow general numbers, phone numbers, years, percentages, volume m3, but look for fixed monetary claims like '280 AZN', '240 AZN', etc. in static body)
  // Let's check for any leaked pricing patterns in headings/paragraphs/cards
  const leakedPricePattern = /(?:qiyməti\s*:\s*\d+\s*AZN|başlayan\s+qiymətlərlə\s*:\s*\d+\s*AZN|\b\d+\s*AZN-dən\s+başlayan\s+qiymət)/i;

  for (const route of allRoutes) {
    const filePath =
      route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.replace(/^\//, ''), 'index.html');

    if (!fs.existsSync(filePath)) {
      throw new Error(`Audit Failure: Missing prerendered HTML file for route: ${route} at ${filePath}`);
    }

    totalFilesChecked++;
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract Title
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : '';

    // Extract Meta Description
    const metaDescMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);
    const metaDescription = metaDescMatch ? metaDescMatch[1] : '';

    // Extract Canonical
    const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="(.*?)"/i);
    const canonical = canonicalMatch ? canonicalMatch[1] : '';

    // Extract H1
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

    // Extract Root Content
    const rootStart = content.indexOf('<div id="root">') + '<div id="root">'.length;
    const bodyEnd = content.indexOf('</body>', rootStart);
    const lastDiv = content.lastIndexOf('</div>', bodyEnd);
    const rootContent = lastDiv > rootStart ? content.slice(rootStart, lastDiv) : '';
    const hasRootContent = rootContent.length > 500;



    // Extract Structured Data JSON-LD
    const jsonLdMatch = content.match(
      /<script\s+id="seo-structured-data-jsonld"\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i
    );
    const hasStructuredData = !!jsonLdMatch;
    let structuredDataTypes: string[] = [];
    if (jsonLdMatch) {
      try {
        const parsed = JSON.parse(jsonLdMatch[1]);
        if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
          structuredDataTypes = parsed['@graph'].map((n: any) => n['@type']);
        }
      } catch (e) {
        console.error('Invalid JSON-LD in', route);
      }
    }

    // Check for price leakage
    const leakTest = content.match(leakedPricePattern);
    if (leakTest) {
      priceLeakMatches.push({ file: filePath, match: leakTest[0] });
    }

    if (sampleRoutes.includes(route)) {
      sampleAudits.push({
        route,
        filePath,
        fileSizeKb: Math.round(content.length / 1024),
        title,
        metaDescription,
        canonical,
        h1,
        hasRootContent,
        rootLength: rootContent.length,
        hasStructuredData,
        structuredDataTypes,
      });
    }
  }

  console.log(`\n✅ Verified all ${totalFilesChecked} static HTML files across the route registry.`);
  console.log(`✅ Price Leak Scan Results: ${priceLeakMatches.length} leaks detected across ${totalFilesChecked} HTML files.`);

  console.log(`\n======================================================`);
  console.log(`📋 REPRESENTATIVE ROUTES RAW HTML AUDIT (WITHOUT JS)`);
  console.log(`======================================================`);

  for (const sample of sampleAudits) {
    console.log(`\n--- [ROUTE]: ${sample.route} ---`);
    console.log(`  File:            ${sample.filePath} (${sample.fileSizeKb} KB)`);
    console.log(`  Title:           ${sample.title}`);
    console.log(`  Meta Desc:       ${sample.metaDescription}`);
    console.log(`  Canonical:       ${sample.canonical}`);
    console.log(`  H1:              ${sample.h1}`);
    console.log(`  DOM Root Size:   ${sample.rootLength} characters (Prerendered HTML: ${sample.hasRootContent ? 'YES' : 'NO'})`);
    console.log(`  JSON-LD Graph:   ${sample.hasStructuredData ? 'YES' : 'NO'} -> [${sample.structuredDataTypes.join(', ')}]`);
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('audit-p2.ts')) {
  auditPrerenderedRoutes();
}
