import RightDrawerContent from './RightDrawerContent';
import { useUser } from '../contexts/UserContext';

export default function RightDrawerC({ activeDrawer, onDrawerToggle, iconBarOnly = false, aiChatOpen = false, onHideToolbar = null, selectedEnvironment = 'familysearch-tree', onEnvironmentChange }) {
  const { user } = useUser();
  const baseUrl = import.meta.env.BASE_URL;

  // Extract last name from user for dynamic tree naming
  const lastName = user?.name ? user.name.split(' ').slice(-1)[0] : 'Family';
  const userTreeName = `${lastName} Family`;
  const familyGroupName = `${lastName} family group`;
  const userTreeAvatar = lastName.charAt(0).toUpperCase();

  const environments = {
    'familysearch-tree': {
      id: 'familysearch-tree',
      name: 'Family Tree',
      icon: `${baseUrl}icons/LogoFamilySearch.svg`,
      description: 'Your private tree connected to the public tree',
      type: 'main'
    },
    'famiglia-modugno': {
      id: 'famiglia-modugno',
      name: familyGroupName,
      avatar: userTreeAvatar,
      type: 'family-group'
    },
    'cet-modugno': {
      id: 'cet-modugno',
      name: userTreeName,
      avatar: userTreeAvatar,
      type: 'cet'
    }
  };

  const currentEnv = environments[selectedEnvironment];

  // Full drawer items array (keep all 10 for content rendering)
  const drawerItems = [
    {
      icon: currentEnv.icon || null,
      avatar: currentEnv.avatar || null,
      label: 'Environment switcher',
      bgColor: 'bg-white'
    },
    { icon: `${baseUrl}icons/HelpAI.svg`, label: 'AI Assistant', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/SocialMessage.svg`, label: 'Messages', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/Notice.svg`, label: 'Notifications', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/Person.svg`, label: 'Recent people viewed', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/SocialStar.svg`, label: 'Followed people', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/ControlList.svg`, label: 'To-do list', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/DocumentBox.svg`, label: 'Source Box', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/DiscoveryNameMeaning.svg`, label: 'Contacts', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/ControlTranslate.svg`, label: 'Language picker', bgColor: 'bg-white' }
  ];

  // Variant C: Only show these icons in the right toolbar
  // Messages (2), Notifications (3), AI (1), Language (9) are in top nav
  const visibleIconIndices = [0, 4, 5, 6, 7, 8];

  // If icon bar only mode, just render the icon bar
  if (iconBarOnly) {
    return (
      <aside className="w-16 bg-white h-full flex flex-col items-center py-4">
          <div className="flex flex-col items-center space-y-2 w-full">
            {drawerItems
              .filter((_, index) => visibleIconIndices.includes(index))
              .map((item, filteredIndex) => {
                // Map back to original index for onClick
                const originalIndex = visibleIconIndices[filteredIndex];
                return (
                  <button
                    key={originalIndex}
                    onClick={() => onDrawerToggle(originalIndex)}
                    className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                      activeDrawer === originalIndex
                        ? 'bg-green-50 border-2 border-green-600'
                        : item.bgColor
                    } hover:bg-gray-100 transition-colors`}
                    title={item.label}
                  >
                    {originalIndex === 0 ? (
                      // Environment switcher icon - can be icon or avatar
                      item.icon ? (
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-8 h-8"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-base font-semibold text-gray-700">
                          {item.avatar}
                        </div>
                      )
                    ) : (
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-6 h-6"
                      />
                    )}
                  </button>
                );
              })}
          </div>

          {/* Hide toolbar button at bottom */}
          {onHideToolbar && (
            <div className="mt-auto">
              <button
                onClick={onHideToolbar}
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                title="Hide toolbar"
                aria-label="Hide toolbar"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </aside>
    );
  }

  // Full drawer mode (not used in icon bar only, but keeping for consistency)
  return null;
}
