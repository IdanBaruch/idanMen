import React, { useState } from 'react';
import {
    Brain,
    Lightbulb,
    CheckCircle2,
    TrendingUp,
    Zap,
    BookOpen,
    Globe,
    Code,
    Palette,
    Heart,
    Calculator,
    Music as MusicIcon,
    ChevronRight,
    Sparkles
} from 'lucide-react';

type Category = 'language' | 'science' | 'tech' | 'art' | 'health' | 'math' | 'music';

interface KnowledgeSnack {
    id: string;
    category: Category;
    title: string;
    fact: string;
    explanation: string;
    practical: string;
}

const KNOWLEDGE_LIBRARY: KnowledgeSnack[] = [
    {
        id: '1',
        category: 'language',
        title: 'המילה "Serendipity"',
        fact: 'Serendipity = מציאת משהו טוב במקרה',
        explanation: 'המילה נטבעה ב-1754 על ידי הורס וולפול, מבוססת על אגדה פרסית על שלושה נסיכים שמצאו דברים שלא חיפשו.',
        practical: 'בפעם הבאה שתמצא משהו טוב במקרה, תוכל לומר: "זו הייתה Serendipity!"'
    },
    {
        id: '2',
        category: 'science',
        title: 'למה השמיים כחולים?',
        fact: 'האור הכחול מתפזר יותר באטמוספירה',
        explanation: 'אור השמש מורכב מכל הצבעים. כשהוא עובר דרך האטמוספירה, האור הכחול (גל קצר) מתפזר יותר מהאדום (גל ארוך).',
        practical: 'זו הסיבה שבשקיעה השמיים אדומים - האור עובר מסלול ארוך יותר ורק האדום מגיע אלינו.'
    },
    {
        id: '3',
        category: 'tech',
        title: 'מה זה Cookie?',
        fact: 'Cookie = קובץ קטן שאתר שומר במחשב שלך',
        explanation: 'כשאתה מבקר באתר, הוא שומר Cookie כדי לזכור אותך (כמו "אתה כבר היית פה"). ככה הוא יודע מה יש לך בעגלה או שאתה מחובר.',
        practical: 'אם אתה רוצה לנקות את ההיסטוריה שלך, תמחק את ה-Cookies.'
    },
    {
        id: '4',
        category: 'art',
        title: 'הכלל של שליש',
        fact: 'תמונה מעניינת יותר כשהנושא לא במרכז',
        explanation: 'צלמים מחלקים את התמונה ל-9 חלקים (3x3) ושמים את הנושא על אחד מהקווים או הצמתים. זה יוצר איזון ויזואלי.',
        practical: 'בפעם הבאה שאתה מצלם, נסה לשים את האדם או הנוף קצת בצד - זה ייראה יותר מקצועי.'
    },
    {
        id: '5',
        category: 'health',
        title: 'כלל 20-20-20 למסך',
        fact: 'כל 20 דקות, תסתכל 20 שניות על משהו במרחק 20 רגל',
        explanation: 'כשאתה מסתכל על מסך הרבה זמן, שרירי העיניים מתעייפים. הכלל הזה נותן להם הפסקה.',
        practical: 'הגדר טיימר כל 20 דקות והסתכל מהחלון או על משהו רחוק.'
    },
    {
        id: '6',
        category: 'math',
        title: 'טריק כפל ב-9',
        fact: 'כדי לכפול מספר ב-9, תכפיל ב-10 ותחסר את המספר',
        explanation: '7 × 9 = (7 × 10) - 7 = 70 - 7 = 63. זה עובד כי 9 = 10 - 1.',
        practical: 'זה הרבה יותר מהיר מלעשות כפל רגיל בראש!'
    },
    {
        id: '7',
        category: 'music',
        title: 'מה זה Earworm?',
        fact: 'Earworm = שיר שנתקע לך בראש',
        explanation: 'המוח שלנו אוהב לולאות. כשאתה שומע שיר קליט, המוח ממשיך "לנגן" אותו גם אחרי שהוא נגמר.',
        practical: 'כדי להיפטר מ-Earworm, תנסה לשיר את השיר עד הסוף (המוח שונא לולאות לא גמורות).'
    }
];

const CATEGORY_CONFIG: Record<Category, { label: string; icon: React.ElementType; color: string }> = {
    language: { label: 'שפה', icon: Globe, color: 'blue' },
    science: { label: 'מדע', icon: Zap, color: 'purple' },
    tech: { label: 'טכנולוגיה', icon: Code, color: 'green' },
    art: { label: 'אמנות', icon: Palette, color: 'pink' },
    health: { label: 'בריאות', icon: Heart, color: 'red' },
    math: { label: 'מתמטיקה', icon: Calculator, color: 'orange' },
    music: { label: 'מוזיקה', icon: MusicIcon, color: 'indigo' }
};

