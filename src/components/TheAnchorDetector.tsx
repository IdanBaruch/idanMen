import React, { useState } from 'react';
import { Moon, Activity, ShieldAlert, Lock, Smartphone, Brain, HeartPulse, MoreHorizontal } from 'lucide-react';

const TheAnchorDetector: React.FC = () => {
    // Mock State: < 4 hours sleep detected
    const [sleepHours, setSleepHours] = useState<number>(3.5);
    const [isSimulating, setIsSimulating] = useState(false);

    const isRisk = sleepHours < 4;

    const simulateSleepChange = () => {
        setIsSimulating(true);
        setTimeout(() => {
            setSleepHours(prev => prev === 3.5 ? 7.2 : 3.5);
            setIsSimulating(false);
        }, 1000);
    };

    return (
        <div className="w-full max-w-md mx-auto bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 font-assistant relative overflow-hidden text-white" dir="rtl">

            {/* Header */}
            <div className="flex justify-between items-center mb-8 h-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-xl">
                        <Moon className="text-indigo-400" size={20} />
                    </div>
                    <div>
                        <h3 className="font-black text-lg leading-none">The Anchor</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Sleep & Risk Monitor</p>
                    </div>
                </div>
                <button onClick={simulateSleepChange} className="text-slate-600 hover:text-white transition-colors">
                    <MoreHorizontal />
                </button>
            </div>

            {/* Main Gauge */}
            <div className="relative py-8 flex justify-center">
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className={`w-48 h-48 rounded-full border-2 border-dashed animate-spin-slow ${isRisk ? 'border-red-500' : 'border-emerald-500'}`} />
                </div>

                <div className="text-center z-10 space-y-2">
                    <span className="text-6xl font-black tracking-tighter block">
                        {sleepHours}
                        <span className="text-2xl text-slate-500 font-medium">h</span>
                    </span>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${isRisk ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'}`}>
                        {isRisk ? (
                            <>
                                <ShieldAlert size={12} />
                                <span>סיכון גבוה (Alert)</span>
                            </>
                        ) : (
                            <>
                                <Activity size={12} />
                                <span>מצב יציב (Stable)</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Actions Panel (Conditional) */}
            <div className={`transition-all duration-500 overflow-hidden ${isRisk ? 'max-h-96 opacity-100' : 'max-h-0 opacity-50'}`}>
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="mt-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        </div>
                        <div>
                            <p className="font-bold text-sm text-red-200">זוהתה כוננות פסיכוטית</p>
                            <p className="text-[10px] text-red-300/60 leading-tight mt-1">עקב מחסור חמור בשינה, המערכת הפעילה הגנות אוטומטיות.</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="bg-black/20 p-3 rounded-xl flex items-center justify-between border border-white/5">
                            <div className="flex items-center gap-3">
                                <Lock size={16} className="text-amber-500" />
                                <span className="text-xs font-bold text-slate-300">Financial Shield</span>
                            </div>
                            <span className="text-[10px] font-black text-amber-500 uppercase">Locked</span>
                        </div>

                        <div className="bg-black/20 p-3 rounded-xl flex items-center justify-between border border-white/5">
                            <div className="flex items-center gap-3">
                                <Brain size={16} className="text-blue-400" />
                                <span className="text-xs font-bold text-slate-300">Emuna AI Tone</span>
                            </div>
                            <span className="text-[10px] font-black text-blue-400 uppercase">Grounding</span>
                        </div>

                        <div className="bg-black/20 p-3 rounded-xl flex items-center justify-between border border-white/5">
                            <div className="flex items-center gap-3">
                                <Smartphone size={16} className="text-emerald-400" />
                                <span className="text-xs font-bold text-slate-300">Care Team Alert</span>
                            </div>
                            <span className="text-[10px] font-black text-emerald-400 uppercase">Sent</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Good State Message */}
            {!isRisk && (
                <div className="text-center py-6 text-slate-500 text-xs font-medium animate-in fade-in">
                    השינה תקינה. כל המערכות פועלות כשורה.
                </div>
            )}
        </div>
    );
};

export default TheAnchorDetector;
