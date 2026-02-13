
import React, { useState, useEffect } from 'react';
import { Pill, Battery, Zap, ShieldCheck, Sword, Trophy, ChevronLeft, Hexagon } from 'lucide-react';
import '../../styles/bio-reactor-v2.css';

interface Medication {
    id: string;
    name: string;
    dosage: string;
    time: string;
    type: 'AM' | 'PM' | 'SOS' | 'בוקר' | 'ערב' | 'דחוף';
    color: string;
    energyPoints: number;
}

const DAILY_MEDS: Medication[] = [
    { id: 'm1', name: 'לפונקס (Leponex)', dosage: '100 מ"ג', time: '08:00', type: 'בוקר', color: 'bg-yellow-400', energyPoints: 15 },
    { id: 'm2', name: 'סרוקוול (Seroquel)', dosage: '300 מ"ג', time: '20:00', type: 'ערב', color: 'bg-purple-500', energyPoints: 20 },
    { id: 'm3', name: 'קלונקס (Clonex)', dosage: '0.5 מ"ג', time: 'דחוף', type: 'דחוף', color: 'bg-rose-500', energyPoints: 10 },
];

const BioReactor: React.FC<{ onBack?: () => void, onComplete?: (points: number) => void }> = ({ onBack, onComplete }) => {
    const [energyLevel, setEnergyLevel] = useState(45); // Starting low to show impact
    const [activeMeds, setActiveMeds] = useState<Medication[]>(DAILY_MEDS);
    const [consumedMeds, setConsumedMeds] = useState<string[]>([]);
    const [showShockwave, setShowShockwave] = useState<string | null>(null);

    const handleConsume = (med: Medication) => {
        // 1. Trigger Animation
        setShowShockwave(med.id);

        // 2. Update Logic
        setTimeout(() => {
            setConsumedMeds(prev => [...prev, med.id]);
            setEnergyLevel(prev => Math.min(prev + med.energyPoints, 100));

            // 3. Haptic Feedback (Simulated)
            if (navigator.vibrate) navigator.vibrate(200);

            // 4. Check Completion
            if (consumedMeds.length + 1 === activeMeds.length && onComplete) {
                setTimeout(() => onComplete(50), 1000);
            }
        }, 600);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-assistant relative overflow-hidden flex flex-col items-center">

            {/* Background Cyber Grid */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            {/* Header HUD */}
            <div className="w-full p-6 flex justify-between items-center z-10">
                <button onClick={onBack} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                    <ChevronLeft size={24} />
                </button>
                <div className="text-center">
                    <h2 className="text-2xl font-black italic tracking-tighter text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">בקרת ביו-ריאקטור</h2>
                    <p className="text-[10px] font-black uppercase text-cyan-700 tracking-[0.2em]">תחנת מילוי מחדש</p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center">
                    <Hexagon size={24} className="text-cyan-500 animate-spin-slow" />
                </div>
            </div>

            {/* Core Reactor (Avatar Energy) */}
            <div className="relative mt-8 mb-12">
                {/* Outer Ring */}
                <div className="w-64 h-64 rounded-full border-4 border-slate-700 flex items-center justify-center relative bg-slate-800/50 shadow-2xl">
                    {/* Energy Liquid */}
                    <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-600 to-blue-500 rounded-b-full transition-all duration-1000 ease-out opacity-80"
                        style={{ height: `${energyLevel}%` }}
                    />

                    {/* Percentage Text */}
                    <div className="z-10 text-center">
                        <div className="text-6xl font-black italic tracking-tighter drop-shadow-lg">{energyLevel}%</div>
                        <div className="text-xs font-bold uppercase text-cyan-300 tracking-widest mt-1">חוזק המעטפת</div>
                    </div>

                    {/* Lightning Effects */}
                    <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-pulse-neon pointer-events-none" />
                </div>
            </div>

            {/* Medication Dock */}
            <div className="w-full max-w-md px-8 z-10 space-y-6">
                <h3 className="text-center text-sm font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center justify-center gap-2">
                    <Pill size={16} /> תרופות זמינות סנכרון מלא
                </h3>

                <div className="space-y-4">
                    {activeMeds.map(med => {
                        const isConsumed = consumedMeds.includes(med.id);
                        return (
                            <div
                                key={med.id}
                                className={`relative group bg-slate-800/80 p-4 rounded-2xl border transition-all duration-500 flex items-center justify-between
                                   ${isConsumed ? 'border-emerald-500/50 opacity-50 contrast-50' : 'border-slate-600 hover:border-cyan-400 hover:bg-slate-700 cursor-pointer'}
                        `}
                                onClick={() => !isConsumed && handleConsume(med)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform ${isConsumed ? 'bg-emerald-900 text-emerald-400' : `${med.color} text-slate-900 group-hover:scale-110`}`}>
                                        {isConsumed ? <ShieldCheck size={24} /> : <Zap size={24} />}
                                    </div>
                                    <div>
                                        <div className={`font-black italic text-lg ${isConsumed ? 'text-emerald-500 line-through' : 'text-white'}`}>{med.name}</div>
                                        <div className="text-xs font-bold text-slate-400">{med.dosage} • מסלול {med.type}</div>
                                    </div>
                                </div>

                                {/* Drag Handle / Button */}
                                {!isConsumed && (
                                    <div className="w-8 h-8 rounded-full border-2 border-slate-600 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-400/20 transition-all">
                                        <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform" />
                                    </div>
                                )}

                                {/* Shockwave Effect */}
                                {showShockwave === med.id && (
                                    <div className="absolute inset-0 border-2 border-cyan-400 rounded-2xl animate-shockwave pointer-events-none" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Gamification Footer */}
            <div className="mt-auto w-full p-6 bg-slate-900/90 border-t border-slate-800 backdrop-blur text-center z-20">
                <div className="flex justify-center items-center gap-2 text-cyan-400 font-bold uppercase text-xs tracking-widest animate-pulse">
                    <Trophy size={14} />
                    <span>רצף: 14 ימים של ניצחון</span>
                </div>
            </div>

        </div>
    );
};

export default BioReactor;
