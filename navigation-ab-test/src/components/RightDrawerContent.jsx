import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import RecentPeopleViewed from './RecentPeopleViewed';
import Messages from './Messages';

export default function RightDrawerContent({
  activeDrawer,
  drawerItems,
  showEnvironmentSwitcher = false,
  onEnvironmentChange
}) {
  const baseUrl = import.meta.env.BASE_URL;
  const { user } = useUser();
  const [selectedEnvironment, setSelectedEnvironment] = useState('familysearch-tree');

  // Extract last name from user
  const lastName = user?.name ? user.name.split(' ').slice(-1)[0] : 'Family';
  const userTreeName = `${lastName} Family`;
  const familyGroupName = `${lastName} family group`;
  const userTreeAvatar = lastName.charAt(0).toUpperCase();

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

  const handleEnvironmentSelect = (envId) => {
    const newEnv = environments[envId];
    setSelectedEnvironment(envId);

    // Notify parent component
    if (onEnvironmentChange) {
      onEnvironmentChange(envId, newEnv);
    }
  };

  // Environment Switcher Content
  if (showEnvironmentSwitcher && activeDrawer === 0) {
    return (
      <div>
        {/* FamilySearch Tree */}
        <button
          onClick={() => handleEnvironmentSelect('familysearch-tree')}
          className={`w-full flex items-start p-4 hover:bg-gray-50 transition-colors rounded-lg ${
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
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="px-2 py-2 text-sm font-semibold text-gray-700">
            Family Group Trees
          </div>
          <button
            onClick={() => handleEnvironmentSelect('famiglia-modugno')}
            className={`w-full flex items-center p-4 hover:bg-gray-50 transition-colors rounded-lg ${
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
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="px-2 py-2 text-sm font-semibold text-gray-700">
            User Trees
          </div>
          <button
            onClick={() => handleEnvironmentSelect('cet-modugno')}
            className={`w-full flex items-center p-4 hover:bg-gray-50 transition-colors rounded-lg ${
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
    );
  }

  // Language Picker Content - Variant B only (index 0)
  if (!showEnvironmentSwitcher && activeDrawer === 0) {
    return (
      <div className="text-gray-700">
        <p>Language picker content.</p>
        <p className="mt-2 text-sm text-gray-500">Content coming soon...</p>
      </div>
    );
  }

  // Messages Content - adjust drawer index based on whether environment switcher exists
  // Note: In Variant A (showEnvironmentSwitcher=true), RightDrawer has AI Assistant at index 1,
  // so Messages is at index 2. In Variant B, Messages is at index 1.
  const messagesIndex = showEnvironmentSwitcher ? 2 : 1;
  if (activeDrawer === messagesIndex) {
    return <Messages />;
  }

  // Notifications Content - adjust index based on variant
  const notificationsIndex = showEnvironmentSwitcher ? 3 : 2;
  if (activeDrawer === notificationsIndex) {
    return (
      <div className="text-gray-700">
        <p>You have no new notifications.</p>
        <p className="mt-2 text-sm text-gray-500">We'll notify you when there's something new.</p>
      </div>
    );
  }

  // Recent People Viewed Content - adjust index based on variant
  const recentPeopleIndex = showEnvironmentSwitcher ? 4 : 3;
  if (activeDrawer === recentPeopleIndex) {
    return <RecentPeopleViewed />;
  }

  // Default content for other drawers
  return (
    <div className="text-gray-700">
      <p>This is the {drawerItems[activeDrawer].label} panel.</p>
      <p className="mt-2 text-sm text-gray-500">Content coming soon...</p>
    </div>
  );
}
