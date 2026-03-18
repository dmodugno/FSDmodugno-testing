import { useState } from 'react';

export default function LocationSelector({ config }) {
  const baseUrl = import.meta.env.BASE_URL;
  const [selectedLocation, setSelectedLocation] = useState('');

  const {
    heading = "Discover Records by Location",
    subheading = "Find historical records and common surnames, and unearth stories waiting to be shared.",
    locations = [],
    urlPattern = "",
    mapImage = null,
    selectPlaceholder = "Select Location",
    mapPosition = "right" // "right" or "top"
  } = config;

  const handleLocationChange = (e) => {
    const location = e.target.value;
    if (location) {
      // Convert to URL format: lowercase with spaces replaced by hyphens
      const locationUrl = location.toLowerCase().replace(/\s+/g, '-');
      window.open(`https://www.familysearch.org/en/${urlPattern}/${locationUrl}`, '_blank');
    }
  };

  // Render map element
  const MapElement = () => (
    <div className={`bg-gray-100 ${mapPosition === 'top' ? 'w-full' : ''}`}>
      {mapImage ? (
        <img
          src={`${baseUrl}${mapImage}`}
          alt={`Map showing ${heading.toLowerCase()}`}
          className={`w-full object-contain ${mapPosition === 'top' ? 'h-[300px]' : 'h-full min-h-[260px]'}`}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = `<div class="bg-gray-300 w-full ${mapPosition === 'top' ? 'h-[300px]' : 'h-full min-h-[260px]'} flex items-center justify-center text-gray-500"><span>Map Placeholder</span></div>`;
          }}
        />
      ) : (
        <div className={`bg-gray-300 w-full ${mapPosition === 'top' ? 'h-[300px]' : 'h-full min-h-[260px]'} flex items-center justify-center text-gray-500`}>
          <span>Map Placeholder</span>
        </div>
      )}
    </div>
  );

  // Render content element
  const ContentElement = () => (
    <div className="p-8 flex flex-col justify-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{heading}</h3>
      <p className="text-gray-700 mb-6">{subheading}</p>

      <div className="max-w-md">
        <label htmlFor="location-select" className="sr-only">{selectPlaceholder}</label>
        <div className="relative">
          <select
            id="location-select"
            value={selectedLocation}
            onChange={handleLocationChange}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent cursor-pointer"
          >
            <option value="">{selectPlaceholder}</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  if (mapPosition === 'top') {
    // Vertical layout: map on top, content below
    return (
      <article className="bg-white rounded-[10px] border border-gray-200 overflow-hidden min-h-[260px] w-full">
        <MapElement />
        <ContentElement />
      </article>
    );
  }

  // Horizontal layout: map on right, content on left (default)
  return (
    <article className="bg-white rounded-[10px] border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_480px] min-h-[260px] w-full">
      <div className="order-2 md:order-1">
        <ContentElement />
      </div>
      <div className="order-1 md:order-2">
        <MapElement />
      </div>
    </article>
  );
}
