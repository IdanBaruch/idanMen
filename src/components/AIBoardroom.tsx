import React, { useState } from 'react';
import {
    Users, Heart,
    TrendingUp, BarChart3, Lock, BrainCircuit,
    ChevronLeft, Quote, Siren,
    Accessibility
} from 'lucide-react';

interface BoardMember {
    id: string;
    name: string;
    role: string;
    team: 'red' | 'blue';
    icon: React.ElementType;
    color: string;
    quote: string;
    longQuote: string;
}

const BOARD_MEMBERS: BoardMember[] = [
    {
        id: 'synapse',
        name: 'ד"ר סינפסה',
        role: 'ביקורת רפואית',
        team: 'red',
        icon: Siren,
        color: 'text-rose-500',
        quote: 'רדאר אלימות פעיל.',
        longQuote: 'אתה רואה את הרדאר הזה? הוא מסמן באדום מי עומד להתפוצץ בעוד 20 דקות. המערכת שלנו מונעת את האלימות במחלקה לפני שהיא קורית. רוצה שקט במשמרת לילה? תתקין את זה עכשיו.'
    },
    {
        id: 'architect',
        name: 'הארכיטקטית',
        role: 'אסטרטגיית חווית משתמש',
        team: 'red',
        icon: Accessibility,
        color: 'text-amber-500',
        quote: 'השרדות נטו. בלי מילים.',
        longQuote: 'מפחד? תלחץ כאן. אדום = לברוח. ירוק = להישאר. בשיא ההתקף אין זמן ל"ממשקים". אנחנו נותנים אינסטינקט דיגיטלי שמציל חיים בשנייה אחת.'
    },
    {
        id: 'fortress',
        name: 'המבצר',
        role: 'אבטחת מידע',
        team: 'red',
        icon: Lock,
        color: 'text-indigo-400',
        quote: 'אפס דליפות. אפס סיכון.',
        longQuote: 'דליפת דאטה אחת עולה לך 5 מיליון דולר בתביעות ומוניטין. הפרוטוקול שלי הופך את זה לבלתי אפשרי טכנית. אתה רוצה לישון בשקט או שאתה רוצה להסתכן? אתה בפנים או בחוץ?'
    },
    {
        id: 'shark',
        name: 'הכריש',
        role: 'משקיע',
        team: 'blue',
        icon: TrendingUp,
        color: 'text-blue-500',
        quote: 'ה-Waze של הנפש האנושית.',
        longQuote: 'אנחנו לא "עוזרים" לרופאים, אנחנו מחליפים את הבירוקרטיה שלהם. כל דקה שפסיכיאטר כותב סיכום עולה הון. ה-AI שלנו עושה את זה ב-10 אגורות. תכתוב את הצ\'ק עכשיו או שתפספס את ה-Unicorn הכי גדול של העשור.'
    },
    {
        id: 'pragmatic',
        name: 'הפרגמטית',
        role: 'מנהלת רכש',
        team: 'blue',
        icon: BarChart3,
        color: 'text-emerald-500',
        quote: 'רווח מיידי. בלי סיפורים.',
        longQuote: 'יום אשפוז עולה לך 2,500 ש"ח. המערכת שלי מפנה לך מיטה 2 ימים קודם. זה מיליוני שקלים בשנה של הכנסה נטו. תחתום על הפיילוט עכשיו או שתמשיך לשרוף תקציבים על מיטות שתקועות.'
    },
    {
        id: 'lioness',
        name: 'אמא לביאה',
        role: 'קהילה ומשפחה',
        team: 'blue',
        icon: Heart,
        color: 'text-rose-400',
        quote: 'שקט תעשייתי בבית.',
        longQuote: 'נמאס לכם מהריב המתיש על הכדורים כל בוקר? הילד לוקח -> אתם מקבלים וי ירוק לנייד. בלי חפירות, בלי טלפונים, בלי מתח. פשוט לישון בשקט. תורידי את האפליקציה עכשיו.'
    }
];

interface AIBoardroomProps {
    onBack: () => void;
}

const AIBoardroom: React.FC<AIBoardroomProps> = ({ onBack }) => {
    const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);
    const [activeTeam, setActiveTeam] = useState<'red' | 'blue' | 'all'>('all');

    const filteredMembers = activeTeam === 'all'
        ? BOARD_MEMBERS
        : BOARD_MEMBERS.filter(m => m.team === activeTeam);

    return (
        <div className="min-h-screen bg-[#020617] text-white font-assistant p-8 md:p-16 flex flex-col overflow-hidden relative" dir="rtl">
            <header className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-center mb-16">
                <div className="flex items-center gap-6">
                    <button onClick={onBack} className="p-4 hover:bg-white/5 rounded-full transition-colors rotate-180">
                        <ChevronLeft size={32} />
                    </button>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter">הדירקטוריון המלאכותי</h1>
                    </div>
                </div>

                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
                    <button
                        onClick={() => setActiveTeam('all')}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTeam === 'all' ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}
                    >הכל</button>
                    <button
                        onClick={() => setActiveTeam('red')}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTeam === 'red' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'}`}
                    >צוות אדום</button>
                    <button
                        onClick={() => setActiveTeam('blue')}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTeam === 'blue' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >צוות כחול</button>
                </div>
            </header>

            <main className="relative z-10 w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredMembers.map((member) => (
                        <button
                            key={member.id}
                            onClick={() => setSelectedMember(member)}
                            className={`p-6 rounded-[2.5rem] border transition-all duration-300 flex flex-col items-center text-center gap-4 group ${selectedMember?.id === member.id
                                ? selectedMember.team === 'red' ? 'bg-rose-500/20 border-rose-500 scale-105' : 'bg-blue-600/20 border-blue-500 scale-105'
                                : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                }`}
                        >
                            <div className={`p-4 rounded-2xl bg-white/5 shadow-inner transition-transform group-hover:scale-110 ${member.color}`}>
                                <member.icon size={32} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black italic leading-none mb-1">{member.name}</h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{member.role}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="lg:col-span-4 h-full">
                    {selectedMember ? (
                        <div className="h-full bg-white/5 rounded-[3rem] border border-white/10 p-10 flex flex-col space-y-8 animate-in fade-in slide-in-from-left-8 duration-500">
                            <div className="flex justify-between items-start">
                                <div className={`p-6 rounded-[2rem] bg-white/5 ${selectedMember.color}`}>
                                    <selectedMember.icon size={48} />
                                </div>
                                <div className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest border ${selectedMember.team === 'red' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
                                    {selectedMember.team === 'red' ? 'צוות אדום' : 'צוות כחול'}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-3xl font-black italic">{selectedMember.name}</h2>
                                <p className="text-indigo-400 font-bold tracking-widest uppercase text-xs">{selectedMember.role}</p>
                            </div>

                            <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar py-2">
                                <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 relative">
                                    <Quote size={40} className="absolute -top-4 -right-4 text-white/10" />
                                    <p className="text-2xl font-black italic text-white leading-tight mb-8">
                                        "{selectedMember.quote}"
                                    </p>
                                    <p className="text-slate-400 font-medium leading-relaxed italic text-lg pr-4 border-r-2 border-white/10">
                                        {selectedMember.longQuote}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full bg-white/5 rounded-[3rem] border border-white/5 border-dashed p-10 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-white/20">
                                <Users size={40} />
                            </div>
                            <h3 className="text-xl font-black italic text-white/50">בחר חבר דירקטוריון</h3>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AIBoardroom;
