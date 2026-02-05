import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header';

const regionData = {
  'Africa': [
    'Algeria', 'Angola', 'Botswana', 'Cameroon', 'Democratic Republic of the Congo',
    'Ethiopia', 'Ghana', 'Kenya', 'Libya', 'Morocco', 'Mozambique', 'Namibia',
    'Nigeria', 'Rwanda', 'Senegal', 'Tanzania', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
  ],
  'Asia & Middle East': [
    'Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan',
    'Brunei', 'Georgia', 'Hong Kong', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel',
    'Jordan', 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Macao',
    'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'Oman', 'Pakistan',
    'Palestine', 'Qatar', 'Saudi Arabia', 'Singapore', 'Sri Lanka', 'Syria',
    'Tajikistan', 'Thailand', 'Turkey', 'Turkmenistan', 'United Arab Emirates',
    'Uzbekistan', 'Vietnam', 'Yemen'
  ],
  'Australia & New Zealand': [
    'Note: See available countries in the main overlay'
  ],
  'Canada': [
    'Note: See available countries in the main overlay'
  ],
  'Caribbean and Central America': [
    'Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Costa Rica', 'Cuba',
    'Dominica', 'Dominican Republic', 'El Salvador', 'Grenada', 'Guatemala',
    'Haiti', 'Honduras', 'Jamaica', 'Nicaragua', 'Panama', 'Saint Kitts and Nevis',
    'Saint Lucia', 'Saint Vincent and the Grenadines', 'Trinidad and Tobago'
  ],
  'Continental Europe': [
    'Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina',
    'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia',
    'Finland', 'France', 'Greece', 'Hungary', 'Iceland', 'Kosovo', 'Latvia',
    'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco',
    'Montenegro', 'Netherlands', 'North Macedonia', 'Poland', 'Romania', 'Russia',
    'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Sweden', 'Switzerland', 'Ukraine',
    'Vatican City'
  ],
  'Mexico': [
    'Note: See available countries in the main overlay'
  ],
  'Pacific Islands': [
    'American Samoa', 'Cook Islands', 'Fiji', 'French Polynesia', 'Guam', 'Kiribati',
    'Marshall Islands', 'Micronesia', 'Nauru', 'New Caledonia', 'Niue', 'Northern Mariana Islands',
    'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu'
  ],
  'South America': [
    'Argentina', 'Bolivia', 'Chile', 'Colombia', 'Ecuador', 'French Guiana',
    'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela'
  ],
  'United Kingdom and Ireland': [
    'Note: See available countries in the main overlay'
  ],
  'United States of America': [
    'Note: See available countries in the main overlay'
  ]
};

export default function SearchByPlace() {
  const [searchParams] = useSearchParams();
  const initialTestCountry = searchParams.get('country') || 'United States';
  const [testCountry] = useState(initialTestCountry);
  const [showTestBanner] = useState(false);

  // Countries that return 500 errors and need wiki URLs instead
  const wikiCountries = [
    'Democratic Republic of the Congo',
    'Armenia',
    'Azerbaijan',
    'Georgia',
    'Macao',
    'Malaysia',
    'Turkey',
    'United Arab Emirates',
    'Andorra',
    'Bosnia and Herzegovina',
    'Cyprus',
    'Czech Republic',
    'Kosovo',
    'Montenegro',
    'North Macedonia',
    'San Marino',
    'Serbia',
    'Vatican City',
    'Marshall Islands',
    'Nauru',
    'New Caledonia',
    'Northern Mariana Islands',
    'Solomon Islands'
  ];

  // Helper function to convert text to URL format
  const toUrlFormat = (text) => {
    return text.toLowerCase().replace(/\s+/g, '-');
  };

  // Helper function to convert country name to wiki format
  const toWikiFormat = (text) => {
    // Replace spaces with underscores and handle special cases for articles
    return text
      .split(' ')
      .map((word, index) => {
        // Lowercase articles like "the", "of", "and" unless they're the first word
        if (index > 0 && ['the', 'of', 'and'].includes(word.toLowerCase())) {
          return word.toLowerCase();
        }
        return word;
      })
      .join('_');
  };

  // Build FamilySearch location URL or wiki URL
  const buildLocationUrl = (region, country) => {
    // Check if country needs wiki URL
    if (wikiCountries.includes(country)) {
      // Special case for Georgia (country) to distinguish from Georgia (US state)
      if (country === 'Georgia') {
        return 'https://www.familysearch.org/en/wiki/Georgia_(country)_Genealogy';
      }

      const wikiSlug = toWikiFormat(country);
      return `https://www.familysearch.org/en/wiki/${wikiSlug}_Genealogy`;
    }

    // Use standard location URL
    const regionSlug = toUrlFormat(region);
    const countrySlug = toUrlFormat(country);
    return `https://www.familysearch.org/en/search/location/${regionSlug}/${countrySlug}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        testCountry={testCountry}
        onTestCountryChange={() => {}}
        showTestBanner={showTestBanner}
      />

      <main className="mx-auto px-4 py-8 max-w-[1200px] xl:max-w-[1280px] 2xl:max-w-[1440px]">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Search Historical Records by Place
          </h1>

          <div className="space-y-8">
            {Object.entries(regionData).map(([region, countries]) => (
              <div key={region}>
                <h2 className="text-2xl font-semibold text-teal-700 mb-4">
                  {region}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
                  {countries.map((country) => {
                    const isNote = country.startsWith('Note:');

                    if (isNote) {
                      return (
                        <div
                          key={country}
                          className="italic text-gray-500 text-sm"
                        >
                          {country}
                        </div>
                      );
                    }

                    return (
                      <a
                        key={country}
                        href={buildLocationUrl(region, country)}
                        className="text-teal-700 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {country}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
