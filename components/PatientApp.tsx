
import React, { useState, useEffect, useRef } from 'react';
import {
   Heart, Mic, PenTool, ChevronRight, ArrowLeft,
   MessageCircle, X, ShieldAlert, CheckCircle2, Waves,
   History, Sparkles, Send, Loader2, Calendar, Utensils,
   BrainCircuit, Music, Eye, Maximize, Minimize, Volume2,
   Soup, Apple, BookOpen, Star, ShieldCheck, CigaretteOff,
   VolumeX, Zap, Activity, Pill, Sun, Sparkle, Quote, Trophy,
   Home, ShoppingBag, Megaphone
} from 'lucide-react';
import { AppSettings, AppRole, PersonaExpert } from '../types';
import { GoogleGenAI } from '@google/genai';
import BioReactor from './BioReactor';
import OpsRoom from './OpsRoom';
import CyberGuardian from './CyberGuardian';
import ControlTower from './ControlTower';
import MentalWeatherForecast from './MentalWeatherForecast';
import CoPilotOnboarding from './CoPilotOnboarding';
import VoiceProxy from './VoiceProxy';
import HapticBridge from './HapticBridge';
import WhisperingButton from './WhisperingButton';
import DailyDigest from './DailyDigest';
import { startLiveTriageSession, AudioManager, getFHIRTimeline, FHIRAppointment } from '../services/geminiService';
import { LedgerEntry } from '../types';

type Screen = 'mood' | 'ai' | 'journal' | 'medication' | 'success' | 'ops' | 'supply' | 'timeline' | 'forecast' | 'voice' | 'haptic' | 'digest';

