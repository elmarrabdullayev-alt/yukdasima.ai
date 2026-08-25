import {
  getAllApprovedYukdasimaRoutes,
  getAllApprovedEvakuatorRoutes,
  getApprovedYukdasimaRoute,
  getApprovedEvakuatorRoute,
} from '../src/seo/routeRegistry';
import {
  REGIONAL_DESTINATIONS,
  ECONOMIC_REGION_GROUPS,
  getGeographicNeighbors,
  getEconomicRegionGroup,
} from '../src/seo/regionalData';

console.log('=== P3.1 REGIONAL TAXONOMY & INTERNAL LINKING AUDIT ===\n');

const yukdasimaRoutes = getAllApprovedYukdasimaRoutes();
const evakuatorRoutes = getAllApprovedEvakuatorRoutes();

console.log(`1. Total Registered Routes:`);
console.log(`   - Yukdasima regional routes: ${yukdasimaRoutes.length}`);
console.log(`   - Evakuator regional routes: ${evakuatorRoutes.length}`);
console.log(`   - Total Regional Routes: ${yukdasimaRoutes.length + evakuatorRoutes.length}`);

// Test Regional Taxonomy Coverage
let missingYukInTaxonomy: string[] = [];
let missingEvacInTaxonomy: string[] = [];

for (const r of yukdasimaRoutes) {
  if (!REGIONAL_DESTINATIONS[r.slug]) {
    missingYukInTaxonomy.push(r.slug);
  }
}

for (const r of evakuatorRoutes) {
  if (!REGIONAL_DESTINATIONS[r.slug]) {
    missingEvacInTaxonomy.push(r.slug);
  }
}

console.log(`\n2. Taxonomy Coverage:`);
console.log(`   - Missing Yukdasima slugs in REGIONAL_DESTINATIONS: ${missingYukInTaxonomy.length} ${missingYukInTaxonomy.join(', ')}`);
console.log(`   - Missing Evakuator slugs in REGIONAL_DESTINATIONS: ${missingEvacInTaxonomy.length} ${missingEvacInTaxonomy.join(', ')}`);

// Test Economic Region Groups Coverage
let slugsInGroups = new Set<string>();
for (const g of ECONOMIC_REGION_GROUPS) {
  for (const s of g.destinationSlugs) {
    slugsInGroups.add(s);
  }
}

let unassignedSlugs: string[] = [];
for (const slug of Object.keys(REGIONAL_DESTINATIONS)) {
  if (!slugsInGroups.has(slug)) {
    unassignedSlugs.push(slug);
  }
}

console.log(`\n3. Economic Region Groups:`);
console.log(`   - Total Economic Groups: ${ECONOMIC_REGION_GROUPS.length}`);
console.log(`   - Total Slugs assigned to groups: ${slugsInGroups.size}`);
console.log(`   - Unassigned Slugs: ${unassignedSlugs.length} ${unassignedSlugs.join(', ')}`);

// Test Link Balance Simulation:
// Inbound links per route:
// 1. From Hub Page (/yukdasima or /evakuasiya): +1 for all routes in that service
// 2. From Home Page: +1 for routes linked on home page
// 3. From Cross-service counterpart: +1 if counterpart exists
// 4. From Neighbor routes: +1 for each route that lists it as a neighbor

const inboundYuk = new Map<string, number>();
const inboundEvac = new Map<string, number>();

for (const r of yukdasimaRoutes) inboundYuk.set(r.slug, 0);
for (const r of evakuatorRoutes) inboundEvac.set(r.slug, 0);

// Hub page links
for (const r of yukdasimaRoutes) {
  inboundYuk.set(r.slug, (inboundYuk.get(r.slug) || 0) + 1);
}
for (const r of evakuatorRoutes) {
  inboundEvac.set(r.slug, (inboundEvac.get(r.slug) || 0) + 1);
}

// Cross-service links
for (const r of evakuatorRoutes) {
  if (getApprovedYukdasimaRoute(r.slug)) {
    inboundYuk.set(r.slug, (inboundYuk.get(r.slug) || 0) + 1);
  }
}
for (const r of yukdasimaRoutes) {
  if (getApprovedEvakuatorRoute(r.slug)) {
    inboundEvac.set(r.slug, (inboundEvac.get(r.slug) || 0) + 1);
  }
}

