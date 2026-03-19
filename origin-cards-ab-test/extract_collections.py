import csv
import json
import re

# Countries to extract
countries = [
    'Australia', 'Brazil', 'Cambodia', 'Canada', 'China', 'Egypt', 'England',
    'Germany', 'Ireland', 'Italy', 'Japan', 'Korea', 'Mexico', 'New Zealand',
    'Northern Ireland', 'Norway', 'Philippines', 'Portugal', 'Scotland',
    'South Africa', 'Spain', 'Taiwan', 'United States', 'Wales'
]

# Read CSV
collections_by_country = {country: [] for country in countries}

with open('All FS collections - Nov2025.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.reader(f)
    headers = None
    for i, row in enumerate(reader):
        if i < 2:  # Skip first 2 header rows
            continue
        if i == 2:  # Column headers
            headers = row
            continue

        if len(row) < 4:
            continue

        title = row[0]
        records = row[1]
        link = row[3]

        # Handle both numeric records and "Browse Images"
        if records == "Browse Images":
            record_count = 0  # Give browse images lowest priority
        else:
            # Convert record count to integer for sorting
            try:
                record_count = int(records.replace(',', ''))
            except:
                continue

        # Check which country this collection belongs to
        for country in countries:
            # Look for country name at the start of the title
            if title.startswith(f'{country},') or title.startswith(f'{country} '):
                collections_by_country[country].append({
                    'title': title,
                    'records': records,
                    'record_count': record_count,
                    'link': link
                })
                break

# Sort each country's collections by record count and take top 5
for country in countries:
    collections_by_country[country] = sorted(
        collections_by_country[country],
        key=lambda x: x['record_count'],
        reverse=True
    )[:5]

# Output results
print("Collections by Country (Top 5 by record count):\n")
for country in sorted(countries):
    if collections_by_country[country]:
        print(f"\n{country}:")
        for i, col in enumerate(collections_by_country[country], 1):
            print(f"  {i}. {col['title']}")
            print(f"     Records: {col['records']}")
            print(f"     Link: {col['link']}")
    else:
        print(f"\n{country}: No collections found")

# Save to JSON for easier processing
with open('collections_output.json', 'w') as f:
    json.dump(collections_by_country, f, indent=2)

print("\n\nData saved to collections_output.json")
