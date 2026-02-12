import React, { useState, useEffect, useRef } from 'react';
import { Wind, Anchor, CheckCircle2, Volume2, X, AlertOctagon, ShieldCheck } from 'lucide-react';

const DeEscalation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [step, setStep] = useState<'stop' | 'breathe' | 'ground' | 'safe'>('stop');
    const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out'>('in');
    const [groundingCount, setGroundingCount] = useState(0);

    // Simulated Audio Context (placeholder for binaural beats)
    const [audioActive, setAudioActive] = useState(false);

    useEffect(() => {
        // Start with "STOP" phase
        const timer = setTimeout(() => setStep('breathe'), 3000); // 3 seconds of "FREEZE"
        return () => clearTimeout(timer);
    }, []);

    // Breathing Cycle Animation
    useEffect(() => {
        if (step === 'breathe') {
            const cycle = () => {
                setBreathPhase('in');
                setTimeout(() => {
                    setBreathPhase('hold');
                    setTimeout(() => {
                        setBreathPhase('out');
                    }, 7000); // Hold for 7s
                }, 4000); // Inhale for 4s
            };

            cycle();
            const interval = setInterval(cycle, 19000); // Total 19s cycle (4+7+8)
            return () => clearInterval(interval);
        }
    }, [step]);

    const handleGroundingClick = () => {
        if (groundingCount < 4) {
            setGroundingCount(prev => prev + 1);
        } else {
            setStep('safe');
        }
    };

    return (
        <div className="fixed inset-0 z-[99999] bg-[#020617] text-blue-50 flex flex-col items-center justify-center font-assistant overflow-hidden transition-all duration-1000">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617] animate-pulse-slow" />

            {/* STEP 1: STOP / FREEZE */}
            {step === 'stop' && (
                <div className="z-10 text-center animate-in zoom-in duration-1000">
                    <AlertOctagon size={120} className="mx-auto text-red-500 mb-8 animate-pulse" />
                    <h1 className="text-8xl font-black tracking-tighter text-white">עצור.</h1>
                    <p className="text-2xl mt-4 text-slate-400 font-bold tracking-widest uppercase">
                        שתיקה כרפואה. <br /> <span className="text-sm text-slate-500 mt-2 block">אל תדבר. רק תקשיב.</span>
                    </p>
                </div>
            )}

            {/* STEP 2: BREATHE (4-7-8) */}
            {step === 'breathe' && (
                <div className="z-10 flex flex-col items-center gap-12 animate-in fade-in duration-1000">
                    <div className="relative">
                        {/* Breathing Circle */}
                        <div
                            className={`w-64 h-64 rounded-full border-4 border-blue-500/30 flex items-center justify-center transition-all duration-[4000ms] ${breathPhase === 'in' ? 'scale-150 bg-blue-900/20' : breathPhase === 'out' ? 'scale-100 bg-transparent' : 'scale-150 bg-blue-900/30'}`}
                        >
                            <Wind size={64} className={`text-blue-400 transition-all duration-1000 ${breathPhase === 'hold' ? 'opacity-100' : 'opacity-50'}`} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-black uppercase tracking-widest">
                                {breathPhase === 'in' ? 'פנימה...' : breathPhase === 'hold' ? 'להחזיק...' : 'החוצה...'}
                            </span>
                        </div>
                    </div>

                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold text-blue-200">אנחנו נושמים יחד.</h2>
                        <button
                            onClick={() => setStep('ground')}
                            className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 rounded-full text-sm font-bold tracking-widest border border-white/10 transition-colors"
                        >
                            אני רגוע יותר. המשך.
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 3: GROUNDING */}
            {step === 'ground' && (
                <div className="z-10 max-w-md text-center space-y-8 animate-in slide-in-from-bottom-10 duration-700">
                    <Anchor size={64} className="mx-auto text-emerald-400" />
                    <h2 className="text-4xl font-black">חזור לקרקע.</h2>
                    <p className="text-xl text-slate-300">
                        {groundingCount === 0 && "תמצא 5 דברים כחולים בחדר ותלחץ על המסך."}
                        {groundingCount === 1 && "עכשיו 4 דברים שאתה יכול לגעת בהם."}
                        {groundingCount === 2 && "3 קולות שאתה שומע כרגע."}
                        {groundingCount === 3 && "2 דברים שאתה יכול להריח."}
                        {groundingCount === 4 && "דבר אחד שאתה אוהב בעצמך."}
                    </p>

                    <button
                        onClick={handleGroundingClick}
                        className="w-full py-16 bg-blue-900/20 border-2 border-dashed border-blue-500/30 rounded-3xl hover:bg-blue-900/40 hover:border-blue-400 transition-all group"
                    >
                        <span className="text-2xl font-black group-hover:scale-110 block transition-transform">מצאתי.</span>
                    </button>

                    <div className="flex justify-center gap-2">
                        {[0, 1, 2, 3, 4].map(i => (
                            <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i < groundingCount ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 4: SAFE */}
            {step === 'safe' && (
                <div className="z-10 text-center space-y-8 animate-in zoom-in duration-700">
                    <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                        <CheckCircle2 size={64} className="text-white" />
                    </div>
                    <h2 className="text-5xl font-black">אתה מוגן.</h2>
                    <p className="text-xl text-slate-400 max-w-lg mx-auto">
                        הגל עבר. אתה כאן. אתה בשליטה.
                    </p>
                    <button
                        onClick={onComplete}
                        className="bg-white text-slate-900 px-12 py-4 rounded-full font-black text-xl hover:scale-105 transition-all shadow-xl"
                    >
                        חזור למרחב
                    </button>
                </div>
            )}

            {/* Audio Toggle (Simulated) */}
            <button
                onClick={() => setAudioActive(!audioActive)}
                className={`absolute top-8 right-8 p-4 rounded-full transition-all ${audioActive ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-500'}`}
            >
                {audioActive ? <Volume2 /> : <Volume2 className="opacity-50" />}
            </button>

            {/* Panic Exit */}
            <button onClick={onComplete} className="absolute top-8 left-8 p-4 text-slate-600 hover:text-white transition-colors">
                <X />
            </button>

        </div>
    );
};

export default DeEscalation;
