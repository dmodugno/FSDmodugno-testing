import { useState, useEffect } from 'react';

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
      'Houston': 'Texas', 'Phoenix': 'Arizona', 'Philadelphia': 'Pennsylvania'
    }
  },
  default: { regions: [], cities: {} }
};

export default function Hero({ testCountry }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPhilippines, setIsPhilippines] = useState(false);
  const [isSouthAfrica, setIsSouthAfrica] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

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

  const defaultImages = [`${baseUrl}Country=US.png`, `${baseUrl}Country=Mexico.png`, `${baseUrl}Country=UK.png`];
  const philippinesImages = [`${baseUrl}Country=Philippines.png`, `${baseUrl}Country=Korea.png`, `${baseUrl}Country=Cambodia.png`];
  const southAfricaImages = [`${baseUrl}animation/Frame01.png`, `${baseUrl}animation/Frame07.png`, `${baseUrl}animation/Frame09.png`];

  useEffect(() => {
    setIsPhilippines(testCountry === 'Philippines');
    setIsSouthAfrica(testCountry === 'South Africa');
    setCurrentImageIndex(0);
  }, [testCountry]);

  useEffect(() => {
    const imageCount = isSouthAfrica ? southAfricaImages.length : (isPhilippines ? philippinesImages.length : defaultImages.length);
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPhilippines, isSouthAfrica]);

  const currentImages = isSouthAfrica ? southAfricaImages : (isPhilippines ? philippinesImages : defaultImages);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPhilippines) {
      const surname = formData.lastName || e.target.surname?.value || '';
      window.open(`https://www.familysearch.org/en/philippines/surname/${encodeURIComponent(surname)}`, '_blank');
    } else {
      const params = new URLSearchParams();
      params.append('results', '12');
      if (formData.firstName) params.append('q.givenName', formData.firstName);
      if (formData.lastName) params.append('q.surname', formData.lastName);
      if (formData.placeLived) params.append('q.anyPlace', formData.placeLived);
      if (formData.birthYear) params.append('q.birthLikeDate.from', formData.birthYear);

      const searchUrl = `https://www.familysearch.org/en/search/discovery/results?${params.toString()}`;
      window.open(searchUrl, '_blank');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'placeLived') {
      if (value.trim().length > 0) {
        const suggestions = placeSuggestions[testCountry] || placeSuggestions.default;
        const filtered = [];

        suggestions.regions.forEach(region => {
          if (region.toLowerCase().includes(value.toLowerCase())) {
            filtered.push({ display: region, value: region });
          }
        });

        Object.entries(suggestions.cities).forEach(([city, region]) => {
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

  return (
    <section className="relative bg-[#EEEFC9]" aria-label="Welcome section">
      {/* Mobile: Image first, stacked vertically */}
      <div className="flex flex-col md:hidden overflow-hidden">
        <div className="relative w-full h-[300px] overflow-hidden">
          {currentImages.map((image, index) => (
            <img
              key={index}
              className="hero-image absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              src={image}
              alt="Cultural heritage collage"
              style={{ opacity: index === currentImageIndex ? 1 : 0 }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-3 px-4 py-6">
          <p className="text-sm text-gray-800 font-medium m-0">Welcome to FamilySearch</p>
          <h1 className="text-3xl font-bold text-teal-700 m-0">Discover Your Family History</h1>
          <p className="text-base text-gray-700 m-0">Dive into your roots by discovering your ancestors' stories and building your family tree!</p>

          {isPhilippines ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full" role="search" aria-label="Search for ancestors">
              <h3 className="text-lg font-semibold text-teal-700">Start learning about your family</h3>
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  name="surname"
                  type="text"
                  placeholder="Enter your surname"
                  aria-label="Surname"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 whitespace-nowrap">SEARCH</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full" role="search" aria-label="Search for ancestors">
              {(testCountry === 'United States' || testCountry === 'United Kingdom' || testCountry === 'Brasil') && (
                <h6 className="text-base font-semibold text-teal-700 m-0 mb-2 mt-4">Start by searching one of your relatives</h6>
              )}

              <div>
                <label htmlFor="firstName-mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  First Names
                </label>
                <input
                  id="firstName-mobile"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="lastName-mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Names*
                </label>
                <input
                  id="lastName-mobile"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {isExpanded && (
                <>
                  <div className="relative">
                    <label htmlFor="placeLived-mobile" className="block text-sm font-medium text-gray-700 mb-1">
                      Place
                    </label>
                    <input
                      id="placeLived-mobile"
                      name="placeLived"
                      type="text"
                      placeholder="Place"
                      value={formData.placeLived}
                      onChange={handleChange}
                      onFocus={() => {
                        if (formData.placeLived.trim().length > 0) {
                          const suggestions = placeSuggestions[testCountry] || placeSuggestions.default;
                          const filtered = [];

                          suggestions.regions.forEach(region => {
                            if (region.toLowerCase().includes(formData.placeLived.toLowerCase())) {
                              filtered.push({ display: region, value: region });
                            }
                          });

                          Object.entries(suggestions.cities).forEach(([city, region]) => {
                            if (city.toLowerCase().includes(formData.placeLived.toLowerCase())) {
                              filtered.push({ display: `${city}, ${region}`, value: `${city}, ${region}` });
                            }
                          });

                          setFilteredPlaces(filtered.slice(0, 10));
                          setShowPlaceSuggestions(filtered.length > 0);
                        }
                      }}
                      onBlur={() => {
                        setTimeout(() => setShowPlaceSuggestions(false), 200);
                      }}
                      autoComplete="off"
                      className="w-full px-4 py-2 border border-gray-300 rounded text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />

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
                    <label htmlFor="birthYear-mobile" className="block text-sm font-medium text-gray-700 mb-1">
                      Approximate Birth Year
                    </label>
                    <div className="relative">
                      <input
                        id="birthYear-mobile"
                        name="birthYear"
                        type="text"
                        placeholder="Use calculator for help"
                        value={formData.birthYear}
                        onChange={handleChange}
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                </>
              )}

              <div className="flex items-center gap-4">
                <button type="submit" className="bg-gray-900 text-white px-4 py-3 rounded hover:bg-gray-800 font-medium flex-shrink-0">SEARCH</button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-gray-900 font-medium hover:underline whitespace-nowrap"
                >
                  {isExpanded ? 'LESS OPTIONS' : 'MORE OPTIONS'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Desktop: Side by side layout with image extending beyond container on XL */}
      <div className="hidden md:block relative min-h-[600px] xl:overflow-visible overflow-hidden">
        <div className="flex items-center mx-auto px-4 lg:px-4 xl:px-4 2xl:px-4 max-w-[1200px] xl:max-w-[1280px] 2xl:max-w-[1440px] min-h-[600px] relative">
          <div className="flex flex-col gap-2 z-10 max-w-[480px] pl-6 py-8">
            <p className="text-sm text-gray-800 font-medium m-0">Welcome to FamilySearch</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-teal-700 m-0">Discover Your Family History</h1>
            <p className="text-lg text-gray-700 m-0">Dive into your roots by discovering your ancestors' stories and building your family tree!</p>

            {isPhilippines ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-[420px] w-full" role="search" aria-label="Search for ancestors">
                <h3 className="text-xl font-semibold text-teal-700">Start learning about your family</h3>
                <div className="flex gap-2 w-full">
                  <input
                    name="surname"
                    type="text"
                    placeholder="Enter your surname"
                    aria-label="Surname"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button type="submit" className="bg-gray-900 text-white px-4 py-3 rounded-r hover:bg-gray-800 whitespace-nowrap font-medium">SEARCH</button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-2 max-w-[640px] w-full">
                {(testCountry === 'United States' || testCountry === 'United Kingdom' || testCountry === 'Brasil') && (
                  <h6 className="text-base font-semibold text-teal-700 m-0 mt-6">Start by searching one of your relatives</h6>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3" role="search" aria-label="Search for ancestors">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="firstName-desktop" className="block text-sm font-medium text-gray-700 mb-1">
                        First Names
                      </label>
                      <input
                        id="firstName-desktop"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName-desktop" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Names*
                      </label>
                      <input
                        id="lastName-desktop"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="placeLived-desktop" className="block text-sm font-medium text-gray-700 mb-1">
                          Place
                        </label>
                        <div className="relative">
                          <input
                            id="placeLived-desktop"
                            name="placeLived"
                            type="text"
                            placeholder="Place"
                            value={formData.placeLived}
                            onChange={handleChange}
                          onFocus={() => {
                            if (formData.placeLived.trim().length > 0) {
                              const suggestions = placeSuggestions[testCountry] || placeSuggestions.default;
                              const filtered = [];

                              suggestions.regions.forEach(region => {
                                if (region.toLowerCase().includes(formData.placeLived.toLowerCase())) {
                                  filtered.push({ display: region, value: region });
                                }
                              });

                              Object.entries(suggestions.cities).forEach(([city, region]) => {
                                if (city.toLowerCase().includes(formData.placeLived.toLowerCase())) {
                                  filtered.push({ display: `${city}, ${region}`, value: `${city}, ${region}` });
                                }
                              });

                              setFilteredPlaces(filtered.slice(0, 10));
                              setShowPlaceSuggestions(filtered.length > 0);
                            }
                          }}
                          onBlur={() => {
                            setTimeout(() => setShowPlaceSuggestions(false), 200);
                          }}
                          autoComplete="off"
                          className="w-full px-4 py-2 border border-gray-300 rounded text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />

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
                      </div>

                      <div>
                        <label htmlFor="birthYear-desktop" className="block text-sm font-medium text-gray-700 mb-1">
                          Approximate Birth Year
                        </label>
                        <div className="relative">
                          <input
                            id="birthYear-desktop"
                            name="birthYear"
                            type="text"
                            placeholder="Use calculator for help"
                            value={formData.birthYear}
                            onChange={handleChange}
                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  )}

                  <div className="flex items-center gap-4">
                    <button type="submit" className="bg-gray-900 text-white px-4 py-3 rounded hover:bg-gray-800 font-medium">SEARCH</button>
                    <button
                      type="button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-gray-900 font-medium hover:underline whitespace-nowrap"
                    >
                      {isExpanded ? 'LESS OPTIONS' : 'MORE OPTIONS'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          {currentImages.map((image, index) => (
            <img
              key={index}
              className="hero-image absolute right-0 bottom-0 h-full object-none pointer-events-none transition-opacity duration-1000 z-0"
              src={image}
              alt="Cultural heritage collage"
              style={{ opacity: index === currentImageIndex ? 1 : 0 }}
            />
          ))}
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
    </section>
  );
}
