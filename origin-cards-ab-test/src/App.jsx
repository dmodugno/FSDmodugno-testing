import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import CountryChips from './components/CountryChips';
import OriginCards from './components/OriginCards';
import RecordCollections from './components/RecordCollections';
import GetStarted from './components/GetStarted';
import FreeHelp from './components/FreeHelp';
import { countryCollections, countryChipsConfig } from './data.jsx';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTestCountry = searchParams.get('country') || 'United States';
  const [testCountry, setTestCountry] = useState(initialTestCountry);

  // Default to test country on load (or England if UK)
  const getDefaultCountry = () => {
    if (testCountry === 'United Kingdom') return 'England';
    return testCountry;
  };

  const [selectedCountry, setSelectedCountry] = useState(getDefaultCountry());

  // Hide test banner if country param exists (user testing mode)
  // Show test banner if no params (internal testing mode)
  const [showTestBanner, setShowTestBanner] = useState(!searchParams.has('country'));

  // Build search-by-place URL with preserved query params
  const getSearchByPlaceUrl = () => {
    const country = searchParams.get('country');
    return country ? `/search-by-place?country=${country}` : '/search-by-place';
  };

  const handleTestCountryChange = (country) => {
    setTestCountry(country);
    setSearchParams({ country });
    // When test country changes, set selected country to the first chip country for that test country
    const chipCountries = countryChipsConfig[country] || countryChipsConfig['United States'];
    setSelectedCountry(chipCountries[0]);
  };

  // Keyboard shortcut to toggle test banner (Cmd+Shift+T on Mac, Ctrl+Shift+T on Windows)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        setShowTestBanner(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentCollections = countryCollections[selectedCountry] || [];
  const showCollections = currentCollections.length > 0 && selectedCountry !== 'Cambodia';

  return (
    <div className="m-0 bg-gray-100 text-gray-900 font-['Noto_Sans',Segoe_UI,Arial,sans-serif]">
      <Header 
        testCountry={testCountry} 
        onTestCountryChange={handleTestCountryChange} 
        showTestBanner={showTestBanner}
      />
      <Hero testCountry={testCountry} />
      
      <main className="mx-auto px-4 py-8 max-w-[1200px] xl:max-w-[1280px] 2xl:max-w-[1440px]">
        <section className="my-8 bg-white rounded-xl p-6" aria-label="Where are your relatives from?">
          <div className="text-xl font-semibold text-teal-700 mb-2">Where are your relatives from?</div>
          <p className="text-gray-600 text-sm mb-4">
            Select a country to explore its resources. Discover experiences, records, and research from around the world.
          </p>
          
          <CountryChips
            testCountry={testCountry}
            selectedCountry={selectedCountry}
            onCountrySelect={setSelectedCountry}
            moreCountriesLink={{ url: getSearchByPlaceUrl(), internal: true }}
          />
          
          <div className="mt-6">
            <OriginCards country={selectedCountry} skipAncestorSearch={true} />
          </div>
          
          {showCollections && (
            <RecordCollections 
              country={selectedCountry}
              collections={currentCollections}
            />
          )}
        </section>

        <GetStarted />
      </main>
      
      <FreeHelp />
    </div>
  );
}

export default App;
