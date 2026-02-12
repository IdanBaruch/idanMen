import React from 'react';
import { Sparkles, Brain, Trophy, Anchor, ChevronRight, Star, Heart, Activity } from 'lucide-react';
import { LedgerEntry } from '../types';

interface DailyDigestProps {
    entries: LedgerEntry[];
    onBack: () => void;
}

const DailyDigest: React.FC<DailyDigestProps> = ({ entries, onBack }) => {
    // Filter for today's entries (simulation)
    const today = new Date().toDateString();
    const todayEntries = entries.filter(e => new Date(e.date).toDateString() === today);

    const psychEntry = todayEntries.find(e => e.type === 'psychologist');
    const otEntry = todayEntries.find(e => e.type === 'ot');
    const swEntry = todayEntries.find(e => e.type === 'social_worker');

    return (
        <div className="min-h-screen bg-[#05060a] text-white font-assistant p-8 md:p-16 flex flex-col items-center overflow-x-hidden" dir="rtl">
            {/* Header */}
            <header className="w-full max-w-2xl flex justify-between items-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                        <Star className="text-white animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black italic tracking-tighter">היום שלך במספרים</h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">סיכום הניצחונות היומי</p>
                    </div>
                </div>
                <button onClick={onBack} className="p-4 hover:bg-white/5 rounded-full transition-colors rotate-180">
                    <ChevronRight size={24} />
                </button>
            </header>

            <main className="w-full max-w-2xl space-y-8 pb-32">
                {/* Introduction */}
                <div className="bg-gradient-to-br from-indigo-900/40 to-black p-10 rounded-[3rem] border border-white/5 space-y-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[80px]" />
                    <h2 className="text-2xl font-black italic leading-tight">יהונתן, המערכת כולה עובדת בשבילך.</h2>
                    <p className="text-slate-400 font-medium leading-relaxed">
                        הנה ריכוז התובנות וההישגים שצוות המלווים שלך תיעד היום בספר הניצחונות. כל שורה כאן היא הוכחה לריבונות שלך.
                    </p>
                </div>

                {/* Psychologist Section */}
                {psychEntry && (
                    <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-6 animate-in slide-in-from-bottom-8 duration-700">
                        <div className="flex items-center gap-3">
                            <Brain className="text-purple-400" />
                            <h3 className="text-xl font-black italic">הפסיכולוג שלך הוסיף 'בלוק תובנה'</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {psychEntry.content.tags.map((tag: string) => (
                                <span key={tag} className="bg-purple-500/20 text-purple-300 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-500/30">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p className="text-xl italic font-medium text-slate-200 border-r-4 border-purple-500 pr-6 py-2">
                            "{psychEntry.content.narrative}"
                        </p>
                    </div>
                )}

                {/* OT Section */}
                {otEntry && (
                    <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-8 animate-in slide-in-from-bottom-8 duration-700 [animation-delay:0.2s]">
                        <div className="flex items-center gap-3">
                            <Trophy className="text-emerald-400" />
                            <h3 className="text-xl font-black italic">איך תפקדתי היום?</h3>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: 'מיקוד', value: otEntry.content.scores.focus },
                                { label: 'יוזמה', value: otEntry.content.scores.initiative },
                                { label: 'ביצוע', value: otEntry.content.scores.execution }
                            ].map(score => (
                                <div key={score.label} className="text-center bg-white/5 p-6 rounded-3xl border border-white/5">
                                    <p className="text-[10px] font-black text-slate-500 uppercase">{score.label}</p>
                                    <p className="text-4xl font-black italic mt-2 text-emerald-400">{score.value}</p>
                                    <p className="text-[8px] font-bold text-slate-600 mt-1">/ 10</p>
                                </div>
                            ))}
                        </div>

                        {otEntry.content.medal && (
                            <div className="flex items-center gap-4 bg-amber-500/10 p-6 rounded-3xl border border-amber-500/20 text-amber-400">
                                <Star fill="currentColor" size={32} />
                                <div>
                                    <p className="font-black italic text-lg leading-tight">קיבלת מדליית ריבונות!</p>
                                    <p className="text-[10px] font-bold opacity-70">שיפור במדד הריבונות הופעל</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Social Worker Section */}
                {swEntry && (
                    <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-6 animate-in slide-in-from-bottom-8 duration-700 [animation-delay:0.4s]">
                        <div className="flex items-center gap-3">
                            <Anchor className="text-blue-400" />
                            <h3 className="text-xl font-black italic">קצב ההתקדמות שלי</h3>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                            {swEntry.content.pillars.map((pillar: any) => (
                                <div key={pillar.id} className="min-w-[120px] bg-white/5 p-4 rounded-3xl border border-white/5 flex flex-col items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full ${pillar.status === 'green' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
                                        pillar.status === 'yellow' ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' :
                                            'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                                        }`} />
                                    <span className="text-[10px] font-black whitespace-nowrap">{pillar.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="bg-blue-500/5 p-6 rounded-3xl border border-blue-500/20">
                            <p className="text-slate-300 italic">"{swEntry.content.anchorNote}"</p>
                        </div>
                    </div>
                )}

                {/* Motivation Footer */}
                <div className="text-center pt-8 space-y-4 opacity-70">
                    <Heart className="mx-auto text-rose-500 animate-pulse" />
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">אתה הריבון של הסיפור שלך.</p>
                </div>
            </main>

            {/* Chameleon Nav (Fixed) */}
            <div className="fixed bottom-12 left-12 right-12 z-50 flex justify-center">
                <button onClick={onBack} className="bg-white text-black px-12 py-5 rounded-full font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                    חזרה לריבונות <Activity size={20} className="text-indigo-600" />
                </button>
            </div>
        </div>
    );
};

export default DailyDigest;
