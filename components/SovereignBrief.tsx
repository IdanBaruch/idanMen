import React, { useState, useEffect } from 'react';
import { ShieldCheck, Mic, ChevronLeft, Sun, Moon, Zap, Sparkles, Activity, CheckCircle2 } from 'lucide-react';

interface SovereignBriefProps {
    onBack: () => void;
}

const SovereignBrief: React.FC<SovereignBriefProps> = ({ onBack }) => {
    const [medTaken, setMedTaken] = useState(0);
    const [isAccepted, setIsAccepted] = useState(false);
    const [orbPulse, setOrbPulse] = useState(1);

    // Subtle orb animation
    useEffect(() => {
        const interval = setInterval(() => {
            setOrbPulse(p => p === 1 ? 1.05 : 1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#F9F9F9] text-[#191970] font-assistant p-6 md:p-12 relative overflow-hidden" dir="rtl">
            {/* Background elements for depth */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-50 rounded-full blur-[120px] opacity-50" />

            <header className="max-w-md mx-auto flex justify-between items-center mb-12 relative z-10">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <ChevronLeft size={24} className="rotate-180" />
                    </button>
                    <div>
                        <h1 className="text-xl font-light tracking-tight">בוקר טוב, <span className="font-bold text-[#191970]">עידן</span></h1>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">The Sovereign Brief</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
                    <ShieldCheck size={14} />
                    <span className="text-[9px] font-black uppercase tracking-tighter">Encrypted & Secure</span>
                </div>
            </header>

            <main className="max-w-md mx-auto space-y-8 relative z-10">
                {/* Bio-Sync Orb */}
                <div className="flex justify-center py-8">
                    <div
                        className="w-64 h-64 rounded-full relative flex items-center justify-center transition-transform duration-[2000ms] ease-in-out shadow-[0_0_80px_rgba(212,175,55,0.15)]"
                        style={{
                            transform: `scale(${orbPulse})`,
                            background: 'radial-gradient(circle at 30% 30%, #FFFFFF, #Eef2ff, #D4AF3715)'
                        }}
                    >
                        {/* Inner Glowing Orb */}
                        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#19197005] to-[#D4AF3715] blur-sm animate-pulse" />

                        <div className="text-center space-y-1 relative">
                            <Activity className="text-[#D4AF37] mx-auto mb-2" size={32} />
                            <div className="flex flex-col">
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Sleep Status</span>
                                <span className="text-2xl font-black italic">7.5h | Quality: High</span>
                            </div>
                        </div>

                        {/* Orbiting particles (CSS only simulation) */}
                        <div className="absolute inset-0 border border-indigo-50/50 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-[#D4AF37] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#D4AF37]" />
                    </div>
                </div>

                {/* Vault Insight Card */}
                <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 space-y-4 shadow-xl shadow-indigo-900/5">
                    <div className="flex items-center gap-3 text-[#191970]">
                        <Sparkles size={20} className="text-[#D4AF37]" />
                        <h3 className="text-sm font-black uppercase tracking-widest">System Insight</h3>
                    </div>
                    <p className="text-lg font-medium leading-[1.6] text-slate-600 italic">
                        "בהתבסס על ההיסטוריה הקלינית שלך (דוח סוטריה) ומזג האוויר הנוכחי: הרגישות שלך מוגברת עקב החום. שלמות המציאות שלך יציבה אך דורשת קרקוע."
                    </p>
                </div>

                {/* Sovereign Goal Card */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-[2.5rem] blur opacity-20" />
                    <div className="bg-white border-2 border-[#D4AF37]/30 rounded-[2.5rem] p-8 space-y-6 relative shadow-lg">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Zap size={20} className="text-[#D4AF37]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]">The Goal</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400">15 min mission</span>
                        </div>

                        <h4 className="text-2xl font-black italic tracking-tight leading-tight">
                            הליכה קשובה של 15 דקות בגינה. בלי טלפון. רק נשימה.
                        </h4>

                        <button
                            onClick={() => setIsAccepted(!isAccepted)}
                            className={`w-full py-5 rounded-2xl font-black italic text-lg transition-all flex items-center justify-center gap-3 ${isAccepted ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-[#191970] text-white shadow-indigo-900/20'} shadow-xl hover:scale-[1.02] active:scale-[0.98]`}
                        >
                            {isAccepted ? (
                                <><CheckCircle2 /> Goal Accepted</>
                            ) : (
                                <>I am Sovereign. I Accept.</>
                            )}
                        </button>
                    </div>
                </div>

                {/* Fuel Check (Medication) */}
                <div className="bg-slate-100/50 rounded-[2rem] p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Sun size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Fueling the Engine</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#191970]">Lithium & Zyprexa</span>
                    </div>

                    <div className="relative h-12 bg-white rounded-full border border-slate-200 p-1">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={medTaken}
                            onChange={(e) => setMedTaken(parseInt(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div
                            className="h-full bg-gradient-to-r from-[#191970] to-indigo-600 rounded-full flex items-center justify-end px-4 transition-all duration-300 shadow-lg"
                            style={{ width: `${Math.max(15, medTaken)}%` }}
                        >
                            {medTaken > 80 && <CheckCircle2 size={16} className="text-white" />}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${medTaken > 50 ? 'text-white' : 'text-slate-400'}`}>
                                {medTaken > 90 ? 'Confirmed' : 'Slide to Confirm Intake'}
                            </span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Voice Toggle */}
            <div className="fixed bottom-10 right-10 z-50 group flex items-center gap-4">
                <div className="bg-[#191970] text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Listen to the Brief
                </div>
                <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl border border-slate-100 hover:scale-110 active:scale-95 transition-all group">
                    <div className="absolute inset-0 bg-[#191970] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-5" />
                    <Mic className="text-[#191970] group-hover:text-amber-600 transition-colors" size={28} />
                </button>
            </div>
        </div>
    );
};

export default SovereignBrief;
