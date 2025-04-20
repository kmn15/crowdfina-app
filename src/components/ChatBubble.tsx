import React, { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! How can we help you today?", isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = message.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setMessage('');
    setIsLoading(true);

    // Simulate response delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for reaching out! Our team will get back to you soon.", 
        isUser: false 
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all flex items-center justify-center ${isOpen ? 'hidden' : ''}`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-4 right-4 w-[360px] bg-white rounded-2xl shadow-xl transition-all transform ${isOpen ? 'scale-100' : 'scale-0'}`}>
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-orange-500 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-medium text-white">Chat Support</h3>
              <p className="text-sm text-orange-100">We typically reply within 5 minutes</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-orange-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.isUser 
                  ? 'bg-orange-500 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-2 rounded-bl-none">
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
} 