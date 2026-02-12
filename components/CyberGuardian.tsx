import React, { useState, useEffect } from 'react';
import { ShieldAlert, Fingerprint, Eye, Lock, Unlock, Loader2, ShieldCheck } from 'lucide-react';
import { verifyBiometrics } from '../utils/securityUtils';

interface CyberGuardianProps {
    onUnlock: () => void;
    label: string;
}

const CyberGuardian: React.FC<CyberGuardianProps> = ({ onUnlock, label }) => {
    const [status, setStatus] = useState<'locked' | 'scanning' | 'granted' | 'denied'>('locked');
    const [progress, setProgress] = useState(0);

    const handleStartScan = async () => {
        setStatus('scanning');
        setProgress(0);

        // Simulating scan progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 40);

        const success = await verifyBiometrics();
        if (success) {
            setStatus('granted');
            setTimeout(() => onUnlock(), 1000);
        } else {
            setStatus('denied');
            setTimeout(() => setStatus('locked'), 3000);
        }
    };

    return (
        <div className="fixed inset-0 z-[1000] bg-[#020408] flex flex-col items-center justify-center p-8 text-white font-assistant" dir="rtl">
            {/* HUD Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="relative z-10 w-full max-w-md space-y-12 text-center">
                <div className="space-y-4">
                    <div className="w-20 h-20 bg-indigo-600/10 border border-indigo-500/30 rounded-3xl flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(79,70,229,0.2)]">
                        {status === 'granted' ? <ShieldCheck className="text-emerald-400" size={40} /> : <Lock className="text-indigo-400" size={40} />}
                    </div>
                    <h2 className="text-3xl font-black italic tracking-tighter">אימות ריבוני נדרש</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">{label}</p>
                </div>

                {/* Scanner UI */}
                <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                    {/* Ring */}
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                        <circle
                            cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="4" fill="transparent"
                            className={`transition-all duration-300 ${status === 'scanning' ? 'text-indigo-500' : status === 'granted' ? 'text-emerald-500' : 'text-transparent'}`}
                            strokeDasharray={754}
                            strokeDashoffset={754 - (754 * progress) / 100}
                        />
                    </svg>

                    <button
                        onClick={handleStartScan}
                        disabled={status !== 'locked'}
                        className={`relative w-48 h-48 rounded-full border-2 transition-all duration-500 flex items-center justify-center group overflow-hidden ${status === 'scanning' ? 'border-indigo-500 shadow-[0_0_50px_rgba(79,70,229,0.4)]' :
                            status === 'granted' ? 'border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.4)]' :
                                'border-white/10 hover:border-white/40'
                            }`}
                    >
                        {status === 'scanning' ? (
                            <div className="relative">
                                <Fingerprint size={80} className="text-white animate-pulse" />
                                <div className="absolute top-0 left-0 right-0 h-1 bg-white/40 animate-scan-line shadow-[0_0_15px_white]" />
                            </div>
                        ) : status === 'granted' ? (
                            <Unlock size={80} className="text-emerald-400 scale-110" />
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <Fingerprint size={80} className="text-slate-600 group-hover:text-white transition-colors" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white">לחץ לסריקה</span>
                            </div>
                        )}
                    </button>
                </div>

                {status === 'scanning' && (
                    <div className="space-y-4 animate-in fade-in duration-500">
                        <p className="text-indigo-400 font-black italic">מבצע אימות רשת ויומטריקה...</p>
                        <div className="flex justify-center gap-2">
                            {[0, 1, 2].map(i => (
                                <div key={i} className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="pt-8 border-t border-white/5">
                    <div className="flex items-center justify-center gap-6 opacity-30">
                        <div className="flex items-center gap-2">
                            <ShieldAlert size={14} />
                            <span className="text-[9px] font-black uppercase">אבטחה פעילה</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye size={14} />
                            <span className="text-[9px] font-black uppercase">פרטיות מלאה</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scan-line {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                .animate-scan-line {
                    animation: scan-line 2s infinite linear;
                    position: absolute;
                    width: 100%;
                }
            `}</style>
        </div>
    );
};

export default CyberGuardian;
