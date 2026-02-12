import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, ShieldCheck, Heart, ArrowLeft, Zap, Cloud, Brain, Users, Sparkles, Volume2, Shield, Quote, Rocket, Activity, Lock, MessageSquare, Send, Ticket, ExternalLink, RefreshCcw, ChevronLeft, BarChart3, Fingerprint } from 'lucide-react';

const PITCH_SEGMENTS = [
   {
      id: 'pain',
      label: 'הכאב',
      duration: 20,
      text: 'תעצרו רגע. תחשבו על הפעם האחרונה שהרגשתם... שהקרקע נשמטת. עכשיו תדמיינו שזו לא הרגשה רגעית. זו המציאות שלכם, כל בוקר מחדש. המחשבות משקרות. הדופק בוגד. והפתרון היחיד שהמערכת מציעה לכם היום? כדור... או מיטה בבית חולים.',
      visual: 'pain-pulse',
      subtitle: 'המחשבות משקרות. הדופק בוגד.'
   },
   {
      id: 'solution',
      label: 'הפתרון',
      duration: 30,
      text: 'אנחנו לא פה כדי לשים פלסטר. הכירו את Emuna 2.0. זו לא עוד אפליקציה. זו מערכת הפעלה למציאות. תחשבו על זה כמו "כיפת ברזל" לתודעה. השעון שלנו מזהה את החרדה לפני שהיא הופכת להתקף. האוזניות מסננות את הרעש הפנימי. והמסך? הוא מראה רק את האמת: אתה בטוח. אתה מוגן.',
      visual: 'iron-dome',
      subtitle: '"כיפת ברזל" לתודעה'
   },
   {
      id: 'market',
      label: 'השוק',
      duration: 25,
      text: 'וזה לא רק סיפור יפה. זה ביזנס של ארבע מאות וחמישים מיליארד דולר. תסתכלו על המספרים. בתי החולים קורסים תחת 42% אשפוזים חוזרים. אנחנו חותכים את זה בחצי. כל משתמש שלנו הוא פחות מיטה תפוסה, ופחות כסף שנשרף למערכת. זה ROI פשוט.',
      visual: 'numbers-flow',
      subtitle: 'ביזנס של $450B'
   },
   {
      id: 'vision',
      label: 'החזון',
      duration: 20,
      text: 'אנחנו לא מחפשים מטופלים. אנחנו בונים ריבונים. אנשים שלא מחכים לנדבות, אלא כותבים את הסיפור שלהם בעצמם. זה הכרטיס לחופש. והוא מוכן. השאלה היחידה היא – האם אתם עולים לטיסה הזו איתנו?',
      visual: 'sovereignty-vision',
      subtitle: 'אנחנו בונים ריבונים'
   }
];

const INVESTOR_FAQ: Record<string, string> = {
   "model": "אנחנו עובדים במודל B2B2C. בתי חולים משלמים רישיון שנתי (SaaS) של $1,200 למיטה לחיסכון באשפוזים חוזרים, ומשפחות נהנות ממודל Freemium עם פיצ'רים מתקדמים ב-$19 לחודש.",
   "privacy": "כל ניתוח הקול והביומטריה מתבצע Edge-Based על המכשיר עצמו. אנחנו תואמים לתקני HIPAA ו-GDPR מחמירים מהיום הראשון. המידע שלך נשאר שלך.",
   "comp": "היתרון הלא הוגן שלנו: אנחנו היחידים שמשלבים חומרה קיימת (שעון/אוזניות) עם תוכן קליני-אמוני בזמן אמת. אנחנו מונעים אשפוז, לא רק מרגיעים.",
   "ask": "אנחנו בסבב Pre-Seed, מגייסים $500K עבור פיתוח ה-MVP המלא והפיילוט הראשון בביה\"ס לאשפוז יום בשלוותה. 60% לפיתוח, 40% לאופרציה וקליניקה.",
   "market": "השוק של בריאות הנפש הדיגיטלית מדמם 300 מיליארד דולר בשנה על אי-יעילות. אנחנו כאן כדי לעצור את הדימום הזה."
};

