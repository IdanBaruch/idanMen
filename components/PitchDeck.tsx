
import React from 'react';
import { Play, TrendingUp, ShieldCheck, Heart, ArrowLeft, Zap, Cloud, Brain, Users } from 'lucide-react';

const PitchDeck: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col items-center justify-center p-8 font-sans relative overflow-hidden" dir="rtl">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[180px] rounded-full" />
      </div>

      <div className="max-w-6xl w-full z-10 space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <header className="text-center space-y-8">
           <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-xl shadow-2xl">
              <Cloud size={16} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Powered by AWS & Elad Health (Chameleon Cloud)</span>
           </div>
           
           <h1 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] text-white">
              מנחם ברוך <br/> <span className="text-blue-500 italic">AI.</span>
           </h1>
           
           <p className="text-2xl md:text-3xl text-slate-400 font-medium max-w-4xl mx-auto italic leading-tight">
              פלטפורמת הדרכה קלינית ומערכת הפעלה תודעתית (Consciousness OS) <br/>
              <span className="text-blue-100">חיבור בין לוגיקת התניא, פרמקולוגיה מתקדמת ובינה מלאכותית.</span>
           </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-6 hover:bg-white/10 transition-all backdrop-blur-md">
              <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center"><Brain size={32}/></div>
              <h3 className="text-3xl font-black italic tracking-tighter">מוח שליט על הלב</h3>
              <p className="text-slate-400 font-medium text-lg italic leading-relaxed">שימוש ב-AI לסימולציה של "ריבונות הנפש" וניהול דחפים קליני.</p>
           </div>
           
           <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-6 hover:bg-white/10 transition-all backdrop-blur-md">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center"><Cloud size={32}/></div>
              <h3 className="text-3xl font-black italic tracking-tighter">AWS Cloud Hybrid</h3>
              <p className="text-slate-400 font-medium text-lg italic leading-relaxed">אינטגרציה מלאה עם מערכת קמיליון (אלעד) לשמירה על רצף טיפולי בטוח.</p>
           </div>

           <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-6 hover:bg-white/10 transition-all backdrop-blur-md">
              <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center"><Users size={32}/></div>
              <h3 className="text-3xl font-black italic tracking-tighter">Supervision AI</h3>
              <p className="text-slate-400 font-medium text-lg italic leading-relaxed">ליווי ופיקוח קליני על מתמחים וצוות המיון בזמן אמת.</p>
           </div>
        </div>

        <div className="flex flex-col items-center gap-8 pt-8">
           <button 
            onClick={onStart}
            className="group relative bg-white text-black px-20 py-10 rounded-[4rem] font-black text-5xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-6"
           >
              כניסה לסימולציה <Play size={48} className="fill-current group-hover:translate-x-[-8px] transition-transform" />
           </button>
           
           <div className="text-center space-y-2 opacity-60">
              <p className="text-[10px] font-black uppercase tracking-widest italic">Contact & Support:</p>
              <p className="text-xl font-black text-blue-400 italic">Idan Baruh: +972 55-224-2155 | idanb41@gmail.com</p>
              <p className="text-sm font-bold text-slate-500">Ichilov & Shalvata Clinical Pilot 2026</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;
