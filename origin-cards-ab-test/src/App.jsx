import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CountryChips from './components/CountryChips';
import OriginCards from './components/OriginCards';
import RecordCollections from './components/RecordCollections';
import GetStarted from './components/GetStarted';
import FreeHelp from './components/FreeHelp';
import { countryCollections, countryChipsConfig } from './data.jsx';

function App() {
  const [testCountry, setTestCountry] = useState('United States');
  const [selectedCountry, setSelectedCountry] = useState('United States');

  const handleTestCountryChange = (country) => {
    setTestCountry(country);
    // When test country changes, set selected country to the first chip country for that test country
    const chipCountries = countryChipsConfig[country] || countryChipsConfig['United States'];
    setSelectedCountry(chipCountries[0]);
  };

  const currentCollections = countryCollections[selectedCountry] || [];
  const showCollections = currentCollections.length > 0 && selectedCountry !== 'Cambodia';

  return (
    <div className="m-0 bg-gray-100 text-gray-900 font-['Noto_Sans',Segoe_UI,Arial,sans-serif]">
      <Header testCountry={testCountry} onTestCountryChange={handleTestCountryChange} />
      <Hero testCountry={testCountry} />
      
      <main className="mx-auto px-4 py-8 max-w-[1200px] xl:max-w-[1280px] 2xl:max-w-[1440px]">
        <section className="my-8 bg-white rounded-xl p-6" aria-label="Where are your relatives from?">
          <div className="text-xl font-semibold text-teal-700 mb-2">Where are your relatives from?</div>
          <p className="text-gray-600 text-sm mb-4">
            Choose an available country to discover its resources, and check back regularly for updates.
          </p>
          
          <CountryChips 
            testCountry={testCountry}
            selectedCountry={selectedCountry}
            onCountrySelect={setSelectedCountry}
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
