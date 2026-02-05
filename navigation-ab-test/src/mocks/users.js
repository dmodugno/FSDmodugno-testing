// Mock user profiles for testing different user types

export const userProfiles = {
  'lds-new': {
    id: 'user-1',
    name: 'Sarah Johnson',
    churchMembership: 'LDS',
    experienceLevel: 'new',
    treeSize: 0, // Empty tree → Empty Tree baseline
    reservedOrdinances: 0,
    recentActivity: 'Created account 2 weeks ago',
    // New fields for mode detection
    hintsCount: 0,
    reservationsCount: 0,
    ordinancesReadyCount: 0,
    duplicatesCount: 0,
    lastMode: null,
    lastAction: null,
    entryContext: null,
    isHelper: false
  },
  'lds-casual': {
    id: 'user-2',
    name: 'Michael Chen',
    churchMembership: 'LDS',
    experienceLevel: 'casual',
    treeSize: 156,
    reservedOrdinances: 3,
    recentActivity: 'Last visit 5 days ago',
    // New fields for mode detection
    hintsCount: 12,
    reservationsCount: 3,
    ordinancesReadyCount: 5,
    duplicatesCount: 2,
    lastMode: null,
    lastAction: 'searching records',
    entryContext: 'search',
    isHelper: false
  },
  'lds-power': {
    id: 'user-3',
    name: 'Elizabeth Martinez',
    churchMembership: 'LDS',
    experienceLevel: 'power',
    treeSize: 2847,
    reservedOrdinances: 24,
    recentActivity: 'Active daily user',
    // New fields for mode detection
    hintsCount: 45,
    reservationsCount: 24,
    ordinancesReadyCount: 18,
    duplicatesCount: 7,
    lastMode: 'build-tree',
    lastAction: 'working on tree',
    entryContext: 'tree',
    isHelper: false
  },
  'nonlds-new': {
    id: 'user-4',
    name: 'James Wilson',
    churchMembership: 'non-LDS',
    experienceLevel: 'new',
    treeSize: 0, // Empty tree → Empty Tree baseline
    reservedOrdinances: null,
    recentActivity: 'Created account 1 week ago',
    // New fields for mode detection
    hintsCount: 0,
    reservationsCount: null,
    ordinancesReadyCount: null,
    duplicatesCount: 0,
    lastMode: null,
    lastAction: null,
    entryContext: null,
    isHelper: false
  },
  'nonlds-casual': {
    id: 'user-5',
    name: 'Amanda Rodriguez',
    churchMembership: 'non-LDS',
    experienceLevel: 'casual',
    treeSize: 234,
    reservedOrdinances: null,
    recentActivity: 'Last visit 3 days ago',
    // New fields for mode detection
    hintsCount: 15,
    reservationsCount: null,
    ordinancesReadyCount: null,
    duplicatesCount: 3,
    lastMode: null,
    lastAction: 'searching records',
    entryContext: 'search',
    isHelper: false
  },
  'nonlds-power': {
    id: 'user-6',
    name: 'David Thompson',
    churchMembership: 'non-LDS',
    experienceLevel: 'power',
    treeSize: 1923,
    reservedOrdinances: null,
    recentActivity: 'Active several times per week',
    // New fields for mode detection
    hintsCount: 38,
    reservationsCount: null,
    ordinancesReadyCount: null,
    duplicatesCount: 5,
    lastMode: 'research',
    lastAction: 'searching records',
    entryContext: 'search',
    isHelper: false
  }
};

export const getUserProfile = (membership = 'non-LDS', experience = 'new') => {
  const key = `${membership.toLowerCase().replace(/-/g, '')}-${experience}`;
  return userProfiles[key] || userProfiles['nonlds-new'];
};

export const membershipTypes = ['LDS', 'non-LDS'];
export const experienceLevels = ['new', 'casual', 'power'];
