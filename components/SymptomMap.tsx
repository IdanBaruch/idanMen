import React, { useState } from 'react';
import {
    Shield, Activity, Heart, Brain, Zap, Lock, Eye,
    MessageCircle, ChevronLeft, Wallet, Pill, CheckCircle,
    Compass, Sparkles, User, Fingerprint, X
} from 'lucide-react';

interface Tool {
    name: string;
    hebrewName: string;
    description: string;
    mechanism: string; // "הבלם"
    icon: React.ElementType;
    useCase?: {
        title: string;
        scenario: string;
        intervention: string;
        outcome: string;
    };
}

interface Disorder {
    id: string;
    name: string;
    hebrewName: string;
    symptom: string;
    tools: Tool[];
    position: string; // Tailwind classes for grid position
}

const DISORDERS: Disorder[] = [
    {
        id: 'bipolar',
        name: 'הפרעה דו-קוטבית',
        hebrewName: 'הפרעה דו-קוטבית',
        symptom: 'תנודות בין מאניה לדיכאון',
        position: 'top-left',
        tools: [
            {
                name: 'מגן פיננסי',
                hebrewName: 'מגן פיננסי',
                description: 'מענה לבזבזנות וכספים (מאניה)',
                mechanism: 'נעילת ארנק בזיהוי דיבור אופורי/מהיר',
                icon: Wallet,
                useCase: {
                    title: 'תרחיש: מסע הקניות של יהונתן',
                    scenario: 'יהונתן במצב מאני, נכנס לחנות מוצרי חשמל ומתכוון לקנות 5 טלוויזיות.',
                    intervention: 'המערכת מזהה את קצב הדיבור המהיר ואת מילות המפתח ("הכל עלי", "מיליונר"). הארנק הדיגיטלי ננעל אוטומטית ל-24 שעות.',
                    outcome: 'נמנע חוב של 50,000 ש"ח. יהונתן מקבל הודעה מרגיעה: "הכסף שמור, בוא נדבר מחר".'
                }
            },
            {
                name: 'אימות תרופתי',
                hebrewName: 'אימות תרופתי (vDOT)',
                description: 'מענה לחוסר יציבות כימית',
                mechanism: 'מניעת התקף פסיכוטי ע"י וידוא נטילה',
                icon: Pill
            },
            {
                name: 'מצפן המשמעות',
                hebrewName: 'מצפן המשמעות',
                description: 'מענה לדיכאון וריקנות',
                mechanism: 'יצירת סדר יום לוגי למניעת "מוות בחיים"',
                icon: Compass
            }
        ]
    },
    {
        id: 'bpd',
        name: 'אישיות גבולית',
        hebrewName: 'אישיות גבולית (BPD)',
        symptom: 'סערת רגשות ופגיעה עצמית',
        position: 'top-right',
        tools: [
            {
                name: 'מראת החמלה',
                hebrewName: 'מראת החמלה',
                description: 'מענה לפגיעה עצמית ואובדנות',
                mechanism: '"שוק" רגשי חיובי (ילד פנימי) לבלימת אלימות',
                icon: Heart
            },
            {
                name: 'אמונה AI',
                hebrewName: 'אמונה AI',
                description: 'מענה לריקנות וביקורת עצמית',
                mechanism: 'מסנן רעשים ומענה ל"סוג השקט"',
                icon: Sparkles
            },
            {
                name: 'נטרול פצצה',
                hebrewName: 'נטרול פצצה',
                description: 'מענה להתפרצויות זעם',
                mechanism: 'השתלטות חושית להורדת להבות (וויסות)',
                icon: Zap
            },
            {
                name: 'קופסה שחורה',
                hebrewName: 'קופסה שחורה',
                description: 'מענה לדיסוציאציה/ניתוק',
                mechanism: 'תיעוד ולמידה בדיעבד של אירועי אובדן שליטה',
                icon: Eye
            }
        ]
    },
    {
        id: 'schizo',
        name: 'סכיזופרניה',
        hebrewName: 'סכיזופרניה ופסיכוזה',
        symptom: 'ניתוק מהמציאות והזיות',
        position: 'bottom-right',
        tools: [
            {
                name: 'אמונה AI',
                hebrewName: 'אמונה AI (מסנן)',
                description: 'מענה להזיות וקולות פנימיים',
                mechanism: 'החלפת קולות שליליים בקול חיצוני מרגיע',
                icon: Brain
            },
            {
                name: 'Meaning Compass',
                hebrewName: 'מצפן המשמעות',
                description: 'מענה לחשיבה לא מאורגנת',
                mechanism: 'יצירת "סדר בתוך הכאוס"',
                icon: Compass
            }
        ]
    },
    {
        id: 'autism',
        name: 'אוטיזם / תסמונת דאון',
        hebrewName: 'אוטיזם / תסמונת דאון',
        symptom: 'אתגרי תקשורת ושילוב',
        position: 'bottom-left',
        tools: [
            {
                name: 'Meaning Compass',
                hebrewName: 'מצפן המשמעות',
                description: 'מענה לקושי בסדר יום',
                mechanism: 'הבניית סדר יום וקיום מצוות (לבעלי דעת)',
                icon: Activity
            },
            {
                name: 'אמונה AI',
                hebrewName: 'אמונה AI (תיווך)',
                description: 'מענה לתיווך המציאות',
                mechanism: 'תיווך המציאות ללא שיפוטיות ("נשמות גבוהות")',
                icon: MessageCircle
            }
        ]
    }
];

