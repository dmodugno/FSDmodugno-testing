import { useState } from 'react';

export default function AustraliaStateSelector() {
  const baseUrl = import.meta.env.BASE_URL;
  const [selectedState, setSelectedState] = useState('');

  const states = [
    'Tasmania',
    'Western Australia',
    'Victoria',
    'Queensland',
    'Northern Territory',
    'South Australia',
    'Australian Capital Territory',
    'New South Wales'
  ];

  const handleStateChange = (e) => {
    const state = e.target.value;
    if (state) {
      // Convert to URL format: lowercase with hyphens
      const stateUrl = state.toLowerCase().replace(/\s+/g, '-');
      window.open(`https://www.familysearch.org/en/australia/state/${stateUrl}`, '_blank');
    }
  };

  return (
    <article className="bg-white rounded-[10px] border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_480px] min-h-[260px] w-full">
      <div className="p-8 flex flex-col justify-center order-2 md:order-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Discover Records by State</h3>
        <p className="text-gray-700 mb-6">
          Find historical records and common surnames, and unearth stories waiting to be shared.
        </p>

        <div className="max-w-md">
          <label htmlFor="state-select" className="sr-only">Select State</label>
          <div className="relative">
            <select
              id="state-select"
              value={selectedState}
              onChange={handleStateChange}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent cursor-pointer"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
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

      <div className="order-1 md:order-2 bg-gray-100">
        <img
          src={`${baseUrl}assets/australia-map.png`}
          alt="Map of Australia showing states and territories"
          className="w-full h-full min-h-[260px] object-cover"
          onError={(e) => {
            // Fallback to placeholder if image doesn't exist
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '<div class="bg-gray-300 w-full h-full min-h-[260px] flex items-center justify-center text-gray-500"><span>Australia Map</span></div>';
          }}
        />
      </div>
    </article>
  );
}
