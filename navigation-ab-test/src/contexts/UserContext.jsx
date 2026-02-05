import { createContext, useContext, useState, useEffect } from 'react';
import { getUserProfile } from '../mocks/users';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isUrlMode, setIsUrlMode] = useState(false);

  useEffect(() => {
    // Get user type from URL parameters
    const params = new URLSearchParams(window.location.search);
    const membership = params.get('membership') || 'non-LDS';
    const experience = params.get('experience') || 'new';

    // Check if we're in URL mode (has membership or experience params)
    const hasUrlParams = params.has('membership') || params.has('experience');
    setIsUrlMode(hasUrlParams);

    const userProfile = getUserProfile(membership, experience);

    // Override with URL parameters if present
    const overrides = {};
    if (params.has('treeSize')) overrides.treeSize = parseInt(params.get('treeSize'));
    if (params.has('hints')) overrides.hintsCount = parseInt(params.get('hints'));
    if (params.has('duplicates')) overrides.duplicatesCount = parseInt(params.get('duplicates'));
    if (params.has('ordinances')) overrides.ordinancesReadyCount = parseInt(params.get('ordinances'));
    if (params.has('lastMode')) overrides.lastMode = params.get('lastMode') === 'null' ? null : params.get('lastMode');
    if (params.has('entryContext')) overrides.entryContext = params.get('entryContext') === 'null' ? null : params.get('entryContext');
    if (params.has('lastAction')) overrides.lastAction = params.get('lastAction') === 'null' ? null : params.get('lastAction');
    if (params.has('isHelper')) overrides.isHelper = params.get('isHelper') === 'true';

    setUser({ ...userProfile, ...overrides });
  }, []);

  const updateUser = (membership, experience) => {
    const userProfile = getUserProfile(membership, experience);
    setUser(userProfile);

    // Update URL parameters
    const params = new URLSearchParams(window.location.search);
    params.set('membership', membership);
    params.set('experience', experience);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  // Update specific user fields (for testing mode overrides)
  const updateUserField = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Generate shareable URL with current user state
  const getShareableUrl = () => {
    if (!user) return '';

    const params = new URLSearchParams();
    params.set('membership', user.churchMembership);
    params.set('experience', user.experienceLevel);
    params.set('treeSize', user.treeSize);
    params.set('hints', user.hintsCount);
    params.set('duplicates', user.duplicatesCount);
    if (user.ordinancesReadyCount !== null) params.set('ordinances', user.ordinancesReadyCount);
    params.set('lastMode', user.lastMode || 'null');
    params.set('entryContext', user.entryContext || 'null');
    params.set('lastAction', user.lastAction || 'null');
    params.set('isHelper', user.isHelper);

    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  };

  return (
    <UserContext.Provider value={{ user, updateUser, updateUserField, getShareableUrl, isUrlMode }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
