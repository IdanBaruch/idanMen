
import React, { useState, useRef, useEffect } from 'react';
import { gemini } from '../services/geminiService';
import { Message, SourceFile } from '../types';
import { decodeBase64, decodeAudioData } from '../services/liveUtils';

interface ChatInterfaceProps {
  sources: SourceFile[];
}

const SUGGESTED_QUESTIONS = [
  "איך פרק ל״ב בתניא עוזר לי לנקות את הלב כרגע?",
  "אני מרגיש מוצף, תעזור לי להפריד עובדות מרעשים.",
  "איך אני מעביר את המשימות בבית למגירת השותפות?",
  "אני מרגיש 'גלות' בנפש, מה המנוע שלי לצאת מזה?",
  "מה העצה הריבונית שלך להתמודדות עם פחד מהעתיד?"
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ sources }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAutoRead, setIsAutoRead] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isAudioContextReady, setIsAudioContextReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const RABBI_IMAGE = "https://files.oaiusercontent.com/file-KAtR9Xv17R2R414K6H3X6M?se=2025-02-17T13%3A32%3A30Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20private%2C%20immutable%2C%20proxy-revalidate&rscd=attachment%3B%20filename%3De0881987-a2f2-4e9f-850d-be942ec4589d.webp&sig=A3LdI730Nl/tT/gY97kcl2W%2BkXvY9D%2BNqFz7zN%2BjB84%3D";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initAudio = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    setIsAudioContextReady(true);
  };

  const stopCurrentAudio = () => {
    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop();
      } catch (e) {}
      currentSourceRef.current = null;
    }
    setPlayingId(null);
  };

  const playAudio = async (text: string, id: string) => {
    await initAudio();
    stopCurrentAudio();
    setPlayingId(id);
    try {
      const base64Audio = await gemini.generateAudio(text, 'Kore');
      if (base64Audio && audioContextRef.current) {
        const ctx = audioContextRef.current;
        const buffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => {
          if (playingId === id) setPlayingId(null);
        };
        currentSourceRef.current = source;
        source.start();
      } else {
        setPlayingId(null);
      }
    } catch (err) {
      console.error("TTS Error", err);
      setPlayingId(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isProcessing) return;
    
    if (!isAudioContextReady) await initAudio();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    stopCurrentAudio();

    try {
      const response = await gemini.processInput(textToSend, sources.map(s => s.content));
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response || 'אידן, משהו הפריע לי לחשוב. בוא ננסה שוב.',
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, botMessage]);

      if (isAutoRead && response) {
        setTimeout(() => playAudio(response, botMessage.id), 300);
      }
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: 'אידן, יש תקלה בתקשורת בינינו. בדוק את החיבור שלך.',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative">
      {/* Human-First Header */}
      <div className="p-5 bg-slate-800/80 border-b border-white/5 flex justify-between items-center px-10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={`w-14 h-14 rounded-full border-2 border-indigo-500 overflow-hidden shadow-lg transition-transform duration-500 ${playingId ? 'scale-110' : ''}`}>
              <img src={RABBI_IMAGE} alt="הרב מנחם ברוך" className="w-full h-full object-cover" />
            </div>
            {playingId && (
              <div className="absolute inset-0 rounded-full border-4 border-indigo-400 pulse-ring"></div>
            )}
            <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-slate-800 ${playingId ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div>
          </div>
          <div>
            <h2 className="text-white font-black text-xl tracking-tight">הרב מנחם ברוך</h2>
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${playingId ? 'bg-indigo-400 animate-pulse' : 'bg-emerald-400'}`}></span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                {playingId ? 'מקריא עבורך...' : 'אני כאן, אידן • מוכן לשיחה'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setIsAutoRead(!isAutoRead)}
            className={`px-5 py-2.5 rounded-full text-[10px] font-black transition-all border flex items-center gap-2 ${
              isAutoRead ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-slate-700/50 text-slate-500 border-slate-600/50'
            }`}
          >
            <span>{isAutoRead ? '🔊 הקראה אוטומטית' : '🔇 השתק אוטומטי'}</span>
          </button>
          {playingId && (
            <button onClick={stopCurrentAudio} className="bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-full text-[10px] font-black hover:bg-red-500/30 transition-all">
              השתק הרב 🛑
            </button>
          )}
        </div>
      </div>

      {/* Messages & Templates Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/20 via-slate-900 to-black">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in duration-1000 space-y-8">
            <div className="w-32 h-32 rounded-full border-4 border-indigo-500/30 overflow-hidden shadow-2xl relative group">
              <img src={RABBI_IMAGE} alt="הרב" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-indigo-500/10"></div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-white mb-3 tracking-tight">שלום אידן, כאן הרב מנחם</h2>
              <p className="max-w-md text-slate-400 text-lg font-medium leading-relaxed">
                דבר איתי בצורה חופשית. אני כאן כדי לעזור לך להפריד את הרעשים מהעובדות ולחזק את הריבונות הפנימית שלך.
              </p>
            </div>

            {/* Template Pills */}
            <div className="w-full max-w-2xl flex flex-wrap justify-center gap-3">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="bg-white/5 hover:bg-indigo-500/20 hover:border-indigo-500/40 text-slate-300 text-sm py-3 px-6 rounded-2xl border border-white/5 transition-all text-right dir-rtl shadow-lg"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-start' : 'items-end'}`}>
            <div className={`flex items-start gap-4 max-w-[85%] group ${msg.role === 'model' ? 'flex-row-reverse' : ''}`}>
              {msg.role === 'model' && (
                <div className="flex flex-col gap-2 mt-2">
                   <div className="w-10 h-10 rounded-full border border-indigo-500/30 overflow-hidden flex-shrink-0 shadow-lg">
                      <img src={RABBI_IMAGE} alt="Rabbi" className="w-full h-full object-cover" />
                   </div>
                   <button 
                    onClick={() => playAudio(msg.content, msg.id)}
                    className={`p-2.5 rounded-full transition-all ${playingId === msg.id ? 'bg-indigo-500 text-white animate-pulse shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'bg-slate-800 text-slate-500 hover:text-indigo-400'}`}
                  >
                    {playingId === msg.id ? '🔊' : '🗣️'}
                  </button>
                  <button 
                    onClick={() => copyToClipboard(msg.content)}
                    className="p-2.5 rounded-full bg-slate-800 text-slate-500 hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all"
                    title="העתק טקסט"
                  >
                    📋
                  </button>
                </div>
              )}
              <div 
                className={`p-7 rounded-[2.5rem] shadow-2xl leading-relaxed whitespace-pre-wrap transition-all dir-rtl text-right text-lg font-medium ${
                  msg.role === 'user' 
                  ? 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tr-none' 
                  : 'bg-indigo-950/70 text-indigo-50 border border-indigo-500/30 rounded-tl-none ring-1 ring-white/5 backdrop-blur-sm'
                } ${playingId === msg.id ? 'ring-2 ring-indigo-500/50 shadow-indigo-500/30 scale-[1.01]' : ''}`}
              >
                {msg.content}
              </div>
            </div>
            <span className="text-[10px] text-slate-600 mt-2 px-6 font-black uppercase tracking-widest opacity-40">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-end animate-in slide-in-from-right-4 fade-in">
            <div className="bg-indigo-900/30 text-indigo-300 p-6 rounded-[2.5rem] border border-indigo-500/20 flex items-center gap-4 shadow-2xl">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em]">הרב מנחם מעמיק בדבריך...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-8 bg-slate-800/90 border-t border-white/5 backdrop-blur-3xl">
        <div className="flex gap-4 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="דבר אלי, אידן... אני מקשיב."
            className="flex-1 bg-black/60 text-slate-100 p-7 rounded-[2rem] border border-white/10 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/40 outline-none resize-none h-28 text-right dir-rtl transition-all text-xl placeholder:text-slate-700 shadow-inner"
          />
          <button
            onClick={() => handleSend()}
            disabled={isProcessing || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-12 rounded-[2rem] font-black transition-all shadow-[0_20px_40px_rgba(79,70,229,0.4)] hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center gap-2 group"
          >
            <span className="text-3xl group-hover:rotate-12 transition-transform">💬</span>
            <span className="text-sm">שלח</span>
          </button>
        </div>
        <div className="flex justify-between items-center mt-6 px-4">
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.6em]">
            הרב מנחם ברוך • CONSCIOUSNESS OS • HUMAN-TECH
          </p>
          <div className="flex gap-1.5 items-center">
             <span className="text-[8px] text-slate-600 font-bold ml-2">LISTEN STATUS</span>
             <div className={`w-2.5 h-2.5 rounded-full transition-all duration-700 ${playingId ? 'bg-indigo-500 shadow-[0_0_15px_indigo]' : 'bg-emerald-500/50'}`}></div>
             <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
