import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import TopNavigationB from './components/TopNavigationB';
import LeftSidebarB from './components/LeftSidebarB';
import RightDrawerB from './components/RightDrawerB';
import HomePage from './components/Home';
import FamilyTreePage from './components/FamilyTree/FamilyTreePage';
import GalleryPage from './components/GalleryPage';
import MyReservationsPage from './components/MyReservationsPage';
import { PersonDetailDrawer } from './components/FamilyTree';
import OrganizeGalleryDrawer from './components/OrganizeGalleryDrawer';
import FilterReservationsDrawer from './components/FilterReservationsDrawer';
import AIChatOverlay from './components/AIChatOverlay';
import FloatingTestPanel from './components/FloatingTestPanel';
import RightDrawerContent from './components/RightDrawerContent';
import Messages from './components/Messages';
import { useMobileNavigation } from './hooks/useMobileNavigation';
import LeftNavigation from './components/LeftNavigation';
import {
  BottomSheet,
  ToolsHub,
  MobileAIFull,
  MobileTopBar
} from './components/mobile';

export default function VariantB() {
  const [searchParams] = useSearchParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [organizeGalleryOpen, setOrganizeGalleryOpen] = useState(false);
  const [filterReservationsOpen, setFilterReservationsOpen] = useState(false);
  const [chat, setChat] = useState(null);

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
    } else {
      // If chat exists and is open, close it (toggle behavior)
      setChat(null);
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
    setActiveDrawer(null); // Close right drawer when person detail opens
    setOrganizeGalleryOpen(false); // Close organize gallery when person detail opens
    setFilterReservationsOpen(false); // Close filter reservations when person detail opens
  };

  const handleClosePersonDrawer = () => {
    setSelectedPerson(null);
  };

  // Organize Gallery drawer management
  const handleOrganizeGalleryClick = () => {
    setOrganizeGalleryOpen(!organizeGalleryOpen);
    // Close right drawer, person detail, and filter reservations when organize gallery opens
    if (!organizeGalleryOpen) {
      setActiveDrawer(null);
      setSelectedPerson(null);
      setFilterReservationsOpen(false);
    }
  };

  const handleCloseOrganizeGallery = () => {
    setOrganizeGalleryOpen(false);
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

  const handleToastClose = () => {
    // Placeholder for toast functionality
  };

  const baseUrl = import.meta.env.BASE_URL;

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
      case 'recent-people':
        return <RightDrawerContent activeDrawer={3} drawerItems={[]} showEnvironmentSwitcher={false} />;
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
      return <FamilyTreePage onPersonClick={handlePersonClick} />;
    } else if (currentPage === 'Gallery') {
      return <GalleryPage onOrganizeGalleryClick={handleOrganizeGalleryClick} organizeGalleryOpen={organizeGalleryOpen} />;
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
        <FloatingTestPanel variant="Variant B (Mobile)" />

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
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <Header hideMainHeader={true} />
      <FloatingTestPanel variant="Variant B" />
      <TopNavigationB
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenChat={handleOpenNewChat}
        isCollapsed={sidebarCollapsed}
        onDrawerToggle={handleDrawerToggle}
      />
      <div className="flex flex-1 min-h-0">
        <LeftSidebarB
          isCollapsed={sidebarCollapsed}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto relative rounded-t-xl bg-gray-200">
          {renderPageContent()}
        </main>

        {/* Right side container with split view support */}
        {((chat && !chat.isMinimized) || activeDrawer !== null || selectedPerson || organizeGalleryOpen || filterReservationsOpen) && (
          <div className="w-80 flex-shrink-0 flex flex-col">
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
                  <RightDrawerB activeDrawer={activeDrawer} onDrawerToggle={handleDrawerToggle} inSplitView={true} />
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

        <RightDrawerB activeDrawer={activeDrawer} onDrawerToggle={handleDrawerToggle} iconBarOnly={true} />

        {/* Collapsed/Minimized AI bar (fixed overlay) - matching AI chat header */}
        {(chat && chat.isMinimized) && (
          <div className="fixed bottom-0 right-16 w-80 h-12 bg-white border border-gray-300 rounded-t-lg flex items-center justify-between px-4 z-40 shadow-lg">
            <div className="flex items-center gap-2">
              <img
                src={`${baseUrl}icons/HelpAI.svg`}
                alt="AI"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-900">AI Assistant</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={chat ? handleMaximizeChat : handleOpenNewChat}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
              >
                {activeDrawer !== null || selectedPerson || organizeGalleryOpen || filterReservationsOpen ? 'Open Split' : 'Open Full'}
              </button>
              {chat && (
                <button
                  onClick={handleCloseChat}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <img
                    src={`${baseUrl}icons/MenuClose.svg`}
                    alt="Close"
                    className="w-4 h-4"
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
