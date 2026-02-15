
import React, { useState, useEffect } from 'react';
import { 
  Trophy, Flame, Users, Bike, Home, Heart, 
  ChevronRight, Mic, CheckCircle2, Zap, 
  Calendar, Coffee, Clock, ShieldAlert, Waves,
  Dumbbell, Utensils, UserPlus, Star, ShoppingCart,
  Activity, Bell, ShieldCheck, HeartPulse
} from 'lucide-react';
import { startLiveTriageSession } from '../services/geminiService';
import { SafetyContact } from '../types';

const RecoveryCockpit: React.FC = () => {
  const [sobrietyDays, setSobrietyDays] = useState(14);
  const [freedomPoints, setFreedomPoints] = useState(840);
  const [realPower, setRealPower] = useState(65);
  const [isCravingMode, setIsCravingMode] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [stressLevel, setStressLevel] = useState(42); // Simulated heart rate/stress
  const [isBiometricAlert, setIsBiometricAlert] = useState(false);

  const [contacts] = useState<SafetyContact[]>([
    { id: '1', name: 'אבי (ספונסר)', role: 'Sponsor', isNotified: false },
    { id: '2', name: 'מיכל (אחות)', role: 'Family', isNotified: false },
    { id: '3', name: 'יונתן (חבר)', role: 'Peer', isNotified: false },
  ]);

  const [pillars, setPillars] = useState([
    { id: 'meds', title: 'טיפול תרופתי', icon: Heart, points: 50, isCompleted: true, category: 'meds' },
    { id: 'sport', title: 'ריצה/אימון כוח', icon: Dumbbell, points: 100, isCompleted: false, category: 'body' },
    { id: 'social', title: 'שיחה עם המעגל', icon: Users, points: 80, isCompleted: false, category: 'social' },
    { id: 'meditation', title: '10 דק\' נשימה', icon: Waves, points: 40, isCompleted: true, category: 'mind' },
  ]);

  // Simulate Biometric Alert
  useEffect(() => {
    const timer = setTimeout(() => {
      setStressLevel(88);
      setIsBiometricAlert(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const togglePillar = (id: string) => {
    setPillars(prev => prev.map(p => {
      if (p.id === id) {
        const newState = !p.isCompleted;
        if (newState) {
          setFreedomPoints(f => f + p.points);
          setRealPower(r => Math.min(100, r + 5));
        } else {
          setFreedomPoints(f => f - p.points);
          setRealPower(r => Math.max(0, r - 5));
        }
        return { ...p, isCompleted: newState };
      }
      return p;
    }));
  };

  const handleCravingHelp = async () => {
    setIsCravingMode(true);
    setIsBiometricAlert(false);
    try {
      const { sessionPromise } = await startLiveTriageSession({
        onOpen: () => {},
        onAudioChunk: () => {},
        onTranscription: (text, role) => {
          if (role === 'model') setTranscription(text);
        },
        onError: (e) => console.error(e),
        onInterrupted: () => {},
      }, 'warm', `את אמונה. המטופל מרגיש דחף (Craving) חזק מאוד. דברי בקצב איטי מאוד, עזרי לו לנשום. אמרי לו: "אני כאן, בוא ננשום יחד. תרגיש את כפות הרגליים על הרצפה". הזכירי לו שהוא ביום ה-14 והוא חזק מהסם.`);
      await sessionPromise;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 p-8 font-sans overflow-y-auto pb-40 ${isBiometricAlert ? 'bg-orange-950' : 'bg-[#050608]'} text-white`} dir="rtl">
      
      {/* Biometric Alert Bar */}
      {isBiometricAlert && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-orange-600 p-4 flex justify-between items-center animate-in slide-in-from-top duration-500">
           <div className="flex items-center gap-3">
              <Activity className="animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest">זיהוי עומס רגשי גבוה (Pulse: {stressLevel})</span>
           </div>
           <button onClick={handleCravingHelp} className="bg-white text-orange-600 px-4 py-2 rounded-full text-[10px] font-black uppercase">סיוע מיידי</button>
        </div>
      )}

      {/* Header */}
      <header className="flex justify-between items-start mb-12 mt-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-black italic tracking-tighter">מרחב <span className="text-indigo-500 font-light italic tracking-normal">הריבונות.</span></h1>
          <p className="text-slate-400 font-medium italic">הכוח שלך בשליטה מלאה.</p>
        </div>
        <div className="bg-indigo-600/20 border border-indigo-500/30 px-6 py-4 rounded-[2rem] text-center shadow-xl">
           <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1 italic">יום נקי</p>
           <p className="text-3xl font-black text-white italic">{sobrietyDays}</p>
        </div>
      </header>

      {/* Sovereignty Meter (Real Power 2.0) */}
      <section className="bg-white/5 border border-white/10 rounded-[3.5rem] p-10 mb-10 relative overflow-hidden group">
        <div className="flex justify-between items-center mb-10">
           <div>
              <h3 className="text-2xl font-black italic flex items-center gap-3 tracking-tight">
                <Zap size={24} className="text-amber-400" /> מדד הריבונות (Sovereignty)
              </h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">חוסן פנימי מול פיתוי</p>
           </div>
           <div className="text-6xl font-black italic text-indigo-500 drop-shadow-2xl">{realPower}%</div>
        </div>
        
        <div className="space-y-6">
           {/* Detailed Progress Bars */}
           {[
             { label: 'גוף (כושר)', value: 40, color: 'blue' },
             { label: 'נפש (שלווה)', value: 85, color: 'purple' },
             { label: 'קשר (קהילה)', value: 60, color: 'emerald' },
           ].map((bar, i) => (
             <div key={i} className="space-y-2">
                <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500">
                   <span>{bar.label}</span>
                   <span>{bar.value}%</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                   <div className={`h-full bg-${bar.color}-500 transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.5)]`} style={{ width: `${bar.value}%` }} />
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Safety Circle - Social Accountability */}
      <section className="mb-12">
         <div className="flex items-center gap-3 mb-6">
            <ShieldCheck size={18} className="text-emerald-500" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">מעגל הביטחון שלי</h3>
         </div>
         <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] min-w-[160px] text-center flex flex-col items-center gap-3">
                 <div className="w-16 h-16 bg-slate-800 rounded-full border-2 border-white/10 overflow-hidden shadow-inner">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`} alt={contact.name} />
                 </div>
                 <div>
                    <h4 className="font-black text-sm italic">{contact.name}</h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">{contact.role}</p>
                 </div>
              </div>
            ))}
            <button className="bg-white/5 border-2 border-dashed border-white/10 p-6 rounded-[2.5rem] min-w-[160px] flex flex-col items-center justify-center gap-3 text-slate-500">
               <UserPlus size={24} />
               <span className="text-[10px] font-black uppercase">הוסף חבר</span>
            </button>
         </div>
      </section>

      {/* Daily Pillars */}
      <div className="mb-12">
         <div className="flex items-center gap-3 mb-6">
            <Star size={16} className="text-indigo-400" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">פעולות הריבונות להיום</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <button 
                key={p.id}
                onClick={() => togglePillar(p.id)}
                className={`flex items-center justify-between p-6 rounded-[2.5rem] border-2 transition-all ${
                  p.isCompleted ? 'bg-indigo-600/10 border-indigo-500/30' : 'bg-white/5 border-white/10 opacity-60'
                }`}
              >
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 text-indigo-400">
                      <p.icon size={28} />
                   </div>
                   <div className="text-right">
                      <h4 className="text-xl font-black italic">{p.title}</h4>
                      <p className="text-[10px] font-black uppercase text-slate-500">+{p.points} Freedom Points</p>
                   </div>
                </div>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  p.isCompleted ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-700'
                }`}>
                   {p.isCompleted && <CheckCircle2 size={16} />}
                </div>
              </button>
            ))}
         </div>
      </div>

      {/* Immersive Craving Intervention Button */}
      <section className="relative">
         <button 
          onClick={handleCravingHelp}
          className="w-full bg-rose-600 p-12 rounded-[3.5rem] flex items-center justify-between shadow-[0_20px_60px_rgba(225,29,72,0.3)] active:scale-95 transition-all group overflow-hidden"
         >
            <div className="relative z-10 text-right">
               <h3 className="text-4xl font-black italic mb-2 tracking-tighter">דחף חזק? (Craving)</h3>
               <p className="text-rose-100 text-sm font-medium italic">אמונה והמעגל שלך כאן איתך עכשיו.</p>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-20 group-hover:scale-150 transition-transform duration-1000" />
               <Flame size={60} className="text-white relative z-10 animate-pulse" />
            </div>
         </button>
      </section>

      {/* Rewards Preview */}
      <section className="mt-12">
         <div className="bg-white/5 border border-white/10 p-8 rounded-[3.5rem] flex items-center justify-between">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-3xl flex items-center justify-center shadow-inner">
                  <ShoppingCart size={32} />
               </div>
               <div className="text-right">
                  <h3 className="text-xl font-black italic">החופש שלך שווה כסף</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">מימוש 840 נקודות להטבות</p>
               </div>
            </div>
            <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest">לחנות הניצחונות</button>
         </div>
      </section>

      {/* IMMERSIVE AI OVERLAY */}
      {isCravingMode && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/98 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500">
           {/* Breathing Animation Background */}
           <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
              <div className="w-[100vw] h-[100vw] bg-indigo-500/5 rounded-full animate-ping duration-[4000ms]" />
              <div className="w-[80vw] h-[80vw] bg-indigo-500/10 rounded-full animate-ping duration-[3000ms] delay-500" />
           </div>

           <div className="relative z-10 space-y-12 max-w-lg">
              <div className="flex flex-col items-center gap-4">
                 <Waves size={100} className="text-indigo-400 animate-pulse" />
                 <h2 className="text-5xl font-black italic tracking-tighter mb-4">נשימה עמוקה...</h2>
                 <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">אמונה מחזקת את הריבונות שלך</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] min-h-[250px] flex items-center justify-center shadow-2xl">
                 <p className="text-3xl italic text-slate-200 leading-tight font-medium">
                    {transcription || "אני כאן. אתה לא לבד. תרגיש את כפות הרגליים שלך... האדמה יציבה. הסם הוא רק רעש חולף, אתה הריבון."}
                 </p>
              </div>

              <div className="space-y-6">
                 <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center justify-center gap-2">
                    <ShieldCheck size={14} /> הודעה נשלחה למעגל הביטחון שלך
                 </p>
                 <button 
                  onClick={() => setIsCravingMode(false)}
                  className="w-full bg-white text-black px-12 py-8 rounded-full font-black text-3xl shadow-2xl active:scale-95 transition-all"
                 >
                    אני הריבון (I am Sovereign)
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default RecoveryCockpit;
