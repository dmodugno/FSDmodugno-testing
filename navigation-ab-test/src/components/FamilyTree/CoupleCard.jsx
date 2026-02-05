import { useState } from 'react';

export default function CoupleCard({ husband, wife, marriage = null, hasChildren = false, showNavigation = false, onPersonClick }) {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 w-80 relative group">
      {/* Husband */}
      <div
        className="p-4 border-l-4 border-blue-500 cursor-pointer hover:bg-gray-50"
        onClick={() => onPersonClick && onPersonClick(husband)}
      >
        <div className="flex items-start gap-3">
          {/* Profile Photo */}
          <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            {husband.photo ? (
              <img src={husband.photo} alt={husband.name} className="w-full h-full object-cover" />
            ) : (
              <svg className="w-full h-full text-gray-400 p-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            )}
          </div>

          {/* Person Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-gray-900 text-sm">{husband.name}</h3>
              {husband.verified && (
                <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-0.5">{husband.lifespan}</p>
            <p className="text-xs text-gray-500 mt-0.5">{husband.id}</p>
          </div>
        </div>
      </div>

      {/* Marriage Info */}
      {marriage && (
        <div className="px-4 py-2 bg-gray-50 border-y border-gray-200">
          <p className="text-xs text-gray-700">
            <span className="font-medium">Marriage:</span> {marriage.date}
          </p>
          <p className="text-xs text-gray-600 mt-0.5">{marriage.place}</p>
        </div>
      )}

      {/* Wife */}
      <div
        className="p-4 border-l-4 border-pink-500 cursor-pointer hover:bg-gray-50"
        onClick={() => onPersonClick && onPersonClick(wife)}
      >
        <div className="flex items-start gap-3">
          {/* Profile Photo */}
          <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            {wife.photo ? (
              <img src={wife.photo} alt={wife.name} className="w-full h-full object-cover" />
            ) : (
              <svg className="w-full h-full text-gray-400 p-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            )}
          </div>

          {/* Person Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-gray-900 text-sm">{wife.name}</h3>
              {wife.verified && (
                <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-0.5">{wife.lifespan}</p>
            <p className="text-xs text-gray-500 mt-0.5">{wife.id}</p>
          </div>
        </div>
      </div>

      {/* Children Dropdown */}
      {hasChildren && (
        <button
          onClick={() => setShowChildren(!showChildren)}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-200 flex items-center justify-between"
        >
          <span>Children</span>
          <svg
            className={`w-4 h-4 transition-transform ${showChildren ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* Navigation Chevron */}
      {showNavigation && (
        <button className="absolute top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50" style={{ left: 'calc(100% + 24px)' }}>
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
