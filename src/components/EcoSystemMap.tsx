import React from 'react';
import { User, Users, ShieldCheck, Heart, Zap, Pill, Activity, Settings, Layout, Key, Eye, Briefcase } from 'lucide-react';

const EcoSystemMap: React.FC<{ onSelect: (role: any) => void }> = ({ onSelect }) => {
    const PILLARS = [
        {
            id: 'patient',
            title: 'האפליקציה שלי',
            desc: 'כלים לניהול עצמי, ריבונות וקרקוע במציאות.',
            device: 'Mobile (מובייל)',
            color: 'from-blue-600 to-indigo-900',
            icon: User,
            items: [
                { name: 'סדר היום שלי', permission: 'מקיף' },
                { name: 'התרופות שלי', permission: 'פרטי' },
                { name: 'ההצלחות שלי', permission: 'מעצים' },
                { name: 'נגיעה מהמשפחה', permission: 'רגשי' }
            ]
        },
        {
            id: 'staff',
            title: 'פורטל המטפל והצוות',
            desc: 'כאן המטפל מעדכן את ספר הניצחונות ומנהל את הטיפול.',
            device: 'Desktop/Tablet (מחשב)',
            color: 'from-slate-800 to-slate-900',
            icon: Briefcase,
            items: [
                { name: 'ניהול הטיפול', permission: 'קליני' },
                { name: 'ספר הניצחונות', permission: 'תיעודי' },
                { name: 'מדדי יציבות', permission: 'מעקב' },
                { name: 'דוח הנהלה (ROI)', permission: 'ניהולי' }
            ]
        },
        {
            id: 'family',
            title: 'המשפחה שלי',
            desc: 'חיבור רגשי, אספקת ציוד ותמיכה מרחוק.',
            device: 'Tablet/Mobile',
            color: 'from-rose-600 to-rose-900',
            icon: Heart,
            items: [
                { name: 'הזמנת ציוד', permission: 'לוגיסטי' },
                { name: 'איך אני מרגיש', permission: 'קליני' },
                { name: 'לשלוח נגיעה', permission: 'רגשי' }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#f1f5f9] p-8 md:p-16 font-assistant" dir="rtl">
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 text-blue-600 font-black tracking-widest uppercase text-xs bg-white px-4 py-2 rounded-full border border-blue-100 shadow-sm">
                        <Key size={14} /> מפת הרשאות וגישה
                    </div>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic">האקו-סיסטם הדיגיטלי</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium italic">
                        כדי למנוע עומס, חילקנו את המערכת לשלושה עמודי תווך עם הרשאות נפרדות. מי רואה מה?
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {PILLARS.map((pillar) => (
                        <div key={pillar.id} className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-full">
                            <div className={`bg-gradient-to-br ${pillar.color} p-10 text-white space-y-4`}>
                                <div className="flex justify-between items-start">
                                    <pillar.icon size={48} className="opacity-40" />
                                    <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                                        {pillar.device}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black italic tracking-tight leading-none">{pillar.title}</h3>
                                <p className="text-xs text-white/70 font-bold leading-relaxed">{pillar.desc}</p>
                            </div>

                            <div className="p-8 flex-1 space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">מודולים וגישה:</h4>
                                <div className="space-y-3">
                                    {pillar.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                            <span className="font-bold text-slate-700">{item.name}</span>
                                            <span className="text-[9px] font-black uppercase text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">{item.permission}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => onSelect(pillar.id)}
                                    className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-transform hover:scale-105 active:scale-95 bg-gradient-to-r ${pillar.color}`}
                                >
                                    כניסה
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend / Cross-System Flows */}
                <div className="bg-[#1e293b] p-10 rounded-[3rem] text-white space-y-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8">
                        <Zap size={60} className="text-blue-500/20 group-hover:scale-125 transition-transform" />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                        <div className="space-y-2">
                            <h4 className="text-xl font-black italic">זרימת נתונים חוצת-מערכות</h4>
                            <p className="text-slate-400 text-sm italic font-medium">המערכת מחברת בין הצרכים הפיזיים של המטופל ליכולות התפעוליות של הצוות.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center space-y-1">
                                <Eye size={20} className="text-blue-400 mx-auto" />
                                <p className="text-[9px] font-black uppercase tracking-widest">בקרה</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center space-y-1">
                                <Settings size={20} className="text-emerald-400 mx-auto" />
                                <p className="text-[9px] font-black uppercase tracking-widest">תפעול</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center space-y-1">
                                <Layout size={20} className="text-rose-400 mx-auto" />
                                <p className="text-[9px] font-black uppercase tracking-widest">ממשק</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EcoSystemMap;
