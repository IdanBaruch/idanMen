import React, { useState } from 'react';
import {
    Hammer,
    Activity,
    Camera,
    Sparkles,
    TrendingUp,
    ChevronRight,
    Trash2,
    Dumbbell,
    Zap,
    Moon,
    Shield,
    Award,
    Plus,
    Image as ImageIcon,
    CheckCircle2,
    Brain,
    Footprints,
    Flame,
    Target
} from 'lucide-react';

interface CraftEntry {
    id: string;
    title: string;
    description: string;
    image?: string;
    date: string;
    reframing: string;
}

const ResilienceLedger: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'craft' | 'bio' | 'points'>('craft');
    const [crafts, setCrafts] = useState<CraftEntry[]>([
        {
            id: '1',
            title: 'מדף עץ אורן',
            description: 'נבנה בנגריית סוטריה. עבודת יד על העץ והליטוש.',
            date: '2026-02-10',
            reframing: 'המדף הזה הוא עדות ליכולת שלך לבנות יציבות מתוך חומר גלם. הליטוש מייצג את הסבלנות והדיוק שאתה מחזיר לעצמך.'
        }
    ]);

    const resiliencePoints = {
        vigour: 75,
        grounding: 60,
        total: 1350
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-assistant p-6 lg:p-12" dir="rtl">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-200">
                            <Shield size={14} /> Resilience Ledger
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mt-2 text-slate-900">
                            יומן <span className="text-emerald-600">החוסן.</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-bold italic mt-2">המרחב ליצירה, גוף וניצחונות יומיומיים.</p>
                    </div>

                    <div className="flex bg-white p-2 rounded-[2rem] shadow-sm border border-slate-200">
                        {(['craft', 'bio', 'points'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-[1.5rem] font-black text-sm transition-all ${activeTab === tab
                                    ? 'bg-emerald-600 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {tab === 'craft' ? 'יומן יצירה' : tab === 'bio' ? 'המנוע הביולוגי' : 'מדדי חוסן'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab: Craft Ledger */}
                {activeTab === 'craft' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
                        {/* New Entry Form Placeholder */}
                        <div className="lg:col-span-1 bg-white rounded-[3rem] p-8 border border-slate-200 border-dashed flex flex-col items-center justify-center text-center space-y-6 hover:border-emerald-400 transition-colors cursor-pointer group">
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                <Plus size={40} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black italic">תיעוד יצירה חדשה</h3>
                                <p className="text-slate-400 font-bold text-sm mt-2 italic">העלה צילום של מה שבנית בנגרייה או במלאכה</p>
                            </div>
                        </div>

                        {/* Craft List */}
                        <div className="lg:col-span-2 space-y-6">
                            {crafts.map((craft) => (
                                <div key={craft.id} className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8">
                                    <div className="w-full md:w-64 h-64 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 relative overflow-hidden">
                                        <ImageIcon size={48} />
                                        <div className="absolute inset-0 bg-emerald-600/10" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-3xl font-black italic tracking-tighter">{craft.title}</h3>
                                                <p className="text-sm font-bold text-slate-400">{craft.date}</p>
                                            </div>
                                            <div className="bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">מלאכת יד</div>
                                        </div>
                                        <p className="text-lg font-bold text-slate-600 leading-relaxed">{craft.description}</p>

                                        <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 relative group overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <Sparkles size={40} />
                                            </div>
                                            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2 flex items-center gap-2">
                                                <Brain size={14} /> תובנת חוסן AI
                                            </h4>
                                            <p className="text-md font-bold italic text-slate-700 leading-relaxed">
                                                {craft.reframing}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab: Bio-Engine (Adaptive Exercise) */}
                {activeTab === 'bio' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                                        <Zap size={14} className="text-emerald-400" /> State-Aware Bio Engine
                                    </div>
                                    <h2 className="text-5xl font-black italic tracking-tighter leading-tight">
                                        אימון מותאם <br /> <span className="text-emerald-400">לתדר שלך.</span>
                                    </h2>
                                    <p className="text-xl font-bold italic opacity-70">
                                        זיהינו שהמדוג שלך בתדר גבוה (מאניה). ההמלצה שלנו: תרגול יוגה עדין או "נגרייה איטית" לקרקוע האנרגיה.
                                    </p>
                                    <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-10 py-4 rounded-full font-black text-lg transition-all shadow-xl shadow-emerald-500/20">
                                        התחל תרגול קרקוע
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'קרקוע', value: '85%', icon: Footprints, color: 'emerald' },
                                        { label: 'ויגור', value: '40%', icon: Flame, color: 'orange' },
                                        { label: 'שקט', value: '60%', icon: Moon, color: 'indigo' },
                                        { label: 'מיקוד', value: '92%', icon: Target, color: 'sky' }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2.5rem] flex flex-col items-center gap-2">
                                            <stat.icon className={`text-${stat.color}-400`} size={24} />
                                            <span className="text-3xl font-black italic tracking-tighter">{stat.value}</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab: Resilience Points */}
                {activeTab === 'points' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-500">
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 shadow-inner">
                                <Award size={48} />
                            </div>
                            <div>
                                <h3 className="text-5xl font-black italic tracking-tighter text-indigo-600">{resiliencePoints.total}</h3>
                                <p className="text-sm font-black uppercase tracking-widest text-slate-400 mt-2">סך הכל נקודות חוסן</p>
                            </div>
                        </div>

                        <div className="md:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-100 space-y-8">
                            <h3 className="text-2xl font-black italic">התקדמות שבועית</h3>
                            <div className="space-y-6">
                                {['מלאכה', 'גוף', 'נפש'].map((cat, i) => (
                                    <div key={cat} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="font-black italic text-slate-700">{cat}</span>
                                            <span className="text-[10px] font-black text-slate-400">Lv. {42 + i}</span>
                                        </div>
                                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full"
                                                style={{ width: `${60 + i * 10}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ResilienceLedger;
