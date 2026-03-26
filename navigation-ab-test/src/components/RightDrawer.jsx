import RightDrawerContent from './RightDrawerContent';
import { useUser } from '../contexts/UserContext';

export default function RightDrawer({ activeDrawer, onDrawerToggle, iconBarOnly = false, aiChatOpen = false, onHideToolbar = null, selectedEnvironment = 'familysearch-tree', onEnvironmentChange }) {
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

  // If icon bar only mode, just render the icon bar
  if (iconBarOnly) {
    return (
      <aside className="w-16 bg-white h-full flex flex-col items-center py-4">
          <div className="flex flex-col items-center space-y-2 w-full">
            {drawerItems.map((item, index) => (
              <button
                key={index}
                onClick={() => onDrawerToggle(index)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                  (index === 1 && aiChatOpen) || activeDrawer === index
                    ? 'bg-green-50 border-2 border-green-600'
                    : item.bgColor
                } hover:bg-gray-100 transition-colors`}
                title={item.label}
              >
                {index === 0 ? (
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
                    className={`w-6 h-6 ${index === 1 ? 'brightness-0' : ''}`}
                  />
                )}
              </button>
            ))}
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
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </aside>
    );
  }

  // Normal mode - render both panel and icon bar
  return (
    <div className="flex h-full">
        {/* Sliding Drawer Panel */}
        <div
          className={`bg-white h-full overflow-y-auto transition-all duration-300 ease-in-out ${
            activeDrawer !== null ? 'w-80 border-l-2 border-gray-200' : 'w-0'
          }`}
        >
          {activeDrawer !== null && (
            <div className="p-4">
              {/* Header with close button */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {drawerItems[activeDrawer].label}
                </h2>
                <button
                  onClick={() => onDrawerToggle(activeDrawer)}
                  className="p-1 hover:bg-gray-100 rounded"
                  aria-label="Close drawer"
                >
                  <img
                    src={`${baseUrl}icons/MenuClose.svg`}
                    alt="Close"
                    className="w-5 h-5"
                  />
                </button>
              </div>

              {/* Drawer content */}
              <RightDrawerContent
                activeDrawer={activeDrawer}
                drawerItems={drawerItems}
                showEnvironmentSwitcher={true}
                onEnvironmentChange={onEnvironmentChange}
              />
            </div>
          )}
        </div>

        {/* Icon Bar */}
        <aside className="w-16 bg-white h-full flex flex-col items-center py-4">
          <div className="flex flex-col items-center space-y-2 w-full">
            {drawerItems.map((item, index) => (
              <button
                key={index}
                onClick={() => onDrawerToggle(index)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                  (index === 1 && aiChatOpen) || activeDrawer === index
                    ? 'bg-green-50 border-2 border-green-600'
                    : item.bgColor
                } hover:bg-gray-100 transition-colors`}
                title={item.label}
              >
                {index === 0 ? (
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
                    className={`w-6 h-6 ${index === 1 ? 'brightness-0' : ''}`}
                  />
                )}
              </button>
            ))}
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
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </aside>
      </div>
  );
}
