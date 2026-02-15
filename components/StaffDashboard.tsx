
import React, { useState, useEffect } from 'react';
import { 
  Activity, Pill, CheckCircle, AlertTriangle, 
  Stethoscope, ShieldCheck, X, ChevronRight, 
  Clock, History, ClipboardList, Search, Sparkles,
  Cloud, ShieldAlert, User, CheckCircle2, AlertCircle,
  Database, Zap, Brain, MessageSquare, Trash2, Edit2, 
  UserRound, Plus, Filter, Info, Eye, Gauge, Flame,
  Camera, Mic, BarChart3
} from 'lucide-react';
import { MedicationTask } from '../types';

const INITIAL_TASKS: MedicationTask[] = [
  { id: '1', patientName: 'עידן כהן', medName: 'Lorazepam (Ativan)', dosage: '2mg', doctorApproved: false, nurseApproved: false, status: 'pending', auditNotes: 'מינון חריג לפי היסטוריה' },
  { id: '2', patientName: 'שרה לוי', medName: 'Quetiapine (Seroquel)', dosage: '100mg', doctorApproved: true, nurseApproved: false, status: 'pending', auditNotes: 'תואם מרשם קודם' },
  { id: '3', patientName: 'אמנון גבע', medName: 'Olanzapine (Zyprexa)', dosage: '5mg', doctorApproved: true, nurseApproved: true, status: 'anomaly', auditNotes: 'זוהה כחריגת מחשוב "קמיליון" - הוספה אוטומטית מאשפוז קודם' },
];

const StaffDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<MedicationTask[]>(INITIAL_TASKS);
  const [view, setView] = useState<'meds' | 'safety' | 'agitation'>('agitation');
  const [dopamineLevel, setDopamineLevel] = useState(72);

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col font-assistant" dir="rtl">
      {/* Chameleon Top Utility Bar */}
      <div className="w-full bg-[#1e40af] text-white py-2 px-8 flex justify-between items-center text-[10px] font-bold sticky top-0 z-50 shadow-md">
         <div className="flex gap-4">
            <span className="flex items-center gap-2"><Cloud size={12}/> AI Supervision Node Active</span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1 text-blue-200"><Database size={10}/> Chameleon Cloud Sync v4.3</span>
         </div>
         <div className="flex gap-4">
            <span className="animate-pulse flex items-center gap-1 text-emerald-400 font-black uppercase"><Activity size={10}/> Virtual Dopamine Index Live</span>
         </div>
      </div>

      <header className="bg-white border-b border-slate-200 p-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <ShieldCheck size={28} />
           </div>
           <div>
              <h1 className="text-2xl font-black italic tracking-tighter text-[#1e40af]">Clinical <span className="text-blue-500 font-light">Supervision</span></h1>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">מערכת ניהול בטיחות וניטור התנהגותי (Bio-Proxy)</p>
           </div>
        </div>

        <nav className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
           <button onClick={() => setView('agitation')} className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${view === 'agitation' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-blue-600'}`}>מדד דופמין (Virtual)</button>
           <button onClick={() => setView('meds')} className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${view === 'meds' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500'}`}>תרופות</button>
           <button onClick={() => setView('safety')} className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${view === 'safety' ? 'bg-red-600 text-white shadow-md' : 'text-slate-500'}`}>בטיחות קלינית</button>
        </nav>
      </header>

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto">
        
        {view === 'agitation' && (
          <div className="space-y-8 animate-in fade-in duration-700">
             {/* Virtual Dopamine Monitor Hero */}
             <div className="bg-[#0f172a] text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group border border-white/5">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
                
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
                   <div className="space-y-8 text-right">
                      <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-5 py-2 rounded-full text-[10px] font-black uppercase border border-blue-500/20 shadow-sm">
                         <Brain size={14} className="animate-pulse"/> Non-Invasive Dopamine Proxy Active
                      </div>
                      
                      <div className="space-y-4">
                        <h2 className="text-6xl font-black italic tracking-tighter leading-[0.9]">ניטור <br/> <span className="text-blue-500">סערת דופמין.</span></h2>
                        <p className="text-slate-400 font-medium italic text-xl leading-relaxed max-w-md">
                           זיהוי עוררות יתר קלינית ללא דקירה. ה-AI מנתח סמנים חזותיים וקוליים בזמן אמת.
                        </p>
                      </div>

                      {/* Behavioral Markers Panel */}
                      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6 backdrop-blur-md">
                         <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 flex items-center gap-2">
                           <Eye size={14}/> סמנים ביומטריים חזותיים (Visual Markers)
                         </h4>
                         <div className="grid grid-cols-2 gap-6">
                            {[
                              { label: 'קצב דיבור (Logorrhea)', val: '88%', status: 'Critical', icon: Mic },
                              { label: 'תנועתיות יתר (Akathisia)', val: '72%', status: 'High', icon: Activity },
                              { label: 'מיקרו-הבעות (Tension)', val: '64%', status: 'Moderate', icon: Sparkles },
                              { label: 'התרחבות אישונים (Pupils)', val: '91%', status: 'Alert', icon: Eye },
                            ].map((m, i) => (
                              <div key={i} className="flex items-center gap-3">
                                 <div className="p-2 bg-white/5 rounded-lg text-slate-400"><m.icon size={16}/></div>
                                 <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-tight">{m.label}</p>
                                    <p className="text-sm font-black text-white">{m.val} <span className="text-[9px] text-red-500 italic">({m.status})</span></p>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex flex-col items-center justify-center space-y-10">
                      <div className="relative w-80 h-80">
                         {/* Glowing Aura for Storm Alert */}
                         <div className={`absolute inset-0 blur-[80px] rounded-full transition-all duration-1000 ${dopamineLevel > 70 ? 'bg-red-600/30' : 'bg-blue-600/20'}`} />
                         
                         <div className="relative w-full h-full flex flex-col items-center justify-center bg-white/5 rounded-full border-2 border-white/10 shadow-inner">
                            <Gauge size={220} className="text-blue-500 opacity-10 absolute" strokeWidth={1} />
                            <div className="text-[7rem] font-black italic leading-none drop-shadow-2xl">
                               {dopamineLevel}<span className="text-3xl text-blue-500">%</span>
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mt-2">Dopaminergic Index</div>
                            
                            {dopamineLevel > 70 && (
                              <div className="absolute -bottom-6 bg-red-600 text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl animate-bounce">
                                 Dopaminergic Storm Detected
                              </div>
                            )}
                         </div>
                      </div>

                      <div className="w-full space-y-3 px-12">
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <span>Optimal Range</span>
                            <span className="text-red-500">Storm Zone</span>
                         </div>
                         <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                            <div className={`h-full rounded-full transition-all duration-1000 ${dopamineLevel > 70 ? 'bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]' : 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]'}`} style={{ width: `${dopamineLevel}%` }} />
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Ward Monitoring Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'עידן כהן', agi: 88, status: 'STORM ALERT', color: 'text-red-500', bg: 'bg-red-500/10', markers: ['Logorrhea', 'Rapid Blinking'] },
                  { name: 'שרה לוי', agi: 24, status: 'Stable / Basal', color: 'text-emerald-500', bg: 'bg-emerald-500/10', markers: ['Steady Speech', 'Optimal Focus'] },
                  { name: 'אמנון גבע', agi: 56, status: 'Tension Rising', color: 'text-orange-500', bg: 'bg-orange-500/10', markers: ['Restless Legs', 'Micro-Tension'] },
                ].map((p, i) => (
                  <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm flex flex-col gap-8 group hover:shadow-2xl hover:-translate-y-1 transition-all">
                     <div className="flex justify-between items-start">
                        <div className="space-y-1">
                           <h4 className="text-2xl font-black italic text-[#1e40af]">{p.name}</h4>
                           <p className={`text-[10px] font-black uppercase tracking-widest ${p.color}`}>{p.status}</p>
                        </div>
                        <div className={`p-4 rounded-2xl ${p.bg} ${p.color}`}><Activity size={24}/></div>
                     </div>

                     <div className="space-y-4">
                        <div className="space-y-1.5">
                           <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              <span>Virtual Index</span>
                              <span>{p.agi}%</span>
                           </div>
                           <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full transition-all duration-1000 ${p.agi > 70 ? 'bg-red-600' : p.agi > 40 ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${p.agi}%` }} />
                           </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                           {p.markers.map((m, mi) => (
                             <span key={mi} className="text-[8px] font-black uppercase text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 italic">#{m}</span>
                           ))}
                        </div>
                     </div>

                     <button className="w-full bg-[#1e40af] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group/btn">
                        <Camera size={16} className="group-hover/btn:scale-110 transition-transform"/> הפעל ניתוח Bio-Proxy
                     </button>
                  </div>
                ))}
             </div>
          </div>
        )}

        {view === 'meds' && (
           <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-xl overflow-hidden animate-in fade-in duration-500">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h3 className="text-xl font-black italic flex items-center gap-3"><Pill className="text-blue-600"/> מעקב נטילת תרופות (Medication Loop)</h3>
                 <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Cloud Sync: Active</div>
              </div>
              <table className="w-full text-right">
                 <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase text-slate-500">
                       <th className="px-10 py-6">מטופל</th>
                       <th className="px-10 py-6">תרופה</th>
                       <th className="px-10 py-6 text-center">אישור רופא</th>
                       <th className="px-10 py-6 text-center">אישור אחות</th>
                       <th className="px-10 py-6">נטילה (Patient Choice)</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {tasks.map(t => (
                       <tr key={t.id} className="hover:bg-blue-50/50 transition-all">
                          <td className="px-10 py-6 font-black text-xl text-[#1e40af]">{t.patientName}</td>
                          <td className="px-10 py-6 font-bold text-slate-600">{t.medName} <span className="text-xs opacity-50 block">{t.dosage}</span></td>
                          <td className="px-10 py-6 text-center">
                             {t.doctorApproved ? <CheckCircle2 className="mx-auto text-emerald-500" /> : <div className="w-6 h-6 border-2 border-slate-200 rounded-full mx-auto" />}
                          </td>
                          <td className="px-10 py-6 text-center">
                             {t.nurseApproved ? <CheckCircle2 className="mx-auto text-emerald-500" /> : <div className="w-6 h-6 border-2 border-slate-200 rounded-full mx-auto" />}
                          </td>
                          <td className="px-10 py-6">
                             {t.status === 'completed' ? (
                               <div className="flex items-center gap-2 text-emerald-600">
                                  <ShieldCheck size={16}/>
                                  <span className="text-xs font-black italic">כיוון הכלי הושלם</span>
                               </div>
                             ) : (
                               <span className="text-[10px] font-black uppercase text-slate-400 italic">ממתין לבחירת מטופל</span>
                             )}
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        )}

        {view === 'safety' && (
           <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
              <div className="bg-red-600 text-white p-16 rounded-[4.5rem] shadow-2xl relative overflow-hidden group">
                 <div className="absolute -bottom-10 -left-10 opacity-10 rotate-12 transition-transform group-hover:rotate-0 duration-700">
                    <ShieldAlert size={200} />
                 </div>
                 <div className="relative z-10 space-y-4">
                    <h2 className="text-6xl font-black italic tracking-tighter leading-none mb-4">בטיחות <br/> <span className="text-red-200">Guardian.</span></h2>
                    <p className="text-2xl font-medium italic opacity-90 max-w-2xl leading-relaxed">
                       ניטור אנומליות בענן של קמיליון. מניעת טעויות מרשם אוטומטיות וסנכרון רציף.
                    </p>
                 </div>
              </div>

              <div className="bg-white p-12 rounded-[4rem] border-2 border-red-100 shadow-xl space-y-8">
                 <div className="flex items-center gap-5 text-red-600">
                    <Flame size={40} className="animate-pulse" />
                    <h3 className="text-3xl font-black italic tracking-tight">התראות מערכת פעילות (Chameleon Sync Errors)</h3>
                 </div>
                 <div className="bg-red-50 p-10 rounded-[3rem] border border-red-100 space-y-6">
                    <div className="space-y-2">
                       <p className="text-[10px] font-black uppercase text-red-500 tracking-widest">זיהוי שגיאת סנכרון (Anomaly #422)</p>
                       <p className="text-2xl font-bold text-red-800 leading-snug italic">
                          "זוהתה הוספה אוטומטית של Olanzapine לתיק של אמנון גבע. מנוע ה-AI זיהה שזוהי תרופה מאשפוז ישן שאינה רלוונטית למצב הנוכחי."
                       </p>
                    </div>
                    <div className="flex gap-4 pt-4">
                       <button className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase shadow-xl hover:bg-red-700 transition-all flex items-center gap-2">
                          <Trash2 size={18}/> בטל מרשם אוטומטי
                       </button>
                       <button className="bg-white border-2 border-red-200 text-red-600 px-10 py-4 rounded-2xl font-black text-sm uppercase hover:bg-red-50 transition-all">
                          אישור חריג (Audit Required)
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="w-full py-8 px-8 border-t border-slate-200 bg-white/50 text-center">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 opacity-40 grayscale">
            <span className="text-[9px] font-black uppercase tracking-widest">Shalvata Consciousness OS v4.0.3</span>
            <div className="flex gap-6">
               <span className="text-[9px] font-black uppercase tracking-widest">AWS Cloud Hub Active</span>
               <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 font-black">Chameleon Linked</span>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default StaffDashboard;
