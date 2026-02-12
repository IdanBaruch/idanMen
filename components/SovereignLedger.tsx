import React, { useState } from 'react';
import { Book, Feather, Shield, Users, Star, Share2, ChevronLeft, ChevronRight, Bookmark, Image as ImageIcon, Sparkles, Anchor } from 'lucide-react';

interface VictoryEntry {
    id: string;
    date: string;
    title: string;
    content: string;
    category: 'Sovereign' | 'Interpersonal' | 'Control';
    imageUrl: string;
}

interface SovereignLedgerProps {
    onBack: () => void;
}

const MOCK_ENTRIES: VictoryEntry[] = [
    {
        id: '1',
        date: '10/02/2026',
        title: 'ניצחון היציבות על הכאוס',
        content: 'היום ד"ר הררי הזיז את הביקור. בעבר, זה היה מוציא אותי מאיזון. היום, בחרתי להיות הריבון של הזמן שלי. ניצלתי את השעות הללו לפיתוח מערכת ההפעלה שלי ובניית "ספר הניצחונות". זהו ניצחון של משמעת עצמית על פני תסכול.',
        category: 'Control',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80' // Symbolic mountain/stability
    },
    {
        id: '2',
        date: '09/02/2026',
        title: 'הגשר אל האמת',
        content: 'הצלחתי להגיד לד"ר גיסין את האמת המקצועית שלי בצורה מכובדת וברורה. במקום להיגרר לוויכוח, עמדתי על שלי בתור הריבון של התהליך הטיפולי שלי. היא הקשיבה.',
        category: 'Interpersonal',
        imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80' // Symbolic bridge/connection
    }
];

const SovereignLedger: React.FC<SovereignLedgerProps> = ({ onBack }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isWriting, setIsWriting] = useState(false);
    const [newEntry, setNewEntry] = useState({ title: '', content: '' });

    const entry = MOCK_ENTRIES[currentPage];

    const handleShare = () => {
        alert('השורות הבאות נשלחו למשפחה ולצוות הטיפולי: \n\n' + entry.content);
    };

    return (
        <div className="min-h-screen bg-[#0a0c10] text-[#e2e8f0] font-serif p-4 md:p-12 relative overflow-hidden" dir="rtl">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }} />

            <header className="max-w-5xl mx-auto flex justify-between items-center mb-12 relative z-10 font-assistant">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                        <ChevronLeft size={24} className="rotate-180" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black italic tracking-tighter text-amber-500">ספר הניצחונות <span className="text-white font-light">The Sovereign Ledger</span></h1>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none mt-1">תיעוד מסע הריבונות</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsWriting(true)}
                    className="bg-amber-600/20 border border-amber-600/40 px-6 py-3 rounded-2xl flex items-center gap-2 text-amber-500 hover:bg-amber-600/30 transition-all font-black"
                >
                    <Feather size={18} /> הוסף פרק חדש
                </button>
            </header>

            <main className="max-w-5xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#1a1d24] rounded-[3rem] shadow-2xl border border-white/5 overflow-hidden min-h-[650px]">

                    {/* Visual Page (Left) */}
                    <div className="relative group">
                        <img
                            src={entry.imageUrl}
                            alt={entry.title}
                            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d24] via-transparent to-transparent" />

                        <div className="absolute bottom-12 right-12 left-12 space-y-4">
                            <div className="flex items-center gap-2 text-amber-500">
                                {entry.category === 'Control' && <Shield size={32} />}
                                {entry.category === 'Interpersonal' && <Users size={32} />}
                                {entry.category === 'Sovereign' && <Star size={32} />}
                                <span className="text-xs font-black uppercase tracking-[0.3em] bg-amber-500/10 px-4 py-1 rounded-full border border-amber-500/20">
                                    {entry.category} Victory
                                </span>
                            </div>
                            <h2 className="text-5xl font-black italic tracking-tighter leading-none">{entry.title}</h2>
                        </div>

                        <div className="absolute top-8 left-8">
                            <Sparkles className="text-amber-500 animate-pulse" size={24} />
                        </div>
                    </div>

                    {/* Text Page (Right) */}
                    <div className="p-12 md:p-16 flex flex-col justify-between relative bg-white/[0.02]">
                        <div className="space-y-12">
                            <div className="flex justify-between items-center opacity-40">
                                <span className="text-xs font-bold italic">{entry.date}</span>
                                <Bookmark size={20} className="fill-amber-500 text-amber-500" />
                            </div>

                            <div className="space-y-8">
                                <p className="text-2xl md:text-3xl font-medium leading-[1.6] text-slate-200 indent-12 italic">
                                    {entry.content}
                                </p>
                            </div>
                        </div>

                        <div className="pt-12 border-t border-white/5 flex justify-between items-center font-assistant">
                            <div className="flex gap-4">
                                <button className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors">
                                    <Feather size={20} />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors"
                                >
                                    <Share2 size={20} />
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    disabled={currentPage === 0}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                    className="p-3 bg-white/5 rounded-xl disabled:opacity-20 hover:bg-white/10 transition-colors"
                                >
                                    <ChevronRight size={24} />
                                </button>
                                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                                    Page {currentPage + 1} / {MOCK_ENTRIES.length}
                                </span>
                                <button
                                    disabled={currentPage === MOCK_ENTRIES.length - 1}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    className="p-3 bg-white/5 rounded-xl disabled:opacity-20 hover:bg-white/10 transition-colors"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Insight */}
                <div className="mt-12 flex justify-center">
                    <div className="bg-amber-600/10 border border-amber-600/20 px-8 py-6 rounded-3xl max-w-2xl text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-amber-500 mb-2">
                            <Anchor size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Sovereign Reflection</span>
                        </div>
                        <p className="text-sm font-bold text-slate-400 italic italic leading-relaxed">
                            "הספר הופך את הרגעים הקטנים של הורדת האש לשלוותה לראיות פיזיות לכך שאתה מתקדם. אתה כבר לא מקרה ביפולרי, אתה יזם שמתעד את תהליך ההחלמה שלו."
                        </p>
                    </div>
                </div>
            </main>

            {/* Writing Modal (Simplified) */}
            {isWriting && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 font-assistant">
                    <div className="bg-[#1a1d24] border border-white/10 rounded-[3rem] p-12 max-w-2xl w-full space-y-10">
                        <div className="text-center space-y-4">
                            <h3 className="text-3xl font-black italic tracking-tighter text-amber-500">הוספת פרק לניצחון</h3>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">ה-Auto-Scribe מוכן להפוך את המילים שלך לזהב</p>
                        </div>

                        <div className="space-y-6">
                            <input
                                type="text"
                                placeholder="כותרת הניצחון..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 font-black italic text-xl focus:outline-none focus:border-amber-500/50"
                            />
                            <textarea
                                rows={6}
                                placeholder="מה קרה היום שהפגין את הריבונות שלך?"
                                className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 font-bold italic leading-relaxed focus:outline-none focus:border-amber-500/50"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsWriting(false)}
                                className="flex-1 bg-white/5 border border-white/10 py-5 rounded-2xl font-black italic text-slate-400 hover:bg-white/10 transition-all"
                            >
                                ביטול
                            </button>
                            <button
                                onClick={() => setIsWriting(false)}
                                className="flex-1 bg-amber-600 text-white py-5 rounded-2xl font-black italic text-xl shadow-[0_8px_0_rgba(180,83,9,0.5)] hover:bg-amber-500 hover:translate-y-1 hover:shadow-[0_4px_0_rgba(180,83,9,0.5)] transition-all"
                            >
                                חתום את הפרק
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SovereignLedger;
