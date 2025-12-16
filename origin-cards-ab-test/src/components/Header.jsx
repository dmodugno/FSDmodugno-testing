import { useState } from 'react';

export default function Header({ testCountry, onTestCountryChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguagePickerOpen, setIsLanguagePickerOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    'English',
    'Español',
    'Français',
    'Deutsch',
    'Português',
    'Italiano',
    '中文',
    '日本語',
    '한국어',
    'Русский'
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguagePickerOpen(false);
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-[#9EA1A1] border-b border-[#eee6c9] px-4 py-1.5 flex items-center gap-2 text-sm" role="region" aria-label="Test country selection">
        <label htmlFor="test-country-select" className="text-white font-semibold">Test country:</label>
        <select 
          id="test-country-select" 
          className="border border-white rounded px-3 py-1 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
          value={testCountry}
          onChange={(e) => onTestCountryChange(e.target.value)}
        >
          <option>United States</option>
          <option>Philippines</option>
          <option>United Kingdom</option>
          <option>Brasil</option>
          <option>Egypt</option>
          <option>China</option>
        </select>
      </div>
      <header className="bg-white shadow">
        <div className="flex items-center justify-between py-4 px-4 md:px-8">
          {/* Mobile/Tablet: Hamburger Menu */}
          <button 
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center font-bold text-xl text-teal-700 tracking-wide lg:order-1">
            <a href="/" aria-label="FamilySearch Home" className="inline-flex items-center">
              <img src="/FS Logo.svg" alt="FamilySearch" className="h-8 w-auto align-middle" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex lg:order-2 items-center gap-6">
            <a href="#" className="inline-flex h-10 items-center justify-center gap-1.5 px-0 text-gray-900 font-medium hover:underline">Features</a>
            <a href="#" className="inline-flex h-10 items-center justify-center gap-1.5 px-0 text-gray-900 font-medium hover:underline">Benefits</a>
            <a href="#" className="inline-flex h-10 items-center justify-center gap-1.5 px-0 text-gray-900 font-medium hover:underline">Help</a>
            <a href="#" className="inline-flex h-10 items-center justify-center gap-1.5 px-0 text-gray-900 font-medium hover:underline">About</a>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3 lg:order-3">
            {/* Language Selector - visible on mobile/tablet */}
            <button 
              className="lg:hidden p-2" 
              aria-label="Select Language"
              onClick={() => setIsLanguagePickerOpen(!isLanguagePickerOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </button>

            {/* Desktop Language Selector */}
            <select 
              className="hidden lg:block border border-gray-300 rounded px-2 py-1 text-base bg-white" 
              aria-label="Select Language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang}>{lang}</option>
              ))}
            </select>

            {/* Desktop Sign In/Up buttons */}
            <button className="hidden lg:inline-flex h-10 items-center justify-center gap-1.5 px-2 text-teal-700 hover:underline" aria-label="Sign In">Sign In</button>
            <button className="hidden lg:inline-flex h-10 items-center justify-center gap-1.5 px-3 border border-gray-900 rounded text-gray-900 hover:bg-gray-100" aria-label="Sign Up">Sign Up</button>
          </div>
        </div>

        {/* Mobile/Tablet Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="flex flex-col p-4">
              <a href="#" className="py-3 text-gray-900 font-medium hover:text-teal-700 border-b border-gray-100">Features</a>
              <a href="#" className="py-3 text-gray-900 font-medium hover:text-teal-700 border-b border-gray-100">Benefits</a>
              <a href="#" className="py-3 text-gray-900 font-medium hover:text-teal-700 border-b border-gray-100">Help</a>
              <a href="#" className="py-3 text-gray-900 font-medium hover:text-teal-700 border-b border-gray-100">About</a>
              <a href="#" className="py-3 text-teal-700 font-medium hover:text-teal-600">Sign In</a>
              <button className="mt-2 py-2 px-4 border border-gray-900 rounded text-gray-900 hover:bg-gray-100 text-center font-medium">Sign Up</button>
            </nav>
          </div>
        )}

        {/* Mobile/Tablet Language Picker Modal */}
        {isLanguagePickerOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
            <div className="bg-white w-full md:w-96 md:rounded-lg max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Select Language</h2>
                <button 
                  onClick={() => setIsLanguagePickerOpen(false)}
                  className="p-2 -mr-2 hover:bg-gray-100 rounded"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-2">
                {languages.map((language) => (
                  <button
                    key={language}
                    onClick={() => handleLanguageSelect(language)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-100 rounded ${
                      selectedLanguage === language ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-900'
                    }`}
                  >
                    {language}
                    {selectedLanguage === language && (
                      <svg className="w-5 h-5 inline-block ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
