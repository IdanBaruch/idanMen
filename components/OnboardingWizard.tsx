import React, { useState } from 'react';
import { useSettings, UserPersona, ReligiousLevel } from '../contexts/SettingsContext';
import { Shield, Users, Activity, BookOpen, Heart, Globe, CheckCircle2, ArrowRight } from 'lucide-react';

const OnboardingWizard: React.FC = () => {
    const { setUserPersona, setReligiousLevel, completeOnboarding } = useSettings();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedPersona, setSelectedPersona] = useState<UserPersona>(null);
    const [selectedReligion, setSelectedReligion] = useState<ReligiousLevel>(null);

    const handlePersonaSelect = (persona: UserPersona) => {
        setSelectedPersona(persona);
        setTimeout(() => setStep(2), 300);
    };

    const handleReligionSelect = (level: ReligiousLevel) => {
        setSelectedReligion(level);
        setTimeout(() => setStep(3), 300);
    };

    const handleComplete = () => {
        if (selectedPersona && selectedReligion) {
            setUserPersona(selectedPersona);
            setReligiousLevel(selectedReligion);
            completeOnboarding();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col items-center justify-center font-assistant p-6" dir="rtl">

            {/* Progress Bar */}
            <div className="w-full max-w-md h-2 bg-slate-200 rounded-full mb-12 overflow-hidden">
                <div
                    className="h-full bg-blue-600 transition-all duration-500 ease-out"
                    style={{ width: `${(step / 3) * 100}%` }}
                />
            </div>

            <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl text-center animate-in slide-in-from-bottom-10 duration-700 border border-slate-100">

                {step === 1 && (
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">ברוכים הבאים למערכת שלוותה</h1>
                            <p className="text-xl text-slate-500 font-medium">כדי להתאים את המערכת בדיוק אליך,<br />אנחנו צריכים להבין איך נראה היום-יום שלך.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button onClick={() => handlePersonaSelect('private')} className="p-6 rounded-3xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all group text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform text-blue-600">
                                    <Shield size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">טיפול פרטי</h3>
                                    <p className="text-sm text-slate-400 mt-2 leading-tight">אני מתפקד ועובד, צריך תמיכה דיסקרטית בין הפגישות.</p>
                                </div>
                            </button>

                            <button onClick={() => handlePersonaSelect('post_hospital')} className="p-6 rounded-3xl border-2 border-slate-100 hover:border-red-500 hover:bg-red-50 transition-all group text-center space-y-4">
                                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform text-red-600">
                                    <Activity size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">בוגר אשפוז</h3>
                                    <p className="text-sm text-slate-400 mt-2 leading-tight">השתחררתי לאחרונה, אני צריך עוגן חזק כדי לא ליפול שוב.</p>
                                </div>
                            </button>

                            <button onClick={() => handlePersonaSelect('community')} className="p-6 rounded-3xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all group text-center space-y-4">
                                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform text-emerald-600">
                                    <Users size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">בקהילה</h3>
                                    <p className="text-sm text-slate-400 mt-2 leading-tight">אני רואה רופא פעם ב-3 חודשים, צריך מישהו שישמור עלי.</p>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900">טוגל האמת</h2>
                            <p className="text-lg text-slate-500 font-medium">המערכת יודעת לדבר בשתי שפות.<br />מה השפה שהלב שלך מבין?</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
                            <button onClick={() => handleReligionSelect('secular')} className="p-8 rounded-3xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group flex flex-col items-center gap-4">
                                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform text-indigo-600">
                                    <Globe size={40} />
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold text-xl text-slate-800">שפה אוניברסלית</h3>
                                    <p className="text-slate-400 mt-2">פסיכולוגיה, קשיבות, אסטרטגיות התמודדות.</p>
                                </div>
                            </button>

                            <button onClick={() => handleReligionSelect('traditional')} className="p-8 rounded-3xl border-2 border-slate-100 hover:border-amber-500 hover:bg-amber-50 transition-all group flex flex-col items-center gap-4">
                                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform text-amber-600">
                                    <BookOpen size={40} />
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold text-xl text-slate-800">שפה אמונית</h3>
                                    <p className="text-slate-400 mt-2">השגחה פרטית, ניגון, תורת הנפש היהודית.</p>
                                </div>
                            </button>
                        </div>

                        <button onClick={() => setStep(1)} className="text-slate-400 text-sm hover:text-slate-600 underline">
                            חזור אחורה
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-8 animate-in fade-in zoom-in duration-500 py-8">
                        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6">
                            <CheckCircle2 size={64} className="animate-bounce" />
                        </div>

                        <h2 className="text-4xl font-black text-slate-900">המערכת מכוילת.</h2>
                        <p className="text-xl text-slate-500 font-medium max-w-md mx-auto">
                            הגדרנו את רמת האבטחה ואת השפה שלך.<br />
                            מעכשיו, אנחנו כאן כדי לשמור עליך.
                        </p>

                        <button
                            onClick={handleComplete}
                            className="px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-bold text-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all flex items-center justify-center gap-3 mx-auto"
                        >
                            כנס למרחב הריבונות <ArrowRight />
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default OnboardingWizard;
