import { useUser } from '../../contexts/UserContext';

export default function PersonDetailDrawer({ person, isOpen, onClose, isSplit }) {
  const { user } = useUser();
  const baseUrl = import.meta.env.BASE_URL;

  // Mock quality score
  const qualityScore = person?.verified ? 'High' : 'Medium';

  // Mock counts for links
  const sourcesCount = Math.floor(Math.random() * 5);
  const memoriesCount = Math.floor(Math.random() * 100);
  const collaborateCount = 0;

  // Parse birth/death from lifespan (e.g., "1955-Living" or "1930-2015")
  const parseLifespan = (lifespan) => {
    if (!lifespan) return { birth: '', death: null };
    const parts = lifespan.split('-');
    return {
      birth: parts[0],
      death: parts[1] === 'Living' ? null : parts[1]
    };
  };

  const { birth, death } = parseLifespan(person?.lifespan);

  return (
    <div className="bg-white h-full overflow-y-auto w-full">
        {person && (
          <div>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Profile Photo */}
            <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
              {person.photo ? (
                <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
              ) : (
                <svg className="w-full h-full text-gray-400 p-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
            </div>

            <div>
              <h2 className="font-semibold text-lg text-gray-900">{person.name}</h2>
              <p className="text-sm text-gray-600">{person.id}</p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Close drawer"
          >
            <img
              src={`${baseUrl}icons/MenuClose.svg`}
              alt="Close"
              className="w-5 h-5"
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Quality Score */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Quality Score:</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                qualityScore === 'High' ? 'bg-green-100 text-green-800' :
                qualityScore === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {qualityScore}
              </span>
            </div>
          </div>

          {/* Links: Sources, Memories, Collaborate */}
          <div className="flex gap-4 mb-4 text-sm">
            <button className="text-blue-600 hover:underline">
              Sources ({sourcesCount})
            </button>
            <button className="text-blue-600 hover:underline">
              Memories ({memoriesCount})
            </button>
            <button className="text-blue-600 hover:underline">
              Collaborate ({collaborateCount})
            </button>
          </div>

          {/* Birth/Death Info */}
          <div className="mb-4">
            <div className="text-sm">
              <span className="font-semibold">Birth:</span> {birth}
            </div>
            {death && (
              <div className="text-sm">
                <span className="font-semibold">Death:</span> {death}
              </div>
            )}
          </div>

          {/* Badge Buttons (B, C, I, E, SP, SS) - Only for LDS users */}
          {user && user.churchMembership === 'LDS' && (
            <div className="flex gap-2 mb-6">
              {['B', 'C', 'I', 'E', 'SP', 'SS'].map((badge) => (
                <button
                  key={badge}
                  className="w-10 h-10 bg-gray-300 text-gray-700 font-semibold rounded flex items-center justify-center hover:bg-gray-400 text-xs"
                >
                  {badge}
                </button>
              ))}
            </div>
          )}

          {/* Action Icons */}
          <div className="flex gap-4 mb-6">
            <button className="text-blue-600 hover:text-blue-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
            <button className="text-blue-600 hover:text-blue-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
          </div>

          {/* PERSON / TREE Toggle Buttons */}
          <div className="flex gap-2 mb-6">
            <button className="flex-1 py-2 px-4 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-50 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              PERSON
            </button>
            <button className="flex-1 py-2 px-4 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-50 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              TREE
            </button>
          </div>

          {/* Vitals Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Vitals</h3>

            {/* Birth */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-700">Birth</span>
                <span className="text-xs text-gray-500">• 0 Sources</span>
              </div>
              <div className="text-sm text-gray-600">{birth}</div>
              <div className="text-sm text-gray-600">Location placeholder</div>
            </div>

            {/* Christening */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-700">Christening</span>
              </div>
              <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                <span className="text-lg">+</span> ADD
              </button>
            </div>

            {/* Death */}
            {death ? (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-700">Death</span>
                  <span className="text-xs text-gray-500">• 0 Sources</span>
                </div>
                <div className="text-sm text-gray-600">{death}</div>
                <div className="text-sm text-gray-600">Location placeholder</div>
              </div>
            ) : (
              <div className="text-sm text-gray-600 italic">Living</div>
            )}

            {/* Burial */}
            {death && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-700">Burial</span>
                  <span className="text-xs text-gray-500">• 0 Sources</span>
                </div>
                <div className="text-sm text-gray-600">Date placeholder</div>
                <div className="text-sm text-gray-600">Location placeholder</div>
              </div>
            )}
          </div>

          {/* Events Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Events (0)</h3>
            </div>
            <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              <span className="text-lg">+</span> ADD EVENT
            </button>
          </div>

          {/* Facts Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Facts (1)</h3>
            </div>
            <button className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-3">
              <span className="text-lg">+</span> ADD FACT
            </button>

            {/* Alternate Name */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-700">Alternate Name</span>
                <span className="text-xs text-gray-500">• 0 Sources</span>
              </div>
              <div className="text-sm text-gray-600">Birth Name</div>
              <div className="text-sm text-gray-600">{person.name}</div>
            </div>
          </div>

          {/* Brief Life History Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Brief Life History</h3>
            </div>
            <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              <span className="text-lg">+</span> ADD BRIEF LIFE HISTORY
            </button>
          </div>
        </div>
          </div>
        )}
    </div>
  );
}
