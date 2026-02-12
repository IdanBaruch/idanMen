
import React, { useState, useEffect } from 'react';
import { Scan, ShieldCheck, Siren, X, CheckCircle, ChevronLeft } from 'lucide-react';

interface RealityCheckProps {
    onBack: () => void;
}

const RealityCheck: React.FC<RealityCheckProps> = ({ onBack }) => {
    const [step, setStep] = useState<'IDLE' | 'SCANNING' | 'DETECTED' | 'CLEARED'>('IDLE');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (step === 'SCANNING') {
            const interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        clearInterval(interval);
                        setStep('DETECTED');
                        return 100;
                    }
                    return p + 2;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [step]);

    return (
        <div className="fixed inset-0 bg-black text-white font-assistant overflow-hidden flex flex-col items-center justify-center animate-in fade-in duration-500 z-[9999]">

            {/* Top Bar (HUD) */}
            <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                    <Scan className="text-blue-400 animate-pulse" />
                    <span className="text-xs font-mono tracking-[0.2em] text-blue-400">מערכת מציאות 2.0 // סריקה פעילה</span>
                </div>
                <button onClick={onBack} className="bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
                    <X size={20} />
                </button>
            </div>

            {/* Main Vision Area */}
            <div className="relative w-full h-full flex flex-col items-center justify-center">

                {/* Background 'Camera' Feed Simulation */}
                <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
                    {/* Grid Overlay */}
                    <div className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Simulated Dark Room Content (Using CSS shapes/shadows for abstract forms) */}
                    <div className="absolute bottom-0 left-10 w-64 h-96 bg-black/40 blur-3xl transform -skew-x-12" />
                    <div className="absolute top-20 right-20 w-40 h-40 bg-blue-900/10 blur-3xl rounded-full" />
                </div>

                {/* Central UI Logic */}
                {step === 'IDLE' && (
                    <div className="z-10 text-center space-y-8 animate-in zoom-in duration-500">
                        <div className="relative group cursor-pointer" onClick={() => setStep('SCANNING')}>
                            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
                            <button className="relative w-32 h-32 rounded-full border-2 border-blue-400 flex items-center justify-center bg-black/50 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-all duration-300">
                                <Scan size={48} className="text-blue-400" />
                            </button>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black tracking-tighter">בדיקת מציאות</h2>
                            <p className="text-blue-300/60 text-sm font-mono">לחץ לסריקת החדר (LiDAR)</p>
                        </div>
                    </div>
                )}

                {/* Scanning UI */}
                {step === 'SCANNING' && (
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        {/* The Scanner Bar */}
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_#3b82f6] animate-[scan_2s_linear_infinite]"
                            style={{ top: `${progress}%` }}
                        />

                        <div className="absolute bottom-20 left-0 right-0 text-center">
                            <div className="inline-flex flex-col items-center gap-2">
                                <span className="text-4xl font-black font-mono text-blue-500">{progress}%</span>
                                <span className="text-xs uppercase tracking-widest text-blue-300/50">מחשב גאומטריה...</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Detection Phase (Artificial 'Threat' - Just for demo suspense) */}
                {step === 'DETECTED' && (
                    <div className="z-20 w-full max-w-md px-6 text-center space-y-6">
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-ping duration-1000" />
                            <Siren size={64} className="relative text-amber-500 animate-bounce" />
                        </div>
                        <h2 className="text-3xl font-black text-amber-500 tracking-tighter">זיהוי אובייקט...</h2>

                        {/* Simulation of analyzing the 'monster' */}
                        <div className="bg-black/80 border border-amber-900/50 p-4 rounded-xl backdrop-blur-sm text-left font-mono text-xs text-amber-300/80 space-y-1">
                            <div className="flex justify-between"><span>מטרה:</span> <span>ישות_01</span></div>
                            <div className="flex justify-between"><span>ביטחון:</span> <span>מחשב...</span></div>
                            <div className="w-full bg-amber-900/30 h-1 mt-2 rounded-full overflow-hidden">
                                <div className="bg-amber-500 h-full w-2/3 animate-[pulse_1s_infinite]" />
                            </div>
                        </div>

                        <button
                            onClick={() => setStep('CLEARED')}
                            className="mt-8 bg-amber-600 hover:bg-amber-500 text-black font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
                        >
                            אמת זיהוי
                        </button>
                    </div>
                )}

                {/* Success/Clear Phase */}
                {step === 'CLEARED' && (
                    <div className="z-20 w-full h-full flex flex-col items-center justify-center bg-emerald-900/10 backdrop-blur-[2px] animate-in fade-in duration-700">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-30 animate-pulse" />
                            <CheckCircle size={80} className="relative text-emerald-400" />
                        </div>

                        <h1 className="text-5xl font-black text-white mb-2 tracking-tighter drop-shadow-lg">בטוח.</h1>
                        <p className="text-xl text-emerald-300 font-medium tracking-wide mb-8">אין איום מזוהה.</p>

                        <div className="bg-black/60 border border-emerald-500/30 p-6 rounded-2xl max-w-sm w-full backdrop-blur-md">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                    <ShieldCheck size={20} className="text-emerald-400" />
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-white">סריקת חדר הושלמה</div>
                                    <div className="text-xs text-emerald-400/70">12:42 PM | חדר 102</div>
                                </div>
                            </div>
                            <div className="h-px w-full bg-white/10 my-2" />
                            <p className="text-xs text-slate-400 leading-relaxed text-right">
                                זוהה: כיסא (85%), וילון (92%). לא נמצאו דמויות אדם.
                            </p>
                        </div>

                        <button onClick={onBack} className="mt-12 text-slate-400 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors">
                            <ChevronLeft size={16} />חזרה למסך הראשי
                        </button>
                    </div>
                )}

            </div>

            <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default RealityCheck;
