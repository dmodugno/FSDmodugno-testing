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
    const experience = params.get('experience') || 'casual';

    // Check if we're in URL mode (has the 'access' token param for shared URLs)
    // This prevents the test panel from disappearing when using test controls
    const hasAccessToken = params.has('access');
    setIsUrlMode(hasAccessToken);

    const userProfile = getUserProfile(membership, experience);

    // Apply FS Default preset values if no URL parameters present
    const fsDefaultOverrides = !hasAccessToken ? {
      treeSize: 0,
      hintsCount: 0,
      duplicatesCount: 0,
      ordinancesReadyCount: 0,
      lastMode: null,
      entryContext: null,
      lastAction: null,
      isHelper: false
    } : {};

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

    setUser({ ...userProfile, ...fsDefaultOverrides, ...overrides });
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

  const fieldToParam = {
    treeSize: 'treeSize',
    hintsCount: 'hints',
    duplicatesCount: 'duplicates',
    ordinancesReadyCount: 'ordinances',
    lastMode: 'lastMode',
    entryContext: 'entryContext',
    lastAction: 'lastAction',
    isHelper: 'isHelper',
  };

  // Update specific user fields (for testing mode overrides)
  const updateUserField = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));

    const paramName = fieldToParam[field];
    if (paramName) {
      const params = new URLSearchParams(window.location.search);
      params.set(paramName, value === null ? 'null' : value);
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }
  };

  // Generate shareable URL with current user state
  const getShareableUrl = () => {
    if (!user) return '';

    const params = new URLSearchParams();

    // Include access token if authenticated (production only)
    const session = sessionStorage.getItem('access_session');
    if (session) {
      try {
        const { token } = JSON.parse(session);
        if (token) {
          params.set('access', token);
        }
      } catch (e) {
        // Session parsing failed, skip token
      }
    }

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
