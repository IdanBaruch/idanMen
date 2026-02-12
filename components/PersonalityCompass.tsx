import React, { useState, useEffect, useRef } from 'react';
import {
    Zap,
    MessageSquare,
    Volume2,
    Moon,
    Users,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    AlertTriangle,
    TrendingUp,
    Brain,
    ShieldCheck,
    Radar as RadarIcon,
    Activity,
    BatteryLow,
    Footprints,
    Flame,
    UserSearch,
    CloudFog,
    Repeat,
    Target,
    Wind,
    Cloud,
    Search,
    Music,
    Phone,
    SkipForward,
    Sparkles,
    Send,
    ChevronRight,
    Play,
    Pause,
    Heart,
    HandMetal,
    Coffee,
    Eye,
    Lock,
    Filter,
    Hammer,
    ArrowUpRight,
    Scale,
    HelpCircle,
    X,
    Clock,
    Waves
} from 'lucide-react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';

interface Question {
    id: string;
    category: string;
    title: string;
    icon: React.ElementType;
    options: {
        label: string;
        sublabel: string;
        value: number;
        severity: 'low' | 'medium' | 'high';
    }[];
}

const QUESTIONS: Question[] = [
    {
        id: 'phone_sovereignty',
        category: 'בקרת ריבונות דיגיטלית',
        title: 'מה הסטטוס של הטלפון החכם שלך ברגע זה?',
        icon: Phone,
        options: [
            { label: 'המכשיר בידי, בגישה מלאה.', sublabel: 'ריבונות דיגיטלית', value: 10, severity: 'low' },
            { label: 'המכשיר לא ברשותי (נלקח/הופקד/בניהול)', sublabel: 'מגבלת מרחב', value: 100, severity: 'high' },
            { label: 'המכשיר אצלי, אבל אני מרגיש שהוא "שולט בי"', sublabel: 'חוסר שקט דיגיטלי', value: 50, severity: 'medium' }
        ]
    },
    {
        id: 'regulation_speed',
        category: 'מדד הוויסות והקצב',
        title: 'בשבועות האחרונים, איך אתה מרגיש את "מהירות הנסיעה" הפנימית שלך?',
        icon: Zap,
        options: [
            { label: 'מהירות רגילה, אני מרגיש בשליטה על ההגה.', sublabel: 'קצב מאוזן', value: 10, severity: 'low' },
            { label: 'המנוע בטורבו (צורך בשינויים קיצוניים/קניות).', sublabel: 'תדר מאניה', value: 100, severity: 'high' },
            { label: 'אני מרגיש "מוצת" בקלות. כל עימות הוא פיצוץ.', sublabel: 'סף גירוי נמוך', value: 80, severity: 'medium' }
        ]
    },
    {
        id: 'relational_sovereignty',
        category: 'מדד הריבונות הבינאישית',
        title: 'איך אתה חווה את הקשרים שלך עם האנשים הקרובים ביותר?',
        icon: Heart,
        options: [
            { label: 'אני מרגיש חופשי להביע דעה ולשמור על קשר.', sublabel: 'קשר ריבוני', value: 10, severity: 'low' },
            { label: 'אני מרגיש כמו "קליפה" (לחץ/ניתוק משפחתי).', sublabel: 'צמצום אישיותי', value: 100, severity: 'high' },
            { label: 'עושה הכל למנוע עימות. ויתרתי על עצמי לשקט.', sublabel: 'ביטול עצמי', value: 80, severity: 'medium' }
        ]
    },
    {
        id: 'somatic_stomach',
        category: 'מדד הגוף והנפש',
        title: 'כשהנפש בלחץ, איפה הגוף שלך מרגיש את זה?',
        icon: Activity,
        options: [
            { label: 'אני מרגיש דופק מהיר או הזעה.', sublabel: 'רעש פיזי קל', value: 30, severity: 'low' },
            { label: 'הבטן שלי מדברת. כאבים חזקים/אי-נוחות שנים.', sublabel: 'סומטיזציה (הבטן צועקת)', value: 100, severity: 'high' }
        ]
    },
    {
        id: 'social_sync',
        category: 'מדד הסנכרון החברתי',
        title: 'איך נראים המפגשים שלך עם אנשים בשבוע האחרון?',
        icon: Users,
        options: [
            { label: 'זורמים, אני מבין בדיוק מה הם רוצים ממני.', sublabel: 'סנכרון מלא', value: 10, severity: 'low' },
            { label: 'לפעמים זה מרגיש כמו שפה זרה.', sublabel: 'קוד חברתי לא פוענח', value: 70, severity: 'medium' },
            { label: 'צופה בסרט. הלב שקט מדי, המגבר כבוי.', sublabel: 'ניתוק רגשי / קהות', value: 100, severity: 'high' }
        ]
    }
];

