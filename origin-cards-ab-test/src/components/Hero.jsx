import { useState, useEffect } from 'react';

export default function Hero({ testCountry }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPhilippines, setIsPhilippines] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  const defaultImages = [`${baseUrl}Country=US.png`, `${baseUrl}Country=Mexico.png`, `${baseUrl}Country=UK.png`];
  const philippinesImages = [`${baseUrl}Country=Philippines.png`, `${baseUrl}Country=Korea.png`, `${baseUrl}Country=Cambodia.png`];

  useEffect(() => {
    setIsPhilippines(testCountry === 'Philippines');
    setCurrentImageIndex(0);
  }, [testCountry]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % (isPhilippines ? philippinesImages.length : defaultImages.length));
    }, 3000);
    return () => clearInterval(timer);
  }, [isPhilippines]);

  const currentImages = isPhilippines ? philippinesImages : defaultImages;

  const handleSearch = (e) => {
    e.preventDefault();
    if (isPhilippines) {
      const surname = e.target.surname?.value || '';
      window.open(`https://www.familysearch.org/en/philippines/surname/${encodeURIComponent(surname)}`, '_blank');
    } else {
      const given = e.target.given?.value || '';
      const surname = e.target.surname?.value || '';
      const url = `https://www.familysearch.org/en/search/discovery/results?results=12&q.givenName=${encodeURIComponent(given)}&q.surname=${encodeURIComponent(surname)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <section className="relative bg-[#EEEFC9]" aria-label="Welcome section">
      {/* Mobile: Image first, stacked vertically */}
      <div className="flex flex-col md:hidden overflow-hidden">
        <div className="relative w-full h-[300px] overflow-hidden">
          <img 
            className="hero-image w-full h-full object-cover transition-opacity duration-700" 
            src={currentImages[currentImageIndex]} 
            alt="Cultural heritage collage"
          />
        </div>
        <div className="flex flex-col gap-3 px-4 py-6">
          <p className="text-sm text-gray-800 font-medium m-0">Welcome to FamilySearch</p>
          <h1 className="text-3xl font-bold text-teal-700 m-0">Discover Your Family History</h1>
          <p className="text-base text-gray-700 m-0">Dive into your roots by discovering your ancestors' stories and building your family tree!</p>
          
          {isPhilippines ? (
            <form onSubmit={handleSearch} className="flex flex-col gap-2 w-full" role="search" aria-label="Search for ancestors">
              <h3 className="text-lg font-semibold text-teal-700">Start learning about your family</h3>
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input 
                  name="surname"
                  type="text" 
                  placeholder="Enter your surname" 
                  aria-label="Surname" 
                  className="flex-1 px-3 py-2 border border-teal-200 rounded text-base" 
                />
                <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-600 whitespace-nowrap">Search</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSearch} className="flex flex-col gap-2 w-full" role="search" aria-label="Search for ancestors">
              {(testCountry === 'United States' || testCountry === 'United Kingdom' || testCountry === 'Brasil') && (
                <h6 className="text-base font-semibold text-teal-700 m-0 mb-2 mt-8">Start by searching one of your relatives</h6>
              )}
              <input 
                name="given"
                type="text" 
                placeholder="First name" 
                aria-label="First name" 
                className="w-full px-3 py-2 border border-teal-200 rounded text-base" 
              />
              <input 
                name="surname"
                type="text" 
                placeholder="Last name" 
                aria-label="Last name" 
                className="w-full px-3 py-2 border border-teal-200 rounded text-base" 
              />
              <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-600">Search</button>
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
              <form onSubmit={handleSearch} className="flex flex-col gap-2 max-w-[420px] w-full" role="search" aria-label="Search for ancestors">
                <h3 className="text-xl font-semibold text-teal-700">Start learning about your family</h3>
                <div className="flex gap-2 w-full">
                  <input 
                    name="surname"
                    type="text" 
                    placeholder="Enter your surname" 
                    aria-label="Surname" 
                    className="flex-1 px-4 py-3 border border-teal-200 rounded-l text-base" 
                  />
                  <button type="submit" className="bg-teal-700 text-white px-4 py-3 rounded-r hover:bg-teal-600 whitespace-nowrap">Search</button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-2">
                {(testCountry === 'United States' || testCountry === 'United Kingdom' || testCountry === 'Brasil') && (
                  <h6 className="text-base font-semibold text-teal-700 m-0 mt-8">Start by searching one of your relatives</h6>
                )}
                <form onSubmit={handleSearch} className="flex gap-2 max-w-[420px] w-full" role="search" aria-label="Search for ancestors">
                  <input 
                    name="given"
                    type="text" 
                    placeholder="First name" 
                    aria-label="First name" 
                    className="flex-1 px-4 py-3 border border-teal-200 rounded-l text-base" 
                  />
                  <input 
                    name="surname"
                    type="text" 
                    placeholder="Last name" 
                    aria-label="Last name" 
                    className="flex-1 px-4 py-3 border border-teal-200 text-base" 
                  />
                  <button type="submit" className="bg-teal-700 text-white px-4 py-3 rounded-r hover:bg-teal-600 whitespace-nowrap">Search</button>
                </form>
              </div>
            )}
          </div>
          <img 
            className="hero-image absolute right-0 bottom-0 h-full object-none pointer-events-none transition-opacity duration-700 z-0" 
            src={currentImages[currentImageIndex]} 
            alt="Cultural heritage collage"
          />
        </div>
      </div>
    </section>
  );
}
