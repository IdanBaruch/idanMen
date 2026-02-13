import React, { useState, useEffect, useCallback } from 'react';
import { Heart, ChevronLeft, ShieldCheck, Zap, Waves, HandMetal } from 'lucide-react';
import '../../styles/haptic-bridge.css';

const HapticBridge: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
    const [intensity, setIntensity] = useState(0); // 0 to 100
    const [parentCalm, setParentCalm] = useState(false);
    const [pulseRate, setPulseRate] = useState(1.5); // seconds per pulse
    const [isPressing, setIsPressing] = useState(false);
    const [remotePulse, setRemotePulse] = useState(false);

    // Simulate receiving a pulse from family every 15 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setRemotePulse(true);
            setTimeout(() => setRemotePulse(false), 2000);
        }, 15000);
        return () => clearInterval(interval);
    }, []);


    // Dynamic colors based on intensity and parent feedback
    const getColors = () => {
        if (parentCalm) return { c1: '#10b981', c2: '#064e3b', glow: 'rgba(16, 185, 129, 0.5)' }; // Emerald/Calm
        if (intensity > 70) return { c1: '#f43f5e', c2: '#4c0519', glow: 'rgba(244, 63, 94, 0.5)' }; // Rose/Urgent
        if (intensity > 40) return { c1: '#f59e0b', c2: '#451a03', glow: 'rgba(245, 158, 11, 0.5)' }; // Amber/Anxious
        return { c1: '#6366f1', c2: '#1e1b4b', glow: 'rgba(99, 102, 241, 0.5)' }; // Indigo/Baseline
    };

    const colors = getColors();

    const handleTouchStart = () => {
        setIsPressing(true);
        setParentCalm(false);
    };

    const handleTouchEnd = () => {
        setIsPressing(false);
        // Simulate parent responding after 3 seconds of high intensity
        if (intensity > 50) {
            setTimeout(() => {
                setParentCalm(true);
                setIntensity(20);
                setPulseRate(2.5);
            }, 3000);
        }
    };

    useEffect(() => {
        let interval: any;
        if (isPressing) {
            interval = setInterval(() => {
                setIntensity(prev => Math.min(100, prev + 5));
                setPulseRate(prev => Math.max(0.4, prev - 0.05));
            }, 100);
        } else {
            interval = setInterval(() => {
                if (!parentCalm) setIntensity(prev => Math.max(0, prev - 2));
            }, 200);
        }
        return () => clearInterval(interval);
    }, [isPressing, parentCalm]);

    return (
        <div
            className="haptic-bridge-container flex flex-col items-center justify-between p-8 font-assistant"
            style={{
                '--bridge-color-1': colors.c1,
                '--bridge-color-2': colors.c2,
                '--bridge-glow-color': colors.glow,
                '--pulse-duration': `${pulseRate}s`
            } as any}
        >
            <div className="fluid-bg" />

            {/* Header HUD */}
            <div className="w-full flex justify-between items-center relative z-20">
                <button onClick={onBack} className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10 hover:bg-white/20 transition-all">
                    <ChevronLeft size={24} />
                </button>
                <div className="text-center">
                    <h2 className="text-2xl font-black italic tracking-tighter text-white">גשר התחושות</h2>
                    <p className="text-[10px] font-black uppercase text-white/60 tracking-widest italic">Haptic Empathy Bridge v1.0</p>
                </div>
                <div className="w-12 h-12" /> {/* Spacer */}
            </div>

            {/* Central Heart HUD */}
            <div
                className="relative z-20 flex flex-col items-center space-y-12 select-none touch-none"
                onMouseDown={handleTouchStart}
                onMouseUp={handleTouchEnd}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div className={`relative group transition-transform duration-500 ${isPressing ? 'scale-90' : 'scale-100'}`}>
                    {/* Pulsing Aura */}
                    <div className="absolute inset-0 bg-white blur-[100px] opacity-20 heartbeat-pulse" />

                    {/* The Core Heart */}
                    <div className={`w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-700 dignity-pulse-glow ${parentCalm ? 'bg-emerald-500/20 border-emerald-400' : 'bg-white/5 border-white/20'
                        }`}>
                        <div className="heartbeat-pulse">
                            <Heart
                                size={80}
                                fill={parentCalm ? '#10b981' : (intensity > 70 ? '#f43f5e' : 'white')}
                                className={`transition-colors duration-700 ${intensity > 70 ? 'animate-bounce' : ''}`}
                            />
                        </div>
                    </div>

                    {/* Interaction Label */}
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-max text-center">
                        <p className="text-xs font-black text-white/50 uppercase tracking-[0.3em] mb-1">
                            {isPressing ? 'משדר לחץ...' : (parentCalm ? 'אמא איתך בנשימה' : 'לחץ בכל הכוח כדי לשדר')}
                        </p>
                        <div className="flex gap-1 justify-center">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className={`w-1 h-3 rounded-full transition-all duration-300 ${intensity > i * 20 ? 'bg-white scale-y-150' : 'bg-white/20'
                                    }`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Status / Parent Indicator */}
            <div className="w-full space-y-6 relative z-20">
                {parentCalm && <div className="calm-wave" />}

                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 shadow-2xl flex items-center justify-between group">
                    <div className="flex items-center gap-6 text-right">
                        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 ${parentCalm ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]' : 'bg-white/5 text-slate-400'
                            }`}>
                            {parentCalm ? <Waves size={32} className="animate-pulse" /> : <HandMetal size={32} />}
                        </div>
                        <div>
                            <h3 className="text-xl font-black italic text-white leading-none">
                                {remotePulse ? 'אמא שלחה נגיעה!' : (parentCalm ? 'אמא משיבה רוגע' : 'אמא מחוברת')}
                            </h3>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">
                                {remotePulse ? 'Remote Heartbeat Detected' : (parentCalm ? 'Receiving Calming Wave' : 'Sync Active: Dual-Haptic')}
                            </p>
                        </div>
                    </div>
                    {remotePulse ? (
                        <div className="bg-amber-500 rounded-full p-2 animate-ping">
                            <Heart size={16} fill="white" />
                        </div>
                    ) : parentCalm ? (
                        <div className="bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/30">
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest animate-pulse">Connected</span>
                        </div>
                    ) : (
                        <Zap size={24} className="text-white/20" />
                    )}
                </div>

                <div className="text-center px-8">
                    <p className="text-[10px] text-white/30 font-bold leading-relaxed italic uppercase tracking-widest">
                        "הקשר הזה הוא עובדה פיזית. אתם חולקים את אותו הדופק כרגע. תנשום לתוך הרטט."
                    </p>
                </div>
            </div>

            {/* Overlay for Parent Response Discovery */}
            {intensity > 80 && !parentCalm && (
                <div className="absolute inset-0 bg-rose-600/10 pointer-events-none animate-pulse z-10" />
            )}
        </div>
    );
};

export default HapticBridge;
