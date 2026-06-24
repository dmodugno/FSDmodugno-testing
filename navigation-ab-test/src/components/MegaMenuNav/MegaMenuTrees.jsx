export default function MegaMenuTrees({ onNavigate }) {
  const items = [
    {
      icon: (
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: 'Edit Family Tree',
      description: 'Dive into the fun of building your family tree, making sure every branch is right and every story is saved.',
      page: 'Family Tree'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: 'Living Family Members',
      description: "List of living people you've added to your family.",
      page: 'Living People (private)'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: 'Manage Trees',
      description: 'Easily manage all your family trees on FamilySearch.',
      page: 'Manage Trees'
    }
  ];

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Header description */}
      <p className="text-sm text-[#58595b]">Create and improve your family tree</p>

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
