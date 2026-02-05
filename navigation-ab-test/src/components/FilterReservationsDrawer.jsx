import { useState } from 'react';

export default function FilterReservationsDrawer({ isOpen, onClose }) {
  // View filters (single select)
  const [selectedView, setSelectedView] = useState('All');

  // Sort options (single select)
  const [selectedSort, setSelectedSort] = useState('Date Expires');
  const [sortDirection, setSortDirection] = useState('ASCENDING');

  // Ordinance filters (multi-select)
  const [selectedOrdinances, setSelectedOrdinances] = useState([
    'Baptism and Confirmation',
    'Initiatory',
    'Sealing to Parents',
    'Sealing to Spouse'
  ]);

  const viewOptions = ['All', 'Printed', 'Not Printed', 'Selected', 'Waiting', 'Perform Next'];

  const sortOptions = [
    'Name',
    'First Name',
    'Last Name',
    'Id Number',
    'Date of Birth',
    'Sex',
    'Date Reserved',
    'Date Expires'
  ];

  const ordinanceOptions = [
    'Baptism and Confirmation',
    'Initiatory',
    'Endowment',
    'Sealing to Parents',
    'Sealing to Spouse'
  ];

  const handleOrdinanceToggle = (ordinance) => {
    setSelectedOrdinances(prev => {
      if (prev.includes(ordinance)) {
        return prev.filter(o => o !== ordinance);
      } else {
        return [...prev, ordinance];
      }
    });
  };

  const handleResetFilters = () => {
    setSelectedView('All');
    setSelectedSort('Date Expires');
    setSortDirection('ASCENDING');
    setSelectedOrdinances([
      'Baptism and Confirmation',
      'Initiatory',
      'Sealing to Parents',
      'Sealing to Spouse'
    ]);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING');
  };

  return (
    <div className="bg-white h-full overflow-y-auto w-full">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Filter</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Close drawer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* View Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">View</h3>
          <div className="flex flex-wrap gap-2">
            {viewOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedView(option)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedView === option
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">Sort</h3>
            <button
              onClick={toggleSortDirection}
              className="flex items-center gap-1 text-teal-600 font-medium text-sm hover:text-teal-700"
            >
              <svg
                className={`w-4 h-4 transition-transform ${sortDirection === 'DESCENDING' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              {sortDirection}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedSort(option)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSort === option
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Filter by Ordinance Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Filter by Ordinance</h3>
          <div className="flex flex-wrap gap-2">
            {ordinanceOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleOrdinanceToggle(option)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedOrdinances.includes(option)
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={handleResetFilters}
          className="w-full flex items-center justify-center gap-2 py-3 text-teal-600 font-medium hover:bg-teal-50 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          RESET FILTERS
        </button>
      </div>
    </div>
  );
}
