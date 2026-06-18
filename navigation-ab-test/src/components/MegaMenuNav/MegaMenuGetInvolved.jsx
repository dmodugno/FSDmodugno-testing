export default function MegaMenuGetInvolved({ onNavigate }) {
  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Header description */}
      <p className="text-sm text-[#58595b]">Help others and the community</p>

      {/* Two column layout */}
      <div className="flex gap-8">
        {/* Your Impact Section */}
        <div className="flex-1">
          <div
            onClick={() => onNavigate('Your Impact')}
            className="flex gap-3 p-3 rounded-lg hover:bg-[#f5f6f6] cursor-pointer transition-colors"
          >
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#202121] mb-1">Your Impact</p>
              <p className="text-xs text-[#58595b] leading-relaxed">Discover how your volunteer efforts make it easier for families worldwide to discover and connect with their ancestors.</p>
            </div>
          </div>
        </div>

        {/* Opportunities Section */}
        <div className="flex-1 flex flex-col">
          {/* Opportunities header item with description */}
          <div className="flex gap-3 p-3 mb-1">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#202121] mb-1">Opportunities</p>
              <p className="text-xs text-[#58595b] leading-relaxed">Help users explore their family histories by reviewing historical records and adding key details.</p>
            </div>
          </div>

          {/* Sub-items - tighter grouping */}
          <div className="flex flex-col pl-9">
            <div
              onClick={() => onNavigate('Quick Name Review')}
              className="flex gap-3 px-2 py-2 rounded-lg hover:bg-[#f5f6f6] cursor-pointer transition-colors"
            >
              <div>
                <p className="text-sm text-[#202121] mb-0.5">Quick Name Review</p>
                <p className="text-xs text-[#58595b]">Review names in historical records</p>
              </div>
            </div>
            <div
              onClick={() => onNavigate('Full Name Review')}
              className="flex gap-3 px-2 py-2 rounded-lg hover:bg-[#f5f6f6] cursor-pointer transition-colors"
            >
              <div>
                <p className="text-sm text-[#202121] mb-0.5">Full Name Review</p>
                <p className="text-xs text-[#58595b]">Complete detailed name reviews</p>
              </div>
            </div>
            <div
              onClick={() => onNavigate('Indexing Review')}
              className="flex gap-3 px-2 py-2 rounded-lg hover:bg-[#f5f6f6] cursor-pointer transition-colors"
            >
              <div>
                <p className="text-sm text-[#202121] mb-0.5">Indexing Review</p>
                <p className="text-xs text-[#58595b]">Review indexed historical records</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
