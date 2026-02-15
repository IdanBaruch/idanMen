
import React, { useState, useEffect } from 'react';
// Added missing Loader2 and Quote icons to the lucide-react import list to resolve "Cannot find name" errors.
import { 
  ShieldAlert, Pill, AlertTriangle, CheckCircle2, 
  Search, Info, X, Sparkles, Cloud, Activity, ArrowLeft,
  Database, ShieldX, Zap, Loader2, Quote
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Prescription {
  id: string;
  name: string;
  dosage: string;
  source: 'Manual' | 'System (Auto)' | 'Historical';
  status: 'confirmed' | 'pending' | 'anomaly';
  reason: string;
}

const MedicationSafety: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    { id: '1', name: 'Lorazepam (Ativan)', dosage: '2mg', source: 'Manual', status: 'confirmed', reason: 'חרדה חריפה (מיון)' },
    { id: '2', name: 'Quetiapine (Seroquel)', dosage: '100mg', source: 'Historical', status: 'confirmed', reason: 'שינה (כרוני)' },
    { id: '3', name: 'Olanzapine (Zyprexa)', dosage: '5mg', source: 'System (Auto)', status: 'anomaly', reason: 'זוהה כחריגת מחשוב "קמיליון" - הוספה אוטומטית מאשפוז ישן' },
  ]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);

  const runAiAudit = async () => {
    setIsAuditing(true);
    setAuditResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `נתח את רשימת התרופות הבאה עבור מטופל פסיכיאטרי. 
      שים לב לשגיאות מערכת מסוג "קמיליון" (Chameleon Bug) שבהן תרופות מאשפוזים קודמים קופצות אוטומטית לתיק הנוכחי ללא הצדקה.
      הרשימה: ${JSON.stringify(prescriptions)}.
      האם יש חריגה? מה המלצתך לצוות? ענה בקיצור נמרץ בעברית מקצועית.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setAuditResult(response.text || 'לא נמצאו חריגות בולטות.');
    } catch (err) {
      setAuditResult('שגיאה בביצוע הביקורת מול ענן AWS.');
    } finally {
      setIsAuditing(false);
    }
  };

  const confirmMed = (id: string) => {
    setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status: 'confirmed' } : p));
  };

  const rejectMed = (id: string) => {
    setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status: 'anomaly' } : p));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] flex flex-col font-assistant overflow-y-auto pb-40" dir="rtl">
      
      {/* Cloud & AWS Integration Banner */}
      <div className="bg-[#1e40af] text-white p-3 flex justify-between items-center px-8 text-[10px] font-bold shadow-md">
        <div className="flex items-center gap-3">
          <Cloud size={14} className="text-blue-200" />
          <span>Guardian Safety Hub | AWS Cloud Hybrid Active</span>
        </div>
        <div className="flex items-center gap-2">
          <Database size={12} className="opacity-50" />
          <span className="opacity-70 italic">Chameleon Sync: v4.22</span>
        </div>
      </div>

      <header className="p-10 space-y-3 bg-white border-b border-slate-200">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-[#dc2626] rounded-[2rem] flex items-center justify-center shadow-xl">
            <ShieldAlert size={36} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter text-[#1e40af]">Guardian <span className="text-[#dc2626]">Safety.</span></h1>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-1 italic">מניעת טעויות מרשם (Chameleon Bug Protection)</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 space-y-10 max-w-5xl mx-auto w-full">
        
        {/* Warning Alert if Anomaly Found */}
        {prescriptions.some(p => p.status === 'anomaly') && (
          <div className="bg-red-50 border-2 border-red-200 p-8 rounded-[3.5rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl animate-in zoom-in group">
            <div className="w-20 h-20 bg-[#dc2626] rounded-3xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <ShieldX size={44} className="text-white animate-pulse" />
            </div>
            <div className="text-right">
              <h3 className="text-3xl font-black text-[#dc2626] italic mb-1 tracking-tight">זיהוי חריגה קריטית (Anomaly Detected)</h3>
              <p className="text-slate-600 text-lg font-bold leading-tight">
                ה-OS זיהתה תרופה (Olanzapine) שנוספה לתיק שלך אוטומטית ללא חתימת רופא. <br/> <span className="text-red-700">אנא אל תיקח את התרופה עד לאישור ידני.</span>
              </p>
            </div>
          </div>
        )}

        {/* AI Auditor CTA */}
        <section className="bg-white border-2 border-slate-100 rounded-[4rem] p-10 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Sparkles className="text-blue-600" size={28} />
              <h3 className="text-2xl font-black italic tracking-tight text-[#1e40af]">AWS Cloud Safety Audit</h3>
            </div>
            <button 
              onClick={runAiAudit}
              disabled={isAuditing}
              className="bg-[#1e40af] text-white px-10 py-5 rounded-full font-black text-sm uppercase shadow-xl hover:bg-[#1e3a8a] transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isAuditing ? <Loader2 className="animate-spin"/> : <Zap size={18}/>}
              {isAuditing ? 'מבצע ביקורת ענן...' : 'הרץ ביקורת AI'}
            </button>
          </div>
          {auditResult && (
            <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 text-[#1e3a8a] italic leading-relaxed font-bold text-xl relative">
              <Quote className="absolute top-4 left-4 opacity-10" size={48} />
              "{auditResult}"
            </div>
          )}
        </section>

        {/* Prescription Grid */}
        <section className="space-y-6">
          <div className="flex justify-between items-center px-4">
             <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic">רשימת תרופות בתיק (Chameleon Sync)</h3>
             <div className="flex gap-2 text-[8px] font-black uppercase text-slate-400">
                <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-emerald-500"/> מאושר</span>
                <span className="flex items-center gap-1"><AlertTriangle size={10} className="text-red-500"/> חריגה</span>
             </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {prescriptions.map((p) => (
              <div key={p.id} className={`bg-white border-2 p-8 rounded-[3.5rem] flex items-center justify-between transition-all group ${p.status === 'anomaly' ? 'border-red-400 bg-red-50 shadow-xl' : 'border-slate-100 hover:border-blue-200'}`}>
                <div className="flex items-center gap-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner ${p.status === 'anomaly' ? 'bg-[#dc2626] text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <Pill size={32} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black leading-none mb-1 text-[#1e40af]">{p.name}</h4>
                    <p className="text-xs font-bold text-slate-500 italic mt-1">{p.dosage} | {p.reason}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${p.source === 'System (Auto)' ? 'bg-red-100 text-red-600 border-red-200' : 'bg-blue-100 text-blue-600 border-blue-200'}`}>
                        Mקור: {p.source}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  {p.status === 'anomaly' ? (
                    <button onClick={() => confirmMed(p.id)} className="bg-emerald-600 text-white p-5 rounded-3xl shadow-xl hover:scale-105 transition-all" title="אישור ידני"><CheckCircle2 size={28}/></button>
                  ) : (
                    <button onClick={() => rejectMed(p.id)} className="bg-red-600 text-white p-5 rounded-3xl shadow-xl hover:scale-105 transition-all" title="דווח כחריגה"><ShieldX size={28}/></button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Institutional Disclosure */}
        <section className="bg-slate-100 p-8 rounded-[3rem] border border-slate-200 opacity-60 mt-12">
           <div className="flex items-start gap-4">
              <Info className="text-slate-400 shrink-0" size={18} />
              <p className="text-[10px] font-bold text-slate-500 italic leading-relaxed uppercase tracking-wider">
                Guardian Safety OS v4.2 | המערכת מנטרת תקלות סנכרון בענן AWS Hybrid. 
                כל פעולה מתועדת ביומן הביקורת הקליני (Audit Log). 
                המערכת אינה מחליפה שיקול דעת של רופא מוסמך.
              </p>
           </div>
        </section>

      </main>
    </div>
  );
};

export default MedicationSafety;
