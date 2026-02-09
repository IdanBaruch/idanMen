import React from 'react';
import { CloudRain, Sun, Wind, Activity, Moon, Zap, Shield, ChevronLeft, Info, ArrowRight } from 'lucide-react';

const MentalWeatherForecast: React.FC = () => {
    const insights = [
        {
            trigger: "חוסר שינה (<6 שעות)",
            impact: "עלייה ב'רעש' בערב",
            confidence: 88,
            recommendation: "ביטול משמרת כביסה בצהריים + שעת מנוחה בחדר",
            actionColor: "text-amber-400",
            bg: "bg-amber-500/10"
        },
        {
            trigger: "דופק גבוה (BPM > 95) במנוחה",
            impact: "צלילות פנימית ירודה",
            confidence: 72,
            recommendation: "תרגול נשימה ביו-ריאקטור (5 דקות)",
            actionColor: "text-cyan-400",
            bg: "bg-cyan-500/10"
        }
    ];

    return (
        <div className="space-y-8 font-assistant" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-xl">
                        <CloudRain size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white">איך אני מרגיש היום?</h2>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Mental Outlook v2.0</p>
                    </div>
                </div>
                <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 group cursor-help transition-all hover:bg-white/10">
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">AI Precision</span>
                        <span className="text-emerald-400 font-black text-xs">94%</span>
                    </div>
                </div>
            </div>

            {/* Live Indicators */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 text-center space-y-2">
                    <Sun size={20} className="mx-auto text-amber-500" />
                    <span className="block text-[10px] font-black text-slate-500 uppercase">מציאות</span>
                    <span className="block text-lg font-black text-white italic">בהיר</span>
                </div>
                <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 text-center space-y-2">
                    <Wind size={20} className="mx-auto text-blue-400 animate-pulse" />
                    <span className="block text-[10px] font-black text-slate-500 uppercase">רעש</span>
                    <span className="block text-lg font-black text-white italic">רוחות ערות</span>
                </div>
                <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 text-center space-y-2">
                    <Activity size={20} className="mx-auto text-rose-500" />
                    <span className="block text-[10px] font-black text-slate-500 uppercase">מתח</span>
                    <span className="block text-lg font-black text-white italic">גבוה</span>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 italic px-2">מה משפיע עלי?</h3>

                {insights.map((item, i) => (
                    <div key={i} className={`p-8 rounded-[3rem] border border-white/10 space-y-6 relative overflow-hidden ${item.bg}`}>
                        <div className="flex justify-between items-start relative z-10">
                            <div className="space-y-4 flex-1">
                                <div className="flex items-center gap-4">
                                    <div className="bg-white/5 p-3 rounded-2xl flex flex-col items-center">
                                        <Moon size={18} className="text-slate-400" />
                                        <span className="text-[8px] font-bold text-slate-500 mt-1">DATA</span>
                                    </div>
                                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                    <ArrowRight size={16} className="text-slate-600" />
                                    <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent text-left" />
                                    <div className="bg-white/5 p-3 rounded-2xl flex flex-col items-center">
                                        <Shield size={18} className="text-indigo-400" />
                                        <span className="text-[8px] font-bold text-slate-500 mt-1">IMPACT</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-baseline">
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-slate-500 tracking-widest">בגלל ש...</p>
                                        <p className="text-lg font-black text-white">{item.trigger}</p>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[9px] font-black text-slate-500 tracking-widest uppercase">אז מרגישים...</p>
                                        <p className="text-lg font-black text-white">{item.impact}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recommendation Call to Action */}
                        <div className="bg-black/40 p-6 rounded-[2rem] border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                    <Zap size={18} className={item.actionColor} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">מה כדאי לעשות?</p>
                                    <p className={`text-sm font-black italic ${item.actionColor}`}>{item.recommendation}</p>
                                </div>
                            </div>
                            <button className="bg-white/5 p-4 rounded-full border border-white/10 hover:bg-white/15 transition-all">
                                <ChevronLeft size={20} className="text-white" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Insight */}
            <div className="p-8 bg-indigo-600/5 rounded-[4rem] border border-indigo-500/10 flex items-start gap-4">
                <Info size={24} className="text-indigo-400 flex-shrink-0 mt-1" />
                <p className="text-indigo-100 text-xs italic leading-relaxed font-medium">
                    "יהונתן, המערכת לא שופטת אותך. היא מנתחת את מזג האוויר כדי לספק לך את הציוד המתאים. זיהינו שהשקט שלך קשור ישירות לאיכות השינה – בוא ננסה לשפר את זה הלילה."
                </p>
            </div>
        </div>
    );
};

export default MentalWeatherForecast;
