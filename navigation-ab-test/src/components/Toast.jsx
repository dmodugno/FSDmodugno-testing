import { useEffect, useState } from 'react';

export default function Toast({ message, isVisible, onClose }) {
  const [displayMessage, setDisplayMessage] = useState(message);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // If message changes while visible, animate out then in
      if (displayMessage !== message && displayMessage !== '') {
        setIsAnimating(true);
        // Wait for slide-out animation
        setTimeout(() => {
          setDisplayMessage(message);
          setIsAnimating(false);
        }, 300); // Match transition duration
      } else {
        setDisplayMessage(message);
      }

      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, message, onClose, displayMessage]);

  const shouldShow = isVisible && !isAnimating;

  return (
    <div
      className={`fixed top-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 transition-all duration-300 ease-in-out ${
        shouldShow ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      {/* Green Checkmark Icon */}
      <div className="flex-shrink-0">
        <svg
          className="w-6 h-6 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Message */}
      <div className="text-sm font-medium">{displayMessage}</div>
    </div>
  );
}
