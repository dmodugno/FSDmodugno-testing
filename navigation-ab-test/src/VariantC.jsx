import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import MegaMenuNavigation from './components/MegaMenuNav';
import HomePage from './components/Home';
import FamilyTreePage from './components/FamilyTree/FamilyTreePage';
import GalleryPage from './components/GalleryPage';
import MyReservationsPage from './components/MyReservationsPage';
import { PersonDetailDrawer } from './components/FamilyTree';
import OrganizeGalleryDrawer from './components/OrganizeGalleryDrawer';
import FilterReservationsDrawer from './components/FilterReservationsDrawer';
import RightDrawerC from './components/RightDrawerC';
import RightDrawerContent from './components/RightDrawerContent';
import AIChatOverlay from './components/AIChatOverlay';
import FloatingTestPanel from './components/FloatingTestPanel';
import Toast from './components/Toast';
import Messages from './components/Messages';
import { useUser } from './contexts/UserContext';
import { useMobileNavigation } from './hooks/useMobileNavigation';
import LeftNavigation from './components/LeftNavigation';
import GalleryToolsContent from './components/mobile/GalleryToolsContent';
import GallerySearchContent from './components/mobile/GallerySearchContent';
import {
  BottomSheet,
  ToolsHub,
  MobileAIFull,
  MobileTopBar
} from './components/mobile';

