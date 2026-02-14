import React from 'react';
import {
    ChevronLeft, Settings, Bell, Search, Activity,
    Shield, Soup, BookOpen, Brain, Sprout, Stethoscope,
    Zap, List, CheckCircle2, AlertCircle, TrendingDown, ShieldCheck, Database
} from 'lucide-react';
import { AppRole } from '../types';
import ChameleonBridge, { ClinicalScores } from '../services/ChameleonBridge';


interface StaffTerminalProps {
    role: AppRole;
    onBack: () => void;
}

const ROLE_META: Record<Partial<AppRole>, { title: string, subtitle: string, icon: React.ElementType, color: string, stats: any[] }> = {
    [AppRole.RABBI]: {
        title: 'קונסולת היועץ הרוחני',
        subtitle: 'ניהול נרטיב וסימולציות אמונה',
        icon: BookOpen,
        color: 'text-cyan-400',
        stats: [
            { label: 'שיעורים יומיים', value: '4' },
            { label: 'דיוני נפש', value: '12' },
            { label: 'מדד חוסן רוחני', value: '94%' }
        ]
    },
    [AppRole.KITCHEN_STAFF]: {
        title: 'מסוף מערך ההזנה',
        subtitle: 'ניהול תפריט ביו-דינמי ומדדי שובע',
        icon: Soup,
        color: 'text-emerald-400',
        stats: [
            { label: 'מנות בהכנה', value: '42' },
            { label: 'דירוג שביעות רצון', value: '4.8' },
            { label: 'חסכון במלאי', value: '+12%' }
        ]
    },
    [AppRole.GARDENER]: {
        title: 'מוקד גינון טיפולי',
        subtitle: 'ניהול צמחייה ושיקום אדמה',
        icon: Sprout,
        color: 'text-emerald-500',
        stats: [
            { label: 'עמדות פעילות', value: '8' },
            { label: 'צמיחה חודשית', value: '15%' },
            { label: 'לחות אדמה', value: 'Optimal' }
        ]
    },
    [AppRole.PSYCHOLOGIST]: {
        title: 'קונסולת ליווי רגשי',
        subtitle: 'ניטור עומק ותמיכה תהליכית',
        icon: Brain,
        color: 'text-purple-400',
        stats: [
            { label: 'שיחות פעילות', value: '6' },
            { label: 'מדד אמפתיה', value: 'High' },
            { label: 'התראות הצפה', value: '0' }
        ]
    },
    [AppRole.PSYCHIATRIST]: {
        title: 'עמדת פסיכיאטר בכיר',
        subtitle: 'ניהול מלווים דיגיטליים ואיזון תרופתי',
        icon: Stethoscope,
        color: 'text-blue-500',
        stats: [
            { label: 'מטופלים במעקב', value: '85' },
            { label: 'שינויי מינון', value: '3' },
            { label: 'מדד יציבות קלינית', value: '88%' }
        ]
    },
    [AppRole.SOCIAL_WORKER]: {
        title: 'מסוף עבודה סוציאלית',
        subtitle: 'חיבור למשפחה וזכויות המטופל',
        icon: List,
        color: 'text-indigo-400',
        stats: [
            { label: 'תיקים פתוחים', value: '14' },
            { label: 'ביקורי בית', value: '2' },
            { label: 'פניות עו"ס', value: 'High' }
        ]
    },
    [AppRole.CLEANER]: {
        title: 'מערכת ניהול תחזוקה',
        subtitle: 'ניטור היגיינה וסדר מרחבי',
        icon: Shield,
        color: 'text-amber-500',
        stats: [
            { label: 'חדרים נקיים', value: '92%' },
            { label: 'מטלות דחופות', value: '1' },
            { label: 'מלאי ציוד', value: '84%' }
        ]
    },
} as any;

