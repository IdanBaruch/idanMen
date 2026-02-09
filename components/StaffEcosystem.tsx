import React from 'react';
import {
    ShieldCheck, Trash2, Camera, Soup, BookOpen,
    Brain, Crown, ChevronLeft, Users, Zap,
    Settings, Bell, Search, Info, Activity,
    Sprout, Stethoscope
} from 'lucide-react';
import { AppRole } from '../types';

interface StaffRole {
    id: AppRole;
    title: string;
    desc: string;
    icon: React.ElementType;
    color: string;
    count: number;
}

const STAFF_ROLES: StaffRole[] = [
    { id: AppRole.CLEANER, title: 'תחזוקה וסדר', desc: 'ניהול היגיינה וניקיון בממלכה', icon: Trash2, color: 'text-amber-500', count: 12 },
    { id: AppRole.SECURITY, title: 'מערך האבטחה', desc: 'שמירה על גבולות הריבונות', icon: ShieldCheck, color: 'text-rose-500', count: 8 },
    { id: AppRole.STAFF, title: 'ביקורת מצלמות', desc: 'ניטור והגנה מרחוק', icon: Camera, color: 'text-indigo-500', count: 4 },
    { id: AppRole.KITCHEN_STAFF, title: 'מערך ההזנה', desc: 'דלק לגוף ולנפש (הטבח)', icon: Soup, color: 'text-emerald-500', count: 6 },
    { id: AppRole.RABBI, title: 'היועץ הרוחני', desc: 'בית הכנסת וחיבור לערכים', icon: BookOpen, color: 'text-cyan-500', count: 2 },
    { id: AppRole.PSYCHOLOGIST, title: 'ליווי פסיכולוגי', desc: 'המורי לפסיכולוגיה וקרבה', icon: Brain, color: 'text-purple-500', count: 18 },
    { id: AppRole.OCCUPATIONAL_THERAPIST, title: 'ריפוי בעיסוק', desc: 'אימון תפקודי וניהול עשייה', icon: Settings, color: 'text-emerald-500', count: 7 },
    { id: AppRole.PSYCHIATRIST, title: 'פסיכיאטריה קלינית', desc: 'איזון תרופתי וניהול סיכונים', icon: Stethoscope, color: 'text-blue-600', count: 5 },
    { id: AppRole.GARDENER, title: 'גינון טיפולי', desc: 'חיבור לאדמה ולצמיחה', icon: Sprout, color: 'text-emerald-400', count: 3 },
    { id: AppRole.CEO, title: 'לשכת המנכ"ל', desc: 'חזון ואסטרטגיה מערכתית', icon: Crown, color: 'text-amber-400', count: 1 },
];

const StaffEcosystem: React.FC<{ onSelect: (id: AppRole) => void, onBack: () => void }> = ({ onSelect, onBack }) => {
    return (
        <div className="min-h-screen bg-[#0a0f18] text-white flex flex-col font-assistant overflow-x-hidden" dir="rtl">
            {/* HUD Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f18]/80 backdrop-blur-xl border-b border-white/5 p-8 flex justify-between items-center shadow-2xl">
                <div className="flex items-center gap-6">
                    <button onClick={onBack} className="p-4 hover:bg-white/5 rounded-full transition-colors">
                        <ChevronLeft size={32} className="rotate-180" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black italic tracking-tighter text-blue-400">הכרטיס לחופש <span className="text-white font-light">(Shalvata Ecosystem)</span></h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">Hospital Integrated Command & Control</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 hidden md:flex items-center gap-4">
                        <Users size={18} className="text-blue-400" />
                        <span className="text-xs font-black italic">51 בעלי תפקידים פעילים</span>
                    </div>
                    <button className="relative p-4 bg-white/5 rounded-2xl border border-white/10">
                        <Bell size={24} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                    </button>
                    <button className="p-4 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                        <Search size={24} />
                    </button>
                </div>
            </header>

            <main className="flex-1 mt-40 p-8 md:p-16 max-w-7xl mx-auto w-full space-y-16 pb-40">
                <div className="space-y-4">
                    <h2 className="text-5xl font-black italic tracking-tight">מיקום <br /><span className="text-blue-500 underline decoration-white/20 underline-offset-8">מבצעי נוכחי.</span></h2>
                    <p className="text-slate-500 font-bold text-xl max-w-2xl">
                        כל מטלות הבית, האבטחה והניהול בסנכרון מלא. בחרו את עמדת השליטה שלכם.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {STAFF_ROLES.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => onSelect(role.id)}
                            className="group bg-slate-900/50 border border-white/5 p-10 rounded-[3.5rem] flex flex-col items-center text-center gap-6 hover:bg-slate-800 hover:border-white/20 transition-all hover:-translate-y-2 relative overflow-hidden active:scale-95"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl -translate-y-12 translate-x-12 group-hover:bg-blue-500/10" />

                            <div className={`w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center ${role.color} border border-white/10 shadow-xl group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500`}>
                                <role.icon size={48} />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-black italic tracking-tight leading-none">{role.title}</h3>
                                <p className="text-slate-500 font-bold text-sm h-10 px-4 leading-snug">{role.desc}</p>
                            </div>

                            <div className="w-full flex justify-between items-center pt-6 mt-auto border-t border-white/5">
                                <div className="flex items-center gap-2">
                                    <Zap size={14} className="text-blue-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{role.count} חברים</span>
                                </div>
                                <span className="text-blue-400 font-black text-xs group-hover:translate-x-[-8px] transition-transform">כניסה <ChevronLeft size={14} className="inline rotate-180" /></span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Bottom Global Status */}
                <div className="bg-gradient-to-r from-blue-900/20 to-transparent p-12 rounded-[4rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 group">
                    <div className="space-y-4 text-right">
                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                            <Activity size={12} /> System Status: Optimal
                        </div>
                        <h3 className="text-3xl font-black leading-tight italic">ניהול רציף מקצה לקצה <br /> <span className="text-blue-400">החזון הדמוקרטי של הריבונות.</span></h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center space-y-1">
                            <p className="text-[10px] font-black text-slate-500 uppercase">נכסים מוגנים</p>
                            <p className="text-2xl font-black italic">140</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center space-y-1">
                            <p className="text-[10px] font-black text-slate-500 uppercase">ריבונות מחלקתית</p>
                            <p className="text-2xl font-black italic">98%</p>
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-full shadow-2xl z-[100]">
                <div className="flex items-center gap-3 px-6 py-3 border-r border-white/10">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                        <Info size={18} />
                    </div>
                    <div className="hidden lg:block">
                        <p className="text-[9px] font-black text-slate-500 uppercase leading-none">Command Center</p>
                        <p className="text-xs font-black italic leading-none mt-1">Status Active</p>
                    </div>
                </div>
                <button className="p-4 hover:bg-white/5 rounded-full text-slate-400 transition-colors"><Settings size={28} /></button>
            </div>

            <style>{`
         .font-assistant { font-family: 'Assistant', sans-serif; }
      `}</style>
        </div>
    );
};

export default StaffEcosystem;
