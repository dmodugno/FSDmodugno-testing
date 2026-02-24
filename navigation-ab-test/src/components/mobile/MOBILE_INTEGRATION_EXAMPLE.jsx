/**
 * MOBILE NAVIGATION INTEGRATION EXAMPLE
 *
 * This file demonstrates the CANONICAL way to integrate the mobile state machine
 * into VariantA or VariantB following strict architectural rules.
 *
 * DO NOT DEVIATE FROM THIS PATTERN.
 *
 * Key Rules:
 * 1. Use single discriminated state (mobileSurface) - NO multiple booleans
 * 2. Only ONE surface active at a time
 * 3. Centralize mobile logic at layout level (NOT scattered conditionals)
 * 4. Enforce all invariants via the useMobileNavigation hook
 *
 * See ARCHITECTURE.md → Mobile Navigation & AI State Machine
 * See IMPLEMENTATION.md → Mobile State Machine Implementation Contract
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMobileNavigation } from '../../hooks/useMobileNavigation';
import {
  HamburgerOverlay,
  BottomSheet,
  ToolsHub,
  MobileAIFull,
  MobileTopBar
} from './index';
import Messages from '../Messages';
import RightDrawerContent from '../RightDrawerContent';

export default function MobileIntegrationExample() {
  // ==========================================================================
  // STEP 1: Initialize Mobile State Machine
  // ==========================================================================
  const {
    mobileSurface,
    aiSession,
    selectedTool,
    // Hamburger
    openHamburger,
    closeHamburger,
    // Bottom Sheets
    openNotifications,
    openMessages,
    openTools,
    openToolChild,
    closeBottomSheet,
    // AI
    openAIFull,
    minimizeAI,
    closeAI,
    resetAIChat,
    // Navigation
    navigateToPage,
    // Helpers
    isActive,
    SURFACES
  } = useMobileNavigation();

  // ==========================================================================
  // STEP 2: Desktop State (unchanged)
  // ==========================================================================
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState('Home');
  const [activeDrawer, setActiveDrawer] = useState(null);

  // ==========================================================================
  // STEP 3: Detect Screen Size
  // ==========================================================================
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind 'md' breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ==========================================================================
  // STEP 4: Page Navigation Handler
  // ==========================================================================
  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
    window.location.hash = pageName;

    if (isMobile) {
      // Mobile: Use state machine's navigation function
      // This enforces: Navigation does not mutate AI session
      navigateToPage(pageName);
    } else {
      // Desktop: existing logic
      // ... (your existing desktop logic)
    }
  };

  // ==========================================================================
  // STEP 5: Define Tools for Mobile
  // ==========================================================================
  const baseUrl = import.meta.env.BASE_URL;
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

  // ==========================================================================
  // STEP 6: Handle Tool Selection
  // ==========================================================================
  const handleToolSelect = (toolId) => {
    if (toolId === 'ai-assistant') {
      // Special handling: Open AI full screen
      openAIFull();
    } else {
      // Regular tool: Open tool child sheet
      openToolChild(toolId);
    }
  };

  // ==========================================================================
  // STEP 7: Menu Items for Hamburger
  // ==========================================================================
  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: `${baseUrl}icons/Home.svg`,
      subItems: []
    },
    {
      id: 'search',
      label: 'Search records',
      icon: `${baseUrl}icons/Search.svg`,
      subItems: [
        { label: 'Historical Records' },
        { label: 'People in Family Tree' },
        { label: 'Catalog' }
      ]
    },
    {
      id: 'tree',
      label: 'Build my family tree',
      icon: `${baseUrl}icons/TreePedigree.svg`,
      subItems: [
        { label: 'Family Tree' },
        { label: 'Person List' }
      ]
    }
  ];

  // ==========================================================================
  // STEP 8: Render Tool Child Content
  // ==========================================================================
  const renderToolContent = () => {
    if (!selectedTool) return null;

    switch (selectedTool) {
      case 'recent-people':
        return <RightDrawerContent activeDrawer={3} drawerItems={[]} showEnvironmentSwitcher={false} />;
      case 'followed':
        return <div className="p-4 text-gray-700">Followed people content...</div>;
      case 'todo':
        return <div className="p-4 text-gray-700">To-do list content...</div>;
      default:
        return null;
    }
  };

  // ==========================================================================
  // STEP 9: RENDER MOBILE LAYOUT
  // ==========================================================================
  if (isMobile) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
        {/* INVARIANT CHECK: AI_FULL replaces all chrome */}
        {isActive(SURFACES.AI_FULL) ? (
          <MobileAIFull
            aiSession={aiSession}
            onMinimize={minimizeAI}
            onClose={closeAI}
            onReset={resetAIChat}
          />
        ) : (
          <>
            {/* Top Bar - Hidden only when AI_FULL is active */}
            <MobileTopBar
              onOpenHamburger={openHamburger}
              onOpenNotifications={openNotifications}
              onOpenMessages={openMessages}
              onOpenTools={openTools}
              notificationCount={3}
              messageCount={5}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
              {currentPage === 'Home' ? (
                <div className="p-4">
                  <h1 className="text-2xl font-bold">Home Page</h1>
                </div>
              ) : (
                <div className="p-4">
                  <h1 className="text-2xl font-bold">{currentPage}</h1>
                </div>
              )}
            </main>

            {/* INVARIANT CHECK: Only one surface at a time */}

            {/* Hamburger Overlay */}
            {isActive(SURFACES.HAMBURGER) && (
              <HamburgerOverlay
                isOpen={true}
                onClose={closeHamburger}
                currentPage={currentPage}
                onNavigate={handlePageChange}
                menuItems={menuItems}
              />
            )}

            {/* Notifications Bottom Sheet */}
            {isActive(SURFACES.BOTTOM_SHEET_NOTIFICATIONS) && (
              <BottomSheet
                isOpen={true}
                onClose={closeBottomSheet}
                title="Notifications"
              >
                <div className="text-gray-700">
                  <p>You have no new notifications.</p>
                </div>
              </BottomSheet>
            )}

            {/* Messages Bottom Sheet */}
            {isActive(SURFACES.BOTTOM_SHEET_MESSAGES) && (
              <BottomSheet
                isOpen={true}
                onClose={closeBottomSheet}
                title="Messages"
              >
                <Messages />
              </BottomSheet>
            )}

            {/* Tools Hub Bottom Sheet */}
            {isActive(SURFACES.BOTTOM_SHEET_TOOLS) && (
              <BottomSheet
                isOpen={true}
                onClose={closeBottomSheet}
                title="Tools"
              >
                <ToolsHub
                  onSelectTool={handleToolSelect}
                  tools={mobileTools}
                />
              </BottomSheet>
            )}

            {/* Tool Child Bottom Sheet (replaces tools hub, not stacked) */}
            {isActive(SURFACES.BOTTOM_SHEET_TOOL_CHILD) && (
              <BottomSheet
                isOpen={true}
                onClose={closeBottomSheet}
                title={mobileTools.find(t => t.id === selectedTool)?.label || 'Tool'}
              >
                {renderToolContent()}
              </BottomSheet>
            )}

            {/* Minimized AI Indicator (if session exists but not full screen) */}
            {aiSession && !isActive(SURFACES.AI_FULL) && (
              <button
                onClick={openAIFull}
                className="fixed bottom-4 right-4 bg-[#3a3a3a] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-30"
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

  // ==========================================================================
  // STEP 10: RENDER DESKTOP LAYOUT (unchanged)
  // ==========================================================================
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Your existing desktop layout */}
      <main className="flex-1">
        <h1>Desktop Layout</h1>
      </main>
    </div>
  );
}

// ==========================================================================
// INTEGRATION CHECKLIST
// ==========================================================================
/*
Before implementing in your variant, verify:

✅ Using useMobileNavigation hook (single source of truth)
✅ NO multiple boolean states for surfaces
✅ All surface transitions go through hook functions
✅ Only ONE surface rendered at a time (use isActive checks)
✅ AI_FULL replaces entire chrome (including top bar)
✅ Hamburger immediately replaces any open sheet
✅ Bottom sheets never stack
✅ AI session persists when minimized
✅ AI session destroyed when closed
✅ Navigation does not mutate AI session
✅ Mobile logic centralized at layout level (NOT scattered)

INVARIANT VIOLATIONS TO WATCH FOR:
❌ Multiple surfaces rendered simultaneously
❌ Boolean states like isHamburgerOpen, isSheetOpen
❌ Conditional logic scattered across components
❌ AI session modified during navigation
❌ Sheets stacking on top of each other
❌ Hamburger coexisting with bottom sheets
*/
