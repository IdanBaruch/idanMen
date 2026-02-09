import React, { useState, useEffect } from 'react';
import {
    ClipboardList, Package, RefreshCw, Layers, CheckCircle,
    TrendingUp, Coins, Clock, AlertCircle, PlayCircle
} from 'lucide-react';

interface Mission {
    id: string;
    type: string;
    status: 'pending' | 'collected' | 'spinning' | 'folding' | 'complete';
    timer?: number;
}

const OpsRoom: React.FC<{ onAddPoints: (pts: number) => void }> = ({ onAddPoints }) => {
    const [activeTab, setActiveTab] = useState<'logistics' | 'clinical'>('logistics');
    const [mission, setMission] = useState<Mission>({
        id: 'm-01',
        type: 'נוהל כביסה - מחלקה ב\'',
        status: 'pending'
    });
    const [clinicalMission, setClinicalMission] = useState<Mission>({
        id: 'c-01',
        type: 'הכנה לייעוץ: פסיכולוגיה',
        status: 'pending'
    });
    const [virtuCoins, setVirtuCoins] = useState(240);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        let interval: any;
        if (mission.status === 'spinning' && mission.timer && mission.timer > 0) {
            interval = setInterval(() => {
                setMission(prev => ({ ...prev, timer: (prev.timer || 0) - 1 }));
            }, 1000);
        } else if (mission.status === 'spinning' && mission.timer === 0) {
            setMission(prev => ({ ...prev, status: 'folding' }));
            setShowNotification(true);
        }
        return () => clearInterval(interval);
    }, [mission.status, mission.timer]);

    const handleNextStep = () => {
        if (mission.status === 'pending') setMission(prev => ({ ...prev, status: 'collected' }));
        else if (mission.status === 'collected') setMission(prev => ({ ...prev, status: 'spinning', timer: 30 }));
        else if (mission.status === 'folding') {
            setMission(prev => ({ ...prev, status: 'complete' }));
            setVirtuCoins(prev => prev + 50);
            onAddPoints(25); // Global rewards
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'collected': return <Package className="text-amber-400" />;
            case 'spinning': return <RefreshCw className="text-blue-400 animate-spin" />;
            case 'folding': return <Layers className="text-purple-400" />;
            case 'complete': return <CheckCircle className="text-emerald-400" />;
            default: return <Clock className="text-slate-500" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'collected': return 'השק נאסף';
            case 'spinning': return 'במכונה (פעיל)';
            case 'folding': return 'בקיפול וסדר';
            case 'complete': return 'המשימה הושלמה';
            default: return 'בהמתנה';
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 text-white font-assistant overflow-hidden relative" dir="rtl">
            {/* Background HUD Grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            {/* Header Stats */}
            <div className="p-8 flex justify-between items-center bg-slate-900/50 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600/20 border border-emerald-500/50 rounded-2xl flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                        <Coins size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Virtu-Coins</p>
                        <p className="text-2xl font-black italic text-white leading-none">{virtuCoins.toLocaleString()}</p>
                    </div>
                </div>

                {/* Logistics Mirror Badge */}
                <div className="hidden md:flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Namer ERP: Synced</span>
                </div>

                <div className="text-left">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Operations Rank</p>
                    <p className="text-sm font-black text-blue-400 italic">Senior Specialist</p>
                </div>
            </div>

            <main className="flex-1 p-8 space-y-10 relative z-10 overflow-y-auto">
                <div className="space-y-2">
                    <h2 className="text-3xl font-black italic text-white tracking-tight">לוח המשימות</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Operations & Logistics Control</p>
                </div>

                {/* Tab Switcher */}
                <div className="flex gap-2 bg-white/5 p-2 rounded-2xl w-fit mx-auto mb-10">
                    <button
                        onClick={() => setActiveTab('logistics')}
                        className={`px-6 py-2 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all ${activeTab === 'logistics' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        Logistics
                    </button>
                    <button
                        onClick={() => setActiveTab('clinical')}
                        className={`px-6 py-2 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all ${activeTab === 'clinical' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        Clinical Flow
                    </button>
                </div>

                {activeTab === 'logistics' ? (
                    <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-2 h-full bg-emerald-600/50" />

                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <span className="bg-emerald-600/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-widest">משימה עכשיו</span>
                                <h3 className="text-2xl font-black mt-2 tracking-tight">{mission.type}</h3>
                            </div>
                            <div className="p-4 bg-slate-800 rounded-3xl group-hover:scale-110 transition-transform duration-500">
                                {getStatusIcon(mission.status)}
                            </div>
                        </div>

                        {/* Timeline / Progress */}
                        <div className="relative">
                            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 rounded-full" />
                            <div className="relative flex justify-between">
                                {['pending', 'collected', 'spinning', 'folding', 'complete'].map((s, idx) => (
                                    <div key={s} className="relative flex flex-col items-center">
                                        <div className={`w-4 h-4 rounded-full border-2 z-10 transition-all duration-500 ${idx <= ['pending', 'collected', 'spinning', 'folding', 'complete'].indexOf(mission.status)
                                            ? 'bg-emerald-500 border-white scale-125 shadow-[0_0_15px_rgba(16,185,129,0.8)]'
                                            : 'bg-slate-900 border-slate-700'
                                            }`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-slate-400 font-bold text-xs pt-4">
                            <span>סטטוס: {getStatusText(mission.status)}</span>
                            {mission.status === 'spinning' && (
                                <div className="flex items-center gap-2 text-blue-400">
                                    <Clock size={14} />
                                    <span className="font-black">00:{mission.timer?.toString().padStart(2, '0')}</span>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleNextStep}
                            disabled={mission.status === 'spinning' || mission.status === 'complete'}
                            className="w-full bg-emerald-600 text-white py-8 rounded-[2rem] font-black text-xl shadow-[0_10px_0_rgb(5,150,105)] active:translate-y-2 active:shadow-none transition-all disabled:opacity-30 flex items-center justify-center gap-4"
                        >
                            {mission.status === 'complete' ? 'משימה הושלמה!' : 'סיימתי שלב'}
                            <PlayCircle size={24} />
                        </button>
                    </div>
                ) : (
                    <div className="bg-indigo-900/30 border border-indigo-500/20 rounded-[3rem] p-10 space-y-8 animate-in zoom-in-95 duration-500">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-black px-3 py-1 rounded-full border border-indigo-500/30 uppercase tracking-widest">משימה רפואית</span>
                                <h3 className="text-2xl font-black mt-2 tracking-tight">{clinicalMission.type}</h3>
                                <p className="text-indigo-300/60 text-xs italic">סנכרון ממערכת קמיליון: הזמנה לייעוץ מפורמלת</p>
                            </div>
                            <div className="p-4 bg-indigo-500/10 rounded-3xl">
                                <ClipboardList className="text-indigo-400" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-black">1</div>
                                <p className="text-sm font-bold">כתוב 3 שאלות שחשוב לך לשאול את המומחה</p>
                            </div>
                            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5 opacity-50">
                                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-black">2</div>
                                <p className="text-sm font-bold italic text-slate-400 leading-none">תדרוך לפני המפגש (בוצע במיון)</p>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setClinicalMission(prev => ({ ...prev, status: 'complete' }));
                                onAddPoints(100);
                            }}
                            disabled={clinicalMission.status === 'complete'}
                            className="w-full bg-indigo-600 text-white py-8 rounded-[2rem] font-black text-xl shadow-[0_10px_0_rgb(67,56,202)] active:translate-y-2 active:shadow-none transition-all disabled:opacity-30 flex items-center justify-center gap-4"
                        >
                            {clinicalMission.status === 'complete' ? 'הכנה הושלמה!' : 'התכוננות לפגישה'}
                            <CheckCircle size={24} />
                        </button>
                    </div>
                )}

                {/* Contribution Graph (Mock) */}
                <div className="bg-slate-900/50 border border-white/5 rounded-[3rem] p-10 space-y-6">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Contribution Impact</p>
                            <h4 className="text-xl font-black italic">העזרה שלי למחלקה</h4>
                        </div>
                        <div className="text-emerald-400 font-black text-2xl">+14%</div>
                    </div>

                    <div className="h-24 flex items-end gap-2">
                        {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-blue-600/20 rounded-t-lg relative group overflow-hidden"
                            >
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-blue-600 transition-all duration-1000 group-hover:bg-cyan-400"
                                    style={{ height: `${h}%` }}
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 text-center uppercase tracking-widest">7 Day Operational Cycle</p>
                </div>
            </main>

            {/* Encouraging Notification Overlay */}
            {showNotification && (
                <div className="fixed inset-x-8 top-12 z-[200] bg-emerald-500 p-8 rounded-[2.5rem] shadow-[0_0_50px_rgba(16,185,129,0.5)] border-4 border-white animate-in slide-in-from-top duration-700">
                    <div className="flex gap-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-lg shrink-0">
                            <RefreshCw size={32} />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-white text-2xl font-black leading-tight italic">יהונתן, המכונה מוכנה!</h4>
                            <p className="text-white/90 font-bold leading-relaxed">הציוד של מחלקה ב' מוכן למסדר הניצחון. צא לקיפול ריבוני!</p>
                            <button
                                onClick={() => setShowNotification(false)}
                                className="bg-white text-emerald-600 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest mt-2"
                            >
                                אוקיי, אני בא
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Bottom Virtu-Wallet */}
            <div className="p-8 pb-32">
                <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="text-blue-400" size={18} />
                        <p className="text-[10px] font-bold text-slate-400 italic">המשימה הבאה: סידור ארון מחלקתי (עוד שעתיים)</p>
                    </div>
                    <TrendingUp size={20} className="text-emerald-500" />
                </div>
            </div>
        </div>
    );
};

export default OpsRoom;
