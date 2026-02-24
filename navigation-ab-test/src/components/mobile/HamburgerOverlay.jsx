/**
 * HamburgerOverlay - Mobile Full-Screen Navigation
 *
 * Rules:
 * - Full-screen overlay (blocks all other surfaces)
 * - Only one section expanded at a time (accordion)
 * - Section containing current page auto-expands on open
 * - Selecting destination immediately closes overlay and navigates
 *
 * See ARCHITECTURE.md → Hamburger Navigation Behavior (Mobile)
 */

import { useState, useEffect } from 'react';

export default function HamburgerOverlay({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  menuItems
}) {
  const [expandedSection, setExpandedSection] = useState(null);
  const baseUrl = import.meta.env.BASE_URL;

  // Auto-expand section containing current page when opening
  useEffect(() => {
    if (isOpen && currentPage) {
      // Find which section contains the current page
      const sectionWithCurrentPage = menuItems.find(item =>
        item.subItems && item.subItems.some(sub => sub.label === currentPage)
      );
      if (sectionWithCurrentPage) {
        setExpandedSection(sectionWithCurrentPage.id);
      }
    }
  }, [isOpen, currentPage, menuItems]);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleItemClick = (pageName) => {
    onNavigate(pageName);
    onClose(); // Immediately close overlay after navigation
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="py-2">
        {menuItems.map((item) => {
          const isExpanded = expandedSection === item.id;
          const isCurrentPage = currentPage === item.label;
          const hasSubItems = item.subItems && item.subItems.length > 0;

          return (
            <div key={item.id}>
              {/* Main Item */}
              <button
                onClick={() => {
                  if (hasSubItems) {
                    toggleSection(item.id);
                  } else {
                    handleItemClick(item.label);
                  }
                }}
                className={`w-full flex items-center justify-between p-4 ${
                  isCurrentPage
                    ? 'bg-green-50 border-l-4 border-green-600 text-green-700'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.icon}
                    alt=""
                    className="w-6 h-6"
                  />
                  <span className="font-medium text-gray-900">{item.label}</span>
                </div>
                {hasSubItems && (
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isExpanded ? 'rotate-90' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>

              {/* Sub Items */}
              {hasSubItems && isExpanded && (
                <div className="bg-gray-50">
                  {item.subItems.map((subItem, index) => {
                    const isCurrentSubPage = currentPage === subItem.label;
                    return (
                      <button
                        key={index}
                        onClick={() => handleItemClick(subItem.label)}
                        className={`w-full text-left px-4 py-3 pl-14 ${
                          isCurrentSubPage
                            ? 'bg-green-50 border-l-4 border-green-600 text-green-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-sm text-gray-700">{subItem.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
