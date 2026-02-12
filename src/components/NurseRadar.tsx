
import React, { useState, useEffect } from 'react';
import { Radar, ShieldAlert, Activity, User, Brain, AlertTriangle, CheckCircle2, ChevronLeft, MapPin } from 'lucide-react';
import '../styles/nurse-radar.css';

interface PatientBlip {
    id: string;
    name: string;
    x: number;
    y: number;
    status: 'CALM' | 'PANIC' | 'AI_INTERVENTION';
    heartRate: number;
    lastAction: string;
}

const NurseRadar: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [patients, setPatients] = useState<PatientBlip[]>([
        { id: 'p1', name: 'יהונתן (הטייס)', x: 50, y: 50, status: 'CALM', heartRate: 72, lastAction: 'מנוחה' },
        { id: 'p2', name: 'סיון', x: 20, y: 30, status: 'CALM', heartRate: 68, lastAction: 'טיפול באמנות' },
        { id: 'p3', name: 'אבי', x: 80, y: 70, status: 'CALM', heartRate: 75, lastAction: 'חדר אוכל' },
    ]);

    const [selectedPatient, setSelectedPatient] = useState<PatientBlip | null>(null);
    const [alertLog, setAlertLog] = useState<string[]>([]);

    // Simulate "The Glitch" Scenario
    useEffect(() => {
        const timer = setTimeout(() => {
            // 1. Trigger Panic
            updatePatientStatus('p1', 'PANIC', 120, '⚠️ זוהתה חרדה גבוהה (Proxy)');
            addToLog('🚨 התראה: יהונתן - זינוק בחרדה');

            // 2. AI Prevention (The Alchemist Activates)
            setTimeout(() => {
                updatePatientStatus('p1', 'AI_INTERVENTION', 95, '🤖 AI Reframing Active...');
                addToLog('🤖 SYSTEM: Cognitive Alchemist Engaged');

                // 3. Resolution
                setTimeout(() => {
                    updatePatientStatus('p1', 'CALM', 74, '✅ קורקע באמצעות אפליקציה');
                    addToLog('✅ הצלחה: האירוע נוטרל מרחוק');
                }, 4000);

            }, 3000);

        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const updatePatientStatus = (id: string, status: PatientBlip['status'], hr: number, action: string) => {
        setPatients(prev => prev.map(p => p.id === id ? { ...p, status, heartRate: hr, lastAction: action } : p));
    };

    const addToLog = (msg: string) => {
        setAlertLog(prev => [new Date().toLocaleTimeString() + ' ' + msg, ...prev]);
    };

    return (
        <div className="min-h-screen bg-[#050b14] text-white font-assistant flex overflow-hidden">

            {/* Sidebar - Control Panel */}
            <aside className="w-80 bg-[#0B1026] border-r border-slate-800 flex flex-col p-6 z-20 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/50">
                        <Radar size={24} className="text-white animate-spin-slow" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black italic tracking-tighter">סנטינל 2.0</h1>
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">מערכת פיקוח מחלקתית</p>
                    </div>
                </div>

                {/* Live Event Log */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Activity size={12} /> Live Event Stream
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 no-scrollbar">
                        {alertLog.map((log, idx) => (
                            <div key={idx} className={`p-3 rounded-lg border text-xs font-medium animate-in slide-in-from-left duration-300 ${log.includes('ALERT') ? 'bg-red-900/20 border-red-800 text-red-300' :
                                log.includes('SYSTEM') ? 'bg-blue-900/20 border-blue-800 text-blue-300' :
                                    'bg-emerald-900/20 border-emerald-800 text-emerald-300'
                                }`}>
                                {log}
                            </div>
                        ))}
                        {alertLog.length === 0 && <span className="text-slate-600 text-xs italic">System monitoring...</span>}
                    </div>
                </div>

                <button onClick={onBack} className="mt-6 flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                    <ChevronLeft size={16} /> יציאה למסך ראשי
                </button>
            </aside>

            {/* Main Radar View */}
            <main className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">

                {/* The Grid Map */}
                <div className="absolute inset-0 radar-grid opacity-30 pointer-events-none" />

                {/* The Rotating Sweep */}
                <div className="absolute w-[80vh] h-[80vh] rounded-full border border-emerald-500/20">
                    <div className="radar-sweep" />
                </div>

                {/* Patients on Map */}
                <div className="relative w-[80vh] h-[80vh]">
                    {patients.map(p => (
                        <div
                            key={p.id}
                            className="absolute cursor-pointer group"
                            style={{ left: `${p.x}%`, top: `${p.y}%` }}
                            onClick={() => setSelectedPatient(p)}
                        >
                            {/* The Blip */}
                            <div className={`patient-blip ${p.status === 'PANIC' ? 'blip-panic w-6 h-6 -ml-2 -mt-2' :
                                p.status === 'AI_INTERVENTION' ? 'blip-ai w-5 h-5 -ml-1.5 -mt-1.5' :
                                    'blip-calm'
                                }`} />

                            {/* Tooltip Label */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-[10px] px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {p.name}
                            </div>

                            {/* Ripple Effect for Panic */}
                            {p.status === 'PANIC' && (
                                <div className="absolute inset-0 rounded-full border border-red-500 animate-ping opacity-50 w-full h-full" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Patient Detail Overlay (Glassmorphism) */}
                <div className="absolute top-6 right-6 w-80 glass-panel rounded-2xl p-6 transition-all duration-300">
                    {selectedPatient || patients.find(p => p.status !== 'CALM') ? (
                        (() => {
                            const p = selectedPatient || patients.find(patient => patient.status !== 'CALM')!;
                            return (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-black italic">{p.name}</h2>
                                            <p className="text-xs text-slate-400 uppercase tracking-widest">{p.id}</p>
                                        </div>
                                        <div className={`px-2 py-1 rounded text-[10px] font-black uppercase ${p.status === 'PANIC' ? 'bg-red-500 text-white animate-pulse' :
                                            p.status === 'AI_INTERVENTION' ? 'bg-blue-500 text-white' :
                                                'bg-emerald-500 text-white'
                                            }`}>
                                            {p.status}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                                            <div className="text-[10px] text-slate-400 uppercase">דופק</div>
                                            <div className={`text-2xl font-black ${p.heartRate > 100 ? 'text-red-400' : 'text-emerald-400'}`}>
                                                {p.heartRate} <span className="text-xs text-slate-500">BPM</span>
                                            </div>
                                        </div>
                                        <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                                            <div className="text-[10px] text-slate-400 uppercase">מיקום</div>
                                            <div className="text-sm font-bold text-white flex items-center gap-1">
                                                <MapPin size={12} className="text-blue-400" /> חדר 12B
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <div className="text-[10px] text-slate-400 uppercase mb-2">פעולת מערכת נוכחית</div>
                                        <div className="flex items-start gap-3">
                                            {p.status === 'PANIC' ? <AlertTriangle size={20} className="text-red-500 shrink-0" /> :
                                                p.status === 'AI_INTERVENTION' ? <Brain size={20} className="text-blue-400 shrink-0" /> :
                                                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />}
                                            <p className="text-sm font-medium leading-tight">{p.lastAction}</p>
                                        </div>
                                    </div>

                                    {p.status === 'PANIC' && (
                                        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-red-900/50 transition-all flex items-center justify-center gap-2">
                                            <ShieldAlert size={16} /> הקפץ צוות
                                        </button>
                                    )}
                                </div>
                            );
                        })()
                    ) : (
                        <div className="text-center py-8 text-slate-400">
                            <Radar size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="text-sm font-medium">Select a patient signal for details</p>
                        </div>
                    )}
                </div>

            </main>

        </div>
    );
};

export default NurseRadar;
