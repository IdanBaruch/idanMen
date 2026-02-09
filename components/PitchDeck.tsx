import React, { useState, useEffect, useCallback } from 'react';
import { Play, ShieldCheck, Heart, ArrowLeft, Zap, Cloud, Brain, Users, Sparkles, Volume2, Shield } from 'lucide-react';

const PITCH_SEGMENTS = [
   {
      id: 'intro',
      text: 'תדמיינו לרגע... שאתם מתעוררים בבוקר, והעולם זז. הקירות נושמים. הקולות ברקע מדברים עליכם. אתם רוצים לצעוק אמא, אני מפחד, אבל המילים לא יוצאות. אתם רוצים לדעת אם האיש בפינה הוא אמיתי, או שהמוח שלכם שוב משקר לכם.',
      visual: 'pulsing-dot',
   },
   {
      id: 'problem',
      text: 'במשך עשרות שנים, הרפואה נתנה לאנשים כמו יהונתן כדורים כדי להשתיק את הרעש. אבל אף אחד לא נתן להם כלי כדי לנהל את המנגינה.',
      visual: 'noise-waves',
   },
   {
      id: 'solution',
      text: 'נעים להכיר. זוהי אמונה שתיים. אנחנו לא בנינו עוד יומן מצב רוח. אנחנו בנינו עוגן. כשיהונתן לא בטוח מה אמיתי – הוא מרים את הטלפון, והמצלמה שלנו, באמצעות מציאות רבודה, מסמנת לו בירוק בוהק: זה כיסא. זה שולחן. החדר בטוח.',
      visual: 'truth-lens',
   },
   {
      id: 'connection',
      text: 'כשיהונתן מרגיש בודד אבל לא מסוגל לדבר – הוא לוחץ על המסך, ואמא שלו בבית מרגישה את הדופק שלו רוטט אצלה ביד. היא לוחצת חזרה, והוא מרגיש חיבוק פיזי, דיגיטלי, שעוקף את כל המחסומים.',
      visual: 'haptic-pulse',
   },
   {
      id: 'sovereignty',
      text: 'אנחנו מחזירים לאנשים כמו יהונתן את הדבר היקר ביותר שנלקח מהם: לא רק את הבריאות. אלא את הבעלות על הבית הפנימי שלהם. את הריבונות. תודה.',
      visual: 'sovereignty-seal',
   }
];

