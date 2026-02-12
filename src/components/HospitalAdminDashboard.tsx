import React from 'react';
import { BarChart3, TrendingDown, Users, DollarSign, ChevronLeft, Target, ShieldCheck, Zap, TrendingUp, Quote } from 'lucide-react';

interface HospitalAdminDashboardProps {
    onBack: () => void;
}

const HospitalAdminDashboard: React.FC<HospitalAdminDashboardProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-assistant p-8 md:p-16 flex flex-col items-center" dir="rtl">
            <header className="w-full max-w-5xl flex justify-between items-center mb-16">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-4 hover:bg-black/5 rounded-full transition-colors">
                        <ChevronLeft size={32} />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black italic text-slate-800 tracking-tighter">דשבורד הנהלה (The ROI Layer)</h1>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mt-1">Management Decision Support: Ward A</p>
                    </div>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
                    <ShieldCheck className="text-blue-600" />
                    <span className="text-xs font-black italic">Verified by Chameleon OS</span>
                </div>
            </header>

            <main className="w-full max-w-5xl space-y-8">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'שיעור אשפוז חוזר', value: '14.2%', change: '-3.1%', icon: TrendingDown, color: 'text-emerald-500' },
                        { label: 'עומס מחלקתי', value: '88%', change: 'Optimal', icon: Users, color: 'text-blue-500' },
                        { label: 'חסכון במשאבים', value: '₪120K', change: 'Monthly', icon: DollarSign, color: 'text-amber-500' },
                        { label: 'שביעות רצון', value: '4.9/5', change: 'Record', icon: Target, color: 'text-indigo-500' }
                    ].map((kpi, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl bg-slate-50 ${kpi.color}`}>
                                    <kpi.icon size={24} />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${kpi.color}`}>{kpi.change}</span>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">{kpi.label}</p>
                            <p className="text-3xl font-black italic">{kpi.value}</p>
                        </div>
                    ))}
                </div>

                {/* Main Analytics Block */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-slate-200/50 space-y-8">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-6">
                            <h3 className="text-2xl font-black italic flex items-center gap-3">
                                <BarChart3 className="text-blue-600" />
                                יציבות מול שחרור
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400">Next 7 Days Forecast</p>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-black">
                                    <span>צפי שחרורים (AI Prediction)</span>
                                    <span className="text-blue-600">12 מטופלים</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[60%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-black">
                                    <span>חריגות קליניות (Alerts)</span>
                                    <span className="text-rose-500">2 אירועים</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-500 w-[15%]" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
                            <Zap className="text-blue-600 shrink-0" />
                            <p className="text-xs font-bold text-blue-800 leading-relaxed italic">
                                המערכת זיהתה פוטנציאל לקיצור משך אשפוז ממוצע ב-1.2 ימים עקב שיפור רמת הריבונות בקרב המטופלים.
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl space-y-8 relative overflow-hidden flex flex-col">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px]" />
                        <div className="flex items-center gap-3 border-b border-white/5 pb-6">
                            <TrendingUp className="text-blue-400" />
                            <h3 className="text-2xl font-black italic">אסטרטגיה וצמיחה (The Blue Team)</h3>
                        </div>

                        <div className="flex-1 space-y-6">
                            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 relative">
                                <Quote className="absolute top-4 right-4 text-white/5" size={32} />
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">The Shark (Market Potential):</p>
                                <p className="text-sm italic text-slate-300 leading-relaxed">
                                    "אנחנו לא בונים אפליקציית בריאות, אלא את ה-Waze של הנפש. פוטנציאל שוק של מיליונים."
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 relative">
                                <Quote className="absolute top-4 right-4 text-white/5" size={32} />
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">The Pragmatic (ROI Efficiency):</p>
                                <p className="text-sm italic text-slate-300 leading-relaxed">
                                    "חסכון של 2,500 ש"ח ליום אשפוז. ROI מלא תוך 4 חודשי עבודה בלבד."
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase text-slate-500">VC Readiness Score: 9.8/10</span>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-20 opacity-30 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest italic">Emuna 2 Executive Analytics v1.0 | Shield-X Security Enforced</p>
            </footer>
        </div>
    );
};

export default HospitalAdminDashboard;
