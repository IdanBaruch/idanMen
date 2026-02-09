import React from 'react';
import { Building2, ChevronLeft, MapPin, Users, Heart } from 'lucide-react';

interface WardSelectionProps {
    onSelect: (ward: string) => void;
}

const WARDS = [
    { id: 'ward_a', name: 'מחלקה א\'', type: 'Open', color: 'bg-emerald-500' },
    { id: 'ward_b', name: 'מחלקה ב\'', type: 'Closed', color: 'bg-indigo-500' },
    { id: 'er', name: 'מיון (ER)', type: 'Emergency', color: 'bg-rose-500' },
    { id: 'day_care', name: 'אשפוז יום', type: 'Day Care', color: 'bg-amber-500' },
    { id: 'rehab', name: 'מרכז שיקום', type: 'Rehabilitation', color: 'bg-cyan-500' },
];

const WardSelection: React.FC<WardSelectionProps> = ({ onSelect }) => {
    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col items-center justify-center p-8 font-assistant" dir="rtl">
            <div className="w-full max-w-xl space-y-12">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-blue-500/20">
                        <Building2 size={40} />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900">בחירת מחלקה</h1>
                    <p className="text-slate-500 font-bold italic">בחר את היחידה הקלינית אליה אתה שייך או שבה אתה מבקר.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {WARDS.map((ward) => (
                        <button
                            key={ward.id}
                            onClick={() => onSelect(ward.name)}
                            className="group bg-white border border-slate-200 p-8 rounded-[2.5rem] flex items-center justify-between hover:border-blue-500 hover:shadow-xl transition-all active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 ${ward.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                    <MapPin size={28} />
                                </div>
                                <div className="text-right">
                                    <h3 className="text-xl font-black text-slate-900 leading-none">{ward.name}</h3>
                                    <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">{ward.type}</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                <ChevronLeft size={24} />
                            </div>
                        </button>
                    ))}
                </div>

                <div className="flex justify-center gap-8 pt-8">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                        <Users size={14} /> 240+ מטופלים
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                        <Heart size={14} className="text-rose-400" /> מערכת מוגנת AI
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WardSelection;
