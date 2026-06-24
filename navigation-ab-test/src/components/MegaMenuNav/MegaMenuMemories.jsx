export default function MegaMenuMemories({ onNavigate }) {
  const items = [
    {
      icon: (
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Gallery',
      description: "Explore your cherished moments in the Gallery, a vibrant collection of images and memories that celebrate your family's journey.",
      page: 'Gallery'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      title: 'Family Feed',
      description: 'See and share moments and memories with your family and friends in one place.',
      page: 'Family Feed'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Together App',
      description: 'Together by FamilySearch is an exciting new way for youth to connect with their parents, grandparents, and other family members.',
      page: 'Together App'
    }
  ];

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Header description */}
      <p className="text-sm text-[#58595b]">Save and share memories and stories</p>

      {/* Menu items */}
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
