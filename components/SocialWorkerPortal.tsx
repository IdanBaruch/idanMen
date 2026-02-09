import React, { useState } from 'react';
import { Home, Briefcase, Wallet, Users, ChevronLeft, Anchor, ClipboardList, Send, AlertTriangle } from 'lucide-react';

interface SocialWorkerPortalProps {
    onBack: () => void;
    onAddEntry: (content: any) => void;
}

type PillarStatus = 'green' | 'yellow' | 'red';

interface Pillar {
    id: string;
    label: string;
    icon: React.ElementType;
    status: PillarStatus;
}

const SocialWorkerPortal: React.FC<SocialWorkerPortalProps> = ({ onBack, onAddEntry }) => {
    const [pillars, setPillars] = useState<Pillar[]>([
        { id: 'housing', label: 'דיור/בית', icon: Home, status: 'yellow' },
        { id: 'work', label: 'תעסוקה/לימודים', icon: Briefcase, status: 'red' },
        { id: 'finance', label: 'התנהלות כלכלית', icon: Wallet, status: 'green' },
        { id: 'family', label: 'קשר משפחתי', icon: Users, status: 'yellow' }
    ]);
    const [anchorNote, setAnchorNote] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const cycleStatus = (id: string) => {
        setPillars(prev => prev.map(p => {
            if (p.id !== id) return p;
            const nextStatus: PillarStatus = p.status === 'green' ? 'yellow' : p.status === 'yellow' ? 'red' : 'green';
            return { ...p, status: nextStatus };
        }));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            onAddEntry({
                pillars,
                anchorNote,
                timestamp: new Date().toISOString()
            });
            setIsSaving(false);
            setAnchorNote('');
            alert('דופק השיקום עודכן! הנתונים סונכרנו מול ספר הניצחונות. 🤝');
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-assistant p-8 md:p-16 flex flex-col items-center" dir="rtl">
            <header className="w-full max-w-4xl flex justify-between items-center mb-16">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-4 hover:bg-black/5 rounded-full transition-colors">
                        <ChevronLeft size={32} />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black italic text-slate-800 tracking-tighter">קצב ההתקדמות</h1>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">עדכון ספר הניצחונות על ידי עובד סוציאלי</p>
                    </div>
                </div>
                <div className="w-16 h-16 bg-blue-600 rounded-2xl shadow-xl flex items-center justify-center text-white border border-blue-400">
                    <Anchor size={32} />
                </div>
            </header>

            <main className="w-full max-w-4xl space-y-8">
                {/* Pillars Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pillars.map(pillar => (
                        <button
                            key={pillar.id}
                            onClick={() => cycleStatus(pillar.id)}
                            className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200 flex items-center justify-between group hover:scale-[1.02] transition-all border border-slate-50"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                                    <pillar.icon size={32} />
                                </div>
                                <div className="text-right">
                                    <h3 className="text-xl font-black italic">{pillar.label}</h3>
                                    <p className="text-[10px] font-black uppercase text-slate-400">Current Pillar Status</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 rounded-full shadow-inner transition-all duration-500 ${pillar.status === 'green' ? 'bg-emerald-500 shadow-emerald-900/40' :
                                    pillar.status === 'yellow' ? 'bg-amber-400 shadow-amber-900/40' :
                                        'bg-rose-500 shadow-rose-900/40'
                                    }`} />
                                <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">Cycle</span>
                            </div>
                        </button>
                    ))}
                </section>

                {/* Anchor Note Section */}
                <section className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200 space-y-8">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                        <ClipboardList className="text-blue-500" />
                        <h3 className="text-2xl font-black italic">איך יהונתן מתקדם?</h3>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm text-slate-500 italic font-medium">
                            *כמה מילים על ההתקדמות של יהונתן השבוע. (למשל: "יהונתן יזם פגישה עם המעסיק...")*
                        </p>
                        <textarea
                            value={anchorNote}
                            onChange={(e) => setAnchorNote(e.target.value)}
                            placeholder="תאר את צעדי השיקום..."
                            className="w-full h-40 bg-slate-50 border border-slate-100 rounded-[2rem] p-8 text-xl font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex items-center gap-4 bg-amber-50 p-6 rounded-3xl border border-amber-100">
                        <AlertTriangle className="text-amber-500 shrink-0" />
                        <p className="text-xs font-bold text-amber-800 italic leading-snug">
                            שים לב: הוספת משימה בפורטל זה תעדכן אוטומטית את "מגדל הפיקוח" של יהונתן.
                        </p>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={isSaving || !anchorNote}
                        className="bg-blue-600 text-white py-6 rounded-[2rem] font-black text-2xl hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? 'מעדכן...' : 'שלח לספר הניצחונות'}
                        <Send size={24} />
                    </button>
                </div>
            </main>

            <footer className="mt-20 opacity-40 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest italic font-assistant">Sovereign Rehab System v4.0 | Social Work Dept.</p>
            </footer>
        </div>
    );
};

export default SocialWorkerPortal;
