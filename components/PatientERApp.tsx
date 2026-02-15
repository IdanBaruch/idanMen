
import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, Heart, X, Droplets, Coffee, Send, Sparkles, 
  ArrowLeft, Activity, CheckCircle2, Waves, 
  Map, MapPin, BatteryLow, Languages, MessageCircle,
  ClipboardList, ChevronRight
} from 'lucide-react';
import { startLiveTriageSession, AudioManager } from '../services/geminiService';
import IntakeQuestionnaire from './IntakeQuestionnaire';

const LANGUAGES = [
  { code: 'he', label: 'עברית', dir: 'rtl' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'en', label: 'English', dir: 'ltr' },
];

const PatientERApp: React.FC = () => {
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [activeMode, setActiveMode] = useState<'language' | 'checkin' | 'home' | 'ai' | 'map' | 'intake' | 'success'>('language');
  const [waitingTime, setWaitingTime] = useState(2700);
  const [queuePosition] = useState(7);
  const [userName, setUserName] = useState('');
  const [isLowPower, setIsLowPower] = useState(false);
  const [transcription, setTranscription] = useState({ user: '', ai: '' });
  const [intakeSummary, setIntakeSummary] = useState<string | null>(null);
  
  const audioManagerRef = useRef<AudioManager | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setWaitingTime(prev => Math.max(0, prev - 1)), 1000);
    return () => {
      clearInterval(timer);
      audioManagerRef.current?.stopAll();
    };
  }, []);

  const startEmunaAI = async () => {
    setActiveMode('ai');
    try {
      const { sessionPromise, audioManager } = await startLiveTriageSession({
        onOpen: () => {},
        onAudioChunk: () => {},
        onTranscription: (text, role) => {
          setTranscription(prev => ({ ...prev, [role === 'user' ? 'user' : 'ai']: text }));
        },
        onError: (e) => console.error(e),
        onInterrupted: () => {},
      }, 'direct', `את אמונה. המטופל ${userName} במיון כרגע. עזרי לו לעבור את זמן ההמתנה. דברי בשפת ${lang.label}.`);
      
      audioManagerRef.current = audioManager;
      await sessionPromise;
    } catch (err) {
      console.error(err);
    }
  };

  const closeSession = () => {
    audioManagerRef.current?.stopAll();
    setActiveMode('home');
  };

  const onIntakeComplete = (summary: string) => {
    setIntakeSummary(summary);
    setActiveMode('success');
  };

  if (activeMode === 'language') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8 text-center" dir="rtl">
        <Languages size={60} className="mb-8 text-blue-500" />
        <h1 className="text-4xl font-black mb-8">Welcome to Shalvata</h1>
        <div className="grid gap-4 w-full max-w-xs">
           {LANGUAGES.map(l => (
             <button key={l.code} onClick={() => { setLang(l); setActiveMode('checkin'); }} className="bg-white/5 border border-white/10 p-6 rounded-2xl font-black text-xl hover:bg-blue-600">
                {l.label}
             </button>
           ))}
        </div>
      </div>
    );
  }

  if (activeMode === 'checkin') {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col p-8" dir={lang.dir}>
        <h2 className="text-4xl font-black mb-12">צ'ק-אין <span className="text-blue-600">דיגיטלי</span></h2>
        <input 
          type="text" value={userName} onChange={(e) => setUserName(e.target.value)}
          className="w-full bg-slate-100 border p-6 rounded-2xl text-2xl font-black mb-6"
          placeholder="שם מלא..."
        />
        <button onClick={() => setActiveMode('home')} disabled={!userName} className="bg-blue-600 text-white p-6 rounded-[2rem] font-black text-xl disabled:opacity-20">
          המשך
        </button>
      </div>
    );
  }

  if (activeMode === 'intake') {
    return <IntakeQuestionnaire onComplete={onIntakeComplete} />;
  }

  if (activeMode === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-12 text-center" dir="rtl">
         <CheckCircle2 size={120} className="text-emerald-500 mb-8 animate-bounce" />
         <h2 className="text-5xl font-black italic tracking-tighter mb-4">השאלון הוגש!</h2>
         <p className="text-xl font-medium text-slate-500 mb-12">הסיכום שלך מחכה לרופא בתיק הרפואי. זה יקצר את זמן הראיון משמעותית.</p>
         <button onClick={() => setActiveMode('home')} className="bg-slate-900 text-white px-20 py-8 rounded-[2.5rem] font-black text-2xl">חזרה ללובי</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen text-slate-900 flex flex-col border-x shadow-2xl pb-32" dir={lang.dir}>
      <header className="p-6 bg-white border-b sticky top-0 z-50">
        <div className="flex justify-between items-center mb-6">
           <h1 className="text-2xl font-black">היי, {userName}</h1>
           <button onClick={() => setIsLowPower(!isLowPower)} className={`p-3 rounded-2xl ${isLowPower ? 'bg-orange-500 text-white' : 'bg-slate-100'}`}><BatteryLow /></button>
        </div>
        <div className="bg-slate-950 text-white p-6 rounded-[2rem] flex justify-around">
           <div className="text-center">
              <p className="text-[10px] uppercase text-slate-500">תור</p>
              <p className="text-3xl font-black">{queuePosition}</p>
           </div>
           <div className="text-center">
              <p className="text-[10px] uppercase text-slate-500">זמן משוער</p>
              <p className="text-3xl font-black text-blue-400">{Math.floor(waitingTime/60)} דק'</p>
           </div>
        </div>
      </header>

      <main className="p-6 space-y-8 overflow-y-auto">
        
        {/* New Intake Feature Call-to-Action */}
        {!intakeSummary && (
          <button 
            onClick={() => setActiveMode('intake')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white flex items-center justify-between shadow-xl relative overflow-hidden group active:scale-95 transition-all"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-10 translate-y--10" />
             <div className="relative z-10 text-right">
                <h3 className="text-2xl font-black italic leading-none mb-1 text-white">ראיון קבלה חכם</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 opacity-80 italic">לדבר עם אמונה ולקצר תהליך</p>
             </div>
             <ClipboardList size={40} className="relative z-10 text-white opacity-40" />
          </button>
        )}

        {intakeSummary && (
           <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[2.5rem] flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <CheckCircle2 size={24} className="text-emerald-500" />
                 <span className="font-black italic text-emerald-700">ראיון קבלה הושלם</span>
              </div>
              <Sparkles size={20} className="text-emerald-400" />
           </div>
        )}

        <div className="grid grid-cols-2 gap-4">
           <button onClick={startEmunaAI} className="bg-blue-600 p-8 rounded-[2.5rem] text-white flex flex-col items-center gap-4">
              <Mic size={32}/>
              <span className="font-black italic">שיחה עם אמונה</span>
           </button>
           <button onClick={() => setActiveMode('map')} className="bg-white border p-8 rounded-[2.5rem] flex flex-col items-center gap-4">
              <Map size={32}/>
              <span className="font-black italic">איפה מה?</span>
           </button>
        </div>
      </main>

      {activeMode === 'ai' && (
        <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col p-8 items-center justify-center text-center text-white">
           <Waves className="text-blue-500 animate-pulse mb-8" size={100} />
           <h2 className="text-3xl font-black mb-4">אמונה מקשיבה...</h2>
           <div className="bg-white/5 p-8 rounded-3xl w-full mb-12 min-h-[200px] text-right">
              <p className="text-blue-400 text-sm mb-2">אמונה:</p>
              <p className="text-lg italic">{transcription.ai || "היי, אני כאן בשבילך."}</p>
           </div>
           <button onClick={closeSession} className="bg-red-600 text-white p-8 rounded-full"><X size={40}/></button>
        </div>
      )}

      <nav className="fixed bottom-8 left-8 right-8 bg-white border rounded-full p-4 flex justify-around shadow-2xl z-50 max-w-md mx-auto">
         <button onClick={() => setActiveMode('home')} className="text-blue-600"><Heart /></button>
         <button onClick={startEmunaAI} className="text-slate-400"><Mic /></button>
         <button onClick={() => setActiveMode('map')} className="text-slate-400"><Map /></button>
      </nav>
    </div>
  );
};

export default PatientERApp;
