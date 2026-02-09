import React, { useState } from 'react';
import { Mic, Megaphone, ShieldAlert, Heart, User, FileText, ChevronLeft, Volume2, ShieldCheck, Zap } from 'lucide-react';

const VoiceProxy: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
    const [view, setView] = useState<'setup' | 'main' | 'sharing'>('main');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [activeScript, setActiveScript] = useState<string | null>(null);
    const [isSharing, setIsSharing] = useState(false);

    const DIGNITY_SCRIPTS = [
        {
            id: 's1',
            title: 'הסבר לצוות רפואי',
            description: 'אני חווה משבר קוגניטיבי, נא לקרוא את הכרטיס שלי.',
            voiceText: 'שלום, אני חווה כרגע מצב של עומס קוגניטיבי משמעותי. אני מבקש שתסתכלו על כרטיס המטופל שלי המופיע במסך. אני זקוק לסביבה שקטה וליחס סבלני עד שהמערכת שלי תתייצב.',
            icon: FileText,
            color: 'bg-indigo-500'
        },
        {
            id: 's2',
            title: 'בקשת שקט',
            description: 'אני מרגיש מוצף וזקוק למרחב בטוח.',
            voiceText: 'אני מרגיש הצפה חושית כרגע. בבקשה תנו לי כמה דקות של שקט במקום רגוע. אני מנסה לווסת את עצמי בעזרת האפליקציה.',
            icon: ShieldAlert,
            color: 'bg-rose-500'
        },
        {
            id: 's3',
            title: 'בדיקת מציאות',
            description: 'זיהוי ה-AI שלי מופעל, אני בטוח.',
            voiceText: 'הכל בסדר, אני מפעיל כרגע את הגנות המציאות שלי. אני מבין שמה שאני חווה כרגע הוא חלק מהמחלה, ואני משתמש ב-Co-Pilot שלי כדי להתעגן במציאות.',
            icon: Zap,
            color: 'bg-cyan-500'
        }
    ];

    const handleSpeak = (script: any) => {
        setIsSpeaking(true);
        setActiveScript(script.id);

        // Simulating the "Dignity Voice" - Calm, Stable AI
        const utterance = new SpeechSynthesisUtterance(script.voiceText);
        utterance.lang = 'he-IL';
        utterance.rate = 0.9; // Calm and steady
        utterance.pitch = 1.0;

        window.speechSynthesis.speak(utterance);

        utterance.onend = () => {
            setIsSpeaking(false);
            setActiveScript(null);
        };
    };

    return (
        <div className="flex flex-col h-full font-assistant relative" dir="rtl">
            {/* Header HUD */}
            <div className="flex items-center justify-between mb-8">
                <button onClick={onBack} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400">
                    <ChevronLeft size={24} />
                </button>
                <div className="text-center">
                    <h2 className="text-2xl font-black italic tracking-tighter text-white">גשר הכבוד (Dignity Bridge)</h2>
                    <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest italic">Cognitive Prosthetic: Voice Proxy v1.1</p>
                </div>
                <button onClick={() => setView('setup')} className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all">
                    <Mic size={20} />
                </button>
            </div>

            {view === 'setup' ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-12 animate-in zoom-in duration-500 text-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500 blur-[60px] opacity-20 animate-pulse" />
                        <Mic size={80} className="text-indigo-500 relative" />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-3xl font-black italic">כיול קול הריבון</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            כדי שהמערכת תוכל לדבר בשמך ברגעי משבר, אנחנו צריכים שתקרא כמה משפטים בזמן שאתה מרגיש יציב. זה יוצר את ה"עוגן הקולי" שלך.
                        </p>
                    </div>
                    <div className="w-full bg-white/5 p-6 rounded-3xl border border-white/5">
                        <p className="text-lg font-bold italic text-white animate-pulse">"אני יהונתן, ואני שומר על הריבונות שלי."</p>
                    </div>
                    <button onClick={() => setView('main')} className="w-full bg-indigo-600 py-6 rounded-full font-black text-xl shadow-2xl">
                        התחל כיול (Voice Clone)
                    </button>
                    <button onClick={() => setView('main')} className="text-slate-500 text-xs font-bold uppercase tracking-widest">דלג כרגע (השתמש בקול ברירת מחדל)</button>
                </div>
            ) : view === 'sharing' ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 animate-in slide-in-from-left duration-500 text-center">
                    <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400">
                        <ShieldCheck size={48} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black italic">ההודעה נשלחה לאמא</h3>
                        <p className="text-slate-400 text-sm italic">
                            "אמא, הכל בסדר. אני משתמש במלווה שלי כדי לווסת את עצמי. אדבר איתך עוד כמה דקות."
                        </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4 w-full">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Family Bridge: Connected & Peaceful</span>
                    </div>
                    <button onClick={() => setView('main')} className="w-full bg-white/10 py-6 rounded-full font-black text-xl border border-white/10">חזרה לגשר</button>
                </div>
            ) : (
                <div className="flex-1 space-y-8 overflow-y-auto no-scrollbar pb-12 animate-in fade-in duration-500">
                    {/* ID Card / Translator Mode (The "Anchor" for others) */}
                    <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/30 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4">
                            <ShieldCheck size={40} className="text-indigo-500/20" />
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 shadow-inner">
                                    <User size={32} className="text-indigo-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-black text-white italic">יהונתן ברוך</h3>
                                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">ID: #YHNTN-812 | Status: Sovereignty-Active</p>
                                </div>
                                <button onClick={() => setView('sharing')} className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-500/30 text-indigo-400" title="שתף עם צוות/משפחה">
                                    <Megaphone size={18} />
                                </button>
                            </div>

                            <div className="bg-black/40 p-6 rounded-[2rem] border border-white/5 space-y-3">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Clinical Note for Observer:</p>
                                <p className="text-xs text-indigo-100 italic leading-relaxed font-medium">
                                    "יהונתן משתמש ב'קול חלופי' כעת. הוא עשוי להיראות לא מגיב או מבולבל, אך הוא שומע אתכם. נא לתקשר איתו דרך תשובות של 'כן' ו'לא' ולהעניק לו מרחב שקט."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tactile Communication Pads */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-2">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 italic">בחר הודעה להשמעה (Tactile Pads)</h3>
                            <button onClick={() => setView('sharing')} className="text-[10px] font-black text-emerald-400 uppercase tracking-widest animate-pulse">שלח למשפחה</button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {DIGNITY_SCRIPTS.map((script) => (
                                <button
                                    key={script.id}
                                    onClick={() => handleSpeak(script)}
                                    className={`group relative p-8 rounded-[2.5rem] border-2 transition-all duration-300 flex items-center gap-6 ${activeScript === script.id
                                            ? 'bg-white border-white scale-95 shadow-[0_0_50px_rgba(255,255,255,0.4)]'
                                            : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10 active:scale-95'
                                        }`}
                                >
                                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all ${activeScript === script.id ? 'bg-black text-white' : `${script.color} text-white shadow-xl`
                                        }`}>
                                        {activeScript === script.id ? <Volume2 size={32} className="animate-pulse" /> : <script.icon size={32} />}
                                    </div>
                                    <div className="text-right flex-1">
                                        <h4 className={`text-xl font-black italic transition-colors ${activeScript === script.id ? 'text-black' : 'text-white'}`}>
                                            {script.title}
                                        </h4>
                                        <p className={`text-xs font-bold transition-colors ${activeScript === script.id ? 'text-slate-600' : 'text-slate-400'}`}>
                                            {script.description}
                                        </p>
                                    </div>
                                    <Megaphone className={`transition-all ${activeScript === script.id ? 'text-black opacity-100 scale-125' : 'text-slate-600 opacity-20 group-hover:opacity-40'}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Status Toggles */}
                    <div className="flex gap-4">
                        <div className="flex-1 bg-white/5 p-6 rounded-[2rem] border border-white/5 flex flex-col items-center gap-2">
                            <Heart size={20} className="text-rose-500" />
                            <span className="text-[10px] font-black text-slate-500 uppercase">מצב רגשי</span>
                            <span className="text-xs font-black text-white italic">מוגן</span>
                        </div>
                        <div className="flex-1 bg-white/5 p-6 rounded-[2rem] border border-white/5 flex flex-col items-center gap-2">
                            <ShieldAlert size={20} className="text-indigo-400" />
                            <span className="text-[10px] font-black text-slate-500 uppercase">הגנות</span>
                            <span className="text-xs font-black text-white italic">פעילות</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Speaking Status Overlay */}
            {isSpeaking && (
                <div className="absolute inset-0 bg-indigo-600/20 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-12 text-center space-y-8 animate-in fade-in">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.6)] animate-pulse">
                        <Volume2 size={60} className="text-indigo-600" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-2xl font-black italic text-white leading-none">הקול שלך מושמע כעת</p>
                        <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest animate-bounce">Stable Dignity Voice: Active</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceProxy;
