import { useState } from 'react';

export default function AIChatOverlay({ chat, onClose, onMinimize, onMaximize, onReset, isMinimized, index, drawerOpen, isSplit }) {
  const [message, setMessage] = useState('');
  const baseUrl = import.meta.env.BASE_URL;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // TODO: Handle sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  // Detect if we're in new mode (Variant A) or old mode (Variant B)
  const isNewMode = isSplit !== undefined;

  // Calculate right position for old overlay mode (Variant B)
  const calculateRightPosition = (baseOffset) => {
    const drawerWidth = drawerOpen ? 320 : 0;
    return `calc(64px + ${drawerWidth}px + 1.625rem + ${baseOffset})`;
  };

  // Old minimized rendering (Variant B)
  if (isMinimized && !isNewMode) {
    return (
      <div
        className="fixed bottom-0 h-12 bg-white border border-gray-300 rounded-t-lg shadow-lg cursor-pointer hover:bg-gray-50 transition-all duration-300 flex items-center justify-between px-4 z-40"
        style={{
          right: calculateRightPosition(`3.5rem + ${index * 240}px`),
          width: '220px'
        }}
        onClick={onMaximize}
      >
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <img
            src={`${baseUrl}icons/HelpAI.svg`}
            alt="AI"
            className="w-5 h-5 flex-shrink-0"
          />
          <span className="text-sm font-medium text-gray-700 truncate">
            {chat.title}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-1 hover:bg-gray-200 rounded flex-shrink-0"
          aria-label="Close chat"
        >
          <img
            src={`${baseUrl}icons/MenuClose.svg`}
            alt="Close"
            className="w-4 h-4"
          />
        </button>
      </div>
    );
  }

  // New minimized state handled by parent (Variant A)
  if (isMinimized && isNewMode) {
    return null;
  }

  // Old overlay mode (Variant B)
  if (!isNewMode) {
    return (
      <div
        className="fixed bottom-0 bg-white border border-gray-300 rounded-t-lg shadow-2xl flex flex-col transition-all duration-300 z-40"
        style={{
          right: calculateRightPosition('3.5rem'),
          width: '400px',
          height: '600px',
          maxHeight: 'calc(100vh - 100px)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <img
              src={`${baseUrl}icons/HelpAI.svg`}
              alt="AI"
              className="w-6 h-6"
            />
            <h3 className="text-lg font-semibold text-gray-900">{chat.title}</h3>
          </div>
          <div className="flex items-center space-x-1">
            {onReset && (
              <button
                onClick={onReset}
                className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
                aria-label="New chat"
                title="New/Reset Chat"
              >
                <span className="text-gray-700">New</span>
              </button>
            )}
            <button
              onClick={onMinimize}
              className="p-1 hover:bg-gray-200 rounded"
              aria-label="Minimize chat"
              title="Minimize"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 rounded"
              aria-label="Close chat"
              title="Close"
            >
              <img
                src={`${baseUrl}icons/MenuClose.svg`}
                alt="Close"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chat.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <img
                src={`${baseUrl}icons/HelpAI.svg`}
                alt="AI Assistant"
                className="w-16 h-16 mb-4 opacity-50"
              />
              <p className="text-lg font-medium">How can I help you?</p>
              <p className="text-sm mt-2">Ask me anything about FamilySearch</p>
            </div>
          ) : (
            chat.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }

  // New container mode (Variant A)
  return (
    <div
      className={`bg-black flex flex-col transition-all duration-300 w-full h-full ${
        isSplit ? 'rounded-t-lg shadow-lg' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <img
            src={`${baseUrl}icons/HelpAI.svg`}
            alt="AI"
            className="w-6 h-6"
          />
          <h3 className="text-lg font-semibold text-white">{chat.title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          {onReset && (
            <button
              onClick={onReset}
              className="px-2 py-1 text-sm hover:bg-gray-600 rounded text-white"
              aria-label="New chat"
              title="New/Reset Chat"
            >
              <span>New</span>
            </button>
          )}
          <button
            onClick={onMinimize}
            className="p-1 hover:bg-gray-600 rounded"
            aria-label="Minimize chat"
            title="Minimize"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-600 rounded"
            aria-label="Close chat"
            title="Close"
          >
            <img
              src={`${baseUrl}icons/MenuClose.svg`}
              alt="Close"
              className="w-5 h-5 invert"
            />
          </button>
        </div>
      </div>

      {/* Chat Content Area with white background and dark border */}
      <div className="flex-1 bg-white border-2 border-black m-2 rounded-lg flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chat.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <img
                src={`${baseUrl}icons/HelpAI.svg`}
                alt="AI Assistant"
                className="w-16 h-16 mb-4 opacity-50"
              />
              <p className="text-lg font-medium">How can I help you?</p>
              <p className="text-sm mt-2">Ask me anything about FamilySearch</p>
            </div>
          ) : (
            chat.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
