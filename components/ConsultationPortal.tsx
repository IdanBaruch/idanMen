import React, { useState } from 'react';
import { ChevronLeft, Info, ClipboardList, Search, Activity, Link2, Sparkles } from 'lucide-react';
import { decodePsychiatricSummary } from '../services/geminiService';

interface ConsultationPortalProps {
    onBack: () => void;
    onAddPoints: (pts: number) => void;
}

const ConsultationPortal: React.FC<ConsultationPortalProps> = ({ onBack, onAddPoints }) => {
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [isDecoding, setIsDecoding] = useState(false);
    const [decodedResult, setDecodedResult] = useState<string | null>(null);

    const MOCK_CONSULTATION = {
        id: 'Z-449',
        specialist: 'נוירולוגיה',
        doctor: 'ד"ר לוי',
        status: 'הושלם (תשובה בתיק)',
        rawResult: 'בבדיקה נוירולוגית: עצבים קרניאליים תקינים. לא נמצא חסר מוטורי או סנסורי. החזרים הופקו שווים. המלצה: המשך מעקב וביצוע EEG בחסך שינה.',
        date: '08/02/2026'
    };

    const handleDecode = async () => {
        setIsDecoding(true);
        const result = await decodePsychiatricSummary(MOCK_CONSULTATION.rawResult);
        setDecodedResult(result);
        setIsDecoding(false);
        onAddPoints(20);
    };

    return (
        <div className="min-h-screen bg-[#020408] text-white font-assistant p-8" dir="rtl">
            {/* Header */}
            <header className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                        <ChevronLeft size={24} className="rotate-180" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black italic tracking-tighter text-indigo-400">פורטל המומחים <span className="text-white font-light">Consultations</span></h1>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none mt-1">Sovereign Decision Support Flow</p>
                    </div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest italic">Z-Order Sync: Live</span>
                </div>
            </header>

            <main className="max-w-3xl mx-auto space-y-8">
                {view === 'list' ? (
                    <div className="space-y-6">
                        <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1 h-full bg-indigo-500" />
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="bg-indigo-500/20 text-indigo-400 text-[10px] font-black px-3 py-1 rounded-full border border-indigo-500/30 w-fit mb-3">בקשה פעילה</div>
                                    <h3 className="text-2xl font-black">{MOCK_CONSULTATION.specialist}</h3>
                                    <p className="text-slate-400 text-sm font-bold">הוזמן ע"י {MOCK_CONSULTATION.doctor} | {MOCK_CONSULTATION.date}</p>
                                </div>
                                <div className="p-4 bg-indigo-500/10 rounded-2xl">
                                    <ClipboardList className="text-indigo-400" size={28} />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    onClick={() => setView('detail')}
                                    className="flex-1 bg-white text-black py-4 rounded-2xl font-black italic hover:scale-[1.02] transition-transform"
                                >
                                    צפה בתוצאות (מפוענח)
                                </button>
                                <button className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10">
                                    <Info size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative group">
                            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="חפש ייעוצים קודמים או מומחים..."
                                className="w-full bg-slate-900/50 border border-white/5 rounded-3xl py-6 pr-16 pl-6 font-bold text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-700">
                        <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-[3rem] p-10 space-y-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-indigo-400">
                                    <Activity size={24} />
                                    <h4 className="text-xl font-black tracking-tighter italic">סיכום המפגש הקליני</h4>
                                </div>
                                <div className="bg-black/40 p-6 rounded-3xl border border-white/5 text-slate-300 font-mono text-xs leading-relaxed">
                                    {MOCK_CONSULTATION.rawResult}
                                </div>
                            </div>

                            {!decodedResult ? (
                                <button
                                    onClick={handleDecode}
                                    disabled={isDecoding}
                                    className="w-full bg-indigo-600 text-white py-8 rounded-[2rem] font-black text-xl shadow-[0_10px_0_rgb(67,56,202)] flex items-center justify-center gap-4 hover:brightness-110 active:translate-y-2 active:shadow-none transition-all"
                                >
                                    {isDecoding ? (
                                        <>
                                            <Sparkles className="animate-spin" />
                                            <span>מפענח שפה רפואית...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Link2 />
                                            <span>פענח ל"שפת ריבונית"</span>
                                        </>
                                    )}
                                </button>
                            ) : (
                                <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-[2.5rem] p-8 space-y-6 animate-in fade-in duration-1000">
                                    <div className="flex items-center gap-3 text-emerald-400">
                                        <Sparkles />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Decoded Analysis</span>
                                    </div>
                                    <div className="text-white font-bold leading-loose whitespace-pre-wrap italic">
                                        {decodedResult}
                                    </div>
                                    <button
                                        onClick={() => setView('list')}
                                        className="text-emerald-500 font-black text-xs uppercase tracking-widest hover:underline"
                                    >
                                        חזרה לרשימה
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ConsultationPortal;
