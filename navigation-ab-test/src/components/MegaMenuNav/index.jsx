import { useState, useEffect, useRef } from 'react';
import { useUser } from '../../contexts/UserContext';
import MegaMenuTrees from './MegaMenuTrees';
import MegaMenuMemories from './MegaMenuMemories';
import MegaMenuGetInvolved from './MegaMenuGetInvolved';
import MegaMenuHelp from './MegaMenuHelp';
import MegaMenuTemple from './MegaMenuTemple';
import MegaMenuMore from './MegaMenuMore';

export default function MegaMenuNavigation({ currentPage, onPageChange, onDrawerToggle, onOpenChat }) {
  const { user } = useUser();
  const [openMenu, setOpenMenu] = useState(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [hiddenItems, setHiddenItems] = useState([]);

  // Refs for menu items
  const homeRef = useRef(null);
  const treesRef = useRef(null);
  const memoriesRef = useRef(null);
  const getInvolvedRef = useRef(null);
  const helpRef = useRef(null);
  const templeRef = useRef(null);
  const moreRef = useRef(null);

  // Refs for click-outside detection
  const headerRef = useRef(null);
  const megaMenuRef = useRef(null);

  const isLDS = user?.churchMembership === 'LDS';
  const baseUrl = import.meta.env.BASE_URL;

  // Progressive responsive breakpoints
  useEffect(() => {
    const checkWidth = () => {
      const width = window.innerWidth;
      const hidden = [];

      // Progressive hiding based on width
      if (isLDS) {
        if (width < 1200) hidden.push('temple');
        if (width < 1100) hidden.push('help');
        if (width < 1000) hidden.push('get-involved');
        if (width < 900) hidden.push('memories');
        if (width < 800) hidden.push('trees');
      } else {
        if (width < 1100) hidden.push('help');
        if (width < 1000) hidden.push('get-involved');
        if (width < 900) hidden.push('memories');
        if (width < 800) hidden.push('trees');
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

  // Animated underline positioning
  useEffect(() => {
    let activeRef = null;

    if (currentSection === 'home') {
      activeRef = homeRef;
    } else if (currentSection === 'trees') {
      activeRef = treesRef;
    } else if (currentSection === 'memories') {
      activeRef = memoriesRef;
    } else if (currentSection === 'get-involved') {
      activeRef = getInvolvedRef;
    } else if (currentSection === 'help') {
      activeRef = helpRef;
    } else if (currentSection === 'temple') {
      activeRef = templeRef;
    } else if (currentSection === 'more') {
      activeRef = moreRef;
    }

    if (activeRef?.current) {
      const { offsetLeft, offsetWidth } = activeRef.current;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [currentSection, hiddenItems]);

  const handleMenuClick = (menuName) => {
    // Update section so underline moves immediately
    if (openMenu !== menuName) {
      setCurrentSection(menuName);
    }
    setOpenMenu(openMenu === menuName ? null : menuName);
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
        <div className="max-w-[1308px] mx-auto px-12 h-16 flex items-center justify-between" ref={headerRef}>
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={`${baseUrl}icons/FSLogo.svg`}
              alt="FamilySearch"
              className="h-8"
            />
          </div>

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

          {/* Utility Icons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search Icon (no action yet) */}
            <button className="p-2 hover:bg-[#f5f6f6] rounded-lg transition-colors flex-shrink-0" title="Search">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

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

            {/* Avatar (placeholder) */}
            <button className="p-2 hover:bg-[#f5f6f6] rounded-lg transition-colors flex-shrink-0">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </div>
            </button>

            {/* AI Assistant Button - Black background, white icon only */}
            <button
              onClick={() => onOpenChat && onOpenChat()}
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
          <div className="max-w-[1308px] mx-auto">
            {openMenu === 'trees' && (
              <MegaMenuTrees onNavigate={handlePageNavigation} />
            )}
            {openMenu === 'memories' && (
              <MegaMenuMemories onNavigate={handlePageNavigation} />
            )}
            {openMenu === 'get-involved' && (
              <MegaMenuGetInvolved onNavigate={handlePageNavigation} />
            )}
            {openMenu === 'help' && (
              <MegaMenuHelp onNavigate={handlePageNavigation} />
            )}
            {openMenu === 'temple' && isLDS && (
              <MegaMenuTemple onNavigate={handlePageNavigation} />
            )}
            {openMenu === 'more' && hiddenItems.length > 0 && (
              <MegaMenuMore onNavigate={handlePageNavigation} isLDS={isLDS} hiddenItems={hiddenItems} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
