
import React, { useState, useEffect } from 'react';
import { Mic, ShieldCheck, ChevronLeft, Activity, Volume2 } from 'lucide-react';
import '../../styles/alchemist-orb.css';
import { analyzeThought } from '../../services/AlchemistAgent';

interface AlchemistOrbProps {
    onBack: () => void;
    initialThought?: string;
}

const AlchemistOrb: React.FC<AlchemistOrbProps> = ({ onBack, initialThought = '' }) => {
    const [status, setStatus] = useState<'IDLE' | 'LISTENING' | 'PROCESSING' | 'SPEAKING'>('IDLE');
    const [transcript, setTranscript] = useState(initialThought);
    const [response, setResponse] = useState('');
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        if (initialThought) {
            handleProcess(initialThought);
        }
    }, [initialThought]);

    const handleProcess = (input: string) => {
        setStatus('PROCESSING');

        // Simulate AI Latency
        setTimeout(() => {
            const result = analyzeThought(input);
            setResponse(result.response);
            setStatus('SPEAKING');
            setShowButton(true);

            // Simulate TTS
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(result.response);
                utterance.lang = 'he-IL';
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
            }
        }, 2000);
    };

    const handleMicClick = () => {
        if (status === 'IDLE') {
            setStatus('LISTENING');
            // Simulated Listen
            setTimeout(() => {
                const simulatedInput = "הם כולם מסתכלים עליי וצוחקים.";
                setTranscript(simulatedInput);
                handleProcess(simulatedInput);
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B1026] text-white font-assistant relative overflow-hidden flex flex-col items-center justify-between py-12">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

            {/* Top Bar */}
            <div className="w-full px-6 flex justify-between items-center z-10">
                <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20">
                    <Activity size={14} className="text-[#39FF14] animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#39FF14]">Alchemist Core Online</span>
                </div>
            </div>

            {/* Center Orb */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-lg px-8 text-center">

                <div className="orb-container mb-12">
                    <div className={`orb-core transition-all duration-1000 ${status === 'PROCESSING' ? 'scale-125 animate-pulse duration-100' : ''}`} />

                    {/* Status Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[#0B1026]">
                        {status === 'LISTENING' && <Mic size={40} className="animate-bounce" />}
                        {status === 'SPEAKING' && <Volume2 size={40} className="animate-pulse" />}
                    </div>
                </div>

                {/* Text Output */}
                <div className="min-h-[120px] space-y-4">
                    {status === 'IDLE' && (
                        <p className="text-slate-500 text-sm font-medium animate-pulse">לחץ על ה-Orb או דבר כדי להתחיל...</p>
                    )}

                    {status === 'LISTENING' && (
                        <p className="text-[#39FF14] text-lg font-bold italic animate-pulse">מקשיב...</p>
                    )}

                    {status === 'PROCESSING' && (
                        <p className="text-[#39FF14] text-sm font-black uppercase tracking-widest animate-pulse">מנתח תדרים...</p>
                    )}

                    {status === 'SPEAKING' && (
                        <div className="animate-in fade-in slide-in-from-bottom duration-700">
                            <p className="text-2xl font-medium leading-relaxed cyber-text text-white drop-shadow-md">
                                "{response}"
                            </p>
                        </div>
                    )}
                </div>

            </div>

            {/* Bottom Action */}
            <div className="w-full px-8 z-10">
                {showButton ? (
                    <button
                        onClick={onBack}
                        className="w-full bg-[#BF00FF] hover:bg-[#a000d6] text-white py-6 rounded-2xl font-black text-xl tracking-widest shadow-[0_0_30px_rgba(191,0,255,0.4)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"
                    >
                        <ShieldCheck size={24} />
                        אני מקורקע (GROUNDED)
                    </button>
                ) : (
                    <button
                        onClick={handleMicClick}
                        className={`w-full py-6 rounded-2xl font-black text-lg tracking-widest border transition-all
                  ${status === 'LISTENING' ? 'bg-[#39FF14] text-[#0B1026] border-[#39FF14]' : 'bg-transparent border-slate-700 text-slate-500 hover:border-[#39FF14] hover:text-[#39FF14]'}
               `}
                    >
                        {status === 'LISTENING' ? 'משדר...' : 'לחץ לדיבור (Whisper)'}
                    </button>
                )}
            </div>

        </div>
    );
};

export default AlchemistOrb;
