export default function MegaMenuTemple({ onNavigate }) {
  const items = [
    {
      icon: (
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'My Reservations',
      description: 'View and manage your temple reservations',
      page: 'My Reservations'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Ordinances Ready',
      description: 'Find relatives ready for temple work',
      page: 'Ordinances Ready'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Family Name Assist',
      description: 'Get help finding family names',
      page: 'Family Name Assist'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Schedule Temple Appointment',
      description: 'Schedule your next temple visit',
      page: 'Schedule Temple Appointment'
    }
  ];

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Header description */}
      <p className="text-sm text-[#58595b]">Discover the essential tools available for completing your temple work efficiently.</p>

      {/* Menu items */}
      <div className="grid grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => onNavigate(item.page)}
            className="flex gap-4 p-4 rounded-lg hover:bg-[#f5f6f6] cursor-pointer transition-colors"
          >
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-[#202121] mb-1">{item.title}</p>
              <p className="text-xs text-[#58595b]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
