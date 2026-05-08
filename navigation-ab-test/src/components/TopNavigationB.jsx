import EnvironmentSwitcher from './EnvironmentSwitcher';

export default function TopNavigationB({ onToggleSidebar, onOpenChat, isCollapsed, onDrawerToggle, rightToolbarVisible, onToggleRightToolbar }) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <nav className="bg-white h-16 flex items-center justify-between pr-4">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Menu Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="p-4 hover:bg-gray-100 rounded relative"
          aria-label="Toggle sidebar"
        >
          <div className="relative w-6 h-6">
            {/* Menu icon (hamburger) */}
            <img
              src={`${baseUrl}icons/Menu.svg`}
              alt="Menu"
              className={`absolute inset-0 w-6 h-6 transition-all duration-300 ease-in-out ${
                isCollapsed ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'
              }`}
            />
            {/* MenuClose icon (X) */}
            <img
              src={`${baseUrl}icons/MenuClose.svg`}
              alt="Close"
              className={`absolute inset-0 w-6 h-6 transition-all duration-300 ease-in-out ${
                isCollapsed ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
          </div>
        </button>

        {/* FamilySearch Logo */}
        <img
          src={`${baseUrl}icons/FSLogo.svg`}
          alt="FamilySearch"
          className="h-8 cursor-pointer"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Environment Switcher */}
        <EnvironmentSwitcher />

        {/* Language Picker Icon */}
        <button
          onClick={() => onDrawerToggle(0)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Language picker"
          aria-label="Language picker"
        >
          <img
            src={`${baseUrl}icons/ControlTranslate.svg`}
            alt="Language"
            className="w-6 h-6"
          />
        </button>

        {/* Messages Icon */}
        <button
          onClick={() => onDrawerToggle(1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Messages"
          aria-label="Messages"
        >
          <img
            src={`${baseUrl}icons/SocialMessage.svg`}
            alt="Messages"
            className="w-6 h-6"
          />
        </button>

        {/* Notifications Icon */}
        <button
          onClick={() => onDrawerToggle(2)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Notifications"
          aria-label="Notifications"
        >
          <img
            src={`${baseUrl}icons/Notice.svg`}
            alt="Notifications"
            className="w-6 h-6"
          />
        </button>

        {/* Assistant Button */}
        <button
          onClick={onOpenChat}
          className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors flex items-center space-x-2"
          aria-label="AI Assistant"
        >
          <img
            src={`${baseUrl}icons/HelpAI.svg`}
            alt="AI"
            className="w-5 h-5"
          />
          <span className="font-medium">Assistant</span>
        </button>

        {/* Right Toolbar Visibility Toggle */}
        {onToggleRightToolbar && (
          <button
            onClick={onToggleRightToolbar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={rightToolbarVisible ? 'Hide toolbar' : 'Show toolbar'}
            aria-label={rightToolbarVisible ? 'Hide toolbar' : 'Show toolbar'}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                rightToolbarVisible ? 'rotate-180' : 'rotate-0'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
}
