import React, { useState, useEffect, useRef } from 'react';
import {
    Mic, StopCircle, Book, Sparkles,
    ChevronLeft, Save, Trash2,
    MessageSquare, Star, Waves
} from 'lucide-react';

interface Entry {
    id: string;
    date: string;
    rawText: string;
    refinedText: string;
}

const AutoScribe: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showJournal, setShowJournal] = useState(false);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [currentRefined, setCurrentRefined] = useState('');

    const handleStartRecording = () => {
        setIsRecording(true);
        setTranscription('');
        setCurrentRefined('');
        setTimeout(() => setTranscription('היה לי קצת קשה היום, הרגשתי שאין לי כוח לכלום...'), 3000);
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        setIsProcessing(true);

        setTimeout(() => {
            setCurrentRefined('למרות שהיה לי קשה, אני יודע שאני חזק ויכול לנצח כל דבר. מחר יהיה יום חדש וטוב יותר.');
            setIsProcessing(false);
        }, 3000);
    };

    const saveEntry = () => {
        const newEntry: Entry = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('he-IL'),
            rawText: transcription,
            refinedText: currentRefined
        };
        setEntries([newEntry, ...entries]);
        setCurrentRefined('');
        setTranscription('');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-assistant rtl" dir="rtl">

            <header className="p-6 flex justify-between items-center bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2"><ChevronLeft /></button>
                    <h1 className="text-2xl font-black italic">היומן הקסום שלי</h1>
                </div>
                <button
                    onClick={() => setShowJournal(!showJournal)}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 rounded-full font-black text-xs"
                >
                    <Book size={16} />
                    ספר הניצחונות
                </button>
            </header>

            <main className="max-w-4xl mx-auto p-6 space-y-12 py-20">
                {!showJournal ? (
                    <div className="flex flex-col items-center space-y-12">

                        <div className="relative">
                            <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-600 animate-pulse scale-110 shadow-[0_0_50px_rgba(220,38,38,0.5)]' : 'bg-blue-600 shadow-2xl'}`}>
                                <button
                                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                                    className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20"
                                >
                                    {isRecording ? <StopCircle size={64} /> : <Mic size={64} />}
                                </button>
                            </div>
                            {isRecording && <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-black text-red-500 animate-bounce">אני מקשיב לך...</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 min-h-[200px]">
                                <h3 className="text-slate-400 font-black mb-4 flex items-center gap-2"><MessageSquare size={16} /> המילים שאמרתי:</h3>
                                <p className="text-xl italic font-bold text-slate-300">{transcription || "לחץ על המיקרופון וספר לי מה עובר עליך..."}</p>
                            </div>

                            <div className={`bg-blue-600/10 p-8 rounded-[2.5rem] border-2 border-blue-500/30 min-h-[200px] transition-all ${currentRefined || isProcessing ? 'opacity-100' : 'opacity-20'}`}>
                                <h3 className="text-blue-400 font-black mb-4 flex items-center gap-2"><Sparkles size={16} /> הסיפור היפה שלי:</h3>
                                {isProcessing ? (
                                    <p className="animate-pulse font-black italic">הופך את המילים לזהב...</p>
                                ) : currentRefined ? (
                                    <div className="space-y-6">
                                        <p className="text-xl font-black italic">"{currentRefined}"</p>
                                        <button onClick={saveEntry} className="w-full bg-blue-600 py-3 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl"><Save size={18} /> שמור לספר</button>
                                    </div>
                                ) : (
                                    <p className="text-slate-600 italic">כאן יופיע הסיפור היפה שנגלה ביחד.</p>
                                )}
                            </div>
                        </div>

                        {!isRecording && !currentRefined && (
                            <div className="bg-blue-600/20 px-8 py-4 rounded-full flex items-center gap-3 text-blue-400 font-black">
                                <Waves size={20} /> יהונתן, אל תפחד. בוא נהפוך את המחשבות שלך למשהו טוב.
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-8 animate-in slide-in-from-bottom">
                        <h2 className="text-4xl font-black italic text-blue-400 border-b-4 border-blue-600 pb-2 w-fit">ספר הניצחונות שלי</h2>
                        <div className="space-y-6">
                            {entries.length > 0 ? entries.map(e => (
                                <div key={e.id} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 space-y-4">
                                    <div className="flex justify-between items-center text-xs font-black text-slate-500">
                                        <span>{e.date}</span>
                                        <Star size={16} className="text-amber-500" />
                                    </div>
                                    <p className="text-2xl font-black italic">"{e.refinedText}"</p>
                                    <div className="pt-4 border-t border-white/5 mt-4">
                                        <p className="text-xs text-slate-500 italic">מה שאמרתי בהתחלה: "{e.rawText}"</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-20 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/10">
                                    <p className="text-slate-500 font-black italic">הספר עדיין ריק. רוצה לכתוב את הדף הראשון?</p>
                                    <button onClick={() => setShowJournal(false)} className="mt-6 bg-blue-600 px-8 py-3 rounded-full font-black shadow-xl">להתחיל לכתוב</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

        </div>
    );
};

export default AutoScribe;
