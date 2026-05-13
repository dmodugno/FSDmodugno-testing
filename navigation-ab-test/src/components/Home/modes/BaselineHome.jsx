import { useState } from 'react';
import { useUser } from '../../../contexts/UserContext';

export default function BaselineHome({ state }) {
  const { user } = useUser();
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [buildTreeOpen, setBuildTreeOpen] = useState(true);
  const [recentlyViewedOpen, setRecentlyViewedOpen] = useState(true);
  const [recordHintsOpen, setRecordHintsOpen] = useState(true);
  const [recentMemoriesOpen, setRecentMemoriesOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(true);
  const [labsOpen, setLabsOpen] = useState(true);
  const [todoOpen, setTodoOpen] = useState(true);
  const [todoItems, setTodoItems] = useState([]);
  const [newTodoInput, setNewTodoInput] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoInput.trim()) {
      setTodoItems([...todoItems, { id: Date.now(), text: newTodoInput, completed: false }]);
      setNewTodoInput('');
    }
  };

  const handleToggleTodo = (id) => {
    setTodoItems(todoItems.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
      {/* Left Column - 2/3 width */}
      <div className="lg:col-span-2 space-y-3 md:space-y-4">
        {/* AI Research Assistant */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <button
            onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-t-4 border-green-600"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">AI Research Assistant</h2>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${aiAssistantOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {aiAssistantOpen && (
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-600">AI Research Assistant content will go here.</p>
            </div>
          )}
        </div>

        {/* Build your family tree */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <button
            onClick={() => setBuildTreeOpen(!buildTreeOpen)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}icons/TreePedigree.svg`}
                alt=""
                className="w-6 h-6"
              />
              <h2 className="text-lg font-semibold text-gray-900">Build your family tree</h2>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${buildTreeOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {buildTreeOpen && (
            <div className="p-6 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <img
                    src="https://edge.fscdn.org/assets/static/media/tree-3x.961da24be8d38669e649.webp"
                    alt="Family tree illustration"
                    className="w-64 h-auto"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Start your tree</h3>
                  <p className="text-gray-600 mb-4">
                    Build your family tree, and find new ancestors as you add what you know.
                  </p>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded transition-colors">
                    BUILD YOUR TREE
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recently Viewed */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <button
            onClick={() => setRecentlyViewedOpen(!recentlyViewedOpen)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900">Recently Viewed</h2>
                <p className="text-sm text-gray-500">People in the tree you have recently visited</p>
              </div>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${recentlyViewedOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {recentlyViewedOpen && (
            <div className="p-6 border-t border-gray-200 text-center">
              <p className="text-gray-900 font-semibold mb-1">No people to show</p>
              <p className="text-gray-600 text-sm">
                Visit <a href="#" className="text-blue-600 hover:underline">Family Tree</a>
              </p>
            </div>
          )}
        </div>

        {/* Record Hints */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <button
            onClick={() => setRecordHintsOpen(!recordHintsOpen)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900">Record Hints</h2>
                <p className="text-sm text-gray-500">Potential matches for your ancestors in historical documents</p>
              </div>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${recordHintsOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {recordHintsOpen && (
            <div className="p-6 border-t border-gray-200 text-center">
              <p className="text-gray-900 font-semibold mb-1">No hints to show</p>
              <p className="text-gray-600 text-sm">
                Try adding more branches to your{' '}
                <a href="#" className="text-blue-600 hover:underline">family tree</a>
              </p>
            </div>
          )}
        </div>

        {/* Recent Memories */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <button
            onClick={() => setRecentMemoriesOpen(!recentMemoriesOpen)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900">Recent Memories</h2>
                <p className="text-sm text-gray-500">Photos and stories added to relatives in your family tree</p>
              </div>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${recentMemoriesOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {recentMemoriesOpen && (
            <div className="p-6 border-t border-gray-200 text-center">
              <p className="text-gray-900 font-semibold mb-1">No memories to show</p>
              <p className="text-gray-600 text-sm">
                Memories will appear here when they are tagged by you and others.{' '}
                <a href="#" className="text-blue-600 hover:underline">Upload and tag photos.</a>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - 1/3 width */}
      <div className="space-y-3 md:space-y-4">
        {/* Search for an Ancestor */}
        <div className="rounded-lg">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors rounded-lg"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h2 className="text-base font-semibold text-gray-900">Search for an Ancestor</h2>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${searchOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {searchOpen && (
            <div className="p-4">
              <form className="space-y-3">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Names
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Names
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <p className="text-xs text-gray-500">Required</p>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Possible Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    placeholder="City, County, State, Country"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Birth Year
                  </label>
                  <div className="relative">
                    <input
                      id="birthYear"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded transition-colors"
                >
                  SEARCH
                </button>
              </form>
            </div>
          )}
        </div>

        {/* FamilySearch Labs */}
        <div className="rounded-lg">
          <button
            onClick={() => setLabsOpen(!labsOpen)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors rounded-lg"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <h2 className="text-base font-semibold text-gray-900">FamilySearch Labs</h2>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${labsOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {labsOpen && (
            <div className="p-4">
              <img
                src="https://edge.fscdn.org/assets/static/media/LabsImage.60c7f3dd786ac07b2554.jpg"
                alt="FamilySearch Labs"
                className="w-full rounded mb-3"
              />
              <p className="text-sm text-gray-700 mb-3">
                Try out some potential new features and tell us what you think.
              </p>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded transition-colors">
                VIEW EXPERIMENTS
              </button>
            </div>
          )}
        </div>

        {/* To-Do List */}
        <div className="rounded-lg">
          <button
            onClick={() => setTodoOpen(!todoOpen)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors rounded-lg"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h2 className="text-base font-semibold text-gray-900">To-Do List</h2>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${todoOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {todoOpen && (
            <div className="p-4">
              <form onSubmit={handleAddTodo} className="mb-4">
                <input
                  type="text"
                  value={newTodoInput}
                  onChange={(e) => setNewTodoInput(e.target.value)}
                  placeholder="+ Add an item..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </form>

              {todoItems.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {todoItems.map(item => (
                    <li key={item.id} className="flex items-center gap-2 group">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleToggleTodo(item.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {item.text}
                      </span>
                      <button
                        onClick={() => handleDeleteTodo(item.id)}
                        className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="text-xs text-gray-500 space-y-1">
                <p className="flex items-start">
                  <svg className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>
                    Tip: You can paste or enter URLs (https://www.familysearch.org) or person IDs (G7T1-3MF).
                  </span>
                </p>
                <a href="#" className="text-blue-600 hover:underline block text-right">
                  USING THE TO-DO LIST
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
