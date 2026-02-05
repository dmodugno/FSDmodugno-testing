import { useState } from 'react';
import { useUser } from '../contexts/UserContext';

export default function RecentPeopleViewed() {
  const baseUrl = import.meta.env.BASE_URL;
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for recently viewed people
  const recentlyViewedPeople = [
    {
      id: '1',
      name: 'Giovanni Modugno',
      dates: '1785-1853',
      personId: 'ABCD-123',
      badge: { text: 'Private Person', color: 'purple' },
      avatar: 'G'
    },
    {
      id: '2',
      name: 'Maria Rossi',
      dates: '1820-1890',
      personId: 'EFGH-456',
      badge: { text: 'Public Person', color: 'yellow' },
      avatar: 'M'
    },
    {
      id: '3',
      name: 'Antonio Bianchi',
      dates: '1850-1920',
      personId: 'IJKL-789',
      badge: { text: 'Famiglia Modugno', color: 'blue' },
      avatar: 'A'
    }
  ];

  return (
    <div>
      {/* Search Box */}
      <div className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a person"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
            GO
          </button>
        </div>
      </div>

      {/* Logged-in User Profile */}
      <button className="w-full flex items-center p-3 hover:bg-gray-50 transition-colors rounded-lg">
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-lg font-semibold mr-3 flex-shrink-0">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div className="flex-1 text-left">
          <div className="font-medium text-gray-900">{user?.name || 'User'}</div>
        </div>
      </button>

      {/* Divider */}
      <div className="my-4 border-t border-gray-200"></div>

      {/* Recently Viewed People Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Recently Viewed People</h3>
        <button className="text-xs text-green-600 hover:text-green-700 font-medium">
          EDIT
        </button>
      </div>

      {/* People List or Empty State */}
      {recentlyViewedPeople.length > 0 ? (
        <div className="space-y-2">
          {recentlyViewedPeople.map((person) => {
            const badgeColors = {
              purple: 'bg-purple-100 text-purple-700',
              yellow: 'bg-yellow-100 text-yellow-700',
              blue: 'bg-blue-100 text-blue-700'
            };

            return (
              <div
                key={person.id}
                className="flex items-start p-3 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-semibold mr-3 flex-shrink-0">
                  {person.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">{person.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {person.dates} • {person.personId}
                  </div>
                  <span className={`inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded ${badgeColors[person.badge.color]}`}>
                    {person.badge.text}
                  </span>
                </div>
                <div className="ml-2">
                  <button className="p-1 hover:bg-gray-200 rounded" title="View pedigree">
                    <img
                      src={`${baseUrl}icons/TreePedigree.svg`}
                      alt="View pedigree"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-8">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
            <span className="text-2xl mr-2">+</span>
            ADD UNCONNECTED PERSON
          </button>
        </div>
      )}
    </div>
  );
}
