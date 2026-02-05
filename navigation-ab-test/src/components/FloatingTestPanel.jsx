import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { membershipTypes, experienceLevels } from '../mocks/users';

export default function FloatingTestPanel({ variant }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const { user, updateUser, updateUserField, getShareableUrl, isUrlMode } = useUser();

  // Keyboard shortcut to toggle test panel (Ctrl+Shift+T or Cmd+Shift+T)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Don't show test panel when in URL mode (user is testing via shared URL)
  if (!user || isUrlMode) return null;

  const handleCopyUrl = async () => {
    const url = getShareableUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleMembershipChange = (e) => {
    updateUser(e.target.value, user.experienceLevel);
  };

  const handleExperienceChange = (e) => {
    updateUser(user.churchMembership, e.target.value);
  };

  const handleTreeSizeChange = (e) => {
    updateUserField('treeSize', parseInt(e.target.value) || 0);
  };

  const handleHintsChange = (e) => {
    updateUserField('hintsCount', parseInt(e.target.value) || 0);
  };

  const handleDuplicatesChange = (e) => {
    updateUserField('duplicatesCount', parseInt(e.target.value) || 0);
  };

  const handleOrdinancesChange = (e) => {
    updateUserField('ordinancesReadyCount', parseInt(e.target.value) || 0);
  };

  const handleLastModeChange = (e) => {
    const mode = e.target.value === 'none' ? null : e.target.value;
    updateUserField('lastMode', mode);
  };

  const handleEntryContextChange = (e) => {
    const context = e.target.value === 'none' ? null : e.target.value;
    updateUserField('entryContext', context);
    if (context && context !== 'none') {
      updateUserField('lastAction', `working on ${context}`);
    } else {
      updateUserField('lastAction', null);
    }
  };

  const handleHelperToggle = (e) => {
    updateUserField('isHelper', e.target.checked);
  };

  // Preset configurations
  const applyPreset = (preset) => {
    switch (preset) {
      case 'new-empty':
        updateUserField('treeSize', 0);
        updateUserField('hintsCount', 0);
        updateUserField('duplicatesCount', 0);
        updateUserField('ordinancesReadyCount', 0);
        updateUserField('lastMode', null);
        updateUserField('entryContext', null);
        updateUserField('lastAction', null);
        updateUserField('isHelper', false);
        break;
      case 'casual-contextual':
        updateUserField('treeSize', 150);
        updateUserField('hintsCount', 12);
        updateUserField('duplicatesCount', 2);
        updateUserField('ordinancesReadyCount', 5);
        updateUserField('lastMode', null);
        updateUserField('entryContext', 'search');
        updateUserField('lastAction', 'searching records');
        updateUserField('isHelper', false);
        break;
      case 'power-research':
        updateUserField('treeSize', 2000);
        updateUserField('hintsCount', 45);
        updateUserField('duplicatesCount', 7);
        updateUserField('ordinancesReadyCount', 18);
        updateUserField('lastMode', 'research');
        updateUserField('entryContext', 'search');
        updateUserField('lastAction', 'searching records');
        updateUserField('isHelper', false);
        break;
      case 'lds-temple':
        updateUserField('treeSize', 1000);
        updateUserField('hintsCount', 30);
        updateUserField('duplicatesCount', 5);
        updateUserField('ordinancesReadyCount', 24);
        updateUserField('lastMode', 'temple');
        updateUserField('entryContext', 'temple');
        updateUserField('lastAction', 'preparing ordinances');
        updateUserField('isHelper', false);
        break;
      case 'assisted':
        updateUserField('treeSize', 100);
        updateUserField('hintsCount', 8);
        updateUserField('duplicatesCount', 1);
        updateUserField('ordinancesReadyCount', 3);
        updateUserField('lastMode', null);
        updateUserField('entryContext', null);
        updateUserField('lastAction', null);
        updateUserField('isHelper', true);
        break;
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-[50] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-yellow-400 p-4 border-b-2 border-yellow-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧪</span>
                <h2 className="font-bold text-yellow-900 text-lg">Test Controls</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-yellow-900 hover:bg-yellow-500 rounded p-1"
                title="Close (Ctrl+Shift+T)"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="text-xs text-yellow-800 mt-1">
              Press Ctrl+Shift+T (⌘+Shift+T on Mac) to toggle
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Variant Section */}
            <section>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Variant</h3>
              <div className="flex gap-2">
                <a
                  href="/navigation-ab-test/"
                  className={`flex-1 px-3 py-2 text-center rounded-md text-sm font-medium border-2 transition-colors ${
                    variant === 'Variant A'
                      ? 'bg-green-100 border-green-600 text-green-900'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Variant A
                </a>
                <a
                  href="/navigation-ab-test/variant-b"
                  className={`flex-1 px-3 py-2 text-center rounded-md text-sm font-medium border-2 transition-colors ${
                    variant === 'Variant B'
                      ? 'bg-green-100 border-green-600 text-green-900'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Variant B
                </a>
              </div>
            </section>

            {/* User Profile Section */}
            <section className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">User Profile</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="membership" className="block text-sm font-medium text-gray-700 mb-1">
                    Membership
                  </label>
                  <select
                    id="membership"
                    value={user.churchMembership}
                    onChange={handleMembershipChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {membershipTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level
                  </label>
                  <select
                    id="experience"
                    value={user.experienceLevel}
                    onChange={handleExperienceChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <strong>User:</strong> {user.name}
                </div>
              </div>
            </section>

            {/* Tree State Section */}
            <section className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Tree State</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="treeSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Tree Size: <span className="text-green-600 font-semibold">{user.treeSize}</span>
                  </label>
                  <input
                    id="treeSize"
                    type="range"
                    min="0"
                    max="5000"
                    step="10"
                    value={user.treeSize}
                    onChange={handleTreeSizeChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>5000</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="hints" className="block text-sm font-medium text-gray-700 mb-1">
                    Hints
                  </label>
                  <input
                    id="hints"
                    type="number"
                    min="0"
                    value={user.hintsCount}
                    onChange={handleHintsChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="duplicates" className="block text-sm font-medium text-gray-700 mb-1">
                    Duplicates
                  </label>
                  <input
                    id="duplicates"
                    type="number"
                    min="0"
                    value={user.duplicatesCount}
                    onChange={handleDuplicatesChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {user.churchMembership === 'LDS' && (
                  <div>
                    <label htmlFor="ordinances" className="block text-sm font-medium text-gray-700 mb-1">
                      Ordinances Ready
                    </label>
                    <input
                      id="ordinances"
                      type="number"
                      min="0"
                      value={user.ordinancesReadyCount}
                      onChange={handleOrdinancesChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Current Session Section */}
            <section className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Current Session</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="lastMode" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Mode
                  </label>
                  <select
                    id="lastMode"
                    value={user.lastMode || 'none'}
                    onChange={handleLastModeChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="none">None</option>
                    <option value="research">Research</option>
                    <option value="build-tree">Build Tree</option>
                    <option value="explore">Explore</option>
                    {user.churchMembership === 'LDS' && <option value="temple">Temple</option>}
                  </select>
                </div>

                <div>
                  <label htmlFor="entryContext" className="block text-sm font-medium text-gray-700 mb-1">
                    Entry Context
                  </label>
                  <select
                    id="entryContext"
                    value={user.entryContext || 'none'}
                    onChange={handleEntryContextChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="none">None</option>
                    <option value="search">Search</option>
                    <option value="tree">Tree</option>
                    <option value="temple">Temple</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    id="isHelper"
                    type="checkbox"
                    checked={user.isHelper}
                    onChange={handleHelperToggle}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isHelper" className="ml-2 block text-sm text-gray-700">
                    Helper/Assisted Session
                  </label>
                </div>
              </div>
            </section>

            {/* Copy Test URL Section */}
            <section className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Share Test State</h3>
              <button
                onClick={handleCopyUrl}
                className={`w-full px-4 py-3 rounded-md text-sm font-medium transition-all ${
                  copySuccess
                    ? 'bg-green-100 text-green-900 border-2 border-green-600'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copySuccess ? '✓ URL Copied!' : '📋 Copy Test URL'}
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Share this URL with testers. The test panel will be hidden for them.
              </p>
            </section>

            {/* Quick Presets Section */}
            <section className="border-t pt-4 pb-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Quick Presets</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => applyPreset('new-empty')}
                  className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-md text-sm font-medium transition-colors"
                >
                  New User
                </button>
                <button
                  onClick={() => applyPreset('casual-contextual')}
                  className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-md text-sm font-medium transition-colors"
                >
                  Casual + Context
                </button>
                <button
                  onClick={() => applyPreset('power-research')}
                  className="px-3 py-2 bg-green-100 hover:bg-green-200 text-green-900 rounded-md text-sm font-medium transition-colors"
                >
                  Power Research
                </button>
                <button
                  onClick={() => applyPreset('lds-temple')}
                  className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-md text-sm font-medium transition-colors"
                >
                  LDS Temple
                </button>
                <button
                  onClick={() => applyPreset('assisted')}
                  className="px-3 py-2 bg-pink-100 hover:bg-pink-200 text-pink-900 rounded-md text-sm font-medium transition-colors col-span-2"
                >
                  Assisted Session
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
