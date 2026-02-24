/**
 * Mobile Navigation State Machine
 *
 * Centralized state management for mobile navigation following strict invariants:
 *
 * 1. Single discriminated state (mobileSurface) - NO multiple booleans
 * 2. Only ONE surface active at a time
 * 3. Enforces mutual exclusivity invariants
 * 4. Handles AI session persistence separately
 *
 * See ARCHITECTURE.md → Mobile Navigation & AI State Machine
 * See IMPLEMENTATION.md → Mobile State Machine Implementation Contract
 */

import { useState } from 'react';

// Canonical Mobile Surface States
export const MOBILE_SURFACES = {
  NONE: 'NONE',
  HAMBURGER: 'HAMBURGER',
  BOTTOM_SHEET_NOTIFICATIONS: 'BOTTOM_SHEET_NOTIFICATIONS',
  BOTTOM_SHEET_MESSAGES: 'BOTTOM_SHEET_MESSAGES',
  BOTTOM_SHEET_TOOLS: 'BOTTOM_SHEET_TOOLS',
  BOTTOM_SHEET_TOOL_CHILD: 'BOTTOM_SHEET_TOOL_CHILD',
  AI_FULL: 'AI_FULL'
};

export function useMobileNavigation() {
  // Single discriminated state - ONLY ONE surface active at a time
  const [mobileSurface, setMobileSurface] = useState(MOBILE_SURFACES.NONE);

  // AI session state - persistent, separate from surface state
  const [aiSession, setAiSession] = useState(null);

  // Selected tool when in BOTTOM_SHEET_TOOL_CHILD state
  const [selectedTool, setSelectedTool] = useState(null);

  /**
   * INVARIANT ENFORCEMENT FUNCTIONS
   * These functions ensure state transitions follow architectural rules
   */

  /**
   * Open Hamburger
   * Effect: Immediately dismisses any open bottom sheet or AI_FULL
   * Hamburger always replaces current surface immediately
   */
  const openHamburger = () => {
    setMobileSurface(MOBILE_SURFACES.HAMBURGER);
    // Invariant: Hamburger never coexists with bottom sheets or AI
  };

  /**
   * Close Hamburger
   * Returns to NONE state
   */
  const closeHamburger = () => {
    setMobileSurface(MOBILE_SURFACES.NONE);
  };

  /**
   * Open Bottom Sheet - Notifications
   * If another bottom sheet is open, this replaces it (no stacking)
   */
  const openNotifications = () => {
    // Invariant: Bottom sheets never stack
    // If AI is open, close it first
    if (mobileSurface === MOBILE_SURFACES.AI_FULL) {
      // AI_FULL never coexists with bottom sheets
      return;
    }
    setMobileSurface(MOBILE_SURFACES.BOTTOM_SHEET_NOTIFICATIONS);
  };

  /**
   * Open Bottom Sheet - Messages
   * If another bottom sheet is open, this replaces it (no stacking)
   */
  const openMessages = () => {
    // Invariant: Bottom sheets never stack
    if (mobileSurface === MOBILE_SURFACES.AI_FULL) {
      return;
    }
    setMobileSurface(MOBILE_SURFACES.BOTTOM_SHEET_MESSAGES);
  };

  /**
   * Open Bottom Sheet - Tools Hub
   * Shows list of available tools
   */
  const openTools = () => {
    if (mobileSurface === MOBILE_SURFACES.AI_FULL) {
      return;
    }
    setSelectedTool(null); // Reset selected tool
    setMobileSurface(MOBILE_SURFACES.BOTTOM_SHEET_TOOLS);
  };

  /**
   * Open Tool Child
   * Replaces tools hub with specific tool detail (not stacked)
   */
  const openToolChild = (toolId) => {
    setSelectedTool(toolId);
    setMobileSurface(MOBILE_SURFACES.BOTTOM_SHEET_TOOL_CHILD);
    // Invariant: Tools hub is replaced, not stacked
  };

  /**
   * Back to Tools Hub
   * Returns from tool child to tools hub
   */
  const backToToolsHub = () => {
    setSelectedTool(null);
    setMobileSurface(MOBILE_SURFACES.BOTTOM_SHEET_TOOLS);
  };

  /**
   * Close any bottom sheet
   * Returns to NONE state
   */
  const closeBottomSheet = () => {
    setMobileSurface(MOBILE_SURFACES.NONE);
    setSelectedTool(null);
  };

  /**
   * Open AI Full Screen
   * Effect: Dismisses any bottom sheet immediately, replaces entire app chrome
   */
  const openAIFull = () => {
    // Create AI session if it doesn't exist
    if (!aiSession) {
      setAiSession({
        id: 1,
        title: 'AI Assistant',
        messages: [],
        context: null
      });
    }
    setMobileSurface(MOBILE_SURFACES.AI_FULL);
    // Invariant: AI_FULL never coexists with hamburger or bottom sheets
  };

  /**
   * Minimize AI
   * Preserves session, returns to NONE
   * Session persists globally
   */
  const minimizeAI = () => {
    setMobileSurface(MOBILE_SURFACES.NONE);
    // Invariant: AI session persists when minimized
    // aiSession remains intact
  };

  /**
   * Close AI
   * Destroys session, returns to NONE
   */
  const closeAI = () => {
    setMobileSurface(MOBILE_SURFACES.NONE);
    setAiSession(null);
    // Invariant: Close destroys session
  };

  /**
   * Reset AI Chat
   * Clears messages but keeps session
   */
  const resetAIChat = () => {
    if (aiSession) {
      setAiSession({
        ...aiSession,
        messages: []
      });
    }
  };

  /**
   * Navigate to page
   * Invariant: Navigation does not mutate AI session state
   * Only closes non-persistent surfaces
   */
  const navigateToPage = (pageName) => {
    // Close hamburger if open
    if (mobileSurface === MOBILE_SURFACES.HAMBURGER) {
      setMobileSurface(MOBILE_SURFACES.NONE);
    }
    // Close bottom sheets if open
    if (mobileSurface.startsWith('BOTTOM_SHEET_')) {
      setMobileSurface(MOBILE_SURFACES.NONE);
      setSelectedTool(null);
    }
    // AI session persists - do NOT mutate it
    // Invariant: Navigation never mutates AI session state
  };

  /**
   * Check if specific surface is active
   */
  const isActive = (surface) => mobileSurface === surface;

  /**
   * Check if any bottom sheet is open
   */
  const isBottomSheetOpen = () => mobileSurface.startsWith('BOTTOM_SHEET_');

  /**
   * Get current bottom sheet type (if any)
   */
  const getCurrentBottomSheet = () => {
    if (!isBottomSheetOpen()) return null;
    return mobileSurface;
  };

  return {
    // State
    mobileSurface,
    aiSession,
    selectedTool,

    // Hamburger actions
    openHamburger,
    closeHamburger,

    // Bottom sheet actions
    openNotifications,
    openMessages,
    openTools,
    openToolChild,
    backToToolsHub,
    closeBottomSheet,

    // AI actions
    openAIFull,
    minimizeAI,
    closeAI,
    resetAIChat,

    // Navigation
    navigateToPage,

    // Helpers
    isActive,
    isBottomSheetOpen,
    getCurrentBottomSheet,

    // Constants
    SURFACES: MOBILE_SURFACES
  };
}
