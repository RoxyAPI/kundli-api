/**
 * Kundli API example: Vedic birth chart (kundli, janam kundli, nakshatra precision)
 * Docs: https://roxyapi.com/api-reference
 */
import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY);

// Step 1: geocode the birth city to get latitude, longitude, timezone
const { data: loc } = await roxy.location.searchCities({ query: { q: 'New Delhi' } });
const { latitude, longitude, timezone } = loc.cities[0];

// Step 2: generate the Vedic birth chart (nakshatra precision, combustion, planetary war)
const { data: kundli } = await roxy.vedicAstrology.generateBirthChart({
  body: { date: '1990-07-04', time: '10:12:00', latitude, longitude, timezone },
});

const sun = kundli.meta.Sun;
const moon = kundli.meta.Moon;
const lagna = kundli.meta.Lagna;

console.log('--- Vedic Birth Chart ---');
console.log(`Sun:   ${sun.rashi}, ${sun.nakshatra.name} pada ${sun.nakshatra.pada}`);
console.log(`Moon:  ${moon.rashi}, ${moon.nakshatra.name} pada ${moon.nakshatra.pada}`);
console.log(`Lagna: ${lagna.rashi}, ${lagna.nakshatra.name} pada ${lagna.nakshatra.pada}`);
console.log('Combustion:', kundli.combustion.length ? kundli.combustion : 'none');
console.log('Planetary war:', kundli.planetaryWar.length ? kundli.planetaryWar : 'none');
console.log('Houses:', kundli.houses.slice(0, 3).map((h) => `${h.number}. ${h.name}`));
