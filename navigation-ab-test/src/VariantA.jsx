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

export default function VariantA() {
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
        title: 'AI Chat',
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
      name: 'Famiglia Modugno',
      avatar: 'F',
      type: 'family-group'
    },
    'cet-modugno': {
      id: 'cet-modugno',
      name: 'CET - Modugno',
      avatar: 'C',
      type: 'cet'
    }
  };

  const currentEnv = environments[selectedEnvironment];

  // Drawer items for Variant A (9 drawers including environment switcher)
  const drawerItems = [
    {
      icon: currentEnv.icon || null,
      avatar: currentEnv.avatar || null,
      label: 'Environment switcher',
      bgColor: 'bg-white'
    },
    { icon: `${baseUrl}icons/SocialMessage.svg`, label: 'Messages', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/Notice.svg`, label: 'Notifications', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/Person.svg`, label: 'Recent people viewed', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/SocialStar.svg`, label: 'Followed people', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/ControlList.svg`, label: 'To-do list', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/DocumentBox.svg`, label: 'Source Box', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/DiscoveryNameMeaning.svg`, label: 'Contacts', bgColor: 'bg-white' },
    { icon: `${baseUrl}icons/ControlTranslate.svg`, label: 'Language picker', bgColor: 'bg-white' }
  ];

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
        <main className="flex-1 overflow-y-auto relative">
          {currentPage === 'Home' ? (
            <HomePage />
          ) : currentPage === 'Family Tree' ? (
            <FamilyTreePage onPersonClick={handlePersonClick} />
          ) : currentPage === 'Gallery' ? (
            <GalleryPage onOrganizeGalleryClick={handleOrganizeGalleryClick} />
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
        <div className="flex h-full">
          {/* Content column (320px) - only when AI is open OR drawer is open */}
          {((chat && !chat.isMinimized) || activeDrawer !== null || selectedPerson || organizeGalleryOpen || filterReservationsOpen) && (
            <div className="flex flex-col w-80 border-l-2 border-gray-200">
              {/* Top section - Drawer area */}
              {(activeDrawer !== null || selectedPerson || organizeGalleryOpen || filterReservationsOpen) && (
                <div
                  className={`${
                    chat && !chat.isMinimized
                      ? 'h-1/2 border-b border-gray-300'
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
          <RightDrawer activeDrawer={activeDrawer} onDrawerToggle={handleDrawerToggle} iconBarOnly={true} />
        </div>

        {/* Collapsed/Minimized AI bar (fixed overlay) - matching AI chat header */}
        {(!chat || chat.isMinimized) && (
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
