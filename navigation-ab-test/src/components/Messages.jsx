import { useState } from 'react';

export default function Messages() {
  const baseUrl = import.meta.env.BASE_URL;
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    unread: true,
    private: true,
    familyGroups: false,
    threads: false
  });
  const [showEventChats, setShowEventChats] = useState(false);

  // Mock data for chats
  const chats = {
    unread: [],
    private: [
      {
        id: '1',
        name: 'John Smith',
        avatar: 'J',
        message: 'Thanks for the information about...',
        date: 'Jan 20',
        unread: false
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        avatar: 'S',
        message: 'I found some interesting records',
        date: 'Jan 19',
        unread: false
      },
      {
        id: '3',
        name: 'Michael Brown',
        avatar: 'M',
        message: 'Can you help me with this source?',
        date: 'Jan 18',
        unread: false
      }
    ],
    familyGroups: [
      {
        id: '4',
        name: 'Famiglia Modugno',
        avatar: 'F',
        message: 'New photo uploaded',
        date: 'Jan 17',
        unread: false
      }
    ],
    threads: [
      {
        id: '5',
        name: 'Research Discussion',
        avatar: 'R',
        message: 'Latest updates on the project',
        date: 'Jan 16',
        unread: false
      }
    ]
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const ChatItem = ({ chat }) => (
    <button className="w-full flex items-start p-3 hover:bg-gray-50 transition-colors rounded-lg">
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-semibold mr-3 flex-shrink-0">
        {chat.avatar}
      </div>
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="font-medium text-gray-900 truncate">{chat.name}</div>
          <div className="text-xs text-gray-500 ml-2 flex-shrink-0">{chat.date}</div>
        </div>
        <div className="text-sm text-gray-500 truncate">{chat.message}</div>
      </div>
    </button>
  );

  const SectionHeader = ({ title, isExpanded, onToggle, count }) => (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors rounded-lg"
    >
      <div className="flex items-center">
        <svg
          className={`w-4 h-4 mr-2 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="font-semibold text-gray-700 text-sm">{title}</span>
        {count > 0 && (
          <span className="ml-2 text-xs text-gray-500">({count})</span>
        )}
      </div>
    </button>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for people and chats"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Scrollable Chat List */}
      <div className="flex-1 overflow-y-auto">
        {/* Unread Section */}
        <div className="mb-2">
          <SectionHeader
            title="Unread"
            isExpanded={expandedSections.unread}
            onToggle={() => toggleSection('unread')}
            count={chats.unread.length}
          />
          {expandedSections.unread && (
            <div className="px-2">
              {chats.unread.length > 0 ? (
                chats.unread.map(chat => <ChatItem key={chat.id} chat={chat} />)
              ) : (
                <div className="py-4 text-center text-sm text-gray-500">
                  No unread messages
                </div>
              )}
            </div>
          )}
        </div>

        {/* Private Section */}
        <div className="mb-2">
          <SectionHeader
            title="Private"
            isExpanded={expandedSections.private}
            onToggle={() => toggleSection('private')}
            count={chats.private.length}
          />
          {expandedSections.private && (
            <div className="px-2">
              <div className="py-2">
                <button className="w-full px-4 py-2 text-sm font-semibold text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                  CREATE PRIVATE CHAT
                </button>
              </div>
              {chats.private.map(chat => <ChatItem key={chat.id} chat={chat} />)}
            </div>
          )}
        </div>

        {/* Family Groups Section */}
        <div className="mb-2">
          <SectionHeader
            title="Family Groups"
            isExpanded={expandedSections.familyGroups}
            onToggle={() => toggleSection('familyGroups')}
            count={chats.familyGroups.length}
          />
          {expandedSections.familyGroups && (
            <div className="px-2">
              {chats.familyGroups.map(chat => <ChatItem key={chat.id} chat={chat} />)}
            </div>
          )}
        </div>

        {/* Threads Section */}
        <div className="mb-2">
          <SectionHeader
            title="Threads"
            isExpanded={expandedSections.threads}
            onToggle={() => toggleSection('threads')}
            count={chats.threads.length}
          />
          {expandedSections.threads && (
            <div className="px-2">
              {chats.threads.map(chat => <ChatItem key={chat.id} chat={chat} />)}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Toggle */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => setShowEventChats(!showEventChats)}
          className="w-full flex items-center justify-between"
        >
          <span className="text-sm text-gray-700">Show event chats</span>
          <div
            className={`w-11 h-6 rounded-full transition-colors ${
              showEventChats ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform mt-0.5 ${
                showEventChats ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
