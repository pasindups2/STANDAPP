
import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { Message, Role, Language } from '../types';
import ReactMarkdown from 'react-markdown';
import Logo from './Logo';

interface ChatInterfaceProps {
  onSuggestResource: () => void;
  language?: Language;
  userName?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  onSuggestResource, 
  language = Language.SINHALA, 
  userName 
}) => {
  const isSi = language === Language.SINHALA;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: Role.MODEL,
      text: isSi 
        ? `ආයුබෝවන් ${userName || ''}. මම STANDAPP. අද ඔබට දැනෙන්නේ කෙසේද?`
        : `Hello ${userName || ''}. I am STANDAPP. How are you feeling right now?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const chatSession = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatSession.current = createChatSession(language, userName);
  }, [language, userName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession.current) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    if (inputRef.current) {
        inputRef.current.style.height = 'auto';
    }

    try {
      let fullResponse = '';
      const botMsgId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, {
        id: botMsgId,
        role: Role.MODEL,
        text: '',
        timestamp: new Date(),
        isTyping: true
      }]);

      await sendMessageStream(chatSession.current, userMsg.text, (chunk) => {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId 
            ? { ...msg, text: fullResponse, isTyping: false } 
            : msg
        ));
      });

    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoice = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = isSi ? 'si-LK' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-transparent">
      
      {/* BACKGROUND ANIMATION LAYERS */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
        {/* Animated Gradient Blob 1 */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-brand-500/20 rounded-full blur-[100px] animate-float"></div>
        {/* Animated Gradient Blob 2 */}
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-accent-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
        {/* Aurora Mesh */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-400/5 to-transparent animate-aurora opacity-50"></div>
      </div>

      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-hide relative z-10 pb-32">
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === Role.USER ? 'justify-end' : 'justify-start'} animate-slide-up`}
            style={{ animationDelay: `${Math.min(idx * 0.1, 0.5)}s` }}
          >
            {/* AI Avatar */}
            {msg.role === Role.MODEL && (
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mr-3 mt-auto shadow-lg shadow-brand-500/10 border border-white/20 transform transition-transform hover:scale-110">
                <Logo className="w-6 h-6" />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-[75%] px-6 py-4 rounded-[20px] text-sm sm:text-base leading-relaxed backdrop-blur-xl transition-all hover:scale-[1.01] ${
                msg.role === Role.USER
                  ? 'bubble-user text-white rounded-br-sm'
                  : 'bubble-ai text-neutral-800 dark:text-neutral-100 rounded-bl-sm'
              }`}
            >
              {msg.role === Role.MODEL ? (
                <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-headings:text-neutral-900 dark:prose-headings:text-white prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-strong:text-brand-700 dark:prose-strong:text-brand-300">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && messages[messages.length - 1]?.role === Role.USER && (
           <div className="flex w-full justify-start items-end animate-fade-in">
             <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mr-3 border border-white/20">
                 <div className="w-5 h-5 bg-brand-400 rounded-full animate-pulse"></div>
             </div>
             <div className="bubble-ai px-6 py-4 rounded-[20px] rounded-bl-sm flex items-center space-x-2">
               <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
               <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
               <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* USER FRIENDLY FLOATING INPUT CAPSULE */}
      <div className="absolute bottom-6 left-0 right-0 px-4 z-20 flex justify-center">
        <div className="w-full max-w-4xl bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/5 p-2 flex items-end gap-2 transition-all duration-300 input-glow">
          
          {/* Voice Button */}
          <button
             onClick={toggleVoice}
             className={`p-3 rounded-full transition-all duration-300 flex-shrink-0 h-[48px] w-[48px] flex items-center justify-center ${
               isListening 
                 ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/40' 
                 : 'bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-neutral-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-white/10 dark:hover:text-white'
             }`}
             title="Voice Input"
          >
             {isListening ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                  <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
                </svg>
             ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
             )}
          </button>
          
          {/* Text Area */}
          <div className="flex-1 relative mb-1">
            <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={isListening ? "Listening..." : (isSi ? "ඔබේ අදහස් මෙහි ලියන්න..." : "Type your message here...")}
                className="w-full bg-transparent px-2 py-2.5 focus:outline-none text-black dark:text-black placeholder-neutral-400 resize-none max-h-[120px] min-h-[40px] leading-relaxed text-base font-medium"
                disabled={isTyping}
            />
          </div>
          
          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`p-3 rounded-[20px] transition-all duration-300 flex-shrink-0 h-[48px] w-[48px] flex items-center justify-center shadow-lg ${
                !input.trim() || isTyping
                ? 'bg-neutral-200 dark:bg-white/10 text-neutral-400 cursor-not-allowed'
                : 'bg-gradient-to-tr from-brand-600 to-brand-400 hover:from-brand-500 hover:to-brand-300 text-white transform hover:scale-105 active:scale-95 shadow-brand-500/40'
            }`}
          >
            {isTyping ? (
                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
            )}
          </button>
        </div>
      </div>

      {/* Helper Text (Outside capsule) */}
      <div className="absolute bottom-1 w-full text-center pointer-events-none z-20">
            <span className="text-[10px] text-neutral-500/70 dark:text-white/30 font-medium px-2 py-0.5 rounded-full backdrop-blur-sm pointer-events-auto">
              STANDAPP AI can make mistakes. In crisis? 
              <button onClick={onSuggestResource} className="text-brand-500 hover:text-brand-400 hover:underline font-bold ml-1">
                 Get Help
              </button>
            </span>
      </div>
    </div>
  );
};

export default ChatInterface;
