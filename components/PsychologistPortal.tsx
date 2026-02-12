import React, { useState } from 'react';
import { Brain, Sparkles, Save, ChevronLeft, ShieldCheck, Heart } from 'lucide-react';
import { StrengthTag } from '../types';

interface PsychologistPortalProps {
    onBack: () => void;
    onAddEntry: (content: any) => void;
}

const STRENGTH_TAGS: StrengthTag[] = ['Insight', 'Self-Regulation', 'Persistence', 'Honesty', 'Initiative', 'Focus'];

const PsychologistPortal: React.FC<PsychologistPortalProps> = ({ onBack, onAddEntry }) => {
    const [selectedTags, setSelectedTags] = useState<StrengthTag[]>([]);
    const [narrative, setNarrative] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);


    const toggleTag = (tag: StrengthTag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleSave = () => {
        if (!narrative) return;
        setIsSaving(true);
        setTimeout(() => {
            onAddEntry({
                tags: selectedTags,
                narrative,
                timestamp: new Date().toISOString(),
                isPrivate
            });

            setIsSaving(false);
            setNarrative('');
            setSelectedTags([]);
            alert('הבלוק התווסף לספר הניצחונות של יהונתן! 🏆');
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#fdfaf5] text-slate-900 font-assistant p-8 md:p-16 flex flex-col items-center" dir="rtl">
            <header className="w-full max-w-4xl flex justify-between items-center mb-16">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-4 hover:bg-black/5 rounded-full transition-colors">
                        <ChevronLeft size={32} />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black italic text-slate-800">יומן החוזקות</h1>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">עדכון ספר הניצחונות על ידי הפסיכולוג</p>
                    </div>
                </div>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-purple-600 border border-purple-100">
                    <Brain size={32} />
                </div>
            </header>

            <main className="w-full max-w-4xl space-y-12">
                {/* Strength Tags Section */}
                <section className="bg-white p-10 rounded-[3rem] shadow-xl shadow-purple-900/5 space-y-8">
                    <div className="flex items-center gap-3">
                        <Sparkles className="text-purple-500" />
                        <h3 className="text-2xl font-black italic">במה יהונתן הצליח היום?</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {STRENGTH_TAGS.map(tag => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-6 py-3 rounded-2xl font-bold transition-all border-2 ${selectedTags.includes(tag)
                                    ? 'bg-purple-600 border-purple-600 text-white shadow-lg scale-105'
                                    : 'bg-white border-slate-100 text-slate-400 hover:border-purple-200'
                                    }`}
                            >
                                {tag === 'Insight' ? 'תובנה עצמית' :
                                    tag === 'Self-Regulation' ? 'ויסות רגשי' :
                                        tag === 'Persistence' ? 'התמדה' :
                                            tag === 'Honesty' ? 'כנות' :
                                                tag === 'Initiative' ? 'יוזמה' : 'מיקוד'}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Narrative Section */}
                <section className="bg-white p-10 rounded-[3rem] shadow-xl shadow-purple-900/5 space-y-8">
                    <div className="flex items-center gap-3">
                        <Heart className="text-rose-500" />
                        <h3 className="text-2xl font-black italic">מה לספר ליהונתן?</h3>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm text-slate-500 italic font-medium">
                            *כתוב כאן תובנה אחת שיהונתן גילה היום על עצמו, שתחזק אותו ברגע משבר.*
                        </p>
                        <textarea
                            value={narrative}
                            onChange={(e) => setNarrative(e.target.value)}
                            placeholder="תאר את הכוח שיהונתן הפגין..."
                            className="w-full h-48 bg-slate-50 border border-slate-100 rounded-[2rem] p-8 text-xl font-medium focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all placeholder:italic"
                        />
                        <div className="flex items-center gap-3 bg-slate-50 p-6 rounded-3xl border border-slate-100 mt-4">
                            <input
                                type="checkbox"
                                checked={isPrivate}
                                onChange={(e) => setIsPrivate(e.target.checked)}
                                className="w-6 h-6 rounded-lg text-purple-600 focus:ring-purple-500"
                            />
                            <div className="flex-1">
                                <p className="font-black text-sm text-slate-700">פרטי (לצוות בלבד)</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">פרטיות קלינית: הסתר מפורטל המשפחה</p>
                            </div>
                        </div>
                    </div>
                </section>


                <div className="flex justify-end p-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving || !narrative}
                        className={`group px-12 py-6 rounded-[2rem] font-black text-2xl flex items-center gap-4 transition-all shadow-2xl ${isSaving || !narrative
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 active:scale-95'
                            }`}
                    >
                        {isSaving ? 'שומר...' : 'שלח לספר הניצחונות'}
                        <ShieldCheck className={isSaving ? 'animate-spin' : ''} />
                    </button>
                </div>
            </main>

            <footer className="mt-20 opacity-40 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest italic">מערכת הריבונות 4.0 | מצב קליני</p>
            </footer>
        </div>
    );
};

export default PsychologistPortal;
