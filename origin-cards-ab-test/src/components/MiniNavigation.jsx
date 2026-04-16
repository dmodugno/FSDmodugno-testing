import { useState, useEffect } from 'react';

function MiniNavigation() {
  const [activeSection, setActiveSection] = useState('explore');

  const navItems = [
    { id: 'explore', label: 'Countries of origin' },
    { id: 'get-started', label: 'Why FamilySearch?' },
    { id: 'help', label: 'Get Help' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Use a smaller offset so sections highlight when they're more visible
      const scrollPosition = window.scrollY + 200;

      // Check if we're near the bottom of the page - if so, highlight last section
      // Use a smaller threshold (20px) so it only triggers when truly at the bottom
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20) {
        setActiveSection('help');
        return;
      }

      // Check each section in order and find the current one
      let currentSection = 'explore';

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPosition) {
          currentSection = item.id;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Account for sticky nav height plus some margin
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#cacdcd]">
      <div className="flex items-center justify-center py-7 px-4">
        <div className="grid grid-cols-3 gap-x-10 max-w-[1222px] w-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`text-sm text-center transition-colors relative ${
                activeSection === item.id
                  ? 'text-teal-700'
                  : 'text-gray-700 hover:text-teal-700'
              }`}
            >
              {item.label}
              {/* Active indicator bar */}
              {activeSection === item.id && (
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-[120px] h-1 bg-teal-700" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default MiniNavigation;