const NeuroGrowth: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [selectedSnack, setSelectedSnack] = useState<KnowledgeSnack | null>(null);
    const [learnedToday, setLearnedToday] = useState(false);
    const [streak, setStreak] = useState(7); // This would be tracked in backend
    const todaySnack = KNOWLEDGE_LIBRARY[new Date().getDate() % KNOWLEDGE_LIBRARY.length];

    const handleLearnToday = () => {
        setLearnedToday(true);
        setSelectedSnack(todaySnack);
    };

    if (selectedSnack) {
        const categoryConfig = CATEGORY_CONFIG[selectedSnack.category];
        const CategoryIcon = categoryConfig.icon;

        return (
            <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 font-assistant p-6 lg:p-12" dir="rtl">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => setSelectedSnack(null)}
                        className="text-white/70 hover:text-white font-bold mb-8 transition-colors"
                    >
                        ← חזרה
                    </button>

                    <div className="bg-white/10 backdrop-blur-xl rounded-[4rem] p-12 md:p-16 border border-white/20 shadow-2xl">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 bg-${categoryConfig.color}-500/20 rounded-2xl flex items-center justify-center border border-${categoryConfig.color}-400/30`}>
                                    <CategoryIcon size={32} className={`text-${categoryConfig.color}-300`} />
                                </div>
                                <div>
                                    <div className={`text-sm font-black uppercase text-${categoryConfig.color}-300 mb-1`}>
                                        {categoryConfig.label}
                                    </div>
                                    <h1 className="text-4xl font-black italic text-white">{selectedSnack.title}</h1>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                                <div className="flex items-start gap-4">
                                    <Lightbulb className="text-yellow-400 shrink-0" size={32} />
                                    <div>
                                        <h3 className="text-xl font-black text-white mb-3">העובדה</h3>
                                        <p className="text-2xl font-bold text-white/90 leading-relaxed italic">
                                            {selectedSnack.fact}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                                <h3 className="text-xl font-black text-white mb-4">ההסבר</h3>
                                <p className="text-lg font-bold text-white/80 leading-relaxed">
                                    {selectedSnack.explanation}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-3xl p-8 border border-green-400/30">
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="text-green-300 shrink-0" size={28} />
                                    <div>
                                        <h3 className="text-xl font-black text-green-100 mb-3">איך להשתמש בזה?</h3>
                                        <p className="text-lg font-bold text-green-200/90 leading-relaxed">
                                            {selectedSnack.practical}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {learnedToday && (
                                <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 text-white text-center animate-in fade-in duration-500">
                                    <Sparkles size={48} className="mx-auto mb-4" />
                                    <h3 className="text-2xl font-black italic mb-2">המוח שלך גדל ב-1% היום! 🎉</h3>
                                    <p className="text-lg font-bold opacity-90">
                                        רצף למידה: {streak} ימים ברציפות
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-assistant p-6 lg:p-12" dir="rtl">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div>
                    <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-violet-200">
                        <Brain size={14} /> Neuro Growth
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mt-2 text-slate-900">
                        הנוירון <span className="text-violet-600">היומי.</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-bold italic mt-2">ביס של ידע כל יום - המוח שלך יודה לך</p>
                </div>

                {/* Today's Snack */}
                <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-[4rem] p-12 md:p-16 text-white shadow-2xl">
                    <div className="text-center space-y-8">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                            <Brain size={48} />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black italic mb-3">הביס של היום</h2>
                            <p className="text-xl font-bold opacity-90">{todaySnack.title}</p>
                        </div>
                        <button
                            onClick={handleLearnToday}
                            className="bg-white text-violet-600 px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl"
                        >
                            למד עכשיו (2 דקות)
                        </button>
                    </div>
                </div>

                {/* Streak */}
                <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-black italic mb-2">הרצף שלך</h3>
                            <p className="text-lg text-slate-600 font-bold">כל יום שאתה לומד, המוח שלך מתחזק</p>
                        </div>
                        <div className="text-center">
                            <div className="text-6xl font-black text-violet-600">{streak}</div>
                            <div className="text-sm font-black uppercase text-slate-400 mt-2">ימים ברציפות</div>
                        </div>
                    </div>
                </div>

                {/* Knowledge Library */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-black italic">הספרייה המלאה</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {KNOWLEDGE_LIBRARY.map((snack) => {
                            const categoryConfig = CATEGORY_CONFIG[snack.category];
                            const CategoryIcon = categoryConfig.icon;

                            return (
                                <div
                                    key={snack.id}
                                    onClick={() => setSelectedSnack(snack)}
                                    className="bg-white rounded-[2.5rem] p-8 border border-slate-100 hover:border-violet-200 hover:shadow-xl transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-14 h-14 bg-${categoryConfig.color}-50 rounded-2xl flex items-center justify-center group-hover:bg-${categoryConfig.color}-100 transition-all shrink-0`}>
                                            <CategoryIcon size={24} className={`text-${categoryConfig.color}-600`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className={`text-xs font-black uppercase text-${categoryConfig.color}-600 mb-2`}>
                                                {categoryConfig.label}
                                            </div>
                                            <h3 className="text-xl font-black italic mb-2">{snack.title}</h3>
                                            <p className="text-md font-bold text-slate-600 leading-snug">
                                                {snack.fact}
                                            </p>
                                        </div>
                                        <ChevronRight className="text-slate-300 group-hover:text-violet-600 group-hover:translate-x-[-4px] transition-all" size={24} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Why It Matters */}
                <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
                    <h2 className="text-2xl font-black italic mb-6">למה זה חשוב?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-lg font-black">דופמין בריא</h3>
                            <p className="text-slate-600 font-bold leading-relaxed">
                                כשאתה לומד משהו חדש, המוח מפריש דופמין טבעי
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600">
                                <Brain size={24} />
                            </div>
                            <h3 className="text-lg font-black">נוירופלסטיות</h3>
                            <p className="text-slate-600 font-bold leading-relaxed">
                                המוח שלך יוצר קשרים חדשים בין נוירונים
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600">
                                <Sparkles size={24} />
                            </div>
                            <h3 className="text-lg font-black">תחושת מסוגלות</h3>
                            <p className="text-slate-600 font-bold leading-relaxed">
                                כל ידע חדש מחזק את הביטחון העצמי שלך
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NeuroGrowth;
