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

export default function VariantB() {
  const [searchParams] = useSearchParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [organizeGalleryOpen, setOrganizeGalleryOpen] = useState(false);
  const [filterReservationsOpen, setFilterReservationsOpen] = useState(false);
  const [chat, setChat] = useState(null);

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

    // Close context drawers when changing pages (global tool drawers stay open)
    setSelectedPerson(null);
    setOrganizeGalleryOpen(false);
    setFilterReservationsOpen(false);
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
          {currentPage === 'Home' ? (
            <HomePage />
          ) : currentPage === 'Family Tree' ? (
            <FamilyTreePage onPersonClick={handlePersonClick} />
          ) : currentPage === 'Gallery' ? (
            <GalleryPage onOrganizeGalleryClick={handleOrganizeGalleryClick} organizeGalleryOpen={organizeGalleryOpen} />
          ) : currentPage === 'My Reservations' ? (
            <MyReservationsPage onFilterClick={handleFilterReservationsClick} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-3xl font-semibold text-gray-700">
                This is the {currentPage} page
              </h1>
            </div>
          )}
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
