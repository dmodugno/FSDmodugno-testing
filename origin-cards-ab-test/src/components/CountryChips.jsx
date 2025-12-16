import { useState, useEffect, useRef } from 'react';
import { countryChipsConfig, overlayCountries } from '../data.jsx';

export default function CountryChips({ testCountry, selectedCountry, onCountrySelect }) {
  const [countries, setCountries] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const normalize = (s) => {
    const v = (s || '').trim().toLowerCase();
    return v === 'brasil' ? 'brazil' : v;
  };

  useEffect(() => {
    // Reset chips to only show top countries for the selected test country
    const topCountries = countryChipsConfig[testCountry] || countryChipsConfig['United States'];
    setCountries([...topCountries, 'More...']);
  }, [testCountry]);

  const addCountry = (country) => {
    if (countries.includes(country)) {
      onCountrySelect(country);
      return;
    }
    
    const newCountries = [...countries.filter(c => c !== 'More...'), country, 'More...'];
    setCountries(newCountries);
    onCountrySelect(country);
  };

  const handleChipClick = (country) => {
    if (country === 'More...') {
      setShowOverlay(true);
    } else {
      onCountrySelect(country);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % countries.length;
      setFocusedIndex(nextIndex);
      onCountrySelect(countries[nextIndex] === 'More...' ? selectedCountry : countries[nextIndex]);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + countries.length) % countries.length;
      setFocusedIndex(prevIndex);
      onCountrySelect(countries[prevIndex] === 'More...' ? selectedCountry : countries[prevIndex]);
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleChipClick(countries[index]);
    }
  };

  const availableCountries = () => {
    // Get all countries from the overlay, excluding those already in chips
    const chipsSet = new Set(countries.filter(c => c !== 'More...'));
    return overlayCountries.filter(c => !chipsSet.has(c)).sort((a, b) => a.localeCompare(b));
  };

  return (
    <>
      <div className="country-list flex flex-wrap gap-4 mt-2" role="radiogroup" aria-label="Where are your relatives from?">
        {countries.map((country, index) => {
          const isSelected = normalize(country) === normalize(selectedCountry);
          const isMore = country === 'More...';
          
          return (
            <button
              key={country}
              className={`country-btn inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full border text-sm transition-all ${
                isSelected && !isMore
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'bg-white text-teal-700 border-teal-200 hover:bg-teal-50'
              }`}
              role="radio"
              aria-checked={isSelected ? 'true' : 'false'}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleChipClick(country)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {country}
            </button>
          );
        })}
      </div>

      {showOverlay && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-start justify-center z-[60] pt-16"
          aria-modal="true"
          role="dialog"
          aria-labelledby="countryOverlayTitle"
          onClick={(e) => e.target === e.currentTarget && setShowOverlay(false)}
        >
          <div className="bg-gray-50 rounded-xl shadow-lg w-[min(1100px,calc(100%-2rem))] p-6">
            <div className="flex items-center justify-between">
              <h2 id="countryOverlayTitle" className="text-2xl font-semibold text-gray-900">Select a country to explore its resources</h2>
              <button 
                onClick={() => setShowOverlay(false)}
                className="p-2 rounded hover:bg-gray-200" 
                aria-label="Close country list"
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-8">
              Note that the options below only represent the countries we have experience with. Check back regularly for updates to discover new resources.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-16 gap-y-6 text-teal-700">
              {availableCountries().map(country => (
                <button
                  key={country}
                  className="text-left text-teal-700 hover:underline focus:underline"
                  onClick={() => {
                    addCountry(country);
                    setShowOverlay(false);
                  }}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