const HELP_TERMS: Record<string, { title: string; desc: string }> = {
    'Vault': { title: 'כספת המרפא (Vault)', desc: 'מאגר המידע הרפואי והאישי שלך. כל מסמך שהעלית משמש את ה-AI כדי להבין את ההיסטוריה שלך בצורה מדויקת.' },
    'Compass': { title: 'מצפן האישיות (Compass)', desc: 'כלי למיפוי רגשי בזמן אמת. הוא בודק איפה אתה נמצא כרגע ביחס לריבונות שלך.' },
    'Quantum Radar': { title: 'רדאר קוונטי', desc: 'ויזואליזציה רב-מימדית שמראה את ה-Frequencies (תדרים) השונים של המערכת שלך: ויסות, חברתי, גוף וריבונות.' },
    'ריבונות': { title: 'ריבונות (Sovereignty)', desc: 'היכולת שלך להיות "בעל הבית" של עצמך, לקבל החלטות מתוך שקט ולא מתוך דחף או לחץ חיצוני.' }
};

interface PersonalityCompassProps {
    onComplete: (results: any) => void;
}

const PersonalityCompass: React.FC<PersonalityCompassProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isFinished, setIsFinished] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
    const [aiChatMessages, setAiChatMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([]);
    const [userInput, setUserInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const progress = Math.round((currentStep / QUESTIONS.length) * 100);

    const handleAnswer = (value: number) => {
        const q = QUESTIONS[currentStep];
        setAnswers(prev => ({ ...prev, [q.id]: value }));

        if (currentStep < QUESTIONS.length - 1) {
            setTimeout(() => setCurrentStep(prev => prev + 1), 400);
        } else {
            generateFinalAnalysis();
            setTimeout(() => setIsFinished(true), 400);
        }
    };

    const generateFinalAnalysis = () => {
        const speed = answers.regulation_speed || 0;
        const social = answers.social_sync || 0;
        let analysis = "עידן, מהניתוח עולה שהמערכת שלך כרגע ב'תדר גבוה' (מאניה). ";
        if (social > 70) analysis += "אנחנו מזהים קושי בסנכרון חברתי-רגשי שגורם לעולם להרגיש כמו שפה זרה. ";
        analysis += "בוא נתחיל בצעדים קטנים להחזרת השליטה.";

        setAiChatMessages([{ role: 'ai', text: analysis }]);
    };

    const sendAiMessage = () => {
        if (!userInput.trim()) return;
        const updated = [...aiChatMessages, { role: 'user' as const, text: userInput }];
        setAiChatMessages(updated);
        setUserInput('');

        setTimeout(() => {
            setAiChatMessages(prev => [...prev, {
                role: 'ai',
                text: "שאלה מצוינת. הנתונים ב-Vault מראים שהמצב הזה זמני ונובע בעיקר מחוסר איזון כימי כרגע. הפעולות הריבוניות שסימנו כאן הן הדרך המהירה ביותר לייצוב."
            }]);
        }, 800);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [aiChatMessages]);

    const getSovereignScore = () => {
        const vals = Object.values(answers);
        if (vals.length === 0) return 100;
        const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
        return Math.round(Math.max(0, 100 - avg));
    };

    const score = getSovereignScore();
    const scoreColor = score > 70 ? 'text-emerald-500' : score > 40 ? 'text-amber-500' : 'text-rose-500';

    if (isFinished) {
        return (
            <div className="min-h-screen bg-[#0F172A] text-white font-assistant p-6 lg:p-12 overflow-y-auto" dir="rtl">
                {/* Tooltip Overlay */}
                {activeTooltip && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                        <div className="bg-white text-slate-900 rounded-[2rem] p-8 max-w-md w-full relative shadow-2xl animate-in zoom-in duration-300">
                            <button onClick={() => setActiveTooltip(null)} className="absolute top-6 left-6 text-slate-300 hover:text-slate-900">
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-black italic mb-4 text-indigo-600">{HELP_TERMS[activeTooltip].title}</h3>
                            <p className="text-lg font-bold leading-relaxed">{HELP_TERMS[activeTooltip].desc}</p>
                        </div>
                    </div>
                )}

                <div className="max-w-6xl mx-auto space-y-10">
                    {/* Results Header */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[4rem] p-10 md:p-14 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 space-y-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2">תמונת המצב של הריבון</h1>
                                    <p className="text-xl text-slate-400 font-bold italic">זהו דוח מצב רגעי + צעדים מתוכננים להבאת שליטה עדינה</p>
                                </div>
                                <div className="flex items-center gap-6 bg-white/5 p-6 rounded-[2.5rem] border border-white/10">
                                    <div className="text-center">
                                        <div className={`text-5xl font-black italic tracking-tighter ${scoreColor}`}>{score}%</div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Sovereign Level</div>
                                    </div>
                                    <div className="w-[2px] h-12 bg-white/10" />
                                    {score < 40 && (
                                        <div className="flex items-center gap-2 text-rose-400 font-black animate-pulse">
                                            <AlertTriangle size={20} /> זהירות: ויסות נמוך
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-indigo-600/20 border border-indigo-500/30 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8">
                                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
                                    <Target size={40} />
                                </div>
                                <div className="flex-1 text-center md:text-right">
                                    <h3 className="text-2xl font-black italic mb-2">צעד ראשון עכשיו (2 דקות)</h3>
                                    <p className="text-lg font-bold opacity-80 mb-4">נשימות קרקוע: 4 שניות פנימה, 6 שניות החוצה. זה יוריד את לחץ הדם ויאזן את המנוע.</p>
                                    <button className="bg-white text-indigo-700 px-8 py-3 rounded-full font-black hover:scale-105 transition-all shadow-lg">
                                        התחל טיימר 2:00
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Charts & Action Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Radar Chart */}
                        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black italic">מפת ה-<span className="text-indigo-400 underline cursor-help" onClick={() => setActiveTooltip('Quantum Radar')}>Quantum Radar</span></h3>
                                <HelpCircle size={20} className="text-slate-500 cursor-help" onClick={() => setActiveTooltip('Quantum Radar')} />
                            </div>
                            <div className="h-80 flex items-center justify-center text-slate-500 font-bold italic border-2 border-dashed border-white/5 rounded-[2rem]">
                                [ Radar Chart Placeholder - Interaction: Hover for details ]
                                {/* Recharts integration would go here */}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {['ויסות', 'חברתי', 'גוף', 'ריבונות', 'דיגיטל', 'חלוציות'].map(label => (
                                    <div key={label} className="bg-white/5 p-4 rounded-2xl flex flex-col items-center gap-1">
                                        <span className="text-[10px] font-black uppercase text-slate-400">{label}</span>
                                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500" style={{ width: `${Math.random() * 80 + 20}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sovereign Actions Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-black italic pr-4">פעולות ריבוניות מומלצות</h3>

                            {/* Action Cards */}
                            {[
                                { icon: Lock, title: 'הפעל בלימה (Spending Lock)', desc: 'חסימה רכה של הוצאות מעל 200₪ ל-24 שעות.', time: '30 שנ\'', diff: 'קל מאוד' },
                                { icon: Filter, title: 'סינון תקשורת (Relational Filter)', desc: '90 דקות של הודעות תפעוליות בלבד. ללא ויכוחים.', time: '20 שנ\'', diff: 'בינוני' },
                                { icon: Waves, title: 'מדיטציה קרקוע (Grounding)', desc: '10 נשימות איטיות לשחרור מתח מהבטן.', time: '6 דק\'', diff: 'קל' },
                                { icon: ShieldCheck, title: 'עוגן רוחני (תפילין/תפילה)', desc: '10 דקות של שקט, סדר וחיבור למסורת.', time: '12 דק\'', diff: 'מרגיע' }
                            ].map((act, i) => (
                                <div key={i} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2rem] p-6 transition-all group cursor-pointer">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                            <act.icon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-black italic mb-1">{act.title}</h4>
                                            <p className="text-sm font-bold text-slate-400 leading-tight mb-3">{act.desc}</p>
                                            <div className="flex gap-4">
                                                <span className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-500"><Clock size={10} /> {act.time}</span>
                                                <span className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-500"><Zap size={10} /> {act.diff}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-4 py-2 border border-white/10 rounded-xl font-black text-xs hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100">הפעל עכשיו</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sovereign AI Chat Integration */}
                    <div className="bg-white rounded-[3rem] text-slate-900 p-10 md:p-14 space-y-8 shadow-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-lg">
                                <Brain size={32} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black italic tracking-tighter">שאל את הריבון-AI</h3>
                                <p className="text-lg font-bold text-slate-500">יש לך שאלות על האבחון? אני כאן עם כל הנתונים מה-<span className="text-indigo-600 underline cursor-help" onClick={() => setActiveTooltip('Vault')}>Vault</span>.</p>
                            </div>
                        </div>

                        {/* Chat Context Box */}
                        <div className="bg-slate-50 rounded-[2rem] h-64 overflow-y-auto p-8 space-y-4 border border-slate-100">
                            {aiChatMessages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl font-bold ${msg.role === 'ai' ? 'bg-white shadow-sm text-slate-800' : 'bg-indigo-600 text-white'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Quick Question Chips */}
                        <div className="flex flex-wrap gap-2">
                            {['תסביר לי את המפה שלי', '3 הצעות ל-24 שעות הקרובות', 'איך להסביר את זה למשפחה?', 'מה ההבדל בין ויסות לריבונות?'].map(chip => (
                                <button
                                    key={chip}
                                    onClick={() => { setUserInput(chip); }}
                                    className="bg-slate-100 hover:bg-indigo-50 px-4 py-2 rounded-full text-sm font-black text-slate-600 hover:text-indigo-600 transition-all"
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendAiMessage()}
                                placeholder="שאל פה כל דבר..."
                                className="flex-1 bg-slate-100 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-indigo-600 transition-all"
                            />
                            <button onClick={sendAiMessage} className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
                                <Send size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Back to Home Navigation */}
                <div className="max-w-6xl mx-auto mt-12 flex justify-center">
                    <button onClick={onComplete} className="flex items-center gap-3 text-slate-500 font-black hover:text-white transition-all uppercase tracking-widest text-xs">
                        חזרה לפורטל <ChevronRight className="rotate-180" size={16} />
                    </button>
                </div>
            </div>
        );
    }

    const question = QUESTIONS[currentStep];

    return (
        <div className="min-h-screen bg-slate-50 font-assistant flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden" dir="rtl">
            {/* Ambient Soundscape Interface */}
            <div className="fixed top-8 left-8 z-50 flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                </button>
                <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Ambient Sync</span>
                    <span className="text-[10px] font-bold text-slate-700 italic">Ethno-Ambient World Loop</span>
                </div>
            </div>

            <div className="w-full max-w-2xl z-10 space-y-10">
                <div className="space-y-4">
                    <div className="flex justify-between items-end mb-2">
                        <h3 className="text-lg font-black italic text-indigo-600">סנכרון ריבונות בתהליך...</h3>
                        <span className="text-2xl font-black text-slate-300 italic">{progress}%</span>
                    </div>
                    <div className="h-4 bg-slate-200 rounded-full overflow-hidden p-1 shadow-inner">
                        <div
                            className="h-full bg-gradient-to-l from-indigo-600 to-indigo-400 rounded-full transition-all duration-700"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 p-10 md:p-14 relative group flex flex-col min-h-[500px]">
                    <div className="flex-1 space-y-10">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-105 transition-transform">
                                <question.icon size={40} />
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">{question.category}</span>
                                <h2 className="text-3xl font-black italic tracking-tighter text-slate-900 leading-tight">{question.title}</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {question.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(opt.value)}
                                    className="group/btn relative bg-slate-50 hover:bg-white border-2 border-transparent hover:border-indigo-200 p-6 md:p-8 rounded-[2.5rem] text-right transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex justify-between items-center"
                                >
                                    <div className="space-y-1">
                                        <span className="block text-xl md:text-2xl font-black text-slate-900 italic tracking-tight">{opt.label}</span>
                                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">{opt.sublabel}</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-300 group-hover/btn:bg-indigo-600 group-hover/btn:text-white group-hover/btn:border-indigo-600 transition-all shadow-sm">
                                        <ChevronRight size={24} className="rotate-180" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setCurrentStep(prev => Math.min(prev + 1, QUESTIONS.length - 1))}
                        className="mt-10 flex items-center gap-2 text-slate-400 font-bold hover:text-indigo-400 transition-colors mx-auto px-6 py-2 rounded-full hover:bg-slate-50"
                    >
                        <SkipForward size={18} /> לא מתאים לי לענות עכשיו
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalityCompass;