const PitchDeck: React.FC<{ onStart: () => void }> = ({ onStart }) => {
   const [isPlaying, setIsPlaying] = useState(false);
   const [currentSegment, setCurrentSegment] = useState(0);
   const [showContent, setShowContent] = useState(false);

   const speak = useCallback((text: string, onEnd: () => void) => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'he-IL';
      utterance.rate = 0.85; // Slow, calm
      utterance.pitch = 0.9; // Deep
      utterance.onend = onEnd;
      window.speechSynthesis.speak(utterance);
   }, []);

   const playPitch = () => {
      setIsPlaying(true);
      setCurrentSegment(0);
      executeSegment(0);
   };

   const executeSegment = (index: number) => {
      if (index >= PITCH_SEGMENTS.length) {
         setIsPlaying(false);
         setShowContent(true);
         return;
      }
      setCurrentSegment(index);
      speak(PITCH_SEGMENTS[index].text, () => {
         executeSegment(index + 1);
      });
   };

   useEffect(() => {
      return () => window.speechSynthesis?.cancel();
   }, []);

   if (isPlaying) {
      return (
         <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-8 font-assistant relative overflow-hidden">
            {/* Zen Visuals */}
            <div className="relative w-96 h-96 flex items-center justify-center">
               {PITCH_SEGMENTS[currentSegment].visual === 'pulsing-dot' && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping shadow-[0_0_50px_rgba(59,130,246,0.8)]" />
               )}

               {PITCH_SEGMENTS[currentSegment].visual === 'noise-waves' && (
                  <div className="flex gap-2 items-end h-32">
                     {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-2 bg-slate-700 animate-pulse" style={{ height: `${Math.random() * 100}%` }} />
                     ))}
                  </div>
               )}

               {PITCH_SEGMENTS[currentSegment].visual === 'truth-lens' && (
                  <div className="w-48 h-48 border-4 border-emerald-500 rounded-full flex items-center justify-center animate-spin-slow shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                     <ShieldCheck size={64} className="text-emerald-400" />
                  </div>
               )}

               {PITCH_SEGMENTS[currentSegment].visual === 'haptic-pulse' && (
                  <div className="relative">
                     <Heart size={80} fill="#f43f5e" className="text-rose-500 animate-pulse" />
                     <div className="absolute inset-0 border-2 border-rose-500 rounded-full animate-ping" />
                  </div>
               )}

               {PITCH_SEGMENTS[currentSegment].visual === 'sovereignty-seal' && (
                  <div className="text-center space-y-4 animate-in zoom-in duration-1000">
                     <Sparkles size={80} className="text-amber-400 mx-auto animate-spin-slow" />
                     <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter">Sovereignty Regained</h2>
                  </div>
               )}
            </div>

            <div className="mt-20 max-w-2xl text-center">
               <p className="text-xl text-blue-200/60 font-medium italic animate-pulse">
                  {PITCH_SEGMENTS[currentSegment].text.substring(0, 50)}...
               </p>
            </div>

            <button
               onClick={() => { window.speechSynthesis.cancel(); setIsPlaying(false); setShowContent(true); }}
               className="absolute bottom-10 right-10 text-slate-500 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest"
            >
               דילוג <ArrowLeft size={12} />
            </button>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-[#050608] text-white flex flex-col items-center justify-center p-8 font-assistant relative overflow-hidden" dir="rtl">
         {/* Background Ambience */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[180px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[180px] rounded-full" />
         </div>

         <div className="max-w-6xl w-full z-10 space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 text-center">
            <header className="space-y-8">
               <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-xl">
                  <Cloud size={16} className="text-blue-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 italic">Emuna 2: Reality Interface Platform</span>
               </div>

               <h1 className="text-8xl md:text-[12rem] font-black italic tracking-tighter leading-[0.8] text-white">
                  THE <span className="text-blue-500">GLORY</span> PITCH.
               </h1>

               <p className="text-2xl text-slate-400 font-medium max-w-4xl mx-auto italic leading-tight">
                  פלטפורמת הדרכה קלינית ומערכת הפעלה למציאות (Reality-OS) <br />
                  <span className="text-blue-100/60 transition-colors hover:text-blue-100">חיבור בין ריבונות קוגניטיבית, פרמקולוגיה ובינה מלאכותית.</span>
               </p>
            </header>

            <div className="flex flex-col items-center gap-12">
               <div className="flex gap-6">
                  <button
                     onClick={playPitch}
                     className="group relative bg-[#1e40af] text-white px-16 py-8 rounded-[3rem] font-black text-4xl shadow-2xl hover:bg-blue-600 transition-all flex items-center gap-6"
                  >
                     שמע את החזון <Volume2 size={40} className="animate-pulse" />
                  </button>

                  <button
                     onClick={onStart}
                     className="bg-white text-black px-16 py-8 rounded-[3rem] font-black text-4xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-6"
                  >
                     כניסה <ArrowLeft size={40} />
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full opacity-60 hover:opacity-100 transition-opacity">
                  <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] text-right">
                     <Brain className="text-blue-400 mb-4" />
                     <h4 className="text-xl font-black italic">ריבונות הנפש</h4>
                     <p className="text-xs text-slate-400">ניהול דחפים קליני באמצעות AI.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] text-right">
                     <Shield className="text-emerald-400 mb-4" />
                     <h4 className="text-xl font-black italic">Cloud Hybrid</h4>
                     <p className="text-xs text-slate-400">אינטגרציה מלאה עם קמיליון.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] text-right">
                     <Users className="text-indigo-400 mb-4" />
                     <h4 className="text-xl font-black italic">Supervision UI</h4>
                     <p className="text-xs text-slate-400">ליווי צוות מיוני בזמן אמת.</p>
                  </div>
               </div>
            </div>

            <footer className="pt-12 border-t border-white/5 opacity-40">
               <p className="text-[10px] font-black uppercase tracking-widest italic">Idan Baruh | Shalvata Clinical Pilot 2026</p>
            </footer>
         </div>
      </div>
   );
};

export default PitchDeck;