const PitchDeck: React.FC<{ onStart: () => void }> = ({ onStart }) => {
   const [isPlaying, setIsPlaying] = useState(false);
   const [currentSegment, setCurrentSegment] = useState(0);
   const [showContent, setShowContent] = useState(false);
   const [progress, setProgress] = useState(0);
   const [chatOpen, setChatOpen] = useState(false);
   const [chatMessage, setChatMessage] = useState('');
   const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'founder', text: string }>>([
      { role: 'founder', text: 'היי, כאן האנליסט של Emuna 2.0. בזמן שהחזון מתנגן, שאל אותי על המודל העסקי, אבטחה או התחרות. דוגמאות: "מה המודל?", "איך האבטחה?", "מי המתחרים?".' }
   ]);
   const progressTimer = useRef<NodeJS.Timeout | null>(null);

   const speak = useCallback((text: string, onEnd: () => void) => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'he-IL';

      const voices = window.speechSynthesis.getVoices();
      const targetVoice = voices.find(v => v.lang.startsWith('he') && v.name.includes('Female')) || voices.find(v => v.lang.startsWith('he'));
      if (targetVoice) utterance.voice = targetVoice;

      utterance.rate = 0.85; // Slightly slower for 'Human' feel
      utterance.onend = onEnd;
      window.speechSynthesis.speak(utterance);
   }, []);

   const totalPitchDuration = PITCH_SEGMENTS.reduce((acc, curr) => acc + curr.duration, 0) * 1000;

   const playPitch = () => {
      setIsPlaying(true);
      setCurrentSegment(0);
      setProgress(0);
      executeSegment(0);
      startProgress();
   };

   const startProgress = () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
      const interval = 100;
      progressTimer.current = setInterval(() => {
         setProgress(prev => {
            const next = prev + (interval / totalPitchDuration) * 100;
            return next >= 100 ? 100 : next;
         });
      }, interval);
   };

   const jumpToSegment = (index: number) => {
      const elapsedBefore = PITCH_SEGMENTS.slice(0, index).reduce((acc, curr) => acc + curr.duration, 0);
      window.speechSynthesis.cancel();
      setCurrentSegment(index);
      setProgress((elapsedBefore / (totalPitchDuration / 1000)) * 100);
      executeSegment(index);
   };

   const executeSegment = (index: number) => {
      if (index >= PITCH_SEGMENTS.length) {
         setTimeout(() => {
            setIsPlaying(false);
            setShowContent(true);
            if (progressTimer.current) clearInterval(progressTimer.current);
            setProgress(100);
         }, 1000);
         return;
      }
      setCurrentSegment(index);
      speak(PITCH_SEGMENTS[index].text, () => {
         executeSegment(index + 1);
      });
   };

   const handleSendMessage = () => {
      if (!chatMessage.trim()) return;
      const userMsg = chatMessage.toLowerCase();
      setChatHistory(prev => [...prev, { role: 'user', text: chatMessage }]);
      setChatMessage('');

      let response = "שאלה מצוינת. אני מציע שנקבע פגישת דמו כדי לצלול לעומק הנתונים. בינתיים, בוא נעלה לטיסה.";

      if (userMsg.includes('מודל') || userMsg.includes('business') || userMsg.includes('כסף')) response = INVESTOR_FAQ.model;
      else if (userMsg.includes('אבטחה') || userMsg.includes('פרטיות') || userMsg.includes('privacy') || userMsg.includes('hipaa')) response = INVESTOR_FAQ.privacy;
      else if (userMsg.includes('מתחרים') || userMsg.includes('comp')) response = INVESTOR_FAQ.comp;
      else if (userMsg.includes('גיוס') || userMsg.includes('ask') || userMsg.includes('כמה')) response = INVESTOR_FAQ.ask;
      else if (userMsg.includes('שוק') || userMsg.includes('market')) response = INVESTOR_FAQ.market;

      setTimeout(() => {
         setChatHistory(prev => [...prev, { role: 'founder', text: response }]);
      }, 800);
   };

   useEffect(() => {
      window.speechSynthesis?.getVoices();
      return () => {
         window.speechSynthesis?.cancel();
         if (progressTimer.current) clearInterval(progressTimer.current);
      };
   }, []);

   if (isPlaying) {
      return (
         <div className="min-h-screen bg-[#020617] text-white flex font-assistant relative overflow-hidden transition-all duration-1000" dir="rtl">

            {/* Main Stage */}
            <div className="flex-1 flex flex-col items-center justify-center p-12 transition-all duration-1000">

               <div className="relative w-80 h-80 flex items-center justify-center mb-16">
                  <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />

                  {PITCH_SEGMENTS[currentSegment].visual === 'pain-pulse' && (
                     <div className="relative">
                        <Activity size={120} className="text-rose-500 animate-pulse relative z-10" />
                        <div className="absolute inset-0 border-4 border-rose-500/30 rounded-full animate-ping" />
                        <div className="absolute -top-12 -right-12 text-rose-500/20 blur-[2px] animate-pulse">המחשבות משקרות</div>
                     </div>
                  )}

                  {PITCH_SEGMENTS[currentSegment].visual === 'iron-dome' && (
                     <div className="relative">
                        <ShieldCheck size={140} className="text-blue-400 relative z-10 drop-shadow-[0_0_40px_rgba(96,165,250,0.6)]" />
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -inset-8 border border-blue-400/10 rounded-full animate-spin-slow" />
                     </div>
                  )}

                  {PITCH_SEGMENTS[currentSegment].visual === 'numbers-flow' && (
                     <div className="text-center space-y-4">
                        <div className="flex gap-2 justify-center">
                           <BarChart3 className="text-indigo-400 animate-bounce" size={40} />
                        </div>
                        <div className="text-8xl font-black text-white italic tracking-tightest">$450B</div>
                        <div className="text-xs font-black text-indigo-400/60 uppercase tracking-[0.4em]">Ready for disruption</div>
                     </div>
                  )}

                  {PITCH_SEGMENTS[currentSegment].visual === 'sovereignty-vision' && (
                     <div className="relative animate-in zoom-in duration-1000">
                        <Ticket size={140} className="text-amber-400 rotate-12 drop-shadow-[0_0_60px_rgba(251,191,36,0.6)]" />
                        <Sparkles size={40} className="absolute -top-4 -right-4 text-white animate-pulse" />
                     </div>
                  )}
               </div>

               <div className="max-w-3xl text-center space-y-8 z-10">
                  <h2 className="text-5xl md:text-7xl font-black italic tracking-tightest leading-tight bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent">
                     {PITCH_SEGMENTS[currentSegment].subtitle}
                  </h2>
                  <p className="text-lg text-slate-500 font-bold italic opacity-60 leading-relaxed px-12 line-clamp-3">
                     {PITCH_SEGMENTS[currentSegment].text}
                  </p>
               </div>

               {/* Timeline */}
               <div className="w-full max-w-4xl mt-32 space-y-8 px-4">
                  <div className="relative h-2 w-full bg-white/5 rounded-full overflow-visible">
                     <div
                        className="absolute h-full bg-gradient-to-r from-rose-500 via-blue-500 to-amber-400 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                        style={{ width: `${progress}%` }}
                     />
                     <div className="absolute inset-0 flex justify-between px-0 -top-1.5">
                        {PITCH_SEGMENTS.map((seg, i) => {
                           const elapsed = PITCH_SEGMENTS.slice(0, i).reduce((acc, curr) => acc + curr.duration, 0);
                           const pos = (elapsed / (totalPitchDuration / 1000)) * 100;
                           return (
                              <button
                                 key={seg.id}
                                 onClick={() => jumpToSegment(i)}
                                 className={`absolute w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center group -ml-2.5
                          ${i <= currentSegment ? 'bg-indigo-500 border-indigo-300 scale-110 shadow-[0_0_10px_rgba(99,102,241,0.8)]' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
                                 style={{ left: `${pos}%` }}
                              >
                                 <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all bg-slate-800 text-[10px] px-3 py-1.5 rounded-xl whitespace-nowrap font-black shadow-xl border border-white/5">
                                    {seg.label}
                                 </div>
                              </button>
                           )
                        })}
                        {/* End dot */}
                        <div className="absolute right-0 w-5 h-5 rounded-full border-2 border-slate-700 bg-slate-900 -mr-2.5" />
                     </div>
                  </div>
                  <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
                     <span>Departure: Pain</span>
                     <span className="text-indigo-400 animate-pulse">EMUNA 2.0 | DIGITAL SPACE EXPERIENCE</span>
                     <span>Destination: Sovereignty</span>
                  </div>
               </div>
            </div>

            {/* AI Analyist Sidebar */}
            <aside className={`fixed left-0 top-0 h-full bg-[#050608]/98 backdrop-blur-3xl border-r border-white/5 transition-all duration-500 flex flex-col z-50 ${chatOpen ? 'w-[400px]' : 'w-0 overflow-hidden'}`}>
               <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-[1rem] bg-indigo-600 flex items-center justify-center font-black text-xl shadow-lg border border-indigo-400/30">ע</div>
                     <div>
                        <h4 className="font-black text-base text-white italic">Emuna Analyst</h4>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                           <Fingerprint size={12} /> Live Support Engine
                        </span>
                     </div>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                  {chatHistory.map((msg, i) => (
                     <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[90%] p-5 rounded-[2rem] text-sm font-bold italic leading-relaxed shadow-xl border ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-bl-none border-indigo-400' : 'bg-white/5 text-slate-300 rounded-br-none border-white/5'}`}>
                           {msg.text}
                        </div>
                     </div>
                  ))}
               </div>

               <div className="p-8 border-t border-white/5 bg-slate-900/80">
                  <div className="relative">
                     <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="מה המודל? איך האבטחה? מי המתחרים?"
                        className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-5 pr-5 pl-14 text-sm italic focus:outline-none focus:border-indigo-500 transition-all font-bold text-white placeholder:text-slate-600"
                     />
                     <button
                        onClick={handleSendMessage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-500 transition-all shadow-lg"
                     >
                        <Send size={18} />
                     </button>
                  </div>
               </div>
            </aside>

            {/* Floating Actions */}
            <div className="fixed top-8 left-8 flex gap-4 z-[60]">
               <button
                  onClick={() => setChatOpen(!chatOpen)}
                  className={`px-6 py-4 rounded-full transition-all border flex items-center gap-3 font-black text-[10px] uppercase tracking-widest shadow-2xl
                ${chatOpen ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-900 border-white/10 hover:bg-white/5'}`}
               >
                  <MessageSquare size={18} className={chatOpen ? 'animate-bounce' : ''} />
                  <span>{chatOpen ? 'Close Analyst' : 'Talk to Analyst'}</span>
               </button>
               <button
                  onClick={() => { window.speechSynthesis.cancel(); setIsPlaying(false); setShowContent(false); setProgress(0); }}
                  className="bg-slate-900 border border-white/10 p-4 rounded-full hover:bg-white/5 transition-all text-slate-400 hover:text-white shadow-2xl"
               >
                  <RefreshCcw size={18} />
               </button>
            </div>
         </div>
      );
   }

   // Golden Ticket Reveal
   if (showContent) {
      return (
         <div className="min-h-screen bg-[#050608] text-white flex flex-col items-center justify-center p-8 font-assistant relative overflow-hidden" dir="rtl">

            {/* Particle Background or Aura */}
            <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 to-transparent pointer-events-none" />

            <div className="max-w-4xl text-center space-y-16 z-10 animate-in fade-in zoom-in duration-1000">

               <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 bg-indigo-500/10 text-indigo-400 px-8 py-3 rounded-full font-black text-[10px] tracking-[0.3em] border border-indigo-500/20 uppercase">
                     <Sparkles size={14} className="animate-pulse" /> Mission Success
                  </div>
                  <h2 className="text-7xl md:text-8xl font-black italic tracking-tightest leading-[0.9]">זה הכרטיס שלך <br /> <span className="text-indigo-500">לחופש התודעתי.</span></h2>
                  <p className="text-2xl text-slate-500 font-bold italic max-w-2xl mx-auto leading-relaxed">
                     אנחנו לא בונים עסק, אנחנו בונים עתיד שבו הנפש היא כבר לא בית סוהר. <br />
                     בוא לקחת חלק במהפכה הריבונית.
                  </p>
               </div>

               {/* The Ticket */}
               <div className="relative group perspective-2000 cursor-pointer">
                  <div className="relative w-[560px] h-[280px] bg-gradient-to-br from-amber-200 via-amber-500 to-amber-700 p-1 rounded-[2.5rem] shadow-[0_60px_120px_rgba(251,191,36,0.25)] transition-all duration-1000 group-hover:rotate-y-12 group-hover:rotate-x-8 group-hover:scale-105">
                     <div className="w-full h-full bg-slate-900 rounded-[2.2rem] p-12 flex justify-between items-center relative overflow-hidden border border-white/5">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px] rounded-full" />

                        <div className="space-y-10 relative text-right z-10">
                           <div className="space-y-2">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/50">Ticket Destination</h4>
                              <div className="text-4xl font-black italic text-white uppercase tracking-tightest">THE SOVEREIGN MIND</div>
                           </div>
                           <div className="flex gap-20">
                              <div className="space-y-1">
                                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Departure</h4>
                                 <div className="text-xl font-bold italic text-white/90 uppercase">Q3 2026</div>
                              </div>
                              <div className="space-y-1">
                                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Seat Type</h4>
                                 <div className="text-xl font-bold italic text-amber-500 uppercase tracking-widest">Visionary Partner</div>
                              </div>
                           </div>
                        </div>

                        <div className="h-full w-28 border-r-2 border-dashed border-white/10 flex flex-col justify-between py-2 items-center relative z-10 pl-4 mr-4">
                           <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20 shadow-inner">
                              <Ticket size={28} className="text-amber-400 rotate-12" />
                           </div>
                           <div className="rotate-90 text-[10px] font-black text-slate-600 uppercase tracking-[0.6em] whitespace-nowrap opacity-60">EMUNA 2.0 PASS</div>
                        </div>
                     </div>
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-amber-500/20 blur-[40px] rounded-full opacity-50" />
               </div>

               <div className="flex flex-wrap justify-center gap-8 pt-8">
                  <button
                     onClick={onStart}
                     className="bg-white text-black px-16 py-8 rounded-full font-black text-2xl shadow-[0_25px_60px_rgba(255,255,255,0.1)] hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all flex items-center gap-5 group"
                  >
                     קבע דמו עכשיו <ExternalLink size={28} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                     onClick={() => { setShowContent(false); playPitch(); }}
                     className="bg-white/5 border border-white/10 px-16 py-8 rounded-full font-black text-2xl hover:bg-white/10 transition-all text-slate-400 tracking-tight"
                  >
                     שמע שוב
                  </button>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-[#050608] text-white flex flex-col items-center justify-center p-8 font-assistant relative overflow-hidden" dir="rtl">

         {/* Background Ambience */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[220px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[220px] rounded-full" />
         </div>

         <div className="max-w-6xl w-full z-10 space-y-20 animate-in fade-in slide-in-from-bottom-12 duration-1000 text-center">
            <header className="space-y-10">
               <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-3 rounded-full backdrop-blur-3xl">
                  <Zap size={18} className="text-blue-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">THE DIGITAL SPACE | v4.0</span>
               </div>

               <h1 className="text-8xl md:text-[11rem] lg:text-[13rem] font-black italic tracking-tightest leading-[0.8] text-white">
                  THE <span className="text-indigo-500">DIGITAL</span> SPACE.
               </h1>

               <p className="text-2xl md:text-3xl text-slate-400 font-medium max-w-4xl mx-auto italic leading-tight">
                  זה לא רק מצגת. זה הכרטיס המלכותי שלך לעולם חדש. <br />
                  <span className="text-indigo-200/40 text-xl mt-4 inline-block">חוויה של 95 שניות שחושפת את מערכת ההפעלה למציאות (Reality-OS).</span>
               </p>
            </header>

            <div className="flex flex-col items-center gap-12">
               <button
                  onClick={playPitch}
                  className="group relative bg-[#1e40af] text-white px-24 py-11 rounded-[4rem] font-black text-4xl shadow-[0_40px_80px_rgba(30,64,175,0.4)] hover:shadow-[0_50px_100px_rgba(30,64,175,0.6)] hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all flex items-center gap-10 border border-blue-400/30 overflow-hidden"
               >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  כניסה למרחב החזון <Volume2 size={48} className="group-hover:rotate-12 transition-transform" />
               </button>
               <div className="flex items-center gap-6 text-slate-600 font-black text-[10px] uppercase tracking-[0.4em]">
                  <div className="flex items-center gap-2"><Activity size={12} className="text-rose-500" /> 95 Seconds</div>
                  <div className="w-1 h-1 bg-slate-800 rounded-full" />
                  <div className="flex items-center gap-2"><MessageSquare size={12} className="text-indigo-500" /> Analyst Included</div>
               </div>
            </div>

            <footer className="pt-32 border-t border-white/5 opacity-20">
               <p className="text-[10px] font-black uppercase tracking-[0.7em] italic">EMUNA REALITY-OS | COGNITIVE SOVEREIGNTY 2026</p>
            </footer>
         </div>
      </div>
   );
};

export default PitchDeck;
