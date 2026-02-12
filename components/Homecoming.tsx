import React, { useState } from 'react';
import {
    Heart, MessageSquare, Sparkles,
    ChevronLeft, ArrowRight, Star,
    Smile, Sun, Shield
} from 'lucide-react';

const ALCHEMY_DICTIONARY: Record<string, { spark: string, alchemy: string }> = {
    'מפחד': {
        spark: 'הלב שלך שומר עליך.',
        alchemy: 'זה בסדר לפחד לפעמים. הפחד אומר שהלב שלך רוצה שתהיה בטוח. בוא ננשום ונזכור שאתה גיבור.'
    },
    'מרביץ': {
        spark: 'כוח גדול שרוצה לצאת.',
        alchemy: 'לפעמים יש ידיים שרוצות להוציא כוח. בוא נכוון את הכוח הזה למשהו בונה, כמו לצייר או לסדר, ולא כדי להכאיב.'
    },
    'עצוב': {
        spark: 'הנשמה שלך מחפשת חבוק.',
        alchemy: 'כשעצוב לנו זה כמו ענן שמכסה את השמש. הענן יעבור והשמש שלך תחזור להאיר. אתה לא לבד.'
    },
    'משיח': {
        spark: 'רצון לעזור לכולם.',
        alchemy: 'זה נפלא שאתה רוצה להציל את העולם! הדרך הכי טובה להתחיל היא להיות מלך על עצמך ולעשות דברים קטנים וטובים היום.'
    }
};

const Homecoming: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [phase, setPhase] = useState<1 | 2 | 3>(1);
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
    const [inputText, setInputText] = useState('');
    const [points, setPoints] = useState(0);

    const handleSend = () => {
        if (!inputText.trim()) return;
        const userMsg = inputText;
        setMessages([...messages, { role: 'user', text: userMsg }]);
        setInputText('');

        let response = 'אני מקשיב לך. אתה עושה עבודה מעולה.';
        for (const [key, val] of Object.entries(ALCHEMY_DICTIONARY)) {
            if (userMsg.includes(key)) {
                response = val.alchemy;
                break;
            }
        }

        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'bot', text: response }]);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-blue-50 text-slate-900 font-assistant p-6 rtl" dir="rtl">
            <header className="flex justify-between items-center mb-12">
                <button onClick={onBack} className="p-3 bg-white shadow-md rounded-full"><ChevronLeft /></button>
                <h1 className="text-3xl font-black text-blue-900">חוזרים הביתה</h1>
                <div className="bg-amber-100 px-4 py-2 rounded-full flex items-center gap-2">
                    <Star className="text-amber-500" size={18} />
                    <span className="font-bold">{points} נקודות אור</span>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="flex gap-2 mb-12">
                {[1, 2, 3].map(p => (
                    <div key={p} className={`h-3 flex-1 rounded-full ${phase >= p ? 'bg-blue-600' : 'bg-blue-200'}`} />
                ))}
            </div>

            <main className="max-w-xl mx-auto space-y-8">
                {phase === 1 && (
                    <div className="text-center space-y-12 animate-in fade-in slide-in-from-bottom">
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-t-8 border-blue-600">
                            <h2 className="text-2xl font-black mb-6">משהו קטן וטוב להתחיל איתו</h2>
                            <p className="text-5xl font-serif italic text-blue-800 leading-tight">"כל העולם כולו גשר צר מאוד, והעיקר לא לפחד כלל."</p>
                        </div>
                        <button
                            onClick={() => setPhase(2)}
                            className="bg-blue-600 text-white px-12 py-6 rounded-full text-2xl font-black shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-4 w-full"
                        >
                            אני מוכן להמשיך <ArrowRight />
                        </button>
                    </div>
                )}

                {phase === 2 && (
                    <div className="space-y-6 animate-in fade-in">
                        <div className="bg-white p-6 rounded-[2rem] shadow-lg h-[400px] overflow-y-auto space-y-4">
                            <div className="bg-blue-100 p-4 rounded-2xl rounded-tr-none">
                                <p className="font-bold">שלום! אני כאן כדי לדבר איתך. איך אתה מרגיש עכשיו? אתה יכול לספר לי הכל.</p>
                            </div>
                            {messages.map((m, i) => (
                                <div key={i} className={`p-4 rounded-2xl ${m.role === 'user' ? 'bg-blue-600 text-white mr-auto rounded-tl-none' : 'bg-slate-100 ml-auto rounded-tr-none'}`}>
                                    <p className="font-bold">{m.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                value={inputText}
                                onChange={e => setInputText(e.target.value)}
                                placeholder="כתוב כאן משהו..."
                                className="flex-1 p-5 rounded-[2rem] border-2 border-blue-100 outline-none focus:border-blue-400 font-bold"
                            />
                            <button onClick={handleSend} className="bg-blue-600 text-white p-5 rounded-full shadow-lg"><Sparkles /></button>
                        </div>
                        <button onClick={() => setPhase(3)} className="text-blue-600 font-black text-center w-full py-4">סיימתי לדבר, בוא נעבור למשימות</button>
                    </div>
                )}

                {phase === 3 && (
                    <div className="space-y-8 animate-in fade-in">
                        <h2 className="text-3xl font-black text-center">משימות טובות להיום</h2>
                        {[
                            { id: 1, text: 'להגיד תודה למישהו.', icon: Smile },
                            { id: 2, text: 'לשתות כוס מים לאט.', icon: Sun },
                            { id: 3, text: 'לסדר את המיטה שלי.', icon: Shield }
                        ].map(m => (
                            <button
                                key={m.id}
                                onClick={() => { setPoints(prev => prev + 10); alert('כל הכבוד! קיבלת 10 נקודות אור'); }}
                                className="w-full bg-white p-8 rounded-[2rem] shadow-md border-2 border-blue-50 hover:border-blue-400 transition-all flex items-center gap-6"
                            >
                                <div className="p-4 bg-blue-100 rounded-2xl text-blue-600"><m.icon /></div>
                                <span className="text-xl font-black">{m.text}</span>
                            </button>
                        ))}
                        <button
                            onClick={onBack}
                            className="w-full bg-slate-900 text-white py-6 rounded-full text-2xl font-black shadow-xl"
                        >
                            חזרה למסך הראשי
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Homecoming;
