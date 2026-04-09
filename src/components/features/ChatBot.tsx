import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, MinusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getChatResponse } from '../../services/aiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am your MFU REGOS Assistant. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await getChatResponse(userMessage, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? '60px' : '500px'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[350px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden mb-4 flex flex-col"
          >
            {/* Header */}
            <div className="bg-mfu-red p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-bold text-sm">MFU REG Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:bg-white/20 p-1 rounded transition-colors"
                >
                  <MinusCircle size={18} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1 rounded transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          msg.role === 'user' ? 'bg-slate-200' : 'bg-mfu-red/10 text-mfu-red'
                        }`}>
                          {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm ${
                          msg.role === 'user' 
                            ? 'bg-mfu-red text-white rounded-tr-none' 
                            : 'bg-white border border-slate-200 text-mfu-text-main rounded-tl-none shadow-sm'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-mfu-red/10 text-mfu-red flex items-center justify-center shrink-0">
                          <Bot size={16} />
                        </div>
                        <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                          <Loader2 size={16} className="animate-spin text-mfu-red" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-slate-100">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-mfu-red/20 outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="bg-mfu-red text-white p-2 rounded-xl hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isOpen ? 'bg-white text-mfu-red border border-mfu-red' : 'bg-mfu-red text-white'
        }`}
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
}
