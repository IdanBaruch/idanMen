
import React, { useState, useEffect } from 'react';
import { 
  Soup, Utensils, Heart, Waves, MessageCircle, 
  Sparkles, Clock, CheckCircle2, ShieldAlert, 
  Wind, Brain, Sun, Apple, Coffee, Sandwich
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const MEAL_STEPS = [
  { id: 'breakfast', title: 'בוקר', icon: Coffee, desc: 'הזנה ראשונה ליום חדש' },
  { id: 'lunch', title: 'צהריים', icon: Sandwich, desc: 'מרכז היום, אנרגיה לגוף' },
  { id: 'snack', title: 'ביניים', icon: Apple, desc: 'רגע של הפסקה והזנה' },
  { id: 'dinner', title: 'ערב', icon: Soup, desc: 'סגירת היום בחמלה' },
];

const HealingPath: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'home' | 'ai' | 'journal'>('home');
  const [completedMeals, setCompletedMeals] = useState<string[]>([]);
  const [transcription, setTranscription] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [mindfulTimer, setMindfulTimer] = useState<number | null>(null);

  useEffect(() => {
    let interval: any;
    if (mindfulTimer !== null && mindfulTimer > 0) {
      interval = setInterval(() => setMindfulTimer(prev => (prev !== null ? prev - 1 : null)), 1000);
    } else if (mindfulTimer === 0) {
      setMindfulTimer(null);
    }
    return () => clearInterval(interval);
  }, [mindfulTimer]);

  const toggleMeal = (id: string) => {
    setCompletedMeals(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const startEmunaED = async (topic: string) => {
    setActiveScreen('ai');
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: topic,
        config: {
          systemInstruction: `את אמונה, מלווה מומחית להחלמה מהפרעות אכילה (ED Recovery).
          הטון שלך הוא עדין ביותר, לא שיפוטי, ומתמקד ב"החלמה" ולא ב"משקל" או "קלוריות".
          אל תזכירי מספרים של קלוריות או משקלים.
          התמקדי בתיקוף הרגש (Validation) ובמתן כלים להרגעה במצבי חרדה סביב אוכל.
          עודדי אכילה מודעת וחמלה עצמית.`
        }
      });
      setTranscription(response.text || 'אני כאן איתך. בואי ננשום יחד.');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white flex flex-col font-sans overflow-y-auto pb-40" dir="rtl">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-600/5 blur-[150px] rounded-full" />
      </div>

      <header className="p-8 space-y-2 relative z-10">
        <h1 className="text-4xl font-black italic tracking-tighter">Healing<span className="text-emerald-500 font-light italic">Path.</span></h1>
        <p className="text-slate-400 font-medium italic">הבית שלך להזנה וחמלה.</p>
      </header>

      <main className="flex-1 p-6 space-y-12 relative z-10">
        
        {/* Progress Bar - Mindful Awareness */}
        <section className="bg-white/5 border border-white/10 rounded-[3rem] p-8 shadow-2xl backdrop-blur-xl">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black italic flex items-center gap-2 tracking-tight">
                 <Sun size={20} className="text-yellow-400" /> ההתקדמות היומית שלי
              </h3>
              <span className="text-emerald-400 font-black text-xs uppercase tracking-widest">{completedMeals.length} / 4 שלבים</span>
           </div>
           <div className="flex gap-2 h-3 bg-black/40 rounded-full overflow-hidden border border-white/5 p-0.5">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className={`flex-1 rounded-full transition-all duration-1000 ${completedMeals.length >= step ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-transparent opacity-20'}`} />
              ))}
           </div>
        </section>

        {/* Meal Steps */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 mb-4 px-2">
              <Clock size={16} className="text-emerald-500" />
              <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] italic">לו"ז הזנה מבריאה</h4>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MEAL_STEPS.map((meal) => (
                <button 
                  key={meal.id}
                  onClick={() => toggleMeal(meal.id)}
                  className={`flex items-center justify-between p-6 rounded-[2.5rem] border-2 transition-all group ${
                    completedMeals.includes(meal.id) ? 'bg-emerald-600/10 border-emerald-500/40 shadow-inner' : 'bg-white/5 border-white/10 hover:border-emerald-500/20'
                  }`}
                >
                  <div className="flex items-center gap-5">
                     <div className={`p-4 rounded-2xl bg-white/5 transition-colors ${completedMeals.includes(meal.id) ? 'text-emerald-400' : 'text-slate-500'}`}>
                        <meal.icon size={28} />
                     </div>
                     <div className="text-right">
                        <h4 className="text-xl font-black italic leading-none mb-1">{meal.title}</h4>
                        <p className="text-[9px] text-slate-500 font-bold italic">{meal.desc}</p>
                     </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    completedMeals.includes(meal.id) ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' : 'border-slate-700'
                  }`}>
                     {completedMeals.includes(meal.id) && <CheckCircle2 size={16} />}
                  </div>
                </button>
              ))}
           </div>
        </section>

        {/* Mindful Eating Timer */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-700 p-10 rounded-[4rem] shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-[80px] rounded-full" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-right space-y-3">
                 <h3 className="text-3xl font-black italic tracking-tighter">טיימר ארוחה מודעת</h3>
                 <p className="text-emerald-50 text-sm font-medium italic opacity-80">קחי את הזמן, תהני מכל נגיסה. את בטוחה.</p>
              </div>
              <div className="flex items-center gap-6">
                 {mindfulTimer !== null ? (
                   <div className="text-5xl font-black italic tracking-widest bg-black/20 px-8 py-4 rounded-[2rem] border border-white/10">
                      {Math.floor(mindfulTimer / 60)}:{(mindfulTimer % 60).toString().padStart(2, '0')}
                   </div>
                 ) : (
                   <button 
                    onClick={() => setMindfulTimer(1200)}
                    className="bg-white text-emerald-700 px-10 py-5 rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                   >
                     התחל 20 דקות
                   </button>
                 )}
              </div>
           </div>
        </section>

        {/* Emergency Interventions */}
        <section className="space-y-6">
           <div className="flex items-center gap-2 px-2">
              <ShieldAlert size={16} className="text-rose-500" />
              <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] italic">סיוע מיידי ברגעי קושי</h4>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => startEmunaED('אני מרגישה חרדה גדולה אחרי הארוחה, המחשבות שלי רצות. תעזרי לי להירגע.')}
                className="bg-white/5 border border-white/10 p-8 rounded-[3rem] text-right space-y-4 hover:bg-white/10 transition-all group"
              >
                 <div className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    <Waves size={24} />
                 </div>
                 <h4 className="text-xl font-black italic">חרדה אחרי ארוחה</h4>
                 <p className="text-xs text-slate-400 leading-relaxed italic">שיחת הרגעה מיידית עם אמונה.</p>
              </button>
              <button 
                onClick={() => startEmunaED('יש לי דחף חזק מאוד לאכול עכשיו בלי הפסקה, אני מרגישה שאיבדתי שליטה.')}
                className="bg-white/5 border border-white/10 p-8 rounded-[3rem] text-right space-y-4 hover:bg-white/10 transition-all group"
              >
                 <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    <Brain size={24} />
                 </div>
                 <h4 className="text-xl font-black italic">התמודדות עם דחף</h4>
                 <p className="text-xs text-slate-400 leading-relaxed italic">כלים לעצירה וניהול הדחף בזמן אמת.</p>
              </button>
           </div>
        </section>

      </main>

      {/* AI Overlay Screen */}
      {activeScreen === 'ai' && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/98 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500 overflow-y-auto">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 to-transparent" />
           </div>

           <div className="relative z-10 space-y-12 max-w-lg w-full">
              <div className="flex flex-col items-center gap-4">
                 <div className="w-24 h-24 bg-emerald-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl">
                    <Sparkles size={48} className="text-white animate-pulse" />
                 </div>
                 <h2 className="text-5xl font-black italic tracking-tighter">אמונה איתך.</h2>
                 <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em]">נשימה עמוקה. את בטוחה ברגע זה.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-10 rounded-[3.5rem] min-h-[300px] flex items-center justify-center shadow-2xl backdrop-blur-md">
                 {isAiLoading ? (
                   <div className="flex flex-col items-center gap-6 animate-pulse">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" />
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce delay-150" />
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce delay-300" />
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">מחפשת מילים של חמלה...</p>
                   </div>
                 ) : (
                   <p className="text-2xl md:text-3xl italic text-emerald-50 leading-tight font-medium">
                      {transcription}
                   </p>
                 )}
              </div>

              <div className="space-y-6 pt-4">
                 <button 
                  onClick={() => setActiveScreen('home')}
                  className="w-full bg-white text-black py-8 rounded-[2.5rem] font-black text-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                 >
                    תודה, אני ממשיכה בדרכי
                 </button>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">את צועדת בנתיב ההחלמה, צעד אחר צעד.</p>
              </div>
           </div>
        </div>
      )}

      {/* Floating Action Bar */}
      <div className="fixed bottom-8 left-8 right-8 max-w-md mx-auto z-50">
         <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-6 rounded-[3rem] shadow-2xl flex justify-around items-center">
            <button className="text-emerald-500 flex flex-col items-center gap-1 group">
               <div className="p-3 rounded-2xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-all"><Soup size={24}/></div>
               <span className="text-[8px] font-black uppercase tracking-widest">הזנה</span>
            </button>
            <button onClick={() => startEmunaED('ספרי לי משהו מרגיע ומחזק לקראת הארוחה הבאה שלי.')} className="text-slate-400 flex flex-col items-center gap-1 group">
               <div className="p-3 rounded-2xl hover:bg-white/5 transition-all"><MessageCircle size={24}/></div>
               <span className="text-[8px] font-black uppercase tracking-widest">שיחה</span>
            </button>
            <button className="text-slate-400 flex flex-col items-center gap-1 group">
               <div className="p-3 rounded-2xl hover:bg-white/5 transition-all"><Wind size={24}/></div>
               <span className="text-[8px] font-black uppercase tracking-widest">נשימה</span>
            </button>
         </div>
      </div>
    </div>
  );
};

export default HealingPath;
