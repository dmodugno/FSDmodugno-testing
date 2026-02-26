import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import NavigationA from './components/NavigationA';
import HomePage from './components/Home';
import FamilyTreePage from './components/FamilyTree/FamilyTreePage';
import GalleryPage from './components/GalleryPage';
import MyReservationsPage from './components/MyReservationsPage';
import { PersonDetailDrawer } from './components/FamilyTree';
import OrganizeGalleryDrawer from './components/OrganizeGalleryDrawer';
import FilterReservationsDrawer from './components/FilterReservationsDrawer';
import RightDrawer from './components/RightDrawer';
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

export default function VariantA() {
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [organizeGalleryOpen, setOrganizeGalleryOpen] = useState(false);
  const [filterReservationsOpen, setFilterReservationsOpen] = useState(false);
  const [chat, setChat] = useState(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState('familysearch-tree');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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
    const hash = window.location.hash.slice(1); // Remove the #
    if (hash) {
      setCurrentPage(hash);
    }
  }, []);

  // Update URL hash when page changes
  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
    window.location.hash = pageName;

    if (isMobile) {
      // Mobile: Use state machine's navigation (preserves AI session)
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
        // Create new chat if none exists
        const newChat = {
          id: 1,
          title: 'AI Chatbot',
          messages: [],
          isMinimized: false
        };
        setChat(newChat);
      } else if (chat.isMinimized) {
        // Maximize existing chat if minimized
        setChat({ ...chat, isMinimized: false });
      } else {
        // If chat exists and is open, close it
        setChat(null);
      }
      return;
    }

    // Normal drawer toggle for other drawers
    setActiveDrawer(activeDrawer === index ? null : index);
    // Close person detail drawer, organize gallery, and filter reservations when opening right drawer
    if (activeDrawer !== index) {
      setSelectedPerson(null);
      setOrganizeGalleryOpen(false);
      setFilterReservationsOpen(false);
    }
  };

  // Chat management functions
  const handleOpenNewChat = () => {
    if (!chat) {
      // Create new chat if none exists
      const newChat = {
        id: 1,
        title: 'AI Chatbot',
        messages: [],
        isMinimized: false
      };
      setChat(newChat);
    } else if (chat.isMinimized) {
      // Maximize existing chat if minimized
      setChat({ ...chat, isMinimized: false });
    }
    // If chat exists and is open, do nothing
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
      setActiveDrawer(null); // Close right drawer when person detail opens
      setOrganizeGalleryOpen(false); // Close organize gallery when person detail opens
      setFilterReservationsOpen(false); // Close filter reservations when person detail opens
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
      // Close right drawer, person detail, and filter reservations when organize gallery opens
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
    // UI-only placeholder
    console.log('Add Memories clicked');
  };

  // Filter Reservations drawer management
  const handleFilterReservationsClick = () => {
    setFilterReservationsOpen(!filterReservationsOpen);
    // Close right drawer, person detail, and organize gallery when filter reservations opens
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
    setActiveDrawer(null); // Close the drawer

    // Show toast notification
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

  // Drawer items for Variant A (10 drawers including environment switcher and AI Assistant)
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
      id: 'search',
      label: 'Search records',
      icon: `${baseUrl}icons/DocumentRecordSearch.svg`,
      subItems: [
        { label: 'Historical Records' },
        { label: 'People in Family Tree' },
        { label: 'Catalog' }
      ]
    },
    {
      id: 'build-tree',
      label: 'Build my family tree',
      icon: `${baseUrl}icons/TreePedigree.svg`,
      subItems: [
        { label: 'Family Tree' },
        { label: 'Person List' },
        { label: 'Manage Trees' }
      ]
    },
    {
      id: 'memories',
      label: 'Preserve memories',
      icon: `${baseUrl}icons/MediaCamera.svg`,
      subItems: [
        { label: 'Gallery' },
        { label: 'Family Feed' }
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

  // Render page content
  const renderPageContent = () => {
    if (currentPage === 'Home') {
      return <HomePage />;
    } else if (currentPage === 'Family Tree') {
      return <FamilyTreePage onPersonClick={handlePersonClick} mobileMode={isMobile} />;
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

  // MOBILE LAYOUT
  if (isMobile) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
        <Header hideMainHeader={true} />
        <FloatingTestPanel variant="Variant A (Mobile)" />
        <Toast message={toastMessage} isVisible={showToast} onClose={handleToastClose} />

        {/* INVARIANT CHECK: AI_FULL replaces all chrome */}
        {mobile.isActive(mobile.SURFACES.AI_FULL) ? (
          <MobileAIFull
            aiSession={mobile.aiSession}
            onMinimize={mobile.minimizeAI}
            onClose={mobile.closeAI}
            onReset={mobile.resetAIChat}
          />
        ) : (
          <>
            {/* Top Bar */}
            <MobileTopBar
              onOpenHamburger={mobile.openHamburger}
              onOpenNotifications={mobile.openNotifications}
              onOpenMessages={mobile.openMessages}
              onOpenTools={mobile.openTools}
              notificationCount={3}
              messageCount={5}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-200">
              {renderPageContent()}
            </main>

            {/* INVARIANT CHECK: Only one surface at a time */}

            {/* Hamburger Overlay - Full Navigation */}
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

            {/* Notifications Bottom Sheet */}
            {mobile.isActive(mobile.SURFACES.BOTTOM_SHEET_NOTIFICATIONS) && (
              <BottomSheet
                isOpen={true}
                onClose={mobile.closeBottomSheet}
                title="Notifications"
              >
                <div className="text-gray-700">
                  <p>You have no new notifications.</p>
                  <p className="mt-2 text-sm text-gray-500">We'll notify you when there's something new.</p>
                </div>
              </BottomSheet>
            )}

            {/* Messages Bottom Sheet */}
            {mobile.isActive(mobile.SURFACES.BOTTOM_SHEET_MESSAGES) && (
              <BottomSheet
                isOpen={true}
                onClose={mobile.closeBottomSheet}
                title="Messages"
              >
                <Messages />
              </BottomSheet>
            )}

            {/* Tools Hub Bottom Sheet */}
            {mobile.isActive(mobile.SURFACES.BOTTOM_SHEET_TOOLS) && (
              <BottomSheet
                isOpen={true}
                onClose={mobile.closeBottomSheet}
                title="Tools"
              >
                <ToolsHub
                  onSelectTool={handleToolSelect}
                  tools={mobileTools}
                />
              </BottomSheet>
            )}

            {/* Tool Child Bottom Sheet */}
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

            {/* Person Detail Bottom Sheet */}
            {mobile.isActive(mobile.SURFACES.BOTTOM_SHEET_PERSON) && selectedPerson && (
              <BottomSheet
                isOpen={true}
                onClose={() => {
                  setSelectedPerson(null);
                  mobile.closeBottomSheet();
                }}
                customHeader={
                  <>
                    {/* Profile Photo */}
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                      {selectedPerson.photo ? (
                        <img src={selectedPerson.photo} alt={selectedPerson.name} className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-full h-full text-gray-400 p-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    {/* Person Info */}
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

            {/* Organize Gallery Bottom Sheet */}
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

            {/* Gallery Tools Bottom Sheet */}
            {mobile.isActive(mobile.SURFACES.BOTTOM_SHEET_GALLERY_TOOLS) && (
              <BottomSheet
                isOpen={true}
                onClose={mobile.closeBottomSheet}
                title="Gallery tools"
              >
                <GalleryToolsContent
                  onOrganizeGalleryClick={() => {
                    mobile.closeBottomSheet();
                    handleOrganizeGalleryClick();
                  }}
                />
              </BottomSheet>
            )}

            {/* Gallery Search Bottom Sheet */}
            {mobile.isActive(mobile.SURFACES.BOTTOM_SHEET_GALLERY_SEARCH) && (
              <BottomSheet
                isOpen={true}
                onClose={mobile.closeBottomSheet}
                title="Search memories"
              >
                <GallerySearchContent />
              </BottomSheet>
            )}

            {/* Minimized AI Indicator */}
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

  // DESKTOP LAYOUT (unchanged)
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Toast message={toastMessage} isVisible={showToast} onClose={handleToastClose} />
      <Header hideMainHeader={true} />
      <FloatingTestPanel variant="Variant A" />
      <div className="flex flex-1 min-h-0">
        <NavigationA
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <main className="flex-1 overflow-y-auto relative bg-gray-200">
          {renderPageContent()}
        </main>

        {/* Right side container with split view support */}
        <div className="flex h-full">
          {/* Content column (320px) - only when AI is open OR drawer is open */}
          {((chat && !chat.isMinimized) || activeDrawer !== null || selectedPerson || organizeGalleryOpen || filterReservationsOpen) && (
            <div className="flex flex-col w-80 border-l-2 border-gray-200">
              {/* Top section - Drawer area */}
              {(activeDrawer !== null || selectedPerson || organizeGalleryOpen || filterReservationsOpen) && (
                <div
                  className={`${
                    chat && !chat.isMinimized
                      ? 'h-1/2'
                      : 'h-full'
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

              {/* Bottom section - AI Chat area */}
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

          {/* Icon bar (64px) */}
          <RightDrawer activeDrawer={activeDrawer} onDrawerToggle={handleDrawerToggle} iconBarOnly={true} aiChatOpen={chat && !chat.isMinimized} />
        </div>

        {/* Collapsed/Minimized AI bar (fixed overlay) - matching AI chat header */}
        {(chat && chat.isMinimized) && (
          <div className="fixed bottom-0 right-16 w-80 h-12 bg-[#3a3a3a] rounded-t-lg flex items-center justify-between px-4 z-40">
            <div className="flex items-center gap-2">
              <img
                src={`${baseUrl}icons/HelpAI.svg`}
                alt="AI"
                className="w-5 h-5"
              />
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
                <button
                  onClick={handleCloseChat}
                  className="p-1 hover:bg-gray-600 rounded"
                >
                  <img
                    src={`${baseUrl}icons/MenuClose.svg`}
                    alt="Close"
                    className="w-4 h-4 invert"
                  />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
