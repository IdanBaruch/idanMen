import React, { useState } from 'react';
import { Settings, Zap, Trophy, ChevronLeft, Target, BarChart3, CheckSquare, Award } from 'lucide-react';

interface OTPortalProps {
    onBack: () => void;
    onAddEntry: (content: any) => void;
}

const OTPortal: React.FC<OTPortalProps> = ({ onBack, onAddEntry }) => {
    const [scores, setScores] = useState({ focus: 5, initiative: 5, execution: 5 });
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = (withMedal: boolean = false) => {
        setIsSaving(true);
        setTimeout(() => {
            onAddEntry({
                scores,
                taskCompleted,
                medal: withMedal,
                timestamp: new Date().toISOString()
            });
            setIsSaving(false);
            setTaskCompleted(false);
            alert(withMedal ? 'מדליה נשלחה ובוצעה פקודה לספר הניצחונות! 🏅' : 'מדדי התפקוד עודכנו בהצלחה! 📈');
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#fafafc] text-slate-900 font-assistant p-8 md:p-16 flex flex-col items-center" dir="rtl">
            <header className="w-full max-w-4xl flex justify-between items-center mb-16">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-4 hover:bg-black/5 rounded-full transition-colors">
                        <ChevronLeft size={32} />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black italic text-slate-800 tracking-tighter">מדד התפקוד</h1>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">עדכון ספר הניצחונות על ידי מרפא בעיסוק</p>
                    </div>
                </div>
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl shadow-xl flex items-center justify-center text-white border border-emerald-400">
                    <Settings size={32} />
                </div>
            </header>

            <main className="w-full max-w-4xl space-y-8">
                {/* Function Sliders */}
                <section className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200 space-y-12">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                        <BarChart3 className="text-emerald-500" />
                        <h3 className="text-2xl font-black italic">איך יהונתן מתפקד היום?</h3>
                    </div>

                    <div className="space-y-12">
                        {[
                            { key: 'focus', label: 'מיקוד וריכוז (Focus)', color: 'accent-blue-500', icon: Target },
                            { key: 'initiative', label: 'יוזמה (Initiative)', color: 'accent-emerald-500', icon: Zap },
                            { key: 'execution', label: 'מוטוריקה/עשייה (Execution)', color: 'accent-orange-500', icon: Trophy }
                        ].map(m => (
                            <div key={m.key} className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-xl font-bold flex items-center gap-3">
                                        <m.icon size={20} className="text-slate-400" />
                                        {m.label}
                                    </label>
                                    <span className="text-3xl font-black italic text-slate-800">{scores[m.key as keyof typeof scores]}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={scores[m.key as keyof typeof scores]}
                                    onChange={(e) => setScores(prev => ({ ...prev, [m.key]: parseInt(e.target.value) }))}
                                    className={`w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer ${m.color}`}
                                />
                                <div className="flex justify-between text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                    <span>חלש</span>
                                    <span>מצוין</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Task Completion */}
                    <section className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200 flex flex-col items-center justify-center gap-6">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${taskCompleted ? 'bg-emerald-100 text-emerald-600 scale-110' : 'bg-slate-50 text-slate-300'}`}>
                            <CheckSquare size={40} />
                        </div>
                        <div className="text-center">
                            <h4 className="text-xl font-black">משימת היום</h4>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Daily Goal Status</p>
                        </div>
                        <button
                            onClick={() => setTaskCompleted(!taskCompleted)}
                            className={`px-8 py-3 rounded-2xl font-black transition-all ${taskCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                }`}
                        >
                            {taskCompleted ? 'הושלמה!' : 'סמן כהושלמה'}
                        </button>
                    </section>

                    {/* Gamification: Medal */}
                    <section className="bg-gradient-to-br from-amber-400 to-orange-600 p-10 rounded-[3rem] shadow-xl shadow-amber-900/10 flex flex-col items-center justify-center gap-6 text-white text-center">
                        <Award size={64} className="animate-bounce" />
                        <div>
                            <h4 className="text-2xl font-black italic">שלח מדליה (Bonus)</h4>
                            <p className="text-xs font-bold uppercase opacity-80 mt-1">Boost Sovereignty XP</p>
                        </div>
                        <button
                            onClick={() => handleSave(true)}
                            className="bg-white text-orange-600 px-10 py-4 rounded-3xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-lg"
                        >
                            שלח מדליה ועדכן! 🏅
                        </button>
                    </section>
                </div>

                <div className="pt-8">
                    <button
                        onClick={() => handleSave()}
                        disabled={isSaving}
                        className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-3xl hover:bg-black transition-all shadow-2xl active:scale-[0.98]"
                    >
                        {isSaving ? 'מעדכן...' : 'שלח לספר הניצחונות'}
                    </button>
                </div>
            </main>

            <footer className="mt-20 opacity-40 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest italic font-assistant">Emuna 2: Performance Tracking System | OT Unit</p>
            </footer>
        </div>
    );
};

export default OTPortal;
