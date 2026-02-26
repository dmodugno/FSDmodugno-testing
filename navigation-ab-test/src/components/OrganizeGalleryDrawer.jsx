export default function OrganizeGalleryDrawer({ isOpen, onClose, hideHeader = false }) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="bg-white h-full overflow-y-auto w-full">
      <div className="p-4">
          {/* Header - conditionally rendered */}
          {!hideHeader && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Organize Gallery</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Close drawer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Main Sections */}
          <div className="space-y-1 mb-6">
            <button className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded flex items-center justify-between">
              <span className="text-base text-gray-900">My Memories</span>
              <span className="text-sm text-gray-500">275</span>
            </button>
            <button className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded flex items-center justify-between">
              <span className="text-base text-gray-900">My Archive</span>
              <span className="text-sm text-gray-500">275</span>
            </button>
            <button className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded flex items-center justify-between">
              <span className="text-base text-gray-900">Recently Deleted</span>
              <span className="text-sm text-gray-500">275</span>
            </button>
          </div>

          {/* Bookmarks Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Bookmarks</h3>
            <div className="space-y-1">
              <button className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded flex items-center justify-between">
                <span className="text-base text-gray-900">Memories</span>
                <span className="text-sm text-gray-500">0</span>
              </button>
              <button className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded flex items-center justify-between">
                <span className="text-base text-gray-900">2021 Family Alb...</span>
                <span className="text-sm text-gray-500">0</span>
              </button>
            </div>
          </div>

          {/* Albums Section */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Albums</h3>
            <button className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded">
              <span className="text-teal-600 font-medium">+ NEW ALBUM</span>
            </button>
            <button className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded flex items-center justify-between">
              <span className="text-base text-gray-900">Audio Grandpa</span>
              <span className="text-sm text-gray-500">4</span>
            </button>
          </div>
        </div>
    </div>
  );
}
