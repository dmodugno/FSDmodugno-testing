export default function MegaMenuGetInvolved({ onNavigate }) {
  const items = [
    {
      icon: (
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Your Impact',
      description: 'Discover how your volunteer efforts make it easier for families worldwide to discover and connect with their ancestors.',
      page: 'Your Impact'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: 'Quick Name Review',
      description: 'Review names in historical records and help make family history more discoverable for everyone.',
      page: 'Quick Name Review'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: 'Full Name Review',
      description: 'Complete detailed name reviews to improve the accuracy of historical records in the FamilySearch collection.',
      page: 'Full Name Review'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'Indexing Review',
      description: 'Review indexed historical records to ensure the information is accurate and complete.',
      page: 'Indexing Review'
    }
  ];

  return (
    <div className="flex flex-col gap-4 p-6">
      <p className="text-sm text-[#58595b]">Help others and the community</p>
      <div className="grid grid-cols-4 gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => onNavigate(item.page)}
            className="flex gap-3 p-3 rounded-lg hover:bg-[#f5f6f6] cursor-pointer transition-colors"
          >
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-[#202121] mb-1">{item.title}</p>
              <p className="text-xs text-[#58595b] leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
