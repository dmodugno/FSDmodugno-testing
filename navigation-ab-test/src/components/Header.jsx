import { useUser } from '../contexts/UserContext';

export default function Header({ hideMainHeader = false }) {
  const { user } = useUser();

  if (!user) return null;

  return (
    <>
      {/* Main FamilySearch Header - Only show for Variant B */}
      {!hideMainHeader && (
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-green-700">FamilySearch</h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
