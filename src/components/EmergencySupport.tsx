import React, { useState } from 'react';
import {
    ShieldAlert, Phone, Siren, Users,
    Heart, X, ShieldCheck, Info,
    AlertTriangle, Home, MapPin
} from 'lucide-react';

const EmergencySupport: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const EMERGENCY_NUMBERS = [
        { id: 'police', title: 'משטרה', number: '100', icon: Siren, color: 'bg-blue-600' },
        { id: 'welfare', title: 'עזרה מהרווחה', number: '118', icon: Users, color: 'bg-amber-600' },
        { id: 'men', title: 'עזרה לגברים', number: '1-800-39-39-04', icon: ShieldAlert, color: 'bg-rose-700' },
        { id: 'eran', title: 'ער"ן - מישהו לדבר איתו', number: '1201', icon: Heart, color: 'bg-emerald-600' }
    ];

    return (
        <div className="fixed inset-0 z-[100000] bg-white text-slate-900 font-assistant overflow-y-auto flex flex-col rtl" dir="rtl">

            <div className="bg-red-600 text-white py-4 px-8 flex justify-between items-center sticky top-0 z-50 animate-pulse">
                <div className="flex items-center gap-3">
                    <AlertTriangle size={24} />
                    <span className="font-black text-sm">מקום בטוח - עזרה עכשיו</span>
                </div>
                <button onClick={onBack} className="p-2"><X size={24} /></button>
            </div>

            <main className="flex-1 max-w-4xl mx-auto w-full p-8 md:p-16 space-y-12 pb-32">

                <section className="bg-slate-50 border-r-8 border-red-600 p-10 shadow-xl rounded-l-3xl space-y-8">
                    <div className="flex items-center gap-4 text-red-600">
                        <ShieldCheck size={40} />
                        <h1 className="text-3xl md:text-5xl font-black italic">הכי חשוב שתהיה בטוח.</h1>
                    </div>

                    <div className="space-y-6 text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
                        <p>אני שומע שקשה לך מאוד עכשיו וזה יכול להיות מפחיד.</p>
                        <p>כשמרגישים בסכנה, הדבר הכי חשוב הוא למצוא מקום שבו אף אחד לא יכול להכאיב לך.</p>
                        <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm text-lg italic text-red-800">
                            אני מחשב, אני לא יכול לבוא בעצמי, אז בבקשה תתקשר לאנשים שיכולים להגיע אליך ולעזור.
                        </div>
                    </div>
                </section>

                <section className="space-y-8">
                    <h2 className="text-2xl font-black italic border-b-4 border-slate-900 pb-2 w-fit">אנשים שאפשר להתקשר אליהם עכשיו:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {EMERGENCY_NUMBERS.map((c) => (
                            <a
                                key={c.id}
                                href={`tel:${c.number}`}
                                className="group bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] flex items-center justify-between hover:border-slate-900 transition-all"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`w-16 h-16 rounded-2xl ${c.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                        <c.icon size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black italic">{c.title}</h3>
                                        <p className="text-slate-500 font-bold text-lg">{c.number}</p>
                                    </div>
                                </div>
                                <Phone size={24} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                            </a>
                        ))}
                    </div>
                </section>

                <section className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl space-y-6">
                    <div className="flex items-center gap-3">
                        <Home className="text-blue-400" size={24} />
                        <h4 className="text-xl font-black italic">איך לשמור על עצמי עכשיו:</h4>
                    </div>
                    <ul className="space-y-4">
                        {[
                            "לצאת מהבית למקום בטוח (כמו האוטו או אצל חבר).",
                            "לשתוק ולא לריב בחזרה - השתיקה שומרת עלינו.",
                            "לבדוק שהטלפון טעון ויש לי קליטה.",
                            "אם המשטרה מגיעה: ספר להם הכל ותהיה רגוע."
                        ].map((t, i) => (
                            <li key={i} className="flex items-start gap-4 text-lg font-bold italic">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0" />
                                {t}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="text-center space-y-8 bg-emerald-50 p-12 rounded-[4rem] border-2 border-emerald-100">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
                            <MapPin size={32} />
                        </div>
                        <h2 className="text-4xl font-black italic text-emerald-900">בבקשה, תשמור על עצמך.</h2>
                        <p className="text-2xl font-bold text-emerald-700">אתה נמצא עכשיו במקום בטוח?</p>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <button onClick={onBack} className="bg-emerald-600 text-white px-12 py-5 rounded-full font-black text-xl shadow-xl">כן, אני בטוח</button>
                        <button className="border-2 border-emerald-600 text-emerald-600 px-12 py-5 rounded-full font-black text-xl">לא, אני צריך עוד עזרה</button>
                    </div>
                </section>

            </main>

            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] w-full max-w-sm px-6">
                <a
                    href="tel:100"
                    className="w-full bg-red-600 text-white py-6 rounded-full font-black text-2xl shadow-xl flex items-center justify-center gap-4 border-4 border-white"
                >
                    <Siren size={32} /> להתקשר למשטרה - 100
                </a>
            </div>

        </div>
    );
};

export default EmergencySupport;