const StaffTerminal: React.FC<StaffTerminalProps> = ({ role, onBack }) => {
    const meta = ROLE_META[role] || {
        title: 'Staff Terminal',
        subtitle: 'Hospital Operations Control',
        icon: Shield,
        color: 'text-blue-400',
        stats: [{ label: 'Status', value: 'Active' }]
    };

    const scores: ClinicalScores = ChameleonBridge.calculateClinicalScores('patient-001');

    return (
        <div className="min-h-screen bg-[#050608] text-white flex flex-col font-assistant overflow-x-hidden" dir="rtl">
            {/* High-Tech Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-2xl border-b border-white/5 p-8 flex justify-between items-center">
                <div className="flex items-center gap-6">
                    <button onClick={onBack} className="p-4 hover:bg-white/5 rounded-full transition-colors">
                        <ChevronLeft size={32} className="rotate-180" />
                    </button>
                    <div>
                        <h1 className={`text-3xl font-black italic tracking-tighter ${meta.color}`}>{meta.title}</h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">{meta.subtitle}</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="bg-white/5 px-6 py-2 rounded-xl border border-white/10 hidden md:flex items-center gap-3">
                        <Activity size={14} className="text-emerald-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Central OS Sync: Active</span>
                    </div>
                    <button className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10">
                        <Bell size={24} />
                    </button>
                </div>
            </header>

            <main className="flex-1 mt-40 p-8 md:p-16 max-w-7xl mx-auto w-full space-y-12 pb-40">
                {/* Stats Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {meta.stats.map((stat, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -translate-y-16 translate-x-16 group-hover:bg-blue-500/10" />
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-5xl font-black italic mt-4">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Clinical Hub: Chameleon Integration & AI Forecast */}
                <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-[4rem] p-12 space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <Database size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black italic">מצב רפואי</h3>
                                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Powered by Chameleon EMR Sync</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                            <ShieldCheck size={14} className="text-emerald-400" />
                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Chameleon Data Verified</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/5 space-y-4">
                            <p className="text-[10px] font-black text-slate-500 uppercase">סיכון לחזרה לאשפוז</p>
                            <div className="flex items-end gap-3">
                                <p className={`text-5xl font-black italic ${scores.readmissionRisk > 25 ? 'text-rose-500' : 'text-emerald-400'}`}>
                                    {scores.readmissionRisk}%
                                </p>
                                <TrendingDown size={24} className="mb-2 text-slate-600" />
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className={`h-full transition-all duration-1000 ${scores.readmissionRisk > 25 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${scores.readmissionRisk}%` }} />
                            </div>
                        </div>

                        <div className="bg-white/5 p-8 rounded-3xl border border-white/5 space-y-4">
                            <p className="text-[10px] font-black text-slate-500 uppercase">מדד יציבות (Stability)</p>
                            <p className="text-5xl font-black italic text-indigo-400">{scores.stabilityIndex}%</p>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${scores.stabilityIndex}%` }} />
                            </div>
                        </div>

                        <div className="bg-white/5 p-8 rounded-3xl border border-white/5 space-y-4">
                            <p className="text-[10px] font-black text-slate-500 uppercase">מוכנות הביתה</p>
                            <p className="text-5xl font-black italic text-amber-400">{scores.dischargeReadiness}%</p>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${scores.dischargeReadiness}%` }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Central Action Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Live Activity Feed */}
                    <div className="bg-white/5 border border-white/10 rounded-[4rem] p-12 space-y-8">
                        <div className="flex justify-between items-center border-b border-white/5 pb-6">
                            <h3 className="text-2xl font-black italic">פעילות בזמן אמת</h3>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Live Feed</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex gap-6 items-start group">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-blue-400 group-hover:bg-white/10 transition-all">
                                        <meta.icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-lg italic">עדכון מערכת #{1200 + i}</p>
                                        <p className="text-xs text-slate-500">לפני {i * 5} דקות - בוצע סנכרון מלא עם Chameleon Cloud.</p>
                                    </div>
                                    <CheckCircle2 className="text-emerald-500/40" size={16} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Controls */}
                    <div className="bg-gradient-to-br from-slate-900 to-black border border-white/5 rounded-[4rem] p-12 space-y-8">
                        <h3 className="text-2xl font-black italic">פעולות מהירות</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all flex flex-col items-center gap-4 text-center">
                                <Settings size={28} className="text-slate-400" />
                                <span className="text-xs font-black italic">הגדרות</span>
                            </button>
                            <button className="bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all flex flex-col items-center gap-4 text-center">
                                <Zap size={28} className="text-white" />
                                <span className="text-xs font-black italic">דיווח דחוף</span>
                            </button>
                            <button className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all flex flex-col items-center gap-4 text-center">
                                <AlertCircle size={28} className="text-slate-400" />
                                <span className="text-xs font-black italic">טיפול בבעיות</span>
                            </button>
                            <button className="bg-indigo-600 p-8 rounded-3xl shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all flex flex-col items-center gap-4 text-center">
                                <Search size={28} className="text-white" />
                                <span className="text-xs font-black italic">חיפוש מטופל</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Big Role Icon Background */}
                <div className="fixed bottom-[-100px] left-[-100px] opacity-[0.02] pointer-events-none">
                    <meta.icon size={600} />
                </div>
            </main>
        </div>
    );
};

export default StaffTerminal;
