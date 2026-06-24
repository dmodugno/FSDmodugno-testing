import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useUser } from '../../contexts/UserContext';
import MegaMenuSearch from './MegaMenuSearch';
import MegaMenuTrees from './MegaMenuTrees';
import MegaMenuMemories from './MegaMenuMemories';
import MegaMenuGetInvolved from './MegaMenuGetInvolved';
import MegaMenuHelp from './MegaMenuHelp';
import MegaMenuTemple from './MegaMenuTemple';
import MegaMenuMore from './MegaMenuMore';

const MegaMenuNavigation = forwardRef(function MegaMenuNavigation({ currentPage, onPageChange, onDrawerToggle, onOpenChat }, ref) {
  const { user } = useUser();
  const [openMenu, setOpenMenu] = useState(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [hiddenItems, setHiddenItems] = useState([]);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Refs for menu items
  const homeRef = useRef(null);
  const templeRef = useRef(null);
  const searchRef = useRef(null);
  const treesRef = useRef(null);
  const memoriesRef = useRef(null);
  const helpRef = useRef(null);
  const getInvolvedRef = useRef(null);
  const moreRef = useRef(null);

  // Refs for click-outside detection
  const headerRef = useRef(null);
  const megaMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  useImperativeHandle(ref, () => ({
    closeMenu: () => setOpenMenu(null)
  }));

  const isLDS = user?.churchMembership === 'LDS';
  const baseUrl = import.meta.env.BASE_URL;

  // Progressive responsive breakpoints
  useEffect(() => {
    const checkWidth = () => {
      const width = window.innerWidth;
      const hidden = [];

      // Progressive hiding right-to-left: get-involved → help → memories → trees → search → temple
      if (isLDS) {
        if (width < 1300) hidden.push('get-involved');
        if (width < 1150) hidden.push('help');
        if (width < 1000) hidden.push('memories');
        if (width < 900) hidden.push('trees');
        if (width < 800) hidden.push('search');
        if (width < 700) hidden.push('temple');
      } else {
        if (width < 1150) hidden.push('get-involved');
        if (width < 1000) hidden.push('help');
        if (width < 900) hidden.push('memories');
        if (width < 800) hidden.push('trees');
        if (width < 700) hidden.push('search');
      }

      setHiddenItems(hidden);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [isLDS]);

  // Click-outside detection
  useEffect(() => {
    function handleClickOutside(event) {
      const clickedInsideHeader = headerRef.current && headerRef.current.contains(event.target);
      const clickedInsideMegaMenu = megaMenuRef.current && megaMenuRef.current.contains(event.target);

      if (!clickedInsideHeader && !clickedInsideMegaMenu) {
        setOpenMenu(null);
      }
    }

    if (openMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openMenu]);

  // Click-outside detection for profile dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [profileMenuOpen]);

  // Animated underline positioning
  useEffect(() => {
    let activeRef = null;

    if (currentSection === 'home') {
      activeRef = homeRef;
    } else if (currentSection === 'temple') {
      activeRef = templeRef;
    } else if (currentSection === 'search') {
      activeRef = searchRef;
    } else if (currentSection === 'trees') {
      activeRef = treesRef;
    } else if (currentSection === 'memories') {
      activeRef = memoriesRef;
    } else if (currentSection === 'help') {
      activeRef = helpRef;
    } else if (currentSection === 'get-involved') {
      activeRef = getInvolvedRef;
    } else if (currentSection === 'more') {
      activeRef = moreRef;
    }

    if (activeRef?.current) {
      const { offsetLeft, offsetWidth } = activeRef.current;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [currentSection, hiddenItems]);

  const handleMenuClick = (menuName) => {
    setProfileMenuOpen(false);
    if (openMenu !== menuName) {
      setCurrentSection(menuName);
    }
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const handleProfileItemClick = (page) => {
    setProfileMenuOpen(false);
    onPageChange(page);
  };

  const handleSignOut = () => {
    setProfileMenuOpen(false);
    if (window.confirm('Are you sure you want to sign out?')) {
      onPageChange('Sign Out');
    }
  };

  const handlePageNavigation = (pageName) => {
    onPageChange(pageName);
    setOpenMenu(null);
  };

  const handleHomeClick = () => {
    setCurrentSection('home');
    setOpenMenu(null);
    onPageChange('Home');
  };

  return (
    <>
      <header className="sticky top-0 z-[1000] bg-[#fefefe] border-b border-[#cacdcd] w-full">
        <div className="px-12 h-16 flex items-center" ref={headerRef}>
          {/* Logo + Nav grouped on the left */}
          <div className="flex items-center gap-8">
            <img
              src={`${baseUrl}icons/FSLogo.svg`}
              alt="FamilySearch"
              className="h-8 flex-shrink-0"
            />

          {/* Menu Items */}
          <nav className="flex items-center gap-6 relative">
            {/* Home */}
            <div
              ref={homeRef}
              onClick={handleHomeClick}
              className={`flex items-center gap-1 pb-1 cursor-pointer px-2 py-1 rounded ${
                currentSection === 'home' ? 'text-[#202121]' : 'text-[#58595b] hover:bg-[#f5f6f6]'
              }`}
            >
              <span className="text-sm font-medium">Home</span>
            </div>

            {/* Temple (LDS only) */}
            {isLDS && !hiddenItems.includes('temple') && (
              <div
                ref={templeRef}
                onClick={() => handleMenuClick('temple')}
                className={`flex items-center gap-1 pb-1 cursor-pointer px-2 py-1 rounded ${
                  currentSection === 'temple' ? 'text-[#202121]' : 'text-[#58595b] hover:bg-[#f5f6f6]'
                }`}
              >
                <span className="text-sm font-medium">Temple</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}

            {/* Search */}
            {!hiddenItems.includes('search') && (
              <div
                ref={searchRef}
                onClick={() => handleMenuClick('search')}
                className={`flex items-center gap-1 pb-1 cursor-pointer px-2 py-1 rounded ${
                  currentSection === 'search' ? 'text-[#202121]' : 'text-[#58595b] hover:bg-[#f5f6f6]'
                }`}
              >
                <span className="text-sm font-medium">Search</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}

            {/* Trees */}
            {!hiddenItems.includes('trees') && (
              <div
                ref={treesRef}
                onClick={() => handleMenuClick('trees')}
                className={`flex items-center gap-1 pb-1 cursor-pointer px-2 py-1 rounded ${
                  currentSection === 'trees' ? 'text-[#202121]' : 'text-[#58595b] hover:bg-[#f5f6f6]'
                }`}
              >
                <span className="text-sm font-medium">Trees</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}

            {/* Memories */}
            {!hiddenItems.includes('memories') && (
              <div
                ref={memoriesRef}
                onClick={() => handleMenuClick('memories')}
                className={`flex items-center gap-1 pb-1 cursor-pointer px-2 py-1 rounded ${
                  currentSection === 'memories' ? 'text-[#202121]' : 'text-[#58595b] hover:bg-[#f5f6f6]'
                }`}
              >
                <span className="text-sm font-medium">Memories</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}

            {/* Help */}
            {!hiddenItems.includes('help') && (
              <div
                ref={helpRef}
                onClick={() => handleMenuClick('help')}
                className={`flex items-center gap-1 pb-1 cursor-pointer px-2 py-1 rounded ${
                  currentSection === 'help' ? 'text-[#202121]' : 'text-[#58595b] hover:bg-[#f5f6f6]'
                }`}
              >
                <span className="text-sm font-medium">Help</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}

            {/* Get Involved */}
            {!hiddenItems.includes('get-involved') && (
              <div
                ref={getInvolvedRef}
                onClick={() => handleMenuClick('get-involved')}
                className={`flex items-center gap-1 pb-1 cursor-pointer px-2 py-1 rounded ${
                  currentSection === 'get-involved' ? 'text-[#202121]' : 'text-[#58595b] hover:bg-[#f5f6f6]'
                }`}
              >
                <span className="text-sm font-medium">Get Involved</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}

            {/* More (shows when any items are hidden) */}
            {hiddenItems.length > 0 && (
              <div
                ref={moreRef}
                onClick={() => handleMenuClick('more')}
                className={`flex items-center gap-1 pb-1 cursor-pointer px-2 py-1 rounded ${
                  currentSection === 'more' ? 'text-[#202121]' : 'text-[#58595b] hover:bg-[#f5f6f6]'
                }`}
              >
                <span className="text-sm font-medium">More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}

            {/* Animated Underline */}
            <div
              className="absolute bottom-0 h-[3px] bg-[#6a992e] transition-all duration-300 ease-in-out"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
              }}
            />
          </nav>
          </div>{/* end Logo + Nav group */}

          {/* Utility Icons */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            {/* Language Picker → Drawer index 9 */}
            <button
              onClick={() => onDrawerToggle && onDrawerToggle(9)}
              className="p-2 hover:bg-[#f5f6f6] rounded-lg transition-colors flex-shrink-0"
              title="Language picker"
              aria-label="Language picker"
            >
              <img src={`${baseUrl}icons/ControlTranslate.svg`} alt="Language" className="w-5 h-5" />
            </button>

            {/* Messages → Drawer index 2 */}
            <button
              onClick={() => onDrawerToggle && onDrawerToggle(2)}
              className="p-2 hover:bg-[#f5f6f6] rounded-lg transition-colors flex-shrink-0"
              title="Messages"
              aria-label="Messages"
            >
              <img src={`${baseUrl}icons/SocialMessage.svg`} alt="Messages" className="w-5 h-5" />
            </button>

            {/* Notifications → Drawer index 3 */}
            <button
              onClick={() => onDrawerToggle && onDrawerToggle(3)}
              className="p-2 hover:bg-[#f5f6f6] rounded-lg transition-colors flex-shrink-0"
              title="Notifications"
              aria-label="Notifications"
            >
              <img src={`${baseUrl}icons/Notice.svg`} alt="Notifications" className="w-5 h-5" />
            </button>

            {/* Avatar with profile dropdown */}
            <div className="relative flex-shrink-0" ref={profileMenuRef}>
              <button
                onClick={() => { setOpenMenu(null); setProfileMenuOpen(!profileMenuOpen); }}
                className="p-2 hover:bg-[#f5f6f6] rounded-lg transition-colors"
                title="Account"
                aria-label="Account"
              >
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </div>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-[#cacdcd] rounded-lg shadow-lg z-50 py-1">
                  <div className="px-4 py-3 border-b border-[#cacdcd]">
                    <p className="text-sm font-semibold text-[#202121] truncate">{user?.name || 'Account'}</p>
                  </div>
                  {[
                    'Profile Information',
                    'Notifications',
                    'Account and Security',
                    'Permissions',
                  ].map((label) => (
                    <button
                      key={label}
                      onClick={() => handleProfileItemClick(label)}
                      className="w-full text-left px-4 py-2.5 text-sm text-[#58595b] hover:bg-[#f5f6f6] transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                  <div className="border-t border-[#cacdcd] mt-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2.5 text-sm text-[#58595b] hover:bg-[#f5f6f6] transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* AI Assistant Button - Black background, white icon only */}
            <button
              onClick={() => onDrawerToggle && onDrawerToggle(1)}
              className="p-2 bg-black hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
              title="AI Assistant"
              aria-label="AI Assistant"
            >
              <img src={`${baseUrl}icons/HelpAI.svg`} alt="AI Assistant" className="w-5 h-5 brightness-0 invert" />
            </button>
          </div>
        </div>
      </header>

      {/* Mega Menus */}
      {openMenu && (
        <div
          ref={megaMenuRef}
          className="fixed top-16 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-[999]"
        >
          <div className="px-12">
            {openMenu === 'temple' && isLDS && (
              <MegaMenuTemple onNavigate={handlePageNavigation} />
            )}
            {openMenu === 'search' && (
              <MegaMenuSearch onNavigate={handlePageNavigation} />
            )}
            {openMenu === 'trees' && (
              <MegaMenuTrees onNavigate={handlePageNavigation} />
            )}
            {openMenu === 'memories' && (
              <MegaMenuMemories onNavigate={handlePageNavigation} />
            )}
            {openMenu === 'help' && (
              <MegaMenuHelp onNavigate={handlePageNavigation} />
            )}
            {openMenu === 'get-involved' && (
              <MegaMenuGetInvolved onNavigate={handlePageNavigation} />
            )}
            {openMenu === 'more' && hiddenItems.length > 0 && (
              <MegaMenuMore onNavigate={handlePageNavigation} isLDS={isLDS} hiddenItems={hiddenItems} />
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default MegaMenuNavigation;
