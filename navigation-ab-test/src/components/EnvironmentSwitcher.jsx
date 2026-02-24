import { useState, useRef, useEffect } from 'react';
import Toast from './Toast';
import { useUser } from '../contexts/UserContext';

export default function EnvironmentSwitcher() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState('familysearch-tree');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const dropdownRef = useRef(null);
  const baseUrl = import.meta.env.BASE_URL;

  // Extract last name from user
  const lastName = user?.name ? user.name.split(' ').slice(-1)[0] : 'Family';
  const userTreeName = `${lastName} Family`;
  const familyGroupName = `${lastName} family group`;
  const userTreeAvatar = lastName.charAt(0).toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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

  const handleEnvironmentSelect = (envId) => {
    const newEnv = environments[envId];
    setSelectedEnvironment(envId);
    setIsOpen(false);

    // Show toast notification
    setToastMessage(`Environment changed to ${newEnv.name}`);
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <>
      <Toast message={toastMessage} isVisible={showToast} onClose={handleToastClose} />

      <div className="relative" ref={dropdownRef}>
        {/* Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
      >
        {currentEnv.icon ? (
          <img
            src={currentEnv.icon}
            alt={currentEnv.name}
            className="h-5 w-5"
          />
        ) : (
          <div className="h-5 w-5 bg-gray-300 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700">
            {currentEnv.avatar}
          </div>
        )}
        <span className="text-sm font-medium text-gray-700">{currentEnv.name}</span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Overlay */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* FamilySearch Tree */}
          <button
            onClick={() => handleEnvironmentSelect('familysearch-tree')}
            className={`w-full flex items-start p-4 hover:bg-gray-50 transition-colors ${
              selectedEnvironment === 'familysearch-tree' ? 'bg-green-50' : ''
            }`}
          >
            <img
              src={environments['familysearch-tree'].icon}
              alt="FamilySearch Tree"
              className="w-10 h-10 mr-3 flex-shrink-0"
            />
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">FamilySearch Tree</div>
              <div className="text-xs text-gray-500 mt-0.5">
                Your private tree connected to the public tree
              </div>
            </div>
          </button>

          {/* Family Group Trees Section */}
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="px-4 py-2 text-sm font-semibold text-gray-700">
              Family Group Trees
            </div>
            <button
              onClick={() => handleEnvironmentSelect('famiglia-modugno')}
              className={`w-full flex items-center p-4 hover:bg-gray-50 transition-colors ${
                selectedEnvironment === 'famiglia-modugno' ? 'bg-green-50' : ''
              }`}
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700 mr-3 flex-shrink-0">
                {userTreeAvatar}
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">{familyGroupName}</div>
              </div>
            </button>
          </div>

          {/* User Trees Section */}
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="px-4 py-2 text-sm font-semibold text-gray-700">
              User Trees
            </div>
            <button
              onClick={() => handleEnvironmentSelect('cet-modugno')}
              className={`w-full flex items-center p-4 hover:bg-gray-50 transition-colors ${
                selectedEnvironment === 'cet-modugno' ? 'bg-green-50' : ''
              }`}
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700 mr-3 flex-shrink-0">
                {userTreeAvatar}
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">{userTreeName}</div>
              </div>
            </button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
