
import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Mic, PenTool, ChevronRight, ArrowLeft, 
  MessageCircle, X, ShieldAlert, CheckCircle2, Waves,
  History, Sparkles, Send, Loader2, Calendar, Utensils, 
  BrainCircuit, Music, Eye, Maximize, Minimize, Volume2,
  Soup, Apple, BookOpen, Star, ShieldCheck, CigaretteOff,
  VolumeX, Zap, Activity, Pill, Sun, Sparkle, Quote
} from 'lucide-react';
import { AppSettings, AppRole } from '../types';
import { GoogleGenAI } from '@google/genai';
import { startLiveTriageSession, AudioManager } from '../services/geminiService';

type Screen = 'mood' | 'ai' | 'journal' | 'medication' | 'success';

const PatientApp: React.FC<{ settings: AppSettings, onNavigate?: (role: AppRole) => void }> = ({ settings, onNavigate }) => {
  const [step, setStep] = useState<Screen>('mood');
  const [mood, setMood] = useState(5);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [journalText, setJournalText] = useState('');
  const [isSeniorMode, setIsSeniorMode] = useState(true);
  const [transcription, setTranscription] = useState<{user: string, ai: string}>({user: '', ai: ''});
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Sovereignty logic states
  const [noiseLevel, setNoiseLevel] = useState(72);
  const [clarityLevel, setClarityLevel] = useState(28);

  const audioManagerRef = useRef<AudioManager | null>(null);

  useEffect(() => {
    return () => {
      audioManagerRef.current?.stopAll();
    };
  }, []);

  const openWhatsApp = () => {
    const url = "https://api.whatsapp.com/send?phone=972559571399&text=" + encodeURIComponent("שלום סה\"ר, אני פונה מאפליקציית שלוותה ואני זקוקה לתמיכה.");
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const startEmunaLive = async () => {
    setIsConnecting(true);
    setStep('ai');
    try {
      const { sessionPromise, audioManager } = await startLiveTriageSession({
        onOpen: () => setIsConnecting(false),
        onAudioChunk: () => {},
        onTranscription: (text, role) => {
          setTranscription(prev => ({ ...prev, [role === 'user' ? 'user' : 'ai']: text }));
        },
        onError: (err) => { console.error(err); setIsConnecting(false); },
        onInterrupted: () => {},
      }, 'warm', `את אמונה, המלווה האמפתית. דברי ברוגע למטופל שמרגיש ${selectedEmotion}. השתמש בלוגיקה של ריבונות ושקט פנימי.`);
      audioManagerRef.current = audioManager;
      await sessionPromise;
    } catch (err) { console.error(err); setIsConnecting(false); }
  };

  const handleMedicationComplete = () => {
    // Logic for "Setting the Vessel"
    setNoiseLevel(prev => Math.max(0, prev - 30));
    setClarityLevel(prev => Math.min(100, prev + 30));
    setStep('success');
  };

  const textSize = isSeniorMode ? 'text-3xl' : 'text-xl';
  const headingSize = isSeniorMode ? 'text-6xl' : 'text-4xl';

  return (
    <div className={`min-h-screen bg-[#050608] text-white flex flex-col items-center p-6 md:p-12 font-assistant relative overflow-x-hidden pb-40 ${isSeniorMode ? 'font-black' : ''}`} dir="rtl">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      {/* Header Utilities */}
      <div className="fixed top-20 left-6 right-6 z-[100] flex justify-between items-center">
        <button onClick={() => setIsSeniorMode(!isSeniorMode)} className={`p-6 rounded-[2rem] border border-white/20 shadow-2xl transition-all ${isSeniorMode ? 'bg-indigo-600' : 'bg-white/5'}`}>
          <Eye size={isSeniorMode ? 40 : 28} />
        </button>
        <div className="flex gap-4">
           <button onClick={() => setStep('medication')} className="bg-orange-600/20 text-orange-400 border border-orange-500/30 p-6 rounded-[2rem] backdrop-blur-2xl flex items-center gap-3 animate-pulse shadow-xl">
              <Sun size={isSeniorMode ? 40 : 28} />
              <span className="text-xs font-black uppercase hidden md:block italic tracking-widest">כיוון הכלי</span>
           </button>
        </div>
      </div>

      <main className="w-full max-w-3xl mt-36 space-y-16 relative z-10">
        
        {step === 'mood' && (
          <div className="space-y-16 text-center animate-in fade-in duration-700">
             <div className="space-y-6">
                <h2 className={`${headingSize} leading-none tracking-tighter`}>איך המרגש <br/><span className="text-indigo-500 italic">עכשיו, הריבון?</span></h2>
             </div>

             {/* Dynamic Noise Monitor Widget */}
             <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group backdrop-blur-md">
                <div className="flex justify-between items-center mb-10">
                   <div className="text-right">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">מדד השקט הפנימי (Sovereignty OS)</h4>
                      <p className="text-2xl font-black italic text-indigo-400 mt-1">מוח שליט על הלב</p>
                   </div>
                   <Activity size={32} className="text-indigo-500 animate-pulse" />
                </div>
                
                <div className="space-y-8">
                   <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                         <span className="text-red-500">רעש חיצוני (System Noise)</span>
                         <span className="text-red-500">{noiseLevel}%</span>
                      </div>
                      <div className="w-full h-4 bg-black/40 rounded-full overflow-hidden border border-white/5">
                         <div className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-1000" style={{ width: `${noiseLevel}%` }} />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                         <span className="text-emerald-500">צלילות פנימית (Inner Clarity)</span>
                         <span className="text-emerald-500">{clarityLevel}%</span>
                      </div>
                      <div className="w-full h-4 bg-black/40 rounded-full overflow-hidden border border-white/5">
                         <div className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-1000" style={{ width: `${clarityLevel}%` }} />
                      </div>
                   </div>
                </div>
                
                <p className="mt-10 text-xs text-slate-400 font-bold italic leading-relaxed">
                   "התרופה היא לא הוכחה שאתה פגום. היא הוכחה שאתה הריבון. <br/> היא ה-Mute של הרעש, המאפשרת לנשמה שלך להוביל את הפרארי."
                </p>
             </div>

             <div className="space-y-6">
                <input type="range" min="1" max="10" value={mood} onChange={(e) => setMood(parseInt(e.target.value))} className="w-full h-12 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" />
                <div className="text-[9rem] font-black text-indigo-500 italic leading-none drop-shadow-2xl">{mood}</div>
             </div>

             <div className="grid grid-cols-2 gap-6">
                {['סערה במוח', 'חוסר שקט', 'תקווה', 'עייפות'].map(e => (
                  <button key={e} onClick={() => setSelectedEmotion(e)} className={`py-12 rounded-[3.5rem] font-black ${textSize} border-2 transition-all ${selectedEmotion === e ? 'bg-indigo-600 border-indigo-300 shadow-xl scale-[1.02]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                    {e}
                  </button>
                ))}
             </div>
             
             <button onClick={startEmunaLive} disabled={!selectedEmotion} className="w-full bg-white text-black py-10 rounded-[4rem] font-black text-4xl shadow-2xl flex items-center justify-center gap-4 active:scale-95 transition-all">
               <Mic size={40} /> שיחה עם אמונה
             </button>
          </div>
        )}

        {step === 'medication' && (
          <div className="space-y-12 text-center animate-in zoom-in duration-700 pb-20">
             <div className="flex flex-col items-center gap-6">
                <div className="w-32 h-32 bg-orange-600/20 rounded-[3rem] flex items-center justify-center shadow-2xl relative border border-orange-500/30">
                   <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 animate-pulse" />
                   <Sparkle size={64} className="text-orange-500 animate-spin-slow" />
                </div>
                <h2 className={headingSize}>זמן <span className="text-orange-500 italic">לכיוון הכלי.</span></h2>
                <p className="text-xl text-slate-400 font-medium italic leading-relaxed px-12">
                   זה לא רגע של 'מחלה'. זהו אקט של <span className="text-white font-black underline decoration-orange-500">בחירה ואמונה</span>. <br/>
                   אנחנו משקיטים את הגוף כדי לתת לנשמה את המרחב להאיר.
                </p>
             </div>

             <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] space-y-12 relative overflow-hidden backdrop-blur-xl group">
                <div className="absolute top-0 right-0 w-2 h-full bg-orange-500" />
                
                <div className="text-right space-y-6">
                   <div className="flex items-center gap-4 text-orange-400">
                      <BookOpen size={24} />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] italic">כוונת הריבון לנטילה (Setting the Vessel)</h3>
                   </div>
                   <div className="relative">
                      {/* Fix: Added missing Quote icon to the imports */}
                      <Quote className="absolute -top-6 -right-10 text-white/5" size={120} />
                      <p className="text-3xl italic font-black leading-[1.1] text-slate-100 relative z-10">
                        "הריני לוקח דבר זה כדי להשקיט את הגוף ולאפשר לנפש להאיר ולהוביל את הדרך בחכמה ובחירות."
                      </p>
                   </div>
                </div>
                
                <div className="flex flex-col gap-6 pt-6 relative z-10">
                   <button 
                    onClick={handleMedicationComplete}
                    className="w-full bg-orange-600 text-white py-12 rounded-[3.5rem] font-black text-4xl shadow-[0_20px_60px_rgba(234,88,12,0.3)] hover:bg-orange-500 active:scale-95 transition-all flex flex-col items-center justify-center gap-2 group/btn"
                   >
                      <span className="mb-2">הנני מאמין ובוחר בטוב</span>
                      <Sun size={40} className="group-hover/btn:rotate-90 transition-transform duration-1000" />
                   </button>
                   <button onClick={() => setStep('mood')} className="text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-slate-300 transition-all">אני רוצה רגע של נשימה קודם</button>
                </div>

                <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-orange-500/5 blur-[80px] rounded-full" />
             </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center space-y-16 py-20 animate-in fade-in zoom-in">
             <div className="relative inline-block">
                <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse" />
                <CheckCircle2 size={140} className="mx-auto text-emerald-500 animate-bounce relative z-10" />
             </div>
             <div className="space-y-6">
                <h2 className={headingSize}>הכלי מוכן.</h2>
                <p className="text-3xl text-slate-400 italic font-bold max-w-lg mx-auto leading-tight">
                   הבחירה שלך הושלמה. <br/> השקט מתחיל לחלחל. <span className="text-emerald-500">הריבונות חזרה אלייך.</span>
                </p>
             </div>
             <button onClick={() => setStep('mood')} className="bg-white text-black px-24 py-10 rounded-full font-black text-4xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                חזרה למרחב הריבונות
             </button>
          </div>
        )}

        {step === 'ai' && (
           <div className="space-y-16 text-center py-20 animate-in fade-in">
              <div className="relative inline-block">
                 <div className="absolute inset-0 bg-indigo-500 blur-[80px] opacity-20 animate-pulse" />
                 <Waves className="text-indigo-500 animate-pulse relative" size={140} />
              </div>
              <h2 className={headingSize}>אמונה מקשיבה לך</h2>
              <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] min-h-[350px] flex flex-col justify-end text-right backdrop-blur-md shadow-2xl">
                 <div className="space-y-12">
                    {transcription.user && (
                      <div className="animate-in slide-in-from-bottom-4 duration-500">
                         <p className="text-[10px] font-black text-slate-500 mb-3 uppercase tracking-widest">הריבון אמר:</p>
                         <p className={`${textSize} italic text-slate-300`}>"{transcription.user}"</p>
                      </div>
                    )}
                    <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-300">
                       <p className="text-[10px] font-black text-indigo-400 mb-3 italic uppercase tracking-[0.2em]">אמונה עונה:</p>
                       <p className={`${textSize} text-indigo-100 italic leading-relaxed font-bold`}>
                          {transcription.ai || "אני כאן איתך, יקירה. בואי ננשום יחד אל תוך השקט..."}
                       </p>
                    </div>
                 </div>
              </div>
              <button onClick={() => setStep('mood')} className="bg-indigo-600 py-10 rounded-[4rem] w-full font-black text-3xl shadow-2xl hover:bg-indigo-700 active:scale-95 transition-all">סיום שיחה</button>
           </div>
        )}
      </main>

      <footer className="fixed bottom-10 left-6 right-6 max-w-3xl mx-auto z-50">
         <button onClick={openWhatsApp} className="w-full bg-emerald-600 text-white py-10 rounded-[4rem] font-black flex items-center justify-center gap-8 shadow-[0_20px_60px_rgba(5,150,105,0.4)] border-b-[12px] border-emerald-800 active:translate-y-2 active:border-b-0 transition-all">
            <MessageCircle size={50} />
            <div className="text-right">
               <span className="block text-xs opacity-90 font-black uppercase tracking-widest mb-1">סיוע דחוף סה"ר</span>
               <span className="text-4xl">וואטסאפ מיידי</span>
            </div>
         </button>
      </footer>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PatientApp;
