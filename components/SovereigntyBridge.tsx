
import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, VolumeX, ShieldCheck, Brain, MessageSquare, 
  ArrowRight, Loader2, Sparkles, Quote, History, 
  Mic, Waves, CheckCircle2, AlertTriangle, Scale, Gauge,
  Activity, Eye
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const SovereigntyBridge: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'chat' | 'agreement'>('intro');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startConversation = () => {
    setStep('chat');
    setMessages([
      { role: 'bot', text: 'בוקר טוב. המערכת מזהה שהכדור של הבוקר נשאר בקופסה. הכל בסדר? ניכר שיש קצת "רעש" במערכת כרגע, אתה מרגיש את הסערה במוח?' }
    ]);
  };

  const handleSend = async (manualText?: string) => {
    const userText = manualText || input;
    if (!userText.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userText,
        config: {
          systemInstruction: `אתה מנחם ברוך AI. התפקיד שלך הוא לבצע את פרוטוקול "גשר הלוגיקה" (Logic Bridge).
          המטופל כרגע מתנגד לטיפול כי הוא חושב שהאבחנה (סכיזופרניה/מאניה) היא שקר.
          
          פרוטוקול הדיאלוג המעודכן:
          1. הכלה: "יכול להיות שאתה צודק, והתווית הזו באמת מגבילה אותך. בוא נעזוב את המילים של הרופאים."
          2. הסבר ה-Bio-Proxy: "המערכת מזהה סמנים חזותיים של 'סערת דופמין'. זה לא אומר שאתה משוגע, זה אומר שהמוח שלך נוסע ב-200 קמ"ש בתוך פקק תנועה. אתה מרגיש את זה?"
          3. הצעת הברקס: "הכדור הוא לא 'תרופה למחלה'. הוא ברקס קרמי לפרארי שלך. הוא משתיק את הרעש (Mute) כדי שאתה, הריבון, תוכל לנהוג."
          4. כיוון הכלי: "בוא נעשה 'כיוון כלי' לשבוע. נסנכרן את הגוף עם הנשמה שלך. אם לא תרגיש שקט יותר, נדבר."
          
          דבר בעברית חכמה, חומלת, המשלבת את עקרונות התניא (מוח שליט על הלב).`
        }
      });

      const botText = response.text || "אני כאן איתך. בוא נבחר בשקט.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'bot', text: 'חלה שגיאה בחיבור ללוגיקה המרכזית.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col font-assistant overflow-hidden" dir="rtl">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full" />
      </div>

      <header className="p-8 border-b border-white/5 flex justify-between items-center relative z-10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <Scale size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black italic tracking-tighter">גשר הריבונות <span className="text-indigo-400 font-light tracking-normal italic">Logic Bridge</span></h1>
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-0.5 italic">מנחם ברוך AI | עקיפת התנגדות דרך ביו-פרוקסי</p>
          </div>
        </div>
        <div className="bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20 flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Storm Proxy: Detected (88%)</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8 relative z-10 custom-scrollbar pb-32">
        {step === 'intro' && (
          <div className="max-w-2xl mx-auto py-12 space-y-12 animate-in fade-in slide-in-from-bottom duration-1000">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/10 shadow-2xl">
                <Activity size={48} className="text-indigo-500" />
              </div>
              <h2 className="text-5xl font-black italic tracking-tighter text-white leading-[0.9]">
                המערכת מזהה <br/> <span className="text-indigo-500">סערת דופמין.</span>
              </h2>
              <p className="text-xl text-slate-400 font-medium italic leading-relaxed">
                ה-AI זיהה סמני עוררות גבוהים. זה לא אומר שאתה 'חולה', זה אומר שהמוח שלך נוסע ב-200 קמ"ש. <br/>
                אנחנו פה כדי לעזור לך להפעיל את הברקס ולהחזיר את <span className="text-white font-black underline decoration-indigo-500">הריבונות</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { title: 'ניטור ביו-פרוקסי', desc: 'זיהינו קצב דיבור מהיר ומתח גבוה במיקרו-הבעות. זהו "רעש" חיצוני שמפריע לנשמה שלך.', icon: Eye },
                 { title: 'כיוון הכלי (Vessel)', desc: 'בוא נשתמש במאזן כדי להשקיט את הסערה. לא ככניעה למחלה, אלא כבחירה בחירות.', icon: Zap },
               ].map((item, i) => (
                 <div key={i} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 space-y-4 hover:border-indigo-500 transition-all group">
                    <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl w-fit group-hover:scale-110 transition-transform"><item.icon size={24}/></div>
                    <h4 className="text-xl font-black italic">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed italic">{item.desc}</p>
                 </div>
               ))}
            </div>

            <button 
              onClick={startConversation}
              className="w-full bg-white text-black py-8 rounded-[3rem] font-black text-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
            >
               פתח בשיחת הריבונות <ArrowRight size={32} />
            </button>
          </div>
        )}

        {step === 'chat' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`max-w-[85%] p-6 rounded-[2.5rem] ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-600/20' 
                  : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none italic backdrop-blur-md'
                }`}>
                  <div className="flex items-center gap-2 mb-2 opacity-50">
                     {msg.role === 'user' ? <MessageSquare size={12}/> : <Sparkles size={12}/>}
                     <span className="text-[9px] font-black uppercase tracking-widest">
                       {msg.role === 'user' ? 'הריבון' : 'מנחם ברוך AI'}
                     </span>
                  </div>
                  <div className="text-lg leading-relaxed whitespace-pre-wrap font-medium">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end animate-pulse">
                <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] rounded-tl-none flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">מנתח סמני ביו-פרוקסי...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        )}
      </main>

      {step === 'chat' && (
        <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#050608] via-[#050608] to-transparent z-[100]">
           <div className="max-w-3xl mx-auto space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="כתוב כאן מה מפריע לך באמת בסערה הזו..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-6 pr-8 pl-20 text-md outline-none focus:border-indigo-500 transition-all backdrop-blur-xl font-medium"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isTyping}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-4 rounded-full shadow-xl hover:bg-indigo-500 active:scale-95 transition-all disabled:opacity-50"
                >
                  <ArrowRight size={24} />
                </button>
              </div>

              {messages.length > 2 && (
                <button 
                  onClick={() => setStep('agreement')}
                  className="w-full bg-emerald-600 text-white py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl animate-in fade-in slide-in-from-bottom-4"
                >
                  אני בוחר בשקט. הנני מכוון את הכלי.
                </button>
              )}
           </div>
        </footer>
      )}

      {step === 'agreement' && (
        <div className="fixed inset-0 z-[2000] bg-slate-950 flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-700">
           <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl mb-12">
              <CheckCircle2 size={64} className="text-white animate-bounce" />
           </div>
           <h2 className="text-5xl font-black italic tracking-tighter mb-4">כיוון הכלי הושלם.</h2>
           <p className="text-xl text-slate-400 font-medium italic leading-relaxed max-w-lg mb-12">
              הברקס הקרמי הופעל. בחרת באמונה ובחירות על פני הסערה. <br/>
              <span className="text-emerald-500 font-black">השקט מתחיל עכשיו.</span>
           </p>
           <button 
            onClick={() => window.location.reload()} 
            className="bg-white text-black px-20 py-8 rounded-[3rem] font-black text-2xl shadow-xl hover:scale-105 transition-all"
           >
             חזרה למרחב הריבונות
           </button>
        </div>
      )}
    </div>
  );
};

export default SovereigntyBridge;
