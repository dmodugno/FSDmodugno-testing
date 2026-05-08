/**
 * MobileTopBar - Mobile Navigation Bar
 *
 * Contains:
 * - Hamburger button (opens navigation overlay)
 * - Logo/branding
 * - Tool icons (Notifications, Messages, Tools)
 *
 * Rules:
 * - Hamburger immediately replaces any open bottom sheet
 * - Tool icons open respective bottom sheets
 * - Only one surface can be active at a time
 *
 * See ARCHITECTURE.md → Mobile Navigation & AI State Machine
 */

export default function MobileTopBar({
  onOpenHamburger,
  onOpenNotifications,
  onOpenMessages,
  onOpenTools,
  notificationCount = 0,
  messageCount = 0
}) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      {/* Left: Hamburger */}
      <button
        onClick={onOpenHamburger}
        className="p-2 hover:bg-gray-100 rounded-lg"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Center: Logo */}
      <div className="flex items-center gap-2">
        <img
          src={`${baseUrl}icons/LogoFamilySearch.svg`}
          alt="FamilySearch"
          className="h-8"
        />
      </div>

      {/* Right: Tool Icons */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Notifications"
        >
          <img
            src={`${baseUrl}icons/Notice.svg`}
            alt="Notifications"
            className="w-5 h-5"
          />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

        {/* Messages */}
        <button
          onClick={onOpenMessages}
          className="relative p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Messages"
        >
          <img
            src={`${baseUrl}icons/SocialMessage.svg`}
            alt="Messages"
            className="w-5 h-5"
          />
          {messageCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {messageCount > 9 ? '9+' : messageCount}
            </span>
          )}
        </button>

        {/* Tools */}
        <button
          onClick={onOpenTools}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Tools"
        >
          <img
            src={`${baseUrl}icons/Tools.svg`}
            alt="Tools"
            className="w-5 h-5"
          />
        </button>
      </div>
    </div>
  );
}
