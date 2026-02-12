
import React, { useState, useEffect, useRef } from 'react';
import {
    Mic, Megaphone, ShieldAlert, Heart, User, FileText, ChevronLeft,
    Volume2, ShieldCheck, Zap, MessageSquare, Send, RefreshCw, X
} from 'lucide-react';

const COMMON_THOUGHTS = [
    { id: 't1', text: 'כולם מסתכלים עליי', reframe: 'אנשים שקועים בעצמם ובטלפונים שלהם. תחושת החשיפה היא סימפטום, לא מציאות.' },
    { id: 't2', text: 'הם צוחקים עליי', reframe: 'הצחוק ששמעת לא קשור אליך. אנשים צוחקים משיחות פרטיות. אתה בטוח.' },
    { id: 't3', text: 'שומע קול שמאיים עליי', reframe: 'זהו קול פנימי הנובע מפעילות חשמלית במוח. הוא לא אמיתי ואין לו כוח עליך.' },
    { id: 't4', text: 'מרגיש שעוקבים אחריי', reframe: 'זו תחושת רדיפה (Paranoia). המציאות היא שאתה פשוט הולך ברחוב כמו כולם.' },
];

const VoiceProxy: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
    const [view, setView] = useState<'main' | 'translator'>('main'); // 'main' = Dignity Scripts, 'translator' = Thought Reframing
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [activeScript, setActiveScript] = useState<string | null>(null);
    const [messages, setMessages] = useState<Array<{ id: string, text: string, type: 'user' | 'ai' }>>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const DIGNITY_SCRIPTS = [
        {
            id: 's1',
            title: 'הסבר לצוות רפואי',
            description: 'אני חווה משבר קוגניטיבי, נא לקרוא את הכרטיס שלי.',
            voiceText: 'שלום, אני חווה כרגע מצב של עומס קוגניטיבי משמעותי. אני מבקש שתסתכלו על כרטיס המטופל שלי המופיע במסך. אני זקוק לסביבה שקטה וליחס סבלני עד שהמערכת שלי תתייצב.',
            icon: FileText,
            color: 'bg-indigo-500'
        },
        {
            id: 's2',
            title: 'בקשת שקט',
            description: 'אני מרגיש מוצף וזקוק למרחב בטוח.',
            voiceText: 'אני מרגיש הצפה חושית כרגע. בבקשה תנו לי כמה דקות של שקט במקום רגוע. אני מנסה לווסת את עצמי בעזרת האפליקציה.',
            icon: ShieldAlert,
            color: 'bg-rose-500'
        },
        {
            id: 's3',
            title: 'בדיקת מציאות',
            description: 'זיהוי ה-AI שלי מופעל, אני בטוח.',
            voiceText: 'הכל בסדר, אני מפעיל כרגע את הגנות המציאות שלי. אני מבין שמה שאני חווה כרגע הוא חלק מהמחלה, ואני משתמש ב-Co-Pilot שלי כדי להתעגן במציאות.',
            icon: Zap,
            color: 'bg-cyan-500'
        }
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSpeak = (script: any) => {
        setIsSpeaking(true);
        setActiveScript(script.id);

        const utterance = new SpeechSynthesisUtterance(script.voiceText);
        utterance.lang = 'he-IL';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;

        window.speechSynthesis.speak(utterance);

        utterance.onend = () => {
            setIsSpeaking(false);
            setActiveScript(null);
        };
    };

    const handleThoughtSubmit = (text: string) => {
        if (!text.trim()) return;

        // Add user message
        const userMsgId = Date.now().toString();
        setMessages(prev => [...prev, { id: userMsgId, text, type: 'user' }]);
        setInputText('');
        setIsTyping(true);

        // Find AI response (Simulated Logic)
        const matched = COMMON_THOUGHTS.find(t => text.includes(t.text));
        const aiResponse = matched
            ? matched.reframe
            : "אני מבין שאתה מרגיש ככה. זכור שזוהי מחשבה חולפת ולא עובדה. נסה לקחת נשימה עמוקה ולהתמקד במשהו פיזי סביבך.";

        // Simulate delay like real AI
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: aiResponse, type: 'ai' }]);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full font-assistant relative bg-[#0f172a]" dir="rtl">
            {/* Chameleon Top Bar */}
            <div className="flex items-center justify-between p-6 bg-white/5 border-b border-white/10">
                <button onClick={onBack} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                    <ChevronLeft size={20} />
                </button>

                {/* Mode Switcher */}
                <div className="flex bg-black/20 p-1 rounded-xl">
                    <button
                        onClick={() => setView('main')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${view === 'main' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        כבוד (קול)
                    </button>
                    <button
                        onClick={() => setView('translator')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${view === 'translator' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        מחשבות (טקסט)
                    </button>
                </div>

                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
                    <ShieldCheck size={20} />
                </div>
            </div>

            {/* ---> VIEW: VOICE PROXY (Original) <--- */}
            {view === 'main' && (
                <div className="flex-1 overflow-y-auto p-6 space-y-6 animate-in fade-in duration-500">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-black italic tracking-tighter text-white">הקול שלך. הריבונות שלך.</h2>
                        <p className="text-xs text-indigo-300 font-medium mt-1">לחץ על כרטיס כדי שהמערכת תדבר בשמך.</p>
                    </div>

                    <div className="space-y-4">
                        {DIGNITY_SCRIPTS.map((script) => (
                            <button
                                key={script.id}
                                onClick={() => handleSpeak(script)}
                                className={`w-full group relative p-6 rounded-[2rem] border-2 transition-all duration-300 flex items-center gap-6 text-right ${activeScript === script.id
                                    ? 'bg-white border-white scale-95 shadow-[0_0_50px_rgba(255,255,255,0.4)]'
                                    : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
                                    }`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeScript === script.id ? 'bg-black text-white' : `${script.color} text-white shadow-lg`}`}>
                                    {activeScript === script.id ? <Volume2 size={24} className="animate-pulse" /> : <script.icon size={24} />}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`text-lg font-black italic ${activeScript === script.id ? 'text-black' : 'text-white'}`}>{script.title}</h4>
                                    <p className={`text-xs font-medium mt-1 ${activeScript === script.id ? 'text-slate-600' : 'text-slate-400'}`}>{script.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ---> VIEW: THOUGHT TRANSLATOR (New Hybrid Interface) <--- */}
            {view === 'translator' && (
                <div className="flex-1 flex flex-col animate-in slide-in-from-right duration-500 relative">

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-center opacity-50 space-y-4">
                                <MessageSquare size={60} className="text-slate-600" />
                                <p className="text-slate-400 text-sm max-w-xs">
                                    המרחב הזה בטוח. <br /> כתוב מחשבה או בחר מהרשימה, וה-AI, יעזור לך לפרש אותה מחדש.
                                </p>
                            </div>
                        )}

                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${msg.type === 'user'
                                    ? 'bg-slate-800 text-white rounded-tr-none border border-slate-700'
                                    : 'bg-emerald-600 text-white rounded-tl-none shadow-emerald-900/20'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-end">
                                <div className="bg-emerald-600/50 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestions (Carousel) */}
                    <div className="p-4 bg-black/20 overflow-x-auto whitespace-nowrap no-scrollbar flex gap-3 border-t border-white/5">
                        {COMMON_THOUGHTS.map(t => (
                            <button
                                key={t.id}
                                onClick={() => handleThoughtSubmit(t.text)}
                                className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-full text-xs font-bold transition-transform hover:scale-105"
                            >
                                {t.text}
                            </button>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white/5 border-t border-white/10 flex items-center gap-3">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="כתוב מחשבה כאן..."
                            className="flex-1 bg-black/40 border border-white/10 rounded-full px-6 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-600 font-medium"
                            onKeyPress={(e) => e.key === 'Enter' && handleThoughtSubmit(inputText)}
                        />
                        <button
                            onClick={() => handleThoughtSubmit(inputText)}
                            disabled={!inputText.trim()}
                            className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-500 transition-all shadow-lg"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Global Speaking Overlay */}
            {isSpeaking && (
                <div className="absolute inset-0 bg-indigo-900/90 z-[100] flex flex-col items-center justify-center text-center p-8 animate-in fade-in">
                    <div className="w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center animate-[ping_2s_infinite]">
                        <Volume2 size={64} className="text-white" />
                    </div>
                    <h3 className="text-3xl font-black italic text-white mt-8 mb-2">מדבר בשמך...</h3>
                    <p className="text-indigo-200 font-medium">הקול היציב שלך משדר כעת לסביבה.</p>
                </div>
            )}
        </div>
    );
};

export default VoiceProxy;
