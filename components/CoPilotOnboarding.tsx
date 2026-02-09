import React, { useState } from 'react';
import { Mic, Waves, Shield, Activity, User, Lock, ArrowLeft, BrainCircuit } from 'lucide-react';

interface CoPilotOnboardingProps {
    onComplete: () => void;
}

const CoPilotOnboarding: React.FC<CoPilotOnboardingProps> = ({ onComplete }) => {
    const [step, setStep] = useState<'welcome' | 'noise' | 'grounding' | 'contract'>('welcome');
    const [noiseLevel, setNoiseLevel] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-[#050608] text-white flex flex-col p-8 font-assistant overflow-hidden relative">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full animate-pulse" />

            {/* Header HUD */}
            <div className="relative z-10 flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                        <Lock size={18} />
                    </div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic">המערכת מוכנה</p>
                </div>
                <div className="text-[10px] font-black uppercase text-indigo-500 tracking-widest border border-indigo-500/20 px-3 py-1 rounded-lg">
                    רמת אבטחה מקסימלית
                </div>
            </div>

            <main className="flex-1 flex flex-col items-center justify-center relative z-10 text-center max-w-lg mx-auto w-full">

                {step === 'welcome' && (
                    <div className="space-y-12 animate-in fade-in duration-1000">
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-indigo-600 blur-[60px] opacity-20 animate-pulse" />
                            <BrainCircuit size={100} className="text-indigo-500 animate-float relative" />
                        </div>
                        <div className="space-y-6">
                            <h1 className="text-5xl font-black italic tracking-tighter leading-none">שלום יהונתן</h1>
                            <p className="text-xl text-slate-400 font-bold leading-relaxed px-4">
                                אני המערכת שתעזור לך לנהל את המרחב האווירי שלך. במקום טפסים, בוא פשוט נדבר.
                            </p>
                        </div>
                        <button
                            onClick={() => setStep('noise')}
                            className="bg-white text-black px-20 py-8 rounded-[3rem] font-black text-2xl shadow-2xl active:scale-95 transition-all flex items-center gap-4 mx-auto"
                        >
                            <Mic size={28} /> בוא נתחיל
                        </button>
                    </div>
                )}

                {step === 'noise' && (
                    <div className="space-y-16 w-full animate-in slide-in-from-bottom-8 duration-700">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black italic text-white leading-tight">מה רמת הרעש בראש <br /><span className="text-indigo-500">עכשיו, יהונתן?</span></h2>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">סמן על הקו</p>
                        </div>

                        <div className="space-y-8">
                            <input
                                type="range" min="1" max="10"
                                onChange={(e) => setNoiseLevel(parseInt(e.target.value))}
                                className="w-full h-12 bg-white/5 rounded-full appearance-none cursor-pointer accent-indigo-500"
                            />
                            <div className="flex justify-between px-2 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                                <span>שקט מוחלט</span>
                                <span>סערה חזקה</span>
                            </div>
                            <div className="text-[10rem] font-black text-indigo-500 italic leading-none drop-shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                                {noiseLevel || '?'}
                            </div>
                        </div>

                        <button
                            disabled={!noiseLevel}
                            onClick={() => setStep('grounding')}
                            className="w-full bg-indigo-600 text-white py-8 rounded-[3rem] font-black text-2xl shadow-2xl disabled:opacity-20 transition-all active:scale-95"
                        >
                            המשך
                        </button>
                    </div>
                )}

                {step === 'grounding' && (
                    <div className="space-y-12 animate-in zoom-in duration-700">
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-emerald-500 blur-[80px] opacity-20 animate-pulse" />
                            <Waves size={120} className="text-emerald-400 animate-pulse relative" />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black italic tracking-tight">הבנתי. בוא נוריד את זה ל-5.</h2>
                            <p className="text-xl text-slate-400 font-bold leading-relaxed">
                                קח אוויר עמוק. עכשיו, תסתכל על הנקודה הירוקה הזו ופשוט תנשום איתה.
                            </p>
                        </div>
                        <div className="w-24 h-24 bg-emerald-400 rounded-full animate-ping mx-auto opacity-40" />

                        <button
                            onClick={() => setStep('contract')}
                            className="bg-white/5 border border-white/10 text-slate-400 px-12 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:text-white transition-all"
                        >
                            מרגיש קצת יותר שקט
                        </button>
                    </div>
                )}

                {step === 'contract' && (
                    <div className="space-y-12 animate-in fade-in duration-1000">
                        <Shield size={100} className="text-indigo-400 mx-auto" />
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black italic tracking-tighter">ההסכם שלנו</h2>
                            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 text-right space-y-4">
                                <p className="text-sm font-medium leading-relaxed italic text-slate-300">
                                    "אני מתחייב להיות המלווה שלך, לא השופט שלך. אני כאן כדי לספק לך את הכלים, הדאטה וההגנה (Shield) כדי שאתה תוכל להוביל את המרחב האווירי שלך בצורה ריבונית."
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                    <Activity size={16} className="text-indigo-500" />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reality Anchor Enabled</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onComplete}
                            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-10 rounded-[3rem] font-black text-2xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4"
                        >
                            אני מסכים
                        </button>
                    </div>
                )}
            </main>

            {/* Footer ROI - Tactile Indicator */}
            <div className="relative z-10 py-8 border-t border-white/5 flex flex-col items-center gap-2">
                <div className="flex gap-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`w-8 h-1 rounded-full ${step === ['welcome', 'noise', 'grounding', 'contract'][i - 1] ? 'bg-indigo-500' : 'bg-white/10'}`} />
                    ))}
                </div>
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Privacy-First AI Sovereignty Engine</p>
            </div>
        </div>
    );
};

export default CoPilotOnboarding;
