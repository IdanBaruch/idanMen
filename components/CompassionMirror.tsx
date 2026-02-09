import React, { useState, useEffect } from 'react';
import { Heart, Hand, Sparkles, X, Volume2, MoveRight } from 'lucide-react';

const CompassionMirror: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
    const [step, setStep] = useState<'intro' | 'mirror' | 'action' | 'peace'>('intro');
    const [audioActive, setAudioActive] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setStep('mirror'), 4000);
        return () => clearTimeout(timer);
    }, []);

    const playCompassionAudio = () => {
        setAudioActive(true);
        // Simulation of audio playing
        setTimeout(() => setAudioActive(false), 5000);
    };

    return (
        <div className="fixed inset-0 z-[99999] bg-[#eef2ff] text-[#1e3a8a] flex flex-col items-center justify-center font-assistant overflow-hidden transition-all duration-1000">

            {/* Soft Background - Dreamy Clouds */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-blue-50 opacity-80" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/clouds.png')] opacity-30 animate-pulse-slow" />

            {/* Close Button */}
            <button onClick={onBack} className="absolute top-8 left-8 p-4 text-blue-300 hover:text-blue-600 transition-colors z-50">
                <X />
            </button>

            {/* STEP 1: INTRO */}
            {step === 'intro' && (
                <div className="z-10 text-center animate-in zoom-in duration-1000 space-y-6">
                    <Heart size={80} className="mx-auto text-rose-400 animate-bounce-slow" fill="currentColor" />
                    <h1 className="text-6xl font-black tracking-tighter text-[#1e40af]">תעצור רגע.</h1>
                    <p className="text-2xl text-blue-400 font-bold tracking-widest">יש כאן מישהו שצריך אותך.</p>
                </div>
            )}

            {/* STEP 2: THE MIRROR (INNER CHILD) */}
            {(step === 'mirror' || step === 'action') && (
                <div className="z-10 flex flex-col items-center gap-8 animate-in fade-in duration-1000 max-w-lg w-full px-8">
                    <div className="relative group cursor-pointer" onClick={playCompassionAudio}>
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-rose-200 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="w-64 h-64 rounded-full border-8 border-white shadow-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000">
                            {/* Placeholder for Mental Image Visualization */}
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=InnerChild&backgroundColor=b6e3f4"
                                alt="Inner Child"
                                className="w-full h-full object-cover"
                            />
                            {audioActive && (
                                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                    <Volume2 className="text-white w-12 h-12 animate-ping" />
                                </div>
                            )}
                        </div>
                        <div className="absolute bottom-0 right-0 bg-white p-3 rounded-full shadow-lg text-rose-500">
                            <Volume2 size={24} />
                        </div>
                    </div>

                    <div className="text-center space-y-4">
                        <h2 className="text-5xl font-black text-[#1e3a8a] leading-tight">
                            זה <span className="text-rose-500">הילד</span> שבתוכך.
                        </h2>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed">
                            הוא לא עשה שום דבר רע. <br />
                            הוא רק צריך חיבוק. הוא מפחד.
                        </p>
                    </div>

                    {step === 'mirror' && (
                        <button
                            onClick={() => setStep('action')}
                            className="mt-8 bg-blue-600 text-white px-10 py-4 rounded-full font-black text-xl shadow-xl hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-3"
                        >
                            אני רוצה לשמור עליו <MoveRight />
                        </button>
                    )}

                    {/* ACTION: HIGH FIVE */}
                    {step === 'action' && (
                        <div className="mt-8 relative w-full h-32 flex items-center justify-center">
                            <p className="absolute -top-8 text-sm font-bold text-slate-400 uppercase tracking-widest animate-pulse">תן לו "כיף" (גע בכף היד)</p>
                            <button
                                onClick={() => setStep('peace')}
                                className="group bg-white p-6 rounded-full shadow-2xl border-4 border-blue-50 active:scale-90 transition-transform duration-200"
                            >
                                <Hand size={48} className="text-blue-400 group-hover:text-blue-600 transition-colors rotate-12" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* STEP 3: PEACE / RESOLUTION */}
            {step === 'peace' && (
                <div className="z-10 text-center space-y-8 animate-in zoom-in duration-700">
                    <div className="w-32 h-32 bg-rose-100 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(251,113,133,0.3)]">
                        <Sparkles size={64} className="text-rose-500" />
                    </div>
                    <h2 className="text-5xl font-black text-[#1e3a8a]">בחרת בחמלה.</h2>
                    <p className="text-xl text-slate-500 max-w-lg mx-auto leading-relaxed">
                        במקום להכאיב, ריפאת.<br />
                        אתה המבוגר האחראי עכשיו. והוא בטוח איתך.
                    </p>
                    <button
                        onClick={onBack}
                        className="bg-white text-blue-900 border border-blue-100 px-12 py-4 rounded-full font-black text-xl hover:shadow-lg transition-all"
                    >
                        חזור בשלום
                    </button>
                </div>
            )}

        </div>
    );
};

export default CompassionMirror;
