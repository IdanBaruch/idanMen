import React, { useState } from 'react';
import { Wine, Skull, PartyPopper, Brain, ArrowRight, ShieldCheck, X, Activity } from 'lucide-react';

const LiquidClarity: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'menu' | 'armor' | 'simulator' | 'defuser'>('menu');
    const [simulatorState, setSimulatorState] = useState<'initial' | 'drink' | 'abstain'>('initial');

    // Social Armor Content
    const armorQuotes = [
        "אתה לא מפסיד כלום. אתה מרוויח את המחר.",
        "הם צוחקים כי הכימיקל מדגדג להם במוח. אתה צוחק כי אתה באמת שמח.",
        "תחזיק את הסודה כמו שרביט של כוח. אתה בשליטה.",
        "אתה רואה את המציאות ב-4K. אל תנמיך רזולוציה.",
        "הם על טייס אוטומטי. אתה הטייס.",
    ];
    const [currentArmorQuote, setCurrentArmorQuote] = useState(0);

    const nextArmorQuote = () => {
        setCurrentArmorQuote((prev) => (prev + 1) % armorQuotes.length);
    };

    const renderMenu = () => (
        <div className="space-y-6 w-full max-w-md mx-auto animate-in slide-in-from-bottom-10 duration-500 pt-10">
            <div className="text-center space-y-2 mb-12">
                <h1 className="text-5xl font-black italic text-blue-900 tracking-tighter">צלילות נוזלית</h1>
                <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">מפרקים את השקר של האלכוהול</p>
            </div>

            <button onClick={() => setActiveTab('armor')} className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white p-8 rounded-[2.5rem] flex items-center justify-between shadow-xl hover:scale-105 transition-transform group">
                <div className="text-right">
                    <h3 className="text-3xl font-black italic">השריון החברתי</h3>
                    <p className="text-blue-100 text-sm font-medium opacity-80 mt-1">אני באירוע (Wingman)</p>
                </div>
                <div className="bg-white/20 p-4 rounded-2xl group-hover:rotate-12 transition-transform">
                    <ShieldCheck size={32} />
                </div>
            </button>

            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setActiveTab('simulator')} className="w-full bg-white border-2 border-slate-100 text-slate-800 p-6 rounded-[2.5rem] flex flex-col items-center justify-center text-center gap-4 shadow-lg hover:border-red-400 transition-colors group">
                    <div className="bg-red-50 text-red-500 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                        <Activity size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black">חזאי הבוקר</h3>
                        <p className="text-slate-400 text-[10px] font-bold uppercase mt-1">סימולטור 07:00</p>
                    </div>
                </button>

                <button onClick={() => setActiveTab('defuser')} className="w-full bg-white border-2 border-slate-100 text-slate-800 p-6 rounded-[2.5rem] flex flex-col items-center justify-center text-center gap-4 shadow-lg hover:border-emerald-400 transition-colors group">
                    <div className="bg-emerald-50 text-emerald-500 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                        <Brain size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black">מנטרל רגשות</h3>
                        <p className="text-slate-400 text-[10px] font-bold uppercase mt-1">פירוק הדחף</p>
                    </div>
                </button>
            </div>
        </div>
    );

    const renderArmor = () => (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-12 animate-in zoom-in duration-500 max-w-lg mx-auto">
            <div className="w-40 h-40 bg-gradient-to-br from-blue-100 to-white rounded-full flex items-center justify-center animate-pulse-slow shadow-xl border border-blue-50">
                <ShieldCheck size={80} className="text-blue-600" />
            </div>
            <div className="space-y-6">
                <h2 className="text-4xl font-black text-blue-900 tracking-tight">הווינגמן שלך כאן.</h2>
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-blue-50 relative">
                    <Activity className="absolute top-4 right-4 text-blue-100" size={24} />
                    <p className="text-3xl font-black text-slate-700 leading-tight">
                        "{armorQuotes[currentArmorQuote]}"
                    </p>
                </div>
            </div>
            <button onClick={nextArmorQuote} className="bg-blue-600 text-white px-10 py-5 rounded-full font-black text-xl hover:bg-blue-700 transition-all shadow-xl hover:scale-105 active:scale-95">
                תן לי עוד חיזוק 🛡️
            </button>
        </div>
    );

    const renderSimulator = () => (
        <div className="h-full flex flex-col pt-4 animate-in fade-in duration-700">
            <h2 className="text-4xl font-black text-center text-slate-800 mb-8 tracking-tight">בחר את המחר שלך</h2>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                {/* Scenario A: Drink */}
                <button
                    onClick={() => setSimulatorState('drink')}
                    className={`relative rounded-[2.5rem] overflow-hidden group transition-all duration-500 shadow-2xl ${simulatorState === 'drink' ? 'ring-8 ring-red-500 scale-95 z-10' : simulatorState === 'abstain' ? 'opacity-30 blur-sm scale-90' : 'hover:scale-95'}`}
                >
                    <div className={`absolute inset-0 bg-red-900 transition-opacity duration-700 ${simulatorState === 'drink' ? 'opacity-60' : 'opacity-40 group-hover:opacity-50'}`} />

                    {/* Placeholder Image for Drink Scenario */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-overlay" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                        <Skull size={64} className={`mb-4 transition-transform ${simulatorState === 'drink' ? 'animate-bounce' : ''}`} />
                        <h3 className="text-4xl font-black italic">לשתות</h3>
                        {simulatorState === 'drink' && (
                            <div className="mt-6 text-lg font-bold bg-black/60 backdrop-blur-md p-6 rounded-3xl animate-in fade-in slide-in-from-bottom-4 border border-white/10">
                                <div className="text-red-400 text-xs font-black uppercase tracking-widest mb-2">מחר ב-07:00</div>
                                חרדה.<br />
                                בחילה.<br />
                                כאב ראש דופק.<br />
                                <span className="text-red-400">חרטה.</span>
                            </div>
                        )}
                    </div>
                </button>

                {/* Scenario B: Abstain */}
                <button
                    onClick={() => setSimulatorState('abstain')}
                    className={`relative rounded-[2.5rem] overflow-hidden group transition-all duration-500 shadow-2xl ${simulatorState === 'abstain' ? 'ring-8 ring-emerald-500 scale-95 z-10' : simulatorState === 'drink' ? 'opacity-30 blur-sm scale-90' : 'hover:scale-95'}`}
                >
                    <div className={`absolute inset-0 bg-emerald-900 transition-opacity duration-700 ${simulatorState === 'abstain' ? 'opacity-60' : 'opacity-40 group-hover:opacity-50'}`} />

                    {/* Placeholder Image for Abstain Scenario */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                        <PartyPopper size={64} className={`mb-4 transition-transform ${simulatorState === 'abstain' ? 'animate-bounce' : ''}`} />
                        <h3 className="text-4xl font-black italic">לוותר</h3>
                        {simulatorState === 'abstain' && (
                            <div className="mt-6 text-lg font-bold bg-black/60 backdrop-blur-md p-6 rounded-3xl animate-in fade-in slide-in-from-bottom-4 border border-white/10">
                                <div className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">מחר ב-07:00</div>
                                אנרגיה.<br />
                                חדות.<br />
                                גאווה עצמית.<br />
                                <span className="text-emerald-400">ניצחון.</span>
                            </div>
                        )}
                    </div>
                </button>
            </div>
        </div>
    );

    const renderDefuser = () => (
        <div className="flex flex-col h-full animate-in slide-in-from-right duration-500 py-10">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 flex-1 flex flex-col items-center justify-center text-center space-y-10 relative overflow-hidden">
                <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-red-500 to-blue-500" />

                <div className="p-6 bg-slate-50 rounded-full">
                    <Brain size={64} className="text-slate-400" />
                </div>

                <h2 className="text-4xl font-black text-slate-800 tracking-tight">מה אתה <span className="underline decoration-blue-500 decoration-4 underline-offset-4">באמת</span> רוצה?</h2>

                <div className="space-y-6 w-full max-w-sm relative">
                    {/* The Lie */}
                    <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 transform -rotate-1">
                        <p className="text-xs font-black text-red-400 uppercase tracking-widest mb-2">השקר</p>
                        <p className="text-3xl font-black text-red-900/50 line-through decoration-red-500 decoration-2">"אני רוצה בירה"</p>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-sm z-10">
                        <ArrowRight className="text-slate-300 rotate-90" />
                    </div>

                    {/* The Truth */}
                    <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 transform rotate-1 shadow-lg">
                        <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">האמת</p>
                        <p className="text-3xl font-black text-blue-700 leading-tight">"אני רוצה שקט בראש."</p>
                    </div>
                </div>

                <p className="text-slate-500 font-medium text-lg max-w-xs">האלכוהול הוא רק כפתור "השהה" לבעיה.<br />היא תחכה לך מחר, גדולה יותר.</p>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[50] bg-[#f1f5f9] flex flex-col font-assistant overflow-hidden">
            <header className="px-8 py-6 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-[60]">
                <button onClick={() => activeTab === 'menu' ? onBack && onBack() : setActiveTab('menu')} className="p-4 bg-white rounded-full shadow-lg border border-slate-100 hover:bg-slate-50 transition-colors group">
                    {activeTab === 'menu' ? <X className="text-slate-400 group-hover:text-red-500 transition-colors" /> : <ArrowRight className="text-slate-400 group-hover:text-blue-500 transition-colors" />}
                </button>
                <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                    <Wine size={16} className="text-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Liquid Clarity Protocol</span>
                </div>
            </header>

            <main className="flex-1 px-6 pb-6 relative overflow-y-auto scroll-smooth">
                {activeTab === 'menu' && renderMenu()}
                {activeTab === 'armor' && renderArmor()}
                {activeTab === 'simulator' && renderSimulator()}
                {activeTab === 'defuser' && renderDefuser()}
            </main>
        </div>
    );
};

export default LiquidClarity;
