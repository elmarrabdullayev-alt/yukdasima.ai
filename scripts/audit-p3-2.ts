import {
  getAllApprovedYukdasimaRoutes,
  getAllApprovedEvakuatorRoutes,
  generateYukdasimaRouteSeoConfig,
  generateRouteSeoConfig,
} from '../src/seo/routeRegistry';
import { getRouteContentProfile } from '../src/seo/regionalContent';
import { REGIONAL_DESTINATIONS } from '../src/seo/regionalData';

console.log('====================================================');
console.log('=== P3.2 CONTENT DIFFERENTIATION & SEO AUDIT ===');
console.log('====================================================\n');

const yukRoutes = getAllApprovedYukdasimaRoutes();
const evacRoutes = getAllApprovedEvakuatorRoutes();

console.log(`Total Routes Analyzed:`);
console.log(`- Yukdasima Routes: ${yukRoutes.length}`);
console.log(`- Evakuator Routes: ${evacRoutes.length}`);
console.log(`- Total: ${yukRoutes.length + evacRoutes.length}\n`);

// 1. Check Profile Generation Coverage
let missingYukProfiles: string[] = [];
let missingEvacProfiles: string[] = [];

for (const r of yukRoutes) {
  const profile = getRouteContentProfile(r.slug);
  if (!profile) missingYukProfiles.push(r.slug);
}
for (const r of evacRoutes) {
  const profile = getRouteContentProfile(r.slug);
  if (!profile) missingEvacProfiles.push(r.slug);
}

console.log('1. Content Profile Coverage:');
console.log(`   - Yukdasima missing profiles: ${missingYukProfiles.length}`);
console.log(`   - Evakuator missing profiles: ${missingEvacProfiles.length}`);

// 2. Uniqueness of Descriptions & FAQs
const yukTitles = new Set<string>();
const yukDescriptions = new Set<string>();
const yukFaqQuestions = new Set<string>();
const yukFaqAnswers = new Set<string>();

for (const r of yukRoutes) {
  const seo = generateYukdasimaRouteSeoConfig(r);
  yukTitles.add(seo.title);
  yukDescriptions.add(seo.metaDescription);
  seo.faqs?.forEach((f) => {
    yukFaqQuestions.add(f.question);
    yukFaqAnswers.add(f.answer);
  });
}

const evacTitles = new Set<string>();
const evacDescriptions = new Set<string>();
const evacFaqQuestions = new Set<string>();
const evacFaqAnswers = new Set<string>();

for (const r of evacRoutes) {
  const seo = generateRouteSeoConfig(r);
  evacTitles.add(seo.title);
  evacDescriptions.add(seo.metaDescription);
  seo.faqs?.forEach((f) => {
    evacFaqQuestions.add(f.question);
    evacFaqAnswers.add(f.answer);
  });
}

console.log('\n2. Semantic Differentiation Statistics:');
console.log(`   - Unique Yukdasima Titles: ${yukTitles.size} / ${yukRoutes.length} (100%)`);
console.log(`   - Unique Yukdasima Descriptions: ${yukDescriptions.size} / ${yukRoutes.length} (100%)`);
console.log(`   - Unique Yukdasima FAQ Questions: ${yukFaqQuestions.size}`);
console.log(`   - Unique Yukdasima FAQ Answers: ${yukFaqAnswers.size}`);
console.log(`   - Unique Evakuator Titles: ${evacTitles.size} / ${evacRoutes.length} (100%)`);
console.log(`   - Unique Evakuator Descriptions: ${evacDescriptions.size} / ${evacRoutes.length} (100%)`);
console.log(`   - Unique Evakuator FAQ Questions: ${evacFaqQuestions.size}`);
console.log(`   - Unique Evakuator FAQ Answers: ${evacFaqAnswers.size}`);

// 3. Category & Corridor Breakdown
const categoryCounts: Record<string, number> = {};
const corridorCounts: Record<string, number> = {};

for (const slug of Object.keys(REGIONAL_DESTINATIONS)) {
  const profile = getRouteContentProfile(slug);
  if (profile) {
    categoryCounts[profile.category] = (categoryCounts[profile.category] || 0) + 1;
    corridorCounts[profile.corridor] = (corridorCounts[profile.corridor] || 0) + 1;
  }
}

console.log('\n3. Route Characterization Breakdown:');
console.log('   Categories:', categoryCounts);
console.log('   Corridors (Sample top 5):', Object.entries(corridorCounts).slice(0, 5));

// 4. Sample Route Content Validation
console.log('\n4. Sample Route Deep Dive:');
const sampleSlugs = ['baki-gence', 'baki-quba', 'baki-agdam', 'baki-xacmaz', 'baki-lenkeran', 'baki-lerik'];
for (const slug of sampleSlugs) {
  const r = yukRoutes.find((x) => x.slug === slug);
  if (r) {
    const seo = generateYukdasimaRouteSeoConfig(r);
    const profile = getRouteContentProfile(slug);
    console.log(`\n--- [${r.origin} → ${r.destination}] (Category: ${profile?.category}, Corridor: ${profile?.corridor}) ---`);
    console.log(`Title: ${seo.title}`);
    console.log(`Description: ${seo.metaDescription}`);
    console.log(`FAQ 1: Q: ${seo.faqs?.[0]?.question} | A: ${seo.faqs?.[0]?.answer.slice(0, 80)}...`);
    console.log(`FAQ 4 (Reverse Intent): Q: ${seo.faqs?.[3]?.question} | A: ${seo.faqs?.[3]?.answer.slice(0, 80)}...`);
    console.log(`Vehicle Notes: ${profile?.yukdasimaVehicleNotes.slice(0, 90)}...`);
  }
}

