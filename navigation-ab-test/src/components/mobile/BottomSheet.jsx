/**
 * BottomSheet - Generic Mobile Bottom Sheet
 *
 * Rules:
 * - Only one bottom sheet may be open at a time (no stacking)
 * - Switching sheets animates close → open
 * - Tapping hamburger immediately replaces sheet
 * - Tool child sheets show Back button to return to hub
 *
 * See ARCHITECTURE.md → Bottom Sheet Behavior (Mobile)
 */

import { useEffect, useState } from 'react';

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  height = 'h-2/3', // Default to 2/3 screen height
  showBack = false, // Show back button for tool children
  onBack = null // Back handler
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      // Delay cleanup to allow exit animation
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg transition-transform duration-300 z-50 ${height} ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {/* Left: Back button (if tool child) or empty space */}
          <div className="flex items-center gap-2">
            {showBack && onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Back"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>
          {/* Right: Close button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Close"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(100% - 64px)' }}>
          {children}
        </div>
      </div>
    </>
  );
}
