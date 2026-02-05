import { useUser } from '../contexts/UserContext';

export default function NavigationB() {
  const { user } = useUser();

  if (!user) return null;

  const isLDS = user.churchMembership === 'LDS';

  return (
    <nav className="bg-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center gap-1">
          <li>
            <a href="#" className="block px-4 py-3 hover:bg-green-600 transition-colors font-medium">
              Tree
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-3 hover:bg-green-600 transition-colors font-medium">
              Discover
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-3 hover:bg-green-600 transition-colors font-medium">
              Memories
            </a>
          </li>
          {isLDS && (
            <li>
              <a href="#" className="block px-4 py-3 hover:bg-green-600 transition-colors font-medium">
                Temple
              </a>
            </li>
          )}
          <li>
            <a href="#" className="block px-4 py-3 hover:bg-green-600 transition-colors font-medium">
              Resources
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
