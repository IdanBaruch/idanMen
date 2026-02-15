
import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, ShieldCheck, TrendingUp, Zap, Mic, X, 
  Heart, ShoppingCart, Info, Sparkles, Waves,
  Skull, CheckCircle2, Star, Ghost, MessageCircle,
  ArrowRight, Activity, Clock, Wallet, Eraser, Brain
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { startLiveTriageSession, AudioManager } from '../services/geminiService';

const SMOKING_MYTHS = [
  { id: 'stress', myth: 'סיגריה עוזרת לי להירגע מהלחץ', fact: 'הסיגריה יוצרת את הלחץ על ידי מחסור בניקוטין, ואז "מרגיעה" רק את מה שהיא עצמה גרמה.' },
  { id: 'boredom', myth: 'עישון עוזר להפיג את השעמום', fact: 'סיגריה היא הדבר הכי משעמם בעולם. היא לא הופכת שעמום לעניין, היא פשוט מרעילה אותך בזמן שאתה משתעמם.' },
  { id: 'flavor', myth: 'אני נהנה מהטעם של הסיגריה', fact: 'אם היית נהנה מהטעם, היית אוכל אותה. הטעם דוחה, הגוף פשוט התרגל לרעל.' },
  { id: 'friend', myth: 'הסיגריה היא החברה הכי טובה שלי', fact: 'היא חברה שגונבת לך כסף, בריאות וחופש, ובסוף מנסה להרוג אותך. זו לא חברות.' },
];

