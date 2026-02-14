import React from 'react';
import { Clock, CheckCircle2, Circle, Calendar, User, MapPin, Info } from 'lucide-react';
import { FHIRAppointment } from '../services/geminiService';

interface ControlTowerProps {
    appointments: FHIRAppointment[];
    onCheckIn?: (id: string) => void;
}

const ControlTower: React.FC<ControlTowerProps> = ({ appointments, onCheckIn }) => {
    return (
        <div className="space-y-6 font-assistant" dir="rtl">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black italic tracking-tighter text-white">מגדל פיקוח אישי</h2>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">סנכרון פעילות בזמן אמת</p>
                    </div>
                </div>
                <div className="bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">נתונים מחוברים</span>
                </div>
            </div>

            <div className="relative space-y-4">
                {/* Vertical Timeline Line */}
                <div className="absolute top-0 bottom-0 right-[27px] w-0.5 bg-gradient-to-b from-indigo-500/50 via-slate-800 to-transparent" />

                {appointments.map((apt, index) => {
                    const isFulfilled = apt.status === 'fulfilled' || apt.status === 'arrived';
                    const isCurrent = !isFulfilled && index === appointments.findIndex(a => a.status === 'pending');

                    return (
                        <div key={apt.id} className={`relative flex items-start gap-6 group transition-all duration-500 ${isFulfilled ? 'opacity-50' : ''}`}>
                            {/* Time and Icon Marker */}
                            <div className="relative z-10 flex flex-col items-center">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${isFulfilled ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                                    isCurrent ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] animate-pulse' :
                                        'bg-slate-900 border-white/5 text-slate-500'
                                    }`}>
                                    {isFulfilled ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                                </div>
                                <span className="mt-2 text-xs font-mono font-bold text-slate-400">{apt.startTime}</span>
                            </div>

                            {/* Content Card */}
                            <div className={`flex-1 p-6 rounded-[2rem] border transition-all duration-500 ${isCurrent ? 'bg-indigo-950/20 border-indigo-500/30 shadow-xl scale-[1.02]' :
                                'bg-white/5 border-white/5 group-hover:bg-white/10'
                                }`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className={`text-lg font-black ${isCurrent ? 'text-white' : 'text-slate-200'}`}>{apt.description}</h3>
                                        <div className="flex items-center gap-2 mt-1 text-slate-400">
                                            <User size={12} />
                                            <span className="text-[11px] font-bold">{apt.practitionerName}</span>
                                        </div>
                                    </div>
                                    {apt.type === 'free' && (
                                        <div className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20 text-[9px] font-black uppercase tracking-tighter">
                                            אימון ריבוני
                                        </div>
                                    )}
                                </div>

                                {isCurrent && (
                                    <div className="pt-4 border-t border-white/5 flex gap-4">
                                        <button
                                            onClick={() => onCheckIn?.(apt.id)}
                                            className="flex-1 bg-indigo-500 hover:bg-indigo-400 text-white py-3 rounded-xl font-black italic text-xs transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
                                        >
                                            סימון הגעה
                                        </button>
                                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400">
                                            <MapPin size={18} />
                                        </div>
                                    </div>
                                )}

                                {!isCurrent && !isFulfilled && (
                                    <div className="pt-2 flex items-center gap-2 opacity-50">
                                        <Info size={12} className="text-slate-500" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">משימה בהמתנה</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-8 bg-indigo-600/5 rounded-[3rem] border border-indigo-500/10 mt-12">
                <p className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-2">תובנת הצוות (קישור לניהול):</p>
                <p className="text-indigo-100 italic text-xs leading-relaxed font-medium">
                    "יהונתן, הלו"ז שלך מסונכרן ישירות עם המדריכים במחלקה. ביצוע משימות בזמן מזכה אותך בנקודות ריבונות וקידום בתהליך השחרור."
                </p>
            </div>
        </div>
    );
};

export default ControlTower;
