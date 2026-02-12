import React, { useState } from 'react';
import { ChevronLeft, Info, ClipboardList, Search, Activity, Link2, Sparkles, Zap, Lock, Users, ShieldCheck } from 'lucide-react';
import { decodePsychiatricSummary } from '../../services/geminiService';

interface ConsultationPortalProps {
    onBack: () => void;
    onAddPoints: (pts: number) => void;
}

const ConsultationPortal: React.FC<ConsultationPortalProps> = ({ onBack, onAddPoints }) => {
    const [view, setView] = useState<'list' | 'detail' | 'ask'>('list');
    const [isDecoding, setIsDecoding] = useState(false);
    const [decodedResult, setDecodedResult] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [question, setQuestion] = useState('');
    const [aiAnswer, setAiAnswer] = useState<string | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speak = (text: string) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'he-IL';
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    const WARD_E_STAFF = {
        doctors: [
            { name: 'ד"ר חגי הררי', role: 'מנהל המחלקה', specialty: 'פסיכיאטריה' },
            { name: 'ד"ר רחלי גיסין', role: 'סגנית מנהל מחלקה', specialty: 'פסיכיאטריה' },
            { name: 'ד"ר זהר פרשטמן', role: 'רופאה בכירה', specialty: 'פסיכיאטריה' },
            { name: 'ד"ר רומי ברי', role: 'רופאה בכירה', specialty: 'פסיכיאטריה' }
        ],
        nursing: { name: 'אדהם עיראקי', role: 'מנהל הסיעוד' },
        therapy: [
            { name: 'דפנה זמיר', role: 'פסיכולוגית אחראית' },
            { name: 'חיה שוויגר', role: 'דיאטנית קלינית' }
        ],
        rights: { name: 'שרון איתן כהן', role: 'פניות הציבור' }
    };

    const MOCK_CONSULTATION = {
        id: 'Z-449',
        specialist: 'פסיכיאטריה',
        doctor: WARD_E_STAFF.doctors[0].name,
        status: 'הושלם (תשובה בתיק)',
        rawResult: 'בבדיקה קלינית: המטופל מציג תובנה טובה למצבו. מדווח על שיפור בשינה אך עדיין חווה תנודתיות ברמת האנרגיה. המלצה: המשך פרוטוקול תרופתי נוכחי וניטור מדדי ריבונות.',
        date: '10/02/2026'
    };

    const handleDecode = async () => {
        setIsDecoding(true);
        const result = await decodePsychiatricSummary(MOCK_CONSULTATION.rawResult);
        setDecodedResult(result);
        setIsDecoding(false);
        onAddPoints(20);
        speak(result);
    };

    const handleAskVoice = () => {
        setIsListening(true);
        setQuestion('');
        setAiAnswer(null);

        // Simulating listening
        setTimeout(() => {
            setIsListening(false);
            const userQ = "איך זה יכול להיות שהכניסו אותי למחלקה בלי שחתמתי? זה תקף?";
            setQuestion(userQ);

            const answer = "זה באמת מרגיש לא הוגן כשזה קורה. לפי החוק, אם רופא חושב שיש סכנה, הוא יכול לפעמים להחליט על אשפוז גם בלי חתימה שלך - וזו נקראת 'הוראת אשפוז'. אבל, יש לך זכות מלאה לבקש להיפגש עם עורך דין בחינם שיעזור לך לבדוק אם זה נעשה נכון. אני כאן איתך.";
            setAiAnswer(answer);
            speak(answer);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#020408] text-white font-assistant p-8" dir="rtl">
            {/* Header */}
            <header className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                        <ChevronLeft size={24} className="rotate-180" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black italic tracking-tighter text-indigo-400">פורטל המומחים <span className="text-white font-light">סיכומי רופאים</span></h1>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none mt-1">מסלול החלטות עצמאי</p>
                    </div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest italic">חיבור חי למערכת</span>
                </div>
            </header>

            <main className="max-w-3xl mx-auto space-y-8">
                {view === 'list' ? (
                    <div className="space-y-6">
                        <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1 h-full bg-indigo-500" />
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="bg-indigo-500/20 text-indigo-400 text-[10px] font-black px-3 py-1 rounded-full border border-indigo-500/30 w-fit mb-3">בקשה פעילה</div>
                                    <h3 className="text-2xl font-black">{MOCK_CONSULTATION.specialist}</h3>
                                    <p className="text-slate-400 text-sm font-bold">הוזמן ע"י {MOCK_CONSULTATION.doctor} | {MOCK_CONSULTATION.date}</p>
                                </div>
                                <div className="p-4 bg-indigo-500/10 rounded-2xl">
                                    <ClipboardList className="text-indigo-400" size={28} />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    onClick={() => setView('detail')}
                                    className="flex-1 bg-white text-black py-4 rounded-2xl font-black italic hover:scale-[1.02] transition-transform"
                                >
                                    צפה בתוצאות (מפוענח)
                                </button>
                                <button className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10">
                                    <Info size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Staff Section */}
                        <div className="bg-slate-900/50 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                            <div className="flex items-center gap-3 text-indigo-400 mb-2">
                                <Users size={20} />
                                <h4 className="text-lg font-black italic">צוות מחלקה ה'</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {WARD_E_STAFF.doctors.map((doc, i) => (
                                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-center">
                                        <span className="font-black text-white text-sm">{doc.name}</span>
                                        <span className="text-[10px] text-slate-500 font-bold uppercase">{doc.role}</span>
                                    </div>
                                ))}
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-center">
                                    <span className="font-black text-white text-sm">{WARD_E_STAFF.nursing.name}</span>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase">{WARD_E_STAFF.nursing.role}</span>
                                </div>
                            </div>
                        </div>

                        {/* Sovereign Rights Section */}
                        <div className="bg-emerald-900/10 border border-emerald-500/20 p-8 rounded-[2.5rem] space-y-4">
                            <div className="flex items-center gap-3 text-emerald-400">
                                <ShieldCheck size={20} />
                                <h4 className="text-lg font-black italic">מגילת זכויות הריבון</h4>
                            </div>
                            <p className="text-sm text-slate-400 font-bold leading-relaxed">
                                לכל ריבון במחלקה הזכות לקבל טיפול מכבד, לשמור על סודיות רפואית מלאה, ולבקש דעה נוספת בכל שלב.
                            </p>
                            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                <div className="space-y-1">
                                    <span className="block text-[10px] text-slate-500 font-black uppercase">פניות הציבור</span>
                                    <span className="block text-sm font-black text-white">{WARD_E_STAFF.rights.name}</span>
                                </div>
                                <button className="px-4 py-2 bg-emerald-500 text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-colors">
                                    צור קשר
                                </button>
                            </div>
                        </div>

                        {/* Voice Question CTA */}
                        <div
                            onClick={() => setView('ask')}
                            className="bg-indigo-600/20 border-2 border-dashed border-indigo-500/40 p-8 rounded-[3rem] flex flex-col items-center gap-6 cursor-pointer hover:bg-indigo-600/30 transition-all"
                        >
                            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                                <Activity className="text-white" size={32} />
                            </div>
                            <div className="text-center">
                                <h4 className="text-xl font-black italic">יש לך שאלה חופשית?</h4>
                                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-2 italic">לחץ כאן כדי לדבר איתי על הזכויות שלך</p>
                            </div>
                        </div>
                    </div>
                ) : view === 'detail' ? (
                    <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-700">
                        <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-[3rem] p-10 space-y-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-indigo-400">
                                    <Activity size={24} />
                                    <h4 className="text-xl font-black tracking-tighter italic">סיכום המפגש הקליני</h4>
                                </div>
                                <div className="bg-black/40 p-6 rounded-3xl border border-white/5 text-slate-300 font-mono text-xs leading-relaxed">
                                    {MOCK_CONSULTATION.rawResult}
                                </div>
                            </div>

                            {!decodedResult ? (
                                <button
                                    onClick={handleDecode}
                                    disabled={isDecoding}
                                    className="w-full bg-indigo-600 text-white py-8 rounded-[2rem] font-black text-xl shadow-[0_10px_0_rgb(67,56,202)] flex items-center justify-center gap-4 hover:brightness-110 active:translate-y-2 active:shadow-none transition-all"
                                >
                                    {isDecoding ? (
                                        <>
                                            <Sparkles className="animate-spin" />
                                            <span>מפענח שפה רפואית...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Link2 />
                                            <span>פענח ל"שפת ריבונית"</span>
                                        </>
                                    )}
                                </button>
                            ) : (
                                <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-[2.5rem] p-8 space-y-6 animate-in fade-in duration-1000">
                                    <div className="flex items-center gap-3 text-emerald-400">
                                        <Sparkles />
                                        <span className="text-[10px] font-black uppercase tracking-widest">ניתוח המלווה</span>
                                    </div>
                                    <div className="text-white font-bold leading-loose whitespace-pre-wrap italic">
                                        {decodedResult}
                                    </div>

                                    {/* Sovereign Recommendation Engine */}
                                    <div className="mt-12 pt-8 border-t border-white/10 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
                                        <div className="flex items-center gap-3 mb-6 text-indigo-400">
                                            <Zap size={20} className="animate-pulse" />
                                            <h5 className="text-lg font-black italic">המלצת המלווה: "מערכת אבטחה לנפש"</h5>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-white/5 border border-white/5 p-6 rounded-3xl hover:border-indigo-500/30 transition-all">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Lock className="text-blue-400" size={20} />
                                                    <span className="font-black text-white italic">הגנה כספית</span>
                                                </div>
                                                <p className="text-[11px] text-slate-400 font-bold leading-relaxed">
                                                    זיהינו פוטנציאל לסימפטומים של 'חוסר ויסות'. כדאי להפעיל הגנה על המשאבים הפיננסיים למשך 48 שעות.
                                                </p>
                                            </div>
                                            <div className="bg-white/5 border border-white/5 p-6 rounded-3xl hover:border-indigo-500/30 transition-all">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Activity className="text-emerald-400" size={20} />
                                                    <span className="font-black text-white italic">העוגן</span>
                                                </div>
                                                <p className="text-[11px] text-slate-400 font-bold leading-relaxed">
                                                    מומלץ להפעיל ניטור שינה רציף. מחסור בשינה זוהה כטריגר מרכזי בדיווחים קודמים.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setView('list')}
                                        className="text-emerald-500 font-black text-xs uppercase tracking-widest hover:underline mt-8 block"
                                    >
                                        חזרה לרשימה
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-12 animate-in zoom-in duration-500">
                        <div className="text-center space-y-8">
                            <h2 className="text-4xl font-black italic">שאלה לשיחה</h2>
                            <p className="text-slate-400 font-bold italic">לחץ על העיגול וספר לי מה הלב מרגיש או מה לא ברור לך.</p>
                        </div>

                        <div className="flex flex-col items-center gap-12">
                            <button
                                onClick={handleAskVoice}
                                className={`w-40 h-40 rounded-full flex items-center justify-center transition-all shadow-2xl ${isListening ? 'bg-red-600 animate-pulse scale-110' : 'bg-indigo-600'}`}
                            >
                                <Activity size={64} className="text-white" />
                            </button>

                            {question && (
                                <div className="w-full bg-white/5 p-8 rounded-[3rem] border border-white/10 italic">
                                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-4">מה שהבנתי ששאלת:</p>
                                    <p className="text-xl font-bold">"{question}"</p>
                                </div>
                            )}

                            {aiAnswer && (
                                <div className="w-full bg-indigo-600/20 p-10 rounded-[3.5rem] border-2 border-indigo-500 shadow-2xl relative overflow-hidden group">
                                    <div className={`absolute top-0 left-0 w-2 h-full bg-indigo-500 ${isSpeaking ? 'animate-pulse' : ''}`} />
                                    <div className="flex items-center gap-4 text-indigo-400 mb-6">
                                        <Sparkles />
                                        <span className="text-xs font-black uppercase tracking-widest">תשובת העוזר (מושמעת עכשיו)</span>
                                    </div>
                                    <p className="text-2xl font-black italic leading-loose">
                                        {aiAnswer}
                                    </p>
                                    <div className="mt-8 flex gap-4">
                                        <button
                                            onClick={() => speak(aiAnswer)}
                                            className="px-6 py-2 bg-indigo-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg"
                                        >
                                            שמע שוב
                                        </button>
                                        <button
                                            onClick={() => setView('list')}
                                            className="px-6 py-2 bg-white/5 text-slate-400 rounded-full font-black text-[10px] uppercase tracking-widest"
                                        >
                                            סימנתי, תודה
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setView('list')}
                            className="w-full py-4 text-slate-500 font-bold hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <ChevronLeft size={16} /> חזרה לרשימת הייעוצים
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ConsultationPortal;
