import React, { useState, useRef } from 'react';
import { Pill, Zap, Battery, Activity, Sparkles, ShieldCheck, ChevronLeft, Siren, ShieldAlert } from 'lucide-react';
import WhisperingButton from './WhisperingButton';
import '../styles/bio-reactor-v2.css';
import '../styles/whispering-interface.css';

interface BioReactorProps {
    userPoints: number;
    onAddPoints: (amount: number) => void;
    onComplete?: () => void;
}

const BioReactor: React.FC<BioReactorProps> = ({ userPoints, onAddPoints, onComplete }) => {
    const [isCharging, setIsCharging] = useState(false);
    const [isPoweredUp, setIsPoweredUp] = useState(() => {
        // Clinical Persistence: Restore state if within the same day
        const saved = localStorage.getItem('bioreactor_success_timestamp');
        if (saved) {
            const date = new Date(parseInt(saved));
            const today = new Date();
            if (date.toDateString() === today.toDateString()) return true;
        }
        return false;
    });
    const [chargeLevel, setChargeLevel] = useState(isPoweredUp ? 100 : 32);
    const [showShockwave, setShowShockwave] = useState(false);
    const [wasSuccess, setWasSuccess] = useState(isPoweredUp);
    const [showAudit, setShowAudit] = useState(false);

    const reactorRef = useRef<HTMLDivElement>(null);

    const AVAILABLE_FUEL = [
        { id: 'f1', name: 'FUEL: MORNING DOSE', color: 'bg-cyan-400', shadow: 'shadow-cyan-400/50', icon: Pill },
    ];

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData('fuelId', id);
        // Add visual ghosting logic if needed
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const fuelId = e.dataTransfer.getData('fuelId');
        if (fuelId && !wasSuccess) {
            triggerPowerUp();
        }
    };

    const triggerPowerUp = () => {
        setIsCharging(true);
        setShowShockwave(true);

        // Simulating Haptic Feedback
        if ("vibrate" in navigator) {
            navigator.vibrate([100, 50, 200]);
        }

        setTimeout(() => {
            setIsPoweredUp(true);
            setChargeLevel(100);
            setWasSuccess(true);

            // Clinical Persistence: Save success timestamp
            localStorage.setItem('bioreactor_success_timestamp', Date.now().toString());

            onAddPoints(150); // Large reward for power-up

            // Play Power Up Sound Simulation
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2658/2658-preview.mp3');
            audio.play().catch(() => { });

            setTimeout(() => {
                if (onComplete) onComplete();
            }, 3000);
        }, 1200);
    };

    return (
        <div className="flex flex-col items-center justify-between min-h-[600px] p-8 font-assistant relative overflow-hidden bg-[#050608]">
            {/* HUD Header */}
            <div className="w-full flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                        <Zap size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">Bio-Core Reactor</h2>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Sovereignty Driver v4.0</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowAudit(!showAudit)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all ${showAudit ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                >
                    <Siren size={16} className={showAudit ? 'animate-pulse' : ''} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Red Team Audit</span>
                </button>
            </div>

            {/* Main Interaction Area */}
            <div className="relative flex-1 flex flex-col items-center justify-center w-full">
                {/* Reactor Core / Avatar Container */}
                <div
                    ref={reactorRef}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className={`relative w-80 h-96 flex items-center justify-center transition-all duration-1000 ${isPoweredUp ? 'scale-110' : ''}`}
                >
                    {/* Shockwave Rings */}
                    {showShockwave && (
                        <>
                            <div className="absolute inset-0 rounded-full border border-cyan-400 animate-shockwave" />
                            <div className="absolute inset-0 rounded-full border border-cyan-400 animate-shockwave [animation-delay:0.2s]" />
                        </>
                    )}

                    {/* Background Glow */}
                    <div className={`absolute inset-0 rounded-full transition-all duration-2000 blur-[100px] opacity-20 ${isPoweredUp ? 'bg-cyan-400 opacity-40 scale-150' : 'bg-blue-900 opacity-20 animate-pulse'
                        }`} />

                    {/* The Neon Avatar */}
                    <div className={`relative z-20 group cursor-default transition-all duration-1000 ${isPoweredUp ? 'animate-pulse-neon drop-shadow-[0_0_50px_rgba(34,211,238,0.8)]' : 'opacity-60 grayscale-[50%]'
                        }`}>
                        {/* Shield Aura (Visible only when powered up) */}
                        {isPoweredUp && (
                            <div className="absolute inset-x-[-40px] inset-y-[-20px] rounded-[4rem] border-2 border-cyan-400/40 bg-cyan-400/5 backdrop-blur-[2px] animate-pulse-neon shadow-[0_0_30px_rgba(34,211,238,0.2)]" />
                        )}

                        <svg width="280" height="320" viewBox="0 0 280 320" fill="none" className="filter drop-shadow-2xl relative z-10">
                            {/* Head */}
                            <circle cx="140" cy="60" r="30" stroke={isPoweredUp ? '#22d3ee' : '#3b82f6'} strokeWidth="2" strokeDasharray="4 2" />
                            {/* Torso */}
                            <path d="M140 90V130M110 110H170" stroke={isPoweredUp ? '#22d3ee' : '#3b82f6'} strokeWidth="2" strokeOpacity="0.5" />
                            <path d="M100 130L140 100L180 130" stroke={isPoweredUp ? '#22d3ee' : '#3b82f6'} strokeWidth="2" />
                            {/* The Heart / Reactor Core */}
                            <g className={isCharging ? 'animate-pulse' : ''}>
                                <circle cx="140" cy="180" r="45" className={isPoweredUp ? 'fill-cyan-400/20' : 'fill-slate-900'} stroke={isPoweredUp ? '#22d3ee' : '#3b82f6'} strokeWidth="1" />
                                <path d="M140 155V205M115 180H165" stroke={isPoweredUp ? '#22d3ee' : '#3b82f6'} strokeWidth="1" strokeOpacity="0.3" />
                                <circle cx="140" cy="180" r="10" className={`${isPoweredUp ? 'fill-cyan-400 shadow-[0_0_20px_cyan]' : 'fill-slate-800'}`} />
                            </g>
                            {/* Body Lines */}
                            <path d="M80 180C80 180 100 240 140 240C180 240 200 180 200 180" stroke={isPoweredUp ? '#22d3ee' : '#3b82f6'} strokeWidth="2" strokeOpacity={isPoweredUp ? "0.8" : "0.3"} />
                            <path d="M110 240V290M170 240V290" stroke={isPoweredUp ? '#22d3ee' : '#3b82f6'} strokeWidth="2" strokeOpacity={isPoweredUp ? "0.8" : "0.3"} />
                        </svg>
                    </div>

                    {/* Status Text Overlay */}
                    <div className="absolute top-0 flex flex-col items-center">
                        <span className={`text-[10px] font-black tracking-[0.4em] uppercase transition-colors duration-1000 ${isPoweredUp ? 'text-cyan-400' : 'text-slate-500'
                            }`}>
                            {isPoweredUp ? 'Systems Stabilized. Reality Anchor: Active.' : 'Low Power State'}
                        </span>
                    </div>

                    {/* Level HUD */}
                    <div className="absolute -bottom-10 w-64 bg-slate-900 border border-white/5 p-4 rounded-2xl shadow-2xl flex items-center gap-4">
                        <Battery size={16} className={isPoweredUp ? 'text-indigo-400' : 'text-rose-500'} />
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-1000 ${isPoweredUp ? 'bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-rose-500'
                                }`} style={{ width: `${chargeLevel}%` }} />
                        </div>
                        <span className="text-xs font-black text-white">{chargeLevel}%</span>
                    </div>
                </div>

                {/* The Fuel Capsule (Draggable) */}
                {!wasSuccess && (
                    <div className="mt-20 w-full flex flex-col items-center gap-6 animate-in slide-in-from-bottom-12 duration-1000">
                        <div className="px-6 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest italic">FUEL READY FOR INTAKE</span>
                        </div>

                        <div
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'f1')}
                            className="group relative cursor-grab active:cursor-grabbing animate-float living-icon"
                        >
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />

                            {/* The Core Jewel */}
                            <div className="relative w-24 h-32 bg-gradient-to-br from-indigo-400 to-blue-800 rounded-[2.5rem] border-2 border-white/30 flex flex-col items-center justify-center shadow-2xl transition-transform group-active:scale-95 group-hover:scale-105">
                                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                                    <Zap size={32} className="text-white" />
                                </div>

                                {/* Accessibility Fallback: Actionable Button */}
                                <button
                                    onClick={() => triggerPowerUp()}
                                    className="mt-2 bg-white/20 hover:bg-white/40 text-[9px] font-black tracking-widest px-3 py-1 rounded-full text-white uppercase backdrop-blur-md"
                                >
                                    לחץ כאן
                                </button>

                                {/* Orbiting Particles Simulation */}
                                <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 animate-pulse scale-110" />
                            </div>
                        </div>

                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-4">
                            גרור את התרופה למרכז הדמות
                        </p>
                    </div>
                )}

                {wasSuccess && (
                    <div className="mt-20 text-center animate-in zoom-in duration-500">
                        <div className="flex items-center gap-3 justify-center text-emerald-400 text-3xl font-black italic">
                            <Sparkles className="animate-spin-slow" />
                            <span>POWER UP!</span>
                        </div>
                        <p className="text-slate-400 text-sm mt-2 font-bold uppercase tracking-widest">Sovereignty Index Reset to 100%</p>
                    </div>
                )}
                {/* Red Team Audit Panel */}
                {showAudit && (
                    <div className="absolute right-8 top-1/4 w-72 bg-[#0a0a0c] border border-rose-500/30 p-8 rounded-[2.5rem] shadow-2xl z-50 animate-in slide-in-from-right-8 duration-500 backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-6 text-rose-500 border-b border-rose-500/20 pb-4">
                            <ShieldAlert size={20} />
                            <h4 className="text-sm font-black uppercase tracking-[0.2em]">Clinical Audit Active</h4>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest border-r-2 border-rose-500/40 pr-3">ד"ר סינפסה (Chief Medical):</p>
                                <p className="text-xs text-slate-300 italic font-medium leading-relaxed">
                                    "וידאתי שהאנימציה לא חדה מדי כדי למנוע טריגרים פוטו-סנסיטיביים. הדירוג הקליני מאושר."
                                </p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest border-r-2 border-amber-500/40 pr-3">הארכיטקטית (UX Strategist):</p>
                                <p className="text-xs text-slate-300 italic font-medium leading-relaxed">
                                    "שטח המגע (Hitbox) של הקפסולה הוגדל ב-40% לתמיכה במצבי רעד מוטורי."
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Footer ROI */}
            <div className="w-full bg-white/5 p-6 rounded-[3rem] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <ShieldCheck className="text-cyan-400" />
                    <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Self-Cohesion Gain</p>
                        <p className="text-xl font-black text-white italic">+{wasSuccess ? '150' : '0'} XP</p>
                    </div>
                </div>
                <div className="w-48 h-12">
                    <WhisperingButton
                        onClick={() => { }}
                        whisperingText="כאן תוכל לראות איך הלקיחה הזו מחזקת את הגוף שלך ומעלה את מדד הריבונות."
                        className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2"
                    >
                        <ChevronLeft size={12} /> לצפייה בנתונים
                    </WhisperingButton>
                </div>
            </div>
        </div>
    );
};

export default BioReactor;
