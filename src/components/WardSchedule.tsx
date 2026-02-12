import React, { useState } from 'react';
import { Calendar, Clock, Coffee, Utensils, Users, Info, ChevronRight, ChevronLeft, Zap, Sparkles } from 'lucide-react';

interface WardScheduleProps {
    onBack: () => void;
}

const WEEKLY_SCHEDULE = [
    {
        day: 'ראשון',
        activities: [
            { time: '08:30', title: 'קבוצת פתיחת שבוע', leader: 'צוות ד', icon: Zap },
            { time: '10:00', title: 'ריפוי בעיסוק', leader: 'מרפאות בעיסוק', icon: Coffee },
            { time: '12:00', title: 'קבוצת מטרות', leader: 'צוות טיפולי', icon: Users }
        ]
    },
    {
        day: 'שני',
        activities: [
            { time: '09:00', title: 'ביקור רופאים - ד"ר הררי', leader: 'ד"ר הררי', icon: Info },
            { time: '11:00', title: 'פסיכודרמה', leader: 'צוות מטפלים באומנויות', icon: Sparkles },
            { time: '14:00', title: 'יוגה / ספורט טיפולי', leader: 'מטפלים בספורט', icon: Zap }
        ]
    },
    {
        day: 'שלישי',
        activities: [
            { time: '09:00', title: 'ביקור רופאים - ד"ר גיסין', leader: 'ד"ר גיסין', icon: Info },
            { time: '11:00', title: 'טיפול במוזיקה', leader: 'צוות מטפלים במוזיקה', icon: Sparkles }
        ],
        specialNote: 'ביקור הרופאים של ד"ר הררי הועבר באופן חד פעמי ליום שלישי (10/2)'
    }
];

const WEEKLY_MENU = [
    { day: 'שני', main: 'קציצות בקר ברוטב', sides: 'אורז לבן, שעועית ירוקה' },
    { day: 'שלישי', main: 'דג אפוי בעשבי תיבול', sides: 'פירה, סלט ירקות' },
    { day: 'רביעי', main: 'עוף בקארי וקוקוס', sides: 'קוסקוס, ירקות מבושלים' }
];

const WardSchedule: React.FC<WardScheduleProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'schedule' | 'menu'>('schedule');
    const [selectedDay, setSelectedDay] = useState(1); // Monday

    return (
        <div className="min-h-screen bg-[#020408] text-white font-assistant p-8" dir="rtl">
            {/* Header */}
            <header className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                        <ChevronLeft size={24} className="rotate-180" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black italic tracking-tighter text-indigo-400">תכנית מבצעית <span className="text-white font-light">מחלקה ה'</span></h1>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none mt-1">ניהול זמן ומשאבים</p>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto space-y-8">
                {/* Tabs */}
                <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/5 w-fit mx-auto">
                    <button
                        onClick={() => setActiveTab('schedule')}
                        className={`px-8 py-3 rounded-xl font-black italic text-sm transition-all flex items-center gap-2 ${activeTab === 'schedule' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Calendar size={18} /> תכנית שבועית
                    </button>
                    <button
                        onClick={() => setActiveTab('menu')}
                        className={`px-8 py-3 rounded-xl font-black italic text-sm transition-all flex items-center gap-2 ${activeTab === 'menu' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Utensils size={18} /> תפריט תזונה
                    </button>
                </div>

                {activeTab === 'schedule' ? (
                    <div className="space-y-8">
                        {/* Day Selector */}
                        <div className="flex justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
                            {WEEKLY_SCHEDULE.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedDay(i)}
                                    className={`px-6 py-4 rounded-2xl font-black transition-all border shrink-0 ${selectedDay === i ? 'bg-white text-black border-white' : 'bg-slate-900 text-slate-500 border-white/5'}`}
                                >
                                    {s.day}
                                </button>
                            ))}
                        </div>

                        {/* Special Note */}
                        {WEEKLY_SCHEDULE[selectedDay].specialNote && (
                            <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-[2rem] flex items-center gap-4 animate-in slide-in-from-top-4 duration-500">
                                <div className="p-3 bg-amber-500 rounded-2xl">
                                    <Info className="text-white" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-amber-500">הודעה מיוחדת:</h4>
                                    <p className="text-sm font-bold text-slate-300 italic">{WEEKLY_SCHEDULE[selectedDay].specialNote}</p>
                                </div>
                            </div>
                        )}

                        {/* Activities List */}
                        <div className="grid grid-cols-1 gap-4">
                            {WEEKLY_SCHEDULE[selectedDay].activities.map((act, i) => (
                                <div key={i} className="group bg-slate-900 border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between hover:border-indigo-500/30 transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-indigo-600/10 rounded-3xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            <act.icon size={28} />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-slate-500" />
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{act.time}</span>
                                            </div>
                                            <h3 className="text-xl font-black italic">{act.title}</h3>
                                            <p className="text-xs font-bold text-slate-400">בהנחיית: {act.leader}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-slate-700" size={24} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-700">
                        {WEEKLY_MENU.map((item, i) => (
                            <div key={i} className="bg-slate-900 border border-white/5 p-8 rounded-[3rem] space-y-6">
                                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                    <h3 className="text-xl font-black italic text-indigo-400">יום {item.day}</h3>
                                    <Utensils size={20} className="text-slate-600" />
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">מנה עיקרית</span>
                                        <p className="text-lg font-bold text-white leading-tight">{item.main}</p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">תוספות</span>
                                        <p className="text-sm font-bold text-slate-400 italic">{item.sides}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default WardSchedule;