const PatientApp: React.FC<{
   settings: AppSettings;
   onNavigate?: (role: AppRole) => void;
   userPoints?: number;
   onAddPoints?: (amount: number) => void;
   ledgerEntries?: LedgerEntry[];
}> = ({ settings, onNavigate, userPoints = 0, onAddPoints, ledgerEntries = [] }) => {
   const [step, setStep] = useState<Screen>('mood');
   const [mood, setMood] = useState(5);
   const [isPrivacyShieldActive, setIsPrivacyShieldActive] = useState(false);
   const [isLockedByGuardian, setIsLockedByGuardian] = useState(true);
   const [notifications, setNotifications] = useState<string[]>([]);
   const [bpm, setBpm] = useState(72);
   const [isAnxious, setIsAnxious] = useState(false);
   const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
   const [journalText, setJournalText] = useState('');
   const [isSeniorMode, setIsSeniorMode] = useState(true);
   const [transcription, setTranscription] = useState<{ user: string, ai: string }>({ user: '', ai: '' });
   const [isConnecting, setIsConnecting] = useState(false);
   const [chatInput, setChatInput] = useState('');
   const [isListening, setIsListening] = useState(false);
   const [transcriptionStatus, setTranscriptionStatus] = useState('');

   // Sovereignty logic states
   const [noiseLevel, setNoiseLevel] = useState(72);
   const [clarityLevel, setClarityLevel] = useState(28);
   const [cohesionScore, setCohesionScore] = useState(42); // Self-Cohesion Score (0-100)
   const [appointments, setAppointments] = useState<FHIRAppointment[]>([]);
   const [showOnboarding, setShowOnboarding] = useState(true); // Default to true for demo purposes

   useEffect(() => {
      setAppointments(getFHIRTimeline());
   }, []);

   const audioManagerRef = useRef<AudioManager | null>(null);

   // Simulated Wearable / Vital Integration (Apple Health / Google Fit)
   useEffect(() => {
      const interval = setInterval(() => {
         const newBpm = 65 + Math.floor(Math.random() * 15);
         setBpm(newBpm);

         // Trigger Reality Check if BPM spikes (simulated anxiety attack)
         if (newBpm > 95 && !isAnxious) {
            setIsAnxious(true);
            setNotifications(prev => ["מערכת ה-OS זיהתה עלייה חריגה בדופק. מומלץ לבצע בדיקת מציאות.", ...prev]);
         }
      }, 5000);
      return () => clearInterval(interval);
   }, [isAnxious]);

   const speak = (text: string) => {
      if (!text || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'he-IL';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
   };

   useEffect(() => {
      if (transcription.ai && step === 'ai') {
         speak(transcription.ai);
      }
   }, [transcription.ai]);

   useEffect(() => {
      return () => {
         audioManagerRef.current?.stopAll();
         window.speechSynthesis?.cancel();
      };
   }, []);

   const openWhatsApp = () => {
      const url = "https://api.whatsapp.com/send?phone=972559571399&text=" + encodeURIComponent("שלום סה\"ר, אני פונה מאפליקציית שלוותה ואני זקוקה לתמיכה.");
      window.open(url, '_blank', 'noopener,noreferrer');
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
         const phrase = "אני קצת חוששת מהתהליך האשפוזי";
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
            contents: [{ role: 'user', parts: [{ text: `את המלווה האמפתית. המטופלת מרגישה ${selectedEmotion}. היא אמרה: "${userMsg}". עני לה בקצרה וברוגע.` }] }]
         });
         const responseText = result.text || "אני כאן איתך.";
         setTranscription(prev => ({ ...prev, ai: responseText }));
         speak(responseText);
      } catch (err) {
         console.error(err);
         setTranscription(prev => ({ ...prev, ai: "אני כאן, בואי נמשיך לנשום." }));
      } finally {
         setTranscriptionStatus('');
      }
   };

   const startEmunaLive = async () => {
      setIsConnecting(true);
      setStep('ai');
      speak("אני כאן איתך, יקירה. בואי ננשום יחד אל תוך השקט...");
      try {
         const { sessionPromise, audioManager } = await startLiveTriageSession({
            onOpen: () => setIsConnecting(false),
            onAudioChunk: () => { },
            onTranscription: (text, role) => {
               setTranscription(prev => ({ ...prev, [role === 'user' ? 'user' : 'ai']: text }));
            },
            onError: (err) => { console.error(err); setIsConnecting(false); },
            onInterrupted: () => { },
         }, 'warm', `את המלווה, המלווה האמפתית. דברי ברוגע למטופל שמרגיש ${selectedEmotion}. השתמש בלוגיקה של ריבונות ושקט פנימי.`);
         audioManagerRef.current = audioManager;
         await sessionPromise;
      } catch (err) { console.error(err); setIsConnecting(false); }
   };

   const handleMedicationComplete = () => {
      // Logic for "Setting the Vessel"
      setNoiseLevel(prev => Math.max(0, prev - 30));
      setClarityLevel(prev => Math.min(100, prev + 30));
      setCohesionScore(prev => Math.min(100, prev + 15)); // Boost cohesion

      // Sync with timeline
      setAppointments(prev => prev.map(a => a.type === 'meds' && a.status === 'pending' ? { ...a, status: 'fulfilled' } : a));

      if (onAddPoints) onAddPoints(150);

      // AI Supportive Message (Tactical Reward Phase)
      const rewardMsg = "Systems Stabilized. Reality Anchor: Active. יהונתן, המנועים שלך מוכנים לריבונות.";
      setTranscription(prev => ({ ...prev, ai: rewardMsg }));
      speak(rewardMsg);

      setStep('timeline');
   };

   const handleCheckIn = (id: string) => {
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'arrived' } : a));
      if (onAddPoints) onAddPoints(20);

      // Play coin sound simulation
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3');
      audio.play().catch(() => { });
   };

   const PersonaExpertCard: React.FC<{ expert: PersonaExpert; size?: 'sm' | 'md' }> = ({ expert, size = 'md' }) => {
      const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${expert.id}&backgroundColor=b6e3f4`;
      return (
         <div className={`bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[2.5rem] flex flex-col items-center text-center gap-4 transition-all hover:bg-white/20 cursor-pointer ${size === 'sm' ? 'w-48' : 'w-64'}`}>
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
               <img src={avatarUrl} alt={expert.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-black">{expert.name}</h3>
            <p className="text-sm text-slate-400">{expert.description}</p>
         </div>
      );
   };

   const textSize = isSeniorMode ? 'text-3xl' : 'text-xl';
   const headingSize = isSeniorMode ? 'text-6xl' : 'text-4xl';

   if (showOnboarding) {
      return <CoPilotOnboarding onComplete={() => setShowOnboarding(false)} />;
   }

   return (
      <div className={`min-h-screen bg-[#050608] text-white flex flex-col items-center p-6 md:p-12 font-assistant relative overflow-x-hidden pb-40 ${isSeniorMode ? 'font-black' : ''}`} dir="rtl">
         {/* Points Header */}
         <div className="fixed top-6 left-6 right-6 z-[100] flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                  <Activity size={32} />
               </div>
               <div className="hidden md:block">
                  <h1 className="text-xl font-black italic tracking-tight">הכרטיס לחופש</h1>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Liberty Card</p>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <div className="flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full hidden sm:flex">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest leading-none">E2EE Secured</span>
               </div>

               <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full hidden sm:flex">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest leading-none">Chameleon Sync: Active</span>
               </div>

               <button
                  onClick={() => setIsPrivacyShieldActive(!isPrivacyShieldActive)}
                  className={`p-4 rounded-2xl border transition-all ${isPrivacyShieldActive ? 'bg-amber-500 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                  title="Privacy Shield"
               >
                  <Eye size={24} className={isPrivacyShieldActive ? 'text-white' : 'text-slate-400'} />
               </button>

               <button
                  onClick={() => onNavigate?.(AppRole.REWARDS)}
                  className="bg-gradient-to-br from-amber-400 to-orange-500 px-6 py-4 rounded-[1.5rem] shadow-lg border-b-4 border-orange-700 active:translate-y-1 active:border-b-0 transition-all flex items-center gap-3 group"
               >
                  <Trophy size={20} className="group-hover:rotate-12 transition-transform" />
                  <div className="text-right">
                     <p className="text-[8px] font-black uppercase opacity-70 leading-none">הנקודות שלך</p>
                     <p className="text-xl font-black leading-none">{userPoints.toLocaleString()}</p>
                  </div>
               </button>

               <button onClick={() => setIsSeniorMode(!isSeniorMode)} className={`p-4 rounded-2xl border border-white/20 shadow-2xl transition-all ${isSeniorMode ? 'bg-indigo-600' : 'bg-white/5'}`}>
                  {isSeniorMode ? <Maximize size={24} /> : <Minimize size={24} />}
               </button>
            </div>
         </div>

         <main className="w-full max-w-3xl mt-36 space-y-12 relative z-10">
            {/* Ward Identity / Hospitalization Status */}
            <div className="flex justify-center">
               <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-full flex items-center gap-6 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">אשפוז בית פעיל</span>
                  </div>
                  <div className="h-4 w-[1px] bg-white/10" />
                  <span className="text-xs font-black italic">מחלקה א' (שלוותה)</span>
                  <div className="h-4 w-[1px] bg-white/10" />
                  <span className="text-[10px] font-black text-indigo-400">יום אשפוז: #14</span>
               </div>
            </div>

            {step === 'mood' && (
               <div className="space-y-16 text-center animate-in fade-in duration-700">
                  <div className="space-y-6">
                     <h2 className={`${headingSize} leading-none tracking-tighter`}>איך המרגש <br /><span className="text-indigo-500 italic">עכשיו, הריבון?</span></h2>
                  </div>

                  <div className="flex gap-4 justify-center">
                     <div className="flex items-center gap-4 bg-slate-900/80 border border-white/5 px-6 py-2 rounded-2xl shadow-xl">
                        <div className="text-right">
                           <p className="text-[9px] font-black text-slate-500 uppercase leading-none">Vitals</p>
                           <p className={`text-sm font-black italic mt-1 ${bpm > 90 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>{bpm} BPM</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                           <Activity size={18} className={bpm > 90 ? 'text-rose-500' : 'text-emerald-400'} />
                        </div>
                     </div>

                     {appointments.find(a => a.status === 'pending') && (
                        <button
                           onClick={() => setStep('timeline')}
                           className="flex items-center gap-4 bg-indigo-500/10 border border-indigo-500/20 px-6 py-2 rounded-2xl shadow-xl hover:bg-indigo-500/20 transition-all"
                        >
                           <div className="text-right">
                              <p className="text-[9px] font-black text-indigo-400 uppercase leading-none">הפעילות הבאה</p>
                              <p className="text-sm font-black italic mt-1 text-white">{appointments.find(a => a.status === 'pending')?.startTime} - {appointments.find(a => a.status === 'pending')?.description}</p>
                           </div>
                           <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                              <Calendar size={18} />
                           </div>
                        </button>
                     )}
                  </div>

                  {/* Emergency Dignity Bridge Shortcut (Visible when noise is high) */}
                  {noiseLevel > 70 && (
                     <button
                        onClick={() => setStep('voice')}
                        className="w-full bg-rose-600/20 border-2 border-rose-500 animate-pulse p-6 rounded-[2.5rem] flex items-center justify-between group hover:bg-rose-600/30 transition-all"
                     >
                        <div className="flex items-center gap-4 text-right">
                           <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(244,63,94,0.5)]">
                              <Megaphone size={24} />
                           </div>
                           <div>
                              <p className="text-xl font-black text-white italic leading-none">עזרה בדיבור</p>
                              <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mt-1">Cognitive Prosthetic: Voice Proxy</p>
                           </div>
                        </div>
                        <ShieldAlert className="text-rose-500 group-hover:scale-125 transition-transform" />
                     </button>
                  )}

                  {/* Action Grid (The "Arsenal") */}
                  <div className="grid grid-cols-1 gap-4">
                     <div className="w-full">
                        <WhisperingButton
                           onClick={() => setStep('haptic')}
                           whisperingText="לחץ כאן בכל הכוח כדי לשדר דופק לאמא. היא תרגיש אותך ותשלח לך רוגע בחזרה."
                           highlight={true}
                           haloColor="rgba(244, 63, 94, 0.6)"
                           className="bg-gradient-to-r from-rose-600 to-rose-700 p-8 rounded-[2.5rem] flex items-center justify-between shadow-[0_20px_40px_rgba(225,29,72,0.3)]"
                        >
                           <div className="flex items-center gap-6 text-right w-full">
                              <div className="w-16 h-16 bg-white/20 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform">
                                 <Heart size={36} fill="white" className="animate-pulse" />
                              </div>
                              <div className="flex-1">
                                 <h4 className="text-3xl font-black italic text-white leading-none">נגיעה מהמשפחה</h4>
                                 <p className="text-[10px] font-bold text-rose-100 uppercase tracking-widest mt-1">Haptic Bridge: Physical Contact</p>
                              </div>
                              <Zap className="text-white/40" />
                           </div>
                        </WhisperingButton>
                     </div>

                     <div className="w-full">
                        <WhisperingButton
                           onClick={() => setStep('ai')}
                           whisperingText="קשה לך לדבר? המערכת תשמש לך כפה. נבחר יחד תסריטים רגועים שיסבירו לכולם מה אתה צריך."
                           className="bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10"
                        >
                           <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-4 text-right">
                                 <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(244,63,94,0.5)]">
                                    <Megaphone size={24} />
                                 </div>
                                 <div>
                                    <p className="text-xl font-black text-white italic leading-none">עזרה בדיבור</p>
                                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mt-1">Cognitive Prosthetic: Voice Proxy</p>
                                 </div>
                              </div>
                              <ShieldAlert className="text-rose-500" />
                           </div>
                        </WhisperingButton>
                        <div className="w-full">
                           <WhisperingButton
                              onClick={() => setStep('digest')}
                              whisperingText="כאן תוכל לקרוא את 'ספר הניצחונות' שלך. כל מה שהצוות המטפל תיעד היום כהצלחה וכחוות דעת חיובית - נמצא כאן."
                              className="bg-emerald-600/10 border border-emerald-500/20 p-8 rounded-[2.5rem]"
                           >
                              <div className="flex items-center justify-between w-full">
                                 <div className="flex items-center gap-4 text-right">
                                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                       <Trophy size={24} />
                                    </div>
                                    <div>
                                       <p className="text-xl font-black text-white italic leading-none">ההצלחות שלי</p>
                                       <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-1">Sovereign Ledger: Care Team Feedback</p>
                                    </div>
                                 </div>
                                 <ChevronRight className="text-emerald-500" />
                              </div>
                           </WhisperingButton>
                        </div>
                     </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group backdrop-blur-md">
                     <div className="flex justify-between items-center mb-10">
                        <div className="text-right">
                           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">מדד יציבות עצמית (Self-Cohesion)</h4>
                           <p className="text-2xl font-black italic text-indigo-400 mt-1">בניית ה"אני" האמיתי</p>
                        </div>
                        <div className="relative w-20 h-20 flex items-center justify-center">
                           <svg className="w-full h-full transform -rotate-90">
                              <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-700" />
                              <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-indigo-500 transition-all duration-1000 ease-out" strokeDasharray={226} strokeDashoffset={226 - (226 * cohesionScore) / 100} />
                           </svg>
                           <span className="absolute text-xl font-black text-white">{cohesionScore}</span>
                        </div>
                     </div>

                     <div className="space-y-8">
                        <div className="grid grid-cols-3 gap-2 mb-6">
                           <div className="bg-white/5 p-3 rounded-2xl text-center">
                              <span className="block text-xs font-bold text-slate-400 mb-1">חיוניות</span>
                              <span className="text-lg font-black text-emerald-400">84%</span>
                           </div>
                           <div className="bg-white/5 p-3 rounded-2xl text-center">
                              <span className="block text-xs font-bold text-slate-400 mb-1">שגרה</span>
                              <span className="text-lg font-black text-blue-400">60%</span>
                           </div>
                           <div className="bg-white/5 p-3 rounded-2xl text-center">
                              <span className="block text-xs font-bold text-slate-400 mb-1">חיבור</span>
                              <span className="text-lg font-black text-purple-400">92%</span>
                           </div>
                        </div>

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
                        "התרופה היא לא הוכחה שאתה פגום. היא הוכחה שאתה הריבון. <br /> היא ה-Mute של הרעש, המאפשרת לנשמה שלך להוביל את הפרארי."
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

                  <button
                     onClick={() => {
                        if (onAddPoints) onAddPoints(10);
                        startEmunaLive();
                     }}
                     disabled={!selectedEmotion}
                     className="w-full bg-white text-black py-10 rounded-[4rem] font-black text-4xl shadow-2xl flex items-center justify-center gap-4 active:scale-95 transition-all"
                  >
                     <Mic size={40} /> לדבר עם המלווה
                  </button>
               </div>
            )}

            {step === 'medication' && (
               <div className="animate-in zoom-in duration-700 pb-20 overflow-hidden">
                  {isLockedByGuardian ? (
                     <CyberGuardian
                        label="BIO-REACTOR SOURCE CONTROL"
                        onUnlock={() => setIsLockedByGuardian(false)}
                     />
                  ) : (
                     <BioReactor userPoints={userPoints} onAddPoints={onAddPoints || (() => { })} />
                  )}
               </div>
            )}

            {step === 'ops' && (
               <div className="animate-in zoom-in duration-700 pb-20 h-full">
                  <OpsRoom onAddPoints={onAddPoints || (() => { })} />
               </div>
            )}

            {step === 'timeline' && (
               <div className="animate-in slide-in-from-left duration-700 pb-20">
                  <ControlTower
                     appointments={appointments}
                     onCheckIn={handleCheckIn}
                  />
               </div>
            )}

            {step === 'forecast' && (
               <div className="animate-in zoom-in duration-700 pb-20">
                  <MentalWeatherForecast />
               </div>
            )}

            {step === 'voice' && (
               <div className="animate-in slide-in-from-bottom duration-700 pb-20 h-full">
                  <VoiceProxy onBack={() => setStep('mood')} />
               </div>
            )}

            {step === 'haptic' && (
               <div className="fixed inset-0 z-[100] animate-in slide-in-from-bottom duration-700">
                  <HapticBridge onBack={() => setStep('mood')} />
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
                        הבחירה שלך הושלמה. <br /> השקט מתחיל לחלחל. <span className="text-emerald-500">הריבונות חזרה אלייך.</span>
                     </p>
                  </div>
                  <button onClick={() => setStep('mood')} className="bg-white text-black px-24 py-10 rounded-full font-black text-4xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                     חזרה הביתה
                  </button>
               </div>
            )}

            {step === 'ai' && (
               <div className="space-y-16 text-center py-20 animate-in fade-in">
                  <div className="relative inline-block">
                     <div className="absolute inset-0 bg-indigo-500 blur-[80px] opacity-20 animate-pulse" />
                     <Waves className="text-indigo-500 animate-pulse relative" size={140} />
                  </div>
                  <h2 className={headingSize}>המלווה מקשיבה לך</h2>
                  <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] min-h-[350px] flex flex-col justify-end text-right backdrop-blur-md shadow-2xl">
                     <div className="space-y-12">
                        {transcription.user && (
                           <div className="animate-in slide-in-from-bottom-4 duration-500">
                              <p className="text-[10px] font-black text-slate-500 mb-3 uppercase tracking-widest">הריבון אמר:</p>
                              <p className={`${textSize} italic text-slate-300`}>"{transcription.user}"</p>
                           </div>
                        )}
                        <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-300">
                           <p className="text-[10px] font-black text-indigo-400 mb-3 italic uppercase tracking-[0.2em]">המלווה עונה:</p>
                           <p className={`${textSize} text-indigo-100 italic leading-relaxed font-bold`}>
                              {transcription.ai || "אני כאן איתך, יקירה. בואי ננשום יחד אל תוך השקט..."}
                           </p>
                        </div>
                     </div>
                     <div className="mt-12 flex gap-4">
                        <input
                           value={chatInput}
                           onChange={(e) => setChatInput(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                           className="flex-1 bg-white/10 border border-white/20 rounded-full px-8 py-4 text-white outline-none focus:border-indigo-500 transition-all font-bold"
                           placeholder="כתבי כאן..."
                        />
                        <button
                           onClick={toggleListening}
                           className={`p-4 rounded-full transition-all shadow-xl flex items-center gap-2 ${isListening ? 'bg-red-500 animate-pulse text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
                        >
                           <Mic size={24} />
                           {transcriptionStatus && <span className="text-[10px] font-black">{transcriptionStatus}</span>}
                        </button>
                        <button onClick={handleSendMessage} className="p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all">
                           <Send size={24} />
                        </button>
                     </div>
                  </div>
                  <button onClick={() => setStep('mood')} className="bg-indigo-600 py-10 rounded-[4rem] w-full font-black text-3xl shadow-2xl hover:bg-indigo-700 active:scale-95 transition-all">סיימתי לדבר</button>
               </div>
            )}

            {step === 'digest' && (
               <div className="fixed inset-0 z-[300] bg-[#05060a]">
                  <DailyDigest entries={ledgerEntries} onBack={() => setStep('mood')} />
               </div>
            )}
         </main>

         {/* Floating Dock Navigation (Cyber-Zen) */}
         <nav className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-2">
            <button
               onClick={() => setStep('mood')}
               className={`p-5 rounded-full transition-all flex items-center gap-3 ${step === 'mood' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
               <Home size={24} />
               {step === 'mood' && <span className="font-black text-xs uppercase tracking-widest">Home</span>}
            </button>
            <button
               onClick={() => setStep('medication')}
               className={`p-5 rounded-full transition-all flex items-center gap-3 ${step === 'medication' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
               <Zap size={24} />
               {step === 'medication' && <span className="font-black text-xs uppercase tracking-widest">Arsenal</span>}
            </button>
            <button
               onClick={() => setStep('ops')}
               className={`p-5 rounded-full transition-all flex items-center gap-3 ${step === 'ops' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
               <Activity size={24} />
               {step === 'ops' && <span className="font-black text-xs uppercase tracking-widest">Ops Room</span>}
            </button>
            <button
               onClick={() => onNavigate?.(AppRole.REWARDS)}
               className={`p-5 rounded-full transition-all flex items-center gap-3 ${step === 'supply' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
               <ShoppingBag size={24} />
               {step === 'supply' && <span className="font-black text-xs uppercase tracking-widest">Supply</span>}
            </button>
         </nav>

         <div className="fixed bottom-8 right-8 z-[100] group">
            <button
               onClick={openWhatsApp}
               className="w-20 h-20 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl border-b-4 border-emerald-800 active:translate-y-1 active:border-b-0 transition-all hover:scale-110"
            >
               <MessageCircle size={32} />
            </button>
            <div className="absolute bottom-full right-0 mb-4 scale-0 group-hover:scale-100 transition-all origin-bottom-right whitespace-nowrap bg-white text-emerald-800 px-6 py-3 rounded-2xl font-black shadow-xl border border-emerald-100">
               סיוע דחוף סה"ר (וואטסאפ)
            </div>
         </div>

         <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
         {/* Privacy Shield Overlay */}
         {isPrivacyShieldActive && (
            <div className="fixed inset-0 z-[500] bg-black/40 backdrop-blur-[60px] flex items-center justify-center p-12 transition-all duration-700">
               <div className="text-center space-y-6">
                  <ShieldAlert size={80} className="text-amber-500 mx-auto animate-pulse" />
                  <h3 className="text-4xl font-black italic">הגנת פרטיות פעילה</h3>
                  <p className="text-slate-300 font-bold">המידע שלך מוסתר מעיניים זרות. לחץ על העין למעלה כדי לחזור.</p>
               </div>
            </div>
         )}
      </div>
   );
};

export default PatientApp;
