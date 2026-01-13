import { useState } from 'react';

// Country-specific placeholders for "Place Lived" field
const placeLivedPlaceholders = {
  'United States': 'State, county or city',
  'England': 'County, parish or town',
  'Scotland': 'County, parish or town',
  'Wales': 'County, parish or town',
  'Ireland': 'County, parish or town',
  'Northern Ireland': 'County, parish or town',
  'Germany': 'State, district or city',
  'Italy': 'Region, province or city',
  'Poland': 'Voivodeship, powiat or city',
  'Mexico': 'State, municipality or city',
  'Brazil': 'State, municipality or city',
  'Canada': 'Province, county or city',
  'Australia': 'State, county or city',
  'France': 'Region, department or city',
  'Spain': 'Province, municipality or city',
  'Sweden': 'County, municipality or city',
  'Norway': 'County, municipality or city',
  'Denmark': 'Region, municipality or city',
  'Netherlands': 'Province, municipality or city',
  'Belgium': 'Province, municipality or city',
  'Switzerland': 'Canton, district or city',
  'Austria': 'State, district or city',
  'Czech Republic': 'Region, district or city',
  'Hungary': 'County, district or city',
  'Portugal': 'District, municipality or city',
  'Greece': 'Region, prefecture or city',
  'Romania': 'County, municipality or city',
  'Russia': 'Oblast, district or city',
  'Ukraine': 'Oblast, raion or city',
  'default': 'Region, district or city'
};

// Country-specific place suggestions
const placeSuggestions = {
  'United States': {
    regions: [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
      'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
      'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
      'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
      'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
      'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
      'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
      'Wisconsin', 'Wyoming'
    ],
    cities: {
      'New York City': 'New York', 'Los Angeles': 'California', 'Chicago': 'Illinois',
      'Houston': 'Texas', 'Phoenix': 'Arizona', 'Philadelphia': 'Pennsylvania',
      'San Antonio': 'Texas', 'San Diego': 'California', 'Dallas': 'Texas',
      'San Jose': 'California', 'Austin': 'Texas', 'Boston': 'Massachusetts',
      'Seattle': 'Washington', 'Denver': 'Colorado', 'Portland': 'Oregon',
      'Miami': 'Florida', 'Atlanta': 'Georgia'
    }
  },
  'England': {
    regions: [
      'Bedfordshire', 'Berkshire', 'Bristol', 'Buckinghamshire', 'Cambridgeshire', 'Cheshire',
      'Cornwall', 'Cumbria', 'Derbyshire', 'Devon', 'Dorset', 'Durham', 'East Sussex',
      'Essex', 'Gloucestershire', 'Hampshire', 'Herefordshire', 'Hertfordshire', 'Kent',
      'Lancashire', 'Leicestershire', 'Lincolnshire', 'Norfolk', 'Northamptonshire',
      'Northumberland', 'Nottinghamshire', 'Oxfordshire', 'Somerset', 'Staffordshire',
      'Suffolk', 'Surrey', 'Warwickshire', 'West Sussex', 'Wiltshire', 'Worcestershire', 'Yorkshire'
    ],
    cities: {
      'London': 'Greater London', 'Manchester': 'Greater Manchester', 'Birmingham': 'West Midlands',
      'Liverpool': 'Merseyside', 'Leeds': 'West Yorkshire'
    }
  },
  'Scotland': {
    regions: [
      'Aberdeen', 'Aberdeenshire', 'Angus', 'Argyll', 'Ayrshire', 'Banffshire', 'Berwickshire',
      'Bute', 'Caithness', 'Clackmannanshire', 'Dumfriesshire', 'Dunbartonshire', 'East Lothian',
      'Fife', 'Inverness', 'Kincardineshire', 'Lanarkshire', 'Midlothian', 'Moray',
      'Perthshire', 'Renfrewshire', 'Ross', 'Roxburghshire', 'Stirlingshire', 'West Lothian'
    ],
    cities: {
      'Edinburgh': 'Midlothian', 'Glasgow': 'Lanarkshire'
    }
  },
  'Wales': {
    regions: [
      'Anglesey', 'Brecknockshire', 'Caernarfonshire', 'Carmarthenshire', 'Cardiganshire',
      'Denbighshire', 'Flintshire', 'Glamorgan', 'Merionethshire', 'Monmouthshire',
      'Montgomeryshire', 'Pembrokeshire', 'Radnorshire'
    ],
    cities: {
      'Cardiff': 'Glamorgan', 'Swansea': 'Glamorgan', 'Newport': 'Monmouthshire'
    }
  },
  'Ireland': {
    regions: [
      'Antrim', 'Armagh', 'Carlow', 'Cavan', 'Clare', 'Cork', 'Derry', 'Donegal', 'Down',
      'Dublin', 'Fermanagh', 'Galway', 'Kerry', 'Kildare', 'Kilkenny', 'Laois', 'Leitrim',
      'Limerick', 'Longford', 'Louth', 'Mayo', 'Meath', 'Monaghan', 'Offaly', 'Roscommon',
      'Sligo', 'Tipperary', 'Tyrone', 'Waterford', 'Westmeath', 'Wexford', 'Wicklow'
    ],
    cities: {}
  },
  'Germany': {
    regions: [
      'Baden-Württemberg', 'Bavaria', 'Brandenburg', 'Bremen', 'Hamburg', 'Hesse',
      'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia', 'Rhineland-Palatinate',
      'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'
    ],
    cities: {
      'Berlin': 'Berlin', 'Munich': 'Bavaria', 'Frankfurt': 'Hesse', 'Cologne': 'North Rhine-Westphalia',
      'Stuttgart': 'Baden-Württemberg', 'Düsseldorf': 'North Rhine-Westphalia', 'Dortmund': 'North Rhine-Westphalia',
      'Essen': 'North Rhine-Westphalia', 'Leipzig': 'Saxony', 'Dresden': 'Saxony'
    }
  },
  'Italy': {
    regions: [
      'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna', 'Friuli-Venezia Giulia',
      'Lazio', 'Liguria', 'Lombardy', 'Marche', 'Molise', 'Piedmont', 'Apulia', 'Sardinia',
      'Sicily', 'Tuscany', 'Trentino-Alto Adige', 'Umbria', 'Veneto'
    ],
    cities: {
      'Rome': 'Lazio', 'Milan': 'Lombardy', 'Naples': 'Campania', 'Turin': 'Piedmont',
      'Palermo': 'Sicily', 'Genoa': 'Liguria', 'Bologna': 'Emilia-Romagna',
      'Florence': 'Tuscany', 'Venice': 'Veneto'
    }
  },
  'Mexico': {
    regions: [
      'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
      'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México',
      'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro',
      'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala',
      'Veracruz', 'Yucatán', 'Zacatecas'
    ],
    cities: {
      'Mexico City': 'Federal District', 'Guadalajara': 'Jalisco', 'Monterrey': 'Nuevo León'
    }
  },
  'Canada': {
    regions: [
      'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
      'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
      'Northwest Territories', 'Nunavut', 'Yukon'
    ],
    cities: {
      'Toronto': 'Ontario', 'Montreal': 'Quebec', 'Vancouver': 'British Columbia',
      'Calgary': 'Alberta', 'Edmonton': 'Alberta', 'Ottawa': 'Ontario',
      'Winnipeg': 'Manitoba', 'Quebec City': 'Quebec', 'Hamilton': 'Ontario'
    }
  },
  'Brazil': {
    regions: [
      'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal',
      'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais',
      'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte',
      'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
    ],
    cities: {
      'São Paulo': 'São Paulo', 'Rio de Janeiro': 'Rio de Janeiro', 'Brasília': 'Distrito Federal',
      'Salvador': 'Bahia', 'Fortaleza': 'Ceará'
    }
  },
  default: { regions: [], cities: {} }
};

