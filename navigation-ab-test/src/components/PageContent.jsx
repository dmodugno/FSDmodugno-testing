import { useUser } from '../contexts/UserContext';
import HomePage from './Home';
import FamilyTreePage from './FamilyTree/FamilyTreePage';
import GalleryPage from './GalleryPage';
import MyReservationsPage from './MyReservationsPage';

export default function PageContent({
  currentPage,
  isMobile,
  onPersonClick,
  onOrganizeGalleryClick,
  organizeGalleryOpen,
  onGalleryToolsClick,
  onGallerySearchClick,
  onAddMemoriesClick,
  onFilterClick
}) {
  const { user } = useUser();

  if (currentPage === 'Home') {
    return <HomePage />;
  }

  if (currentPage === 'Family Tree') {
    return <FamilyTreePage onPersonClick={onPersonClick} mobileMode={isMobile} />;
  }

  if (currentPage === 'Living People (private)') {
    return (
      <div className="flex flex-col items-start justify-start h-full px-8 py-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">Living Family Members</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          These are living people you've added to your family. They remain private to you and won't appear in the shared FamilySearch Family Tree until they're marked as deceased.
        </p>
        <div className="text-gray-500 text-sm">[List of people appears here]</div>
      </div>
    );
  }

  if (currentPage === 'Gallery') {
    return (
      <GalleryPage
        onOrganizeGalleryClick={onOrganizeGalleryClick}
        organizeGalleryOpen={organizeGalleryOpen}
        mobileMode={isMobile}
        onGalleryToolsClick={onGalleryToolsClick}
        onGallerySearchClick={onGallerySearchClick}
        onAddMemoriesClick={onAddMemoriesClick}
      />
    );
  }

  if (currentPage === 'My Reservations') {
    return <MyReservationsPage onFilterClick={onFilterClick} />;
  }

  if (currentPage === 'Historical Records') {
    return (
      <div className="flex flex-col md:flex-row gap-20 h-full px-8 py-8 max-w-6xl mx-auto">
        <div className="flex-1 max-w-lg">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">Search Historical Records</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Records create a paper trail for your ancestors and can lead you to important details about their life. Enter a name, and we'll look for it in birth certificates, marriage registrations, census records, and other official documents.
          </p>
        </div>
        <div className="flex-1 max-w-sm">
          <form className="space-y-3">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Names</label>
              <input id="firstName" type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Names</label>
              <input id="lastName" type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <p className="text-xs text-gray-500">Required</p>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Possible Location</label>
              <input id="location" type="text" placeholder="City, County, State, Country" className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700 mb-1">Estimated Birth Year</label>
              <div className="relative">
                <input id="birthYear" type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
            <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded transition-colors">
              SEARCH
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (currentPage === 'People in Family Tree') {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">Search people in Family tree</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Search the largest shared family tree in the world. Discover ancestors, and see where you connect.
        </p>
      </div>
    );
  }

  if (currentPage === 'Unindexed Records') {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">Search unindexed records</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Search almost 2 billion historical records that haven't been organized and or cataloged yet. We use AI to read and interpret text directly from document images helping you uncover names, dates, and details that standard searches can't find.
        </p>
      </div>
    );
  }

  if (currentPage === 'Historical Images') {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">Explore Historical Images</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Browse images of records that haven't been made searchable through indexing (transcription) yet. Indexed (or transcribed) data is used to search for specific information in historical records.
        </p>
      </div>
    );
  }

  if (currentPage === 'Catalog') {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">Search FamilySearch's Catalog</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Find books, records, images, and other important resources offered through the FamilySearch website, the FamilySearch Library, and select FamilySearch Centers around the world.
        </p>
      </div>
    );
  }

  if (currentPage === 'Books') {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">Search FamilySearch's books</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Search over 500,000 genealogy books, family histories, maps, yearbooks, and more that FamilySearch acquired over the years.
        </p>
      </div>
    );
  }

  if (currentPage === 'Newspapers') {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">Search historical newspaper archives for your ancestors</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Embark on a journey through time. Historical newspapers offer insights, context, and a wealth of details to fuel your family history search.
        </p>
      </div>
    );
  }

  if (currentPage === 'Family Feed') {
    return (
      <div className="flex gap-16 h-full px-12 py-8 max-w-7xl mx-auto">
        <div className="flex-[2]">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-semibold text-gray-700">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <textarea
              placeholder="What will you share?"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="1"
            />
            <button className="w-12 h-12 bg-teal-600 hover:bg-teal-700 rounded-lg flex items-center justify-center text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
          </div>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Start writing your first post!</h2>
            <p className="text-gray-600">Here are some ideas to get you started. Happy posting!</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              "What memories do you have of your hometown?",
              "Where did you go on your most recent vacation?",
              "Did your kids do anything crazy, or sweet, this week?",
              "How did you meet your spouse?",
              "What memories do you have of your oldest relatives?",
              "Have your own idea? Click to get started."
            ].map((prompt, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-300 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-gray-900">{prompt}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-8">
          <div>
            <button className="w-full flex items-center justify-between py-2 hover:bg-gray-50 transition-colors rounded">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Friends</h3>
              </div>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="py-6 text-center">
              <div className="mb-4">
                <svg className="w-32 h-32 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Invite family and friends</h4>
              <p className="text-sm text-gray-600 mb-4">Start sharing your posts.</p>
              <button className="w-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold py-2.5 px-4 rounded transition-colors">
                SHARE LINK
              </button>
            </div>
          </div>
          <div>
            <button className="w-full flex items-center justify-between py-2 hover:bg-gray-50 transition-colors rounded">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Family Groups</h3>
              </div>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="py-6 text-center">
              <div className="mb-4">
                <svg className="w-32 h-32 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Create a Group</h4>
              <p className="text-sm text-gray-600 mb-4">Collaborate with family and friends.</p>
              <button className="w-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold py-2.5 px-4 rounded transition-colors">
                CREATE GROUP
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const placeholderPages = {
    'Manage Trees': {
      title: 'Manage Trees',
      description: 'View and manage all your family trees on FamilySearch.'
    },
    'Together App': {
      title: 'Together App',
      description: 'Connect and share memories with family using the Together app.'
    },
    'Locations': {
      title: 'Locations',
      description: 'Find a FamilySearch center or affiliate library near you.'
    },
    'Getting started': {
      title: 'Getting Started',
      description: 'New to FamilySearch? Start here to discover your family history.'
    },
    'Classes and Videos': {
      title: 'Classes and Videos',
      description: 'Explore free classes and videos to build your family history skills.'
    },
    'Community': {
      title: 'Community',
      description: "Stay updated, see what's new, and connect with the FamilySearch community."
    },
    'One-on-One Help': {
      title: 'One-on-One Help',
      description: 'Get personalized help from a FamilySearch volunteer consultant.'
    },
    'FamilySearch Wiki': {
      title: 'FamilySearch Wiki',
      description: 'Browse in-depth research guidance, record descriptions, and location guides.'
    },
    'Family Name Assist': {
      title: 'Family Name Assist',
      description: 'Help resolve duplicate names and improve the accuracy of the shared family tree.'
    },
    'Ordinances Ready': {
      title: 'Ordinances Ready',
      description: 'View your list of ancestors whose temple ordinances are ready to perform.'
    },
    'Schedule Temple Appointment': {
      title: 'Schedule Temple Appointment',
      description: 'Book a time at your local temple to perform ordinances for your ancestors.'
    }
  };

  if (placeholderPages[currentPage]) {
    const { title, description } = placeholderPages[currentPage];
    return (
      <div className="flex flex-col items-start justify-start px-8 py-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-3xl font-semibold text-gray-700">This is the {currentPage} page</h1>
    </div>
  );
}
