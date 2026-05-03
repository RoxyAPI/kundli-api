"""
Kundli API example: Vedic birth chart (kundli, janam kundli, nakshatra precision)
Docs: https://roxyapi.com/api-reference
"""
import os
from roxy_sdk import create_roxy

roxy = create_roxy(os.environ["ROXY_API_KEY"])

# Step 1: geocode the birth city to get latitude, longitude, timezone
loc = roxy.location.search_cities(q="New Delhi")
city = loc["cities"][0]

# Step 2: generate the Vedic birth chart (nakshatra precision, combustion, planetary war)
kundli = roxy.vedic_astrology.generate_birth_chart(
    date="1990-07-04",
    time="10:12:00",
    latitude=city["latitude"],
    longitude=city["longitude"],
    timezone=city["timezone"],
)

sun = kundli["meta"]["Sun"]
moon = kundli["meta"]["Moon"]
lagna = kundli["meta"]["Lagna"]

print("--- Vedic Birth Chart ---")
print(f"Sun:   {sun['rashi']}, {sun['nakshatra']['name']} pada {sun['nakshatra']['pada']}")
print(f"Moon:  {moon['rashi']}, {moon['nakshatra']['name']} pada {moon['nakshatra']['pada']}")
print(f"Lagna: {lagna['rashi']}, {lagna['nakshatra']['name']} pada {lagna['nakshatra']['pada']}")
print("Combustion:", kundli["combustion"] if kundli["combustion"] else "none")
print("Planetary war:", kundli["planetaryWar"] if kundli["planetaryWar"] else "none")
print("Houses:", [f"{h['number']}. {h.get('name', '')}" for h in kundli["houses"][:3]])
