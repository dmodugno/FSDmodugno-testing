import { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header testCountry={testCountry} onTestCountryChange={handleTestCountryChange} />
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#E0E594] to-gray-50 relative overflow-hidden">
        {/* Background Animation - Right Aligned */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 flex items-center justify-end">
          <HeroImageSlider />
        </div>
        
        {/* Content */}
        <div className="mx-auto px-4 py-16 max-w-[1200px] xl:max-w-[1280px] 2xl:max-w-[1440px] relative z-10">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 max-w-xl">
              Where are your relatives from?
            </h1>
            <p className="text-lg text-gray-700 mb-6 max-w-xl">
              Uncover your heritage by exploring your ancestors' stories and building your family tree! FamilySearch International collaborates with global archives to offer free online access to records from over 200 countries.
            </p>
            <p className="text-base text-gray-700 mb-8 max-w-xl">
              Choose an available country to discover its resources, and check back regularly for updates.
            </p>
            
            <CountryChips 
              testCountry={testCountry}
              selectedCountry={selectedCountry}
              onCountrySelect={setSelectedCountry}
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="mx-auto px-4 py-8 max-w-[1200px] xl:max-w-[1280px] 2xl:max-w-[1440px]">
        {showDefaultSearch && <DefaultSearchCard />}
        {hasOriginCards && <OriginCards country={selectedCountry} skipAncestorSearch={true} />}
        {hasRecordCollections && <RecordCollections country={selectedCountry} collections={countryCollections[selectedCountry]} />}
        
        <GetStarted />
      </main>
      
      <FreeHelp />
    </div>
  );
}
