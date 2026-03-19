import json

# Load the collections data
with open('collections_output.json', 'r') as f:
    data = json.load(f)

# Function to determine icon type and description
def get_icon_and_desc(title):
    title_lower = title.lower()

    # Icon mapping
    if any(x in title_lower for x in ['church', 'parish', 'catholic', 'lutheran', 'baptism', 'marriage', 'burial', 'christening']):
        icon = 'icons.church'
    elif any(x in title_lower for x in ['census', 'tax assessment', 'electoral']):
        icon = 'icons.census'
    elif any(x in title_lower for x in ['civil registration', 'birth registration', 'death registration', 'marriage registration', 'vital records']):
        icon = 'icons.civil'
    elif any(x in title_lower for x in ['passenger', 'immigration', 'emigration', 'border entry']):
        icon = 'icons.immigration'
    else:
        icon = 'icons.historical'

    # Generate description
    if 'census' in title_lower:
        desc = 'Population schedules and enumeration data'
    elif 'baptism' in title_lower or 'christening' in title_lower:
        desc = 'Church baptismal records'
    elif 'catholic church' in title_lower or 'parish register' in title_lower:
        desc = 'Baptisms, marriages, and burials'
    elif 'lutheran' in title_lower:
        desc = 'Lutheran parish registers'
    elif 'civil registration' in title_lower:
        desc = 'Birth, marriage, and death certificates'
    elif 'birth registration' in title_lower:
        desc = 'Birth registration records'
    elif 'death registration' in title_lower or 'death index' in title_lower:
        desc = 'Death registration records'
    elif 'marriage registration' in title_lower:
        desc = 'Marriage registration records'
    elif 'passenger' in title_lower:
        desc = 'Passenger arrival and departure records'
    elif 'emigration' in title_lower:
        desc = 'Emigration records'
    elif 'cemetery' in title_lower:
        desc = 'Cemetery and burial records'
    elif 'court' in title_lower:
        desc = 'Court records and legal proceedings'
    elif 'tax' in title_lower:
        desc = 'Tax assessment records'
    elif 'electoral' in title_lower or 'voter' in title_lower:
        desc = 'Electoral rolls and voter registrations'
    elif 'obituar' in title_lower:
        desc = 'Obituary records'
    elif 'probate' in title_lower or 'will' in title_lower:
        desc = 'Probate records and wills'
    else:
        desc = 'Historical records and documents'

    return icon, desc

# Generate JavaScript code
js_lines = []
js_lines.append("export const countryCollections = {")

# Order countries alphabetically
countries = sorted([c for c in data.keys() if data[c]])  # Only countries with collections

for country in countries:
    collections = data[country]
    if not collections:
        continue

    js_lines.append(f"  '{country}': [")

    for col in collections:
        icon, desc = get_icon_and_desc(col['title'])
        title = col['title'].replace("'", "\\'")  # Escape single quotes
        records = col['records']
        link = col['link']

        # Format desc field
        if records == 'Browse Images':
            desc_text = 'Browse Images'
        else:
            desc_text = f'{records} records'

        js_lines.append(f"    {{ title: '{title}', desc: '{desc_text}', description: '{desc}', link: '{link}', icon: {icon} }},")

    js_lines.append("  ],")

js_lines.append("};")

output = '\n'.join(js_lines)

# Save to file
with open('collections_updated.js', 'w', encoding='utf-8') as f:
    f.write(output)

print("Generated collections_updated.js")
print(f"\nTotal countries with collections: {len(countries)}")
for country in countries:
    print(f"  {country}: {len(data[country])} collections")
