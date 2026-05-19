import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUser } from './contexts/UserContext';
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
import GalleryToolsContent from './components/mobile/GalleryToolsContent';
import GallerySearchContent from './components/mobile/GallerySearchContent';

export default function VariantB() {
  const [searchParams] = useSearchParams();
  const { user } = useUser();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [organizeGalleryOpen, setOrganizeGalleryOpen] = useState(false);
  const [filterReservationsOpen, setFilterReservationsOpen] = useState(false);
  const [chat, setChat] = useState(null);
  const [rightToolbarVisible, setRightToolbarVisible] = useState(true); // Desktop right toolbar visibility

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
        { label: 'Living People (private)' },
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
    } else if (currentPage === 'Historical Records') {
      return (
        <div className="flex flex-col md:flex-row gap-20 h-full px-8 py-8 max-w-6xl mx-auto">
          {/* Left side - Text content */}
          <div className="flex-1 max-w-lg">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
              Search Historical Records
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Records create a paper trail for your ancestors and can lead you to important details about their life. Enter a name, and we'll look for it in birth certificates, marriage registrations, census records, and other official documents.
            </p>
          </div>

          {/* Right side - Search form */}
          <div className="flex-1 max-w-sm">
            <form className="space-y-3">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Names
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Names
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="text-xs text-gray-500">Required</p>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Possible Location
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="City, County, State, Country"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Birth Year
                </label>
                <div className="relative">
                  <input
                    id="birthYear"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded transition-colors"
              >
                SEARCH
              </button>
            </form>
          </div>
        </div>
      );
    } else if (currentPage === 'People in Family Tree') {
      return (
        <div className="flex flex-col items-center justify-center h-full px-8 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Search people in Family tree
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Search the largest shared family tree in the world. Discover ancestors, and see where you connect.
          </p>
        </div>
      );
    } else if (currentPage === 'Unindexed Records') {
      return (
        <div className="flex flex-col items-center justify-center h-full px-8 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Search unindexed records
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Search almost 2 billion historical records that haven't been organized and or cataloged yet. We use AI to read and interpret text directly from document images helping you uncover names, dates, and details that standard searches can't find.
          </p>
        </div>
      );
    } else if (currentPage === 'Historical Images') {
      return (
        <div className="flex flex-col items-center justify-center h-full px-8 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Explore Historical Images
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Browse images of records that haven't been made searchable through indexing (transcription) yet. Indexed (or transcribed) data is used to search for specific information in historical records.
          </p>
        </div>
      );
    } else if (currentPage === 'Catalog') {
      return (
        <div className="flex flex-col items-center justify-center h-full px-8 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Search FamilySearch's Catalog
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Find books, records, images, and other important resources offered through the FamilySearch website, the FamilySearch Library, and select FamilySearch Centers around the world.
          </p>
        </div>
      );
    } else if (currentPage === 'Books') {
      return (
        <div className="flex flex-col items-center justify-center h-full px-8 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Search FamilySearch's books
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Search over 500,000 genealogy books, family histories, maps, yearbooks, and more that FamilySearch aquired over the years.
          </p>
        </div>
      );
    } else if (currentPage === 'Newspapers') {
      return (
        <div className="flex flex-col items-center justify-center h-full px-8 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Search historical newspaper archives for your ancestors
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Embark on a journey through time. Historical newspapers offer insights, context, and a wealth of details to fuel your family history search.
          </p>
        </div>
      );
    } else if (currentPage === 'Family Feed') {
      return (
        <div className="flex gap-16 h-full px-12 py-8 max-w-7xl mx-auto">
          {/* Left Column - Main Content */}
          <div className="flex-[2]">
            {/* Post Input Box */}
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

            {/* Empty State Content */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Start writing your first post!
              </h2>
              <p className="text-gray-600">
                Here are some ideas to get you started. Happy posting!
              </p>
            </div>

            {/* Prompt Cards Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border border-gray-300 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-900">
                  What memories do you have of your hometown?
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-300 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-900">
                  Where did you go on your most recent vacation?
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-300 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-900">
                  Did your kids do anything crazy, or sweet, this week?
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-300 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-900">
                  How did you meet your spouse?
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-300 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-900">
                  What memories do you have of your oldest relatives?
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-300 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-900">
                  Have your own idea? Click to get started.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="flex-1 space-y-8">
            {/* Friends Section */}
            <div>
              <button className="w-full flex items-center justify-between py-2 hover:bg-gray-50 transition-colors rounded">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Friends</h3>
                </div>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="py-6 text-center">
                <div className="mb-4">
                  <svg className="w-32 h-32 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Invite family and friends
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Start sharing your posts.
                </p>
                <button className="w-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold py-2.5 px-4 rounded transition-colors">
                  SHARE LINK
                </button>
              </div>
            </div>

            {/* Family Groups Section */}
            <div>
              <button className="w-full flex items-center justify-between py-2 hover:bg-gray-50 transition-colors rounded">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Family Groups</h3>
                </div>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="py-6 text-center">
                <div className="mb-4">
                  <svg className="w-32 h-32 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Create a Group
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Collaborate with family and friends.
                </p>
                <button className="w-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold py-2.5 px-4 rounded transition-colors">
                  CREATE GROUP
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

  // DESKTOP LAYOUT
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <Header hideMainHeader={true} />
      <FloatingTestPanel variant="Variant B" />
      <TopNavigationB
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenChat={handleOpenNewChat}
        isCollapsed={sidebarCollapsed}
        onDrawerToggle={handleDrawerToggle}
        rightToolbarVisible={rightToolbarVisible}
        onToggleRightToolbar={() => setRightToolbarVisible(!rightToolbarVisible)}
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

        {rightToolbarVisible && (
          <RightDrawerB activeDrawer={activeDrawer} onDrawerToggle={handleDrawerToggle} iconBarOnly={true} />
        )}

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
