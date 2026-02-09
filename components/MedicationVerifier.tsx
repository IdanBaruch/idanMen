import React, { useState, useRef } from 'react';
import { Camera, Mic, CheckCircle2, X, Pill, ChevronRight } from 'lucide-react';

interface VerificationResult {
    isSwallowed: boolean;
    moodScore: number; // 0-100 (מחליף את הדופמין)
    voiceAnalysis: string;
}

const MedicationVerifier: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [step, setStep] = useState<'med_select' | 'camera' | 'voice' | 'analyzing' | 'result'>('med_select');
    const [selectedMed, setSelectedMed] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // מדמה הפעלת מצלמה (במציאות דורש אישורי דפדפן)
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera access denied", err);
        }
    };

    React.useEffect(() => {
        if (step === 'camera') startCamera();
        return () => {
            // ניקוי המצלמה ביציאה
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [step]);

    const handleVerifySwallow = () => {
        // כאן ה-AI אמור לנתח את הוידאו
        setStep('voice');
    };

    const handleVoiceRecord = () => {
        setIsRecording(true);
        // הקלטה למשך 3 שניות
        setTimeout(() => {
            setIsRecording(false);
            setStep('analyzing');
            analyzeData();
        }, 3000);
    };

    const analyzeData = () => {
        // סימולציה של פנייה ל-Gemini לניתוח הקול והוידאו
        setTimeout(() => {
            setStep('result');
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/95 z-[9999] flex items-center justify-center p-4 font-assistant" dir="rtl">
            <div className="bg-white rounded-[2rem] max-w-md w-full overflow-hidden shadow-2xl relative animate-in zoom-in duration-300">
                <button onClick={onClose} className="absolute top-4 left-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 z-50 transition-colors">
                    <X className="w-5 h-5 text-slate-600" />
                </button>

                {/* שלב 0: בחירת תרופה */}
                {step === 'med_select' && (
                    <div className="p-8 text-center space-y-8 animate-in slide-in-from-bottom duration-500">
                        <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto text-orange-600">
                            <Pill size={40} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-800 tracking-tighter">איזו תרופה לוקחים?</h2>
                            <p className="text-slate-500 font-medium">בחר מהרשימה כדי להתחיל באימות</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { class: 'נוגדי פסיכוזה', meds: ['רספרידל', 'קלוזאפין', 'סרוקהוול', 'הלופרידול'] },
                                { class: 'נוגדי דיכאון/חרדה', meds: ['ציפרלקס', 'לוסטרל', 'ויפאקס'] },
                                { class: 'מייצבי מצב רוח', meds: ['ליתיום', 'דפלפט'] }
                            ].map(group => (
                                <div key={group.class} className="space-y-2">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right mr-2">{group.class}</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {group.meds.map(med => (
                                            <button
                                                key={med}
                                                onClick={() => { setSelectedMed(med); setStep('camera'); }}
                                                className={`p-4 text-right bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-sm hover:border-orange-500 hover:bg-orange-50 transition-all flex justify-between items-center group ${selectedMed === med ? 'border-orange-500 bg-orange-50' : ''}`}
                                            >
                                                {med}
                                                <ChevronRight size={14} className="text-slate-300 group-hover:text-orange-500 transition-colors" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => { setSelectedMed('אחר'); setStep('camera'); }}
                                className="w-full p-4 mt-2 text-center bg-white border-2 border-dashed border-slate-200 rounded-2xl font-bold text-slate-400 hover:border-orange-300 hover:text-orange-500 transition-all"
                            >
                                + תרופה אחרת
                            </button>
                        </div>
                    </div>
                )}

                {/* שלב 1: אימות ויזואלי */}
                {step === 'camera' && (
                    <div className="p-6 text-center space-y-6">
                        <h2 className="text-2xl font-black text-slate-800">אימות נטילה (vDOT)</h2>
                        <p className="text-slate-500 font-medium">הצג את הכדור למצלמה ובלע אותו מול המסך.</p>

                        <div className="relative aspect-square bg-slate-900 rounded-3xl overflow-hidden mx-auto border-4 border-orange-500 shadow-xl">
                            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
                            <div className="absolute inset-0 border-[3px] border-white/30 rounded-3xl m-4 pointer-events-none"></div>
                            <div className="absolute bottom-4 left-0 right-0 text-white/70 text-xs font-mono">REC ●</div>
                        </div>

                        <button
                            onClick={handleVerifySwallow}
                            className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg active:scale-95"
                        >
                            <Camera className="w-5 h-5" />
                            אישרתי נטילה
                        </button>
                    </div>
                )}

                {/* שלב 2: אימות קולי (רגשי) */}
                {step === 'voice' && (
                    <div className="p-6 text-center space-y-8 py-12">
                        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto animate-pulse">
                            <Mic className="w-10 h-10 text-blue-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800">בדיקת חיוניות (Vitality)</h2>
                            <p className="text-slate-500 mt-2 font-medium">אמור בקול ברור:</p>
                            <p className="text-xl font-bold text-blue-600 mt-2">"לקחתי את התרופה ואני מרגיש טוב"</p>
                        </div>

                        <button
                            onClick={handleVoiceRecord}
                            disabled={isRecording}
                            className={`w-full py-6 rounded-2xl font-black text-xl transition-all shadow-xl ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
                                }`}
                        >
                            {isRecording ? 'מקליט...' : 'לחץ להקלטה'}
                        </button>
                    </div>
                )}

                {/* שלב 3: ניתוח */}
                {step === 'analyzing' && (
                    <div className="p-12 text-center space-y-8 py-20">
                        <div className="relative">
                            <div className="animate-spin w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-orange-100 rounded-full animate-ping opacity-20"></div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">ה-AI מנתח מדדים...</h3>
                            <div className="bg-slate-900 rounded-2xl p-4 text-left font-mono text-[10px] text-emerald-400 space-y-1 h-32 overflow-hidden shadow-inner">
                                <p className="animate-pulse">{"[" + new Date().toLocaleTimeString() + "] Initializing Neural Engine..."}</p>
                                <p className="delay-75 animate-in fade-in slide-in-from-bottom-1 duration-500">{"[" + new Date().toLocaleTimeString() + "] Scanning image for tablet geometry..."}</p>
                                <p className="delay-150 animate-in fade-in slide-in-from-bottom-1 duration-500">{"[" + new Date().toLocaleTimeString() + "] Tablet: " + selectedMed + " confirmed."}</p>
                                <p className="delay-300 animate-in fade-in slide-in-from-bottom-1 duration-500">{"[" + new Date().toLocaleTimeString() + "] Analyzing facial micro-expressions..."}</p>
                                <p className="delay-500 animate-in fade-in slide-in-from-bottom-1 duration-500">{"[" + new Date().toLocaleTimeString() + "] Tracking swallow motion (vDOT)..."}</p>
                                <p className="delay-700 animate-in fade-in slide-in-from-bottom-1 duration-500 text-blue-400">{"[" + new Date().toLocaleTimeString() + "] Vitality Score calculation in progress..."}</p>
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium">בודק אימות בליעה וניתוח טונאליות קול (Vitality Score)</p>
                        </div>
                    </div>
                )}

                {/* שלב 4: תוצאות */}
                {step === 'result' && (
                    <div className="bg-emerald-50 p-8 text-center h-full flex flex-col justify-center items-center space-y-8 animate-in zoom-in duration-500">
                        <div className="w-28 h-28 bg-emerald-100 rounded-full flex items-center justify-center animate-bounce shadow-xl border-4 border-white">
                            <CheckCircle2 className="w-14 h-14 text-emerald-600" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-4xl font-black text-emerald-800">הנטילה אושרה!</h2>
                            <p className="text-emerald-600 font-bold text-lg">הדיווח נקלט במערכת הצוות הרפואי</p>
                        </div>

                        <div className="bg-white p-6 rounded-3xl w-full shadow-lg border border-emerald-100">
                            <div className="flex justify-between items-end mb-2">
                                <p className="text-xs text-slate-400 font-black uppercase tracking-wider">מדד חיוניות (Vitality Score)</p>
                                <span className="text-emerald-600 font-black text-2xl">84/100</span>
                            </div>

                            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full w-[84%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            </div>
                            <p className="text-right text-[10px] text-slate-400 mt-2 font-bold">ניתוח קול מעיד על מצב יציב ומאוזן.</p>
                        </div>

                        <button onClick={onClose} className="text-emerald-700 font-bold underline hover:text-emerald-900 transition-colors">
                            חזור למסך הבית
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicationVerifier;
