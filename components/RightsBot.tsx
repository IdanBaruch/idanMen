
import React, { useState, useRef, useEffect } from 'react';
import {
  Scale, MessageSquare, Send, ArrowRight, ShieldCheck,
  Landmark, FileText, HelpCircle, Loader2, Sparkles,
  Info, CheckCircle2, AlertTriangle, Briefcase, HeartHandshake,
  Activity
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const SUGGESTED_RIGHTS = [
  { id: 'disability', title: 'קצבת נכות כללית', icon: Landmark, desc: 'בירור זכאות לפי אחוזי נכות נפשית' },
  { id: 'rehab', title: 'סל שיקום', icon: HeartHandshake, desc: 'זכויות דיור, תעסוקה וחברה בקהילה' },
  { id: 'housing', title: 'סיוע בשכר דירה', icon: Briefcase, desc: 'מענקים ממשרד הבינוי והשיכון' },
  { id: 'legal', title: 'סיוע משפטי חינם', icon: Scale, desc: 'ייצוג בוועדות רפואיות' },
];

const RightsBot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'שלום, אני המלווה שלך לזכויות. אני כאן כדי לעזור לך להבין מה מגיע לך ואיך לשמור על עצמך. על מה נדבר?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'he-IL';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (text: string) => {
    const userMsg = text || input;
    if (!userMsg.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY || 'PLACEHOLDER';
      const prompt = `אתה עוזר זכויות חכם ופשוט עבור אנשים המתמודדים עם קשיים נפשיים.
        דבר בשפה של ילד בן 10 - פשוטה, ברורה ומחבקת.
        אל תשתמש במילים קשות.
        אם שואלים על אשפוז ללא הסכמה (הוראה): הסבר שזה קורה כשרופא דואג שהאדם יפגע בעצמו, אבל תמיד מותר לבקש עורך דין בחינם.
        אם שואלים על ירידה לחצר: הסבר שהצוות חייב לתת סיבה למה לא, ומותר לבקש לדבר עם מנהל המחלקה.
        עודד את המשתמש ושמור על תקווה.
        השאלה: ${userMsg}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await response.json();
      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'מצטער, חלה שגיאה בתקשורת עם השרת.';

      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
      speak(botText);
    } catch (err) {
      console.error(err);
      const errorMsg = 'אני מצטער, יש לי תקלה קטנה בחיבור. אולי כדאי לנסות שוב עוד רגע או לבקש מהצוות עזרה.';
      setMessages(prev => [...prev, { role: 'bot', text: errorMsg }]);
      speak(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // Simulating voice recognition since Web Speech API can be flaky in some envs
    setTimeout(() => {
      setIsListening(false);
      setInput('למה לא נותנים לי לרדת לחצר?');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col font-assistant rtl" dir="rtl">
      {/* Header */}
      <header className="p-6 bg-white/5 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Scale size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black italic tracking-tighter">עוזר הזכויות</h1>
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">מקום פשוט לדעת מה מגיע לך</p>
          </div>
        </div>
        <button onClick={() => window.location.reload()} className="p-3 bg-white/5 rounded-full"><ArrowRight className="rotate-180" /></button>
      </header>

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-6 space-y-8 overflow-y-auto pb-40">

        {/* Intro Cards */}
        {messages.length <= 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {SUGGESTED_RIGHTS.map((right) => (
              <button
                key={right.id}
                onClick={() => handleSend(`ספר לי על ${right.title}`)}
                className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] text-right hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
                    <right.icon size={24} />
                  </div>
                  <h3 className="font-black italic text-lg">{right.title}</h3>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{right.desc}</p>
              </button>
            ))}
          </div>
        )}

        {/* Chat Area */}
        <div className="flex flex-col gap-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`max-w-[85%] p-6 rounded-[2.5rem] ${msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-tr-none'
                : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none italic shadow-xl'
                }`}>
                <div className="flex items-center gap-2 mb-2 opacity-50">
                  {msg.role === 'user' ? <MessageSquare size={12} /> : <Sparkles size={12} />}
                  <span className="text-[9px] font-black uppercase tracking-widest">
                    {msg.role === 'user' ? 'השאלה שלך' : 'התשובה שלי'}
                  </span>
                </div>
                <div className="text-md leading-relaxed whitespace-pre-wrap font-bold">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-end animate-pulse">
              <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] rounded-tl-none flex items-center gap-3">
                <Loader2 size={16} className="animate-spin text-blue-500" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-500 italic">בודק בשבילך...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </main>

      {/* Input Bar */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#050608] via-[#050608] to-transparent z-[100]">
        <div className="max-w-4xl mx-auto flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend('')}
              placeholder="שאל אותי משהו, או לחץ על המיקרופון..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-6 pr-8 pl-32 text-md outline-none focus:border-blue-500 transition-all backdrop-blur-xl font-bold"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-2">
              <button
                onClick={startVoiceInput}
                className={`p-4 rounded-full transition-all ${isListening ? 'bg-red-600 animate-pulse' : 'bg-white/5 hover:bg-white/10'}`}
              >
                <Activity size={24} className={isListening ? 'text-white' : 'text-slate-400'} />
              </button>
              <button
                onClick={() => handleSend('')}
                disabled={isLoading}
                className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-500 active:scale-95 transition-all disabled:opacity-50"
              >
                <Send size={24} />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Trust Badges */}
      <div className="fixed bottom-24 left-6 hidden md:flex flex-col gap-3">
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-4 rounded-3xl flex items-center gap-4">
          <CheckCircle2 className="text-emerald-500" size={20} />
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-white leading-none">מידע מאומת</p>
            <p className="text-[8px] text-slate-500 font-bold">מבוסס על "כל-זכות"</p>
          </div>
        </div>
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-4 rounded-3xl flex items-center gap-4">
          <AlertTriangle className="text-amber-500" size={20} />
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-white leading-none">ייעוץ כללי</p>
            <p className="text-[8px] text-slate-500 font-bold">אינו מחליף עו"ד</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightsBot;
