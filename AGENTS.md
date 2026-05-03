# AGENTS.md for Kundli API

This repo teaches AI coding agents (Cursor, Claude Code, Aider, Codex, Windsurf, RooCode, Gemini CLI) how to use the RoxyAPI Vedic birth chart endpoint.

## Endpoint
- Method: `POST`
- URL: `https://roxyapi.com/api/v2/vedic-astrology/birth-chart`
- Auth: `X-API-Key` header
- Domain: `vedic-astrology` (one of 10 in the RoxyAPI catalog)
- Operation ID: `generateBirthChart` matches the SDK method name in camelCase
- MCP tool: `post_vedic_astrology_birth_chart` on `https://roxyapi.com/mcp/vedic-astrology`

## TypeScript SDK
```ts
import { createRoxy } from '@roxyapi/sdk';
const roxy = createRoxy(process.env.ROXY_API_KEY!);
const { data, error } = await roxy.vedicAstrology.generateBirthChart({
  body: { date: '1990-07-04', time: '10:12:00', latitude: 28.6139, longitude: 77.209, timezone: 5.5 }
});
```

## Python SDK
```python
import os
from roxy_sdk import create_roxy
roxy = create_roxy(os.environ["ROXY_API_KEY"])
result = roxy.vedic_astrology.generate_birth_chart(
    date="1990-07-04", time="10:12:00", latitude=28.6139, longitude=77.209, timezone=5.5
)
```

## Setup step (location first)
Always call `GET /location/search?q={city}` first. Take `latitude`, `longitude`, `timezone` from `cities[0]` and pipe them in. Never ask the user to type coordinates. The `timezone` field accepts both decimal hours (5.5 for IST) and IANA strings ("Asia/Kolkata").

## Request fields
- `date` (string, required): Birth date YYYY-MM-DD. Essential for nakshatra, dasha, and yoga calculations.
- `time` (string, required): Birth time HH:MM:SS (24-hour). Critical for Lagna (Ascendant) calculation which changes every 2 hours. Even minutes affect nakshatra pada and divisional charts.
- `latitude` (number, required): Decimal degrees. Controls local sidereal time and bhava cusps.
- `longitude` (number, required): Decimal degrees. Affects ayanamsha adjustments and local time.
- `timezone` (number|string, optional): Decimal UTC offset or IANA name. Defaults to 5.5 (IST).

## Response top level keys
- `aries` ... `pisces`: One key per zodiac sign. Each has `rashi` (sign name) and `signs[]` (planets in that sign with nakshatra, longitude, isRetrograde).
- `meta`: Flat planet-keyed lookup for Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu, Lagna. Most integrations read `meta` for the primary planet map.
- `houses`: Array of 12 bhava objects with `number`, `name`, and `description`.
- `combustion`: Planets within combustion orb of the Sun (Surya Siddhanta orbs). Each entry has `planet`, `distanceFromSun`, `orb`.
- `planetaryWar`: Pairs of visible planets within 1 degree. Each entry has `planet1`, `planet2`, `distance`, `winner`.
- `interpretations`: Per-planet `rashi` and `nakshatra` interpretation summaries keyed by planet name.

## Domain rules
- Use `meta[planet]` for a flat planet-to-rashi map. The sign-keyed objects (aries, taurus, etc.) are the house grouping view.
- Rahu and Ketu are always retrograde by definition; `isRetrograde` may be true for both.
- `longitude` values are sidereal (Lahiri ayanamsa), not tropical. Do not subtract ayanamsa again.
- Combustion uses Surya Siddhanta orbs (Moon 12, Mars 17, Mercury 14, Jupiter 11, Venus 10, Saturn 15 degrees). Orbs tighten for retrograde Mercury and Venus.
- Planetary war winner is determined by higher ecliptic latitude, not longitude.
- For follow-on timing, chain to `POST /vedic-astrology/dasha/current` with the same birth data.
- For kundli matching, chain to `POST /vedic-astrology/compatibility` with two sets of birth data.

## Related endpoints
- `POST /vedic-astrology/dasha/current`: Vimshottari timing (Mahadasha, Antardasha, Pratyantardasha).
- `POST /vedic-astrology/compatibility`: Ashtakoota Guna Milan score for matrimonial matching.
- `POST /vedic-astrology/kp/chart`: KP System precision birth chart with cuspal sub lords.

## Verified
2026-Q2 against `https://roxyapi.com/api/v2/openapi.json`. Re-fetch the spec for ground truth before changing this file.

## Discovery
- Full catalog: https://roxyapi.com/AGENTS.md
- LLM index: https://roxyapi.com/llms.txt
- Methodology: https://roxyapi.com/methodology
