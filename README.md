[![Kundli API](banner.png)](https://roxyapi.com/products/vedic-astrology-api)

# Kundli API

> Vedic birth chart API with nakshatra precision, retrograde flags, combustion, planetary war, and house interpretations. Roxy Ephemeris, verified against NASA JPL Horizons.

[![Get API Key](https://img.shields.io/badge/Get_API_Key-RoxyAPI-14b8a6?style=for-the-badge&logo=key&logoColor=white)](https://roxyapi.com/pricing)
[![Try Live](https://img.shields.io/badge/Try_API_Live-Free_in_browser-22c55e?style=for-the-badge&logo=swagger&logoColor=white)](https://roxyapi.com/api-reference)
[![Methodology](https://img.shields.io/badge/Methodology-NASA_JPL_verified-f59e0b?style=for-the-badge&logo=nasa&logoColor=white)](https://roxyapi.com/methodology)
[![MCP Server](https://img.shields.io/badge/MCP_Server-Streamable_HTTP-8b5cf6?style=for-the-badge&logo=anthropic&logoColor=white)](https://roxyapi.com/docs/mcp)
[![SDK](https://img.shields.io/badge/SDK-TypeScript_+_Python-3b82f6?style=for-the-badge&logo=npm&logoColor=white)](https://roxyapi.com/docs/sdk)

## What is Kundli API

The Kundli API calculates a complete Vedic birth chart (Janam Kundli) for any birth date, time, and location. It returns all 9 planetary positions (Navagraha) plus Ascendant (Lagna), grouped by zodiac sign (rashi), with nakshatra and pada details. The kundli calculator also flags combustion using Surya Siddhanta orbs, detects planetary war, and returns all 12 house (bhava) interpretations. Roxy Ephemeris, verified against NASA JPL Horizons. Built for kundli generation, horoscope matching, matrimonial sites, and Vedic astrology software. 10 spiritual domains in one subscription, Remote MCP server included.

## Why this API

| Property | Value |
|----------|-------|
| Coverage | 10 spiritual domains in one subscription |
| Calculation | Roxy Ephemeris, verified against NASA JPL Horizons |
| MCP server | `https://roxyapi.com/mcp/vedic-astrology` (Streamable HTTP, no local setup) |
| SDKs | TypeScript on npm `@roxyapi/sdk`, Python on PyPI `roxy-sdk` |
| Pricing | One key, flat per call, $39 for 25K calls |
| Licensing | Personal and commercial use, including closed source apps. No AGPL or GPL entanglement. [Full terms](https://roxyapi.com/policy/license) |
| Last verified | 2026-Q2 |

## Quick start

1. Get a key at [roxyapi.com/pricing](https://roxyapi.com/pricing)
2. Pick a language below
3. Copy the snippet, run, ship

### cURL

```bash
curl -X POST https://roxyapi.com/api/v2/vedic-astrology/birth-chart \
  -H "X-API-Key: $ROXY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"date":"1990-07-04","time":"10:12:00","latitude":28.6139,"longitude":77.209,"timezone":5.5}'
```

### Python

```python
import os
from roxy_sdk import create_roxy

roxy = create_roxy(os.environ["ROXY_API_KEY"])

# Step 1: geocode the birth city
city = roxy.location.search_cities(q="New Delhi")["cities"][0]

# Step 2: generate the Vedic kundli
kundli = roxy.vedic_astrology.generate_birth_chart(
    date="1990-07-04",
    time="10:12:00",
    latitude=city["latitude"],
    longitude=city["longitude"],
    timezone=city["timezone"],
)

sun = kundli["meta"]["Sun"]
print(f"Sun in {sun['rashi']}, nakshatra {sun['nakshatra']['name']} pada {sun['nakshatra']['pada']}")
print("Combustion:", kundli["combustion"])
print("Planetary war:", kundli["planetaryWar"])
```

### JavaScript (Node)

```js
import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY);

// Step 1: geocode the birth city
const { data: loc } = await roxy.location.searchCities({ query: { q: 'New Delhi' } });
const { latitude, longitude, timezone } = loc.cities[0];

// Step 2: generate the Vedic kundli
const { data: kundli } = await roxy.vedicAstrology.generateBirthChart({
  body: { date: '1990-07-04', time: '10:12:00', latitude, longitude, timezone },
});

const sun = kundli.meta.Sun;
console.log(`Sun in ${sun.rashi}, nakshatra ${sun.nakshatra.name} pada ${sun.nakshatra.pada}`);
console.log('Combustion:', kundli.combustion);
console.log('Planetary war:', kundli.planetaryWar);
```

### TypeScript

```ts
import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY!);

// Step 1: geocode the birth city
const { data: loc } = await roxy.location.searchCities({ query: { q: 'New Delhi' } });
const { latitude, longitude, timezone } = loc.cities[0];

// Step 2: generate the Vedic kundli (nakshatra precision, combustion, planetary war)
const { data: kundli } = await roxy.vedicAstrology.generateBirthChart({
  body: { date: '1990-07-04', time: '10:12:00', latitude, longitude, timezone },
});

const sun = kundli.meta.Sun;
console.log(`Sun in ${sun.rashi}, nakshatra ${sun.nakshatra.name} pada ${sun.nakshatra.pada}`);
console.log('Combustion:', kundli.combustion);
console.log('Planetary war:', kundli.planetaryWar);
```

## Request schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `date` | string | yes | Birth date in YYYY-MM-DD format. Determines planetary positions and nakshatra calculations for Vedic kundli (janam patri). Accurate birth date is essential for dashas, yoga calculations, and divisional charts (vargas). |
| `time` | string | yes | Birth time in 24-hour HH:MM:SS format. Critical for Lagna (Ascendant) calculation and house divisions (changes every 2 hours). Even minutes matter for accurate nakshatra pada and divisional chart (D9, D10) calculations. |
| `latitude` | number | yes | Birth location latitude in decimal degrees. Determines local sidereal time for Lagna calculation and affects bhava (house) cusps. Example: Delhi 28.6139, Mumbai 19.0760. |
| `longitude` | number | yes | Birth location longitude in decimal degrees. Affects local time calculations and ayanamsha adjustments. Example: Delhi 77.2090, Mumbai 72.8777. |
| `timezone` | number or string | no | Timezone as decimal hours from UTC (e.g. 5.5 for IST) or IANA name (e.g. "Asia/Kolkata"). IANA strings resolve to DST-correct offset for the given date. Defaults to 5.5 (IST). |

## Response shape

```json
{
  "aries": {
    "rashi": "aries",
    "signs": [
      {
        "graha": "Mars",
        "longitude": 0.52,
        "nakshatra": { "name": "Ashwini", "pada": 1, "key": 0 },
        "isRetrograde": false
      }
    ]
  },
  "meta": {
    "Sun": {
      "graha": "Sun",
      "rashi": "Gemini",
      "longitude": 78.25,
      "nakshatra": { "name": "Ardra", "pada": 4, "key": 5 },
      "isRetrograde": false
    },
    "Moon": {
      "graha": "Moon",
      "rashi": "Scorpio",
      "longitude": 215.34,
      "nakshatra": { "name": "Anuradha", "pada": 1, "key": 16 },
      "isRetrograde": false
    }
  },
  "houses": [
    { "number": 1, "name": "Lagna", "description": "The ascendant..." },
    { "number": 2, "name": "Dhana Bhava", "description": "Wealth house..." }
  ],
  "combustion": [
    { "planet": "Mercury", "distanceFromSun": 1.79, "orb": 14 }
  ],
  "planetaryWar": [],
  "interpretations": {
    "Sun": { "rashi": "...", "nakshatra": "..." }
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `aries` ... `pisces` | object | One key per zodiac sign (rashi). Contains `rashi` (sign name) and `signs` array (planets in that sign). |
| `signs[].graha` | string | Planet (graha) placed in this sign. One of the 9 Navagraha or Lagna. |
| `signs[].longitude` | number | Sidereal longitude in degrees (0-360) using Lahiri ayanamsa. |
| `signs[].nakshatra.name` | string | Nakshatra (lunar mansion, 1 of 27) the planet occupies. |
| `signs[].nakshatra.pada` | number | Nakshatra pada (quarter, 1-4). Each nakshatra has 4 padas of 3 degrees 20 arcminutes. |
| `signs[].nakshatra.key` | number | Nakshatra index (1-27) in the zodiac sequence starting from Ashwini. |
| `signs[].isRetrograde` | boolean | True if planet is in retrograde motion. Retrograde planets carry intensified or internalized significations. |
| `meta` | object | Quick lookup of all planet positions keyed by planet name. Contains Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu, and Lagna. |
| `meta[planet].rashi` | string | Zodiac sign (rashi) the planet occupies. One of 12 Vedic rashis from Aries (Mesha) to Pisces (Meena). |
| `meta[planet].longitude` | number | Sidereal longitude in degrees (0-360) using Lahiri ayanamsa. Used for aspect calculations, divisional chart mapping, and transit analysis. |
| `meta[planet].nakshatra` | object | Nakshatra (lunar mansion) data. Determines dasha lord and behavioral qualities. |
| `houses` | array | All 12 bhava (house) interpretations with name and description. |
| `combustion` | array | Planets within combustion orbs of the Sun (Surya Siddhanta orbs). Each entry has `planet`, `distanceFromSun`, and `orb`. |
| `planetaryWar` | array | Pairs of visible planets within 1 degree of each other. Includes `planet1`, `planet2`, `distance`, and `winner` (higher ecliptic latitude). |
| `interpretations` | object | Per-planet `rashi` and `nakshatra` interpretation summaries, keyed by planet name. |

## Common use cases

| Use case | Endpoint flow |
|----------|---------------|
| Kundli generation for a birth date and city | Call `/location/search?q={city}` first, take `latitude`, `longitude`, `timezone` from `cities[0]`, POST to `/vedic-astrology/birth-chart` |
| Matrimonial site profile | Generate both charts, read `meta` for Lagna, Moon sign, and nakshatra. Feed into `/vedic-astrology/compatibility` for Guna Milan score. |
| Astrology app planet panel | Use `meta` object for a flat planet-to-rashi map. Supplement with `interpretations` for rashi and nakshatra summaries. |
| Combustion and planetary war display | Read `combustion[]` and `planetaryWar[]` arrays directly from the response. |
| Vedic astrology software integration | Combine with `/vedic-astrology/dasha/current` for timing and `/vedic-astrology/divisional-chart` for varga charts. |

## Related endpoints in this domain

- [Vimshottari Dasha](https://roxyapi.com/api-reference#tag/Vedic-Astrology/POST/vedic-astrology/dasha/current): Current Mahadasha, Antardasha, Pratyantardasha from the same birth data
- [Guna Milan](https://roxyapi.com/api-reference#tag/Vedic-Astrology/POST/vedic-astrology/compatibility): 36-point Ashtakoota compatibility score for kundli matching
- [KP Chart](https://roxyapi.com/api-reference#tag/Vedic-Astrology/POST/vedic-astrology/kp/chart): KP System cuspal sub lord and sub sub lord precision on the same birth inputs

## Use this in your AI agent

Connect Claude, GPT, Gemini, or Cursor to RoxyAPI through the remote MCP server. No Docker. No self hosting. The full MCP tool catalog for this domain is at `https://roxyapi.com/mcp/vedic-astrology`.

```json
{
  "mcpServers": {
    "vedic-astrology": {
      "url": "https://roxyapi.com/mcp/vedic-astrology",
      "headers": { "X-API-Key": "$ROXY_API_KEY" }
    }
  }
}
```

See [docs/mcp](https://roxyapi.com/docs/mcp) for Claude Desktop, Cursor, Windsurf, VS Code, and Claude Code setup.

## For AI coding agents

This repo ships an [AGENTS.md](AGENTS.md) execution playbook. Cursor, Claude Code, Aider, Codex, Windsurf, RooCode, and Gemini CLI will pick it up automatically. Top level overview lives at [roxyapi.com/AGENTS.md](https://roxyapi.com/AGENTS.md).

## Resources

- [Methodology and gold standard tests](https://roxyapi.com/methodology) verified against NASA JPL Horizons
- [Full API reference](https://roxyapi.com/api-reference) interactive Scalar UI
- [TypeScript SDK on npm](https://www.npmjs.com/package/@roxyapi/sdk)
- [Python SDK on PyPI](https://pypi.org/project/roxy-sdk/)
- [llms.txt](https://roxyapi.com/llms.txt) full LLM citation index
- [Top level AGENTS.md](https://roxyapi.com/AGENTS.md)

## Other RoxyAPI samples

[![KP Astrology API](https://img.shields.io/badge/KP_Astrology_API-RoxyAPI-14b8a6?style=flat-square)](https://github.com/RoxyAPI/kp-astrology-api)
[![Biorhythm API](https://img.shields.io/badge/Biorhythm_API-RoxyAPI-14b8a6?style=flat-square)](https://github.com/RoxyAPI/biorhythm-api)
[![Synastry API](https://img.shields.io/badge/Synastry_API-RoxyAPI-14b8a6?style=flat-square)](https://github.com/RoxyAPI/synastry-api)

## License

MIT for this sample repo. See [LICENSE](LICENSE).

**Catalog licensing:** Personal and commercial use, including closed source proprietary apps. No AGPL or GPL entanglement. RoxyAPI APIs and SDKs are safe to embed in commercial products. Full terms at [roxyapi.com/policy/license](https://roxyapi.com/policy/license).

## Contact

- Site: [roxyapi.com](https://roxyapi.com)
- Status: [roxyapi.com/api-reference](https://roxyapi.com/api-reference)
