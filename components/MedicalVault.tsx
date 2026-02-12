import React, { useState } from 'react';
import {
    FileText, ShieldCheck, Database, Sparkles, Upload,
    MessageSquare, ChevronLeft, Lock, HardDrive, CheckCircle2,
    Eye, Trash2, Zap, Layout, Search, Plus, Globe, Youtube,
    Brain, FileQuestion, BarChart3, Presentation, ListChecks,
    History, MoreVertical, X, CheckSquare, Square
} from 'lucide-react';

interface SourceDocument {
    id: string;
    name: string;
    type: 'pdf' | 'yt' | 'web' | 'doc';
    date: string;
    isSelected: boolean;
}

interface MedicalVaultProps {
    onBack: () => void;
}

const MedicalVault: React.FC<MedicalVaultProps> = ({ onBack }) => {
    const [sources, setSources] = useState<SourceDocument[]>([
        { id: '1', name: 'סיכום אשפוז - שלוותה (מחלקה ה\')', type: 'pdf', date: '1d ago', isSelected: true },
        { id: '2', name: '4 Types of Borderline Personality...', type: 'yt', date: '2d ago', isSelected: true },
        { id: '3', name: '9 Traits of Borderline Personality...', type: 'yt', date: '2d ago', isSelected: true },
        { id: '4', name: 'Religious Delusions and Schizop...', type: 'yt', date: '3d ago', isSelected: false },
        { id: '5', name: 'Security System for the Soul', type: 'pdf', date: '1d ago', isSelected: true },
        { id: '6', name: 'Sacred Souls: Autism and Disabil...', type: 'pdf', date: '5d ago', isSelected: false }
    ]);

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSource = (id: string) => {
        setSources(sources.map(s => s.id === id ? { ...s, isSelected: !s.isSelected } : s));
    };

    const toggleAll = () => {
        const allSelected = sources.every(s => s.isSelected);
        setSources(sources.map(s => ({ ...s, isSelected: !allSelected })));
    };

    const studioCards = [
        { id: 'audio', title: 'סקירה קולית', icon: MessageSquare, color: 'bg-indigo-50 text-indigo-600' },
        { id: 'mindmap', title: 'מפת דרכים', icon: Brain, color: 'bg-purple-50 text-purple-600' },
        { id: 'quiz', title: 'בוחן עצמי', icon: FileQuestion, color: 'bg-emerald-50 text-emerald-600' },
        { id: 'report', title: 'דוח קליני', icon: FileText, color: 'bg-amber-50 text-amber-600' },
        { id: 'data', title: 'טבלת נתונים', icon: BarChart3, color: 'bg-blue-50 text-blue-600' },
        { id: 'slides', title: 'מצגת תובנות', icon: Presentation, color: 'bg-rose-50 text-rose-600' }
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#1A1C1E] font-assistant flex flex-col relative" dir="rtl">
            {/* Minimal Header */}
            <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 z-20">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ChevronLeft size={20} className="rotate-180" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <Database size={18} />
                        </div>
                        <h1 className="font-bold text-lg tracking-tight">כספת המרפא <span className="text-slate-400 font-normal">Sovereign Vault</span></h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex -space-x-2 space-x-reverse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">U{i}</div>
                        ))}
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar: Sources */}
                <aside className="w-80 border-l border-slate-200 bg-white flex flex-col pt-6 overflow-hidden">
                    <div className="px-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-sm font-black uppercase text-slate-400 tracking-widest">מקורות (Sources)</h2>
                        </div>
                        <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="w-full py-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors font-bold text-slate-600 text-sm"
                        >
                            <Plus size={18} /> הוסף מקורות
                        </button>
                    </div>

                    <div className="px-6 mb-4">
                        <div className="relative group">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="חפש במקורות שלך..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-10 pl-4 text-xs font-medium focus:outline-none focus:border-blue-500/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="px-6 flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase">בחירת מקורות להזנה</span>
                        <button onClick={toggleAll} className="text-[10px] font-bold text-blue-600 hover:underline">בחר הכל</button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 space-y-1 pb-10">
                        {sources.map(doc => (
                            <div
                                key={doc.id}
                                className={`group flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${doc.isSelected ? 'bg-blue-50/50 border border-blue-100' : 'hover:bg-slate-50 border border-transparent'}`}
                                onClick={() => toggleSource(doc.id)}
                            >
                                <button className={`${doc.isSelected ? 'text-blue-600' : 'text-slate-300'}`}>
                                    {doc.isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                                </button>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        {doc.type === 'yt' ? <Youtube size={14} className="text-red-500" /> : doc.type === 'pdf' ? <FileText size={14} className="text-blue-500" /> : <Globe size={14} className="text-emerald-500" />}
                                        <p className="text-[11px] font-bold truncate text-slate-700">{doc.name}</p>
                                    </div>
                                    <p className="text-[9px] text-slate-400 mt-0.5">{doc.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-slate-200 bg-slate-50/50">
                        <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase mb-2">
                            <span>מכסת זכרון (Context)</span>
                            <span>14/100 מקורות</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-[14%]" />
                        </div>
                    </div>
                </aside>

                {/* Main: Content/Studio Area */}
                <main className="flex-1 overflow-y-auto bg-[#F8F9FA] p-8">
                    <div className="max-w-4xl mx-auto space-y-10">
                        {/* Hero / Dashboard Title */}
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-1">Interactive Clinical Source</p>
                                <h2 className="text-3xl font-black italic tracking-tighter">הסטודיו לריבונות המידע</h2>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 bg-white border border-slate-200 px-4 py-2 rounded-full text-[10px] font-bold">
                                <History size={14} /> נראה לאחרונה: לפני 10 דקות
                            </div>
                        </div>

                        {/* Insights Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {studioCards.map(card => (
                                <div key={card.id} className="bg-white border border-slate-200 rounded-[2rem] p-6 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group shadow-sm">
                                    <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                                        <card.icon size={24} />
                                    </div>
                                    <h3 className="font-black italic text-lg mb-1">{card.title}</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed font-bold">ייצור אוטומטי של {card.title} על בסיס {sources.filter(s => s.isSelected).length} מקורות נבחרים.</p>
                                    <div className="mt-4 pt-4 border-t border-slate-50 flex justify-end">
                                        <Zap size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat Interface (The AI companion) */}
                        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <h3 className="font-black italic text-lg leading-tight">שאל את הכספת</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grounded in selected sources only</p>
                                </div>
                            </div>

                            <div className="relative group">
                                <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                <input
                                    type="text"
                                    placeholder="שאל: 'מה כתוב בסיכום האשפוז לגבי תופעות הלוואי של הוייפאקס?'"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] py-6 pr-14 pl-24 font-bold text-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                                />
                                <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg">
                                    שלח <Zap size={14} />
                                </button>
                            </div>

                            <div className="flex gap-2">
                                <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full">Ctx: {sources.filter(s => s.isSelected).length} Sources</span>
                                <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full italic">High Integrity grounding</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Upload Modal (Simulation) */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsUploadModalOpen(false)} />
                    <div className="bg-white w-full max-w-2xl rounded-[3rem] p-12 relative z-10 animate-in zoom-in duration-300 shadow-2xl overflow-hidden">
                        <button
                            onClick={() => setIsUploadModalOpen(false)}
                            className="absolute top-8 left-8 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black italic tracking-tighter mb-2">צור סטודיו למקורות חדשים</h2>
                            <p className="text-slate-400 font-bold italic">העלה את המציאות שלך לכספת המרפא</p>
                        </div>

                        {/* Search Web for sources */}
                        <div className="relative mb-10 group">
                            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                            <input
                                type="text"
                                placeholder="חפש מקורות ברשת/YouTube..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] py-5 pr-14 pl-24 font-bold text-lg focus:outline-none focus:border-blue-500 transition-all"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <button className="bg-white border border-slate-200 px-3 py-2 rounded-xl text-[10px] font-black flex items-center gap-1 hover:bg-slate-50 transition-colors">
                                    <Globe size={12} /> Web
                                </button>
                                <button className="bg-blue-600 text-white p-2 rounded-xl">
                                    <ArrowRight size={20} className="rotate-180" />
                                </button>
                            </div>
                        </div>

                        {/* Drop / Upload Zone */}
                        <div className="border-4 border-dashed border-slate-100 rounded-[3rem] p-16 text-center space-y-6 hover:bg-slate-50 transition-all group cursor-pointer relative">
                            <div className="flex justify-center flex-wrap gap-4 opacity-40 grayscale pointer-events-none mb-4">
                                <FileText size={48} />
                                <Youtube size={48} />
                                <Database size={48} />
                                <Globe size={48} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black italic">גרור קבצים לכאן</h3>
                                <p className="text-slate-400 font-bold text-xs mt-1 uppercase tracking-widest">PDF, IMAGE, DOC, AUDIO, AND MORE</p>
                            </div>

                            <div className="flex justify-center gap-4 pt-4">
                                <button className="bg-white border-2 border-slate-100 px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:border-blue-500/30 transition-all">
                                    <Upload size={18} /> העלאת קבצים
                                </button>
                                <button className="bg-white border-2 border-slate-100 px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:border-blue-500/30 transition-all">
                                    <Youtube size={18} className="text-red-500" /> YouTube
                                </button>
                            </div>
                        </div>

                        {/* Progress Simulation */}
                        <div className="mt-10 space-y-2">
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-[70%]" />
                            </div>
                            <div className="flex justify-between text-[10px] font-black text-slate-300 uppercase">
                                <span>מעבד נתונים...</span>
                                <span>14/100 קבצים מוכנים</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicalVault;
