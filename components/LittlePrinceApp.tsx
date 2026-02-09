import React, { useState, useEffect } from 'react';
import { Calculator, Sparkles, Brain, CheckCircle2, RotateCcw, Quote, ArrowLeft } from 'lucide-react';

const LittlePrinceApp: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
    const [chaosLevel, setChaosLevel] = useState(100);
    const [problem, setProblem] = useState({ a: 0, b: 0, op: '+' });
    const [answer, setAnswer] = useState('');
    const [shake, setShake] = useState(false);
    const [showQuote, setShowQuote] = useState(false);

    useEffect(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        const ops = ['+', '-'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        setProblem({ a, b, op });
        setAnswer('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const correct = problem.op === '+' ? problem.a + problem.b : problem.a - problem.b;

        if (parseInt(answer) === correct) {
            // Success: Reduce chaos
            setChaosLevel(prev => Math.max(0, prev - 20));
            setShowQuote(true);
            setTimeout(() => setShowQuote(false), 2000);
            generateProblem();
        } else {
            // Failure: Add chaos/shake
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setChaosLevel(prev => Math.min(100, prev + 10));
        }
    };

    if (chaosLevel === 0) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8 font-assistant text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20" />
                <div className="relative z-10 animate-in zoom-in duration-700 space-y-8">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-emerald-500 blur-[80px] opacity-30 animate-pulse" />
                        <Sparkles size={120} className="text-emerald-400 mx-auto animate-pulse" />
                    </div>
                    <h1 className="text-6xl font-black tracking-tighter">הסדר שב.</h1>
                    <p className="text-2xl text-blue-200 italic font-medium max-w-xl mx-auto leading-relaxed">
                        "המתמטיקה היא לא רק מספרים. היא ההוכחה שבתוך כל הכאוס, ישנה אמת אחת יציבה שניתן להישען עליה."
                    </p>
                    <button onClick={onBack} className="bg-white text-slate-900 px-12 py-4 rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center gap-2 mx-auto">
                        <ArrowLeft size={20} /> חזרה למרחב
                    </button>
                </div>
            </div>
        );
    }

    // Calculate dynamic visuals based on chaos level
    const blurAmount = (chaosLevel / 100) * 8;
    const rotateAmount = (chaosLevel / 100) * 5;
    const darkAmount = (chaosLevel / 100) * 0.8;

    return (
        <div
            className={`min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-500 font-assistant ${shake ? 'animate-shake' : ''}`}
            style={{
                filter: `blur(${shake ? 2 : 0}px)`,
            }}
        >
            {/* Dynamic Background */}
            <div
                className="absolute inset-0 bg-repeat opacity-20 pointer-events-none transition-all duration-1000"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    transform: `scale(${1 + chaosLevel / 50}) rotate(${chaosLevel}deg)`,
                }}
            />

            {/* Quote Overlay */}
            {showQuote && (
                <div className="absolute top-20 left-0 right-0 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-emerald-600/90 text-white p-4 text-center backdrop-blur-md shadow-xl">
                        <p className="text-xl font-black italic">"יפה. הסדר מתחיל מבפנים."</p>
                    </div>
                </div>
            )}

            {/* Main Container */}
            <div
                className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-12 rounded-[3rem] shadow-2xl transition-all duration-700"
                style={{
                    transform: `rotate(${Math.sin(Date.now()) * rotateAmount}deg) scale(${0.9 + (100 - chaosLevel) / 1000})`,
                }}
            >
                <div className="text-center space-y-10">
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-3 text-blue-300">
                            <Brain size={32} />
                            <span className="text-xs font-black uppercase tracking-[0.3em]">רמת הכאוס: {chaosLevel}%</span>
                        </div>
                        {/* Chaos Bar */}
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full transition-all duration-1000 bg-gradient-to-r from-red-500 to-orange-500"
                                style={{ width: `${chaosLevel}%` }}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-5xl font-black tracking-tighter drop-shadow-lg" style={{ filter: `blur(${blurAmount}px)` }}>
                            {problem.a} {problem.op} {problem.b} = ?
                        </h2>
                        <p className="text-sm text-slate-400 font-bold italic">מצא את האמת. היא שם.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="number"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-6 text-center text-4xl font-black tracking-widest focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all placeholder:text-white/10"
                            placeholder="?"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-2xl font-black text-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                            <CheckCircle2 size={24} /> ייצב את המערכת
                        </button>
                    </form>
                </div>
            </div>

            <div className="absolute bottom-8 text-center opacity-40 text-[10px] font-mono">
                <p>SYSTEM.ENTROPY = {chaosLevel.toFixed(2)}</p>
            </div>

            <style>{`
        @keyframes shake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(3px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .animate-shake {
            animation: shake 0.5s;
            animation-iteration-count: infinite;
        }
      `}</style>
        </div>
    );
};

export default LittlePrinceApp;
