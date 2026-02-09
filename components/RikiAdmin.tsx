
import React, { useState, useEffect } from 'react';
import { 
  Brain, Terminal, Activity, ShieldCheck, Zap, Database, 
  Search, AlertTriangle, LineChart, Globe, Cpu, RefreshCw,
  MoreVertical, Sliders, Play, Code, Eye, Layers, ShieldAlert,
  // Added missing MessageSquare import
  MessageSquare
} from 'lucide-react';
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AI_PERFORMANCE_DATA = [
  { time: '00:00', accuracy: 92, latency: 120 },
  { time: '04:00', accuracy: 94, latency: 110 },
  { time: '08:00', accuracy: 89, latency: 180 },
  { time: '12:00', accuracy: 95, latency: 140 },
  { time: '16:00', accuracy: 93, latency: 130 },
  { time: '20:00', accuracy: 96, latency: 115 },
];

const AI_LOGS = [
  { id: 'log-1', timestamp: '14:22:10', type: 'prediction', message: 'High distress detected in Ward B', confidence: '98%', status: 'success' },
  { id: 'log-2', timestamp: '14:20:05', type: 'model_update', message: 'Gemini-3-pro-preview deployment successful', status: 'info' },
  { id: 'log-3', timestamp: '14:18:30', type: 'anomaly', message: 'Unusual speech patterns detected - User #442', status: 'warning' },
  { id: 'log-4', timestamp: '14:15:12', type: 'tuning', message: 'SystemInstruction temperature adjusted to 0.7', status: 'info' },
];

const RikiAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'logs' | 'tuning' | 'anomalies'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex font-sans overflow-hidden" dir="rtl">
      
      {/* Side Navigation - Futuristic Admin Panel */}
      <aside className="w-20 md:w-72 bg-slate-900 border-l border-white/5 flex flex-col p-6 z-50">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-600/20">
            <Brain className="text-white" size={24} />
          </div>
          <div className="hidden md:block">
            <span className="text-xl font-black italic tracking-tighter uppercase text-white">RIKI <span className="text-cyan-500">AI</span></span>
            <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest italic">ריק"י - ראיה יזומה קוגניטיבית</p>
          </div>
        </div>

        <nav className="space-y-3 flex-1">
          {[
            { id: 'dashboard', label: 'לוח בקרה (Health)', icon: <Activity size={20} /> },
            { id: 'logs', label: 'לוגים וניטור (Logs)', icon: <Terminal size={20} /> },
            { id: 'tuning', label: 'כיוונון מודלים (Tuning)', icon: <Sliders size={20} /> },
            { id: 'anomalies', label: 'זיהוי אנומליות', icon: <ShieldAlert size={20} /> },
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id as any)} 
              className={`w-full text-right px-6 py-4 rounded-2xl transition-all flex items-center gap-4 font-black ${activeTab === tab.id ? 'bg-cyan-600 text-white shadow-xl shadow-cyan-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <span>{tab.icon}</span>
              <span className="hidden md:block text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
           <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
              <p className="text-[8px] text-slate-500 font-black uppercase mb-1 tracking-widest">Global AI Accuracy</p>
              <p className="text-2xl font-black text-cyan-400 italic">94.2%</p>
           </div>
           <button onClick={handleSync} className="w-full bg-white/5 text-slate-400 p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
              <span className="hidden md:block text-xs font-black uppercase italic">Sync Core</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0c10] to-[#0a0c10]">
        
        {/* Header Section */}
        <header className="flex justify-between items-end mb-12">
           <div className="text-right">
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tight leading-none mb-2">
                 ניהול <span className="text-cyan-500 italic">הבינה המרכזית.</span>
              </h1>
              <p className="text-slate-400 font-medium italic">אופטימיזציה בזמן אמת של מודלים ושכבות קוגניטיביות.</p>
           </div>
           <div className="flex gap-4">
              <div className="bg-cyan-500/10 border border-cyan-500/20 px-6 py-3 rounded-2xl flex items-center gap-3">
                 <Zap size={14} className="text-cyan-400 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Core v2.5.0-Stable</span>
              </div>
           </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             {/* Key Metrics Cards */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'זמן תגובה ממוצע', value: '124ms', icon: Zap, color: 'cyan', trend: '-12%' },
                  { label: 'דיוק תחזיות סיכון', value: '98.2%', icon: ShieldCheck, color: 'emerald', trend: '+1.4%' },
                  { label: 'שיחות פעילות', value: '42', icon: MessageSquare, color: 'blue', trend: '+15%' },
                  { label: 'אנומליות (24ש\')', value: '3', icon: AlertTriangle, color: 'orange', trend: '-2' },
                ].map((m, i) => (
                  <div key={i} className="bg-slate-900 border border-white/5 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] group-hover:bg-cyan-500/10 transition-all" />
                     <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl bg-${m.color}-500/10 text-${m.color}-500`}><m.icon size={28}/></div>
                        <span className="text-[10px] font-black text-emerald-400 italic">{m.trend}</span>
                     </div>
                     <h3 className="text-4xl font-black mb-1">{m.value}</h3>
                     <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{m.label}</p>
                  </div>
                ))}
             </div>

             {/* Performance Charts */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 p-10 rounded-[4rem] border border-white/5 shadow-2xl">
                   <h3 className="text-xl font-black mb-8 flex items-center gap-3 italic text-cyan-400">
                      <LineChart size={20} /> מגמות דיוק ודירוג אמון (Accuracy Trend)
                   </h3>
                   <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                         <RechartsLineChart data={AI_PERFORMANCE_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                            <XAxis dataKey="time" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis hide domain={[80, 100]} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '1rem', color: '#fff' }} />
                            <Line type="monotone" dataKey="accuracy" stroke="#06b6d4" strokeWidth={4} dot={{ r: 4, fill: '#06b6d4' }} />
                         </RechartsLineChart>
                      </ResponsiveContainer>
                   </div>
                </div>

                <div className="bg-slate-900 p-10 rounded-[4rem] border border-white/5 shadow-2xl flex flex-col justify-between">
                   <h3 className="text-xl font-black mb-6 italic text-emerald-400 flex items-center gap-3">
                      <Layers size={20} /> תקינות רכיבי AI
                   </h3>
                   <div className="space-y-4">
                      {[
                        { name: 'Gemini-3-pro (Primary)', status: 'Optimal', health: 98 },
                        { name: 'Veo-3.1 (Video Gen)', status: 'High Load', health: 82 },
                        { name: 'Triage Prediction Engine', status: 'Stable', health: 95 },
                        { name: 'Speech-to-Text Layer', status: 'Stable', health: 92 },
                      ].map((s, i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-2xl flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className={`w-2 h-2 rounded-full ${s.health > 90 ? 'bg-emerald-500' : 'bg-orange-500'} animate-pulse`} />
                              <span className="text-sm font-black">{s.name}</span>
                           </div>
                           <div className="flex items-center gap-6">
                              <span className="text-[10px] font-black uppercase text-slate-500">{s.status}</span>
                              <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                 <div className={`h-full ${s.health > 90 ? 'bg-emerald-500' : 'bg-orange-500'}`} style={{ width: `${s.health}%` }} />
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
             <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-lg">
                   <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                   <input 
                     type="text" 
                     placeholder="חיפוש בלוגים... (Ward, Model, Error)"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full bg-slate-900 border border-white/5 rounded-2xl py-4 pr-12 pl-4 text-white outline-none focus:border-cyan-500"
                   />
                </div>
                <div className="flex gap-2">
                   <button className="bg-white/5 px-6 py-4 rounded-2xl text-xs font-black hover:bg-white/10">Filter: All</button>
                   <button className="bg-white/5 px-6 py-4 rounded-2xl text-xs font-black hover:bg-white/10">Export CSV</button>
                </div>
             </div>

             <div className="bg-slate-900 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
                <table className="w-full text-right">
                   <thead>
                      <tr className="bg-black/20 text-[10px] font-black uppercase tracking-widest text-slate-500">
                         <th className="px-8 py-6">זמן</th>
                         <th className="px-8 py-6">סוג</th>
                         <th className="px-8 py-6">הודעה / אירוע</th>
                         <th className="px-8 py-6">דירוג אמון / סטטוס</th>
                         <th className="px-8 py-6">פעולות</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {AI_LOGS.map((log) => (
                        <tr key={log.id} className="hover:bg-white/5 transition-all group cursor-pointer">
                           <td className="px-8 py-6 font-mono text-xs text-slate-400">{log.timestamp}</td>
                           <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                log.status === 'warning' ? 'bg-orange-500/10 text-orange-500' : 'bg-cyan-500/10 text-cyan-400'
                              }`}>{log.type}</span>
                           </td>
                           <td className="px-8 py-6 text-sm font-black italic">{log.message}</td>
                           <td className="px-8 py-6">
                              {log.confidence && (
                                <div className="flex items-center gap-3">
                                   <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                      <div className="h-full bg-cyan-500" style={{ width: log.confidence }} />
                                   </div>
                                   <span className="text-xs font-black">{log.confidence}</span>
                                </div>
                              )}
                              {!log.confidence && (
                                <span className="text-[10px] font-black uppercase text-emerald-500">{log.status}</span>
                              )}
                           </td>
                           <td className="px-8 py-6"><button className="p-2 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 rounded-lg"><Eye size={16}/></button></td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'tuning' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in zoom-in duration-500">
             <div className="bg-slate-900 p-12 rounded-[4rem] border border-white/5 shadow-2xl space-y-10">
                <div className="flex items-center gap-6">
                   <div className="p-6 bg-cyan-600 rounded-[2rem] text-white shadow-xl shadow-cyan-600/20"><Sliders size={32}/></div>
                   <div>
                      <h3 className="text-3xl font-black italic">A/B Tuning & Global Prompts</h3>
                      <p className="text-slate-400 font-medium">כיוונון עדין של טון הדיבור וההנחיות של "אמונה AI".</p>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="bg-white/5 p-8 rounded-[2.5rem] space-y-4">
                      <div className="flex justify-between items-center mb-2">
                         <h4 className="font-black italic text-cyan-400 uppercase text-xs tracking-widest">System Prompt (Active Core)</h4>
                         <span className="text-[9px] font-black bg-cyan-600 px-3 py-1 rounded-full">v4.2.1-Prod</span>
                      </div>
                      <textarea 
                        className="w-full bg-black/40 border border-white/10 rounded-3xl p-6 text-sm italic font-medium leading-relaxed outline-none focus:border-cyan-500 transition-all h-40"
                        defaultValue="את המלווה הדיגיטלית של שלוותה. הטון שלך הוא שילוב של סמכותיות קלינית וחמלה אנושית. הימנעי מקלישאות והתמקדי בתיקוף הרגש..."
                      />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 p-6 rounded-[2.5rem] space-y-3">
                         <h4 className="text-[10px] font-black uppercase text-slate-500 italic">Temperature (Creativity)</h4>
                         <input type="range" className="w-full accent-cyan-500" min="0" max="1" step="0.1" defaultValue="0.7" />
                         <div className="flex justify-between text-[10px] font-black text-slate-500"><span>Direct (0.0)</span><span>Empathetic (1.0)</span></div>
                      </div>
                      <div className="bg-white/5 p-6 rounded-[2.5rem] space-y-3">
                         <h4 className="text-[10px] font-black uppercase text-slate-500 italic">Top-P (Nucleus Sampling)</h4>
                         <input type="range" className="w-full accent-cyan-500" min="0" max="1" step="0.1" defaultValue="0.9" />
                         <div className="flex justify-between text-[10px] font-black text-slate-500"><span>Focussed</span><span>Diverse</span></div>
                      </div>
                   </div>
                </div>

                <div className="flex gap-4">
                   <button className="flex-1 bg-white/5 py-5 rounded-[2rem] font-black text-slate-400 flex items-center justify-center gap-3">
                      <Play size={20} /> הרץ סימולציית מבחן
                   </button>
                   <button className="flex-[2] bg-cyan-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl shadow-cyan-600/20 active:scale-95 transition-all">
                      פרסם גרסה חדשה (Deploy)
                   </button>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'anomalies' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="bg-orange-600/10 border-2 border-orange-600/20 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                   <div className="w-24 h-24 bg-orange-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl animate-pulse">
                      <ShieldAlert size={48} />
                   </div>
                   <div className="flex-1 text-right">
                      <h3 className="text-3xl font-black italic mb-2">זיהוי אנומליות קוגניטיביות</h3>
                      <p className="text-slate-400 font-medium leading-relaxed max-w-2xl">
                         המערכת מנטרת "חריגות מהתדר" - שינויים פתאומיים בדפוסי דיבור, שימוש יתר במילים טעונות או שינויי מצב רוח קיצוניים המזוהים על ידי ה-AI.
                      </p>
                   </div>
                   <button className="bg-orange-600 text-white px-10 py-5 rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-xl">הגדר סף רגישות</button>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900 p-8 rounded-[3.5rem] border border-white/5 shadow-2xl">
                   <h4 className="text-lg font-black italic mb-6 text-orange-400 flex items-center gap-3">
                      <Activity size={20}/> אנומליות אחרונות (Detected)
                   </h4>
                   <div className="space-y-4">
                      {[
                        { time: '14:18', id: 'usr_442', type: 'Word Salad', score: '92%' },
                        { time: '12:05', id: 'usr_109', type: 'Rapid Mood Shift', score: '88%' },
                        { time: '09:44', id: 'usr_082', type: 'Negative Semantic Loop', score: '95%' },
                      ].map((a, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-3xl flex justify-between items-center group hover:bg-orange-600/10 transition-all border border-transparent hover:border-orange-600/20">
                           <div className="flex gap-4 items-center">
                              <span className="text-xs font-mono text-slate-500">{a.time}</span>
                              <div className="text-right">
                                 <p className="text-sm font-black italic">{a.type}</p>
                                 <p className="text-[10px] text-slate-500 font-black tracking-widest">PATIENT #{a.id}</p>
                              </div>
                           </div>
                           <span className="text-xl font-black text-orange-500">{a.score}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-[3.5rem] border border-white/5 shadow-2xl flex flex-col items-center justify-center text-center space-y-6">
                   <div className="p-8 bg-cyan-600/10 rounded-full text-cyan-400"><Code size={40}/></div>
                   <h4 className="text-2xl font-black italic">Auto-Tuning Engine</h4>
                   <p className="text-slate-400 text-sm italic max-w-xs">
                      המנוע מבצע אופטימיזציה אוטומטית לפרמטרים של המודל כדי לשפר את זמן התגובה מבלי לפגוע באמפתיה.
                   </p>
                   <div className="flex items-center gap-3 text-[10px] font-black text-cyan-500 uppercase tracking-widest">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                      Optimizing Core...
                   </div>
                </div>
             </div>
          </div>
        )}
      </main>

      {/* Floating Status Bar */}
      <div className="fixed bottom-8 left-8 z-[100] flex gap-3">
         <div className="bg-slate-900/80 backdrop-blur-3xl border border-white/10 px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl">
            <div className="flex items-center gap-2 text-cyan-400 font-black italic text-[10px] uppercase">
               <Database size={14}/> Core Ready
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2 text-emerald-400 font-black italic text-[10px] uppercase">
               <ShieldCheck size={14}/> Ethics Guard ON
            </div>
         </div>
      </div>
    </div>
  );
};

export default RikiAdmin;

const RotateCcw: React.FC<{size?: number}> = ({size = 24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
  </svg>
);