const SmokeFreeApp: React.FC = () => {
  const [freedomDays, setFreedomDays] = useState(3);
  const [moneySaved, setMoneySaved] = useState(120);
  const [isSOSMode, setIsSOSMode] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeCoach, setActiveCoach] = useState<'carr' | 'bahrav'>('carr');
  const [erasedMyths, setErasedMyths] = useState<string[]>([]);
  
  const audioManagerRef = useRef<AudioManager | null>(null);

  const startSOS = async (coachType: 'carr' | 'bahrav') => {
    setIsSOSMode(true);
    setIsAiLoading(true);
    setActiveCoach(coachType);
    
    const instructions = {
      carr: `אתה מדריך בשיטת אלן קאר (Easyway). המשתמש חווה דחף (Craving). 
             אל תגיד לו "להחזיק מעמד". הסבר לו שהסיגריה היא הנחש שמרעיב אותו. 
             הראה לו שהסיגריה לא פותרת לחץ, היא מייצרת אותו. השתמש בלוגיקה קרה ומשחררת.`,
      bahrav: `אתה הרב מנחם ברוך (בהרב). המטופל מרגיש שבוי של היצר. 
               הזכר לו את קדושת הגוף ואת חירות הנשמה. השתמש בפסוקים של תקווה וגבורה יהודית. 
               דבר על "ריבונות הנפש על הגוף".`
    };

    try {
      const { sessionPromise, audioManager } = await startLiveTriageSession({
        onOpen: () => setIsAiLoading(false),
        onAudioChunk: () => {},
        onTranscription: (text, role) => {
          if (role === 'model') setTranscription(text);
        },
        onError: (e) => console.error(e),
        onInterrupted: () => {},
      }, 'direct', instructions[coachType]);
      
      audioManagerRef.current = audioManager;
      await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsAiLoading(false);
    }
  };

  const eraseMyth = (id: string) => {
    if (!erasedMyths.includes(id)) {
      setErasedMyths([...erasedMyths, id]);
    }
  };

  const closeSOS = () => {
    audioManagerRef.current?.stopAll();
    setIsSOSMode(false);
    setTranscription('');
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col font-sans overflow-y-auto pb-40" dir="rtl">
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full" />
      </div>

      <header className="p-8 space-y-2 relative z-10 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter">חופש <span className="text-blue-500 font-light italic text-5xl">מוחלט.</span></h1>
          <p className="text-slate-400 font-medium italic">אלן קאר & הרב מנחם ברוך (בהרב)</p>
        </div>
        <div className="bg-blue-600/20 p-3 rounded-2xl border border-blue-500/30">
          <Brain className="text-blue-500" size={24} />
        </div>
      </header>

      <main className="flex-1 p-6 space-y-8 relative z-10">
        
        {/* Freedom Dashboard */}
        <section className="grid grid-cols-2 gap-4">
           <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] text-center shadow-xl backdrop-blur-md">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 italic">ימי חירות מהרעל</p>
              <p className="text-5xl font-black italic text-blue-500">{freedomDays}</p>
           </div>
           <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] text-center shadow-xl backdrop-blur-md">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 italic">כסף בכיס למשפחה</p>
              <p className="text-5xl font-black italic text-emerald-500">{moneySaved}₪</p>
           </div>
        </section>

        {/* The Myth Eraser (Allen Carr Interactive) */}
        <section className="bg-white/5 border border-white/10 rounded-[3rem] p-8 space-y-6 shadow-2xl backdrop-blur-xl">
           <div className="flex items-center gap-3">
              <Eraser className="text-blue-500" size={20} />
              <h3 className="text-lg font-black italic tracking-tight uppercase">מחק את שטיפת המוח</h3>
           </div>
           <div className="grid grid-cols-1 gap-3">
              {SMOKING_MYTHS.map((m) => (
                <button 
                  key={m.id}
                  onClick={() => eraseMyth(m.id)}
                  className={`p-6 rounded-[2rem] text-right transition-all border-2 relative overflow-hidden group ${
                    erasedMyths.includes(m.id) 
                    ? 'bg-emerald-500/10 border-emerald-500/20 opacity-40' 
                    : 'bg-white/5 border-white/10 hover:border-blue-500/40'
                  }`}
                >
                   {erasedMyths.includes(m.id) ? (
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-emerald-500">האמת:</p>
                        <p className="text-sm italic font-medium">{m.fact}</p>
                     </div>
                   ) : (
                     <p className="text-lg font-black italic">"{m.myth}"</p>
                   )}
                   {!erasedMyths.includes(m.id) && (
                     <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eraser size={14} className="text-blue-400" />
                     </div>
                   )}
                </button>
              ))}
           </div>
        </section>

        {/* SOS Intervention Buttons */}
        <section className="pt-4 flex flex-col gap-4">
           <button 
             onClick={() => startSOS('carr')}
             className="w-full bg-blue-600 p-10 rounded-[4rem] flex items-center justify-between shadow-[0_20px_50px_rgba(37,99,235,0.4)] active:scale-95 transition-all group overflow-hidden"
           >
             <div className="relative z-10 text-right">
                <h3 className="text-3xl font-black italic tracking-tighter leading-none mb-1 text-white">בא לי סיגריה!</h3>
                <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest opacity-80 italic">שיטת אלן קאר: נטרול לוגי מיידי</p>
             </div>
             <Zap size={48} className="text-white relative z-10 animate-pulse" />
           </button>

           <button 
             onClick={() => startSOS('bahrav')}
             className="w-full bg-amber-600 p-10 rounded-[4rem] flex items-center justify-between shadow-[0_20px_50px_rgba(217,119,6,0.3)] active:scale-95 transition-all group overflow-hidden"
           >
             <div className="relative z-10 text-right">
                <h3 className="text-3xl font-black italic tracking-tighter leading-none mb-1 text-white">חיזוק מהרב</h3>
                <p className="text-amber-100 text-[10px] font-black uppercase tracking-widest opacity-80 italic">הרב מנחם ברוך: ריבונות הנשמה</p>
             </div>
             <Star size={48} className="text-white relative z-10" />
           </button>
        </section>

        {/* Biometric Healing (For Hospitalized Users) */}
        <section className="bg-white/5 border border-white/10 rounded-[3rem] p-8 space-y-6 shadow-2xl backdrop-blur-xl">
           <div className="flex items-center gap-3">
              <Activity className="text-emerald-500" size={20} />
              <h3 className="text-lg font-black italic tracking-tight uppercase">הנס של הגוף שלך עכשיו</h3>
           </div>
           <div className="space-y-4">
              {[
                { label: 'חמצן בדם', value: 95, color: 'blue' },
                { label: 'ניקוי ניקוטין', value: 78, color: 'emerald' },
                { label: 'תפקוד ריאות', value: 30, color: 'indigo' },
              ].map((bar, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500 italic">
                      <span>{bar.label}</span>
                      <span>{bar.value}%</span>
                   </div>
                   <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div className={`h-full bg-${bar.color}-500 transition-all duration-1000 shadow-[0_0_8px_rgba(0,0,0,0.5)]`} style={{ width: `${bar.value}%` }} />
                   </div>
                </div>
              ))}
           </div>
        </section>

      </main>

      {/* SOS Modal Overlay */}
      {isSOSMode && (
        <div className="fixed inset-0 z-[5000] bg-slate-950/98 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500">
           <div className="relative z-10 space-y-12 max-w-lg w-full">
              <div className="flex flex-col items-center gap-4">
                 <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center shadow-2xl ${activeCoach === 'carr' ? 'bg-blue-600' : 'bg-amber-600'}`}>
                    {activeCoach === 'carr' ? <Zap size={48} className="text-white" /> : <Star size={48} className="text-white" />}
                 </div>
                 <h2 className="text-5xl font-black italic tracking-tighter text-white">
                    {activeCoach === 'carr' ? 'אמת מול שקר.' : 'נפש חירות.'}
                 </h2>
                 <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    {activeCoach === 'carr' ? 'אלן קאר: אתה לא מוותר על כלום' : 'הרב מנחם ברוך: אתה הריבון'}
                 </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-10 rounded-[4rem] min-h-[350px] flex items-center justify-center shadow-2xl backdrop-blur-md">
                 {isAiLoading ? (
                   <div className="flex flex-col items-center gap-6 animate-pulse">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150" />
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300" />
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500 italic">מפרק את האשליה...</p>
                   </div>
                 ) : (
                   <p className="text-2xl md:text-3xl italic text-slate-100 leading-tight font-medium">
                      {transcription || "אני כאן איתך. בוא נראה למפלצת הקטנה שאין לה שום כוח עליך."}
                   </p>
                 )}
              </div>

              <div className="space-y-6 pt-4">
                 <button 
                  onClick={closeSOS}
                  className="w-full bg-white text-black py-8 rounded-[2.5rem] font-black text-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                 >
                    אני חופשי (I am Free)
                 </button>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">הסיגריה היא רק אשליה של נחמה.</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SmokeFreeApp;
