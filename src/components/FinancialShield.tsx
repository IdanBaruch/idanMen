import React, { useState } from 'react';
import { Shield, Lock, Unlock, Users, AlertTriangle, Wallet, CreditCard, ArrowLeft, CheckCircle2, History } from 'lucide-react';

const FinancialShield: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
    const [isLocked, setIsLocked] = useState(false);
    const [guardians, setGuardians] = useState([
        { name: 'אמא', status: 'active' },
        { name: 'מדריך (ירון)', status: 'active' }
    ]);
    const [showPanicConfirm, setShowPanicConfirm] = useState(false);

    const toggleLock = () => {
        if (isLocked) {
            // Unlock requires "approval" (simulated)
            alert('נדרש אישור של אחד ה-Guardians לפתיחת הארנק.');
        } else {
            setIsLocked(true);
            setShowPanicConfirm(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 font-assistant relative overflow-hidden">
            {/* Background Gradients */}
            <div className={`absolute inset-0 transition-all duration-1000 ${isLocked ? 'bg-slate-900' : 'bg-slate-800'}`}>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-md mx-auto space-y-8 mt-10">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <button onClick={onBack} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <ArrowLeft />
                    </button>
                    <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                        <Shield className="text-emerald-400" />
                        הארנק המוגן
                    </h1>
                    <div className="w-10" /> {/* Spacer */}
                </div>

                {/* Status Card */}
                <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 text-center space-y-4 relative overflow-hidden ${isLocked ? 'bg-emerald-900/40 border-emerald-500/30' : 'bg-slate-800/50 border-white/10'}`}>
                    <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all duration-500 ${isLocked ? 'bg-emerald-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.4)]' : 'bg-white/5 text-slate-400'}`}>
                        {isLocked ? <Lock size={40} /> : <Unlock size={40} />}
                    </div>

                    <div>
                        <h2 className="text-3xl font-black mb-1">{isLocked ? 'הגנה פעילה' : 'מצב רגיל'}</h2>
                        <p className="text-sm opacity-60 font-bold">{isLocked ? 'הגישה לאמצעי תשלום נחסמה.' : 'האמצעים פתוחים לשימוש.'}</p>
                    </div>

                    {isLocked && (
                        <div className="bg-emerald-500/20 py-2 px-4 rounded-full text-xs font-black text-emerald-300 inline-block">
                            MONEY SAFE MODE
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 px-4">פעולות מהירות</h3>

                    {!isLocked ? (
                        <button
                            onClick={() => setShowPanicConfirm(true)}
                            className="w-full bg-red-500/10 border border-red-500/50 hover:bg-red-500/20 text-red-400 p-6 rounded-[2rem] flex items-center gap-4 transition-all group"
                        >
                            <div className="bg-red-500 text-white p-3 rounded-full group-hover:scale-110 transition-transform">
                                <Lock size={20} />
                            </div>
                            <div className="text-right">
                                <span className="block font-black text-lg">נעילת חירום (Panic Lock)</span>
                                <span className="text-xs opacity-70">מרגיש שהגל מגיע? נעל עכשיו.</span>
                            </div>
                        </button>
                    ) : (
                        <div className="w-full bg-white/5 border border-white/10 p-6 rounded-[2rem] text-center text-slate-400">
                            <p className="text-sm">הארנק נעול. לפתיחה פנה לאחד מהשומרים שלך.</p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all">
                            <Wallet className="mb-4 text-blue-400" />
                            <span className="block font-bold text-lg">₪420</span>
                            <span className="text-xs opacity-50">יתרה זמינה</span>
                        </div>
                        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all">
                            <Users className="mb-4 text-purple-400" />
                            <span className="block font-bold text-lg">{guardians.length}</span>
                            <span className="text-xs opacity-50">שומרים פעילים</span>
                        </div>
                    </div>
                </div>

                {/* Panic Confirmation Modal */}
                {showPanicConfirm && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in">
                        <div className="bg-slate-900 border border-red-500/30 p-8 rounded-[3rem] max-w-sm w-full text-center space-y-6">
                            <AlertTriangle size={64} className="mx-auto text-red-500 animate-pulse" />
                            <div>
                                <h3 className="text-2xl font-black text-white">לנעול את הארנק?</h3>
                                <p className="text-slate-400 mt-2">הגישה לאשראי תיחסם מיידית. שחרור הנעילה יתאפשר רק באישור איש קשר.</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setIsLocked(true)} className="flex-1 bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-black">כן, נעל!</button>
                                <button onClick={() => setShowPanicConfirm(false)} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-bold">ביטול</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default FinancialShield;
