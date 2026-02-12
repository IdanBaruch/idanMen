
import React, { useState, useEffect, useRef } from 'react';
import {
  Mic, Heart, X, Droplets, Coffee, Send, Sparkles,
  ArrowLeft, Activity, CheckCircle2, Waves,
  Map, MapPin, BatteryLow, Languages, MessageCircle,
  ClipboardList, ChevronRight, Trophy, Pill, Sparkle
} from 'lucide-react';
import { AppRole } from '../types';
import { GoogleGenAI } from '@google/genai';
import { startLiveTriageSession, AudioManager } from '../../services/geminiService';
import IntakeQuestionnaire from './IntakeQuestionnaire';

const LANGUAGES = [
  { code: 'he', label: 'עברית', dir: 'rtl' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'en', label: 'English', dir: 'ltr' },
];

const PatientERApp: React.FC<{
  userPoints?: number;
  onAddPoints?: (amount: number) => void;
}> = ({ userPoints = 0, onAddPoints }) => {
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [activeMode, setActiveMode] = useState<'language' | 'checkin' | 'home' | 'ai' | 'map' | 'intake' | 'success' | 'medication'>('language');
  const [isDispensing, setIsDispensing] = useState(false);
  const [waitingTime, setWaitingTime] = useState(2700);
  const [queuePosition] = useState(7);
  const [userName, setUserName] = useState('');
  const [isLowPower, setIsLowPower] = useState(false);
  const [transcription, setTranscription] = useState({ user: '', ai: '' });
  const [intakeSummary, setIntakeSummary] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [transcriptionStatus, setTranscriptionStatus] = useState('');

  const audioManagerRef = useRef<AudioManager | null>(null);

  const speak = (text: string) => {
    if (!text || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang.code === 'he' ? 'he-IL' : lang.code === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (transcription.ai && activeMode === 'ai') {
      speak(transcription.ai);
    }
  }, [transcription.ai]);

  useEffect(() => {
    const timer = setInterval(() => setWaitingTime(prev => Math.max(0, prev - 1)), 1000);
    return () => {
      clearInterval(timer);
      audioManagerRef.current?.stopAll();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const startEmunaAI = async () => {
    setActiveMode('ai');
    speak("היי, אני כאן בשבילך. מה עובר עלייך ברגעים אלו?");
    try {
      const { sessionPromise, audioManager } = await startLiveTriageSession({
        onOpen: () => { },
        onAudioChunk: () => { },
        onTranscription: (text, role) => {
          setTranscription(prev => ({ ...prev, [role === 'user' ? 'user' : 'ai']: text }));
        },
        onError: (e) => console.error(e),
        onInterrupted: () => { },
      }, 'direct', `את המלווה. המטופל ${userName} במיון כרגע. עזרי לו לעבור את זמן ההמתנה. דברי בשפת ${lang.label}.`);

      audioManagerRef.current = audioManager;
      await sessionPromise;
    } catch (err) {
      console.error(err);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setTranscriptionStatus('');
      return;
    }
    setIsListening(true);
    setTranscriptionStatus('מקשיב...');
    setTimeout(() => {
      const phrase = "אני קצת לחוץ מההמתנה כאן";
      setChatInput(phrase);
      setIsListening(false);
      setTranscriptionStatus('');
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    }, 2500);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setTranscription(prev => ({ ...prev, user: userMsg }));
    setChatInput('');
    setTranscriptionStatus('המלווה חושבת...');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const result = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [{ role: 'user', parts: [{ text: `את המלווה במיון. המטופל ${userName} אמר: "${userMsg}". עני לו בקצרה ובאמפתיה.` }] }]
      });
      const responseText = result.text || "אני כאן איתך.";
      setTranscription(prev => ({ ...prev, ai: responseText }));
      speak(responseText);
    } catch (err) {
      console.error(err);
      setTranscription(prev => ({ ...prev, ai: "מצטערת, משהו השתבש. בוא ננסה שוב." }));
    } finally {
      setTranscriptionStatus('');
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

  const handleDispense = () => {
    setIsDispensing(true);
    setTimeout(() => {
      setIsDispensing(false);
      if (onAddPoints) onAddPoints(50);
      setActiveMode('success');
      setIntakeSummary("התרופה הונפקה בהצלחה במעונה. אנא פנה לצוות הסיעודי לאיסוף.");
    }, 3000);
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
        <p className="text-xl font-medium text-slate-500 mb-8">הסיכום שלך מחכה לרופא בתיק הרפואי. זה יקצר את זמן הראיון משמעותית.</p>

        {intakeSummary && (
          <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-xl max-w-md w-full mb-12 text-right animate-in slide-in-from-bottom duration-700">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2">סיכום שהופק לרופא (נשלח לתיק):</p>
            <p className="text-sm font-bold text-slate-700 italic leading-relaxed">{intakeSummary}</p>
          </div>
        )}

        <button onClick={() => setActiveMode('home')} className="bg-slate-900 text-white px-20 py-8 rounded-[2.5rem] font-black text-2xl">חזרה ללובי</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen text-slate-900 flex flex-col border-x shadow-2xl pb-32" dir={lang.dir}>
      <header className="p-6 bg-white border-b sticky top-0 z-50">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
              <Activity size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black">היי, {userName}</h1>
              <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Shalvata Sovereignty</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-2 rounded-xl shadow-md flex items-center gap-2 border border-white/20">
              <Trophy size={14} className="text-white" />
              <span className="text-sm font-black text-white">{userPoints.toLocaleString()}</span>
            </div>
            <button onClick={() => setIsLowPower(!isLowPower)} className={`p-3 rounded-2xl ${isLowPower ? 'bg-orange-500 text-white' : 'bg-slate-100'}`}><BatteryLow /></button>
          </div>
        </div>
        <div className="bg-slate-950 text-white p-6 rounded-[2rem] flex justify-around">
          <div className="text-center">
            <p className="text-[10px] uppercase text-slate-500">תור</p>
            <p className="text-3xl font-black">{queuePosition}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase text-slate-500">זמן משוער</p>
            <p className="text-3xl font-black text-blue-400">{Math.floor(waitingTime / 60)} דק'</p>
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
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 opacity-80 italic">לדבר עם המלווה ולקצר תהליך</p>
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
          <button onClick={startEmunaAI} className="bg-blue-600 p-8 rounded-[2.5rem] text-white flex flex-col items-center gap-4 active:scale-95 transition-all shadow-lg">
            <Mic size={32} />
            <span className="font-black italic">שיחה עם המלווה</span>
          </button>
          <button onClick={() => setActiveMode('medication')} className="bg-orange-500 p-8 rounded-[2.5rem] text-white flex flex-col items-center gap-4 active:scale-95 transition-all shadow-lg text-center">
            <Pill size={32} />
            <span className="font-black italic leading-none">מעונה דיגיטלית<br /><span className="text-[10px] opacity-80 uppercase tracking-tighter">(Smart Dispenser)</span></span>
          </button>
          <button onClick={() => setActiveMode('map')} className="bg-white border p-8 rounded-[2.5rem] flex flex-col items-center gap-4 active:scale-95 transition-all shadow-sm">
            <Map size={32} />
            <span className="font-black italic">איפה מה?</span>
          </button>
          <button onClick={() => setActiveMode('home')} className="bg-white border p-8 rounded-[2.5rem] flex flex-col items-center gap-4 opacity-30 cursor-not-allowed">
            <ClipboardList size={32} />
            <span className="font-black italic">מסמכים</span>
          </button>
        </div>
      </main>

      {activeMode === 'ai' && (
        <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col p-8 items-center justify-center text-center text-white">
          <Waves className="text-blue-500 animate-pulse mb-8" size={100} />
          <h2 className="text-3xl font-black mb-4">המלווה מקשיבה...</h2>
          <div className="bg-white/5 p-8 rounded-3xl w-full mb-8 min-h-[250px] text-right flex flex-col justify-end">
            <div className="space-y-4">
              {transcription.user && (
                <p className="text-xs text-slate-400">אתה: <span className="text-white font-bold">"{transcription.user}"</span></p>
              )}
              <p className="text-blue-400 text-sm mb-2">המלווה:</p>
              <p className="text-lg italic font-bold">{transcription.ai || "היי, אני כאן בשבילך. מה עובר עלייך ברגעים אלו?"}</p>
            </div>
          </div>

          <div className="w-full max-w-xs flex flex-col gap-4">
            <div className="relative">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full bg-white/10 border border-white/20 p-6 rounded-2xl text-white outline-none focus:border-blue-500"
                placeholder="כתוב כאן..."
              />
              <button
                onClick={toggleListening}
                className={`absolute left-3 top-3 p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-600'}`}
              >
                <Mic size={20} />
              </button>
            </div>
            {transcriptionStatus && <p className="text-[10px] font-black animate-pulse text-blue-400">{transcriptionStatus}</p>}
            <div className="flex gap-4">
              <button onClick={handleSendMessage} className="flex-1 bg-white text-black py-4 rounded-2xl font-black">שלח</button>
              <button onClick={closeSession} className="bg-red-600 text-white p-4 rounded-2xl"><X size={24} /></button>
            </div>
          </div>
        </div>
      )}

      {activeMode === 'medication' && (
        <div className="fixed inset-0 z-[200] bg-slate-900 flex flex-col items-center justify-center p-8 text-center" dir="rtl">
          <div className="w-full max-w-sm bg-white rounded-[3rem] p-12 shadow-2xl relative overflow-hidden border-b-8 border-slate-200">
            {/* Dispenser Visuals */}
            <div className="w-24 h-2 rounded-full bg-slate-800 mx-auto mb-12 shadow-inner" />

            <div className="mb-12 relative">
              <div className="w-32 h-32 bg-orange-100 rounded-full mx-auto flex items-center justify-center animate-pulse">
                <Pill size={64} className="text-orange-500" />
              </div>
              {isDispensing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-4">מעונה דיגיטלית</h2>
            <p className="text-slate-500 font-bold mb-12 leading-relaxed">אימות הטיפול ופתיחת המעונה לקבלת התרופה.</p>

            {!isDispensing ? (
              <button
                onClick={handleDispense}
                className="w-full bg-orange-500 text-white py-8 rounded-[2rem] font-black text-2xl shadow-[0_10px_0_rgb(194,65,12)] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-4"
              >
                <Sparkle size={28} /> הנפק תרופה
              </button>
            ) : (
              <div className="text-orange-600 font-black animate-pulse text-xl italic">מעבד בקשה... הוצאה מהמעונה</div>
            )}
          </div>

          <button onClick={() => setActiveMode('home')} className="mt-12 text-white/40 font-black uppercase tracking-widest text-xs hover:text-white transition-all">ביטול וחזרה</button>
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
