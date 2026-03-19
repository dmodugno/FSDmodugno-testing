import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import CountryChips from './components/CountryChips';
import OriginCards from './components/OriginCards';
import RecordCollections from './components/RecordCollections';
import DefaultSearchCard from './components/DefaultSearchCard';
import HeroImageSlider from './components/HeroImageSlider';
import GetStarted from './components/GetStarted';
import FreeHelp from './components/FreeHelp';
import { useCountryContent } from './hooks/useCountryContent';
import { countryCollections, countryChipsConfig, originCardsContent } from './data.jsx';

export default function VariantB() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTestCountry = searchParams.get('country') || 'United States';
  const [testCountry, setTestCountry] = useState(initialTestCountry);

  // Hide test banner if country param exists (user testing mode)
  // Show test banner if no params (internal testing mode)
  const [showTestBanner, setShowTestBanner] = useState(!searchParams.has('country'));
  
  // Default to test country on load (or England if UK)
  const getDefaultCountry = () => {
    if (testCountry === 'United Kingdom') return 'England';
    return testCountry;
  };
  
  const [selectedCountry, setSelectedCountry] = useState(getDefaultCountry());
  const { hasOriginCards, hasRecordCollections, isAvailable } = useCountryContent(selectedCountry);

  // Check if country has the ancestor search card (4 fields with specific header)
  const hasAncestorSearchCard = () => {
    const cards = originCardsContent[selectedCountry] || [];
    return cards.some(card => 
      card.hasForm && 
      card.formFields && 
      card.formFields.length === 4 &&
      card.header === "What will you discover about your ancestors?"
    );
  };

  const showDefaultSearch = !hasOriginCards || hasAncestorSearchCard();

  console.log('VariantB:', { selectedCountry, hasOriginCards, hasRecordCollections, isAvailable, showDefaultSearch });

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        testCountry={testCountry} 
        onTestCountryChange={handleTestCountryChange} 
        showTestBanner={showTestBanner}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#E0E594] to-gray-50 relative overflow-hidden">
        {/* Mobile: Image first, stacked vertically */}
        <div className="flex flex-col md:hidden">
          <div className="relative w-full h-[300px]">
            <HeroImageSlider useAlternateFrames={true} />
          </div>
          <div className="px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Where are your relatives from?
            </h1>
            <p className="text-base text-gray-700 mb-6">
              Select a country to explore its resources. Discover experiences, records, and research from around the world.
            </p>

            <CountryChips
              testCountry={testCountry}
              selectedCountry={selectedCountry}
              onCountrySelect={setSelectedCountry}
              moreCountriesLink={{ url: '/search-by-place', internal: true }}
            />
          </div>
        </div>

        {/* Desktop: Side by side with image extending beyond container */}
        <div className="hidden md:block relative min-h-[500px] xl:overflow-visible">
          <div className="flex items-center mx-auto px-4 max-w-[1200px] xl:max-w-[1280px] 2xl:max-w-[1440px] min-h-[500px] relative">
            {/* Text Content */}
            <div className="flex flex-col gap-3 z-10 max-w-[600px] py-16">
              <h1 className="text-5xl font-bold text-gray-900">
                Where are your relatives from?
              </h1>
              <p className="text-base text-gray-700">
                Select a country to explore its resources. Discover experiences, records, and research from around the world.
              </p>

              <CountryChips
                testCountry={testCountry}
                selectedCountry={selectedCountry}
                onCountrySelect={setSelectedCountry}
                moreCountriesLink={{ url: '/search-by-place', internal: true }}
              />
            </div>

            {/* Animation - Absolutely positioned to extend right */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none z-0">
              <HeroImageSlider useAlternateFrames={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="mx-auto px-4 py-8 max-w-[1200px] xl:max-w-[1280px] 2xl:max-w-[1440px]">
        {showDefaultSearch && <DefaultSearchCard selectedCountry={selectedCountry} />}
        {hasOriginCards && <OriginCards country={selectedCountry} skipAncestorSearch={true} />}
        {hasRecordCollections && <RecordCollections country={selectedCountry} collections={countryCollections[selectedCountry]} />}
        
        <GetStarted />
      </main>
      
      <FreeHelp />
    </div>
  );
}
