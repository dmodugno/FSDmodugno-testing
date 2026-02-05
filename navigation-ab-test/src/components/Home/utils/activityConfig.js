// Activity definitions for Explore mode

export const ACTIVITIES = {
  TOGETHER_APP: 'together-app',
  RECORD_MY_STORY: 'record-my-story',
  COMPARE_A_FACE: 'compare-a-face',
  WHERE_AM_I_FROM: 'where-am-i-from',
  FAMOUS_RELATIVES: 'famous-relatives',
  ALL_ABOUT_ME: 'all-about-me',
  SURNAME_ORIGINS: 'surname-origins',
  PICTURE_MY_HERITAGE: 'picture-my-heritage'
};

// Activities that can be shown in baseline Empty Tree state
export const BASELINE_ALLOWED_ACTIVITIES = [
  ACTIVITIES.ALL_ABOUT_ME,
  ACTIVITIES.SURNAME_ORIGINS,
  ACTIVITIES.PICTURE_MY_HERITAGE
];

// Activity metadata
export const ACTIVITY_METADATA = {
  [ACTIVITIES.TOGETHER_APP]: {
    title: 'Together App',
    description: 'Collaborate with family on stories and memories',
    url: 'https://www.familysearch.org/together', // Placeholder URL
    gradient: 'from-blue-50 to-blue-100',
    buttonColor: 'bg-blue-600 hover:bg-blue-700'
  },
  [ACTIVITIES.RECORD_MY_STORY]: {
    title: 'Record My Story',
    description: 'Capture and share your life story',
    url: 'https://www.familysearch.org/discovery/recordmystory', // Placeholder URL
    gradient: 'from-purple-50 to-purple-100',
    buttonColor: 'bg-purple-600 hover:bg-purple-700'
  },
  [ACTIVITIES.COMPARE_A_FACE]: {
    title: 'Compare-a-Face',
    description: 'See which ancestors you look like',
    url: 'https://www.familysearch.org/discovery/compare-a-face', // Placeholder URL
    gradient: 'from-pink-50 to-pink-100',
    buttonColor: 'bg-pink-600 hover:bg-pink-700'
  },
  [ACTIVITIES.WHERE_AM_I_FROM]: {
    title: 'Where Am I From?',
    description: 'Discover your ancestral origins',
    url: 'https://www.familysearch.org/discovery/where-am-i-from', // Placeholder URL
    gradient: 'from-green-50 to-green-100',
    buttonColor: 'bg-green-600 hover:bg-green-700'
  },
  [ACTIVITIES.FAMOUS_RELATIVES]: {
    title: 'Famous Relatives',
    description: 'Find your famous ancestor connections',
    url: 'https://www.familysearch.org/discovery/famous-relatives', // Placeholder URL
    gradient: 'from-amber-50 to-amber-100',
    buttonColor: 'bg-amber-600 hover:bg-amber-700'
  },
  [ACTIVITIES.ALL_ABOUT_ME]: {
    title: 'All About Me',
    description: 'Create a personal profile to share',
    url: 'https://www.familysearch.org/discovery/all-about-me', // Placeholder URL
    gradient: 'from-indigo-50 to-indigo-100',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700'
  },
  [ACTIVITIES.SURNAME_ORIGINS]: {
    title: 'Surname Origins',
    description: 'Learn the history of your family name',
    url: 'https://www.familysearch.org/discovery/surname', // Placeholder URL
    gradient: 'from-teal-50 to-teal-100',
    buttonColor: 'bg-teal-600 hover:bg-teal-700'
  },
  [ACTIVITIES.PICTURE_MY_HERITAGE]: {
    title: 'Picture My Heritage',
    description: 'See yourself in historical contexts',
    url: 'https://www.familysearch.org/discovery/picture-my-heritage', // Placeholder URL
    gradient: 'from-rose-50 to-rose-100',
    buttonColor: 'bg-rose-600 hover:bg-rose-700'
  }
};