interface SymptomMapProps {
    onBack?: () => void;
}

const SymptomMap: React.FC<SymptomMapProps> = ({ onBack }) => {
    const [selectedDisorder, setSelectedDisorder] = useState<Disorder | null>(null);
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

    return (
        <div className="min-h-screen bg-[#0a192f] text-slate-200 font-assistant overflow-hidden relative" dir="rtl">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#112240] blur-[100px] rounded-full opacity-50" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#1e3a8a] blur-[120px] rounded-full opacity-30" />
            </div>

            {/* Header */}
            <header className="absolute top-0 w-full p-8 z-50 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tracking-tight">
                        מערכת אבטחה לנפש
                    </h1>
                    <p className="text-blue-200/60 text-sm font-bold tracking-widest uppercase mt-1">
                        מערכת אבטחה לנשמה
                    </p>
                </div>
                {onBack && (
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/50 border border-blue-800/50 hover:bg-blue-900/50 hover:border-amber-500/50 transition-all text-blue-200 hover:text-amber-400"
                    >
                        <span className="text-xs font-black uppercase tracking-widest">חזרה</span>
                        <ChevronLeft size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                    </button>
                )}
            </header>

            {/* Main Center Layout */}
            <main className="relative w-full h-screen flex items-center justify-center p-4">

                {/* The Core - Self/Soul */}
                <div className="absolute z-10 w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#112240] border-4 border-amber-500/20 shadow-[0_0_60px_rgba(245,158,11,0.2)] flex flex-col items-center justify-center text-center animate-in zoom-in duration-1000">
                    <div className="absolute inset-0 rounded-full border border-amber-500/10 animate-spin-slow" />
                    <Fingerprint size={64} className="text-amber-400 mb-4 opacity-80" />
                    <h2 className="text-2xl font-black text-white italic">העצמי</h2>
                    <p className="text-[10px] text-amber-500/60 font-bold uppercase tracking-widest mt-2">ליבה מאובטחת</p>
                </div>

                {/* Connecting Lines */}
                <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full opacity-20">
                        <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#fbbf24" strokeWidth="2" />
                        <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#fbbf24" strokeWidth="2" />
                        <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#fbbf24" strokeWidth="2" />
                        <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#fbbf24" strokeWidth="2" />
                    </svg>
                </div>

                {/* Quadrants */}
                <div className="w-full max-w-7xl h-full max-h-[800px] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-32 p-4 md:p-12 relative z-20 pointer-events-none">
                    {DISORDERS.map((disorder) => (
                        <div
                            key={disorder.id}
                            onClick={() => setSelectedDisorder(disorder)}
                            className={`
                                pointer-events-auto
                                group relative bg-[#112240]/80 backdrop-blur-md rounded-[2rem] p-8 border border-blue-800/30 
                                hover:border-amber-500/50 hover:bg-[#1e3a8a]/20 hover:scale-[1.02] 
                                transition-all duration-500 cursor-pointer shadow-xl
                                flex flex-col justify-start
                                ${selectedDisorder && selectedDisorder.id !== disorder.id ? 'opacity-20 scale-95 blur-sm' : 'opacity-100'}
                            `}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-1 group-hover:text-amber-400 transition-colors">
                                        {disorder.hebrewName}
                                    </h3>
                                    <p className="text-sm font-medium text-slate-400 group-hover:text-slate-200">
                                        {disorder.symptom}
                                    </p>
                                </div>
                                <div className="p-3 rounded-full bg-blue-950 border border-blue-800 text-blue-400 group-hover:text-amber-400 group-hover:border-amber-500/50 transition-all">
                                    <Shield size={24} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                {disorder.tools.map((tool, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-blue-950/50 border border-transparent hover:border-blue-700 hover:bg-blue-900/50 transition-colors">
                                        <tool.icon size={18} className="text-amber-500/80" />
                                        <div className="flex-1">
                                            <span className="font-bold text-slate-200 block text-sm">{tool.hebrewName}</span>
                                            <span className="text-[10px] text-slate-500 block">{tool.mechanism}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 text-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500/60 group-hover:text-amber-500 transition-colors">
                                    לחץ להרחבה
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Drill Down Modal */}
            {selectedDisorder && (
                <div className="absolute inset-0 z-50 bg-[#0a192f]/95 backdrop-blur-xl flex justify-end animate-in slide-in-from-left duration-500">
                    <div className="w-full md:w-2/3 h-full bg-[#112240] border-r border-blue-800/50 p-12 overflow-y-auto shadow-2xl relative">
                        <button
                            onClick={() => { setSelectedDisorder(null); setSelectedTool(null); }}
                            className="absolute top-12 left-12 p-4 rounded-full bg-blue-950 hover:bg-blue-900 text-slate-400 hover:text-white transition-colors border border-blue-800"
                        >
                            <X size={24} />
                        </button>

                        <div className="max-w-3xl mx-auto pt-12">
                            <h2 className="text-5xl font-black text-white mb-2">{selectedDisorder.hebrewName}</h2>
                            <p className="text-xl text-amber-500 font-bold mb-12 flex items-center gap-2">
                                <Activity size={20} />
                                {selectedDisorder.symptom}
                            </p>

                            <div className="grid gap-6">
                                {selectedDisorder.tools.map((tool, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedTool(tool === selectedTool ? null : tool)}
                                        className={`
                                            group p-8 rounded-[2rem] border transition-all cursor-pointer
                                            ${selectedTool === tool
                                                ? 'bg-blue-900/40 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.1)]'
                                                : 'bg-blue-950/40 border-blue-800/30 hover:bg-blue-900/40 hover:border-blue-700'}
                                        `}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-6">
                                                <div className={`
                                                    w-16 h-16 rounded-2xl flex items-center justify-center transition-colors
                                                    ${selectedTool === tool ? 'bg-amber-500 text-blue-950' : 'bg-blue-900 text-amber-500'}
                                                `}>
                                                    <tool.icon size={32} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-black text-white">{tool.hebrewName}</h3>
                                                    <p className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">{tool.name}</p>
                                                    <p className="text-slate-300 max-w-md">{tool.description}</p>
                                                </div>
                                            </div>
                                            <div className={`
                                                px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors
                                                ${selectedTool === tool ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-blue-950 border-blue-800 text-slate-500'}
                                            `}>
                                                מנגנון הבלם
                                            </div>
                                        </div>

                                        {/* Expanded Mechanism & Use Case */}
                                        <div className={`grid transition-all duration-500 overflow-hidden ${selectedTool === tool ? 'grid-rows-[1fr] opacity-100 mt-8' : 'grid-rows-[0fr] opacity-0'}`}>
                                            <div className="min-h-0 bg-black/20 rounded-3xl p-8 border border-white/5 space-y-6">
                                                <div>
                                                    <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">מנגנון פעולה</h4>
                                                    <p className="text-lg text-white leading-relaxed">{tool.mechanism}</p>
                                                </div>

                                                {tool.useCase && (
                                                    <div className="bg-amber-500/10 border-r-4 border-amber-500 p-6 rounded-l-2xl">
                                                        <h4 className="text-amber-400 font-black text-lg mb-2 flex items-center gap-2">
                                                            <Sparkles size={16} />
                                                            {tool.useCase.title}
                                                        </h4>
                                                        <div className="space-y-4 text-sm">
                                                            <div>
                                                                <span className="font-bold text-slate-300">הסיטואציה: </span>
                                                                <span className="text-slate-400">{tool.useCase.scenario}</span>
                                                            </div>
                                                            <div>
                                                                <span className="font-bold text-amber-200">ההתערבות: </span>
                                                                <span className="text-slate-300">{tool.useCase.intervention}</span>
                                                            </div>
                                                            <div>
                                                                <span className="font-bold text-emerald-400">התוצאה: </span>
                                                                <span className="text-slate-300">{tool.useCase.outcome}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SymptomMap;
