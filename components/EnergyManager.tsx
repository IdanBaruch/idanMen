import React, { useState } from 'react';
import {
    Battery,
    BatteryCharging,
    Moon,
    Sun,
    CheckCircle2,
    Circle,
    Bed,
    Coffee,
    Droplets,
    Heart,
    Dumbbell,
    BookOpen,
    TrendingUp,
    AlertCircle,
    Zap,
    Clock
} from 'lucide-react';

interface MorningTask {
    id: string;
    title: string;
    icon: React.ElementType;
    benefit: string;
}

const MORNING_ROUTINE: MorningTask[] = [
    { id: 'bed', title: 'סידור המיטה', icon: Bed, benefit: 'ניצחון ראשון של היום' },
    { id: 'water', title: '2 כוסות מים', icon: Droplets, benefit: 'הנעת המערכת' },
    { id: 'prayer', title: 'תפילה / מדיטציה', icon: Heart, benefit: 'הכרת תודה' },
    { id: 'movement', title: 'תנועה קלה', icon: Dumbbell, benefit: 'הפעלת הגוף' }
];

const EnergyManager: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'sleep' | 'morning'>('sleep');
    const [sleepHours, setSleepHours] = useState(7);
    const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
    const userAge = 43; // This would come from user profile

    const toggleTask = (taskId: string) => {
        const newCompleted = new Set(completedTasks);
        if (newCompleted.has(taskId)) {
            newCompleted.delete(taskId);
        } else {
            newCompleted.add(taskId);
        }
        setCompletedTasks(newCompleted);
    };

    const getBatteryLevel = () => {
        if (sleepHours >= 7) return 100;
        if (sleepHours >= 6) return 75;
        if (sleepHours >= 5) return 50;
        if (sleepHours >= 4) return 25;
        return 10;
    };

    const getBatteryColor = () => {
        const level = getBatteryLevel();
        if (level >= 75) return 'from-green-500 to-emerald-600';
        if (level >= 50) return 'from-yellow-500 to-amber-600';
        if (level >= 25) return 'from-orange-500 to-red-600';
        return 'from-red-600 to-red-800';
    };

    const getSleepRecommendation = () => {
        if (sleepHours >= 7 && sleepHours <= 9) {
            return {
                status: 'מצוין!',
                message: 'אתה ישן מספיק שעות. המעבד שלך יעבוד מחר בלי תקיעות.',
                color: 'green'
            };
        } else if (sleepHours >= 6) {
            return {
                status: 'לא רע',
                message: 'עדיף להוסיף עוד שעה. המוח צריך 7-9 שעות לטעינה מלאה.',
                color: 'yellow'
            };
        } else {
            return {
                status: 'אזהרה',
                message: 'זה לא מספיק. חוסר שינה פוגע בריכוז, במצב הרוח ובבריאות.',
                color: 'red'
            };
        }
    };

    const recommendation = getSleepRecommendation();

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-assistant p-6 lg:p-12" dir="rtl">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div>
                    <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-200">
                        <Battery size={14} /> Energy Manager
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mt-2 text-slate-900">
                        מנהל <span className="text-indigo-600">האנרגיה.</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-bold italic mt-2">שינה ושגרת בוקר ליציבות מקסימלית</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('sleep')}
                        className={`flex-1 py-4 px-6 rounded-2xl font-black text-lg transition-all ${activeTab === 'sleep'
                                ? 'bg-indigo-600 text-white shadow-lg'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-200'
                            }`}
                    >
                        <Moon className="inline-block ml-2" size={24} />
                        זמן טעינה (שינה)
                    </button>
                    <button
                        onClick={() => setActiveTab('morning')}
                        className={`flex-1 py-4 px-6 rounded-2xl font-black text-lg transition-all ${activeTab === 'morning'
                                ? 'bg-amber-500 text-white shadow-lg'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-200'
                            }`}
                    >
                        <Sun className="inline-block ml-2" size={24} />
                        נוהל בוקר (הובלה)
                    </button>
                </div>

                {/* Sleep Tab */}
                {activeTab === 'sleep' && (
                    <div className="space-y-8">

                        {/* Battery Visualization */}
                        <div className="bg-white rounded-[4rem] p-12 md:p-16 border border-slate-200 shadow-sm">
                            <div className="text-center space-y-8">
                                <div className="relative w-48 h-48 mx-auto">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${getBatteryColor()} rounded-full opacity-20 animate-pulse`} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <BatteryCharging size={80} className="text-indigo-600" />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-6xl font-black text-slate-900 mt-24">
                                            {getBatteryLevel()}%
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-3xl font-black italic mb-2">רמת הסוללה שלך</h2>
                                    <p className="text-xl text-slate-500 font-bold">
                                        לפי {sleepHours} שעות שינה
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sleep Hours Slider */}
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
                            <h3 className="text-2xl font-black italic mb-6">כמה שעות ישנת הלילה?</h3>

                            <div className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <span className="text-4xl font-black text-indigo-600 w-20">{sleepHours}h</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="12"
                                        step="0.5"
                                        value={sleepHours}
                                        onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                                        className="flex-1 h-3 bg-slate-200 rounded-full appearance-none cursor-pointer"
                                    />
                                </div>

                                <div className={`bg-${recommendation.color}-50 border border-${recommendation.color}-200 rounded-2xl p-6`}>
                                    <div className="flex items-start gap-4">
                                        <AlertCircle className={`text-${recommendation.color}-600 shrink-0`} size={24} />
                                        <div>
                                            <h4 className={`text-xl font-black text-${recommendation.color}-900 mb-2`}>
                                                {recommendation.status}
                                            </h4>
                                            <p className={`text-lg font-bold text-${recommendation.color}-700 leading-relaxed`}>
                                                {recommendation.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sleep Science */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[3rem] p-10 text-white">
                            <h3 className="text-2xl font-black italic mb-6">למה שינה זה טעינה?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                        <Zap size={24} />
                                    </div>
                                    <h4 className="text-lg font-black mb-2">ניקוי המוח</h4>
                                    <p className="font-bold opacity-90 leading-relaxed">
                                        בשינה המוח מנקה רעלים שהצטברו במהלך היום
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                        <TrendingUp size={24} />
                                    </div>
                                    <h4 className="text-lg font-black mb-2">חיזוק זיכרון</h4>
                                    <p className="font-bold opacity-90 leading-relaxed">
                                        השינה מעבירה מידע מהזיכרון הקצר לארוך
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                        <Heart size={24} />
                                    </div>
                                    <h4 className="text-lg font-black mb-2">ויסות רגשי</h4>
                                    <p className="font-bold opacity-90 leading-relaxed">
                                        חוסר שינה מגביר חרדה ומפחית יציבות רגשית
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Morning Tab */}
                {activeTab === 'morning' && (
                    <div className="space-y-8">

                        {/* Motto */}
                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-[4rem] p-12 text-white text-center">
                            <Sun size={64} className="mx-auto mb-6 opacity-80" />
                            <h2 className="text-4xl md:text-5xl font-black italic mb-4">
                                "קימה מוקדמת יוצרת הובלה"
                            </h2>
                            <p className="text-xl font-bold opacity-90">
                                השגרה הזו תיתן לך שליטה על היום, במקום שהיום ישלוט בך
                            </p>
                        </div>

                        {/* Progress */}
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-black italic">ההתקדמות שלך</h3>
                                <div className="text-3xl font-black text-amber-600">
                                    {completedTasks.size}/{MORNING_ROUTINE.length}
                                </div>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-amber-500 to-orange-600 h-full transition-all duration-500 rounded-full"
                                    style={{ width: `${(completedTasks.size / MORNING_ROUTINE.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Morning Checklist */}
                        <div className="space-y-4">
                            {MORNING_ROUTINE.map((task, index) => {
                                const isCompleted = completedTasks.has(task.id);
                                const Icon = task.icon;

                                return (
                                    <div
                                        key={task.id}
                                        onClick={() => toggleTask(task.id)}
                                        className={`bg-white rounded-[2.5rem] p-8 border-2 transition-all cursor-pointer ${isCompleted
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-slate-200 hover:border-amber-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="text-3xl font-black text-slate-300 w-12">
                                                    {index + 1}
                                                </div>
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isCompleted ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'
                                                    }`}>
                                                    {isCompleted ? <CheckCircle2 size={32} /> : <Icon size={32} />}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`text-2xl font-black italic mb-1 ${isCompleted ? 'text-green-900 line-through' : 'text-slate-900'
                                                    }`}>
                                                    {task.title}
                                                </h4>
                                                <p className="text-lg font-bold text-slate-500">{task.benefit}</p>
                                            </div>
                                            <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center ${isCompleted
                                                    ? 'border-green-500 bg-green-500'
                                                    : 'border-slate-300'
                                                }`}>
                                                {isCompleted && <CheckCircle2 className="text-white" size={20} />}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Completion Message */}
                        {completedTasks.size === MORNING_ROUTINE.length && (
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[3rem] p-10 text-white text-center animate-in fade-in duration-500">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h3 className="text-3xl font-black italic mb-3">מעולה! סיימת את השגרה!</h3>
                                <p className="text-xl font-bold opacity-90">
                                    היום שלך התחיל נכון. אתה מוביל, לא מובל.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnergyManager;
