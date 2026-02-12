import React, { useState } from 'react';
import {
    Package, Truck, CheckCircle2, Clock, XCircle,
    Eye, ChevronLeft, MapPin, Phone, MessageSquare,
    AlertTriangle, Filter, ClipboardList, Check
} from 'lucide-react';
import { RequestItem, RequestStatus } from '../types';
import { MOCK_REQUESTS, VOLT_CATEGORIES } from '../../data/voltKidMockData';

interface Props {
    onBack?: () => void;
}

const VoltKidParent: React.FC<Props> = ({ onBack }) => {
    const [requests, setRequests] = useState<RequestItem[]>(MOCK_REQUESTS);
    const [filter, setFilter] = useState<RequestStatus | 'all'>('all');
    const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);

    const statusConfig: Record<RequestStatus, { label: string; color: string; icon: React.FC<any>; action?: string }> = {
        pending: { label: 'בקשה חדשה', color: 'bg-blue-100 text-blue-700', icon: Clock, action: 'אשר בקשה' },
        seen: { label: 'נצפה', color: 'bg-slate-100 text-slate-700', icon: Eye, action: 'אשר הכנה' },
        approved: { label: 'אושר', color: 'bg-green-100 text-green-700', icon: CheckCircle2, action: 'סמן כארוז' },
        packed: { label: 'ארוז בתיק', color: 'bg-purple-100 text-purple-700', icon: Package, action: 'יצאתי לדרך' },
        in_transit: { label: 'בדרך למחלקה', color: 'bg-orange-100 text-orange-700', icon: Truck, action: 'נמסר לילד' },
        delivered: { label: 'נמסר', color: 'bg-emerald-100 text-emerald-700', icon: Check, action: 'הזמנה הושלמה' },
        declined: { label: 'בוטל', color: 'bg-red-100 text-red-700', icon: XCircle },
    };

    const getNextStatus = (current: RequestStatus): RequestStatus | null => {
        const sequence: RequestStatus[] = ['pending', 'seen', 'approved', 'packed', 'in_transit', 'delivered'];
        const idx = sequence.indexOf(current);
        if (idx !== -1 && idx < sequence.length - 1) return sequence[idx + 1];
        return null;
    };

    const handleUpdateStatus = (id: string) => {
        setRequests(prev => prev.map(req => {
            if (req.id === id) {
                const next = getNextStatus(req.status);
                if (next) return { ...req, status: next, updatedAt: new Date() };
            }
            return req;
        }));
        if (selectedRequest?.id === id) {
            const next = getNextStatus(selectedRequest.status);
            if (next) setSelectedRequest({ ...selectedRequest, status: next });
        }
    };

    const filteredRequests = requests.filter(r => filter === 'all' || r.status === filter);

    return (
        <div className="min-h-screen bg-slate-50 font-assistant" dir="rtl">
            {/* Top Header */}
            <div className="bg-[#1e40af] text-white p-6 shadow-xl sticky top-0 z-40">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <ChevronLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black tracking-tighter uppercase">וולט-הורה</h1>
                            <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">מוקד מילוי הבקשות</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 px-4 py-1 rounded-full text-xs font-black">
                            {requests.filter(r => r.status !== 'delivered').length} פריטים לביצוע
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6 space-y-8">
                {/* Intro */}
                <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="relative z-10 space-y-2">
                        <h2 className="text-3xl font-black text-slate-800">היי, מה להביא היום?</h2>
                        <p className="text-slate-500 font-medium italic">הילד שלך מחכה לנגיעה של בית. כאן מנהלים את המשלוח.</p>
                    </div>
                    <Package className="absolute -left-4 -bottom-4 text-slate-100" size={120} />
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {(['all', 'pending', 'approved', 'packed', 'in_transit'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${filter === f ? 'bg-[#1e40af] text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300'
                                }`}
                        >
                            {f === 'all' ? 'הכל' : statusConfig[f].label}
                        </button>
                    ))}
                </div>

                {/* Request List */}
                <div className="grid md:grid-cols-2 gap-4">
                    {filteredRequests.map(req => {
                        const config = statusConfig[req.status];
                        const StatusIcon = config.icon;
                        return (
                            <div
                                key={req.id}
                                onClick={() => setSelectedRequest(req)}
                                className="bg-white p-6 rounded-[1.5rem] border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-2xl ${config.color} group-hover:scale-110 transition-transform`}>
                                        <StatusIcon size={24} />
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${config.color}`}>
                                        {config.label}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-slate-800">{req.name}</h3>
                                    {req.notes && <p className="text-xs text-slate-500 italic block mb-2">"{req.notes}"</p>}
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
                                    <span className="text-[10px] font-bold text-slate-400">
                                        {new Date(req.requestedAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    {config.action && req.status !== 'delivered' && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdateStatus(req.id);
                                            }}
                                            className="bg-[#1e40af] text-white px-4 py-2 rounded-full text-[10px] font-black hover:bg-blue-700 shadow-md active:scale-95 transition-all"
                                        >
                                            {config.action}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredRequests.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                        <ClipboardList size={48} className="mx-auto mb-4 text-slate-200" />
                        <p className="text-slate-400 font-bold">אין בקשות בסטטוס הזה כרגע</p>
                    </div>
                )}
            </div>

            {/* Detail Popup Overlay */}
            {selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedRequest(null)} />
                    <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] md:rounded-[2.5rem] p-8 relative z-10 animate-in slide-in-from-bottom duration-300">
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8 md:hidden" />

                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase inline-block mb-3 ${statusConfig[selectedRequest.status].color}`}>
                                    {statusConfig[selectedRequest.status].label}
                                </div>
                                <h2 className="text-4xl font-black text-slate-800 tracking-tighter">{selectedRequest.name}</h2>
                            </div>
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <XCircle size={32} className="text-slate-300" />
                            </button>
                        </div>

                        {selectedRequest.imageUrl && (
                            <img src={selectedRequest.imageUrl} alt={selectedRequest.name} className="w-full h-48 object-cover rounded-3xl mb-6 shadow-lg" />
                        )}

                        <div className="space-y-6">
                            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                                <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <MessageSquare size={14} /> הערת המטופל
                                </h4>
                                <p className="text-lg font-bold text-blue-900">
                                    {selectedRequest.notes || "אין הערות נוספות"}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-2xl">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">תעדוף</p>
                                    <p className={`font-black uppercase text-sm ${selectedRequest.priority === 'urgent' ? 'text-red-500' : 'text-slate-700'}`}>
                                        {selectedRequest.priority === 'urgent' ? 'דחוף ⚡' : 'רגיל'}
                                    </p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl">
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">זמן בקשה</p>
                                    <p className="font-black text-sm text-slate-700">
                                        {new Date(selectedRequest.requestedAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>

                            {statusConfig[selectedRequest.status].action && selectedRequest.status !== 'delivered' && (
                                <button
                                    onClick={() => handleUpdateStatus(selectedRequest.id)}
                                    className="w-full bg-[#1e40af] text-white py-6 rounded-3xl font-black text-xl shadow-xl hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-3"
                                >
                                    <Check size={28} />
                                    {statusConfig[selectedRequest.status].action}
                                </button>
                            )}

                            {selectedRequest.status === 'pending' && (
                                <button className="w-full bg-red-50 text-red-500 py-4 rounded-3xl font-bold hover:bg-red-100 transition-all">
                                    לא יכול להביא את זה
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoltKidParent;