// Neighbor links in Yukdasima
for (const r of yukdasimaRoutes) {
  const neighbors = getGeographicNeighbors(r.slug);
  const regionGroup = getEconomicRegionGroup(r.slug);
  let resolved = neighbors
    .map((n) => yukdasimaRoutes.find((yr) => yr.slug === n.slug))
    .filter((yr) => !!yr);

  if (resolved.length < 4 && regionGroup) {
    const fallback = regionGroup.destinationSlugs
      .filter((s) => s !== r.slug && !resolved.some((nr) => nr?.slug === s))
      .map((s) => yukdasimaRoutes.find((yr) => yr.slug === s))
      .filter((yr) => !!yr);
    resolved = [...resolved, ...fallback].slice(0, 6);
  }

  for (const nr of resolved) {
    if (nr) {
      inboundYuk.set(nr.slug, (inboundYuk.get(nr.slug) || 0) + 1);
    }
  }
}

// Neighbor links in Evakuator
for (const r of evakuatorRoutes) {
  const neighbors = getGeographicNeighbors(r.slug);
  const regionGroup = getEconomicRegionGroup(r.slug);
  let resolved = neighbors
    .map((n) => evakuatorRoutes.find((er) => er.slug === n.slug))
    .filter((er) => !!er);

  if (resolved.length < 4 && regionGroup) {
    const fallback = regionGroup.destinationSlugs
      .filter((s) => s !== r.slug && !resolved.some((nr) => nr?.slug === s))
      .map((s) => evakuatorRoutes.find((er) => er.slug === s))
      .filter((er) => !!er);
    resolved = [...resolved, ...fallback].slice(0, 6);
  }

  for (const nr of resolved) {
    if (nr) {
      inboundEvac.set(nr.slug, (inboundEvac.get(nr.slug) || 0) + 1);
    }
  }
}

// Stats for Yukdasima
const yukCounts = Array.from(inboundYuk.values());
const minYuk = Math.min(...yukCounts);
const maxYuk = Math.max(...yukCounts);
const avgYuk = (yukCounts.reduce((a, b) => a + b, 0) / yukCounts.length).toFixed(2);
const zeroYuk = yukCounts.filter((c) => c === 0).length;

// Stats for Evakuator
const evacCounts = Array.from(inboundEvac.values());
const minEvac = Math.min(...evacCounts);
const maxEvac = Math.max(...evacCounts);
const avgEvac = (evacCounts.reduce((a, b) => a + b, 0) / evacCounts.length).toFixed(2);
const zeroEvac = evacCounts.filter((c) => c === 0).length;

console.log(`\n4. Inbound Link Distribution (Yukdasima Routes):`);
console.log(`   - Minimum Inbound Links: ${minYuk}`);
console.log(`   - Maximum Inbound Links: ${maxYuk}`);
console.log(`   - Average Inbound Links: ${avgYuk}`);
console.log(`   - Orphan Routes (0 inbound links): ${zeroYuk}`);

console.log(`\n5. Inbound Link Distribution (Evakuator Routes):`);
console.log(`   - Minimum Inbound Links: ${minEvac}`);
console.log(`   - Maximum Inbound Links: ${maxEvac}`);
console.log(`   - Average Inbound Links: ${avgEvac}`);
console.log(`   - Orphan Routes (0 inbound links): ${zeroEvac}`);

console.log(`\n6. Summary:`);
if (missingYukInTaxonomy.length === 0 && missingEvacInTaxonomy.length === 0 && unassignedSlugs.length === 0 && zeroYuk === 0 && zeroEvac === 0 && minYuk >= 2 && minEvac >= 2) {
  console.log(`   ✅ ALL P3.1 CHECKS PASSED: 100% taxonomy coverage, 0 orphan routes, balanced geographic linking.`);
} else {
  console.error(`   ❌ SOME CHECKS FAILED`);
  process.exit(1);
}
