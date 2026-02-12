import React, { useState } from 'react';
import {
    Clock,
    Wind,
    Moon,
    Sun,
    Zap,
    Coffee,
    Hammer,
    Waves,
    ChevronRight,
    ChevronLeft,
    Sparkles,
    Activity,
    Cloud
} from 'lucide-react';

interface TimelineIsland {
    id: string;
    time: string;
    activity: string;
    type: 'rest' | 'work' | 'creative' | 'bio' | 'food';
    status: 'completed' | 'current' | 'future';
    description: string;
}

const AdaptiveFlow: React.FC = () => {
    const [currentTime] = useState('11:45');

    const [islands] = useState<TimelineIsland[]>([
        { id: '1', time: '07:30', activity: 'Bio-Sync: Wake up', type: 'bio', status: 'completed', description: 'Morning grounding and medication intake.' },
        { id: '2', time: '09:00', activity: 'Breakfast', type: 'food', status: 'completed', description: 'High-protein start at the ward dining hall.' },
        { id: '3', time: '10:30', activity: 'Sovereign Workshop', type: 'creative', status: 'completed', description: 'Carpentry / Art workshop for tactile grounding.' },
        { id: '4', time: '11:45', activity: 'Adaptive Breathing', type: 'bio', status: 'current', description: 'Non-linear breathing island to balance current mania.' },
        { id: '5', time: '13:30', activity: 'Lunch', type: 'food', status: 'future', description: 'Nutritional sync.' },
        { id: '6', time: '15:00', activity: 'The Vault Analysis', type: 'work', status: 'future', description: 'Reviewing clinical sources and grounding insights.' },
        { id: '7', time: '20:00', activity: 'Sunset Reset', type: 'rest', status: 'future', description: 'Winding down the bio-engine.' }
    ]);

    return (
        <div className="min-h-screen bg-[#F0F4F8] font-assistant p-6 lg:p-12" dir="rtl">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-sky-200">
                        <Waves size={14} className="animate-pulse" /> Adaptive Flow v1.0
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter text-slate-900 leading-none">
                        זרימה <span className="text-sky-500">אדפטיבית.</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-bold italic">הזמן שלך הוא לא קו ישר, הוא מרחב של איים.</p>
                </div>

                {/* Main Island View */}
                <div className="relative">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-sky-200 -translate-x-1/2 rounded-full opacity-30" />

                    <div className="space-y-16">
                        {islands.map((island, i) => {
                            const isCurrent = island.status === 'current';
                            const isFuture = island.status === 'future';

                            return (
                                <div key={island.id} className={`relative flex items-center justify-between ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                                    {/* The Island Card */}
                                    <div className={`w-[45%] bg-white p-8 rounded-[3rem] shadow-xl border-2 transition-all hover:-translate-y-2 ${isCurrent ? 'border-sky-500 scale-105 z-10' : 'border-transparent opacity-80'
                                        }`}>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl font-black italic tracking-tighter text-sky-600">{island.time}</span>
                                            <div className={`p-3 rounded-2xl ${isCurrent ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                {island.type === 'bio' ? <Wind size={20} /> :
                                                    island.type === 'food' ? <Coffee size={20} /> :
                                                        island.type === 'creative' ? <Hammer size={20} /> :
                                                            island.type === 'work' ? <Activity size={20} /> : <Moon size={20} />}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black italic mb-2">{island.activity}</h3>
                                        <p className="text-sm font-bold text-slate-500 italic leading-snug">{island.description}</p>

                                        {isCurrent && (
                                            <div className="mt-6 p-4 bg-sky-50 rounded-2xl border border-sky-100 flex items-center gap-3 animate-pulse">
                                                <Sparkles size={18} className="text-sky-500" />
                                                <span className="text-xs font-black text-sky-700 uppercase tracking-widest">משימת ריבונות פעילה</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* The Connector Node */}
                                    <div className={`absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 bg-white transition-all ${isCurrent ? 'border-sky-500 w-12 h-12 shadow-2xl shadow-sky-500/50' :
                                            isFuture ? 'border-slate-300' : 'border-sky-200'
                                        }`} />

                                    {/* Empty Side Placeholder */}
                                    <div className="w-[45%]" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Breathing Exercise Modal/Section (If current is breathing) */}
                <div className="bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/40 to-indigo-900/40" />
                    <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                        <div className="w-24 h-24 bg-sky-500/20 rounded-full flex items-center justify-center animate-ping-slow">
                            <Wind size={48} className="text-sky-400" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-black italic mb-2 tracking-tighter">נשימה אדפטיבית</h2>
                            <p className="text-slate-400 font-bold italic">הורדת מתח (תדר מאניה מזוהה: וייפאקס-טריגר)</p>
                        </div>

                        <div className="flex items-center gap-12 py-8">
                            <div className="flex flex-col items-center">
                                <span className="text-5xl font-black italic tracking-tighter">4</span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-50">פנימה</span>
                            </div>
                            <div className="w-16 h-1 bg-white/10 rounded-full" />
                            <div className="flex flex-col items-center">
                                <span className="text-5xl font-black italic tracking-tighter text-sky-400">7</span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-50">החוצה</span>
                            </div>
                        </div>

                        <button className="bg-white text-slate-900 px-12 py-4 rounded-full font-black text-xl hover:scale-105 transition-all shadow-xl">
                            התחל תרגול
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdaptiveFlow;
