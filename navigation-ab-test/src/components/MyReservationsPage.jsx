import { useState } from 'react';

export default function MyReservationsPage({ onFilterClick }) {
  const [activeTab, setActiveTab] = useState('Available');
  const [searchFilter, setSearchFilter] = useState('');
  const reservationsCount = 0;

  const tabs = [
    'Available',
    'Shared with temple',
    'Shared with groups',
    'Completed'
  ];

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header with Search */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            My Reservations ({reservationsCount})
          </h1>
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Filter By Name and ID"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Action Toolbar and Table */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white mx-6 mt-6 border border-gray-300 rounded-lg shadow-sm">
          {/* Action Toolbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded cursor-not-allowed">
                PRINT
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded cursor-not-allowed">
                SHARE
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded cursor-not-allowed">
                UNRESERVE
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={onFilterClick}
                className="px-4 py-2 text-sm font-medium text-teal-600 border border-teal-600 rounded hover:bg-teal-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                FILTER
              </button>
              <button className="px-4 py-2 text-sm font-medium text-teal-600 border border-teal-600 rounded hover:bg-teal-50 transition-colors">
                LEGEND
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-12 px-6 py-3">
                    <input
                      type="checkbox"
                      disabled
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded cursor-not-allowed"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Person
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Sealing
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Ordinances
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Empty state will be shown outside table */}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          <div className="px-6 py-8 text-center">
            <p className="text-lg text-gray-700">No reservations found.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
