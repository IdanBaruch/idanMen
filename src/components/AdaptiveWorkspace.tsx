
import React, { useState, useEffect } from 'react';
import {
    Briefcase, TrendingUp, CheckCircle2, AlertCircle,
    Wallet, Clock, Zap, MessageSquare, ArrowLeft,
    Coffee, Layout, Terminal, Sun, Moon, Star
} from 'lucide-react';

interface Task {
    id: string;
    title: string;
    reward: number;
    completed: boolean;
    type: 'virtual' | 'physical';
}

const AdaptiveWorkspace: React.FC<{ onBack: () => void; userPoints: number; onAddPoints: (a: number) => void }> = ({ onBack, userPoints, onAddPoints }) => {
    const [fitnessScore, setFitnessScore] = useState(82);
    const [status, setStatus] = useState<'fit' | 'partial' | 'rest'>('fit');
    const [activeTrack, setActiveTrack] = useState<'nursery' | 'logistics' | 'animals' | 'community' | null>(null);
    const [activeRole, setActiveRole] = useState<string | null>("מנהל מרחב המוזיקה");
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', title: 'העברת שתילים לעציצים (משתלת כפר מל"ל)', reward: 40, completed: false, type: 'physical' },
        { id: '2', title: 'הרכבת קרטונים וקיפול (נווה נאמן)', reward: 30, completed: false, type: 'physical' },
        { id: '5', title: 'עדכון פלייליסט ערבית במחלקה', reward: 20, completed: true, type: 'virtual' },
        { id: '6', title: 'פגישת ועדת קליטה - קבלת מטופל חדש', reward: 50, completed: false, type: 'physical' },
    ]);

    const victoryBook = [
        { date: '10.02', achivement: 'השלמתי משמרת מלאה במשתלה למרות העומס.', mood: 'גאווה' },
        { date: '08.02', achivement: 'הרווחתי את ה-100 ש"ח הראשונים שלי מעבודה.', mood: 'עצמאות' }
    ];

    useEffect(() => {
        if (fitnessScore > 80) setStatus('fit');
        else if (fitnessScore > 40) setStatus('partial');
        else setStatus('rest');
    }, [fitnessScore]);

    const completeTask = (id: string, reward: number) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: true } : t));
        onAddPoints(reward);

        // Play sound simulation
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3');
        audio.play().catch(() => { });
    };

    return (
        <div className="min-h-screen bg-[#050608] text-white p-6 md:p-12 font-assistant relative overflow-hidden" dir="rtl">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <header className="max-w-4xl mx-auto flex justify-between items-center mb-12 relative z-10">
                <button onClick={onBack} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all">
                    <ArrowLeft size={24} />
                </button>
                <div className="text-center">
                    <h1 className="text-3xl font-black italic tracking-tighter">המרחב הריבוני</h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Occupational Identity Engine</p>
                </div>
                <div className="flex items-center gap-4">
                    {activeRole && (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-2 rounded-2xl flex items-center gap-3">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <div className="text-right">
                                <p className="text-[8px] font-black text-slate-500 uppercase">הזהות המקצועית שלי</p>
                                <p className="text-sm font-black text-emerald-400">{activeRole}</p>
                            </div>
                        </div>
                    )}
                    <div className="bg-indigo-600/20 border border-indigo-500/30 px-6 py-3 rounded-2xl flex items-center gap-4">
                        <Wallet className="text-indigo-400" />
                        <div className="text-right">
                            <p className="text-[8px] font-black text-slate-500 uppercase">ארנק ריבוני</p>
                            <p className="text-xl font-black">₪ {userPoints.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">

                {/* Fitness Score Card */}
                <div className="md:col-span-2 space-y-8">
                    <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 transition-all duration-1000 ${status === 'fit' ? 'bg-emerald-500' : status === 'partial' ? 'bg-amber-500' : 'bg-rose-500'}`} />

                        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                            <div className="space-y-4 text-right">
                                <h2 className="text-4xl font-black italic">כשירות הריבון</h2>
                                <p className="text-lg text-slate-400 font-bold italic leading-tight">
                                    {status === 'fit' && "ריבון, המערכת מזהה יום מעולה. זה הזמן ללחוץ על הגז ולהוביל."}
                                    {status === 'partial' && "ריבון, הבוקר קצת מאתגר. המעסיק עודכן - עבוד היום בקצב הריבוני שלך."}
                                    {status === 'rest' && "יום למילוי מצברים. הריבונות שלך היא קודם כל בריאות חזקה."}
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                        <Zap size={16} className="text-indigo-400" />
                                        <span className="text-xs font-black uppercase">Vitals Scanned</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                        <MessageSquare size={16} className="text-emerald-400" />
                                        <span className="text-xs font-black uppercase">Employer Notified</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute -top-12 -left-12 bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-2xl shadow-2xl z-20 group-hover:-translate-y-2 transition-all">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[8px] font-black">{i}</div>
                                            ))}
                                            <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-slate-900 flex items-center justify-center text-[8px] font-black mr-2">🚐</div>
                                        </div>
                                        <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Squad ID: SHALVATA-4</span>
                                        <span className="text-[10px] font-bold text-white italic">הקבוצה שלך בדרך ליעד</span>
                                    </div>
                                </div>
                                <svg className="w-48 h-48 -rotate-90">
                                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
                                        strokeDasharray={552.92} strokeDashoffset={552.92 - (552.92 * fitnessScore) / 100}
                                        className={`transition-all duration-[2000ms] ${status === 'fit' ? 'text-emerald-500' : status === 'partial' ? 'text-amber-500' : 'text-rose-500'}`}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-5xl font-black">{fitnessScore}%</span>
                                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Efficiency</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tasks Section */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center px-4">
                            <h3 className="text-2xl font-black italic">משימות משמעות (עשייה = כסף)</h3>
                            <TrendingUp className="text-indigo-400" />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {tasks.map(task => (
                                <button
                                    key={task.id}
                                    disabled={task.completed}
                                    onClick={() => completeTask(task.id, task.reward)}
                                    className={`p-8 rounded-[2.5rem] border transition-all text-right flex items-center justify-between group ${task.completed ? 'bg-emerald-500/10 border-emerald-500/20 opacity-60 pointer-events-none' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:-translate-x-2'}`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${task.completed ? 'bg-emerald-500 text-white' : 'bg-indigo-600/20 text-indigo-400 group-hover:scale-110'}`}>
                                            {task.type === 'virtual' ? <Terminal size={28} /> : <Briefcase size={28} />}
                                        </div>
                                        <div className="space-y-1">
                                            <p className={`text-xl font-black ${task.completed ? 'line-through text-slate-500' : ''}`}>{task.title}</p>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{task.type === 'virtual' ? 'דיגיטלי / מהבית' : 'פיזי / במרכז תעסוקה'}</p>
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-2xl font-black ${task.completed ? 'text-emerald-500' : 'text-indigo-400'}`}>+ ₪{task.reward}</p>
                                        {task.completed && <CheckCircle2 size={20} className="text-emerald-500 ml-auto" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Insights & Economic Story */}
                <div className="space-y-8">
                    <div className="bg-indigo-900/40 border border-indigo-500/20 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                        <div className="relative space-y-6">
                            <h4 className="text-xl font-black italic text-emerald-400">אימפקט ריבוני</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-2xl">
                                    <p className="text-[8px] font-black uppercase text-slate-500">שתילים שנשתלו</p>
                                    <p className="text-xl font-black">142</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl">
                                    <p className="text-[8px] font-black uppercase text-slate-500">ארגזים שנארזו</p>
                                    <p className="text-xl font-black">85</p>
                                </div>
                            </div>
                            <p className="text-sm font-bold italic text-indigo-200 leading-relaxed">
                                מניעת יום אשפוז אחד חוסכת למערכת ₪1,800. העשייה שלך היום היא לא רק כסף בכיס, היא ריבונות לאומית.
                            </p>
                            <div className="pt-4 space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span>Healthcare Savings</span>
                                    <span className="text-emerald-400">₪ 12,400</span>
                                </div>
                                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[65%]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] space-y-6">
                        <h4 className="text-xl font-black italic">לוח המודעות של הבית</h4>
                        <div className="space-y-4">
                            {[
                                { icon: Sun, label: "קבלת שבת בגינה", val: "16:00" },
                                { icon: Coffee, label: "סדנת 'האקדמיה שלי': צילום", val: "18:30" },
                                { icon: Star, label: "ועדת קליטה - תורנות", val: "יהונתן" }
                            ].map((i, idx) => (
                                <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <i.icon size={18} className="text-indigo-400" />
                                        <span className="text-xs font-black italic">{i.label}</span>
                                    </div>
                                    <span className="text-xs font-black text-white">{i.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] space-y-6">
                        <h4 className="text-xl font-black italic">סביבת העבודה</h4>
                        <div className="space-y-4">
                            {[
                                { icon: Coffee, label: "הפסקות מתוזמנות", val: "כל 50 דק'" },
                                { icon: Layout, label: "רמת עומס מותאמת", val: "בינונית" },
                                { icon: Clock, label: "שעות צפויות", val: "4.5 שעות" }
                            ].map((i, idx) => (
                                <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <i.icon size={18} className="text-slate-500" />
                                        <span className="text-xs font-black italic">{i.label}</span>
                                    </div>
                                    <span className="text-xs font-black text-indigo-400">{i.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-emerald-600/20 border border-emerald-500/30 rounded-[3rem] space-y-4 group hover:scale-[1.02] transition-all cursor-pointer">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400"><History size={32} /></div>
                        <div className="text-center">
                            <p className="text-xs font-black italic text-emerald-100">מכתב עדכון למשפחה</p>
                            <p className="text-[8px] font-bold text-emerald-400/60 uppercase mt-1">Sovereign Family Connect</p>
                        </div>
                    </div>

                    <div className="p-8 bg-slate-900 border border-white/5 rounded-[3rem] space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">אני מאמין ריבוני</h4>
                        <p className="text-sm font-black italic text-slate-300 leading-relaxed">
                            "מהיום אני ריבון. נכון, אני שונה. הנפש שלי רגישה יותר... אבל השוני הזה הוא לא חולשה – הוא כוח ייחודי."
                        </p>
                    </div>

                    <div className="p-8 border-2 border-dashed border-white/10 rounded-[3rem] text-center space-y-4 group hover:border-indigo-500/40 transition-all cursor-pointer">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-500 group-hover:text-indigo-400 transition-all"><MessageSquare size={32} /></div>
                        <p className="text-xs font-black italic uppercase">צ'אט עם רכז התעסוקה</p>
                    </div>
                </div>

            </main>

            <footer className="max-w-4xl mx-auto mt-20 text-center relative z-10">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] italic">Emuna 2.0 • Occupational Sovereignty Engine</p>
            </footer>
            {/* Victory Book Section */}
            <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 p-10 rounded-[3rem] space-y-8 relative z-10">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg"><Star size={24} /></div>
                        <h3 className="text-3xl font-black italic tracking-tighter">ספר הניצחונות</h3>
                    </div>
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">The Victory Log</span>
                </div>
                <div className="space-y-4">
                    {victoryBook.map((item, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-2xl flex justify-between items-center border border-white/5 hover:border-amber-500/30 transition-all group">
                            <div className="space-y-1">
                                <p className="text-xs text-slate-500 font-bold">{item.date}</p>
                                <p className="text-lg font-black italic text-amber-50 group-hover:text-amber-300 transition-colors">{item.achivement}</p>
                            </div>
                            <span className="bg-amber-500/20 text-amber-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{item.mood}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdaptiveWorkspace;
