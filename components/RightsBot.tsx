
import React, { useState, useRef, useEffect } from 'react';
import { 
  Scale, MessageSquare, Send, ArrowRight, ShieldCheck, 
  Landmark, FileText, HelpCircle, Loader2, Sparkles,
  Info, CheckCircle2, AlertTriangle, Briefcase, HeartHandshake
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
    { role: 'bot', text: 'שלום, אני Zchut-Bot Pro. אני כאן כדי לעזור לך למצות את הזכויות הסוציאליות שלך מול ביטוח לאומי, משרד הבריאות ומוסדות נוספים. במה נוכל להתמקד היום?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string) => {
    const userMsg = text || input;
    if (!userMsg.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `אתה Zchut-Bot Pro, סוכן מומחה למיצוי זכויות של נפגעי נפש בישראל. 
          אתה בקיא בחוקי המוסד לביטוח לאומי, חוק שיקום נכי נפש בקהילה, וזכויות חולים במשרד הבריאות.
          הטון שלך צריך להיות מקצועי, מדויק, אך מאוד מעודד ומפשט בירוקרטיה.
          אם המשתמש שואל על זכות מסוימת, פרט את התנאים הבסיסיים ואת הצעד הראשון שעליו לעשות (למשל: "להגיש טופס 7801").
          השתמש בסימני Markdown כדי להדגיש נקודות חשובות.`
        }
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || 'מצטער, הייתה לי בעיה בעיבוד הנתונים. נסה שוב.' }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'bot', text: 'מצטער, חלה שגיאה בתקשורת עם השרת.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col font-sans" dir="rtl">
      {/* Header */}
      <header className="p-6 bg-white/5 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-600/20">
            <Scale size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black italic tracking-tighter">Zchut-Bot <span className="text-amber-500">Pro.</span></h1>
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">סוכן מיצוי זכויות חכם</p>
          </div>
        </div>
        <div className="flex gap-2">
           <div className="bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center gap-2 border border-emerald-500/20">
              <ShieldCheck size={12} /> מעודכן ל-2024
           </div>
        </div>
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
                  <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl group-hover:scale-110 transition-transform">
                    <right.icon size={24} />
                  </div>
                  <h3 className="font-black italic text-lg">{right.title}</h3>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{right.desc}</p>
              </button>
            ))}
          </div>
        )}

        {/* Chat Area */}
        <div className="flex flex-col gap-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`max-w-[85%] p-6 rounded-[2.5rem] ${
                msg.role === 'user' 
                ? 'bg-amber-600 text-white rounded-tr-none' 
                : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none italic'
              }`}>
                <div className="flex items-center gap-2 mb-2 opacity-50">
                   {msg.role === 'user' ? <MessageSquare size={12}/> : <Sparkles size={12}/>}
                   <span className="text-[9px] font-black uppercase tracking-widest">
                     {msg.role === 'user' ? 'השאלה שלך' : 'מענה הבוט'}
                   </span>
                </div>
                <div className="text-sm md:text-md leading-relaxed whitespace-pre-wrap font-medium">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-end animate-pulse">
               <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] rounded-tl-none flex items-center gap-3">
                  <Loader2 size={16} className="animate-spin text-amber-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500">בודק תקנות וסעיפים...</span>
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
              placeholder="שאל אותי על זכויות, טפסים או וועדות רפואיות..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-6 pr-8 pl-20 text-md outline-none focus:border-amber-500 transition-all backdrop-blur-xl"
            />
            <button 
              onClick={() => handleSend('')}
              disabled={isLoading}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-amber-600 text-white p-4 rounded-full shadow-xl hover:bg-amber-500 active:scale-95 transition-all disabled:opacity-50"
            >
              <Send size={24} />
            </button>
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