export default function DefaultSearchCard({ selectedCountry = 'United States' }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    placeLived: '',
    birthYear: ''
  });

  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorAge, setCalculatorAge] = useState('');
  const [calculatorYear, setCalculatorYear] = useState('');
  const [showPlaceSuggestions, setShowPlaceSuggestions] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build search URL with form data
    const params = new URLSearchParams();
    params.append('results', '12');
    if (formData.firstName) params.append('q.givenName', formData.firstName);
    if (formData.lastName) params.append('q.surname', formData.lastName);
    if (formData.placeLived) params.append('q.anyPlace', formData.placeLived);
    if (formData.birthYear) params.append('q.birthLikeDate.from', formData.birthYear);
    
    const searchUrl = `https://www.familysearch.org/en/search/discovery/results?${params.toString()}`;
    window.open(searchUrl, '_blank');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Handle place suggestions
    if (name === 'placeLived') {
      if (value.trim().length > 0) {
        const countryData = suggestions;
        const filtered = [];
        
        // Search in regions
        countryData.regions.forEach(region => {
          if (region.toLowerCase().includes(value.toLowerCase())) {
            filtered.push({ display: region, value: region });
          }
        });
        
        // Search in cities
        Object.entries(countryData.cities).forEach(([city, region]) => {
          if (city.toLowerCase().includes(value.toLowerCase())) {
            filtered.push({ display: `${city}, ${region}`, value: `${city}, ${region}` });
          }
        });
        
        setFilteredPlaces(filtered.slice(0, 10));
        setShowPlaceSuggestions(filtered.length > 0);
      } else {
        setShowPlaceSuggestions(false);
        setFilteredPlaces([]);
      }
    }
  };

  const handlePlaceSelect = (place) => {
    setFormData({
      ...formData,
      placeLived: place
    });
    setShowPlaceSuggestions(false);
    setFilteredPlaces([]);
  };

  const handleCalculatorDone = () => {
    if (calculatorAge && calculatorYear) {
      const age = parseInt(calculatorAge);
      const year = parseInt(calculatorYear);
      if (!isNaN(age) && !isNaN(year)) {
        const birthYear = year - age;
        setFormData({
          ...formData,
          birthYear: birthYear.toString()
        });
      }
    }
    setShowCalculator(false);
    setCalculatorAge('');
    setCalculatorYear('');
  };

  const handleCalculatorCancel = () => {
    setShowCalculator(false);
    setCalculatorAge('');
    setCalculatorYear('');
  };

  const placeLivedPlaceholder = placeLivedPlaceholders[selectedCountry] || placeLivedPlaceholders.default;
  const suggestions = placeSuggestions[selectedCountry] || placeSuggestions.default;

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Search your ancestors in {selectedCountry}
          </h2>
          <p className="text-lg text-gray-700">
            Search billions of ancestor profiles, photographs, and historical documents at once—absolutely FREE.
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Not sure who to search for? Try a grandparent or great-grandparent.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Names
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Names*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <label htmlFor="placeLived" className="block text-sm font-medium text-gray-700 mb-1">
                  Place Lived
                </label>
                <input
                  type="text"
                  id="placeLived"
                  name="placeLived"
                  value={formData.placeLived}
                  onChange={handleChange}
                  onFocus={() => {
                    if (formData.placeLived.trim().length > 0) {
                      const countryData = suggestions;
                      const filtered = [];
                      
                      countryData.regions.forEach(region => {
                        if (region.toLowerCase().includes(formData.placeLived.toLowerCase())) {
                          filtered.push({ display: region, value: region });
                        }
                      });
                      
                      Object.entries(countryData.cities).forEach(([city, region]) => {
                        if (city.toLowerCase().includes(formData.placeLived.toLowerCase())) {
                          filtered.push({ display: `${city}, ${region}`, value: `${city}, ${region}` });
                        }
                      });
                      
                      setFilteredPlaces(filtered.slice(0, 10));
                      setShowPlaceSuggestions(filtered.length > 0);
                    }
                  }}
                  onBlur={() => {
                    // Delay to allow click on suggestion
                    setTimeout(() => setShowPlaceSuggestions(false), 200);
                  }}
                  placeholder={placeLivedPlaceholder}
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                
                {/* Suggestions Overlay */}
                {showPlaceSuggestions && filteredPlaces.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredPlaces.map((place) => (
                      <button
                        key={place.value}
                        type="button"
                        onClick={() => handlePlaceSelect(place.value)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-gray-900"
                      >
                        {place.display}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700 mb-1">
                  Approximate Birth Year
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="birthYear"
                    name="birthYear"
                    value={formData.birthYear}
                    onChange={handleChange}
                    placeholder="Use calculator for help"
                    className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCalculator(true)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-teal-700 hover:text-teal-900 transition-colors"
                    aria-label="Open birth year calculator"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="2" width="16" height="20" rx="2"/>
                      <line x1="8" y1="6" x2="16" y2="6"/>
                      <line x1="16" y1="10" x2="16" y2="10"/>
                      <line x1="12" y1="10" x2="12" y2="10"/>
                      <line x1="8" y1="10" x2="8" y2="10"/>
                      <line x1="16" y1="14" x2="16" y2="14"/>
                      <line x1="12" y1="14" x2="12" y2="14"/>
                      <line x1="8" y1="14" x2="8" y2="14"/>
                      <line x1="16" y1="18" x2="16" y2="18"/>
                      <line x1="12" y1="18" x2="12" y2="18"/>
                      <line x1="8" y1="18" x2="8" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              className="px-8 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              SEARCH
            </button>
          </form>
        </div>
      </div>

      {/* Birth Year Calculator Overlay */}
      {showCalculator && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && handleCalculatorCancel()}
        >
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full mx-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Birth Year Calculator</h2>
            
            <div className="mb-6">
              <p className="text-lg text-gray-900 mb-4 flex items-center gap-2 flex-wrap">
                <span>He or she was about</span>
                <input
                  type="text"
                  value={calculatorAge}
                  onChange={(e) => setCalculatorAge(e.target.value.replace(/\D/g, ''))}
                  className="w-24 px-3 py-2 border-2 border-teal-500 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-center"
                  placeholder=""
                  autoFocus
                />
                <span>years old in</span>
                <input
                  type="text"
                  value={calculatorYear}
                  onChange={(e) => setCalculatorYear(e.target.value.replace(/\D/g, ''))}
                  className="w-32 px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-center"
                  placeholder=""
                />
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md flex gap-3">
                <span className="text-2xl">💡</span>
                <p className="text-gray-700">
                  <strong>Tip:</strong> Think of how old he or she may have been at a major life event, like marriage or death.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCalculatorCancel}
                className="px-6 py-2 text-teal-700 font-medium hover:bg-gray-100 rounded-md transition-colors"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleCalculatorDone}
                className={`px-6 py-2 font-medium rounded-md transition-colors ${
                  calculatorAge && calculatorYear
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-700 cursor-not-allowed opacity-50'
                }`}
                disabled={!calculatorAge || !calculatorYear}
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
