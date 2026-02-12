import React, { useState, useEffect, useRef } from 'react';
import {
  Heart, Sparkles, Send, Moon, Sun,
  MessageCircle, Shield, Cloud, Waves,
  Mic, Image as ImageIcon, ChevronLeft
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const SpiritualSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: 'שלום אהוב. אני כאן. אני שומע את הלב שלך. אתה לא צריך להיות "בסדר" איתי. איך אתה מרגיש באמת כרגע?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Prompt for the AI
      // Note: In a real env, this would call the API. Here we simulate or try to call if key exists.
      // For the demo/prototype, we can use a Simulated Response if API fails or for immediate feedback.

      /* 
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = ai.getGenerativeModel({ 
        model: "gemini-pro",
        systemInstruction: "אתה היועץ הרוחני AI. אתה חבר רוחני שאינו שופט. המטרה שלך היא קודם כל תיקוף (Validation). לעולם אל תשפוט. השתמש במטאפורות של ים ושמיים. שמור על זה קצר."
      });
      ...
      */

      // SIMULATED RESPONSE for Stability & Persona definition visibility
      setTimeout(() => {
        const responses = [
          "אני שומעת כמה זה כבד עליך. זה בסדר גמור להרגיש ככה. העולם באמת סוער בחוץ.",
          "אתה לא לבד בתוך הגל הזה. אני מחזיקה את זה איתך. תנשום רגע.",
          "גם השמיים בוכים לפעמים. הדמעות שלך הן המים שמנקים את הנפש.",
          "אתה גיבור, לא כי ניצחת, אלא כי אתה עדיין עומד. אני גאה בך."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: randomResponse, // In production: response.text()
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
      }, 2000);

    } catch (error) {
      console.error(error);
      setIsTyping(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-assistant transition-colors duration-1000 ${isNightMode ? 'bg-[#0f172a] text-blue-100' : 'bg-gradient-to-b from-blue-50 to-white text-[#1e3a8a]'}`} dir="rtl">

      {/* Header - Sea/Sky Theme */}
      <header className={`p-6 flex justify-between items-center shadow-sm sticky top-0 z-50 backdrop-blur-md ${isNightMode ? 'bg-[#0f172a]/80 border-b border-blue-900' : 'bg-white/60 border-b border-blue-100'}`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${isNightMode ? 'bg-blue-900' : 'bg-gradient-to-br from-blue-400 to-cyan-300'}`}>
            <Heart className="text-white animate-pulse-slow" fill="currentColor" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black italic tracking-tight">המלווה הרוחני</h1>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${isNightMode ? 'text-blue-400' : 'text-blue-400'}`}>תמיכה רוחנית ללא שיפוטיות</p>
          </div>
        </div>

        <button
          onClick={() => setIsNightMode(!isNightMode)}
          className={`p-3 rounded-full transition-all ${isNightMode ? 'bg-blue-900 text-yellow-400 hover:bg-blue-800' : 'bg-blue-50 text-slate-400 hover:text-blue-600'}`}
        >
          {isNightMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[85%] p-5 rounded-3xl shadow-sm text-lg leading-relaxed relative group animate-in slide-in-from-bottom-2 duration-500
                ${msg.role === 'user'
                  ? (isNightMode ? 'bg-blue-900/50 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tr-none')
                  : (isNightMode ? 'bg-[#1e40af] text-white rounded-tl-none shadow-[0_0_15px_rgba(30,64,175,0.3)]' : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tl-none shadow-blue-200')}
              `}
            >
              <p>{msg.content}</p>
              <span className={`text-[9px] font-bold uppercase tracking-widest absolute -bottom-5 ${msg.role === 'user' ? 'right-0' : 'left-0'} opacity-40`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-end w-full animate-in fade-in">
            <div className={`p-4 rounded-3xl rounded-tl-none flex gap-2 items-center ${isNightMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className={`p-4 sticky bottom-0 z-50 ${isNightMode ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>
        <div className={`flex items-center gap-2 p-2 rounded-[2rem] border transition-all ${isNightMode ? 'bg-slate-900 border-blue-900' : 'bg-white border-slate-200 shadow-xl'}`}>
          <button className={`p-3 rounded-full transition-colors ${isNightMode ? 'hover:bg-blue-900 text-slate-400' : 'hover:bg-blue-50 text-slate-400'}`}>
            <Mic size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="כתוב לי הכל. אני כאן..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-lg px-2 font-medium placeholder:text-slate-400/70"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`p-4 rounded-full transition-all duration-300 ${input.trim()
              ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-110 rotate-0'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed rotate-90'}`}
          >
            <Send size={20} className={input.trim() ? 'ml-1' : ''} />
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-[9px] font-bold text-slate-400/50 uppercase tracking-[0.2em]">מאובטח על ידי מערכת שלוותה • חיבור לנשמה 2.0</p>
        </div>
      </footer>

    </div>
  );
};

export default SpiritualSupport;
