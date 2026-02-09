import React, { useState } from 'react';
import {
    FileText, ShieldCheck, Search, CloudLightning,
    Send, Mail, ClipboardCheck, Sparkles, Camera,
    ChevronRight, ArrowRight, Download, Eye, ExternalLink,
    ChevronLeft, Database, Building2, UserCircle
} from 'lucide-react';

interface Props {
    onBack: () => void;
}

const MedicalRecordsRoom: React.FC<Props> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'request' | 'sync' | 'decoder'>('request');
    const [isSyncing, setIsSyncing] = useState(false);
    const [isDecoding, setIsDecoding] = useState(false);
    const [showRequestPreview, setShowRequestPreview] = useState(false);
    const [formData, setFormData] = useState({
        fullName: 'עומרי לוי',
        idNumber: '123456789',
        requestDate: new Date().toLocaleDateString('he-IL'),
        type: 'summary'
    });

    const generateRequestText = () => {
        return `
לכבוד:
המזכירות הרפואית, מרכז בריאות הנפש שלוותה

הנדון: בקשה לקבלת העתק רשומה רפואית לפי חוק זכויות החולה, התשנ"ו-1996

אני החתום מטה, ${formData.fullName}, ת"ז ${formData.idNumber}, מבקש בזאת לקבל את העתק הרשומה הרפואית שלי.
המידע המבוקש: ${formData.type === 'summary' ? 'סיכום אשפוז, דוחות מעקב וסיכומי ביקור' : 'תיק רפואי מלא כולל בדיקות מעבדה ודוחות סוציאליים'}.

אבקש לקבל את החומר בפורמט דיגיטלי לכתובת המייל המעודכנת במערכת.

בכבוד רב,
${formData.fullName}
    `.trim();
    };

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            setActiveTab('decoder');
        }, 3000);
    };

    const handleDecode = () => {
        setIsDecoding(true);
        setTimeout(() => {
            setIsDecoding(false);
        }, 2500);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-assistant" dir="rtl">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ChevronLeft size={24} className="rotate-180" />
                        </button>
                        <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
                            <FileText size={32} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black italic tracking-tight">הכרטיס לחופש <span className="text-emerald-500">Records</span></h1>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Official Bureaucracy Hub</p>
                        </div>
                    </div>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase flex items-center gap-2 shadow-lg">
                        <ShieldCheck size={14} />
                        ריבונות מידע מלאה
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6 space-y-8">
                {/* Navigation Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {[
                        { id: 'request', label: 'בקשת מסמכים', icon: FileText },
                        { id: 'sync', label: 'סנכרון כללית', icon: Database },
                        { id: 'decoder', label: 'מפענח חכם', icon: Sparkles },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-black transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-[#1e40af] text-white shadow-xl translate-y-[-2px]' : 'bg-white text-slate-500 border border-slate-200'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content: Request */}
                {activeTab === 'request' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic">הזמנה בלחיצת כפתור</h2>
                                <p className="text-slate-500 font-medium">אנחנו ננסח עבורך את הבקשה הרשמית למזכירות שלוותה.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase mr-2">שם מלא</label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase mr-2">מספר ת"ז</label>
                                    <input
                                        type="text"
                                        value={formData.idNumber}
                                        onChange={e => setFormData({ ...formData, idNumber: e.target.value })}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-xs font-black text-slate-400 uppercase mr-2 mt-4">סוג המידע המבוקש</p>
                                <div className="grid grid-cols-1 gap-2">
                                    <button
                                        onClick={() => setFormData({ ...formData, type: 'summary' })}
                                        className={`p-4 rounded-2xl border-2 text-right font-bold transition-all ${formData.type === 'summary' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-100 text-slate-400'}`}
                                    >
                                        סיכומי אשפוז וביקור (מומלץ)
                                    </button>
                                    <button
                                        onClick={() => setFormData({ ...formData, type: 'full' })}
                                        className={`p-4 rounded-2xl border-2 text-right font-bold transition-all ${formData.type === 'full' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-100 text-slate-400'}`}
                                    >
                                        תיק רפואי מלא (כולל דוחות סוציאליים)
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowRequestPreview(true)}
                                className="w-full bg-[#1e40af] text-white py-6 rounded-3xl font-black text-xl shadow-xl hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                <ClipboardCheck size={28} />
                                צור בקשה רשמית
                            </button>
                        </div>

                        <div className="bg-slate-100 p-6 rounded-[2rem] border border-slate-200 flex items-center gap-4">
                            <div className="bg-white p-3 rounded-2xl text-blue-600 shadow-sm">
                                <Mail size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase">כתובת המזכירות</p>
                                <p className="text-sm font-bold text-slate-700 underline italic">office.sh@clalit.org.il</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Content: Sync */}
                {activeTab === 'sync' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom duration-500 text-center py-10">
                        <div className="w-24 h-24 bg-blue-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-lg">
                            <Database size={48} className={isSyncing ? 'animate-pulse' : ''} />
                        </div>
                        <h2 className="text-4xl font-black text-slate-800 tracking-tighter">סנכרון נתונים <span className="text-blue-600">כללית Online</span></h2>
                        <p className="text-xl text-slate-500 font-medium italic max-w-sm mx-auto">משיכה אוטומטית של סיכומי ביקור ישירות לתוך מרחב הריבונות שלך.</p>

                        <div className="pt-10">
                            <button
                                onClick={handleSync}
                                disabled={isSyncing}
                                className={`px-12 py-8 rounded-[3rem] font-black text-2xl transition-all shadow-2xl relative overflow-hidden group ${isSyncing ? 'bg-slate-200 text-slate-400' : 'bg-[#1e40af] text-white hover:bg-blue-700'}`}
                            >
                                {isSyncing ? (
                                    <span className="flex items-center gap-4">
                                        סורק שרתים... <CloudLightning className="animate-spin" />
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-4">
                                        התחבר וסנכרן <ArrowRight className="rotate-180 group-hover:translate-x-2 transition-transform" />
                                    </span>
                                )}
                                <div className="absolute top-0 right-0 w-2 h-full bg-blue-400/30 skew-x-12" />
                            </button>
                        </div>

                        <div className="flex justify-center gap-10 pt-10 grayscale opacity-40">
                            <img src="https://upload.wikimedia.org/wikipedia/he/thumb/4/4e/Clalit_Health_Services_Logo.svg/1200px-Clalit_Health_Services_Logo.svg.png" className="h-8 object-contain" alt="Clalit" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Ministry_of_Health_%28Israel%29.svg" className="h-8 object-contain" alt="Israel Health Ministry" />
                        </div>
                    </div>
                )}

                {/* Tab Content: Decoder */}
                {activeTab === 'decoder' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
                        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="p-5 bg-purple-50 text-purple-600 rounded-[2.5rem]">
                                    <Sparkles size={40} />
                                </div>
                                <div>
                                    <h2 className="text-4xl font-black text-slate-800 tracking-tighter">המפענח החכם (AI)</h2>
                                    <p className="text-slate-500 font-medium italic">תרגום שפה רפואית לשפה של בני אדם.</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 border-4 border-dashed border-slate-200 p-12 rounded-[3.5rem] text-center space-y-4 group hover:border-purple-300 transition-all cursor-pointer">
                                <Camera size={60} className="mx-auto text-slate-300 group-hover:text-purple-400 transition-colors" />
                                <p className="text-xl font-bold text-slate-400">צלם או העלה סיכום רפואי</p>
                            </div>

                            <div className="bg-purple-600/5 p-8 rounded-[3rem] border border-purple-500/10 space-y-6 relative overflow-hidden">
                                <div className="flex items-center justify-between">
                                    <p className="text-[10px] font-black uppercase text-purple-600 tracking-widest">דוגמה לפיענוח (מתוך סיכום אחרון):</p>
                                    <div className="text-[10px] font-black bg-purple-100 text-purple-700 px-3 py-1 rounded-full uppercase">Stable Progress</div>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm">
                                        <p className="text-xs font-black text-slate-400 uppercase mb-2">מה כתבו במקור:</p>
                                        <p className="font-bold text-slate-600 italic">"המטופל מציג אפקט צמצום, תובנה חלקית, התאמה חלקית לטיפול התרופתי."</p>
                                    </div>

                                    <div className="bg-purple-600 p-6 rounded-3xl shadow-xl">
                                        <p className="text-xs font-black text-white/60 uppercase mb-2">מה זה אומר בשבילך (המלווה):</p>
                                        <p className="font-bold text-white text-lg">"עומרי, הרופאה שמה לב שאתה פחות מחייך כרגע, וזה בסדר. היא גם חושבת שכדאי לנו לעבוד יחד על להבין למה התרופות קצת מפחידות אותך, כדי שתחזור להרגיש בשליטה."</p>
                                    </div>
                                </div>
                                <CloudLightning className="absolute -left-10 -bottom-10 text-purple-100 rotate-12" size={200} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Preview Overlay */}
            {showRequestPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowRequestPreview(false)} />
                    <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 relative z-10 animate-in zoom-in duration-300">
                        <div className="flex justify-between items-start mb-8">
                            <h2 className="text-3xl font-black text-slate-800">תצוגה מקדימה</h2>
                            <button onClick={() => setShowRequestPreview(false)} className="p-2 hover:bg-slate-100 rounded-full">
                                <ArrowRight size={24} />
                            </button>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-3xl text-sm font-sans whitespace-pre-wrap text-slate-700 border border-slate-200 leading-relaxed shadow-inner max-h-[400px] overflow-y-auto">
                            {generateRequestText()}
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button className="flex-1 bg-slate-900 text-white py-5 rounded-3xl font-black text-lg shadow-xl flex items-center justify-center gap-3">
                                <Download size={20} /> הורד כ-PDF
                            </button>
                            <button
                                onClick={() => {
                                    const mailto = `mailto:office.sh@clalit.org.il?subject=בקשת רשומה רפואית - ${formData.fullName}&body=${encodeURIComponent(generateRequestText())}`;
                                    window.location.href = mailto;
                                }}
                                className="flex-1 bg-[#1e40af] text-white py-5 rounded-3xl font-black text-lg shadow-xl flex items-center justify-center gap-3"
                            >
                                <Send size={20} /> שלח במייל
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicalRecordsRoom;
