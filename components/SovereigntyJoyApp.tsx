import React, { useState, useEffect, useRef } from 'react';
import {
    ShieldAlert, Zap, Thermometer, Mic, X, ChevronRight,
    Target, Info, RefreshCw, Activity, Shield, Brain,
    Eye, Volume2, Flame, Wind, MessageSquare
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { AppRole } from '../types';

type SovereigntyMode = 'hud' | 'panic' | 'scanner' | 'cooling' | 'live';

const SovereigntyJoyApp: React.FC<{
    onBack: () => void;
    userPoints?: number;
    onAddPoints?: (pts: number) => void;
}> = ({ onBack, userPoints = 0, onAddPoints }) => {
    const [mode, setMode] = useState<SovereigntyMode>('hud');
    const [svrnIndex, setSvrnIndex] = useState(64);
    const [panicStep, setPanicStep] = useState(0);
    const [scannerStep, setScannerStep] = useState(0);
    const [scannerData, setScannerData] = useState({ facts: '', story: '' });
    const [isLiveActive, setIsLiveActive] = useState(false);
    const [transcription, setTranscription] = useState({ user: '', ai: '' });
    const [coolingTemp, setCoolingTemp] = useState(85); // Degrees of "Anger"
    const [battery, setBattery] = useState(Math.floor(Math.random() * 20) + 70);

    // Sound Fallback (TTS)
    const speak = (text: string, tone: 'auth' | 'calm' = 'auth') => {
        if (!text || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'he-IL';
        utterance.rate = tone === 'auth' ? 1.0 : 0.8;
        utterance.pitch = tone === 'auth' ? 0.9 : 1.1;
        window.speechSynthesis.speak(utterance);
    };

    const addSvrn = (pts: number) => {
        setSvrnIndex(prev => Math.min(100, prev + pts));
        if (onAddPoints) onAddPoints(pts * 2);
    };

    const PanicFlow = () => (
        <div className="fixed inset-0 bg-black z-[500] flex flex-col items-center justify-center p-8 transition-all duration-1000">
            {panicStep === 0 && (
                <div className="space-y-12 text-center">
                    <ShieldAlert size={120} className="text-red-600 animate-pulse mx-auto" />
                    <h2 className="text-4xl font-black text-white tracking-[0.2em] uppercase">כיפת ברזל הופעלה</h2>
                    <p className="text-red-500 font-bold italic tracking-widest">ניתוק גירויים חיצוניים. התרכז בנקודה.</p>
                    <button onClick={() => setPanicStep(1)} className="bg-white text-black px-12 py-6 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all">המשך לריכוז</button>
                </div>
            )}
            {panicStep === 1 && (
                <div className="w-full h-full flex items-center justify-center relative">
                    <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping shadow-[0_0_20px_rgba(34,211,238,1)]" />
                    <p className="absolute bottom-20 text-cyan-400/50 font-mono text-xs uppercase tracking-widest">עקוב אחר המהבהב. נשימה עמוקה.</p>
                    <button onClick={() => setPanicStep(2)} className="absolute bottom-40 bg-cyan-600/20 text-cyan-400 border border-cyan-400 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest">אימות נתונים</button>
                </div>
            )}
            {panicStep === 2 && (
                <div className="space-y-12 text-center max-w-sm">
                    <h3 className="text-2xl font-black text-white">אימות מציאות (Data Mode)</h3>
                    <div className="grid gap-6">
                        <button onClick={() => setPanicStep(3)} className="bg-white/5 border border-white/20 p-6 rounded-2xl text-white text-right font-bold hover:bg-white/10 transition-all flex justify-between items-center">
                            <span>כמה אחוז סוללה יש לך?</span>
                            <span className="text-cyan-400">{battery}%</span>
                        </button>
                        <button onClick={() => setPanicStep(3)} className="bg-white/5 border border-white/20 p-6 rounded-2xl text-white text-right font-bold hover:bg-white/10 transition-all flex justify-between items-center">
                            <span>מה השעה עכשיו?</span>
                            <span className="text-cyan-400">{new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
                        </button>
                    </div>
                </div>
            )}
            {panicStep === 3 && (
                <div className="space-y-8 text-center">
                    <Target size={80} className="text-emerald-500 mx-auto" strokeWidth={3} />
                    <h3 className="text-3xl font-black text-white italic">השכל חזר לריבונות</h3>
                    <p className="text-emerald-400 font-bold">הנתונים מאומתים. הרגש תחת ניהול.</p>
                    <button onClick={() => { setPanicStep(0); setMode('hud'); addSvrn(10); }} className="bg-emerald-600 text-white px-12 py-6 rounded-2xl font-black shadow-[0_0_30px_rgba(16,185,129,0.3)]">חזרה ל-HUD</button>
                </div>
            )}
        </div>
    );

    const SnakeScanner = () => (
        <div className="fixed inset-0 bg-[#050505] z-[400] overflow-y-auto p-8 font-mono">
            <div className="max-w-xl mx-auto space-y-12 pt-12">
                <div className="flex items-center gap-4 text-cyan-400">
                    <Target />
                    <h2 className="text-2xl font-black uppercase tracking-widest">סורק הנחש (Logic Sort)</h2>
                </div>

                <div className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Data Input (מה קרה בפועל?)</label>
                        <textarea
                            value={scannerData.facts}
                            onChange={(e) => setScannerData(prev => ({ ...prev, facts: e.target.value }))}
                            className="w-full bg-[#111] border border-cyan-400/30 rounded-2xl p-6 text-white text-right outline-none focus:border-cyan-400 transition-all min-h-[120px]"
                            placeholder="לדוגמה: הוא לא ענה להדרכה שלי..."
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Snake Story (מה הדמיון אומר?)</label>
                        <textarea
                            value={scannerData.story}
                            onChange={(e) => setScannerData(prev => ({ ...prev, story: e.target.value }))}
                            className="w-full bg-[#111] border border-red-900/40 rounded-2xl p-6 text-white text-right outline-none focus:border-red-600 transition-all min-h-[120px]"
                            placeholder="לדוגמה: הוא מזלזל בי, כולם נגדי..."
                        />
                    </div>
                </div>

                <button
                    onClick={() => {
                        speak("הפרדה הושלמה. ביצוע שתיקה ריבונית.");
                        setScannerStep(1);
                    }}
                    disabled={!scannerData.facts || !scannerData.story}
                    className="w-full bg-cyan-600 text-white py-8 rounded-3xl font-black text-xl shadow-2xl active:scale-95 transition-all disabled:opacity-20"
                >
                    בצע הפרדה מוחלטת
                </button>

                {scannerStep === 1 && (
                    <div className="bg-emerald-950/20 border-2 border-emerald-500/30 p-8 rounded-[2.5rem] text-center space-y-6 animate-in zoom-in duration-500">
                        <Shield size={60} className="text-emerald-500 mx-auto" />
                        <h3 className="text-3xl font-black text-white italic underline underline-offset-8">שתיקה ריבונית (SVRN Silence)</h3>
                        <p className="text-emerald-400 font-bold leading-relaxed">
                            המגירה של הנתונים סגורה. המגירה של הדמיון מפורקת. <br />
                            הריבון לא מגיב לרעשי רקע.
                        </p>
                        <button
                            onClick={() => { setScannerStep(0); setMode('hud'); addSvrn(15); setScannerData({ facts: '', story: '' }) }}
                            className="bg-white text-black px-12 py-5 rounded-2xl font-black"
                        >
                            אשר פקודה
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020202] text-white font-mono flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden" dir="rtl">
            {/* Background HUD Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Top HUD Stats */}
            <div className="fixed top-0 left-0 right-0 p-8 flex justify-between items-start z-[100] bg-gradient-to-b from-black to-transparent">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-cyan-600/20 border border-cyan-400/50 rounded-xl flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-widest text-[#00e5ff] uppercase italic">Sovereignty HUD</h1>
                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.3em]">Mental Autonomy v4.0</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SVRN Index</p>
                            <p className="text-3xl font-black text-emerald-400 italic leading-none">{svrnIndex}%</p>
                        </div>
                        <div className="w-16 h-16 relative flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-emerald-500 transition-all duration-1000" strokeDasharray={176} strokeDashoffset={176 - (176 * svrnIndex) / 100} />
                            </svg>
                            <Activity size={16} className="absolute text-emerald-500 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
                {/* Main Tactical Modules */}
                <button
                    onClick={() => setMode('panic')}
                    className="bg-red-950/20 border-2 border-red-600/30 p-10 rounded-[3rem] text-right group hover:bg-red-600/10 hover:border-red-500 transition-all duration-500 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-2 h-full bg-red-600 group-hover:w-full group-hover:opacity-5 transition-all" />
                    <ShieldAlert size={48} className="text-red-500 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-black text-red-100 mb-2">כיפת ברזל</h3>
                    <p className="text-red-900 font-bold uppercase tracking-widest text-[10px] mb-4">Panic Protocol</p>
                    <p className="text-red-500/70 text-sm font-bold italic group-hover:text-red-400 transition-colors">ניתוק רעשים מנטליים ואימות מציאות מיידי.</p>
                </button>

                <button
                    onClick={() => setMode('scanner')}
                    className="bg-cyan-950/20 border-2 border-cyan-600/30 p-10 rounded-[3rem] text-right group hover:bg-cyan-600/10 hover:border-cyan-500 transition-all duration-500 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-2 h-full bg-cyan-600 group-hover:w-full group-hover:opacity-5 transition-all" />
                    <Target size={48} className="text-cyan-500 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-black text-cyan-100 mb-2">סורק הנחש</h3>
                    <p className="text-cyan-900 font-bold uppercase tracking-widest text-[10px] mb-4">Delusion Neutralizer</p>
                    <p className="text-cyan-500/70 text-sm font-bold italic group-hover:text-cyan-400 transition-colors">מיון מגירות והפרדה בין נתונים לדמיון.</p>
                </button>

                <button
                    onClick={() => setMode('cooling')}
                    className="bg-orange-950/20 border-2 border-orange-600/30 p-10 rounded-[3rem] text-right group hover:bg-orange-600/10 hover:border-orange-500 transition-all duration-500 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-2 h-full bg-orange-600 group-hover:w-full group-hover:opacity-5 transition-all" />
                    <Flame size={48} className="text-orange-500 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-black text-orange-100 mb-2">פרוטוקול קירור</h3>
                    <p className="text-orange-900 font-bold uppercase tracking-widest text-[10px] mb-4">Anger Management</p>
                    <p className="text-orange-500/70 text-sm font-bold italic group-hover:text-orange-400 transition-colors">בניית גדר וירטואלית לעצירת התפרצות.</p>
                </button>

                <button
                    onClick={() => setMode('live')}
                    className="bg-emerald-950/20 border-2 border-emerald-600/30 p-10 rounded-[3rem] text-right group hover:bg-emerald-600/10 hover:border-emerald-500 transition-all duration-500 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600 group-hover:w-full group-hover:opacity-5 transition-all" />
                    <Mic size={48} className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-black text-emerald-100 mb-2">קשר ישיר</h3>
                    <p className="text-emerald-900 font-bold uppercase tracking-widest text-[10px] mb-4">Sovereign Live</p>
                    <p className="text-emerald-500/70 text-sm font-bold italic group-hover:text-emerald-400 transition-colors">דיבור חופשי עם הריבון בזמן אמת.</p>
                </button>
            </main>

            {/* Logic for Protocols */}
            {mode === 'panic' && <PanicFlow />}
            {mode === 'scanner' && <SnakeScanner />}

            {mode === 'cooling' && (
                <div className="fixed inset-0 bg-[#050505] z-[400] flex flex-col items-center justify-center p-8 space-y-12">
                    <h2 className="text-4xl font-black text-orange-500 uppercase italic">מדידת חום מנטלי</h2>
                    <div className="w-full max-w-sm space-y-12">
                        <div className="relative h-24 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
                            <div className="absolute top-0 right-0 h-full bg-gradient-to-l from-red-600 to-orange-400 transition-all duration-1000" style={{ width: `${coolingTemp}%` }} />
                            <div className="absolute inset-0 flex items-center justify-center font-black text-3xl italic tracking-tighter shadow-sm">{coolingTemp}°</div>
                        </div>

                        <p className="text-slate-400 font-bold text-center italic leading-relaxed px-8">הכעס הוא אש. הנשימה היא מים. <br /> תרגל בלימה אקטיבית של 10 שניות.</p>

                        <button
                            onClick={() => {
                                setCoolingTemp(prev => Math.max(36, prev - 20));
                                if (coolingTemp < 50) { setMode('hud'); addSvrn(12); }
                            }}
                            className="w-full bg-orange-600 text-white py-8 rounded-3xl font-black text-2xl shadow-2xl active:scale-95 transition-all"
                        >
                            בצע נשימת בלימה
                        </button>
                    </div>
                    <button onClick={() => setMode('hud')} className="text-white/20 font-black uppercase text-xs tracking-widest">בטל פרוטוקול</button>
                </div>
            )}

            {/* Footer Return */}
            <footer className="fixed bottom-12 right-0 left-0 px-8 flex justify-center z-[110]">
                <button
                    onClick={onBack}
                    className="bg-white/5 border border-white/20 backdrop-blur-md text-white py-4 px-12 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all shadow-2xl"
                >
                    יציאה מהממלכה
                </button>
            </footer>
        </div>
    );
};

export default SovereigntyJoyApp;