export default function VariantC() {
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState('Home');
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [organizeGalleryOpen, setOrganizeGalleryOpen] = useState(false);
  const [filterReservationsOpen, setFilterReservationsOpen] = useState(false);
  const [chat, setChat] = useState(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState('familysearch-tree');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [rightToolbarVisible, setRightToolbarVisible] = useState(true);

  // Mobile navigation state machine
  const mobile = useMobileNavigation();

  // Responsive detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind 'md' breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize page from URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setCurrentPage(hash);
    }
  }, []);

  // Update URL hash when page changes
  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
    window.location.hash = pageName;

    if (isMobile) {
      mobile.navigateToPage(pageName);
    } else {
      // Desktop: Close context drawers
      setSelectedPerson(null);
      setOrganizeGalleryOpen(false);
      setFilterReservationsOpen(false);
    }
  };

  // Handle drawer toggle
  const handleDrawerToggle = (index) => {
    // Special handling for AI Assistant (index 1)
    if (index === 1) {
      if (!chat) {
        const newChat = {
          id: 1,
          title: 'AI Chatbot',
          messages: [],
          isMinimized: false
        };
        setChat(newChat);
      } else if (chat.isMinimized) {
        setChat({ ...chat, isMinimized: false });
      } else {
        setChat(null);
      }
      return;
    }

    // Normal drawer toggle
    setActiveDrawer(activeDrawer === index ? null : index);
    if (activeDrawer !== index) {
      setSelectedPerson(null);
      setOrganizeGalleryOpen(false);
      setFilterReservationsOpen(false);
    }
  };

  // Chat management functions
  const handleOpenNewChat = () => {
    if (!chat) {
      const newChat = {
        id: 1,
        title: 'AI Chatbot',
        messages: [],
        isMinimized: false
      };
      setChat(newChat);
    } else if (chat.isMinimized) {
      setChat({ ...chat, isMinimized: false });
    }
  };

  const handleCloseChat = () => {
    setChat(null);
  };

  const handleMinimizeChat = () => {
    if (chat) {
      setChat({ ...chat, isMinimized: true });
    }
  };

  const handleMaximizeChat = () => {
    if (chat) {
      setChat({ ...chat, isMinimized: false });
    }
  };

  const handleResetChat = () => {
    if (chat) {
      setChat({ ...chat, messages: [] });
    }
  };

  // Person detail drawer management
  const handlePersonClick = (person) => {
    setSelectedPerson(person);

    if (isMobile) {
      mobile.openPersonDrawer();
    } else {
      setActiveDrawer(null);
      setOrganizeGalleryOpen(false);
      setFilterReservationsOpen(false);
    }
  };

  const handleClosePersonDrawer = () => {
    setSelectedPerson(null);
  };

  // Organize Gallery drawer management
  const handleOrganizeGalleryClick = () => {
    if (isMobile) {
      setOrganizeGalleryOpen(true);
      mobile.openOrganizeGallery();
    } else {
      setOrganizeGalleryOpen(!organizeGalleryOpen);
      if (!organizeGalleryOpen) {
        setActiveDrawer(null);
        setSelectedPerson(null);
        setFilterReservationsOpen(false);
      }
    }
  };

  const handleCloseOrganizeGallery = () => {
    setOrganizeGalleryOpen(false);
  };

  // Gallery Tools management (mobile only)
  const handleGalleryToolsClick = () => {
    mobile.openGalleryTools();
  };

  // Gallery Search management (mobile only)
  const handleGallerySearchClick = () => {
    mobile.openGallerySearch();
  };

  // Add Memories management
  const handleAddMemoriesClick = () => {
    console.log('Add Memories clicked');
  };

  // Filter Reservations drawer management
  const handleFilterReservationsClick = () => {
    setFilterReservationsOpen(!filterReservationsOpen);
    if (!filterReservationsOpen) {
      setActiveDrawer(null);
      setSelectedPerson(null);
      setOrganizeGalleryOpen(false);
    }
  };

  const handleCloseFilterReservations = () => {
    setFilterReservationsOpen(false);
  };

  // Environment switcher handlers
  const handleEnvironmentChange = (envId, newEnv) => {
    setSelectedEnvironment(envId);
    setActiveDrawer(null);
    setToastMessage(`Environment changed to ${newEnv.name}`);
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

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

  // Drawer items for Variant C (full list for drawer content - indices stay the same)
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

  // Mobile menu items for hamburger
  const mobileMenuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: `${baseUrl}icons/MenuHome.svg`,
      subItems: []
    },
    {
      id: 'trees',
      label: 'Trees',
      icon: `${baseUrl}icons/TreePedigree.svg`,
      subItems: [
        { label: 'Family Tree' },
        { label: 'Living People (private)' },
        { label: 'Manage Trees' }
      ]
    },
    {
      id: 'memories',
      label: 'Memories',
      icon: `${baseUrl}icons/MediaCamera.svg`,
      subItems: [
        { label: 'Gallery' },
        { label: 'Family Feed' },
        { label: 'Together App' }
      ]
    }
  ];

  // Mobile tools for tools hub
  const mobileTools = [
    {
      id: 'env-switcher',
      label: 'Environment Switcher',
      icon: currentEnv.icon || `${baseUrl}icons/LogoFamilySearch.svg`,
      description: 'Switch between trees'
    },
    {
      id: 'recent-people',
      label: 'Recent People Viewed',
      icon: `${baseUrl}icons/Person.svg`,
      description: 'See people you recently viewed'
    },
    {
      id: 'followed',
      label: 'Followed People',
      icon: `${baseUrl}icons/SocialStar.svg`,
      description: 'People you are following'
    },
    {
      id: 'todo',
      label: 'To-do List',
      icon: `${baseUrl}icons/ControlList.svg`,
      description: 'Your tasks and reminders'
    },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      icon: `${baseUrl}icons/HelpAI.svg`,
      description: 'Get help with research'
    }
  ];

  // Handle tool selection in mobile
  const handleToolSelect = (toolId) => {
    if (toolId === 'ai-assistant') {
      mobile.openAIFull();
    } else {
      mobile.openToolChild(toolId);
    }
  };

  // Render tool content in mobile
  const renderMobileToolContent = () => {
    if (!mobile.selectedTool) return null;

    switch (mobile.selectedTool) {
      case 'env-switcher':
        return (
          <RightDrawerContent
            activeDrawer={0}
            drawerItems={drawerItems}
            showEnvironmentSwitcher={true}
            onEnvironmentChange={handleEnvironmentChange}
          />
        );
      case 'recent-people':
        return (
          <RightDrawerContent
            activeDrawer={4}
            drawerItems={drawerItems}
            showEnvironmentSwitcher={true}
          />
        );
      case 'followed':
        return <div className="text-gray-700">Followed people content coming soon...</div>;
      case 'todo':
        return <div className="text-gray-700">To-do list content coming soon...</div>;
      default:
        return null;
    }
  };

  // Render page content (same as VariantA - keeping full implementation)
  const renderPageContent = () => {
    if (currentPage === 'Home') {
      return <HomePage />;
    } else if (currentPage === 'Family Tree') {
      return <FamilyTreePage onPersonClick={handlePersonClick} mobileMode={isMobile} />;
    } else if (currentPage === 'Living People (private)') {
      return (
        <div className="flex flex-col items-start justify-start h-full px-8 py-8 max-w-5xl mx-auto">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Living Family Members
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            These are living people you've added to your family. They remain private to you and won't appear in the shared FamilySearch Family Tree until they're marked as deceased.
          </p>
          <div className="text-gray-500 text-sm">
            [List of people appears here]
          </div>
        </div>
      );
    } else if (currentPage === 'Gallery') {
      return (
        <GalleryPage
          onOrganizeGalleryClick={handleOrganizeGalleryClick}
          organizeGalleryOpen={organizeGalleryOpen}
          mobileMode={isMobile}
          onGalleryToolsClick={handleGalleryToolsClick}
          onGallerySearchClick={handleGallerySearchClick}
          onAddMemoriesClick={handleAddMemoriesClick}
        />
      );
    } else if (currentPage === 'My Reservations') {
      return <MyReservationsPage onFilterClick={handleFilterReservationsClick} />;
    } else if (currentPage === 'Family Feed') {
      return (
        <div className="flex gap-16 h-full px-12 py-8 max-w-7xl mx-auto">
          <div className="flex-[2]">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-semibold text-gray-700">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <textarea
                placeholder="What will you share?"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="1"
              />
              <button className="w-12 h-12 bg-teal-600 hover:bg-teal-700 rounded-lg flex items-center justify-center text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Start writing your first post!
              </h2>
              <p className="text-gray-600">
                Here are some ideas to get you started. Happy posting!
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                "What memories do you have of your hometown?",
                "Where did you go on your most recent vacation?",
                "Did your kids do anything crazy, or sweet, this week?",
                "How did you meet your spouse?",
                "What memories do you have of your oldest relatives?",
                "Have your own idea? Click to get started."
              ].map((prompt, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-300 p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <p className="text-gray-900">{prompt}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-8">
            <div>
              <button className="w-full flex items-center justify-between py-2 hover:bg-gray-50 transition-colors rounded">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Friends</h3>
                </div>
              </button>
              <div className="py-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Invite family and friends</h4>
                <p className="text-sm text-gray-600 mb-4">Start sharing your posts.</p>
                <button className="w-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold py-2.5 px-4 rounded transition-colors">
                  SHARE LINK
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-3xl font-semibold text-gray-700">
            This is the {currentPage} page
          </h1>
        </div>
      );
    }
  };

  // MOBILE LAYOUT (unchanged from VariantA - uses hamburger menu)
  if (isMobile) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
        <Header hideMainHeader={true} />
        <FloatingTestPanel variant="Variant C (Mobile)" />
        <Toast message={toastMessage} isVisible={showToast} onClose={handleToastClose} />

        {mobile.isActive(mobile.SURFACES.AI_FULL) ? (
          <MobileAIFull
            aiSession={mobile.aiSession}
            onMinimize={mobile.minimizeAI}
            onClose={mobile.closeAI}
            onReset={mobile.resetAIChat}
          />
        ) : (
          <>
            <MobileTopBar
              onOpenHamburger={mobile.openHamburger}
              onOpenNotifications={mobile.openNotifications}
              onOpenMessages={mobile.openMessages}
              onOpenTools={mobile.openTools}
              notificationCount={3}
              messageCount={5}
            />

            <main className="flex-1 overflow-y-auto bg-gray-200">
              {renderPageContent()}
            </main>

            {mobile.isActive(mobile.SURFACES.HAMBURGER) && (
              <LeftNavigation
                isCollapsed={false}
                onToggleSidebar={() => {}}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                showHeader={false}
                mobileMode={true}
                onMobileClose={mobile.closeHamburger}
              />
            )}

            {mobile.isActive(mobile.SURFACES.BOTTOM_SHEET_NOTIFICATIONS) && (
              <BottomSheet isOpen={true} onClose={mobile.closeBottomSheet} title="Notifications">
                <div className="text-gray-700">
                  <p>You have no new notifications.</p>
                </div>
              </BottomSheet>
            )}

            {mobile.isActive(mobile.SURFACES.BOTTOM_SHEET_MESSAGES) && (
              <BottomSheet isOpen={true} onClose={mobile.closeBottomSheet} title="Messages">
                <Messages />
              </BottomSheet>
            )}

            {mobile.isActive(mobile.SURFACES.BOTTOM_SHEET_TOOLS) && (
              <BottomSheet isOpen={true} onClose={mobile.closeBottomSheet} title="Tools">
                <ToolsHub onSelectTool={handleToolSelect} tools={mobileTools} />
              </BottomSheet>
            )}

            {mobile.isActive(mobile.SURFACES.BOTTOM_SHEET_TOOL_CHILD) && (
              <BottomSheet
                isOpen={true}
                onClose={mobile.closeBottomSheet}
                title={mobileTools.find(t => t.id === mobile.selectedTool)?.label || 'Tool'}
                showBack={true}
                onBack={mobile.backToToolsHub}
              >
                {renderMobileToolContent()}
              </BottomSheet>
            )}

            {mobile.isActive(mobile.SURFACES.BOTTOM_SHEET_PERSON) && selectedPerson && (
              <BottomSheet
                isOpen={true}
                onClose={() => {
                  setSelectedPerson(null);
                  mobile.closeBottomSheet();
                }}
                customHeader={
                  <>
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                      {selectedPerson.photo ? (
                        <img src={selectedPerson.photo} alt={selectedPerson.name} className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-full h-full text-gray-400 p-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-semibold text-lg text-gray-900 truncate">{selectedPerson.name}</h2>
                      <p className="text-sm text-gray-600">{selectedPerson.id}</p>
                    </div>
                  </>
                }
              >
                <PersonDetailDrawer
                  person={selectedPerson}
                  isOpen={true}
                  onClose={() => {
                    setSelectedPerson(null);
                    mobile.closeBottomSheet();
                  }}
                  isSplit={false}
                  hideHeader={true}
                />
              </BottomSheet>
            )}

            {mobile.isActive(mobile.SURFACES.BOTTOM_SHEET_ORGANIZE_GALLERY) && organizeGalleryOpen && (
              <BottomSheet
                isOpen={true}
                onClose={() => {
                  setOrganizeGalleryOpen(false);
                  mobile.closeBottomSheet();
                }}
                title="Organize Gallery"
                showBack={true}
                onBack={() => {
                  mobile.openGalleryTools();
                }}
              >
                <OrganizeGalleryDrawer
                  isOpen={true}
                  onClose={() => {
                    setOrganizeGalleryOpen(false);
                    mobile.closeBottomSheet();
                  }}
                  hideHeader={true}
                />
              </BottomSheet>
            )}

            {mobile.isActive(mobile.SURFACES.BOTTOM_SHEET_GALLERY_TOOLS) && (
              <BottomSheet isOpen={true} onClose={mobile.closeBottomSheet} title="Gallery tools">
                <GalleryToolsContent
                  onOrganizeGalleryClick={() => {
                    mobile.closeBottomSheet();
                    handleOrganizeGalleryClick();
                  }}
                />
              </BottomSheet>
            )}

            {mobile.isActive(mobile.SURFACES.BOTTOM_SHEET_GALLERY_SEARCH) && (
              <BottomSheet isOpen={true} onClose={mobile.closeBottomSheet} title="Search memories">
                <GallerySearchContent />
              </BottomSheet>
            )}

            {mobile.aiSession && !mobile.isActive(mobile.SURFACES.AI_FULL) && (
              <button
                onClick={mobile.openAIFull}
                className="fixed bottom-4 right-4 bg-[#3a3a3a] text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 z-30"
              >
                <img
                  src={`${baseUrl}icons/HelpAI.svg`}
                  alt="AI"
                  className="w-5 h-5 brightness-0 invert"
                />
                <span className="text-sm font-medium">AI Assistant</span>
              </button>
            )}
          </>
        )}
      </div>
    );
  }

  // DESKTOP LAYOUT - Using MegaMenuNavigation instead of NavigationA
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Toast message={toastMessage} isVisible={showToast} onClose={handleToastClose} />
      <Header hideMainHeader={true} />
      <FloatingTestPanel variant="Variant C" />

      {/* Mega Menu Navigation */}
      <MegaMenuNavigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onDrawerToggle={handleDrawerToggle}
        onOpenChat={handleOpenNewChat}
      />

      <div className="flex flex-1 min-h-0">
        <main className="flex-1 overflow-y-auto relative bg-gray-200">
          {renderPageContent()}
        </main>

        {/* Right side container with split view support (unchanged from VariantA) */}
        <div className="flex h-full">
          {((chat && !chat.isMinimized) || activeDrawer !== null || selectedPerson || organizeGalleryOpen || filterReservationsOpen) && (
            <div className="flex flex-col w-80 border-l-2 border-gray-200">
              {(activeDrawer !== null || selectedPerson || organizeGalleryOpen || filterReservationsOpen) && (
                <div
                  className={`${
                    chat && !chat.isMinimized ? 'h-1/2' : 'h-full'
                  } overflow-y-auto bg-white`}
                >
                  {selectedPerson ? (
                    <PersonDetailDrawer
                      person={selectedPerson}
                      isOpen={true}
                      onClose={handleClosePersonDrawer}
                      isSplit={chat && !chat.isMinimized}
                    />
                  ) : organizeGalleryOpen ? (
                    <OrganizeGalleryDrawer
                      isOpen={true}
                      onClose={handleCloseOrganizeGallery}
                    />
                  ) : filterReservationsOpen ? (
                    <FilterReservationsDrawer
                      isOpen={true}
                      onClose={handleCloseFilterReservations}
                    />
                  ) : activeDrawer !== null ? (
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {drawerItems[activeDrawer].label}
                        </h2>
                        <button
                          onClick={() => handleDrawerToggle(activeDrawer)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <img
                            src={`${baseUrl}icons/MenuClose.svg`}
                            alt="Close"
                            className="w-5 h-5"
                          />
                        </button>
                      </div>
                      <RightDrawerContent
                        activeDrawer={activeDrawer}
                        drawerItems={drawerItems}
                        showEnvironmentSwitcher={true}
                        onEnvironmentChange={handleEnvironmentChange}
                      />
                    </div>
                  ) : null}
                </div>
              )}

              {chat && !chat.isMinimized && (
                <div
                  className={`${
                    activeDrawer !== null || selectedPerson || organizeGalleryOpen || filterReservationsOpen
                      ? 'h-1/2'
                      : 'h-full'
                  } overflow-hidden`}
                >
                  <AIChatOverlay
                    key={chat.id}
                    chat={chat}
                    onClose={handleCloseChat}
                    onMinimize={handleMinimizeChat}
                    onMaximize={handleMaximizeChat}
                    onReset={handleResetChat}
                    isMinimized={false}
                    isSplit={activeDrawer !== null || !!selectedPerson || organizeGalleryOpen || filterReservationsOpen}
                    index={0}
                    drawerOpen={false}
                  />
                </div>
              )}
            </div>
          )}

          {rightToolbarVisible && (
            <RightDrawerC
              activeDrawer={activeDrawer}
              onDrawerToggle={handleDrawerToggle}
              iconBarOnly={true}
              aiChatOpen={chat && !chat.isMinimized}
              onHideToolbar={() => setRightToolbarVisible(false)}
              selectedEnvironment={selectedEnvironment}
              onEnvironmentChange={handleEnvironmentChange}
            />
          )}
        </div>

        {!rightToolbarVisible && (
          <button
            onClick={() => setRightToolbarVisible(true)}
            className="fixed right-4 bottom-4 z-20 bg-white hover:bg-gray-50 border-2 border-gray-300 p-3 rounded-lg shadow-lg transition-all"
            title="Show toolbar"
            aria-label="Show toolbar"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {(chat && chat.isMinimized) && (
          <div className="fixed bottom-0 right-16 w-80 h-12 bg-[#3a3a3a] rounded-t-lg flex items-center justify-between px-4 z-40">
            <div className="flex items-center gap-2">
              <img src={`${baseUrl}icons/HelpAI.svg`} alt="AI" className="w-5 h-5" />
              <span className="text-sm font-medium text-white">AI Assistant</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={chat ? handleMaximizeChat : handleOpenNewChat}
                className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 rounded text-white"
              >
                {activeDrawer !== null || selectedPerson || organizeGalleryOpen ? 'Open Split' : 'Open Full'}
              </button>
              {chat && (
                <button onClick={handleCloseChat} className="p-1 hover:bg-gray-600 rounded">
                  <img src={`${baseUrl}icons/MenuClose.svg`} alt="Close" className="w-4 h-4 invert" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
