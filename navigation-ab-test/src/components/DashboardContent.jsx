import { useUser } from '../contexts/UserContext';

export default function DashboardContent() {
  const { user } = useUser();

  if (!user) return null;

  const isLDS = user.churchMembership === 'LDS';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name.split(' ')[0]}!
        </h2>
        <p className="text-gray-600">
          Continue your family history journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tree Stats Card */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Family Tree</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">People in tree</p>
              <p className="text-2xl font-bold text-green-600">{user.treeSize}</p>
            </div>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
              View Tree
            </button>
          </div>
        </div>

        {/* Activity Card */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">{user.recentActivity}</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              View Activities
            </button>
          </div>
        </div>

        {/* Temple Card - Only for LDS members */}
        {isLDS && (
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Temple Ordinances</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Reserved names</p>
                <p className="text-2xl font-bold text-purple-600">{user.reservedOrdinances}</p>
              </div>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                Reserve Names
              </button>
            </div>
          </div>
        )}

        {/* Search Card */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Records</h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Discover your ancestors in historical records</p>
            <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors">
              Search Records
            </button>
          </div>
        </div>

        {/* Memories Card */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Memories</h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Preserve and share family stories</p>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors">
              Add Memory
            </button>
          </div>
        </div>

        {/* Help Card */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Help</h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Find answers and connect with experts</p>
            <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              Help Center
            </button>
          </div>
        </div>
      </div>

      {/* User Profile Info - For testing context */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Test Context</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Membership:</span>
            <span className="ml-2 font-medium">{user.churchMembership}</span>
          </div>
          <div>
            <span className="text-gray-600">Experience:</span>
            <span className="ml-2 font-medium">{user.experienceLevel}</span>
          </div>
          <div>
            <span className="text-gray-600">Tree Size:</span>
            <span className="ml-2 font-medium">{user.treeSize}</span>
          </div>
          {isLDS && (
            <div>
              <span className="text-gray-600">Reserved:</span>
              <span className="ml-2 font-medium">{user.reservedOrdinances}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
