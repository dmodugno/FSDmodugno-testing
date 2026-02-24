/**
 * MobileAIFull - Full-Screen AI Assistant (Mobile)
 *
 * Rules:
 * - Replaces entire app chrome including top bar
 * - Full-screen immersive mode
 * - Session persists when minimized
 * - Session destroyed when closed
 * - Context persists across navigation when minimized
 * - Does NOT auto-update context on page navigation
 *
 * See ARCHITECTURE.md → AI Assistant (Mobile)
 */

import { useState } from 'react';

export default function MobileAIFull({
  aiSession,
  onMinimize,
  onClose,
  onReset
}) {
  const [inputMessage, setInputMessage] = useState('');
  const baseUrl = import.meta.env.BASE_URL;

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // TODO: Implement actual message sending
      console.log('Send message:', inputMessage);
      setInputMessage('');
    }
  };

  if (!aiSession) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header - Dark theme to match AI branding */}
      <div className="bg-[#3a3a3a] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={`${baseUrl}icons/HelpAI.svg`}
            alt="AI"
            className="w-6 h-6 brightness-0 invert"
          />
          <h1 className="text-lg font-semibold">AI Assistant</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="px-3 py-1.5 text-sm bg-gray-600 hover:bg-gray-500 rounded"
          >
            New
          </button>
          <button
            onClick={onMinimize}
            className="p-2 hover:bg-gray-600 rounded"
            aria-label="Minimize"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-600 rounded"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {aiSession.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <img
              src={`${baseUrl}icons/HelpAI.svg`}
              alt="AI"
              className="w-16 h-16 mb-4 opacity-50"
            />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              How can I help you today?
            </h2>
            <p className="text-sm text-gray-500">
              Ask me anything about your family history research
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {aiSession.messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-900'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
