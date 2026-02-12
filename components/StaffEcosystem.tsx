
import React, { useState } from 'react';
import {
    ClipboardList, Brain, HeartHandshake, ChevronLeft,
    Activity, CheckCircle2, TrendingUp, FileText,
    Users, Scale, AlertCircle, Sparkles, Sword, Shield,
    BookOpen, Star
} from 'lucide-react';
import { LedgerEntry, StrengthTag } from '../types';

interface StaffEcosystemProps {
    onBack: () => void;
    onSelect: (role: any) => void;
}

const MOCKED_PATIENTS = [
    { id: '1', name: 'יהונתן (הטייס)', admission: '12/01/2026', status: 'אשפוז יום', risk: 'בינוני' },
    { id: '2', name: 'סיון (הלביאה)', admission: '04/02/2026', status: 'מחלקה סגורה', risk: 'גבוה' },
    { id: '3', name: 'אבי (המגדלור)', admission: '10/11/2025', status: 'לקראת שחרור', risk: 'נמוך' },
];

const STRENGTH_TAGS: StrengthTag[] = ['תובנה', 'התמדה', 'כנות', 'יצירתיות', 'אמפתיה'];

const StaffEcosystem: React.FC<StaffEcosystemProps> = ({ onBack, onSelect }) => {
    const [activeTab, setActiveTab] = useState<'OT' | 'PSYCH' | 'SW'>('OT');
    const [selectedPatient, setSelectedPatient] = useState(MOCKED_PATIENTS[0]);

    // --- OT Logic ---
    const [adlTasks, setAdlTasks] = useState([
        { id: 1, task: 'קימה בזמן', score: 3 }, // 1=Low, 5=High
        { id: 2, task: 'היגיינה אישית', score: 4 },
        { id: 3, task: 'סידור חדר', score: 2 },
        { id: 4, task: 'לקיחת תרופות', score: 5 },
    ]);

    // --- Psych Logic ---
    const [insights, setInsights] = useState([
        { id: 1, date: '08/02', text: 'מביע חרטה על אירועי העבר - סימן חיובי לשיפוט.', sentiment: 'Positive' },
        { id: 2, date: '05/02', text: 'תחושת רדיפה קלה בבוקר, נרגע לאחר שיחה.', sentiment: 'Mixed' },
    ]);
    const [newInsight, setNewInsight] = useState('');

    // --- SW Logic ---
    const [rights, setRights] = useState([
        { id: 1, title: 'ביטוח לאומי - נכות', status: 'Approved', date: '01/01/2026' },
        { id: 2, title: 'סל שיקום - דיור', status: 'Pending', date: '15/01/2026' },
        { id: 3, title: 'אפוטרופסות גוף', status: 'In Process', date: '01/02/2026' },
    ]);

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-assistant flex flex-col" dir="rtl">

            {/* Top Bar */}
            <header className="bg-white border-b border-slate-200 p-6 flex justify-between items-center shadow-sm sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-600 text-white p-3 rounded-xl shadow-lg">
                        <Users size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-[#1e40af] italic tracking-tight">צוות שלוותה</h1>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">פורטל טיפול רב-תחומי</p>
                    </div>
                </div>
                <button onClick={onBack} className="text-slate-400 hover:text-slate-900 flex items-center gap-2 font-bold text-xs uppercase tracking-widest transition-colors">
                    <ChevronLeft size={16} /> חזרה לראשי
                </button>
            </header>

            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar - Patient List */}
                <aside className="w-80 bg-white border-l border-slate-200 flex flex-col overflow-y-auto">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">מטופלים פעילים</h3>
                        <input type="text" placeholder="חיפוש מטופל..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-all font-medium" />
                    </div>
                    <div className="flex-1">
                        {MOCKED_PATIENTS.map(p => (
                            <div
                                key={p.id}
                                onClick={() => setSelectedPatient(p)}
                                className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${selectedPatient.id === p.id ? 'bg-blue-50 border-r-4 border-blue-600' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold text-slate-800">{p.name}</span>
                                    <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${p.risk === 'High' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>{p.risk}</span>
                                </div>
                                <div className="text-xs text-slate-500 flex justify-between">
                                    <span>{p.status}</span>
                                    <span>{p.admission}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Workspace */}
                <main className="flex-1 flex flex-col bg-slate-50/50">

                    {/* Functional Tabs */}
                    <div className="bg-white px-8 pt-6 border-b border-slate-200 flex gap-8 sticky top-0">
                        <button
                            onClick={() => setActiveTab('OT')}
                            className={`pb-4 px-2 text-sm font-black uppercase tracking-wide border-b-2 transition-all flex items-center gap-2 ${activeTab === 'OT' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                            <ClipboardList size={18} /> מרפאה בעיסוק (OT)
                        </button>
                        <button
                            onClick={() => setActiveTab('PSYCH')}
                            className={`pb-4 px-2 text-sm font-black uppercase tracking-wide border-b-2 transition-all flex items-center gap-2 ${activeTab === 'PSYCH' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                            <Brain size={18} /> פסיכולוגיה (Psych)
                        </button>
                        <button
                            onClick={() => setActiveTab('SW')}
                            className={`pb-4 px-2 text-sm font-black uppercase tracking-wide border-b-2 transition-all flex items-center gap-2 ${activeTab === 'SW' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                            <HeartHandshake size={18} /> עבודה סוציאלית (SW)
                        </button>
                    </div>

                    <div className="p-8 overflow-y-auto max-w-5xl mx-auto w-full">

                        {/* OT Module: Function Matrix */}
                        {activeTab === 'OT' && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                                <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex items-start gap-4">
                                    <div className="bg-orange-100 p-3 rounded-full text-orange-600"><Activity size={24} /></div>
                                    <div>
                                        <h2 className="text-xl font-black text-orange-800">The Function Matrix</h2>
                                        <p className="text-sm text-orange-700/70 max-w-xl">מדד התפקוד היומי (ADL) - כלי למעקב אחר התקדמות תפקודית וניהול משימות ריבונות במחלקה.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Daily Tasks Scorer */}
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><CheckCircle2 size={18} /> מטלות יומיות (ADL)</h3>
                                        <div className="space-y-4">
                                            {adlTasks.map(t => (
                                                <div key={t.id} className="flex items-center justify-between group">
                                                    <span className="text-sm font-medium text-slate-600">{t.task}</span>
                                                    <div className="flex gap-1">
                                                        {[1, 2, 3, 4, 5].map(score => (
                                                            <button
                                                                key={score}
                                                                onClick={() => setAdlTasks(prev => prev.map(pt => pt.id === t.id ? { ...pt, score } : pt))}
                                                                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${t.score >= score ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-300'}`}
                                                            >
                                                                {score}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Progress Chart Placeholder */}
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                                        <TrendingUp size={48} className="text-orange-200 mb-4" />
                                        <h3 className="font-bold text-slate-700">מגמת שיפור תפקודי</h3>
                                        <p className="text-xs text-slate-400 mt-2">הנתונים נאספים ומחושבים על בסיס שבועי.</p>
                                        <div className="mt-6 flex gap-4 text-center">
                                            <div>
                                                <div className="text-2xl font-black text-orange-500">↑ 15%</div>
                                                <div className="text-[10px] text-slate-400 uppercase">עצמאות</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-black text-orange-500">↓ 30%</div>
                                                <div className="text-[10px] text-slate-400 uppercase">זמן תגובה</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Psychology Module: Resilience Journal */}
                        {activeTab === 'PSYCH' && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                                <div className="bg-purple-50 border border-purple-100 p-6 rounded-2xl flex items-start gap-4">
                                    <div className="bg-purple-100 p-3 rounded-full text-purple-600"><Brain size={24} /></div>
                                    <div>
                                        <h2 className="text-xl font-black text-purple-900">יומן החוסן (Resilience)</h2>
                                        <p className="text-sm text-purple-800/70 max-w-xl">מרחב לתיעוד תובנות עומק, ניתוח סנטימנט מהיומנים, וחיזוק ה"עצמי" של המטופל.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Insights Feed */}
                                    <div className="lg:col-span-2 space-y-4">
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                            <textarea
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-purple-400 min-h-[100px] mb-4"
                                                placeholder="הוסף תובנה קלינית חדשה..."
                                                value={newInsight}
                                                onChange={(e) => setNewInsight(e.target.value)}
                                            />
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-2">
                                                    {STRENGTH_TAGS.slice(0, 3).map(tag => (
                                                        <button key={tag} className="text-[10px] bg-purple-50 text-purple-600 px-3 py-1 rounded-full border border-purple-100 hover:bg-purple-100 transition-colors">#{tag}</button>
                                                    ))}
                                                </div>
                                                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-purple-700 transition-all">שמור ביומן</button>
                                            </div>
                                        </div>

                                        {insights.map(ins => (
                                            <div key={ins.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 font-bold text-xs shrink-0 border border-slate-100">
                                                    {ins.date}
                                                </div>
                                                <div>
                                                    <p className="text-slate-800 font-medium mb-1 leading-relaxed">"{ins.text}"</p>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${ins.sentiment === 'Positive' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                                        AI Sentiment: {ins.sentiment}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Strengths Map */}
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
                                        <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2"><Sparkles size={16} className="text-purple-500" /> מפת חוזקות</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {STRENGTH_TAGS.map(tag => (
                                                <div key={tag} className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 flex items-center gap-2 group cursor-pointer hover:border-purple-200 transition-all">
                                                    <div className="w-2 h-2 rounded-full bg-purple-400 group-hover:bg-purple-600" />
                                                    <span className="text-xs font-bold text-slate-600">{tag}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-8 p-4 bg-purple-50/50 rounded-xl border border-purple-100 text-center">
                                            <div className="text-3xl font-black text-purple-600 mb-1">High</div>
                                            <div className="text-[10px] text-purple-400 uppercase tracking-widest">רמת מסוגלות עצמית</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Social Worker Module: Rehab Pulse */}
                        {activeTab === 'SW' && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-start gap-4">
                                    <div className="bg-emerald-100 p-3 rounded-full text-emerald-600"><Scale size={24} /></div>
                                    <div>
                                        <h2 className="text-xl font-black text-emerald-800">דופק השיקום (Rehab Pulse)</h2>
                                        <p className="text-sm text-emerald-700/70 max-w-xl">ניהול מיצוי זכויות, קשר עם הקהילה, וחיבור למסגרות המשך - הכול במקום אחד.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Rights Checklist */}
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><FileText size={18} /> סטטוס זכויות</h3>
                                        <div className="divide-y divide-slate-50">
                                            {rights.map(r => (
                                                <div key={r.id} className="py-4 flex justify-between items-center group">
                                                    <div>
                                                        <p className="font-bold text-slate-700 text-sm group-hover:text-emerald-700 transition-colors">{r.title}</p>
                                                        <p className="text-[10px] text-slate-400 mt-0.5">עודכן ב: {r.date}</p>
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md border ${r.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                        r.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                            'bg-slate-50 text-slate-500 border-slate-100'
                                                        }`}>
                                                        {r.status === 'Approved' ? 'אושר' :
                                                            r.status === 'Pending' ? 'ממתין' :
                                                                'בטיפול'
                                                        }
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="w-full mt-4 border border-dashed border-emerald-300 text-emerald-600 py-2 rounded-lg text-xs font-bold hover:bg-emerald-50 transition-all">
                                            + הוסף תביעה חדשה
                                        </button>
                                    </div>

                                    {/* Family & Community */}
                                    <div className="space-y-6">
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><HeartHandshake size={18} /> מעגל תמיכה</h3>
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">אמא</div>
                                                <div className="flex-1">
                                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-emerald-500 w-[80%]" />
                                                    </div>
                                                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                                        <span>מעורבות</span>
                                                        <span>80% (גבוהה)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">אבא</div>
                                                <div className="flex-1">
                                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-red-400 w-[30%]" />
                                                    </div>
                                                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                                        <span>מעורבות</span>
                                                        <span>30% (נמוכה)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                            <h3 className="font-bold text-slate-700 mb-2">מסגרת יעד</h3>
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                                                <div className="font-black text-slate-800">הוסטל "צעדים" (ת"א)</div>
                                                <div className="text-xs text-slate-500 mt-1">סטטוס: ועדת קבלה עברה בהצלחה</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
};

export default StaffEcosystem;
