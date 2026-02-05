import RightDrawerContent from './RightDrawerContent';

export default function RightDrawerB({ activeDrawer, onDrawerToggle, iconBarOnly = false, inSplitView = false }) {
  const baseUrl = import.meta.env.BASE_URL;

  const drawerItems = [
    { icon: `${baseUrl}icons/ControlTranslate.svg`, label: 'Language picker', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/SocialMessage.svg`, label: 'Messages', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/Notice.svg`, label: 'Notifications', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/Person.svg`, label: 'Recent people viewed', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/SocialStar.svg`, label: 'Followed people', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/ControlList.svg`, label: 'To-do list', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/DocumentBox.svg`, label: 'Source Box', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/DiscoveryNameMeaning.svg`, label: 'Contacts', bgColor: 'bg-white' }
  ];

  // If inSplitView, only render drawer content (used inside split view container)
  if (inSplitView && activeDrawer !== null) {
    return (
      <div className="p-4 bg-white h-full overflow-y-auto">
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
          showEnvironmentSwitcher={false}
        />
      </div>
    );
  }

  // If iconBarOnly, only render the icon bar (used for far-right fixed icon bar)
  if (iconBarOnly) {
    return (
      <aside className="w-16 bg-white h-full flex flex-col items-center py-4">
        <div className="flex flex-col items-center space-y-2 w-full">
          {drawerItems.slice(3).map((item, index) => {
            const actualIndex = index + 3; // Map to actual indices 3-7
            return (
              <button
                key={actualIndex}
                onClick={() => onDrawerToggle(actualIndex)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                  activeDrawer === actualIndex ? 'bg-green-50 border-2 border-green-600' : item.bgColor
                } hover:bg-gray-100 transition-colors`}
                title={item.label}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-6 h-6"
                />
              </button>
            );
          })}
        </div>
      </aside>
    );
  }

  // Default mode: render both sliding drawer and icon bar (used in Variant A)
  return (
    <div className="flex h-full">
      {/* Sliding Drawer Panel */}
      <div
        className={`bg-white h-full overflow-y-auto transition-all duration-300 ease-in-out ${
          activeDrawer !== null ? 'w-80' : 'w-0'
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
              showEnvironmentSwitcher={false}
            />
          </div>
        )}
      </div>

      {/* Icon Bar */}
      <aside className="w-16 bg-white h-full flex flex-col items-center py-4">
        <div className="flex flex-col items-center space-y-2 w-full">
          {drawerItems.slice(3).map((item, index) => {
            const actualIndex = index + 3; // Map to actual indices 3-7
            return (
              <button
                key={actualIndex}
                onClick={() => onDrawerToggle(actualIndex)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                  activeDrawer === actualIndex ? 'bg-green-50 border-2 border-green-600' : item.bgColor
                } hover:bg-gray-100 transition-colors`}
                title={item.label}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-6 h-6"
                />
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
