import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';

export default function LeftNavigation({
  isCollapsed,
  onToggleSidebar,
  currentPage,
  onPageChange,
  showHeader = true,
  mobileMode = false, // Mobile full-screen mode
  onMobileClose = null // Close handler for mobile
}) {
  const { user } = useUser();
  const [expandedSection, setExpandedSection] = useState(null); // Start with all sections collapsed
  const [expandedSubItems, setExpandedSubItems] = useState({});
  const [pressedItem, setPressedItem] = useState(null); // For mobile tap feedback

  const isLDS = user?.churchMembership === 'LDS';

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Auto-expand section containing current page when in mobile mode
  useEffect(() => {
    if (mobileMode && currentPage && allMenuItems) {
      const sectionId = findSectionWithCurrentPage(allMenuItems);
      if (sectionId) {
        setExpandedSection(sectionId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileMode, currentPage]);

  if (!user) return null;

  const handleNavigate = (pageName) => {
    // Handle Sign Out specially
    if (pageName === 'Sign Out') {
      if (window.confirm('Are you sure you want to sign out?')) {
        // Clear authentication session
        sessionStorage.removeItem('access_session');
        // Reload to return to access screen
        window.location.reload();
      }
      return;
    }

    if (mobileMode) {
      // Mobile: Add pressed feedback (120ms) before navigating
      setPressedItem(pageName);
      setTimeout(() => {
        onPageChange(pageName);
        if (onMobileClose) {
          onMobileClose();
        }
        setPressedItem(null);
      }, 120);
    } else {
      // Desktop: Navigate immediately
      onPageChange(pageName);
    }
  };

  // Helper function to check if any sub-item in a section is the current page
  const isSectionActive = (subItems) => {
    if (!subItems) return false;
    return subItems.some(item => {
      if (item.label === currentPage) return true;
      if (item.subItems) return isSectionActive(item.subItems);
      return false;
    });
  };

  // Helper function to find which section contains the current page
  const findSectionWithCurrentPage = (menuItems) => {
    for (const item of menuItems) {
      if (item.subItems && isSectionActive(item.subItems)) {
        return item.id;
      }
    }
    return null;
  };

  const baseUrl = import.meta.env.BASE_URL;

  const allMenuItems = [
    {
      id: 'home',
      icon: `${baseUrl}icons/MenuHome.svg`,
      label: 'Home',
      description: 'Your personalized dashboard',
      isLink: true
    },
    {
      id: 'search',
      icon: `${baseUrl}icons/DocumentRecordSearch.svg`,
      label: 'Search records',
      description: 'Find ancestors, records, and evidence',
      subItems: [
        { label: 'Historical Records', link: '#' },
        { label: 'People in Family Tree', link: '#' },
        { label: 'Unindexed Records', link: '#' },
        { label: 'Historical Images', link: '#' },
        { label: 'Catalog', link: '#' },
        { label: 'Books', link: '#' },
        { label: 'Newspapers', link: '#' }
      ]
    },
    {
      id: 'build-tree',
      icon: `${baseUrl}icons/TreePedigree.svg`,
      label: 'Build my family tree',
      description: 'Create and improve your family tree',
      subItems: [
        { label: 'Family Tree', link: '#' },
        { label: 'Person List', link: '#' },
        { label: 'Manage Trees', link: '#' }
      ]
    },
    {
      id: 'memories',
      icon: `${baseUrl}icons/MediaCamera.svg`,
      label: 'Preserve memories',
      description: 'Save and share memories and stories',
      subItems: [
        { label: 'Gallery', link: '#' },
        { label: 'Family Feed', link: '#' },
        { label: 'Together App', link: '#' }
      ]
    },
    {
      id: 'get-involved',
      icon: `${baseUrl}icons/Get Involved.svg`,
      label: 'Get involved',
      description: 'Help others and the community',
      subItems: [
        { label: 'Your Impact', link: '#' },
        {
          label: 'Opportunities',
          expandable: true,
          subItems: [
            { label: 'Quick Name Review', link: '#' },
            { label: 'Full Name Review', link: '#' },
            { label: 'Indexing Review', link: '#' }
          ]
        }
      ]
    },
    ...(isLDS ? [{
      id: 'temple',
      icon: `${baseUrl}icons/PlaceTemple.svg`,
      label: 'Temple',
      description: 'Prepare and manage ordinances',
      subItems: [
        { label: 'My Reservations', link: '#' },
        { label: 'Ordinances Ready', link: '#' },
        { label: 'Family Name Assist', link: '#' },
        { label: 'Schedule Temple Appointment', link: '#' }
      ]
    }] : []),
    {
      id: 'help',
      icon: `${baseUrl}icons/HelpPreserver.svg`,
      label: 'Help and learning',
      description: 'Find answers, learn new skills, and get personalized help',
      subItems: [
        { label: 'Locations', link: '#' },
        { label: 'Getting started', link: '#' },
        { label: 'Classes and Videos', link: '#' },
        { label: 'Community', link: '#' },
        { label: 'One-on-One Help', link: '#' },
        { label: 'FamilySearch Wiki', link: '#' }
      ]
    },
    {
      id: 'settings',
      icon: `${baseUrl}icons/MenuSettings.svg`,
      label: 'Account settings',
      description: '',
      subItems: [
        {
          label: 'Personal',
          expandable: true,
          subItems: [
            { label: 'Profile Information', link: '#' },
            { label: 'Notifications', link: '#' }
          ]
        },
        {
          label: 'Security and Access',
          expandable: true,
          subItems: [
            { label: 'Account and Security', link: '#' },
            { label: 'Permissions', link: '#' }
          ]
        }
      ]
    },
    {
      id: 'signout',
      icon: `${baseUrl}icons/Sign Out.svg`,
      label: 'Sign Out',
      description: '',
      isLink: true
    }
  ];

  // Split menu items into main and bottom sections
  const mainMenuItems = allMenuItems.filter(item => item.id !== 'settings' && item.id !== 'signout');
  const bottomMenuItems = allMenuItems.filter(item => item.id === 'settings' || item.id === 'signout');

  const toggleSubItem = (key) => {
    setExpandedSubItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderSubItems = (subItems, parentKey = '') => {
    return subItems.map((item, index) => {
      const itemKey = `${parentKey}-${index}`;

      if (item.expandable) {
        return (
          <div key={itemKey}>
            <button
              onClick={() => toggleSubItem(itemKey)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
            >
              <span>{item.label}</span>
              <svg
                className={`w-3 h-3 text-gray-400 transition-transform ${expandedSubItems[itemKey] ? 'rotate-90' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSubItems[itemKey] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pl-4">
                {renderSubItems(item.subItems, itemKey)}
              </div>
            </div>
          </div>
        );
      }

      const isActive = currentPage === item.label;
      const isPressed = mobileMode && pressedItem === item.label;
      return (
        <button
          key={itemKey}
          onClick={() => handleNavigate(item.label)}
          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
            isPressed
              ? 'bg-green-100 border-l-4 border-green-600'
              : isActive
              ? 'bg-green-50 text-green-700 font-medium border-l-4 border-green-600'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {item.label}
        </button>
      );
    });
  };

  return (
    <nav className={mobileMode ? 'fixed inset-0 z-50 bg-white overflow-y-auto' : `flex-shrink-0 bg-white h-full transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        {/* Mobile Header with Close Button */}
        {mobileMode && onMobileClose && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onMobileClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {/* Header with Logo and Toggle - Only shown in Variant A desktop */}
        {showHeader && !mobileMode && (
          <div className={`flex items-center border-b border-gray-200 ${isCollapsed ? 'justify-center p-3' : 'justify-between p-4'}`}>
            {!isCollapsed && (
              <img src={`${baseUrl}icons/FSLogo.svg`} alt="FamilySearch" className="h-8" />
            )}
            <button
              onClick={onToggleSidebar}
              className={`hover:bg-gray-100 rounded ${isCollapsed ? 'p-1' : 'p-2'} relative`}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
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
          </div>
        )}

        {/* Main Menu items - scrollable */}
        <div className="flex-1 overflow-y-auto">
          {mainMenuItems.map((item) => (
            <div key={item.id} className="border-b border-gray-100">
              {item.isLink ? (
                <button
                  onClick={() => handleNavigate(item.label)}
                  className={`w-full flex items-center p-3 transition-colors ${
                    mobileMode && pressedItem === item.label
                      ? 'bg-green-100 border-l-4 border-green-600'
                      : currentPage === item.label
                      ? 'bg-green-50 border-l-4 border-green-600'
                      : 'hover:bg-gray-50'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <img src={item.icon} alt={item.label} className={`w-6 h-6 ${!isCollapsed && 'mr-3'}`} />
                  {!isCollapsed && (
                    <div className="flex-1 text-left">
                      <div className={`text-sm font-medium ${currentPage === item.label ? 'text-green-700' : 'text-gray-900'}`}>
                        {item.label}
                      </div>
                      {item.description && (
                        <div className={`text-xs mt-0.5 ${currentPage === item.label ? 'text-green-600' : 'text-gray-500'}`}>
                          {item.description}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      if (isCollapsed) {
                        onToggleSidebar();
                        // When expanding from collapsed state, always expand the section that was clicked
                        setExpandedSection(item.id);
                      } else {
                        toggleSection(item.id);
                      }
                    }}
                    className={`w-full flex items-center p-3 transition-colors ${
                      isSectionActive(item.subItems) && (isCollapsed || expandedSection !== item.id) ? 'bg-green-50 border-l-4 border-green-600' : 'hover:bg-gray-50'
                    }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <img src={item.icon} alt={item.label} className={`w-6 h-6 ${!isCollapsed && 'mr-3'}`} />
                    {!isCollapsed && (
                      <>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium text-gray-900">{item.label}</div>
                          {item.description && (
                            <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                          )}
                        </div>
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform ${expandedSection === item.id ? 'rotate-90' : 'rotate-0'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </>
                    )}
                  </button>

                  {!isCollapsed && item.subItems && (
                    <div
                      className={`bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedSection === item.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {renderSubItems(item.subItems, item.id)}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Bottom section - Settings and Sign Out */}
        <div className="border-t-2 border-gray-200 mt-auto">
          {bottomMenuItems.map((item) => (
            <div key={item.id} className="border-b border-gray-100">
              {item.isLink ? (
                <button
                  onClick={() => handleNavigate(item.label)}
                  className={`w-full flex items-center p-3 transition-colors ${
                    mobileMode && pressedItem === item.label
                      ? 'bg-green-100 border-l-4 border-green-600'
                      : currentPage === item.label
                      ? 'bg-green-50 border-l-4 border-green-600'
                      : 'hover:bg-gray-50'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <img src={item.icon} alt={item.label} className={`w-6 h-6 ${!isCollapsed && 'mr-3'}`} />
                  {!isCollapsed && (
                    <div className="flex-1 text-left">
                      <div className={`text-sm font-medium ${currentPage === item.label ? 'text-green-700' : 'text-gray-900'}`}>
                        {item.label}
                      </div>
                      {item.description && (
                        <div className={`text-xs mt-0.5 ${currentPage === item.label ? 'text-green-600' : 'text-gray-500'}`}>
                          {item.description}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      if (isCollapsed) {
                        onToggleSidebar();
                        // When expanding from collapsed state, always expand the section that was clicked
                        setExpandedSection(item.id);
                      } else {
                        toggleSection(item.id);
                      }
                    }}
                    className={`w-full flex items-center p-3 transition-colors ${
                      isSectionActive(item.subItems) && (isCollapsed || expandedSection !== item.id) ? 'bg-green-50 border-l-4 border-green-600' : 'hover:bg-gray-50'
                    }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <img src={item.icon} alt={item.label} className={`w-6 h-6 ${!isCollapsed && 'mr-3'}`} />
                    {!isCollapsed && (
                      <>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium text-gray-900">{item.label}</div>
                          {item.description && (
                            <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                          )}
                        </div>
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform ${expandedSection === item.id ? 'rotate-90' : 'rotate-0'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </>
                    )}
                  </button>

                  {!isCollapsed && item.subItems && (
                    <div
                      className={`bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedSection === item.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {renderSubItems(item.subItems, item.id)}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
