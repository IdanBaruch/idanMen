
import React, { useState, useEffect } from 'react';
import { Rocket, Weight, Moon, ThermometerSun, Radio, ArrowUp, Zap, ChevronLeft } from 'lucide-react';

interface ZeroGSanctuaryProps {
    onBack: () => void;
}

const ZeroGSanctuary: React.FC<ZeroGSanctuaryProps> = ({ onBack }) => {
    const [gravity, setGravity] = useState(100); // 100% Earth gravity
    const [targetGravity, setTargetGravity] = useState(100);
    const [isLifting, setIsLifting] = useState(false);
    const [dopamineLevel, setDopamineLevel] = useState(10); // Baseline

    // Simulate gravitational shift
    useEffect(() => {
        if (gravity !== targetGravity) {
            const interval = setInterval(() => {
                setGravity(g => {
                    const diff = targetGravity - g;
                    if (Math.abs(diff) < 1) return targetGravity;
                    return g + (diff > 0 ? 1 : -1);
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [gravity, targetGravity]);

    // Simulate dopamine spike when gravity drops
    useEffect(() => {
        if (gravity < 80) {
            setDopamineLevel(10 + (100 - gravity) * 1.5); // Increase as gravity drops
        } else {
            setDopamineLevel(10);
        }
    }, [gravity]);

    const initiateLiftOff = () => {
        setIsLifting(true);
        setTargetGravity(20); // Moon gravity
    };

    const land = () => {
        setIsLifting(false);
        setTargetGravity(100);
    };

    return (
        <div className="fixed inset-0 bg-[#0f172a] text-white font-assistant overflow-hidden flex flex-col items-center justify-center animate-in fade-in duration-700 z-[9999]" dir="ltr">

            {/* Background Ambience - Starfield */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black opacity-90" />
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

                {/* Floating Particles (CSS Animation) */}
                <div className={`absolute w-32 h-32 bg-purple-500/10 rounded-full blur-3xl top-1/4 left-1/4 transition-all duration-[3000ms] ${isLifting ? '-translate-y-20 scale-150' : ''}`} />
                <div className={`absolute w-48 h-48 bg-blue-500/10 rounded-full blur-3xl bottom-1/4 right-1/4 transition-all duration-[3000ms] ${isLifting ? '-translate-y-32 scale-125' : ''}`} />
            </div>

            {/* Main Container */}
            <div className={`relative z-10 w-full max-w-lg transition-transform duration-[2000ms] ${isLifting ? 'translate-y-[-20px]' : ''}`}>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md mb-6">
                        <Rocket size={18} className={`text-indigo-400 ${isLifting ? 'animate-bounce' : ''}`} />
                        <span className="text-xs font-mono tracking-[0.2em] text-indigo-200">ZERO_G // SANCTUARY</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        {isLifting ? 'LIFT OFF.' : 'GROUNDED.'}
                    </h1>
                    <p className="text-slate-400 font-medium">Anti-Gravity Protocol v2.4</p>
                </div>

                {/* Central Dashboard */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                    {/* Dashboard Glow */}
                    <div className={`absolute inset-0 bg-indigo-500/5 transition-opacity duration-1000 ${isLifting ? 'opacity-100' : 'opacity-0'}`} />

                    <div className="grid grid-cols-2 gap-8 relative z-10">
                        {/* Gravity Gauge */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle cx="48" cy="48" r="44" stroke="#334155" strokeWidth="8" fill="transparent" />
                                    <circle
                                        cx="48" cy="48" r="44"
                                        stroke={isLifting ? '#818cf8' : '#cbd5e1'}
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={276}
                                        strokeDashoffset={276 - (276 * gravity) / 100}
                                        className="transition-all duration-100 ease-linear"
                                    />
                                </svg>
                                <div className="flex flex-col items-center">
                                    <span className="text-2xl font-black font-mono">{gravity}%</span>
                                    <span className="text-[10px] uppercase text-slate-400">G-Force</span>
                                </div>
                            </div>
                            <div className="text-xs text-center text-slate-400 font-mono">
                                Weight: {Math.round(75 * (gravity / 100))}kg / 75kg
                            </div>
                        </div>

                        {/* Neuro-Feedback Gauge */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative w-24 h-24 flex items-center justify-center bg-white/5 rounded-2xl border border-white/5">
                                <Zap size={32} className={`text-yellow-400 transition-all duration-1000 ${isLifting ? 'scale-125 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'opacity-50'}`} />
                                {isLifting && (
                                    <div className="absolute bottom-2 right-2 flex gap-0.5">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-1 h-4 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-xs text-center text-slate-400 font-mono">
                                Dopamine: +{Math.round(dopamineLevel)}%
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/10 my-8" />

                    {/* Environmental Controls */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-bold text-slate-300">
                            <span className="flex items-center gap-2"><Moon size={16} /> Environment</span>
                            <span className="text-indigo-300">{isLifting ? 'LUNAR_BASE_ALPHA' : 'EARTH_SURFACE'}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold text-slate-300">
                            <span className="flex items-center gap-2"><ThermometerSun size={16} /> Bio-Temp</span>
                            <span className="text-emerald-300">36.6°C (Optimal)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold text-slate-300">
                            <span className="flex items-center gap-2"><Radio size={16} /> Alter-G Sync</span>
                            <span className={isLifting ? 'text-blue-400 animate-pulse' : 'text-slate-500'}>{isLifting ? 'LINK ESTABLISHED' : 'STANDBY'}</span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 flex justify-center">
                    {!isLifting ? (
                        <button
                            onClick={initiateLiftOff}
                            className="group relative px-8 py-4 bg-white text-black font-black text-lg rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                        >
                            <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="flex items-center gap-3 relative z-10">
                                INITIATE LIFT OFF <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </button>
                    ) : (
                        <button
                            onClick={land}
                            className="px-8 py-4 bg-red-500/20 text-red-200 border border-red-500/50 font-bold rounded-full hover:bg-red-500/30 transition-all hover:scale-105"
                        >
                            TERMINATE SESSION
                        </button>
                    )}
                </div>

                <button onClick={onBack} className="mt-12 w-full text-center text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <ChevronLeft size={14} /> Return to Base
                </button>

            </div>
        </div>
    );
};

export default ZeroGSanctuary;
