export default function PersonCard({ name, lifespan, id, verified = false, photo = null }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 w-64 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3">
        {/* Profile Photo */}
        <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
          {photo ? (
            <img src={photo} alt={name} className="w-full h-full object-cover" />
          ) : (
            <svg className="w-full h-full text-gray-400 p-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          )}
        </div>

        {/* Person Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h3 className="font-semibold text-gray-900 text-sm truncate">{name}</h3>
            {verified && (
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-0.5">{lifespan}</p>
          <p className="text-xs text-gray-500 mt-0.5">{id}</p>
        </div>
      </div>
    </div>
  );
}
