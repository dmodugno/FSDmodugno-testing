export default function AddParentsCard({ onClick }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 w-80 relative group">
      {/* Add Father */}
      <div
        className="px-4 py-3 border-l-4 border-blue-500 cursor-pointer hover:bg-gray-50"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          {/* Generic Avatar */}
          <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            <svg className="w-full h-full text-gray-400 p-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Add Text */}
          <div className="flex-1">
            <h3 className="font-medium text-blue-600 text-sm">ADD FATHER</h3>
          </div>
        </div>
      </div>

      {/* Add Mother */}
      <div
        className="px-4 py-3 border-l-4 border-pink-500 cursor-pointer hover:bg-gray-50"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          {/* Generic Avatar */}
          <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            <svg className="w-full h-full text-gray-400 p-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Add Text */}
          <div className="flex-1">
            <h3 className="font-medium text-blue-600 text-sm">ADD MOTHER</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
