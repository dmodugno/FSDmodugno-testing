export default function GalleryPage({ onOrganizeGalleryClick, organizeGalleryOpen = false }) {
  const baseUrl = import.meta.env.BASE_URL;

  // Mock memory data
  const memories = [
    {
      id: 1,
      type: 'audio',
      title: 'Audio Memory',
      duration: '20:19',
      locked: true
    },
    {
      id: 2,
      type: 'story',
      title: 'Story Memory',
      content: 'Once upon a time in a cozy little town, the Johnson family lived in a charming blue house. Every Sunday, they gathered around the dinner table, sharing stories and laughter. One day, young Lily decided to bake cookies for everyone. With flour on her nose and a big smile, she mixed...',
      locked: true
    },
    {
      id: 3,
      type: 'audio',
      title: 'Audio Memory',
      duration: '20:19',
      locked: true
    },
    {
      id: 4,
      type: 'image',
      title: 'Image Memory',
      image: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=400&h=300&fit=crop',
      locked: true
    },
    {
      id: 5,
      type: 'image',
      title: 'Image Memory',
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&h=300&fit=crop',
      locked: true
    },
    {
      id: 6,
      type: 'image',
      title: 'Image Memory',
      image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=400&h=300&fit=crop',
      locked: true
    },
    {
      id: 7,
      type: 'audio',
      title: 'Audio Memory',
      duration: '20:19',
      locked: true
    },
    {
      id: 8,
      type: 'story',
      title: 'Story Memory',
      content: 'In the quaint village of Silverbrook, the Abernathy family cherished their Friday night traditions. Every week, they\'d gather in their cozy living room, sharing tales and laughter. One evening, young Leo decided to put on a puppet show. With a makeshift stage and a heart full of excitement, he arranged the...',
      locked: true
    },
    {
      id: 9,
      type: 'story',
      title: 'Story Memory',
      content: 'In the town of Eldenwood, the Bellweather family had a unique way to end the week. Every Friday, they\'d sit around the fireplace, sharing stories and songs. One Friday, young Maisie decided to perform a magic show. With a sparkly cape and a box of tricks, she prepared her act, while her older...',
      locked: true
    }
  ];

  return (
    <div className="h-full bg-gray-200 flex flex-col">
      {/* Toolbar */}
      <div className="mx-4 mt-4 bg-white border border-gray-300 rounded-full shadow-sm px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded transition-colors">
              ADD MEMORIES
            </button>
            <button className="text-teal-600 hover:text-teal-700 font-medium">
              SELECT
            </button>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-sm font-medium">LIST</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-sm font-medium">FILTER</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              <span className="text-sm font-medium">SORT</span>
            </button>

            {/* Search field */}
            <div className="relative">
              <input
                type="text"
                placeholder="Find memories"
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Gallery icon */}
            <button
              onClick={onOrganizeGalleryClick}
              className={`p-2 rounded-lg transition-colors ${
                organizeGalleryOpen
                  ? 'bg-green-50 border-2 border-green-600 text-green-600'
                  : 'text-teal-600 hover:bg-teal-50'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory) => (
            <div key={memory.id} className="group cursor-pointer">
              {/* Audio Card */}
              {memory.type === 'audio' && (
                <div className="bg-[#f5f3e8] rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center justify-center p-8 relative">
                    <div className="w-24 h-24 bg-[#94b43b] rounded-full flex items-center justify-center mb-4">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    </div>
                    <div className="text-xl font-semibold text-gray-800">{memory.duration}</div>
                    {memory.locked && (
                      <div className="absolute bottom-4 right-4">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="bg-white px-4 py-3 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900">{memory.title}</h3>
                  </div>
                </div>
              )}

              {/* Story Card */}
              {memory.type === 'story' && (
                <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow h-full">
                  <div className="p-6 relative">
                    <h3 className="font-bold text-xl text-gray-900 mb-3">{memory.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-6">{memory.content}</p>
                    {memory.locked && (
                      <div className="absolute bottom-4 right-4">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Image Card */}
              {memory.type === 'image' && (
                <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[4/3]">
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-full object-cover"
                    />
                    {memory.locked && (
                      <div className="absolute bottom-4 right-4">
                        <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-3">
                    <h3 className="font-semibold text-gray-900">{memory.title}</h3>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
